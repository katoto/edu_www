<template>
    <div>
        <div class="recharge visible-lg">
            <h2>
                 <lang>Top Up</lang>
            </h2>
            <a href="javascript:;" class="btn-Recharge hide">
                <lang>How to deposit?</lang>
            </a>
            <div class="item1 clearfix">
                <div class="fl150">
                 <lang>Select Coin</lang>
                </div>
                <div class="fr-box">
                    <el-select v-model="tranOptionVal" @change="handleStatusChange">
                        <el-option v-for="item in this.userInfo.accounts" :key="item.cointype" :label="formateCoinType(item.cointype)" :value="item">
                        </el-option>
                    </el-select>
                    <lang>Balance</lang>
                    <i class="bold">{{ formateBalance(currBalance.balance) }}</i> {{ formateCoinType(currBalance.cointype) }}
                </div>
                <p class="item1tips">
                    {{$lang.risk.a27}}
                </p>
            </div>
            <div class="item2 clearfix">
                <div class="fl150">
                    <lang>Copy Address</lang>
                </div>
                <div class="fr-box" v-if="currBalance">
                    <div class="item2-1">
                        <a :href="'https://etherscan.io/address/'+currBalance.address" target="_blank" v-if="currBalance.cointype === '2001' || currBalance.cointype === '2000'" class="address">{{ currBalance.address }}</a>
                        <a :href="'https://www.blockchain.com/btc/address/'+currBalance.address" target="_blank" v-if="currBalance.cointype === '1001'" class="address">{{ currBalance.address }}</a>
                        <a href="javascript:;"
                           v-clipboard:copy="currBalance.address"
                           v-clipboard:success="copySucc"
                           v-clipboard:error="copyError"
                           class="btn-Copy ">
                            <lang>Copy</lang>
                        </a>
                    </div>

                    <p class="item2-2" v-if="currBalance.cointype === '2001' || currBalance.cointype === '2000'">
                        <lang>Tips: This address only supports ETH top-up, do not choose another kind of coins</lang>
                    </p>
                    <p class="item2-2" v-if="currBalance.cointype === '1001'">
                        <lang>Tips: This address only supports BTC top-up, do not choose another kind of coins</lang>
                    </p>
                    <div class="item2-3">
                        <lang>or scan to get the address</lang>
                    </div>
                    <img v-if="currBalance.cointype === '1001'" alt="" :src="'http://mobile.qq.com/qrcode?url=bitcoin:'+ currBalance.address ">
                    <img v-if="currBalance.cointype === '2001' || currBalance.cointype === '2000'" alt="" :src="'http://mobile.qq.com/qrcode?url= '+ currBalance.address ">
                    <!--<img src="@/assets/img/code.png" alt="" width="98" height="98">-->
                </div>
            </div>
            <div class="item3 clearfix">
                <div class="fl150">
                    <lang>Kind Reminder</lang>
                </div>
                <div class="fr-box">
                    <ul>
                        <li>
                            1. <lang>Legal cryptocurrency wallets or trading platforms with high security are highly recommended.</lang>
                        </li>
                        <li v-if="currBalance.cointype === '1001'">
                            2. <lang>This address is only for BTC transfer, any other kinds of cryptocurrency transfer may lead to the loss of money.</lang>
                        </li>
                        <li v-if="currBalance.cointype === '2001' || currBalance.cointype === '2000'">
                            2. <lang>This address is only for ETH transfer, any other kinds of cryptocurrency transfer may lead to the loss of money.</lang>
                        </li>
                        <li v-if="currBalance.cointype === '1001'">
                            3. <lang>Minimum top-up：0.0001 BTC. Top-up less than the minimum amount may fail and it cannot be returned.</lang>
                        </li>
                        <li v-if="currBalance.cointype === '2001' || currBalance.cointype === '2000'">
                            3. <lang>Minimum top-up：0.001 ETH. Top-up less than the minimum amount may fail and it cannot be returned.</lang>
                        </li>
                        <li>
                            4. <lang>Your wallet address may be changed sometimes, and Coinsprize team will inform you through notification or email as soon as possible.</lang>
                        </li>
                        <li>
                            5. <lang>Make sure that your computer and browser are under the secure environment to prevent modification or disclosure of information.</lang>
                        </li>
                        <li>
                            6. <lang>Top-up needs to be confirmed by network node. Transfer will be successful after one confirmation, and you can withdraw the balance after six confirmations.</lang>
                        </li>
                        <li>
                            7. <lang>Usually, it takes about 5min to confirm your top-up. If your top-up fails, please contact us through email support@Coinsprize.com.</lang>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="h5-recharge hidden-lg">
            <div class="item1 ">
                <div class="tips">
                    <lang>Select Coin</lang>
                </div>
                <el-select v-model="tranOptionVal" @change="handleStatusChange">
                    <el-option v-for="item in this.userInfo.accounts" :key="item.cointype" :label="formateCoinType(item.cointype)" :value="item">
                    </el-option>
                </el-select>
                <p class="">
                    <lang>Balance</lang>
                    <i class="bold">{{ formateBalance(currBalance.balance) }} </i>
                    <i>{{ formateCoinType(currBalance.cointype) }}</i>
                </p>
                <p class="item1tips">
                    {{$lang.risk.a27}}
                </p>
            </div>
            <div class="item2 ">
                <div class="tips">
                    <lang>Select Coin</lang>
                </div>
                <template v-if="currBalance">
                    <p class="item2-2" v-if="currBalance.cointype === '2001' || currBalance.cointype === '2000'">
                        <lang>Tips: This address only supports ETH top-up, do not choose another kind of coins</lang>
                    </p>
                    <p class="item2-2" v-if="currBalance.cointype === '1001'">
                        <lang>Tips: This address only supports BTC top-up, do not choose another kind of coins</lang>
                    </p>
                    <div class="item2-1">
                        <a :href="'https://etherscan.io/address/'+currBalance.address" target="_blank" v-if="currBalance.cointype === '2001' || currBalance.cointype === '2000'" class="address">{{ currBalance.address }}</a>
                        <a :href="'https://www.blockchain.com/btc/address/'+currBalance.address" target="_blank" v-if="currBalance.cointype === '1001'" class="address">{{ currBalance.address }}</a>
                    </div>
                    <a href="javascript:;"
                       v-clipboard:copy="currBalance.address"
                       v-clipboard:success="copySucc"
                       v-clipboard:error="copyError"
                       class="btn-Copy ">
                        <lang>Copy</lang>
                    </a>
                    <div class="item2-3">
                        <lang>or scan to get the address</lang>
                    </div>
                    <img v-if="currBalance.cointype === '1001'" alt="" :src="'http://mobile.qq.com/qrcode?url=bitcoin:'+ currBalance.address ">
                    <img v-if="currBalance.cointype === '2001' || currBalance.cointype === '2000'" alt="" :src="'http://mobile.qq.com/qrcode?url= '+ currBalance.address ">
                    <!--<img src="@/assets/img/code.png" alt="" width="98" height="98">-->
                </template>
            </div>
            <div class="item3 ">
                <div class="tips">
                    <lang>Kind Reminder</lang>
                </div>
                <ul>
                        <li>
                            1. <lang>Legal cryptocurrency wallets or trading platforms with high security are highly recommended.</lang>
                        </li>
                        <li v-if="currBalance.cointype === '1001'">
                            2. <lang>This address is only for BTC transfer, any other kinds of cryptocurrency transfer may lead to the loss of money.</lang>
                        </li>
                        <li v-if="currBalance.cointype === '2001' || currBalance.cointype === '2000'">
                            2. <lang>This address is only for ETH transfer, any other kinds of cryptocurrency transfer may lead to the loss of money.</lang>
                        </li>
                        <li v-if="currBalance.cointype === '1001'">
                            3. <lang>Minimum top-up：0.0001BTC. Top-up less than the minimum amount may fail and it cannot be returned.</lang>
                        </li>
                        <li v-if="currBalance.cointype === '2001' || currBalance.cointype === '2000'">
                            3. <lang>Minimum top-up：0.001ETH. Top-up less than the minimum amount may fail and it cannot be returned.</lang>
                        </li>
                        <li>
                            4. <lang>Your wallet address may be changed sometimes, and Coinsprize team will inform you through notification or email as soon as possible.</lang>
                        </li>
                        <li>
                            5. <lang>Make sure that your computer and browser are under the secure environment to prevent modification or disclosure of information.</lang>
                        </li>
                        <li>
                            6. <lang>Top-up needs to be confirmed by network node. Transfer will be successful after one confirmation, and you can withdraw the balance after six confirmations.</lang>
                        </li>
                        <li>
                            7. <lang>Usually, it takes about 5min to confirm your top-up. If your top-up fails, please contact us through email support@Coinsprize.com.</lang>
                        </li>
                    </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { copySucc, copyError, formateBalance, formateCoinType } from '~common/util'

export default {
    data () {
        return {
            tranOptionVal: null
        }
    },
    watch: {
        currBalance (val) {
            this.tranOptionVal = this.formateCoinType(val.cointype)
        }
    },
    methods: {
        formateBalance,
        formateCoinType,
        handleStatusChange (val) {
            if (val) {
                this.tranOptionVal = this.formateCoinType(val.cointype)
                this.$store.commit('setCurrBalance', val)
            }
        },
        goVerify () {
            /* 应该是一个新的 验证邮箱的界面 */
            this.$store.commit('showNoVerify')
        },
        copySucc,
        copyError
    },
    computed: {
        isLog () {
            return this.$store.state.isLog
        },
        userInfo () {
            return this.$store.state.userInfo
        },
        currBalance () {
            return this.$store.state.currBalance
        }
    },
    mounted () {
        if (!this.isLog) {
            this.$router.push('/home')
        }
        this.tranOptionVal = this.formateCoinType(this.currBalance.cointype)
    },
    filters: {
        formateCoinType: (type = '2001') => {
            return 'a' + type
        }
    }
}
</script>
<style scoped lang="less" type="text/less">
    @import "../../styles/lib-mixins.less";
    .recharge {
    position: relative;
    padding-bottom: 50px;
    font-size: 14px;
    h2 {
        margin-bottom: 38px;
        line-height: 30px;
        font-size: 26px;
        color: #263648;
        text-transform: capitalize;
    }
    .btn-Recharge {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 14px;
    }
    .fl150 {
        float: left;
        box-sizing: border-box;
        width: 150px;
        padding-right: 45px;
        text-align: right;
        font-size: 14px;
    }
    .fr-box {
        overflow: hidden;
    }
    .item1 {
        line-height: 25px;
        .item1tips{
            height: 30px;
            line-height: 28px;
            text-indent: 150px;
            font-weight: bold;
            color: #36c57a;
        }
    }
    .item2 {
        .fl150 {
            height: 30px;
            line-height: 30px;
        }
        .item2-1 {
            height: 30px;
            line-height: 30px;
            overflow: hidden;
            .address {
                float: left;
            }
            .btn-Copy {
                margin-left: 7px;
                float: left;
                display: block;
                width: 60px;
                height: 30px;
                overflow: hidden;
                border-radius: 6px;
                line-height: 30px;
                text-align: center;
                background: #6a89cc;
                color: #fff;
                transition: all 0.2s;
                &:hover {
                    filter: brightness(1.1);
                }
            }
        }
        .item2-2 {
            line-height: 30px;
            font-size: 12px;
            color: #778ca3;
        }
        .item2-3 {
            margin-top: 13px;
            line-height: 27px;
        }
    }
    .item3 {
        margin-top: 29px;
        line-height: 16px;
        li {
            padding-left: 1em;
            text-indent: -1em;
        }
        li + li {
            margin-top: 16px;
        }
        li p {
            margin-top: 16px;
            text-indent: -0.5em;
            padding-left: 1em;
        }
    }
}
    .h5-recharge{
        padding:20px percentage(30/710) 0px;
        .item1{
            position: relative;
            padding-bottom: 18px;
            border-bottom: 1px solid #f2f2f2;
            .tips{
                position: absolute;
                left: 0;
                top: 0;
                line-height: 25px;
                font-size: 12px;
            }
            .el-select{
                display: table;
                float: none;
                margin: 0 auto;
            }
            p{
                text-align: center;
                line-height: 40/2px;
                font-size: 28/2px;
                color: #778ca3;
                i{
                    color: #263648;
                }
            }
            .item1tips{
                font-size: 12px;
                text-align: center;
                font-weight: bold;
                color: #36c57a;
            }
        }
        .item2{
            padding-top: 37/2px;
            border-bottom: 1px solid #f2f2f2;
            .tips{
                line-height: 56/2px;
                font-size: 28/2px;
                color: #263648;
            }
            .item2-1{
                a{
                    display: block;
                    line-height: 51px;
                    font-size: 16px;
                    text-decoration: underline;
                    .text-overflow();
                }
            }
            .item2-2{
                line-height: 40/2px;
                font-size: 28/2px;
                color: #778ca3;
            }
            .btn-Copy{
                display: block;
                width: percentage(234/710);
                overflow: hidden;
                text-align: center;
                line-height: 55/2px;
                border-radius: 6px;
                background: #6a89cc;
                margin: 0 auto;
                color: #fff;
                font-size: 16px;
            }
            .item2-3{
                margin-top: 12px;
                line-height: 76/2px;
                color: #778ca3;
                font-size: 28/2px;
            }
            img{
                display: block;
                width: 232/2px;
                height: 232/2px;
                margin: 0 auto;
            }
        }
        .item3{
            padding: 30/2px 0 58px/2 0;
            font-size: 28/2px;
            .tips{
                line-height: 58/22;
            }
            ul{
                line-height: 33/22;
                color: #778ca3;
            }
        }
    }
</style>
