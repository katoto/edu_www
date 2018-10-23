import ajax, {sockURL} from '~common/ajax'
import {tipsTime, removeCK, isLog, getCK} from '~common/util'
import {Message} from 'element-ui'
import {mTypes, aTypes} from '~/store/cs_page/cs_1105'
import {actionTypes} from '~/store/cs_page/cs_tiger'

function combimeStore (store, newStore) {
    return {
        state: {...store.state, ...newStore.state},
        mutations: {...store.mutations, ...newStore.mutations},
        actions: {...store.actions, ...newStore.actions},
        getters: {...store.getters, ...newStore.getters}
    }
}

// 获取所有 cs_common 文件的 state getters mutations actions 注入到global
const csCommon = require.context('~store/cs_common', true, /\.js$/)
let common = {state: {}, mutations: {}, getters: {}, actions: {}}
csCommon.keys().forEach(function (commonPath) {
    common = combimeStore(common, csCommon(commonPath).default)
})

const state = {
    version: '0.0.1',
    isLog: false,
    initHeadState: null, // 初始化头部状态，用于收起弹层
    showEmailErr: false,
    userInfo: null,
    autoRefreshAccount: false, // 自动切换有钱账号
    socket: {
        reconnect: 0,
        sock: null,
        interval: null
    },
    ip_status: 0, // 1 禁止 0 正常
    currBalance: {
        cointype: '1001'
    }, // 当前币种  2001 eth  1001 btc
    adList: {}, // 广告图配置
    ...common.state
}

const mutations = {
    setAdList (state, data) {
        state.adList = data
    },
    initHeadState (state, data) {
        state.initHeadState = data
    },
    setCurrBalance (state, data) {
        state.currBalance = data
    },
    showEmailErr (state, data) {
        state.showEmailErr = data
    },
    setIp_status (state, data) {
        state.ip_status = data
    },
    setUserInfo (state, msg) {
        state.userInfo = msg
    },
    setIsLog (state, msg) {
        state.isLog = msg
    },
    initSocket (state, {sock, interval}) {
        state.socket.sock = sock
        state.socket.interval = interval
    },
    setAotoRefresh (state, param) {
        state.autoRefreshAccount = param
    },
    ...common.mutations
}
const actions = {
    getAdListInfo () {
        return ajax.get('/activity/center')
    },
    // 广告图
    async adList ({state, commit, dispatch}) {
        try {
            let adMsg = await ajax.get(`/ad/list`)
            if (adMsg.status.toString() === '100') {
                /* btc add */
                if (adMsg.data) {
                    commit('setAdList', adMsg.data)
                }
            }
            return adMsg
        } catch (e) {
            console.error('adList error')
        }
    },
    /* home info */
    async homeInfo ({state, commit, dispatch}) {
        try {
            let homeMsg = await ajax.get(`/home/info`)
            if (homeMsg.ip_status !== undefined || homeMsg.ip_status !== null) {
                commit('setIp_status', homeMsg.ip_status)
            }
            if (homeMsg.status.toString() === '100') {
                if (homeMsg.data.syxw_bettype_odds) {
                    commit(mTypes.syxw_bettype_odds, homeMsg.data.syxw_bettype_odds)
                }
                /* btc add */
                if (homeMsg.data.bet_limit) {
                    commit(mTypes.bet_limit, homeMsg.data.bet_limit)
                }
            }

            // todo
            if (homeMsg.data.invite_tips.toString() === '0') {
                commit('hideFreeplay')
            } else {
                if (commit.isLog) {
                    commit('hideFreeplay')
                } else {
                    commit('showFreeplay')
                }
            }

            return homeMsg
        } catch (e) {
            Message({
                message: e.message,
                type: 'error',
                duration: tipsTime
            })
        }
    },

    /* user info */
    async getUserInfo ({state, commit, dispatch}) {
        try {
            let userMsg = null
            if (!(getCK() === '0' || !getCK() || getCK() === 'null' || getCK() === '')) {
                userMsg = await ajax.get(`/user/info`)
                if (userMsg.status.toString() === '100') {
                    if (userMsg.data.uid) {
                        commit(mTypes.setUid, userMsg.data.uid)
                    }
                    if (userMsg.data.status !== undefined && userMsg.data.status.toString() === '-1') {
                        commit('showEmailErr', true)
                    } else {
                        if (state.showEmailErr) {
                            commit('showEmailErr', false)
                        }
                    }
                    // 未激活，无钱包
                    if (userMsg.data.accounts.length === 0) {
                        userMsg.data.accounts.push({
                            address: '',
                            balance: '0',
                            cointype: '2001',
                            fee: '0.003',
                            freez: '0.0'
                        })
                    }
                    /* 防止刷地址 */
                    if (userMsg.data.accounts && !state.currBalance.address) {
                        let findEthSucc = false
                        let bigItem = userMsg.data.accounts[0]
                        userMsg.data.accounts.forEach((item, index) => {
                            if (item.cointype === '1001') {
                                findEthSucc = true
                            }
                            if (parseFloat(bigItem.balance) < parseFloat(item.balance)) {
                                bigItem = item
                            }
                        })
                        commit('setCurrBalance', bigItem)
                        if (!findEthSucc) {
                            commit('setCurrBalance', userMsg.data.accounts[0])
                        }
                    }
                    /* 更新currBalance */
                    let findIndex = 0
                    userMsg.data.accounts.forEach((val, index) => {
                        if (val.cointype === state.currBalance.cointype) {
                            findIndex = index
                        }
                    })
                    commit('setCurrBalance', userMsg.data.accounts[findIndex])
                    commit('setUserInfo', userMsg.data)
                }
            }
            return userMsg
        } catch (e) {
            if (e && e.status) {
                if (e.status === '214' || e.status === '206') {
                    removeCK()
                    commit('setIsLog', false)
                    commit('setUserInfo', {})
                    commit('showLoginPop')
                }
            }
        }
    },

    /* websocket */
    initWebsocket ({commit, state, dispatch}, fn) {
        return new Promise((resolve, reject) => {
            let sock = new WebSocket(`${sockURL}`)
            let interval = null
            let flag = 0
            let hasFinished = false
            sock.onmessage = function (e) {
                console.log(e.data)
                console.log(e.data)
                if (!~e.data.indexOf('you said') && !(e.data === 'pong')) {
                    let msg = JSON.parse(e.data)

                    // 总的分发
                    if (msg && msg.content) {
                        switch (msg.content.action) {
                        case 'syxw.init':
                            // 初始化
                            //  初始化倒计时 o
                            if (msg.content.timer !== undefined && msg.content.timer !== null) {
                                dispatch(aTypes.formate_countDown, msg.content.timer)
                            }
                            // 初始化上一期结果
                            dispatch(aTypes.formate_Result, msg.content)
                            // 当前期号
                            if (msg.content.expectid !== undefined && msg.content.expectid !== null) {
                                dispatch(aTypes.formate_expectid, msg.content.expectid)
                            }
                            // recent bet
                            if (msg.content.top) {
                                dispatch(aTypes.formate_recentBet, msg.content.top)
                            }
                            break
                        case 'syxw.count_down':
                            //  初始化倒计时
                            if (msg.content.timer !== undefined && msg.content.timer !== null) {
                                dispatch(aTypes.formate_countDown, msg.content.timer)
                            }
                            // 初始化上一期结果
                            dispatch(aTypes.formate_Result, msg.content)
                            // 当前期号
                            if (msg.content.expectid !== undefined && msg.content.expectid !== null) {
                                dispatch(aTypes.formate_expectid, msg.content.expectid)
                            }
                            /*
                            *  处理 区块链阻塞
                            * */
                            let jsStartBetBtn = document.getElementById('js_startBetBtn')
                            // msg.content.block_status = '0' 报错错误
                            if (jsStartBetBtn) {
                                if (msg.content.block_status.toString() === '1') {
                                    //  健康
                                    if (~jsStartBetBtn.className.indexOf('unable')) {
                                        jsStartBetBtn.className = 'btn-play-now'
                                    }
                                } else if (msg.content.block_status.toString() === '0') {
                                    // 不健康  添加unable
                                    Message({
                                        message: _('The network is blocking, please retry later'),
                                        type: 'error',
                                        duration: tipsTime
                                    })
                                    jsStartBetBtn.className = 'btn-play-now unable'
                                }
                            }
                            break
                        case 'syxw.expect_settle':
                            // 开奖结果消息  更新 my Bet  todo
                            if (msg.content.expectid !== undefined && msg.content.expectid !== null) {
                                dispatch(aTypes.formate_expectid, msg.content.expectid)
                            }
                            // recent bet
                            if (msg.content.top) {
                                dispatch(aTypes.formate_recentBet, msg.content.top)
                            }
                            // 初始化上一期结果
                            dispatch(aTypes.formate_Result, msg.content)

                            if (~state.route.path.indexOf('lucky')) {
                                // mybet 弹窗
                                if (state.isLog) {
                                    dispatch('cs_1105/updateMyBets')
                                }
                                dispatch('cs_1105/updateHistoryDraw')
                                // 更新用户信息
                                dispatch('getUserInfo')
                            }
                            break
                        case 'syxw.order_change':
                            /* 投注推送  和 更新 my bet todo  */
                            if (msg.content && msg.content.orders) {
                                dispatch(aTypes.formate_pushBetData, msg.content.orders)
                            }
                            break
                        case 'syxw.expect_prize':
                            // 奖池中奖
                            if (msg.content) {
                                dispatch(aTypes.fomateJackPot, msg.content)
                            }
                            ;
                            break
                        case 'megacoin.good':
                            msg.content.state === '4' || msg.content.state === '5'
                                ? dispatch('cs_luckycoin/updateBets', msg.content)
                                : commit('cs_luckycoin/updateBet', msg.content)
                            break
                        case 'megacoin.order':
                            commit('cs_luckycoin/updateRecentBet', msg.content.orders)
                            commit('cs_luckycoin/handleMyBet', msg.content.orders)
                            break
                        case 'megacoin.cancel':
                            commit('cs_luckycoin/updateCurrentPage')
                            break
                        case 'slots.init':
                            // 老虎机初始化
                            if (msg.content) {
                                dispatch(actionTypes.formateTiger, msg.content)
                            }
                            break
                        // case '20011':
                        case 'first_recharge':
                            //  首充充值奖励
                            commit('cs_activity/sockMsg', msg.content)
                            break
                        case 'slots.prize':
                            // 老虎机初始化
                            if (msg.content) {
                                Object.assign(msg.content, {
                                    addNewRecord: true
                                })
                                dispatch(actionTypes.addRecentList, msg.content)
                            }
                            break
                        case 'dice.init':
                            commit('cs_luckypoker/setBetList', msg.content.top)
                            commit('cs_luckypoker/setSelfBetList', msg.content.self_top)
                            break
                        case 'dice.bet':
                            commit('cs_luckypoker/addBetList', msg.content.top)
                            break
                        }
                    }
                }
            }
            sock.onopen = function () {
                let webSockaction = null
                // let currUid = null
                fn()
                clearInterval(interval)
                // webSockaction = {
                //     action: 'sub',
                //     lotid: 1
                // }
                interval = setInterval(() => {
                    sock.send(JSON.stringify({
                        action: 'ping'
                    }))
                }, 5000)
                sock.send(JSON.stringify({
                    action: 'ping'
                }))
                // sock.send(JSON.stringify(webSockaction))
                commit('initSocket', {sock, interval})
                flag = 1
                if (hasFinished) return
                hasFinished = true
                resolve()
            }
            sock.onclose = function () {
                console.warn('websocket reconnect')
                clearInterval(interval)
                setTimeout(() => {
                    dispatch('initWebsocket', fn)
                }, 5000)
            }
            sock.onerror = function (e) {
                console.error('sock error')
                fn()
                e.code = '102'
                if (flag === 1) return
                if (hasFinished) return
                hasFinished = true
                reject(e)
            }
            setTimeout(() => {
                if (hasFinished) return
                hasFinished = true
                let error = new Error('websocket timeout')
                error.code = '103'
                reject(error)
            }, 15000)
            commit('initSocket', {sock, interval})
        })
    },
    sub2out ({commit, state}) {
        let sub2outStr = null
        try {
            // if (isLog && isLog()) {
            //     // sub2outStr = {
            //     //     action: 'unsub',
            //     //     ck: getCK(),
            //     //     lotid: 1
            //     // }
            //     sub2outStr = {
            //         action: 'unsync',
            //         ck: getCK(),
            //     }
            //     state.socket.sock && state.socket.sock.send(JSON.stringify(sub2outStr))
            // }
            sub2outStr = {
                action: 'unsync',
                ck: getCK()
            }
            state.socket.sock && state.socket.sock.send(JSON.stringify(sub2outStr))
            // if (state.socket.interval) {
            //     clearInterval(state.socket.interval)
            //     state.socket.interval = setInterval(function () {
            //         state.socket.sock.send(JSON.stringify({
            //             action: 'ping'
            //         }))
            //     }, 5000)
            // }
        } catch (e) {
            console.error(e.message)
        }
        removeCK()
    },
    sub2In ({commit, state, dispatch}) {
        let sub2InStr = null
        // let currUid = null
        try {
            // sub2InStr = {
            //     action: 'unsub',
            //     lotid: 1
            // }
            // state.socket.sock && state.socket.sock.send(JSON.stringify(sub2InStr))
            if (isLog && isLog()) {
                // sub2InStr = {
                //     action: 'sub',
                //     ck: getCK(),
                //     lotid: 1
                // }
                sub2InStr = {
                    action: 'sync',
                    ck: getCK()
                }
                // currUid = state.userInfo.uid
                state.socket.sock && state.socket.sock.send(JSON.stringify(sub2InStr))
            }
            // if (state.socket.interval) {
            //     clearInterval(state.socket.interval)
            //     state.socket.interval = setInterval(function () {
            //         state.socket.sock.send(JSON.stringify({
            //             action: 'ping',
            //             uid: currUid
            //         }))
            //     }, 5000)
            // }
        } catch (e) {
            console.error(e.message)
        }
    },
    subInTiger ({commit, state, dispatch}) {
        /* 进入老虎机页面 订阅 */
        try {
            let subTigerStr = null
            if (isLog && isLog()) {
                subTigerStr = {
                    action: 'sub',
                    ck: getCK(),
                    type: 'slots'
                }
            } else {
                subTigerStr = {
                    action: 'sub',
                    type: 'slots'
                }
            }
            state.socket.sock && state.socket.sock.send(JSON.stringify(subTigerStr))
        } catch (e) {
            console.error(e.message + 'subInTiger error')
            setTimeout(() => {
                dispatch('subInTiger')
            }, 100)
        }
    },
    subOutTiger () {
        /* 离开老虎机页面 解订阅 */
        try {
            let unsubTigerStr = {
                action: 'unsub',
                type: 'slots'
            }
            state.socket.sock && state.socket.sock.send(JSON.stringify(unsubTigerStr))
        } catch (e) {
            console.error(e.message + 'subOutTiger error')
        }
    },
    subInLucky ({commit, state, dispatch}) {
        /* 进入lucky11页面 订阅 */
        try {
            let subLuckyStr = null
            if (isLog && isLog()) {
                subLuckyStr = {
                    action: 'sub',
                    lotid: 1,
                    ck: getCK(),
                    type: 'lottery'
                }
            } else {
                subLuckyStr = {
                    action: 'sub',
                    lotid: 1,
                    type: 'lottery'
                }
            }
            state.socket.sock && state.socket.sock.send(JSON.stringify(subLuckyStr))
        } catch (e) {
            setTimeout(() => {
                dispatch('subInLucky')
            }, 100)
            // console.error(e.message + 'subInLucky error')
        }
    },
    subOutLucky () {
        /* 离开lucky页面 解订阅 */
        try {
            let unsubLuckyStr = {
                action: 'unsub',
                lotid: 1,
                type: 'lottery'
            }
            state.socket.sock && state.socket.sock.send(JSON.stringify(unsubLuckyStr))
        } catch (e) {
            console.error(e.message + 'subOutLucky error')
        }
    },
    subInLuckyCoin ({state, dispatch}) {
        let data = null
        if (isLog && isLog()) {
            data = {
                action: 'sub',
                lotid: 2,
                ck: getCK(),
                type: 'lottery'
            }
        } else {
            data = {
                action: 'sub',
                lotid: 2,
                type: 'lottery'
            }
        }
        if (isLog && isLog()) {
            data.ck = getCK()
        }
        try {
            state.socket.sock && state.socket.sock.send(JSON.stringify(data))
        } catch (e) {
            setTimeout(() => {
                dispatch('subInLuckyCoin')
            }, 100)
        }
    },
    subOutLuckyCoin () {
        let data = {
            action: 'unsub',
            lotid: 2,
            type: 'lottery'
        }
        if (isLog && isLog()) {
            data.ck = getCK()
        }
        state.socket.sock && state.socket.sock.send(JSON.stringify(data))
    },
    subInDice ({dispatch}) {
        let data = {
            action: 'sub',
            type: 'dice'
        }
        if (isLog && isLog()) {
            data.ck = getCK()
        }
        try {
            state.socket.sock && state.socket.sock.send(JSON.stringify(data))
        } catch (e) {
            setTimeout(() => {
                dispatch('subInDice')
            }, 100)
        }
    },
    subOutDice () {
        let data = {
            action: 'unsub',
            type: 'dice'
        }
        if (isLog && isLog()) {
            data.ck = getCK()
        }
        state.socket.sock && state.socket.sock.send(JSON.stringify(data))
    },
    ...common.actions
}

const getters = {
    ...common.getters
}

export default {
    state,
    mutations,
    actions,
    getters

}
