<template>
    <div class="item-history">
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
            <p class="t1">
                {{ Number(bet.totalBids) * Number(bet.bidValue) }} <i>{{ coinText }}</i>
            </p>
            <p class="t2">
                <lang>USD</lang> {{ numberComma(Number(bet.goodsValue)) }}
            </p>
        </div>
        <div class="msg">
            <p class="c1">
                <lang>Draw Time:</lang> <i>{{ formatTime(bet.crtime, 'MM-dd HH:mm') }}</i>
            </p>
            <p class="c2">
                <lang>Draw Number:</lang> <i> {{ bet.luckyNum }}</i>
            </p>
        </div>
        <!--waiting-->
        <div class="result win" v-if="isWin">
            {{ bet.winUserName }}
        </div>
        <div class="result waiting" v-else>
            waiting
        </div>
    </div>
</template>
<script>
import { formatTime, formateCoinType, formateBalance, numberComma } from '~/common/util'
export default {
    methods: {
        formatTime,
        formateCoinType,
        formateBalance,
        numberComma
    },
    computed: {
        isWin () {
            return this.bet.state === '4'
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
            default: {}
        }
    }
}
</script>