<template>
  <div class="headbox">
    <div class="head clearfix">
      <!-- 三个横线 -->
      <div
        class="btn_mobile hidden-pc"
        @click="showH5Nav=true"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <a
        class="h_logo"
        href="/"
        title="katotoLogo"
      >
        <img
          src="../assets/images/katoto.png"
          alt=""
        >
      </a>
      <!-- pc -->
      <section class="subhead visible-pc">
        <div class="h_list icon-new">
          <router-link
            class="tophead"
            :to="{path: '/'}"
          >
            小学资源
            <div class="nexthead selftab1">
              <ul>
                <li>
                  <router-link :to="{path: '/eduIndex/Class1'}">
                    小学一年级
                  </router-link>
                </li>
                <li>
                  <router-link :to="{path: '/eduIndex/Class2'}">
                    小学二年级
                  </router-link>
                </li>
                <li>
                  <router-link :to="{path: '/eduIndex/Class3'}">
                    小学三年级
                  </router-link>
                </li>
                <li>
                  <router-link :to="{path: '/eduIndex/Class4'}">
                    小学四年级
                  </router-link>
                </li>
                <li>
                  <router-link :to="{path: '/eduIndex/Class5'}">
                    小学五年级
                  </router-link>
                </li>
                <li>
                  <router-link :to="{path: '/eduIndex/Class6'}">
                    小学六年级
                  </router-link>
                </li>
              </ul>
            </div>
          </router-link>
          <router-link
            class="tophead"
            :to="{path: '/tuzhai'}"
          >
            图摘
          </router-link>
          <router-link
            class="tophead hide"
            :to="{path: '/htmlnav'}"
          >
            K美图
          </router-link>
          <router-link
            class="tophead"
            :to="{path: '/htmlnav'}"
          >
            前端猿导航
          </router-link>
          <router-link
            class="tophead"
            :to="{path: '/pmnav'}"
          >
            产品狗导航
          </router-link>
          <router-link
            class="tophead"
            style="position:relative"
            :to="{path: '/movie'}"
          >
            <span>kan休闲</span>
            <div class="nexthead selftab4">
              <ul>
                <li>
                  <router-link :to="{path: '/movie'}">
                    vip免费电影
                  </router-link>
                </li>
                <li>
                  <router-link :to="{path: '/tvplay'}">
                    电视剧
                  </router-link>
                </li>
              </ul>
            </div>
          </router-link>
        </div>
      </section>
    </div>
    <!-- h5 -->
    <section class="h5head">
      <div
        class="mobile_nav hidden-pc"
        :class="{on:showH5Nav}"
      >
        <div
          href="javascript:;"
          class="btn_mobile"
          @click="showH5Nav=false"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul class="nav_regular">
          <li>
            <router-link
              class="tophead"
              :to="{path: '/'}"
            >
              小学资源
            </router-link>
          </li>
          <li class="icon-new">
            <router-link
              class="tophead"
              :to="{path: '/tuzhai'}"
            >
              图摘
            </router-link>
          </li>
          <li>
            <router-link
              class="tophead"
              :to="{path: '/htmlnav'}"
            >
              K美图
            </router-link>
          </li>
          <li>
            <router-link
              class="tophead"
              :to="{path: '/htmlnav'}"
            >
              前端猿导航
            </router-link>
          </li>
          <li>
            <router-link
              class="tophead"
              :to="{path: '/pmnav'}"
            >
              产品狗导航
            </router-link>
          </li>
          <li>
            <router-link
              class="tophead"
              style="position:relative"
              :to="{path: '/movie'}"
            >
              <span>kan休闲</span>
            </router-link>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
export default {
    data () {
        return {
            showH5Nav: false
        }
    }
}
</script>
<style lang="less" type="text/less">
.visible-pc {
  @media (max-width: 992px) {
    display: none !important;
  }
}
.hidden-pc {
  @media (min-width: 992px) {
    display: none !important;
  }
}
</style>
<style scoped lang="less" type="text/less">
.headbox {
  width: 100%;
  height: 70px;
  background-color: #151515;
  border-bottom: 1px solid transparent;
  .head {
    width: 100%;
    max-width: 1190px;
    height: 70px;
    margin: 0 auto;
    .h_logo {
      display: block;
      float: left;
      padding: 19px 23px 0 0;
      img {
        display: inline-block;
        height: 100%;
      }
    }
  }
  .btn_mobile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    float: left;
    padding: 0 0.26rem;
    span {
      display: block;
      width: 22px;
      height: 3px;
      background: #fff;
      border-radius: 3px;
      transition: all 0.3s ease-in-out;
      + span {
        margin-top: 5px;
      }
    }
  }
  //mobile
  .h5head {
    .mobile_nav {
      position: relative;
      z-index: 6;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      position: fixed;
      left: 0;
      top: 0;
      padding-left: 0.56rem;
      width: 5rem;
      height: 100%;
      overflow: auto;
      background: #000;
      transform: translate(-100%);
      transition: all 0.2s ease-in-out;
      .btn_mobile {
        height: 1.2rem;
        padding: 6px 0;
        span {
          opacity: 0;
        }
      }
      .nav_regular {
        position: relative;
        margin-top: 2px;
        li {
          position: relative;
          padding-bottom: 12px;
          a {
            line-height: 36px;
            font-size: 18px;
            color: #fff;
          }
          &.icon-new {
            a {
              position: relative;
              &::after {
                content: "N";
                display: inline-block;
                margin: -20/75rem 0 0 5px;
                border-radius: 2px;
                padding: 0 4px;
                line-height: 18px;
                background: #ff5b59;
                font-weight: 700;
                font-size: 14px;
                color: #fff;
              }
            }
          }
        }
      }
      //   x 号
      &.on {
        transform: translate(0);
        span {
          transform-origin: left;
        }
        span + span {
          margin-top: 7px;
        }
        .btn_mobile {
          span:first-child {
            opacity: 1;
            transform: rotate(45deg) scaleX(1.25);
          }
          span:last-child {
            opacity: 1;
            transform: rotate(-45deg) scaleX(1.25);
          }
        }
      }
    }
  }

  //   pc
  .subhead {
    .h_list {
      float: left;
      line-height: 70px;
      position: relative;
      .nexthead {
        position: absolute;
        left: 0;
        z-index: 10;
        opacity: 0.3;
        height: 0;
        overflow: hidden;
        transition: all 0.3s ease;
        background-color: #151515;
        border-radius: 0 0 5px 5px;
        width: 95px;
        li {
          line-height: 36px;
          text-align: center;
          font-size: 14px;
          a {
            color: #fff;
          }
          cursor: pointer;
          &:hover {
            background-color: rgba(255, 255, 255, 0.05);
          }
        }
      }
      .selftab4 {
        //   left: 327px;
        width: 110px;
      }

      .tophead {
        padding: 0 15px;
        height: 100%;
        font-size: 16px;
        display: inline-block;
        text-align: center;
        cursor: pointer;
        color: #fff;
        &:hover {
          background-color: rgba(255, 255, 255, 0.05);
          .selftab4 {
            opacity: 1;
            height: 72px;
          }
          .selftab1 {
            opacity: 1;
            height: 216px;
          }
        }
      }
      &.icon-new {
        &::after {
          content: "N";
          display: block;
          position: absolute;
          top: 10px;
          // right: 108px;
          right: -10px;
          border-radius: 2px;
          padding: 0 4px;
          line-height: 18px;
          background: #36c57a;
          font-weight: bold;
          font-size: 14px;
          color: #fff;
        }
      }
    }
  }
}
</style>
