<template>
    <div class="page-check">
        <Header></Header>
        <div class="main">
            <BreadCrumbs :data="[{ name: _('Home'), path: '/' }, { name: _('Transparency Checking'), path: '/check' }]"></BreadCrumbs>
            <!--查询框-->
            <el-tabs v-model="params.type" @tab-click="handleTabClick">
                <el-tab-pane :label="_('Lucky11')" name="lucky11"></el-tab-pane>
                <el-tab-pane :label="_('LuckyCoin')" name="luckycoin"></el-tab-pane>
                <el-tab-pane :label="_('LuckyPoker')" name="luckyPoker"></el-tab-pane>
            </el-tabs>
            <div class="check-input">
                <div class="check-enter">
                    <h2>
                        <lang>Draw Result Checking</lang>
                    </h2>
                    <div v-if="params.type === 'luckyPoker'" class="poker-form">
                        <input type="text" :placeholder="$lang.poker.a28" v-model="params.luckyPoker.clientSeed" class="input-seed">
                        <input type="text" :placeholder="$lang.poker.a29" v-model="params.luckyPoker.serverSeed">
                        <p v-if="params.luckyPoker.serverHash !== ''">{{$lang.poker.a32}}</p>
                        <input type="text" v-model="params.luckyPoker.serverHash" v-if="params.luckyPoker.serverHash !== ''" readonly>
                    </div>
                    <input type="text" :placeholder="_('Enter Draw No.')" v-model="issueNumber" @keyup.enter="issueInputEnterHandler" v-else>
                    <p>
                        <a href="/luckycoin/drawHistory" target="_blank" v-if="params.type === 'luckycoin'">
                            <lang>Find No. in Draw Records</lang>
                        </a>
                        <a href="/drawNumber" target="_blank" v-if="params.type === 'lucky11'">
                            <lang>Find No. in Draw Records</lang>
                        </a>
                    </p>
                </div>
                <a href="javascript:;" class="btn-verification" @click="verifyHandler">
                    <lang>Check Now</lang>
                </a>
                <!--rollIn animated-->
                <div class="checkout-result" :class="{ 'rollIn animated show': isChecked }">
                    <h3>
                        <lang>Draw Result</lang>
                    </h3>
                    <div class="result-view">
                        <!--lucky11-->
                        <ul v-if="params.type === 'lucky11' && lucky11Status !== 'wait'">
                            <li v-for="(item, index) in luck11Result" :key="index">{{item}}</li>
                        </ul>
                        <div v-else-if="params.type === 'lucky11' && lucky11Status === 'wait'">
                            <lang>waiting</lang>
                        </div>
                        <!--LuckyCoin-->
                        <!--luckyCoinStatus: normal 已开奖，wait 未开奖，expired 过期 -->
                        <div v-if="params.type === 'luckycoin'" :class="[luckyCoinStatus]">
                            {{luckyCoinResult}}
                        </div>
                        <!--luckyPoker v-if="params.type === 'luckyPoker'"-->
                        <div class="poker-check" v-if="params.type === 'luckyPoker'">
                            <p>{{params.luckyPoker.shaModNumber}}</p>
                            <p class="mark">>>></p>
                            <!--icon-fk/icon-hongt/icon-mh/icon-heit/joker-->
                            <div class="poker-item" :class="[getDiceClass()]">
                                <p>{{getDiceText()}}</p>
                            </div>
                        </div>
                    </div>
                    <div v-if="params.type === 'luckyPoker'">
                        <h4 class="poker-t" style="margin-top: 33px">{{$lang.poker.a30}} :</h4>
                        <p class="poker-m">{{params.luckyPoker.shaResult}}</p>
                        <div style="line-height: 48px;">
                            <h4 class="poker-t fl">{{$lang.poker.a31}} :</h4>
                            <p class="poker-m fl">{{params.luckyPoker.shaNumber}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <!--步骤说明-->
            <div class="check-explain" :class="{ hide: params.type === 'luckyPoker' }">
                <div class="step-title">
                    <lang>Draw Process</lang>
                </div>
                <div class="step-view bounce animated delay-2s" ref="errorCt">
                    <ul>
                        <li v-lang="'Order <br/>Information'">
                        </li>
                        <li v-lang="'SHA256'"></li>
                        <li>
                            <lang>Merkel Value</lang>
                        </li>
                        <li v-lang="'Upload <br/>to Ethereum'"></li>
                        <li v-lang="'Block Hash'"></li>
                        <li v-lang="'Open <br/>Calculation'"></li>
                        <li v-lang="'Draw <br/>Numbers'"></li>
                    </ul>
                </div>
            </div>
            <!--输入前-->
            <p class="before-input" :class="{ hide: isChecked }"></p>
            <!--输入后-->
            <div class="after-input" :class="{ hide: !isChecked || (params.type === 'lucky11' && lucky11Status === 'wait') }" :style="{ visibility: params.type === 'luckyPoker' ? 'hidden': 'visible' }">
                <lucky11 :number="number" :result.sync="luck11Result" :status.sync="lucky11Status" :class="{ hide: lotid !== 1 }" ref="lucky11"></lucky11>
                <luckycoin :number="number" :result.sync="luckyCoinResult" :status.sync="luckyCoinStatus" :class="{ hide: lotid !== 2 }" ref="luckycoin"></luckycoin>

                <div class="relate-msg" v-if="params.type != 'luckyPoker'">
                    <p>
                        <lang>Notes</lang>
                    </p>
                    <p v-lang="'1. What is <a href=https://en.wikipedia.org/wiki/Hexadecimal target=_blank>hash</a>? <a href=https://www.tools4noobs.com/online_tools/hash/ target=_blank>How to calculate hash</a>?'">
                    </p>
                    <p v-lang="'2. What is <a href=https://en.wikipedia.org/wiki/Merkle_tree target=_blank>Merkle value</a>?'">
                    </p>
                    <p v-lang="'3. Check from <a href=https://etherscan.io target=_blank>Etherscan.io</a>.'">
                    </p>
                </div>
            </div>
            <!--返回顶部-->
            <ScrollTop></ScrollTop>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '~components/Header'
import Footer from '~components/Footer'
import BreadCrumbs from '~/components/BreadCrumbs'
import ScrollTop from '~/components/ScrollTop'
import Lucky11 from './components/lucky11'
import Luckycoin from './components/luckycoin'
import { getURLParams } from '~common/util'
import { mapActions } from 'vuex'
export default {
    data () {
        return {
            luck11Result: [],
            lucky11Status: '',
            luckyCoinResult: '',
            luckyCoinStatus: '',
            issueNumber: '',
            params: {
                lucky11: {
                    number: '',
                    isChecked: false
                },
                luckycoin: {
                    number: '',
                    isChecked: false
                },
                luckyPoker: {
                    isChecked: false,
                    result: 0,
                    clientSeed: '',
                    serverSeed: '',
                    serverHash: '',
                    shaResult: '0',
                    shaNumber: '',
                    shaModNumber: ''
                },
                type: 'lucky11'
            }
        }
    },
    methods: {
        ...mapActions('cs_luckypoker', ['check']),
        getURLParams,
        init () {
            var params = this.getURLParams()
            if (params.type) {
                let type =
                    {
                        lucky11: 1,
                        luckycoin: 2,
                        luckypoker: 3
                    }[params.type.toLowerCase()] || 1
                this.params.type = ['lucky11', 'luckycoin', 'luckyPoker'][type - 1]
            }
            if (params.number) {
                this.params[this.params.type].number = params.number
                this.issueNumber = this.number
                this.getData()
            }
            if (params.serverseed && params.clientseed) {
                this.params[this.params.type].serverSeed = params.serverseed
                this.params[this.params.type].clientSeed = params.clientseed
                this.getPokerData()
            }
        },
        handleTabClick () {
            // TODO: 切换tab
            this.issueNumber = this.number
        },
        issueInputEnterHandler () {
            if (this.issueNumber && this.issueNumber.length > 0) {
                this.getData()
            }
        },
        verifyHandler () {
            this.getData()
        },
        getPokerData () {
            return this.check({
                server_seed: this.params.luckyPoker.serverSeed,
                client_seed: this.params.luckyPoker.clientSeed
            }).then(res => {
                this.params.luckyPoker.serverHash = res.data.server_hash
                this.params.luckyPoker.shaResult = res.data.sha_result
                this.params.luckyPoker.shaNumber = res.data.raw_number
                this.params.luckyPoker.shaModNumber = res.data.result_number
                this.params.luckyPoker.isChecked = true
            })
        },
        getDiceClass (type = this.params.luckyPoker.shaModNumber) {
            type = Number(type)
            if (type >= 0 && type <= 12) {
                return 'icon-hongt'
            } else if (type >= 13 && type <= 25) {
                return 'icon-heit'
            } else if (type >= 26 && type <= 38) {
                return 'icon-fk'
            } else if (type >= 39 && type <= 51) {
                return 'icon-mh'
            } else {
                return 'joker'
            }
        },
        getDiceText (type = this.params.luckyPoker.shaModNumber) {
            type = Number(type)
            let points = [
                'A',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                'J',
                'Q',
                'K'
            ]
            if (type >= 0 && type <= 12) {
                return points[type]
            } else if (type >= 13 && type <= 25) {
                return points[type - 13]
            } else if (type >= 26 && type <= 38) {
                return points[type - 26]
            } else if (type >= 39 && type <= 51) {
                return points[type - 39]
            } else {
                return ''
            }
        },
        getData () {
            if (this.params.type === 'luckyPoker') {
                return this.getPokerData()
            }
            if (!this.verifyNumber()) {
                this.$error(
                    _(
                        'No. should consist of 10 numbers. You can check No. from draw history.'
                    )
                )
                return
            }
            return {
                lucky11: this.$refs.lucky11.getData,
                luckycoin: this.$refs.luckycoin.getData
            }[this.params.type](this.number)
                .then(res => {
                    this.params[this.params.type].isChecked = true
                    return res
                })
                .catch(err => {
                    this.$error(
                        _('This No. is non-exist. You can check No. from draw history.')
                    )
                    this.params[this.params.type].isChecked = false
                    this.showErrorAnimate()
                    return err
                })
        },
        showErrorAnimate () {
            this.$refs.errorCt.className = 'step-view animated'
            setTimeout(() => {
                this.$refs.errorCt.className = 'step-view bounce animated'
            }, 100)
        },
        verifyNumber () {
            return /^[\d]{10}$/.test(this.number)
        }
    },
    watch: {
        issueNumber (val) {
            this.params[this.params.type].number = val
        }
    },
    computed: {
        lotid () {
            return {
                lucky11: 1,
                luckycoin: 2
            }[this.params.type]
        },
        number () {
            return this.params[this.params.type].number || ''
        },
        isChecked () {
            return this.params[this.params.type].isChecked
        }
    },
    components: {
        Header,
        Footer,
        BreadCrumbs,
        ScrollTop,
        Lucky11,
        Luckycoin
    },
    mounted () {
        this.init()
    }
}
</script>
<style scoped lang="less" type="text/less">
.page-check {
  background: #242240;
}
@media (min-width: 1200px) {
  .poker-form {
    width: 376px;
    p {
      padding-bottom: 0 !important;
    }
    .input-seed {
      margin-bottom: 5px;
    }
  }
  /deep/.main {
    position: relative;
    max-width: 1190px;
    margin: 0 auto;
    background: #242240;
    .step-title {
      line-height: 84px;
      font-size: 20px;
      color: #fff;
      font-weight: bold;
    }
    .check-input {
      width: 1190px;
      height: 385px;
      /*overflow: hidden;*/
      margin: 0 auto;
      background: url("../../assets/img/check/bg-check.png") no-repeat center;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      .check-enter {
        h2 {
          line-height: 82px;
          font-family: sans-eb;
          font-size: 30px;
          font-weight: bold;
          color: #fff;
        }
        input {
          width: 374px;
          height: 52px;
          overflow: hidden;
          outline: none;
          border: 1px solid #788ca3;
          border-radius: 6px;
          background: #242240;
          line-height: 52px;
          text-indent: 10px;
          font-size: 16px;
          color: #fff;
          &::-webkit-input-placeholder {
            color: #788ca3;
          }
          &:focus {
            border-color: #fff;
          }
        }
        p {
          padding-bottom: 18px;
          line-height: 64px;
          font-size: 14px;
          color: #788ca3;
        }
        a {
          color: #788ca3;
          text-decoration: underline;
          &:hover {
            filter: brightness(1.3);
          }
        }
      }
      .btn-verification {
        display: block;
        width: 150px;
        height: 60px;
        overflow: hidden;
        margin: 0 67px 0 43px;
        text-align: center;
        line-height: 60px;
        background: #fd9644;
        border-radius: 6px;
        font-size: 20px;
        color: #fff;
        font-weight: bold;
        transition: all 0.2s;
        &:hover {
          filter: brightness(1.1);
        }
      }
      .checkout-result {
        position: relative;
        z-index: 2;
        width: 342px;
        padding: 7px 40px 68px;
        border: 1px solid #6a89cc;
        border-radius: 6px;
        background: #242240;
        visibility: hidden;
        opacity: 0;
        transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
        h3 {
          line-height: 80px;
          font-family: sans-eb;
          font-size: 20px;
          color: #fff;
          font-weight: bold;
        }
        .result-view {
          width: 340px;
          height: 52px;
          overflow: hidden;
          line-height: 52px;
          border-bottom: 1px solid #fd9644;
          ul {
            display: flex;
            justify-content: center;
          }
          li {
            width: 38px;
            height: 38px;
            overflow: hidden;
            margin: 0 6px;
            border-radius: 50%;
            background: #fd9644;
            text-align: center;
            line-height: 38px;
            font-size: 20px;
            font-weight: bold;
            color: #fff;
          }
          > div {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            color: #fd9644;
            &.expired {
              font-size: 14px;
            }
          }
        }
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: -22px;
          transform: translateY(-50%);
          display: block;
          width: 22px;
          height: 22px;
          background: url("../../assets/img/check/icon-arrow.png") no-repeat
            center;
        }
      }
    }
    .check-explain {
      margin-top: 23px;
      .step-title {
        margin-bottom: 5px;
      }
      .step-view {
        position: relative;
        width: 1021px;
        height: 204px;
        overflow: hidden;
        margin: 0 auto;
      }
      ul {
        position: absolute;
        width: 100%;
        height: 248px;
        left: 0;
        top: -44px;
        background: url("../../assets/img/check/bg-check-explain.png") no-repeat
          center bottom;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      li {
        flex: 1;
        line-height: 24px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
      }
      li:nth-child(2n) {
        color: #6a89cc;
      }
    }
    .before-input {
      padding-bottom: 292px;
      line-height: 54px;
      font-size: 14px;
      color: #788ca3;
    }
    .after-input {
      margin-top: 38px;
      .item {
        position: relative;
        padding: 0 50px;
        background: #1d1c3a;
        font-size: 16px;
        color: #ffffff;
        .title-1 {
          /*overflow: hidden;*/
          font-weight: bold;
          color: #6a89cc;
        }
        & + .item {
          margin-top: 32px;
          &::before {
            content: "";
            position: absolute;
            left: 50px;
            top: -46px;
            width: 23px;
            height: 58px;
            overflow: hidden;
            background: url("../../assets/img/check/icon-and.png") no-repeat
              center;
          }
        }
      }
      .item1 {
        padding-top: 14px;
        padding-bottom: 25px;
        .title-1 {
          position: relative;
          float: left;
          padding-right: 33px;
          line-height: 51px;
        }
        .icon-mark {
          position: absolute;
          top: (51-16)/2px;
          right: 0;
          display: block;
          width: 16px;
          height: 16px;
          background: url("../../assets/img/check/icon-mark.png") no-repeat
            center;
          background-size: 16px;
          cursor: pointer;
        }
        .btn-copy {
          display: block;
          float: right;
          line-height: 51px;
          color: #6a89cc;
          text-decoration: underline;
          &:hover {
            filter: brightness(1.3);
            color: #6a89cc;
          }
        }
        .msg-items {
          clear: both;
          overflow: hidden;
          max-height: 123px;
          overflow: auto;
          li {
            float: left;
            margin-right: 20px;
            line-height: 41px;
          }
          &::-webkit-scrollbar {
            width: 6px;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 6px;
            background: rgba(120, 140, 163, 0.5);
          }
          &::-webkit-scrollbar-track {
            border-radius: 6px;
            background: #1d1c3a;
          }
        }
      }
      .item2 {
        padding-top: 38px;
        padding-bottom: 46px;
        line-height: 41px;
      }
      .item3 {
        padding-top: 37px;
        padding-bottom: 36px;
        line-height: 37px;
        a {
          color: #fff;
          text-decoration: underline;
          font-weight: bold;
          &:hover {
            filter: brightness(1.3);
          }
        }
      }
      .item4 {
        padding-top: 27px;
        p {
          font-size: 14px;
          color: #6a89cc;
        }
        .title-1 {
          line-height: 45px;
        }
      }
      .abox {
        width: 128px;
        height: 28px;
        overflow: hidden;
        line-height: 28px;
        overflow: hidden;
        border: 2px solid #6a89cc;
        background: #6a89cc;
        border-radius: 14px;
        text-align: center;
        i {
          float: left;
          width: 42px;
          font-weight: bold;
        }
        span {
          display: block;
          height: 28px;
          overflow: hidden;
          background: #1d1c3a;
        }
      }
    }
    .result-lucky11 {
      padding-bottom: 56px;
      p {
        &.p1 {
          line-height: 44px;
        }
        &.p2 {
          margin-top: 30px;
          line-height: 66px;
        }
        &.p3 {
          margin-top: 27px;
          line-height: 40px;
          text-align: center;
          color: #788ca3;
        }
        &.p4 {
          line-height: 61px;
          font-size: 16px;
        }
      }
      .hash {
        line-height: 34px;
        span {
          margin-left: 12px;
          text-decoration: underline;
          font-weight: bold;
          i + i {
            margin-left: 12px;
          }
        }
      }
      .icon-down {
        width: 18px;
        height: 19px;
        overflow: hidden;
        background: url("../../assets/img/check/icon-down.png") no-repeat center;
        margin: 7px 0 13px 310px;
      }
      .hash-5 {
        overflow: hidden;
        li {
          float: left;
          margin-right: 34px;
        }
      }
      .mod-5 {
        margin: 17px 0 0 0;
        > li {
          position: relative;
          width: 428px;
          float: left;
          margin-right: 50px;
          border: 2px dashed #788ca3;
          border-radius: 6px;
          margin-bottom: 50px;
          &:last-child {
            margin-bottom: 0;
          }
        }
        .mod-top {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -16px;
          background: #1d1c3a;
          display: flex;
          justify-content: start;
          align-items: center;
          padding: 0 10px;
          .abox {
            margin-right: 10px;
          }
        }
        .number-box {
          display: flex;
          justify-content: center;
          margin-top: 34px;
          li {
            margin: 0 2px;
            div {
              width: 30px;
              height: 30px;
              overflow: hidden;
              border-radius: 50%;
              background: #383e5a;
              text-align: center;
              line-height: 30px;
            }
            &::before {
              content: attr(data-count);
              display: block;
              width: 30px;
              line-height: 36px;
              text-align: center;
              color: #788ca3;
            }
            &.on {
              div {
                background: #6a89cc;
                font-weight: bold;
              }
              &::before {
                color: #fff;
                font-weight: bold;
              }
            }
          }
        }
      }
      .finally-result {
        margin-top: 24px;
        ul {
          overflow: hidden;
        }
        li {
          float: left;
          margin-right: 8px;
          width: 30px;
          height: 30px;
          overflow: hidden;
          background: #fd9644;
          border-radius: 50%;
          text-align: center;
          line-height: 30px;
          font-weight: bold;
        }
      }
    }
    .result-onecoin {
      padding-bottom: 52px;
      p {
        &.p1 {
          line-height: 44px;
        }
        &.p2 {
          line-height: 44px;
          margin-top: 17px;
        }
        &.p3 {
          line-height: 35px;
          margin-top: 30px;
        }
      }
      div {
        line-height: 35px;
      }
      i.special {
        display: inline-block;
        height: 35px;
        line-height: 35px;
        padding: 0 6px;
        font-weight: bold;
        background: #3b3a65;
        border-radius: 4px;
      }
      .finally-result {
        line-height: 38px;
        font-size: 20px;
        color: #fd9644;
        font-weight: bold;
      }
    }
    .relate-msg {
      padding: 36px 0 190px 0;
      line-height: 24px;
      color: #6a89cc;
      background: #242240;
      a {
        text-decoration: underline;
        &:hover {
          filter: brightness(1.3);
          color: #6a89cc;
        }
      }
    }
    /*漂浮规则*/
    .rule-view {
      position: absolute;
      top: -185px;
      left: -33px;
      padding: 4px 26px 70px;
      background: #ffffff;
      border-radius: 6px;
      p {
        line-height: 68px;
        color: #788ca3;
      }
      ul {
        display: flex;
        justify-content: center;
        li {
          position: relative;
          line-height: 20px;
          border-bottom: 2px solid #bdc9e6;
          font-size: 20px;
          color: #6a89cc;
          font-weight: bold;
          &::after {
            content: attr(data-msg);
            position: absolute;
            left: 50%;
            top: 22px;
            transform: translateX(-50%);
            line-height: 24px;
            font-size: 14px;
            font-weight: normal;
            white-space: nowrap;
          }
        }
        li + li {
          margin-left: 33px;
          &::before {
            content: "#";
            width: 33px;
            text-align: center;
            position: absolute;
            left: -33px;
            top: 0;
          }
        }
      }
      &::after {
        content: "";
        display: block;
        position: absolute;
        left: 30px;
        bottom: -15px;
        width: 0;
        height: 0;
        border-bottom: none;
        border-left: 11.5px solid transparent;
        border-right: 11.5px solid transparent;
        border-top: 15px solid #fff;
      }
    }
    .el-tabs {
      width: 100%;
      .el-tabs__item {
        &:hover {
          color: #6a89cc;
          filter: brightness(1.3);
        }
        &.is-active {
          color: #fff;
        }
      }
      .el-tabs__active-bar {
        background-color: #fff;
      }
      .el-tabs__nav-wrap::after {
        background-color: #412057;
      }
    }
    /*新增poker*/
    .poker-check {
      display: flex;
      align-items: center;
      justify-content: center;
      .mark {
        margin: 0 25px;
        font-size: 20px;
        color: rgba(255, 255, 255, 0.3);
      }
      .poker-item {
        width: 20px;
        height: 30px;
        overflow: hidden;
        float: left;
        border-radius: 8/2px;
        background-color: #fff;
        p {
          line-height: 30/2px;
          font-size: 24/2px;
          font-weight: bold;
        }
        &::after {
          content: "";
          display: block;
          width: percentage(24/40);
          height: 30/2px;
          overflow: hidden;
          margin: 0 auto;
        }
        &.icon-hongt {
          color: #cc3333;
          &::after {
            background: url("../../assets/img/luckyPoker/icon-hongt.png")
              no-repeat center top;
            background-size: contain;
          }
        }
        &.icon-fk {
          color: #cc3333;
          &::after {
            background: url("../../assets/img/luckyPoker/icon-fk.png") no-repeat
              center top;
            background-size: contain;
          }
        }
        &.icon-mh {
          color: #000000;
          &::after {
            background: url("../../assets/img/luckyPoker/icon-mh.png") no-repeat
              center top;
            background-size: contain;
          }
        }
        &.icon-heit {
          color: #000000;
          &::after {
            background: url("../../assets/img/luckyPoker/icon-heit.png")
              no-repeat center top;
            background-size: contain;
          }
        }
        &.joker {
          &::after {
            width: 100%;
            height: 100%;
            background: url("../../assets/img/luckyPoker/font-joker.png")
              no-repeat center top;
            background-size: cover;
          }
          p {
            display: none;
          }
        }
        & + li {
          margin-left: 5px;
        }
      }
    }
    .poker-t {
      line-height: 48px;
      font-size: 14px;
      color: #fff;
      font-family: sans-eb;
    }
    .poker-m {
      font-size: 14px;
      color: #fff;
      word-break: break-all;
    }
  }
}
</style>
<style scoped lang="less" type="text/less">
@import "checkh5.less";
</style>
