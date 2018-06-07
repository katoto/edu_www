const state = {
    pop: {
        showLoginPop: false,
        showRegPop: false,
        showVerifyEmail: false,
        showResetPwd: false,
        showVerifyEmailError: false,
        showRegSuccess: false,
        showRegFailure: false,
        showFaucet: false,
        showTransfer: false
    }
}

const mutations = {
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
        state.pop.hideVerifyEmail = false
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
    showRegFailure  (state) {
        state.pop.showRegFailure = true
    },
    hideRegFailure  (state) {
        state.pop.showRegFailure = false
    },
    showFaucet (state) {
        state.pop.showFaucet = true
    },
    hideFaucet (state) {
        state.pop.showFaucet = false
    }

}
const actions = {}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}
