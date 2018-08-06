<template>
    <!--match-popular/match-common-->
    <div class="match"  :class="[
                        isPopular? 'match-popular' : 'match-common',
                        isInit && !isCancel ? '' : 'unvisible',
          ]">
        <!-- hot bet-->
        <div class="icon-box "  :class="[isHot? 'hot' : '', isBet? 'bet':'']">
            <i class="icon-hot">H</i>
            <i class="icon-youbet">You Bet</i>
        </div>
        <!--match-eth/match-btc-->
        <div class="match-img" :class="[coin.boxClass]">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="102" height="102">
                <defs>
                    <linearGradient x1="1" y1="0" x2="0" y2="0" id="yellowColor1">
                        <stop offset="0%" stop-color="#f7aa17"></stop>
                        <stop offset="100%" stop-color="#f19221"></stop>
                    </linearGradient>
                    <linearGradient x1="1" y1="0" x2="0" y2="0" id="yellowColor2">
                        <stop offset="0%" stop-color="#ef8a25"></stop>
                        <stop offset="100%" stop-color="#f19221"></stop>
                    </linearGradient>
                </defs>
                <g transform="matrix(0,-1,1,0,0,102)">
                    <circle cx="51" cy="51" r="47" stroke-width="8" stroke="rgba(255,255,255,0.05)" fill="transparent"/>
                    <circle
                        cx="51"
                        cy="51"
                        r="47"
                        stroke="url(#yellowColor1)"
                        stroke-width="8"
                        fill="transparent"
                        :stroke-dasharray="`${rate>148?rate:0} 296`"
                    />
                    <circle
                        cx="51"
                        cy="51"
                        r="47"
                        stroke="url(#yellowColor2)"
                        stroke-width="8"
                        fill="transparent"
                        :stroke-dasharray="`${rate > 148 ? 148 : rate} 296`"
                    />
                </g>
                <!--
                   stroke-dasharray   //2*3.14*47=296
                   绘制虚线: 一个参数时： 表示一段虚线长度和每段虚线之间的间距
                   两个参数或者多个参数时：一个表示长度，一个表示间距
                   stroke-dashoffset: 偏移位置
                   0% -> 296
                   100% -> 296 296
                   148/296
                   form:https://www.zhangxinxu.com/wordpress/2015/07/svg-circle-loading/
                   -->
            </svg>
        </div>
        <!--奖金-->
        <p class="match-prize" v-if="isPopular">
            {{ _('Play For {0}', this.betData.goodsValue) }}<i> {{ coinText }}</i>
        </p>
        <p class="match-prize" v-else>
            {{ this.betData.goodsValue }}<i> {{ coinText }}</i>
        </p>
        <!--价值-->
        <p class="match-usd" v-html="goodsPrice">
            0
        </p>
        <!--期号-->
        <p class="match-issue">
            NO.{{betData.exceptId}}
        </p>
        <!--进度-->
        <p class="match-process">
            <lang>Draw Process:</lang>
            {{ this.betData.totalBids - this.betData.leftBids }}/{{ this.betData.totalBids }}
        </p>
        <!--价格-->
        <p class="match-price">
            <lang>Ticket Price:</lang>
            {{ this.betData.bidValue }}&nbsp;{{ coinText }}
        </p>
        <a href="javascript:;" class="match-btn waiting" v-if="isWaiting">
            <lang>Waiting</lang>
        </a>
        <a href="javascript:;" class="match-btn btn-pause" v-else-if="isPause">
            <lang>Pause Bet</lang>
        </a>
        <a href="javascript:;" class="match-btn btn-pause" v-else-if="isExpired">
            <lang>Expired</lang>
        </a>
        <a href="javascript:;" class="match-btn" v-else @click="openBetWindow">
            <lang>Bet Now</lang>
        </a>
        <!--投注状态-->
        <!--show-->
        <div class="bet- bet-normal " :class="{show:windowClass === 'normal'}">
            <a href="javascript:;" class="bet-close" @click="closeWindow"></a>
            <div class="bet-t">
                <span>Bid for</span> 0.5 <i>BTC</i>
            </div>
            <p class="bet-m1">
                Bet Amount
            </p>
            <p class="bet-m2">
                more bets，more probability
            </p>
            <!--icon-eth/icon-btc-->
            <div class="input-box icon-eth">
                <input type="text" v-model="betValue">
                <a href="javascript:;" @click="chooseHalf">1/2</a>
                <a href="javascript:;" @click="chooseDouble">2X</a>
                <a href="javascript:;" ref="maxBtn" @click="chooseMax">Max</a>
            </div>
            <a href="javascript:;" class="btn-bet"  @click="handleBetEvent" :class="{ blinking: this.isBlinking, disabled: this.disableBet }">
                {{ this.isBlinking ? _('Amount changes') : _('Pay Now') }}
            </a>
        </div>
        <div class="bet- bet-success " :class="{show:windowClass === 'success'}">
            <a href="javascript:;" class="bet-close" @click="closeWindow"></a>
            <div class="bet-icon"></div>
            <p class="bet-t">
                Bet Success
            </p>
            <p class="bet-m">
                {{ _('You get five numbers obtained bonus {0}{1}. The more bets, the higher the probability of winning, I wish you good luck~', this.betData.goodsValue, this.coinText) }}
            </p>
            <div class="btn-box">
                <router-link :to="{path: '/luckycoin/moreBids'}" class="bet-btnV">
                    <lang>View Number</lang>
                </router-link>
                <a href="javascript:;" class="bet-btnB" @click="handleBetMoreEvent">
                    <lang>Bet More</lang>
                </a>
            </div>
        </div>
        <div class="bet- bet-fail " :class="{show:windowClass === 'fail'}">
            <a href="javascript:;" class="bet-close" @click="closeWindow"></a>
            <div class="bet-icon"></div>
            <p class="bet-t">
                Bet failure
            </p>
            <p class="bet-m">
                Temporarily unavailable due to network reasons
            </p>
            <a href="javascript:;" class="btn-fail" @click="closeWindow">
                <lang>Try Again Later</lang>
            </a>
        </div>
        <div class="bet- bet-balance " :class="{show:windowClass === 'balance'}">
            <a href="javascript:;" class="bet-close" @click="closeWindow"></a>
            <div class="bet-icon"></div>
            <p class="bet-t">
                Insufficient Balance
            </p>
            <p class="bet-m">
                {{ _('Your balance is less than {0}{1}. If you need to bet, please top up first.', this.minValue, this.coinText) }}
            </p>
            <a href="javascript:;" class="btn-balance" @click="closeWindow">
                Deposit
            </a>
        </div>
    </div>
</template>

<script>
    import {formateCoinType, numberComma, accDiv, accMul} from '~/common/util'
    import {mapActions, mapState} from 'vuex'

    let defaultValue = {
        state: '-1',
        image: '',
        coinprice: {
            USD: '0'
        },
        goodsValue: '0',
        goodsType: '2001',
        totalBids: '0',
        bidValue: '0.01',
        leftBids: '0',
        isbet: '0',
        ishot: '0'
    }
    export default {
        data () {
            return {
                windowClass: '',
                betValue: 0,
                isBlinking: false,
                blinkTime: 2300,
                betData: {
                    ...defaultValue
                },
                isInit: false,
                errorMessage: '',
                isCancel: false
            }
        },
        props: {
            bet: {
                type: Object,
                default: function () {
                    return {
                        ...defaultValue
                    }
                }
            },
            'is-popular': {
                default: false,
                type: Boolean
            },
            type: {
                type: String,
                default: ''
            }
        },
        methods: {
            ...mapActions('cs_luckycoin', ['betNow']),
            ...mapActions(['getUserInfo']),
            clearBetStatus () {
                // 触发最小按钮点击事件, 重置投注金额
                // this.$refs.minBtn.click()
            },
            openBetWindow () {
                this.clearBetStatus()
                if (!this.isLogin) {
                    this.$store.commit('showLoginPop')
                    return
                }
                if (!this.isEnoughBalance()) {
                    this.openRechargeWindow()
                    return
                }
                this.windowClass = 'normal'
            },
            openFailureWindow (msg) {
                this.errorMessage = msg
                this.windowClass = 'fail'
            },
            openSuccessWindow () {
                this.windowClass = 'success'
            },
            openRechargeWindow () {
                this.windowClass = 'balance'
            },
            closeWindow () {
                this.windowClass = ''
            },
            chooseMin () {
                this.betValue = this.minValue
            },
            chooseMax () {
                this.betValue = this.maxValue
            },
            chooseHot () {
                this.betValue = this.hotValue
            },
            chooseHalf () {
                if (this.betValue / 2 >= this.minValue) {
                    this.betValue = this.formatBidValue(this.betValue / 2)
                } else if (this.betValue > this.minValue) {
                    this.betValue = this.minValue
                }
            },
            chooseDouble () {
                if (this.betValue * 2 <= this.maxValue) {
                    this.betValue = this.formatBidValue(this.betValue * 2)
                } else if (this.betValue < this.maxValue) {
                    this.betValue = this.maxValue
                }
            },
            async handleBetEvent () {
                if (this.disableBet || this.isBlinking) {
                    return
                }
                try {
                    let data = await this.betNow({
                        cointype: this.coinType,
                        codestr: `${this.betData.exceptId}|${this.coinType}|${accDiv(this.betValue, this.betData.bidValue)}|${this.betData.bidValue}`
                    })
                    this.getUserInfo()
                    this.openSuccessWindow()
                } catch (errorData) {
                    this.openFailureWindow(errorData.message)
                }
            },
            handleBetMoreEvent () {
                if (this.isBlinking) {
                    this.isBlinking = false
                }
                this.closeWindow()
                setTimeout(() => {
                    if (Number(this.betData.state) === 1 && this.maxValue !== 0) {
                        this.openBetWindow()
                    }
                }, 200)
            },
            formatBidValue (value) {
                let minValue = this.betData.bidValue
                if (value && minValue && value >= 0 && minValue >= 0) {
                    return (
                        minValue >= value
                            ? minValue
                            : accMul(Math.floor(accDiv(value, minValue)), minValue)
                    )
                }
                return value
            },
            formatBetData (bet) {
                return {
                    ...this.bet,
                    bidValue: Number(this.bet.bidValue),
                    leftBids: Number(this.bet.leftBids),
                    goodsValue: Number(this.bet.goodsValue),
                    totalBids: Number(this.bet.totalBids)
                }
            },
            isEnoughBalance () {
                return this.balance >= this.betData.bidValue
            },
            blink () {
                this.isBlinking = true
                setTimeout(() => {
                    this.isBlinking = false
                }, this.blinkTime)
            },
            init () {
                if (this.betValue === 0) {
                    // 默认投注金额 为最小投注金额
                    this.betValue = this.betData.bidValue
                }
            },
            isChangeExpect (newbet) {
                return Number(this.betData.exceptId) !== Number(newbet.exceptId)
            }
        },
        computed: {
            ...mapState({
                userInfo: state => state.userInfo,
                isLogin: state => !!state.isLog
            }),
            balance () {
                if (this.userInfo && this.userInfo.accounts && this.userInfo.accounts.length > 0) {
                    let accounts = this.userInfo.accounts
                    for (let index = 0; index < accounts.length; index++) {
                        let account = accounts[index]
                        if (account.cointype === this.coinType) {
                            return Number(account.balance)
                        }
                    }
                }
                return 0
            },
            coinType () {
                return this.betData.goodsType || '2001'
            },
            coinText () {
                return formateCoinType(this.coinType)
            },
            isHot () {
                return this.betData.ishot === '1'
            },
            isBet () {
                return this.betData.isbet === '1'
            },
            isWaiting () {
                return this.betData.state === '3'
            },
            isPause () {
                return this.betData.state === '2'
            },
            isExpired () {
                return this.betData.state === '5'
            },
            goodsPrice () {
                for (let keyname in this.betData.coinprice) {
                    if (keyname) {
                        return `${keyname}&ensp;${this.betData.coinprice[keyname]}`
                    }
                }
                return '<br>'
            },
            coin () {
                return {
                    'ETH': {
                        boxClass: 'match-eth'
                    },
                    'BTC': {
                        boxClass: 'match-btc'
                    }
                }[this.coinText]
            },
            minValue () {
                return this.betData.bidValue
            },
            maxValue () {
                let maxBidNum = accMul(this.betData.leftBids, this.betData.bidValue)
                return this.formatBidValue(
                    this.balance > maxBidNum ? maxBidNum : this.balance
                )
            },
            hotValue () {
                return this.formatBidValue(this.maxValue / 2)
            },
            rate () {
                let total = this.betData.totalBids
                let left = this.betData.leftBids
                return (
                    total === 0 && left === 0
                        ? 0
                        : parseInt((total - left) / total * 296)
                )
            },
            activeBetClass () {
                let betValue = Number(this.betValue)
                if (betValue === this.maxValue) {
                    return 'max'
                } else if (betValue === this.hotValue) {
                    return 'hot'
                } else if (betValue === this.minValue) {
                    return 'min'
                }
                return ''
            },
            disableBet () {
                return ((Number(this.betValue) !== this.formatBidValue(this.betValue)) || Number(this.betValue) > this.maxValue)
            }
        },
        watch: {
            bet: function (newBet) {
                this.betData = this.formatBetData(this.bet)
                if (this.isInit) {
                    this.isCancel = (this.bet.state === '-1')
                    // websocket 推送更新导致bet数据改变
                    if (this.windowClass === 'normal') {
                        // 如果用户正在打开投注弹窗，闪动按钮和变化文字
                        if (this.isWaiting) {
                            this.closeWindow()
                        }
                        this.clearBetStatus()
                        this.blink()
                        setTimeout(() => {
                            if (this.isChangeExpect(newBet)) {
                                this.closeWindow()
                            }
                        }, this.blinkTime)
                    }
                } else {
                    // 首次加载
                    this.isInit = true
                    this.init()
                }
            },
            isLogin: function () {
                this.disableBet = ((Number(this.betValue) !== this.formatBidValue(this.betValue)) || Number(this.betValue) > this.maxValue)
            }
        },
        mounted () {
            // 组件默认数据
            this.betData = this.formatBetData(this.bet)
            if (this.type === 'list') {
                this.isInit = true
            }
        }
    }
</script>

<style lang="less" scoped type="text/less">
    .unvisible {
        visibility: hidden;
    }

    .blinking {
        transition: 0.5s all;
        animation: blinking 2s;
        background-color: gray !important;
        cursor: default;
    }

    .disabled {
        background-color: gray !important;
        cursor: default;
    }

    @keyframes blinking {
        0% {
            opacity: 1;
        }
        12.5% {
            opacity: 0;
        }
        25% {
            opacity: 1;
        }
        37.5% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        62.5% {
            opacity: 0;
        }
        75% {
            opacity: 1;
        }
        87.5% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
