// 一元夺币 modules
import ajax from '~common/ajax'
import { formateCoinType } from '~common/util'
import router from '~router'

const state = {
    betsList: [],
    drawHistoryList: [],
    recentBetsList: [],
    otherWin: {
        name: '',
        num: '',
        type: '',
        isShow: false
    },
    selfWin: {
        num: '',
        type: '',
        exceptId: '',
        isShow: false,
        callback: null
    },
    listener: {}
}

const mutations = {

    // websocket 推送更新投注列表某一注
    updateBet (state, newBet) {
        state.betsList.map((bet, index) => {
            if (bet.exceptId === newBet.exceptId) {
                state.betsList[index] = {
                    ...bet,
                    ...newBet
                }
            }
        })
        state.betsList = [...state.betsList]
        state.listener[newBet.exceptId] && (state.listener[newBet.exceptId])()
    },

    // 更新投注列表
    updateBets (state, newBets) {
        state.betsList = [...newBets]
    },

    // 更新最新投注
    updateRecentBet (state, bet) {
        var isMybet = false
        if (bet && bet.length > 0) {
            let newRecentBetList = [...state.recentBetsList]
            newRecentBetList = newRecentBetList.map(bet => {
                bet.current = false
                return bet
            })
            bet = bet.map(bet => {
                bet.current = true
                if (this.state.userInfo && this.state.userInfo.uid && this.state.userInfo.uid === bet.uid) {
                    isMybet = true
                }
                return bet
            })
            state.recentBetsList = [...bet.concat(newRecentBetList)].slice(0, 7)
        }
        if (isMybet) {
            this.dispatch('getUserInfo')
        }
    },
    // 更新最近投注列表
    updateRecentBets (state, bets) {
        if (bets && bets.length > 0) {
            bets = bets.map(bet => {
                bet.current = false
                return bet
            })
            state.recentBetsList = [...bets]
        }
    },
    // 更新历史投注列表
    updateDrawHistory (state, bets) {
        state.drawHistoryList = [...bets]
    },

    // 其他用户获奖弹窗
    showOtherWin (state, params) {
        state.otherWin = {
            isShow: true,
            name: params.winUserName,
            num: params.goodsValue,
            type: formateCoinType(params.goodsType)
        }
        setTimeout(() => {
            this.commit('cs_luckycoin/hideOtherWin')
        }, 6000)
    },

    hideOtherWin (state) {
        state.otherWin.isShow = false
    },

    // 个人获奖弹窗
    showMyWin (state, params) {
        state.selfWin = {
            isShow: true,
            num: params.goodsValue,
            type: formateCoinType(params.goodsType),
            exceptId: params.exceptId,
            callback: params.callback
        }
    },
    hideMyWin (state) {
        state.selfWin.isShow = false
        state.selfWin.callback && state.selfWin.callback()
    },

    updateMyBet (state, betid) {
        state.betsList.map((bet, index) => {
            if (bet.exceptId === betid) {
                state.betsList[index] = {
                    ...bet,
                    isbet: '1'
                }
            }
        })
        state.betsList = [...state.betsList]
    },

    handleMyBet (state, orders) {
        orders.map(order => {
            if (
                this.state.userInfo &&
                this.state.userInfo.uid &&
                order.uid.toString() === this.state.userInfo.uid
            ) {
                this.commit('cs_luckycoin/updateMyBet', order.expectid)
            }
        })
    },
    bindListener (state, params) {
        state.listener = {
            ...state.listener,
            ...params
        }
    },
    unbindListener (state, expectid) {
        delete state.listener[expectid]
    }
}

const actions = {

    betNow ({ commit }, params = {}) {
        return ajax.get('/place/order', {
            lotid: '2',
            ...params
        }, true)
    },

    // 加载最近投注
    async getRecentBets ({ commit }, params = {}) {
        let data = await ajax.get('/get/megacoin/orders', {
            ...params,
            pageno: '1',
            pagesize: '7',
            lotid: '2'
        })
        commit('updateRecentBets', data.data.orders)
    },

    // 加载投注列表
    async getBetsList ({ commit }, params = {}) {
        let data = await ajax.get('/bid/goods/list', {
            ...params,
            pageno: '1',
            pagesize: '7'
        })
        commit('updateBets', data.data.goods)
    },

    // 加载历史列表
    async getDrawHistory ({ commit }, params = {}) {
        let data = await ajax.get('/draw/records/list', {
            ...params,
            pageno: '1',
            pagesize: '6'
        })
        commit('updateDrawHistory', data.data.drawRecords)
    },

    async getBetsPageList ({ commit }, params = {}) {
        let data = await ajax.get('/bid/goods/list', {
            ...params,
            pageno: '1',
            pagesize: '-1'
        })
        commit('updateBets', data.data.goods)
        return data
    },

    async getBetsPageHistory ({ commit }, params = {}) {
        let data = await ajax.get('/draw/records/list', params)
        commit('updateDrawHistory', data.data.drawRecords)
        return data
    },

    getLastProfitRecord ({ commit }, params = {}) {
        return ajax.get('/goods/winner', params)
    },

    showProfitCallback ({ commit }, params = {}) {
        return ajax.get('/goods/winner/callback', params)
    },

    updateBets ({ dispatch, commit }, params = {}) {
        if (params && params.state === '4') {
            if (
                this.state.userInfo &&
                this.state.userInfo.uid &&
                params.winUid.toString() === this.state.userInfo.uid
            ) {
                dispatch('getUserInfo')
                commit('showMyWin', params)
            } else {
                // 其他用户获奖
                commit('showOtherWin', params)
            }
        }
        if (router.history.current.path.indexOf('/moreBids') > -1) {
            dispatch('getBetsPageList')
            return
        }
        for (let name in this.state.cs_luckycoin.listener) {
            this.state.cs_luckycoin.listener[name] && this.state.cs_luckycoin.listener[name]()
        }
        dispatch('getBetsList')
        dispatch('getDrawHistory')
    },

    updateLuckyCoinPage ({ dispatch }) {
        dispatch('updateBets')
        dispatch('getRecentBets')
    },

    showMyWin ({ commit }, params) {
        return commit('showMyWin', params)
    },

    hideMyWin ({ commit, dispatch }, params) {
        commit('hideMyWin', params)
        dispatch('showProfitCallback', {
            expectid: this.state.cs_luckycoin.selfWin.exceptId,
            lotid: '2'
        })
    },

    getDetailData ({ commit }, params = {}) {
        return ajax.get('/draw/goods/detail', params)
    },
    getAllBids ({ commit }, params = {}) {
        return ajax.get('/get/total/bids', params)
    },
    getMyBids ({ commit }, params = {}) {
        return ajax.get('/get/personal/bids', params)
    }
}

export default { state, mutations, actions, namespaced: true }
