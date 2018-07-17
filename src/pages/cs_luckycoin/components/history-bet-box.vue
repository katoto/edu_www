<template>
    <div class="item-history">
        <p class="expectid" style="position: absolute;left:10px;top:2px;color:#a99acc;">{{bet.exceptId}}</p>
        <div class="item-history-box" :class="{ visiable: !isInit }">
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
                </svg>
            </div>
            <div class="title">
                <p class="t1">
                    {{ bet.goodsValue }} <i>{{ coinText }}</i>
                </p>
                <p class="t2">
                    {{ goodsPrice }}
                </p>
            </div>
            <div class="msg">
                <p class="c1">
                    <lang>Draw Time:</lang> <i>{{ formatTime(bet.drawtime, 'MM-dd HH:mm') }}</i>
                </p>
                <p class="c2">
                    <lang>Draw Number:</lang> <i> {{ bet.luckyNum }}</i>
                </p>
            </div>
            <!--waiting-->
            <div class="result win" v-if="isWin">
                {{ bet.winUserName }}
            </div>
            <div class="result expired" v-else-if="isOutdate">
                <lang>Expired</lang>
            </div>
            <div class="result waiting" v-else>
                <lang>waiting</lang>
            </div>
        </div>
    </div>
</template>
<script>
import { formatTime, formateCoinType, formateBalance } from '~/common/util'
export default {
    methods: {
        formatTime,
        formateCoinType,
        formateBalance
    },
    data () {
        return {
            isInit: false,
            betData: {}
        }
    },
    computed: {
        goodsPrice () {
            for (let keyname in this.bet.coinprice) {
                if (keyname) {
                    return `${keyname} ${this.bet.coinprice[keyname]}`
                }
            }
            return ' '
        },
        isWin () {
            return this.bet.state === '4'
        },
        isOutdate () {
            return this.bet.state === '5'
        },
        coinType () {
            return this.bet.goodsType
        },
        coinText () {
            return formateCoinType(this.bet.goodsType)
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
                    ishot: '0',
                    winUserName: ''
                }
            }
        },
        type: {
            type: String,
            default: ''
        }
    },
    watch: {
        bet (val) {
            this.isInit = true
        }
    },
    mounted () {
        if (this.type === 'list') {
            this.isInit = true
        }
    }
}
</script>

<style lang="less" scoped>
.visiable {
    visibility: hidden;
}
</style>
