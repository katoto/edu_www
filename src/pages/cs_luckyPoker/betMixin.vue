<script>
import { accAdd, getElementAbsolutePosition, getElementRelatePosition, getElementCenterPosition } from '~common/util'
export default {
    data () {
        return {
            nameArr: ['red', 'black', 'joker', 'spade', 'heart', 'clubs', 'dianmond', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
            currentCoin: 0.0001,
            currentCoinEl: null,
            betNums: {},
            total: 0,
            coins: []
        }
    },
    methods: {
        getElementAbsolutePosition,
        getElementRelatePosition,
        getElementCenterPosition,
        getPosition (element) {
            let position = this.getElementAbsolutePosition(element, this.$refs.container)
            let center = this.getElementCenterPosition(element, position)
            return {
                transform: `translate(${center.left}px, ${center.top}px)`,
                'z-index': '100000'
            }
        },
        addCoin (name) {
            this.betNums[name] = accAdd(this.betNums[name] || 0, this.currentCoin)
            this.total = accAdd(this.total, this.currentCoin)
            this.coins[this.coins.length - 1].display = 'block'
            let position = this.getPosition(event.target)
            this.$nextTick(() => {
                this.coins[this.coins.length - 1] = {...this.coins[this.coins.length - 1], ...position}
                this.initCoin()
            })
        },
        changeCoin (type) {
            this.currentCoin = Number(type)
            this.currentCoinEl = this.$refs[type]
            let position = this.getPosition(this.currentCoinEl)
            position.display = 'none'
            this.coins[this.coins.length - 1] = position
        },
        clearBet () {
            this.betNums = {}
            this.coins = []
            this.total = 0
            this.initCoin()
        },
        initCoin () {
            let position = this.getPosition(this.currentCoinEl)
            position.display = 'none'
            this.coins = [...this.coins, position]
        },
        bet () {
            let data = {...this.betNums}
        }
    },
    mounted () {
        this.currentCoinEl = this.$refs[this.currentCoin.toString()]
        this.initCoin()
    }
}
</script>
