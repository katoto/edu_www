<script>
import { accAdd } from '~common/util'
export default {
    data () {
        return {
            nameArr: ['red', 'black', 'joker', 'spade', 'heart', 'clubs', 'dianmond', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
            currentCoin: 0.0001,
            betNums: {},
            total: 0
        }
    },
    methods: {
        addCoin (name) {
            this.betNums[name] = accAdd(this.betNums[name] || 0, this.currentCoin)
            this.total = accAdd(this.total, this.currentCoin)
        },
        clearBet () {
            this.betNums = {}
            this.total = 0
        },
        bet () {
            let data = {...this.betNums}
        }
    }
}
</script>
