// 一元夺币 modules
import ajax from '~common/ajax'

const state = {
    betsList: [],
    drawHistoryList: [
        {
            state: '1',
            image: '',
            goodsValue: '10432',
            goodsType: '1001',
            totalBids: '200',
            bidValue: '0.02',
            luckyNum: '1000192',
            winUserName: '4637***3@qq.com',
            crtime: '156732231'
        },
        {
            state: '1',
            image: '',
            goodsValue: '10432',
            goodsType: '1001',
            totalBids: '200',
            bidValue: '0.02',
            luckyNum: '1000192',
            winUserName: '4637***3@qq.com',
            crtime: '156732231'
        },
        {
            state: '4',
            image: '',
            goodsValue: '10432',
            goodsType: '2001',
            totalBids: '200',
            bidValue: '0.02',
            luckyNum: '1000192',
            winUserName: '4637***3@qq.com',
            crtime: '156732231'
        },
        {
            state: '4',
            image: '',
            goodsValue: '10432',
            goodsType: '2001',
            totalBids: '200',
            bidValue: '0.02',
            luckyNum: '1000192',
            winUserName: '4637***3@qq.com',
            crtime: '156732231'
        }
    ],
    recentBetsList: []
}

const mutations = {

    // websocket 推送更新投注列表某一注
    updateBet (state, newBet) {
        state.betsList.map((bet, index) => {
            if (bet.expectId === newBet.expectId) {
                state.betsList[index] = {
                    ...bet,
                    ...newBet
                }
            }
        })
        state.betsList = [...state.betsList]
    },
    // 更新投注列表
    updateBets (state, newBets) {
        if (newBets && newBets.length > 0) {
            state.betsList = [...newBets]
        }
    },
    // 更新最新投注
    updateRecentBet (state, bet) {
        if (bet && bet.length > 0) {
            let newRecentBetList = [...state.recentBetsList]
            state.recentBetsList = [...bet.concat(newRecentBetList)].slice(0, 7)
        }
    },
    // 更新最近投注列表
    updateRecentBets (state, bets) {
        if (bets && bets.length > 0) {
            state.recentBetsList = [...bets]
        }
    },
    // 更新历史投注列表
    updateDrawHistory (state, bets) {
        if (bets && bets.length > 0) {
            state.drawHistoryList = [...bets]
        }
    }
}

const actions = {
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
        commit('updateDrawHistory', data.data.goods)
    },

    updateBetsAndDraw ({ dispatch }) {
        dispatch('getDrawHistory')
        dispatch('getBetsList')
    },

    updateLuckyCoinPage ({ dispatch }) {
        dispatch('updateBetsAndDraw')
        dispatch('getRecentBets')
    }
}

export default { state, mutations, actions, namespaced: true }
