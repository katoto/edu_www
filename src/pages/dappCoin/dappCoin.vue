<template>
    <div class="luckyDapp">
        <div class="head-dapp" >
            <div class="head-dapp-wrap">
                <h1 class="logo">
                    <img src="@/assets/img/superCoin/logo-luckyDapp.png" alt="logo-dapp" title="logo-dapp" class="hide">
                    <p>SuperCoin</p>
                </h1>
                <div class="fr-msg">
                    <a href="javascript:;" class="invite" @click="scrollInvite"><lang>Referrals</lang></a>
                    <a href="https://etherscan.io/address/0x2119a3314c1d40704d816392a9e44da463688992#code" target="_blank"><lang>Contract</lang></a>
                    <a href="javascript:;" @click="showNewguide" v-lang="'Easy&nbsp;Play'"></a>
                    <router-link :to="{path: '/home'}"  class="btn-home" ></router-link>
                </div>
            </div>
        </div>
        <!--status2-->
        <div class="banner-dapp" :class="{'status2':nextScreen && pageSucc}">
            <!--公告 滚动  components-->
            <banner-scroll v-if="scrollMsg" class="message">
                <div class="text-scroller" style="height:100%">
                    <ul class="scroller-in">
                        <li v-for="(item,index) in scrollMsg" :key="index">{{ item }}</li>
                    </ul>
                </div>
            </banner-scroll>
            <!--draw-->
            <template v-if="roundInfo && pageSucc">
                <div class="issue">
                    <p v-if="!nextScreen">{{ _('Round {0}', roundInfo.roundIndex ) }}</p>
                    <template v-if="someGetWin && roundInfo">
                        <p clsss="issue-pc">
                            <!-- 当前时间 -->
                            <!-- August 29, 2018, 10:00<br>Go to the next issue,<br>Bonus {{ roundInfo.jackpot }} ETH -->
                            {{ _('Next round will start at {0}', forNextRoundStart(nextRoundStart)) }}<br />
                            <lang>Prize Pool</lang>: 10 ETH
                        </p>
                        <p class="issue-h5">
                            {{ _('Next round will start at {0}', forNextRoundStart(nextRoundStart)) }}<lang>Prize Pool</lang>: 10 ETH
                            <!-- {{ forNextRoundStart(nextRoundStart) }}<lang>Go to the next issue,</lang><lang>Prize Pool</lang>10 ETH -->
                        </p>
                    </template>
                    <template v-if="!someGetWin && !waitWin && nextScreen">
                        <p clsss="issue-pc ">
                            <!-- 当前时间 -->
                            {{ _('Next round will start at {0}', forNextRoundStart(nextRoundStart)) }}<br /><lang>Prize Pool</lang>: {{ formatesuperCoin(roundInfo.jackpot) }} ETH
                        </p>
                        <p class="issue-h5">
                            {{ _('Next round will start at {0}', forNextRoundStart(nextRoundStart)) }}<lang>Prize Pool</lang>: {{ formatesuperCoin(roundInfo.jackpot) }} ETH
                        </p>
                    </template>

                </div>
                <div :class="{'hide':nextScreen}">
                    <!--未开奖投注区-->
                    <div class="betting-area" :class="{'isNew':isNew}">
                        <div class="fr betting">
                            <div class="item-msg">
                                <p class="title">
                                    <lang>Prize Pool </lang>
                                </p>
                                <p class="jackpot-amount" :class="{'isNewShow': isShowStep1}">
                                     {{ formatesuperCoin(roundInfo.jackpot) }}
                                </p>
                            </div>
                            <div class="item-msg">
                                <p class="title">
                                    <lang>Countdown</lang>
                                </p>
                                <p class="countdown" :class="{'on': timeLeft<= 600 && timeLeft > 0,'isNewShow': isShowStep2}">
                                    {{ nowFormateTime }}
                                </p>
                            </div>
                            <div class="item-msg">
                                <p class="title title-process" :class="{'isNewShow': isShowStep3}">
                                    <lang>Tickets</lang>
                                </p>
                                <div class="ticket">
                                    <div class="people-purchased" :data-msg="_('Bought')">
                                        <p>{{ roundInfo.tickets }}</p>
                                    </div>
                                    <div class="ticket-progress">
                                        <!-- transform: scaleX(0.5) -->
                                        <i :style="calVotingLen"></i>
                                    </div>
                                    <div class="people-remaining" :data-msg="_('Remain')">
                                        <p>{{ 1500 - roundInfo.tickets }}</p>
                                    </div>
                                </div>
                                <p class="people-all">
                                    {{ roundInfo.playernums }}
                                </p>
                            </div>
                        </div>
                        <div class="buy-area">
                            <div class=" title">
                                <p>
                                    <lang>Buy </lang>
                                </p>
                            </div>
                            <div class=" input-wrap">
                                <div class="input-box">
                                    <input v-model="tickNum" @blur="checkTicketPoint" type="text" @input="checkTicket">
                                    <p>
                                        @ {{ formatesuperCoin( currTicketPrice * tickNum) }} ETH
                                    </p>
                                </div>
                                <div class="btn-choose">
                                    <a href="javascript:;"  @click="chooseMin"><lang>Min</lang></a>
                                    <a href="javascript:;"  @click="chooseHalf">1 / 2</a>
                                    <a href="javascript:;"  @click="chooseDouble">X 2</a>
                                    <a href="javascript:;"  @click="chooseMax"><lang>Max</lang></a>
                                </div>
                            </div>
                        </div>
                        <!--登录前-->
                        <div class="btn-box hide">
                            <a href="javascript:;" class="btn-big" @click="loginMetamask" :class="{'isNewShow':isShowStep4}">Login to Metamask</a>
                            <a href="javascript:;" class="btn-small"><lang>Pay by Income</lang></a>
                        </div>
                        <!--登陆后-->
                        <div class="btn-box">
                            <a href="javascript:;" class="btn-big" @click="buyNum" :class="{'isNewShow':isShowStep4}">
                                <lang>Pay</lang>
                            </a>
                            <!--  -->
                            <a href="javascript:;" class="btn-small" :class="{'btn-hadlogin':selfMsg}">
                                <template v-if="selfMsg">
                                    <p class="buyEnough" @click="useReloadBuy" v-if="parseFloat(formatesuperCoin(parseFloat(selfMsg.win) + parseFloat(selfMsg.calcTicketEarn) + parseFloat(selfMsg.aff_invite))) >= (currTicketPrice * tickNum)" >
                                        <lang>Pay by Income</lang>
                                    </p>
                                    <p v-else>
                                        <lang>Insufficient Income</lang>
                                    </p>
                                    <p>
                                        <template v-if="parseFloat(formatesuperCoin(parseFloat(selfMsg.win) + parseFloat(selfMsg.calcTicketEarn) + parseFloat(selfMsg.aff_invite))) !== 0">
                                            <template v-if="language==='en'">
                                                {{ formatesuperCoin(parseFloat(selfMsg.win) + parseFloat(selfMsg.calcTicketEarn) + parseFloat(selfMsg.aff_invite)) }} ETH Balance
                                            </template>
                                            <template v-else>
                                                您有{{ formatesuperCoin(parseFloat(selfMsg.win) + parseFloat(selfMsg.calcTicketEarn) + parseFloat(selfMsg.aff_invite)) }} ETH
                                            </template>
                                        </template>
                                        <template v-else>
                                            <lang>No income for now</lang>
                                        </template>
                                    </p>                                    
                                </template>
                                <template v-else>
                                    <p class="buyEnough" @click="useReloadBuy">
                                        <lang>Pay by Income</lang>
                                    </p>
                                </template>
                            </a>
                        </div>
                    </div>
                </div>
            </template>
            <!-- 时间到准备开奖 -->
            <!--on-->
            <div class="pop" :class="{'show': currTimeUp}" style="display: none">
                <p class="timeup" :class="{'on': currTimeUp }">
                    <lang>TIME'S UP!</lang>
                </p>
            </div>
            <!--开奖 -->
            <div class="lottery" :class="{'hide':!nextScreen}">
                <!--总奖池-->
                <div class="dapp-amout">
                    <img src="../../assets/img/superCoin/img-eth.png" alt="eth">
                    <p v-if="roundInfo">
                        {{ formatesuperCoin(roundInfo.jackpot) }}<i>ETH</i>
                    </p>
                </div>
                <!--未开奖-->
                <div class="notDraw" :class="{'hide':!waitWin}">
                    <!-- 等待开奖文案  components  -->
                    <h5>
                        <lang>Drawing </lang>
                    </h5>
                    <ul>
                        <li>
                            <p>
                                {{ bindwaitingMsg }}
                            </p>
                        </li>
                    </ul> 
                </div>
                <!--开奖-有人中 todo -->
                <p class="draw-someone" v-if="someGetWin && roundInfo">
                    {{ _('Congratulations! "{0}" Wins', formateCoinAddr( getWInAddr ) ) }}
                </p>
                <p class="draw-none" v-if="!someGetWin && !waitWin">
                    <lang>No winner of this round.</lang><br>
                    <lang>Prize pool will accumulate in the next round.</lang>
                </p>
                <!--中奖号码-->
                <!-- on -->
                <div class="dapp-number" :class="{'on':openWinNumber}">
                    <ul>
                        <li v-for="(item,index) in openNumArr" :key="index">
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>
            <!--狐狸提示-->
            <div class="pop pop-metamask" :class="{hide:!showPopMask}">
                 <div class="mask-main">
                     <a href="javascript:;" class="pop-close" @click="showPopMask=false"></a>
                     <h5>
                         <lang>Tips</lang>
                     </h5>
                     <p class="p1">
                         <lang>Please install and log in to your MetaMask</lang>
                     </p>
                     <p class="p2">
                        <lang>No Metamask?</lang>                         
                        <a v-if="language==='zhCn'" href="javascript:;" style="text-decoration:underline" @click="scrollInvite">查看</a>
                        <a v-if="language==='zhTw'" href="javascript:;" style="text-decoration:underline" @click="scrollInvite">查看</a>
                        <a v-if="language==='en'" href="javascript:;" style="text-decoration:underline"  @click="scrollInvite" >install now</a>
                     </p>
                 </div>
            </div>
        </div>

        <!--信息展示区--> 
        <div class="information clearfix">
            <!--邀请-->
            <div class="invite" id="inviteView">
                <ul class="title">
                    <li class="on">
                        <a href="javascript:;">
                            <lang>Referrals</lang>
                        </a>
                    </li>
                </ul>
                <p class="explain-msg">
                    <lang>Buy a referral link to invite your friends, you can get 10% of your friends' investment as referral reward.</lang>
                </p>
                <!--邀请后-->
                <div class="invite-after" v-if="selfMsg && selfMsg.inviteLink !== ''">
                    <div class="my-link">
                        <p class="link-msg">
                            <lang>Referral link:</lang>
                        </p>
                        <p class="mydomain">
                            {{ selfMsg.inviteLink }}
                        </p>
                        <a href="javascript:;"
                           v-clipboard:copy="selfMsg.inviteLink"
                           v-clipboard:success="copySucc"
                           v-clipboard:error="copyError"
                           class="btn-copy ">
                            <lang>Copy</lang>
                        </a>
                        <p v-if="selfMsg.aff_invite_nums==1||selfMsg.aff_invite_nums==0">
                            {{ _('You\'ve invited: {0} friend',selfMsg.aff_invite_nums ) }}
                        </p>
                        <p v-else>
                            {{ _('You\'ve invited: {0} friends',selfMsg.aff_invite_nums ) }}
                        </p>
                        <p>
                            <lang>Total referral reward:</lang> <i style="color: #53e864;">{{ selfMsg.aff_invite }} ETH</i>
                        </p>
                    </div>
                </div>
                <!--邀请前-->
                <div class="invite-before" v-else>
                    <div class="input-group">
                        <input v-model="beforeInviteName" type="text" :placeholder="_('name your link')">
                        <a href="javascript:;" @click="getRandomName"></a>
                    </div>
                    <p>
                        <lang>Rules </lang> :<br>
                        1. <lang>The name should be one and only in the system</lang><br>
                        2. <lang>The name contains at most 32 characters</lang><br>
                        3. <lang>Use lowercase (a-z)</lang><br>
                        4. <lang>You can combine with numbers in the name but only using numbers is not allowed</lang><br>
                        5. <lang>Do not use special characters and space in the name</lang>
                    </p>
                    <a href="javascript:;" class="btn-gobuy" @click="registerName">
                        <lang>Pay 0.001 ETH</lang>
                    </a>
                </div>
            </div>
            <!--四个信息-->
            <div class="merge-info">
                <ul class="title">
                    <li :class="{'on':informationTab==='myticket'}" @click="tabEvt('evt', 'myticket')">
                        <a href="javascript:;">
                            <lang>My Tickets</lang>
                        </a>
                    </li>
                    <li :class="{'on':informationTab==='income'}" @click="tabEvt('evt', 'income')">
                        <a href="javascript:;">
                            <lang>My Income</lang>
                        </a>
                    </li>
                    <li :class="{'on':informationTab==='historyDraw'}" @click="tabEvt('evt', 'historyDraw')">
                        <a href="javascript:;">
                            <lang>Draw History </lang>
                        </a>
                    </li>
                    <li :class="{'on':informationTab==='howToPlay'}" @click="tabEvt('evt', 'howToPlay')">
                        <a href="javascript:;">
                            <lang>Instructions </lang>
                        </a>
                    </li>
                </ul>
                <!--我的购买-->
                <div class="ticket " :class="{'hide':informationTab!=='myticket'}">
                    <!-- 当期是否购买 -->
                    <div class="explain-msg">
                        <p>
                            <lang>One ticket corresponds to a number, if your ticket number matches draw number, you win the prize pool.</lang>
                        </p>

                    </div>
                    <template  v-if="selfMsg">
                        <!--已登录-->
                        <div class="ticket-logined hidden-sm hidden-xs"  v-if="ordersList">
                            <ul>
                                <li v-for="(item,index) in ordersList" :key="index"  @click="ticketsNumber=item" :class="{'win':item.prizes!==0}">
                                    <p class="issue">
                                        <lang>Round</lang> {{ item.round }}
                                    </p>
                                    <p class="money" :class="{'hide':item.prizes===0}">
                                        <!--win的时候才展示 删除-->
                                        + {{ formatesuperCoin(item.prizes) }} ETH
                                    </p>
                                    <p class="amount" >
                                        {{ item.buyNum && item.buyNum.length }}
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <!-- order Buy mobile -->
                        <div class="ticket-logined hidden-lg hidden-md"  v-if="ordersListMobile">
                            <ul>
                                <li v-for="(item,index) in ordersListMobile" :key="index"  @click="ticketsNumber=item" :class="{'win':item.prizes!==0}">
                                    <p class="issue">
                                        <lang>Round</lang> {{ item.round }}
                                    </p>
                                    <p class="money" :class="{'hide':item.prizes===0}">
                                        <!--win的时候才展示 删除-->
                                        + {{ formatesuperCoin(item.prizes) }} ETH
                                    </p>
                                    <p class="amount" >
                                        {{ item.buyNum && item.buyNum.length }}
                                    </p>
                                </li>
                            </ul>
                        </div>

                        <!--已登录但是没信息-->
                        <div class="nomsg" v-if="ordersList&&ordersList.length===0">
                            <p>
                                <lang>Why not buy a ticket now? </lang>
                                <a v-if="language==='en'" @click="buyNum"  href="javascript:;" style="color: #ff8a00;">Try Now!</a>
                                <a v-if="language==='zhCn'" @click="buyNum" href="javascript:;" style="color: #ff8a00;">立即购买!</a>
                                <a v-if="language==='zhTw'" @click="buyNum" href="javascript:;" style="color: #ff8a00;">立即購買!</a>
                            </p>                            
                        </div>
                        <!--我的购买详细展开-->
                        <!--on The No.{0} -->
                        <div class="open-ticket show" :class="{'on':ticketsNumber}" v-if="ticketsNumber">
                            <p v-if="ticketsNumber.buyNum && ticketsNumber.buyNum.length>1">{{ _('You bought {0} tickets in round {1}',  ticketsNumber.buyNum.length ,ticketsNumber.round) }}</p>
                            <p v-else>{{ _('You bought {0} ticket in round {1}', ticketsNumber.buyNum.length, ticketsNumber.round) }}</p>
                            <!-- 关闭 -->
                            <a href="javascript:;" @click="ticketsNumber=null" class="close"></a>
                            <div class="ticket-box">
                                <ul>
                                    <li style="color: #ffa200;" v-if="parseFloat(ticketsNumber.luckynum)!==0">
                                        {{ ticketsNumber.luckynum }}
                                    </li>
                                    <li v-if="ticketsNumber.buyNum" v-for="(item,index) in ticketsNumber.buyNum" :key="index">
                                        {{ item }}
                                    </li> 
                                </ul>
                            </div>
                        </div>
                        <!-- 分页msg  -->
                        <div class="pagination hidden-sm hidden-xs" v-if="ordersList&&ordersList.length>=1" :class="{'lg7':orderPageTotal>=7}">
                            <el-pagination
                                    @current-change="orderCurrentChange"
                                    @size-change="orderSizeChange"
                                    background
                                    :current-page.sync="orderPageno"
                                    size="small"
                                    :page-sizes="[10, 25, 50, 100]"
                                    :page-size="orderpPgeSize"
                                    layout="sizes,prev, pager, next"
                                    :page-count="orderPageTotal"
                                    :next-text="_('Next >')"
                                    :prev-text="_('< Previous')"
                            >
                            </el-pagination>
                        </div>
                        <!--分页h5-->
                        <a href="javascript:;" class="pagination-h5 hidden-lg hidden-md" @click="orderMoreMobile" v-if="ordersList&&ordersList.length>=1&&isShowOrderMore">
                            <lang>Click to see more</lang>
                        </a>
                    </template>
                    <!--未登陆 -->
                    <div class="ticket-unlogin" v-if="!selfMsg">
                        <!--未登陆-->
                        <p>
                            <lang>Please log in to the </lang>
                            <a href="javascript:;" style="color: #6a88cc;" @click="loginMetamask">Metamask</a>
                        </p>
                    </div>
                </div>
                <!--我的收益-->
                <div class="income" v-if="selfMsg" :class="{'hide':informationTab!=='income'}">
                    <p class="explain-msg">
                        <lang>Your dividend, referral reward and winning prize can be withdrawn at any time.</lang>
                    </p>
                    <div class="income-item">
                        <p>
                            <lang>Dividend:</lang>
                        </p>
                        <span>
                            {{ formatesuperCoin(selfMsg.calcTicketEarn) }} ETH
                        </span>
                    </div>
                    <div class="income-item">
                        <p>
                            <lang>Referral Reward:</lang>
                        </p>
                        <span>
                            {{ formatesuperCoin(selfMsg.aff_invite) }} ETH
                        </span>
                    </div>
                    <div class="income-item">
                        <p>
                            <lang>Winning Prize:</lang>
                        </p>
                        <span>
                            {{ formatesuperCoin(selfMsg.win) }} ETH
                        </span>
                    </div>
                    <div class="income-item income-item-last">
                        <p>
                            <lang>Total Income:</lang>
                        </p>
                        <div>
                            <span>
                                {{ formatesuperCoin(parseFloat(selfMsg.win) + parseFloat(selfMsg.calcTicketEarn) + parseFloat(selfMsg.aff_invite)) }} ETH
                            </span>
                            <span class="usd">
                                ≈ {{ formatesuperCoin((parseFloat(selfMsg.win) + parseFloat(selfMsg.calcTicketEarn) + parseFloat(selfMsg.aff_invite)) * usdPrice) }} USD
                            </span>
                        </div>
                    </div>
                    <a href="javascript:;" class="btn-withdrawal" @click="withdraw">
                        <lang>Withdraw </lang>
                    </a>
                </div>
                <!--历史开奖 hide -->
                <div class="historyDraw" :class="{'hide':informationTab!=='historyDraw'}">
                    <div class="explain-msg is-left">
                        <p>
                            <lang>One draw per 2 hours. If your ticket number matches draw number, you win the prize pool. If there's no winner of the round, the prize pool will accumulate in next round.</lang>
                        </p>
                    </div>
                    <template v-if="(expectsList && expectsList.length > 0)||(expectsListMobile && expectsListMobile.length > 0)">
                        <ul class="historyDraw-head">
                            <li class="issue"><lang>Round</lang></li>
                            <li class="winningNumbers"><lang>Draw Number </lang></li>
                            <li class="bonus"><lang>Prize Pool</lang></li>
                            <li class="winner"><lang>Winner</lang></li>
                        </ul>
                        <ul class="historyDraw-main hidden-xs hidden-sm">
                            <li v-for="(item,index) in expectsList" :key="index" :class="{'win':item.winner !==''}">
                                <p class="issue">
                                    #{{ item.round }}
                                </p>
                                <p class="winningNumbers">
                                    {{ item.luckynum }}
                                </p>
                                <p class="bonus">
                                    {{ formatesuperCoin(item.prizes) }} {{ formateCoinType(item.cointype) }}
                                </p>
                                <p class="winner" v-if="item.winner ===''">
                                    -
                                </p>
                                <p class="winner" v-else>
                                    <a target="_blank" :href="`https://etherscan.io/address/${item.winner}`" >
                                        {{ item.winner }}
                                    </a>
                                </p>
                            </li>
                        </ul>
                        <!-- mobile -->
                        <ul class="historyDraw-main hidden-lg hidden-md">
                            <li v-for="(item,index) in expectsListMobile" :key="index" :class="{'win':item.winner !==''}">
                                <p class="issue">
                                    #{{ item.round }}
                                </p>
                                <p class="winningNumbers">
                                    {{ item.luckynum }}
                                </p>
                                <p class="bonus">
                                    {{ formatesuperCoin(item.prizes) }} {{ formateCoinType(item.cointype) }}
                                </p>
                                <p class="winner" v-if="item.winner ===''">
                                    -
                                </p>
                                <p class="winner" v-else>
                                    <a target="_blank" :href="`https://etherscan.io/address/${item.winner}`" >
                                        {{ item.winner }}
                                    </a>
                                </p>
                            </li>
                        </ul>
                        <!-- 分页msg  -->
                        <div class="pagination hidden-xs hidden-sm" v-if="expectsList&&expectsList.length>=1" :class="{'lg7':expectPageTotal>=7}">
                            <el-pagination
                                @current-change="expectCurrentChange"
                                @size-change="expectSizeChange"
                                background
                                :current-page.sync="expectPageno"
                                size="small"
                                :page-sizes="[10, 25, 50, 100]"
                                :page-size="expectPageSize"
                                layout="sizes,prev, pager, next"
                                :page-count="expectPageTotal"
                                :next-text="_('Next >')"
                                :prev-text="_('< Previous')"
                            >
                            </el-pagination>
                        </div>
                        <!--分页h5-->
                        <a href="javascript:;" @click="expectMoreMobile" class="pagination-h5 hidden-lg hidden-md" v-if="expectsListMobile&&expectsListMobile.length>=1&&isShowExpectMoreBtn">
                            <lang>Click to see more</lang>
                        </a>
                    </template>
                    <div class="nomsg" v-else>
                        <p>
                            <lang>No data</lang>
                        </p>
                    </div>

                </div>
                <!--游戏教程-->
                <div class="instructions" :class="{'hide':informationTab!=='howToPlay'}">
                    <div class="explain-msg">
                        <p>
                            <lang>Brief Introduction:</lang>
                        </p>
                        <p>
                            <lang>SuperCoin is a crowdfunding game based on blockchain technology. 0.005 ETH bet can win 10 ETH or more!</lang>
                            <span v-if="language==='en'">Check the <a href="https://etherscan.io/address/0x2119a3314c1d40704d816392a9e44da463688992#code" target="_blank">smart contract</a> now.</span>
                            <span v-if="language==='zhCn'">欢迎查看<a href="https://etherscan.io/address/0x2119a3314c1d40704d816392a9e44da463688992#code" target="_blank">智能合约。</a></span>
                            <span v-if="language==='zhTw'">歡迎查看<a href="https://etherscan.io/address/0x2119a3314c1d40704d816392a9e44da463688992#code" target="_blank">智能合約。</a></span>
                        </p>
                        <br>
                        <p>
                            <lang>Gameplay</lang>(
                                <a href="javascript:;" @click="showNewguide" v-if="language==='en'">Easy Play</a>
                                <a href="javascript:;" @click="showNewguide" v-if="language==='zhCn'">查看新手引导</a>
                                <a href="javascript:;" @click="showNewguide" v-if="language==='zhTw'">新手引導</a>
                                ) :
                        </p>
                        <p>
                            <lang>1. At the beginning of the game, there will be a 10 ETH-prize pool and 1500 random numbers. And each ticket corresponds to a random number. After all tickets are sold out or time's up, the draw will proceed. If your ticket number matches draw number, you win the reward from prize pool (at least 10 ETH).</lang>
                        </p>
                        <p>
                            <lang>2. Share the dividend. Buyers who hold part/all of first 500 tickets of a round enjoy the dividend. More tickets bring more dividend.</lang>
                        </p>
                        <p>
                            <lang>3. If there's no winner of the round, the prize pool will accumulate in next round, and the ticket price will be adjusted as well.</lang>
                        </p>
                        <br>
                        <p>
                            <lang>Kind Reminder: </lang>
                        </p>
                        <p>
                            <lang>Playing on PC: MetaMask is recommended to install (download from</lang> 
                            <a href="https://metamask.io/" target="_blank" style="color: #ff8a00;">https://metamask.io/</a>
                            ).
                        </p>
                        <p>
                            <lang>Playing on mobile: Trust, Cipher, Jaxx and other mobile wallets are recommended to use.</lang>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!--返回顶部-->
        <ScrollTop></ScrollTop>
        <!--新手引导-->
        <div class="pop pop-new" :class="{hide:!isNew}">
            <div class="new-main">
                <div class="step bounceIn animated step1" :class="[isShowStep1 ? '' : 'hide']">
                    <p>
                        <lang>1.The current amount of prize pool.</lang>
                    </p>
                    <p>
                        <lang>Always ready for the winner!</lang>
                    </p>
                    <a href="javascript:;" class="btn-next" @click="isShowStep1 = false, isShowStep2 = true"><lang>Okay</lang></a>
                    <img src="../../assets/img/luckyCoin/line.png" alt="">
                </div>
                <div class="step bounceIn animated step2 " :class="[isShowStep2 ? '' : 'hide']">
                    <p>
                        <lang>2. Draw proceeds when time's up.</lang>
                    </p>
                    <a href="javascript:;" class="btn-next" @click="isShowStep2 = false, isShowStep3 = true"><lang>Okay</lang></a>
                    <img src="../../assets/img/luckyCoin/line.png" alt="">
                </div>
                <div class="step bounceIn animated step3 " :class="[isShowStep3 ? '' : 'hide']">
                    <p>
                        <lang>3. Here shows how many tickets have been sold.</lang>
                    </p>
                    <p>
                        <lang>Buy more tickets, enjoy higher winning chance.</lang>
                    </p>
                    <a href="javascript:;" class="btn-next" @click="isShowStep4 = true, isShowStep3 = false"><lang>Okay</lang></a>
                    <img src="../../assets/img/luckyCoin/line.png" alt="">
                </div>
                <div class="step bounceIn animated step4" :class="[isShowStep4 ? '' : 'hide']">
                    <p>
                        <lang>Click here to try your luck!</lang>
                    </p>
                    <a href="javascript:;" class="btn-next" @click="initEasyPlay"><lang>Okay</lang></a>
                    <img src="../../assets/img/luckyCoin/line.png" alt="">
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import {mTypes, aTypes} from '~/store/cs_page/dappCoin'
import {
    copySucc,
    copyError,
    formateCoinType,
    formatTime,
    formateCoinAddr,
    coinAffAddr
} from '~common/util'
import Vue from 'vue'
import BannerScroll from '~components/BannerScroll.vue'
import Footer from '~components/Footer.vue'
import vueClipboard from 'vue-clipboard2'
import {web3, luckyCoinApi, contractNet} from '~/dappApi/luckycoinApi'
import {Message, Notification} from 'element-ui'
import ScrollTop from '~/components/ScrollTop'

Vue.use(vueClipboard)

export default {
    data () {
        return {
            getWInAddr: '0x0000000000000000',
            pageSucc: false,
            usdPrice: 0,
            bindwaitingMsg: _('Who will be the winner?'),
            waitingMsgArr: [
                _('Who will be the winner?'),
                _('Data processing'),
                _('Data uploading')
            ], // 等待开奖文案 todo
            nextRoundStart: null, // 下一期开启的时间
            openWinNumber: false, // 出现开奖号码
            someGetWin: false, // 是否有人中奖
            openNumArr: ['?', '?', '?', '?'],
            scrollMsg: [
                _('Buyers who hold part/all of first 500 tickets enjoy the dividend.'),
                _('Buy more tickets, get more dividend, and enjoy higher winning chance.'),
                _('Click to learn easy play for starters.')
            ],
            ticketsNumber: null, // 当前购买的ticket
            informationTab: 'myticket', // 控制tab
            waitWin: false, // 待开奖
            nextScreen: false, // 切换屏幕
            currTimeUp: false,
            balance: null, // 账户余额
            beforeInviteName: null, // 准备邀请的名字  注册的名字
            showFirstBaxi: false, // 首次提示
            selfAddr: null, // 当前addr
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
            expectsList: null, // 期号历史数据
            expectsListMobile: [], // 手机端展示
            expectsMobileIndex: 1,
            isShowExpectMoreBtn: true,

            ordersList: null, // 个人订单数据
            ordersListMobile: [],
            isShowOrderMore: true,
            ordersMobileIndex: 1,

            expectPageno: 1,
            expectPageSize: 25,
            expectPageTotal: 1,

            orderPageno: 1,
            orderpPgeSize: 25,
            orderPageTotal: 1,

            showPopMask: false,
            /* 新手引导 */
            isNew: false,
            isShowNew: false,
            isShowStep1: true,
            isShowStep2: false,
            isShowStep3: false,
            isShowStep4: false
        }
    },

    methods: {
        copySucc,
        copyError,
        formateCoinType,
        formatTime,
        formateCoinAddr,
        initEasyPlay () {
            this.isNew = false
            this.isShowStep1 = true
            this.isShowStep2 = false
            this.isShowStep3 = false
            this.isShowStep4 = false
        },
        async useReloadBuy () {
            // 使用收益购买
            let buyBack = null
            if (!this.selfMsg) {
                this.loginMetamask()
                return false
            }
            if (this.currTicketPrice === 0) {
                console.error('this.currTicketPrice 0')
                return false
            }
            if (typeof this.tickNum === 'string') {
                this.tickNum = Number(this.tickNum)
            }
            this.isFromFlag.indexOf('0x') > -1 && this.isFromFlag.length === 42 ? buyBack = await luckyCoinApi.reLoadXaddr(this.tickNum, this.isFromFlag) : buyBack = await luckyCoinApi.reLoadXname(this.tickNum, this.isFromFlag)
            buyBack ? this.selfNotify('Order Successful') : this.selfNotify('Purchase Cancelled', 'error')
        },
        showNewguide () {
            if (this.timeLeft < 7200) {
                // 滚到 local
                this.informationTab = 'howToPlay'
                document.getElementById('inviteView').scrollIntoView()
            } else {
                this.isNew = true
            }
        },
        buildZero (numArr) {
            if (Array.isArray(numArr)) {
                numArr.forEach((val, index) => {
                    val = val.toString()
                    let currLen = 4 - val.length
                    if (val.length < 4) {
                        for (let i = 0;i < currLen ;i++) {
                            val = '0' + val
                        }
                    }
                    numArr[index] = val
                })
                return numArr
            }
            return false
        },
        async searchTicketsXaddr () {
            let buyNum = []
            if (this.selfAddr) {
                let buyTick = await luckyCoinApi.searchTicketsXaddr(this.selfAddr)
                if (buyTick.orders0 !== '0') {
                    buyNum = buyNum.concat(this.analysisBuyNum(buyTick.orders0))
                }
                for (let i = 1;i <= 5;i++) {
                    if (buyTick['orders' + i] !== '0') {
                        this.analysisBuyNum(buyTick['orders' + i]).forEach((item, index) => {
                            buyNum.push(Number(item) + 250 * i)
                        })
                    }
                }
                buyNum = this.buildZero(buyNum)
                if (this.ordersList && buyNum.length > 0) {
                    let baseObj = {
                        buyNum: buyNum,
                        prizes: 0,
                        round: this.roundInfo.roundIndex
                    }

                    if (this.ordersList[0] && this.ordersList[0].round === this.roundInfo.roundIndex) {
                        if (this.ordersList[0].luckynum === 0) {
                            this.ordersList.shift()
                            this.ordersList.unshift(baseObj)
                        }
                    } else {
                        this.ordersList.unshift(baseObj)
                    }
                }
            }
        },
        forNextRoundStart (time) {
            // 格式化下一期的文案
            return this.formatTime(time, 'HH:mm')
        },
        formatesuperCoin (val) {
            // 金额格式化
            let newEth = null
            if (isNaN(val) || isNaN(Number(val))) {
                console.error('formatesuperCoin error' + val)
                return 0
            }
            val = Number(val)
            if (val > 1000) {
                newEth = parseFloat((val).toFixed(0))
            } else if (val > 100) {
                newEth = (val).toFixed(3)
            } else {
                newEth = (val).toFixed(4)
            }
            return newEth
        },
        scrollInvite () {
            this.informationTab = 'howToPlay'
            this.showPopMask = false
            document.getElementById('inviteView').scrollIntoView()
        },
        scrollMsgChange (state) {
            if (state === 'end') {
                this.scrollMsg = [_('Buy the first ticket to start a new round.'), _('Buyers who hold part/all of first 500 tickets enjoy the dividend.')]
            } else {
                this.scrollMsg = [
                    _('Buyers who hold part/all of first 500 tickets enjoy the dividend.'),
                    _('Buy more tickets, get more dividend, and enjoy higher winning chance.'),
                    _('Click to learn easy play for starters.'),
                    _('Draw will proceed after tickets sold out or time\'s up.')
                ]
            }
        },
        tabEvt (evt, dataName) {
            if (this.selfMsg) {
                this.informationTab = dataName
            } else {
                if (dataName === 'howToPlay' || dataName === 'myticket' || dataName === 'historyDraw') {
                    this.informationTab = dataName
                } else {
                    this.loginMetamask()
                }
            }
        },
        loginMetamask () {
            this.showPopMask = true
        },
        expectMoreMobile () {
            //  mobile
            this.expectCurrentChange(this.expectsMobileIndex, true)
        },
        async expectCurrentChange (pageno = this.expectPageno, isPush = false) {
            let params = {
                pageno
            }
            let data = await this.getSuperCoinExpects(params)
            data = data.data
            if (data) {
                this.expectsList = this.expectFormatData(data.expects)
                if (pageno === 1) {
                    this.expectsListMobile = this.expectsList
                    this.expectsMobileIndex = 2
                } else {
                    if (this.expectsList.length > 0 && isPush) {
                        this.expectsListMobile = this.expectsListMobile.concat(this.expectsList)
                        this.expectsMobileIndex++
                    }
                }
                if (data.expects[0] && data.expects[0].round === this.roundInfo.roundIndex) {
                    this.getWInAddr = data.expects[0].winner
                } else {
                    this.getWInAddr = 'someBody'
                }
                if (data.expects.length === 0 || data.expects.length !== 25) {
                    this.isShowExpectMoreBtn = false
                }

                this.expectPageTotal = parseInt(data.pagetotal, 10)
            }
        },
        expectSizeChange (size) {
            this.expectPageSize = size
            this.expectCurrentChange()
        },
        expectFormatData (list) {
            // 历史期号数据处理
            if (list) {
                list.forEach((item, index) => {
                    item.luckynum = item.luckynum.toString()
                    if (item.luckynum.length < 4) {
                        let currLen = 4 - item.luckynum.length
                        for (let i = 0;i < currLen ;i++) {
                            item.luckynum = '0' + item.luckynum
                        }
                    }
                })
            }
            return list
        },
        orderMoreMobile () {
            //  mobile
            this.expectCurrentChange(this.ordersMobileIndex, true)
        },
        async orderCurrentChange (pageno = this.orderPageno, isPush = false) {
            let params = {
                pageno,
                address: this.selfAddr
            }
            let data = await this.getSuperCoinOrder(params)
            data = data.data
            if (data) {
                this.ordersList = this.orderFormatData(data.luckydata)
                if (pageno === 1) {
                    this.ordersListMobile = this.ordersList
                    this.ordersMobileIndex = 2
                } else {
                    if (this.ordersList.length > 0 && isPush) {
                        this.ordersListMobile = this.ordersListMobile.concat(this.ordersList)
                        this.ordersMobileIndex++
                    }
                }

                if (data.luckydata.length === 0 || data.luckydata.length !== 25) {
                    this.isShowOrderMore = false
                }

                this.usdPrice = data.USD
                this.orderPageTotal = parseInt(data.pagetotal, 10)
                this.searchTicketsXaddr()
            }
        },
        orderSizeChange (size) {
            this.orderpPgeSize = size
            this.orderCurrentChange()
        },
        orderFormatData (list) {
            // 订单数据处理
            let currBeginArr = null
            let currEndArr = null
            let buyNum = []
            let flag = null

            if (list) {
                list.forEach((item, index) => {
                    if (item.end) {
                        buyNum = []
                        flag = null
                        currBeginArr = item.begin.split(',')
                        currEndArr = item.end.split(',')
                        currEndArr.forEach((endItem, index) => {
                            flag = Number(endItem) - currBeginArr[index]
                            if (flag >= 0) {
                                for (let i = 0;i <= flag;i++) {
                                    buyNum.push(parseInt(currBeginArr[index]) + i)
                                }
                            }
                        })
                        buyNum = buyNum.sort(function compare (val1, val2) {
                            if (val1 < val2) {
                                return -1
                            } else if (val1 > val2) {
                                return 1
                            } else {
                                return 0
                            }
                        })
                        item.buyNum = this.buildZero(buyNum)
                    }
                    item.luckynum = item.luckynum.toString()
                    if (item.luckynum.length < 4) {
                        let currLen = 4 - item.luckynum.length
                        for (let i = 0;i < currLen ;i++) {
                            item.luckynum = '0' + item.luckynum
                        }
                    }
                })
            }
            return list
        },
        checkTicket () {
            if (isNaN(Number(this.tickNum))) {
                Message({
                    message: _('Please enter the correct number '),
                    type: 'error'
                })
                this.tickNum = 0
                return false
            }
            if (this.balance && Number(this.balance) > 0) {
                let earnNum = null
                if (this.selfMsg) {
                    earnNum = parseFloat(this.selfMsg.win) + parseFloat(this.selfMsg.calcTicketEarn) + parseFloat(this.selfMsg.aff_invite)
                }
                if (earnNum && Number(this.balance) < earnNum) {
                    this.maxTicketNum = Math.floor(earnNum / Number(this.currTicketPrice)) > (1500 - this.roundInfo.tickets) ? (1500 - this.roundInfo.tickets) : Math.floor(earnNum / Number(this.currTicketPrice))
                } else {
                    this.maxTicketNum = Math.floor(Number(this.balance) / Number(this.currTicketPrice)) > (1500 - this.roundInfo.tickets) ? (1500 - this.roundInfo.tickets) : Math.floor(Number(this.balance) / Number(this.currTicketPrice))
                }
            } else {
                this.maxTicketNum = 1500 - this.roundInfo.tickets
            }
            this.tickNum = this.tickNum > this.maxTicketNum ? this.maxTicketNum : this.tickNum
        },
        chooseMin () {
            this.tickNum = 1
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
            await this.getCurrentRoundInfo()
            this.timeLeft = await luckyCoinApi.getTimeLeft()
            await this.getPlayerInfoByAddress()
            this.currTicketPrice = await luckyCoinApi.getBuyPrice()
            if (this.balance && Number(this.balance) > 0) {
                let earnNum = null
                if (this.selfMsg) {
                    earnNum = parseFloat(this.selfMsg.win) + parseFloat(this.selfMsg.calcTicketEarn) + parseFloat(this.selfMsg.aff_invite)
                }
                if (earnNum && Number(this.balance) < earnNum) {
                    this.maxTicketNum = Math.floor(earnNum / Number(this.currTicketPrice)) > (1500 - this.roundInfo.tickets) ? (1500 - this.roundInfo.tickets) : Math.floor(earnNum / Number(this.currTicketPrice))
                } else {
                    this.maxTicketNum = Math.floor(Number(this.balance) / Number(this.currTicketPrice)) > (1500 - this.roundInfo.tickets) ? (1500 - this.roundInfo.tickets) : Math.floor(Number(this.balance) / Number(this.currTicketPrice))
                }
            } else {
                this.maxTicketNum = 1500 - this.roundInfo.tickets
            }
            if (this.timeLeft === 0) {
                if (this.roundInfo.luckNum === 0) {
                    this.waitWin = true
                    this.someGetWin = false
                } else {
                    // 中奖页面
                    this.someGetWin = true
                    this.waitWin = false
                    this.showOpenNumber(this.roundInfo.luckNum)
                }
                this.nextScreen = true
                this.nowFormateTime = '00:00:00'
                this.scrollMsgChange('end') // 滚动信息改变
            } else {
                this.startTimeLeft()
                if (this.timeLeft > 15) {
                    if (!localStorage.getItem('firstSuperCoin')) {
                        this.isNew = true
                        localStorage.setItem('firstSuperCoin', true)
                    } else {
                        this.isNew = false
                    }
                }
            }
            this.pageSucc = true
            console.log('roundinfo')
            console.log(this.roundInfo)
            this.nextRoundStart = parseInt(localStorage.getItem('openNextTime')) > new Date().getTime() ? parseInt(localStorage.getItem('openNextTime')) : (new Date().getTime()) / 1000
            window.setInterval(async () => {
                this.timeLeft = await luckyCoinApi.getTimeLeft()
                console.log(this.timeLeft)
                console.log('======timeleft=====')
                if (this.timeLeft !== 0) {
                    this.startTimeLeft()
                }
            }, 30000)

            //  用户投注订单记录  是否登录
            if (this.selfMsg) {
                this.orderCurrentChange()
            }
            //  请求历史数据
            this.expectCurrentChange()
            // 开始待开奖的动画
            setInterval(() => {
                this.bindwaitingMsg = this.waitingMsgArr[ parseInt(Math.random() * 2) ]
            }, 5000)
        },
        getSuperCoinExpects (params) {
            return this.$store.dispatch(aTypes.superCoinExpects, {
                pagesize: this.expectPageSize,
                ...params
            })
        },
        getSuperCoinOrder (params) {
            return this.$store.dispatch(aTypes.superCoinOrder, {
                pagesize: this.orderpPgeSize,
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
                        this.currTimeUp = true
                        setTimeout(() => {
                            this.currTimeUp = false
                            // 显示待开奖状态
                            this.nextScreen = true
                            // this.waitWin = true
                            // 更改 提示文案
                            if (this.roundInfo.luckNum === 0 || !this.roundInfo) {
                                this.waitWin = true
                                this.someGetWin = false
                            } else {
                                // 中奖页面
                                this.someGetWin = true
                                this.waitWin = false
                                this.showOpenNumber(this.roundInfo.luckNum)

                                localStorage.setItem('openNextTime', (new Date().getTime() + 300000) / 1000)
                                this.nextRoundStart = localStorage.getItem('openNextTime')
                            }
                            this.scrollMsgChange('end')
                        }, 6000)
                        clearInterval(this.nowTimeInterval)
                    }
                    this.nowFormateTime = this.calcTime(this.timeLeft)
                    this.timeLeft--
                }
            }, 1000)
        },
        async getPlayerInfoByAddress () {
            if (this.selfAddr) {
                let allMsg = await luckyCoinApi.getPlayerInfoByAddress(this.selfAddr)
                this.selfMsg = allMsg[0]
                console.log(this.selfMsg)
                console.log('=========selfMsg======')
                this.balance = allMsg[1]
                this.selfMsg.inviteLink = this.selfMsg.name === '' ? '' : `${window.location.origin}/supercoin/${this.selfMsg.name}`
            } else {
                console.warn('没有取得地址msg')
            }
        },
        async getCurrentRoundInfo () {
            // 获取页面相关信息
            this.roundInfo = await luckyCoinApi.getCurrentRoundInfo()
            this.calVotingLen = `transform: scaleX(${this.roundInfo.tickets / 1500})`

            let earnNum = null
            if (this.selfMsg) {
                earnNum = parseFloat(this.selfMsg.win) + parseFloat(this.selfMsg.calcTicketEarn) + parseFloat(this.selfMsg.aff_invite)
            }
            if (this.balance && Number(this.balance) > 0) {
                if (earnNum && Number(this.balance) < earnNum) {
                    this.maxTicketNum = Math.floor(earnNum / Number(this.currTicketPrice)) > (1500 - this.roundInfo.tickets) ? (1500 - this.roundInfo.tickets) : Math.floor(earnNum / Number(this.currTicketPrice))
                } else {
                    this.maxTicketNum = Math.floor(Number(this.balance) / Number(this.currTicketPrice)) > (1500 - this.roundInfo.tickets) ? (1500 - this.roundInfo.tickets) : Math.floor(Number(this.balance) / Number(this.currTicketPrice))
                }
            } else {
                this.maxTicketNum = 1500 - this.roundInfo.tickets
            }
        },
        async buyNum () {
            // 购买号码
            let buyBack = null
            let currPrice = await luckyCoinApi.getBuyPrice()
            if (!this.selfMsg) {
                this.loginMetamask()
                return false
            }
            if (this.currTicketPrice === 0) {
                console.error('this.currTicketPrice 0')
                return false
            }
            if (typeof this.tickNum === 'string') {
                this.tickNum = Number(this.tickNum)
            }
            if (this.isFromFlag.indexOf('0x') > -1 && this.isFromFlag.length === 42) {
                buyBack = await luckyCoinApi.buyXaddr(this.tickNum, this.isFromFlag, this.currTicketPrice * this.tickNum)
            } else {
                buyBack = await luckyCoinApi.buyXname(this.tickNum, this.isFromFlag, this.currTicketPrice * this.tickNum)
            }
            buyBack ? this.selfNotify('Order Successful') : this.selfNotify('Purchase Cancelled', 'error')
        },
        selfNotify (val, typeVal = 'success') {
            Notification({
                dangerouslyUseHTMLString: true,
                type: typeVal,
                message: _(val),
                position: 'bottom-right',
                duration: 5000
            })
        },
        async registerName () {
            let buyNameBack = null
            if (!this.selfMsg) {
                this.loginMetamask()
                return false
            }
            // 判断是否符合规则
            if (!this.beforeInviteName || !(this.isVerifyName(this.beforeInviteName))) {
                Message({
                    message: _('Please enter the correct referral link'),
                    type: 'error'
                })
                return false
            }
            // 判断是否已经被购买
            this.beforeInviteName = this.beforeInviteName.toString()
            let checkName = await luckyCoinApi.testName(this.beforeInviteName)
            if (checkName) {
                if (this.isFromFlag.indexOf('0x') > -1 && this.isFromFlag.length === 42) {
                    buyNameBack = await luckyCoinApi.registerNameXaddr(this.beforeInviteName, this.isFromFlag)
                } else {
                    buyNameBack = await luckyCoinApi.registerNameXname(this.beforeInviteName, this.isFromFlag)
                }
                buyNameBack ? this.selfNotify('Order Successful') : this.selfNotify('Purchase Cancelled', 'error')
            } else {
                Message({
                    message: '名字已被注册',
                    type: 'error'
                })
            }
        },
        async withdraw () {
            let withdrawBack = await luckyCoinApi.withdraw()
            withdrawBack ? this.selfNotify('Order Successful') : this.selfNotify('Withdrawal Cancelled', 'error')
        },
        checkTicketPoint () {
            this.tickNum = Math.ceil(this.tickNum) <= 1 ? 1 : Math.ceil(this.tickNum)
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
        },
        async upAllMsg () {
            // 每次事件 更新所有相关数据
            this.getCurrentRoundInfo()
            await this.getPlayerInfoByAddress()
            this.timeLeft = await luckyCoinApi.getTimeLeft()
            this.currTicketPrice = await luckyCoinApi.getBuyPrice()

            //  用户投注订单记录  是否登录
            if (this.selfMsg) {
                this.orderCurrentChange()
            }
            //  请求历史数据
            this.expectCurrentChange()
        },
        startAllevent () {
            // 合约事件
            contractNet.allEvents(async (err, res) => {
                if (!err) {
                    if (res) {
                        var name = ''
                        if (res.args.playerName) {
                            name = web3.toUtf8(res.args.playerName)
                        }
                        console.log(res)
                        console.log('=====res==')
                        if (res.event === 'onNewName') {
                            if (name === '') {
                                Notification({
                                    dangerouslyUseHTMLString: true,
                                    message: _('Welcome {0} joins the game', this.formateCoinAddr(res.args.playerAddress.toString())),
                                    position: 'bottom-right',
                                    duration: 5000
                                })
                            } else {
                                Notification({
                                    dangerouslyUseHTMLString: true,
                                    message: _('Welcome {0} joins the game', name),
                                    position: 'bottom-right',
                                    duration: 5000
                                })
                            }
                        } else if (res.event === 'onBuy') {
                            let nowTicketNum = res.args.end.toNumber() - res.args.begin.toNumber()
                            if (name !== '') {
                                if ((nowTicketNum) > 0) {
                                    setTimeout(() => {
                                        Notification({
                                            dangerouslyUseHTMLString: true,
                                            message: _('{0} has bought {1} tickets', name, nowTicketNum + 1),
                                            position: 'bottom-right',
                                            duration: 5000
                                        }, 0)
                                    })
                                } else {
                                    setTimeout(() => {
                                        Notification({
                                            dangerouslyUseHTMLString: true,
                                            message: _('{0} has bought {1} ticket', name, 1),
                                            position: 'bottom-right',
                                            duration: 5000
                                        })
                                    }, 0)
                                }
                            } else if (name === '') {
                                if ((nowTicketNum) > 0) {
                                    setTimeout(() => {
                                        Notification({
                                            dangerouslyUseHTMLString: true,
                                            message: _('{0} has bought {1} tickets', this.formateCoinAddr(res.args.playerAddress.toString()), nowTicketNum + 1),
                                            position: 'bottom-right',
                                            duration: 5000
                                        })
                                    }, 0)
                                } else {
                                    setTimeout(() => {
                                        Notification({
                                            dangerouslyUseHTMLString: true,
                                            message: _('{0} has bought {1} ticket', this.formateCoinAddr(res.args.playerAddress.toString()), 1),
                                            position: 'bottom-right',
                                            duration: 5000
                                        })
                                    }, 0)
                                }
                            }
                        } else if (res.event === 'onWithdraw') {
                            // 提现
                            let withdrawNum = formatesuperCoin(web3.fromWei(res.args.ethOut.toNumber()))
                            if (name === '') {
                                Notification({
                                    dangerouslyUseHTMLString: true,
                                    message: _('{0} has withdrawn {1} ETH', this.formateCoinAddr(res.args.playerAddress.toString()), withdrawNum),
                                    position: 'bottom-right',
                                    duration: 5000
                                })
                            } else {
                                Notification({
                                    dangerouslyUseHTMLString: true,
                                    message: _('{0} has withdrawn {1} ETH', name, withdrawNum),
                                    position: 'bottom-right',
                                    duration: 5000
                                })
                            }
                        } else if (res.event === 'onSettle') {
                            if (res.args) {
                                this.waitWin = false
                                if (res.args.luckynum.toNumber() <= res.args.ticketsout.toNumber()) {
                                    // 有人中奖
                                    this.someGetWin = true
                                    localStorage.setItem('openNextTime', (new Date().getTime() + 300000) / 1000)
                                    this.nextRoundStart = localStorage.getItem('openNextTime')
                                } else {
                                    // 无人中奖
                                    this.someGetWin = false
                                    setTimeout(() => {
                                        this.nextScreen = false // 回到投注
                                        this.openWinNumber = false
                                        this.openNumArr = ['?', '?', '?', '?']
                                    }, 10000)
                                }
                                this.showOpenNumber(res.args.luckynum.toNumber())
                            }
                        } else if (res.event === 'onActivate') {
                            // 有人中开奖  去除on
                            this.openWinNumber = false
                            // 切换 重新开始
                            this.nextScreen = false // 回到投注
                            this.waitWin = false
                            this.someGetWin = false
                            this.openNumArr = ['?', '?', '?', '?']
                            localStorage.setItem('openNextTime', 0)
                        }
                        // 每次事件触发 更新数据
                        this.upAllMsg()
                    }
                } else {
                    console.error('allEvents' + err)
                }
            })
        },
        showOpenNumber (num = 10) {
            // 补齐开奖号码 0
            this.openWinNumber = true
            num = num.toString()
            let splitNum = []
            splitNum = num.split('')
            for (let i = 0, len = 4 - splitNum.length;i < len;i++) {
                splitNum.unshift('0')
            }
            this.openNumArr = splitNum
        },
        calcTime (time) {
            // 根据time计算小时 分钟 秒数
            let tf = function (i) {
                return (i < 10 ? '0' : '') + i
            }
            let hour = Math.floor(time / 3600)
            let min = Math.floor((time - (hour * 3600)) / 60)
            let second = (time - (hour * 3600)) % 60
            return tf(hour) + ':' + tf(min) + ':' + tf(second)
        }
    },
    computed: {
        language () {
            return this.$store.state.language
        }
    },
    components: {
        BannerScroll, Footer, ScrollTop
    },
    async mounted () {
        if (this.$route.params && this.$route.params.inviteName) {
            this.isFromFlag = this.$route.params.inviteName
        } else {
            this.isFromFlag = coinAffAddr
        }
        this.pageInit()
        this.startAllevent()
    },
    watch: {
        isLog (val) {
            /* 切换登陆态之后改变状态 */
            this.changePageState()
        }
    },
    filters: {
    }
}
</script>
<style lang="less" type="text/less">
    .buyEnough{
        color: #fff !important; 
    }
    .luckyDapp{
        a:hover{
            filter: brightness(1.2);
        }
        .el-pager, .el-pagination__jump{
            color: #6a88cc;
        }
        .pagination {
            display: table;
            padding: 0;
            margin: 20px auto 30px;
            height: 28px;
            line-height: 28px;
            overflow: hidden;
            font-size: 14px;
            color: #6a88cc;
            text-align: center;
            li {
                display: inline-block;
                margin-left: 5px;
                height: 26px;
                line-height: 26px;
                box-sizing: content-box;
                outline: none;
                border: 1px solid #6a88cc;
                color: #6a88cc !important;
                a {
                    display: block;
                    padding: 0 12px;
                    color: #6a88cc;
                }
            }
            li.active {
                border: none;
                background: none;
                color: #ffffff !important;
                a {
                    cursor: default;
                }
                &:hover {
                    color: #ffffff !important;
                    border: none;
                    background: transparent;
                    box-shadow: none;
                }
            }
            li:hover {
                color: #fff !important;
                border: 1px solid #6a88cc;
                background: #6a88cc;
                box-shadow: none;
            }
            .prev {
                position: relative;
                padding-left: 8px;
                &::before {
                    content: "";
                    display: block;
                    position: absolute;
                    left: 10px;
                    top: 10px;
                    background: url("../../assets/slice/arrow-left-778ca3.png");
                }
            }
            .next {
                position: relative;
                padding-right: 8px;
                &::before {
                    content: "";
                    display: block;
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: url("../../assets/slice/arrow-right-778ca3.png");
                }
            }
            &.lg7{
                .el-select--mini,.btn-prev,.btn-next{
                    display: none;
                }
            }
        }
        .el-pagination {
            button{
                border: 1px solid #6a88cc;
                color: #6a88cc;
                &:hover{
                    background: #6a88cc;
                    color: #fff;
                }
            }
        }
        .el-input__inner,.el-select-dropdown__list{
            border-color: #6a88cc;
            background: #211c38;
        }
        .pagination-h5{
            display: block;
            width: 100%;
            margin: 0 auto;
            text-align: center;
            line-height: 60/75rem;
            border-radius: 6/75rem;
            font-size: 24/75rem;
            color: #778ca3;
            border: 1/75rem solid #6a88cc;
        }
    }
    @media (max-width: 768px) {
        .luckyDapp {
            .pagination {
                .el-pagination__sizes ,.el-pagination__jump{
                    display: none;
                }
            }
        }
    }
</style>
<style scoped lang="less" type="text/less">
    @import "../../styles/lib-mixins.less";
    .luckyDapp {
        background: #211c38;
        * {
            box-sizing: border-box;
        }
        .nomsg{
            padding: 155px 0 77px 0;
            border: 1px solid #3a3953;
            text-align: center;
            line-height: 47px;
            font-size: 16px;
            background: url("../../assets/img/superCoin/nomsg.png") no-repeat center 60px;
            background-size: 107px;
        }
    }
    .head-dapp {
        width: 100%;
        background: #151515;
        .head-dapp-wrap {
            position: relative;
            max-width: 1190px;
            width: percentage(710/750);
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
        position: relative;
        width: 100%;
        height: 585px;
        overflow: hidden;
        padding: 10px 0 40px 0;
        background: url("../../assets/img/superCoin/bg.jpg") no-repeat center, linear-gradient(#223541,#32215a);
        transition: all 0.2s ease-in-out;
        &::before{
            content: '';
            display: block;
            position: absolute;
            left: 50%;
            top: 120px;
            transform: translate(-50%,0);
            width: 1920px;
            height: 129px;
            overflow: hidden;
            background: url("../../assets/img/superCoin/img-eth2.png") no-repeat center;
            background-size: cover;
            animation: shakeimg2 10s infinite;
        }
        .message{
            position: relative;
            width: percentage(710/750);
            max-width: 1083px;
            height: 44px;
            overflow: hidden;
            margin: 0 auto 17px;
            background:rgba(19,32,44,0.6) url("../../assets/img/superCoin/icon-msg.png") no-repeat 10px center;
            background-size: 16px;
            ul{
                position: absolute;
                top: 0;
                left: 44px;
                width:85%;
                -webkit-backface-visibility: hidden;
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
            width: percentage(710/750);
            max-width: 1083px;
            line-height: 24px;
            font-size: 20px;
            color: #fff;
            &.draw{
                font-size: 16px;
            }
            .issue-pc{
                display: block;
            }
            .issue-h5{
                display: none;
            }
        }
        .betting-area{
            position: relative;
            width: percentage(710/750);
            max-width: 1190px;
            overflow: hidden;
            margin: 0 auto;
            .betting{
                overflow: hidden;
                margin-right: 40px;
                .item-msg{
                    display: flex;
                    align-items: flex-start;
                    width: 682px;
                    height: 84px;
                    padding: 30px 0 0 64px;
                    overflow: hidden;
                    line-height: 1;
                    font-size: 20px;
                    color: #a5b1c2;
                    background: url("../../assets/img/superCoin/bg-line.png") no-repeat center bottom;
                    background-size: 100%;
                    .title{
                        margin-right: 10px;
                    }
                    .jackpot-amount{
                        display: flex;
                        justify-content: flex-start;
                        align-items: baseline;
                        font-size: 56px;
                        color: #ffa200;
                        font-weight: bold;
                        &::after{
                            content: 'ETH';
                            font-size: 24px;
                        }
                    }
                    .countdown{
                        position: relative;
                        text-indent: 32px;
                        color: #ffa200;
                        background: url("../../assets/img/superCoin/icon-countdown.png") no-repeat center left;
                        background-size: 20px;
                        &.on{
                            animation: heartbeat 2s infinite;
                        }
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
                                background-size: 20px;
                            }
                        }
                        &::after{
                            content: attr(data-msg);
                            display: block;
                            margin-top: 8px;
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
                            margin-top: 8px;
                            display: block;
                            font-size: 12px;
                            color: #a5b1c2;
                        }
                    }
                    .people-all{
                        margin-left: 35px;
                        text-indent: 30px;
                        background: url("../../assets/img/superCoin/icon-people.png") no-repeat center left;
                        background-size: 20px;
                    }
                    &:first-child{
                        padding-top: 0;
                        align-items: baseline;
                    }
                }
            }
            .input-wrap{
                float: left;
            }
            .buy-area{
                float: right;
                width: 682px;
                margin-right: 40px;
                padding: 23px 0 37px 64px;
                line-height: 40px;
                font-size: 20px;
                color: #fff;
                overflow: hidden;
                .title{
                    float: left;
                    margin-right: 16px;
                }
                .input-box{
                    position: relative;
                    display: flex;
                    align-items: center;
                    height: 40px;
                    padding:0 0 0 42px;
                    background: #6258b7 url("../../assets/img/superCoin/icon-ticket-fff.png") no-repeat 10px center;
                    background-size: 20px;
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
                        font-weight: bold;
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
                        flex-grow: 1;
                        &:first-child,&:last-child{
                            flex-grow: 0;
                            padding:0 12px;
                        }
                        &:hover{
                            color: #fff;
                        }
                    }
                    a+a{
                        border-left: 1px solid #ff8a00;
                    }

                }
            }
            .btn-box{
                clear: both;
                float: right;
                display: flex;
                justify-content: flex-start;
                width: 682px;
                padding-left: 64px;
                margin-right: 40px;
                a{
                    display: block;
                    text-align: center;
                    height:62px;
                    line-height: 62px;
                    border-radius:6px;
                }
                .btn-big{
                    width:327px;
                    background:rgba(255,138,0,1);
                    font-size: 24px;
                    color: #fff;
                    font-weight: bold;
                    margin-right: 10px;
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
                            &:last-child{
                                font-size: 14px;
                            }
                        }
                    }
                }
            }
            &.isNew{
                .isNewShow{
                    position: relative;
                    z-index: 11;
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
                line-height: initial;
                font-size: 86px;
                color: #ff8a00;
                font-weight: bold;
                img{
                    position: relative;
                    animation: shakeimg 10s infinite;
                    margin-right: 22px;
                }
                i{
                    font-size: 32px;
                }
            }
            .notDraw{
                margin: 14px 0 37px 0;
                height: 64px;
                ul{
                    position: relative;
                    li{
                        position: absolute;
                        top:0;
                        left:0;
                        width: 100%;
                        height: 64px;
                        text-align:center;
                    }
                }
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
            position: fixed;
            z-index: 2;
            left: 0;
            top: 50%;
            transform: translateX(100%);
            width: 100%;
            height: 167px;
            background: rgba(21,21,21,0.8);
            line-height: 167px;
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
                transform: translateX(0);
            }
        }
        &.status2{
            height: 580px;
            background: url("../../assets/img/superCoin/bg2.jpg") no-repeat center, linear-gradient(#223541,#32215a);
            &::before{
                display: none;
            }
        }
    }
    .information{
        padding: 24px 0 90px 0;
        max-width: 1090px;
        width: percentage(710/750);
        margin: 0 auto;
        //overflow: hidden;
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
                overflow: hidden;
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
            width: 650px;
        }
        .invite{
            float: right;
            width: 370px;
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
                    color: #a5b1c2;
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
                    &:hover{
                        filter: brightness(1.1);
                    }
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
                z-index: 6;
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
                .close{
                    display: block;
                    position: absolute;
                    top:0;
                    right:0;
                    width:40px;
                    height:40px;
                    background: url("../../assets/img/superCoin/pop-close.png") no-repeat center;
                    background-size: 10px;
                }
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
                        a{
                            display: block;
                            float: right;
                            width: 82px;
                            color: #ff8a00;
                            text-decoration: underline;
                            .text-overflow();
                        }
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
                flex-basis: percentage(136/650);
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
    .pop-metamask{
        .mask-main{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            max-width: 450px;
            width: 94%;
            background: #211c38;
            color: #fff;
            border-radius: 6px;
            .pop-close{
                display: block;
                position: absolute;
                top: 10px;
                right: 10px;
                width: 20px;
                height: 20px;
                background: url("../../assets/img/superCoin/pop-close.png") no-repeat center;
                background-size: cover;
            }
            h5{
                font-size: 20px;
                line-height: 3;
            }
            .p1{
                margin: 10px 0 40px 0;
                font-size: 16px;
            }
            .p2{
                line-height: 5;
                font-size: 12px;
                a{
                    color: #fff;
                    &:hover{
                        color: rgba(255,255,255,0.8);
                    }
                }
            }
        }
    }
    .pop-new{
        position: absolute;
        z-index: 10;
        .new-main{
            position: relative;
            width: percentage(710/750);
            max-width: 1190px;
            height: 100%;
            margin: 0 auto;
        }
        p{
            line-height: 23px;
            font-size: 20px;
            color: #FEDC8E;
        }
        a{
            display: block;
            margin: 5px auto;
            width:67px;
            height:27px;
            line-height: 27px;
            background:rgba(32,191,107,1);
            border-radius:6px;
            font-size: 14px;
            color: #fff;
        }
        img{
            display: block;
            margin: 0 auto;
        }
        .step{
            position: absolute;
            width: 100%;
        }
        .step1{
            top: 35px;
            left: -45px;
            img{
                transform: rotateZ(-10deg) translate(29px);
            }
        }
        .step2{
            left: -180px;
            top: 215px;
            img{
                transform: rotateZ(-20deg) translate(215px,14px);
            }
        }
        .step3{
            left: -358px;
            top: 335px;
            img{
                transform: rotateZ(-35deg) translate(277px, 90px);
            }
        }
        .step4{
            left: -280px;
            top: 550px;
            img{
                transform: rotateZ(-20deg) translate(186px, 0px);
            }
        }
    }
</style>
<style scoped lang="less" type="text/less">
    @import "../../styles/dapph5.less";
</style>
