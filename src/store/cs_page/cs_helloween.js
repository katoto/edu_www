// 一元夺币 modules
import ajax from '~common/ajax'

const state = {
}

const mutations = {
}

const actions = {
    getGhosts ({commit}, params) {
        return ajax.get('/getGhosts', params)
            .catch(() => {
                let arr = []
                for (let i = 0; i < 10; i++) {
                    arr.push({
                        total_prize: 7.5,
                        hit_prize: 0,
                        hit: 1.5,
                        monster_type: Math.floor(Math.random() * 3).toString(),
                        monster_id: Math.random()
                    })
                }
                return {
                    data: {
                        last_time: Date.now() + 20 * 3600 * 1000,
                        slot: [...arr],
                        lucky: [...arr],
                        poker: [...arr],
                        luckycoin: [...arr]
                    }
                }
            })
    }
}

export default { state, mutations, actions, namespaced: true }
