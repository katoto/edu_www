<template>
    <!--bg1 bg2 bg3-->
    <div class="home">
        <Header></Header>
        <div class="main" @click="initPop">
            <div class="container">
                <div class="row clearfix">
                    <div class="col-xs-12">
                        <!--banner-->
                        <el-carousel :interval="5000" >
                            <el-carousel-item>
                                <router-link to="/superCoin" class="btn-superCoin" style="display: block;">
                                    <div class="banner-superCoin-t1" >
                                        <lang>SUPERCOIN</lang>
                                    </div>
                                    <p class="banner-superCoin-t2" v-lang="'Win 10 ETH Prize Pool<br>Every 2 Hours'">
                                    </p>
                                    <p class="btn-superCoin" v-lang="'Attractive Prize Pool.&nbsp;&nbsp;Buy Sooner, Earn Higher >>'" >
                                    </p>
                                </router-link>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
                <div class="row clearfix items-game ">

                    <div class="col-xs-12 col-md-4">
                        <div class="for-full">
                            <router-link :to="{path: '/supercoin'}" class="game-supercoin">
                                <p class="msg1"><lang>SuperCoin</lang></p>
                                <p class="msg2"><lang>Win 10 ETH Prize Pool Every 2 Hours</lang></p>
                                <p class="msg3"><lang>Prize Pool</lang></p>
                                <p class="msg4">
                                    <span>{{formatNum(Number(roundInfo.jackpot), 4)}}</span>
                                    <i> ETH</i>
                                </p>
                                <p class="msg5">{{formatUSD(entrance.megacoin.USD, 10)}} USD</p>
                               <div class="game-btn">
                                    <lang>Play Now </lang>
                               </div>
                            </router-link>
                        </div>
                    </div>
                    <!--各种游戏宣传图-->
                    <div class="col-xs-12 col-md-4">
                            <div class="for-full">
                                <router-link :to="{path: '/luckyPoker'}" class="game-poker">
                                    <p class="msg1">
                                        <lang>LuckyPoker</lang>    
                                    </p>
                                    <p class="msg2">
                                        <lang>Classic game with high reward</lang>
                                    </p>
                                    <p class="msg2" v-lang="'Win <i class=bold>98%+</i> Return Rate'">
                                    </p>
                                    <p style="height:101px"></p>
                                    <div class="game-btn">
                                        <lang>Play Now </lang>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    <div class="col-xs-12 col-md-4">
                        <div class="for-full">
                            <router-link :to="{path: '/luckySlot'}"  class="game-slot">
                                <p class="msg1"><lang>LuckySlot</lang></p>
                                <p class="msg2"><lang>Win 97%+ Return Rate</lang></p>
                                <p class="msg3"><lang>Jackpot</lang></p>
                                <p class="msg4">
                                    <span>{{formatNum(Number(entrance.slot.jackpot), 4)}}</span>
                                    <i> {{formateCoinType(entrance.slot.cointype)}}</i>
                                </p>
                                <p class="msg5">{{formatUSD(entrance.slot.USD, entrance.slot.jackpot)}} USD</p>
                                <div class="game-btn">
                                    <lang>Play Now </lang>
                                </div>
                            </router-link>
                        </div>
                    </div>

                    <!-- <div class="col-xs-12 col-md-4">
                        <div class="for-full">
                            <router-link :to="{path: '/luckycoin/'}" class="game-supercoin">
                                <p class="msg1"><lang>SuperCoin</lang></p>
                                <p class="msg2"><lang>Win 10 ETH Prize Pool Every 2 Hours</lang></p>
                                <p class="msg3"><lang>Prize Pool</lang></p>
                                <p class="msg4">
                                    <span>{{formatNum(Number(entrance.megacoin.goodsvalue), 4)}}</span>
                                    <i> {{formateCoinType(entrance.megacoin.cointype)}}</i>
                                </p>
                                <p class="msg5">{{formatUSD(entrance.megacoin.USD, entrance.megacoin.goodsvalue)}} USD</p>
                               <div class="game-btn">
                                    <lang>Play Now </lang>
                               </div>
                            </router-link>
                        </div>
                    </div> -->
                    <div class="col-xs-12 col-md-4 hide">
                        <div class="for-full">
                            <router-link :to="{path: '/lucky11'}" class="game-11t5">
                                <p class="msg1"><lang>Lucky11</lang></p>
                                <p class="msg2"><lang>Classic game with high reward</lang></p>
                                <p class="msg3"><lang>Jackpot </lang></p>
                                <p class="msg4">
                                    <span>{{formatNum(Number(entrance.syxw.jackpot), 4)}}</span>
                                    <i> {{formateCoinType(entrance.syxw.cointype)}}</i>
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
        </div>
        <div class="items-msg ">
            <div class="msg-container container">
                <div class="msg-row row">
                    <!--最近下注-->
                    <div class="item-recent recent-bet">
                        <div class="recent-t"><lang>Recent Bids</lang></div>
                        <div class="tab-t" :class="[activeClass]">
                            <a href="javascript:;" class="lucky11" @click="activeClass = 'lucky11'"><lang>Lucky11</lang></a>
                            <a href="javascript:;" class="slot" @click="activeClass = 'slot'"><lang>LuckySlot</lang></a>
                            <a href="javascript:;" class="luckycoin" @click="activeClass = 'luckycoin'"><lang>LuckyCoin</lang></a>
                        </div>
                        <div class="tab-c">
                            <div class="tab-t2">
                                <div class="is-left"><lang>User ID</lang></div>
                                <div><lang>Date</lang></div>
                                <div class="is-right"><lang>Amount</lang></div>
                            </div>
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
                        </div>
                    </div>
                    <!--最近中奖-->
                    <div class="item-recent recent-win">
                        <div class="recent-t"><lang>Recent Wins</lang></div>
                        <div class="tab-t" :class="[activeClass1]">
                            <a href="javascript:;" class="lucky11" @click="activeClass1 = 'lucky11'"><lang>Lucky11</lang></a>
                            <a href="javascript:;" class="slot" @click="activeClass1 = 'slot'"><lang>LuckySlot</lang></a>
                            <a href="javascript:;" class="luckycoin" @click="activeClass1 = 'luckycoin'"><lang>LuckyCoin</lang></a>
                        </div>
                        <div class="tab-c">
                            <div class="tab-t2">
                                <div class="is-left"><lang>User ID</lang></div>
                                <div><lang>Date</lang></div>
                                <div class="is-right"><lang>Amount</lang></div>
                            </div>
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
                        <div class="recent-t"><lang>Recent Transfer</lang></div>
                        <div class="tab-t" :class="activeClass2">
                            <a href="javascript:;" class="recharge" @click="activeClass2 = 'recharge'"><lang>Top Up</lang></a>
                            <a href="javascript:;" class="withdraw" @click="activeClass2 = 'withdraw'"><lang>Withdraw</lang></a>
                        </div>
                        <div class="tab-c">
                            <div class="tab-t2">
                                <div class="is-left"><lang>Address</lang></div>
                                <div><lang>User ID</lang></div>
                                <div><lang>Date</lang></div>
                                <div class="is-right"><lang>Amount</lang></div>
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
                            <lang>Bid information on blockchain cannot be modified</lang>
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
                            <lang>Currently,  popular coins ETH and BTC are supported on the platform to play, top up and withdraw. More coins will be supported in the near future.</lang>
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
    import {mapActions} from 'vuex'
    import {
        formatTime,
        formateCoinType,
        formateBalance,
        formatNum,
        removeCK,
        formatUSD,
        structDom
    } from '~/common/util'
    import {aTypes} from '~/store/cs_page/cs_1105'
    import {Message} from 'element-ui'
    import {luckyCoinApi} from '~/dappApi/luckycoinApi'

    export default {
        data () {
            return {
                activeClass: 'lucky11',
                activeClass1: 'lucky11',
                activeClass2: 'recharge',
                bets: {
                    syxw_orders: [],
                    slot_orders: [],
                    megacoin_orders: []
                },
                wins: {
                    syxw_orders: [],
                    slot_orders: [],
                    megacoin_orders: []
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
            async getRoundInfo () {
                this.roundInfo = await luckyCoinApi.getCurrentRoundInfo()
                if (this.roundInfo && parseInt(this.roundInfo.jackpot) < 10) {
                    this.roundInfo.jackpot = 10
                }
            },
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
                        let mailBack = await this.$store.dispatch(aTypes.mailActivate, query.sign)
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
                this.getHomeBet().then(({data}) => {
                    this.bets = {
                        ...data
                    }
                })
            },
            renderHomeDraw () {
                this.getHomeDraw().then(({data}) => {
                    this.wins = {
                        ...data
                    }
                })
            },
            renderHomeWithdraw () {
                this.getHomeWithdraw().then(({data}) => {
                    this.water = {
                        ...data
                    }
                })
            },
            renderHomeEntrance () {
                this.getHomeEntrance().then(({data}) => {
                    this.entrance = {
                        ...data
                    }
                })
            }
        },
        components: {Header, Footer},
        computed: {
            isLog () {
                return this.$store.state.isLog
            }
        },
        mounted () {
            setInterval(() => this.init(), 60000)
            this.init()
            if (this.$store.state.route.query) {
                this.indexRouter(this.$store.state.route.query)
            }
            /* 动态结构化 */
            structDom('home')
            //  取supercoin 金额
            this.getRoundInfo()
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
        background: #181633 url("../../assets/img/home/bg1.jpg") no-repeat top center;
        background-size: 1920px;
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
            text-align: left;
            img {
                display: block;
                width: 145px;
                margin: 70px auto 0;
            }
            .banner-superCoin-t1 {
                margin-top: 25px;
                font-size: 30px;
                line-height: 50px;
                color: #d648ff;
                em{
                    font-style: italic;
                }
            }
            .banner-superCoin-t2{
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
        margin: 0 -20px;
    }

    .items-game {
        color: #fff;
        > div + div {
            margin-top: 20px;
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
                line-height: 25px;
                font-size: 16px;
                font-weight: bold;
            }
            .msg4 {
                display: flex;
                justify-content: center;
                align-items: baseline;
                height: 50px;
                line-height: 50px;
                font-size: 48px;
                font-family: sans-eb;
                i {
                    text-indent: 0;
                    font-size: 24px;
                    font-family: sans-r;
                    font-weight: bold;
                }
            }
            .msg5 {
                line-height: 20px;
                font-size: 16px;
            }
        }
        .game-poker{
            background: url("../../assets/img/home/game-poker.png") no-repeat center;
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
            background: url("../../assets/img/home/game-superCoin.png") no-repeat left top;
            background-size: cover;
        }
        .game-btn {
            display: block;
            width: percentage(228/369);
            height: 52px;
            overflow: hidden;
            margin: 26px auto 0;
            border-radius: 6px;
            line-height: 50px;
            text-align: center;
            font-size: 20px;
            color: #fff;
            font-weight: bold;
            border: 2px solid #ffffff;
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
                    background: url("../../assets/img/home/table-eth.png") no-repeat center;
                    background-size: cover;
                }
            }
            .icon-btc {
                i {
                    background: url("../../assets/img/home/table-bth.png") no-repeat center;
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
            &:hover{
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
                    animation-delay: 0s;
                }
            }
        }
    }

    @media (max-width: @screen-phone) {
    }

    @media (max-width: @screen-tablet) {
        .home{
            background-size: 1190px;
        }
        .items-msg {
            .recent-bet,
            .recent-win,
            .recent-water {
                width: 100%;
                .icon-btc,.icon-eth{
                    i{
                        display: none !important;
                    }
                }
            }
        }
    }

    @media (min-width: @screen-tablet) {
        .home {
            /*banner*/
            .el-carousel__item {
                padding-left: 106px;
                .banner-superCoin-t1 {
                    margin-top: 24px;
                    font-size: 41px;
                    line-height: 72px;
                }
                .banner-superCoin-t2{
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

    @media (min-width: @screen-desktop) {
        .items-game {
            > div + div {
                margin-top: 0;
            }
            .game-poker,
            .game-11t5,
            .game-slot,
            .game-onecoin,
            .game-supercoin{
                width: 100%;
                transition: all 0.2s;
                transform-origin: bottom;
                &:hover {
                    transform: scale(1.08);
                }
            }
            .game-btn {
                transition: all 0.2s;
                &:hover {
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.6);
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
                padding-left: 353px;
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
                .btn-superCoin{
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
