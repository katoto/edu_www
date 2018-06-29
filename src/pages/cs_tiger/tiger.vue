<template>
    <div class="tiger-pc">
        <Header></Header>
        <div class="tiger-main">
            <div class="tiger ">
                <img class="bg-tiger" src="@/assets/img/tiger/bg-tiger.jpg" alt="">
                <div class="tiger-wrap">
                    <!--低奖池-->
                    <div class="jackpot-low">
                        <div class="jackpot-all">
                            <p>
                                JACKPOT
                            </p>
                            <i v-if="prizes_pool">
                                {{ prizes_pool }}
                            </i>
                            <span>
                                ETH
                            </span>
                        </div>
                        <div class="jackpot-win">
                            <!--bug: ipone5 not fint win-->
                            <p>
                                Hit to Win
                                <span v-if="prizes_pool && prizes_pool_ratio">
                                <!-- hit WIn -->
                                <template v-if="prizes_pool_ratio[dft_bet] >= 0">
                                    {{ parseFloat(prizes_pool) * prizes_pool_ratio[dft_bet] }}
                                </template>
                                <template v-else>
                                    {{ Math.abs( prizes_pool_ratio[dft_bet]) }}
                                </template>
                                </span>
                            </p>
                            <span>
                                ETH
                            </span>
                        </div>
                    </div>
                    <!--中奖播报-->
                    <div class="msg-win">
                        <ul>
                            <li>Congratulate** on winning 0.01ETH</li>
                        </ul>
                    </div>
                    <!--进行中 run 开奖 opening - yes  中奖bingo-->
                    <div class="slot ">
                        <div ref="js_slotBox" id="js_slot-box" class="slot-box">
                            <template v-if="axes">
                                <!-- class="yes" -->
                                <ul class="slot-item1" :style="{ 'transform':slotItem1Tran}" v-if="axes[0]">
                                    <li v-for="item in axes[0]" >
                                        <img :src="`../../../static/staticImg/_${item}.png`" :alt="item" />
                                    </li>
                                    <li v-if="hideInitLi" id="hei">
                                        <img src="../../../static/staticImg/_A.png" alt="">
                                    </li>
                                </ul>
                                <ul class="slot-item2" :style="{ 'transform':slotItem2Tran}" v-if="axes[1]">
                                    <li v-for="item in axes[1]" >
                                        <img :src="`../../../static/staticImg/_${item}.png`" :alt="item" />
                                    </li>
                                </ul>
                                <ul class="slot-item3" :style="{ 'transform':slotItem3Tran}" v-if="axes[2]">
                                    <li v-for="item in axes[2]" >
                                        <img :src="`../../../static/staticImg/_${item}.png`" :alt="item" />
                                    </li>
                                </ul>
                            </template>

                        </div>
                    </div>
                    <!--底部操作-->
                    <div class="operating ">
                        <!-- 展开 on-->
                        <div class="single">
                            <div style="cursor: pointer" @click="showBetSel">
                                <div class="top">
                                    <div class="single-amount">
                                        {{ dft_bet }}
                                    </div>
                                    <div class="single-unit">
                                        ETH
                                    </div>
                                </div>
                                <p class="msg">
                                    Single Bet
                                </p>
                            </div>
                            <!-- 投注项选择 -->
                            <div :class="{'hide': !showSingleBet }">
                                <ul v-if="lucky_values.length > 0">
                                    <li v-for="item in lucky_values" @click="betSelFn(item)">
                                        <div class="single-amount">
                                            {{ item.bet }}
                                        </div>
                                        <div class="single-unit">
                                            ETH
                                        </div>
                                    </li>
                                    <!--<li>-->
                                    <!--<div class="single-amount">-->
                                    <!--0.0001-->
                                    <!--</div>-->
                                    <!--<div class="single-unit">-->
                                    <!--ETH-->
                                    <!--</div>-->
                                    <!--</li>-->
                                </ul>
                            </div>
                        </div>
                        <div class="all">
                            <div class="top">
                                <div class="all-amount">
                                    {{ formateBalance ( parseFloat(dft_bet) * parseFloat(dft_line) )}}
                                </div>
                                <div class="all-unit">
                                    ETH
                                </div>
                            </div>
                            <p class="msg">
                                Current Bet
                            </p>
                        </div>
                        <div class="bar">
                            <div class="top">
                                <div class="bar-process">
                                    <i :style="{'width':barProcess+'%'}" ></i>
                                </div>
                                <div class="bar-msg">
                                    {{ barProcess }}%
                                </div>
                            </div>
                            <p class="msg">
                                Lucky Bar
                            </p>
                        </div>
                    </div>
                    <!--上次赢取-->
                    <div class="lastwin " v-if="last_prizes">
                        Last time win {{ last_prizes }} ETH
                    </div>
                    <!--主按钮-->
                    <a href="javascript:;" class="btn-main">
                        <img src="@/assets/img/tiger/btn-bg.png" alt="">
                        <!--免费-->
                        <div class="btn btn-free" @click="startPlay"  :class="{'hide':!free_times}">
                            <p>FREE</p>
                            <div>{{ free_times }} Times</div>
                        </div>
                        <!-- 开始按钮btn-spin-->
                        <div @dblclick="autoPlay" @click="startPlay" class="btn btn-spin" :class="{'hide':free_times}">
                            <p>SPIN</p>
                            <div>Auto(double click)</div>
                        </div>
                        <!--自动-->
                        <div @dblclick="stopAutoPlay" class="btn btn-auto hide">
                            <p>AUTO</p>
                            <div>Double Click to Stop</div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="tiger-pc-msg">
                <h3>Recently </h3>
                <div class="recent-win">
                    <div class="recent-top">
                        <div class="user">
                            User
                        </div>
                        <div class="win">
                            Win
                        </div>
                        <div class="time">
                            Time
                        </div>
                    </div>
                    <!-- height -->
                    <ul class="recent-main" v-if="recentList">
                        <li v-for="item in recentList" :class="{'newRecord':item.addNewRecord}">
                            <div class="user">
                                {{formateEmail( item.username , true ) }}
                            </div>
                            <div class="win">
                                {{ formateBalance ( item.prize ) }} {{ formateCoinType( item.cointype ) }}
                            </div>
                            <div class="time">
                                {{ formatTime ( item.bettime , 'HH:mm' ) }}
                            </div>
                        </li>

                    </ul>
                </div>
                <div class="contact">
                    <div class="fl">
                        <div class="msg1">Recommend using mobile phone to Interviews the game</div>
                        <div class="msg2">https://www.coinslot.com/tiger</div>
                    </div>
                    <div class="fr">
                        <!--  二维码  -->
                        <!--<img src="@/assets/img/tiger/code.jpg" alt="">-->
                        <img
                            :src="'http://mobile.qq.com/qrcode?url=https://www.coinslot.com/tiger'">
                    </div>
                </div>
            </div>
        </div>

        <!--pop   show-->
        <!--小奖-->
        <div class="pop reward-small">
            <div class="msg">
                <p>0.0025</p>
                <i>ETH</i>
            </div>
        </div>
        <!--大奖-->
        <div class="pop reward-big ">
            <div class="bg1">
                <div class="bg2">
                    <div class="msg">
                        <p>
                            0.1498
                        </p>
                        <i>
                            ETH
                        </i>
                    </div>
                    <ul>
                        <li>
                            <img src="../../../static/staticImg/_A.png" alt="">&ensp;
                            <span>x2</span>&ensp;
                            <span>20</span>&ensp;
                            <span>Times</span>
                        </li>
                        <li>
                            <img src="../../../static/staticImg/_A.png" alt="">&ensp;
                            <span>x2</span>&ensp;
                            <span>20</span>&ensp;
                            <span>Times</span>
                        </li>

                    </ul>
                    <ul>
                        <li>
                            <img src="../../../static/staticImg/_A.png" alt="">&ensp;
                            <span>x2</span>&ensp;
                            <span>20</span>&ensp;
                            <span>Times</span>
                        </li>
                        <li>
                            <img src="../../../static/staticImg/_A.png" alt="">&ensp;
                            <span>x2</span>&ensp;
                            <span>20</span>&ensp;
                            <span>Times</span>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
        <!--help-->
        <div class="pop help ">
            <a href="javascript:;" class="tiger-close"></a>
            <div class="title">
              <p>Instructions</p>
            </div>
            <ul class="tab-t">
                <li class="on"><a href="javascript:;">Winning Table</a></li>
                <li ><a href="javascript:;">Lucky Prize</a></li>
                <li><a href="javascript:;">Winning Line</a></li>
            </ul>
            <ul class="tab-c">
                <li class="on">
                    <div class="line-divi">
                        <div>Multiple</div>
                    </div>
                    <div class="winningamount">
                        <p>Winning Amount =</p>
                        <p>pattern multiple × single line amount</p>
                    </div>
                    <img class="details" src="@/assets/img/tiger/details.png" alt="details">
                    <div class="line-divi">
                        <div>Special</div>
                    </div>
                    <ul class="special">
                        <li>
                            <div class="icon">
                                <img src="@/assets/img/tiger/icon-wild.png" alt="icon-wild">
                            </div>
                            <p>WILD，In addition to whistle, it can be</p>
                            <p>compared with any other</p>
                        </li>
                        <li>
                            <div class="icon">
                                <img src="@/assets/img/tiger/icon-free.png" alt="icon-free">
                            </div>
                            <p>Rewards free,</p>
                            <p>number of occurrences anywhere</p>
                            <p>3 free = 1 time&nbsp;&nbsp;&nbsp;&nbsp;4 free = 3 time</p>
                            <p>5 free = 10 time</p>
                        </li>
                    </ul>
                </li>
                <li class="">
                    <div class="line-divi">
                        <div>Jaackpot</div>
                    </div>
                    <img class="smallAward" src="@/assets/img/tiger/bg-jackpot2.png" alt="Small award">
                    <div class="msg">
                        <p>
                            <span class="bold">Prize pool</span>: 2% of the player's guessed coin is rolled into the prize pool.
                        </p>
                        <p>
                            <span>9-line betting, transfer out of 9</span>
                            &nbsp;<img width="16" height="16" src="@/assets/img/tiger/icon-England.png" alt="England">&nbsp;
                            <span>that is winning.</span>
                        </p>
                    </div>
                    <div class="msg">
                        <p>· Each bet 0.0001ETH, only get a fixed payment</p>
                        <p>· Bet ETH per line 0.001, winning 5%</p>
                        <p>· Each line is betting 0.01ETH, winning 50% of &nbsp;&nbsp;the prize pool</p>
                    </div>
                    <div class="line-divi">
                        <div>Lucky value</div>
                    </div>
                    <div class="lucky-value">
                        <div class="lucky-48">
                            <img src="@/assets/img/tiger/lucky-48.png" alt="">
                            <p>Not Full</p>
                        </div>
                        <div class="lucky-100">
                            <img src="@/assets/img/tiger/lucky-100.png" alt="">
                            <p>Full</p>
                        </div>
                    </div>
                    <div class="msg">
                        <p>
                           <span class="bold"> Lucky value</span>: Unlucky bets accumulate lucky value by line number
                        </p>
                        <p>
                            (1 line accumulates 1 lucky value, use n-line betting to accumulate n lucky value)
                        </p>
                        <p>
                            You can get a double reward if your lucky value is 100 or more.
                        </p>
                    </div>
                </li>
                <li class="">
                    <div class="line-divi">
                        <div>
                            <p>
                                Bonus settlements from
                            </p>
                            <p>
                                left to right on the winning line
                            </p>
                        </div>
                    </div>
                    <img src="@/assets/img/tiger/win-line.png" alt="win-line" class="win-line">
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    import Header from '~components/Header_bk.vue'
    import {mTypes, aTypes} from '~/store/cs_page/cs_tiger'
    import {formateEmail, formatTime, formateBalance, formateCoinType} from '~common/util'
    export default {
        data () {
            return {
                free_times: null, // 初始化免费次数
                // 默认投注选项
                lucky_values: [{
                    bet: '0.0001',
                    lucky: '0'
                }, {
                    bet: '0.001',
                    lucky: '0'
                }],
                dft_bet: 0.001, // 默认投注项
                dft_line: 9, // 默认9线
                showSingleBet: false, // 投注项选择
                barProcess: 10,
                prizes_pool_ratio: null, // hitWinRatio
                axes: null, // axes
                dft_idx: null, // dft_idx
                hideInitLi: true,
                computeHeight: 0,
                slotItem1Tran: 'translateY(30px)',
                slotItem2Tran: 'translateY(30px)',
                slotItem3Tran: 'translateY(30px)'
            }
        },
        watch: {
            computeHeight (hei) {
                if (hei && this.dft_idx) {
                    this.setLacal()
                }
            }
        },
        methods: {
            formatTime,
            formateBalance,
            formateEmail,
            formateCoinType,
            setLacal () {
                this.dft_idx.forEach((val, index) => {
                    val = parseFloat(val) + 30
                    console.log(this.computeHeight)
                    console.log((val - 3) * this.computeHeight)
                    this['slotItem' + (index + 1) + 'Tran'] = `translateY(-${(val - 3) * this.computeHeight}px)`
                })
            },
            autoPlay () {
                console.log('autoPlay11')
            },
            startPlay () {
                console.log('startPlay')
            },
            stopAutoPlay () {
                console.log('stop')
            },
            showBetSel () {
                /* 控制投注项 */
                this.showSingleBet = !this.showSingleBet
            },
            betSelFn (currVal) {
                if (currVal) {
                    this.dft_bet = currVal.bet
                    this.barProcess = Math.floor(parseFloat(currVal.lucky) / 100)
                    this.showSingleBet = false
                }
            }
        },
        computed: {
            last_prizes () {
                return this.$store.state.cs_tiger.last_prizes
            },
            prizes_pool () {
                return this.$store.state.cs_tiger.prizes_pool
            },
            recentList () {
                return this.$store.state.cs_tiger.recentList
            },
            initTigerMsg () {
                return this.$store.state.cs_tiger.initTigerMsg
            }
        },
        components: {
            Header
        },
        async mounted () {
            /* 订阅老虎机 */
            this.$store.dispatch('subInTiger')

            /* 首页请求 */
            let slotsHome = await this.$store.dispatch(aTypes.slotsHome)
            if (slotsHome) {
                if (slotsHome.free_times !== undefined) {
                    this.free_times = parseFloat(slotsHome.free_times)
                }
                /* 投注列表配置 */
                if (slotsHome.lucky_values) {
                    this.lucky_values = slotsHome.lucky_values
                }
                /* 默认投注项 */
                if (slotsHome.dft_bet !== undefined) {
                    this.dft_bet = slotsHome.dft_bet
                    if (this.lucky_values.length > 0) {
                        this.lucky_values.forEach((val, index) => {
                            if (val.bet === this.dft_bet.toString()) {
                                this.barProcess = val.lucky
                            }
                        })
                    }
                }
                if (slotsHome.dft_line !== undefined) {
                    this.dft_line = slotsHome.dft_line
                }
                if (slotsHome.prizes_pool_ratio) {
                    this.prizes_pool_ratio = slotsHome.prizes_pool_ratio
                }
                if (slotsHome.axes) {
                    this.axes = slotsHome.axes
                    this.axes.forEach((val, index) => {
                        this.axes[index] = val.concat(val)
                    })
                }
                if (slotsHome.dft_idx) {
                    this.dft_idx = slotsHome.dft_idx
                }
            }
        },
        updated () {
            //  4*15=75
            if (document.getElementById('hei') && !this.computeHeight) {
                this.$refs.js_slotBox.style.height = document.getElementById('hei').offsetHeight * 3 + 68 + 'px'
                this.computeHeight = parseFloat(window.getComputedStyle(document.getElementById('hei')).height.replace('px', '')) + 15
                this.hideInitLi = false
            } else {
                // this.$refs.js_slotBox.style.height = 70 * 3 + 72 + 'px'
                // this.computeHeight = 70
            }
        },
        beforeDestroy () {

            this.$store.dispatch('subOutTiger')
        },
        filters: {}
    }
</script>
<style scoped="" lang="less" rel="stylesheet/less">
    @import "../../styles/lib-mixins.less";
    @import "../../styles/lib-media.less";
    @import "../../styles/tiger.less";
    @import "../../styles/lib-font.less";

    div, a, img, p, span, i {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
    }


    .head-box{
        position: fixed;
        left:0;
        top:0;
        width:100%;
        z-index:9;
    }
    /*以移动端为主来写*/

    .placeholder{
        display: block;
        width:100%;
        opacity:0;
        height:0;
    }
    .bg-lucky{

    }

    .tiger {
        position: relative;
        -webkit-overflow-scrolling: touch;
        .bg-tiger {
            display: block;
            width: 100%;
        }
    }

    .tiger-wrap {
        position: absolute;
        left: 0;
        top: 0;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding-top:70px;
    }

    .jackpot-low {
        position: relative;
        z-index: 4;
        margin: 0 auto;
        background: url("../../assets/img/tiger/bg-jackpot.png") no-repeat center;
        background-size: contain;
        width: percentage(477/750);
        height: 117/2px;
        overflow: hidden;
        font-family: imp;
        text-align: center;
        color: #ffe400;
        .jackpot-all {
            display: flex;
            justify-content: center;
            height: 37px;
            overflow: hidden;
            p {
                line-height: 41px;
                font-size: 15px;
                color: #f3ca83;
            }
            i {
                margin: 0 3px 0 7px;
                line-height: 37px;
                font-size: 23px;
            }
            span {
                line-height: 40px;
                font-size: 15px;
            }
        }
        .jackpot-win {
            display: flex;
            justify-content: center;
            height: 35/2px;
            overflow: hidden;
            p {
                line-height: 20px;
                font-size: 12px;
                color: #f3ca83;
            }
            i {
                line-height: 35/2px;;
                margin: 0 3px 0 7px;
                font-size: 14px;
            }
            span {
                line-height: 21px;
                font-size: 10px;
            }
        }
    }

    .msg-win {
        /*   position: absolute;
           left:50%;
           top:0;
           margin-left:-482/4px;*/
        display: none;
        position: relative;
        z-index: 3;
        margin: 0 auto;
        width: 482/2px;
        height: 42/2px;
        overflow: hidden;
        background: url("../../assets/img/tiger/bg-msg-win.png") no-repeat center;
        background-size: cover;
        line-height: 21px;
        text-align: center;
        font-size: 10px;
        color: #ffffff;
    }

    .slot {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 2;
        &.bingo{
            &::before{
                content: '';
                display: block;
                position: absolute;
                left:0;
                top:0;
                width:100%;
                height:100%;
                animation: bingo 0.2s alternate infinite;
            }
        }
        .bg-slot {
            position: absolute;
            left: 0;
            bottom: 26px;
            width: 100%;
        }
        .bg-slot-run {
            display: none;
        }
    }

    .slot.run {
        background: url("../../assets/img/tiger/bg-slot-run.png") no-repeat top center;
        background-size: contain;
    }

    .slot.opening {
        .slot-box {
            overflow: visible;
        }
        ul {
            height: 100%;
            overflow: hidden;
        }
        li.yes {
            border: 4px solid #fff287;
            border-radius: 12px;
            box-shadow: inset 0 0 10px #fff287, 0 0 10px #fff287;
        }
        li:not(.yes) {
            img {
                opacity: 0.3;
            }
        }
    }

    .slot-box {
        position: relative;
        margin: 0 auto;
        top: percentage(260/1173);
        width: percentage(610/750);
        /*高度需要动态设置*/
        height: 0;
        overflow: hidden;
        display: flex;
        justify-content: center;
        /*~防止less解析/，这里是单独设置水平和垂直的半径*/
        border-top-left-radius: ~"123px 60px";
        border-top-right-radius: ~"123px 60px";
        border-bottom-left-radius: ~"57px 60px";
        border-bottom-right-radius: ~"57px 60px";
        ul {
            width: 33%;
            li {
                width: 95%;
                box-sizing: border-box;
                margin: 15px auto 0;
                transition: all 0.2s ease-in;
                border:4px solid transparent;
                img {
                    display: block;
                    margin: 0 auto;
                    /* 168/203=82.75*/
                    width: 82.75%;
                }
            }
        }
    }

    .slot-item1 {
        /*transform: translateY(10px);*/
    }

    .btn-main {
        position: absolute;
        z-index: 3;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
        width: 48.4%;
        cursor: pointer;
        img {
            display: block;
            width: 100%;
        }
        .btn {
            position: absolute;
            top: 0px;
            left: 50%;
            transform: translateX(-50%);
            width: percentage(339/363);
            height: percentage(118/143);
            overflow: hidden;
            text-align: center;
            color: #fff;
            font-family: arial;
            p {
                padding-top: 7px;
                line-height: 26px;
                font-size: 24px;
                font-weight: bold;
            }
            div {
                line-height: 20px;
                font-size: 12px;
            }
        }
        .btn-spin {
            background: url("../../assets/img/tiger/btn-spin.png") no-repeat center;
            background-size: cover;
        }
        .btn-free {
            background: url("../../assets/img/tiger/btn-free.png") no-repeat center;
            background-size: cover;
        }
        .btn-auto {
            background: url("../../assets/img/tiger/btn-auto.png") no-repeat center;
            background-size: cover;
        }
        &:active {
            .btn {
                animation: btn .5s;
            }
        }
    }

    .lastwin {
        position: absolute;
        z-index: 3;
        left: 0;
        bottom: percentage(146/1173);
        width: 100%;
        height: 28px;
        overflow: hidden;
        text-align: center;
        line-height: 28px;
        font-size: 10px;
        color: #fff;
        font-family: Arial;
    }

    .operating {
        position: absolute;
        z-index: 3;
        width: percentage(610/750);
        left: 50%;
        bottom: percentage(200/1173);
        transform: translateX(-50%);
        display: flex;
        justify-content: space-between;
        text-align: center;
        > div {
            position: relative;
            width: percentage(173/610);
            border-radius: 6px;
            padding: 0 5px;
            box-sizing: border-box;
        }
        .single {
            background: #2f250f;
            border: 2px solid #bc9357;
            .single-amount {
                font-size: 15px;
            }
            .single-unit {
                line-height: 22px;
                font-size: 10px;
            }
            ul {
                /*display: none;*/
                position: absolute;
                left: -2px;
                top: -52px;
                width: 100%;
                border: 2px solid #bc9357;
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
                border-bottom: none;
                color: #ffe400;
                background: #2f250f;
                li {
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    height: 25px;
                    line-height: 25px;
                    background: url("../../assets/img/tiger/bg-green.jpg") repeat-x;
                    background-size: cover;
                    border-top-left-radius: 6px;
                    border-top-right-radius: 6px;
                    border-top: 2px solid #2f250f;
                    margin: 0 2px;
                    font-weight: bold;
                    .single-unit {
                        line-height: 28px;
                    }
                }
            }
            .msg {
                position: relative;
                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 5px;
                    right: 5%;
                    background: url("../../assets/img/tiger/icon-arrow.png") no-repeat center;
                    background-size: cover;
                    width: 15/2px;
                    height: 9/2px;
                }
            }
            &.on {
                border-top: transparent;
                border-top-left-radius: 0;
                border-top-right-radius: 0;
                ul {
                    display: block;
                }
            }
        }
        .all {
            background-color: rgba(0, 0, 0, 0.3);
            .all-amount {
                font-size: 15px;
            }
            .all-unit {
                line-height: 22px;
                font-size: 10px;
            }
        }
        .bar {
            background-color: rgba(0, 0, 0, 0.3);
            .top {
                justify-content: space-between;
            }
            .bar-process {
                position: relative;
                width: percentage(104/175);
                overflow: hidden;
                margin-top: 3px;
                background: url("../../assets/img/tiger/bg-bar.png") no-repeat top center;
                background-size: contain;
                i {
                    position: absolute;
                    box-sizing: border-box;
                    left: 5%;
                    top: 19%;
                    width: 90%;
                    height: 40%;
                    overflow: hidden;
                    background: url("../../assets/img/tiger/bg-green.jpg") repeat-x;
                    background-size: cover;
                    border-radius: 2px;
                }
            }
            .bar-msg {
                font-size: 13px;
                color: #7fd31d;
                font-weight: bold;
            }
        }
        .top {
            display: flex;
            justify-content: center;
            padding-top: 6px;
            height: 43/2px;
            line-height: 43/2px;
            color: #ffe400;
            font-weight: bold;
        }
        .msg {
            border-top: 1px solid rgba(255, 255, 255, 0.2);
            line-height: 16px;
            font-size: 10px;
            color: #fff;
            font-family: Arial;
        }
    }
    /*pop*/
    .pop{
        width:0;
        height:0;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        overflow: hidden;
        transition: all 0.2s;
        background: transparent;
    }
    .reward-small{
       /* width:percentage(348/750);*/
       /* padding-bottom:percentage((348/750)*(163/348));*/
        background: url("../../assets/img/tiger/reward-small.png") no-repeat center;
        background-size: contain;
        color: #ffe400;
        .msg{
            display: flex;
            justify-content: center;
            margin-top:26px;
        }
        p{
            font-size:30px;
            line-height:50px;
            margin-right:2px;
        }
        i{
            font-size:18px;
            line-height:58px;
        }
        &.show{
            width:348/2px;
            height:163/2px;
        }
    }
    .reward-big{
        &:before{
            position: relative;
            z-index:2;
            content: '';
            display: block;
            background: url("../../assets/img/tiger/reward-big.png") no-repeat center;
            background-size: cover;
            width:443/2px;
            height:251/2px;
            overflow: hidden;
            margin:0 auto;
        }
        .bg1{
            box-sizing: border-box;
            position: relative;
            z-index:1;
            top:-10px;
            width:595/2px;
            border:5px solid #3d276a;
        }
        .bg2{
            box-sizing: border-box;
            width:100%;
            height:100%;
            background: #3d276a;
            border:5px solid #ff9000;
            padding-bottom:3px;
            box-shadow: inset 0 0 20px #9924a7;
        }
        .msg{
            display: flex;
            justify-content: center;
            margin-top:7px;
            height:135/2px;
            color: #ffe400;
            font-family: imp;
            overflow: hidden;
            p{
                line-height:135/2px;
                font-size:50px;
            }
            i{
                line-height:90px;
                font-size:24px;
            }
        }
        ul{
            display: flex;
            justify-content: center;
            height:22px;
            line-height:22px;
            overflow: hidden;
            font-size:12px;
            color: #fff;
            li{
                display: flex;
                justify-content: center;
            }
            li+li{
                margin-left:5px;
            }
            img{
                display: block;
                width:22px;
                height:22px;
            }
        }
        &.show{
            width:595/2px;
            height:auto;
        }
    }
    .help{
        top:60px;
        transform: translate(-50%, 0);
        box-sizing: border-box;

        border-radius: 8px;
        background: #2f2a3d;
        .tiger-close{
            position: absolute;
            top:0;
            right:0;
            background: url("../../assets/img/tiger/btn-close.png") no-repeat center;
            background-size: 12px;
            width:12px;
            height:12px;
            padding:12px 16px;
        }
        .title{
            position: relative;
            width:percentage(469/674);
            height:0;
            padding-bottom:percentage((469/674)*(64/469));
            margin:0 auto;
            text-align: center;
            font-size:18px;
            color: #fff;
            font-family: sans-eb;
            background: url("../../assets/img/tiger/bg-helpTitle.png") no-repeat center;
            background-size: cover;
            p{
                position: absolute;
                left:50%;
                top:50%;
                transform: translate(-50%,-50%);
            }
        }
        .tab-t{
            border:1px solid #443a5b;
            border-radius: 3px;
            overflow: hidden;
            margin:15px auto 0;
            font-size:12px;
            li{
                width:33.333%;
                box-sizing: border-box;
                float: left;
            }
            a{
                display: block;
                width:100%;
                height:100%;
                color: #fff;
            }
            li+li{
                border-left:1px solid #443a5b;
            }
            li.on{
                font-weight:bold;
                background: #443a5b;
            }
        }
        .tab-c{
            >li{
                display: none;
            }
            >li.on{
                display: block;
            }
            .line-divi{
                position: relative;
                /*margin:25px auto 20px;*/
                margin:15px auto 10px;
                line-height:14px;
                font-size:11px;
                color: #7f6bad;
                &::before{
                    content: '';
                    display: block;
                    position: absolute;
                    left:0;
                    bottom:7px;
                    width:100%;
                    height:1px;
                    background: #7f6bad;
                    z-index:-1;
                }
                div{
                    position: relative;
                    display: table;
                    padding:0 20px;
                    margin:0 auto;
                    background: #2f2a3d;
                    &::before,&::after{
                        content: '';
                        display: block;
                        position: absolute;
                        bottom: 4px;
                        background: url(../../assets/img/tiger/start.png) no-repeat center;
                        background-size: cover;
                        width:7px;
                        height:7px;
                        overflow: hidden;
                    }
                    &::before{
                        left:-1px;
                    }
                    &::after{
                        right:-1px;
                    }
                }
            }
            .winningamount{
                line-height:20px;
                font-size:16px;
                color: #fff;
            }
            .details{
                display: block;
                width: percentage(550/597);
                margin:14px auto 0;
            }
            .special{
                li{
                    overflow: hidden;
                    line-height:15px;
                    font-size:12px;
                    color: #fff;
                }
                li+li{
                    margin-top:30px;
                }
                .icon{
                    float: left;
                    width:116/2px;
                }
                img{
                    display: block;
                    margin:0 auto;
                    width:24px;
                }
                p{
                    margin-left:116/2px;
                    text-align: left;
                }
            }
            .smallAward{
                display: block;
                margin:0 auto 0;
                width:percentage(375/674);
            }
            .msg{
                margin-top:6px;
                /*padding:0 22px;*/
                padding:0 19px;
                line-height:15px;
                text-align: left;
                font-size:12px;
                color: #fff;
            }
            .lucky-value{
                display: flex;
                justify-content: space-between;
                width:percentage(406/597);
                margin:0 auto;
                img{
                    display: block;
                    width:100%;
                }
                p{
                    width:52px;
                    font-size:12px;
                    line-height:30px;
                    color: #fff;
                }
            }
            .lucky-48{
                width:171/2px;
            }
            .lucky-100{
                width:158/2px;
            }
            .win-line{
                display: block;
                width:percentage(539/674);
                margin:0 auto;
            }
        }
        &.show{
            max-width:674/2px;
            width:percentage(674/750);
            height:auto;
            padding:0 15px 12px;
            border:2px solid #96825c;
        }
    }

    /*pc content*/
    .tiger-pc-msg {
        width: 365px;
        height: 100%;
        padding: 70px 18px 0;
        background: rgba(29, 21, 7, 0.8);
        color: #79695c;
        h3 {
            line-height: 64px;
            font-size: 28px;
        }
        .recent-win {
            text-align: center;
        }
        .user {
            float: left;
            width: 160px;
            text-align: left;
        }
        .win {
            float: left;
            width: 92px;
        }
        .time {
            float: right;
            width: 58px;
        }
    }

    .recent-top {
        padding: 0 10px;
        line-height: 30px;
        font-size: 16px;
        border-bottom: 1px solid #5a4d3f;
        text-align: center;
        overflow: hidden;
    }

    .recent-main {
        height:320px;
        overflow: hidden;
        li {
            padding: 0 10px;
            line-height: 40px;
            overflow: hidden;
        }
        li:nth-child(2n) {
            background: #352b17;
        }
        .user {
            color: #fff;
        }
        .win {
            color: #f4dc01;
        }
        .time {
            color: #67594d;
        }
    }

    .contact {
        padding-top: 5px;
        overflow: hidden;
        .fl {
            float: left;
            width: 250px;
        }
        .fr {
            float: right;
            img {
                display: block;
                margin-top: 4px;
                width: 75px;
                height: 71px;
            }
        }
        .msg1 {
            line-height: 22px;
        }
        .msg2 {
            line-height: 43px;
            font-size: 16px;
            color: #ffffff;
        }
    }

    @keyframes btn {
        0%, 100% {
            top: 0;
        }
        50% {
            top: 2px;
        }
    }

    /*适配*/
    @media (max-width: @screen-desktop) {
        .tiger-pc-msg {
            display: none;
        }
        .msg-win {
            display: block;
        }
    }
    @media (max-width: @screen-tablet) {
        .tiger-wrap{
            padding-top:50px;
        }
    }
    @media (min-width: @screen-phone) {

        .tiger-pc{
            position: relative;
            top:0;
            left:50%;
            transform: translateX(-50%);
            width: 100%;
            height: 586px;
            background: url("../../assets/img/tiger/bg-pc.jpg") no-repeat top center;
            background-size: 1920px 586px;
        }
        .tiger-main {
            height: 100%;
            margin: 0 auto;
            overflow: hidden;
            display: flex;
            justify-content: center;
        }
        .tiger {
            width: 375px;
            overflow: hidden;
            border-left: 25px solid #080603;
            border-right: 25px solid #080603;
        }

        .operating .bar .bar-process i {
            top: 14%;
            height: 38%;
        }

        .operating .single .msg::after {
            right: 0;
        }
    }
    @keyframes bingo {
        0%,25%,100%{
            background: url("../../assets/img/tiger/line.png") no-repeat center;
            background-size: cover;
        }
        50%,75%{
            background: url("../../assets/img/tiger/line2.png") no-repeat center;
            background-size: cover;
        }
    }
    //background: url("../../assets/img/tiger/bg-slot.png") no-repeat center;

</style>
