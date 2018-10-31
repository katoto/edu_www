<template>
    <div class="page_halloween">
        <Header></Header>
        <div class="main">
            <div class="banner">
                <h1 v-html="$lang.halloween.a5">
                </h1>
                <h2 v-html="$lang.halloween.a51">
                </h2>
                <h3>
                    {{this.$lang.halloween.a6}}
                </h3>
            </div>
            <div class="modules_guidance">
                <div class="title">
                    {{this.$lang.halloween.a8}}
                </div>
                <ul>
                    <li class="poker">
                        <router-link :to="{path: '/luckyPoker/'}" active-class="on" class="btn_more">
                            <p class="guidance_t">
                                {{this.$lang.halloween.a9}}
                            </p>
                            <p class="guidance_m">
                                {{this.$lang.halloween.a12}} <i>30</i>
                            </p>
                            <p class="guidance_m" v-if="$isEn()">
                                <i>1.5CC</i> {{this.$lang.halloween.a13}}
                            </p>
                            <p class="guidance_m" v-else>
                                {{this.$lang.halloween.a13}} <i>1.5CC</i>
                            </p>
                            <div class="img"></div>
                            <div class="btn">
                                {{$lang.poker.a39}}
                            </div>
                        </router-link>
                    </li>
                    <li class="lucky11">
                        <router-link :to="{path: '/lucky11/'}" active-class="on" class="btn_more">
                            <p class="guidance_t">
                                {{this.$lang.halloween.a10}}
                            </p>
                            <p class="guidance_m">
                                {{this.$lang.halloween.a12}} <i>20</i>
                            </p>
                            <p class="guidance_m" v-if="$isEn()">
                                <i>1.0CC</i> {{this.$lang.halloween.a13}}
                            </p>
                            <p class="guidance_m" v-else>
                                {{this.$lang.halloween.a13}} <i>1.0CC</i>
                            </p>
                            <div class="img"></div>

                            <div class="btn">
                                {{$lang.risk.a38}}
                            </div>
                        </router-link>
                    </li>
                    <li class="luckyCoin">
                        <router-link :to="{path: '/luckycoin/'}" active-class="on" class="btn_more">
                            <p class="guidance_t">
                                {{this.$lang.halloween.a11}}
                            </p>
                            <p class="guidance_m">
                                {{this.$lang.halloween.a12}} <i>10</i>
                            </p>
                            <p class="guidance_m" v-if="$isEn()">
                                <i>0.5CC</i> {{this.$lang.halloween.a13}}
                            </p>
                            <p class="guidance_m" v-else>
                                {{this.$lang.halloween.a13}} <i>0.5CC</i>
                            </p>
                            <div class="img"></div>
                            <div class="btn">
                                {{$lang.risk.a37}}

                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="modules_rule">
                <div class="title">
                    {{this.$lang.halloween.a14}}
                </div>
                <ul>
                    <li>
                        <p>
                            {{this.$lang.halloween.a15}}
                        </p>
                    </li>
                    <li>
                        <p>
                            {{this.$lang.halloween.a16}}
                        </p>
                    </li>
                    <li>
                        <p v-if="$isZhCn()">
                            3. 活动参与：通过点击页面上的小南瓜进入到捉妖模式，遇妖即捶，捶打越多，赢得CC币越多，万圣节活动赢得的CC币可在<router-link :to="{ path: '/account/myTransactions' }"><lang>My Transactions</lang></router-link>里查看
                        </p>
                        <p v-else-if="$isZhTw()">
                            3. 活動參與：通過點擊頁面上的小南瓜進入到捉妖模式，遇妖即捶，捶打越多，贏得CC幣越多，萬聖節活動贏得的CC幣可在<router-link :to="{ path: '/account/myTransactions' }"><lang>My Transactions</lang></router-link>裏查看
                        </p>
                        <p v-else>
                            3. Participation: Click little pumkin on the page to turn on the hunting mode. Beating it hard when you see the ghost, and every beating comes with CC reward. All the reward will be recorded in <router-link :to="{ path: '/account/myTransactions' }"><lang>My Transactions</lang></router-link>.
                        </p>
                    </li>
                    <li>
                        <p>
                            {{this.$lang.halloween.a18}}
                        </p>
                    </li>
                    <li>
                        <p>
                            {{this.$lang.halloween.a19}} <router-link :to="{path: 'help/helpView/0/1/Coin-Coin(CC)'}">{{$lang.halloween.a20}}</router-link>
                        </p>
                    </li>
                    <li>
                        <p>
                            {{this.$lang.halloween.a22}}
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '~components/Header.vue'
import Footer from '~components/Footer.vue'

export default {
    data () {
        return {

        }
    },
    methods: {
        show () {
            alert(1)
        }
    },

    components: {
        Header,
        Footer
    },
    filters: {
    }
}
</script>


<style lang="less" scoped type="text/less">
.page_halloween {
  background: #001025;
  .title {
    width: 80%;
    max-width: 522px;
    height: 170px;
    background: url(../../assets/img/halloween/active/bg_title.png) no-repeat
      center;
    background-size: contain;
    margin: 0 auto;
    text-align: center;
    line-height: 220px;
    font-size: 32px;
    color: #42afee;
    font-weight: bold;
  }
  .main {
    padding-top: 40px;
    background: url(../../assets/img/halloween/active/bg.jpg) no-repeat center
      top;
    background-size: 1920px;
  }
  .banner {
    height: 440px;
    text-align: center;
    color: #fff;
    font-family: sans-eb;
    line-height: 1;
    h1,
    h2 {
      font-size: 66px;
    }
    h3 {
      margin-top: 15px;
      font-size: 28px;
    }
  }
  .modules_guidance {
    ul {
      display: flex;
      justify-content: space-between;
      max-width: 1120px;
      width: 92%;
      margin: 30px auto 0;
    }
    li {
      position: relative;
      width: 266px;
      height: 386px;
      background: url(../../assets/img/halloween/active/bg_li.png) no-repeat
        center top;
      text-align: center;
      a {
        display: block;
        height: 100%;
      }
      &:hover .btn {
        font-size: 34px;
      }
    }
    .guidance_t {
      height: 57px;
      overflow: hidden;
      line-height: 60px;
      font-size: 24px;
      color: #42afee;
      font-weight: bold;
    }
    .guidance_m {
      height: 32px;
      line-height: 32px;
      font-size: 16px;
      color: #42afee;
      i {
        font-size: 20px;
        color: #ffaf24;
        font-weight: bold;
      }
    }
    .img {
      position: absolute;
      z-index: 1;
      left: 50%;
      transform: translate(-50%);
    }
    .btn {
      position: absolute;
      z-index: 2;
      left: 50%;
      bottom: 0;
      transform: translate(-50%);
      display: block;
      width: 248px;
      height: 140px;
      overflow: hidden;
      line-height: 175px;
      margin: 0 auto 0;
      background: url(../../assets/img/halloween/active/bg_btn.png) no-repeat
        center;
      font-size: 24px;
      color: #fff;
      font-weight: bold;
      transition: all 0.2s;
    }
    .poker {
      .img {
        top: 120px;
        width: 110px;
        height: 202px;
        background: url(../../assets/img/halloween/monster21.png) no-repeat
          center;
        animation: pokerAnimate 6s infinite steps(1);
      }
    }
    .lucky11 {
      .img {
        top: 125px;
        width: 169px;
        height: 138px;
        background: url(../../assets/img/halloween/monster01.png) no-repeat
          center;
        animation: lucky11Animate 2s infinite steps(1);
      }
    }
    .luckyCoin {
      .img {
        top: 130px;
        width: 142px;
        height: 95px;
        background: url(../../assets/img/halloween/monster11.png) no-repeat
          center;
        animation: luckyCoinAnimate 3s infinite steps(1);
      }
    }
  }
  .modules_rule {
    width: 92%;
    max-width: 910px;
    margin: 47px auto 160px;
    word-wrap: break-word;
    line-height: 28px;
    font-size: 16px;
    color: #42afee;
    .title {
      margin-bottom: 20px;
      line-height: 220px;
    }
    a {
      color: #42afee;
      text-decoration: underline;
      &:hover {
        filter: brightness(1.2);
      }
    }
  }
}
@keyframes pokerAnimate {
  0%,
  100% {
    background: url(../../assets/img/halloween/monster21.png) no-repeat center;
  }
  25% {
    background: url(../../assets/img/halloween/monster22.png) no-repeat center;
  }
  50% {
    background: url(../../assets/img/halloween/monster23.png) no-repeat center;
  }
  75% {
    background: url(../../assets/img/halloween/monster24.png) no-repeat center;
  }
}
@keyframes luckyCoinAnimate {
  0%,
  100% {
    background: url(../../assets/img/halloween/monster11.png) no-repeat center;
  }
  50% {
    background: url(../../assets/img/halloween/monster12.png) no-repeat center;
  }
}
@keyframes lucky11Animate {
  0%,
  100% {
    background: url(../../assets/img/halloween/monster01.png) no-repeat center;
  }
  50% {
    background: url(../../assets/img/halloween/monster02.png) no-repeat center;
  }
}
@media (max-width: 1200px) {
  .page_halloween {
    .title,
    .modules_rule .title {
      line-height: 190px;
      font-size: 24px;
    }
    .banner {
      h1,
      h2 {
        font-size: 1rem;
      }
      h3 {
        font-size: 0.7rem;
      }
    }
    .modules_guidance {
      ul {
        display: block;
      }
      li {
        margin: 20px auto;
      }
    }
  }
}
</style>
