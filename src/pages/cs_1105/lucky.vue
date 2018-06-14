<template>
    <div class="">
        <!--v-for="item in aa" :data.sync="item"-->
        <Header></Header>
        <HeaderNav></HeaderNav>
        <div class="main">
            <!--玩法区-->
            <div class="play-area" id="play-area">
                <ul class="play-area-items">
                    <PlayArea v-for="(item,index) in playArea" :key="index" :allplayArea.sync="playArea" :areaMsg="item"
                              :data.sync="playArea[index]"></PlayArea>

                </ul>
                <!-- Lucky 11 show  647 356 奖级表 -->
                <div class="pop pop-rewardTable js_pop_rewardTable hide">
                    <div class="pop-main">
                        <h3>LUCKY 11</h3>
                        <div class="pay-items">
                            <table>
                                <thead>
                                <tr>
                                    <td width="90px">Type</td>
                                    <td>Conditions</td>
                                    <td width="90px">Reward ratio</td>
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
                                    <td>C5</td>
                                    <td>Pick 5 numbers and hit 5/5 draw numbers</td>

                                    <td><i class="bold">378</i></td>
                                </tr>
                                <tr>
                                    <td>C4</td>
                                    <td>Pick 4 numbers and hit 4/5 draw numbers</td>

                                    <td><i class="bold">54</i></td>
                                </tr>
                                <tr>
                                    <td>C3</td>
                                    <td>Pick 3 numbers and hit 3/5 draw numbers</td>

                                    <td><i class="bold">13.5</i></td>
                                </tr>
                                <tr>
                                    <td>C2</td>
                                    <td>Pick 2 numbers and hit 2/5 draw numbers</td>

                                    <td><i class="bold">4.5</i></td>
                                </tr>
                                <tr>
                                    <td>C1</td>
                                    <td>Pick 1 number and hit 1/5 draw numbers</td>

                                    <td><i class="bold">1.8</i></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="btn-area">
                    <span class="fee-count hide">
                        Fee&nbsp&nbsp<i><span class="js_gasNumber">0</span>ETH</i>
                    </span>
                    <a href="javascript:;" @click="addTicket" class="addmore">Add Ticket</a>
                </div>
                <div class="btn-play-now">
                    <a href="javascript:;" @click="playNow">
                        Play Now
                    </a>
                    <span>Total Pay</span>
                    <p class="total-pay ">{{ totalPay }} ETH</p>
                </div>
                <div id="stars1" class="stars"></div>
                <div id="stars2" class="stars"></div>
            </div>
            <!--  往期开奖  -->
            <div class="pre-numberBox">
                <div class="pre-number tab js_tab">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="Recent Bets" name="Bets">
                            <div class="prenum-table">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Transaction Time</th>
                                        <th>User ID</th>
                                        <th>No.</th>
                                        <th>Type</th>
                                        <th>Bet Number</th>
                                        <th>Bet Amount</th>
                                        <th>Prize Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody v-if="recentBet.length>0" id="tabody-betlist"
                                           class="tabody-betlist newRecord">
                                    <tr v-for="item in recentBet" :data-oid="item.oid">
                                        <td>{{ item.create_time | formatTime("HH:mm:ss") }}</td>
                                        <td>{{ item.uid }}</td>
                                        <td>{{ item.expectid }}</td>
                                        <td>{{ item.bettype | format_match }}</td>
                                        <td>
                                            <ul class="num-box" v-html="item.openCodeVal">
                                            </ul>
                                        </td>
                                        <td>{{ item.betmoney | formateBalance }}{{ item.cointype | formateCoinType }}
                                        </td>
                                        <td class="js_resultDom" v-html="item.newTbody">

                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p class="recode20">Last 20 records</p>
                        </el-tab-pane>
                        <el-tab-pane label="Recent Wins" name="Wins">
                            <div class="winner-list">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>No.</th>
                                        <th>Type</th>
                                        <th>Bet Number</th>
                                        <th>Bet Amount</th>
                                        <th>Prize Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <!--jackpot-->
                                    <tr class="hide">
                                        <td>1803281404</td>
                                        <td>1803281404</td>
                                        <td>C5</td>
                                        <td>
                                            <ul class="num-box">
                                                <li>3</li>
                                                <li>5</li>
                                                <li>6</li>
                                                <li>9</li>
                                                <li>11</li>
                                            </ul>
                                        </td>
                                        <td><span>0.01</span>ETH</td>
                                        <td>
                                        <span class="win">
                                            <span>21.5</span> ETH
                                        </span>
                                        </td>
                                    </tr>
                                    <tr v-for="data in DataWinnerList">
                                        <td>
                                            {{data.uid}}
                                        </td>
                                        <td>
                                            {{data.expectid}}
                                        </td>
                                        <td>
                                            {{data.bettype}}
                                        </td>
                                        <td v-html="data.betcode">
                                        </td>
                                        <td>
                                            {{data.betmoney}}
                                        </td>
                                        <td v-html="data.betprize">
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p class="recode20">Last 20 records</p>
                        </el-tab-pane>
                        <el-tab-pane label="How to Play" name="Play">
                            <ul class="introduct">
                                <li>
                                    <span>What is Lucky 11?</span>
                                    <p class="circle">
                                        Lucky 11 is a decentralized lottery product based on distributed ledger
                                        technology. Each draw is provably random and cryptographically secure thanks to
                                        the nature of the Ethereum blockchain.
                                    </p>
                                    <p class="circle">Blockchain-based data are featured with its unchangeableness and
                                        recognized by the whole network ,

                                        which means it can completely avoid black box operations.
                                        Thus, issues like information asymmetry or non-transparency could be addressed
                                        to give players a game platform with maximum fairness they have never enjoyed
                                        before.</p>
                                    <p class="circle">
                                        Players could randomly pick 1 to 5 numbers from 1 to 11 and submit it to the
                                        Ethereum blockchain.
                                    </p>
                                    <p class="circle">
                                        One draw per minute. The result is determined by the last hash value uploaded in
                                        the minute.
                                    </p>
                                    <p class="circle">
                                        If the chosen numbers match the draw result, the player wins the reward (virtual
                                        currency) stipulated in smart contract.
                                    </p>
                                </li>
                                <li>
                                    <span>How to play the game?</span>
                                    <p>Players will pick 1-5 numbers from 1 to 11. Players win the reward when the
                                        chosen numbers are in line with that of the draw result:</p>
                                    <p class="circle">Pick 1 number, players have 5/11 of the win probability with 1.8
                                        times return.</p>
                                    <p class="circle">Pick 2 numbers, players have 1/5.5 of the win probability with 4.5
                                        times return.</p>
                                    <p class="circle">Pick 3 numbers, players have 1/16.5 of the win probability with
                                        13.5 times return.</p>
                                    <p class="circle">Pick 4 numbers, players have 1/66 of the win probability with 54
                                        times return.</p>
                                    <p class="circle">Pick 5 numbers, players have 1/462 of the win probability with 378
                                        times return.</p>
                                    <p class="circle hide"> On the basis of the traditional choose five, users can
                                        choose
                                        additional
                                        "jackpot" game: choose five number and order, if the order of the selected five
                                        number
                                        consistent with the current of the lottery five number order, get jackpot
                                        reward,
                                        reward:<br/> award pool's formula = 50 * (jackpot amount bet amount)</p>
                                </li>
                                <li>
                                    <span>How to win the game?</span>
                                    <p>After closing the bet, all the betting information will be calculated through the
                                        Merkle Tree to get the Merkle number.
                                        And the Merkle number will be uploaded to the Ethereum, then get the hash value
                                        of this transaction’s block.
                                        The last 25 digits of the value will be divided into 5 groups. Each group has 5
                                        numbers, and it will be converted into a decimal number.
                                        The first group numbers will be processed through (x mod11 + 1) calculation.
                                        Then retrieving its current value as the first lottery number.
                                        The second group numbers will be processed through (x mod10+1) calculation, and
                                        by using same method,
                                        the second lottery number can be drew, and the rest can be done in the same
                                        manner. Finally, the five numbers calculated through this method will be draw
                                        result.</p>
                                </li>
                                <li>
                                    <span>How to ensure fairness?</span>
                                    <p class="circle">
                                        Unchangeable betting information<br>
                                        The draw result is based on hash value which was calculated from Merkle number.
                                        Since Merkle number has already uploaded to the Ethereum chain, the information
                                        cannot be modified.
                                    </p>
                                    <p class="circle">
                                        Fair draw<br>
                                        The draw numbers are selected from hash value, due to its unpredictability and
                                        unchangeableness, the fair draw can be assured.
                                    </p>
                                    <p class="circle">
                                        Fair reward<br>
                                        Both draw and reward distribution are based on Ethereum chain. Thus, there is no
                                        chance for the platform to interfere. All information and process is transparent
                                        and fair.
                                    </p>
                                    <p class="circle">No robot<br>
                                        Since all process is transparent and unchangeable, the platform cannot use any
                                        robot to do black box operations. The game is utterly fair.
                                    </p>
                                </li>
                            </ul>
                        </el-tab-pane>
                    </el-tabs>

                </div>
            </div>

            <!-- orderSucc -->
            <div class="pop pop-reg-success js_pop-order-success" :class="{'hide':!showOrderSucc}">
                <div class="pop-body">
                    <div class="pop-ani">
                        <div class="pop-main">
                            <a href="javascript:;" @click="showOrderSucc=false" class="btn-close">close</a>
                            <h3>Submit Successful</h3>
                            <div class="icon-face on">
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                                    <circle cx="20.5" cy="23.5" r="3.5" fill="#20bf6b"></circle>
                                    <circle cx="43.5" cy="23.5" r="3.5" fill="#20bf6b"></circle>
                                    <path class="mouth" d="M18 40 C28,45 33,46 46,40" stroke="#20bf6b" fill="none"
                                          style="stroke-width: 4px;"></path>
                                    <path class="cheek" d="M58 47  A 30 30 0 1 0 50 56" fill="none" stroke="#20bf6b"
                                          style="stroke-width: 4px;"></path>
                                </svg>
                            </div>
                            <p>Your order has been filed.</p>
                            <a href="javascript:;" @click="showOrderSucc=false"
                               class="btn-success js_btn-order-success">Good Luck</a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- pop-reg-failure -->
            <div class="pop pop-reg-failure" :class="{'hide':!showOrderFail}">
                <div class="pop-body">
                    <div class="pop-ani">
                        <div class="pop-main">
                            <a href="javascript:;" @click="showOrderFail=false" class="btn-close">close</a>
                            <h3>submission failed</h3>
                            <div class="icon-face on">
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                                    <circle cx="20.5" cy="23.5" r="3.5" fill="#fc5c65"></circle>
                                    <circle cx="43.5" cy="23.5" r="3.5" fill="#fc5c65"></circle>
                                    <path class="mouth" d="M18 40 C28,30 33,30 46,40" stroke="#fc5c65" fill="none"
                                          style="stroke-width: 4px;"></path>
                                    <path class="cheek" d="M58 47  A 30 30 0 1 0 50 56" fill="none" stroke="#fc5c65"
                                          style="stroke-width: 4px;"></path>
                                </svg>
                            </div>
                            <p>Due to {{ failureMsg }}, the order is unsuccess-<br>ful, please try
                                later</p>
                            <a href="javascript:;" @click="showOrderFail=false" class="btn-failure">Try Later</a>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <button @click="leaveRoute">离开页面</button>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '~components/Header.vue'
    import HeaderNav from '~pages/cs_1105/HeaderNav.vue'
    import PlayArea from '~pages/cs_1105/PlayArea.vue'
    import Footer from '~components/Footer.vue'
    import {mTypes, aTypes} from '~/store/cs_page/cs_1105'
    import {Message} from 'element-ui'
    import {src, platform, isLog, getCK, format_match, setCK, removeCK} from '~common/util'

    export default {
        data () {
            return {
                showOrderSucc: false,
                showOrderFail: false,
                failureMsg: '* *',
                scroll: '',
                activeName: 'Bets',
                DataWinnerList: [
                //                    {uid:1,expectid:2,bettype:'C1',betcode:'5',betmoney:'0.00010ETH',betprize:'0.00018 ETH'},
                ],
                totalPay: 0.0001,
                baseAreaMsg: {
                    createTime: 0,
                    pickType: '1', // 玩法类型1,2,3,4,5,5J
                    pickNum: [],
                    pickMoney: 0.0001,
                    pickJackPot: [] // 奖池用
                },
                playArea: [{
                    createTime: 0,
                    pickType: '1', // 玩法类型1,2,3,4,5,5J
                    pickNum: [],
                    pickMoney: 0.0001,
                    pickJackPot: [] // 奖池用
                }] // 玩法区 数组
            //			{
            //				pickType:'5J', //玩法类型
            //					pickNum:[3,6],
            //				pickMoney:0.0001,
            //				pickJackPot:[2,3,4,5,6]
            //			}

            }
        },
        watch: {
            playArea () {
                /* 总金额 */
                if (this.playArea) {
                    let sum = 0
                    this.playArea.forEach((val, index) => {
                        if (val.pickMoney) {
                            sum += parseFloat((parseFloat(val.pickMoney)).toFixed(5))
                        }
                    })
                    this.totalPay = parseFloat(sum.toFixed(5))
                }
            }
        },
        computed: {
            socket () {
                return this.$store.state.socket
            },
            recentBet () {
                return this.$store.state.cs_1105.recentBet
            },
            isLog () {
                return this.$store.state.isLog
            },
            currExpectId () {
                return this.$store.state.cs_1105.currExpectId
            }
        },
        methods: {
            playType (val) {
                // 玩法类型1,2,3,4,5,5J
                val = val.toString()
                switch (val) {
                case '1':
                    return '1101'
                case '2':
                    return '1102'
                case '3':
                    return '1103'
    
                    break
                case '4':
                    return '1104'
    
                    break
                case '5':
                    return '1105'
    
                    break
                case '5J':
                    return '1106'
    
                    break
                }
            },

            async playNow () {
                // 投注下单
                // 出现loading
            //                document.getElementById('js_loading').className = '';
                // 未登录 的情况
                if (!isLog) {
                    this.$store.commit('showLoginPop')
                    return false
                }
                // 选号是否完成？
                if (this.playArea) {
                    let noComplete = []
                    let noCompleteIndex = []
                    //	                createTime: 0,
                    //		                pickType: '1', //玩法类型1,2,3,4,5,5J
                    //		                pickNum: [],
                    //		                pickMoney: 0.0001,
                    //		                pickJackPot: []  // 奖池用
                    let beginBetStr = ''
                    this.playArea.forEach((val, index) => {
                        if (parseFloat(val.pickType) !== val.pickNum.length) {
                            noComplete.push('Ticket' + (index + 1))
                            noCompleteIndex.push(index)
                        }
                        beginBetStr += val.pickNum.join(',') + '#' + this.playType(val.pickType) + '@' + val.pickMoney + '$'
                    })
                    if (noComplete.length === 0) {
                        let sendBetStr = (this.currExpectId + '|' + beginBetStr).slice(0, -1)
                        let orderMsg = await this.$store.dispatch(aTypes.placeOrder, sendBetStr)
                        let errorResArr = []
                        if (orderMsg && orderMsg.status.toString() === '100') {
                            if (orderMsg.data.restricts.length === 0) {
                                // 全部成功订单
                                setTimeout(() => {
                                    this.playArea.forEach((val, index) => {
                                        val.pickNum = []
                                    })
                                }, 1000)
                                this.showOrderSucc = true
                            } else if (orderMsg.data.restricts.length > 0) {
                                // 部分成功订单
                                orderMsg.data.restricts.forEach(function (val, index) {
                                    errorResArr.push(val.betcode)
                                })
                                this.failureMsg = 'Order limit#' + errorResArr.join('#')
                                this.showOrderFail = true

                                setTimeout(() => {
                                    this.playArea.forEach((val, index) => {
                                        val.pickNum = []
                                    })
                                }, 1000)
                            } else {
                                //  全部失败订单
                                orderMsg.data.restricts.forEach(function (val, index) {
                                    errorResArr.push(val.betcode)
                                })

                                this.failureMsg = 'Order limit#' + errorResArr.join('#')
                                this.showOrderFail = true
                            }
                        }
                    } else {
                        Message({
                            message: 'Please pick correct numbers in ' + noComplete.join('&&'),
                            type: 'error'
                        })
                        // 震动 报错
                        //	                    js_playArea-li
                        noCompleteIndex.forEach((val, index) => {
                            if (document.querySelectorAll('.play-area-items .js_playArea-li')[val]) {
                                document.querySelectorAll('.play-area-items .js_playArea-li')[val].className = 'js_playArea-li'
                                document.querySelectorAll('.play-area-items .js_playArea-li')[val].className = 'js_playArea-li error-shake'
                            }
                        })
                    }
                    // 动画 socket
                }

                // 未激活 ？  这个也有问题  在弄个弹窗吧
            //				this.$store.commit('emailBackTime', 0)
            //				this.$store.commit('showVerifyEmail')
            },
            addTicket () {
                /* 添加 */
                if (this.playArea && this.playArea.length < 5) {
                    this.baseAreaMsg.createTime = new Date().getTime()
                    this.playArea.push(this.baseAreaMsg)
                } else {
                    Message({
                        message: 'No more than 5 tickets',
                        type: 'error'
                    })
                }
            },
            testPlay () {
                console.log(this.playArea)
            },
            leaveRoute () {
                this.$router.push('/account')
            },
            fixNav () {
                // this.scroll = document.documentElement.scrollTop || document.body.scrollTop
                if (this.scroll >= 90) {
                    this.$store.commit(mTypes.setNavFix, true)
                } else {
                    this.$store.commit(mTypes.setNavFix, false)
                }
            },

            format_betCode (betcode) {
                let currLuckyNum = betcode.split(',')
                let str = '<ul class="num-box">'
                currLuckyNum.forEach(function (value, index) {
                    str += `<li class="bingo">${value}</li>`
                })
                return str + '</ul>'
            },
            format_recentWins (msg) {
                msg.forEach((item, index) => {
                    item.bettype = format_match(item.bettype)
                    item.betcode = this.format_betCode(item.betcode)
                    item.betmoney = parseFloat(item.betmoney).toFixed(5) + 'ETH'
                    item.betprize = '<span class="win"><span>' + parseFloat(item.betprize).toFixed(5) + '</span>ETH</span>'
                })
                return msg
            },

            async indexRouter (query) {
                /* 邮箱注册 找回密码  邀请等 */
                if (query.sign) {
                    if (query.from === 'reg') {
                        let mailBack = await this.$store.dispatch(aTypes.mailActivate, query.sign)
                        console.log(mailBack)
                        if (mailBack && mailBack.status === '100') {
                            if (parseFloat(mailBack.data.login_times) > 0 && mailBack.data.invite_status.toString() === '0') {
                            //		                        显示第一次邀请
                                this.$store.commit('showFirstLogin', true)
                            } else {
                                this.$store.commit('showFirstLogin', false)
                            }
                            this.$store.commit('showRegSuccess')
                        } else {
                            Message({
                                message: mailBack.message,
                                type: 'error'
                            })
                        }
                        // 清除参数
                    //                        this.$router.push('/lucky')
                    }
                    if (query.from === 'resetPassword') {
                        // 重置密码
                        this.$store.commit('setResetObj', {
                            email: query.email,
                            sign: query.sign,
                            showReset: true
                        })
                        this.$store.commit('showResetPwd')
                        // 修改密码的时候，清楚ck
                        removeCk()
                    }
                    if (query.inviter) {
                        // 邀请
                        this.$store.commit('setInviterObj', {
                            inviter: query.inviter,
                            sign: query.sign
                        })
                    }
                }
            }
        },
        components: {
            Footer,
            Header,
            HeaderNav,
            PlayArea
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
            formatTime: (time, format) => {
                if (format === undefined || format == null) {
                    format = 'MM-dd HH:mm:ss'
                }
                if (isNaN(time)) {
                    return false
                }
                let t = new Date(+time * 1000)
                let tf = function (i) {
                    return (i < 10 ? '0' : '') + i
                }
                return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                    switch (a) {
                    case 'yyyy':
                        return tf(t.getFullYear())
                    case 'MM':
                        return tf(t.getMonth() + 1)
                    case 'mm':
                        return tf(t.getMinutes())
                    case 'dd':
                        return tf(t.getDate())
                    case 'HH':
                        return tf(t.getHours())
                    case 'ss':
                        return tf(t.getSeconds())
                    }
                })
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
        async mounted () {
            window.addEventListener('scroll', this.fixNav)
            if (this.$store.state.route.query) {
                this.indexRouter(this.$store.state.route.query)
            }
            let dataRecentWinsList = await this.$store.dispatch(aTypes.getRecentWinsList)
            this.DataWinnerList = this.format_recentWins(dataRecentWinsList)
            if (!(this.socket && this.socket.sock)) {
                this.$store.dispatch('initWebsocket')
            }
        },
        beforeRouteLeave (to, from, next) {
            // 是否需要主队断sock ？
            // this.$store.state.socket.sock.onclose();
            // this.$store.dispatch('unsubscribe')
            // this.$store.dispatch('subscribe')
            next()
    },
        destroyed () {
            window.removeEventListener('scroll', this.fixNav)
        }

    }
</script>
<style lang="less" rel="stylesheet/less">
    @import "../../styles/lib-mixins.less";
    //index
    .main {
        position: relative;
        width: 100%;
        overflow: hidden;
    }

    //玩法区
    .play-area {
        position: relative;
        padding-bottom: 40px;
        color: #778ca3;
        background: #5068bc;
        background: linear-gradient(to right, #4b6584, #655aae, #545f94);
        .play-area-top {
            position: relative;
            height: 35px;
            line-height: 35px;
            margin-bottom: 23px;
        }
        .play-type-choose {
            position: absolute;
            left: 10px;
            top: 0;
            width: 115px;
            overflow: hidden;
            font-size: 14px;
            color: #6a89cc;
            cursor: pointer;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            text-indent: 20px;
            border: 1px solid #ced6e0;
            &:hover {
                border-color: #778ca3;
            }
            &::after {
                content: '';
                position: absolute;
                right: 17px;
                top: 14px;
                display: block;
                background-image: url("../../assets/slice/arrow-down-778ca3.png");
                width: 13px;
                height: 8px;
            }
            span {
                display: block;
                height: 35px;
                line-height: 35px;
            }
            span.jack {
                box-sizing: border-box;
                text-indent: 0;
                line-height: 16px;
                padding: 10px 0 7px 20px;
                height: auto;
            }
            ul {
                //设置为displaynone的话第一次不会有动画
                display: none;
                position: relative;
                width: 100%;
                background: #fff;
                z-index: 9;
                li {
                    padding: 7px 0;
                    line-height: 16px;
                    color: #6a89cc;
                    border-top: 1px solid #778ca3;
                }
                li.on, li:hover {
                    background: #eef1f9;
                    color: #263648;
                }
            }
        }
        .play-tips {
            float: left;
            margin-left: 170px;
            font-size: 12px;
            a {
                margin-left: 10px;
                &.on {
                    color: #263648;
                }
            }
        }
        .limit-tips {
            margin-right: 100px;
            float: right;
            font-size: 12px;
            text-transform: capitalize;
        }
        .play-area-items {
            position: relative;
            z-index: 2;
            width: 1190px;
            padding-top: 40px;
            margin: 0 auto;
            > li {
                position: relative;
                height: 200px;
                //padding:22px 0 26px 50px;
                background: #fff;
                border-radius: 6px;
                .transition();
                &:hover {
                    -webkit-box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
                }
            }
            > li:not(:first-child) {
                &:hover {
                    .btn-close {
                        visibility: visible;
                    }
                }
            }
            > li + li {
                margin-top: 20px;
            }
            .line {
                float: left;
                width: 150px;
                line-height: 58px;
                text-indent: 92px;
                font-size: 14px;
                color: #778ca3;
            }
            .number-box {
                overflow: hidden;
                float: left;
                margin-bottom: 26px;
                li {
                    cursor: pointer;
                    float: left;
                    width: 58px;
                    height: 58px;
                    overflow: hidden;
                    border-radius: 50%;
                    text-align: center;
                    line-height: 58px;
                    background: #eef1f9;
                    font-size: 28px;
                    font-weight: bold;
                    color: #6a89cc;
                    .transition();
                    &:hover {
                        color: #f69543;
                    }
                }
                li.on {
                    color: #fff;
                    background: #f69543;
                }
                li + li {
                    margin-left: 10px;
                }
            }
            .btn-random-pick {
                position: absolute;
                top: 70px;
                right: 140px;
                display: block;
                width: 100px;
                height: 30px;
                overflow: hidden;
                text-align: center;
                line-height: 30px;
                background: #eef1f9;
                color: #778ca3;
                border-radius: 6px;
                .transition();
                &:hover {
                    background: #dfe4f2;
                    color: #263648;
                }
            }
            .btn-delete {
                position: absolute;
                top: 70px;
                right: 100px;
                width: 30px;
                height: 30px;
                background: #eef1f9;
                border-radius: 6px;
                &::after {
                    content: '';
                    display: block;
                    margin: 6px auto;
                    background-image: url("../../assets/slice/delete.png");
                    width: 18px;
                    height: 18px;
                }
                &:hover {
                    background: #dfe4f2;
                    &::after {
                        content: '';
                        display: block;
                        margin: 6px auto;
                        background-image: url("../../assets/slice/delete2.png");
                        width: 18px;
                        height: 18px;
                    }
                }
            }
            .beting {
                //.flex-display();
                //justify-content: center;
                float: left;
                margin: 0 0 0 288px;
                //738 跟上方11个num区域同宽，需要对齐居中
                width: 738px;
                height: 38px;
                line-height: 38px;
                > * {
                    display: inline-block;
                    *display: inline;
                    zoom: 1;
                    vertical-align: top;
                }
            }
            .btn-close {
                visibility: hidden;
                position: absolute;
                top: 11px;
                right: 23px;
            }
            .btn-beting {
                position: relative;
                width: 160px;
                height: 36px;
                margin: 0 10px 0 7px;
                overflow: hidden;
                border-radius: 6px;
                line-height: 36px;
                border: 1px solid #d5d5d5;
                font-size: 16px;
                .transition();
                input {
                    float: left;
                    width: 114px;
                    height: 36px;
                    overflow: hidden;
                    line-height: 36px;
                    text-align: center;
                    border: none;
                    outline: none;
                    font-size: 20px;
                }
                input::-webkit-input-placeholder {
                    color: #6a89cc;
                }
                input::-moz-placeholder { /* Mozilla Firefox 19+ */
                    color: #6a89cc;
                }
                input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                    color: #6a89cc;
                }
                input:-ms-input-placeholder { /* Internet Explorer 10-11 */
                    color: #6a89cc;
                }
                .btn-beting-add, .btn-beting-low {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 45px;
                    height: 50%;
                    overflow: hidden;
                    line-height: 18px;
                    text-align: center;
                    border-left: 1px solid #d5d5d5;
                    box-sizing: border-box;
                    font-size: 0;
                    text-indent: -99999px;
                    .transition();
                    &:hover {
                        background: #eef1f9;
                    }
                }
                .btn-beting-add {
                    &::after {
                        .transition();
                        content: '';
                        display: block;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        margin-top: -4px;
                        margin-left: -6px;
                        background-image: url(../../assets/slice/arrow-top.png);
                        width: 13px;
                        height: 8px;
                    }
                }
                .btn-beting-low {
                    &::after {
                        .transition();
                        content: '';
                        display: block;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        margin-top: -4px;
                        margin-left: -6px;
                        background-image: url(../../assets/slice/arrow-down.png);
                        width: 13px;
                        height: 8px;
                    }
                    top: 18px;
                    border-top: 1px solid #d5d5d5;
                }
                &:hover {
                    border-color: #778ca3;
                    * {
                        border-color: #6a89cc;
                    }
                }
            }
            .winning {
                font-size: 14px;
                margin-left: 20px;
                color: #778ca3;
                .winMoney {
                    color: #f69543;
                }
            }
        }
        .btn-area {
            position: relative;
            z-index: 2;
            width: 1190px;
            margin: 0 auto 0;
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: #fff;
            .addmore {
                display: block;
                position: absolute;
                top: 10px;
                right: 3px;
                width: 98px;
                height: 28px;
                overflow: hidden;
                border: 1px solid #907eef;
                text-align: center;
                line-height: 28px;
                color: #fff;
                border-radius: 6px;
                .transition();
                &:hover {
                    border-color: #eef1f9;
                }
            }
        }
        .btn-play-now {
            position: relative;
            z-index: 2;
            width: 537px;
            height: 68px;
            overflow: hidden;
            background: #fd9644;
            border-radius: 6px;
            margin: 0 auto;
            text-align: center;
            color: #fff;
            .transition();
            a {
                display: block;
                width: 100%;
                height: 100%;
                line-height: 68px;
                font-size: 28px;
                color: #fff;
                font-family: sans-eb;
            }
            span, p {
                position: absolute;
                right: 18px;
                line-height: 17px;
            }
            span {
                top: 18px;
            }
            p {
                top: 35px;
            }
            &:hover {
                width: 537px;
                height: 68px;
                background-image: url("../../assets/img/btn-bg.png");
                -webkit-animation: masked-animation 1s infinite ease;
                animation: masked-animation 1s infinite ease;
            }
            &.unable {
                background-image: none;
                a {
                    cursor: not-allowed;
                }
            }
        }
        .order-box {
            position: absolute;
            left: 50px;
            bottom: 27px;
            overflow: hidden;
            line-height: 24px;
            p {
                float: left;
                font-size: 12px;
            }
            .num-box {
                float: left;
                margin-left: 10px;
                li {
                    font-weight: bold;
                }
                li.on {
                    background: #f69543;
                    color: #fff;
                }
                li + li {
                    margin-left: 5px;
                }
            }
        }
    }

    @-webkit-keyframes masked-animation {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: -200% 0;
        }
    }

    @keyframes masked-animation {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: -200% 0;
        }
    }

    //奖级表
    .pop-rewardTable {
        position: absolute;
        left: 50%;
        top: 40px;
        margin-left: -335px;
        width: 671px;
        height: 385px;
        overflow: visible;
        background: rgba(0, 0, 0, 0);
        border-top: 40px solid transparent;
        text-transform: none;
        h3 {
            margin: 15px 0;
        }
        .pop-main {
            padding: 20px;
            .rounded();
            -webkit-box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }
        .pay-items {
            margin-top: 10px;
        }
        thead tr {
            margin-top: 10px;
            height: 35px;
            line-height: 35px;
            border-bottom: 2px solid #f2f2f2;
            font-size: 12px;
            color: #778ca3;
        }
        tbody tr {
            height: 40px;
            padding: 10px 0;
            line-height: 20px;
            border-bottom: 2px solid #ededed;
        }
        tbody tr:first-child {
            height: 60px;
        }
    }

    //往期开奖

    .pre-numberBox {
        border-top: 30px solid #eef1f9;
        position: relative;
        width: 100%;
        background: #eef1f9;
        z-index: 4;
    }

    .pre-number {
        position: relative;
        width: 1090px;
        background: #fff;
        margin: 0 auto 0;
        padding: 20px 50px 0;
        .tab-head {
            position: relative;
            height: 60px;
            line-height: 60px;
            border-bottom: 2px solid #f5f5f5;
            > span {
                display: block;
                position: absolute;
                left: 0;
                bottom: -2px;
                width: 109px;
                height: 2px;
                overflow: hidden;
                background: #333;
            }
            li {
                display: inline-block;
                *display: inline;
                zoom: 1;
                margin-right: 77px;
            }
            li.on {
                a {
                    color: #333;
                }
            }
            a {
                display: block;
                height: 100%;
                font-size: 20px;
                color: #6a89cc;
                &:hover {
                    color: #333;
                }
            }
        }
        .tab-cnt {
            //为了不抖动
            min-height: 321px;
            > li {
                display: none;
            }
            > li.on {
                display: block;
            }
        }
        .recode20 {
            position: absolute;
            right: 70px;
            bottom: 30px;
            font-size: 12px;
            color: #778ca3;
        }
    }

    .prenum-table {
        overflow: hidden;
        padding-bottom: 63px;
        th {
            //width:12.5%;
        }
    }

    .winner-list, .prenum-table {
        padding-top: 16px;
    }

    //WINNER LIST
    .winner-list {
        padding-bottom: 63px;
        text-align: center;
        tr.jackpot {
            background: #fff3e1;
        }
        .icon-jackpot {
            &::after {
                margin-left: 50px;
            }
        }
    }

    .winner-list, .prenum-table {
        padding-top: 16px;
    }

    /*introduct*/
    .introduct {
        padding: 13px 0 46px 0;
        span {
            display: block;
            line-height: 46px;
            font-size: 12px;
            color: #778ca3;
        }
        li + li {
            margin-top: 20px;
        }
        p {
            line-height: 22px;
        }
        p.circle {
            position: relative;
            padding-left: 16px;
            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 8px;
                display: block;
                background-image: url("../../assets/slice/circle.png");
                width: 5px;
                height: 5px;
            }
        }
    }
</style>
