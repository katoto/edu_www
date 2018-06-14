<template>
    <div class="recharge">
        <h2>Deposit</h2>
        <span class="small-explain hide">Wallet Balance</span>
        <ul class="coin-detail hide">
            <li>
                <div class="lf130">
                    <span class="coin-name">ETH</span>
                    <span class="coin-num bold js_withDrawal_eth"></span>
                </div>
                <span class="coin-add js_walletaAddress_noJump" id="js_copyWallBalance"></span>
                <a href="javascript:;" data-clipboard-target="#js_copyWallBalance"
                   class="btn-copy js_btn-copy">Copy</a>
            </li>
            <li class="hide">
                <div class="lf130">
                    <span class="coin-name">ETH</span>
                    <span class="coin-num bold">0.00000</span>
                </div>
                <span class="coin-add"></span>
                <a href="javascript:;" class="btn-copy">Copy</a>
            </li>
        </ul>
        <a href="javascript:;" class="btn-Recharge">How to deposit?</a>
        <div class="recharge-box">
            <div class="recharge-item recharge-item1" v-if="userInfo">
                <h3>1.Copy the Ethereum wallet address (only supports ETH)</h3>
                <div class="js_verifyBox" v-if="userInfo && userInfo.status ==='1'">
                    <template v-for="item in userInfo.accounts">
                        <span class="recharge-add">
                            {{ item.address }}
                        </span>
                        <a href="javascript:;"
                           v-clipboard:copy="item.address"
                           v-clipboard:success="copySucc"
                           v-clipboard:error="copyError"
                           class="copy js_btn-copy">Copy</a>
                    <p>or scan to get the address</p>
                    <div class="img-box">
                        <div class="img-box2">
                        <img id="js_address_code_eth" alt=""
                            :src="'http://mobile.qq.com/qrcode?url='+ item.address ">
                        </div>
                    </div>
                    </template>
                </div>
                <div v-else class="js_unverifyBox">
                    <!-- todo 验证 -->
                    <p>Account has not been verified，and the block chain account has not been generated.
                        <a href="javascript:;" class="js_toVerify">go to verified</a></p>
                </div>
            </div>
            <div class="recharge-item recharge-item2">
                <h3>2. Transfer to the wallet address<br>In order to transfer successfully, you can use an Ethereum
                    wallet or exchange platforms, and always make sure your account is secure. Coinslot doesn't have any
                    partnership with any of these applications or platforms. Other users recommend: Mist, MyEtherWallet,
                    MetaMask, imToken, huobi.com and so forth.</h3>
                <a href="javascript:;" class="reco-soft js_reco-soft hide">Recommended software</a>
            </div>
            <div class="recharge-item recharge-item3">
                <h3>3. Confirm your balance<br>Usually,it takes about 5 minutes for transaction block to confirm your
                    deposit.Don't forget to refresh and check your balance.</h3>
                <img class="transfer" src="../../assets/img/transfer.png" alt="transfer" width="340" height="40">
                <p class="hide">After the deposit is successful, your balance will be updated, and the order details can
                    be found in the details of the fund,<br>or entered in:<a href=" https://etherscan.io"
                                                                             target="_blank"></a></p>
            </div>
        </div>
    </div>
</template>

<script>
	import {Message} from 'element-ui'
	export default {
		data(){
			return {}
		},
		watch: {},
		methods: {
			copySucc(){
				Message({
					message: 'Copied to clipboard',
					type: 'success'
				});
            },
			copyError(){
				Message({
					message: 'Failed to copy, please retry',
					type: 'success'
				});
            }
        },
		computed: {
			isLog(){
				return this.$store.state.isLog
			},
			userInfo(){
				return this.$store.state.userInfo
			}
		},
		components: {},
		mounted(){
			if (!this.isLog) {
				this.$router.push('/home')
			}
		},
		filters: {
			formateCoinType: (type = '2001') => {
                return 'a'+type
			},
        }
	}
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../styles/lib-mixins.less";

    //  RECHARGE
    .recharge {
        padding-bottom: 29px;
        h2 {
            margin-bottom: 38px;
            line-height: 30px;
            font-size: 24px;
            color: #263648;
            text-transform: capitalize;
        }
        .coin-detail {
            margin: 4px 0 43px 0;
        }
        .coin-add {
            a {
                max-width: 640px !important;
                margin-right: 10px;
                color: #263648;
                text-decoration: underline;
                .text-overflow();
                &:hover {
                    text-decoration: none;
                }
            }
        }
        .btn-Recharge, .constructions {
            line-height: 16px;
            font-size: 12px;
            color: #778ca3;
        }
    }

    .recharge-box {
        padding-left: 17px;
        margin-top: 10px;
        .recharge-item {
            h3 {
                text-indent: -17px;
                font-size: 14px;
                line-height: 20px;
            }
            .recharge-explain {
                margin-top: 17px;
            }
            .reco-soft {
                display: table;
                padding: 0 15px;
                margin: 17px 0 38px 0;
                line-height: 28px;
                border: 1px solid #ced6e0;
                border-radius: 6px;
                font-size: 14px;
            }
            .transfer {
                margin: 15px 0 16px 0;
            }
        }
        .recharge-item1 {
            position: relative;
            margin-bottom: 20px;
            p {
                clear: both;
                font-size: 14px;
                color: #263648;
                line-height: 24px;
                margin-bottom: 12px;
            }
            .recharge-add {
                float: left;
                font-size: 20px;
                line-height: 48px;
            }
            .copy {
                float: left;
                margin-left: 20px;
                font-size: 14px;
                line-height: 48px;
            }
            .img-box {
                width: 98px;
                height: 98px;
                overflow: hidden;
            }
            .img-box2 {
                position: relative;
                width: 145px;
                height: 145px;
                overflow: hidden;
                transform: scale(0.6758);
                transform-origin: left top;
            }
            #js_address_code_eth {
                position: absolute;
                left: -27px;
                top: -27px;
                clip: rect(27px 172px 172px 27px);
            }
        }
        .recharge-item2 {
            margin-bottom: 20px;
        }
        .recharge-item3 {
            p {
                line-height: 20px;
                font-size: 12px;
                color: #778ca3;
            }
        }
    }
</style>
