<template>
    <div class="dapp-contain" v-if="roundInfo && selfMsg">
        <div>
            <p>期号： {{ roundInfo.roundIndex }} </p>
            当前奖池 {{ formateBalance(roundInfo.jackpot) }}
            剩余时间 {{ nowFormateTime }} <br />
            已有 {{ roundInfo.tickets }} 人次购买 <br />
            剩 {{ 1500 - roundInfo.tickets }} 票数
            <!-- 多少人参与 {{ playernums }}  <br /> -->
            当前价格 {{ currTicketPrice }}

            当前拥有票数  {{ selfMsg.tickets }}
            你有多少收益  {{ parseFloat(selfMsg.win) + parseFloat(selfMsg.calcTicketEarn) + parseFloat(selfMsg.aff_invite) }}

            分红收益：{{ selfMsg.calcTicketEarn }}
            邀请收益： {{ selfMsg.aff_invite }}
            中奖收益： {{ selfMsg.win }}
            总收益：{{ parseFloat(selfMsg.win) + parseFloat(selfMsg.calcTicketEarn) + parseFloat(selfMsg.aff_invite) }}

            {{ selfMsg }}
            <input placeholder="输入邀请名字" v-model="beforeInviteName" /> 
            <hr>
            <button @click="getRandomName" style="width:100px;height:50px">随机名字</button>
            <button @click="registerName" style="width:100px;height:50px">买名字</button>

            <div>your promotion link  </div>

        </div>
        <div v-if="roundInfo">
            {{ roundInfo.startTime}}
            {{ roundInfo.endTime}}
            {{ roundInfo.nextpot}}
            {{ roundInfo.luckNum}}
            {{ roundInfo.mask}}
            {{ roundInfo.winner}}
            {{ roundInfo.ended}}
        </div>
        <router-link :to="{path:'/lucky11'}"></router-link>

        <button @click="buyNum" style="width:100px;height:50px">购买</button>

    </div>
</template>

<script>
    import {mTypes, aTypes} from '~/store/cs_page/dappCoin'
    import {
        copySucc,
        copyError,
        formateBalance,
        formateCoinType,
        formatTime
    } from '~common/util'
    import {coinAffAddr} from '~common/dappConfig.js'
    import Vue from 'vue'
    import vueClipboard from 'vue-clipboard2'
    import {web3, luckyCoinApi} from '~/dappApi/luckycoinApi'

    Vue.use(vueClipboard)
    export default {
        data () {
            return {
                beforeInviteName: null, // 准备邀请的名字  注册的名字
                showFirstBaxi: false, // 首次提示
                selfAddr: null,
                isFromFlag: false, // 是否是来自邀请
                tickNum: 1, // 购买票数
                roundInfo: null, // getcurrentRoundInfo msg
                selfMsg: null,
                timeLeft: null, // 剩余时间
                nowFormateTime: null, // 格式化的时间
                nowTimeInterval: null,
                currTicketPrice: null, // 单价
                allTicketPrice: null
            }
        },
        watch: {
            isLog (val) {
                /* 切换登陆态之后改变状态 */
                this.changePageState()
            }
        },
        methods: {
            copySucc,
            copyError,
            formateBalance,
            formatTime,
            isVerifyName (name) {
                let regaz = /^[a-z0-9\-\s]+$/
                let regonlyNum = /^[0-9]+$/
                return name.length <= 32 && regaz.test(name) && !regonlyNum.test(name) && name.indexOf(' ') === -1
            },
            getRandomName () {
                let getRandomKey = (list) => {
                    return Math.floor(Math.random() * list.length)
                }
                let randomNameArr = ['ninja', 'truce', 'harj', 'finney', 'szabo', 'gwei', 'laser', 'justo', 'satoshi', 'mantso', '3D', 'inventor', 'theShocker', 'aritz', 'sumpunk', 'cryptoknight', 'randazz', 'kadaz', 'daok', 'shenron', 'notreally', 'thecrypt', 'figures', 'mermaid', 'barnacles', 'dragons', 'jellybeans', 'snakes', 'dolls', 'bushes', 'cookies', 'apples', 'ice cream', 'ukulele', 'kazoo', 'banjo', 'singer', 'circus', 'trampoline', 'carousel', 'carnival', 'locomotive', 'balloon', 'mantis', 'animator', 'artisan', 'artist', 'colorist', 'inker', 'coppersmith', 'director', 'designer', 'flatter', 'stylist', 'leadman', 'limner', 'artist', 'model', 'musician', 'penciller', 'producer', 'scenographer', 'decorator', 'silversmith', 'teacher', 'mechanic', 'beader', 'bobbin', 'cchapel', 'ttendant', 'foreman', 'engineering', 'mechanic', 'miller', 'moldmaker', 'panel beater', 'patternmaker', 'operator', 'plumber', 'sawfiler', 'foreman', 'soaper', 'engineer', 'wheelwright', 'woodworkers']
                let randomNameArr2 = ['adamant', 'adroit', 'amatory', 'animistic', 'antic', 'arcadian', 'baleful', 'bellicose', 'bilious', 'boorish', 'calamitous', 'caustic', 'cerulean', 'comely', 'concomitant', 'contumacious', 'corpulent', 'crapulous', 'defamatory', 'didactic', 'dilatory', 'dowdy', 'efficacious', 'effulgent', 'egregious', 'endemic', 'equanimous', 'execrable', 'fastidious', 'feckless', 'fecund', 'friable', 'fulsome', 'garrulous', 'guileless', 'gustatory', 'harjd', 'heuristic', 'histrionic', 'hubristic', 'incendiary', 'insidious', 'insolent', 'intransigent', 'inveterate', 'invidious', 'irksome', 'jejune', 'jocular', 'judicious', 'lachrymose', 'limpid', 'loquacious', 'luminous', 'mannered', 'mendacious', 'meretricious', 'minatory', 'mordant', 'munificent', 'nefarious', 'noxious', 'obtuse', 'parsimonious', 'pendulous', 'pernicious', 'pervasive', 'petulant', 'platitudinous', 'precipitate', 'propitious', 'puckish', 'querulous', 'quiescent', 'rebarbative', 'recalcitant', 'redolent', 'rhadamanthine', 'risible', 'ruminative', 'sagacious', 'salubrious', 'sartorial', 'sclerotic', 'serpentine', 'spasmodic', 'strident', 'taciturn', 'tenacious', 'tremulous', 'trenchant', 'turbulent', 'turgid', 'ubiquitous', 'uxorious', 'verdant', 'voluble', 'voracious', 'wheedling', 'withering', 'zealous']
                let newRandom = randomNameArr.concat(randomNameArr2)
                this.beforeInviteName = newRandom[getRandomKey(newRandom)]
            },
            async pageInit () {
                // 初始化页面
                this.selfAddr = await luckyCoinApi.getAccounts()
                this.getCurrentRoundInfo()
                this.getPlayerInfoByAddress()
                this.timeLeft = await luckyCoinApi.getTimeLeft()
                this.currTicketPrice = await luckyCoinApi.getBuyPrice()
                this.startTimeLeft()
                window.setInterval(async () => {
                    this.timeLeft = await luckyCoinApi.getTimeLeft()
                }, 10000)
            },
            startTimeLeft () {
                // 倒计时
                this.nowTimeInterval = setInterval(() => {
                    if (this.timeLeft) {
                        if (this.timeLeft === 0) {
                            clearInterval(this.nowTimeInterval)
                        }
                        this.nowFormateTime = this.formatTime(this.timeLeft, 'HH:mm:ss')
                        this.timeLeft--
                    }
                }, 1000)
            },
            async getPlayerInfoByAddress () {
                if (this.selfAddr) {
                    this.selfMsg = await luckyCoinApi.getPlayerInfoByAddress(this.selfAddr)
                } else {
                    console.warn('没有取得地址msg')
                }
            },
            async getCurrentRoundInfo () {
                // 获取页面相关信息
                this.roundInfo = await luckyCoinApi.getCurrentRoundInfo()
            },
            async buyNum () {
                // 购买号码
                let buyBack = null
                let currPrice = await luckyCoinApi.getBuyPrice()
                if (this.currTicketPrice === 0) {
                    console.error('this.currTicketPrice 0')
                    return false
                }
                if (typeof this.tickNum === 'string') {
                    this.tickNum = Number(this.tickNum)
                }
                console.log(currPrice)
                buyBack = await luckyCoinApi.buyXaddr(this.tickNum, this.isFromFlag, this.currTicketPrice * this.tickNum)
                console.log(buyBack)
                console.log('buyBack')
                if (buyBack) {
                    console.log('购买成功')
                }
            },
            async registerName () {
                let buyNameBack = null
                if (!this.beforeInviteName) {
                    alert('请输入名字')
                    return false
                }
                // 判断是否符合规则
                if (!(this.isVerifyName(this.beforeInviteName))) {
                    alert('名字不符合规则')
                    return false
                }
                // 判断是否已经被购买
                this.beforeInviteName = this.beforeInviteName.toString()
                let checkName = await luckyCoinApi.testName(this.beforeInviteName)
                if (checkName) {
                    buyNameBack = await luckyCoinApi.registerNameXaddr(this.beforeInviteName, this.isFromFlag)
                } else {
                    alert('名字已被注册')
                }
            },
            async withdraw () {
                let withdrawBack = await luckyCoinApi.withdraw()
                if (withdrawBack) {
                    console.log('提款成功')
                }
            },
            analysisBuyNum (bigNum) {
                //  解析数值
                let buyNumArr = []
                let startIndex = 1
                let currReduce = null
                let betweenNum = bigNum
                do {
                    currReduce = reduceBigNum(betweenNum)
                    if (!(currReduce.isZero)) {
                        buyNumArr.push(startIndex)
                    }
                    betweenNum = currReduce.bigNum
                    startIndex++
                } while (parseInt(betweenNum) !== 0)
                return buyNumArr
                function reduceBigNum (bigNum) {
                    bigNum = bigNum.toString()
                    let bigNumArr = bigNum.split('')
                    let endNumArr = []
                    let beforeNum = false
                    let currNum = null
                    for (let i = 0; i < bigNumArr.length; i++) {
                        if (isNaN(Number(bigNumArr[i]))) {
                            console.error('bigNum NaN')
                            break
                        }
                        currNum = Number(bigNumArr[i])
                        beforeNum ? endNumArr.push(Math.floor((currNum + 10) / 2)) : endNumArr.push(Math.floor((currNum) / 2))
                        beforeNum = (currNum % 2 === 1)
                    }
                    return {
                        bigNum: endNumArr.join(''),
                        isZero: !beforeNum
                    }
                }
            }
        },
        computed: {
            language () {
                return this.$store.state.language
            }
        },
        components: {
        },
        async mounted () {
            console.log(this.$route.params)
            if (this.$route.params && this.$route.params.inviteName) {
                this.isFromFlag = this.$route.params.inviteName
            } else {
                this.isFromFlag = coinAffAddr
            }
            this.pageInit()
        }
    }
</script>
<style scoped lang="less" type="text/less">
    @import "../../styles/lib-mixins.less";
    @import "../../styles/lib-media.less";
    @import "../../styles/lib-font.less";

    div, a, img, p, span, i {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
    }

</style>
