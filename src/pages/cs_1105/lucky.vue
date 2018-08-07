<template>
    <div id="lucky11" :class="{'superActive':superClass}" >
        <Banner class="hide" v-on:superBannerChange="superChange"></Banner>
        <Header></Header>
        <HeaderNav ref="headerNav" v-on:superChange="superChange"></HeaderNav>
        <div class="main">
            <Lucky-mybet></Lucky-mybet>
            <!--玩法区-->
            <div class="play-area" id="play-area">
                <ul class="play-area-items">
                    <PlayArea v-for="(item,index) in playArea" :key="index" :currIndex.sync="index"
                              :allplayArea.sync="playArea" :areaMsg="item"
                              :data.sync="playArea[index]"></PlayArea>
                </ul>
                <div class="btn-area">
                    <a href="javascript:;" @click="addTicket" class="addmore">
                        <lang>Add Ticket</lang>
                    </a>
                </div>
                <!--js_startBetBtn 用的 -->
                <div id="js_startBetBtn" class="btn-play-now">
                    <a href="javascript:;" @click="playNow">
                        <lang>Play Now</lang>
                    </a>
                    <span>
                        <lang>Total Pay</lang>
                    </span>
                    <p class="total-pay ">{{ totalPay }} {{ currBalance.cointype | formateCoinType }}</p>
                </div>
                <!--  背景泡泡 激活模式隐藏  -->
                <div class="star-box" :class="{'hide':superClass}">
                    <div id="stars1" class="stars"></div>
                    <div id="stars2" class="stars"></div>
                </div>
            </div>
            <!--  往期开奖  -->
            <div class="pre-numberBox">
                <div class="pre-number tab ">
                    <el-tabs v-model="activeName" @tab-click="handleRecentWin">
                        <el-tab-pane :label="_('Recent Bets')" name="Bets">
                            <div class="prenum-table">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>
                                            <lang>Transaction Time</lang>
                                        </th>
                                        <th>
                                            <lang>User ID</lang>
                                        </th>
                                        <th>
                                            <lang>No.</lang>
                                        </th>
                                        <th>
                                            <lang>Type</lang>
                                        </th>
                                        <th>
                                            <lang>Bet Number</lang>
                                        </th>
                                        <th>
                                            <lang>Bet Amount</lang>
                                        </th>
                                        <th>
                                            <lang>Prize Amount</lang>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody v-if="recentBet.length>0" id="tabody-betlist" class="tabody-betlist newRecord">
                                        <tr v-for="(item, index) in recentBet" :data-oid="item.oid" :class="{ 'newRecord':item.addNewRecord }" :key="index">
                                            <td>{{ item.create_time | formatTime("HH:mm:ss") }}</td>
                                            <td :class="{'bold':item.boldUid}">{{ item.uid }}</td>
                                            <td>{{ item.expectid }}</td>
                                            <td>{{ item.bettype | formatMatch }}</td>
                                            <!--icon-jackpot-->
                                            <td :class="{'icon-jackpot' : item.win_jackpot === 1 }" >
                                                <ul class="num-box" v-html="item.openCodeVal">
                                                </ul>
                                            </td>
                                            <td>{{ item.betmoney | formateBalance }}{{ item.cointype | formateCoinType }}
                                            </td>
                                            <td v-html="item.newTbody">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p class="recode20">
                                <lang>Last 20 records</lang>
                            </p>
                        </el-tab-pane>
                        <el-tab-pane :label="_('Recent Wins')" name="Wins">
                            <div class="winner-list">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>
                                            <lang>User ID</lang>
                                        </th>
                                        <th>
                                            <lang>No.</lang>
                                        </th>
                                        <th>
                                            <lang>Type</lang>
                                        </th>
                                        <th>
                                            <lang>Bet Number</lang>
                                        </th>
                                        <th>
                                            <lang>Bet Amount</lang>
                                        </th>
                                        <th>
                                            <lang>Prize Amount</lang>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <!--jackpot-->
                                    <!--<tr class="hide">-->
                                        <!--<td>1803281404</td>-->
                                        <!--<td>C5</td>-->
                                        <!--<td>-->
                                            <!--<ul class="num-box">-->
                                                <!--<li>3</li>-->
                                            <!--</ul>-->
                                        <!--</td>-->
                                        <!--<td><span>0.01</span>ETH</td>-->
                                        <!--<td>-->
                                        <!--<span class="win">-->
                                            <!--<span>21.5</span> ETH-->
                                        <!--</span>-->
                                        <!--</td>-->
                                    <!--</tr>-->
                                    <tr v-for="(data, index) in DataWinnerList" :key="index" :class="{jackpot:data.win_jackpot === '1'}">
                                        <!--icon-jackpot-->
                                        <td :class="{'icon-jackpot':data.win_jackpot == '1'}">
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
                            <p class="recode20">
                                <lang>Last 20 records</lang>
                            </p>
                        </el-tab-pane>
                        <el-tab-pane :label="_('How to Play')" name="Play">
                            <ul class="introduct">
                                <li>
                                    <span>
                                        <lang>What is Lucky 11?</lang>
                                    </span>
                                    <p class="circle">
                                        <lang>Lucky 11 is a decentralized lottery product based on distributed ledger technology. Each draw is provably random and cryptographically secure thanks to the nature of the Ethereum blockchain.</lang>
                                    </p>
                                    <p class="circle">
                                        <lang>Blockchain-based data are featured with its unchangeableness and recognized by the whole network, which means it can completely avoid black box operations. Thus, issues like information asymmetry or non-transparency could be addressed to give players a game platform with maximum fairness they have never enjoyed before.</lang>
                                    </p>
                                    <p class="circle">
                                        <lang>Players could randomly pick 1 to 5 numbers from 1 to 11 and submit it to the Ethereum blockchain.</lang>
                                    </p>
                                    <p class="circle">
                                        <lang>One draw per minute. The result is determined by the last hash value uploaded in the minute.</lang>
                                    </p>
                                    <p class="circle">
                                        <lang>If the chosen numbers match the draw result, the player wins the reward (virtual currency) stipulated in smart contract.</lang>
                                    </p>
                                </li>
                                <li>
                                    <span>
                                        <lang>How to play the game?</lang>
                                    </span>
                                    <p>
                                        <lang>Players will pick 1-5 numbers from 1 to 11. Players win the reward when the chosen numbers are in line with that of the draw result:</lang>
                                    </p>
                                    <p class="circle">
                                        <lang>Pick 1 number, players have 5/11 of the win probability with 1.8 times return.</lang>
                                    </p>
                                    <p class="circle">
                                        <lang>Pick 2 numbers, players have 1/5.5 of the win probability with 4.5 times return.</lang>
                                    </p>
                                    <p class="circle">
                                        <lang>Pick 3 numbers, players have 1/16.5 of the win probability with 13.5 times return.</lang>
                                    </p>
                                    <p class="circle">
                                        <lang>Pick 4 numbers, players have 1/66 of the win probability with 54 times return.</lang>
                                    </p>
                                    <p class="circle">
                                        <lang>Pick 5 numbers, players have 1/462 of the win probability with 378 times return.</lang>
                                    </p>
                                    <p class="circle hide">
                                        <lang>On the basis of the traditional choose five, users can choose additional "jackpot" game: choose five number and order, if the order of the selected five number consistent with the current of the lottery five number order, get jackpot reward, reward:</lang><br/>
                                        <lang>award pool's formula = 50 * (jackpot amount bet amount)</lang>
                                    </p>
                                </li>
                                <li>
                                    <span>
                                        <lang>How to win the game?</lang>
                                    </span>
                                    <p>
                                        <lang>After closing the bet, all the betting information will be calculated through the Merkle Tree to get the Merkle number. And the Merkle number will be uploaded to the Ethereum, then get the hash value of this transaction's block. The last 25 digits of the value will be divided into 5 groups. Each group has 5 numbers, and it will be converted into a decimal number. The first group numbers will be processed through (x mod11 + 1) calculation. Then retrieving its current value as the first lottery number. The second group numbers will be processed through (x mod10+1) calculation, and by using same method, the second lottery number can be drew, and the rest can be done in the same manner. Finally, the five numbers calculated through this method will be draw result.</lang>
                                    </p>
                                </li>
                                <li>
                                    <span>
                                        <lang>How to ensure fairness?</lang>
                                    </span>
                                    <p class="circle">
                                        <lang>Unchangeable betting information</lang><br>
                                        <lang>The draw result is based on hash value which was calculated from Merkle number. Since Merkle number has already uploaded to the Ethereum chain, the information cannot be modified.</lang>
                                    </p>
                                    <p class="circle">
                                        <lang>Fair draw</lang><br>
                                        <lang>The draw numbers are selected from hash value, due to its unpredictability and unchangeableness, the fair draw can be assured.</lang>
                                    </p>
                                    <p class="circle">
                                        <lang>Fair reward</lang><br>
                                        <lang>Both draw and reward distribution are based on Ethereum chain. Thus, there is no chance for the platform to interfere. All information and process is transparent and fair.</lang>
                                    </p>
                                    <p class="circle">
                                        <lang>No robot</lang><br>
                                        <lang>Since all process is transparent and unchangeable, the platform cannot use any robot to do black box operations. The game is utterly fair.</lang>
                                    </p>
                                </li>
                            </ul>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>

            <!-- orderSucc -->
            <div class="pop pop-reg-success " :class="{'hide':!showOrderSucc}">
                <div class="pop-body">
                    <div class="pop-ani">
                        <div class="pop-main">
                            <a href="javascript:;" @click="showOrderSucc=false" class="btn-close">close</a>
                            <h3>
                                <lang>Submit Successful</lang>
                            </h3>
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
                            <p>
                                <lang>Your order has been filed.</lang>
                            </p>
                            <a href="javascript:;" @click="showOrderSucc=false" class="btn-success ">
                                <lang>Good Luck</lang>
                            </a>
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
                            <h3>
                                <lang>submission failed</lang>
                            </h3>
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
                            <p>{{_('Due to {0}, the order is unsuccessful, please try later', failureMsg)}}</p>
                            <a href="javascript:;" @click="showOrderFail=false" class="btn-failure">
                                <lang>Try Later</lang>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <a @click="superChange('superIn')" class="icon-enterWorld">
                <img src="@assets/img/lucky11/jackpot-left.png"/>
            </a>
        </div>
        <Footer class="lucky11"></Footer>
        <div style="z-index: 100" id="jsLoading" class="loading"></div>
    </div>
</template>

<script>
    import Header from '~components/Header.vue'
    import HeaderNav from '~pages/cs_1105/HeaderNav.vue'
    import Banner from '~components/banner'
    import PlayArea from '~pages/cs_1105/PlayArea.vue'
    import Footer from '~components/Footer.vue'
    import { mTypes, aTypes } from '~/store/cs_page/cs_1105'
    import { Message } from 'element-ui'
    import {formateCoinType, formatMatch, formateBalance, removeCK, formatTime} from '~common/util'
    import LuckyMybet from './components/lucky-mybet'

    export default {
        data () {
            return {
                showOrderSucc: false,
                showOrderFail: false,
                failureMsg: '* *',
                scroll: '',
                activeName: 'Bets',
                DataWinnerList: [
                    // {uid:1,expectid:2,bettype:'C1',betcode:'5',betmoney:'0.00010ETH',betprize:'0.00018 ETH'},
                ],
                totalPay: 0.0001,
                baseAreaMsg: {
                    pickType: '1', // 玩法类型1,2,3,4,5,5J
                    pickNum: [],
                    pickMoney: 0.0005,
                    pickJackPot: [] // 奖池用
                },
                playArea: [], // 玩法区 数组,
                jackpot: false,
                'icon-jackpot': false,
                superClass: false
            }
        },
        watch: {
            isLog (val) {
                this.updateBaseAreaMsg()
            },
            currBalance (newVal, oldVal) {
                if (newVal.cointype !== oldVal.cointype) {
                    this.updateBaseAreaMsg()
                }
            },
            playArea: {
                handler () {
                    /* 总金额 */
                    if (this.playArea) {
                        let sum = 0
                        let hasPick5J = false
                        this.playArea.forEach((val, index) => {
                            if (val.pickMoney) {
                                sum += parseFloat((parseFloat(val.pickMoney)).toFixed(5))
                            }
                            if (val.pickType.toString() === '5J') {
                                /* 更新 按钮状态 */
                                hasPick5J = true
                            }
                        })
                        this.superBtnState(hasPick5J)
                        this.totalPay = parseFloat(sum.toFixed(5))
                    }
                },
                deep: true
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
            userInfo () {
                return this.$store.state.userInfo
            },
            currExpectId () {
                return this.$store.state.cs_1105.currExpectId
            },
            currBalance () {
                return this.$store.state.currBalance
            },
            bet_limit () {
                return this.$store.state.cs_1105.bet_limit
            }

        },
        methods: {
            formateBalance,
            formateCoinType,
            superChange (msg = 'superIn') {
                /* headerNav 调的 */
                if (msg === 'superIn') {
                    this.playArea.forEach((val, index) => {
                        val.pickType = '5J'
                        val.pickNum = []
                        val.pickJackPot = []
                    })
                    this.superBtnState(true)
                } else if (msg === 'superOut') {
                    this.playArea.forEach((val, index) => {
                        val.pickType = '1'
                        val.pickNum = []
                        val.pickJackPot = []
                    })
                    this.superBtnState(false)
                }
            },
            superBtnState (msg) {
                /* 调 headerNav 的方法  修改按钮状态 */
                if (this.$refs) {
                    this.superClass = msg
                    this.$refs.headerNav.btnState(msg)
                }
            },
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
                case '4':
                    return '1104'
                case '5':
                    return '1105'
                case '5J':
                    /* 奖池下单 */
                    return '11051'
                }
            },

            async playNow () {
                // 区块链阻塞
                let jsStartBetBtn = document.getElementById('js_startBetBtn')
                if (~jsStartBetBtn.className.indexOf('unable')) {
                    return false
                }

                // 未登录 的情况
                if (!this.isLog) {
                    this.$store.commit('showLoginPop')
                    return false
                }
                /* 未激活的 */
                if (this.userInfo && this.userInfo.status !== '1') {
                    this.$store.commit('showNoVerify')
                    return false
                }
                // 判断 余额是否足
                if (parseFloat(this.userInfo.accounts[0].balance) < parseFloat(this.totalPay)) {
                    Message({
                        message: _('Your balance is insufficient, please top up'),
                        type: 'error'
                    })
                    setTimeout(() => {
                        this.$router.push('/account/deposit')
                    }, 3000)
                    return false
                }

                // 出现loading
                document.getElementById('jsLoading').style.display = 'block'

                // 选号是否完成
                if (this.playArea) {
                    let noComplete = []
                    let noCompleteIndex = []
                    let beginBetStr = ''
                    this.playArea.forEach((val, index) => {
                        if (parseFloat(val.pickType) !== val.pickNum.length) {
                            noComplete.push(_('Ticket') + (index + 1))
                            noCompleteIndex.push(index)
                        }
                        beginBetStr += val.pickNum.join(',') + '#' + this.playType(val.pickType) + '@' + val.pickMoney + '$'
                    })
                    if (noComplete.length === 0) {
                        let sendBetStr = (this.currExpectId + '|' + beginBetStr).slice(0, -1)
                        let newSendBetStr = {
                            codestr: sendBetStr,
                            cointype: this.currBalance.cointype
                        }
                        let orderMsg = await this.$store.dispatch(aTypes.placeOrder, newSendBetStr)
                        let errorResArr = []
                        if (orderMsg && orderMsg.status.toString() === '100') {
                            this.$store.dispatch('cs_1105/updateMyBets')
                            this.$store.dispatch('getUserInfo')
                            if (orderMsg.data.restricts.length === 0) {
                                // 全部成功订单
                                setTimeout(() => {
                                    this.playArea.forEach((val, index) => {
                                        val.pickNum = []
                                        val.pickJackPot = []
                                    })
                                }, 1000)
                                this.showOrderSucc = true
                            } else if (orderMsg.data.restricts.length > 0) {
                                // 部分成功订单
                                orderMsg.data.restricts.forEach(function (val, index) {
                                    errorResArr.push(val.betcode)
                                })
                                this.failureMsg = _('Order limit#') + errorResArr.join('#')
                                this.showOrderFail = true
                                setTimeout(() => {
                                    this.playArea.forEach((val, index) => {
                                        val.pickNum = []
                                        val.pickJackPot = []
                                    })
                                }, 1000)
                            } else {
                                //  全部失败订单  todo
                                orderMsg.data.restricts.forEach(function (val, index) {
                                    errorResArr.push(val.betcode)
                                })

                                this.failureMsg = _('Order limit#') + errorResArr.join('#')
                                this.showOrderFail = true
                            }
                        }
                        document.getElementById('jsLoading').style.display = 'none'
                    } else {
                        Message({
                            message: _('Please pick correct numbers in {0}', noComplete.join(' && ')),
                            type: 'error'
                        })
                        // 震动 报错
                        // js_playArea-li
                        noCompleteIndex.forEach((val, index) => {
                            if (document.querySelectorAll('.play-area-items .js_playArea-li')[val]) {
                                document.querySelectorAll('.play-area-items .js_playArea-li')[val].className = 'js_playArea-li'
                                document.querySelectorAll('.play-area-items .js_playArea-li')[val].className = 'js_playArea-li error-shake'
                            }
                        })
                        document.getElementById('jsLoading').style.display = 'none'
                        setTimeout(() => {
                            noCompleteIndex.forEach((val, index) => {
                                if (document.querySelectorAll('.play-area-items .js_playArea-li')[val]) {
                                    document.querySelectorAll('.play-area-items .js_playArea-li')[val].className = 'js_playArea-li'
                                }
                            })
                        }, 800)
                    }
                    // 动画 socket
                }

                // 未激活 ？  这个也有问题  在弄个弹窗吧
                // this.$store.commit('emailBackTime', 0)
                // this.$store.commit('showVerifyEmail')
            },
            addTicket () {
                /* 添加 */
                if (this.playArea && this.playArea.length < 5) {
                    this.playArea.push({
                        ...this.baseAreaMsg
                    })
                } else {
                    Message({
                        message: _('No more than 5 tickets'),
                        type: 'error'
                    })
                }
            },
            fixNav () {
                this.scroll = document.getElementById('lucky11').scrollTop
                if (this.scroll >= 160) {
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
                if (msg) {
                    msg.forEach((item, index) => {
                        item.bettype = formatMatch(item.bettype)
                        item.betcode = this.format_betCode(item.betcode)
                        item.betmoney = formateBalance(parseFloat(item.betmoney)) + formateCoinType(item.cointype)
                        item.betprize = '<span class="win"><span>' + formateBalance(parseFloat(item.betprize)) + '</span>' + formateCoinType(item.cointype) + '</span>'
                    })
                }
                return msg
            },

            async indexRouter (query) {
                /* 邮箱注册 找回密码  邀请等 todo */
                if (query.sign) {
                    if (query.from === 'reg') {
                        let mailBack = await this.$store.dispatch(aTypes.mailActivate, query.sign)
                        console.log(mailBack)
                        if (mailBack && mailBack.status === '100') {
                            if (parseFloat(mailBack.data.login_times) >= 0 && mailBack.data.invite_status.toString() === '0') {
                                // 显示第一次邀请
                                this.$store.commit('showFirstLogin', true)
                            } else {
                                this.$store.commit('showFirstLogin', false)
                            }
                            this.$store.dispatch('getUserInfo')
                            this.$store.commit('showRegSuccess')
                        } else {
                            Message({
                                message: mailBack.message,
                                type: 'error'
                            })
                        }
                        // 清除参数
                        this.$router.push('/lucky11')
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
                        removeCK()
                        this.$store.commit('setIsLog', false)
                        this.$store.commit('setUserInfo', {})
                    }
                    if (query.inviter) {
                        // 邀请
                        this.$store.commit('setInviterObj', {
                            inviter: query.inviter,
                            sign: query.sign
                        })
                    }
                }
            },
            async handleRecentWin (tab) {
                if (tab.name === 'Wins') {
                    let dataRecentWinsList = await this.$store.dispatch(aTypes.getRecentWinsList)
                    this.DataWinnerList = this.format_recentWins(dataRecentWinsList)
                }
            },
            updateBaseAreaMsg () {
                if (this.isLog && this.currBalance) {
                    let blance = this.currBalance.balance
                    let cointype = this.currBalance.cointype.toString()

                    switch (cointype) {
                    case '1001':
                        /* 比特币 */
                        if (blance <= 0.0005) {
                            this.baseAreaMsg.pickMoney = 0.00005
                        } else if (blance < 0.005 && blance >= 0.0005) {
                            this.baseAreaMsg.pickMoney = 0.0001
                        } else if (blance >= 0.005) {
                            this.baseAreaMsg.pickMoney = 0.001
                        }
                        ;break
                    case '2001':
                        /* 以太币 */
                        if (blance <= 0.005) {
                            this.baseAreaMsg.pickMoney = 0.0005
                        } else if (blance < 0.05 && blance >= 0.005) {
                            this.baseAreaMsg.pickMoney = 0.001
                        } else if (blance >= 0.05) {
                            this.baseAreaMsg.pickMoney = 0.01
                        }
                        ;break
                    }
                    this.playArea.forEach((val, index) => {
                        if (val.pickMoney) {
                            val.pickMoney = this.baseAreaMsg.pickMoney
                        }
                    })
                } else {
                    this.baseAreaMsg.pickMoney = 0.0005
                }
            }
        },
        components: {
            Footer,
            Header,
            HeaderNav,
            PlayArea,
            LuckyMybet,
            Banner
        },
        filters: {
            formateCoinType,
            formatMatch,
            formateBalance,
            formatTime
        },
        async mounted () {
            this.updateBaseAreaMsg()
            this.addTicket()
            window.addEventListener('scroll', this.fixNav, true)
            if (this.$store.state.route.query) {
                this.indexRouter(this.$store.state.route.query)
            }
            // 首页 冒泡效果
            setTimeout(() => {
                /* 订阅lucky11 sock */
                this.$store.dispatch('subInLucky')
                /* 开启动态数据定时器 */
                this.$store.dispatch(aTypes.recentBetAdd)
            }, 0)
            bgStarBox()
            function bgStarBox () {
                bgstar('stars1', 30, '#7063c9')
                bgstar('stars2', 10, '#fff')
            }
            function bgstar (id, num, color) {
                let _width = window.innerWidth
                let _height = document.getElementById('play-area').clientHeight * 5
                let count = num
                let str = ''
                let str1 = ''
                for (var i = 0; i < count; i++) {
                    str += parseInt(Math.random() * _width) + 'px '
                    str += parseInt(Math.random() * _height) + 'px '
                    str += color + ','
                }
                str1 = str.slice(0, -1)
                document.getElementById(id).style.boxShadow = str1
            }
        },
        beforeDestroy () {
            this.$store.dispatch('subOutLucky')
        },
        destroyed () {
            window.removeEventListener('scroll', this.fixNav, true)
        }

    }
</script>
<style lang="less" rel="stylesheet/less">
    @import "../../styles/lib-mixins.less";
    .worldCupClose::after{
        width: 12px;
        height: 12px;
        background-repeat: no-repeat;
    }
    //index
    .main {
        position: relative;
        width: 100%;
        overflow: hidden;
    }

    .icon-enterWorld {
        position: fixed;
        width: 120px;
        top: 67%;
        right: 17px;
        z-index: 10;
        cursor: pointer;
    }

    //玩法区
    .play-area {
        position: relative;
        z-index: 6;
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
            font-weight:bold;
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
                background: #eef1f9;
            }
            span.jack {
                box-sizing: border-box;
                text-indent: 0;
                line-height: 16px;
                padding: 10px 0 7px 20px;
                height: auto;
            }
            ul {
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
                li.super_li{
                    color: #917439;
                    font-weight: 800;
                }
                li.on, li:hover {
                    background: #eef1f9;
                    color: #263648;
                }
            }
        }
        /*奖池奖*/
        .super-active{
            span{
                border: 1px solid #d6b571;
                border-top: 0px;
                background-color: #eeddbb ;
                color: #917439;
            }

            &::after {
                content: '';
                position: absolute;
                right: 17px;
                top: 14px;
                display: block;
                background-image: url("../../assets/img/lucky11/arrow-down-color.png");
                width: 13px;
                height: 8px;
            }
        }
        .play-tips {
            width: 650px;
            height:35px;
            position: relative;
            float: left;
            margin-left: 170px;
            font-size: 12px;
            a {
                position: relative;
                margin-left: 10px;
                &.on {
                    color: #263648;
                }
            }
            .position-msg{
                position: absolute;
                left: 0;
                top: 18px;
            }
        }
        .limit-tips {
            display: block;
            margin-right: 100px;
            float: right;
            font-size: 12px;
            text-transform: capitalize;
            /*safri bug*/
            width:110px;
            text-align: right;
        }
        .play-area-items {
            position: relative;
            z-index: 3;
            width: 1190px;
            /*padding-top: 40px;*/
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
                clear: both;
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
                /*width: 738px;*/
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
                text-align: right;
                width:100px;
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
    .superActive {
        .play-area{
            background: #7b6037;
            background: linear-gradient(to right, #463524, #81653a, #463525);
        }
        .btn-area{
            .addmore{
                border: 1px solid #725e39;
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

    .pop-reward-ct:hover {
        &:before {
            position: absolute;
            content: " ";
            height: 30px;
            display: block;
            background: transparent;
            top: 15px;
            left: 50%;
            width: 709px;
            margin-left: -354.5px;
        }
    }

    //奖级表
    .pop-rewardTable {
        position: absolute;
        z-index: 10;
        left: 50%;
        top: 40px;
        margin-left: -354.5px;
        width: 709px;
        height: 480px;
        background: #FFF;
    }

    //往期开奖

    .pre-numberBox {
        border-top: 30px solid #eef1f9;
        position: relative;
        width: 100%;
        background: #eef1f9;
        z-index: 5;
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
            /*safriy bug*/
            width:100px;
            right:52px;
        }
    }

    .prenum-table {
        overflow: hidden;
        padding-bottom: 63px;
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

    //alert-mybets
    .alert-mybets {
        position: absolute;
        z-index: 10;
        right: 0;
        top: 40px;
        width: 200px;
        color: #778ca3;
        .transition();
        .alert-mybets-head {
            position: relative;
            background: #31455c;
            line-height: 30px;
            text-align: center;
            color: #a5b1c2;
            .transition(0.2s);
            .border-radius(6px, 0, 0, 0);
            .alert-mybets-close {
                cursor: pointer;
                position: absolute;
                left: 0;
                top: 0;
                display: block;
                width: 28px;
                height: 30px;
                overflow: hidden;
                &::after {
                    content: '';
                    display: block;
                    background-image: url(../../assets/slice/arrow-right2-778ca3.png);
                    margin: 8px auto 0;
                    width: 8px;
                    height: 13px;
                }
            }
        }
        .alert-mybets-body {
            background: #263648;
            transform: translateX(0);
            .top {
                height: 30px;
                line-height: 30px;
                .clearfix();
                .date {
                    width: 100px;
                    font-size: 12px;
                    .text-overflow();
                }
                .type {
                    color: #eef1f9;
                    font-weight: bold;
                }
            }
            .bottom {
                margin-top: 5px;
                height: 30px;
                line-height: 30px;
                .clearfix();
                .add {
                    width: 68px;
                    color: #778ca3;
                    .transition();
                    text-decoration: underline;
                    .text-overflow();
                    &:hover {
                        color: #fff;
                        text-decoration: none;
                    }
                }
            }

        }
        .alert-mybets-items {
            padding: 0 8px;
            > li + li {
                border-top: 1px solid #31455c;
            }
        }
        .number-box {
            .clearfix();
            li {
                float: left;
                width: 24px;
                height: 24px;
                overflow: hidden;
                text-align: center;
                line-height: 24px;
                margin-right: 5px;
                background: #31455c;
                border-radius: 50%;
                color: #a5b1c2;
            }
            li.bingo {
                color: #12DF73;
                font-weight: bold;
            }
        }
        .btn-more-records {
            display: block;
            width: 100%;
            height: 29px;
            line-height: 29px;
            text-align: center;
            font-size: 12px;
            color: #778ca3;
            border-top: 1px solid #31455c;
            .transition();
            &:hover {
                color: #fff;
            }
        }
        &.close {
            transform: translateX(136px);
            .alert-mybets-head {
                padding: 5px 0;
                text-align: left;
                line-height: 18px;
                text-indent: 10px;
                cursor: pointer;
                .border-radius(6px, 0, 0, 6px);
            }
            .alert-mybets-close {
                display: none;
            }
            .alert-mybets-body {
                display: none;
            }
            .msg-count {
                font-size: 12px;
                display: block;
            }
        }
        .msg-count {
            display: none;
            cursor: pointer;
            position: absolute;
            left: -12px;
            top: -12px;
            width: 24px;
            height: 24px;
            overflow: hidden;
            border-radius: 50%;
            background: #6a89cc;
            color: #fff;
            text-align: center;
            line-height: 28px;
        }
        .nomsg {
            padding: 114px 15px 40px;
            text-align: center;
            &::before {
                content: '';
                position: absolute;
                left: 50%;
                top: 43px;
                margin-left: -32.5px;
                display: block;
                background-image: url("../../assets/slice/nomsg.png");
                width: 65px;
                height: 54px;
            }
            p {
                text-align: center;
                line-height: 16px;
                font-size: 12px;
            }
        }
        .nologin {
            padding-top: 30px;
            textarea {
                display: block;
                width: 150px;
                height: 78px;
                padding: 5px;
                box-sizing: content-box;
                overflow: hidden;
                background: transparent;
                outline: none;
                border: 1px solid #31455c;
                margin: 0 auto 20px;
                font-size: 12px;
                color: #778ca3;
                &::-webkit-input-placeholder {
                    color: #778ca3;
                }
            }
            .search {
                display: block;
                width: 120px;
                height: 30px;
                overflow: hidden;
                text-align: center;
                line-height: 30px;
                margin: 0 auto 30px;
                background: #31455c;
                border-radius: 6px;
                font-size: 12px;
                color: #778ca3;
                .transition();
                &:hover {
                    color: #fff !important;
                }
            }
            .search.on {
                color: #a5b1c2;
                &:hover {
                    color: #fff !important;
                }
            }
        }
        .tologin {
            padding: 10px 0;
            border-top: 1px solid #31455c;
            text-align: center;
            line-height: 12px;
            a {
                display: inline-block;
                font-size: 12px;
                color: #778ca3;
                padding: 0 8px;
                .transition();
                &:hover {
                    color: #fff;
                }
            }
            a + a {
                border-left: 1px solid #778ca3;
            }
        }
        .green{
            color: #12DF73 !important;
        }
    }

    .flipInY {
        animation: flipInY 0.75s both;
    }

    @keyframes flipInY {
        from, 20%, 40%, 60%, 80%, to {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1)
        }

        0% {
            opacity: 0;
            transform: scale3d(0.3, 0.3, 0.3)
        }

        20% {
            transform: scale3d(1.1, 1.1, 1.1)
        }

        40% {
            transform: scale3d(0.9, 0.9, 0.9)
        }

        60% {
            opacity: 1;
            transform: scale3d(1.03, 1.03, 1.03)
        }

        80% {
            transform: scale3d(0.97, 0.97, 0.97)
        }

        to {
            opacity: 1;
            transform: scale3d(1, 1, 1)
        }
    }



    .double-shake{
        animation: double-shake 2s forwards;
    }
    .error-shake{
        animation: error-shake 0.5s forwards;
    }
    @keyframes double-shake {
        0%{
            visibility: visible;
            opacity: 1;
        }
        20%{
            opacity: 0;
        }
        40%{
            opacity: 1;
        }
        60%{
            opacity: 0;
        }
        80%{
            opacity: 1;
        }
        100%{
            opacity: 1;
        }
    }
    @keyframes error-shake {
        0%,100% {
            transform: translateZ(0)
        }

        20%,40%,60%,80% {
            transform: translate3d(-10px,0,0)
        }

        30%,50%,70% {
            transform: translate3d(10px,0,0)
        }
    }
    .star-box{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        overflow: hidden;
        z-index:-1;
    }
    .stars {
        position: absolute;
        left: 0;
        top: 0;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        z-index: 6;
    }
    #stars1 {
        animation: animStar 100s linear infinite;
    }

    #stars2 {
        animation: animStar 60s linear infinite;
        opacity: 0.3;
    }

    @keyframes animStar {
        from {
            transform: translateY(100px);
        }

        to {
            transform: translateY(-2000px);
        }
    }

    /*open*/
    .fix-winning{
        position: fixed;
        bottom:0;
        right:0;
        padding:18px 10px 8px;
        min-width:193px;
        z-index:10;
        text-align: center;
        background: #20bf6b;
        color: #ffffff;
        font-weight:bold;
        transform: translate(100%,100%);
        .transition();
        .msg1{
            line-height:23px;
            font-size:16px;
        }
        .msg2{
            line-height:24px;
            font-size:18px;
        }
        .close-winning{
            display: block;
            position: absolute;
            top: 0;
            right:0;
            width:16px;
            height:16px;
            background: url("../../assets/slice/close-winning.png");
        }
        &.open{
            transform: translate(0,0);
        }
    }
    .superActive .head{
        background: linear-gradient(to right, #34291d, #584724, #34281a) !important;
    }
</style>
