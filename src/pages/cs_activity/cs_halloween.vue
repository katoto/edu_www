<template>
    <div class="page_halloween">
        <Header></Header>
        <div class="main">
            <div class="banner">
                <h1>
                    Halloween
                </h1>
                <h2>
                    Ghost Hunting
                </h2>
                <h3>
                    Free CC for every beating of the ghost
                </h3>
            </div>
            <div class="modules_guidance">
                <div class="title">
                    Hunting Guidance
                </div>
                <ul>
                    <li class="poker">
                        <p class="guidance_t">
                            Skeleton
                        </p>
                        <p class="guidance_m">
                            beating Times <i>30</i>
                        </p>
                        <p class="guidance_m">
                            Reward / Beating <i>1.5CC</i>
                        </p>
                        <div class="img"></div>
                        <a href="javascript:;" class="btn">Poker</a>
                    </li>
                    <li class="lucky11">
                        <p class="guidance_t">
                            Witch
                        </p>
                        <p class="guidance_m">
                            Beating Times <i>30</i>
                        </p>
                        <p class="guidance_m">
                            Reward / Beating <i>1.5CC</i>
                        </p>
                        <div class="img"></div>
                        <a href="javascript:;" class="btn">Lucky11</a>
                    </li>
                    <li class="luckyCoin">
                        <p class="guidance_t">
                            Skeleton
                        </p>
                        <p class="guidance_m">
                            beating Times <i>30</i>
                        </p>
                        <p class="guidance_m">
                            Reward / Beating <i>1.5CC</i>
                        </p>
                        <div class="img"></div>
                        <a href="javascript:;" class="btn">LuclyCoin</a>
                    </li>
                </ul>
            </div>
            <div class="modules_rule">
                <div class="title">
                    Rules
                </div>
                <ul>
                    <li>
                        <p>
                            1. Time: 2018-10-30 00:00 ~ 2018-11-3 23:59 GMT
                        </p>
                    </li>
                    <li>
                        <p>
                            2. Eligible Participants: All the users registered on Coinsprize
                        </p>
                    </li>
                    <li>
                        <p>
                            3. Participation: Click little pumkin on the page to turn on the hunting mode. Beating it hard when you see the ghost, and every beating comes with CC reward. All the reward will be recorded in My Transactions.
                        </p>
                    </li>
                    <li>
                        <p>
                            4. The system will generate 1-3 ghost each munite, so you may encounter couples of ghost at one time or none(if the hunting field was cleared by other users). Have fun with your hunting.
                        </p>
                    </li>
                    <li>
                        <p>
                            5. About CC: CC is free for users to experience our games. For more details a ter > Coin-Coin(CC).
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
    width: 522px;
    height: 170px;
    background: url(../../assets/img/halloween/active/bg_title.png) no-repeat
      center;
    margin: 0 auto;
    text-align: center;
    line-height: 230px;
    font-size: 32px;
    color: #8765ff;
    font-weight: bold;
  }
  .main {
    padding-top: 40px;
    background: url(../../assets/img/halloween/active/bg.jpg) no-repeat center
      top;
    background-size: 1920px;
  }
  .banner {
    height: 534px;
    text-align: center;
    color: #fff;
    font-family: sans-eb;
    line-height: 1;
    h1 {
      font-size: 66px;
    }
    h2 {
      font-size: 68px;
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
      width: 1120px;
      margin: 30px auto 0;
    }
    li {
      position: relative;
      width: 266px;
      height: 386px;
      background: url(../../assets/img/halloween/active/bg_li.png) no-repeat
        center top;
      text-align: center;
    }
    .guidance_t {
      height: 57px;
      overflow: hidden;
      line-height: 60px;
      font-size: 24px;
      color: #8765ff;
      font-weight: bold;
    }
    .guidance_m {
      height: 32px;
      line-height: 32px;
      font-size: 16px;
      color: #8765ff;
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
      &:hover {
        font-size: 34px;
      }
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
    width: 910px;
    margin: 47px auto 160px;
    word-break: break-all;
    word-wrap: break-word;
    line-height: 28px;
    font-size: 16px;
    color: #8765ff;
    .title {
      margin-bottom: 20px;
      line-height: 190px;
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
</style>
