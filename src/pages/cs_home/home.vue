<template>
    <!--bg1 bg2 bg3-->
    <div class="home">
        <Header></Header>
        <div class="main">
            <div class="container">
                <div class="row clearfix">
                    <div class="col-xs-12">
                        <!--banner-->
                        <el-carousel :interval="3000">
                            <el-carousel-item v-for="(item, index) in banner" :key="index">
                                <div class="banner-t1">{{ item.t1 }}</div>
                                <p class="banner-t2">{{ item.t2 }}</p>
                                <a class="banner-more" :href="item.href">Learn more More ></a>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
                <div class="row clearfix items-game ">
                    <!--各种游戏宣传图-->
                    <div class="col-xs-12 col-md-4">
                        <div class="for-full">
                            <div class="game-11t5">
                                <p class="msg1">Lucky 11</p>
                                <p class="msg2">High frequency reward game</p>
                                <p class="msg3">Jackpot</p>
                                <p class="msg4">
                                    <span>{{formatNum(Number(entrance.syxw.jackpot), 4)}}</span>
                                    <i> {{formateCoinType(entrance.syxw.cointype)}}</i>
                                </p>
                                <p class="msg5">{{formatUSD(entrance.syxw.USD, entrance.syxw.jackpot)}} USD</p>
                                <router-link :to="{path: '/lucky11'}" class="game-btn">
                                    <lang>Play</lang>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4">
                        <div class="for-full">
                            <div class="game-slot">
                                <p class="msg1">Slot</p>
                                <p class="msg2">Try Slot & Win 97%+ Return Rate</p>
                                <p class="msg3">Jackpot</p>
                                <p class="msg4">
                                    <span>{{formatNum(Number(entrance.slot.jackpot), 4)}}</span>
                                    <i> {{formateCoinType(entrance.slot.cointype)}}</i>
                                </p>
                                <p class="msg5">{{formatUSD(entrance.slot.USD, entrance.slot.jackpot)}} USD</p>
                                <router-link :to="{path: '/slot'}" class="game-btn">
                                    <lang>Play</lang>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4">
                        <div class="for-full">
                            <div class="game-onecoin">
                                <p class="msg1">LuckyCoin</p>
                                <p class="msg2">High frequency reward game</p>
                                <p class="msg3">Maximum Award</p>
                                <p class="msg4">
                                    <span>{{formatNum(Number(entrance.megacoin.goodsvalue), 4)}}</span>
                                    <i> {{formateCoinType(entrance.megacoin.cointype)}}</i>
                                </p>
                                <p class="msg5">{{formatUSD(entrance.megacoin.USD, entrance.megacoin.goodsvalue)}} USD</p>
                                <router-link :to="{path: '/luckycoin'}" class="game-btn">
                                    <lang>Play</lang>
                                </router-link>
                            </div>
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
                        <div class="recent-t">Recent Bet</div>
                        <div class="tab-t" :class="[activeClass]">
                            <a href="javascript:;" class="lucky11" @click="activeClass = 'lucky11'">Lucky11</a>
                            <a href="javascript:;" class="slot" @click="activeClass = 'slot'">slot</a>
                            <a href="javascript:;" class="luckycoin" @click="activeClass = 'luckycoin'">LuckyCoin</a>
                        </div>
                        <div class="tab-c">
                            <div class="tab-t2">
                                <div class="is-left">User ID</div>
                                <div>Time</div>
                                <div class="is-right">Bet Amount</div>
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
                        <div class="recent-t">Recently won</div>
                        <div class="tab-t" :class="[activeClass1]">
                            <a href="javascript:;" class="lucky11" @click="activeClass1 = 'lucky11'">Lucky11</a>
                            <a href="javascript:;" class="slot" @click="activeClass1 = 'slot'">slot</a>
                            <a href="javascript:;" class="luckycoin" @click="activeClass1 = 'luckycoin'">LuckyCoin</a>
                        </div>
                        <div class="tab-c">
                            <div class="tab-t2">
                                <div class="is-left">User ID</div>
                                <div>Time</div>
                                <div class="is-right">Bet Amount</div>
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
                        <div class="recent-t">Recently Flowing Water</div>
                        <div class="tab-t" :class="activeClass2">
                            <a href="javascript:;" class="recharge" @click="activeClass2 = 'recharge'">Recharge</a>
                            <a href="javascript:;" class="withdraw" @click="activeClass2 = 'withdraw'">Withdrawal</a>
                        </div>
                        <div class="tab-c">
                            <div class="tab-t2">
                                <div class="is-left">Address</div>
                                <div>ID</div>
                                <div>Time</div>
                                <div class="is-right">Bet Amount</div>
                            </div>
                            <ul v-if="activeClass2 === 'recharge'">
                                <li v-for="(bet, index) in water.recharge_orders.slice(0, 5)" :key="index">
                                    <div class="add">
                                        <a href="javascript:;">{{bet.address}}</a>
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
                                        <a href="javascript:;">{{bet.address}}</a>
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
                            Open, Fair And Transparent
                        </div>
                        <p>
                            The lottery algorithm is based on blockchain technology,
                        </p>
                        <p>
                            and no one can predict that bet information will be upload
                        </p>
                        <p>
                            ed to the blockchain and no one can tamper with it.
                        </p>
                        <router-link :to="{path: '/check'}" class="btn-check">
                            <lang>Go to check</lang>
                        </router-link>
                    </div>
                    <div class="col-lg-4">
                        <div class="img-box img-box2">
                            <img class="img3" src="@/assets/img/home/safe-img2-3.png" alt="">
                            <img class="img2" src="@/assets/img/home/safe-img2-2.png" alt="">
                            <img class="img1" src="@/assets/img/home/safe-img2-1.png" alt="">
                        </div>
                        <div class="safe-t">
                            BTC、ETH Multi-currency Betting
                        </div>
                        <p>
                            Current games support the most popular Bitcoin and
                        </p>
                        <p>
                            Ethereum for betting, deposits and withdrawals, and will
                        </p>
                        <p>
                            receive more encrypted digital currencies in the future, so
                        </p>
                        <p>
                            stay tuned
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
                            Support Mobile Devices
                        </div>
                        <p>Betting, recharging, and withdrawing anytime, </p>
                        <p>anywhere, to be a more intimate, more conve</p>
                        <p>nient, and more secure platform. </p>
                        <a href="javascript:;" class="btn-down"></a>
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
        formatUSD
    } from '~/common/util'
    import {aTypes} from '~/store/cs_page/cs_1105'
    import {Message} from 'element-ui'

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
                        goodsvalue: ''
                    },
                    syxw: {
                        USD: '',
                        cointype: '2001',
                        goodsvalue: ''
                    }
                },
                banner: [
                    {
                        t1: 'Welcome To The Blockchain Game Platform',
                        t2:
                            'A city in southern Nevada; population 558,383 (est. 2008).It is noted for its casinos and nightclubs',
                        href: 'https://www.coinslot.com/'
                    },
                    {t1: '2', t2: '22', href: 'https://www.coinslot.com/'},
                    {t1: '3', t2: '33', href: 'https://www.coinslot.com/'},
                    {t1: '44', t2: '44', href: 'https://www.coinslot.com/'}
                ]
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
            formatMoney (num) {
                return formatNum(Number(num), 4).toFixed(5)
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
                                if (
                                    parseFloat(mailBack.data.login_times) >= 0 &&
                                    mailBack.data.invite_status.toString() === '0'
                                ) {
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
        mounted () {
            this.init()
            if (this.$store.state.route.query) {
                this.indexRouter(this.$store.state.route.query)
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
        background: #181633 url("../../assets/img/home/bg1.png") no-repeat top center;
        background-size: 1920px;
        .main {
            width: 100%;
            max-width: @screen-lg;
            margin: 0 auto 40px;
            overflow: hidden;
        }
        /*banner*/
        .el-carousel {
            height: 300-58px;
            margin-bottom: 58px;
            color: #fff;
            text-align: center;
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
                overflow: hidden;
                font-weight: bold;
            }
            .banner-t2 {
                width: 90%;
                margin: 0 auto;
                line-height: 14px;
                font-size: 10px;
            }
            .banner-more {
                display: block;
                width: 150px;
                height: 35px;
                overflow: hidden;
                margin: 25px auto 0;
                line-height: 35px;
                overflow: hidden;
                border-radius: 6px;
                border: 1px solid #575763;
                color: #fff;
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
        .game-11t5,
        .game-slot,
        .game-onecoin {
            width: 92%;
            padding-top: 27px;
            height: 290px;
            overflow: hidden;
            margin: 0 auto;
            border-radius: 6px;
            text-align: center;
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
                .banner-t1 {
                    line-height: 54px;
                    font-size: (4600)/1920vw;
                }
                .banner-t2 {
                    line-height: 26px;
                    font-size: (1600)/1920vw;
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
            .game-11t5,
            .game-slot,
            .game-onecoin {
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
                height: 450-58px;
            }
            .el-carousel__item {
                .banner-t1 {
                    margin-top: 143px;
                    line-height: 57px;
                    font-size: 46px;
                }
                .banner-t2 {
                    line-height: 28px;
                    font-size: 16px;
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
