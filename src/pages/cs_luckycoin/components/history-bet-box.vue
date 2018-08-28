<template>
    <!--icon-eth/icon-btc  win-->
    <router-link :to="{path: `/luckycoin/detailed?number=${bet.exceptId}&type=luckycoin`}"  class="history" :class="[coin.boxClass==='eth'? 'icon-eth' : 'icon-btc',isMyWin?'iswin':'',this.bet.state !== '4'?'expired':'']">
        <p class="history-prize">
            {{ bet.goodsValue }}<i> {{ coinText }}</i>
        </p>
        <p class="history-usd" v-html="goodsPrice">
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
import { formatTime, formateCoinType, formateBalance, formatUSD } from '~/common/util'
import { mapState } from 'vuex'

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
        ...mapState({
            uid: state => (state.userInfo && state.userInfo.uid) || ''
        }),
        goodsPrice () {
            return `${formatUSD(this.bet.coinprice.USD, this.bet.goodsValue)}&ensp;USD` || '<br>'
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

<style lang="less" scoped type="text/less">
.visiable {
    visibility: hidden;
}
</style>
