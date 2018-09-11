<template>
    <div>
        <Header></Header>
        <div class="luckyPoker" @click="initPop" @resize="onResize">
            <div class="main">
                <div class="bg-esktop" ref="container">
                    <div class="fly-coin fly-coin-el" :style="item.style" v-for="(item, index) in coins" :key="index" @click="addCoin(item.type)">
                        <img class="fly-coin-el" src="@assets/img/luckyPoker/coin-0.0001.png" alt="" v-if="item.coinType === 0.0001">
                        <img class="fly-coin-el" src="@assets/img/luckyPoker/coin-0.001.png" alt="" v-if="item.coinType === 0.001">
                        <img class="fly-coin-el" src="@assets/img/luckyPoker/coin-0.01.png" alt="" v-if="item.coinType === 0.01">
                        <img class="fly-coin-el" src="@assets/img/luckyPoker/coin-0.1.png" alt="" v-if="item.coinType === 0.1">
                    </div>
                    <!--历史开奖记录-->
                    <div class="poker-history">
                        <p class="title">{{$lang.poker.a27}}</p>
                        <div class="history-main">
                            <a class="btn btn-left" href="javascript:;" @click="onLeft"></a>
                            <div class="poker-item">
                                <ul :style="{ left: `${listLeft}px` }">
                                    <li class="poker-next" ref="next">
                                        <p>?</p>
                                    </li>
                                    <li v-for="(item, index) in (isLoading || showOpen ? tmpHistoryList : recentResult)" :key="index" :class="[getDiceClass(item)]">
                                        <p>{{getDiceText(item)}}</p>
                                    </li>
                                    <!-- <li class="icon-fk">
                                        <p>4</p>
                                    </li>
                                    <li class="icon-mh">
                                        <p>J</p>
                                    </li>
                                    <li class="icon-heit">
                                        <p>A</p>
                                    </li>
                                    <li class="icon-hongt">
                                        <p>J</p>
                                    </li>
                                    <li class="icon-fk">
                                        <p>n</p>
                                    </li>
                                    <li class="icon-mh">
                                        <p>J</p>
                                    </li>
                                    <li class="icon-heit">
                                        <p>A</p>
                                    </li>
                                    <li class="joker">
                                        <p></p>
                                    </li>
                                    <li class="icon-heit">
                                        <p>A</p>
                                    </li>
                                    <li class="icon-hongt">
                                        <p>J</p>
                                    </li>
                                    <li class="icon-fk">
                                        <p>n</p>
                                    </li>
                                    <li class="icon-mh">
                                        <p>J</p>
                                    </li>
                                    <li class="icon-heit">
                                        <p>A</p>
                                    </li>
                                    <li class="joker">
                                        <p></p>
                                    </li> -->
                                </ul>
                            </div>
                            <a class="btn btn-right" href="javascript:;" @click="onRight"></a>
                        </div>
                    </div>
                    <div class="bg-pc-esktop ">
                        <!--投注区-->
                        <div class="area-betting">
                            <!--red or balck-->
                            <div class="bet-rb">
                                <p class="poker-prize" v-if="colorTotal !== 0" v-lang="_($lang.poker.a14, accMul(colorMost, colorTotal), coinText)">
                                </p>
                                <ul>
                                    <li class="bet-red" ref="coin_red" @click="addCoin('red')">
                                        <i>
                                            <img class="icon-hongt" src="@assets/img/luckyPoker/icon-hongt.png" alt="">
                                        </i>
                                        <p>{{$lang.poker.a37}}</p>
                                        <i>
                                            <img class="icon-fk" src="@assets/img/luckyPoker/icon-fk.png" alt="">
                                        </i>
                                    </li>
                                    <li class="bet-black" @click="addCoin('black')" ref="coin_black">
                                        <i>
                                            <img src="@assets/img/luckyPoker/icon-heit.png" alt="">
                                        </i>
                                        <p>{{$lang.poker.a38}}</p>
                                        <i>
                                            <img src="@assets/img/luckyPoker/icon-mh.png" alt="">
                                        </i>
                                    </li>
                                </ul>
                                <p class="poker-time">
                                    {{_($lang.poker.a15, colorMost)}}
                                </p>
                            </div>
                            <div class="bet-joker">
                                <p class="poker-prize" v-if="jokerTotal !== 0" v-lang="_($lang.poker.a14, accMul(jokerTotal, jokerMost), coinText)" style="padding:0 4px"></p>
                                <ul>
                                    <li @click="addCoin('joker')" ref="coin_joker">
                                        <p>JOKER</p>
                                        <img src="@assets/img/luckyPoker/icon-crown.png" alt="">
                                    </li>
                                </ul>
                                <p class="poker-time">
                                    {{_($lang.poker.a15, jokerMost)}}
                                </p>
                            </div>
                            <div class="bet-color">
                                <p class="poker-prize" v-if="suitTotal !== 0" v-lang="_($lang.poker.a14, accMul(suitMost, suitTotal), coinText)">
                                </p>
                                <ul>
                                <li @click="addCoin('spade')" ref="coin_spade">
                                        <img src="@assets/img/luckyPoker/icon-heit.png" alt="">
                                    </li>
                                    <li @click="addCoin('heart')" ref="coin_heart">
                                        <img src="@assets/img/luckyPoker/icon-hongt.png" alt="">
                                    </li>
                                    <li @click="addCoin('club')" ref="coin_club">
                                        <img src="@assets/img/luckyPoker/icon-mh.png" alt="">
                                    </li>
                                    <li @click="addCoin('diamond')" ref="coin_diamond">
                                        <img src="@assets/img/luckyPoker/icon-fk.png" alt="">
                                    </li>
                                </ul>
                                <p class="poker-time">
                                    {{_($lang.poker.a15, suitMost)}}
                                </p>
                            </div>
                            <div class="bet-number">
                                <p class="poker-prize"  v-if="pointsTotal !== 0" v-lang="_($lang.poker.a14, accMul(pointsMost, pointsTotal), coinText)">
                                </p>
                                <ul class="item1">
                                    <li @click="addCoin('2')" ref="coin_2">2</li>
                                    <li @click="addCoin('3')" ref="coin_3">3</li>
                                    <li @click="addCoin('4')" ref="coin_4">4</li>
                                    <li @click="addCoin('5')" ref="coin_5">5</li>
                                    <li @click="addCoin('6')" ref="coin_6">6</li>
                                    <li @click="addCoin('7')" ref="coin_7">7</li>
                                    <li @click="addCoin('8')" ref="coin_8">8</li>
                                    <li @click="addCoin('9')" ref="coin_9">9</li>
                                    <li @click="addCoin('10')" ref="coin_10">10</li>
                                    <li @click="addCoin('J')" ref="coin_J">J</li>
                                </ul>
                                <ul class="item2">
                                    <li @click="addCoin('Q')" ref="coin_Q">Q</li>
                                    <li @click="addCoin('K')" ref="coin_K">K</li>
                                    <li @click="addCoin('A')" ref="coin_A">A</li>
                                </ul>
                                <div class="btn-cls ">
                                    <a href="javascript:;" @click="clearBet">
                                        {{$lang.poker.a16}}
                                    </a>
                                </div>
                                <p class="poker-time">
                                    {{_($lang.poker.a15, pointsMost)}}
                                </p>
                            </div>
                        </div>
                        <!--按钮区-->
                        <div class="area-btn clearfix">
                            <ul class="clearfix">
                                <li :class="{ on: currentCoin === 0.0001 }" @click="changeCoin('0.0001')" ref="0.0001">
                                    <img src="@assets/img/luckyPoker/coin-0.0001.png" alt="">
                                    <p>0.0001</p>
                                </li>
                                <li :class="{ on: currentCoin === 0.001 }" @click="changeCoin('0.001')" ref="0.001">
                                    <img src="@assets/img/luckyPoker/coin-0.001.png" alt="">
                                    <p>0.001</p>
                                </li>
                                <li :class="{ on: currentCoin === 0.01 }" @click="changeCoin('0.01')" ref="0.01">
                                    <img src="@assets/img/luckyPoker/coin-0.01.png" alt="">
                                    <p>0.01</p>
                                </li>
                                <li :class="{ on: currentCoin === 0.1 }" @click="changeCoin('0.1')" ref="0.1">
                                    <img src="@assets/img/luckyPoker/coin-0.1.png" alt="">
                                    <p>0.1</p>
                                </li>
                            </ul>
                            <!--wait/unable-->
                            <div href="javascript:;" class="btn-main " @click="onBet" :class="{ unable: total === 0, wait: isLoading }">
                                <p>{{$lang.poker.a17}}</p>
                                <!--<p>Please wait</p>-->
                                <span>{{total}} <i>{{coinText}}</i></span>
                            </div>
                        </div>
                    </div>
                </div>
                <!--随机数 h5-->
                <div class="area-random">
                    <div class="random-top">
                        <p class="title">
                            {{$lang.poker.a1}}
                        </p>
                        <a href="javascript:;" class="btn-help" @click="showPopVer=true; activeTabClass = 'upper'"></a>
                        <a href="javascript:;" class="btn-slideUp"></a>
                    </div>
                    <ul class="random-main ">
                        <li>
                            <p class="title">
                                {{$lang.poker.a2}}
                            </p>
                            <div class="input-group">
                                <input type="text" :value="clientSeed" readonly v-if="isLock">
                                <input type="text" v-model="clientSeed" v-else>
                                <a href="javascript:;" class="btn btn-random" @click="createClientSeed">
                                    {{$lang.poker.a4}}
                                </a>
                                <a href="javascript:;"  class="btn btn-lock btn-unlock" v-if="!isLock" @click="isLock = true">
                                    {{$lang.poker.a5}}
                                </a>
                                <a href="javascript:;"  class="btn btn-lock" v-if="isLock" @click="isLock = false">
                                    {{$lang.poker.a8}}
                                </a>
                            </div>
                        </li>
                        <li>
                            <p class="title">
                                {{$lang.poker.a3}}
                            </p>
                            <div class="input-group">
                                <input type="text" :value="hashNumber" readonly>
                            </div>
                        </li>
                    </ul>
                    <!--v-else-->
                    <ul class="random-main hide">
                        <li>
                            <p class="title">
                                {{$lang.poker.a2}}
                            </p>
                            <div class="input-group">
                                <input type="text" :value="preClientSeed" readonly>
                            </div>
                        </li>
                        <li>
                            <p class="title">
                                {{$lang.poker.a3}}
                            </p>
                            <div class="input-group">
                                <input type="text" :value="preServerHash" readonly>
                            </div>
                        </li>
                        <li>
                            <p class="title">
                                {{$lang.poker.a9}}
                            </p>
                            <div class="input-group">
                                <input type="text" :value="preServerSeed" readonly>
                            </div>
                        </li>
                    </ul>
                </div>
                <!--记录-->
                <div class="recording ">
                    <div class="recording-top">
                        <p>
                            {{$lang.poker.a19}}
                        </p>
                        <!--点击后文案变成back，类似11选5超级选5那个按钮-->
                        <!--on-->
                        <a href="javascript:;" :class="{on: isMyself}" @click="showMyself" v-if="recentResult.length !== 0">
                            {{$lang.poker.a20}}
                        </a>
                    </div>
                    <div class="recording-table">
                        <ul class="top flex-between">
                            <li>{{$lang.poker.a21}}</li>
                            <li>{{$lang.poker.a22}}</li>
                            <li>{{$lang.poker.a23}}</li>
                        </ul>
                        <ul class="recoding-main">
                            <li v-for="(item, index) in (getBetsList()).filter((bet, index) => index < 5)" :key="index">
                                <p class="bet-user" :title="item.username">
                                    {{item.username}}
                                </p>
                                <!--number black red fk mh hongt heit joker-->
                                <div class="bet-expect number" :class="[getDiceBetClass(item.bettype)]">
                                    {{getDiceBetText(item.bettype)}}
                                </div>
                                <p class="bet-count">
                                    {{Number(item.betmoney)}} <i>{{formateCoinType(item.cointype)}}</i>
                                </p>
                                <div class="bet-result" :class="[getDiceClass(item.result)]">
                                    <p>{{getDiceText(item.result)}}</p>
                                </div>
                                <p class="bet-result-count" :class="{mywin: userInfo && userInfo.uid && userInfo.uid === item.uid.toString() && Number(item.prize_amount) > 0}">
                                    {{Number(item.prize_amount)}} <i>{{formateCoinType(item.cointype)}}</i>
                                </p>
                            </li>
                            <li v-for="(item, index) in getEmptyList(5 - getBetsList().length)" v-if="getBetsList().length < 5" :key="index">
                            </li>
                            <!-- 
                            <li>
                                <p class="bet-user">
                                    222222222222222@gmail.com
                                </p>
                                <div class="bet-expect fk">
                                    Q
                                </div>
                                <p class="bet-count">
                                    0.00001<i> ETH</i>
                                </p>
                                <div class="bet-result icon-mh">
                                    <p>Q</p>
                                </div>
                                <p class="bet-result-count">
                                    0.00001<i> ETH</i>
                                </p>
                            </li>
                            <li>
                                <p class="bet-user">
                                    380482989@gmail.com
                                </p>
                                <div class="bet-expect mh">
                                    J
                                </div>
                                <p class="bet-count">
                                    0.00001<i> ETH</i>
                                </p>
                                <div class="bet-result joker">
                                    <p></p>
                                </div>
                                <p class="bet-result-count mywin">
                                    0.00001<i>ETH</i>
                                </p>
                            </li> -->
                        </ul>
                    </div>
                    <!--pc random area-->
                    <div class="pc-verification">
                        <a href="javascript:;" class="btn-href" @click="showPopVer=true">{{$lang.poker.a18}}</a>
                        <a href="javascript:;" class="btn-question">
                            <div>
                                <p>{{$lang.poker.a2}}:</p>
                                <p>{{$lang.poker.a11}}</p>
                                <p></p>
                                <p>{{$lang.poker.a9}}:</p>
                                <p>{{$lang.poker.a13}}</p>
                                <p></p>
                                <p>{{$lang.poker.a3}}:</p>
                                <p>{{$lang.poker.a12}}</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="pop pop-random" :class="{show:showPopVer}">
                <div class="pop-body">
                    <div class="pop-ani">
                        <a href="javascript:;" class="btn-close"  @click="showPopVer=false">X</a>
                        <div class="pop-main">
                            <h2 v-if="activeTabClass === 'thisRound'">
                                {{$lang.poker.a1}}
                            </h2>
                             <h2 v-else>
                                 {{$lang.poker.a7}}
                            </h2>
                            <ul class="tab-h" >
                                <li :class="{ on: activeTabClass === 'thisRound' }" @click="activeTabClass = 'thisRound'">
                                    <a href="javascript:;">
                                        {{$lang.poker.a6}}
                                    </a>
                                </li>
                                <li :class="{ on: activeTabClass === 'upper' }" @click="activeTabClass = 'upper'">
                                    <a href="javascript:;">
                                        {{$lang.poker.a7}}
                                    </a>
                                </li>
                            </ul>
                            <ul class="tab-c">
                                <div class="random-main" v-if="activeTabClass === 'thisRound'">
                                    <ul>
                                        <li>
                                            <p class="title">
                                                {{$lang.poker.a2}}
                                            </p>
                                            <div class="input-group">
                                                <input type="text" :value="clientSeed" readonly v-if="isLock">
                                                <input type="text" v-model="clientSeed" v-else>
                                                <a href="javascript:;" class="btn btn-random" @click="createClientSeed">
                                                    {{$lang.poker.a4}}
                                                </a>
                                                <a href="javascript:;"  class="btn btn-lock btn-unlock" v-if="!isLock" @click="isLock = true">
                                                    {{$lang.poker.a5}}
                                                </a>
                                                <a href="javascript:;"  class="btn btn-lock" v-if="isLock" @click="isLock = false">
                                                    {{$lang.poker.a8}}
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <p class="title">
                                                {{$lang.poker.a3}}
                                            </p>
                                            <div class="input-group">
                                                <input type="text" :value="hashNumber" readonly>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="random-main" v-if="activeTabClass === 'upper'">
                                    <ul >
                                        <li>
                                            <p class="title">
                                                {{$lang.poker.a2}}
                                            </p>
                                            <div class="input-group">
                                                <input type="text" :value="preClientSeed" readonly>
                                            </div>
                                        </li>
                                        <li>
                                            <p class="title">
                                                {{$lang.poker.a3}}
                                            </p>
                                            <div class="input-group">
                                                <input type="text" :value="preServerHash" readonly>
                                            </div>
                                        </li>
                                        <li>
                                            <p class="title">
                                                {{$lang.poker.a9}}
                                            </p>
                                            <div class="input-group">
                                                <input type="text" :value="preServerSeed" readonly>
                                            </div>
                                        </li>
                                    </ul>
                                    <router-link class="btn-check" :to="{path: `/check?clientseed=${preClientSeed}&serverseed=${preServerSeed}&type=luckypoker`}">
                                        {{$lang.poker.a10}}
                                    </router-link>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pop pop-poker" :class="{show: showOpen}">
                <!-- -->
                <!--v-if-->
                <!--scale0-->
                <div class="poker-draw" :class="{scale0: !isLoading}">
                    <ul class="poker-area animate1">
                        <li class="on">
                            <img src="@assets/img/luckyPoker/img-poker.png" alt="">
                        </li>
                        <li>
                            <img src="@assets/img/luckyPoker/img-poker.png" alt="">
                        </li>
                        <li>
                            <img src="@assets/img/luckyPoker/img-poker.png" alt="">
                        </li>
                        <li>
                            <img src="@assets/img/luckyPoker/img-poker.png" alt="">
                        </li>
                        <li>
                            <img src="@assets/img/luckyPoker/img-poker.png" alt="">
                        </li>
                        <li>
                            <img src="@assets/img/luckyPoker/img-poker.png" alt="">
                        </li>
                    </ul>
                    <a href="javascript:;" class="btn-open" @click="openPoker">
                        {{$lang.poker.a26}}
                    </a>
                </div>
                <!--v-else-->
                <!--isWin-->
                <div class="result" :class="{isWin: open.isWin}" v-show="!isLoading">
                    <!--heit/mh/hongt/fk+j/q/k  joker-->
                    <div class="result-box" :class="getOpenClass(open.result)" ref="resultPoker">
                        <div class="leftTop">
                            <p>{{getDiceText(open.result)}}</p>
                        </div>
                        <div class="img-poker"></div>
                        <div class="rightBottom">
                            <p>{{getDiceText(open.result)}}</p>
                        </div>
                    </div>
                    <!--未中奖-->
                    
                    <!--中奖-->
                    <div class="result-msg" v-if="open.isWin">
                        <p>{{$lang.poker.a25}}</p>
                        <div>+{{formatNum(Number(open.money), 4)}}<i>{{coinText}}</i></div>
                    </div>
                    <div class="result-msg" style="line-height: 3;font-size: 24px;font-weight: normal;" @click="closePoker()" v-else>
                        {{$lang.poker.a24}}
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '~components/Header'
import Footer from '~components/Footer'
import { accAdd, accSub, accDiv, getElementAbsolutePosition, getElementCenterPosition, formateCoinType, accMul, formatNum } from '~common/util'
import { mapActions, mapState } from 'vuex'
window.getElementAbsolutePosition = getElementAbsolutePosition
export default {
    components: { Header, Footer },
    data () {
        return {
            nameArr: ['red', 'black', 'joker', 'spade', 'heart', 'club', 'diamond', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
            points: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
            color: ['red', 'black'],
            suit: ['spade', 'heart', 'club', 'diamond'],
            joker: ['joker'],
            pointsTotal: 0,
            colorTotal: 0,
            jokerTotal: 0,
            suitTotal: 0,
            currentCoin: 0.0001,
            currentCoinEl: null,
            betNums: {},
            total: 0,
            coins: [],
            recentResult: [],
            restricts: {},
            clientSeed: '',
            hashNumber: '',
            activeTabClass: 'thisRound',
            showPopVer: false,
            isLock: false,
            jokerMost: 27,
            colorMost: 2,
            suitMost: 4,
            pointsMost: 13,
            showOpen: false,
            isLoading: false,
            isMyself: false,
            listLeft: 0,
            preServerSeed: '',
            preServerHash: '',
            preClientSeed: '',
            closeTimer: null,
            tmpHistoryList: [],
            tmpRecentLists: [],
            tmpMyselfBetsLists: [],
            open: {
                isWin: false,
                money: 0,
                result: 0
            }
        }
    },
    methods: {
        ...mapActions('cs_luckypoker', ['getHome', 'bet']),
        ...mapActions(['subInDice', 'subOutDice', 'getUserInfo']),
        accMul,
        formateCoinType,
        getElementAbsolutePosition,
        getElementCenterPosition,
        formatNum,
        getEmptyList (num) {
            if (num > 0) {
                return new Array(num)
            }
            return []
        },
        initPop () {
            /* head 弹窗 */
            this.$store.commit('initHeadState', new Date().getTime())
        },
        getBetsList () {
            if (this.isLoading || this.showOpen) {
                if (this.isMyself) {
                    return this.tmpMyselfBetsLists
                }
                return this.tmpRecentLists
            } else {
                if (this.isMyself) {
                    return this.selfBetList
                }
                return this.betList
            }
        },
        showMyself () {
            this.isMyself = !this.isMyself
        },
        getOpenClass (type) {
            type = Number(type)
            let typeClass = ''
            if (type >= 0 && type <= 12) {
                typeClass = 'hongt'
            } else if (type >= 13 && type <= 25) {
                typeClass = 'heit'
                type -= 13
            } else if (type >= 26 && type <= 38) {
                typeClass = 'fk'
                type -= 26
            } else if (type >= 39 && type <= 51) {
                typeClass = 'mh'
                type -= 39
            } else {
                typeClass = 'joker'
            }
            if (type === '10') {
                typeClass += ' j'
            } else if (type === '11') {
                typeClass += ' q'
            } else if (type === '12') {
                typeClass += ' k'
            }
            return typeClass
        },
        getDiceClass (type) {
            type = Number(type)
            if (type >= 0 && type <= 12) {
                return 'icon-hongt'
            } else if (type >= 13 && type <= 25) {
                return 'icon-heit'
            } else if (type >= 26 && type <= 38) {
                return 'icon-fk'
            } else if (type >= 39 && type <= 51) {
                return 'icon-mh'
            } else {
                return 'joker'
            }
        },
        getDiceText (type) {
            type = Number(type)
            let points = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
            if (type >= 0 && type <= 12) {
                return points[type]
            } else if (type >= 13 && type <= 25) {
                return points[type - 13]
            } else if (type >= 26 && type <= 38) {
                return points[type - 26]
            } else if (type >= 39 && type <= 51) {
                return points[type - 39]
            } else {
                return ''
            }
        },
        getDiceBetText (type) {
            let points = [...this.points]
            let color = [...this.color]
            if (points.indexOf(type) > -1) {
                return type
            } else if (color.indexOf(type) > -1) {
                return {RED: this.$lang.poker.a37, BLACK: this.$lang.poker.a38}[type.toUpperCase()]
            }
            return ''
        },
        getDiceBetClass (type) {
            let typeClass = ['number', 'black', 'red', 'fk', 'mh', 'hongt', 'heit', 'joker']
            let points = [...this.points]
            let suit = [...this.suit]
            let color = [...this.color]
            if (points.indexOf(type) > -1) {
                return 'number'
            } else if (suit.indexOf(type) > -1) {
                return {
                    spade: 'heit',
                    heart: 'hongt',
                    club: 'mh',
                    diamond: 'fk'
                }[type]
            } else if (color.indexOf(type) > -1) {
                return type
            } else {
                return 'joker'
            }
        },
        getCenter ({left, top}) {
            // 减去金币宽度高度
            return {
                left: accSub(left, 12),
                top: accSub(top, 12)
            }
        },
        getRandom (num) {
            return num * Math.random()
        },
        getRandomPosition ({left, top}, width, height) {
            let offsetLeft = Math.ceil(this.getRandom(accDiv(accSub(width, 20), 2)))
            let offsetTop = Math.ceil(this.getRandom(accDiv(accSub(height, 20), 2)))
            return { left: Math.random() > 0.5 ? accAdd(left, offsetLeft) : accSub(left, offsetLeft), top: Math.random() > 0.5 ? accAdd(top, offsetTop) : accSub(top, offsetTop) }
        },
        getPosition (element, isRandom) {
            let position = this.getElementAbsolutePosition(element, this.$refs.container)
            let center = this.getCenter(this.getElementCenterPosition(element, position))
            let realPosition = isRandom ? this.getRandomPosition(center, element.clientWidth, element.clientHeight) : center
            return {
                transform: `translate(${realPosition.left}px, ${realPosition.top}px)`,
                'z-index': '8'
            }
        },
        calculate (name) {
            let tmp = [this.points, this.suit, this.color, this.joker]
            let tmpName = ['pointsTotal', 'suitTotal', 'colorTotal', 'jokerTotal']
            this.betNums[name] = accAdd(this.betNums[name], this.currentCoin)
            this.total = accAdd(this.total, this.currentCoin)
            tmp.forEach((arr, index) => {
                if (arr.indexOf(name) > -1) {
                    this[tmpName[index]] = accAdd(this[tmpName[index]], this.currentCoin)
                }
            })
        },
        isRestricts (name) {
            let most
            let total
            if (this.color.indexOf(name) > -1) {
                most = this.colorMost
                total = this.colorTotal
            } else if (this.joker.indexOf(name) > -1) {
                most = this.jokerMost
                total = this.jokerTotal
            } else if (this.points.indexOf(name) > -1) {
                most = this.pointsMost
                total = this.pointsTotal
            } else if (this.suit.indexOf(name) > -1) {
                most = this.suitMost
                total = this.suitTotal
            }
            return accMul(accAdd(total, this.currentCoin), most) > Number(this.restricts[this.coinType.toString()][name])
        },
        addCoin (name) {
            if (!this.isLogin) {
                this.$store.commit('showLoginPop')
                return
            }
            if (this.isRestricts(name)) {
                this.$error(this.$lang.poker.a36)
                return
            }
            this.$nextTick(() => {
                let lastCoin = this.coins[this.coins.length - 1]
                this.calculate(name)
                lastCoin.style.display = 'block'
                lastCoin.type = name
                let position = this.getPosition(this.$refs[`coin_${name}`], true)
                this.$nextTick(() => {
                    lastCoin.style = {...lastCoin.style, ...position}
                    this.coins = [...this.coins]
                    this.initCoin()
                })
            })
        },
        changeCoin (type) {
            this.currentCoin = Number(type)
            this.currentCoinEl = this.$refs[type]
            this.coins.splice(this.coins.length - 1, 1)
            this.initCoin()
        },
        resetCoinPosition () {
            let tmpCoins = []
            this.coins.forEach(coin => {
                let thisCoin = {...coin}
                if (thisCoin.type) {
                    let position = this.getPosition(this.$refs[`coin_${thisCoin.type}`], true)
                    thisCoin.style = {...thisCoin.style, ...position}
                    tmpCoins.push(thisCoin)
                }
            })
            this.coins = [...tmpCoins]
            this.initCoin()
        },
        clearBet () {
            this.nameArr.forEach(name => {
                this.betNums[name] = 0
            })
            this.coins = []
            this.total = 0
            this.colorTotal = 0
            this.suitTotal = 0
            this.jokerTotal = 0
            this.pointsTotal = 0
            this.initCoin()
        },
        initCoin () {
            this.currentCoinEl = this.$refs[this.currentCoin.toString()]
            this.coins = [...this.coins, {
                coinType: this.currentCoin,
                style: {
                    display: 'none',
                    ...this.getPosition(this.currentCoinEl)
                }
            }]
        },
        onBet () {
            if (!this.isLogin) {
                this.$store.commit('showLoginPop')
                return
            }
            if (this.balance < this.total) {
                this.$error(this.$lang.poker.a35)
                return
            }
            if (this.total === 0) {
                this.$error(this.$lang.poker.a34)
                return
            }
            if (this.clientSeed === '' || this.clientSeed.length >= 128) {
                this.$error(this.$lang.poker.a33)
                return
            }
            this.showOpen = true
            this.isLoading = true
            this.tmpHistoryList = [...this.recentResult]
            this.tmpMyselfBetsLists = [...this.selfBetList]
            this.tmpRecentLists = [...this.betList]
            this.bet({
                bets: {...this.betNums},
                cointype: Number(this.coinType),
                client_seed: this.clientSeed,
                cur_server_hash: this.hashNumber
            }).then(res => {
                this.goto(1)
                this.renderResult(res.data)
                this.refresh()
                this.clearBet()
                this.getUserInfo()
            })
                .catch(() => {
                    this.isLoading = false
                    this.showOpen = false
                })
        },
        renderResult (data) {
            this.open = {
                isWin: Number(data.prize_amount) > 0,
                money: Number(data.prize_amount),
                result: data.result
            }
            this.preServerSeed = data.pre_server_seed
            this.preServerHash = data.pre_server_hash
            this.preClientSeed = data.pre_client_seed
        },
        openPoker () {
            this.isLoading = false
            this.closePoker(5000)
        },
        closePoker (time) {
            if (this.closeTimer) {
                clearTimeout(this.closeTimer)
                this.closeTimer = null
            }
            if (time) {
                this.closeTimer = setTimeout(() => {
                    this.showOpen = false
                    this.goto()
                }, 5000)
            } else {
                this.showOpen = false
                this.goto()
            }
        },
        disableContext () {
            document.oncontextmenu = function (e) {
                return false
            }
        },
        createRandomNum (num) {
            return Math.floor(Math.random() * 3)
        },
        createClientSeed () {
            if (this.isLock) {
                return
            }
            let length = 16
            let randomList = ['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0123456789']
            this.clientSeed = ((new Array(length + 1)).join('*').split('').map(() => {
                let index = this.createRandomNum(3)
                let item = randomList[index]
                return item[this.createRandomNum(item.length)]
            }).join(''))
        },
        refresh () {
            this.getHome()
                .then(data => this.render(data))
        },
        render ({data}) {
            this.hashNumber = data.cur_server_hash
            this.colorMost = Number(data.odds.color)
            this.jokerMost = Number(data.odds.joker)
            this.pointsMost = Number(data.odds.point)
            this.suitMost = Number(data.odds.suit)
            this.recentResult = [...data.recent_results]
            this.restricts = {...data.restricts}
        },
        onLeft () {
            if (this.listLeft === 0) {
                return
            }
            let nextEl = this.$refs.next
            let width = nextEl.offsetWidth
            this.listLeft = accAdd(this.listLeft, accAdd(width, 5))
        },
        onRight () {
            let nextEl = this.$refs.next
            let width = nextEl.offsetWidth
            this.listLeft = accSub(this.listLeft, accAdd(width, 5))
        },
        goto (num = 0) {
            let nextEl = this.$refs.next
            let width = nextEl.offsetWidth
            this.listLeft = accMul(num, accAdd(width, 5)) * -1
        },
        onResize () {
            this.resetCoinPosition()
        }
    },
    computed: {
        ...mapState({
            isLogin: state => !!state.isLog,
            account: state => state.currBalance,
            balance: state => state.currBalance.balance,
            userInfo: state => state.userInfo,
            betList: state => state.cs_luckypoker.betList,
            selfBetList: state => state.cs_luckypoker.selfBetList
        }),
        coinType () {
            return this.account.cointype
        },
        coinText () {
            return formateCoinType(this.coinType || '2001').toUpperCase()
        }
    },
    watch: {
        isLogin () {
            this.refresh()
        },
        coinType () {
            this.clearBet()
        }
    },
    mounted () {
        this.initCoin()
        this.clearBet()
        this.refresh()
        this.createClientSeed()
        this.disableContext()
        this.subInDice()
        window.addEventListener('resize', this.onResize)
    },
    destroyed () {
        document.oncontextmenu = null
        window.removeEventListener('resize', this.onResize)
        this.subOutDice()
    }
}
</script>
<style lang="less" scoped type="text/less">
    @import "../../styles/lib-mixins.less";
    .fly-coin {
        transition: .5s ease-in-out;
        position: absolute;
        cursor: pointer;
        img {
            width: 24px;
        }
    }
    .bg-esktop {
        position: relative;
        overflow: hidden;
    }
    .luckyPoker{
        text-align: center;
        font-family: sans-r;
        *{
            box-sizing: border-box;
        }
        .flex-between{
            display: flex;
            justify-content: space-between;
        }
        .poker-prize{
            display: table;
            position: absolute;
            left: 50%;
            z-index: 2;
            transform: translate(-50%);
            background: #003333;
            color: #33cc66;
            font-weight: bold;
        }
        .poker-time{
            color: #99cccc;
            font-weight: bold;
        }
        /*投注区*/
        .area-betting{
            .bet-rb{
                position: relative;
                float: left;
                ul{
                    overflow: hidden;
                }
                li{
                    position: relative;
                    width: 50%;
                    overflow: hidden;
                    float: left;
                    background: #386363;
                    cursor: pointer;
                    &.bet-red,&.bet-black{
                        display: flex;
                        justify-content: center;
                        color: #ff3333;
                        font-family: Lucida Bright,LBRITE;
                        p{
                            margin: 0 15/2px;
                        }
                        i{
                            display: block;
                            position: relative;
                            width: percentage(18/217);
                            img{
                                position: absolute;
                                width: 100%;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%,-50%);
                            }
                        }
                    }
                    &.bet-black{
                        color: #000000;
                        background: #4a8282;
                    }
                }
            }
            .bet-joker{
                position: relative;
                float: right;
                .poker-time{
                    color: #ffcc00;
                }
                li{
                    position: relative;
                    width: 100%;
                    background: #386363;
                    font-family: Lucida Bright,LBRITE;
                    cursor: pointer;
                    p{
                        color: #ffcc00;
                    }
                    img{
                        display: block;
                        position: absolute;
                        right: percentage(20/222);
                        top: percentage(30/140);
                        width: percentage(30/222);
                        max-width: 36px;
                    }

                }
            }
            .bet-color{
                position: relative;
                clear: both;
                ul{
                    overflow: hidden;
                }
                li{
                    position: relative;
                    float: left;
                    width: 25%;
                    overflow: hidden;
                    background-color: #386363;
                    cursor: pointer;
                    img{
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                        display: block;
                    }
                    &:first-child,&:nth-child(3){
                        background-color: #4a8282;
                    }
                }
            }
            .bet-number{
                position: relative;
                ul{
                    overflow: hidden;
                    text-align: center;
                    font-size: 0;
                    li{
                        display: inline-block;
                        color: #fff;
                        font-weight: bold;
                        font-family: Lucida Bright,LBRITE;
                        cursor: pointer;
                    }
                    &.item1{
                        li{
                            width: 20%;
                            background: #386363;
                            &:nth-child(2n){
                                background: #4a8282;
                            }
                        }
                    }
                    &.item2{
                        //width: 60%;
                        margin: 0 auto;
                        li{
                            width: 20%;
                            background: #386363;
                            &:first-child{
                                background: #4a8282;
                            }
                            &:last-child{
                                background: #4a8282;
                            }
                        }
                    }
                }
                .btn-cls{
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    overflow: hidden;
                    background: #0c6d6d;
                    font-weight: normal;
                    a{
                        display: block;
                        height: 100%;
                        color: #99cccc;
                        &::before{
                            content: '';
                            display: block;
                            background:url("../../assets/img/luckyPoker/icon-cls.png") no-repeat center;
                        }
                    }
                }
                .poker-time{
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    height: auto;
                    line-height: 1;
                    width: 20%;
                    text-align: right;
                }
            }
        }
        /*按钮区*/
        .area-btn{
            position: relative;
            z-index: 2;
            ul{
                display: flex;
                li{
                    position: relative;
                    cursor: pointer;
                    transition: all 0.2s;
                    img{
                        display: block;
                        width: 80%;
                        margin: 0 auto;
                        transition: all 0.2s;
                        /*box-shadow: 0 7px 10px rgba(0,0,0,0.3);*/
                        border-radius: 50%;
                    }
                    p{
                        position: absolute;
                        left: 50%;
                        transform: translate(-50%);
                        background: rgba(0,0,0,0.8);
                        padding: 0 5px;
                        overflow: hidden;
                        color: #ffcc00;
                        font-weight: bold;
                    }
                    &::before{
                        content: '';
                        display: block;
                        position: absolute;
                        width: 100%;
                        /*height: 100%;*/
                        padding-top: 100%;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%) scale(0.8);
                        border-radius: 50%;
                        box-shadow: 0 0 30px transparent;
                        transition: all 0.2s;
                    }
                }
                li.on{
                    img{
                        transform: scale(1.3);
                        box-shadow: none;
                    }
                }
            }
            .btn-main{
                display: flex;
                flex-direction: column;
                justify-content: center;
                cursor: pointer;
                background: url("../../assets/img/luckyPoker/btn-main.png") no-repeat center ;
                background-size: cover;
                color: #fff;
                font-weight: bold;
                transition: all 0.2s;
                p{
                    transition: all 0.2s;
                }
                span{
                    display: block;
                    transition: all 0.2s;
                    i{

                    }
                }
                &.wait{
                    filter:brightness(0.8);
                    box-shadow: 0 2px 0 #2b7876;
                    p{
                        font-size: 15px;
                        text-shadow:none;
                    }
                    i{
                        .hide-text();
                        transform: scale(0);
                    }
                }
                &.unable{
                    filter:brightness(0.8);
                    box-shadow: 0 2px 0 #2b7876;
                    i{
                        .hide-text();
                        transform: scale(0);
                    }
                }
            }
        }
        /*历史开奖*/
        .poker-history{
            ul {
                transition: .2s all ease-in-out;
            }
            .history-main{
                display: flex;
                justify-content: space-between;
            }
            .title{
                display: none;
            }
            .btn{
                display: block;
                height: 30px;
            }
            .btn-left{
                background:url("../../assets/img/luckyPoker/icon-left.png") no-repeat center;
            }
            .btn-right{
                background:url("../../assets/img/luckyPoker/icon-right.png") no-repeat center;
            }
            .poker-item{
                flex: 1;
                position: relative;
                height: 30px;
                overflow: hidden;
            }
            ul{
                position: absolute;
                left: 0;
                top: 0;
                width: 999999px;
                overflow: hidden;
                text-transform: capitalize;
            }
            li{
                width: 20px;
                height: 30px;
                overflow: hidden;
                float: left;
                border-radius: 8/2px;
                background-color: #fff;
                p{
                    line-height: 30/2px;
                    font-size: 24/2px;
                    font-weight: bold;
                }
                &::after{
                    content: '';
                    display: block;
                    width: percentage(24/40);
                    height: 30/2px;
                    overflow: hidden;
                    margin: 0 auto;
                }
                &.icon-hongt{
                    color: #cc3333;
                    &::after{
                        background:url("../../assets/img/luckyPoker/icon-hongt.png") no-repeat center top;
                        background-size: contain;
                    }

                }
                &.icon-fk{
                    color: #cc3333;
                    &::after{
                        background:url("../../assets/img/luckyPoker/icon-fk.png") no-repeat center top;
                        background-size: contain;
                    }
                }
                &.icon-mh{
                    color: #000000;
                    &::after{
                        background:url("../../assets/img/luckyPoker/icon-mh.png") no-repeat center top;
                        background-size: contain;
                    }
                }
                &.icon-heit{
                    color: #000000;
                    &::after{
                        background:url("../../assets/img/luckyPoker/icon-heit.png") no-repeat center top;
                        background-size: contain;
                    }
                }
                &.joker{
                    &::after{
                        width: 100%;
                        height: 100%;
                        background:url("../../assets/img/luckyPoker/font-joker.png") no-repeat center top;
                        background-size: cover;
                    }
                    p{
                        display: none;
                    }
                }
                &+li{
                    margin-left: 5px;
                }
            }
            .poker-next{
                background: #386363;
                p{
                    width: 100%;
                    line-height: 30px;
                    text-align: center;
                    font-size: 28/2px;
                    color: #518484;
                }
                &::after{
                    display: none;
                }
            }
        }
        /*h5 input*/
        .area-random{
            display: none;
        }
        /*投注记录*/
        .recording{
            width: 92%;
            /*overflow: hidden;*/
            background: #294557;
            color: #fff;
            .recording-top{
                display: flex;
                justify-content: space-between;
                p{
                    font-size: 16px;
                    font-weight: bold;
                }
                a{
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #fff;
                    &::before{
                        content: '';
                        display: block;
                        transition: all 0.2s;
                    }
                    &.on{
                        &::before{
                            background: url("../../assets/img/luckyPoker/icon-my.png") no-repeat left top ;
                            background-size: 21px;
                        }
                    }
                }
            }
            .recording-table{
                .top{
                    color: #72a1a8;
                }
            }
            .pc-verification{
                display: none;
            }
        }
        /*pop*/
        .pop-random,.pop-poker{
            display: none;
        }

        .pop-poker{
            .poker-draw{
                position: absolute;
                left: 50%;
                width: 100%;
                top: 50%;
                transform: translate(-50%,-50%);
                transition: all 0.2s;
            }
            .poker-area{
                position: relative;
                transition: all 0.2s;
                li{
                    position: absolute;
                    left: 50%;
                    top: 0;
                    transform: translateX(-50%);
                    width: 100%;
                    transition: all 0.2s;
                    transform-origin: center bottom;
                    img{
                        display: block;
                        width: 100%;
                    }
                }
                &.animate1{
                    .setPokerPosition(10);
                }
            }
            .btn-open{
                display: block;
                max-width: 370px;
                width: percentage(370/750);
                overflow: hidden;
                margin: 0 auto 0;
                line-height: 98/2px;
                border-radius: 4px;
                background: #3e9999;
                font-size: 18px;
                color: #fff;
                font-weight: bold;
                &:hover{
                    filter: brightness(1.3);
                }
            }
            .result{
                transition: all 0.2s;
                position: absolute;
                left: 50%;
                width: 100%;
                top: 50%;
                transform: translate(-50%,-50%);
                &.isWin{
                    background: url("../../assets/img/luckyPoker/bg-win.png") no-repeat center bottom;
                    background-size: 526px;
                    .result-msg{
                        color: #ffcf20;
                    }
                }
            }
            .result-box{
                position: relative;
                overflow: hidden;
                background: #fff;
                border-radius: 15px;
                //padding:8/2px 0;
                margin: 0 auto 0;
                .leftTop,.rightBottom{
                    position: absolute;
                    width: 110/2px;
                    p{
                        line-height: 100/2px;
                        font-size: 84/2px;
                        font-family: Lucida Bright,LBRITE;
                        text-transform: uppercase;
                    }
                    &::after{
                        content: '';
                        display: block;
                        width: 100%;
                        height: 40px;
                        overflow: hidden;
                    }
                }
                .leftTop{
                    left: 0;
                    top: 0;
                }
                .rightBottom{
                    right: 0;
                    bottom: 0;
                    transform: rotate(180deg);
                }
                .img-poker{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform:translate(-50%,-50%);
                    display: block;
                    width: 100%;
                    height: 100%;
                }
                &.heit{
                    color: #000000;
                    .leftTop,.rightBottom{
                        &::after{
                            background:url("../../assets/img/luckyPoker/icon-heit.png") no-repeat center top;
                            background-size: percentage(50/110);
                        }
                    }
                    .img-poker{
                        background:url("../../assets/img/luckyPoker/icon-heit.png") no-repeat center;
                        background-size: percentage(65/110);
                    }
                }
                &.mh{
                    color: #000000;
                    .leftTop,.rightBottom{
                        &::after{
                            background:url("../../assets/img/luckyPoker/icon-mh.png") no-repeat center;
                            background-size: percentage(65/110);
                        }
                    }
                    .img-poker{
                        background:url("../../assets/img/luckyPoker/icon-mh.png") no-repeat center;
                        background-size: percentage(65/110);
                    }
                }
                &.hongt{
                    color: #df2929;
                    .leftTop,.rightBottom{
                        &::after{
                            background:url("../../assets/img/luckyPoker/icon-hongt.png") no-repeat center top;
                            background-size: percentage(65/110);
                        }
                    }
                    .img-poker{
                        background:url("../../assets/img/luckyPoker/icon-hongt.png") no-repeat center;
                        background-size: percentage(65/110);
                    }
                }
                &.fk{
                    color: #df2929;
                    .leftTop,.rightBottom{
                        &::after{
                            background:url("../../assets/img/luckyPoker/icon-fk.png") no-repeat center top;
                            background-size: percentage(65/110);
                        }
                    }
                    .img-poker{
                        background:url("../../assets/img/luckyPoker/icon-fk.png") no-repeat center;
                        background-size: percentage(65/110);
                    }
                }
                &.j{
                    .img-poker{
                        background:url("../../assets/img/luckyPoker/icon-J.png") no-repeat center;
                        background-size: percentage(300/360);
                    }
                }
                &.q{
                    .img-poker{
                        background:url("../../assets/img/luckyPoker/icon-Q.png") no-repeat center;
                        background-size: percentage(300/360);
                    }
                }
                &.k{
                    .img-poker{
                        background:url("../../assets/img/luckyPoker/icon-K.png") no-repeat center;
                        background-size: percentage(300/360);
                    }
                }
                &.joker{
                    background:url("../../assets/img/luckyPoker/icon-Joker.png") no-repeat center;
                    background-size: cover;
                    *{
                        display: none !important;
                    }
                }
            }
            .result-msg{
                max-width: 300px;
                width: percentage(500/750);
                border-radius: 4px;
                margin: 45/2px auto 0;
                padding: 0 2px;
                background-color: #050707;
                color: #ffff;
                font-weight: bold;
                border: 1px solid #6bda7b;
                p{
                    line-height: 60/2px;
                    font-size: 36/2px;
                }
                div{
                    line-height: 90/2px;
                    font-size: 72/2px;
                    i{
                        font-size: 36/2px;
                    }
                }
            }
            .scale0{
                transform: scale(0);
                width: 0;
                height: 0;
                overflow: hidden;
            }
        }
    }
    @media (max-width: 1106px) {
        .luckyPoker{
            background: #161e22;
            padding-top: 22/2px;
            .main{
                padding-bottom: 140/2px;
            }
            .bg-esktop{
                position: relative;
                background: url("../../assets/img/luckyPoker/bg.jpg") repeat-y center bottom;
                background-size: cover;
                padding-bottom: 30px;
                &::before{
                    content: '';
                    display: block;
                    position: absolute;
                    z-index: 1;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 400/2px;
                    background: linear-gradient(rgba(0,0,0,0.7),transparent);
                    background-size: 100%;
                }
                &::after{
                    content: '';
                    display: block;
                    position: absolute;
                    z-index: 1;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 400/2px;
                    background: url("../../assets/img/luckyPoker/bg-border.png") no-repeat center bottom;
                    background-size: 100%
                }
            }
            .poker-prize{
                top: -34/4px;
                border: 1px solid #6faeae;
                border-radius: 8/2px;
                height: 34/2px;
                line-height: 34/2px;
                font-size: 22/2px;
                //font-size: 22/7.5vw;
                padding: 0 18/2px;
                i{
                    font-size: 8px;
                }
            }
            .poker-time{
                height: 68/2px;
                line-height: 42/2px;
                font-size: 24/2px;
                //font-size: 24/7.5vw;
            }
            /*投注区*/
            .area-betting{
                position: relative;
                z-index: 2;
                width: 92%;
                margin: 44/2px auto 0;
                background: url("../../assets/img/luckyPoker/bg-ligth.png") no-repeat center;
                background-size: cover;
                font-weight: bold;
                .bet-rb{
                    width: percentage(450/690);
                    ul{
                        border-radius: 6px;
                        border: 1px solid #6faeae;
                        height: 70px;
                    }
                    li{
                        height: 70px;
                        line-height: 70px;
                        font-size: 38/2px;
                        //font-size: 38/7.5vw;
                        &+li{
                            border-left: 1px solid #6faeae;
                        }
                    }
                }
                .bet-joker{
                    width: percentage(222/690);
                    .poker-time{
                        color: #ffcc00;
                    }
                    li{
                        height: 70px;
                        border-radius: 6px;
                        border: 1px solid #6faeae;
                        background: #386363;
                        cursor: pointer;
                        p{
                            line-height: 70px;
                            font-size: 38/2px;
                            //font-size: 38/7.5vw;
                            color: #ffcc00;
                        }
                    }
                }
                .bet-color{
                    ul{
                        border: 1px solid #6faeae;
                        border-radius: 6px;
                    }
                    li{
                        height: 70px;
                        cursor: pointer;
                        img{
                            width: percentage(53/170);
                            max-width: 34px;
                        }
                    }
                    li+li{
                        border-left: 1px solid #6faeae;
                    }
                }
                .bet-number{
                    ul{
                        li{
                            height: 123/2px;
                            line-height: 123/2px;
                            border-bottom: 1px solid #6faeae;
                            border-right: 1px solid #6faeae;
                            font-size: 46/2px;
                            //font-size: 46/7.5vw;
                        }
                        &.item1{
                            border-left: 1px solid #6faeae;
                            border-top: 1px solid #6faeae;
                            border-radius: 6px;
                        }
                        &.item2{
                            border-left: 1px solid transparent;
                            border-bottom: 1px solid transparent;
                            li{
                                &:first-child{
                                    border-bottom-left-radius: 6px;
                                    border-left: 1px solid #6faeae;
                                }
                                &:last-child{
                                    border-bottom-right-radius: 6px;
                                }
                            }
                        }
                    }
                    .btn-cls{
                        width: 45px;
                        border-radius: 6px;
                        font-size: 24/2px;
                        //font-size: 24/7.5vw;
                        a{
                            &::before{
                                margin: 4px auto 0;
                                width: 29/2px;
                                height: 36/2px;
                                background-size: 100%;
                            }
                        }
                    }
                }
            }
            /*按钮区*/
            .area-btn{
                width: 92%;
                margin: 45/2px auto 0;
                ul{
                    float: left;
                    width: percentage(490/690);
                    justify-content: space-between;
                    li{
                        width: percentage(104/503);
                        p{
                            bottom: 0;
                            min-width: percentage(110/104);
                            height: 38/2px;
                            border-radius: 38/4px;
                            line-height: 38/2px;
                            font-size: 30/2px;

                        }
                    }
                    li.on{
                        &::before{
                            transform: translate(-50%,-50%) scale(1);
                            box-shadow: 0 0 10px rgba(0,255,234,1);
                        }
                    }
                }
                .btn-main{
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: percentage(187/690);
                    height: 100%;
                    border-radius: 6px;
                    box-shadow: 0 4px 0 #2b7876;
                    p{
                        line-height: 22px;
                        font-size: 18px;
                        text-shadow: 0 1px #2b7b75, 1px 0 #2b7b75, -1px 0 #2b7b75, 0 -1px #2b7b75;
                    }
                    span{
                        line-height: 15px;
                        font-size: 12px;
                        i{
                            font-size: 10px;
                        }
                    }

                }
            }
            /*历史开奖*/
            .poker-history{
                position: relative;
                z-index: 2;
                font-family: Lucida Bright,LBRITE;
                text-align: center;
                .btn{
                    width: percentage(30/750);
                }
                .btn-left{
                    background-size: 10px;
                }
                .btn-right{
                    background-size: 10px;
                }
            }
            /*h5 input*/
            .area-random{
                display: block;
                width: 92%;
                padding: 10/2px percentage(24/690) 50/2px;
                margin: 110/2px auto 0;
                border-radius: 8px;
                background: #294557;

                color: #fff;
                .random-top{
                    overflow: hidden;
                    height: 86/2px;
                    .title{
                        float: left;
                        text-align: left;
                        line-height: 86/2px;
                        font-size: 32/2px;
                        font-weight: bold;
                    }
                    .btn-help{
                        float: left;
                        display: block;
                        width: 34px;
                        height: 86/2px;
                        overflow: hidden;
                        background:url("../../assets/img/luckyPoker/icon-help.png") no-repeat center;
                        background-size: 34/2px;
                    }
                    .btn-slideUp{
                        float: right;
                        display: block;
                        width: 36px;
                        height: 86/2px;
                        overflow: hidden;
                        background:url("../../assets/img/luckyPoker/icon-bottom.png") no-repeat right center;
                        background-size: 36/2px;
                    }
                }
                .random-main{
                    .title{
                        padding-top: 20/2px;
                        line-height: 46/2px;
                        text-align: left;
                        font-size: 28/2px;
                    }
                    .input-group{
                        display: flex;
                        height: 84/2px;
                        line-height: 84/2px;
                        border-radius: 8/2px;
                        overflow: hidden;
                        input{
                            flex: 1;
                            background: #213746;
                            border: none;
                            outline: none;
                            text-indent: 5px;
                            font-size: 11px;
                        }
                        .btn{
                            display: block;
                            border-left: 1px solid #213746;
                            background: #29c2bd;
                            font-size: 28/2px;
                            color: #fff;
                            font-weight: bold;
                            &.btn-random{
                                width: percentage(200/640);
                            }
                            &.btn-lock{
                                width: percentage(140/640);
                            }
                        }
                    }
                }
            }
            /*投注记录*/
            .recording{
                padding-top: 22/2px;
                margin: 32/2px auto 0px;
                border-radius: 6px;
                overflow: hidden;
                .recording-top{
                    padding: 0 percentage(25/690);
                    line-height: 70/2px;
                    a{
                        font-size: 12px;
                        &::before{
                            margin-right: 9px;
                            width: 21px;
                            height: 19px;
                            background: url("../../assets/img/luckyPoker/icon-all.png") no-repeat left top ;
                            background-size: 21px;
                        }
                        &.on{
                            &::before{
                                background: url("../../assets/img/luckyPoker/icon-my.png") no-repeat left top ;
                                background-size: 21px;
                            }
                        }
                    }
                }
                .recording-table{
                    .top{
                        padding: 0 percentage(25/690);
                        line-height: 82/2px;
                        font-size: 24/2px;
                    }
                    .recoding-main{
                        li{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            position: relative;
                            height: 98/2px;
                            line-height: 68/2px;
                            padding: 15/2px percentage(25/690);
                            background: #253e4e;
                            font-size: 12px;
                            .bet-user{
                                float: left;
                                /*小手机看不到缩小这里*/
                                width: percentage(100/690);
                                .text-overflow();
                            }
                            .bet-expect{
                                width: 68/2px;
                                height: 68/2px;
                                line-height: 68/2px;
                                font-family: Lucida Bright,LBRITE;
                                font-weight: bold;
                                text-transform: uppercase;
                                text-align: center;
                                &.number{
                                    font-size: 15px;
                                    color: #fff;
                                }
                                &.black{
                                    font-size: 8px;
                                    color: #000;
                                }
                                &.red{
                                    font-size: 8px;
                                    color: #fe3b3b;
                                }
                                &.fk,&.hongt,&.heit,&.mh{
                                    background-repeat: no-repeat;
                                    background-position: center;
                                    background-size: percentage(30/68);
                                    text-indent: -99999px;
                                }
                                &.fk{
                                    background-image:url("../../assets/img/luckyPoker/icon-fk.png");
                                }
                                &.hongt{
                                    background-image:url("../../assets/img/luckyPoker/icon-hongt.png");
                                }
                                &.heit{
                                    background-image:url("../../assets/img/luckyPoker/icon-heit.png");
                                }
                                &.mh{
                                    background-image:url("../../assets/img/luckyPoker/icon-mh.png");
                                }
                                &.joker{
                                    background-image:url("../../assets/img/luckyPoker/font-joker.png");
                                    background-repeat: no-repeat;
                                    background-position: center;
                                    background-size: contain;
                                }
                            }
                            .bet-count{
                                i{
                                    font-size: 10px;
                                }
                            }
                            .bet-result-count{
                                text-align: right;
                                width: 78px;
                                height: 100%;
                                overflow: hidden;
                                i{
                                    font-size: 10px;
                                }
                                &.mywin{
                                    color: #20bf6b;
                                    font-weight: bold;
                                }
                            }
                            .bet-result{
                                width: 40/2px;
                                height: 60/2px;
                                overflow: hidden;
                                border-radius: 4px;
                                background: #fff;
                                font-family: Lucida Bright,LBRITE;
                                p{
                                    line-height: 30/2px;
                                    font-size: 24/2px;
                                    font-weight: bold;
                                }
                                &::after{
                                    content: '';
                                    display: block;
                                    width: percentage(24/40);
                                    height: 30/2px;
                                    overflow: hidden;
                                    margin: 0 auto;
                                }
                                &.icon-hongt{
                                    color: #cc3333;
                                    &::after{
                                        background:url("../../assets/img/luckyPoker/icon-hongt.png") no-repeat center top;
                                        background-size: contain;
                                    }

                                }
                                &.icon-fk{
                                    color: #cc3333;
                                    &::after{
                                        background:url("../../assets/img/luckyPoker/icon-fk.png") no-repeat center top;
                                        background-size: contain;
                                    }
                                }
                                &.icon-mh{
                                    color: #000000;
                                    &::after{
                                        background:url("../../assets/img/luckyPoker/icon-mh.png") no-repeat center top;
                                        background-size: contain;
                                    }
                                }
                                &.icon-heit{
                                    color: #000000;
                                    &::after{
                                        background:url("../../assets/img/luckyPoker/icon-heit.png") no-repeat center top;
                                        background-size: contain;
                                    }
                                }
                                &.joker{
                                    &::after{
                                        width: 100%;
                                        height: 100%;
                                        background:url("../../assets/img/luckyPoker/font-joker.png") no-repeat center top;
                                        background-size: cover;
                                    }
                                    p{
                                        display: none;
                                    }
                                }
                            }
                            &:nth-child(2n){
                                background: #294557;
                            }
                        }
                    }
                }
            }
            /*pop*/
            .pop-random{
                .btn-close{

                }
                .pop-body{
                    width: 100%;
                }
                .pop-main{
                    padding: 0;
                    background: #213746;
                }
                h2{
                    height: 70px;
                    line-height: 64px;
                    font-size: 16px;
                    color: #fff;
                    font-weight: bold;
                }
                .tab-h{
                    line-height: 52px;
                    li{
                        float: left;
                        height: 100%;
                        width: 100%;
                        overflow: hidden;
                        .text-overflow();
                        display: none;
                        a{
                            display: block;
                            width: 100%;
                            height: 100%;
                            color: #72a1a8;
                            font-size: 18px;
                        }
                        &.on{
                            a{
                                border-top-left-radius: 8px;
                                border-top-right-radius: 8px;
                                background: #294557;
                                color: #fff;
                            }
                        }
                    }
                }
                .tab-c{
                    padding: 0 26px 32px;
                    background: #294557;
                    color: #fff;
                    .title{
                        padding-top: 10px;
                        line-height: 23px;
                        text-align: left;
                        font-size: 14px;
                        font-weight: bold;
                    }
                    .input-group{
                        display: flex;
                        height: 42px;
                        line-height: 42px;
                        border-radius: 6px;
                        overflow: hidden;
                        input{
                            padding: 0;
                            height: 42px;
                            line-height: 42px;
                            flex: 1;
                            background: #213746;
                            border: none;
                            outline: none;
                            text-indent: 12px;
                            font-size: 16px;
                        }
                        .btn{
                            display: block;
                            border-left: 1px solid #213746;
                            background: #4a8282;
                            font-size: 18px;
                            color: #fff;
                            font-weight: bold;
                            &.btn-random{
                                width: percentage(200/640);
                            }
                            &.btn-lock{
                                width: percentage(140/640);
                                filter: brightness(0.8);
                            }
                            &.btn-unlock{
                                filter: brightness(1);
                            }
                        }
                    }
                    .btn-check{
                        display: block;
                        width: 275px;
                        height: 40px;
                        overflow: hidden;
                        background: #29c2bd;
                        border-radius: 6px;
                        line-height: 40px;
                        font-size: 14px;
                        color: #fff;
                        font-weight: bold;
                        margin: 30px auto 0;
                    }
                }
            }
            .pop-poker {
                .poker-area {
                    width: percentage(212/750);
                    padding-top: 50%;
                    /*margin: 145px auto 110px;*/
                    margin: 0 auto 50px;
                }
                .result-box {
                    width: percentage(340/750);
                    padding-top: percentage(500/750);
                }
            }
        }
    }
    @media (min-width: 1106px) {
        .luckyPoker{
            background:#1b262c url("../../assets/img/luckyPoker/bg-pc.jpg") no-repeat center top;
            background-size: 1920px;
            .main{
                position: relative;
                width: 1107px;
                padding-right: 31px;
                margin: 0 auto;
                overflow: hidden;
            }
            .bg-pc-esktop{
                position: relative;
                float: left;
                z-index: 2;
                width: 100%;
                max-width: 612px;
                padding: 52px 85px 0;
                height: 826px;
                font-weight: bold;
                background: url("../../assets/img/luckyPoker/bg-pc-desktop.png") no-repeat center top;
                background-size: 612px;
            }
            .poker-prize{
                top: -24/2px;
                border: 2px solid #6faeae;
                border-radius: 8px;
                padding: 0 12px;
                height: 24px;
                line-height: 20px;
                font-size: 14px;
                i{
                    font-size: 12px;
                }
            }
            .poker-time{
                height:33px;
                line-height: 20px;
                font-size: 16px;
            }
            /*投注区*/
            .area-betting{
                .bet-rb{
                    width: 290px;
                    ul{
                        border-radius: 8px;
                        border: 2px solid #6faeae;
                        height: 87px;
                    }
                    li{
                        line-height: 83px;
                        font-size: 24px;
                        &+li{
                            border-left: 2px solid #6faeae;
                        }
                    }
                }
                .bet-joker{
                    width: 144px;
                    li{
                        height: 87px;
                        border-radius: 8px;
                        line-height: 83px;
                        border: 2px solid #6faeae;
                        p{
                            font-size: 24px;
                        }
                    }
                }
                .bet-color{
                    ul{
                        border: 2px solid #6faeae;
                        border-radius: 8px;
                    }
                    li{
                        height: 87px;
                        cursor: pointer;
                        img{
                            width: percentage(53/170);
                        }
                    }
                    li+li{
                        border-left: 2px solid #6faeae;
                    }
                }
                .bet-number{
                    ul{
                        li{
                            height: 74px;
                            line-height: 72px;
                            border-bottom: 2px solid #6faeae;
                            border-right: 2px solid #6faeae;
                            font-size: 26px;
                        }
                        &.item1{
                            border-left: 2px solid #6faeae;
                            border-top: 2px solid #6faeae;
                            border-radius: 8px;
                        }
                        &.item2{
                            border-left: 2px solid transparent;
                            border-bottom: 2px solid transparent;
                            li{
                                &:first-child{
                                    border-bottom-left-radius: 8px;
                                    border-left: 2px solid #6faeae;
                                }
                                &:last-child{
                                    border-bottom-right-radius: 8px;
                                }
                            }
                        }
                    }
                    .btn-cls{
                        width: 50px;
                        height: 50px;
                        border-radius: 8px;
                        font-size: 16px;
                        a{
                            &::before{
                                margin: 4px auto 0;
                                width: 19px;
                                height: 23px;
                                padding-top: 0;
                                background-size: 100%;
                            }
                        }
                    }
                }
            }
            /*按钮区*/
            .area-btn{
                margin: 16px auto 0;
                ul{
                    justify-content: center;
                    li{
                        width: 58px;
                        margin: 0 14px;
                        p{
                            bottom:0;
                            min-width: 65px;
                            height: 24px;
                            border-radius: 12px;
                            line-height: 24px;
                            font-size: 18px;
                        }
                    }
                    li.on{
                        &::before{
                            transform: translate(-50%,-50%) scale(1);
                            box-shadow: 0 0 30px rgba(0,255,234,1);
                        }
                    }
                }
                .btn-main{
                    width: 210px;
                    height: 63px;
                    margin: 28px auto 0;
                    border-radius: 8px;
                    box-shadow: 0 7px 0 #2b7876;
                    p{
                        line-height: 28px;
                        font-size: 26px;
                        text-shadow: 0 2px #2b7b75, 2px 0 #2b7b75, -2px 0 #2b7b75, 0 -2px #2b7b75;
                    }
                    span{
                        line-height: 20px;
                        font-size: 18px;
                        i{
                            font-size: 14px;
                        }
                    }
                }
            }
            /*历史开奖*/
            .poker-history{
                float: right;
                width: 455px;
                height: 144px;
                margin-top: 17px;
                background: #294557;
                border-radius: 6px;
                .title{
                    display: block;
                    height: 72px;
                    line-height: 66px;
                    text-indent: 23px;
                    text-align: left;
                    font-size: 16px;
                    font-weight: bold;
                    color: #fff;
                }
                .btn{
                    width: 40px;
                    &:hover{
                        filter: brightness(1.3);
                    }
                }
                .btn-left{
                    background-size: 16px;
                }
                .btn-right{
                    background-size: 16px;
                }
            }
            /*投注记录*/
            .recording{
                position: absolute;
                right: 31px;
                bottom: 130px;
                max-width: 455px;
                padding-top: 2px;
                margin: 25px auto 0;
                border-radius: 8px;
                .recording-top{
                    padding: 0 27px;
                    line-height: 80px;
                    a{
                        font-size: 14px;
                        &::before{
                            margin-right: 9px;
                            width: 21px;
                            height: 19px;
                            background: url("../../assets/img/luckyPoker/icon-all.png") no-repeat left top ;
                            background-size: 21px;
                        }
                        &.on{
                            &::before{
                                background: url("../../assets/img/luckyPoker/icon-my.png") no-repeat left top ;
                                background-size: 21px;
                            }
                        }
                        &:hover{
                            color: #a2dede;
                        }
                    }
                }
                .recording-table{
                    .top{
                        padding: 0 20px;
                        line-height: 46px;
                        font-size: 14px;
                    }
                    .recoding-main{
                        margin: 0 10px;
                        li{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            position: relative;
                            height: 53px;
                            line-height: 53px;
                            padding: 0 10px;
                            background: #253e4e;
                            font-size: 14px;
                            .bet-user{
                                /*小手机看不到缩小这里*/
                                width: 62px;
                                .text-overflow();
                            }
                            .bet-expect{
                                width: 42px;
                                height: 40px;
                                line-height: 40px;
                                font-family: Lucida Bright,LBRITE;
                                font-weight: bold;
                                text-transform: uppercase;
                                &.number{
                                    font-size: 15px;
                                    color: #fff;
                                }
                                &.black{
                                    font-size: 8px;
                                    color: #000;
                                }
                                &.red{
                                    font-size: 8px;
                                    color: #fe3b3b;
                                }
                                &.fk,&.hongt,&.heit,&.mh{
                                    background-repeat: no-repeat;
                                    background-position: center;
                                    background-size: percentage(30/68);
                                    text-indent: -99999px;
                                }
                                &.fk{
                                    background-image:url("../../assets/img/luckyPoker/icon-fk.png");
                                }
                                &.hongt{
                                    background-image:url("../../assets/img/luckyPoker/icon-hongt.png");
                                }
                                &.heit{
                                    background-image:url("../../assets/img/luckyPoker/icon-heit.png");
                                }
                                &.mh{
                                    background-image:url("../../assets/img/luckyPoker/icon-mh.png");
                                }
                                &.joker{
                                    background-image:url("../../assets/img/luckyPoker/font-joker.png");
                                    background-repeat: no-repeat;
                                    background-position: center;
                                    background-size: contain;
                                }
                            }
                            .bet-count{
                                width: 82px;
                                i{
                                    font-size: 12px;
                                }
                            }
                            .bet-result-count{
                                text-align: right;
                                width: 83px;
                                height: 100%;
                                overflow: hidden;
                                i{
                                    font-size: 12px;
                                }
                                &.mywin{
                                    color: #20bf6b;
                                    font-weight: bold;
                                }
                            }
                            .bet-result{
                                width: 40/2px;
                                height: 60/2px;
                                overflow: hidden;
                                border-radius: 4px;
                                background: #fff;
                                font-family: Lucida Bright,LBRITE;
                                p{
                                    line-height: 30/2px;
                                    font-size: 24/2px;
                                    font-weight: bold;
                                }
                                &::after{
                                    content: '';
                                    display: block;
                                    width: percentage(24/40);
                                    height: 30/2px;
                                    overflow: hidden;
                                    margin: 0 auto;
                                }
                                &.icon-hongt{
                                    color: #cc3333;
                                    &::after{
                                        background:url("../../assets/img/luckyPoker/icon-hongt.png") no-repeat center top;
                                        background-size: contain;
                                    }

                                }
                                &.icon-fk{
                                    color: #cc3333;
                                    &::after{
                                        background:url("../../assets/img/luckyPoker/icon-fk.png") no-repeat center top;
                                        background-size: contain;
                                    }
                                }
                                &.icon-mh{
                                    color: #000000;
                                    &::after{
                                        background:url("../../assets/img/luckyPoker/icon-mh.png") no-repeat center top;
                                        background-size: contain;
                                    }
                                }
                                &.icon-heit{
                                    color: #000000;
                                    &::after{
                                        background:url("../../assets/img/luckyPoker/icon-heit.png") no-repeat center top;
                                        background-size: contain;
                                    }
                                }
                                &.joker{
                                    &::after{
                                        width: 100%;
                                        height: 100%;
                                        background:url("../../assets/img/luckyPoker/font-joker.png") no-repeat center top;
                                        background-size: cover;
                                    }
                                    p{
                                        display: none;
                                    }
                                }
                            }
                            &:nth-child(2n){
                                background: #294557;
                            }
                        }
                    }
                }
                /*pc----*/
                .pc-verification{
                    display: block;
                    height: 84px;
                    margin-top: 33px;
                    padding: 0 27px;
                    background: #253e4e;
                    display: flex;
                    align-items: center;
                    border-bottom-left-radius: 8px;
                    border-bottom-right-radius: 8px;
                    .btn-href{
                        font-size: 14px;
                        color: #fff;
                        text-decoration: underline;
                        &:hover{
                            color: #6fa4a3;
                        }
                    }
                    .btn-question{
                        position: relative;
                        width: 19px;
                        height: 19px;
                        /*overflow: hidden;*/
                        margin-left: 12px;
                        background: url("../../assets/img/luckyPoker/icon-help.png") no-repeat center ;
                        background-size: cover;
                        &:hover{
                            div{
                                display: block;
                            }
                        }
                        div{
                            display: none;
                            position: absolute;
                            left: -119px;
                            top: -185px;
                            width: 434px;
                            padding: 25px 18px 30px;
                            background: #fff;
                            border-radius: 8px;
                            border-bottom: 30px solid transparent;
                            background-clip: padding-box;
                            &::after{
                                content: '';
                                position: absolute;
                                bottom: -10px;
                                left: 118px;
                                display: block;
                                width: 0;
                                height: 0;
                                border-top: 10px solid #fff;
                                border-left: 10px solid transparent;
                                border-right: 10px solid transparent;
                            }
                            p{
                                height: 22px;
                                line-height: 22px;
                                font-size: 14px;
                                color: #72a1a8;
                                font-weight: bold;
                                text-align: left;
                            }
                        }
                    }
                }
            }
            /*pop*/
            .pop-random{
                .btn-close{
                    &:hover{
                        background: rgba(245,245,245,0.1);
                    }
                }
                .pop-body{
                    width: 727px;
                }
                .pop-main{
                    padding: 0;
                    background: #213746;
                }
                h2{
                    height: 70px;
                    line-height: 64px;
                    font-size: 24px;
                    color: #fff;
                    font-weight: bold;
                }
                .tab-h{
                    height: 52px;
                    line-height: 52px;
                    li{
                        float: left;
                        height: 100%;
                        width: 50%;
                        overflow: hidden;
                        .text-overflow();
                        a{
                            display: block;
                            width: 100%;
                            height: 100%;
                            color: #72a1a8;
                            font-size: 18px;
                        }
                        &.on{
                            a{
                                border-top-left-radius: 8px;
                                border-top-right-radius: 8px;
                                background: #294557;
                                color: #fff;
                            }
                        }
                    }
                }
                .tab-c{
                    padding: 0 26px 32px;
                    background: #294557;
                    color: #fff;
                    .title{
                        padding-top: 17px;
                        line-height: 43px;
                        text-align: left;
                        font-size: 20px;
                        font-weight: bold;
                    }
                    .input-group{
                        display: flex;
                        height: 65px;
                        line-height: 65px;
                        border-radius: 8px;
                        overflow: hidden;
                        input{
                            padding: 0;
                            height: 65px;
                            line-height: 65px;
                            flex: 1;
                            background: #213746;
                            border: none;
                            outline: none;
                            text-indent: 12px;
                            font-size: 16px;
                        }
                        .btn{
                            display: block;
                            border-left: 1px solid #213746;
                            background: #3e9999;
                            font-size: 18px;
                            color: #fff;
                            font-weight: bold;
                            &.btn-random{
                                width: percentage(200/640);
                            }
                            &.btn-lock{
                                width: percentage(140/640);
                                filter: brightness(0.8);
                            }
                            &.btn-unlock{
                                filter: brightness(1);
                            }
                        }
                    }
                    .btn-check{
                        display: block;
                        width: 275px;
                        height: 60px;
                        overflow: hidden;
                        background: #29c2bd;
                        border-radius: 8px;
                        line-height: 60px;
                        font-size: 24px;
                        color: #fff;
                        font-weight: bold;
                        margin: 50px auto 0;
                        &:hover{
                            background: #1fa7a3;
                        }
                    }
                }
            }
            .pop-poker {
                .poker-area {
                    width: 140px;
                    height: 280px;
                    /*margin: 50px auto 30px;*/
                    margin: 0 auto 30px;
                }
                .result-box {
                    max-width: 210px;
                    padding-top: 0;
                    height: 300px;
                }
            }
        }
    }
    .setPokerPosition( @count )when( @count > 0 ){
        li:nth-child(@{count}){
            transform: translate(-50%,13px * @count);
            z-index: 43-@count;
        }
        .setPokerPosition((@count - 1));
    }
</style>
