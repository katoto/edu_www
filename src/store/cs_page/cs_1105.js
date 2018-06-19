/**
 * Created by xiezg on 2018/5/29
 */

import ajax from '~common/ajax'
import {src, mapMutations, getCK, mapActions, platform, tipsTime} from '~common/util'
import {Message} from 'element-ui'

const state = {
    navFix: false,

    timeInterval: null,
    timeLeft: null,
    expect_blinking: false, // 期号闪烁
    expect_move: false, // 期号上下移动

    currExpectId: 0, // 期号
    last_expectid: 0, // 上一期期号

    openCodeArr: null, // 开奖号码
    liveOpenCode: [], // 开奖 数组 动画数据
    time_drawFlip: null, // 开奖动画 interval变量

    recentBet: [], // 最近投注

    uid: null, // 过滤 首页数据用

    syxw_bettype_odds: { // 玩法赔率 todo 更新
        1101: '1.8',
        1102: '4.5',
        1103: '13.5',
        1104: '54',
        1105: '378'
    },
    popLoadSpeed: 800, // 动态速率
    popTimeInterval: null,

    allbetPipeArr: [], // 用于控制allbet

    mybets: [], // mybets数据
    mybetCount: 0,

    poolAmount: 20, // 奖池
    poolRatio: null, //  奖池比例
    jackPotMsg: null // 奖池信息 中奖池
}

const mutationsInfo = mapMutations({
    setjackPotMsg (state, data) {
        state.jackPotMsg = data
    },
    setPoolAmount (state, data) {
        state.poolAmount = parseFloat(data)
    },
    poolRatio (state, data) {
        state.poolRatio = data
    },
    syxw_bettype_odds (state, data) {
        state.syxw_bettype_odds = data
    },
    currExpectId (state, data) {
        state.currExpectId = data
    },
    setRecentBet (state, data) {
        state.recentBet = data
    },
    setWithDrawList (state, data) {
        state.withdrawList = data
    },
    setNavFix (state, data) {
        state.navFix = data
    },
    /* socket 倒计时 */
    timeLeft (state, time) {
        state.timeLeft = time
    },
    timeInterval (state, interval) {
        state.timeInterval = interval
    },
    setUid (state, uid) {
        state.uid = uid
    },
    setAllbetPipeArr (state, pipe) {
        state.allbetPipeArr = pipe
    },
    updateMyBets (state, mybets) {
        state.mybets = mybets
    },
    updateMyBetsCount (state, mybetCount) {
        state.mybetCount = mybetCount
    }
}, 'cs_1105')

const actionsInfo = mapActions({
    /* 奖池奖 */
    fomateJackPot ({state, commit, dispatch}, data) {
        if (data && data.txhash) {
            data.txhash = data.txhash.slice(0, 7)
        }
        commit(mTypes.setjackPotMsg, data);
        setTimeout(()=>{
            commit(mTypes.setjackPotMsg, null);
        },4000)
    },

    /* recent Bet  实时更新 recent bet */
    formate_pushBetData ({state, commit, dispatch}, orders) {
        if (orders) {
            if (Array.isArray(orders)) {
                if (state.allbetPipeArr.length > 30) {
                    commit(mTypes.setAllbetPipeArr, state.allbetPipeArr.slice(0, 20))
                } else {
                    commit(mTypes.setAllbetPipeArr, state.allbetPipeArr.concat(orders))
                }
            } else {
                console.warn('formate_pushBetData error not arr')
            }
        }
    },

    /* 动态数据一条条处理 */
    recentBetAdd ({state, commit, dispatch}) {
        if (!state.popTimeInterval) {
            state.popTimeInterval = setInterval(function () {
                let currMsg = null
                let findIndex = null
                let findBetMsg = null
                //  操作数组的写法
                if (state.allbetPipeArr.length > 0) {
                    currMsg = state.allbetPipeArr.pop()
                    Object.assign(currMsg, {
                        addNewRecord: true
                    })
                    // return false跳出循环，return true继续循环
                    if (state.recentBet.length > 0) {
                        state.recentBet.every((val, index) => {
                            if (val) {
                                // 是开奖 更新状态
                                if (val.oid === currMsg.oid) {
                                    findIndex = index
                                    return false
                                }
                            }
                            return true
                        })
                        if (findIndex !== null) {
                            findBetMsg = state.recentBet.splice(findIndex, 1)
                            if (findBetMsg) {
                                /* 更新开奖转态 在放入第一个 */
                                Object.assign(findBetMsg, currMsg)
                                state.recentBet.unshift(findBetMsg)
                                dispatch(aTypes.formate_recentBet, state.recentBet)
                            }
                        } else {
                            /* 最新插入数据  是否删掉最后一条？？ */
                            if (state.recentBet.length >= 21) {
                                state.recentBet.splice(21, state.recentBet.length)
                            }
                            state.recentBet.unshift(currMsg)
                            dispatch(aTypes.formate_recentBet, state.recentBet)
                        }
                    }
                }
            }, state.popLoadSpeed)
        }
    },

    /* recent Bet */
    formate_recentBet ({state, commit, dispatch}, newData) {
        let currLuckyNum = null
        let newLuckyResult = null
        let newNumLis = ''
        if (newData && newData.length > 0) {
            for (let i = 0, len = newData.length; i < len; i++) {
                // 过滤掉 未登录和别人的failure
                if (newData[i].orderstatus === '-1') {
                    if (newData[i].uid.toString() !== state.uid || state.uid === '0') {
                        continue
                    }
                }
                if (newData[i].uid === state.uid) {
                    newData[i].boldUid = true
                }
                if (newData[i].betcode) {
                    currLuckyNum = newData[i].betcode.split(',')
                    newNumLis = ''
                    for (let j = 0, lenJ = currLuckyNum.length; j < lenJ; j++) {
                        if (newData[i].opencode !== null && newData[i].opencode !== '' && newData[i].opencode !== undefined) {
                            newLuckyResult = newData[i].opencode.split(',')
                            if (newLuckyResult.indexOf(currLuckyNum[j]) > -1) {
                                newNumLis += '<li class="bingo">' + currLuckyNum[j] + '</li>'
                            } else {
                                newNumLis += '<li>' + currLuckyNum[j] + '</li>'
                            }
                        } else {
                            newNumLis += '<li>' + currLuckyNum[j] + '</li>'
                        }
                    }
                    newData[i].openCodeVal = newNumLis
                }

                //     -2|取消退款  -1|下单失败  0|下单 1|成功  2|结算    new
                let newTbody = ''
                if (newData[i].orderstatus.toString() === '2') {
                    // 结算 并且大于0
                    if (newData[i].betprize > 0) {
                        newTbody += '<td class="win-amount js_resultDom"><a class="win">+' + Number(newData[i].betprize).toFixed(5) + 'ETH</a></td>'
                    } else {
                        newTbody += '<p>-</p>'
                    }
                } else {
                    if (newData[i].orderstatus.toString() === '0') {
                        newTbody += '<p class="bold">wait</p>'
                    } else if (newData[i].orderstatus.toString() === '1') {
                        newTbody += '<p class="bold">wait</p>'
                    } else if (newData[i].orderstatus.toString() === '-1' || newData[i].orderstatus.toString() === '-2') {
                        newTbody += '<p class="bold">failure</p>'
                    }
                }
                newData[i].newTbody = newTbody
            }
        }
        commit(mTypes.setRecentBet, newData)
    },
    // 当前 期号处理
    formate_expectid ({state, commit, dispatch}, expectid) {
        if (expectid) {
            commit(mTypes.currExpectId, expectid)
        }
    },
    //  初始化上一期的结果
    formate_Result ({state, commit, dispatch}, msg) {
        /* 奖池 */
        if (msg.pool_amount) {
            commit(mTypes.setPoolAmount, msg.pool_amount)
        }
        /* 比例 */
        if (msg.pool_ratio) {
            commit(mTypes.poolRatio, msg.pool_ratio)
        }

        if (msg.last_expectid) {
            state.last_expectid = msg.last_expectid
        }
        // msg.expectid !== expectId  ??
        if (msg.expectid !== state.currExpectId || 1) {
            if (!msg.opencode || msg.opencode === '') {
                msg.opencode = '-,-,-,-,-'
            }
            if (msg.opencode) {
                state.liveOpenCode = []
                state.openCodeArr = msg.opencode.split(',')
                clearInterval(state.time_drawFlip)
                // 动画
                let liveLen = state.openCodeArr.length
                let i = 0
                state.time_drawFlip = setInterval(function () {
                    if (i < liveLen) {
                        state.liveOpenCode.push(state.openCodeArr[i])
                    } else {
                        clearInterval(state.time_drawFlip)
                    }
                    i++
                }, 250)
            }
        }
    },

    /* 初始化倒计时 */
    formate_countDown ({state, commit, dispatch}, timer) {
        if (timer !== undefined && timer !== null) {
            clearInterval(state.timeInterval)
            // 倒计时
            state.timeLeft = parseFloat(timer)
            state.timeInterval = setInterval(function () {
                state.timeLeft = parseFloat(state.timeLeft) - 1
                if (state.timeLeft == 0) {
                    state.expect_blinking = false
                    state.expect_move = true
                    setTimeout(function () {
                        state.expect_blinking = true
                        state.expect_move = false
                    }, 1300)
                }
                if (state.timeLeft < 0) {
                    // 临时
                    state.timeLeft = 60
                }
            }, 1000)
        }
    },

    /* Draw Number 列表接口数据 */
    async getDrawNumList ({commit, dispatch}, pageData) {
        try {
            let InfoData = null
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

    // 首页 Recent Wins 列表接口数据
    async getRecentWinsList ({commit, dispatch}) {
        try {
            let dataRecentWinsList = await ajax.get('/home/winnerlist?lotid=' + 1 + '&pagesize=20')
            if (dataRecentWinsList.status === '100') {
                return dataRecentWinsList.data.winnerlist
            } else {
                Message({
                    message: dataRecentWinsList.message,
                    type: 'error',
                    duration: tipsTime
                })
            }
        } catch (e) {
            Message({
                message: e.message,
                type: 'error',
                duration: tipsTime
            })
        }
    },
    // 首页 限号弹窗
    async popLimit () {
        try {
            let dataLimit = null
            if (state.currExpectId) {
                dataLimit = await ajax.get('/expect/restrictpool?expect=' + state.currExpectId)
            } else {
                console.warn('expectId error')
            }
            return dataLimit
        } catch (e) {
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
    /* 投注下单  2001  */
    async placeOrder ({commit, dispatch}, transferOrderStr) {
        try {
            let InfoData = await ajax.post(`/place/order`, {
                codestr: transferOrderStr,
                cointype: 2001
            })
            console.log(InfoData)
            console.log('=======InfoData==')
            return InfoData
        } catch (e) {
            Message({
                message: e.message,
                type: 'error',
                duration: tipsTime
            })
        }
    },
    updateMyBets ({commit, dispatch}) {
        return ajax.get('/order/list', {
            pageno: 1,
            pagesize: 4,
            day: 1
        }).then(data => {
            commit('cs_1105/updateMyBets', data.data.orders || [])
            commit('cs_1105/updateMyBetsCount', data.data.counter || 0)
            return data
        })
    }

}, 'cs_1105')

export const mTypes = mutationsInfo.mTypes
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
const actions = actionsInfo.actions
export default {state, mutations, actions}
