<template>
    <!--bg1 bg2 bg3-->
    <div class="home" :class="bghome">
        <Header></Header>
        <div class="main" @click="initPop">
            <div class="container">
                <div class="row clearfix">
                    <div class="col-xs-12">
                        <!--banner-->
                        <el-carousel :interval="5000" @change="bgchange">
                            <el-carousel-item>
                                <router-link to="/superCoin" class="banner-superCoin" style="display: block;">
                                    <div class="banner-superCoin-t1">
                                        <lang>SUPERCOIN</lang>
                                    </div>
                                    <p class="banner-superCoin-t2" v-lang="'Win 10 ETH Prize Pool<br>Every 2 Hours'">
                                    </p>
                                    <p class="btn-superCoin" v-lang="'Attractive Prize Pool.&nbsp;&nbsp;Buy Sooner, Earn Higher >>'">
                                    </p>
                                </router-link>
                            </el-carousel-item>
                            <el-carousel-item>
                                <div class="banner-t1">
                                    <lang>50% Top-Up Bonus</lang>
                                </div>
                                <!--visible-md visible-lg-->
                                <p class="banner-t11 ">
                                    <lang>More top-up, more bonus</lang>
                                </p>
                                <router-link to="/firstCharge" class="banner-firstCharge">
                                    <lang>Get Bonus</lang>
                                </router-link>
                            </el-carousel-item>
                            <el-carousel-item>
                                <div class="banner-t1">
                                    <lang>The blockchain-based game platform</lang>
                                </div>
                                <p class="banner-t11">
                                    <lang>Unique play & transparent draw, only for your terrific experience in games</lang>
                                    <!--with fairness and openness-->
                                </p>
                                <p class="banner-t2">
                                </p>
                                <a v-if="!isLog" href="javascript:;" class="banner-more" @click="onSignUp()">
                                    <lang>Sign up now</lang>
                                </a>
                                <router-link v-else to="/check" class="banner-more">
                                    <lang>Details </lang>
                                </router-link>
                            </el-carousel-item>

                        </el-carousel>
                    </div>
                </div>
                <div class=" clearfix items-game ">
                    <a href="javascropt:;" class="game-change game-change-pre" @click="gamePre">pre</a>
                    <!--各种游戏宣传图-->
                    <div class="game_list_pc">
                        <div class="game_list clearfix" :style="{width:gameLength*gameWidth+(gameLength-1)*30+'px',left:gameLeft}" ref="gameList">
                            <!-- col-xs-12 col-md-4 -->
                            <div class="">
                                <div class="for-full">
                                    <router-link :to="{path: '/supercoin'}" class="game-supercoin">
                                        <p class="msg1">
                                            <lang>SuperCoin</lang>
                                        </p>
                                        <p class="msg2">
                                            <lang>Win 10 ETH Prize Pool Every 2 Hours</lang>
                                        </p>
                                        <p class="msg3">
                                            <lang>Prize Pool</lang>
                                        </p>
                                        <p class="msg4">
                                            <span>{{formatNum(Number(roundInfo.jackpot), 4)}}</span>
                                            <i>&nbsp;ETH</i>
                                        </p>
                                        <p class="msg5">
                                            {{formatUSD(entrance.megacoin.USD, Number(roundInfo.jackpot))}} USD
                                        </p>
                                        <div class="game-btn">
                                            <lang>Play Now </lang>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                            <div class="">
                                <div class="for-full">
                                    <router-link :to="{path: '/luckyPoker'}" class="game-poker">
                                        <p class="msg1">
                                            {{$lang.poker.a39}}
                                        </p>
                                        <p class="msg2">
                                            <lang>Classic game with high reward</lang>
                                        </p>
                                        <p class="msg2" v-html="_('Win <i class=bold>98%+</i> Return Rate')">
                                        </p>
                                        <p style="height:101px"></p>
                                        <div class="game-btn">
                                            <lang>Play Now </lang>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                            <div class="">
                                <div class="for-full">
                                    <router-link :to="{path: '/luckySlot'}" class="game-slot">
                                        <p class="msg1">
                                            <lang>LuckySlot</lang>
                                        </p>
                                        <p class="msg2">
                                            <lang>Win 97%+ Return Rate</lang>
                                        </p>
                                        <p class="msg3">
                                            <lang>Jackpot</lang>
                                        </p>
                                        <p class="msg4">
                                            <span>{{formatNum(Number(entrance.slot.jackpot), 4)}}</span>
                                            <i>&nbsp;{{formateCoinType(entrance.slot.cointype)}}</i>
                                        </p>
                                        <p class="msg5">{{formatUSD(entrance.slot.USD, entrance.slot.jackpot)}} USD</p>
                                        <div class="game-btn">
                                            <lang>Play Now </lang>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                            <div class="">
                                <div class="for-full">
                                    <router-link :to="{path: '/luckycoin/'}" class="game-onecoin">
                                        <p class="msg1">
                                            <lang>LuckyCoin</lang>
                                        </p>
                                        <p class="msg2">
                                            <lang>Bid 0.01 ETH to win more</lang>
                                        </p>
                                        <p class="msg3">
                                            <lang>Instant Reward</lang>
                                        </p>
                                        <p class="msg4">
                                            <span>{{formatNum(Number(entrance.megacoin.goodsvalue), 4)}}</span>
                                            <i>&nbsp;{{formateCoinType(entrance.megacoin.cointype)}}</i>
                                        </p>
                                        <p class="msg5">{{formatUSD(entrance.megacoin.USD, entrance.megacoin.goodsvalue)}} USD</p>
                                        <div class="game-btn">
                                            <lang>Play Now </lang>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                            <div class="">
                                <div class="for-full">
                                    <router-link :to="{path: '/lucky11'}" class="game-11t5">
                                        <p class="msg1">
                                            <lang>Lucky11</lang>
                                        </p>
                                        <p class="msg2">
                                            <lang>Classic game with high reward</lang>
                                        </p>
                                        <p class="msg3">
                                            <lang>Jackpot </lang>
                                        </p>
                                        <p class="msg4">
                                            <span>{{formatNum(Number(entrance.syxw.jackpot), 4)}}</span>
                                            <i>&nbsp;{{formateCoinType(entrance.syxw.cointype)}}</i>
                                        </p>
                                        <p class="msg5">{{formatUSD(entrance.syxw.USD, entrance.syxw.jackpot)}} USD</p>
                                        <div class="game-btn">
                                            <lang>Play Now </lang>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="javascropt:;" class="game-change game-change-next" @click="gameNext">next</a>
                </div>
            </div>
        </div>
        <div class="items-msg ">
            <div class="msg-container container">
                <div class="msg-row row">
                    <!--最近下注-->
                    <div class="item-recent recent-bet">
                        <div class="recent-t">
                            <lang>Recent Bids</lang>
                        </div>
                        <div class="tab-t" :class="[activeClass]">
                            <a href="javascript:;" class="luckypoker" @click="activeClass = 'luckypoker'" v-if="gameIndex === 0 || gameIndex === 1">
                                {{$lang.poker.a39}}
                            </a>
                            <a href="javascript:;" class="slot" @click="activeClass = 'slot'">
                                <lang>LuckySlot</lang>
                            </a>
                            <a href="javascript:;" class="luckycoin" @click="activeClass = 'luckycoin'" v-if="gameIndex === 1 || gameIndex === 2">
                                <lang>LuckyCoin</lang>
                            </a>
                            <a href="javascript:;" class="lucky11" @click="activeClass = 'lucky11'" v-if="gameIndex === 2">
                                <lang>Lucky11</lang>
                            </a>
                        </div>
                        <div class="tab-c">
                            <div class="tab-t2">
                                <div class="is-left">
                                    <lang>User ID</lang>
                                </div>
                                <div>
                                    <lang>Date</lang>
                                </div>
                                <div class="is-right">
                                    <lang>Amount</lang>
                                </div>
                            </div>
                            <ul v-if="activeClass === 'luckypoker'">
                                <li v-for="(bet, index) in bets.dice_orders.slice(0, 5)" :key="index">
                                    <div class="user">
                                        {{bet.uid}}
                                    </div>
                                    <div class="time">
                                        {{formatTime(bet.crtime, 'MM-dd HH:mm')}}
                                    </div>
                                    <div class="amount" :class="[getCoinClass(bet.cointype)]">
                                        <i></i>
                                        <span>{{formatMoney(bet.betmoney)}}</span>
                                    </div>
                                </li>
                            </ul>
                            <ul v-if="activeClass === 'slot'">
                                <li v-for="(bet, index) in bets.slot_orders.slice(0, 5)" :key="index">
                                    <div class="user">
                                        {{bet.uid}}
                                    </div>
                                    <div class="time">
                                        {{formatTime(bet.crtime, 'MM-dd HH:mm')}}
                                    </div>
                                    <div class="amount" :class="[getCoinClass(bet.cointype)]">
                                        <i></i>
                                        <span>{{formatMoney(bet.betmoney)}}</span>
                                    </div>
                                </li>
                            </ul>
                            <ul v-if="activeClass === 'luckycoin'">
                                <li v-for="(bet, index) in bets.megacoin_orders.slice(0, 5)" :key="index">
                                    <div class="user">
                                        {{bet.uid}}
                                    </div>
                                    <div class="time">
                                        {{formatTime(bet.crtime, 'MM-dd HH:mm')}}
                                    </div>
                                    <div class="amount" :class="[getCoinClass(bet.cointype)]">
                                        <i></i>
                                        <span>{{formatMoney(bet.betmoney)}}</span>
                                    </div>
                                </li>
                            </ul>
                            <ul v-if="activeClass === 'lucky11'">
                                <li v-for="(bet, index) in bets.syxw_orders.slice(0, 5)" :key="index">
                                    <div class="user">
                                        {{bet.uid}}
                                    </div>
                                    <div class="time">
                                        {{formatTime(bet.crtime, 'MM-dd HH:mm')}}
                                    </div>
                                    <div class="amount" :class="[getCoinClass(bet.cointype)]">
                                        <i></i>
                                        <span>{{formatMoney(bet.betmoney)}}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--最近中奖-->
                    <div class="item-recent recent-win">
                        <div class="recent-t">
                            <lang>Recent Wins</lang>
                        </div>
                        <div class="tab-t" :class="[activeClass1]">
                            <a href="javascript:;" class="luckypoker" @click="activeClass1 = 'luckypoker'" v-if="gameIndex === 0 || gameIndex === 1">
                                {{$lang.poker.a39}}
                            </a>
                            <a href="javascript:;" class="slot" @click="activeClass1 = 'slot'">
                                <lang>LuckySlot</lang>
                            </a>
                            <a href="javascript:;" class="luckycoin" @click="activeClass1 = 'luckycoin'" v-if="gameIndex === 1 || gameIndex === 2">
                                <lang>LuckyCoin</lang>
                            </a>
                            <a href="javascript:;" class="lucky11" @click="activeClass1 = 'lucky11'" v-if="gameIndex === 2">
                                <lang>Lucky11</lang>
                            </a>
                        </div>
                        <div class="tab-c">
                            <div class="tab-t2">
                                <div class="is-left">
                                    <lang>User ID</lang>
                                </div>
                                <div>
                                    <lang>Date</lang>
                                </div>
                                <div class="is-right">
                                    <lang>Amount</lang>
                                </div>
                            </div>
                            <ul v-if="activeClass1 === 'luckypoker'">
                                <li v-for="(bet, index) in wins.dice_orders.slice(0, 5)" :key="index">
                                    <div class="user">
                                        {{bet.uid}}
                                    </div>
                                    <div class="time">
                                        {{formatTime(bet.drawtime, 'MM-dd HH:mm')}}
                                    </div>
                                    <div class="amount" :class="[getCoinClass(bet.cointype)]">
                                        <i></i>
                                        <span>+{{formatMoney(bet.betprize)}}</span>
                                    </div>
                                </li>
                            </ul>
                            <ul v-if="activeClass1 === 'lucky11'">
                                <li v-for="(bet, index) in wins.syxw_orders.slice(0, 5)" :key="index">
                                    <div class="user">
                                        {{bet.uid}}
                                    </div>
                                    <div class="time">
                                        {{formatTime(bet.drawtime, 'MM-dd HH:mm')}}
                                    </div>
                                    <div class="amount" :class="[getCoinClass(bet.cointype)]">
                                        <i></i>
                                        <span>+{{formatMoney(bet.betprize)}}</span>
                                    </div>
                                </li>
                            </ul>
                            <ul v-if="activeClass1 === 'slot'">
                                <li v-for="(bet, index) in wins.slot_orders.slice(0, 5)" :key="index">
                                    <div class="user">
                                        {{bet.uid}}
                                    </div>
                                    <div class="time">
                                        {{formatTime(bet.drawtime, 'MM-dd HH:mm')}}
                                    </div>
                                    <div class="amount" :class="[getCoinClass(bet.cointype)]">
                                        <i></i>
                                        <span>+{{formatMoney(bet.betprize)}}</span>
                                    </div>
                                </li>
                            </ul>
                            <ul v-if="activeClass1 === 'luckycoin'">
                                <li v-for="(bet, index) in wins.megacoin_orders.slice(0, 5)" :key="index">
                                    <div class="user">
                                        {{bet.uid}}
                                    </div>
                                    <div class="time">
                                        {{formatTime(bet.drawtime, 'MM-dd HH:mm')}}
                                    </div>
                                    <div class="amount" :class="[getCoinClass(bet.cointype)]">
                                        <i></i>
                                        <span>+{{formatMoney(bet.betprize)}}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--最近流水-->
                    <div class="item-recent recent-water">
                        <div class="recent-t">
                            <lang>Recent Transfer</lang>
                        </div>
                        <div class="tab-t" :class="activeClass2">
                            <a href="javascript:;" class="recharge" @click="activeClass2 = 'recharge'">
                                <lang>Top Up</lang>
                            </a>
                            <a href="javascript:;" class="withdraw" @click="activeClass2 = 'withdraw'">
                                <lang>Withdraw</lang>
                            </a>
                        </div>
                        <div class="tab-c">
                            <div class="tab-t2">
                                <div class="is-left">
                                    <lang>Address</lang>
                                </div>
                                <div>
                                    <lang>User ID</lang>
                                </div>
                                <div>
                                    <lang>Date</lang>
                                </div>
                                <div class="is-right">
                                    <lang>Amount</lang>
                                </div>
                            </div>
                            <ul v-if="activeClass2 === 'recharge'">
                                <li v-for="(bet, index) in water.recharge_orders.slice(0, 5)" :key="index">
                                    <div class="add">
                                        <a :href="`https://etherscan.io/address/${bet.address}`" :title="bet.address" target="_blank" v-if="bet.cointype === '2001'">{{bet.address}}</a>
                                        <a :href="`https://www.blockchain.com/en/btc/address/${bet.address}`" :title="bet.address" target="_blank" v-else>{{bet.address}}</a>
                                    </div>
                                    <div class="id">
                                        {{bet.uid}}
                                    </div>
                                    <div class="time">
                                        {{formatTime(bet.crtime, 'MM-dd HH:mm')}}
                                    </div>
                                    <div class="amount" :class="[getCoinClass(bet.cointype)]">
                                        <i></i>
                                        <span>{{formatMoney(bet.rechargemoney)}}</span>
                                    </div>
                                </li>
                            </ul>
                            <ul v-if="activeClass2 === 'withdraw'">
                                <li v-for="(bet, index) in water.withdraw_orders.slice(0, 5)" :key="index">
                                    <div class="add">
                                        <a :href="`https://etherscan.io/address/${bet.address}`" :title="bet.address" target="_blank" v-if="bet.cointype === '2001'">{{bet.address}}</a>
                                        <a :href="`https://www.blockchain.com/en/btc/address/${bet.address}`" :title="bet.address" target="_blank" v-else>{{bet.address}}</a>
                                    </div>
                                    <div class="id">
                                        {{bet.uid}}
                                    </div>
                                    <div class="time">
                                        {{formatTime(bet.crtime, 'MM-dd HH:mm')}}
                                    </div>
                                    <div class="amount" :class="[getCoinClass(bet.cointype)]">
                                        <i></i>
                                        <span>{{formatMoney(bet.drawmoney)}}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="safe-msg ">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="img-box img-box1">
                            <img class="img3" src="@/assets/img/home/safe-img1-3.png" alt="">
                            <img class="img2" src="@/assets/img/home/safe-img1-2.png" alt="">
                            <img class="img1" src="@/assets/img/home/safe-img1-1.png" alt="">
                        </div>
                        <div class="safe-t">
                            <lang>Open, Fair, Transparent</lang>
                        </div>
                        <p>
                            <lang>Blockchain-based draw is unpredictable</lang>
                        </p>
                        <p>
                            <!-- <lang>Bid information on blockchain cannot be modified</lang> -->
                        </p>
                        <router-link :to="{path: '/check'}" class="btn-check">
                            <lang>Details</lang>
                        </router-link>
                    </div>
                    <div class="col-lg-4">
                        <div class="img-box img-box2">
                            <img class="img3" src="@/assets/img/home/safe-img2-3.png" alt="">
                            <img class="img2" src="@/assets/img/home/safe-img2-2.png" alt="">
                            <img class="img1" src="@/assets/img/home/safe-img2-1.png" alt="">
                        </div>
                        <div class="safe-t">
                            <lang>Support ETH and BTC</lang>
                        </div>
                        <p>
                            <lang>Currently, popular coins ETH and BTC are supported on the platform to play, top up and withdraw. More coins will be supported in the near future.</lang>
                        </p>
                    </div>
                    <div class="col-lg-4">
                        <div class="img-box img-box3">
                            <div class="circle-box">
                                <div class="circle circle1"></div>
                                <div class="circle circle2"></div>
                                <div class="circle circle3"></div>
                            </div>
                        </div>
                        <div class="safe-t">
                            <lang>Support Mobile APP</lang>
                        </div>
                        <lang>Enjoy convenience and fun from quick and fair play at any time & any where. Mobile APP is coming soon.</lang>
                        <a href="javascript:;" class="btn-down hide"></a>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '~components/Header.vue'
import Footer from '~components/Footer.vue'
import { mapActions } from 'vuex'
import {
    formatTime,
    formateCoinType,
    formateBalance,
    formatNum,
    removeCK,
    formatUSD,
    structDom
} from '~/common/util'
import { aTypes } from '~/store/cs_page/cs_1105'
import { Message } from 'element-ui'

export default {
    data () {
        return {
            timer: false,
            screenWidth: document.body.clientWidth,
            bghome: 'bghome0',
            gameLeft: 0,
            gameIndex: 0,
            gameLength: 0,
            gameWidth: 0,
            activeClass: 'luckypoker',
            activeClass1: 'luckypoker',
            activeClass2: 'recharge',
            bets: {
                syxw_orders: [],
                slot_orders: [],
                megacoin_orders: [],
                dice_orders: []
            },
            wins: {
                syxw_orders: [],
                slot_orders: [],
                megacoin_orders: [],
                dice_orders: []
            },
            water: {
                recharge_orders: [],
                withdraw_orders: []
            },
            entrance: {
                megacoin: {
                    USD: '',
                    cointype: '2001',
                    goodsvalue: ''
                },
                slot: {
                    USD: '',
                    cointype: '2001',
                    goodsvalue: '',
                    jackpot: 0
                },
                syxw: {
                    USD: '',
                    cointype: '2001',
                    goodsvalue: '',
                    jackpot: 0
                }
            },
            roundInfo: {
                jackpot: 10
            }
        }
    },
    methods: {
        /* 背景图轮播 */
        bgchange (currenindex, index) {
            this.bghome = 'bghome' + currenindex
        },
        async getRoundInfo () {
            this.roundInfo = await luckyCoinApi.getCurrentRoundInfo()
            if (this.roundInfo && parseInt(this.roundInfo.jackpot) < 10) {
                this.roundInfo.jackpot = 10
            }
        },
        onResize () {
            this.initGamePreNext()
        },
        /* 左右按钮游戏轮播 */
        initGamePreNext () {
            this.gameLength = this.$refs.gameList.children.length
            this.gameWidth = this.$refs.gameList.children[0].offsetWidth
        },
        gamePre () {
            if (this.gameIndex < 1) {
                return false
            }
            this.gameIndex--
            this.gameLeft =
                -(this.gameWidth * this.gameIndex + this.gameIndex * 30) + 'px'

            this.autoShowTab()
        },
        gameNext () {
            if (this.gameIndex >= this.gameLength - 3) {
                return false
            }
            this.gameIndex++
            this.gameLeft =
                -(this.gameWidth * this.gameIndex + this.gameIndex * 30) + 'px'
            this.autoShowTab()
        },
        autoShowTab () {
            if (this.gameIndex === 0) {
                this.activeClass = this.activeClass1 = 'luckypoker'
            } else if (this.gameIndex === 1) {
                this.activeClass = this.activeClass1 = 'slot'
            } else if (this.gameIndex === 2) {
                this.activeClass = this.activeClass1 = 'luckycoin'
            }
        },
        formatUSD,
        ...mapActions('home', [
            'getHomeBet',
            'getHomeDraw',
            'getHomeWithdraw',
            'getHomeEntrance'
        ]),
        formatTime,
        formateBalance,
        formateCoinType,
        formatNum,
        onSignUp () {
            this.$store.commit('showRegPop')
        },
        formatMoney (num) {
            let money = formatNum(Number(num), 5).toFixed(5)
            return money.length > 7 ? money.substring(0, 7) : money
        },
        initPop () {
            /* head 弹窗 */
            this.$store.commit('initHeadState', new Date().getTime())
        },
        async indexRouter (query) {
            /* 邮箱注册 找回密码  邀请等 */
            if (query.sign) {
                if (query.from === 'reg') {
                    let mailBack = await this.$store.dispatch(
                        aTypes.mailActivate,
                        query.sign
                    )
                    console.log(mailBack)
                    if (mailBack) {
                        if (mailBack.status === '100') {
                            if (parseFloat(mailBack.data.login_times) >= 0) {
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
                    }
                    this.$router.push('')
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
        getCoinClass (type) {
            return `icon-${formateCoinType(type).toLowerCase()}`
        },
        init () {
            this.renderHomeBet()
            this.renderHomeDraw()
            this.renderHomeWithdraw()
            this.renderHomeEntrance()
        },
        renderHomeBet () {
            this.getHomeBet().then(({ data }) => {
                this.bets.syxw_orders = [...data.syxw_orders]
                this.bets.slot_orders = [...data.slot_orders]
                this.bets.megacoin_orders = [...data.megacoin_orders]
                this.bets.dice_orders = [...data.dice_orders]
            })
        },
        renderHomeDraw () {
            this.getHomeDraw().then(({ data }) => {
                this.wins.syxw_orders = [...data.syxw_orders]
                this.wins.slot_orders = [...data.slot_orders]
                this.wins.megacoin_orders = [...data.megacoin_orders]
                this.wins.dice_orders = [...data.dice_orders]
            })
        },
        renderHomeWithdraw () {
            this.getHomeWithdraw().then(({ data }) => {
                this.water = {
                    ...data
                }
            })
        },
        renderHomeEntrance () {
            this.getHomeEntrance().then(({ data }) => {
                this.entrance = {
                    ...data
                }
            })
        }
    },
    components: { Header, Footer },
    computed: {
        isLog () {
            return this.$store.state.isLog
        }
    },
    mounted () {
        const that = this
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                that.screenWidth = window.screenWidth
            })()
        }
        /* 左右按钮游戏轮播 */
        this.initGamePreNext()
        setInterval(() => this.init(), 60000)
        this.init()
        if (this.$store.state.route.query) {
            this.indexRouter(this.$store.state.route.query)
        }
        /* 动态结构化 */
        structDom('home')

        //  取supercoin 金额
        this.getRoundInfo()
    },
    watch: {
        screenWidth (val) {
            if (!this.timer) {
                this.screenWidth = val
                this.timer = true
                let that = this
                setTimeout(function () {
                    that.initGamePreNext()
                    that.timer = false
                }, 400)
            }
        }
    }
}
</script>

<style scoped lang="less" type="text/less">
/*重置media*/
@import "../../styles/lib-media2.less";
/*h5为主*/
.home {
    position: relative;
    width: 100%;
    background-size: 1920px;
    transition: all 0.5s ease-in-out;
    &.bghome2 {
        background: #181633 url("../../assets/img/home/bg0.jpg") no-repeat top
            center;
    }
    &.bghome1 {
        background: #181633 url("../../assets/img/home/bg1.jpg") no-repeat top
            center;
    }
    &.bghome0 {
        background: #181633 url("../../assets/img/home/bg2.jpg") no-repeat top
            center;
    }
    .main {
        width: 100%;
        max-width: @screen-lg;
        margin: 0 auto 40px;
        overflow: hidden;
    }
    /*banner*/
    .el-carousel {
        height: 300-48px;
        margin-bottom: 48px;
        color: #fff;
        text-align: center;
        /*/deep/ .el-carousel__indicators {*/
        /*display: none;*/
        /*}*/
    }
    .el-carousel__item {
        img {
            display: block;
            width: 145px;
            margin: 70px auto 0;
        }
        .banner-t1 {
            margin-top: 70px;
            line-height: 27px;
            font-size: 23px;
            // font-size: 56px;
            overflow: hidden;
            font-weight: bold;
        }
        .banner-t11 {
            line-height: 27px;
            font-size: 23px;
            overflow: hidden;
            font-weight: bold;
        }
        .banner-t2 {
            width: 90%;
            margin: 0 auto;
            line-height: 18px;
            font-size: 10px;
        }
        .banner-more {
            display: block;
            width: 150px;
            height: 35px;
            overflow: hidden;
            margin: 25px auto 0;
            line-height: 33px;
            overflow: hidden;
            border-radius: 6px;
            border: 1px solid #fff;
            color: #fff;
            transition: all 0.2s;
            &:hover {
                border-color: #fff;
            }
        }
        .banner-firstCharge {
            display: block;
            width: 190px;
            height: 35px;
            overflow: hidden;
            margin: 25px auto 0;
            line-height: 33px;
            overflow: hidden;
            border-radius: 6px;
            border: 1px solid #fff;
            color: #fff;
            transition: all 0.2s;
            &:hover {
                border-color: #fff;
            }
        }

        .banner-superCoin {
            text-align: left;
        }
        .banner-superCoin-t1 {
            margin-top: 25px;
            font-size: 30px;
            line-height: 50px;
            color: #d648ff;
            em {
                font-style: italic;
            }
        }
        .banner-superCoin-t2 {
            color: #ffde6b;
            font-size: 26px;
            font-weight: bold;
            font-family: sans-eb;
            line-height: 30px;
        }
        .btn-superCoin {
            display: block;
            margin-top: 12px;
            line-height: 22px;
            font-size: 16px;
            color: #ffde6b;
        }
    }
    /*banner*/
}
.for-full {
    // margin: 0 -20px;
}

.items-game {
    position: relative;
    color: #fff;
    overflow: hidden;
    .game-change {
        position: absolute;
        top: 50%;
        z-index: 2;
        display: block;
        width: 26px;
        height: 50px;
        overflow: hidden;
        background: url("../../assets/img/home/btn-change.png") no-repeat top
            center;
        font-size: 0;
        text-indent: 999999px;
        visibility: hidden;
        &.game-change-pre {
            left: 0;
            transform: translate(0, -50%) rotate(180deg);
        }
        &.game-change-next {
            right: 0;
            transform: translate(0, -50%);
        }
    }
    .game_list {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease-in-out;
        > div {
            float: none;
            padding: 0;
            width: 100%;
        }
        > div + div {
            margin-top: 20px;
        }
    }
    .game-poker,
    .game-11t5,
    .game-slot,
    .game-onecoin,
    .game-supercoin {
        display: block;
        width: 92%;
        padding-top: 27px;
        height: 290px;
        overflow: hidden;
        margin: 0 auto;
        border-radius: 6px;
        text-align: center;
        color: #fff;
        //text-indent:percentage(94/369);
        .msg1 {
            line-height: 30px;
            font-size: 24px;
            font-weight: bold;
        }
        .msg2 {
            line-height: 22px;
            font-size: 16px;
        }
        .msg3 {
            margin-top: 28px;
            height: 25px;
            line-height: 25px;
            font-size: 16px;
            font-weight: bold;
            color: #ffce5a;
        }
        .msg4 {
            display: flex;
            justify-content: center;
            align-items: baseline;
            height: 50px;
            line-height: 50px;
            font-size: 48px;
            font-family: sans-eb;
            color: #ffce5a;
            i {
                text-indent: 0;
                font-size: 24px;
                font-family: sans-r;
                font-weight: bold;
            }
        }
        .msg5 {
            height: 20px;
            line-height: 20px;
            font-size: 16px;
            color: #ffce5a;
        }
    }
    .game-poker {
        background: url("../../assets/img/home/game-poker.png") no-repeat left
            top;
        background-size: cover;
    }
    .game-11t5 {
        background: url("../../assets/img/home/game1.png") no-repeat left top;
        background-size: cover;
    }
    .game-slot {
        background: url("../../assets/img/home/game2.png") no-repeat left top;
        background-size: cover;
    }
    .game-onecoin {
        background: url("../../assets/img/home/game3.png") no-repeat left top;
        background-size: cover;
    }
    .game-supercoin {
        background: url("../../assets/img/home/game-superCoin.png") no-repeat
            left top;
        background-size: cover;
    }
    .game-btn {
        display: block;
        width: percentage(190/340);
        height: 52px;
        overflow: hidden;
        margin: 26px auto 0;
        border-radius: 6px;
        line-height: 52px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        font-weight: bold;
        background-color: rgba(0, 0, 0, 0.2);
    }
}

.items-msg {
    background: #242240;
    .recent-win {
        background: #292748;
    }
    .recent-bet,
    .recent-win {
        float: left;
        width: percentage(378/1190);
    }
    .recent-water {
        float: left;
        width: percentage(434/1190);
    }
    .item-recent {
        padding: 15px 40px 40px;
        .recent-t {
            line-height: 48px;
            text-align: center;
            font-size: 20px;
            color: #ffffff;
        }
        .tab-t {
            position: relative;
            display: flex;
            justify-content: space-between;
            height: 30px;
            line-height: 30px;
            &.luckypoker .luckypoker,
            &.lucky11 .lucky11,
            &.slot .slot,
            &.luckycoin .luckycoin,
            &.recharge .recharge,
            &.withdraw .withdraw {
                color: #788ca3;
                border-bottom: 2px solid #788ca3;
            }
            a {
                position: relative;
                z-index: 2;
                flex: 1;
                display: block;
                text-align: center;
                font-size: 14px;
                color: #6a89cc;
                transition: all 0.2s;
            }
            &::after {
                content: "";
                display: block;
                position: absolute;
                z-index: 1;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 1px;
                background: #3a3953;
                transition: all 0.2s;
            }
        }
        .tab-c {
            .tab-t2 {
                display: flex;
                justify-content: space-between;
                margin-top: 15px;
                height: 30px;
                line-height: 30px;
                border-bottom: 1px solid #3a3953;
                font-size: 12px;
                color: #fff;
                text-align: center;
                div {
                    flex: 1;
                    overflow: hidden;
                }
            }
            ul {
                li {
                    display: flex;
                    justify-content: space-between;
                    height: 46px;
                    line-height: 46px;
                    overflow: hidden;
                    font-size: 14px;
                    color: #fff;
                    text-align: center;
                    border-bottom: 1px solid #3a3953;
                    > div {
                        flex: 1;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .user {
                        text-align: left;
                    }
                    .amount {
                        text-align: right;
                    }
                    .add {
                        a {
                            display: block;
                            width: 80%;
                            color: #fff;
                            text-decoration: underline;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            color: #fff;
                            text-decoration: underline;
                        }
                    }
                    .amount {
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        i {
                            display: block;
                            margin-right: 10px;
                            width: 16px;
                            height: 16px;
                            overflow: hidden;
                        }
                    }
                }
            }
        }

        .icon-eth {
            i {
                background: url("../../assets/img/home/table-eth.png") no-repeat
                    center;
                background-size: cover;
            }
        }
        .icon-cc {
            i {
                background: url("../../assets/img/home/table-cc.png") no-repeat
                    center;
                background-size: cover;
            }
        }
        .icon-btc {
            i {
                background: url("../../assets/img/home/table-bth.png") no-repeat
                    center;
                background-size: cover;
            }
        }
        &.recent-win {
            span {
                display: block;
                height: 24px;
                line-height: 24px;
                padding: 0 8px;
                background: #36c57a;
            }
        }
    }
}

.safe-msg {
    color: #fff;
    text-align: center;
    margin-bottom: 40px;
    .safe-t {
        line-height: 50px;
        font-size: 20px;
    }
    p {
        line-height: 24px;
        font-size: 14px;
        width: 80%;
        margin: 0 auto;
    }
    .btn-check {
        display: block;
        width: 146px;
        height: 40px;
        overflow: hidden;
        margin: 26px auto 0;
        border: 1px solid #5e5c71;
        line-height: 40px;
        border-radius: 6px;
        color: #fff;
        transition: all 0.2s;
        &:hover {
            border-color: #fff;
        }
    }
    .btn-down {
        display: block;
        width: 196px;
        height: 60px;
        margin: 26px auto 0;
        border: 1px solid #5e5c71;
        border-radius: 6px;
        background: url("../../assets/img/home/btn-down.png") no-repeat center;
        background-size: 127px 35px;
    }
    .btn-down-comming {
        display: block;
        width: 196px;
        height: 60px;
        margin: 26px auto 0;
        border: 1px solid #5e5c71;
        border-radius: 6px;
    }
    .img-box {
        position: relative;
        height: 338px;
    }
    .img-box1 {
        .img1 {
            position: absolute;
            left: percentage(54/410);
            top: 95px;
            animation: anima-img1 10s 2s ease-in-out infinite;
        }
        .img2 {
            position: absolute;
            left: percentage(145/410);
            top: 88px;
        }
        .img3 {
            position: absolute;
            left: percentage(170/410);
            top: 48px;
        }
    }
    .img-box2 {
        margin: 48px 0 50px 0;
        height: 240px;
        overflow: hidden;
        img {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
        .img1 {
            top: 95px;
            animation: animate-img2 10s 2s ease-in-out infinite;
        }
        .img2 {
            top: 50px;
            animation: animate-img2 10s 1s ease-in-out infinite;
        }
        .img3 {
            top: 0px;
            animation: animate-img2 10s ease-in-out infinite;
        }
    }
    .img-box3 {
        position: relative;
        background: url("../../assets/img/home/safe-img3.png") no-repeat center;
        background-size: 273px;
        .circle-box {
            position: absolute;
            left: 52%;
            top: 31%;
            width: 18px;
            height: 18px;
            transform: rotateX(50deg);
            .circle {
                position: absolute;
                top: 0;
                left: 0;
                width: 18px;
                height: 18px;
                border: 1px solid #68a4ff;
                border-radius: 50%;
                animation-name: animate-img3;
                animation-duration: 3s;
                animation-iteration-count: infinite;
            }
            .circle1 {
                animation-delay: 1s;
            }
            .circle2 {
                animation-delay: 0.5s;
            }
            .circle3 {
                animation-delay: 0;
            }
        }
    }
}

@media (max-width: @screen-phone) {
}

@media (max-width: @screen-tablet) {
    .items-msg {
        .recent-bet,
        .recent-win,
        .recent-water {
            width: 100%;
            .icon-btc,
            .icon-eth,
            .icon-cc {
                i {
                    display: none !important;
                }
            }
        }
    }
    .home {
        &.bghome2 {
            background-size: 1190px;
        }
        .el-carousel__item{
            .banner-t11 {
                line-height: 26px;
                font-size: (1600)/1920vw;
            }
        }
    }
}

@media (min-width: @screen-tablet) {
    .home {
        /*banner*/
        .el-carousel__item {
            .banner-t1 {
                line-height: 54px;
                font-size: (4600)/1920vw;
            }
            .banner-t2,.banner-t11{
                line-height: 26px;
                font-size: (1600)/1920vw;
            }
            .banner-superCoin {
                padding-left: 106px;
            }
            .banner-superCoin-t1 {
                margin-top: 24px;
                font-size: 41px;
                line-height: 72px;
            }
            .banner-superCoin-t2 {
                font-size: 43px;
                line-height: 42px;
            }
            .btn-superCoin {
                margin-top: 12px;
                line-height: 22px;
                font-size: 20px;
            }
        }
        /*banner*/
    }
}
@media (max-width: @screen-desktop) {
    .items-game {
        .game_list {
            width: 100% !important;
            left: 0 !important;
        }
        .game-change {
            display: none;
        }
    }
}
@media (min-width: @screen-desktop) {
    .items-game {
        padding: 0 40px;
        .game_list_pc {
            width: 1080px;
            overflow: hidden;
            margin: 0 auto;
        }
        .game_list {
            width: 99999px;
            height: 290px;
            > div {
                float: left;
                width: 340px;
            }
            > div + div {
                margin-left: 30px;
                margin-top: 0;
            }
        }
        .game-poker,
        .game-11t5,
        .game-slot,
        .game-onecoin,
        .game-supercoin {
            width: 100%;
            transition: all 0.2s;
            transform-origin: bottom;
            &:hover {
                filter: brightness(1.1);
            }
        }
        .game-btn {
            transition: all 0.2s;
            &:hover {
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.6);
            }
        }
        &:hover {
            .game-change {
                visibility: visible;
            }
        }
    }

    .safe-msg {
        .col-lg-4 {
            padding: 0;
        }
    }
}

@media (min-width: @screen-lg-desktop) {
    .home {
        /*banner*/
        .el-carousel {
            height: 450-48px;
        }
        .el-carousel__item {
            .banner-t1 {
                margin-top: 80px;
                line-height: 66px;
                font-size: 52px;
            }
            .banner-t2 {
                line-height: 28px;
                font-size: 16px;
            }

            .banner-superCoin {
                padding-left: 353px;
            }
            .banner-superCoin-t1 {
                margin-top: 52px;
                line-height: 94px;
                font-size: 56px;
            }
            .banner-superCoin-t2 {
                line-height: 60px;
                font-size: 60px;
                font-weight: bold;
            }
            .btn-superCoin {
                line-height: 70px;
                font-size: 30px;
            }
        }
        /*banner*/
    }

    .for-full {
        margin: 0;
    }
}

@keyframes anima-img1 {
    0% {
        transform: translate3d(0, 0, 0);
    }
    10%,
    95% {
        transform: translate3d(20px, 0, 0);
    }
    100% {
        transform: translate3d(0, 0, 0);
    }
}

@keyframes animate-img2 {
    0% {
        transform: translate3d(-50%, 0, 0);
    }
    10%,
    95% {
        transform: translate3d(-50%, 20px, 0);
    }
    100% {
        transform: translate3d(-50%, 0, 0);
    }
}

@keyframes animate-img3 {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0;
        transform: scale(3);
    }
    51%,
    100% {
        opacity: 0;
        transform: scale(1);
    }
}
</style>
