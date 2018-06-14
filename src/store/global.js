import ajax from '~common/ajax'
import { src, getCK, platform, tipsTime, removeCK } from '~common/util'
import {Message} from 'element-ui'
import {mTypes, aTypes} from '~/store/cs_page/cs_1105'

let sockURL = null
if (process.env.NODE_ENV === 'production') {
    sockURL = 'wss://crazybet.choopaoo.com/wss'
} else if (process.env.NODE_ENV === 'preRelease') {
    sockURL = 'ws://192.168.41.76:6999'
} else {
    sockURL = 'ws://10.0.1.167:8099/betblock'
    // sockURL = 'ws://10.0.1.41:4444/betblock'
}

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
    userInfo: null,
    socket: {
        reconnect: 0,
        sock: null,
        interval: null
    },
    ...common.state
}

const mutations = {
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
    addConnectNum (state) {
        state.socket.reconnect++
    },
    ...common.mutations
}
const actions = {
    /* user info */
    async getUserInfo ({state, commit, dispatch}) {
        try {
            let userMsg = await ajax.get(`/user/info`)
            console.log(userMsg)

            if (userMsg.status == '100') {
                if (userMsg.data.uid) {
                    commit(mTypes.setUid, userMsg.data.uid)
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
                // 邀请 活动
                // userMsg.data.tasks = [{
                // 	"tid": 1,
                // 	"maintype": 1,
                // 	"subtype": 2,
                // 	"taskstatus": "0"
                // }];
                let newTask = []
                userMsg.data.tasks.forEach((val, index) => {
                    if (val.subtype == '2' && val.taskstatus == '0') {
                        newTask.push(val)
                    }
                })
                if (newTask.length > 0) {
                    commit('inviteTips', true)
                }
                // 取回之前数据
                let newInviteObj = {
                    invite_status: userMsg.data.invite_status, //
                    invite_prize_chances: userMsg.data.invite_prize_chances,
                    tasks: newTask
                }
                if (state && state.pop.loginSucc && state.pop.loginSucc.login_times) {
                    Object.assign(newInviteObj, {
                        login_times: state.pop.loginSucc.login_times
                    })
                }
                commit('setLoginSucc', newInviteObj)
            }
            return userMsg
        } catch (e) {
            Message({
                message: e.message,
                type: 'error',
                duration: tipsTime
            })
        }
    },

    /* websocket */
    initWebsocket ({commit, state, dispatch}) {
        return new Promise((resolve, reject) => {
            let sock = new WebSocket(`${sockURL}`)
            let interval = null
            let flag = 0
            let hasFinished = false
            sock.onmessage = function (e) {
                if (!~e.data.indexOf('you said')) {
                    let msg = JSON.parse(e.data)
                    // 总的分发
                    if (msg && msg.data) {
                        switch (msg.msg_code.toString()) {
                        case '1001':
                            // 初始化
                            //  初始化倒计时
                            if (msg.data.timer !== undefined && msg.data.timer !== null) {
                                dispatch(aTypes.formate_countDown, msg.data.timer)
                            }
                            // 当前期号
                            if (msg.data.expectid !== undefined && msg.data.expectid !== null) {
                                dispatch(aTypes.formate_expectid, msg.data.expectid)
                            }
                            // recent bet
                            if (msg.data.top) {
                                dispatch(aTypes.formate_recentBet, msg.data.top)
                            }
                            // 初始化上一期结果
                            dispatch(aTypes.formate_Result, msg.data)
                            break
                        case '1002':
                            //  初始化倒计时
                            if (msg.data.timer !== undefined && msg.data.timer !== null) {
                                dispatch(aTypes.formate_countDown, msg.data.timer)
                            }
                            // 当前期号
                            if (msg.data.expectid !== undefined && msg.data.expectid !== null) {
                                dispatch(aTypes.formate_expectid, msg.data.expectid)
                            }

                            // 初始化上一期结果
                            dispatch(aTypes.formate_Result, msg.data)
                            break
                        case '1003':
                            break
                        }
                    }
                }
            }
            sock.onopen = function () {
                let webSockaction = null
                let currUid = null
                clearInterval(interval)
                if (state.userInfo && state.userInfo.uid) {
                    webSockaction = {
                        action: 'sub',
                        uid: state.userInfo.uid,
                        lotid: 1
                    }
                    currUid = state.userInfo.uid
                    interval = setInterval(() => {
                        sock.send(JSON.stringify({
                            action: 'ping',
                            uid: currUid
                        }))
                    }, 5000)
                } else {
                    webSockaction = {
                        action: 'sub',
                        lotid: 1
                    }

                    interval = setInterval(() => {
                        sock.send(JSON.stringify({
                            action: 'ping'
                        }))
                    }, 5000)
                }
                sock.send(JSON.stringify(webSockaction))

                commit('initSocket', {sock, interval})
                flag = 1
                if (hasFinished) return
                hasFinished = true
                resolve()
            }
            sock.onclose = function () {
                console.warn('websocket 重连')
                clearInterval(interval)
                setTimeout(() => {
                    commit('addConnectNum')
                    dispatch('initWebsocket')
                }, 5000)
            }
            sock.onerror = function (e) {
                console.error('sock error')
                e.code = '102'
                if (flag === 1) return
                if (hasFinished) return
                hasFinished = true
                reject(e)
            }
            setTimeout(() => {
                if (hasFinished) return
                hasFinished = true
                let error = new Error('超时')
                error.code = '103'
                reject(error)
            }, 1000)
            commit('initSocket', {sock, interval})
        })
    },
    sub2out ({commit, state}) {
        let sub2outStr = null
        console.log(state)
        try {
            if (state.userInfo && state.userInfo.uid) {
                sub2outStr = {
                    action: 'unsub',
                    uid: state.userInfo.uid,
                    lotid: 1
                }
                state.socket.sock && state.socket.sock.send(JSON.stringify(sub2outStr))
            }
            sub2outStr = {
                action: 'sub',
                lotid: 1
            }
            state.socket.sock && state.socket.sock.send(JSON.stringify(sub2outStr))

            if (state.socket.interval) {
                clearInterval(state.socket.interval)
                state.socket.interval = setInterval(function () {
                    state.socket.sock.send(JSON.stringify({
                        action: 'ping'
                    }))
                }, 5000)
            }
        } catch (e) {
            console.error(e.message)
        }
    },
    sub2In ({commit, state}) {
        let sub2InStr = null
        let currUid = null
        try {
            sub2InStr = {
                action: 'unsub',
                lotid: 1
            }
            state.socket.sock && state.socket.sock.send(JSON.stringify(sub2InStr))
            if (state.userInfo && state.userInfo.uid) {
                sub2InStr = {
                    action: 'sub',
                    uid: state.userInfo.uid,
                    lotid: 1
                }
                currUid = state.userInfo.uid
                state.socket.sock && state.socket.sock.send(JSON.stringify(sub2InStr))
            } else {
                currUid = null
            }
            if (state.socket.interval) {
                clearInterval(state.socket.interval)
                state.socket.interval = setInterval(function () {
                    state.socket.sock.send(JSON.stringify({
                        action: 'ping',
                        uid: currUid
                    }))
                }, 5000)
            }
        } catch (e) {
            console.error(e.message)
        }
    },
    loginOut ({commit, state}) {
        localStorage.setItem('block_ck', '')
        localStorage.setItem('block_uid', '0')
        removeCK('block_ck')
        window.location.reload()
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
