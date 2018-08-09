<template>
    <div class="luckyCoinDetailed">
        <div class="main">
            <BreadCrumbs>No.{{number}}</BreadCrumbs> 
            <div class="main-detailed flex" v-if="goodsinfo">
                <!--eth/btc  normal/win/fail/finished/expired -->
                <div class="item" :class="[betStatus, coinText.toLowerCase()]">
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
                                <g>
                                    <circle cx="55" cy="55" r="50" stroke-width="10" stroke="rgba(255,255,255,0.05)" fill="transparent"/>
                                    <circle
                                        cx="55"
                                        cy="55"
                                        r="50"
                                        stroke="url(#yellowColor1)"
                                        stroke-width="10"
                                        fill="transparent"
                                        stroke-dasharray="0 314"
                                    />
                                    <circle
                                        cx="55"
                                        cy="55"
                                        r="50"
                                        stroke="url(#yellowColor2)"
                                        stroke-width="10"
                                        fill="transparent"
                                        stroke-dasharray="314 314"
                                    />
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div class="item-right">
                        <!--hot/bet-->
                        <div class="icon-box hot bet">
                            <i class="icon-hot">H</i>
                            <i class="icon-youbet" v-if="betMoney !== 0">You have been Bet {{betMoney}} {{coinText}}</i>
                        </div>
                        <div class="item-prize">
                            {{ goodsinfo.goodsValue }}<i> {{coinText}}</i>
                        </div>
                        <div class="item-usd">
                            USD 14,776
                        </div>
                        <div class="item-main">
                            <div class="main-left">
                                <!--正常投注-->
                                <div class="main-normal">
                                    <p>
                                        Bet Amount
                                    </p>
                                    <div class="input-box ">
                                        <input type="text" v-model="betValue">
                                        <a href="javascript:;" @click="chooseHalf">1/2</a>
                                        <a href="javascript:;" @click="chooseDouble">2X</a>
                                        <a href="javascript:;" @click="chooseMax">Max</a>
                                    </div>

                                </div>
                                <!--胜利-->
                                <div class="main-win ">
                                    <p>
                                        Draw number
                                    </p>
                                    <p>
                                        {{goodsinfo.luckyNum}}
                                    </p>
                                    <span>
                                        Finished  2018.4.23 23:23
                                    </span>
                                </div>
                                <!--失败-->
                                <div class="main-fail">
                                    <p>
                                        Draw number
                                    </p>
                                    <p>
                                        {{goodsinfo.luckyNum}}
                                    </p>
                                    <span>
                                        Finished  2018.4.23 23:23
                                    </span>
                                </div>
                                <!--已结束待开奖-->
                                <div class="main-finished">
                                    <p>
                                        Time Up!
                                    </p>
                                    <span>
                                        Finished  2018.4.23 23:23
                                    </span>
                                </div>
                                <!--过期-->
                                <div class="main-expired" v-if="betMoney !== 0">
                                    <span>
                                        Expired
                                    </span>
                                    <p>
                                        Your bet has been refunded
                                    </p>
                                    <p>
                                        {{betMoney}}{{coinText}}
                                    </p>
                                </div>
                            </div>
                            <div class="main-right">
                                <div class="item-issue">
                                    NO.{{number}}
                                </div>
                                <div class="item-process">
                                    Draw Process {{Number(goodsinfo.totalBids) - Number(goodsinfo.leftBids)}} / {{Number(goodsinfo.totalBids)}}
                                </div>
                                <div class="item-price">
                                    Ticket Price {{goodsinfo.bidValue}} {{coinText}}
                                </div>
                            </div>
                        </div>
                        <a href="javascript:;" class="btn btn-normal"  @click="handleBetEvent" :class="{ blinking: this.isBlinking, disabled: this.disableBet }">
                            {{ this.isBlinking ? _('Amount changes') : _('Pay Now') }}
                        </a>
                        <div class="btn btn-win" v-if="isDraw">
                            <p>
                                {{goodsinfo.winUserName || ''}}
                            </p>
                            <router-link :to="`/check?number=${number}&type=luckycoin`">
                                <lang>Detail >></lang>
                            </router-link>
                        </div>
                        <div class="btn btn-fail">
                            <p>
                                {{goodsinfo.winUserName || ''}}
                            </p>
                            <router-link :to="`/check?number=${number}&type=luckycoin`">
                                <lang>Detail >></lang>
                            </router-link>
                        </div>
                        <div class="btn btn-finished">
                            Winner is coming 1'23”
                        </div>
                        <div class="btn btn-expired">
                            The bid was expired, system will refund to the participators later.
                        </div>
                        <!--这里逻辑跟首页一样-->
                        <!--show-->
                        <div class="bet- bet-success show">
                            <a href="javascript:;" class="bet-close"></a>
                            <div class="bet-icon"></div>
                            <p class="bet-t">
                                Bet Success
                            </p>
                            <p class="bet-m">
                                You get five numbers obtained bonus 5ETH. The more bets, the higher the probability of winning, I wish you good luck~  You get five numbers obtained bonus {{ goodsinfo.goodsValue }}{{coinText}}. The more bets, the higher the probability of winning, I wish you good luck~ 
                            </p>
                            <div class="btn-box">
                                <router-link :to="{path: '/luckycoin/moreBids'}" class="bet-btnV">
                                    <lang>View Number</lang>
                                </router-link>
                                <a href="javascript:;" class="bet-btnB">
                                    <lang>Bet More</lang>
                                </a>
                            </div>
                        </div>
                        <div class="bet- bet-fail " >
                            <a href="javascript:;" class="bet-close" ></a>
                            <div class="bet-icon"></div>
                            <p class="bet-t">
                                Bet failure
                            </p>
                            <p class="bet-m">
                                Temporarily unavailable due to network reasons
                            </p>
                            <a href="javascript:;" class="btn-fail" >
                                <lang>Try Again Later</lang>
                            </a>
                        </div>
                        <div class="bet- bet-balance">
                            <a href="javascript:;" class="bet-close" ></a>
                            <div class="bet-icon"></div>
                            <p class="bet-t">
                                Insufficient Balance
                            </p>
                            <p class="bet-m">
                                Your balance can be purchased for 0.03ETH. If you need to bet more, please top up first.
                            </p>
                            <a href="javascript:;" class="btn-balance">
                                Deposit
                            </a>
                        </div>
                    </div>
                </div>
                <div class="tips">
                    Play Tips: Each betting 0.01ETH, you can get a number. The more bets you have, the more numbers you have and the higher the probability of winning.
                    <br>
                    <br>
                    When the lottery is drawn, a lucky number is drawn through the blockchain, and the lucky number winner receives the full bonus.
                </div>
            </div>
            <div class="main-detailed">
                <el-tabs v-model="activeName" >
                    <el-tab-pane label="ALL BETS" name="all">

                    </el-tab-pane>
                    <el-tab-pane label="MY BETS" name="my">

                    </el-tab-pane>
                </el-tabs>
                <el-table
                    :data="totalBids"
                    style="width: 100%"
                    :default-sort = "{prop: 'date', order: 'descending'}"
                    v-if="activeName === 'all'"
                >
                    <el-table-column
                        prop="crtime"
                        label="Bet Time"
                        sortable
                        width="137"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="username"
                        label="User ID"
                        width="440"
                    >
                        <template slot-scope="scope">
                            <div class="selfwin">
                                {{scope.row.username}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Amount"
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
                        label="Bet number"
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
                    <p class="msg1">
                        A total of {{betMoney}}{{coinText}} bets are placed to get {{myNumbers.length}} numbers. The more bets, the more numbers, and the higher the probability of winning!
                    </p>
                    <div class="item-number">
                        <p>
                            2018-06-23 23:23:23   You bet {{betMoney}} {{coinText}} to get {{myNumbers.length}} numbers
                        </p>
                        <ul>
                            <li v-for="(item, index) in myNumbers" :key="index" :class="[item === goodsinfo.luckyNum ? 'win' : '']">
                                {{item}}
                            </li>
                        </ul>
                    </div>
                    <p class="msg2">
                        The betting number is randomly assigned by the system. When your betting number coincides with the winning number, you will win this bonus! The lottery algorithm is based on blockchain technology and cannot be predicted. It is absolutely fair and open!  <router-link :to="`/check?number=${number}&type=luckycoin`"><lang>Click to view transparency</lang></router-link>
                    </p>
                </div>
                <div class="nomsg" v-show="(totalBids.length === 0 && activeName === 'all') || (myNumbers.length === 0 && activeName === 'my')">
                    <img src="@/assets/img/oneToKen/nomsg.png" alt="">
                    <p>
                        No record.
                        <a href="javascript:;" @click="loginHandler" v-if="!this.isLogin && activeName === 'my'">
                            <lang>Log in to view</lang>
                        </a>
                    </p>
                </div>
                <el-pagination
                    @current-change="handleAllBidsChange"
                    :current-page.sync="pageno"
                    :page-size="pageSize"
                    :total="PageTotal"
                    layout="prev, pager, next"
                    :next-text="_('Next >')"
                    :prev-text="_('< Front')"
                    v-if="activeName === 'all'"
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
                                A total of 5 numbers, the more bets, the more numbers, the higher the probability of winning!
                            </p>
                            <div class="item-number">
                                <ul>
                                    <li v-for="(item, index) in numbers" :key="index" :class="[item === goodsinfo.luckyNum ? 'win' : '']">
                                       {{item}}
                                    </li>
                                </ul>
                            </div>
                            <p class="msg2">
                                The bet number is randomly assigned to the system. When your bet number matches the lottery number, you will win this session bonus! The lottery algorithm is based on blockchain technology, unpredictable, absolutely fair and open! <router-link :to="`/check?number=${number}&type=luckycoin`">
                                            <lang>Click to view transparency</lang>
                                        </router-link>
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
    import { getURLParams, formatTime, formatNum, accMul, accDiv, formateCoinType } from '~/common/util'
    import { mapActions, mapState } from 'vuex'
    export default {
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
                goodsinfo: null,
                infoName: '',
                betMoney: 0,
                betValue: 0,
                isBlinking: false
            }
        },
        methods: {
            ...mapActions(['getUserInfo']),
            ...mapActions('cs_luckycoin', ['getDetailData', 'getAllBids', 'getMyBids', 'betNow']),
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
            },
            getDetailInfo () {
                return this.getDetailData({
                    expectId: this.number,
                    lotid: '2'
                })
                    .then(res => {
                        this.renderDetailInfo(res)
                        return res
                    })
            },
            renderDetailInfo (res) {
                this.goodsinfo = res.data.goodsinfo
                this.betValue = Number(this.goodsinfo.bidValue)
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
                return data.map(item => {
                    return {
                        ...item,
                        crtime: formatTime(item.crtime, 'MM-dd HH:mm:ss'),
                        isWin: item.winstate === '1',
                        type: formateCoinType(goodsinfo.goodsType).toLowerCase(),
                        amount: formatNum(accMul(Number(goodsinfo.bidValue), Number(item.bids)), 5)
                    }
                })
            },
            handleBetEvent () {
                if (!this.isLogin) {
                    this.$store.commit('showLoginPop')
                    return
                }
                if (this.disableBet || this.isBlinking) {
                    return
                }
                this.betNow({
                    cointype: this.coinType,
                    codestr: `${this.number}|${this.coinType}|${accDiv(this.betValue, this.goodsinfo.bidValue)}|${this.goodsinfo.bidValue}`
                })
                    .then(() => {
                        this.getUserInfo()
                        this.openSuccessWindow()
                    })
                    .catch((errorData) => {
                        this.openFailureWindow(errorData.message)
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
                    })
                this.getMyBids({
                    expectId: this.number,
                    lotid: '2',
                    uid: this.userInfo.uid
                })
                    .then(res => this.renderMyBet(res.data))
            },
            renderMyBet (res) {
                let money = 0
                let price = accMul(Number(res.goodsinfo.bidValue), res.luckyNums.length)
                this.betMoney = (price === 0 ? 0 : price)
            },
            handleAllBidsChange () {
                this.getAllBidsInfo()
            },
            chooseHalf () {
                if (isNaN(Number(this.betValue))) {
                    return
                }
                this.betValue = Number(this.betValue)
                if (this.betValue / 2 >= this.minValue) {
                    this.betValue = this.formatBidValue(this.betValue / 2)
                } else if (this.betValue > this.minValue) {
                    this.betValue = this.minValue
                }
            },
            chooseDouble () {
                if (isNaN(Number(this.betValue))) {
                    return
                }
                this.betValue = Number(this.betValue)
                if (this.betValue * 2 <= this.maxValue) {
                    this.betValue = this.formatBidValue(this.betValue * 2)
                } else if (this.betValue < this.maxValue) {
                    this.betValue = this.maxValue
                }
            },
            chooseMax () {
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
            isYouWin () {
                return this.isDraw && this.goodsinfo.winUid === this.userInfo.uid
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
                return accMul(this.goodsinfo.leftBids, this.goodsinfo.bidValue)
            },
            disableBet () {
                return ((Number(this.betValue) !== Number(this.formatBidValue(this.betValue))) || Number(this.betValue) > this.maxValue)
            }
        },
        components: {
            BreadCrumbs
        },
        watch: {
            isLogin () {
                this.init()
            }
        },
        mounted () {
            this.init()
        }
    }
</script>
<style lang="less" type="text/less">
    .luckyCoinDetailed{
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
                    &.el-table_1_column_2{
                        text-align: left;
                        text-indent: 162px;
                    }
                    &.el-table_1_column_3, &.el-table_1_column_4{
                        text-align: right;
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
    .item{
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
                    display: none;
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
                    background: #7b4de4;
                    padding: 0 20px;
                }
                &.hot{
                    .icon-hot{
                        display: block;
                    }
                }
                &.bet{
                    .icon-youbet{
                        display: block;
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
                font-size: 20px;
                font-weight: bold;
            }
        }
        .item-main{
            display: flex;
            margin-top: 14px;
            .main-left{
                position: relative;
                width: 330px;
                overflow: hidden;
                >div{
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0;
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
                    width: 295px;
                    height: 48px;
                    overflow: hidden;
                    line-height: 46px;
                    border: 1px solid #a99acc;
                    border-radius: 6px;
                    font-size: 20px;
                    display: flex;
                    input{
                        width: percentage(130/295);
                        outline: none;
                        border: none;
                        background: transparent;
                        text-indent: 50px;
                    }
                    a{
                        flex: 1;
                        display: block;
                        width: percentage(53/260);
                        text-align: center;
                        border-left: 1px solid #a99acc;
                        color: #fff;
                        font-size: 16px;
                        background: #4b2688;
                        &:hover{
                            background: #7b4de4;
                        }
                    }
                }
            }
            .main-win,.main-fail{
                p{
                    line-height: 34px;
                    font-size: 28px;
                    font-weight: bold;
                }
                span{
                    line-height: 20px;
                    font-size: 16px;
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
                padding-bottom: 20px;
                line-height: 26px;
                font-size: 16px;
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
                width: 90%;
                left: 5%;
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
        line-height: 20px;
        font-size: 14px;
        color: #fff;
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
                    font-weight: bold;
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
            padding: 26px 30px 0;
            background: #321740;
            border-radius: 6px;
            overflow: hidden;
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
                    font-weight: bold;
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
