<script>
import { accAdd, accSub, accDiv, getElementAbsolutePosition, getElementRelatePosition, getElementCenterPosition } from '~common/util'
export default {
    data () {
        return {
            nameArr: ['red', 'black', 'joker', 'spade', 'heart', 'clubs', 'dianmond', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
            currentCoin: 0.0001,
            currentCoinEl: null,
            betNums: {},
            total: 0,
            downTime: 0,
            upTime: 0,
            autoTimer: null,
            calTimer: null,
            coins: [],
            clientSeed: '',
            hashNumber: ''
        }
    },
    methods: {
        getElementAbsolutePosition,
        getElementRelatePosition,
        getElementCenterPosition,
        getCenter ({left, top}) {
            // 减去金币宽度高度
            return {
                left: accSub(left, 12),
                top: accSub(top, 12)
            }
        },
        getRandom (num) {
            return num * Math.random()
        },
        getRandomPosition ({left, top}, width, height) {
            let offsetLeft = Math.ceil(this.getRandom(accDiv(accSub(width, 90), 2)))
            let offsetTop = Math.ceil(this.getRandom(accDiv(accSub(height, 90), 2)))
            return { left: Math.random() > 0.5 ? accAdd(left, offsetLeft) : accSub(left, offsetLeft), top: Math.random() > 0.5 ? accAdd(top, offsetTop) : accSub(top, offsetTop) }
        },
        getPosition (element, isRandom) {
            let position = this.getElementAbsolutePosition(element, this.$refs.container)
            let center = this.getCenter(this.getElementCenterPosition(element, position))
            let realPosition = isRandom ? this.getRandomPosition(center, element.clientWidth, element.clientHeight) : center
            return {
                transform: `translate(${realPosition.left}px, ${realPosition.top}px)`,
                'z-index': '10'
            }
        },
        addCoin (name) {
            let lastCoin = this.coins[this.coins.length - 1]
            this.betNums[name] = accAdd(this.betNums[name] || 0, this.currentCoin)
            this.total = accAdd(this.total, this.currentCoin)
            lastCoin.style.display = 'block'
            lastCoin.type = name
            let position = this.getPosition(this.$refs[`coin_${name}`], true)
            this.$nextTick(() => {
                lastCoin.style = {...lastCoin.style, ...position}
                this.initCoin()
            })
        },
        changeCoin (type) {
            this.currentCoin = Number(type)
            this.currentCoinEl = this.$refs[type]
            this.coins[this.coins.length - 1] = {
                coinType: this.currentCoin,
                style: {
                    display: 'none',
                    ...this.getPosition(this.currentCoinEl)
                }
            }
        },
        clearBet () {
            this.betNums = {}
            this.coins = []
            this.total = 0
            this.initCoin()
        },
        initCoin () {
            this.coins = [...this.coins, {
                coinType: this.currentCoin,
                style: {
                    display: 'none',
                    ...this.getPosition(this.currentCoinEl)
                }
            }]
        },
        bet () {
            let data = {...this.betNums}
        },
        disableContext () {
            document.oncontextmenu = function (e) {
                return false
            }
        },
        coinMouseDown (name) {
            this.downTime = Date.now()
            this.calTimer = setTimeout(() => {
                if (this.upTime === 0) {
                    this.autoTimer = setInterval(() => {
                        this.addCoin(name)
                    }, 500)
                }
            }, 300)
            this.addCoin(name)
        },
        coinMouseUp () {
            this.upTime = Date.now()
            clearInterval(this.autoTimer)
            clearTimeout(this.calTimer)
            this.downTime = 0
            this.upTime = 0
        },
        createRandomNum (num) {
            return Math.floor(Math.random() * 3)
        },
        createClientSeed () {
            let length = 16
            let randomList = ['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0123456789']
            this.clientSeed = ((new Array(length + 1)).join('*').split('').map(() => {
                let index = this.createRandomNum(3)
                let item = randomList[index]
                return item[this.createRandomNum(item.length)]
            }).join(''))
        }
    },
    mounted () {
        this.currentCoinEl = this.$refs[this.currentCoin.toString()]
        this.initCoin()
    },
    created () {
        this.disableContext()
    },
    destroyed () {
        document.oncontextmenu = null
    }
}
</script>
