import md5 from 'md5'
import {Message} from 'element-ui'
import ajax from '~common/ajax'

import router from '@/router'

import {removeCK, tipsTime} from '~common/util'

const state = {
    pop: {
        showNoVerify: false,

        showFreeplay: false,
        showLoginPop: false,
        showRegPop: false,
        showVerifyEmail: false,
        showResetPwd: false,
        showVerifyEmailError: false,
        showRegSuccess: false,
        showRegFailure: false,
        showTransfer: false,

        emailBackTime: 60,
        verifyTime: null,
        regVerifyEmail: null,
        mailType: 'reg',
        showPopLimit: false,

        resetObj: { // 重置密码
            email: null,
            sign: null,
            showReset: false
        },
        faucetMsg: null, // 邀请的msg
        inviterObj: null, // 邀请接收

        showFirstLogin: false, // 邀请用（激活处）
        recentChatmsg: null, // 近期投注记录
        chatmsg: null
    }
}

const mutations = {
    getchatmsg (state, data) {
        // 用于清空msg
        state.pop.chatmsg = data
    },
    setrecentChatmsg (state, data) {
        // chat msg init
        state.pop.recentChatmsg = data
    },
    setMailType (state, data) {
        state.pop.mailType = data
    },
    showNoVerify (state) {
        state.pop.showNoVerify = true
    },
    hideNoVerify (state) {
        state.pop.showNoVerify = false
    },

    showFreeplay (state) {
        state.pop.showFreeplay = true
    },
    hideFreeplay (state) {
        state.pop.showFreeplay = false
    },
    //  激活用的
    showFirstLogin (state, data) {
        state.pop.showFirstLogin = data
    },
    // 邀请用
    setInviterObj (state, msg) {
        state.pop.inviterObj = msg
    },
    setResetObj (state, msg) {
        state.pop.resetObj.email = msg.email
        state.pop.resetObj.sign = msg.sign
        state.pop.resetObj.showReset = msg.showReset
    },
    // 注册邮箱 记录
    setRegVerifyEmail (state, email) {
        state.pop.regVerifyEmail = email
    },
    // 邮箱倒计时
    emailBackTime (state, time) {
        state.pop.emailBackTime = time
    },
    // 转账弹窗
    showTransfer (state) {
        state.pop.showTransfer = true
    },
    hideTransfer (state) {
        state.pop.showTransfer = false
    },
    showLoginPop (state) {
        state.pop.showLoginPop = true
    },
    hideLoginPop (state) {
        state.pop.showLoginPop = false
    },
    // 注册弹窗显示隐藏
    showRegPop (state) {
        state.pop.showRegPop = true
    },
    hideRegPop (state) {
        state.pop.showRegPop = false
    },
    // 验证弹窗显示隐藏
    showVerifyEmail (state) {
        state.pop.showVerifyEmail = true
    },
    hideVerifyEmail (state) {
        state.pop.showVerifyEmail = false
    },
    // 重置密码弹窗显示隐藏
    showResetPwd (state) {
        state.pop.showResetPwd = true
    },
    hideResetPwd (state) {
        state.pop.showResetPwd = false
    },
    // 邮箱验证错误弹窗显示隐藏
    showVerifyEmailError (state) {
        state.pop.showVerifyEmailError = true
    },
    hideVerifyEmailError (state) {
        state.pop.showVerifyEmailError = false
    },
    // 注册成功弹窗显示隐藏
    showRegSuccess (state) {
        state.pop.showRegSuccess = true
    },
    hideRegSuccess (state) {
        state.pop.showRegSuccess = false
    },
    // 注册失败弹窗显示隐藏
    showRegFailure (state) {
        state.pop.showRegFailure = true
    },
    hideRegFailure (state) {
        state.pop.showRegFailure = false
    },
    faucetMsg (state, msg) {
        state.pop.faucetMsg = msg
    },
    showPopLimit (state) {
        state.pop.showPopLimit = true
    },
    hidePopLimit (state) {
        state.pop.showPopLimit = false
    }
}
const actions = {
    /* 聊天消息 */
    fomateChatpush ({state, commit, dispatch}, msg) {
        if (msg) {
            if (state.pop) {
                if (!state.pop.recentChatmsg) state.pop.recentChatmsg = []
                if (state.pop.recentChatmsg > 130) {
                    state.pop.recentChatmsg = state.pop.recentChatmsg.slice(1)
                }
                Object.assign(msg, {
                    isNew: true
                })
                state.pop.recentChatmsg.push(msg)
                commit('setrecentChatmsg', state.pop.recentChatmsg)
                commit('getchatmsg', msg)
            }
        }
    },
    async noSpeak ({commit, dispatch}, msg) {
        return ajax.post(`/im/chatroom/block`, msg)
    },
    async breakSpeak ({commit, dispatch}, msg) {
        return ajax.post(`/im/chatroom/unblock`, msg)
    },
    /* chat delAllMsg */
    async delAllMsg ({commit, dispatch}, item) {
        return ajax.get(`/faucet/tasks?cointype=${item}`)
    },
    /* chat 聊天室msg 删除 */
    async delCurrMsg ({commit, dispatch}, item) {
        return ajax.get(`/faucet/tasks?cointype=${item}`)
    },
    /* chat 聊天室个人信息获取 */
    async getOneChatmsg ({commit, dispatch}, msg) {
        return ajax.post(`/im/chatroom/user_info`, msg)
    },

    /* 水龙头邀请 */
    async faucetTask ({commit, dispatch}, coinType) {
        return ajax.get(`/faucet/tasks?cointype=${coinType}`)
    },
    /* 水龙头领取 */
    async faucetGet ({commit, dispatch}, taskid) {
        return ajax.get(`/faucet/get?task_id=${taskid}`)
    },
    /* login 登陆 */
    async userLogin ({commit, dispatch}, pageData) {
        try {
            let InfoData = null
            if (pageData) {
                InfoData = await ajax.get(`/user/login?email=${pageData.email}&password=${md5(md5(pageData.password))}&verify_code=${pageData.verify_code}`)
            }
            if (InfoData.status.toString() === '100') {
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

    /* 退出登录 */
    loginOut ({state, commit, dispatch}) {
        commit('setIsLog', false)
        removeCK()
        commit('setUserInfo', {})
        if (~state.route.path.indexOf('account')) {
            router.push('/lucky11')
        }
        dispatch('sub2out')
    },

    /* reg 注册 => 邮箱验证 */
    async beforeReg ({commit, dispatch}, pageData) {
        try {
            let InfoData
            if (pageData) {
                InfoData = await ajax.get(`/user/mail/validate?email=${pageData}`)
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
    /* reg 注册 */
    async reg ({commit, dispatch}, params) {
        let data = {
            ...params,
            password: md5(md5(params.password))
        }

        if (state.pop.inviterObj) {
            data.inviter = state.pop.inviterObj.inviter
            data.sign = state.pop.inviterObj.sign
        }

        return ajax.get('/user/mail/reg', data)
    },
    /*  倒计时 */
    startBackTime ({state, commit, dispatch}, pageData) {
        // 新增一个  再次发生邮件的倒计时
        clearInterval(state.pop.verifyTime)
        commit('emailBackTime', 60)
        state.pop.verifyTime = setInterval(function () {
            commit('emailBackTime', state.pop.emailBackTime - 1)
            if (state.pop.emailBackTime === 0) {
                clearInterval(state.pop.verifyTime)
            }
        }, 1000)
    },
    /* 发送邮件  reg: 注册, reset: 重置密码 */
    async sendEmail ({commit, dispatch}, pageData) {
        try {
            let InfoData = null
            if (pageData) {
                if (pageData.mailType) {
                    InfoData = await ajax.get(`/user/mail/send?email=${pageData.email}&mail_type=${pageData.mailType}`)
                }
            }
            return InfoData
        } catch (e) {
            Message({
                message: e.message,
                type: 'error',
                duration: tipsTime
            })
        }
    },
    /*  reset password  重置密码  */
    async resetPasswordFn ({state, commit, dispatch}, pageData) {
        try {
            let InfoData = null
            if (pageData) {
                InfoData = await ajax.get(`/user/reset/password?email=${pageData.email}&sign=${pageData.sign}&password=${md5(md5(pageData.password))}`)
            }
            return InfoData
        } catch (e) {
            if (e && e.status && e.status === '208') {
                setTimeout(() => {
                    router.push('')
                    commit('hideResetPwd')
                }, tipsTime)
            }
        }
    }

}

const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}
