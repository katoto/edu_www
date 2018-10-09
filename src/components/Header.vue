<template>
    <div class="head-box ">
        <div class="head">
            <div class="top">
                <!--展开 on-->
                <div class="m-choose-play icon-new" :class="{isShowChoose:isShowChoose}" @click="headControlPop('showChoose')">
                    <div class="btn">
                        <span></span><span></span><span></span>
                    </div>
                    <div class="msg">
                        Select Game
                    </div>
                    <ul>
                        <li>
                            <router-link :to="{path: '/luckyslot/'}" active-class="on">
                                <lang>LuckySlot</lang>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{path: '/luckycoin/'}" active-class="on">
                                <lang>LuckyCoin</lang>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{path: '/lucky11/'}" active-class="on">
                                <lang>Lucky11</lang>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{path: '/luckyPoker/'}" active-class="on">
                                {{$lang.poker.a39}}
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{path: '/supercoin'}" active-class="on">
                                <lang>SuperCoin</lang>
                            </router-link>
                        </li>                        
                    </ul>
                </div>
                <router-link to="/" title="Coinsprize" class="logo">
                    <img src="../assets/img/CoinsprizeLogo.png" alt="CoinsprizeLogo">
                </router-link>
                <!-- icon-slot -->
                <div class="choose-play icon-new " >
                    <router-link :to="{path: '/luckyslot/'}"  active-class="on">
                        <lang>Slot</lang>
                    </router-link>
                    <router-link :to="{path: '/luckycoin/'}" active-class="on">
                        <lang>LuckyCoin</lang>
                    </router-link>
                    <router-link :to="{path: '/lucky11/'}" active-class="on">
                        <lang>Lucky11</lang>
                    </router-link>
                    <router-link :to="{path: '/luckyPoker/'}" active-class="on">
                        {{$lang.poker.a39}}
                    </router-link>
                    <router-link :to="{path: '/supercoin/'}" active-class="on">
                        <lang>SuperCoin</lang>
                    </router-link>                    
                    <!--<a class="hide" href="javascript:;" @click="jump2Page('slotmachine')" ><lang>SlotMachine</lang></a>-->
                    <a href="javascript:;" class="hide" >APP</a>
                </div>
                <!-- 修改切换语言 -->
                <div class="language hide" :class="{isLanguage:isShowLanguage}" @click="headControlPop('showLanguage')">
                    <!--languageVal-->
                    <div class="language-choose">
                        <template v-for="item in languageOptions" v-if="item.value===languageVal">
                            <img :src="item.lanLogo" alt="">
                            <span>{{ item.label }}</span>
                        </template>
                    </div>
                    <ul>
                        <li v-for="item in languageOptions" v-if="item.value!==languageVal"
                            @click="handleLanguageChange(item.value)">
                            <img :src="item.lanLogo" width="27" height="15" alt="">
                            <span>{{ item.label }}</span>
                        </li>
                        <!--<li>-->
                        <!--<img src="../assets/slice/lan-cn.jpg" width="27" height="15" alt="">-->
                        <!--<span>中文(繁)</span>-->
                        <!--</li>-->
                    </ul>
                </div>
                <!-- 登录  -->
                <div class="login">
                    <!-- 未登录 -->
                    <!--拉新活动提示-->
                    <div class="act-sign" v-if="!isLog">
                        <lang>0.0001 BTC for free</lang>
                    </div>
                    <div class="to-login" v-if="!isLog" >
                        <a href="javascript:;" @click="onLoginIn">
                            <lang>Log In</lang>
                        </a>
                        <a href="javascript:;" @click="onSignUp">
                            <lang>Sign Up</lang>
                        </a>
                    </div>
                    <!-- 登录 -->
                    <section v-else>
                        <div class="mycount" :class="{on:isShowMycount}" @click="headControlPop('showMycount')">
                            <!-- light  闪动特效 -->
                            <div class="countNum" v-if="currBalance" :class="{'light':showLight}">
                                <span class="icon-user"></span>
                                {{ formateBalance(currBalance.balance, currBalance.cointype) }} {{ currBalance.cointype |formateCoinType }}
                                <i></i>
                            </div>
                            <div class="mycount-detailed ">
                                <div class="account-info">
                                    <div class="email js_email-account" :title="userInfo.email">
                                        {{ userInfo.email }}
                                    </div>
                                    <div class="uid">
                                        <lang>UserID</lang>
                                        :<i class="js_user_uid">{{ userInfo.uid }}</i>
                                    </div>
                                </div>

                                <router-link @click.native="changH5Msg('My Bets')" :to="{path: '/account/myBets'}"  class="my-transaction">
                                    <lang>My Bets</lang>
                                </router-link>
                                <router-link @click.native="changH5Msg('General')" :to="{path: '/account/general'}" class="account-center">
                                    <lang>Account Center</lang>
                                </router-link>
                                <router-link @click.native="changH5Msg('Top Up')" :to="{path: '/account/deposit'}" class="account-deposit">
                                    <lang>Top Up</lang>
                                </router-link>
                                <router-link @click.native="changH5Msg('Withdraw')" :to="{path: '/account/withdraw'}" class="account-withdraw">
                                    <lang>Withdraw</lang>
                                </router-link>
                                <div class="currency-select">
                                    <p>
                                        <lang>Select Coin</lang>
                                    </p>
                                    <ul>
                                        <li v-for="(item, index) in userInfo.accounts"
                                            :key="index"
                                            :class="{'on': item.cointype === currBalance.cointype }"
                                            @click="changeAccounts( item )">
                                            <div class="currency-account">
                                                <i >{{ item.cointype | formateCoinType }}</i>
                                                <span >{{ formateBalance(item.balance, item.cointype) }}</span>
                                            </div>
                                            <!--<a :href="'https://etherscan.io/address/'+currBalance.address" v-if="currBalance.cointype==='2001'" target="_blank" class="address">{{ item.address }}</a>-->
                                            <a v-if="currBalance.cointype==='2001'" class="address"
                                               v-clipboard:copy="currBalance.address"
                                               v-clipboard:success="copySucc"
                                               v-clipboard:error="copyError"
                                            >{{ item.address }}</a>
                                            <!--<a :href="'https://www.blockchain.com/btc/address/'+currBalance.address" target="_blank" v-if="currBalance.cointype==='1001'" class="address">{{ item.address }}</a>-->
                                            <a v-if="currBalance.cointype==='1001'" class="address"
                                               v-clipboard:copy="currBalance.address"
                                               v-clipboard:success="copySucc"
                                               v-clipboard:error="copyError"
                                            >{{ item.address }}</a>
                                            <a v-if="currBalance.cointype==='2000'" class="address"
                                               v-clipboard:copy="currBalance.address"
                                               v-clipboard:success="copySucc"
                                               v-clipboard:error="copyError"
                                            >{{ item.address }}</a>
                                        </li>
                                        <!--<li>-->
                                            <!--<div class="currency-input"></div>-->
                                            <!--<div class="currency-account">-->
                                                <!--<i >BTC</i>-->
                                                <!--<span >107.894</span>-->
                                            <!--</div>-->
                                            <!--<a href="javascript:;" class="address">0xD6d93A11751694c20D3E4a3e684A6C877401CBe9</a>-->
                                        <!--</li>-->
                                    </ul>
                                </div>
                                <a href="javascript:;" @click="signOut" class="log-out">
                                    <lang>Log Out</lang>
                                </a>
                            </div>
                        </div>
                        <div class="hadlogin" >
                            <router-link :to="{path: '/account/deposit'}" class="btn-rechrage">
                                <lang>Top Up</lang>
                            </router-link>
                            <router-link :to="{path: '/account/withdraw'}" class="btn-cash">
                                <lang>Withdraw</lang>
                            </router-link>
                        </div>
                    </section>
                </div>

                <!--拉新活動 on 水龙头new -->
                <div class="cs-faucet" v-if="isLog">
                    <div>
                        <a href="javascript:;" @click="showFaucet" class="btn-faucet" >
                        </a>
                        <p class="redPoint" style="" v-if="parseFloat(received_counter) !== 0">{{ received_counter }}</p>
                    </div>
                    <div class="faucet-detailed" :class="{'show':freeWaterPop}">
                        <div class="faucet-title">
                            <lang>Free Bonus</lang>
                        </div>
                        <ul>
                            <li>
                                <p v-lang="$lang.risk.a26"></p>
                                <a href="javascript:;" v-if="tasks_2==='-1'" class="btn btn-gray">{{$lang.risk.a28}}</a>
                                <a href="javascript:;" v-if="tasks_2==='1'" @click="taskClick('task_2',tasks_2)" class="btn btn-green">{{$lang.risk.a28}}</a>
                                <a href="javascript:;" v-if="parseFloat(tasks_2)>1" @click="taskClick('task_2',tasks_2)" class="btn btn-yellow">{{$lang.risk.a28}}</a>
                                <a href="javascript:;" v-if="tasks_2==='0'" class="btn btn-gray">{{$lang.risk.a28}}</a>
                            </li>
                            <li>
                                <p v-lang="$lang.risk.a27"></p>
                                <a href="javascript:;" v-if="tasks_3==='-1'" @click="taskClick('task_3',tasks_3)" class="btn btn-green"><lang>Top Up</lang></a>
                                <a href="javascript:;" v-if="tasks_3==='1'" @click="taskClick('task_3',tasks_3)" class="btn btn-green"><lang>Free Spin</lang></a>
                                <a href="javascript:;" v-if="parseFloat(tasks_3)>1" @click="taskClick('task_3',tasks_3)" class="btn btn-yellow"><lang>Play</lang></a>
                                <a href="javascript:;" v-if="tasks_3==='0'" class="btn-comeTom"><lang>Come Tomorrow</lang></a>
                            </li>
                            <li v-if="userInfo">
                                <p v-if="userInfo.last_recharge==='BTC'" v-lang="'Get <b>0.0001BTC</b>/ 0.001ETH (Log in for 7 consecutive days)'"></p>
                                <p  v-else v-lang="'Get 0.0001BTC/ <b>0.001ETH</b> (Log in for 7 consecutive days)'"></p>
                                <a href="javascript:;" v-if="tasks_4==='1'" @click="taskClick('task_4',tasks_4)" class="btn btn-green"><lang>Free Spin</lang></a>
                                <a href="javascript:;" v-if="tasks_4==='0'" class="btn btn-gray"><lang>Come Tomorrow</lang></a>
                                <div v-if="parseFloat(tasks_day)>0 && (tasks_4!=='0'&&tasks_4!=='1')" class="btn-signDay">{{ _('{0}/7 Days', tasks_day ) }}</div>
                            </li>

                        </ul>
                    </div>
                    <!--浮层 -->
                    <!--第一次登陆 -->
                    <section v-if="showFirstLogin&&isLog">
                        <div class="newFirst">
                            <div class="msg">
                                <p>
                                    <lang>Sign Up to Get 0.0001 BTC for Free</lang>
                                </p>
                                <a href="javascript:;" class="btn-luck" @click="hideFirstLoginAll">
                                    <lang>Get it !</lang>
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <div class="jackpot hide" v-show="jackPotMsg">
                <div class="jackpot-box">
                    <el-carousel :interval="5000" arrow="never" height="72px">
                        <el-carousel-item v-for="(item,index) in jackPotMsg" :key="index"  v-if="item">
                            <span>{{ _('Congratulations to {0} hit {1},', (item.uid) || '', (item.expectid) || '') }}</span>
                            <span class="jackpot-money">{{ _('Win {0} {1}', formateBalance (  item.prize ) || '') ,  formateCoinType (  item.cointype ) }}</span>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>

            <!--  弹窗- 充值到账弹窗  -->
            <div class="pop pop-getFirstCharge"  v-if="firstCharge && firstCharge.activity_status==='2'&&firstCharge.is_alert==='0'">
                <div class="cnt">
                    <h2><lang>Congratulations</lang></h2>
                    <div class="content ">
                        <a href="javascript:;" class="btnclose" @click="readyGetFirst"></a>
                        <p class="anount">+{{ firstCharge.reward_money }}<i>{{ firstCharge.cointype | formateCoinType }}</i></p>
                        <p class="msg" v-lang="_('First top-up {0} {1} Bonus has been sent to your wallet',formateBalance(firstCharge.recharge_money),formateCoinType( firstCharge.cointype ))"></p>
                    </div>
                </div>
            </div>

        </div>
        <!-- 公用的模态框列表 -->
        <pop-list></pop-list>
        <!-- ip -->
        <PopIpLimit></PopIpLimit>
        <!-- 全局该邮件无法激活 -->
        <div role="alert" v-if="showEmailErr && isLog" class="el-message el-message--error" style="z-index: 2003;">
            <p class="el-message__content">
                <lang>Failed to activate, because of wrong email format</lang>
            </p>
        </div>

        <div class="pop pop_cc1" v-if="showCanGetCCTask">
            <div class="pop-body">
                <div class="pop-ani">
                    <a href="javascript:;" class="btn-close" @click="showCanGetCCTask = false"></a>
                    <div>
                        <p v-html="$lang.risk.a20"></p>
                        <div class="btn-box ">
                            <a href="javascript:;" class="btn btn-get" @click="showCanGetCCTask = false;taskClick('task_2',tasks_2);">{{$lang.risk.a25}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pop pop_cc1" v-if="showUseAllCCPop">
            <div class="pop-body">
                <div class="pop-ani">
                    <a href="javascript:;" class="btn-close" @click="showUseAllCCPop = false"></a>
                    <div>
                        <p v-html="$lang.risk.a21"></p>
                        <div class="btn-box">
                            <router-link :to="{path: '/account/deposit'}" class="btn btn-topUp" @click="showUseAllCCPop = false">
                                <lang>Top Up</lang>
                            </router-link>
                            <a href="javascript:;" class="btn later-later" @click="showUseAllCCPop = false">{{$lang.risk.a24}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pop pop_cc1" v-if="showWinALotCCPop">
            <div class="pop-body">
                <div class="pop-ani">
                    <a href="javascript:;" class="btn-close" @click="showWinALotCCPop = false"></a>
                    <div>
                        <p v-html="$lang.risk.a22"></p>
                        <p v-html="$lang.risk.a23"></p>
                        <div class="btn-box">
                            <router-link :to="{path: '/account/deposit'}" class="btn btn-topUp" @click="showWinALotCCPop = false">
                                <lang>Top Up</lang>
                            </router-link>
                            <a href="javascript:;" class="btn later-later" @click="showWinALotCCPop = false">{{$lang.risk.a24}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PopList from '~components/Pop-list'
    import PopIpLimit from '~components/Pop-ipLimit.vue'
    import {copySucc, copyError, formateBalance, formateCoinType, formateEmail, isForbitPage} from '~common/util'

    import Vue from 'vue'
    import vueClipboard from 'vue-clipboard2'
    Vue.use(vueClipboard)

    export default {
        components: {PopList, PopIpLimit},
        data () {
            return {
                showFirstGet: false,
                showLight: false, // new 闪烁
                freeWaterPop: false, // new水龙头
                showDetail: false,
                slideDown: false,
                languageOptions: [
                    {
                        value: 'en',
                        label: 'English',
                        lanLogo: '../../../static/staticImg/lan-en.jpg'
                    }, {
                        value: 'zhCn',
                        label: '中文简体',
                        lanLogo: '../../../static/staticImg/lan-cn.jpg'
                    }, {
                        value: 'zhTw',
                        label: '中文繁體',
                        lanLogo: '../../../static/staticImg/lan-cn.jpg'
                    }],
                isShowLanguage: false,
                isShowMycount: false,
                isChooseCoin: false,
                isShowChoose: false,
                received_counter: 0, // 已完成未领取数量
                tasks_2: '-1',
                tasks_3: '-1',
                tasks_4: '-1',
                tasks_day: '0',
                showUseAllCCPop: false,
                showWinALotCCPop: false,
                showCanGetCCTask: false
            }
        },
        watch: {
            initHeadState () {
                this.isShowLanguage = false
                this.isShowMycount = false
                this.isChooseCoin = false
                this.isShowChoose = false
                this.freeWaterPop = false
            },
            isLog () {
                this.autoChangeDefaultAccount()
            },
            CCNum (newVal, val) {
                newVal = Number(newVal)
                val = Number(val)
                if (isNaN(newVal) || isNaN(val) || !this.isLog) {
                    return
                }
                let hasTask = this.tasks_2 === '1'
                let isEmpty = (newVal < 0.1)
                let winAlot = (newVal - val) > 10 && val !== 0
                if (hasTask && isEmpty) {
                    this.showCanGetCCTask = true
                } else if (!hasTask && isEmpty) {
                    this.showUseAllCCPop = true
                } else if (winAlot) {
                    this.showWinALotCCPop = true
                }
            }
        },
        computed: {
            initHeadState () {
                /* 去除所有弹层 */
                return this.$store.state.initHeadState
            },
            jackPotMsg () {
                return this.$store.state.cs_1105.jackPotMsg
            },
            showFirstLogin () {
                return this.$store.state.pop.showFirstLogin
            },
            isLog () {
                return this.$store.state.isLog
            },
            currBalance () {
                return this.$store.state.currBalance
            },
            userInfo () {
                return this.$store.state.userInfo
            },
            languageVal: {
                set (val) {
                    this.$store.commit('changeLanguage', val)
                },
                get () {
                    return this.$store.state.language
                }
            },
            firstCharge () {
                return this.$store.state.cs_activity.firstCharge
            },
            showEmailErr () {
                return this.$store.state.showEmailErr
            },
            CCNum () {
                let num = 0
                if (this.userInfo && this.userInfo.accounts && this.userInfo.accounts.length > 0) {
                    this.userInfo.accounts.forEach(item => {
                        if (item.cointype === '2000') {
                            num = Number(item.balance)
                        }
                    })
                }
                return num
            }
        },
        methods: {
            formateEmail,
            formateBalance,
            formateCoinType,
            copySucc,
            copyError,
            autoChangeDefaultAccount () {
                setTimeout(() => {
                    if (this.isLog) {
                        this.changeDefaultAccount()
                    }
                }, 200)
            },
            changeDefaultAccount () {
                let accounts = this.userInfo.accounts
                let BTCAccount = accounts.filter(account => account.cointype === '1001')
                let BTCHasBalance = (BTCAccount && BTCAccount[0] && Number(BTCAccount[0].balance) > 0)
                let ETHAccount = accounts.filter(account => account.cointype === '2001')
                let ETHHasBalance = (ETHAccount && ETHAccount[0] && Number(ETHAccount[0].balance) > 0)
                let CCAccount = accounts.filter(account => account.cointype === '2000')
                let CCHasBalance = (CCAccount && CCAccount[0] && Number(CCAccount[0].balance) > 0)
                if (BTCHasBalance) {
                    this.changeAccounts(BTCAccount[0])
                } else if (ETHHasBalance) {
                    this.changeAccounts(ETHAccount[0])
                } else if (CCHasBalance) {
                    this.changeAccounts(CCAccount[0])
                }
            },
            async readyGetFirst () {
                await this.$store.dispatch('cs_activity/rechargealert')
                this.$store.dispatch('cs_activity/getChargeState')
            },
            async taskClick (type, val) {
                val = val.toString()
                if (val === '2') {
                    this.$router.push('/luckyslot')
                    return false
                }
                if (val === '-1' && type === 'task_3') {
                    this.$router.push('/account/deposit')
                    return false
                }
                if (val === '1') {
                    /* 领取 */
                    let taskid = null
                    switch (type) {
                    case 'task_2':
                        taskid = 2
                        break
                    case 'task_3':
                        taskid = 3
                        break
                    case 'task_4':
                        taskid = 4
                        break
                    }
                    let faucetGet = await this.$store.dispatch('faucetGet', taskid)
                    if (faucetGet && faucetGet.status === '100') {
                        this.faucetTask()
                        this.showUserMsg()
                        this.$emit('freshSlot', '')
                    } else {
                        this.$message({
                            message: 'faucetGet error',
                            type: 'error',
                            duration: 1500
                        })
                    }
                }
            },
            handleLanguageChange (val) {
                this.$store.commit('changeLanguage', val)
            },
            headControlPop (tab = 'showChoose') {
                let controlShowMsgDom = document.getElementById('controlShowMsg')
                if (controlShowMsgDom) {
                    if (~controlShowMsgDom.className.indexOf('disable')) {
                        return false
                    }
                }
                switch (tab) {
                case 'showChoose':
                    this.isShowLanguage = false
                    // this.isShowMycount = false
                    this.isChooseCoin = false
                    this.isShowChoose = !this.isShowChoose
                    break
                case 'chooseCoin':
                    this.isShowLanguage = false
                    this.isShowMycount = false
                    this.isShowChoose = false
                    this.isChooseCoin = !this.isChooseCoin
                    break
                case 'showMycount':
                    this.isChooseCoin = false
                    this.isShowChoose = false
                    this.isShowLanguage = false
                    this.isShowMycount = !this.isShowMycount
                    break
                case 'showLanguage':
                    this.isShowMycount = false
                    this.isChooseCoin = false
                    this.isShowChoose = false
                    this.isShowLanguage = !this.isShowLanguage
                    break
                }
            },
            changeAccounts (item) {
                if (item) {
                    this.$store.commit('setCurrBalance', item)
                }
            },
            showUserMsg () {
                this.$store.dispatch('getUserInfo')
            },
            hideFirstLoginAll () {
                // 关闭 0.0001 弹窗
                this.$store.commit('showFirstLogin', false)
                setTimeout(() => {
                    // 闪烁
                    this.showLight = true
                }, 800)
            },
            async faucetTask () {
                let taskMsg = await this.$store.dispatch('faucetTask', this.currBalance.cointype)
                if (taskMsg && taskMsg.status === '100') {
                    this.received_counter = taskMsg.data.not_received_counter
                    if (taskMsg.data.tasks) {
                        taskMsg.data.tasks.forEach((item, index) => {
                            if (item.task === '2' || item.task === '3' || item.task === '4') {
                                if (item.info) {
                                    this['tasks_' + item.task] = item.info.status
                                    if (item.info.free !== '0' && parseInt(item.info.free) > 0 && item.info.status.toString() !== '1') {
                                        this['tasks_' + item.task] = 2
                                    }
                                }
                            }
                        })
                    }
                    if (taskMsg.data.sign_days !== undefined) {
                        this.tasks_day = taskMsg.data.sign_days
                    }
                }
            },
            showFaucet () {
                /* free water  请求列表接口 new */
                if (!this.freeWaterPop) {
                    this.faucetTask()
                }
                this.freeWaterPop = !this.freeWaterPop
                this.$emit('headPopChange', this.freeWaterPop)
            },
            signOut () {
                /* 退出登录 */
                this.$store.dispatch('loginOut')
            },
            onSignUp () {
                this.$store.commit('showRegPop')
            },
            onLoginIn () {
                this.$store.commit('showLoginPop')
            },
            changH5Msg (value) {
                this.$store.commit('cs_account/setH5NavMsg', value)
            }
        },
        filters: {
            formateCoinType, formateBalance
        },
        async mounted () {
            this.showUserMsg()
            setTimeout(() => {
                if (this.isLog) {
                    this.faucetTask()
                }
                if (!localStorage.getItem('waterPop') || localStorage.getItem('waterPop') !== (new Date().getDay()).toString()) {
                    localStorage.setItem('waterPop', new Date().getDay())
                    this.freeWaterPop = true
                }
            }, 0)
            let isReadyAlert = false
            // setInterval(async () => {
            //     if (this.isLog && !isReadyAlert && !isForbitPage()) {
            //         let msg = await this.$store.dispatch('cs_activity/getChargeState')
            //         if (msg && msg.is_alert === '1') {
            //             isReadyAlert = true
            //         }
            //     }
            // }, 15000)
            this.$store.dispatch('adList')
            this.autoChangeDefaultAccount()
        }
    }
</script>
<style scoped lang="less" type="text/less">
    @import "../styles/lib-mixins.less";
    @import "../styles/lib-media.less";


    .pop-getFirstCharge{
        *{
            box-sizing: border-box;
        }
        .cnt{
            position: relative;
            width: 80%;
            max-width: 513px;
            margin: 307px auto 0;
            h2{
                position: absolute;
                left: 50%;
                top: -34px;
                transform: translate(-50%);
                width: 360px;
                height: 63px;
                overflow: hidden;
                line-height: 68px;
                font-size: 28px;
                color: #3f2c65;
                font-family: sans-eb;
                font-weight: bold;
                background: url("../assets/img/paysend/fir_titlebg.png") no-repeat center;
                background-size: cover;
            }
            .content{
                border: 6px solid #f1a501;
                border-radius: 8px;
                background: #3f2c65;
                padding: 28px 10px 26px;
                .anount{
                    line-height: 174px;
                    color: #fdca1b;
                    font-size: 76px;
                    font-family: sans-eb;
                    i{
                        font-size: 42px;
                    }
                }
                .msg{
                    font-size: 16px;
                    color: #ffffff;
                }
            }
            .btnclose{
                position: absolute;
                right: 0;
                top: -63px;
                display: block;
                width: 40px;
                height: 40px;
                overflow: hidden;
                border-radius: 50%;
                border: 1px solid rgba(255,255,255,0.3);
                background: url("../assets/img/paysend/btn-close.png") no-repeat center;
                background-size: 16px;
            }
        }
    }
    @media(max-width:768px) {
        .pop-getFirstCharge{
            .cnt{
                margin: 150px auto 0;
                h2{
                    top: -34/1.5px;
                    width: 360/1.5px;
                    height: 63/1.5px;
                    line-height: 68/1.5px;
                    font-size: 28/1.5px;
                }
                .content{
                    border: 3px solid #f1a501;
                    border-radius: 4px;
                    padding: 28px 10px 26px;
                    .anount{
                        line-height: 174/2px;
                        font-size: 30px;
                        i{
                            font-size: 16px;
                        }
                    }
                    .msg{
                        font-size: 16px;
                    }
                }
                .btnclose{
                    top: -63/1.5px;
                    width: 30px;
                    height: 30px;
                    background-size: 10px;
                }
            }
        }
    }




    .banner{
        display: none;
    }
    .head {
        position: relative;
        width: 100%;
        height: 70px;
        background: rgba(0,0,0,0.4);
        background: #151515;
        color: #fff;
        .top {
            position: relative;
            z-index: 9;
            width:100%;
            max-width:1190px;
            height: 100%;
            margin: 0 auto;
        }
        .logo {
            display: block;
            float: left;
            width: 110px;
            height: 32px;
            margin:19px 27px 0 0;
            img{
                display: block;
                height:100%;
            }
        }
        .choose-play{
            position: relative;
            display: table;
            float: left;
            /*overflow: hidden;*/
            height:100%;
            a{
                display: table-cell;
                vertical-align: middle;
                padding:0 23px;
                font-size:16px;
                color: #fff;
                &:hover{
                    background: rgba(0,0,0,0.3);
                }
                &.on{
                    background: rgba(0,0,0,0.8);
                }
            }
            &.icon-new{
                &::before{
                    content: 'N';
                    display: block;
                    position: absolute;
                    top: 24px;
                    right:-2px;
                    border-radius: 2px;
                    padding: 0 4px;
                    line-height: 18px;
                    background: #36c57a;
                    font-weight: bold;
                    font-size: 14px;
                    color: #fff;
                }
            }
        }
        .language {
            box-sizing: border-box;
            position: relative;
            width:70px;
            height:70px;
            float: right;
            padding-top:21px;
            position: relative;
            cursor: pointer;
            .language-choose{
                img{
                    display: block;
                    margin:0 auto;
                }
                span{
                    display: block;
                    margin-top:4px;
                    line-height:16px;
                    text-align: center;
                    font-size:12px;
                    color: #fff;
                }
            }
            ul{
                display: none;
                position: absolute;
                width:70px;
                z-index:2;
                left:0;
                top:57px;
                border-radius: 6px;
                overflow: hidden;
                cursor: pointer;
                font-size:12px;
                color: #263648;
                li{
                    box-sizing: border-box;
                    padding-top:20px;
                    width:70px;
                    height:70px;
                    background: #fff;
                    &:hover{
                        background: #eef1f9;
                    }
                }
                li+li{
                    border-top:1px solid #778ca3;
                }
                img{
                    display: block;
                    margin:0 auto;
                }
                span{
                    display: block;
                    height:20px;
                    line-height:20px;
                    text-align: center;
                    .text-overflow();
                }
            }
            &.isLanguage{
                background: rgba(0,0,0,0.5);
                ul{
                    display: block;
                }
            }
        }
        .impor-wallet {
            display: block;
            float: right;
            margin: 26px 47px 0 0;
            width: 198px;
            height: 34px;
            overflow: hidden;
            text-align: center;
            line-height: 34px;
            border: 1px solid #907eef;
            border-radius: 6px;
            color: #fff;
        }
        .mycount {
            position: relative;
            float: left;
            margin-right:20px;
            transform: translate3d(0,0,0);
            padding:20px;
            .transition();
            .countNum {
                position: relative;
                cursor: pointer;
                display: block;
                padding:0 25px 0 40px;
                line-height: 30px;
                font-size: 16px;
                .icon-user{
                    display: block;
                    position: absolute;
                    width: 29px;
                    height: 30px;
                    left: 0;
                    top: 0;
                    background: url(" ../assets/img/icon-user.png") no-repeat center;
                    background-size: cover;
                }
                i {
                    display: block;
                    position: absolute;
                    width: 14px;
                    height: 8px;
                    right: 0;
                    top: 9px;
                    background: url(" ../assets/slice/arrow-down-fff.png") no-repeat center;
                    background-size: 14px;
                    transform-origin: 50%;
                    .transition();
                }
            }
            &.on{
                .countNum{
                    >i {
                        transform: rotate(180deg);
                    }
                }
                .mycount-detailed{
                    display: block;
                }
            }
        }
        .login {
            position: relative;
            float: right;
            text-align: center;
            .act-sign{
                position: relative;
                margin: 25px 20px 0 0;
                float: left;
            }
            .to-login{
                float: right;
                overflow: hidden;
                margin-top:20px;
                height:28px;
                border-radius: 6px;
                border:1px solid rgba(255,255,255,0.3);
                line-height:28px;
                a{
                    display: block;
                    float: left;
                    box-sizing: border-box;
                    color: #fff;
                    padding:0 20px;
                    &+a{
                        border-left:1px solid rgba(255,255,255,0.3);
                    }
                    &:hover {
                        background: rgba(255,255,255,0.3);
                    }
                }
            }
            .hadlogin {
                position: relative;
                float: right;
                margin-top:20px;
                text-align: center;
                overflow: hidden;
                border-radius: 6px;
                border:1px solid rgba(255,255,255,0.3);
            }
            .btn-rechrage,.btn-cash{
                display: block;
                float: left;
                height:28px;
                line-height:28px;
                padding:0 20px;
                color: #fff;
                &:hover {
                    background: rgba(255,255,255,0.3);
                }
            }
            .btn-cash {
                border-left:1px solid rgba(255, 255, 255, 0.3);
            }
        }

    }

    .mycount-detailed {
        display: none;
        position: absolute;
        z-index: 10;
        left: 50%;
        top: 60px;
        padding:16px 16px 0;
        width: 235px;
        border-radius: 6px;
        /*overflow: hidden;*/
        background: #fff;
        text-align: left;
        transform: translateX(-50%);
        -webkit-box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        .account-info {
            color: #263648;
            .email {
                line-height: 25px;
                font-size: 16px;
                font-weight: bold;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .uid {
                line-height: 20px;
                font-size: 14px;
            }
        }
        .my-transaction,
        .account-center,
        .account-deposit,
        .account-withdraw {
            display: block;
            height: 28px;
            overflow: hidden;
            margin: 10px auto 0;
            line-height: 28px;
            text-align: center;
            border: 1px solid #6a89cc;
            border-radius: 6px;
            &:hover {
                background: #eef1f9;
            }
        }
        .account-deposit,
        .account-withdraw {
            display: none;
        }
        .currency-select{
            margin:10px 0 0 0;
            >p{
                line-height:38px;
                color: #263648;
            }
            li{
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                border-radius: 6px;
                border: 2px solid #6f88cb;
                height: 50px;
                margin-bottom: 10px;
                font-size: 20px;
                font-weight: bold;
                color: #6f88cb;
                cursor: pointer;
                overflow: hidden;
                a{
                    display: none;
                }
            }
            li.on{
                flex-direction: column;
                background: #6f88cb;
                color: #fff;
                .currency-account{
                    height: 22px;
                }
                a{
                    display: block;
                    line-height: 16px;
                    text-decoration: underline;
                    font-size: 12px;
                    color: #fff;
                    width: 70px;
                    .text-overflow();
                    margin: 0 auto;
                }
                &::after{
                    content: '';
                    display: block;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    width: 32px;
                    height: 30px;
                    background: url("../assets/img/icon-select.png") no-repeat center;
                    background-size: 32px;
                }
            }
        }
        .log-out {
            display: block;
            overflow: hidden;
            margin-top: 22px;
            line-height: 40px;
            text-align: center;
            border-top: 1px solid #ced6e0;
            &:hover {
                background: #eef1f9;
            }
        }
        &::before{
            content: '';
            display: block;
            position: absolute;
            left: 50%;
            top:-9px;
            width:18px;
            height:10px;
            overflow: hidden;
            background: url("../assets/img/icon-tri.png") no-repeat center;
            background-size: cover;
            transform: translateX(-50%);
        }
    }
    /*20180720 newAct 拉新活动*/
    .cs-faucet{
        position: relative;
        float: right;
        margin:21px 22px 0 0;
        .redPoint{
            position: absolute;
            top: -8px;
            right: -8px;
            background-color: #ff1b0e;
            border-radius: 50%;
            color: #fff;
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
        }
        .btn-faucet{
            display: block;
            width:19px;
            height:26px;
            overflow: hidden;
            padding:0 10px;
            background: url("../assets/img/icon-water.png") no-repeat center;
            background-size: 19px;
            animation: heartbeat 2s infinite;
        }
        .faucet-detailed{
            display: none;
            position: absolute;
            top:37px;
            z-index: 20;
            right:-24px;
            padding:10px 20px 20px;
            width:455px;
            background: #fff;
            border-radius: 6px;
            color: #263648;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            border: 4px solid #36c57a;
            &::before{
                content: '';
                display: block;
                position: absolute;
                right: 28px;
                top: -10px;
                width: 18px;
                height: 10px;
                overflow: hidden;
                background: url('../assets/img/icon-tri2.png') no-repeat center;
                background-size: cover;
            }
            .faucet-title{
                line-height:68px;
                font-size:24px;
                font-weight:bold;
                text-align: center;
                border-bottom:1px solid #ced6e0;
            }
            li{
                display: flex;
                justify-content: space-between;
                align-items: center;
                overflow: hidden;
                border-bottom:1px solid #ced6e0;
                padding:14px 0;
                p{
                    width:295px;
                    line-height:20px;
                }
                .btn{
                    display: block;
                    width:83px;
                    height:35px;
                    overflow: hidden;
                    text-align: center;
                    line-height:35px;
                    border-radius:6px;
                    font-size:16px;
                    color: #fff;
                    transition: all 0.2s;
                    &.btn-green{
                        background: #20bf6b;
                    }
                    &.btn-yellow{
                        background: #fd9644;
                    }
                    &.btn-gray{
                        background: #ced6e0;
                    }
                    &.btn-ok{
                        cursor: default;
                        background: url("../assets/img/btn-waterok.png") no-repeat center;
                        background-size: 24px;
                    }
                    &:not(.btn-ok):hover{
                        filter: brightness(1.1);
                    }
                }
            }
        }
        &.on{
            .faucet-detailed{
                display: block;
            }
        }
    }

    .opening {
        position: absolute;
        top: 0;
        left: 160px;
        font-weight: bold;
        font-size: 16px;
        color: #fff;
        font-weight: bold;
    }


    #cicle {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-50%);
    }



    @keyframes rubberBand {
        0% {
            transform: scaleX(1);
        }
        30% {
            transform: scale3d(1.25, 0.75, 1);
        }

        40% {
            transform: scale3d(0.75, 1.25, 1);
        }

        50% {
            transform: scale3d(1.15, 0.85, 1);
        }

        65% {
            transform: scale3d(0.95, 1.05, 1);
        }

        75% {
            transform: scale3d(1.05, 0.95, 1);
        }

        to {
            transform: scaleX(1);
        }
    }

    @keyframes bounceIn {
        0%, 60%, 75%, 90%, to {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        0% {
            opacity: 0;
            transform: translate3d(0, -3000px, 0);
        }

        60% {
            opacity: 1;
            transform: translate3d(0, 25px, 0);
        }

        75% {
            transform: translate3d(0, -10px, 0);
        }

        90% {
            transform: translate3d(0, 5px, 0);
        }

        to {
            transform: none;
        }
    }

    @keyframes freeDown {
        0% {
            transform: translateY(-50px) rotate(50deg);
            opacity: 1;
        }
        60% {
            opacity: 1;
        }
        80% {
            transform: translateY(200px) rotate(-100deg);
            opacity: 0;
        }
        100% {
            transform: translateY(300px) rotate(-150deg);
            opacity: 0;
        }
    }

    .fresh_move {
        animation: fresh_move 1s;
    }

    @keyframes fresh_move {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .deadlineMove {
        animation: deadlineMove 1.3s;
    }

    @keyframes deadlineMove {
        0% {
            transform: translateY(0);
        }
        35% {
            opacity: 0;
            transform: translateY(60px);
        }
        65% {
            opacity: 0;
            transform: translateY(-60px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .blinking {
        animation: blinking 0.7s;
    }

    @keyframes blinking {
        0% {
            opacity: 1;
        }
        25% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        75% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    .jackpot{
        position: fixed;
        left:0;
        top:0;
        z-index:10;
        width:100%;
        height:150px;
        //overflow: hidden;
        animation: slideDownIn 1s;
        .jackpot-box{
            position: relative;
            z-index:2;
            width: 100%;
            max-width: 947px;
            height: 112px;
            margin:0 auto;
            background: url("../assets/slice/jackpot-bg.png") top center no-repeat;
            background-size: cover;
            line-height:76px;
            font-size:22px;
            .el-carousel{
                padding-top:25px;
            }
            .el-carousel__item{
                text-align: center;
            }
            .jackpot-money{
                font-size:36px;
                font-family:sans-eb;
                line-height:72px;
            }
        }
        canvas{
            position: absolute;
            z-index:1;
            top:0;
            left:0;
        }
    }

    @keyframes slideDownIn {
        0%, 60%, 75%, 90%, to {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        0% {
            opacity: 0;
            transform: translate3d(0, -3000px, 0);
        }

        60% {
            opacity: 1;
            transform: translate3d(0, 25px, 0);
        }

        75% {
            transform: translate3d(0, -10px, 0);
        }

        90% {
            transform: translate3d(0, 5px, 0);
        }

        to {
            transform: none;
        }
    }


    /*移动端选择玩法*/
    .m-choose-play{
        display: none;
        position: relative;
        float: left;
        width:104/2px;
        height:100%;
        .btn{
            position: relative;
            width:20px;
            height:20px;
            margin:25px auto;
            cursor: pointer;
            span{
                position: absolute;
                left:0;
                display: block;
                width:100%;
                height:2px;
                background: #fff;
                border-radius: 2px;
                top:7px;
                .transition();
                transform-origin: left center;
            }
            span:first-child{
                top:0;
            }
            span:last-child{
                top:15px;
            }
        }
        .msg{
            display: none;
            float: right;
            line-height:70px;
            font-size:14px;
            color: #444c55;
            .transition();
        }
        ul{
            display: none;
            position: absolute;
            top:70px;
            left:0;
            box-sizing: border-box;
            padding:0 25px 18px 0;
            width:100%;
            line-height:40px;
            font-size:20px;
            font-weight:bold;
            text-align: right;
            background: #000;
            .transition();
            li.on,li:hover{
                a{
                    color: #fff;
                }
            }
            /*&::before{*/
                /*content: '';*/
                /*display: block;*/
                /*position: absolute;*/
                /*right:5px;*/
                /*bottom:40px;*/
                /*width: 10px;*/
                /*height: 10px;*/
                /*background: url(../assets/img/icon-new.png) no-repeat center;*/
                /*background-size: cover;*/
                /*transform-origin: center;*/
                /*transform: rotate(30deg);*/
            /*}*/
        }
        &.isShowChoose{
            position: absolute;
            left:0;
            top:0;
            background: #000;
            box-sizing: border-box;
            width:324/2px;
            padding-right:25px;
            .btn{
                float: left;
                margin:25px 0 25px 13px;
                span{
                    opacity:0;
                }
                span:first-child{
                    opacity:1;
                    transform: rotateZ(40deg) scaleX(1.2);
                }
                span:last-child{
                    opacity:1;
                    transform: rotateZ(-40deg) scaleX(1.2);
                }
            }
            .msg{
                display: block;
            }
            ul{
                display: block;
                a.on{
                    color: #fff;
                }
            }
            &.icon-new{
                ul{
                    &::before{
                        content: 'N';
                        display: block;
                        position: absolute;
                        bottom: 30px;
                        right:2px;
                        border-radius: 2px;
                        padding: 0 4px;
                        line-height: 18px;
                        background: #36c57a;
                        font-weight: bold;
                        font-size: 14px;
                        color: #fff;
                    }
                }
            }
        }
    }
    /*开始适配*/
    @media (max-width: @screen-lg-desktop) {
        .head{
            .choose-play{
                display: none;
            }
            .m-choose-play{
                display: block;
            }
        }
    }
    @media (max-width: @screen-desktop) {
        .head{
            .hadlogin{
                display: none;
            }
            .account-deposit,.account-withdraw {
                display: block;
            }
        }
    }
    @media (max-width: @screen-tablet) {
        .head{
            height:50px;
            .logo{
                width:auto;
                height:22px;
                margin:14px 0 0 0;
            }
            .login{
                margin:0;
                height:100%;
                .act-sign{
                    position: absolute;
                    width: 120px;
                    right: 35px;
                    bottom: -7px;
                    margin: 0;
                    padding: 0 4px;
                    height: 15px;
                    line-height: 15px;
                    font-size: 11px;
                    &::before{
                        top: -8px;
                        right:20px;
                        transform: rotateZ(-90deg);
                    }
                }
                .to-login{
                    height:50px;
                    line-height:50px;
                    border:none;
                    border-radius: 0;
                    padding:0 15px;
                    margin-top: 0;
                    font-size: 12px;
                    a{
                        &+a{
                            border: none;
                        }
                    }
                }
            }
            .mycount{
                margin: 0 10px 0 0;
                padding: 13.5px 10px;
                .countNum{
                    padding: 0 12px 0 30px;
                    line-height: 47/2px;
                    font-size: 13px;
                    .icon-user{
                        width: 46/2px;
                        height: 47/2px;
                        background-size: cover;
                    }
                    i{
                        width: 14/2px;
                        height: 8/2px;
                        right: 0;
                        top: 10px;
                        background-size: 14/2px;
                        background-origin: 50%;
                    }
                }
            }
        }
        .m-choose-play{
            .btn{
                margin: 15px 0 15px 13px;
            }
            .msg{
                line-height:50px;
            }
            &.isShowChoose{
                .btn{
                    margin: 15px 0 15px 13px;
                }
                ul{
                    top:50px;
                }
            }
        }
        .cs-faucet{
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            margin: 0;
            .btn-faucet{
                width: 33/2px;
                height: 45/2px;
                background-size: 33/2px;
                padding: 13.75px 10px;
            }
            .faucet-detailed{
                top: 46px;
                right: 50%;
                transform: translateX(50%);
                padding: 5px 8px 6px;
                width: 250px;
                .faucet-title{
                    line-height: 34px;
                    font-size: 18px;
                }
                li{
                    padding: 12px 0;
                    p{
                        width: 170px;
                        line-height: 13px;
                        font-size: 12px;
                    }
                    .btn{
                        width: 128/2px;
                        height: 60/2px;
                        line-height: 60/2px;
                        font-size: 13px;
                        &.btn-ok{
                            background-size: 28px;
                        }
                    }
                }
                &::before{
                    right: 50%;
                    transform: translateX(50%);
                    top: -10px;

                    overflow: hidden;
                    background: url('../assets/img/icon-tri2.png') no-repeat center;
                    background-size: cover;
                }
            }
        }
        .mycount-detailed{
            top:46px;
            padding: 13px 13px 0;
            width: 275/2px;
            .account-info{
                .email{
                    line-height: 19px;
                    font-size: 14px;
                }
                .uid{
                    line-height: 17px;
                    font-size: 12px;
                }
            }
            .my-transaction,.account-center,.account-deposit,.account-withdraw{
                margin-top: 10px;
                height: 24px;
                line-height: 24px;
                font-size: 12px;
            }
            .currency-select{
                margin: 14px 0 0 0;
                >p{
                    line-height: 25px;
                    font-size: 12px;
                }
                li{
                    height: 48px;
                    border-width: 1px;
                    font-size: 16px;
                }
                li.on{
                    a{
                        width: 60px;
                        font-size: 11px;
                        &::after{
                            width: 57/2px;
                            height: 53/2px;
                            background: url("../assets/img/icon-select.png") no-repeat center;
                            background-size: 57/2px;
                        }
                    }
                }
            }
            .log-out{
                margin-top: 20px;
                line-height: 31px;
                font-size: 12px;
            }
            &::before{
                right: 50%;
                transform: translateX(50%);
                top: -3.5px;
                width: 8px;
                height: 4px;
            }
        }
    }
    @media (max-width: @screen-phone){
    }
    @keyframes icon-new {
        0%,8%,22%,100%{
            transform: rotate(0) translateX(0);
        }
        10%,14%,18%{
            transform: rotate(30deg) translateY(4px);
        }
        12%,16%,20%{
            transform: rotate(30deg) translateY(2px);
        }
    }
    @keyframes heartbeat {
        0%,30%,80%,100%{
            transform: scale(1);
            filter: brightness(1);
        }
        20%,40%{
            transform: scale(1.2);
            filter: brightness(1.2);
        }
    }
    .newFirst{
        position: absolute;
        top: 26px;
        left: 39%;
        margin-left: -118px;
        z-index: 99;
        text-align: center;
        &::before{
            content: '';
            display: block;
            width: 0;
            height: 0;
            margin: 0 auto;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 7px solid transparent;
            border-bottom: 7px solid #fff;
        }
        .msg{
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            width: 250px;
            height: 52px;
            overflow: hidden;
            line-height: 20px;
            font-size: 14px;
            color: #263648;
            -webkit-box-shadow: 0px 3px 10px 0px rgba(25, 39, 56, 0.4);
            box-shadow: 0px 3px 10px 0px rgba(25, 39, 56, 0.4);
            border-radius: 6px;
            background: #fff;
        }
        p{
            padding: 5px 0px 2px 8px;
            text-align: center;
        }
    }
    .light{
        animation: light 2s;
    }
    @keyframes light {
        0%,40%,80%,100%{
            filter:brightness(1);
        }
        20%,60%{
            filter:brightness(1.5);
        }
    }
</style>
