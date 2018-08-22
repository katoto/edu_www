<template>
    <div class="luckyCoinDetailed">
        <div class="main" v-if="goodsinfo">
            <BreadCrumbs>No.{{number}}</BreadCrumbs>
            <div class="main-detailed flex">
                <!--eth/btc  normal/win/fail/finished/expired -->
                <div class="itemluck" :class="[betStatus, coinText.toLowerCase()]">
                    <div class="item-left">
                        <div class="match-img">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="110" height="110">
                                <defs>
                                    <linearGradient x1="1" y1="0" x2="0" y2="0" id="yellowColor1">
                                        <stop offset="0%" stop-color="#f7aa17"></stop>
                                        <stop offset="100%" stop-color="#f19221"></stop>
                                    </linearGradient>
                                    <linearGradient x1="1" y1="0" x2="0" y2="0" id="yellowColor2">
                                        <stop offset="0%" stop-color="#ef8a25"></stop>
                                        <stop offset="100%" stop-color="#f19221"></stop>
                                    </linearGradient>
                                </defs>
                                <g transform="matrix(0,-1,1,0,0,110)">
                                    <circle cx="55" cy="55" r="50" stroke-width="10" stroke="rgba(255,255,255,0.05)" fill="transparent"/>
                                    <circle
                                        cx="55"
                                        cy="55"
                                        r="50"
                                        stroke="url(#yellowColor1)"
                                        stroke-width="10"
                                        fill="transparent"
                                        :stroke-dasharray="`${rate > 157 ? rate : 0} 314`"
                                    />
                                    <circle
                                        cx="55"
                                        cy="55"
                                        r="50"
                                        stroke="url(#yellowColor2)"
                                        stroke-width="10"
                                        fill="transparent"
                                        :stroke-dasharray="`${rate > 157 ? 157 : rate} 314`"
                                    />
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div class="item-right">
                        <!--hot/bet-->
                        <div class="icon-box hot bet">
                            <i class="icon-hot" v-if="goodsinfo.ishot === '1'">H</i>
                            <i class="icon-youbet" v-if="betMoney !== 0">
                                <lang>You paid </lang>{{betMoney}} {{coinText}}
                            </i>
                        </div>
                        <div class="item-time min" v-if="isWaiting">
                            00:00:00
                        </div>
                        <!--day hour min-->
                        <div class="item-time" :class="{
                            min: leftTime < 600 * 1000 && leftTime !== 0,
                            hour: leftTime === 0 || leftTime < 24 * 3600 * 1000,
                            day: leftTime !== 0 && leftTime >= 24 * 3600 * 1000
                        }" v-else-if="betStatus === 'normal'">
                            {{endTimeText}}
                        </div>
                        <div class="item-prize">
                            {{goodsinfo.goodsValue}}<i>{{coinText}}</i>
                        </div>
                        <div class="item-usd">
                            {{formatUSD(goodsinfo.coinprice.USD, goodsinfo.goodsValue)}} USD
                        </div>
                        <div class="item-main">
                            <div class="main-right">
                                <div class="item-issue">
                                    NO.<router-link :to="`/check?number=${number}&type=luckycoin`">
                                        {{number}}
                                    </router-link>
                                </div>
                                <div class="item-price">
                                    {{ _('{0} {1} / Bid', this.goodsinfo.bidValue, coinText ) }}
                                </div>
                                <div class="item-process">
                                    <lang>Bids:</lang> <i :class="[ Number(goodsinfo.leftBids)/Number(goodsinfo.totalBids)<=0.1?'red':'']">{{Number(goodsinfo.totalBids) - Number(goodsinfo.leftBids)}}</i> / {{Number(goodsinfo.totalBids)}}
                                </div>
                            </div>
                            <div class="main-left">
                                <!--正常投注-->
                                <div class="main-normal">
                                    <p class="hide">
                                        <lang>Bid Amount</lang>
                                    </p>
                                    <div class="input-box ">
                                        <input type="text" v-model="betValue" :placeholder="goodsinfo.bidValue">
                                        <a href="javascript:;" @click="chooseMax">
                                            <lang>Max</lang>
                                        </a>
                                        <a href="javascript:;" @click="chooseDouble">2X</a>
                                        <a href="javascript:;" @click="chooseHalf">1/2</a>
                                    </div>

                                </div>
                                <!--胜利-->
                                <div class="main-win ">
                                    <lang>Draw finished at</lang>  {{formatTime(goodsinfo.drawtime, 'HH:mm yyyy.MM.dd')}}
                                </div>
                                <!--失败-->
                                <div class="main-fail">
                                    <p>
                                        <lang>Draw finished at</lang>  {{formatTime(goodsinfo.drawtime, 'HH:mm yyyy.MM.dd')}}
                                    </p>
                                </div>
                                <!--已结束待开奖-->
                                <div class="main-finished">
                                    <p>
                                        <lang>Drawing</lang>
                                    </p>
                                </div>
                                <!--过期-->
                                <div class="main-expired" v-if="betMoney !== 0">
                                    <span>
                                        <lang>Draw expired.</lang>
                                    </span>
                                    <p>
                                        {{_('{0} {1} has been refunded.', betMoney, coinText)}}
                                    </p>
                                </div>
                                <div class="main-expired" v-else-if="goodsinfo.state === '5'">
                                    <span>
                                        <lang>Draw expired.</lang>
                                    </span>
                                    <p>
                                        <lang>User's payment has been refunded.</lang>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <a href="javascript:;" class="btn btn-normal"  @click="handleBetEvent" :class="{ blinking: this.isBlinking, disabled: this.disableBet }">
                            {{ this.isBlinking ? _('Insufficient Available Bids') : _('Pay') }}
                        </a>
                        <div class="btn btn-win" v-if="isDraw">
                            <p>
                                <lang>Draw number</lang>:  {{goodsinfo.luckyNum}}
                            </p>
                            <router-link :to="`/check?number=${number}&type=luckycoin`">
                                <lang>Details >></lang>
                            </router-link>
                        </div>
                        <div class="btn btn-fail">
                            <p>
                                <lang>Draw number</lang>:  {{goodsinfo.luckyNum}}
                            </p>
                            <router-link :to="`/check?number=${number}&type=luckycoin`">
                                <lang>Details >></lang>
                            </router-link>
                        </div>
                        <div class="btn btn-finished">
                            <lang>Winner is coming</lang> {{ time }}
                        </div>
                        <div class="btn btn-expired hide">
                            <lang>User's payment has been refunded.</lang>
                        </div>
                        <!--这里逻辑跟首页一样-->
                        <!--show-->
                        <div class="bet- bet-success" :class="{ show: showSuccess }">
                            <a href="javascript:;" class="bet-close" @click="showSuccess = false"></a>
                            <div class="bet-icon"></div>
                            <p class="bet-t">
                                <lang>Bid Successful</lang>
                            </p>
                            <p class="bet-m">
                                {{ this.betNum === 1
                                    ? _('You have bought 1 bid. Winner will get {0} {1} reward. Bid more, win more! Good Luck!', this.goodsinfo.goodsValue, this.coinText)
                                    : _('You have bought {2} bids. Winner will get {0} {1} reward. Bid more, win more! Good Luck!', this.goodsinfo.goodsValue, this.coinText, this.betNum)
                                }}
                            </p>
                            <div class="btn-box">
                                <a href="javascript:;" class="bet-btnV" @click="activeName = 'my', showSuccess = false">
                                    <lang>See Details</lang>
                                </a>
                                <a href="javascript:;" class="bet-btnB" @click="showSuccess = false">
                                    <lang>Bid More</lang>
                                </a>
                            </div>
                        </div>
                        <div class="bet- bet-fail " :class="{ show: showFail }">
                            <a href="javascript:;" class="bet-close" @click="showFail = false"></a>
                            <div class="bet-icon"></div>
                            <p class="bet-t">
                                <lang>Bid Failed</lang>
                            </p>
                            <p class="bet-m">
                                {{ failMsg || _('Uh-oh~ network problems occured.') }}
                            </p>
                            <a href="javascript:;" class="btn-fail" @click="showFail = false">
                                <lang>Try Later</lang>
                            </a>
                        </div>
                        <div class="bet- bet-balance" :class="{ show: showDeposit }">
                            <a href="javascript:;" class="bet-close" @click="showDeposit = false"></a>
                            <div class="bet-icon"></div>
                            <p class="bet-t">
                                <lang>Insufficient Balance</lang>
                            </p>
                            <p class="bet-m">
                                <lang>Please top up first.</lang>
                            </p>
                            <router-link :to="{path: '/account/deposit'}" class="btn-balance">
                                <lang>Top Up</lang>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="tips" v-lang="'Note: <br/>You will get a bidding number after buying a bid. <br/>Bid more, win more! Winner takes all reward.'">
                </div>
            </div>
            <div class="main-detailed">
                <el-tabs v-model="activeName" >
                    <el-tab-pane :label="_('All Bids')" name="all">

                    </el-tab-pane>
                    <el-tab-pane :label="_('My Bids')" name="my">

                    </el-tab-pane>
                </el-tabs>
                <el-table
                    :data="totalBids"
                    style="width: 100%"
                    :default-sort = "{prop: 'date', order: 'descending'}"
                    v-show="activeName === 'all' && totalBids.length > 0"
                    :row-class-name="getRowClass"
                >
                    <el-table-column
                        prop="crtime"
                        :label="_('Time')"
                        sortable
                        width="137"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="username"
                        :label="_('User ID')"
                        width="440"
                    >
                        <template slot-scope="scope">
                            <div class="selfwin">
                                {{scope.row.username}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="_('Amount')"
                        width="144"
                    >
                        <template slot-scope="scope">
                            <div class="icon-amount " :class="[scope.row.type]">
                                {{scope.row.amount}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="number"
                        :label="_('Number')"
                        width="274"
                    >
                         <template slot-scope="scope">
                             <a href="javascript:;" class="allnum" @click="showAllNumber(scope.row.uid, scope.row.username)">
                                {{scope.row.bids}}
                             </a>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="mybets" v-if="myNumbers.length > 0 && activeName === 'my'">
                    <p class="msg1" v-if="orders.length !== 1">
                        {{ _('{0} {1} Bid Amount, {2} Bidding {3}. Bid more, win more!', betMoney, coinText, myNumbers.length, myNumbers.length === 1 ? 'Number' : 'Numbers') }}
                    </p>
                    <div class="item-number" v-for="(orderItem, orderIndex) in winSort(orders)" :key="orderIndex">
                        <p>
                            {{orderItem.crtime}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ _('{0} {1} Bid Amount, {2} Bidding {3}. ', Number(orderItem.betmoney), coinText, orderItem.list.length, orderItem.list.length === 1 ? 'Number' : 'Numbers')}}<lang v-if="orders.length === 1">Bid more, win more!</lang>
                        </p>
                        <ul>
                            <li v-for="(item, index) in winSort(orderItem.list)" :key="index" :class="[item === goodsinfo.luckyNum ? 'win' : '']">
                                {{item}}
                            </li>
                        </ul>
                    </div>
                    <p class="msg2">
                        <lang>Winner takes all reward!</lang>  <router-link :to="`/check?number=${number}&type=luckycoin`"><lang>Click here to see transparent information.</lang></router-link>
                    </p>
                </div>
                <div class="nomsg" v-show="(totalBids.length === 0 && activeName === 'all') || (myNumbers.length === 0 && activeName === 'my')">
                    <img src="@/assets/img/luckyCoin/nomsg.png" alt="">
                    <p>
                        <lang>No record yet.</lang>
                        <a href="javascript:;" @click="loginHandler" v-if="!this.isLogin && activeName === 'my'">
                            <lang>Log in to view</lang>
                        </a>
                    </p>
                </div>
                <el-pagination
                    @current-change="handleAllBidsChange"
                    :current-page.sync="pageno"
                    :page-size="pageSize"
                    :page-count="PageTotal"
                    layout="prev, pager, next"
                    :next-text="_('Next >')"
                    :prev-text="_('< Previous')"
                    v-if="activeName === 'all' && PageTotal !== 0"
                >
                </el-pagination>
            </div>

            <!--投注记录弹窗-->
            <div class="pop pop-bet" :class="{ hide: !isShowNumberPop }">
                <div class="pop-body">
                    <div class="pop-ani">
                        <a href="javascript:;" class="btn-close" @click="isShowNumberPop = false"></a>
                        <div class="pop-main">
                            <h3>{{infoName}}</h3>
                            <p class="msg1">
                                {{ numbers.length > 1 ? _('You have {0} bidding numbers. Bid more, win more!', numbers.length) : _('You have 1 bidding number. Bid more, win more!') }}
                            </p>
                            <div class="item-number">
                                <ul>
                                    <li v-for="(item, index) in winSort(numbers)" :key="index" :class="[item === goodsinfo.luckyNum ? 'win' : '']">
                                       {{item}}
                                    </li>
                                </ul>
                            </div>
                            <p class="msg2">
                                <lang>Winner takes all reward!</lang> <router-link :to="`/check?number=${number}&type=luckycoin`"><lang>Click here to see transparent information.</lang></router-link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BreadCrumbs from '~/components/BreadCrumbs.vue'
    import { getURLParams, formatTime, formatNum, accMul, accDiv, formateCoinType, numberComma, formatUSD } from '~/common/util'
    import { mapActions, mapState } from 'vuex'
    import timeMixin from './timeMixin'
    export default {
        mixins: [ timeMixin ],
        data () {
            return {
                number: '',
                activeName: 'all',
                pageno: 1,
                pageSize: 10,
                PageTotal: 10,
                betData: {},
                totalBids: [],
                isShowNumberPop: false,
                numbers: [],
                myNumbers: [],
                orders: [],
                goodsinfo: null,
                infoName: '',
                betMoney: 0,
                betValue: 0,
                canBuyValue: 0,
                betNum: 0,
                isBlinking: false,
                showSuccess: false,
                showFail: false,
                showDeposit: false,
                failMsg: '',
                mybetTime: '',
                time: '1\' 30"',
                _time: 90,
                timer: null
            }
        },
        methods: {
            ...mapActions(['getUserInfo']),
            ...mapActions('cs_luckycoin', ['getDetailData', 'getAllBids', 'getMyBids', 'betNow']),
            formatTime,
            numberComma,
            formatUSD,
            accMul,
            init () {
                let params = getURLParams()
                if (params.number) {
                    this.number = params.number
                    this.getDetailInfo()
                    this.getAllBidsInfo()
                    this.getMyBidsInfo()
                } else {
                    window.location.pathname = '/luckycoin'
                }

                if (params.go) {
                    this.activeName = 'my'
                }
            },
            winSort (numbers) {
                let tmp = [...numbers]
                for (let index = 0; index < tmp.length; index++) {
                    let item = tmp[index]
                    if (item === this.goodsinfo.luckyNum) {
                        tmp.splice(index, 1)
                        tmp.unshift(item)
                        break
                    }
                }
                return tmp
            },
            triggerTimeout () {
                this.getDetailInfo()
            },
            triggerWaitting () {
                this.goodsinfo.state = '3'
            },
            getDetailInfo () {
                return this.getDetailData({
                    expectId: this.number,
                    lotid: '2'
                })
                    .then(res => {
                        this.renderDetailInfo(res)
                        this.renderTime(res.data.goodsinfo.endtime)
                        return res
                    })
            },
            renderDetailInfo (res) {
                this.goodsinfo = res.data.goodsinfo
                this.betValue = Number(this.goodsinfo.bidValue)
                this.formatCommingTime(this.goodsinfo.lefttime)
            },
            formatCommingTime (time) {
                let num = Number(time)
                num = (num === 0 || num > 90) ? 90 : num

                if (this.timer) {
                    clearInterval(this.timer)
                    this.timer = null
                }
                this._time = num
                this.renderCommingTime()
                this.timer = setInterval(() => {
                    this._time--
                    if (this._time === 0) {
                        clearInterval(this.timer)
                        this.refresh()
                    }
                    this.renderCommingTime()
                }, 1000)
            },
            renderCommingTime () {
                this.time = `${Math.floor(this._time / 60)}' ${this._time % 60}"`
            },
            getAllBidsInfo () {
                this.getAllBids({
                    expectId: this.number,
                    lotid: '2',
                    pagesize: this.pageSize,
                    pageno: this.pageno
                })
                    .then(res => {
                        this.totalBids = [...this.formatTotalBids(res.data.totalBids, res.data.goodsinfo)]
                        this.PageTotal = Number(res.data.pages)
                    })
            },
            showAllNumber (uid, infoName) {
                this.getNumberDetail(uid)
                    .then(res => {
                        this.infoName = infoName
                        this.numbers = res.data.luckyNums
                        this.isShowNumberPop = true
                    })
            },
            getNumberDetail (uid) {
                return this.getMyBids({
                    expectId: this.number,
                    lotid: '2',
                    uid
                })
            },
            formatTotalBids (data, goodsinfo) {
                let tmp = data.map(item => {
                    if (item.uid === this.userInfo && this.userInfo.uid) {
                        this.mybetTime = formatTime(item.crtime, 'MM-dd HH:mm:ss')
                    }
                    return {
                        ...item,
                        crtime: formatTime(item.crtime, 'MM-dd HH:mm:ss'),
                        isWin: item.winstate === '1',
                        type: formateCoinType(goodsinfo.goodsType).toLowerCase(),
                        amount: formatNum(accMul(Number(goodsinfo.bidValue), Number(item.bids)), 5)
                    }
                })
                for (let index = 0; index < tmp.length; index++) {
                    let item = tmp[index]
                    if (item.isWin) {
                        tmp.splice(index, 1)
                        tmp.unshift(item)
                        break
                    }
                }
                return tmp
            },
            handleBetEvent () {
                if (!this.isLogin) {
                    this.$store.commit('showLoginPop')
                    return
                }
                if (this.disableBet || this.isBlinking) {
                    return
                }
                if (Number(this.betValue) > this.balance) {
                    if (this.balance && this.balance > Number(this.goodsinfo.bidValue)) {
                        this.canBuyValue = this.formatBidValue(this.balance)
                    } else {
                        this.canBuyValue = 0
                    }
                    this.showDeposit = true
                    return
                }
                let value = this.betValue
                value = (value === '' ? this.goodsinfo.bidValue : Number(value))
                this.betNum = accDiv(value, this.goodsinfo.bidValue)
                this.betNow({
                    cointype: this.coinType,
                    codestr: `${this.number}|${this.coinType}|${this.betNum}|${this.goodsinfo.bidValue}`
                })
                    .then(() => {
                        this.refresh()
                        this.getUserInfo()
                        this.showSuccess = true
                    })
                    .catch((errorData) => {
                        this.failMsg = errorData.message
                        this.showFail = true
                    })
            },
            getMyBidsInfo () {
                if (!this.isLogin) {
                    return
                }
                this.getNumberDetail(this.userInfo.uid)
                    .then(res => {
                        this.myNumbers = res.data.luckyNums.filter(item => {
                            return item !== ''
                        })
                        this.orders = [...res.data.orders].sort((a, b) => Number(a.crtime) > Number(b.crtime) ? 1 : -1)
                        this.orders.forEach((item, index) => {
                            this.orders[index].crtime = formatTime(item.crtime, 'yyyy-MM-dd HH:mm:ss')
                            this.orders[index].list = item.betcode.split(',')
                        })
                    })
                this.getMyBids({
                    expectId: this.number,
                    lotid: '2',
                    uid: this.userInfo.uid
                })
                    .then(res => this.renderMyBet(res.data))
            },
            renderMyBet (res) {
                // let money = 0
                let price = accMul(Number(res.goodsinfo.bidValue), res.luckyNums.length)
                this.betMoney = (price === 0 ? 0 : price)
            },
            handleAllBidsChange () {
                this.getAllBidsInfo()
            },
            chooseHalf () {
                this.betValue = Number(this.betValue)
                if (isNaN(this.betValue)) {
                    this.betValue = this.minValue
                    return
                }
                if (this.betValue === 0) {
                    this.betValue = this.minValue
                    return
                }
                if (this.isLogin && this.balance < this.goodsinfo.bidValue) {
                    this.betValue = this.minValue
                    return
                }
                if (this.betValue / 2 >= this.minValue) {
                    this.betValue = this.formatBidValue(this.betValue / 2)
                } else if (this.betValue > this.minValue) {
                    this.betValue = this.minValue
                }
            },
            chooseDouble () {
                this.betValue = Number(this.betValue)
                if (isNaN(this.betValue)) {
                    this.betValue = this.minValue
                    return
                }
                if (this.betValue === 0) {
                    this.betValue = this.formatBidValue(this.minValue * 2)
                    return
                }
                if (this.isLogin && this.balance < this.goodsinfo.bidValue) {
                    this.betValue = this.minValue
                    return
                }
                if (this.betValue * 2 <= this.maxValue) {
                    this.betValue = this.formatBidValue(this.betValue * 2)
                } else if (this.betValue < this.maxValue) {
                    this.betValue = this.maxValue
                }
            },
            chooseMax () {
                if (this.isLogin && this.balance < this.goodsinfo.bidValue) {
                    this.betValue = this.minValue
                    return
                }
                this.betValue = this.maxValue
            },
            formatBidValue (value) {
                let minValue = this.goodsinfo.bidValue
                if (value && minValue && value >= 0 && minValue >= 0) {
                    return (
                        minValue >= value
                            ? minValue
                            : accMul(Math.floor(accDiv(value, minValue)), minValue)
                    )
                }
                return value
            },
            loginHandler () {
                this.$store.commit('showLoginPop')
            },
            getRowClass ({row}) {
                return row.isWin ? 'mywin' : ''
            },
            refresh () {
                this.init()
            },
            blink () {
                return new Promise((resolve) => {
                    this.isBlinking = true
                    setTimeout(() => {
                        this.isBlinking = false
                        resolve(true)
                    }, 2300)
                })
            }
        },
        computed: {
            ...mapState({
                isLogin: state => !!state.isLog
            }),
            ...mapState(['userInfo']),
            balance () {
                if (this.userInfo && this.userInfo.accounts && this.userInfo.accounts.length > 0) {
                    let accounts = this.userInfo.accounts
                    for (let index = 0; index < accounts.length; index++) {
                        let account = accounts[index]
                        if (account.cointype === this.coinType) {
                            return Number(account.balance)
                        }
                    }
                }
                return 0
            },
            coinType () {
                return this.goodsinfo.goodsType || '2001'
            },
            coinText () {
                return formateCoinType(this.goodsinfo.goodsType || '2001').toUpperCase()
            },
            isDraw () {
                return this.goodsinfo.state === '4'
            },
            isWaiting () {
                return this.goodsinfo.state === '3'
            },
            isYouWin () {
                return this.isDraw && this.userInfo && this.goodsinfo.winUid === this.userInfo.uid
            },
            betStatus () {
                // normal/win/fail/finished/expired
                if (this.isYouWin) {
                    return 'win'
                } else if (this.isDraw) {
                    return 'fail'
                } else if (this.goodsinfo.state === '3') {
                    return 'finished'
                } else if (this.goodsinfo.state === '5') {
                    return 'expired'
                }
                return 'normal'
            },
            minValue () {
                return this.goodsinfo.bidValue || 0
            },
            maxValue () {
                let maxBidNum = accMul(this.goodsinfo.leftBids, this.goodsinfo.bidValue)
                return this.formatBidValue(
                    (!this.isLogin || this.balance > maxBidNum) ? maxBidNum : this.balance
                )
            },
            disableBet () {
                return ((Number(this.betValue) !== Number(this.formatBidValue(this.betValue))) || Number(this.betValue) > this.maxValue)
            },
            rate () {
                let total = this.goodsinfo.totalBids
                let left = this.goodsinfo.leftBids
                return (
                    total === 0 && left === 0
                        ? 0
                        : parseInt((total - left) / total * 314)
                )
            }
        },
        components: {
            BreadCrumbs
        },
        watch: {
            isLogin () {
                this.refresh()
            }
        },
        mounted () {
            document.documentElement.className = 'flexhtml'
            this.refresh()
            this.$store.commit('cs_luckycoin/bindListener', {
                [this.number]: () => {
                    if (!this.showSuccess) {
                        this.blink().then(() => this.refresh())
                        return
                    }
                    this.refresh()
                }
            })
        },
        beforeDestroy () {
            document.documentElement.className = ''
            this.$store.commit('cs_luckycoin/unbindListener', this.number)
            if (this.timer) {
                clearInterval(this.timer)
            }
        }
    }
</script>
<style lang="less" type="text/less">
    .luckyCoinDetailed{
        flex: 1;
        .el-table__empty-block {
            display: none;
        }
        .el-tabs{
            margin-top: 40px;
        }
        .el-tabs__nav-wrap{
            &::after{
                background: #341f40;
            }
        }
        .el-tabs__item{
            color: #6a88cc;
            &.is-active{
                color: #fff;
            }
        }
        .el-tabs__active-bar{
            background: #fff;
        }
        .el-table{
            background: transparent;
            thead{
                tr{
                    height: 50px;
                    line-height: 50px;
                }
                th{
                    color: #fff;
                    &:nth-child(2){
                        text-align: left;
                        text-indent: 162px;
                    }
                    &:nth-child(3){
                        div{
                            margin-right: 10px;
                            text-align: right;
                        }
                    }
                    &:nth-child(4){
                        div{
                            margin-right: 30px;
                            text-align: right;
                        }
                    }
                }
            }
            tbody{
                tr:hover{
                    background: #311c3d;
                }
                td{
                    color: #fff;
                }
                .selfwin{
                    position: relative;
                    margin-left: 138px;
                    text-align: left;
                    padding-left: 24px;
                }
                .allnum{
                    display: block;
                    padding-right: 30px;
                    text-align: right;
                    color: #fff;
                    text-decoration: underline;
                    &:hover{
                        filter: brightness(1.1);
                        color: #fff;
                    }
                }
                .icon-amount{
                    position: relative;
                    padding-right: 26px;
                    text-align: right;
                    &::after{
                        content: '';
                        display: block;
                        position: absolute;
                        right: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 16px;
                        height: 16px;
                    }
                    &.eth{
                        &::after{
                            background: url("../../assets/img/luckyCoin/icon-eth-sm.png") no-repeat center;
                        }
                    }
                    &.btc{
                        &::after{
                            background: url("../../assets/img/luckyCoin/icon-btc-sm.png") no-repeat center;
                        }
                    }
                }
            }
            tr{
                border-color: #311c3d;
                &.mywin{
                    background: #56432a;
                    .selfwin{
                        color: #ffca28;
                        &::before{
                            content: '';
                            position: absolute;
                            left: 0;
                            top: 13px;
                            display: block;
                            width: 16px;
                            height: 14px;
                            overflow: hidden;
                            background: url("../../assets/img/luckyCoin/icon-champion2.png") no-repeat center;
                            background-size: cover;
                        }
                    }
                    &:hover{
                        background: #56432a;
                        filter:brightness(1.1);
                    }
                }
            }
            .caret-wrapper{
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                height: 34px;
                width: 24px;
                vertical-align: middle;
                cursor: pointer;
                overflow: initial;
                position: relative;
            }
            .sort-caret{
                width: 0;
                height: 0;
                border: 5px solid transparent;
                position: absolute;
                left: 7px;
                &.ascending{
                    border-bottom-color: #c0c4cc;
                    top: 5px;
                }
                &.descending{
                    border-top-color: #c0c4cc;
                    bottom: 7px;
                }
            }
            .ascending{
                .sort-caret{
                    &.ascending{
                        border-bottom-color: #6a88cc;
                    }
                }
            }
            .descending{
                .sort-caret{
                    &.descending{
                        border-top-color: #6a88cc;
                    }
                }
            }
        }
    }
</style>
<style scope lang="less" type="text/less">
    @import "../../styles/lib-mixins.less";
    .blinking {
        transition: 0.5s all;
        animation: blinking 2s;
        background-color: gray !important;
        cursor: default;
    }

    .disabled {
        background-color: gray !important;
        cursor: default;
    }

    @keyframes blinking {
        0% {
            opacity: 1;
        }
        12.5% {
            opacity: 0;
        }
        25% {
            opacity: 1;
        }
        37.5% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        62.5% {
            opacity: 0;
        }
        75% {
            opacity: 1;
        }
        87.5% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    .luckyCoinDetailed *{
        box-sizing: border-box;
    }
    .main-detailed{
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        &.flex{
            display: flex;
        }
    }
    .itemluck{
        position: relative;
        display: flex;
        flex: 1;
        color: #fff;
        transition: all 0.2s;
        overflow: hidden;
        .item-left{
            position: relative;
            width: 196px;
            height: 301px;
            overflow: hidden;
            .match-img{
                width: 110px;
                height: 110px;
                position: absolute;
                left: 50%;
                top: 0;
                transform: translate(-50%,38px);
            }
        }
        .item-right{
            flex: 1;
            padding: 21px 40px 0;
            position: relative;
            background: #401f56;
            transition: all 0.2s;
            .icon-box{
                position: absolute;
                top: 3px;
                right: 1px;
                i{
                    display: block;
                    border-radius: 2px;
                    float: right;
                    margin-right: 3px;
                    font-weight: bold;
                    font-size: 14px;
                    color: #fff;
                    line-height: 18px;
                }
                .icon-hot{
                    background: #f65555;
                    padding: 0 4px;
                }
                .icon-youbet{
                    position: relative;
                    background: #7b4de4;
                    padding: 0 10px 0 30px;
                    &::before{
                        content: '';
                        display: block;
                        position: absolute;
                        left: 6px;
                        top: 3px;
                        width: 11px;
                        height: 13px;
                        background: url("../../assets/img/luckyCoin/icon-bet.png") no-repeat center;
                    }
                }
            }
            .item-time{
                position: absolute;
                top: 53px;
                right: 35px;
                line-height: 27px;
                font-size: 24px;
                color: #ffffff;
                font-weight: bold;
                &::before{
                    content: '';
                    display: block;
                    float: left;
                    margin-right: 15px;
                    width: 23px;
                    height: 27px;
                    background: url("../../assets/img/luckyCoin/icon-clock.png") no-repeat center;
                }
                &.hour{
                    color: #fff;
                }
                &.min{
                    color: #ff5b4a;
                }
                &.min{
                    animation: heartbeat 2s infinite;
                    &::before{
                        background: #ff5b4a;
                        mask:url("../../assets/img/luckyCoin/icon-clock.png") no-repeat center;
                    }
                }

            }
            .item-prize{
                height: 71px;
                line-height: 71px;
                font-size: 70px;
                font-weight: bold;
                i{
                    font-size: 40px;
                }
            }
            .item-usd{
                height: 21px;
                line-height: 21px;
                font-size: 14px;
            }
        }
        .item-main{
            .main-left{
                position: relative;
                height: 110px;
                overflow: hidden;
                >div{
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0;
                    width: 100%;
                    transform: translateY(200%);
                    transition: all 0.2s;
                }
            }
            .main-normal{
                p{
                    line-height: 28px;
                    font-size: 16px;
                }
                .input-box{
                    position: relative;
                    width: 100%;
                    height: 48px;
                    overflow: hidden;
                    line-height: 46px;
                    input{
                        display: block;
                        float: left;
                        height: 46px;
                        width: percentage(188/520);
                        outline: none;
                        border: 2px solid #3c1e6e;
                        border-radius: 6px;
                        background: #3c1e6e;
                        text-indent: 50px;
                        font-size: 24px;
                        transition: all 0.2s;
                        &:focus{
                            border-color: #7b4de4;
                        }
                    }
                    a{
                        display: block;
                        float: right;
                        margin-left: 5px;
                        width: percentage(100/520);
                        text-align: center;
                        color: #fff;
                        font-size: 20px;
                        font-weight: bold;
                        background: #7b4de4;
                        border-radius: 6px;
                        &:hover{
                            background: #3c1e6e;
                            color: #f67c22;
                        }
                    }
                }
            }
            .main-win,.main-fail{
                font-size: 24px;
                em{
                    font-weight: bold;
                }
            }
            .main-finished{
                p{
                    line-height: 27px;
                    font-size: 20px;
                    font-weight: bold;
                }
                span{
                    line-height: 25px;
                    font-size: 16px;
                }
            }
            .main-expired{
                span{
                    line-height: 27px;
                    font-size: 20px;
                    font-weight: bold;
                }
                p{
                    line-height: 30px;
                    font-size: 20px;
                    font-weight: bold;
                    color: #3fc06f;
                }
            }
            .main-right{
                margin: 10px 0;
                line-height: 26px;
                font-size: 14px;
                color: #fff;
                overflow: hidden;
                >div{
                    margin-right: 20px;
                    float: left;
                }
                a{
                    transition: none;
                    color: #fff;
                    &:hover{
                        filter:brightness(1.3);
                    }
                }
            }
        }
        .btn{
            position: absolute;
            display: block;
            width: 100%;
            height: 50px;
            overflow: hidden;
            text-align: center;
            line-height: 50px;
            color: #fff;
            font-weight: bold;
            transition: all 0.2s;
            opacity: 0;
            transform: translateY(200%);
            .text-overflow();
            &.btn-normal{
                width: 520px;
                left: 40px;
                bottom: 24px;
                background: #f67c22;
                border-radius: 6px;
                font-size: 24px;
                &:hover{
                    filter: brightness(1.3);
                }
            }
            &.btn-win{
                left: 0;
                bottom: 0;
                background: #3fc06f;
                padding: 0 30px;
                p{
                    position: relative;
                    float: left;
                    width: 60%;
                    padding-left: 54px;
                    text-align: left;
                    font-size: 20px;
                    font-weight: bold;
                    .text-overflow();
                    &::before{
                        content: '';
                        display: block;
                        position: absolute;
                        top: 15px;
                        left: 10px;
                        width: 28px;
                        height: 25px;
                        overflow: hidden;
                        background: url("../../assets/img/luckyCoin/icon-champion-win.png") no-repeat center
                    }
                }
                a{
                    display: block;
                    float: right;
                    font-size: 20px;
                    font-weight: bold;
                    color: #fff;
                    .transition();
                    &:hover{
                        color: #f67c22;
                    }
                }
            }
            &.btn-fail{
                left: 0;
                bottom: 0;
                background: #facb2f;
                padding: 0 30px;
                p{
                    position: relative;
                    float: left;
                    width: 60%;
                    padding-left: 54px;
                    text-align: left;
                    font-size: 20px;
                    font-weight: bold;
                    color: #755c35;
                    .text-overflow();
                    &::before{
                        content: '';
                        display: block;
                        position: absolute;
                        top: 15px;
                        left: 10px;
                        width: 28px;
                        height: 25px;
                        overflow: hidden;
                        background: url("../../assets/img/luckyCoin/icon-champion.png") no-repeat center
                    }
                }
                a{
                    display: block;
                    float: right;
                    font-size: 20px;
                    font-weight: bold;
                    color: #755c35;
                    .transition();
                    &:hover{
                        color: #f67c22;
                    }
                }
            }
            &.btn-finished{
                width: 90%;
                left: 5%;
                bottom: 24px;
                background: #4c2872;
                border-radius: 6px;
                font-weight: normal;
                font-size: 20px;
                color: #b5abc1;
                &:hover{
                    filter: brightness(1.3);
                }
            }
            &.btn-expired{
                width: 90%;
                left: 5%;
                bottom: 10px;
                text-align: left;
                font-weight: normal;
                font-size: 16px;
                color: #a999cb;
                &:hover{
                    filter: brightness(1.3);
                }
            }
        }
        &.btc{
            .item-left{
                background: url("../../assets/img/luckyCoin/bg-btc.png") no-repeat center;
            }
            .match-img{
                background: url("../../assets/img/luckyCoin/icon-btc.png") no-repeat center;
            }
            .main-normal{
                .input-box {
                    &::before {
                        content: '';
                        display: block;
                        position: absolute;
                        left: 11px;
                        top: 15px;
                        width: 16px;
                        height: 16px;
                        background: url("../../assets/img/luckyCoin/icon-btc-sm.png") no-repeat center;
                        background-size: cover;
                    }
                }
            }
        }
        &.eth{
            .item-left{
                background: url("../../assets/img/luckyCoin/bg-eth.png") no-repeat center;
            }
            .match-img{
                background: url("../../assets/img/luckyCoin/icon-eth.png") no-repeat center;
            }
            .main-normal{
                .input-box{
                    &::before{
                        content: '';
                        display: block;
                        position: absolute;
                        left: 11px;
                        top: 15px;
                        width: 16px;
                        height: 16px;
                        background: url("../../assets/img/luckyCoin/icon-eth-sm.png") no-repeat center;
                        background-size: cover;
                    }
                }
            }
        }
        &.normal{
            .item-right{
                background: #532998;
            }
            .item-main{
                .main-left{
                    .main-normal{
                        opacity: 1;
                        transform: translateY(0);

                    }
                }
                .main-right{
                    color: #a999cb;
                    a{
                        color: #a999cb;
                    }
                }
            }
            .btn-normal{
                opacity: 1;
                transform: translateY(0);
            }
        }
        &.win{
            .item-right{
                background: url("../../assets/img/luckyCoin/bg-success.png") no-repeat right bottom, linear-gradient(to right,#7c6238,#4e3c27);
            }
            .item-main{
                .main-left{
                    .main-win{
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            }
            .btn-win{
                opacity: 1;
                transform: translateY(0);
            }
            &::after{
                content: '';
                display: block;
                position: absolute;
                right: 178px;
                bottom: 2px;
                width: 91px;
                height: 91px;
                background: url("../../assets/img/luckyCoin/icon-win.png") no-repeat center;
                background-size: cover;
            }
        }
        &.fail{
            .item-right{
                background: url("../../assets/img/luckyCoin/bg-success.png") no-repeat right bottom, linear-gradient(to right,#7c6238,#4e3c27);
            }
            .item-main{
                .main-left{
                    .main-fail{
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            }
            .btn-fail{
                opacity: 1;
                transform: translateY(0);
            }
        }
        &.finished{
            .item-main{
                .main-right{
                    color: #a999cb;
                    a{
                        color: #a999cb;
                    }
                }
                .main-left{
                    .main-finished{
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            }
            .btn-finished{
                opacity: 1;
                transform: translateY(0);
            }
        }
        &.expired{
            .item-main{
                .main-left{
                    .main-expired{
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            }
            .btn-expired{
                opacity: 1;
                transform: translateY(0);
            }
        }
        .bet-success{
            padding: 40px percentage(30/600) 0;
            .bet-icon{
                width: 60px;
                height: 60px;
            }
            .bet-t{
                line-height: 45px;
                font-size: 28px;
            }
            .bet-m{
                max-height: 60px;
                line-height: 20px;
                font-size: 16px;
            }
            .btn-box{
                width: 90%;
                height: 44px;
                left: 5%;
                bottom: 37px;
                a{
                    height: 100%;
                    line-height: 44px;
                    font-size: 20px;
                }
            }
        }
        .bet-fail{
            padding: 40px percentage(30/600) 0;
            .bet-icon{
                width: 60px;
                height: 60px;
            }
            .bet-t{
                line-height: 45px;
                font-size: 28px;
            }
            .bet-m{
                text-align: center;
                max-height: 60px;
                line-height: 20px;
                font-size: 16px;
            }
            .btn-fail{
                line-height: 43px;
                font-size: 20px;
            }
        }
        .bet-balance{
            padding: 40px percentage(30/600) 0;
            .bet-icon{
                width: 63px;
                height: 60px;
            }
            .bet-t{
                line-height: 45px;
                font-size: 28px;
            }
            .bet-m{
                text-align: center;
                max-height: 60px;
                line-height: 20px;
                font-size: 16px;
            }
            .btn-balance{
                line-height: 43px;
                font-size: 20px;
            }
        }
    }
    .tips{
        width: 204-30px;
        margin-left: 30px;
        line-height: 25px;
        font-size: 14px;
        color: #a999cb;
    }
    .pop-bet{
        .pop-body{
            width: 727px;
        }
        .pop-main{
            padding-bottom: 18px;
        }
        h3{
            margin: 30px 0 0 0;
            height: 30px;
            text-align: left;
            line-height: 30px;
            color: #000000;
            font-weight: normal;
        }
        .msg1{
            margin-bottom: 7px;
            line-height: 20px;
            font-size: 14px;
            color: #293648;
            text-align: left;
        }
        .item-number{
            overflow: hidden;
            ul{
                overflow-y: auto;
                max-height: 12*28px;
                &::-webkit-scrollbar {
                    width: 16px;
                }
                &::-webkit-scrollbar-thumb {
                    background: #798ca3;
                }
                &::-webkit-scrollbar-track{
                    background: #eff1f9;
                }
            }
            li{
                float: left;
                margin-right: 15px;
                line-height: 28px;
                font-size: 16px;
                color: #000000;
                &.win{
                    color: #f1b545;
                }
            }
        }
        .msg2{
            margin-top: 20px;
            line-height: 20px;
            text-align: left;
            font-size: 14px;
            color: #798ca3;
        }
    }
    .mybets{
        color: #fff;
        .msg1{
            margin-top: 12px;
            line-height: 52px;
        }
        .item-number{
            padding: 13px 30px 13px;
            background: #321740;
            border-radius: 6px;
            overflow: hidden;
            margin: 10px 0;
            p{
                line-height: 22px;
                color: #798ca3;
            }
            ul{
                overflow-y: auto;
                max-height: 12*28px;
                &::-webkit-scrollbar {
                    width: 16px;
                }
                &::-webkit-scrollbar-thumb {
                    background: #798ca3;
                }
                &::-webkit-scrollbar-track{
                    background: #2b1237;
                }
            }
            li{
                float: left;
                margin-right: 15px;
                line-height: 28px;
                font-size: 16px;
                &.win{
                    color: #f1b545;
                }
            }
        }
        .msg2{
            margin: 34px 0;
            line-height: 24px;
            a{
                color: #6a88cc;
                &:hover{
                    color: currentColor;
                }
            }
        }
    }
</style>
