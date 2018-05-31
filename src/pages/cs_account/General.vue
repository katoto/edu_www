<template>
    <div class="information">
        <a href="javascript:;" class="btn-logout js_log-out">
            Sign Out
        </a>
        <span class="small-explain ">Account</span>
        <p class="my-account "><span class="js_currEmail">38048298</span>
            <span class="js_unverifyBox">
                <a href="javascript:;" class="js_toVerify">go to verified</a>
            </span>
            <span class="js_verifyBox" style="display: none">
                <a href="javascript:;" style="cursor: default">Verified</a>
            </span>
        </p>
        <span class="small-explain">Wallet Balance</span>
        <ul class="coin-detail">
            <li>
                <div class="lf130">
                    <span class="coin-name">ETH</span>
                    <span class="coin-num bold js_withDrawal_eth">000.00</span>
                </div>
                <section class="hide">
                    <span id="js_copyEth" class="coin-add js_walletaAddress">
                        <a href="" class="address"></a>
                    </span>
                    <a href="javascript:;" data-clipboard-target="#js_copyEth"
                        class="btn-copy js_btn-copy">Copy</a>
                </section>
            </li>
            <li class="hide">
                <div class="lf130">
                    <span class="coin-name">BTC</span>
                    <span class="coin-num bold">0.00000</span>
                </div>
                <span id="js_copyBtc" class="coin-add"></span>
                <a href="javascript:;" data-clipboard-target="#js_copyBtc"
                    class="btn-copy js_btn-copy">Copy</a>
            </li>
        </ul>
        <span class="small-explain">Password</span>
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
            <a href="javascript:;" class="btn-changepsw js_bet-changepsw">Change Password</a>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {}
        },
        watch: {},
        methods: {},
        computed: {},
        components: {},
        mounted(){

        }
    }
</script>
<style scoped lang="less">
    @import "../../styles/lib-mixins.less";
    .coin-detail{
        li{
            height:40px;
            line-height:40px;
            overflow: hidden;
        }
        span{
            float: left;
            display: block;
        }
        .coin-name{
            float: left;
        }
        .coin-num{
            float: right;
            max-width:120px !important;
            color: #ff7f50;
            .text-overflow();
        }
        .coin-add{
           a{
               max-width:640px !important;
               margin-right:10px;
               color: #263648;
               .transition();
               .text-overflow();
               &:hover{
                   text-decoration: underline;
               }
           }
        }
        .btn-copy{
            margin-left:10px;
            font-size:14px;
        }
    }
    .information{
        position: relative;
        padding-bottom:13px;
        .btn-logout{
            position: absolute;
            right:0;
            top:0;
            display: block;
            width:100px;
            height:30px;
            overflow: hidden;
            text-align: center;
            line-height:30px;
            background: #eef1f9;
            border-radius: 6px;
            font-size:14px;
            color: #778ca3;
            .transition();
            &:hover{
                color: #263648;
            }
        }
        .coin-detail{
            margin:6px 0 31px 0;
        }
        .my-account{
            margin-bottom: 26px;
            line-height:52px;
            a{
                margin-left:10px;
                font-size:12px;
            }
            .js_verifyBox a{
                color: #778ca3;
            }
        }
        .psw-set{
            height:45px;
            line-height: 45px;
            .psw-x{
                i{
                    display: block;
                    float: left;
                    line-height:45px;
                }
            }
            .psw-grade{
                float: left;
                margin-right:24px;
                font-size:14px;
            }
            .btn-changepsw{
                display: block;
                float: left;
                line-height:45px;
                font-size:14px;
            }
        }
    }
    .lf130{
        width:130px;
        margin-right:35px;
        float: left;
        overflow: hidden;
    }
    .fl210{
        position: relative;
        float: left;
        width:210px;
        height:50px;
        overflow: hidden;
    }
    .small-explain{
        display: block;
        line-height:21px;
        font-size:12px;
        color: #778ca3;
    }
     .btn-logout{
            position: absolute;
            right:0;
            top:0;
            display: block;
            width:100px;
            height:30px;
            overflow: hidden;
            text-align: center;
            line-height:30px;
            background: #eef1f9;
            border-radius: 6px;
            font-size:14px;
            color: #778ca3;
            .transition();
            &:hover{
                color: #263648;
            }
        }
        .coin-detail{
            margin:6px 0 31px 0;
        }
        .my-account{
            margin-bottom: 26px;
            line-height:52px;
            a{
                margin-left:10px;
                font-size:12px;
            }
            .js_verifyBox a{
                color: #778ca3;
            }
        }
        .psw-set{
            height:45px;
            line-height: 45px;
            .psw-x{
                i{
                    display: block;
                    float: left;
                    line-height:45px;
                }
            }
            .psw-grade{
                float: left;
                margin-right:24px;
                font-size:14px;
            }
            .btn-changepsw{
                display: block;
                float: left;
                line-height:45px;
                font-size:14px;
            }
        }
</style>
