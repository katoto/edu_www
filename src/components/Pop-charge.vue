<template>
    <!-- 余额不足弹出 -->
    <div class="pop pop-recharge" :class="{'show':showRecharge}">
        <a @click="showRecharge=false" href="javascript:;" class="recharge-close"></a>
        <div class="title">
            <div v-if="currBalance.cointype==='2001'">
                <p>
                    <lang>Copy the Ethereum wallet address</lang>
                </p>
                <p>(<lang>only supports ETH</lang>)</p>
            </div>
            <div v-if="currBalance.cointype==='1001'">
                <p>
                    <lang>Copy the Bitcoin wallet address</lang>
                </p>
                <p>(<lang>only supports BTC</lang>)</p>
            </div>
        </div>
        <div class="copy" v-if="currBalance">
            <a href="javascript:;" rel="nofollow" v-clipboard:copy="currBalance.address" v-clipboard:success="copySucc" v-clipboard:error="copyError">COPY</a>
            <p v-if="currBalance">{{ currBalance.address }}</p>
        </div>
        <div class="msg">
            <lang>or scan to get the address</lang>
        </div>
        <img v-if="currBalance.cointype==='1001'" :src="'http://mobile.qq.com/qrcode?url=bitcoin:'+ currBalance.address " alt="recharge">
        <img v-if="currBalance.cointype==='2001'" :src="'http://mobile.qq.com/qrcode?url= '+ currBalance.address " alt="recharge">
    </div>
</template>

<script>

import { copySucc, copyError } from '~common/util'
export default {
    data(){
        return{
            showRecharge:false
        }
    },
    computed: {
        ip_status () {
            return this.$store.state.ip_status
        },
        currBalance () {
            return this.$store.state.currBalance
        },            
    },
    methods:{
        copySucc,
        copyError,
        showPopCharge(){
            // 父集调用
            this.showRecharge = true
        }
    },
    name: 'Pop-charge'
}

</script>

<style scope lang="less" type="text/less">
.pop-recharge {
  display: none;
  max-width: 674/2px;
  width: percentage(674/750);
  height: auto;
  border: 2px solid #96825c;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  border-radius: 8px;
  background: #2f2a3d;
  .recharge-close {
    position: absolute;
    top: 0;
    right: 0;
    background: url("../assets/img/tiger/btn-close.png") no-repeat center;
    background-size: 12px;
    width: 12px;
    height: 12px;
    padding: 12px 16px;
  }
  .title {
    margin-top: 29px;
    line-height: 16px;
    font-size: 13px;
    color: #fff;
  }
  .copy {
    width: percentage(580/674);
    margin: 7px auto 0;
    text-align: center;
    vertical-align: middle;
    p {
      box-sizing: border-box;
      margin-right: 152/2px;
      padding: 10px;
      word-wrap: break-word;
      background: #211d2d;
      height: 52px;
      line-height: 16px;
      overflow: hidden;
      font-size: 13px;
      color: #f3ca83;
    }
    a {
      float: right;
      display: block;
      width: 152/2px;
      height: 52px;
      line-height: 52px;
      font-size: 18px;
      color: #2f2a3d;
      font-weight: bold;
      background: #f3ca83;
    }
  }
  .msg {
    margin-top: 21px;
    font-size: 13px;
    color: #fff;
    line-height: 62/2px;
  }
  img {
    display: block;
    margin: 0 auto 20px;
  }
  &.show {
    display: block;
  }
}

</style>
