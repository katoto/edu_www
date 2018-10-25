<template>
    <!--icon-eth/icon-btc  win-->
    <router-link :to="{path: `/luckycoin/detailed/${bet.exceptId}?type=luckycoin`}"  class="history" :class="[`icon-${coinText.toLowerCase()}`,isMyWin?'iswin':'',this.bet.state !== '4'?'expired':'']">
        <p class="history-prize">
            {{ bet.goodsValue }}<i> {{ coinText }}</i>
        </p>
        <p class="history-usd" v-if="bet.goodsType==='2000'">
            &nbsp;
        </p>        
        <p class="history-usd" v-html="goodsPrice" v-else>
        </p>
        <p class="history-issue">
            No.{{ bet.exceptId}}
        </p>
        <template v-if="bet.state == 4">
            <p class="history-time">
                <lang>Draw finished at</lang>
            </p>
            <p class="history-time">
                {{ $isEn() ? formatTime(bet.drawtime, 'HH:mm MM-dd') : formatTime(bet.drawtime, 'MM-dd HH:mm') }}
            </p>
            <div class="history-result">
                <lang>Draw Number</lang>: {{ bet.luckyNum }}
            </div>
        </template>
        <template v-else>
            <p class="isExpired">
                <lang>Expired</lang>
            </p>
            <div class="isExpired-msg">
                <p v-if="bet.betmoney === null || Number(bet.betmoney) === 0">
                    <lang>User's payment has been refunded.</lang>
                </p>
                <p style="color: #3fc06f;" v-else>
                    {{ _('{0} {1} has been refunded.', Number(formateBalance( bet.betmoney )), coinText) }}
                </p>
            </div>
        </template>
    </router-link>
</template>
<script>
import { formatTime, formateCoinType, formateBalance, formatUSD, accDiv } from '~/common/util'
import { mapState } from 'vuex'

export default {
    methods: {
        formatTime,
        formateCoinType,
        formateBalance,
        formatUSDValue () {
            if (!this.priceData['2001']) {
                return '--'
            }
            let EthPrice = Number(this.priceData['2001'].USD)
            let EthDiscount = Number(this.discountRate['2001'])
            let goodsValue = Number(this.bet.goodsValue)
            if (this.coinType === '2000') {
                return formatUSD(EthPrice, accDiv(goodsValue, EthDiscount))
            } else {
                let thisPrice = Number(this.priceData[this.coinType].USD)
                return formatUSD(thisPrice, goodsValue)
            }
        }
    },
    data () {
        return {
            isInit: false,
            betData: {}
        }
    },
    computed: {
        ...mapState({
            uid: state => (state.userInfo && state.userInfo.uid) || ''
        }),
        goodsPrice () {
            return `${this.formatUSDValue()}&ensp;USD` || '<br>'
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
        isMyWin () {
            return this.bet.winUid === this.uid
        },
        coin () {
            return {
                'ETH': {
                    boxClass: 'eth'
                },
                'BTC': {
                    boxClass: 'btc'
                },
                'cc': {
                    boxClass: 'cc'
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
        },
        discountRate: Object,
        priceData: Object
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

<style lang="less" scoped type="text/less">
.visiable {
    visibility: hidden;
}
</style>
