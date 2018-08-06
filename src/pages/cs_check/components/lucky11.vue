<template>
    <div class="lucky11-page">
        <div class="step-title">
            {{ _('Lottery number generation process') }}&nbsp;&nbsp;&nbsp;&nbsp;{{ issueNumber }}
        </div>
        <!--用户信息-->
        <div class="item item1">
            <a href="javascript:;" class="btn-copy"
                v-clipboard:copy="orderLists"
                v-clipboard:success="copySucc"
                v-clipboard:error="copyError">
                <lang>Copy user order</lang>
            </a>
            <div class="title-1">
                <lang>User order information</lang>
                <i class="icon-mark" @mouseenter="showRuleView = true"  @mouseout="showRuleView = false">
                    <!--漂浮规则-->
                    <div class="rule-view" v-if="showRuleView">
                        <p><lang>User order information</lang></p>
                        <ul>
                            <li :data-msg="_('(Issue)')">
                                1000340
                            </li>
                            <li :data-msg="_('(Play)')">
                                1101
                            </li>
                            <li :data-msg="_('(Number)')">
                                1,3
                            </li>
                            <li :data-msg="_('(Amount)')">
                                0.0008
                            </li>
                            <li :data-msg="_('(Currency)')">
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
                <lang>Merkel value</lang>
            </div>
            <p>
                {{merkelValue}}
            </p>
        </div>
        <div class="item item3">
            <div class="title-1">
                <lang>Blockchain hash value</lang>
            </div>
            <div>
                #{{blockid}}
            </div>
            <a href="javascript:;">
                {{blockhash}}
            </a>
        </div>
        <div class="item item4">
            <div class="title-1">
                <lang>Blockchain hash value</lang>
            </div>
            <!--11选5-->
            <div class="result-lucky11">
                <p class="p1">
                    <lang>1 step : 25 places after the draw Hash value, divided into 5 parts, respectively A1, A2, A3, A4, A5</lang>
                </p>
                <div class="hash">
                    {{preHash}}<span>{{hashA5}}&nbsp;&nbsp;{{hashA4}}&nbsp;&nbsp;{{hashA3}}&nbsp;&nbsp;{{hashA2}}&nbsp;&nbsp;{{hashA1}}</span>
                </div>
                <div class="icon-down"></div>
                <ul class="hash-5">
                    <li class="abox">
                        <i>A1</i>
                        <span>{{hashA1}}</span>
                    </li>
                    <li class="abox">
                        <i>A2</i>
                        <span>{{hashA2}}</span>
                    </li>
                    <li class="abox">
                        <i>A3</i>
                        <span>{{hashA3}}</span>
                    </li>
                    <li class="abox">
                        <i>A4</i>
                        <span>{{hashA4}}</span>
                    </li>
                    <li class="abox">
                        <i>A5</i>
                        <span>{{hashA5}}</span>
                    </li>
                </ul>
                <p class="p2">
                    <lang>2 step : For A1-A5, mod operations 11, 10, 9, 8, and 7, respectively, are obtained, and a 5-digit lottery number is obtained.</lang>
                </p>
                <ul class="mod-5 clearfix">
                    <li>
                        <div class="mod-top">
                            <div class="abox">
                                <i>A1</i>
                                <span>{{hashA1}}</span>
                            </div>
                            <p>
                                MOD11+1={{hashNumber[0]}}
                            </p>
                        </div>
                        <ul class="number-box">
                            <li v-for="(item, index) in hashNumberA1" :key="index" :data-count="index + 1" :class="{ on: index + 1 === hashNumber[0] }">
                                <div>{{item}}</div>
                            </li>
                        </ul>
                        <p class="p3">
                            {{ _('The {0}th digit is the lottery number', '5') }}
                        </p>
                    </li>
                    <li>
                        <div class="mod-top">
                            <div class="abox">
                                <i>A2</i>
                                <span>{{hashA2}}</span>
                            </div>
                            <p>
                                MOD10+1={{hashNumber[1]}}
                            </p>
                        </div>
                        <ul class="number-box">
                            <li v-for="(item, index) in hashNumberA2" :key="index" :data-count="index + 1" :class="{ on: index + 1 === hashNumber[1] }">
                                <div>{{item}}</div>
                            </li>
                        </ul>
                        <p class="p3">
                            {{ _('The {0}th digit is the lottery number', '5') }}
                        </p>
                    </li>
                    <li>
                        <div class="mod-top">
                            <div class="abox">
                                <i>A3</i>
                                <span>{{hashA3}}</span>
                            </div>
                            <p>
                                MOD9+1={{hashNumber[2]}}
                            </p>
                        </div>
                        <ul class="number-box">
                            <li v-for="(item, index) in hashNumberA3" :key="index" :data-count="index + 1" :class="{ on: index + 1 === hashNumber[2] }">
                                <div>{{item}}</div>
                            </li>
                        </ul>
                        <p class="p3">
                            {{ _('The {0}th digit is the lottery number', '5') }}
                        </p>
                    </li>
                    <li>
                        <div class="mod-top">
                            <div class="abox">
                                <i>A4</i>
                                <span>{{hashA4}}</span>
                            </div>
                            <p>
                                MOD8+1={{hashNumber[3]}}
                            </p>
                        </div>
                        <ul class="number-box">
                            <li v-for="(item, index) in hashNumberA4" :key="index" :data-count="index + 1" :class="{ on: index + 1 === hashNumber[3] }">
                                <div>{{item}}</div>
                            </li>
                        </ul>
                        <p class="p3">
                            {{ _('The {0}th digit is the lottery number', '5') }}
                        </p>
                    </li>
                    <li>
                        <div class="mod-top">
                            <div class="abox">
                                <i>A5</i>
                                <span>{{hashA5}}</span>
                            </div>
                            <p>
                                MOD7+1={{hashNumber[4]}}
                            </p>
                        </div>
                        <ul class="number-box">
                            <li v-for="(item, index) in hashNumberA5" :key="index" :data-count="index + 1" :class="{ on: index + 1 === hashNumber[4] }">
                                <div>{{item}}</div>
                            </li>
                        </ul>
                        <p class="p3">
                            {{ _('The {0}th digit is the lottery number', '5') }}
                        </p>
                    </li>
                </ul>
                <div class="finally-result">
                    <p class="p4">
                        <lang>In summary, the lottery number</lang>
                    </p>
                    <ul>
                        <li v-for="(item, index) in luck11Result" :key="index">{{ item }}</li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { copySucc, copyError } from '~common/util'
import { mapActions } from 'vuex'

export default {
    props: {
        number: {
            type: String,
            required: true
        },
        result: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            showRuleView: false,
            isChecked: false,
            orderLists: [],
            issueNumber: '',
            merkelValue: '',
            blockid: '',
            blockhash: '',
            preHash: '',
            hashA5: '',
            hashA4: '',
            hashA3: '',
            hashA2: '',
            hashA1: '',
            luck11Result: [],
            luckyCoinResult: '',
            hashNumber: [0, 0, 0, 0, 0],
            hashNumberA1: [],
            hashNumberA2: [],
            hashNumberA3: [],
            hashNumberA4: [],
            hashNumberA5: []
        }
    },
    methods: {
        ...mapActions('cs_check', [
            'getDrawOrders',
            'getDrawDetail'
        ]),
        copySucc,
        copyError,
        getCheckData (number = this.number) {
            return (
                this.getDrawDetail({
                    expectid: number,
                    lotid: 1
                }).then(res => {
                    console.log(res)
                    this.renderCheckData(res.data.detail)
                    return res
                })
            )
        },
        getData (number = this.number) {
            return Promise.all([
                this.getCheckData(number),
                this.getOrderData(number)
            ]).then(() => {
                this.issueNumber = number
                this.isChecked = true
            })
        },
        getOrderData (number = this.number) {
            return (
                this.getDrawOrders({
                    expectid: number,
                    lotid: 1
                }).then(res => {
                    this.renderOrderData(res.data.orders)
                    return res
                })
            )
        },
        renderCheckData (res) {
            if (res.merkel_hash === '') {
                this.merkelValue = 'None'
            } else {
                this.merkelValue = res.merkel_hash
            }
            this.blockid = res.blockid
            this.blockhash = res.blockhash
            this.luck11Result = [...this.getResult(res.blockhash)]
            this.$emit('update:result', this.luck11Result)
        },
        renderOrderData (res) {
            if (res && res.length > 0) {
                this.orderLists = [...this.formatDrawOrderList(res)]
            } else {
                // TODO 没有订单数据以及默克尔值如何显示
                this.orderLists = ['There is no bet on this draw, the result uses the hash of the last block.']
            }
        },
        mod (hash, num) {
            return parseInt(hash, 16) % num
        },
        getHashLast25 (hash) {
            return hash.slice(hash.length - 25, hash.length)
        },
        getHashPreStr (hash) {
            return hash.slice(0, hash.length - 25)
        },
        getHashArr (last25) {
            return [
                last25.slice(0, 5),
                last25.slice(5, 10),
                last25.slice(10, 15),
                last25.slice(15, 20),
                last25.slice(20, 25)
            ]
        },
        getHashNumber (hash) {
            var last25Hash = this.getHashLast25(hash)
            let getHashArr = this.getHashArr(last25Hash)

            this.preHash = this.getHashPreStr(hash)

            this.hashA5 = getHashArr[0]
            this.hashA4 = getHashArr[1]
            this.hashA3 = getHashArr[2]
            this.hashA2 = getHashArr[3]
            this.hashA1 = getHashArr[4]
            this.hashNumber = [
                this.mod(getHashArr[0], 7) + 1,
                this.mod(getHashArr[1], 8) + 1,
                this.mod(getHashArr[2], 9) + 1,
                this.mod(getHashArr[3], 10) + 1,
                this.mod(getHashArr[4], 11) + 1
            ].reverse()
            return this.hashNumber
        },
        getResult (hash) {
            var number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
            var arr = this.getHashNumber(hash)
            var result = []
            arr.forEach((item, index) => {
                this[`hashNumberA${index + 1}`] = [...number]
                if (item === number.length) {
                    result.push(number[number.length - 1])
                    number.pop()
                } else {
                    result.push(number[item - 1])
                    number.splice(item - 1, 1, number[number.length - 1])
                    number.pop()
                }
            })
            return result
        },
        formatDrawOrderList (orders) {
            return orders.map(order => {
                return `${order.expectid}#${order.bettype}#${order.betcode}#${order.betprize}#${order.cointype}`
            })
        }
    }
}
</script>

