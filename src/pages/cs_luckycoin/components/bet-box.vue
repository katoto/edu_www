<template>
    <!--icon-hot  热门icon -->
    <div
        :class="[ isPopular ? 'item-popular' :'item-common', isHot ? 'icon-hot' : '', coin.bgClass]">
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
                    <circle cx="51" cy="51" r="47" stroke-width="8" stroke="#723176" fill="transparent"/>
                    <circle cx="51" cy="51" r="47" :stroke="`url(#${coin.circleClass[0]})`" stroke-width="8" fill="transparent" stroke-linecap='round'  stroke-dasharray="296 296"/>  <!--左边 整圆-->
                    <circle cx="51" cy="51" r="47" :stroke="`url(#${coin.circleClass[1]})`" stroke-width="8" fill="transparent" stroke-linecap='round'  stroke-dasharray="148 296"/>
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
                {{ _('Play For {0}', bidvalue) }} <i>{{ coinText }}</i>
            </p>
            <p class="t1" v-else>
                {{ bidvalue }} <i>{{ coinText }}</i>
            </p>
            <p class="t2">
                (<lang>USD</lang> {{ goodsValue }})
            </p>
        </div>
        <div class="msg">
            <p class="c1">
                <lang>Draw Process:</lang>
                <i>{{ Number(this.bet.totalBids) - Number(this.bet.leftBids) }} / {{ this.bet.totalBids }}</i>
            </p>
            <p class="c2">
                <lang>Ticket Price:</lang>
                <i>{{ this.bet.bidValue }} {{ coinText }}</i>
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
                        <lang>Bid For {{ bidvalue }} {{ coinText }}</lang>
                    </div>
                    <p class="bet-m">
                        <lang>more bets，more probability</lang>
                    </p>
                    <div class="bet-amount">
                        <a href="javascript:;" class="on">0.01</a>
                        <a href="javascript:;">0.5</a>
                        <a href="javascript:;">1</a>
                    </div>
                    <div class="bet-input">
                        <a href="javascript:;" class="redu">1/2</a>
                        <input type="text">
                        <a href="javascript:;" class="add">x2</a>
                    </div>
                    <a href="javascript:;" class="bet-btn" @click="handleBetEvent">
                        <lang>Pay Now</lang>
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
</template>

<script>
import { formateCoinType, numberComma } from '~/common/util'

export default {
    data () {
        return {
            windowClass: ''
        }
    },
    props: {
        bet: {
            type: Object,
            default: {}
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
            this.windowClass = ''
        },
        handleBetEvent () {
            this.closeWindow()
        },
        handleBetMoreEvent () {
            this.closeWindow()
            setTimeout(() => {
                this.openBetWindow()
            }, 200)
        }
    },
    computed: {
        coinType () {
            return this.bet.goodsType || '2001'
        },
        coinText () {
            return formateCoinType(this.coinType)
        },
        isHot () {
            return this.bet.ishot === '1'
        },
        goodsValue () {
            return numberComma(Number(this.bet.goodsValue))
        },
        bidvalue () {
            return Number(this.bet.bidValue) * Number(this.bet.totalBids)
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
        }
    }
}
</script>

