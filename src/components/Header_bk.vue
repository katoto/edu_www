<template>
    <div class="head-box">
        <Banner></Banner>
        <div class="head">
            <div class="top">
                <!--展开 on-->
                <div class="m-choose-play" :class="{isShowChoose:isShowChoose}" @click="isShowChoose=!isShowChoose">
                    <div class="btn">
                        <span></span><span></span><span></span>
                    </div>
                    <div class="msg">
                        Select Game
                    </div>
                    <ul>
                        <li @click="jump2Page('lucky11')" :class="{'on':currTab==='lucky11'}"><a href="javascript:;">Lukcy 11</a></li>
                        <li class="hide"  :class="{'on':currTab==='luckyCoin'}"><a href="javascript:;">luckyCoin</a></li>
                        <li @click="jump2Page('slot')" :class="{'on':currTab==='slot'}"><a href="javascript:;">Slot</a></li>
                    </ul>
                </div>
                <router-link to="/" title="Coinslot" class="logo">
                    <img src="../assets/img/coinslotLogo.png" alt="coinslotLogo">
                </router-link>
                <div class="choose-play">
                    <a href="javascript:;" target="_blank" class="on">Lukcy11</a>
                    <a href="javascript:;" target="_blank">LuckyCoin</a>
                    <a href="javascript:;" target="_blank">Mobile APP</a>
                </div>
                <div class="language " :class="{isLanguage:isShowLanguage}" @click="isShowLanguage=!isShowLanguage">
                    <div class="language-choose">
                        <img src="../assets/slice/cn.png" alt="">
                        <span>En</span>
                    </div>
                    <ul>
                        <li>
                            <img src="../assets/slice/cn.png" width="27" height="15" alt="">
                            <span>中文(简)</span>
                        </li>
                        <li>
                            <img src="../assets/slice/cn.png" width="27" height="15" alt="">
                            <span>中文(繁)</span>
                        </li>
                    </ul>
                </div>
                <!-- 登录  -->
                <div class="login">
                    <!-- 未登录 -->
                    <a href="javascript:;" class="to-login" v-if="!isLog" @click="onLoginIn">
                        <lang>Sign In / Up</lang>
                    </a>
                    <!-- 登录 -->
                    <section v-else>
                        <!--选择币种,暂时不做-->
                        <div class="choose-coin" v-if="userInfo && userInfo.accounts" :class="{isChooseCoin:isChooseCoin}" @click="isChooseCoin=!isChooseCoin">
                            <span class="coin" v-if="currBalance">{{ formateBalance( currBalance.balance ) }} {{ currBalance.cointype |formateCoinType }}</span>
                            <ul>
                                <li v-for="item in userInfo.accounts" :class="{'on': item.cointype === currBalance.cointype }"
                                    @click="changeAccounts( item )"
                                >{{ formateBalance( item.balance ) }}<i>{{ item.cointype | formateCoinType }}</i></li>
                                <!--<li>0.00001<i>HTC</i></li>-->
                            </ul>
                        </div>
                        <div class="hadlogin" >
                            <router-link :to="{path: '/account/deposit'}" class="btn-rechrage">
                                <lang>Deposit</lang>
                            </router-link>
                            <router-link :to="{path: '/account/withdraw'}" class="btn-cash">
                                <lang>Withdraw</lang>
                            </router-link>
                        </div>
                        <!--@click="showUserMsg" -->
                        <div class="mycount "  :class="{isShowMycount:isShowMycount}"  @click="isShowMycount=!isShowMycount">
                            <div class="countNum">
                                {{ formateEmail(userInfo.email) }}<i></i>
                            </div>
                            <div id="mycount-detailed" class="mycount-detailed ">
                                    <div class="account-info">
                                        <div class="email js_email-account" :title="userInfo.email">
                                            {{ userInfo.email }}
                                        </div>
                                        <div class="uid">
                                            <lang>UserID</lang>:<i class="js_user_uid">{{ userInfo.uid }}</i>
                                        </div>
                                    </div>

                                    <router-link :to="{path: '/account/myBets'}">
                                        <a href="" class="my-transaction"><lang>My Bets</lang></a>
                                    </router-link>
                                    <router-link :to="{path: '/account/general'}">
                                        <a href="" class="account-center"><lang>Account Center</lang></a>
                                    </router-link>
                                    <a href="javascript:;" @click="signOut" class="log-out"><lang>Sign Out</lang></a>
                                </div>
                        </div>

                    </section>
                </div>

                <!--拉新活动 主按钮 ( 必须是激活用户 ) light over  -1  未开始  1 已结束  -2  -->
                <a href="javascript:;" @click="showFaucet" class="btn-faucet" v-if="isLog && userInfo && userInfo.status.toString() ==='1'" :class="{'over':(loginSucc && ( loginSucc.invite_status !== '0' )) || (userInfo.invite_prize_chances === '0' && userInfo.tasks.length === 0 )}">
                </a>

                <!--拉新活动提示-->
                <div class="act-sign right" v-if="!isLog">
                    for free 0.001ETH
                </div>
            </div>


            <!-- jackpot -->
            <!--<div class="jackpot" :class="{hide: jackPotMsg === null}">-->
                <!--<div class="jackpot-box" >-->
                    <!--<p>{{ _('Congratulations to {0} hit {1},', (jackPotMsg && jackPotMsg.uid) || '', (jackPotMsg && jackPotMsg.expectid) || '') }}</p>-->
                    <!--<p class="jackpot-money">{{ _('Win {0}ETH', (jackPotMsg && jackPotMsg.prize) || '') }}</p>-->
                <!--</div>-->
                <!--<canvas id="canvas" ref="canvas"></canvas>-->
            <!--</div>-->
            <!--:class="{hide:jackPotMsg===null}"-->
            <div class="jackpot" v-show="jackPotMsg">
                <div class="jackpot-box">
                    <el-carousel :interval="5000" arrow="never" height="72px">
                        <el-carousel-item v-for="(item,index) in jackPotMsg" :key="index"  v-if="item">
                            <span>{{ _('Congratulations to {0} hit {1},', (item.uid) || '', (item.expectid) || '') }}</span>
                            <span class="jackpot-money">{{ _('Win {0}ETH', formateBalance (  item.prize ) || '') }}</span>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <canvas id="canvas" ref="canvas"></canvas>
            </div>

            <!--浮层 -->
            <!--第一次登陆 js_firstLogin    -->
            <section v-if="(loginSucc || showFirstLogin)&&isLog">
                <div class="tips-newAct tips-newAct2"
                     :class="{'hide': !( ( showFirstLogin )||(loginSucc.login_times == '1' && loginSucc.invite_status == '0' && userInfo && userInfo.status =='1'))}">
                    <div class="msg">
                        <p>
                            <lang>You have earned 0.001 free ETH already, go to bet to win more!</lang>
                        </p>
                        <a href="javascript:;" class="btn-luck" @click="hideFirstLoginAll"><lang>Try a luck</lang></a>
                        <div class="bottom">
                            <lang>Invite friends to earn more free ETH.</lang>
                            <a href="javascript:;" @click="showFaucet" class="bold js_invite"><lang>Earn now</lang></a>
                        </div>
                    </div>
                </div>
            </section>
            <!--活动结束或者已邀请两次  //	-1  未开始  1 已结束  -2 经费用完 -->
            <!--  user/info 里还有问题  已经邀请 -->
            <section v-if="loginSucc&&isLog&&showEndFaucet">
                <div class="tips-newAct"
                     :class="{'hide':!( loginSucc.invite_status != '0'||( loginSucc.invite_prize_chances == '0' && loginSucc.tasks.length == 0 ))}">
                    <div class="msg">
                        <p v-if="loginSucc.invite_status==='-1'">
                            <lang>Let's expect the upcoming activity!</lang>
                        </p>
                        <p v-else>
                            <lang>This activity is end and more bonus will coming soon!</lang>
                        </p>
                    </div>
                </div>
            </section>

            <!--成功邀请-->
            <section v-if="isLog && userInfo && userInfo.tasks.length > 0 && inviteTips">
                <div class="tips-newAct tips-newAct2">
                    <div class="msg">
                        <p>
                            Congrats! You have invited a friend sucessfully, <i class=bold>0.001 ETH</i> is awarding to you now.
                        </p>
                        <a href="javascript:;" @click="getFaucet" class="btn-receive"><lang>Get it !</lang></a>
                        <div class="bottom hide">
                            <lang>Invite friends and get more ETH~</lang>
                            <a href="javascript:;" @click="showFaucet" class="bold"><lang>Invite Now</lang></a>
                        </div>
                    </div>
                </div>
            </section>
            <!--拉新活动-->

        </div>
        <!-- 公用的模态框列表 -->
        <pop-list></pop-list>
    </div>
</template>

<script>
    import PopList from '~components/Pop-list'
    import Banner from '~components/banner'
    import {mTypes, aTypes} from '~/store/cs_page/cs_1105'
    import { formateBalance, formateCoinType, formateEmail } from '~common/util'
    import startCanvas from '~/common/canvas'
    export default {
        components: {PopList, Banner},
        data () {
            return {

                showDetail: false,
                showEndFaucet: false, // 控制 结束弹窗 tips
                showEndFaucetTime: null,
                showInviteSuccFlag: false,
                slideDown: false,
                languageVal: 'en',
                languageOptions: [{
                    value: 'en',
                    label: 'English'
                }, {
                    value: 'zhCn',
                    label: '中文简体'
                }, {
                    value: 'zhTw',
                    label: '中文繁体'
                }],
                currBalance: null, // 当前钱包,
                isShowLanguage: false,
                isShowMycount: false,
                isChooseCoin: false,
                isShowChoose: false,
                currTab: 'slot'
            }
        },
        watch: {},
        computed: {
            jackPotMsg () {
                return this.$store.state.cs_1105.jackPotMsg
            },
            inviteTips () {
                return this.$store.state.pop.inviteTips
            },
            showFirstLogin () {
                return this.$store.state.pop.showFirstLogin
            },
            loginSucc () {
                return this.$store.state.pop.loginSucc
            },
            isLog () {
                return this.$store.state.isLog
            },
            userInfo () {
                if (this.$store.state.userInfo && this.$store.state.userInfo.accounts) {
                    this.currBalance = this.$store.state.userInfo.accounts[0]
                }
                return this.$store.state.userInfo
            }
        },
        methods: {
            formateEmail,
            formateBalance,
            jump2Page (item = 'slot') {
                this.currTab = item
                switch (item) {
                case 'slot':
                    if (!~window.location.href.indexOf('tiger')) {
                        this.$router.push('/tiger')
                    }
                    ;break
                case 'lucky11':
                    if (!~window.location.href.indexOf('lucky11')) {
                        this.$router.push('/lucky11')
                    }
                    ;break
                case 'luckycoin':
                    if (!~window.location.href.indexOf('luckycoin')) {
                        this.$router.push('/luckycoin')
                    }
                    ;break
                }
            },
            changeAccounts (item) {
                if (item) {
                    this.currBalance = item
                }
            },
            handleLanguageChange (val) {
                this.$store.commit('setLanguage', val)
            },
            showUserMsg () {
                this.$store.dispatch('getUserInfo')
            },
            async getFaucet () {
                // 领取邀请奖励
                if (this.loginSucc && this.loginSucc.tasks.length > 0) {
                    this.showInviteSuccFlag = false
                    let taskDone = await this.$store.dispatch('getTaskDone', this.loginSucc.tasks[0].tid)
                    console.log(taskDone)
                    if (taskDone && taskDone.taskstatus.toString() === '1') {
                        document.querySelector('.js_addMoneyMove').className = 'add0001 js_addMoneyMove'
                        setTimeout(() => {
                            this.$store.commit('inviteTips', false)
                            this.showInviteSuccFlag = true
                            this.$store.dispatch('getUserInfo')
                            document.querySelector('.js_addMoneyMove').className = 'hide js_addMoneyMove'
                        }, 3000)
                    }
                }
            },
            hideFirstLoginAll () {
                // 关闭第一个弹窗
                this.$store.commit('showFirstLogin', false)
                this.$store.commit('setLoginSucc', null)
            },
            async showFaucet () {
                if (~document.getElementById('js_btn-faucet').className.indexOf('over')) {
                    this.showEndFaucet = true
                    clearTimeout(this.showEndFaucetTime)
                    this.showEndFaucetTime = setTimeout(() => {
                        this.showEndFaucet = false
                    }, 2000)
                } else {
                    let faucetMsg = await this.$store.dispatch('getFaucet')
                    /* 显示邀请 */
                    this.$store.commit('showFaucet')
                    // 关闭第一个弹窗 ?
                    this.$store.commit('showFirstLogin', false)
                    // this.$store.commit('setLoginSucc', null);
                }
            },
            showDetailFn () {
                this.showDetail = true
            },
            hideDetailFn () {
                this.showDetail = false
            },
            signOut () {
                /* 退出登录 */
                this.$store.dispatch('loginOut')
            },
            onLoginIn () {
                this.$store.commit('showLoginPop')
            }
        },
        filters: {
            formateCoinType
        },
        async mounted () {
            // 获取首次中奖信息
            if (~window.location.href.indexOf('/lucky')) {
                if (this.$refs.canvas) {
                    startCanvas(this.$refs.canvas)()
                }
                let prizeMsg = await this.$store.dispatch(aTypes.prizeMessage)
                if (prizeMsg && prizeMsg.data) {
                    if (prizeMsg.data.prize_list) {
                        this.$store.commit(mTypes.setjackPotMsg, prizeMsg.data.prize_list)
                    }
                    if (prizeMsg.data.num) {
                        setTimeout(() => {
                            this.$store.commit(mTypes.setjackPotMsg, null)
                        }, 5000 * parseFloat(prizeMsg.data.num))
                    }
                }
            }
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../styles/lib-mixins.less";
    @import "../styles/lib-media.less";
    .banner{
        display: none;
    }
    .head {
        position: relative;
        width: 100%;
        height: 70px;
        background: rgba(0,0,0,0.4);
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
            width: 137px;
            height: 32px;
            margin:19px 27px 0 0;
            img{
                display: block;
                height:100%;
            }
        }
        .choose-play{
            float: left;
            overflow: hidden;
            height:100%;
            display: table;
            a{
                padding:0 23px;
                font-size:16px;
                color: #fff;
                display: table-cell;
                vertical-align: middle;
                &.on,&:hover{
                    background: rgba(0,0,0,0.3);
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
                background: rgba(0,0,0,0.3);
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
            float: right;
            .transition();
            .countNum {
                position: relative;
                cursor: pointer;
                display: block;
                padding-right: 25px;
                line-height: 30px;
                font-size: 20px;
                padding-bottom: 6px;
                i {
                    display: block;
                    position: absolute;
                    width: 13px;
                    height: 8px;
                    right: 0;
                    top: 11px;
                    background-image: url(" ../assets/slice/arrow-down-fff.png");
                    transform-origin: 50%;
                    .transition();
                }
            }
            &.isShowMycount{
                i {
                    transform: rotate(180deg);
                }
                .mycount-detailed{
                    display: block;
                }
            }
        }
        .login {
            position: relative;
            float: right;
            margin: 20px 20px 0 0;
            text-align: center;
            .to-login{
                display: block;
                float: left;
                position: relative;
                overflow: hidden;
                height:28px;
                line-height:28px;
                padding:0 12px;
                border-radius: 6px;
                border:1px solid rgba(255,255,255,0.3);
                color: #fff;
                &:hover {
                    color: #6a89cc;
                }
            }
            .hadlogin {
                position: relative;
                float: left;
                margin-right:20px;
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
                padding:0 12px;
                color: #fff;
                &:hover {
                    color: #6a89cc;
                }
            }
            .btn-rechrage{
                border-top-left-radius: 6px;
                border-bottom-left-radius: 6px;
            }
            .btn-cash {
                border-top-right-radius: 6px;
                border-bottom-right-radius: 6px;
                border-left:1px solid rgba(255, 255, 255, 0.3);
            }
        }

    }

    .mycount-detailed {
        display: none;
        position: absolute;
        z-index: 10;
        right: 0;
        top: 36px;
        width: 207px;
        border-radius: 6px;
        overflow: hidden;
        background: #fff;
        text-align: right;
        -webkit-box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        .wallet-balance,
        .wallet-add {
            padding: 0 18px;
            p {
                height: 26px;
                line-height: 26px;
                overflow: hidden;
                font-size: 12px;
                color: #778ca3;
            }
        }
        .wallet-balance {
            margin: 16px 0 25px 0;
            li {
                height: 26px;
                line-height: 26px;
                overflow: hidden;
                font-size: 16px;
                font-weight: bold;
                color: #263648;
            }
            .unit {
                float: right;
            }
            .amount {
                margin-left: 15px;
                float: right;
            }
            .btn-refresh {
                display: block;
                float: right;
                margin: 8px 0 0 10px;
                background-image: url(" ../assets/slice/icon-refresh.png");
            }
        }
        .wallet-add {
            margin: 14px auto 26px;
            .items-add {
                line-height: 22px;
                .clearfix();
                span {
                    float: left;
                    color: #263648;
                }
                a {
                    float: right;
                    width: 120px;
                    color: #263648;
                    text-decoration: none;
                    .transition();
                    .text-overflow();
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
        .my-transaction,
        .account-center {
            display: block;
            width: 153px;
            height: 28px;
            overflow: hidden;
            margin: 10px auto 0;
            line-height: 28px;
            text-align: center;
            border: 1px solid #ced6e0;
            border-radius: 6px;
        }
        .log-out {
            display: block;
            height: 30px;
            overflow: hidden;
            margin-top: 30px;
            line-height: 30px;
            text-align: center;
            border-top: 1px solid #ced6e0;
            &:hover {
                background: #eef1f9;
            }
        }
    }

    .account-info {
        padding: 0 16px;
        color: #263648;
        .email {
            margin-top: 25px;
            line-height: 26px;
            font-size: 16px;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .uid {
            line-height: 26px;
            font-size: 12px;
        }
    }

    .choose-coin{
        position: relative;
        top:-7px;
        float: left;
        margin-right:13px;
        cursor: pointer;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        .transition();
        .coin{
            position: relative;
            display: block;
            line-height:24px;
            padding:10px 32px 12px 12px;
            color: #fd9644;
            &::before{
                content: '';
                display: block;
                margin-right:12px;
                float: left;
                background: url("../assets/slice/icon-wallet.png");
                width:22px;
                height:24px;
            }
            &::after{
                content: '';
                display: block;
                position: absolute;
                right:10px;
                top:18px;
                background: url("../assets/slice/arrow-down-fff.png");
                width:13px;
                height:8px;
            }
        }
        ul{
            display: none;
            position: absolute;
            left:0;
            top:46px;
            width:100%;
            overflow: hidden;
            box-sizing: border-box;
            background: #fff;
            color: #6a89cc;
            text-align: right;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            li{
                line-height:34px;
                border-top:1px solid #778ca3;
                padding: 0 32px 0 10px;
                i{
                    display: inline-block;
                    width:34px;
                }
                &:hover{
                    background: #eef1f9;
                }
            }
            li.on{
                font-weight:bold;
                color: #fd9644;
                &:before{
                    content: '';
                    display: block;
                    background: url(../assets/slice/icon-hook.png) no-repeat center;
                    background-size: cover;
                }
            }
        }
        &.isChooseCoin{
            background: #fff;
            .coin{
                &::after{
                    background: url("../assets/slice/arrow-down-778ca3.png");
                }
            }
            ul{
                display: block;
            }
        }

    }

    /*2180514 newAct 拉新活动*/
    .btn-faucet{
        display: block;
        display: none;
        /*等待*/
        float: right;
        margin:22.5px 40px 0 0;
        width:18px;
        height:25px;
        overflow: hidden;
        background: url("../assets/slice/icon-water.png") no-repeat center;
        &:hover{
            background: url("../assets/slice/icon-water-hover.png") no-repeat center;
        }
        &.over{
            background: url("../assets/slice/icon-water-gray.png") no-repeat center;
        }
        &.light{
            background: url("../assets/slice/icon-water-hign.png") no-repeat center;
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


    .act-sign{
        top: 25px;
        right: 160px;
        animation: actMove 5s 2s infinite;
    }
    @keyframes actMove {
        0%,12%,16%,20%,100%{
            transform: translateX(0);
        }
        10%{
            transform: translateX(5px);
        }
        14%,18%{
            transform: translateX(10px);
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
            width: 947px;
            height: 112px;
            margin:0 auto;
            background: url("../assets/slice/jackpot-bg.png") top center no-repeat;
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
            .act-sign{
                right:190px;
            }
        }
    }
    @media (max-width: @screen-desktop) {
        .head{
            .hadlogin{
                display: none;
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
                .to-login{
                    height:50px;
                    line-height:50px;
                    border:none;
                    border-right:1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 0;
                    padding:0 15px;
                }
            }
            .mycount{
                cursor: pointer;
                box-sizing: border-box;
                width:50px;
                height:50px;
                padding:17px 10px 0;
                border-left:1px solid rgba(51,26,64,0.3);
                border-right:1px solid rgba(51,26,64,0.3);
                &::before{
                    content: '';
                    display: block;
                    background: url("../assets/slice/icon-user.png");
                    background-size: cover;
                    width:19px;
                    height:19px;
                    filter: grayscale(1);
                    margin:0 auto;
                }
                .countNum{
                    display: none;
                }
                &:hover,&.isShowMycount{
                    &::before{
                        filter: grayscale(0);
                    }
                }
            }
            .language{
                width:50px;
                height:50px;
                padding-top: 15px;
                img{
                    width:22px;
                }
                .language-choose{
                    span{
                        height:16px;
                        line-height:16px;
                        margin:0;
                        font-size:8px;
                        opacity:0.6;
                    }
                }
                ul{
                    top:50px;
                    width:50px;
                    li{
                        width:50px;
                        height:50px;
                        padding-top:15px;
                    }
                    img{
                        width:22px;
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
        .act-sign{
            display: none;
        }
        .choose-coin{
            top:0;
            margin-right: 0;
            height:50px;
            .coin{
                padding:17px 15px 0;
                font-size:0;
                text-indent:-999999px;
                &:before{
                    margin-right: 0;
                    width:17px;
                    height:19px;
                    background-size: cover;
                    filter: grayscale(1);
                }
                &:after{
                    content: '';
                    display: none;
                }
            }
            &:hover,&.isChooseCoin{
                background: transparent;
                .coin{
                    &:before{
                        filter: grayscale(0);
                    }
                }
            }
            ul{
                top:44px;
                width:167px;
                z-index:3;
                right:0;
                left:auto;
                border-radius: 6px;
                li:first-child{
                    border-top:none;
                }
            }
        }
        .mycount-detailed{
            top:44px;
        }
        .choose-coin,.mycount{
            box-sizing: border-box;
            width:50px;
        }


    }
    @media (max-width: @screen-phone) { }




</style>

