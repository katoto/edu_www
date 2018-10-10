<template>
    <div style="position: relative">
        <div class="information visible-lg">
            <a href="javascript:;" @click="signOut" class="btn-logout">
               <lang>Log Out</lang>
            </a>
            <span class="small-explain">
                <lang>Account</lang>
            </span>
            <template v-if="userInfo">
                <p class="my-account "><span class="js_currEmail">{{ userInfo.email }}</span>
                    <span class="js_unverifyBox">
                    <a href="javascript:;" v-if="userInfo.status==='1'" style="cursor: default">
                        <lang>Verified</lang>
                    </a>
                    <a href="javascript:;" v-else @click="goVerify">
                        <lang>Verify</lang>
                    </a>
                    
                </span>
                </p>
                <span class="small-explain">
                    <lang>Wallet Balance</lang>
                </span>
                <ul class="coin-detail" v-if="userInfo.accounts">
                    <li v-for="(account, index) in getAccounts()" :key="index">
                        <div class="lf130">
                            <span class="coin-name">{{ account.cointype | formateCoinType }}</span>
                            <span class="coin-num bold">{{ formateBalance(account.balance, account.cointype) }}</span>
                        </div>
                    </li>
                    <!--<section class="hide">-->
                    <!--<span id="js_copyEth" class="coin-add js_walletaAddress">-->
                    <!--<a href="" class="address"></a>-->
                    <!--</span>-->
                    <!--<a href="javascript:;" data-clipboard-target="#js_copyEth"-->
                    <!--class="btn-copy js_btn-copy">Copy</a>-->
                    <!--</section>-->
                </ul>
            </template>
            <span class="small-explain">
                <lang>Password</lang>
            </span>
            <div class="psw-set">
                <div class="lf130 psw-x">
                    <i>*</i>
                    <i>*</i>
                    <i>*</i>
                    <i>*</i>
                    <i>*</i>
                </div>
                <p class="psw-grade hide">
                    Security Level&nbsp;&nbsp;<span class="bold">Middle</span>
                </p>
                <a href="javascript:;" class="btn-changepsw" @click="onChange" v-lang="'Change&ensp;Password'">
                </a>
            </div>
        </div>
        <div class="h5-information hidden-lg">
            <span class="small-explain">
                <lang>Account</lang>
            </span>
            <template v-if="userInfo">
                <p class="my-account "><span class="js_currEmail">{{ userInfo.email }}</span>
                    <span class="js_unverifyBox">
                    <a href="javascript:;" v-if="userInfo.status==='0'" @click="goVerify">
                        <lang>Verify</lang>
                    </a>
                    <a href="javascript:;" v-if="userInfo.status==='1'" >
                        <lang>Verified</lang>
                    </a>
                </span>
                </p>
                <span class="small-explain">
                    <lang>Wallet Balance</lang>
                </span>
                <ul class="coin-detail" v-if="userInfo.accounts">
                    <li v-for="(account, index) in userInfo.accounts" :key="index">
                        <p class="coin-name">{{ account.cointype | formateCoinType }}</p>
                        <p class="coin-num bold">{{ formateBalance(account.balance, account.cointype) }}</p>
                    </li>
                </ul>
            </template>
            <span class="small-explain">
                <lang>Password</lang>
            </span>
            <div class="psw-set">
                <div class="psw-x fl">
                    <i>*</i>
                    <i>*</i>
                    <i>*</i>
                    <i>*</i>
                    <i>*</i>
                </div>
                <a href="javascript:;" class="btn-changepsw fl" @click="onChange" v-lang="'Change&ensp;Password'">
                </a>
            </div>
            <a href="javascript:;" @click="signOut" class="btn-logout">
                <lang>Sign Out</lang>
            </a>
        </div>
    </div>
</template>

<script>
    import {formateCoinType, formateBalance} from '~common/util'

    export default {
        data () {
            return {}
        },
        watch: {},
        methods: {
            formateBalance,
            getAccounts () {
            // CC 排在最后
                let accounts = [...this.userInfo.accounts]
                return accounts.sort(account => {
                    return account.cointype === '2000' ? '1' : '-1'
                })
            },
            goVerify () {
                /* 应该是一个新的 验证邮箱的界面 */
                this.$store.commit('showNoVerify')
            },
            signOut () {
                /* 退出登录 */
                this.$store.dispatch('loginOut')

                this.$router.push('/lucky')
            },
            onChange () {
                this.$store.commit('setResetObj', {
                    email: null,
                    sign: null,
                    showReset: false
                })
                this.$store.commit('showResetPwd')
            }
        },
        computed: {
            isLog () {
                return this.$store.state.isLog
            },
            userInfo () {
                return this.$store.state.userInfo
            }
        },
        mounted () {
            if (!this.isLog) {
                this.$router.push('/home')
            }
        },
        filters: {
            formateCoinType
        }
    }
</script>
<style scoped lang="less" type="text/less">
    @import "../../styles/lib-mixins.less";
    .information{
        .coin-detail {
            li {
                height: 40px;
                line-height: 40px;
                overflow: hidden;
            }
            span {
                float: left;
                display: block;
            }
            .coin-name {
                float: left;
            }
            .coin-num {
                float: right;
                max-width: 120px !important;
                color: #ff7f50;
                .text-overflow();
            }
            .coin-add {
                a {
                    max-width: 640px !important;
                    margin-right: 10px;
                    color: #263648;
                    .transition();
                    .text-overflow();
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
            .btn-copy {
                margin-left: 10px;
                font-size: 14px;
            }
        }

        .information {
            position: relative;
            padding-bottom: 13px;
            .btn-logout {
                position: absolute;
                right: 0;
                top: 0;
                display: block;
                width: 100px;
                height: 30px;
                overflow: hidden;
                text-align: center;
                line-height: 30px;
                background: #eef1f9;
                border-radius: 6px;
                font-size: 14px;
                color: #778ca3;
                .transition();
                &:hover {
                    color: #263648;
                }
            }
            .coin-detail {
                margin: 6px 0 31px 0;
            }
            .my-account {
                margin-bottom: 26px;
                line-height: 52px;
                a {
                    margin-left: 10px;
                    font-size: 12px;
                }
                .js_verifyBox a {
                    color: #778ca3;
                }
            }
            .psw-set {
                height: 45px;
                line-height: 45px;
                .psw-x {
                    i {
                        display: block;
                        float: left;
                        line-height: 45px;
                    }
                }
                .psw-grade {
                    float: left;
                    margin-right: 24px;
                    font-size: 14px;
                }
                .btn-changepsw {
                    display: block;
                    float: left;
                    line-height: 45px;
                    font-size: 14px;
                }
            }
        }

        .lf130 {
            width: 130px;
            margin-right: 35px;
            float: left;
            overflow: hidden;
        }

        .fl210 {
            position: relative;
            float: left;
            width: 210px;
            height: 50px;
            overflow: hidden;
        }

        .small-explain {
            display: block;
            line-height: 21px;
            font-size: 12px;
            color: #778ca3;
        }

        .btn-logout {
            position: absolute;
            right: 0;
            top: 0;
            display: block;
            width: 100px;
            height: 30px;
            overflow: hidden;
            text-align: center;
            line-height: 30px;
            background: #eef1f9;
            border-radius: 6px;
            font-size: 14px;
            color: #778ca3;
            .transition();
            &:hover {
                color: #263648;
            }
        }

        .coin-detail {
            margin: 6px 0 31px 0;
        }

        .my-account {
            margin-bottom: 26px;
            line-height: 52px;
            a {
                margin-left: 10px;
                font-size: 12px;
            }
            .js_verifyBox a {
                color: #778ca3;
            }
        }

        .psw-set {
            height: 45px;
            line-height: 45px;
            .psw-x {
                i {
                    display: block;
                    float: left;
                    line-height: 45px;
                }
            }
            .psw-grade {
                float: left;
                margin-right: 24px;
                font-size: 14px;
            }
            .btn-changepsw {
                display: block;
                float: left;
                line-height: 45px;
                font-size: 14px;
            }
        }
    }
    .h5-information{
        padding:12px percentage(30/710) 25px;
        .small-explain{
            display: block;
            line-height: 23px;
            font-size: 14px;
            color: #778ca3;
        }
        .my-account{
            margin-bottom: 30px;
            line-height: 50/2px;
            font-size: 36/2px;
            a{
                margin-left: 40px;
                font-size: 28/2px;
            }
        }
        .coin-detail{
            margin: 4px 0 30px 0;
            li{
                line-height: 20px;
                font-size: 18px;
            }
            li+li{
                margin-top: 20px;
            }
            .coin-num{
                color: #ff7f50;
            }
        }
        .psw-set{
            line-height: 51px;
            overflow: hidden;
            .psw-x{
                margin-right: percentage(220/710);
                font-size: 14px;
            }
            .btn-changepsw{
                display: block;
                font-size: 14px;
            }
        }
        .btn-logout{
            display: block;
            margin-top: 20px;
            border-radius: 6px;
            background: #eef1f9;
            text-align: center;
            line-height: 45px;
            font-size: 16px;
            color: #778ca3;
            transition: all 0.2s;
        }
    }
</style>
