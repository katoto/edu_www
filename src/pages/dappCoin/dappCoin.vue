<template>
    <div class="luckyDapp">
        <div class="head-dapp">
            <div class="head-dapp-wrap">
                <h1 class="logo">
                    <img src="@/assets/img/superCoin/logo-luckyDapp.png" alt="logo-dapp" title="logo-dapp">
                    <p>Super LuckyCoin</p>
                </h1>
                <div class="fr-msg">
                    <a href="" class="invite">Invite</a>
                    <a href="">Contract</a>
                    <a href="">Easy Play</a>
                    <a href="index.html" class="btn-home"></a>
                </div>
            </div>
        </div>
        <!--status2-->
        
        <div class="banner-dapp">
            <!--公告 滚动  components-->
            <banner-scroll class="message">
                <div class="text-scroller" style="height:100%">
                    <ul class="scroller-in">
                        <li>For the first 600 tickets, 当前余额：{{ balance }} you can get a bet bonus!</li>
                        <li>For the first 700 tickets, you can get a bet bonus!</li>                        
                        <li>For the first 700 tickets, you can get a bet bonus!</li>                        
                        <li>For the first 700 tickets, you can get a bet bonus!</li>                        
                        <li>For the first 700 tickets, you can get a bet bonus!</li>                        
                        <!-- <li class="msgLis" v-for="item in recentList" >
                            Congratulate {{formateEmail( item.username , true ) }} on winning {{ formateSlotBalance ( item.prize ) }} {{ formateCoinType( item.cointype ) }}
                        </li> -->
                    </ul>
                </div>
            </banner-scroll>
 
            <!--draw-->
            <template v-if="roundInfo">
                <div class="issue">
                    <p>{{ _('Round {0}', roundInfo.roundIndex ) }}</p>
                    <p class="hide">
                        August 29, 2018, 10:00<br>Go to the next issue,<br>Bonus 10ETH
                    </p>
                </div>
                <!--未开奖投注区-->
                <div class="betting-area ">
                    <div class="fr betting">
                        <div class="item-msg">
                            <p class="title">
                                Reward
                            </p>
                            <p class="jackpot-amount">
                                 {{ formateBalance(roundInfo.jackpot) }}
                            </p>
                            <i class="jackpot-unit">
                                ETH
                            </i>
                        </div>
                        <div class="item-msg">
                            <p class="title">
                                End of the draw
                            </p>
                            <p class="countdown" :class="{'on': timeLeft<= 600 && timeLeft > 0}">
                                {{ nowFormateTime }}
                            </p>
                        </div>
                        <div class="item-msg">
                            <p class="title">
                                Voting progress
                            </p>
                            <div class="ticket">
                                <div class="people-purchased" :data-msg="_('Purchased')">
                                    <p>{{ roundInfo.tickets }}</p>
                                </div>
                                <div class="ticket-progress">
                                    <!-- transform: scaleX(0.5) -->
                                    <i :style="calVotingLen"></i>
                                </div>
                                <div class="people-remaining" :data-msg="_('Remaining')">
                                    <p>{{ 1500 - roundInfo.tickets }}</p>
                                </div>
                            </div>
                            <p class="people-all">
                                {{ roundInfo.playernums }}
                            </p>
                        </div>
                        <div class="buy-area">
                            <div class="fl title">
                                <p>
                                    Buy Ticket
                                </p>
                            </div>
                            <div class="fl input-wrap">
                                <div class="input-box">
                                    <input v-model="tickNum" type="text" @input="checkTicket">
                                    <p>
                                        @ {{ formateBalance( currTicketPrice * tickNum) }} ETH
                                    </p>
                                </div>
                                <div class="btn-choose">
                                    <a href="javascript:;" style="padding: 0 12px;" @click="chooseMin">Min</a>
                                    <a href="javascript:;" style="flex-grow: 1" @click="chooseHalf">1 / 2</a>
                                    <a href="javascript:;" style="flex-grow: 1" @click="chooseDouble">X 2</a>
                                    <a href="javascript:;" style="padding: 0 12px;" @click="chooseMax">Max</a>
                                </div>
                            </div>
                        </div>
                        <!--登录前-->
                        <div class="btn-box hide">
                            <a href="javascript:;" class="btn-big" @click="loginMetamask">Login to Metamask</a>
                            <a href="javascript:;" class="btn-small">使用收益支付</a>
                        </div>
                        <!--登陆后-->
                        <div class="btn-box ">
                            <a href="javascript:;" class="btn-big" @click="buyNum">
                                立即支付
                            </a>
                            <!--  -->
                            <a href="javascript:;" class="btn-small" :class="{'btn-hadlogin':selfMsg}">
                                <p :class="{'buyEnough':(parseFloat(selfMsg.win) + parseFloat(selfMsg.calcTicketEarn) + parseFloat(selfMsg.aff_invite)) >= currTicketPrice}">
                                    使用收益支付
                                </p>
                                <p style="font-size: 14px;" v-if="selfMsg">
                                    您有{{ parseFloat(selfMsg.win) + parseFloat(selfMsg.calcTicketEarn) + parseFloat(selfMsg.aff_invite) }} ETH
                                </p>
                            </a>
                        </div>
                    </div>
                </div>

            </template>

            <!--时间到准备开奖-->
            <!--on-->
            <p class="timeup" :class="{'on': currTimeUp }">
                TIME UP!
            </p>
            <!-- 待开奖  todo -->
            <p class="timeup" :class="{'on':waitWin}">
                Drawing !
            </p>

            <!--开奖 -->
            <div class="lottery hide" >
                <!--总奖池-->
                <div class="dapp-amout">
                    <img src="../../assets/img/superCoin/img-eth.png" alt="eth">
                    <p>
                        10.8197<i>ETH</i>
                    </p>
                </div>
                <!--未开奖-->
                <div class="notDraw hide">
                    <h5>
                        Waiting for the draw
                    </h5>
                    <p>
                        Background is counting data...
                    </p>
                </div>
                <!--开奖-有人中-->
                <p class="draw-someone ">
                    Congratulations to “0x***923” for Winning
                </p>
                <p class="draw-none hide">
                    No winner of this round.<br>
                    Prize pool will accumulate in the next round.
                </p>
                <!--中奖号码-->
                <!--on-->
                <div class="dapp-number on">
                    <ul>
                        <li>
                            ?
                        </li>
                        <li>
                            ?
                        </li>
                        <li>
                            ?
                        </li>
                        <li>
                            ?
                        </li>
                    </ul>
                </div>
            </div>

        </div>
        <!--信息展示区--> 
        <div class="information">
            <!--四个信息-->
            <div class="merge-info">
                <ul class="title" @click="tabEvt">
                    <li :class="{'on':informationTab==='myticket'}">
                        <a data-name="myticket" href="javascript:;">
                            My Ticket
                        </a>
                    </li>
                    <li :class="{'on':informationTab==='income'}">
                        <a data-name="income" href="javascript:;">
                            Income
                        </a>
                    </li>
                    <li :class="{'on':informationTab==='historyDraw'}">
                        <a data-name="historyDraw" href="javascript:;">
                            History Draw
                        </a>
                    </li>
                    <li :class="{'on':informationTab==='howToPlay'}">
                        <a data-name="howToPlay" href="javascript:;">
                            How To Play
                        </a>
                    </li>
                </ul>
                <!--我的购买-->
                <div class="ticket " :class="{'hide':informationTab!=='myticket'}">
                    <template  v-if="selfMsg">
                        <div class="explain-msg">
                            <p>
                                <lang>You can get 1 number for every purchase of 1 person. If you get the same number as the lottery number, you can get the prize pool reward.</lang>
                            </p>
                            <p>
                                You have not purchased this issue yet,<a href="javascript:;" style="color: #ff8a00;">Try Now!</a>
                            </p>
                        </div>
                        <!--已登录-->
                        <div class="ticket-logined">
                            <ul>
                                <li class="win">
                                    <p class="issue">
                                        Phase 13
                                    </p>
                                    <p class="money">
                                        <!--win的时候才展示 删除-->
                                        + 10.8197 ETH
                                    </p>
                                    <p class="amount">
                                        10
                                    </p>
                                </li>
                                <li>
                                    <p class="issue">
                                        Phase 13
                                    </p>
                                    <p class="money">
                                        + 10.8197 ETH
                                    </p>
                                    <p class="amount">
                                        10
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <!--我的购买详细展开-->
                        <!--on-->
                        <div class="open-ticket ">
                            <p>The No.16 , You bought 12 tickets</p>
                            <div class="ticket-box">
                                <ul>
                                    <li style="color: #ffa200;">
                                        0143
                                    </li>
                                    <li>
                                        0143
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- 分页msg  -->
                        <div class="pagination">
                            <el-pagination
                                    @current-change="orderCurrentChange"
                                    @size-change="orderSizeChange"
                                    background
                                    :current-page.sync="orderPageno"
                                    size="small"
                                    :page-sizes="[10, 25, 50, 100]"
                                    :page-size="orderpPgeSize"
                                    layout="sizes,prev, pager, next,jumper"
                                    :total="orderPageTotal"
                                    :next-text="_('Next >')"
                                    :prev-text="_('< Previous')"
                            >
                            </el-pagination>
                        </div>
                    </template>
                    <!--未登陆 或者 信息为空-->
                    <div class="ticket-unlogin" v-if="!selfMsg">
                        <!--未登陆-->
                        <p>
                            No record.  Please login to the <a href="javascript:;" style="color: #6a88cc;" @click="loginMetamask">Metamask</a>
                        </p>
                        <!--信息为空 todo -->
                        <p class="hide">
                            No record.
                        </p>
                    </div>
                </div>
                <!--我的收益-->
                <div class="income" v-if="selfMsg" :class="{'hide':informationTab!=='income'}">
                    <p class="explain-msg">
                        You can withdraw your dividends at any time, invite rewards and winning prizes.
                    </p>
                    <div class="income-item">
                        <p>
                            Dividend
                        </p>
                        <span>
                            {{ selfMsg.calcTicketEarn }} ETH
                        </span>
                    </div>
                    <div class="income-item">
                        <p>
                            Invitation
                        </p>
                        <span>
                            {{ selfMsg.aff_invite }} ETH
                        </span>
                    </div>
                    <div class="income-item">
                        <p>
                            Winning Prize
                        </p>
                        <span>
                            {{ selfMsg.win }} ETH
                        </span>
                    </div>
                    <div class="income-item income-item-last">
                        <p>
                            Total revenue
                        </p>
                        <div>
                            <span>
                                {{ parseFloat(selfMsg.win) + parseFloat(selfMsg.calcTicketEarn) + parseFloat(selfMsg.aff_invite) }} ETH
                            </span>
                            <span class="usd">
                                ≈ 231,769USD
                            </span>
                        </div>
                    </div>
                    <a href="javascript:;" class="btn-withdrawal" @click="withdraw">
                        Withdrawal
                    </a>
                </div>
                <!--历史开奖 hide -->
                <div class="historyDraw" :class="{'hide':informationTab!=='historyDraw'}">
                    <ul class="historyDraw-head">
                        <li class="issue">Phase</li>
                        <li class="winningNumbers">Winning Numbers</li>
                        <li class="bonus">Bonus</li>
                        <li class="winner">Winner</li>
                    </ul>
                    <ul class="historyDraw-main">
                        <li>
                            <p class="issue">
                                #100
                            </p>
                            <p class="winningNumbers">
                                0001
                            </p>
                            <p class="bonus">
                                10.8197 ETH
                            </p>
                            <p class="winner">
                                waitting...
                            </p>
                        </li>
                        <li>
                            <p class="issue">
                                #100
                            </p>
                            <p class="winningNumbers">
                                0001
                            </p>
                            <p class="bonus">
                                10.8197 ETH
                            </p>
                            <p class="winner">
                                No Winner
                            </p>
                        </li>
                        <li class="win">
                            <p class="issue">
                                #100
                            </p>
                            <p class="winningNumbers">
                                0001
                            </p>
                            <p class="bonus">
                                10.8197 ETH
                            </p>
                            <p class="winner">
                                0x23...233
                            </p>
                        </li>
                        <li>
                            <p class="issue">
                                #100
                            </p>
                            <p class="winningNumbers">
                                0001
                            </p>
                            <p class="bonus">
                                10.8197 ETH
                            </p>
                            <p class="winner">
                                waitting...
                            </p>
                        </li>
                        <li>
                            <p class="issue">
                                #100
                            </p>
                            <p class="winningNumbers">
                                0001
                            </p>
                            <p class="bonus">
                                10.8197 ETH
                            </p>
                            <p class="winner">
                                No Winner
                            </p>
                        </li>
                        <li class="win">
                            <p class="issue">
                                #100
                            </p>
                            <p class="winningNumbers">
                                0001
                            </p>
                            <p class="bonus">
                                10.8197 ETH
                            </p>
                            <p class="winner">
                                0x23...233
                            </p>
                        </li>
                        <li>
                            <p class="issue">
                                #100
                            </p>
                            <p class="winningNumbers">
                                0001
                            </p>
                            <p class="bonus">
                                10.8197 ETH
                            </p>
                            <p class="winner">
                                waitting...
                            </p>
                        </li>
                        <li>
                            <p class="issue">
                                #100
                            </p>
                            <p class="winningNumbers">
                                0001
                            </p>
                            <p class="bonus">
                                10.8197 ETH
                            </p>
                            <p class="winner">
                                No Winner
                            </p>
                        </li>
                        <li>
                            <p class="issue">
                                #100testtesttesttest
                            </p>
                            <p class="winningNumbers">
                                0001testtestv
                            </p>
                            <p class="bonus">
                                10.8197 ETHtesttest
                            </p>
                            <p class="winner">
                                No WinnertesttestWinnertesttestWinnertesttestWinnertesttest
                            </p>
                        </li>
                        <li class="win">
                            <p class="issue">
                                #100
                            </p>
                            <p class="winningNumbers">
                                0001
                            </p>
                            <p class="bonus">
                                10.8197 ETH
                            </p>
                            <p class="winner">
                                0x23...233
                            </p>
                        </li>
                    </ul>

                    <!-- 分页msg  -->
                    <div class="pagination">
                        <el-pagination
                                @current-change="expectCurrentChange"
                                @size-change="expectSizeChange"
                                background
                                :current-page.sync="expectPageno"
                                size="small"
                                :page-sizes="[10, 25, 50, 100]"
                                :page-size="expectPageSize"
                                layout="sizes,prev, pager, next,jumper"
                                :total="expectPageTotal"
                                :next-text="_('Next >')"
                                :prev-text="_('< Previous')"
                        >
                        </el-pagination>
                    </div>

                </div>
                <!--游戏教程-->
                <div class="instructions" :class="{'hide':informationTab!=='howToPlay'}">
                    <div class="explain-msg">
                        <p>
                            Brief Introduction:
                        </p>
                        <p>
                            LuckyCoin is a crowdfunding game based on blockchain technology. 0.005 ETH bet can win 10 ETH or more!
                        </p>
                        <p>
                            Gameplay:
                        </p>
                        <p>
                            1. At the beginning of the game, there will be a 10 ETH-prize pool and 3000 random numbers. And each ticket corresponds to a random number. After all tickets are sold out or time's up, the draw will proceed. If your ticket number matches draw number, you win the reward from prize pool (at least 10 ETH).
                        </p>
                        <p>
                            2. Share the dividend. Buyers who hold part/all of first 500 tickets of a round enjoy the dividend. More tickets bring more dividend.
                        </p>
                        <p>
                            3. If there's no winner of the round, the prize pool will accumulate in next round, and the ticket price will be adjusted as well.
                        </p>
                        <p>
                            Kind Reminder:
                        </p>
                        <p>
                            Playing on PC: MetaMask is recommended to install (download from <a href="https://metamask.io/" target="_blank" style="color: #ff8a00;">https://metamask.io/</a>).
                        </p>
                        <p>
                            Playing on mobile: Trust, Cipher, Jaxx and other mobile wallets are recommended to use.
                        </p>
                    </div>
                </div>

            </div>
            <!--邀请-->
            <div class="invite">
                <ul class="title">
                    <li class="on">
                        <a href="javascript:;">
                            Invite
                        </a>
                    </li>
                </ul>
                <p class="explain-msg">
                    Buy a promotion link, invite friends to participate in the game through this link, you will get 10% commission on his bet
                </p>
                                <!--邀请后-->
                <div class="invite-after" v-if="selfMsg && selfMsg.inviteLink !== ''">
                    <div class="my-link">
                        <p class="link-msg">
                            Your promotion link
                        </p>
                        <p class="mydomain">
                            {{ selfMsg.inviteLink }}
                        </p>
                        <a href="javascript:;"
                            v-clipboard:copy="selfMsg.inviteLink"
                            v-clipboard:success="copySucc"
                            v-clipboard:error="copyError"
                            class="btn-Copy ">
                            <lang>Copy</lang>
                        </a>
                        <p>
                            You have invited: {{ selfMsg.aff_invite_nums }} people
                        </p>
                        <p>
                            Commission awarded: <i style="color: #53e864;">{{ selfMsg.aff_invite }} ETH</i>
                        </p>
                    </div>
                </div>
                <!--邀请前-->
                <div class="invite-before" v-else>
                    <div class="input-group">
                        <input v-model="beforeInviteName" type="text" placeholder="Please enter your preferred name">
                        <a href="javascript:;" @click="getRandomName"></a>
                    </div>
                    <p>
                        Name rule <br>
                        1. Need is unique (database only)<br>
                        2. within 32 characters<br>
                        3. A-Z (letter lowercase)<br>
                        4. Allow numbers, but not pure numbers<br>
                        5. no special characters and spaces
                    </p>
                    <a href="javascript:;" class="btn-gobuy" @click="registerName">
                        Purchase with 0.001ETH
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mTypes, aTypes} from '~/store/cs_page/dappCoin'
import {
    copySucc,
    copyError,
    formateBalance,
    formateCoinType,
    formatTime
} from '~common/util'
import {coinAffAddr} from '~common/dappConfig.js'
import Vue from 'vue'
import BannerScroll from '~components/BannerScroll.vue'
import vueClipboard from 'vue-clipboard2'
import {web3, luckyCoinApi} from '~/dappApi/luckycoinApi'
import {Message} from 'element-ui'

Vue.use(vueClipboard)
export default {
    data () {
        return {
            informationTab: 'myticket', // 控制tab
            waitWin: false, // 待开奖 
            currTimeUp: null,
            balance: null, // 账户余额
            beforeInviteName: null, // 准备邀请的名字  注册的名字
            showFirstBaxi: false, // 首次提示
            selfAddr: null,
            isFromFlag: false, // 是否是来自邀请
            tickNum: 1, // 购买票数
            roundInfo: null, // getcurrentRoundInfo msg
            selfMsg: null,
            timeLeft: null, // 剩余时间
            nowFormateTime: null, // 格式化的时间
            nowTimeInterval: null,
            currTicketPrice: null, // 单价
            allTicketPrice: null,
            maxTicketNum: null, // 最大ticket 数量
            expectsList: null,  // 期号历史数据
            ordersList: null, // 订单历史数据

            expectPageno: 1,
            expectPageSize: 10,
            expectPageTotal: 10,

            orderPageno: 1,
            orderpPgeSize: 10,
            orderPageTotal: 10,
        }
    },
    watch: {
        isLog (val) {
            /* 切换登陆态之后改变状态 */
            this.changePageState()
        }
    },
    methods: {
        copySucc,
        copyError,
        formateBalance,
        formatTime,
        tabEvt(evt){
            if(evt.target.nodeName === 'A'){
                let dataName = evt.target.getAttribute('data-name')
                if(this.selfMsg){
                    this.informationTab = dataName
                }else{
                    if(dataName==='howToPlay'||dataName==='myticket'){
                        this.informationTab = dataName
                    }else{
                        this.loginMetamask()
                    }
                }
            }
        },
        loginMetamask(){
            Message({
                message: '点击又上角进行登录',
                type: 'error'
            })
        },
        async expectCurrentChange(pageno = this.expectPageno){
            let params = {
                pageno,
            }
            let data = await this.getSuperCoinExpects(params)
            data = data.data
            if (data) {
                this.expectsList = this.formatData(data.orders)
                this.expectPageTotal = parseInt(data.counter, 10)
            }
        },
        expectSizeChange(){

        },
        async orderCurrentChange(pageno = this.orderPageno){
            let params = {
                pageno,
            }
            let data = await this.getSuperCoinOrder(params)
            data = data.data
            if (data) {
                this.ordersList = this.formatData(data.orders)
                this.orderPageTotal = parseInt(data.counter, 10)
            }
        },
        orderSizeChange(){

        },
        checkTicket () {
            if (isNaN(Number(this.tickNum))) {
                Message({
                    message: '请输入正确的数值',
                    type: 'error'
                })
                this.tickNum = 0
                return false
            }
            this.tickNum = this.tickNum > 1500 ? 1500 : this.tickNum
        },
        chooseMin(){
            this.tickNum = 1;
        },
        chooseHalf () {
            this.tickNum = Number(this.tickNum)
            if (isNaN(this.tickNum)) {
                this.tickNum = 1
                return
            }
            if (this.tickNum === 0) {
                this.tickNum = 1 * 2
                return
            }
            Math.ceil(this.tickNum / 2) >= 1 ? this.tickNum = Math.ceil(this.tickNum / 2) : this.tickNum = 1
        },
        chooseDouble () {
            this.tickNum = Number(this.tickNum)
            if (isNaN(this.tickNum)) {
                this.tickNum = 1
                return
            }
            if (this.tickNum === 0) {
                this.tickNum = 1 * 2
                return
            }
            this.tickNum * 2 <= this.maxTicketNum ? this.tickNum = this.tickNum * 2 : this.tickNum = this.maxTicketNum
        },
        chooseMax () {
            this.tickNum = this.maxTicketNum
        },
        isVerifyName (name) {
            let regaz = /^[a-z0-9\-\s]+$/
            let regonlyNum = /^[0-9]+$/
            return name.length <= 32 && regaz.test(name) && !regonlyNum.test(name) && name.indexOf(' ') === -1
        },
        getRandomName () {
            let getRandomKey = (list) => {
                return Math.floor(Math.random() * list.length)
            }
            let randomNameArr = ['reward', 'moreMoney', 'fomo', 'index', 'quick', 'ninja', 'truce', 'harj', 'finney', 'szabo', 'gwei', 'laser', 'justo', 'satoshi', 'mantso', '3D', 'inventor', 'theShocker', 'aritz', 'sumpunk', 'cryptoknight', 'randazz', 'kadaz', 'daok', 'shenron', 'notreally', 'thecrypt', 'figures', 'mermaid', 'barnacles', 'dragons', 'jellybeans', 'snakes', 'dolls', 'bushes', 'cookies', 'apples', 'cream', 'ukulele', 'kazoo', 'banjo', 'singer', 'circus', 'trampoline', 'carousel', 'carnival', 'locomotive', 'balloon', 'mantis', 'animator', 'artisan', 'artist', 'colorist', 'inker', 'coppersmith', 'director', 'designer', 'flatter', 'stylist', 'leadman', 'limner', 'artist', 'model', 'musician', 'penciller', 'producer', 'scenographer', 'decorator', 'silversmith', 'teacher', 'mechanic', 'beader', 'bobbin', 'cchapel', 'ttendant', 'foreman', 'engineering', 'mechanic', 'miller', 'moldmaker', 'beater', 'patternmaker', 'operator', 'plumber', 'sawfiler', 'foreman', 'soaper', 'engineer', 'wheelwright', 'woodworkers']
            let randomNameArr2 = ['adamant', 'adroit', 'amatory', 'animistic', 'antic', 'arcadian', 'baleful', 'bellicose', 'bilious', 'boorish', 'calamitous', 'caustic', 'cerulean', 'comely', 'concomitant', 'contumacious', 'corpulent', 'crapulous', 'defamatory', 'didactic', 'dilatory', 'dowdy', 'efficacious', 'effulgent', 'egregious', 'endemic', 'equanimous', 'execrable', 'fastidious', 'feckless', 'fecund', 'friable', 'fulsome', 'garrulous', 'guileless', 'gustatory', 'harjd', 'heuristic', 'histrionic', 'hubristic', 'incendiary', 'insidious', 'insolent', 'intransigent', 'inveterate', 'invidious', 'irksome', 'jejune', 'jocular', 'judicious', 'lachrymose', 'limpid', 'loquacious', 'luminous', 'mannered', 'mendacious', 'meretricious', 'minatory', 'mordant', 'munificent', 'nefarious', 'noxious', 'obtuse', 'parsimonious', 'pendulous', 'pernicious', 'pervasive', 'petulant', 'platitudinous', 'precipitate', 'propitious', 'puckish', 'querulous', 'quiescent', 'rebarbative', 'recalcitant', 'redolent', 'rhadamanthine', 'risible', 'ruminative', 'sagacious', 'salubrious', 'sartorial', 'sclerotic', 'serpentine', 'spasmodic', 'strident', 'taciturn', 'tenacious', 'tremulous', 'trenchant', 'turbulent', 'turgid', 'ubiquitous', 'uxorious', 'verdant', 'voluble', 'voracious', 'wheedling', 'withering', 'zealous']
            let newRandom = randomNameArr.concat(randomNameArr2)
            let endPoint = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '']
            this.beforeInviteName = newRandom[getRandomKey(newRandom)] + endPoint[getRandomKey(endPoint)]
        },
        async pageInit () {
            // 初始化页面
            this.selfAddr = await luckyCoinApi.getAccounts()
            this.getCurrentRoundInfo()
            await this.getPlayerInfoByAddress()
            this.timeLeft = await luckyCoinApi.getTimeLeft()
            this.currTicketPrice = await luckyCoinApi.getBuyPrice()
            if (this.balance && Number(this.balance) > 0) {
                this.maxTicketNum = Math.floor( Number(this.balance ) / Number(this.currTicketPrice) ) > (1500 - this.roundInfo.tickets) ? (1500 - this.roundInfo.tickets) : Math.floor( Number(this.balance ) / Number(this.currTicketPrice) )
            }else{
                this.maxTicketNum = 1500 - this.roundInfo.tickets
            }
            if(this.timeLeft === 0){
                this.waitWin = true ;
                this.nowFormateTime = '00:00:00'
            }else{
                this.startTimeLeft()
            }
            window.setInterval(async () => {
                this.timeLeft = await luckyCoinApi.getTimeLeft()
                if(this.timeLeft !== 0){
                    this.startTimeLeft()
                }
            }, 10000)
            //  请求历史数据
            this.expectCurrentChange()
            //  用户投注订单记录
            this.orderCurrentChange()
        },
        getSuperCoinExpects (params) {
            return this.$store.dispatch(aTypes.superCoinExpects , {
                pagesize: this.pageSize,
                ...params
            })
        },
        getSuperCoinOrder (params) {
            return this.$store.dispatch(aTypes.superCoinOrder , {
                pagesize: this.pageSize,
                ...params
            })
        },
        startTimeLeft () {
            // 倒计时
            clearInterval(this.nowTimeInterval)
            this.nowTimeInterval = setInterval(() => {
                if (this.timeLeft !== undefined) {
                    if (this.timeLeft === 0) {
                        // 执行时间到动画
                        this.currTimeUp = true;
                        setTimeout(()=>{
                            this.currTimeUp = flase;
                            // 显示待开奖状态
                            this.waitWin = true
                        },5000)
                        clearInterval(this.nowTimeInterval)
                    }
                    this.nowFormateTime = this.formatTime(this.timeLeft, 'HH:mm:ss')
                    this.timeLeft--
                }
            }, 1000)
        },
        async getPlayerInfoByAddress () {
            if (this.selfAddr) {
                let allMsg = await luckyCoinApi.getPlayerInfoByAddress(this.selfAddr)
                console.log(allMsg)
                this.selfMsg = allMsg[0]
                this.balance = allMsg[1]
                console.log(this.selfMsg)
                this.selfMsg.inviteLink = this.selfMsg.name === '' ? '' : `${window.location.origin}/supercoin/${this.selfMsg.name}`
            } else {
                console.warn('没有取得地址msg')
            }
        },
        async getCurrentRoundInfo () {
            // 获取页面相关信息
            this.roundInfo = await luckyCoinApi.getCurrentRoundInfo()
            this.calVotingLen = `transform: scaleX(${this.roundInfo.tickets / 1500})`
        },
        async buyNum () {
            // 购买号码
            let buyBack = null
            let currPrice = await luckyCoinApi.getBuyPrice()
            if (this.currTicketPrice === 0) {
                console.error('this.currTicketPrice 0')
                return false
            }
            if (typeof this.tickNum === 'string') {
                this.tickNum = Number(this.tickNum)
            }
            console.log(currPrice)
            buyBack = await luckyCoinApi.buyXaddr(this.tickNum, this.isFromFlag, this.currTicketPrice * this.tickNum)
            console.log(buyBack)
            console.log('buyBack')
            if (buyBack) {
                console.log('购买成功')
            }
        },
        async registerName () {
            let buyNameBack = null
            if(!this.selfMsg){
                this.loginMetamask();
                return false
            }
            if (!this.beforeInviteName) {
                Message({
                    message: '请输入名字',
                    type: 'error'
                })
                return false
            }
            // 判断是否符合规则
            if (!(this.isVerifyName(this.beforeInviteName))) {
                Message({
                    message: '名字不符合规则',
                    type: 'error'
                })                
                return false
            }
            // 判断是否已经被购买
            this.beforeInviteName = this.beforeInviteName.toString()
            let checkName = await luckyCoinApi.testName(this.beforeInviteName)
            if (checkName) {
                buyNameBack = await luckyCoinApi.registerNameXaddr(this.beforeInviteName, this.isFromFlag)
            } else {
                Message({
                    message: '名字已被注册',
                    type: 'error'
                })                         
            }
        },
        async withdraw () {
            let withdrawBack = await luckyCoinApi.withdraw()
            if (withdrawBack) {
                console.log('提款成功')
            }
        },
        analysisBuyNum (bigNum) {
            //  解析数值
            let buyNumArr = []
            let startIndex = 1
            let currReduce = null
            let betweenNum = bigNum
            do {
                currReduce = reduceBigNum(betweenNum)
                if (!(currReduce.isZero)) {
                    buyNumArr.push(startIndex)
                }
                betweenNum = currReduce.bigNum
                startIndex++
            } while (parseInt(betweenNum) !== 0)
            return buyNumArr
            function reduceBigNum (bigNum) {
                bigNum = bigNum.toString()
                let bigNumArr = bigNum.split('')
                let endNumArr = []
                let beforeNum = false
                let currNum = null
                for (let i = 0; i < bigNumArr.length; i++) {
                    if (isNaN(Number(bigNumArr[i]))) {
                        console.error('bigNum NaN')
                        break
                    }
                    currNum = Number(bigNumArr[i])
                    beforeNum ? endNumArr.push(Math.floor((currNum + 10) / 2)) : endNumArr.push(Math.floor((currNum) / 2))
                    beforeNum = (currNum % 2 === 1)
                }
                return {
                    bigNum: endNumArr.join(''),
                    isZero: !beforeNum
                }
            }
        }
    },
    computed: {
        language () {
            return this.$store.state.language
        }
    },
    components: {
        BannerScroll
    },
    async mounted () {
        if (this.$route.params && this.$route.params.inviteName) {
            this.isFromFlag = this.$route.params.inviteName
        } else {
            this.isFromFlag = coinAffAddr
        }
        console.log(this.isFromFlag)
        this.pageInit()
    },
    filters: {
    }
}
</script>
<style scoped lang="less" type="text/less">
    @import "../../styles/lib-mixins.less";
    .luckyDapp {
        background: #211c38;
        * {
            box-sizing: border-box;
        }
    }
    .head-dapp {
        width: 100%;
        background: #151515;
        .head-dapp-wrap {
            position: relative;
            max-width: 1190px;
            width: 92%;
            height: 70px;
            overflow: hidden;
            margin: 0 auto;
            padding: 0 5px 0 3px;
            color: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .logo {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 20px;
                img{
                    width: 39px;
                    margin-right: 14px;
                }
            }
            .fr-msg{
                display: flex;
                height: 100%;
                a{
                    display: flex;
                    flex-shrink: 0;
                    align-items: center;
                    height: 100%;
                    margin-left: 25px;
                    color: #fff;
                    font-size: 16px;
                }
                .btn-home{
                    width: 17px;
                    height: 100%;
                    background: url("../../assets/img/superCoin/icon-home.png") no-repeat center;
                    background-size: 17px;
                }
                .invite{
                    position: relative;
                    color: #53e864;
                    &::before{
                        content: '';
                        display: inline-block;
                        margin-right: 8px;
                        width: 19px;
                        height: 100%;
                        background: url("../../assets/img/superCoin/icon-gift.png") no-repeat center;
                        background-size: 19px;
                    }
                }
            }
        }
    }
    .banner-dapp{
        .buyEnough{
            color: #fff;
        }
        position: relative;
        width: 100%;
        height: 585px;
        overflow: hidden;
        padding: 10px 0 40px 0;
        background: url("../../assets/img/superCoin/bg.jpg") no-repeat center, linear-gradient(#223541,#32215a);
        transition: all 0.2s ease-in-out;
        .message{
            position: relative;
            width: 92%;
            max-width: 1083px;
            height: 44px;
            overflow: hidden;
            background: rgba(19,32,44,0.6);
            margin: 0 auto 17px;
            &::before{
                content: '';
                display: block;
                margin-left: 10px;
                width: 16px;
                height: 100%;
                background: url("../../assets/img/superCoin/icon-msg.png") no-repeat center;
            }
            ul{
                position: absolute;
                top: 0;
                left: 44px;
                width:90%;
                li{
                    width: 100%;
                    height: 100%;
                    line-height: 44px;
                    font-size: 16px;
                    color: #fff;
                    .text-overflow();
                }
            }
        }
        .issue{
            position: absolute;
            top: 80px;
            left: 50%;
            transform: translate(-50%);
            width: 92%;
            max-width: 1083px;
            line-height: 24px;
            font-size: 20px;
            color: #fff;
            &.draw{
                font-size: 16px;
            }
        }
        .betting-area{
            position: relative;
            width: 92%;
            max-width: 1083px;
            overflow: hidden;
            margin: 0 auto;
            .betting{
                overflow: hidden;
                .item-msg{
                    display: flex;
                    align-items: flex-start;
                    width: 621px;
                    height: 84px;
                    padding: 30px 0 0 0;
                    overflow: hidden;
                    font-size: 20px;
                    color: #a5b1c2;
                    background: url("../../assets/img/superCoin/bg-line.png") no-repeat center bottom;
                    .title{
                        margin-right: 10px;
                    }
                    .jackpot-amount{
                        font-size: 56px;
                        color: #ffa200;
                        font-weight: bold;
                    }
                    .jackpot-unit{
                        font-size: 24px;
                        color: #ffa200;
                        font-weight: bold;
                    }
                    .countdown{
                        position: relative;
                        text-indent: 32px;
                        color: #ffa200;
                        background: url("../../assets/img/superCoin/icon-countdown.png") no-repeat center left;
                    }
                    .ticket{
                        display: flex;
                        align-items: flex-start;
                        text-align: center;
                    }
                    .people-purchased{
                        position: relative;
                        p{
                            position: relative;
                            padding-left: 28px;
                            color: #ffa200;
                            &::before{
                                content: '';
                                display: inline-block;
                                position: absolute;
                                left: 0;
                                top: 50%;
                                transform: translateY(-50%);
                                width: 20px;
                                height: 20px;
                                background: url("../../assets/img/superCoin/icon-ticket.png") no-repeat center left;
                            }
                        }
                        &::after{
                            content: attr(data-msg);
                            display: block;
                            font-size: 12px;
                            color: #a5b1c2;
                        }
                    }
                    .ticket-progress{
                        position: relative;
                        width:126px;
                        height:14px;
                        overflow: hidden;
                        background:rgba(165,177,194,1);
                        margin: 6px 10px 0;
                        i{
                            display: block;
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            background: #ffa200;
                            transform-origin: left center;
                            transition: all 0.5s ease-in-out;
                        }
                    }
                    .people-remaining{
                        &::after{
                            content: attr(data-msg);
                            display: block;
                            font-size: 12px;
                            color: #a5b1c2;
                        }
                    }
                    .people-all{
                        margin-left: 35px;
                        text-indent: 30px;
                        background: url("../../assets/img/superCoin/icon-people.png") no-repeat center left;
                    }
                    &:first-child{
                        padding-top: 0;
                        align-items: baseline;
                    }
                }
                .buy-area{
                    padding: 23px 0 37px 0;
                    line-height: 40px;
                    font-size: 20px;
                    color: #fff;
                    overflow: hidden;
                    .title{
                        margin-right: 16px;
                    }
                    .input-box{
                        position: relative;
                        display: flex;
                        align-items: center;
                        height: 40px;
                        padding:0 0 0 42px;
                        background: #6258b7 url("../../assets/img/superCoin/icon-ticket-fff.png") no-repeat 10px center;
                        border-radius: 6px;
                        input{
                            outline: none;
                            border: none;
                            width: 140px;
                            height: 32px;
                            text-align: center;
                            line-height: 32px;
                            color: #000;
                            border-radius: 2px;
                        }
                        p{
                            margin: 0 30px 0 16px;
                        }
                    }
                    .btn-choose{
                        margin: 14px 0 0 0;
                        display: flex;
                        text-align: center;
                        border: 1px solid #ff8a00;
                        border-radius: 6px;
                        a{
                            font-size: 16px;
                            color: #ff8a00;
                        }
                        a+a{
                            border-left: 1px solid #ff8a00;
                        }
                    }
                }
                .btn-box{
                    display: flex;
                    justify-content: space-between;
                    width: 540px;
                    a{
                        display: block;
                        text-align: center;
                        height:62px;
                        line-height: 62px;
                        border-radius:6px;
                        &:hover{
                            filter: brightness(1.2);
                        }
                    }
                    .btn-big{
                        width:327px;
                        background:rgba(255,138,0,1);
                        font-size: 24px;
                        color: #fff;
                        font-weight: bold;
                    }
                    .btn-small{
                        width:200px;
                        border:1px solid #484b86;
                        background: #312259;
                        font-size: 16px;
                        color: rgba(95,122,184,0.4);
                        &.btn-hadlogin{
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            p{
                                line-height: 20px;
                            }
                        }
                    }
                }
            }
        }
        .lottery{
            text-align: center;
            color: #fff;
            .dapp-amout{
                display: flex;
                justify-content: center;
                /*外边距重叠*/
                margin-top: 43px;
                font-size: 86px;
                color: #ff8a00;
                font-weight: bold;
                img{
                    margin-right: 22px;
                }
                i{
                    font-size: 32px;
                }
            }
            .notDraw{
                margin: 14px 0 37px 0;
                h5{
                    line-height: 44px;
                    font-size: 36px;
                }
                p{
                    font-size: 16px;
                }
            }
            .draw-someone{
                width: 100%;
                height: 52px;
                overflow: hidden;
                margin: 50px 0 37px 0;
                line-height: 52px;
                font-size: 36px;
                color: #ff8a00;
                font-weight: bold;
            }
            .draw-none{
                margin: 22px 0;
                line-height: 48px;
                font-size: 36px;
            }
            .dapp-number{
                ul{
                    display: flex;
                    justify-content: center;
                    overflow: hidden;
                }
                li{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 71px;
                    height: 79px;
                    overflow: hidden;
                    margin: 0 5px;
                    background: url("../../assets/img/superCoin/bg-hexagon.png") no-repeat center;
                    background-size: cover;
                    font-size: 36px;
                    color: #fff;
                }
                &.on{
                    li{
                        background: url("../../assets/img/superCoin/bg-hexagon-on.png") no-repeat center;
                        background-size: cover;
                        color: #211c38;
                        font-weight: bold;
                    }
                }
            }
        }
        .timeup{
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-400px);
            width: 100%;
            background: rgba(21,21,21,0.8);
            text-align: center;
            font-size: 84px;
            color: #2cffd5;
            font-weight: bold;
            opacity: 0;
            transition: all 0.1s ease-in-out;
            &::before,&::after{
                content: '';
                display: block;
                position: absolute;
                width: 100%;
                height: 1px;
                left: 0;
                background: #2cffd5;
                overflow: hidden;
            }
            &::before{
                top: 5px;
            }
            &::after{
                bottom: 5px;
            }
            &.on{
                opacity: 1;
                transform: translateY(-50%);
            }
        }
        &.status2{
            height: 580px;
            background: url("../../assets/img/superCoin/bg2.jpg") no-repeat center, linear-gradient(#223541,#32215a);
        }
    }
    .information{
        padding: 24px 0 90px 0;
        max-width: 1083px;
        width: percentage(710/750);
        margin: 0 auto;
        overflow: hidden;
        line-height: 24px;
        font-size: 14px;
        color: #a5b1c2;
        .title{
            line-height: 42px;
            font-size: 20px;
            color: #6a88cc;
            overflow: hidden;
            li{
                float: left;
                width: 25%;
                border-bottom: 4px solid #3a3953;
                text-align: center;
                a{
                    display: block;
                    color: #6a88cc;
                }
                &.on{
                    border-bottom: 4px solid #a5b1c2;
                    a{
                        color: #fff;
                    }
                }
            }
        }
        .explain-msg{
            margin: 20px 0;
        }
        .merge-info{
            float: left;
            width: 92%;
            max-width: 650px;
        }
        .invite{
            float: right;
            max-width: 370px;
            width: 100%;
            .title{
                li{
                    width: 100%;
                    text-align: left;
                    &.on{
                        border-bottom: 4px solid #3a3953;
                    }
                }
            }

            .invite-before{
                .input-group{
                    display: flex;
                    width:361px;
                    height:47px;
                    overflow: hidden;
                    margin-bottom: 13px;
                    padding: 3px 0;
                    border: 1px solid #6a88cc;
                    border-radius: 6px;
                    input{
                        text-indent: 15px;
                        background: transparent;
                        border: none;
                        outline: none;
                        flex: 1;
                        font-size: 14px;
                        color: #6a88cc;
                        transition: all 0.2s;
                        &::-webkit-input-placeholder{
                            font-size: 14px;
                            color: #6a88cc;
                        }
                        &:focus{
                            color: #fff;
                        }
                    }
                    a{
                        display: block;
                        width: percentage(58/361);
                        border-left: 1px solid #6a88cc;
                        background: url("../../assets/img/superCoin/btn-random.png") no-repeat center;
                        background-size: 26px;
                    }
                }
                .btn-gobuy{
                    display: block;
                    width:365px;
                    height:51px;
                    overflow: hidden;
                    margin: 20px 0 0 0;
                    background: #6a88cc;
                    color: #fff;
                    font-size: 20px;
                    border-radius: 6px;
                    text-align: center;
                    line-height: 51px;
                }
            }
            .invite-after{
                color: #fefeff;
                .link-msg{
                    line-height: 20px;
                }
                .mydomain{
                    line-height: 25px;
                    color: #fefeff;
                    font-size: 20px;
                }
                .btn-copy{
                    display: block;
                    width:80px;
                    height:30px;
                    overflow: hidden;
                    margin: 7px 0 11px 0;
                    border: 1px solid #53e864;
                    line-height: 30px;
                    text-align: center;
                    border-radius:6px;
                    color: #53e864;
                }
            }

        }
        .ticket{
            position: relative;
            .ticket-unlogin{
                padding: 155px 0 77px 0;
                border: 1px solid #3a3953;
                text-align: center;
                line-height: 47px;
                font-size: 16px;
                background: url("../../assets/img/superCoin/nomsg.png") no-repeat center 60px;
                background-size: 107px;
            }
            .ticket-logined{
                li{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 22px 0 25px;
                    height: 50px;
                    background: #3a3953;
                    margin-bottom: 10px;
                    font-size: 16px;
                    cursor: pointer;
                    &:hover{
                        filter:brightness(1.1);
                    }
                    .money{
                        font-size: 20px;
                        font-weight: bold;
                    }
                    .amount{
                        padding-right: 34px;
                        background: url("../../assets/img/superCoin/icon-ticket-fff.png") no-repeat center right;
                        background-size: 17px;
                        color: #ffffff;
                    }
                    &.win{
                        background: #ff8a00;
                        color: #fff;
                    }
                }
            }
            .open-ticket{
                position: absolute;
                left: 0;
                top: 85px;
                padding: 23px 22px 15px;
                background: #ffffff;
                width: 100%;
                color: #263547;
                border-radius: 6px;
                transform: translateY(-300px);
                transition: all 0.5s ease-in-out;
                opacity: 0;
                p{
                    line-height: 38px;
                    font-size: 24px;
                }
                .ticket-box{
                    max-height: 48*5px;
                    overflow: auto;
                    &::-webkit-scrollbar {
                        width: 6px;
                    }
                    &::-webkit-scrollbar-thumb {
                        border-radius: 6px;
                        background: #ff8a00;
                    }
                    &::-webkit-scrollbar-track{
                        border-radius: 6px;
                        background: #211c38;
                    }
                }
                ul{
                    overflow: hidden;
                }
                li{
                    float: left;
                    line-height: 48px;
                    font-size: 16px;
                    margin-right: 15px;
                }
                &.on{
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        }
        .historyDraw{
            .historyDraw-head{
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 52px;
                border-bottom: 1px solid #3a3953;
                padding: 0 14px 0 18px;
            }
            .historyDraw-main{
                li{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 54px;
                    padding: 0 14px 0 18px;
                    border-bottom: 1px solid #3a3953;
                    font-size: 16px;
                    &.win{
                        color: #ff8a00;
                    }
                }
            }
            text-align: right;
            .issue{
                flex-basis: percentage(86/650);
                text-align: left;
                .text-overflow();
            }
            .winningNumbers{
                flex-basis: percentage(238/650);
                text-align: center;
                .text-overflow();
            }
            .bonus{
                flex-basis: percentage(136/750);
                .text-overflow();
            }
            .winner{
                flex: 1;
                .text-overflow();
            }
        }
        .income{
            .explain-msg{
                margin-bottom: 28px;
            }
            .income-item{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 54px;
                border-top: 2px solid #3a3953;
                font-size: 20px;
                p{
                    color: #fff;
                }
                span{
                    color: #3fc06f;
                }
                &.income-item-last{
                    align-items: flex-start;
                    height: 77px;
                    padding-top: 16px;
                    border-bottom: 2px solid #3a3953;
                    .usd{
                        font-size: 14px;
                    }
                    span{
                        display: block;
                        text-align: right;
                    }
                }
            }
            .btn-withdrawal{
                display: block;
                width: percentage(365/650);
                line-height: 50px;
                height: 50px;
                overflow: hidden;
                margin: 26px auto 0;
                background: #3fc06f;
                text-align: center;
                font-size: 20px;
                color: #fff;
                border-radius: 6px;
            }
        }
    }
</style>
<style scoped lang="less" type="text/less">
    @import "../../styles/lib-mixins.less";
    @media (max-width: 480px) {
        .head-dapp{
            .head-dapp-wrap{
                .px2rem(height,100);
                .logo{
                    p{
                        display: none;
                    }
                }
                .fr-msg{
                    a{
                        margin-left: 45px;
                        font-size: 28px;
                    }
                    .btn-home{
                        width: 32px;
                        background-size: 32px;
                    }
                    .invite{
                        &::before{
                            width: 27px;
                            background: url("../../assets/img/superCoin/icon-gift.png") no-repeat center;
                            background-size: 27px;
                        }
                    }
                }
            }
        }
    }
</style>
