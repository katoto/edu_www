<template>
    <li class="js_playArea-li">
        <div class="play-area-top">
            <div class="play-type-choose" :class="{'super-active':areaMsg.pickType === '5J','on':slideDown}" @mouseover="slideDown = true" @mouseout="slideDown = false">
                <span v-if="areaMsg.pickType === '5J'" v-lang="'Super&ensp;5'"></span>
                <span v-else><lang>Pick</lang> {{ areaMsg.pickType}}</span>
                <ul @click="chosePickType( $event )" class="slide " :class="{'slide-show':slideDown}">
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
            <a href="javascript:;" @click="rewardTable = !rewardTable" class="pop-reward-ct">
                ?
                <!-- Lucky 11 show -->
                <div class="pop-mask" style="background:rgba(0,0,0,0.6);z-index: 13":class="{show: rewardTable}">
                    <div class="pop pop-rewardTable"  v-if="areaMsg.pickType != '5J'">
                        <!-- <img src="../../assets/img/pop-rewardTable.png" alt=""> -->
                        <h3><lang>Lucky11</lang></h3>
                        <div class="pay-items">
                            <table>
                                <thead>
                                <tr>
                                    <td width="45px">
                                        <lang>Match</lang>
                                    </td>
                                    <td>
                                        <lang>Win Terms</lang>
                                    </td>
                                    <td width="60px">
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
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="pop pop-rewardTable pop-rewardTable2"  v-else>
                        <!-- <img src="../../assets/img/pop-rewardTable.png" alt=""> -->
                        <h3><lang>Jackpot</lang></h3>
                        <div class="pay-items is-left">
                            <div>
                                1.<lang>Pick 5 numbers, if both numbers and the sequence on your ticket match the draw result</lang>
                            </div>
                            <div>
                                <p class="bold">
                                    2.<lang>Pick 5 Reward:</lang>
                                </p>
                                <p>
                                    <lang>Pick 5 Reward=(Bet Amount * 2/3) * 378</lang>
                                </p>
                            </div>
                            <div>
                                <p class="bold">
                                    3.<lang>Jackpot Reward:</lang>
                                </p>
                                <p><lang>0.0001≤x＜0.001 get distribution from 0.5% of the current prize pool</lang></p>
                                <p><lang>0.001≤x＜0.01 get distribution from 5% of the current prize pool</lang></p>
                                <p><lang>0.01≤x＜0.05 get distribution from 25% of the current prize pool</lang></p>
                                <p><lang>0.05≤x＜0.1 get distribution from 50% of the current prize pool</lang></p>
                            </div>
                        </div>
                    </div>

                </div>
            </a>
            <a href="javascript:;" class="btn-delete" @click="clearNumber"></a>
            <a href="javascript:;" @click="randomPickFn" class="btn-random-pick">
                <lang>Quick Pick</lang>
            </a>
        </div>
        <div class="play-area-top" style="margin-top: 8px">
            <div class="order-box" :class="{'hide': areaMsg.pickType !== '5J'}">
                <p class="fl" v-lang="'Picking&ensp;Order'"></p>
                <ul class="fl num-box js_num-box-5">
                    <!--flipInY on-->
                    <li v-for="(baseItem, index) in baseJackPot"
                        class="flipInY on"
                        :key="index"
                        v-if="playList.indexOf( areaMsg.pickJackPot[index] )> -1 ">{{ areaMsg.pickJackPot[index] }}
                    </li>
                    <li v-else>-</li>
                </ul>
            </div>
            <a href="javascript:;" class="limit-tips" @click="showPopLimit">
                <lang>Limit number list</lang>
            </a>
        </div>
        <ul class="number-box" v-if="areaMsg" @click="lineNumClick">
            <li v-for="(number,index) in playList"
                :data-flag="(index+1)" class="on"
                :key="index"
                v-if="areaMsg.pickNum && areaMsg.pickNum.indexOf( number ) > -1">
                {{ number }}
            </li>
            <li :data-flag="(index+1)" v-else>{{ number }}</li>
        </ul>
        <div class="beting">
            <div class="input-box">
                <span class="tips"><lang>Bet</lang></span>
                <a href="javascript:;" @click="js_beting_low" class="btn-beting-low" style="line-height: 34px;">-</a>
                <div :class="[currBalance.cointype==2001?'icon-eth':'icon-btc']">
                    <input type="text" name="bet1" @input="checkMoneyLen" @blur="checkBetMoney" v-model="areaMsg.pickMoney" :placeholder="min_limit.toString()">
                </div>
                <a href="javascript:;" @click="js_beting_add" class="btn-beting-add">+</a>
            </div>
            <div class="winning">
                <lang>Winning</lang>
                <i class="winMoney">
                    {{ syxw_bettype_odds['110'+( parseFloat( areaMsg.pickType))] * parseFloat( areaMsg.pickMoney ) | formateBalance }}&nbsp;{{ currBalance.cointype | formateCoinType }}
                </i>
            </div>
        </div>
    </li>
</template>

<script>
    import {randomNumber, formateBalance, formateJackPot, formateCoinType} from '~common/util'
    import {Message} from 'element-ui'

    export default {
        data () {
            return {
                playList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                baseJackPot: [1, 2, 3, 4, 5],
                limitUnit: 0.0001, // 减去最小单位
                slideDown: false,
                rewardTable: false,
                min_limit: 0.0001, // 限额
                max_limit: 0.01 // 限额
            }
        },
        props: ['areaMsg', 'data', 'allplayArea', 'currIndex'],
        watch: {
            currBalance (balance) {
                /* 切换金额变化对应的选项 */
                if (balance && this.bet_limit && this.bet_limit[balance.cointype] && balance.cointype) {
                    this.min_limit = this.bet_limit[balance.cointype].min_limit.toString()
                    this.max_limit = this.bet_limit[balance.cointype].max_limit.toString()
                    this.areaMsg.pickMoney = Number(this.min_limit)
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
                        message: _(`Bet amount is between ${this.min_limit} and ${this.max_limit} ${formateCoinType(this.currBalance.cointype)}`),
                        type: 'error'
                    })
                    return false
                }
                if (Number(this.areaMsg.pickMoney) < parseFloat(this.min_limit)) {
                    this.areaMsg.pickMoney = parseFloat(this.min_limit)
                    Message({
                        message: _(`Bet amount is between ${this.min_limit} and ${this.max_limit} ${formateCoinType(this.currBalance.cointype)}`),
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
            js_beting_add () {
                // 加钱  （上限）
                let currpickMoney = this.areaMsg.pickMoney
                if (currpickMoney >= parseFloat(this.max_limit)) {
                    Message({
                        message: _(`Bet amount is between ${this.min_limit} and ${this.max_limit} ${formateCoinType(this.currBalance.cointype)}`),
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
                        message: _(`The minimum bet is ${this.min_limit} ${formateCoinType(this.currBalance.cointype)}`),
                        type: 'error'
                    })
                } else {
                    if (parseFloat((parseFloat(currpickMoney) - parseFloat(this.limitUnit)).toFixed(5)) < parseFloat(this.min_limit)) {
                        this.$emit('update:data', {
                            ...this.areaMsg,
                            pickMoney: parseFloat(this.min_limit)
                        })
                        Message({
                            message: _(`The minimum bet is ${this.min_limit} ${formateCoinType(this.currBalance.cointype)}`),
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
                this.slideDown = false
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
            if (this.currBalance && this.bet_limit && this.bet_limit[this.currBalance.cointype]) {
                this.min_limit = this.bet_limit[this.currBalance.cointype].min_limit.toString()
                this.max_limit = this.bet_limit[this.currBalance.cointype].max_limit.toString()
            }
        },
        filters: {
            formateBalance,
            formateJackPot,
            formateCoinType
        }
    }
</script>
<style scoped>

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
