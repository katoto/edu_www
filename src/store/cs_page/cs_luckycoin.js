// 一元夺币 modules
import ajax from '~common/ajax'

const state = {
    betsList: [{
        state: '1',
        image: '',
        goodsValue: '1800.0',
        goodsType: '2001',
        totalBids: '200',
        bidValue: '0.02',
        leftBids: '30',
        isbet: '1',
        ishot: '1'
    }, {
        state: '1',
        image: '',
        goodsValue: '20000.0',
        goodsType: '1001',
        totalBids: '100',
        bidValue: '0.02',
        leftBids: '20',
        isbet: '1',
        ishot: '1'
    }, {
        state: '1',
        image: '',
        goodsValue: '20000.0',
        goodsType: '2001',
        totalBids: '250',
        bidValue: '0.02',
        leftBids: '40',
        isbet: '1',
        ishot: '1'
    }, {
        state: '1',
        image: '',
        goodsValue: '20000.0',
        goodsType: '1001',
        totalBids: '150',
        bidValue: '0.02',
        leftBids: '50',
        isbet: '1',
        ishot: '1'
    }, {
        state: '1',
        image: '',
        goodsValue: '20000.0',
        goodsType: '2001',
        totalBids: '300',
        bidValue: '0.02',
        leftBids: '100',
        isbet: '1',
        ishot: '0'
    }, {
        state: '1',
        image: '',
        goodsValue: '20000.0',
        goodsType: '1001',
        totalBids: '200',
        bidValue: '0.02',
        leftBids: '30',
        isbet: '1',
        ishot: '0'
    }, {
        state: '1',
        image: '',
        goodsValue: '20000.0',
        goodsType: '2001',
        totalBids: '200',
        bidValue: '0.02',
        leftBids: '30',
        isbet: '1',
        ishot: '0'
    }],
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
    recentBetsList: [
        {
            cointype: '2001',
            username: '20321****@qq.com',
            betmoney: '0.05',
            crtime: '156732231'
        },
        {
            cointype: '1001',
            username: '120831070@qq.com',
            betmoney: '333.05',
            crtime: '156732231'
        },
        {
            cointype: '2001',
            username: '20321****@qq.com',
            betmoney: '0.05',
            crtime: '156732231'
        },
        {
            cointype: '2001',
            username: '20321****@qq.com',
            betmoney: '0.05',
            crtime: '156732231'
        },
        {
            cointype: '2001',
            username: '20321****@qq.com',
            betmoney: '0.05',
            crtime: '156732231'
        },
        {
            cointype: '2001',
            username: '20321****@qq.com',
            betmoney: '0.05',
            crtime: '156732231'
        },
        {
            cointype: '2001',
            username: '20321****@qq.com',
            betmoney: '0.05',
            crtime: '156732231'
        }
    ]
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
    async getBetsList ({ commit }, params = {}) {
        let data = await ajax.get('/getBetsList', {
            ...params,
            pageno: '1',
            pagesize: '7'
        })
        commit('updateDrawHistory', data.goods)
    },

    // 加载投注获奖列表
    async getDrawHistory ({ commit }, params = {}) {
        let data = await ajax.get('/draw/records/list', {
            ...params,
            pageno: '1',
            pagesize: '4'
        })
        commit('updateBets', data.goods)
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
