<template>
    <!--icon-hot  热门icon  icon-win -->
    <div :class="[
        isOn ? 'on' : '',
        isPopular ? 'item-popular' :'item-common',
        isHot ? 'icon-hot' : '',
        isBet ? 'icon-mybet' : '',
        isInit && !isCancel ? '' : 'unvisible',
        coin.bgClass]"
    >
        <!--<p class="expectid" style="position: absolute;left:10px;top:2px;color:#a99acc;">{{betData.exceptId}}</p>-->
        <!--token-bth  币种选择-->
        <!--token-eth-->
        <div class="token-process" :class="[coin.boxClass]">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="102" height="102">
                <defs>
                    <linearGradient x1="1" y1="0" x2="0" y2="0" id="yellowColor1">
                        <stop offset="0%" stop-color="#e46b12"></stop>   <!--这个是终点-->
                        <stop offset="100%" stop-color="#fdc90c"></stop>
                    </linearGradient>
                    <linearGradient x1="1" y1="0" x2="0" y2="0" id="yellowColor2">
                        <stop offset="0%" stop-color="#fdc90c"></stop>
                        <stop offset="100%" stop-color="#f9c600"></stop>
                    </linearGradient>
                    <linearGradient x1="1" y1="0" x2="0" y2="0" id="blueColor1">
                        <stop offset="0%" stop-color="#62f7d9"></stop>
                        <stop offset="100%" stop-color="#5ed9eb"></stop>
                    </linearGradient>
                    <linearGradient x1="1" y1="0" x2="0" y2="0" id="blueColor2">
                        <stop offset="0%" stop-color="#53b8f0"></stop>
                        <stop offset="100%" stop-color="#5ed9eb"></stop>
                    </linearGradient>
                </defs>
                <g transform="matrix(0,-1,1,0,0,102)">
                    <circle
                        cx="51"
                        cy="51"
                        r="47"
                        stroke-width="8"
                        stroke="#57356b"
                        fill="transparent"/>
                    <!-- 底色圆 -->
                    <circle
                        cx="51"
                        cy="51"
                        r="47"
                        :stroke="`url(#${coin.circleClass[0]})`"
                        stroke-width="8"
                        fill="transparent"
                        stroke-linecap='round'
                        :stroke-dasharray="`${rate} 296`"
                        v-if="rate > 148"/>
                    <!-- 左半边圆 -->
                    <circle
                        cx="51"
                        cy="51"
                        r="47"
                        :stroke="`url(#${coin.circleClass[1]})`"
                        stroke-width="8"
                        fill="transparent"
                        stroke-linecap='round'
                        :stroke-dasharray="`${rate > 148 ? 148 : rate} 296`"
                        v-if="rate !== 0"/>
                    <!-- 右半边圆 -->
                </g>
            </svg>
        </div>
        <div class="title">
            <p class="t1" v-if="isPopular">
                {{ _('Play For {0}', this.betData.goodsValue) }}<i>{{ coinText }}</i>
            </p>
            <p class="t1" v-else>
                {{ this.betData.goodsValue }}<i>{{ coinText }}</i>
            </p>
            <div class="row-msg">
                <p class="t2" v-html="goodsPrice"></p>
                <i class="icon-bet">You Bet</i>
            </div>
        </div>
        <div class="msg">
            <p class="c1">
                <lang>Draw Process:</lang>
                <i>{{ this.betData.totalBids - this.betData.leftBids }}/{{ this.betData.totalBids }}</i>
            </p>
            <p class="c2">
                <lang>Ticket Price:</lang>
                <i>{{ this.betData.bidValue }}{{ coinText }}</i>
            </p>
        </div>
        <a href="javascript:;" class="btn btn-waiting" v-if="isWaiting">
            <lang>Waiting</lang>
        </a>
        <a href="javascript:;" class="btn btn-pause" v-else-if="isPause">
            <lang>Pause Bet</lang>
        </a>
        <a href="javascript:;" class="btn btn-pause" v-else-if="isExpired">
            <lang>Expired</lang>
        </a>
        <a href="javascript:;" class="btn" v-else @click="openBetWindow">
            <lang>Bet Now</lang>
        </a>
        <!--投注-->
        <!--normal success fail balance-->
        <div class="bg2-betting"></div>
        <div class="betting" :class="[windowClass]">
            <div class="bg-betting">
                <a href="javascript:;" class="bet-close" @click="closeWindow"></a>
                <!--正常投注-->
                <div class="bet-normal">
                    <div class="bet-t">
                        <lang>Bid For {{ this.betData.goodsValue }} {{ coinText }}</lang>
                    </div>
                    <p class="bet-m">
                        <lang>more bets，more probability</lang>
                    </p>
                    <div class="bet-amount" :class="[activeBetClass]">
                        <a href="javascript:;" ref="minBtn" class="min-btn" @click="chooseMin">{{ minValue }}</a>
                        <a href="javascript:;" ref="hotBtn" class="hot-btn" @click="chooseHot">{{ hotValue }}</a>
                        <a href="javascript:;" ref="maxBtn" class="max-btn" @click="chooseMax">{{ maxValue }}</a>
                    </div>
                    <div class="bet-input">
                        <a href="javascript:;" class="redu" @click="chooseHalf">1/2</a>
                        <input type="text" v-model="betValue">
                        <a href="javascript:;" class="add" @click="chooseDouble">x2</a>
                    </div>
                    <a href="javascript:;" class="bet-btn" @click="handleBetEvent" :class="{ blinking: this.isBlinking, disabled: this.disableBet }">
                        {{ this.isBlinking ? _('Amount changes') : _('Pay Now') }}
                    </a>
                </div>
                <!--投注成功-->
                <div class="bet-success">
                    <div class="bet-icon"></div>
                    <div class="bet-t">
                        <lang>Bet Success</lang>
                    </div>
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
                <!--投注失败-->
                <div class="bet-fail">
                    <div class="bet-icon"></div>
                    <div class="bet-t">
                        <lang>Bet failure</lang>
                    </div>
                    <p class="bet-m">
                        <lang>{{ errorMessage }}</lang>
                    </p>
                    <a href="javascript:;" class="bet-fail" @click="closeWindow">
                        <lang>Try Again Later</lang>
                    </a>
                </div>
                <!--余额不足-->
                <div class="bet-balance">
                    <div class="bet-icon"></div>
                    <div class="bet-t">
                        <lang>Insufficient Balance</lang>
                    </div>
                    <p class="bet-m">
                        {{ _('Your balance is less than {0}{1}. If you need to bet, please top up first.', this.minValue, this.coinText) }}
                    </p>
                    <div class="btn-box">
                        <a href="javascript:;" class="bet-btnT" @click="closeWindow">
                            <lang>Try Again Later</lang>
                        </a>
                        <router-link :to="{path: '/account/deposit'}" class="bet-btnR">
                            <lang>Recharge</lang>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formateCoinType, numberComma, accDiv, accMul } from '~/common/util'
import { mapActions, mapState } from 'vuex'
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
    ishot: '0',
    isOn:'0'
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
            disableBet: false,
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
            this.$refs.minBtn.click()
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
            this.isOn = true
            this.windowClass = 'normal'
        },
        openFailureWindow (msg) {
            this.isOn = true
            this.errorMessage = msg
            this.windowClass = 'fail'
        },
        openSuccessWindow () {
            this.isOn = true
            this.windowClass = 'success'
        },
        openRechargeWindow () {
            this.isOn = true
            this.windowClass = 'balance'
        },
        closeWindow () {
            if (!this.isBlinking) {
                this.isOn = false
                this.windowClass = ''
            }
        },
        chooseMin (event) {
            this.betValue = this.minValue
        },
        chooseMax (event) {
            this.betValue = this.maxValue
        },
        chooseHot (event) {
            this.betValue = this.hotValue
        },
        chooseHalf (event) {
            if (this.betValue / 2 >= this.minValue) {
                this.betValue = this.formatBidValue(this.betValue / 2)
            } else if (this.betValue > this.minValue) {
                this.betValue = this.minValue
            }
        },
        chooseDouble (event) {
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
                    return `${keyname}${this.betData.coinprice[keyname]}`
                }
            }
            return '<br>'
        },
        coin () {
            return {
                'ETH': {
                    bgClass: 'bg1',
                    boxClass: 'token-eth',
                    circleClass: ['blueColor1', 'blueColor2']
                },
                'BTC': {
                    bgClass: 'bg2',
                    boxClass: 'token-bth',
                    circleClass: ['yellowColor1', 'yellowColor2']
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
        betValue: function (val) {
            this.disableBet = ((Number(val) !== this.formatBidValue(val)) || Number(val) > this.maxValue)
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

<style lang="less" scoped>
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
        12.5%{
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
