<template>
    <!--icon-hot  热门icon -->
    <div
        :class="[ isPopular ? 'item-popular' :'item-common', isHot ? 'icon-hot' : '', coin.bgClass]">
        <div :class="{ unvisible: !isInit }">
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
                    <!--
                        stroke-dasharray   //2*3.14*47=296
                        绘制虚线: 一个参数时： 表示一段虚线长度和每段虚线之间的间距
                        两个参数或者多个参数时：一个表示长度，一个表示间距
                        stroke-dashoffset: 偏移位置
                        0% -> 296
                        100% -> 296 296


                        form:https://www.zhangxinxu.com/wordpress/2015/07/svg-circle-loading/
                    -->
                </svg>
            </div>
            <div class="title">
                <p class="t1" v-if="isPopular">
                    {{ _('Play For {0}', this.betData.goodsValue) }} <i>{{ coinText }}</i>
                </p>
                <p class="t1" v-else>
                    {{ this.betData.goodsValue }} <i>{{ coinText }}</i>
                </p>
                <p class="t2">
                    {{ goodsPrice }}
                </p>
            </div>
            <div class="msg">
                <p class="c1">
                    <lang>Draw Process:</lang>
                    <i>{{ this.betData.totalBids - this.betData.leftBids }} / {{ this.betData.totalBids }}</i>
                </p>
                <p class="c2">
                    <lang>Ticket Price:</lang>
                    <i>{{ this.betData.bidValue }} {{ coinText }}</i>
                </p>
            </div>
            <a href="javascript:;" class="btn" @click="openBetWindow">
                <lang>Bet Now</lang>
            </a>
            <!--投注-->
            <!--normal success fail balance-->
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
                        <div class="bet-amount">
                            <a href="javascript:;" ref="minBtn" class="on" @click="chooseMin">{{ minValue }}</a>
                            <a href="javascript:;" ref="hotBtn" @click="chooseHot">{{ hotValue }}</a>
                            <a href="javascript:;" ref="maxBtn" @click="chooseMax">{{ maxValue }}</a>
                        </div>
                        <div class="bet-input">
                            <a href="javascript:;" class="redu">1/2</a>
                            <input type="text" :value="betValue">
                            <a href="javascript:;" class="add">x2</a>
                        </div>
                        <a href="javascript:;" class="bet-btn" @click="handleBetEvent" :class="{ blinking: this.isBlinking }">
                            {{ this.isBlinking ? _('Max changes') : _('Pay Now') }}
                        </a>
                    </div>
                    <!--投注成功-->
                    <div class="bet-success ">
                        <div class="bet-icon"></div>
                        <div class="bet-t">
                            <lang>Bet Success</lang>
                        </div>
                        <p class="bet-m">
                            <lang>You get five numbers obtained bonus 5ETH. The more bets, the higher the probability of winning, I wish you good luck~</lang>
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
                    <div class="bet-fail ">
                        <div class="bet-icon"></div>
                        <div class="bet-t">
                            <lang>Bet failure</lang>
                        </div>
                        <p class="bet-m">
                            <lang>Your balance can be purchased for 0.03ETH. If you need to bet more, please top up first.</lang>
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
                            <lang>Your balance is less than 0.43ETH. If you need to bet, please top up first.</lang>
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
    </div>
</template>

<script>
import { formateCoinType, numberComma } from '~/common/util'
export default {
    data () {
        return {
            windowClass: '',
            betValue: 0,
            isBlinking: false,
            blinkTime: 2300,
            betData: {},
            isInit: false
        }
    },
    props: {
        bet: {
            type: Object,
            default: function () {
                return {
                    state: '1',
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
            }
        },
        'is-popular': {
            default: false,
            type: Boolean
        }
    },
    methods: {
        openBetWindow () {
            this.windowClass = 'normal'
        },
        openFailureWindow () {
            this.windowClass = 'fail'
        },
        openSuccessWindow () {
            this.windowClass = 'success'
        },
        openRechargeWindow () {
            this.windowClass = 'balance'
        },
        closeWindow () {
            if (!this.isBlinking) {
                this.windowClass = ''
            }
        },
        changeMenuStatus () {
            if (event.target.className === 'on') {
                return
            }
            this.$refs.hotBtn.className = ''
            this.$refs.minBtn.className = ''
            this.$refs.maxBtn.className = ''
            event.target.className = 'on'
        },
        chooseMin () {
            this.changeMenuStatus()
            this.betValue = this.minValue
        },
        chooseMax () {
            this.changeMenuStatus()
            this.betValue = this.maxValue
        },
        chooseHot () {
            this.changeMenuStatus()
            this.betValue = this.hotValue
        },
        chooseHalf () {
            this.betValue = this.formatBidValue(
                this.bet.bidValue,
                this.betValue / 2
            )
        },
        chooseDouble () {
            this.betValue = this.formatBidValue(
                this.bet.bidValue,
                this.betValue * 2
            )
        },
        handleBetEvent () {
            if (!this.isBlinking) {
                this.closeWindow()
            }
        },
        handleBetMoreEvent () {
            this.closeWindow()
            setTimeout(() => {
                this.openBetWindow()
            }, 200)
        },
        formatBidValue (minValue, value) {
            if (value && minValue && value > 0 && minValue > 0) {
                return Math.floor(value / minValue) * (minValue * 100000) / 100000
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
        }
    },
    computed: {
        balance () {
            if (this.$store.state && this.$store.state.userInfo && this.$store.state.userInfo.accounts && this.$store.state.userInfo.accounts.length > 0) {
                let accounts = this.$store.state.userInfo.accounts
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
        goodsPrice () {
            for (let keyname in this.betData.coinprice) {
                if (keyname) {
                    return `(${keyname} ${this.betData.coinprice[keyname]})`
                }
            }
            return ''
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
            return this.formatBidValue(
                this.betData.bidValue,
                this.balance > this.betData.goodsValue ? this.betData.goodsValue : this.balance
            )
        },
        hotValue () {
            return this.formatBidValue(
                this.betData.bidValue,
                this.maxValue / 2
            )
        },
        rate () {
            let total = this.betData.totalBids
            let left = this.betData.leftBids
            return (
                total === 0 && left === 0
                    ? 0
                    : parseInt((total - left) / total * 296)
            )
        }
    },
    watch: {
        bet: function () {
            if (this.isInit) {
                // websocket 推送更新导致bet数据改变
                if (this.windowClass === 'normal') {
                    // 如果用户正在打开投注弹窗，闪动按钮和变化文字，并延迟修改数值
                    this.blink()
                    setTimeout(() => {
                        this.betData = this.formatBetData(this.bet)
                    }, this.blinkTime)
                } else {
                    // 如果用户不处于投注状态，直接更新数值
                    this.betData = this.formatBetData(this.bet)
                }
            } else {
                // 首次加载
                this.isInit = true
                this.betData = this.formatBetData(this.bet)
                this.init()
            }
        }
    },
    mounted () {
        // 组件默认数据
        this.betData = this.formatBetData(this.bet)
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
