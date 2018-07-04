<template>
    <div >
        <div class="tiger-pc ">
            <Header></Header>
            <div class="tiger-main" @click="initPop">
                <div class="tiger ">
                    <img class="bg-tiger" src="@/assets/img/tiger/bg-tiger.jpg" alt="">
                    <div class="tiger-wrap ">
                        <!--规则icon-->
                        <a href="javascript:;" class="btn-rule " @click="isShowHelp = true">
                            ?
                        </a>
                        <!--低奖池-->
                        <div class="jackpot-low ">
                            <div class="jackpot-all">
                                <p>
                                    JACKPOT
                                </p>
                                <i v-if="prizes_pool">
                                    {{ formateBalance( prizes_pool ) }}
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
                                        {{formateBalance ( parseFloat(prizes_pool) * prizes_pool_ratio[dft_bet] )  }}
                                    </template>
                                    <template v-else>
                                        {{ Math.abs( prizes_pool_ratio[dft_bet]) }}
                                    </template>
                                    </span>
                                </p>
                                <!--<span>-->
                                    <!--ETH-->
                                <!--</span>-->
                            </div>
                        </div>
                        <!--中奖播报  transform: translateY(-3341.41px);  -->
                        <div class="msg-win">
                            <ul  class="clearfix" v-if="recentList"  >
                                <li class="msgLis" v-for="item in recentList" :class="{'newRecord':item.addNewRecord}" style="transform: translateY(-0px)" >
                                     Congratulate {{formateEmail( item.username , true ) }} on winning {{ formateBalance ( item.prize ) }} {{ formateCoinType( item.cointype ) }}
                                </li>
                            </ul>
                        </div>
                        <!--进行中 run 开奖 opening - yes  中奖opening  -->
                        <div class="slot " :class="{'run':slotRun,'opening':slotOpening}">
                            <div ref="js_slotBox" id="js_slot-box" class="slot-box">
                                <template>
                                    <!-- class="yes" -->
                                    <ul class="slot-item1" id="slotItem1" :style="{ 'transform':slotItem1Tran}" v-if="axes && axes[0]" :class="{tranitionTiming:tranitionTiming}">
                                        <li v-if="axes" v-for="item in axes[0]" >
                                            <img :src="`../../../static/staticImg/_${item}.png`" :alt="item" />
                                        </li>
                                        <li id="hei">
                                            <img v-if="hideInitLi" id="heiImg" src="../../../static/staticImg/_A.png" alt="">
                                        </li>
                                    </ul>
                                    <ul class="slot-item2" id="slotItem2" :style="{ 'transform':slotItem2Tran}" v-if="axes && axes[1]"  :class="{tranitionTiming:tranitionTiming}">
                                        <li v-for="item in axes[1]" >
                                            <img :src="`../../../static/staticImg/_${item}.png`" :alt="item" />
                                        </li>
                                    </ul>
                                    <ul class="slot-item3" id="slotItem3" :style="{ 'transform':slotItem3Tran}" v-if="axes && axes[2]"  :class="{tranitionTiming:tranitionTiming}">
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
                            <div class="single"  @click="showBetSel">
                                <div>
                                    <div class="top">
                                        <div class="single-amount">
                                            {{ dft_bet }}
                                        </div>
                                        <div class="single-unit">
                                            ETH
                                        </div>
                                    </div>
                                    <p class="msg hide">
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
                                    <div class="bar-msg" v-if="hideBarLycky">
                                        {{ ( barProcess * (100/96) ).toFixed(1) }}%
                                    </div>
                                    <div class="bar-lycky" v-else></div>
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
                        <a href="javascript:;" class="btn-main " :class="{disable:btnDisable}">
                            <img src="@/assets/img/tiger/btn-bg.png" alt="">
                            <template v-if="hideBarLycky">
                                <!--自动-->
                                <div @click="stopAutoPlay" class="btn btn-auto" :class="{'hide':!isAutoPlay}">
                                    <p>AUTO</p>
                                    <div>Click to Stop</div>
                                </div>
                                <!--免费-->
                                <div class="btn btn-free" @touchstart="touStart" @touchend="touEnd" @mousedown="touStart" @mouseup="touEnd"  :class="{'hide':!parseFloat(free_times)}">
                                    <p>FREE</p>
                                    <div>{{ free_times }} Times</div>
                                </div>
                                <!-- 开始按钮btn-spin  @dblclick="autoPlay" @click="startPlay" -->
                                <div @touchstart="touStart" @touchend="touEnd" @mousedown="touStart" @mouseup="touEnd" class="btn btn-spin" :class="{'hide':parseFloat(free_times) || isAutoPlay}">
                                    <p>SPIN</p>
                                    <div>Auto(double click)</div>
                                </div>
                            </template>
                            <template v-else>
                                <!-- double -->
                                <div @touchstart="touStart" @touchend="touEnd" @mousedown="touStart" @mouseup="touEnd" class="btn btn-double" >
                                    Double Up
                                </div>
                            </template>
                        </a>
                    </div>
                    <!--pop show  show double-->
                    <!-- 小奖 -->
                    <div class="pop reward-small " :class="{'show':rewardSmall,'double':playBack && playBack.isdouble==='1'}">
                        <div class="msg" >
                            <p v-if="playBack && playBack.isdouble==='0'">{{ formateBalance( playBack.line_prizes ) }}</p>
                            <p v-if="playBack && playBack.isdouble==='1'">{{ formateBalance( playBack.line_prizes / 2 ) }}</p>
                            <i>{{ formateCoinType( currCoinType ) }}</i>

                        </div>
                    </div>
                    <!--大奖 winDouble -->
                    <div v-show="playBack" class="pop reward-big " :class="{'show':rewardBig,'double':playBack && playBack.isdouble==='1'}">
                        <div class="bg1" >
                            <div class="bg2">
                                <div class="msg" v-if="playBack">
                                    <template v-if="jackPot">
                                        <p v-if=" playBack.isdouble==='1'">
                                            {{ formateBalance( parseFloat(playBack.line_prizes) + parseFloat(playBack.pool_prizes) / 2 ) }}
                                        </p>
                                        <p v-if=" playBack.isdouble==='0'">
                                            {{ formateBalance( parseFloat(playBack.line_prizes) + parseFloat(playBack.pool_prizes) ) }}
                                        </p>
                                    </template>
                                    <template v-else>
                                        <p v-if=" playBack.isdouble==='1'">
                                            {{ formateBalance( parseFloat(playBack.line_prizes) / 2 ) }}
                                        </p>
                                        <p v-if=" playBack.isdouble==='0'">
                                            {{ formateBalance( parseFloat(playBack.line_prizes) ) }}
                                        </p>
                                    </template>
                                    <i>
                                        {{ formateCoinType( currCoinType ) }}
                                    </i>
                                </div>
                                // todo 奖池倍数 暂时隐藏
                                <ul class="hide">
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
                                <ul class="hide">
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
                    <div class="pop help" :class="{show:isShowHelp}">
                        <a href="javascript:;" class="tiger-close" @click="isShowHelp=false"></a>
                        <div class="title">
                            <p>Instructions</p>
                        </div>
                        <ul class="tab-t">
                            <li :class="{on:tab_t===1}" @click="tab_t=1"><a href="javascript:;">Winning Table</a></li>
                            <li :class="{on:tab_t===2}" @click="tab_t=2"><a href="javascript:;">Lucky Prize</a></li>
                            <li :class="{on:tab_t===3}" @click="tab_t=3"><a href="javascript:;">Winning Line</a></li>
                        </ul>
                        <ul class="tab-c">
                            <li :class="{on:tab_t===1}">
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
                            <li :class="{on:tab_t===2}">
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
                            <li :class="{on:tab_t===3}">
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
                    <!--充值-->
                    <div class="pop pop-recharge" :class="{'show':showRecharge}">
                        {{ showRecharge }}
                        <a @click="showRecharge=false" href="javascript:;" class="recharge-close"></a>
                        <div class="title">
                            <p>Copy the Ethereum wallet</p>
                            <p>address (only supports ETH)</p>
                        </div>
                        <div class="copy" v-if="userInfo && userInfo.accounts">
                            <a href="javascript:;" rel="nofollow"
                               v-clipboard:copy="userInfo.accounts[0].address"
                               v-clipboard:success="copySucc"
                               v-clipboard:error="copyError"
                            >COPY</a>
                            <p v-if="userInfo && userInfo.accounts">{{ userInfo.accounts[0].address }}</p>
                        </div>
                        <div class="msg">
                            or scan to get the address
                        </div>
                        <img v-if="userInfo && userInfo.accounts"
                             :src="'http://mobile.qq.com/qrcode?url='+ userInfo.accounts[0].address " alt="recharge">
                    </div>
                </div>
                <div class="tiger-pc-msg ">
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
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '~components/Header_bk.vue'
    import Footer from '~components/Footer_bk.vue'
    import {mTypes, aTypes} from '~/store/cs_page/cs_tiger'
    import {copySucc, copyError, formateEmail, formatTime, formateBalance, formateCoinType, wait} from '~common/util'
    export default {
        data () {
            return {
                showRecharge: false, // 显示充值弹窗
                hideBarLycky: true,
                tab_t: 1,
                tranitionTiming: false, // 运动是否需要过程
                btnDisable: false, // 按钮不可用
                rewardBig: false, // 大奖
                rewardSmall: false, // 小奖
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
                isfree: 0, // 是否免费
                dft_line: 9, // 默认9线
                showSingleBet: false, // 投注项选择
                barProcess: 20,
                prizes_pool_ratio: null, // hitWinRatio
                axes: null, // axes
                dft_idx: null, // dft_idx 改变后的位置
                hideInitLi: true,
                computeHeight: 0,
                slotItem1Tran: 'translateY(0px)',
                slotItem2Tran: 'translateY(0px)',
                slotItem3Tran: 'translateY(0px)',
                isShowHelp: false,
                slotRun: false,
                animateInterval: null, // 动画时间
                lineLightTime: 240, // 结果展示时间
                allLinePopTime: 2300, // 展示动画间隔
                winRes: [],
                baseMove: {
                    /*
                    *  10 停止
                    *  line9  是口哨  'one0', 'one-2', 'two0', 'three-1',
                    *  30 奖池
                    * */
                    line0: [-1, -1, -1, 10],
                    line1: [-2, -2, -2, 10],
                    line2: [0, 0, 0, 10],
                    line3: [-2, -1, 0, 10],
                    line4: [0, -1, -2, 10],
                    line5: [-1, -2, -1, 10],
                    line6: [-1, 0, -1, 10],
                    line7: [-2, -1, -2, 10],
                    line8: [0, -1, 0, 10],
                    line9: [],
                    line10: [30, 30, 30, 10]
                },
                playBack: null, // 下单接口返回的所有值
                totalRadio: 0,
                setRewardIcon: 'lineWard',
                jackPot: false,
                slotOpening: false, // opening 类
                tabTime: 0,
                auto_run: 10,
                currRun: 0,
                isAutoPlay: false, // 按钮双击样式
                currBalance: 0
            }
        },
        watch: {
            computeHeight (hei) {
                if (hei && this.dft_idx) {
                    // this.setLacal()
                }
            }
        },
        methods: {
            copySucc,
            copyError,
            formatTime,
            formateBalance,
            formateEmail,
            formateCoinType,
            initPop () {
                /* head 弹窗 */
                this.$store.commit('initHeadState', new Date().getTime())
            },
            initLacal (head = false) {
                /* new  结果的走  */
                // this.axes.forEach((val, index) => {
                //     let dft = val.splice(this.dft_idx[index], 3)
                //     // let val2 = []
                //     // for (let i = 0; i < 3; i++) {
                //     //     val2 = val2.concat(val)
                //     // }
                //     /* 打乱 */
                //     // val2 = val2.sort(function () { return 0.5 - Math.random() }).concat(dft)
                //     if (head) {
                //         this.axes[index] = dft.concat(this.axes[index])
                //     } else {
                //         this.axes[index] = this.axes[index].concat(dft)
                //     }
                //     // this.axes[index] = val2
                // })
                this.axes.forEach((val, index) => {
                    let dft = null
                    if (head) {
                        dft = val.slice(parseFloat(this.dft_idx[index]) + 27, parseFloat(this.dft_idx[index]) + 30)
                        this.axes[index] = dft.concat(this.axes[index])
                    } else {
                        /* 需要删掉最后三个 */
                        dft = val.slice(parseFloat(this.dft_idx[index]) + 30, parseFloat(this.dft_idx[index]) + 33)
                        if (this.axes[index].length > 63) {
                            this.axes[index].splice(0, 3)
                            this.axes[index] = dft.concat(this.axes[index])
                            this.axes[index].splice(-3)
                        }
                        this.axes[index] = this.axes[index].concat(dft)
                    }

                // let val2 = []
                // for (let i = 0; i < 3; i++) {
                //     val2 = val2.concat(val)
                // }
                /* 打乱 */
                // val2 = val2.sort(function () { return 0.5 - Math.random() }).concat(dft)
                // if (head) {
                //     this.axes[index] = dft.concat(this.axes[index])
                // } else {
                //     this.axes[index] = this.axes[index].concat(dft)
                // }
                // this.axes[index] = val2
                })
            },
            setLacal () {
                this.dft_idx.forEach((val, index) => {
                    val = parseFloat(val) + 30
                    this['slotItem' + (index + 1) + 'Tran'] = `translateY(-${(val - 3) * this.computeHeight}px)`
                })
            },
            resetLacal () {
                this.tranitionTiming = false
                this.dft_idx.forEach((val, index) => {
                    this['slotItem' + (index + 1) + 'Tran'] = 'translateY(0px)'
                })
            },
            touStart (evt) {
                evt.preventDefault()
                this.tabTime = new Date().getTime()
            },
            touEnd () {
                this.tabTime = (new Date().getTime() - this.tabTime)
                if (this.tabTime > 500) {
                    /* 长按 */
                    this.autoPlay()
                    this.startPlay()
                    this.currRun = this.currRun - 1
                } else if (this.tabTime > 50 && this.tabTime <= 500) {
                    /* 点击 */
                    this.startPlay()
                }
            },
            autoPlay () {
                this.currRun = this.auto_run
                this.isAutoPlay = true
            },
            stopAutoPlay () {
                this.currRun = this.auto_run
                this.isAutoPlay = false
            },
            async endInit () {
                /* 结束初始化 */
                // 预留是否手动减值的空间
                // this.$store.dispatch('getUserInfo')
                this.slotOpening = false // 开奖结束
                this.btnDisable = false
                await wait(2000)
                if (this.isAutoPlay) {
                    if (this.currRun > 0) {
                        this.startPlay()
                        this.currRun = this.currRun - 1
                    } else {
                        this.stopAutoPlay()
                    }
                }
            },
            stateInit () {
                this.isAutoPlay ? this.btnDisable = false : this.btnDisable = true
            },
            formateWindow (windowStr = ['S|C|D', 'S|S|D', 'S|C|S']) {
                /* 获得口哨  坐标 */
                // line9: ['one0', 'one-2', 'two0', 'three-1', 'three-2', 10],
                let nowWhis = null
                let baseLine9 = []
                let baseLineFn = (nowWhis, localVal) => {
                    nowWhis.forEach((valS, index) => {
                        if (valS === 'S') {
                            switch (index) {
                            case 0:
                                baseLine9.push('one' + localVal)
                                break
                            case 1:
                                baseLine9.push('two' + localVal)
                                break
                            case 2:
                                baseLine9.push('three' + localVal)
                                break
                            }
                        }
                    })
                }
                windowStr.forEach((val, index) => {
                    if (~val.indexOf('S')) {
                        nowWhis = val.split('|')
                        if (index === 0) {
                            baseLineFn(nowWhis, '-2')
                        } else if (index === 1) {
                            baseLineFn(nowWhis, '-1')
                        } else if (index === 2) {
                            baseLineFn(nowWhis, '0')
                        }
                    }
                })
                baseLine9.push(10)
                this.baseMove.line9 = baseLine9
            },
            async startPlay () {
                if (this.btnDisable) {
                    return false
                }
                /* 是否登录 */
                if (!this.isLog) {
                    this.$store.commit('showLoginPop')
                    return false
                }
                /* 余额是否充足 */
                if (this.userInfo && this.userInfo.accounts[0]) {
                    if (parseFloat(this.userInfo.accounts[0].balance) < (parseFloat(this.dft_line) * parseFloat(this.dft_bet))) {
                        /* 显示余额不足 */
                        this.showRecharge = true
                        return false
                    }
                }
                let orderMsg = {
                    dft_line: this.dft_line,
                    single_bet: this.dft_bet,
                    cointype: 2001
                }
                let playBack = await this.$store.dispatch(aTypes.startPlay, orderMsg)
                //  todo 临时直接更新
                this.$store.dispatch('getUserInfo')
                this.stateInit()
                this.slotRun = true
                if (playBack) {
                    this.playBack = playBack
                    this.initPage(playBack)
                    if (playBack.idx) {
                        // 结果 位置
                        this.resetLacal()
                        this.dft_idx = playBack.idx
                        this.initLacal()
                        this.dft_idx = [36, 36, 36]
                        setTimeout(() => {
                            this.tranitionTiming = true
                            this.setLacal()
                        }, 400)
                    }
                    if (playBack.window) {
                        /*  处理口哨 的数组格式 */
                        this.formateWindow(playBack.window)
                    }
                    if (playBack.results) {
                        this.showResults(playBack.results)
                    }
                    if (playBack.lucky_values) {
                        this.formateLuckyVal(playBack.lucky_values)
                    }
                } else {
                    this.endInit()
                }
            },
            async showResults (res) {
                /* 结果展示 */
                this.totalRadio = 0
                this.winRes = []
                if (res && Array.isArray(res)) {
                    if (res[10] === '1') {
                        this.winRes.push({
                            line: 'line10',
                            value: '1'
                        })
                    } else {
                        res.forEach((val, index) => {
                            if (val.toString() !== '0') {
                                this.totalRadio += parseFloat(val)
                                if (index === 9) {
                                    this.winRes.unshift({
                                        line: 'line' + index,
                                        value: val
                                    })
                                } else {
                                    this.winRes.push({
                                        line: 'line' + index,
                                        value: val
                                    })
                                }
                            }
                        })
                    }
                    /* 预留 转动的时间 */
                    await wait(2700)
                    this.slotRun = false // 动画结束
                    this.slotOpening = true
                    if (this.winRes.length > 0) {
                        /* 具体执行的动画 0 - 8 线 */
                        this.controlAnimate()
                        clearInterval(this.animateInterval)
                        this.animateInterval = setInterval(this.controlAnimate, this.allLinePopTime)
                    } else {
                        /* 没中 */
                        this.endInit()
                    }
                }
            },
            async controlAnimate () {
                let popWinRes = null
                if (this.winRes.length > 0) {
                    let nowMove = null
                    popWinRes = this.winRes.shift()
                    if (popWinRes.line === 'line9') {
                        /* 口哨 */
                        this.setRewardIcon = 'whisWard'
                        nowMove = this.baseMove[popWinRes.line]
                        this.nowWhistMove(nowMove)
                    } else if (popWinRes.line === 'line10') {
                        this.slotOpening = false
                        /* 奖池奖 */
                        this.setRewardIcon = 'jackPotWard'
                    } else {
                        /* 0- 8 线 */
                        this.setRewardIcon = 'lineWard'
                        nowMove = this.baseMove[popWinRes.line]
                        this.nowLineMove(nowMove, this.dft_idx)
                    }
                } else {
                    clearInterval(this.animateInterval)
                    if (this.setRewardIcon === 'lineWard') {
                        /* 显示大奖还是小奖 */
                        if (this.totalRadio >= 25) {
                            // 大奖
                            this.rewardBig = true
                        } else {
                            this.rewardSmall = true
                        }
                        this.$store.commit(mTypes.last_prizes, parseFloat(this.playBack.line_prizes) + parseFloat(this.playBack.pool_prizes))
                        await wait(2500)
                        // 隐藏奖池图标
                        this.rewardBig = false
                        this.rewardSmall = false
                        this.endInit()
                    } else if (this.setRewardIcon === 'jackPotWard') {
                        this.rewardBig = true
                        this.jackPot = true
                        this.$store.commit(mTypes.last_prizes, parseFloat(this.playBack.line_prizes) + parseFloat(this.playBack.pool_prizes))

                        //  todo 特殊烟花
                        await wait(5000)

                        this.currRun = 0
                        this.rewardBig = false
                        this.endInit()
                    } else if (this.setRewardIcon === 'whisWard') {
                        await wait(100)
                        this.endInit()
                    }
                    // 是否应该在结束时更新数据
                }
            },
            nowLineMove (nowMove = [-1, -2, -1, 10], endIdx = [3, 3, 3]) {
                /* 执行的动画 */
                for (let i = 0;i < 4;i++) {
                    setTimeout(() => {
                        let lineLocal = null
                        let querySel = null
                        if (nowMove[i] !== 10) {
                            lineLocal = parseFloat(endIdx[i]) + 30 + parseFloat(nowMove[i]) - 1
                            querySel = '#slotItem' + (i + 1) + ' li'
                            if (document.querySelectorAll(querySel)[lineLocal]) {
                                document.querySelectorAll(querySel)[lineLocal].className = 'yes'
                            }
                        } else {
                            /* 所有初始化 */
                            this.initAllLine()
                        }
                    }, (this.lineLightTime * (i + 1)))
                }
            },
            nowWhistMove (whistMove = ['one0', 'one-2', 'two0', 'three-1', 'three-2', 10]) {
                /* 口哨  通过replace 进行处理 */
                if (whistMove && whistMove.length > 0) {
                    for (let i = 0;i < whistMove.length;i++) {
                        setTimeout(() => {
                            let lineLocal = null
                            let querySel = null
                            if (whistMove[i] !== 10) {
                                if (~whistMove[i].indexOf('one')) {
                                    lineLocal = parseFloat(this.dft_idx[0]) + 30 + parseFloat(whistMove[i].replace('one', '')) - 1
                                    querySel = '#slotItem1 li'
                                    if (document.querySelectorAll(querySel)[lineLocal]) {
                                        document.querySelectorAll(querySel)[lineLocal].className = 'yes'
                                    }
                                }
                                if (~whistMove[i].indexOf('two')) {
                                    lineLocal = parseFloat(this.dft_idx[1]) + 30 + parseFloat(whistMove[i].replace('two', '')) - 1
                                    querySel = '#slotItem2 li'
                                    if (document.querySelectorAll(querySel)[lineLocal]) {
                                        document.querySelectorAll(querySel)[lineLocal].className = 'yes'
                                    }
                                }
                                if (~whistMove[i].indexOf('three')) {
                                    lineLocal = parseFloat(this.dft_idx[2]) + 30 + parseFloat(whistMove[i].replace('three', '')) - 1
                                    querySel = '#slotItem3 li'
                                    if (document.querySelectorAll(querySel)[lineLocal]) {
                                        document.querySelectorAll(querySel)[lineLocal].className = 'yes'
                                    }
                                }
                            } else {
                                /* 所有初始化 */
                                this.initAllLine()
                            }
                        }, (this.lineLightTime * (i + 1)))
                    }
                }
            },
            async initAllLine () {
                /* 初始化 yes */
                try {
                    await wait(650)
                    Array.from(document.querySelectorAll('#js_slot-box li')).forEach((val) => {
                        val.className = ''
                    })
                } catch (e) {
                    console.log(e)
                }
            },
            showBetSel () {
                /* 控制投注项 */
                if (this.isAutoPlay) {
                    return false
                }
                /* 有免费次数的时候 不给切换 */
                if (parseFloat(this.free_times)) {
                    console.log('免费不给切换')
                    return false
                }
                this.showSingleBet = !this.showSingleBet
            },
            betSelFn (currVal) {
                if (currVal) {
                    this.dft_bet = currVal.bet
                    this.barProcess = (parseFloat(currVal.lucky) * (90 / 100)).toFixed(1)
                    if (parseFloat(currVal.lucky) >= 100) {
                        this.hideBarLycky = false
                    } else {
                        this.hideBarLycky = true
                    }
                    this.showSingleBet = true
                }
            },
            initPage (slotsHome) {
                if (slotsHome.prizes_pool !== undefined) {
                    this.$store.commit(mTypes.prizes_pool, slotsHome.prizes_pool)
                }
                if (slotsHome.last_prizes !== undefined) {
                    this.$store.commit(mTypes.last_prizes, slotsHome.last_prizes)
                }
                if (slotsHome.free_times !== undefined) {
                    this.free_times = parseFloat(slotsHome.free_times)
                }
                if (slotsHome.auto_run !== undefined) {
                    this.auto_run = slotsHome.auto_run
                }
                /* 默认投注项 */
                if (slotsHome.dft_bet !== undefined) {
                    this.dft_bet = slotsHome.dft_bet
                }
                /* 投注列表配置 */
                if (slotsHome.lucky_values) {
                    this.formateLuckyVal(slotsHome.lucky_values)
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
            },
            formateLuckyVal (luckyValues) {
                /* 初始化 绿色 进度条 */
                this.lucky_values = luckyValues
                if (this.lucky_values.length > 0) {
                    this.lucky_values.forEach((val, index) => {
                        if (val.bet === this.dft_bet.toString()) {
                            this.barProcess = ((96 / 100) * parseFloat(val.lucky)).toFixed(1)
                            if (parseFloat(val.lucky) >= 100) {
                                this.hideBarLycky = false
                            } else {
                                this.hideBarLycky = true
                            }
                        }
                    })
                }
            }
        },
        computed: {
            currCoinType () {
                return this.$store.state.currCoinType
            },
            last_prizes () {
                return this.$store.state.cs_tiger.last_prizes
            },
            prizes_pool () {
                return this.$store.state.cs_tiger.prizes_pool
            },
            recentList () {
                return this.$store.state.cs_tiger.recentList
            },
            isLog () {
                return this.$store.state.isLog
            },
            userInfo () {
                return this.$store.state.userInfo
            }
        },
        components: {
            Header, Footer
        },
        async mounted () {
            /* 首页请求 */
            let slotsHome = await this.$store.dispatch(aTypes.slotsHome)
            if (slotsHome) {
                /* 基础结构数据 */
                this.initPage(slotsHome)
            }
            /* 订阅老虎机 */
            this.$store.dispatch('subInTiger')
            this.initLacal(true)
        },
        updated () {
            //  4*15=60
            if (document.getElementById('heiImg')) {
                document.getElementById('heiImg').onload = () => {
                    document.getElementById('js_slot-box').style.height = parseFloat(window.getComputedStyle(document.getElementById('hei')).height.replace('px', '')) * 3 + 60 + 'px'
                    this.computeHeight = parseFloat(window.getComputedStyle(document.getElementById('hei')).height.replace('px', '')) + 15
                    this.hideInitLi = false
                }
            }
        },
        beforeDestroy () {
            this.$store.dispatch('subOutTiger')
            this.stopAutoPlay()
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

    .msgLis{
        transition: all 2s;
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
    .tiger {
        position: relative;
        -webkit-overflow-scrolling: touch;
        overflow: hidden;
        .bg-tiger {
            display: block;
            width: 100%;
            height:100%;
        }
    }

    .tiger-wrap {
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding-top:70px;
    }

    .btn-rule{
        display: block;
        position: absolute;
        z-index:3;
        right:10px;
        top:77px;
        width:28px;
        height:28px;
        overflow: hidden;
        line-height:28px;
        text-align: center;
        font-size:21px;
        color: #fff;
        font-weight:bold;
        border-radius: 3px;
        background:rgba(0,0,0,0.6);
    }
    .jackpot-low {
        position: relative;
        z-index: 4;
        margin: 0 auto;
        background: url("../../assets/img/tiger/bg-jackpot.png") no-repeat center;
        background-size: contain;
        width: percentage(477/750);
        width: 477/2px;
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
                color: #ffe400;
            }
        }
    }

    .msg-win {
        display: none;
        position: relative;
        z-index: 3;
        margin: 0 auto;
        width: 100%;
        height: 42/2px;
        overflow: hidden;
        background: url("../../assets/img/tiger/bg-msg-win.png") no-repeat center;
        background-size: 482/2px 42/2px;
        line-height: 21px;
        text-align: center;
        font-size: 10px;
        color: #ffffff;
        ul{
            position: absolute;
            width:100%;
            height:100%;
            overflow: hidden;
            transition: all 0.2s;
        }
        li{
            width:100%;
            height:100%;
            overflow: hidden;
        }
    }

    .slot {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        transition: all 0.2s;
        z-index: 2;
        .bg-slot {
            position: absolute;
            left: 0;
            bottom: 26px;
            width: 100%;
        }
        .bg-slot-run {
            display: none;
        }
        &::before{
            content: '';
            display: block;
            position: absolute;
            left:0;
            top:0;
            width:100%;
            height:100%;
            background: url("../../assets/img/tiger/line.png") no-repeat center;
            background-size: cover;
        }
    }

    .slot.run {
        background: url("../../assets/img/tiger/bg-slot-run.png") no-repeat top center;
        background-size: contain;

    }

    .slot.opening {
        .slot-box {
            /*overflow: visible;*/
            border-radius: 0;
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
        &::before{
            animation: bingo 0.2s alternate infinite;
        }
    }

    .slot-box {
        position: relative;
        margin: 0 auto;
        top: percentage(260/1173);
        width: percentage(610/750);
        transform: rotate(0);
        /*高度需要动态设置*/
        height: 0;
        display: flex;
        justify-content: center;
        /*~防止less解析/，这里是单独设置水平和垂直的半径*/
        border-radius: ~"110px/60px";
        overflow: hidden;
        ul {
            position: relative;
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
        #slotItem1{
            /*top:-100px !important;*/
        }
        ul.tranitionTiming{
            transition-property: all;
            transition-duration: 2s;
            transition-timing-function: ease-in-out;
            transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
        }
        .slot-item1{
            transition-delay: 0s;
        }
        .slot-item2{
            transition-delay: 0.2s;
        }
        .slot-item3{
            transition-delay: 0.4s;
        }
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
        .btn-double{
            line-height: 52px;
            font-size: 24px;
            font-weight:bold;
        }
        .btn-spin,.btn-double{
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
        &:not(.disable)&:active {
            .btn{
                animation: btn .5s;
            }
        }
        &.disable{
            .btn{
                p,div{
                    opacity:0.3;
                }
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
            //width: percentage(173/610);
            width:195/2px;
            height:90/2px;
            border-radius: 6px;
            padding: 0 5px;
            box-sizing: border-box;
        }
        .single {
            /*background: #2f250f;*/
            /*border: 2px solid #bc9357;*/
            background: url("../../assets/img/tiger/bg-single.png") no-repeat center;
            background-size: cover;
            cursor: pointer;
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
                left: 0;
                top: -99px;
                width: 100%;
                border: 2px solid #f3ca83;
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
                border-bottom: none;
                color: #ffe400;
                background: #2f250f;
                box-sizing: border-box;
                li {
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    height: 30px;
                    line-height: 30px;
                    background: #40861c;
                    border-top-left-radius: 6px;
                    border-top-right-radius: 6px;
                    border-top:4px solid #2f250f;
                    margin: 0 2px;
                    font-weight: bold;
                    .single-unit {
                        line-height: 33px;
                    }
                    &:hover{
                        background: #27570e;
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
                height:12px;
                border:2px solid #f3ca83;
                background: #2f250f;
                border-radius: 3px;
                overflow: hidden;
                i {
                    display: block;
                    box-sizing: border-box;
                    height:10px;
                    overflow: hidden;
                    background: #40861c;
                    border-radius: 2px;
                    margin:1px;
                }
            }
            .bar-msg {
                font-size: 13px;
                color: #7fd31d;
                font-weight: bold;
            }
            .bar-lycky{
                position: absolute;
                right:3px;
                top:0;
                width:53/2px;
                height:52/2px;
                background: url("../../assets/img/tiger/icon-lucky.png") no-repeat center;
                background-size: cover;
                animation:heartbeat 1s infinite;
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
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        overflow: hidden;
        transition: all 0.2s;
        background: transparent;
    }
    .reward-small{
        display: none;
        width:348/2px;
        height:163/2px;
       /* width:percentage(348/750);*/
       /* padding-bottom:percentage((348/750)*(163/348));*/
        background: url("../../assets/img/tiger/reward-small.png") no-repeat center;
        background-size: contain;
        color: #ffe400;
        font-family: imp;
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
            display: block;
        }
        &.double&.show{
            overflow: visible;
            &::before{
                content: '';
                position: absolute;
                right:-20px;
                top:-3px;
                display: block;
                width:98/2px;
                height:98/2px;
                background: url("../../assets/img/tiger/double.png") no-repeat center;
                background-size: cover;
            }
        }
    }
    .reward-big{
        display: none;
        width:595/2px;
        height:auto;
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
            display: block;
        }
        &.double&.show{
            overflow: visible;
            &::after{
                content: '';
                position: absolute;
                right:-36px;
                top:90px;
                display: block;
                width:156/2px;
                height:156/2px;
                background: url("../../assets/img/tiger/double.png") no-repeat center;
                background-size: cover;
                z-index:3;
            }
        }
    }
    .help{
        display: none;
        max-width: 337px;
        width: 89.86666667%;
        height:auto;
        top:60px;
        transform: translate(-50%, 0);
        box-sizing: border-box;
        border-radius: 8px;
        background: #2f2a3d;
        padding:0 15px 12px;
        border:2px solid #96825c;
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
            display: block;

        }
    }
    .pop-recharge{
        display: none;
        max-width: 674/2px;
        width: percentage(674/750);
        height:auto;
        border:2px solid #96825c;
        top: 50%;
        transform: translate(-50%, -50%);
        box-sizing: border-box;
        border-radius: 8px;
        background: #2f2a3d;
        .recharge-close{
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
            margin-top:29px;
            line-height:16px;
            font-size:13px;
            color: #fff;
        }
        .copy{
            width:percentage(580/674);
            margin:7px auto 0;
            text-align: center;
            vertical-align: middle;
            p{
                box-sizing: border-box;
                margin-right:152/2px;
                padding:10px;
                word-wrap: break-word;
                background: #211d2d;
                height:52px;
                line-height:16px;
                overflow: hidden;
                font-size:13px;
                color: #f3ca83;
            }
            a{
                float: right;
                display: block;
                width:152/2px;
                height:52px;
                line-height:52px;
                font-size:18px;
                color: #2f2a3d;
                font-weight:bold;
                background: #f3ca83;
            }
        }
        .msg{
            margin-top: 21px;
            font-size:13px;
            color: #fff;
            line-height:62/2px;
        }
        img{
            display: block;
            margin:0 auto 20px;
        }
        &.show{
            display: block;
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
    @keyframes heartbeat {
        0%,80%,100%{
            transform: scale(1);
        }
        40%{
            transform: scale(1.2);
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
    }
    @media (max-width: @screen-phone) {
        .footer{
            display: none;
        }
    }


    //background: url("../../assets/img/tiger/bg-slot.png") no-repeat center;
    .footer{
        border-top:0 !important;
    }
</style>
