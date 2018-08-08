<template>
    <!--icon-eth/icon-btc  win-->
    <div class="history" :class="[coin.boxClass==='eth'? 'icon-eth' : 'icon-btc',isMyWin?'win':'']">
        <p class="history-prize">
            {{ bet.goodsValue }}<i> {{ coinText }}</i>
        </p>
        <p class="history-usd">
            {{ goodsPrice }}
        </p>
        <p class="history-issue">
            No.<router-link :to="{path: `/luckycoin/detailed?number=${bet.exceptId}&type=luckycoin`}">{{bet.exceptId}}</router-link>
        </p>
        <p class="history-time">
            <lang>Draw Time: </lang>{{ formatTime(bet.drawtime, 'MM-dd HH:mm') }}
        </p>
        <p class="history-number">
            <lang>Draw Number: </lang>{{ bet.luckyNum }}
        </p>
        <div class="history-result" :class="{expired:isOutdate}">
            <template v-if="bet.state == 4">
                {{ bet.winUserName }}
            </template>
            <template v-else>
                none
            </template>
        </div>
    </div>
</template>
<script>
import { formatTime, formateCoinType, formateBalance } from '~/common/util'
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
