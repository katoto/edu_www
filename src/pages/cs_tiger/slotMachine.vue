<template>
    <div class="tiger-contain">
        <div class="tiger-pc ">
            <Header v-on:freshSlot="changePageState"></Header>
            <div class="tiger-main" @click="initPop">
                <div class="tiger ">
                    <img class="bg-tiger" src="@/assets/img/tiger/bg-tiger.jpg" alt="">
                    <div class="tiger-wrap ">
                        <!--规则icon  -->
                        <a href="javascript:;" class="btn-rule " @click="slotHelp">
                            ?
                        </a>
                        <!--低奖池-->
                        <div class="jackpot-low ">
                            <div class="jackpot-all">
                                <p>
                                    <lang>JACKPOT</lang>
                                </p>
                                <i v-if="prizes_pool">
                                    {{ formateSlotBalance( prizes_pool ) }}
                                </i>
                                <span>
                                    {{ formateCoinType( currBalance.cointype ) }}
                                </span>
                            </div>
                            <div class="jackpot-win">
                                <!--bug: ipone5 not fint win-->
                                <p>
                                    <lang>Hit to Win</lang>
                                    <span v-if="prizes_pool && prizes_pool_ratio">
                                    <!-- hit WIn -->
                                    <template v-if="parseFloat(prizes_pool_ratio[dft_bet]) >= 0">
                                       {{formateSlotBalance ( parseFloat(prizes_pool) * prizes_pool_ratio[dft_bet] )  }}
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
                        <!--中奖播报  -->
                        <div class="msg-win">
                            <!-- 滚动  components-->
                            <banner-scroll v-if="recentList" class="notice">
                                <div class="text-scroller">
                                    <ul class="scroller-in">
                                        <!--:class="{'newRecord':item.addNewRecord}"-->
                                        <li class="msgLis" v-for="item in recentList" >
                                        Congratulate {{formateEmail( item.username , true ) }} on winning {{ formateSlotBalance ( item.prize ) }} {{ formateCoinType( item.cointype ) }}
                                        </li>
                                    </ul>
                                </div>
                            </banner-scroll>
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
                                        <li id="hei" v-if="hideInitLi">
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
                        <div class="bg-slot"></div>
                        <!--底部操作-->
                        <div class="operating ">
                            <!-- 展开 on-->
                            <div class="single " :class="{'on':showSingleBet}"  @click="showBetSel">
                                <div class="top">
                                    <div class="single-amount">
                                        {{ dft_bet }}
                                    </div>
                                    <div class="single-unit">
                                        {{ formateCoinType(currBalance.cointype) }}
                                    </div>
                                </div>
                                <p class="msg ">
                                    <lang>Single Line</lang>&nbsp;
                                    <i></i>
                                </p>
                                <!-- 投注项选择 -->
                                <ul :class="{'hide': !showSingleBet,'ul3':lucky_values.length==3}"  v-if="lucky_values.length > 0">
                                    <li v-for="item in lucky_values" @click="betSelFn(item)">
                                        <div class="single-amount">
                                            {{ item.bet }}
                                        </div>
                                        <div class="single-unit">
                                            {{ formateCoinType(currBalance.cointype) }}
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
                            <div class="all">
                                <p class="msg">
                                    <lang>Total Bet</lang>
                                </p>
                                <div class="top">
                                    <div class="all-amount">
                                        {{ formateSlotBalance ( parseFloat(dft_bet) * parseFloat(dft_line) )}}
                                    </div>
                                    <div class="all-unit">
                                        {{ formateCoinType(currBalance.cointype) }}
                                    </div>
                                </div>
                            </div>
                            <div class="bar">
                                <div class="top">
                                    <div class="bar-process">
                                        <i :style="{'width':barProcess+'%'}" ></i>
                                    </div>
                                    <div class="bar-msg" v-if="hideBarLycky">
                                        {{ beforeBarProcess }}%
                                    </div>
                                    <div class="bar-lycky" v-else></div>
                                </div>
                                <p class="msg">
                                    <lang>Lucky Bar</lang>
                                </p>
                            </div>
                        </div>
                        <!--  上次赢取  -->
                        <div class="lastwin " v-if="last_prizes">
                            <lang>Last time win</lang> {{ formateSlotBalance (last_prizes) }} {{ formateCoinType(currBalance.cointype) }}
                        </div>
                        <!--主按钮-->
                        <a href="javascript:;" id="controlShowMsg" class="btn-main " :class="{disable:btnDisable && !isAutoPlay}">
                            <img src="@/assets/img/tiger/btn-bg.png" alt="">
                            <template v-if="hideBarLycky">
                                <!--自动-->
                                <div @click="stopAutoPlay" class="btn btn-auto" :class="{'hide':!isAutoPlay}">
                                    <p><lang>AUTO</lang></p>
                                    <div><lang>Click to Stop</lang></div>
                                </div>
                                <!--免费-->
                                <div class="btn btn-free" @touchstart="touStart" @touchend="touEnd('isFree')" @mousedown="touStart" @mouseup="touEnd('isFree')"  :class="{'hide':!parseFloat(free_times)}">
                                    <p><lang>FREE</lang></p>
                                    <div v-if="parseFloat(free_times)>1">{{ free_times }} <lang>Chances</lang></div>
                                    <div v-else>{{ free_times }} <lang>Chance</lang></div>
                                </div>
                                <!-- 开始按钮btn-spin  @dblclick="autoPlay"-->
                                <div @touchstart="touStart" @touchend="touEnd" @mousedown="touStart" @mouseup="touEnd" class="btn btn-spin" :class="{'hide':parseFloat(free_times) || isAutoPlay}">
                                    <p><lang>SPIN</lang></p>
                                    <div><lang>Auto(long press)</lang></div>
                                </div>
                            </template>
                            <template v-else>
                                <div @touchstart="touStart" @touchend="touEnd" @mousedown="touStart" @mouseup="touEnd" class="btn btn-double" >
                                    <lang>Double</lang>
                                </div>
                                <!--免费-->
                                <div class="btn btn-free" @touchstart="touStart" @touchend="touEnd('isFree')" @mousedown="touStart" @mouseup="touEnd('isFree')"  :class="{'hide':!parseFloat(free_times)}">
                                    <p><lang>FREE</lang></p>
                                    <div v-if="parseFloat(free_times)>1">{{ free_times }} <lang>Chances</lang></div>
                                    <div v-else>{{ free_times }} <lang>Chance</lang></div>
                                </div>
                            </template>
                        </a>
                    </div>
                    <!--pop show  show double-->
                    <!-- 小奖 -->
                    <div class="pop reward-small " :class="{'show':rewardSmall,'double':playBack && playBack.isdouble==='1'}">
                        <div class="msg" >
                            <p v-if="playBack && playBack.isdouble==='0'">{{ formateSlotBalance( playBack.line_prizes ) }}</p>
                            <p v-if="playBack && playBack.isdouble==='1'">{{ formateSlotBalance( playBack.line_prizes / 2 ) }}</p>
                            <i>{{ formateCoinType( currBalance.cointype ) }}</i>
                        </div>
                    </div>
                    <!--大奖 winDouble -->
                    <div v-show="playBack" class="pop reward-big " :class="{'show':rewardBig,'double':playBack && playBack.isdouble==='1'}">
                        <div class="bg1" >
                            <div class="bg2">
                                <div class="msg" v-if="playBack">
                                    <template v-if="jackPot">
                                        <p v-if=" playBack.isdouble==='1'">
                                            {{ formateSlotBalance( parseFloat(playBack.line_prizes) + parseFloat(playBack.pool_prizes) / 2 ) }}
                                        </p>
                                        <p v-if=" playBack.isdouble==='0'">
                                            {{ formateSlotBalance( parseFloat(playBack.line_prizes) + parseFloat(playBack.pool_prizes) ) }}
                                        </p>
                                    </template>
                                    <template v-else>
                                        <p v-if=" playBack.isdouble==='1'">
                                            {{ formateSlotBalance( parseFloat(playBack.line_prizes) / 2 ) }}
                                        </p>
                                        <p v-if=" playBack.isdouble==='0'">
                                            {{ formateSlotBalance( parseFloat(playBack.line_prizes) ) }}
                                        </p>
                                    </template>
                                    <i>
                                        {{ formateCoinType( currBalance.cointype ) }}
                                    </i>
                                </div>
                                 <!--todo 奖池倍数 暂时隐藏-->
                                <div id="radioHtmlDom"></div>

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
                            <p><lang>Instructions</lang></p>
                        </div>
                        <ul class="tab-t">
                            <li :class="{on:tab_t===1}" @click="tab_t=1"><a href="javascript:;"><lang>Winning Table</lang></a></li>
                            <li :class="{on:tab_t===2}" @click="tab_t=2"><a href="javascript:;"><lang>Lucky Prize</lang></a></li>
                            <li :class="{on:tab_t===3}" @click="tab_t=3"><a href="javascript:;"><lang>Winning Line</lang></a></li>
                        </ul>
                        <ul class="tab-c">
                            <li :class="{on:tab_t===1}">
                                <div class="line-divi">
                                    <div><lang>Multiple</lang></div>
                                </div>
                                <div class="winningamount">
                                    <p><lang>Winning Amount</lang> =</p>
                                    <p><lang>Multiple * Single Line</lang></p>
                                </div>
                                <div class="details">
                                    <img src="@/assets/img/tiger/details.png" alt="details">
                                </div>
                                <div class="line-divi">
                                    <div><lang>Special</lang></div>
                                </div>
                                <ul class="special">
                                    <li>
                                        <div class="icon">
                                            <img src="@/assets/img/tiger/icon-wild.png" alt="icon-wild">
                                        </div>
                                        <p><lang>WILD: It can be paired with any 2 of the identical icons to form as 3 identical icons except for whistle icon (SCATTER)</lang></p>
                                    </li>
                                    <li>
                                        <div class="icon">
                                            <img src="@/assets/img/tiger/icon-free.png" alt="icon-free">
                                        </div>
                                        <p><lang>SCATTER</lang>:</p>
                                        <p><lang>Certain numbers of SCATTER can be exchanged into free spins:</lang></p>
                                        <p><lang>3 SCATTERs = 1 spin</lang></p>
                                        <p><lang>4 SCATTERs = 3 spins</lang></p>
                                        <p><lang>5 SCATTERs = 10 spins</lang></p>
                                    </li>
                                </ul>
                            </li>
                            <li :class="{on:tab_t===2}">
                                <div class="line-divi">
                                    <div><lang>Jackpot</lang></div>
                                </div>
                                <img v-if="currBalance.cointype==='2001'" class="smallAward" src="@/assets/img/tiger/bg-jackpot2.png" alt="Small award">
                                <img v-if="currBalance.cointype==='1001'" class="smallAward" src="@/assets/img/tiger/bg-jackpot_btc.png" alt="Small award">
                                <div class="msg">
                                    <p>
                                        <span class="bold"><lang>Jackpot</lang></span>: <lang>2% of the player's bet amount is poured into Jackpot</lang>.
                                    </p>
                                    <p>
                                        <span><lang>You win if 9</lang></span>
                                        &nbsp;<img width="16" height="16" src="@/assets/img/tiger/icon-England.png" alt="England">&nbsp;
                                        <span><lang>appear at the same time in 9-line slot</lang>.</span>
                                    </p>
                                </div>
                                <div class="msg" v-if="currBalance.cointype==='2001'">
                                    <p>· <lang>Place 0.001 ETH per line, you can get 5% of the Jackpot</lang></p>
                                    <p>· <lang>Place 0.001 ETH per line, you can get 50% of the Jackpot</lang></p>
                                    <p class="hide">· <lang>Place 0.01 ETH per line, you can get 50% of the Jackpot</lang></p>
                                </div>
                                <div class="msg" v-if="currBalance.cointype==='1001'">
                                    <p>· <lang>Place 0.00001 BTC per line, you can get 5% of the Jackpot</lang></p>
                                    <p>· <lang>Place 0.0001 BTC per line, you can get 50% of the Jackpot</lang></p>
                                    <p class="hide">· <lang>Place 0.01 ETH per line, you can get 50% of the Jackpot</lang></p>
                                </div>
                                <div class="line-divi">
                                    <div><lang>Lucky Bar</lang></div>
                                </div>
                                <div class="lucky-value">
                                    <div class="lucky-48">
                                        <img src="@/assets/img/tiger/lucky-48.png" alt="">
                                        <p><lang>Not Full</lang></p>
                                    </div>
                                    <div class="lucky-100">
                                        <img src="@/assets/img/tiger/lucky-100.png" alt="">
                                        <p><lang>Full</lang></p>
                                    </div>
                                </div>
                                <div class="msg">
                                    <p>
                                        <span class="bold"><lang>Lucky Bar</lang></span>: <lang>If you did not win, one line bet can accumulate one lucky point in Lucky Bar</lang>
                                    </p>
                                    <p>
                                        <lang>(1 line accumulates 1 lucky point, N line accumulates N lucky point)</lang>
                                    </p>
                                    <p>
                                        <lang>Full lucky bar can exchange for a double reward spin</lang>.
                                    </p>
                                </div>
                            </li>
                            <li :class="{on:tab_t===3}">
                                <div class="line-divi">
                                    <div>
                                        <p>
                                            <lang>You win if 3 identical icons</lang>
                                        </p>
                                        <p>
                                            <lang>placed a pattern as following</lang>
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
                            <div v-if="currBalance.cointype==='2001'">
                                <p>Copy the Ethereum wallet address</p>
                                <p>(<lang>only supports ETH</lang>)</p>
                            </div>
                            <div v-if="currBalance.cointype==='1001'">
                                <p >Copy the Bitcoin wallet address</p>
                                <p>(<lang>only supports BTC</lang>)</p>
                            </div>
                        </div>
                        <div class="copy" v-if="currBalance">
                            <a href="javascript:;" rel="nofollow"
                               v-clipboard:copy="currBalance.address"
                               v-clipboard:success="copySucc"
                               v-clipboard:error="copyError"
                            >COPY</a>
                            <p v-if="currBalance">{{ currBalance.address }}</p>
                        </div>
                        <div class="msg">
                            <lang>or scan to get the address</lang>
                        </div>
                        <img v-if="currBalance.cointype==='1001'" alt="" :src="'http://mobile.qq.com/qrcode?url=bitcoin:'+ currBalance.address " alt="recharge">
                        <img v-if="currBalance.cointype==='2001'" alt="" :src="'http://mobile.qq.com/qrcode?url= '+ currBalance.address " alt="recharge">
                    </div>
                </div>
                <div class="tiger-pc-msg">
                    <h3><lang>Recent</lang></h3>
                    <!-- 首次进入老虎机出现-->
                    <div class="tiger-firstBaxi" :class="{'show':showFirstBaxi}">
                        <section v-if="language==='en'">
                            <p class="firstp">Try Slot & Win <span>97%+</span> Return Rate</p>
                            <p class="firstp">Up to <img width="16" height="16" src="@/assets/img/tiger/icon-baxi.png" alt="England">
                                <span>x 3 = 800</span> Times Return!
                            </p>
                        </section>
                        <section v-if="language==='zhCn'">
                            <p class="firstp">最新上线老虎机，<span>97%+</span>返奖率，最高<span>800倍</span>中奖收益</p>
                        </section>
                        <section v-if="language==='zhTw'">
                            <p class="firstp">最新上線老虎機，<span>97%+</span>返獎率，最高<span>800倍</span>中獎收益</p>
                        </section>
                        <i @click="showFirstBaxi=false"></i>
                    </div>
                    <div class="recent-win">
                        <div class="recent-top">
                            <div class="user">
                                <lang>User</lang>
                            </div>
                            <div class="win">
                                <lang>Win</lang>
                            </div>
                            <div class="time">
                                <lang>Time</lang>
                            </div>
                        </div>
                        <!-- height recentList -->
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
                            <div class="msg1"><lang>Scan to experience mobile webview</lang></div>
                            <div class="msg2">2018.Coinsprize.com</div>
                        </div>
                        <div class="fr">
                            <!--  二维码  -->
                            <!--<img src="@/assets/img/tiger/code.jpg" alt="">-->
                            <img  :src="'http://mobile.qq.com/qrcode?url=https://2018.Coinsprize.com'">
                        </div>
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
    import {mTypes, aTypes} from '~/store/cs_page/cs_tiger'
    import BannerScroll from '~components/BannerScroll.vue'
    import {formatFloat, copySucc, copyError, formateEmail, formatTime, formateBalance, formateCoinType, wait, formateSlotBalance, structDom} from '~common/util'

    import Vue from 'vue'
    import vueClipboard from 'vue-clipboard2'
    Vue.use(vueClipboard)

    import {Howl, Howler} from 'howler'

    export default {
        data () {
            return {
                slotSound:null,
                showFirstBaxi: false, // 首次提示
                showRecharge: false, // 显示充值弹窗
                hideBarLycky: true,
                tab_t: 1, // 规则
                tranitionTiming: false, // 运动是否需要过程
                btnDisable: false, // 按钮不可用
                rewardBig: false, // 大奖
                rewardSmall: false, // 小奖
                free_times: 0, // 初始化免费次数
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
                beforeBarProcess: 0,
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
                winRadioObj: {
                }, // 显示大奖用的
                winRadioHtml: '', // 处理成展示结构html
                fastClick: false
            }
        },
        watch: {
            // computeHeight (hei) {
            //     if (hei && this.dft_idx) {
            //         // this.setLacal()
            //     }
            // }
            updataPools (msg) {
                if (msg && this.currBalance.cointype.toString() === msg.cointype) {
                    this.$store.commit(mTypes.prizes_pool, msg.prizes_pool)
                }
            },
            currBalance (newVal, oldVal) {
                /* 切换币种 */
                if (oldVal.cointype !== newVal.cointype) {
                    this.changePageState()
                }
            },
            isLog (val) {
                /* 切换登陆态之后改变状态 */
                this.changePageState()
            }
        },
        methods: {
            copySucc,
            copyError,
            formatTime,
            formateBalance,
            formateSlotBalance,
            formateEmail,
            formateCoinType,
            initPop () {
                /* head 弹窗 */
                this.$store.commit('initHeadState', new Date().getTime())
            },
            initLacal (head = false) {
                /* new  结果的走  */
                // this.axes.forEach((val, index) => {
                //     /* 打乱 */
                //     // val2 = val2.sort(function () { return 0.5 - Math.random() }).concat(dft)
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
                            this.axes[index].splice(-3)
                        }
                        this.axes[index] = this.axes[index].concat(dft)
                    }
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
                if (!this.fastClick) {
                    evt.preventDefault()
                    this.tabTime = new Date().getTime()
                    this.fastClick = true
                }
            },
            touEnd (isFree = false) {
                if (isFree && isFree === 'isFree') {
                    /* 认为是免费的停止 */
                    if (this.isAutoPlay) {
                        this.stopAutoPlay()
                        this.fastClick = false
                        return false
                    }
                }
                if (this.btnDisable) {
                    this.fastClick = false
                    return false
                }
                this.tabTime = (new Date().getTime() - this.tabTime)
                if (this.tabTime > 500) {
                    /* 长按 */
                    if (!this.isLog) {
                        /* 是否登录 */
                        this.$store.commit('showLoginPop')
                        this.fastClick = false
                        return false
                    }
                    this.startPlay()
                    this.autoPlay()
                    this.currRun = this.currRun - 1
                     this.slotSound.play('button')
                } else if (this.tabTime > 40 && this.tabTime <= 500) {
                    /* 点击 */
                    this.startPlay()
                    this.slotSound.play('button')
                }
                this.fastClick = false
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
                this.$store.dispatch('getUserInfo')
                this.axes.forEach((val, index) => {
                    this.tranitionTiming = false
                    this.resetLacal()
                    let currAxes = val.slice(-3)
                    this.axes[index].splice(0, 3, ...currAxes)
                })
                this.slotOpening = false // 开奖结束
                if (this.playBack) {
                    if (this.playBack.lucky_values) {
                        this.formateLuckyVal(this.playBack.lucky_values)
                    }
                    if (this.playBack.free_times !== undefined) {
                        this.free_times = parseFloat(this.playBack.free_times)
                    }
                }
                await wait(300)
                this.btnDisable = false
                await wait(1700)
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
                // this.isAutoPlay ? this.btnDisable = false : this.btnDisable = true
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
                /* 是否激活 */
                if (this.userInfo && this.userInfo.status !== '1') {
                    this.$store.commit('showNoVerify')
                    return false
                }
                /* 余额是否充足 */
                if (this.currBalance && this.currBalance.balance) {
                    if ((parseFloat(this.currBalance.balance) < formatFloat(parseFloat(this.dft_line) * parseFloat(this.dft_bet))) && parseFloat(this.free_times) <= 0) {
                        /* 显示余额不足 */
                        this.showRecharge = true
                        return false
                    }
                }
                this.btnDisable = true
                let orderMsg = {
                    dft_line: this.dft_line,
                    single_bet: this.dft_bet,
                    cointype: this.currBalance.cointype
                }
                let playBack = await this.$store.dispatch(aTypes.startPlay, orderMsg)
                // this.stateInit()
                this.slotRun = true
                if (playBack) {
                    if (parseFloat(this.free_times) <= 0) {
                        this.reduceMoney()
                    }
                    this.playBack = playBack
                    this.initPage(playBack)
                    if (playBack.idx) {
                        // 结果 位置
                        this.dft_idx = playBack.idx
                        this.initLacal()
                        this.dft_idx = [36, 36, 36]
                        await wait(600)
                        this.slotSound.play('slot_rolling')
                        this.tranitionTiming = true
                        this.setLacal()
                    }
                    if (playBack.window) {
                        /*  处理口哨 的数组格式 */
                        this.formateWindow(playBack.window)
                    }
                    if (playBack.results) {
                        this.showResults(playBack.results)
                        this.showRadioEnd(playBack.results)
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
                    await wait(3000)
                    this.slotRun = false // 动画结束
                    this.slotSound.stop()
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
                        this.slotSound.play('gift_small')
                        this.$store.commit(mTypes.last_prizes, parseFloat(this.playBack.line_prizes) + parseFloat(this.playBack.pool_prizes))
                        await wait(2500)
                        // 隐藏奖池图标
                        this.rewardBig = false
                        this.rewardSmall = false
                        this.endInit()
                    } else if (this.setRewardIcon === 'jackPotWard') {
                        this.rewardBig = true
                        this.jackPot = true
                        this.slotSound.play('gift_big')
                        this.$store.commit(mTypes.last_prizes, parseFloat(this.playBack.line_prizes) + parseFloat(this.playBack.pool_prizes))
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
                    return false
                }
                this.showSingleBet = !this.showSingleBet
            },
            betSelFn (currVal) {
                if (currVal) {
                    this.dft_bet = currVal.bet
                    this.barProcess = (parseFloat(currVal.lucky) * (96 / 100)).toFixed(0)
                    this.beforeBarProcess = parseFloat(currVal.lucky)
                    if (parseFloat(currVal.lucky) >= 100) {
                        this.hideBarLycky = false
                    } else {
                        this.hideBarLycky = true
                    }
                    this.showSingleBet = true
                }
            },
            initPage (slotsHome, inPage = false) {
                if (slotsHome.prizes_pool !== undefined) {
                    this.$store.commit(mTypes.prizes_pool, slotsHome.prizes_pool)
                }
                if (slotsHome.last_prizes !== undefined) {
                    this.$store.commit(mTypes.last_prizes, slotsHome.last_prizes)
                }
                if (inPage) {
                    if (slotsHome.free_times !== undefined) {
                        this.free_times = parseFloat(slotsHome.free_times)
                    }
                }
                if (slotsHome.auto_run !== undefined) {
                    this.auto_run = slotsHome.auto_run
                }
                /* 默认投注项 */
                if (slotsHome.dft_bet !== undefined) {
                    this.dft_bet = slotsHome.dft_bet
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
            formateLuckyVal (luckyValues = []) {
                /* 初始化 绿色 进度条 */
                this.lucky_values = luckyValues
                if (this.lucky_values.length > 0) {
                    this.lucky_values.forEach((val) => {
                        if (val.bet === this.dft_bet.toString()) {
                            this.barProcess = ((96 / 100) * parseFloat(val.lucky)).toFixed(0)
                            this.beforeBarProcess = parseFloat(val.lucky)
                            if (parseFloat(val.lucky) >= 100) {
                                this.hideBarLycky = false
                            } else {
                                this.hideBarLycky = true
                            }
                        }
                    })
                }
            },
            reduceMoney () {
                if (this.userInfo && this.userInfo.accounts) {
                    let findIndex = 0
                    this.userInfo.accounts.forEach((val, index) => {
                        if (val.cointype === this.currBalance.cointype) {
                            findIndex = index
                        }
                    })
                    this.userInfo.accounts[findIndex].balance = Math.abs(parseFloat(this.userInfo.accounts[findIndex].balance) - (parseFloat(this.dft_bet) * parseFloat(this.dft_line)))
                    this.$store.commit('setUserInfo', this.userInfo)
                    this.$store.commit('setCurrBalance', this.userInfo.accounts[findIndex])
                }
            },
            showRadioEnd (winArr = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '120', '0']) {
                this.winRadioObj = {}
                if (winArr) {
                    winArr.forEach((val, index) => {
                        if (index !== 9) {
                            if (val !== '0') {
                                if (!this.winRadioObj[val]) {
                                    this.winRadioObj[val] = []
                                }
                                this.winRadioObj[val].push(val)
                            }
                        }
                    })
                    let i = 0
                    this.winRadioHtml = ''
                    let copyRadioArr = []
                    for (let index in this.winRadioObj) {
                        let o = {}
                        o['key'] = index
                        o['value'] = this.winRadioObj[index]
                        o[index] = this.winRadioObj[index]
                        copyRadioArr.push(o)
                    }
                    copyRadioArr = copyRadioArr.reverse()
                    copyRadioArr.forEach((val, index) => {
                        if (i % 2 === 0) {
                            this.winRadioHtml += `
                                            <ul class="radioLi"><li>
                                                <img src="../../../static/staticImg/_${this.radioBackImg(val['key'])}.png" alt="">&ensp;
                                                <span>x ${val['value'].length}</span>&ensp;
                                                <span>${parseFloat(val['key']) * val['value'].length}</span>&ensp;
                                                <span>Times</span>
                                            </li>
                                        `
                        } else {
                            this.winRadioHtml += `<li >
                                                <img src="../../../static/staticImg/_${this.radioBackImg(val['key'])}.png" alt="">&ensp;
                                                <span>x ${val['value'].length}</span>&ensp;
                                                <span>${parseFloat(val['key']) * val['value'].length}</span>&ensp;
                                                <span>Times</span>
                                            </li></ul>`
                        }
                        i++
                    })
                    if (i % 2 !== 0) {
                        this.winRadioHtml += '</ul>'
                    }
                    if (document.getElementById('radioHtmlDom')) {
                        document.getElementById('radioHtmlDom').innerHTML = this.winRadioHtml
                    }
                }
            },
            radioBackImg (radio = '5') {
                switch (radio.toString()) {
                case '5':
                    return 'A'
                case '15':
                    return 'B'
                case '25':
                    return 'C'
                case '50':
                    return 'D'
                case '100':
                    return 'E'
                case '300':
                    return 'F'
                case '800':
                    return 'G'
                default:
                    return 'A'
                }
            },
            async changePageState () {
                /* 登陆登出修改页面状态 */
                let slotsHome = await this.$store.dispatch(aTypes.slotsHome, this.currBalance.cointype)
                if (slotsHome) {
                    /* 基础结构数据 */
                    this.initPage(slotsHome, true)
                    if (slotsHome.lucky_values) {
                        /* 投注列表配置 */
                        this.formateLuckyVal(slotsHome.lucky_values)
                    }
                }
                this.initLacal(true)
            },
            slotHelp(){
                this.slotSound.play('buttonHelp')
                this.isShowHelp = true
            }
        },
        computed: {
            language () {
                return this.$store.state.language
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
            },
            currBalance () {
                return this.$store.state.currBalance
            },
            updataPools () {
                return this.$store.state.cs_tiger.updataPools
            }
        },
        components: {
            Header, Footer, BannerScroll
        },
        async mounted () {
            document.documentElement.className = 'flexhtml noscrolling'
            await this.changePageState()
            if (!localStorage.getItem('firstJackpot')) {
                this.showFirstBaxi = true
                localStorage.setItem('firstJackpot', true)
            }
            structDom('slot')
            this.$store.dispatch('subInTiger')

            this.slotSound = new Howl({
                src: ['../../../../static/audio/slotMusic.mp3'],
                volume: 0.7,
                sprite: {
                    button: [0, 390],
                    buttonHelp: [2000, 230],
                    gift_big: [4000, 1020],
                    gift_small: [7000, 606],
                    slot_rolling: [9000, 2168],
                }
            })
        },
        updated () {
            if (document.getElementById('heiImg')) {
                document.getElementById('heiImg').onload = () => {
                    document.getElementById('js_slot-box').style.height = parseFloat(window.getComputedStyle(document.getElementById('hei')).height.replace('px', '')) * 3 + 60 + 'px'
                    this.computeHeight = parseFloat(window.getComputedStyle(document.getElementById('hei')).height.replace('px', '')) + 15
                    this.hideInitLi = false
                }
            }
        },
        beforeDestroy () {
            document.documentElement.className = ''
            this.$store.dispatch('subOutTiger')
            this.stopAutoPlay()
        }
    }
</script>
<style scoped="scoped" lang="less" type="text/less">
    @import "../../styles/lib-mixins.less";
    @import "../../styles/lib-media.less";
    @import "../../styles/lib-font.less";
    div, a, img, p, span, i {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
    }

    .notice{
        height: 100%;
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
            /*height:100%;*/
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
            align-items: baseline;
            height: 37px;
            line-height:37px;
            overflow: hidden;
            p {
                font-size: 15px;
                color: #f3ca83;
            }
            i {
                margin: 0 3px 0 7px;
                font-size: 23px;
            }
            span {
                font-size: 15px;
            }
        }
        .jackpot-win {
            display: flex;
            justify-content: center;
            height: 35/2px;
            line-height:35/2px;
            overflow: hidden;
            align-items: baseline;
            p {
                font-size: 12px;
                color: #f3ca83;
            }
            i {
                margin: 0 3px 0 7px;
                font-size: 14px;
            }
            span {
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
        /*width: 100%;*/
        height: 42/2px;
        overflow: hidden;
        background: url("../../assets/img/tiger/bg-msg-win.png") no-repeat center;
        background-size: 482/2px 42/2px;
        line-height: 21px;
        text-align: center;
        font-size: 10px;
        color: #ffffff;
        .text-scroller{
            height:100%;
        }
        ul{
            position: absolute;
            width:100%;
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
    .bg-slot{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        transition: all 0.2s;
        background: url("../../assets/img/tiger/bg-slot-run.png") no-repeat top center;
        background-size: contain;
        opacity:0;
    }
    .slot.run+.bg-slot{
        opacity:1;
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
        transform: translate3d(0,0,0);
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
                    width: 82%;
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
        width: percentage(595/750);
        left: 50%;
        bottom: percentage(200/1173);
        transform: translateX(-50%);
        display: flex;
        justify-content: space-between;
        text-align: center;
        > div {
            position: relative;
            //width: percentage(173/610);
            width:percentage(194/595);
            border-radius: 6px;
            padding:0 10px;
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, 0.3);
        }
        .single {
            cursor: pointer;
            padding:0;
            .top{
                display: flex;
                justify-content: center;
                align-items: baseline;
                height: 52/2px;
                line-height: 52/2px;
                color: #fff;
                .single-amount {
                    font-size: 15px;
                }
                .single-unit {
                    line-height: 22px;
                    font-size: 10px;
                }
            }
            .msg {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: rgba(0, 0, 0, 0.3);
                font-size: 12px;
                color: #fff;
                font-weight: bold;
                font-family: Arial;
                i{
                    display: block;
                    background: url("../../assets/img/tiger/icon-arrow.png") no-repeat center;
                    background-size: cover;
                    width: 15/2px;
                    height: 9/2px;
                }
            }
            &.on {
                border-top-left-radius: 0;
                border-top-right-radius: 0;
                .top{
                    background: #173407;
                }
                .msg{
                    background: #0f2404;
                }
                ul {
                    display: block;
                }
            }
            ul {
                /*display: none;*/
                position: absolute;
                left: 0;
                top: -77px;
                width: 100%;
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
                color: #fff;
                background: #173407;
                box-sizing: border-box;
                li {
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: baseline;
                    height: 34px;
                    line-height: 34px;
                    background: #295b0d;
                    border-top-left-radius: 6px;
                    border-top-right-radius: 6px;
                    margin: 5px 2px 0;
                    .single-unit {
                        line-height: 33px;
                    }
                    &:hover{
                        background: #0f2404;
                    }
                }
                &.ul3{
                    top: -116px;
                }
            }
        }
        .all {
            border:2px solid #f3ca83;
            background-color: rgba(0, 0, 0, 0.3);
            color: #ffe400;
            font-weight: bold;
            .msg{
                border-bottom: 2px solid #f3ca83;
                height:18px;
                line-height:18px;
                font-size:12px;
                font-family: Arial;
            }
            .top{
                display: flex;
                justify-content: center;
                align-items: baseline;
                height: 21px;
                line-height: 21px;
                .all-amount {
                    font-size: 16px;
                }
                .all-unit {
                    font-size: 10px;
                }
            }
        }
        .bar {
            .top {
                display: flex;
                justify-content: space-between;
                border-bottom:2px solid rgba(243,202,131,0.2);
                padding-top: 10/2px;
                height: 40/2px;
                line-height: 16px;
                color: #ffe400;
                font-weight: bold;
                font-size:14px;
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
            .msg {
                font-size: 12px;
                color: #fff;
                font-weight: bold;
                font-family: Arial;
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
        ul,.radioLi{
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
                width:33.333333%;
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
                width: percentage(550/597);
                margin:14px auto 0;
                img{
                    display: block;
                    width:100%;
                }
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
                //width:percentage(375/674);
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
        position: relative;
        width: 365px;
        height: 100%;
        padding: 70px 18px 0;
        background: rgba(29, 21, 7, 0.8);
        color: #79695c;
        .tiger-firstBaxi{
            display: none;
            position: absolute;
            right: 0;
            top: 76px;
            width: 256px;
            height: 74px;
            border-radius: 2px;
            background-color: #19130f;
            .firstp{
                text-indent: 0px;
                padding: 0 15px;
                span{
                    color: #f4dc01;
                }
            }
            p{
                color: #fff;
                height: 20px;
                line-height: 20px;
                text-indent: 12px;
            }
            img{
                vertical-align:middle;
            }
            p:first-child{
                margin-top: 16px;
            }
            i{
                display: block;
                position: absolute;
                right: 0;
                top: 0;
                background-image: url("../../assets/img/lucky11/icon-close-jack.png");
                width: 16px;
                height: 16px;
                cursor: pointer;
            }
        }
        h3 {
            margin-top: 10px;
            line-height: 64px;
            font-size: 28px;
        }
        .recent-win {
            text-align: center;
            margin-top: 8px;
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
        height:300px;
        overflow: hidden;
        li {
            padding: 0 10px;
            line-height: 40px;
            overflow: hidden;
        }
        li:nth-child(2n) {
            background: #352b17;
        }
        li:first-child.newRecord{
            animation: newRecord .5s both ;
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
                width: 90px;
                height: 90px;
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
    @keyframes newRecord {
        0%{
            opacity:0;
            transform: translateY(-100%);
        }
        50%{
            opacity:0;
        }
        100%{
            opacity:1;
            transform: translateY(0);
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
        .tiger-contain{
            background:#000 url("../../assets/img/tiger/bg-tiger-bak.png") no-repeat center top;
            background-size: 100%;
        }
    }
    .footer{
        border-top:0 !important;
    }
    .head-box{
        background: transparent;
    }
</style>
