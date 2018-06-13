/**
 * Created by xiezg on 2018/5/29
 */

import ajax from '~common/ajax'
import {src, mapMutations, getCK, mapActions, platform, tipsTime} from '~common/util'
import {Message} from 'element-ui'

const state = {
	navFix: false,

	timeInterval:null,
	timeLeft:null,
	expect_blinking:false,  // 期号闪烁
	expect_move:false,  // 期号上下移动

	currExpectId:0,  // 期号
	last_expectid:0,  // 上一期期号

	openCodeArr:null, // 开奖号码
	liveOpenCode:[], // 开奖 数组 动画数据
	time_drawFlip:null,  // 开奖动画 interval变量

	recentBet:[],  // 最近投注

	uid:null,  //过滤数据用

}

const mutationsInfo = mapMutations({

	currExpectId( state,data ){
		state.currExpectId = data
	},
	setRecentBet( state ,data ){
		state.recentBet = data
	},
	setWithDrawList (state, data) {
		state.withdrawList = data
	},
	setNavFix (state, data) {
		state.navFix = data
	},
	/* socket 倒计时 */
	timeLeft(state, time){
		state.timeLeft = time
	},
	timeInterval(state, interval){
		state.timeInterval = interval
	},
	setUid(state,uid){
		state.uid = uid
	}
}, 'cs_1105');

const actionsInfo = mapActions({
	/* recent Bet */
	formate_recentBet( {state,commit, dispatch},newData ){
		let currLuckyNum = null ;
		let newLuckyResult = null;
		let newNumLis = '' ;
		console.log(newData);
		if( newData && newData.length > 0 ){
			for( let i=0,len = newData.length;i<len;i++ ){
				// 过滤掉 未登录和别人的failure
				if (newData[i].status === '-1') {
					if (newData[i].uid.toString() !== state.uid || state.uid === '0') {
						continue;
					}
				}
				if (newData[i].betcode) {
					currLuckyNum = newData[i].betcode.split(',');
					newNumLis = '';
					for (let j = 0, lenJ = currLuckyNum.length; j < lenJ; j++) {
						if (newData[i].opencode !== null && newData[i].opencode !== '' && newData[i].opencode !== undefined) {
							newLuckyResult = newData[i].opencode.split(',');
							if (newLuckyResult.indexOf(currLuckyNum[j]) > -1) {
								newNumLis += '<li class="bingo">' + currLuckyNum[j] + '</li>'
							} else {
								newNumLis += '<li>' + currLuckyNum[j] + '</li>'
							}
						} else {
							newNumLis += '<li>' + currLuckyNum[j] + '</li>'
						}
					}
					newData[i].openCodeVal = newNumLis;
				}

//                -2|取消退款  -1|下单失败  0|下单 1|成功  2|结算    new
				let newTbody = '';
				if (newData[i].orderstatus == '2') {
					// 结算 并且大于0
					if (newData[i].betprize > 0) {
						newTbody += '<td class="win-amount js_resultDom"><a class="win">+' + Number( newData[i].betprize).toFixed(5) + digitalUnit + '</a></td>'
					} else {
						newTbody += '<td class="js_resultDom"><a></a>-</td>'
					}
				} else {
					if (newData[i].orderstatus == '0') {
						newTbody += '<td class="js_resultDom bold">wait </td>'
					} else if (newData[i].orderstatus == '1') {
						newTbody += '<td class="js_resultDom bold">wait</td>'
					} else if (newData[i].orderstatus == '-1' || newData[i].orderstatus == '-2') {
						newTbody += '<td class="js_resultDom bold"><a></a>failure</td>'
					}
				}
				newData[i].newTbody = newTbody;

			}
		}
		commit(mTypes.setRecentBet , newData);
		console.log('===top==');
	},
	// 当前 期号处理
	formate_expectid( {state,commit, dispatch},expectid ){
		if (expectid) {
			commit(mTypes.currExpectId , expectid);
		}
	},
	//  初始化上一期的结果
	formate_Result( {state,commit, dispatch},msg ){
		if (msg.last_expectid) {
			state.last_expectid = msg.last_expectid
		}
		// msg.expectid !== expectId  ??
		if( msg.expectid !== state.currExpectId || 1){
			if( !msg.opencode || msg.opencode === '' ){
				msg.opencode = '-,-,-,-,-';
			}
			if (msg.opencode) {
				state.liveOpenCode = [];
				state.openCodeArr = msg.opencode.split(',');
				clearInterval(state.time_drawFlip);
				// 动画
				let liveLen = state.openCodeArr.length;
				let i = 0;
				state.time_drawFlip = setInterval(function () {
					if (i < liveLen) {
						state.liveOpenCode.push( state.openCodeArr[i] );
					} else {
						clearInterval(state.time_drawFlip)
					}
					i ++ ;
				}, 250);
			}
		}
	},

	/* 初始化倒计时 */
	formate_countDown( {state,commit, dispatch},timer ){
		if (timer !== undefined && timer !== null) {
			clearInterval(state.timeInterval);
			// 倒计时
			state.timeLeft = parseFloat(timer);
			state.timeInterval = setInterval(function () {
				state.timeLeft = parseFloat(state.timeLeft) - 1;
				if (state.timeLeft == 0) {
					state.expect_blinking = false;
					state.expect_move = true;
					setTimeout(function () {
						state.expect_blinking = true;
						state.expect_move = false
					}, 1300);
				}
				if( state.timeLeft < 0 ){
					// 临时
					state.timeLeft = 60;
				}
			}, 1000);
		}
	},

	/* Draw Number 列表接口数据 */
	async getDrawNumList ({commit, dispatch}, pageData) {
		try {
			let InfoData = null;
			if (pageData) {
				InfoData = await ajax.get(`/expect/hisopencode?pageno=${pageData.pageNumber}&rangeno=${pageData.pageSize}`)
			} else {
				InfoData = await ajax.get(`/expect/hisopencode`)
			}
			if (InfoData.status === '100') {
				return InfoData.data
			} else {
				Message({
					message: InfoData.message,
					type: 'error',
					duration: tipsTime
				})
				return false
			}
		} catch (e) {
			Message({
				message: e.message,
				type: 'error',
				duration: tipsTime
			})
		}
    },
    
    getHistoryDraw ({commit, dispatch}, params = {}) {
        return ajax.get('/expect/hisopencode', params)
    },

    //首页 Recent Wins 列表接口数据
    async getRecentWinsList({commit, dispatch}){
        // order_lotid
        try{
            let dataRecentWinsList = null;
            // if(order_lotid){
            //     dataRecentWinsList = await ajax.get( '/home/winnerlist?lotid=' + order_lotid + '&pagesize=20');
            // }else{
                dataRecentWinsList = await ajax.get( '/home/winnerlist?lotid=' + 1 + '&pagesize=20');
            // }
            if(dataRecentWinsList.status === '100'){
                return dataRecentWinsList.data.winnerlist;
            }else{
                Message({
                    message: dataRecentWinsList.message,
                    type: 'error',
                    duration: tipsTime
                })
            }
        }catch(e){
            Message({
                message: e.message,
                type: 'error',
                duration: tipsTime
            })
        }
    },
    //首页 限号弹窗
    async popLimit(){
	    try {
	        let dataLimit = null;
	        let expectId = 1806121622;
            dataLimit = await ajax.get('/expect/restrictpool?expect='+expectId);
            return dataLimit;
        }catch(e){
            Message({
                message: e.message,
                type: 'error',
                duration: tipsTime
            })
        }
    },

	/* 注册激活 */
	async mailActivate ({commit, dispatch}, pageData) {
		try {
			return await ajax.get(`/user/mail/activate?sign=${pageData}`)
		} catch (e) {
			Message({
				message: e.message,
				type: 'error',
				duration: tipsTime
			})
		}

	},

}, 'cs_1105')

export const mTypes = mutationsInfo.mTypes
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
const actions = actionsInfo.actions
export default {state, mutations, actions}
