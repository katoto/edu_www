<template>
    <li class="js_playArea-li">
        <div class="play-area-top">
            <div id="play-type-choose" class="play-type-choose" @mouseover="slideDown = true" @mouseout="slideDown = false">
                <span v-if="areaMsg.pickType === '5J'">Pick 5(JACKPOT)</span>
                <span v-else>Pick {{ areaMsg.pickType}}</span>
                <ul @click="chosePickType( $event )" class="slide" :class="{'slide-show':slideDown}">
                    <li data-index="1">Pick 1</li>
                    <li data-index="2">Pick 2</li>
                    <li data-index="3">Pick 3</li>
                    <li data-index="4">Pick 4</li>
                    <li data-index="5">Pick 5</li>
                    <li data-index="5J" class="es">
                        (JACKPOT)
                        <!--<p>Pick 5</p>-->
                        <!--<p></p>-->
                    </li>
                </ul>
            </div>
            <p class="play-tips" v-if="areaMsg">
                <span v-if="areaMsg.pickType === '5J'" class="js_choose_desc">Pick 5 numbers,奖池奖池奖池 if all the numbers hit the draw numbers, you'll win 378 times reward</span>
                <span v-if="areaMsg.pickType === '1'" class="js_choose_desc">Pick 1 number, if it hits the draw number, you'll win 1.8 times reward</span>
                <span v-if="areaMsg.pickType !== '1' && areaMsg.pickType !== '5J'" class="js_choose_desc">Pick {{ areaMsg.pickType }} numbers, if all the numbers hit the draw numbers, you'll win {{ syxw_bettype_odds['110'+( areaMsg.pickType )]  }} times reward</span>
                <a href="javascript:;" class="js_showReward"> Reward table</a>
            </p>
            <a href="javascript:;" class="limit-tips js_limit-tips" @click="showPopLimit">Limit number list</a>
            <!--<a href="javascript:;" class="limit-tips js_limit-tips">Limit number list</a>-->
        </div>
        <span class="line js_line">Ticket {{ areaMsg.pickType }}</span>
        <!--<ul class="number-box js_isReady" data-luckyNum="1|3|4|6|8">-->
        <ul class="number-box" v-if="areaMsg" @click="lineNumClick">
            <li v-for="(number,index) in playList" :data-flag="(index+1)" class="on"
                v-if="areaMsg.pickNum && areaMsg.pickNum.indexOf( number ) > -1">{{ number }}
            </li>
            <li :data-flag="(index+1)" v-else>{{ number }}</li>
        </ul>
        <a href="javascript:;" @click="randomPickFn" class="btn-random-pick">Quick Pick</a>
        <a href="javascript:;" class="btn-delete" @click="clearNumber"></a>
        <a href="javascript:;" :data-delIndex="currIndex" @click="delTicket" class="btn-close"></a>
        <div class="beting">
            <span>Bet</span>
            <div class="btn-beting">
                <!-- 差额化 金额 -->
                <input type="text" name="bet1" @input="checkBetMoney" v-model="areaMsg.pickMoney" value="0.0001"
                       placeholder="0.0001">
                <a href="javascript:;" @click="js_beting_add" class="btn-beting-add">add</a>
                <a href="javascript:;" @click="js_beting_low" class="btn-beting-low">low</a>
            </div>
            <span>ETH</span>
            <div class="winning">
                    Winning&nbsp<i class="winMoney">{{ syxw_bettype_odds['110'+( parseFloat( areaMsg.pickType) )] *
                parseFloat( areaMsg.pickMoney ) | formateBalance }}&nbspETH</i>
                <div class="winjackport" v-if="areaMsg.pickType === '5J'">
                    (including C5: {{2.52}}ETH; jackpot {{3.03}}ETH)
                </div>
            </div>

        </div>
        <div class="order-box js_choose_jackPot" :class="{'hide': areaMsg.pickType !== '5J'}">
            <p>Picking Order</p>
            <ul class="num-box js_num-box-5">
                <!--flipInY on-->
                <li v-for="(baseItem,index) in baseJackPot" class="flipInY on"
                    v-if="playList.indexOf( areaMsg.pickJackPot[index] )> -1 ">{{ areaMsg.pickJackPot[index] }}
                </li>
                <li v-else>-</li>
            </ul>
        </div>
    </li>
</template>

<script>
    import {randomNumber, src, platform, isLog, getCK, setCK, removeCK} from '~common/util'
    import {Message} from 'element-ui'

    export default {
        data () {
            return {
                playList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                baseJackPot: [1, 2, 3, 4, 5],
                limitUnit: 0.0001,
                slideDown:false
            }
        },
        props: ['areaMsg', 'data', 'allplayArea', 'currIndex'],
        watch: {},
        methods: {
            //   隐藏
            showPopLimit () {
                this.$store.commit('showPopLimit')
            },
            checkBetMoney () {
                console.log(this.areaMsg.pickMoney)
                if (isNaN(this.areaMsg.pickMoney)) {
                    Message({
                        message: 'Please enter the correct number',
                        type: 'error',
                    })
                    return false
                }

                if (Number(this.areaMsg.pickMoney) > 0.1) {
                    this.areaMsg.pickMoney = 0.1
                    Message({
                        message: 'Bet amount is between 0.0001 and 0.1 ETH',
                        type: 'error'
                    })
                    return false
                }
                if (Number(this.areaMsg.pickMoney) < 0.0001) {
                    this.areaMsg.pickMoney = 0.0001
                    Message({
                        message: 'Bet amount is between 0.0001 and 0.1 ETH',
                        type: 'error'
                    })
                    return false
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
                        message: 'Bet amount is between 0.0001 and 0.1 ETH',
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
                if (currpickMoney <= 0.0001) {
                    this.areaMsg.pickMoney = 0.0001
                    Message({
                        message: 'The minimum bet is 0.0001 ETH',
                        type: 'error'
                    })
                } else {
                    if (parseFloat((parseFloat(currpickMoney) - parseFloat(this.limitUnit)).toFixed(5)) < 0.0001) {
                        this.$emit('update:data', {
                            ...this.areaMsg,
                            pickMoney: 0.0001
                        })
                        Message({
                            message: 'The minimum bet is 0.0001 ETH',
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
                        if (this.areaMsg && this.areaMsg.pickType) {
                            if (currpickNum.length >= parseFloat(this.areaMsg.pickType)) {
                                if (parseFloat(this.areaMsg.pickType) === 1) {
                                    Message({
                                        message: 'You have already chosen ' + parseFloat(this.areaMsg.pickType) + ' number',
                                        type: 'error'
                                    })
                                } else {
                                    Message({
                                        message: 'You have already chosen ' + parseFloat(this.areaMsg.pickType) + ' numbers',
                                        type: 'error'
                                    })
                                }
                            } else {
                                currpickNum.push(parseFloat(dataFlag))
                            }
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
            formateBalance: (val = 0) => {
                var newEth = null
                if (isNaN(val) || isNaN(Number(val))) {
                    console.error('formateBalance error' + val)
                    return 0
                }
                val = Number(val)
                if (val > 10000000) {
                    newEth = (val / 100000000).toFixed(1) + '亿'
                } else if (val > 100000) {
                    newEth = (val / 10000).toFixed(1) + '万'
                } else if (val > 1000) {
                    newEth = parseFloat(val.toFixed(0))
                } else if (val > 100) {
                    newEth = val.toFixed(3)
                } else if (val > 10) {
                    newEth = val.toFixed(4)
                } else {
                    newEth = val.toFixed(5)
                    // 如果需要去掉零 用parseFloat(  )
                }
                return newEth
            }
        },
        computed: {
            syxw_bettype_odds () {
                return this.$store.state.cs_1105.syxw_bettype_odds
            }
        },
        mounted () {
        },
        filters: {
            formateCoinType: (type = '2001') => {
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
            format_match: (match) => {
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
            formateBalance: (val = 0) => {
                var newEth = null
                if (isNaN(val) || isNaN(Number(val))) {
                    console.error('formateBalance error' + val)
                    return 0
                }
                val = Number(val)
                if (val > 10000000) {
                    newEth = (val / 100000000).toFixed(1) + '亿'
                } else if (val > 100000) {
                    newEth = (val / 10000).toFixed(1) + '万'
                } else if (val > 1000) {
                    newEth = parseFloat(val.toFixed(0))
                } else if (val > 100) {
                    newEth = val.toFixed(3)
                } else if (val > 10) {
                    newEth = val.toFixed(4)
                } else {
                    newEth = val.toFixed(5)
                    // 如果需要去掉零 用parseFloat(  )
                }
                return newEth
            }
        }
    }
</script>
<style scoped>
    .winjackport{
        display: inline-block;
    }
</style>
