<template>
    <li class="js_playArea-li">
        <div class="play-area-top">
            <div id="play-type-choose" class="play-type-choose" :class="{'super-active':areaMsg.pickType === '5J'}"
                 @mouseover="slideDown = true" @mouseout="slideDown = false">
                <span v-if="areaMsg.pickType === '5J'" v-lang="'Super&ensp;5'"></span>
                <span v-else><lang>Pick</lang> {{ areaMsg.pickType}}</span>
                <ul @click="chosePickType( $event )" class="slide" :class="{'slide-show':slideDown}">
                    <li data-index="1" v-lang="'Pick 1'"></li>
                    <li data-index="2" v-lang="'Pick 2'"></li>
                    <li data-index="3" v-lang="'Pick 3'"></li>
                    <li data-index="4" v-lang="'Pick 4'"></li>
                    <li data-index="5" v-lang="'Pick 5'"></li>
                    <li data-index="5J" class="es super_li" v-lang="'Super&ensp;5'">
                        <!--<p>Pick 5</p>-->
                    </li>
                </ul>
            </div>
            <p class="play-tips" v-if="areaMsg">
                <span v-if="areaMsg.pickType === '5J'" class="js_choose_desc">
                    <lang>Win extra prize pool reward if your picked 5 and its sequence match the draw result.</lang>
                    <i class="position-msg">
                        <lang>If only numbers match, you will get Pick 5 reward.</lang>
                    </i>
                </span>
                <span v-if="areaMsg.pickType === '1'" class="js_choose_desc">
                    <lang>Pick 1 number, if it hits the draw number, you'll win 1.8 times reward</lang>
                </span>
                <span v-if="areaMsg.pickType !== '1' && areaMsg.pickType !== '5J'" class="js_choose_desc">
                    {{ _("Pick {0} numbers, if all the numbers hit the draw numbers, you'll win {1} times reward", areaMsg.pickType, syxw_bettype_odds['110'+( areaMsg.pickType )]) }}
                </span>
                <a href="javascript:;" @mouseover="rewardTable = true" @mouseout="rewardTable = false" class="pop-reward-ct">
                    <lang>Reward table</lang>
                    <!-- Lucky 11 show -->
                    <div class="pop pop-rewardTable" :class="{hide: !rewardTable}">
                        <!-- <img src="../../assets/img/pop-rewardTable.png" alt=""> -->
                        <h3><lang>Lucky11</lang></h3>
                        <div class="pay-items">
                            <table>
                                <thead>
                                    <tr>
                                        <td width="90px">
                                            <lang>Match</lang>
                                        </td>
                                        <td>
                                            <lang>Win Terms</lang>
                                        </td>
                                        <td width="90px">
                                            <lang>Win Ratio</lang>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <lang>P1</lang>
                                        </td>
                                        <td>
                                            <lang>Pick 1 number and hit 1/5 draw numbers</lang>
                                        </td>
                                        <td><i class="bold">1.8</i></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <lang>P2</lang>
                                        </td>
                                        <td>
                                            <lang>Pick 2 numbers and hit 2/5 draw numbers</lang>
                                        </td>
                                        <td><i class="bold">4.5</i></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <lang>P3</lang>
                                        </td>
                                        <td>
                                            <lang>Pick 3 numbers and hit 3/5 draw numbers</lang>
                                        </td>
                                        <td><i class="bold">13.5</i></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <lang>P4</lang>
                                        </td>
                                        <td>
                                            <lang>Pick 4 numbers and hit 4/5 draw numbers</lang>
                                        </td>
                                        <td><i class="bold">54</i></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <lang>P5</lang>
                                        </td>
                                        <td>
                                            <lang>Pick 5 numbers and hit 5/5 draw numbers</lang>
                                        </td>
                                        <td><i class="bold">378</i></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <lang>Super5</lang>
                                        </td>
                                        <td class="reward-tip-box">
                                            <p class="reward-pick-five-title">
                                                <lang>Pick 5 numbers, if both numbers and the sequence on your ticket match the draw result</lang>
                                            </p>
                                            <p class="reward-table-tip">
                                                <lang>0.0001≤x＜0.001 get distribution from 0.5% of the current prize pool</lang>
                                            </p>
                                            <p class="reward-table-tip">
                                                <lang>0.001≤x＜0.01 get distribution from 5% of the current prize pool</lang>
                                            </p>
                                            <p class="reward-table-tip">
                                                <lang>0.01≤x＜0.05 get distribution from 25% of the current prize pool</lang>
                                            </p>
                                            <p class="reward-table-tip">
                                                <lang>0.05≤x＜0.1 get distribution from 50% of the current prize pool</lang>
                                            </p>
                                        </td>
                                        <td>
                                            <i class="bold">
                                                <lang>jackpot</lang>
                                            </i>
                                        </td>
                                    </tr>
                                 </tbody>
                            </table>
                        </div>
                     </div>
                </a>
            </p>
        <a href="javascript:;" class="limit-tips js_limit-tips" @click="showPopLimit">
            <lang>Limit number list</lang>
        </a>
        </div>
        <span class="line js_line"><lang>Ticket</lang> {{ currIndex + 1 }}</span>
        <ul class="number-box" v-if="areaMsg" @click="lineNumClick">
            <li v-for="(number,index) in playList"
                :data-flag="(index+1)" class="on"
                :key="index"
                v-if="areaMsg.pickNum && areaMsg.pickNum.indexOf( number ) > -1">
                {{ number }}
            </li>
            <li :data-flag="(index+1)" v-else>{{ number }}</li>
        </ul>
        <a href="javascript:;" @click="randomPickFn" class="btn-random-pick">
            <lang>Quick Pick</lang>
        </a>
        <a href="javascript:;" class="btn-delete" @click="clearNumber"></a>
        <a href="javascript:;" :data-delIndex="currIndex" @click="delTicket" class="btn-close"></a>
        <div class="beting">
            <span><lang>Bet</lang></span>
            <div class="btn-beting">
                <!-- 差额化 金额 -->
                <input type="text" name="bet1" @input="checkMoneyLen" @blur="checkBetMoney" v-model="areaMsg.pickMoney"
                       :placeholder="min_limit.toString()">
                <a href="javascript:;" @click="js_beting_add" class="btn-beting-add">add</a>
                <a href="javascript:;" @click="js_beting_low" class="btn-beting-low">low</a>
            </div>
            <span>{{ currBalance.cointype | formateCoinType }}</span>
            <div class="winning" v-if="areaMsg.pickType !== '5J'">
                <lang>Winning</lang>&nbsp;<i class="winMoney">{{ syxw_bettype_odds['110'+( parseFloat( areaMsg.pickType)
                )] * parseFloat( areaMsg.pickMoney ) | formateBalance }}&nbsp;{{ currBalance.cointype | formateCoinType
                }}</i>
            </div>
            <div class="winning" v-else>
                <!-- 奖池 -->
                <lang>Winning</lang>&nbsp;<i class="winMoney">{{ areaMsg.pickMoney | formateJackPot(
                this.poolAmount[currBalance.cointype] , this.poolRatio ) + syxw_bettype_odds[11051] * parseFloat(areaMsg.pickMoney ) | formateBalance }}&nbsp;{{ currBalance.cointype | formateCoinType }}</i>
                <i class="winjackport" v-if="areaMsg.pickType === '5J'">
                    {{ _('including C5: {0}; jackpot {1}', formateBalance(syxw_bettype_odds[11051] * parseFloat(areaMsg.pickMoney)) + formateCoinType ( currBalance.cointype ),
                    formateJackPot(areaMsg.pickMoney, this.poolAmount[currBalance.cointype], this.poolRatio)) + formateCoinType ( currBalance.cointype ) }}
                </i>
            </div>
        </div>
        <div class="order-box js_choose_jackPot" :class="{'hide': areaMsg.pickType !== '5J'}">
            <p v-lang="'Picking&ensp;Order'"></p>
            <ul class="num-box js_num-box-5">
                <!--flipInY on-->
                <li v-for="(baseItem, index) in baseJackPot"
                    class="flipInY on"
                    :key="index"
                    v-if="playList.indexOf( areaMsg.pickJackPot[index] )> -1 ">{{ areaMsg.pickJackPot[index] }}
                </li>
                <li v-else>-</li>
            </ul>
        </div>
    </li>
</template>

<script>
    import {randomNumber, formateBalance, formateJackPot, formateCoinType, accDiv} from '~common/util'
    import {Message} from 'element-ui'

    export default {
        data () {
            return {
                playList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                baseJackPot: [1, 2, 3, 4, 5],
                limitUnit: 0.0001, // 减去最小单位
                slideDown: false,
                rewardTable: false,
                min_limit: 0.0002, // 限额
                max_limit: 0.01, // 限额
                curCoinType: '1001'
            }
        },
        props: ['areaMsg', 'data', 'allplayArea', 'currIndex'],
        watch: {
            currBalance: {
                deep: true,
                handler (balance) {
                /* 切换金额变化对应的选项 */
                    if (balance && this.bet_limit && this.bet_limit[balance.cointype] && balance.cointype !== this.curCoinType) {
                        this.min_limit = this.bet_limit[balance.cointype].min_limit.toString()
                        this.max_limit = this.bet_limit[balance.cointype].max_limit.toString()
                        console.log(balance)
                        this.areaMsg.pickMoney = Number(this.min_limit)
                        this.setLimitUnit()
                        this.curCoinType = balance.cointype
                    }
                }
            }
        },
        methods: {
            formateBalance,
            formateJackPot,
            formateCoinType,
            checkMoneyLen () {
                if (this.areaMsg.pickMoney.toString().length > 8) {
                    this.areaMsg.pickMoney = this.areaMsg.pickMoney.toString().slice(0, 8)
                }
            },
            showPopLimit () {
                this.$store.commit('showPopLimit')
            },
            checkBetMoney () {
                if (this.currBalance && this.bet_limit && this.bet_limit[this.currBalance.cointype]) {
                    this.min_limit = this.bet_limit[this.currBalance.cointype].min_limit.toString()
                    this.max_limit = this.bet_limit[this.currBalance.cointype].max_limit.toString()
                }
                if (isNaN(this.areaMsg.pickMoney)) {
                    Message({
                        message: _('Please enter the correct number'),
                        type: 'error'
                    })
                    return false
                }
                if (Number(this.areaMsg.pickMoney) > parseFloat(this.max_limit)) {
                    this.areaMsg.pickMoney = parseFloat(this.max_limit)
                    Message({
                        message: _('Bet amount is between {0} and {1} {2}', this.min_limit, this.max_limit, formateCoinType(this.currBalance.cointype)),
                        // message: _(`Bet amount is between ${this.min_limit} and ${this.max_limit} ${formateCoinType(this.currBalance.cointype)}`),
                        type: 'error'
                    })
                    return false
                }
                if (Number(this.areaMsg.pickMoney) < parseFloat(this.min_limit)) {
                    this.areaMsg.pickMoney = parseFloat(this.min_limit)
                    Message({
                        message: _('Bet amount is between {0} and {1} {2}', this.min_limit, this.max_limit, formateCoinType(this.currBalance.cointype)),
                        type: 'error'
                    })
                    return false
                }
                return true
            },
            delTicket ($event) {
                // 删除
                if ($event.target.tagName === 'A') {
                    this.allplayArea.splice(parseFloat($event.target.getAttribute('data-delIndex')), 1)
                    this.$emit('update:allplayArea', this.allplayArea)
                }
            },
            setLimitUnit () {
                let min = Number(this.min_limit)
                if (this.min_limit >= 1) {
                    this.limitUnit = 1
                } else {
                    let minString = min.toString()
                    let num = accDiv(min, Number(minString[minString.length - 1]))
                    this.limitUnit = num
                }
            },
            js_beting_add () {
                // 加钱  （上限）
                let currpickMoney = this.areaMsg.pickMoney
                if (currpickMoney >= parseFloat(this.max_limit)) {
                    Message({
                        message: _('Bet amount is between {0} and {1} {2}', this.min_limit, this.max_limit, formateCoinType(this.currBalance.cointype)),
                        type: 'error'
                    })
                } else {
                    this.$emit('update:data', {
                        ...this.areaMsg,
                        pickMoney: parseFloat((parseFloat(currpickMoney) + parseFloat(this.limitUnit)).toFixed(5))
                    })
                }
            },
            js_beting_low () {
                // 减钱  （下限）
                let currpickMoney = this.areaMsg.pickMoney
                if (currpickMoney <= parseFloat(this.min_limit)) {
                    this.areaMsg.pickMoney = parseFloat(this.min_limit)
                    Message({
                        message: _('The minimum bet is {0} {1}', this.min_limit, formateCoinType(this.currBalance.cointype)),
                        type: 'error'
                    })
                } else {
                    if (parseFloat((parseFloat(currpickMoney) - parseFloat(this.limitUnit)).toFixed(5)) < parseFloat(this.min_limit)) {
                        this.$emit('update:data', {
                            ...this.areaMsg,
                            pickMoney: parseFloat(this.min_limit)
                        })
                        Message({
                            message: _('The minimum bet is {0} {1}', this.min_limit, formateCoinType(this.currBalance.cointype)),
                            type: 'error'
                        })
                    } else {
                        this.$emit('update:data', {
                            ...this.areaMsg,
                            pickMoney: parseFloat((parseFloat(currpickMoney) - parseFloat(this.limitUnit)).toFixed(5))
                        })
                    }
                }
            },
            clearNumber () {
                //  清空当前选号
                this.$emit('update:data', {
                    ...this.areaMsg,
                    pickNum: [],
                    pickJackPot: []
                })
            },
            lineNumClick ($event) {
                /* 选号 */
                let currpickNum = []

                if (this.areaMsg && this.areaMsg.pickNum) {
                    currpickNum = JSON.parse(JSON.stringify(this.areaMsg.pickNum))
                }
                if ($event.target.tagName === 'LI') {
                    let dataFlag = parseFloat($event.target.getAttribute('data-flag'))
                    if ($event.target.className === 'on') {
                        /* 清楚数据 */
                        if (currpickNum.indexOf(dataFlag) !== -1) {
                            currpickNum.splice(currpickNum.indexOf(dataFlag), 1)
                        } else {
                            console.warn('lineNumClick error')
                        }
                    } else {
                        if (currpickNum.length >= parseFloat(this.areaMsg.pickType)) {
                            if (parseFloat(this.areaMsg.pickType) === 1) {
                                currpickNum.pop()
                                currpickNum.push(parseFloat(dataFlag))
                            } else {
                                Message({
                                    message: _('You have already chosen {0} number', parseFloat(this.areaMsg.pickType)),
                                    type: 'error'
                                })
                            }
                        } else {
                            currpickNum.push(parseFloat(dataFlag))
                        }
                    }

                    this.$emit('update:data', {
                        ...this.areaMsg,
                        pickNum: currpickNum,
                        pickJackPot: currpickNum
                    })
                }
            },
            randomPickFn () {
                //  随机选号
                let randomNum = randomNumber(parseFloat(this.areaMsg.pickType))
                this.$emit('update:data', {
                    ...this.areaMsg,
                    pickNum: randomNum,
                    pickJackPot: randomNum
                })
            },
            chosePickType ($event) {
                if ($event.target.tagName === 'LI') {
                    this.$emit('update:data', {
                        ...this.areaMsg,
                        pickNum: [],
                        pickJackPot: [],
                        pickType: $event.target.getAttribute('data-index')
                    })
                }
            }

        },
        computed: {
            syxw_bettype_odds () {
                return this.$store.state.cs_1105.syxw_bettype_odds
            },
            poolAmount () {
                return this.$store.state.cs_1105.poolAmount
            },
            poolRatio () {
                return this.$store.state.cs_1105.poolRatio
            },
            currBalance () {
                return this.$store.state.currBalance
            },
            bet_limit () {
                return this.$store.state.cs_1105.bet_limit
            }
        },
        mounted () {
            this.$store.dispatch('homeInfo')
                .then(res => {
                    console.log(this.currBalance, this.bet_limit)
                    if (this.currBalance && this.bet_limit && this.bet_limit[this.currBalance.cointype]) {
                        this.min_limit = this.bet_limit[this.currBalance.cointype].min_limit.toString()
                        this.max_limit = this.bet_limit[this.currBalance.cointype].max_limit.toString()
                        console.log(this.min_limit)
                        this.areaMsg.pickMoney = Number(this.min_limit)
                    }
                })
        },
        filters: {
            formateBalance,
            formateJackPot,
            formateCoinType
        }
    }
</script>
<style scoped>

    .pop-rewardTable {
        overflow: hidden;
        transition: all .2s;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2)
    }

    .reward-table-tip {
        font-size: 12px;
        color: #778ca3;
        line-height: 15px;
    }

    .reward-pick-five-title {
        line-height: 15px;
        margin-bottom: 10px;
    }

    .reward-tip-box {
        padding: 15px 0 20px;
    }
</style>
