<template>
    <div class="lucky11-page" v-if="state === '4'">
        <div class="step-title">
            {{ _('Draw Details') }}&nbsp;&nbsp;&nbsp;&nbsp;No.{{number}}
        </div>
        <div>
            <!--用户信息-->
            <div class="item item1">
                <a href="javascript:;" class="btn-copy"
                    v-clipboard:copy="orderLists"
                    v-clipboard:success="copySucc"
                    v-clipboard:error="copyError">
                    <lang>Copy Order Info</lang>
                </a>
                <div class="title-1">
                    <lang>Order Information</lang>
                    <i class="icon-mark" @mouseenter="showRuleView = true"  @mouseout="showRuleView = false">
                        <!--漂浮规则-->
                        <div class="rule-view" v-if="showRuleView">
                            <p><lang>Order Information</lang></p>
                            <ul>
                                <li :data-msg="_('(User ID)')">
                                    1000340
                                </li>
                                <li :data-msg="_('(Coin)')">
                                    2001
                                </li>
                                <li :data-msg="_('(Bid Numbers)')">
                                    10001
                                </li>
                                <li :data-msg="_('(Amount)')">
                                    0.0008
                                </li>
                                <li :data-msg="_('(Coin)')">
                                    2001
                                </li>
                            </ul>
                        </div>
                    </i>
                </div>
                <ul class="msg-items">
                    <li v-for="(item, index) in orderLists" :key="index">
                        {{item}}
                    </li>
                </ul>
            </div>
            <div class="item item2">
                <div class="title-1">
                    <lang>Merkel Value</lang>
                </div>
                <p>
                    {{merkelValue}}
                </p>
            </div>
            <div class="item item3">
                <div class="title-1">
                    <lang>Block Hash</lang>
                </div>
                <div>
                    #{{blockid}}
                </div>
                <a :href="`https://etherscan.io/block/${blockid}`" target="_blank" >
                    {{blockhash}}
                </a>
            </div>
            <div class="item item4">
                <div class="title-1">
                    <lang>Draw Calculation</lang>
                </div>
                <div class="result-onecoin">
                    <p class="p1">
                        <lang>Step 1. By using hexadecimal, the last 6 characters of the hash will convert into a decimal number.</lang>
                    </p>
                    <div class="address">{{prehash}}<i class="special">{{last7Hash}}</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="special">({{last7Hash}})16</i> = <i class="special">({{modNumber}})10</i></div>
                    <p class="p2">{{_('Step 2. Divide the number calculated from step 1 by total bids ({0} for this draw), then add 10,001. That is how lucky number comes from.', totalBids)}}
                    </p>
                    <div>
                        <i class="special">{{modNumber}}</i> mod {{totalBids}} = {{modResult0}} x {{totalBids}} + {{modResult1}}
                    </div>
                    <div>
                        {{modResult1}} + 10001= <i class="special">{{result}}</i>
                    </div>
                    <p class="p3">
                        <lang>From the above, the draw result is:</lang>
                    </p>
                    <div class="finally-result">
                        {{result}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { copySucc, copyError, accDiv } from '~common/util'
import { mapActions } from 'vuex'
export default {
    props: {
        number: {
            type: String,
            required: true
        },
        result: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            showRuleView: false,
            orderLists: [],
            merkelValue: '',
            blockid: '',
            blockhash: '',
            prehash: '',
            last7Hash: '',
            modNumber: '',
            totalBids: '',
            modResult0: 0,
            modResult1: 0,
            state: '0',
            isTimeOver: false,
            isNoBet: false
        }
    },
    methods: {
        copySucc,
        copyError,
        ...mapActions('cs_check', [
            'getDrawOrders',
            'getLuckyCoinDrawDetail'
        ]),
        getCheckData (number = this.number) {
            return (
                this.getLuckyCoinDrawDetail({
                    expectId: number,
                    lotid: 2
                }).then(res => {
                    this.renderCheckData(res.data.goodsinfo)
                    return res.data
                })
            )
        },
        getData (number = this.number) {
            return Promise.all([
                this.getCheckData(number),
                this.getOrderData(number)
            ])
        },
        getOrderData (number = this.number) {
            return (
                this.getDrawOrders({
                    expectid: number,
                    lotid: 2
                }).then(res => {
                    this.renderOrderData(res.data.orders)
                    return res
                })
            )
        },
        renderCheckData (res) {
            this.merkelValue = res.merkelHash || _('None')
            this.blockid = res.blockNum
            this.blockhash = res.tradeHash
            this.totalBids = Number(res.totalBids)
            this.last7Hash = this.blockhash.slice(this.blockhash.length - 6, this.blockhash.length)
            this.prehash = this.blockhash.slice(0, this.blockhash.length - 6)
            this.modNumber = parseInt(this.last7Hash, 16)
            this.modResult0 = parseInt(accDiv(this.modNumber, this.totalBids), 10)
            this.modResult1 = this.modNumber % this.totalBids
            this.state = res.state
            this.isTimeOver = (Number(res.endtime) * 1000) < (new Date()).getTime()
            this.isNoBet = (Number(res.leftBids) === Number(res.totalBids))
            this.renderResult()
        },
        renderOrderData (res) {
            if (res && res.length > 0) {
                this.orderLists = [...this.formatDrawOrderList(res)]
            } else {
                // TODO 没有订单数据以及默克尔值如何显示 整块隐藏
                this.orderLists = [_('If there is no bet on this draw, the result will use the hash of the last block.')]
            }
        },
        renderResult () {
            let thisResult
            let thisStatus
            if (this.state === '4') {
                thisResult = (this.modResult1 + 10001).toString()
                thisStatus = 'normal'
            } else if (this.state === '5') {
                thisResult = _("Draw expired. User's payment has been refunded.")
                thisStatus = 'expired'
            } else if (this.isNoBet && this.isTimeOver) {
                thisResult = _('Draw cancelled because no buyers of this bid.')
                thisStatus = 'wait'
            } else {
                thisResult = _('Waiting for sold out')
                thisStatus = 'wait'
            }
            this.$emit('update:result', thisResult)
            this.$emit('update:status', thisStatus)
        },
        formatDrawOrderList (orders) {
            return orders.map(order => {
                return `${order.uid}#${order.cointype}#${order.betcode}#${Number(order.betmoney)}#${order.cointype}`
            })
        }
    }
}
</script>

