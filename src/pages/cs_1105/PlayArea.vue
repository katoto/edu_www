<template>
    <li class="js_playArea-li">
        <div class="play-area-top">
            <div id="play-type-choose" class="play-type-choose" @mouseover="slideDown = true" @mouseout="slideDown = false">
                <span v-if="areaMsg.pickType === '5J'" v-lang="'Super&ensp;5'"></span>
                <span v-else><lang>Pick</lang> {{ areaMsg.pickType}}</span>
                <ul @click="chosePickType( $event )" class="slide" :class="{'slide-show':slideDown}">
                    <li data-index="1">
                        <lang>Pick 1</lang>
                    </li>
                    <li data-index="2">
                        <lang>Pick 2</lang>
                    </li>
                    <li data-index="3">
                        <lang>Pick 3</lang>
                    </li>
                    <li data-index="4">
                        <lang>Pick 4</lang>
                    </li>
                    <li data-index="5">
                        <lang>Pick 5</lang>
                    </li>
                    <li data-index="5J" class="es" v-lang="'Super&ensp;5'">
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
                    <!-- Lucky 11 show  647 356 奖级表 todo -->
                    <div class="pop pop-rewardTable" :class="{hide: !rewardTable}">
                        <!-- <img src="../../assets/img/pop-rewardTable.png" alt=""> -->
                        <h3>LUCKY 11</h3>
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
                                <tr class="hide">
                                    <td>
                                        C5<br>
                                        <i>( jackpot )</i>
                                    </td>
                                    <td>
                                        Pick 5 number according to the order number order exactly<br>
                                        jackpot = 5 × (pool amount × wagering amount)
                                    </td>
                                    <td><i class="bold">jackpot</i></td>
                                </tr>
                                <tr>
                                    <td>
                                        <lang>C1</lang>
                                    </td>
                                    <td>
                                        <lang>Pick 1 number and hit 1/5 draw numbers</lang>
                                    </td>
                                    <td><i class="bold">1.8</i></td>
                                </tr>
                                <tr>
                                    <td>
                                        <lang>C2</lang>
                                    </td>
                                    <td>
                                        <lang>Pick 2 numbers and hit 2/5 draw numbers</lang>
                                    </td>
                                    <td><i class="bold">4.5</i></td>
                                </tr>
                                <tr>
                                    <td>
                                        <lang>C3</lang>
                                    </td>
                                    <td>
                                        <lang>Pick 3 numbers and hit 3/5 draw numbers</lang>
                                    </td>
                                    <td><i class="bold">13.5</i></td>
                                </tr>
                                <tr>
                                    <td>
                                        <lang>C4</lang>
                                    </td>
                                    <td>
                                        <lang>Pick 4 numbers and hit 4/5 draw numbers</lang>
                                    </td>
                                    <td><i class="bold">54</i></td>
                                </tr>
                                <tr>
                                    <td>
                                        <lang>C5</lang>
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
                                    <td>
                                        <div class="reward-tip-box">
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
                                        </div>
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
        <span class="line js_line" ><lang>Ticket</lang> {{ currIndex + 1 }}</span>
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
                <input type="text" name="bet1" @input="checkBetMoney" v-model="areaMsg.pickMoney" value="0.0005"
                       placeholder="0.0005">
                <a href="javascript:;" @click="js_beting_add" class="btn-beting-add">add</a>
                <a href="javascript:;" @click="js_beting_low" class="btn-beting-low">low</a>
            </div>
            <span>ETH</span>
            <div class="winning" v-if="areaMsg.pickType !== '5J'">
                <lang>Winning</lang>&nbsp;<i class="winMoney">{{ syxw_bettype_odds['110'+( parseFloat( areaMsg.pickType) )] * parseFloat( areaMsg.pickMoney ) | formateBalance }}&nbsp;ETH</i>
            </div>
            <div class="winning" v-else>
                <!-- 奖池 -->
                <lang>Winning</lang>&nbsp;<i class="winMoney">{{ areaMsg.pickMoney | formateJackPot( this.poolAmount , this.poolRatio ) + syxw_bettype_odds[11051] * parseFloat( areaMsg.pickMoney ) | formateBalance }}&nbsp;ETH</i>
                <i class="winjackport" v-if="areaMsg.pickType === '5J'">
                    {{ _('including C5: {0}ETH; jackpot {1} ETH', formateBalanceFun(syxw_bettype_odds[11051] * parseFloat(areaMsg.pickMoney)), formateJackPot(areaMsg.pickMoney, this.poolAmount, this.poolRatio)) }}
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
    import {randomNumber, formateBalance} from '~common/util'
    import {Message} from 'element-ui'

    function formateJackPot (money, poolAmount, poolRatio) {
        money = parseFloat(money)
        if (!poolAmount) {
            console.error('poolAmount error at formateJackPot')
            return 0
        }
        if (!poolRatio) {
            console.error('poolRatio error at formateJackPot')
            return 0
        }
        if (poolRatio && poolRatio[0] && poolRatio[1] && poolRatio[2] && poolRatio[3]) {
            if (money < parseFloat(poolRatio[0].value)) {
                return parseFloat((parseFloat(poolRatio[0].ratio) * parseFloat(poolAmount)).toFixed(5))
            }
            if (money < parseFloat(poolRatio[1].value)) {
                return parseFloat((parseFloat(poolRatio[1].ratio) * parseFloat(poolAmount)).toFixed(5))
            }
            if (money < parseFloat(poolRatio[2].value)) {
                return parseFloat((parseFloat(poolRatio[2].ratio) * parseFloat(poolAmount)).toFixed(5))
            }
            if (money <= parseFloat(poolRatio[3].value)) {
                return parseFloat((parseFloat(poolRatio[3].ratio) * parseFloat(poolAmount)).toFixed(5))
            }
        }
    }

    export default {
        data () {
            return {
                playList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                baseJackPot: [1, 2, 3, 4, 5],
                limitUnit: 0.0001,
                slideDown: false,
                rewardTable: false
            }
        },
        props: ['areaMsg', 'data', 'allplayArea', 'currIndex'],
        watch: {},
        methods: {
            formateBalanceFun: formateBalance,
            //   隐藏
            showPopLimit () {
                this.$store.commit('showPopLimit')
            },
            checkBetMoney () {
                if (isNaN(this.areaMsg.pickMoney)) {
                    Message({
                        message: 'Please enter the correct number',
                        type: 'error'
                    })
                    return false
                }
                if (Number(this.areaMsg.pickMoney) > 0.1) {
                    this.areaMsg.pickMoney = 0.1
                    Message({
                        message: 'Bet amount is between 0.0005 and 0.1 ETH',
                        type: 'error'
                    })
                    return false
                }
                if (Number(this.areaMsg.pickMoney) < 0.0005) {
                    this.areaMsg.pickMoney = 0.0005
                    Message({
                        message: 'Bet amount is between 0.0005 and 0.1 ETH',
                        type: 'error'
                    })
                    return false
                }
                // 临时字符串处理
                let pointArr = this.areaMsg.pickMoney.split('.')
                if (pointArr && pointArr[1] && pointArr[1].length >= 4) {
                    this.areaMsg.pickMoney = parseFloat(this.areaMsg.pickMoney).toFixed(4)
                }
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
                if (currpickMoney >= 0.1) {
                    Message({
                        message: 'Bet amount is between 0.0005 and 0.1 ETH',
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
                if (currpickMoney <= 0.0005) {
                    this.areaMsg.pickMoney = 0.0005
                    Message({
                        message: 'The minimum bet is 0.0005 ETH',
                        type: 'error'
                    })
                } else {
                    if (parseFloat((parseFloat(currpickMoney) - parseFloat(this.limitUnit)).toFixed(5)) < 0.0005) {
                        this.$emit('update:data', {
                            ...this.areaMsg,
                            pickMoney: 0.0005
                        })
                        Message({
                            message: 'The minimum bet is 0.0005 ETH',
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
                                    message: 'You have already chosen ' + parseFloat(this.areaMsg.pickType) + ' number',
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
            },
            showReward () {
                //  3.0  hover 的
                // $(".js_showReward").off('mouseenter').off('mouseleave').hover(function (e) {
                //     $('.js_pop_rewardTable').css('top', 40 + Number($(e.target).parents('.js_playArea-li').index()) * 220).stop().slideDown(300)
                // }, function () {
                //     $('.js_pop_rewardTable').stop().slideUp(300)
                // });
                //
                // $('.js_pop_rewardTable').off('mouseenter').off('mouseleave').hover(function () {
                //     $('.js_showReward').addClass('on')
                //     $(this).stop().slideDown(300)
                // }, function () {
                //     $('.js_showReward').removeClass('on')
                //     $(this).stop().slideUp(300)
                // });
                console.log('showReward')
            },
            formateJackPot

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
            }
        },
        mounted () {
        },
        filters: {
            formateCoinType (type = '2001') {
                type = type.toString()
                switch (type) {
                case '2001':
                    return 'ETH'
                case '1001':
                    return 'BTC'
                default:
                    return 'ETH'
                }
            },
            format_match (match) {
                if (isNaN(match)) {
                    return ''
                }
                match = match.toString()
                switch (match) {
                case '1101':
                    return 'C1'
                case '1102':
                    return 'C2'
                case '1103':
                    return 'C3'
                case '1104':
                    return 'C4'
                case '1105':
                    return 'C5'
                }
            },
            formateBalance,
            formateJackPot
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
