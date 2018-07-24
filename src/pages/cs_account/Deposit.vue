<template>
    <div class="recharge">
        <h2>
            <lang>Deposit</lang>
        </h2>
        <a href="javascript:;" class="btn-Recharge">
            <lang>How to deposit?</lang>
        </a>
        <div class="item1 clearfix">
            <div class="fl150">
                <lang>Select Currency</lang>
            </div>
            <div class="fr-box">
                <el-select v-model="tranOptionVal" @change="handleStatusChange">
                    <el-option v-for="item in this.userInfo.accounts" :key="item.cointype" :label="formateCoinType(item.cointype)" :value="item">
                    </el-option>
                </el-select>
                <lang>Current balance</lang>
                <i class="bold">{{ formateBalance(currBalance.balance) }}</i> {{ formateCoinType(currBalance.cointype) }}
            </div>
        </div>
        <div class="item2 clearfix">
            <div class="fl150">
                <lang>copy Link</lang>
            </div>
            <div class="fr-box" v-if="currBalance">
                <div class="item2-1">
                    <a :href="'https://etherscan.io/address/'+currBalance.address" target="_blank" v-if="currBalance.cointype==='2001'" class="address">{{ currBalance.address }}</a>
                    <a :href="'https://www.blockchain.com/btc/address/'+currBalance.address" target="_blank" v-if="currBalance.cointype==='1001'"class="address">{{ currBalance.address }}</a>
                    <a href="javascript:;"
                       v-clipboard:copy="currBalance.address"
                       v-clipboard:success="copySucc"
                       v-clipboard:error="copyError"
                       class="btn-Copy ">
                        <lang>Copy</lang>
                    </a>
                </div>
                <p class="item2-2" v-if="currBalance.cointype==='2001'">
                    Tip: This address only supports ETH recharge, do not choose the wrong currency
                </p>
                <p class="item2-2" v-if="currBalance.cointype==='1001'">
                    Tip: This address only supports BTC recharge, do not choose the wrong currency
                </p>
                <div class="item2-3">
                    or scan to get the address
                </div>
                <img id="js_address_code_eth" alt=""
                     :src="'http://mobile.qq.com/qrcode?url='+ currBalance.address ">
                <!--<img src="@/assets/img/code.png" alt="" width="98" height="98">-->
            </div>
        </div>
        <div class="item3 clearfix">
            <div class="fl150">
                Notice
            </div>
            <div class="fr-box">
                <ul>
                    <li>
                        1. It is recommended that you use a regular and secure ETH wallet or trading platform. Recommended:
                        <div style="color:#6a89cc">
                            Mist, MyEtherWallet, MetaMask, IMToken, huobi.com, etc.
                        </div>
                    </li>
                    <li>
                        2. the general recharge needs 5 minutes to arrive, please be patient, if the recharge has not arrived, please contact us at support@coinslot.com
                        <p>
                            · Do not recharge any non-BTC assets to the above address, otherwise the assets will not be recovered.
                        </p>
                        <p>
                            · After you recharge to the above address, you need to confirm the entire network node. After 1 network. confirmation, you will receive the account. After 6 network confirmations, you can withdraw the currency.
                        </p>
                        <p>
                            · The recommended minimum recharge amount is 0.0001 BTC. The recharge value less than the minimum amount may not be successfully received and cannot be returned.
                        </p>
                        <p>
                            · Your recharge address will not change frequently, you can repeat the recharge; if there is any change, we will try to notify you by website announcement or email.
                        </p>
                        <p>
                            · Be sure to check the security of your computer and browser to prevent the information from being tam pered with or leaked.
                        </p>
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
<style scoped lang="less" rel="stylesheet/less">
@import "../../styles/lib-mixins.less";

//  RECHARGE
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
        margin-bottom: 30px;
        line-height: 25px;
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
</style>
