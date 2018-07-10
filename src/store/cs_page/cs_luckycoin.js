// 一元夺币 modules
import ajax from '~common/ajax'

const state = {
    betsList: [],
    drawHistoryList: [],
    recentBetsList: []
}

const mutations = {

    // websocket 推送更新投注列表某一注
    updateBet (newBet) {
        this.betsList.map((bet, index) => {
            if (bet.expectId === newBet.expectId) {
                this.betsList[index] = {
                    ...bet,
                    ...newBet
                }
            }
        })
        this.betsList = [...this.betsList]
    },
    // 更新投注列表
    updateBets (newBets) {
        this.betsList = [...newBets]
    },
    // 更新最新投注
    updateRecentBet (bet) {
        let newRecentBetList = [...this.recentBetsList]
        this.recentBetsList = [...bet.concat(newRecentBetList)].slice(0, 7)
    },
    // 更新最近投注列表
    updateRecentBets (bets) {
        this.recentBetsList = [...bets]
    },
    // 更新历史投注列表
    updateDrawHistory (bets) {
        this.drawHistoryList = [...bets]
    }
}

const actions = {
    // 加载最近投注
    async getRecentBets ({ commit }, params = {}) {
        let data = await ajax.get('/getRecentBets', {
            ...params,
            pageno: '1',
            pagesize: '7'
        })
        commit('updateRecentBets', data.orders)
    },

    // 加载投注列表
    async getBetsList  ({ commit }, params = {}) {
        let data = await ajax.get('/getBetsList', {
            ...params,
            pageno: '1',
            pagesize: '7'
        })
        commit('updateBets', data.goods)
    },

    // 加载投注获奖列表
    getDrawHistory  ({ commit }, params = {}) {
        return ajax.get('/getDrawHistory', params)
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

export default { state, mutations, actions }
