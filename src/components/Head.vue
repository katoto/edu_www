<template>
  <div class="headbox">
    <div class="head">
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
      <section class="subhead">
        <div class="h_list icon-new">
          <router-link
            class="tophead"
            :to="{path: '/'}"
          >
            小学资源
            <div class="nexthead selftab1">
              <ul>
                <li>
                  <router-link :to="{path: '/'}">
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
            :to="{path: '/movie'}"
          >
            <span>katoto休闲</span>
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
  </div>
</template>
<script>
export default {
    data () {
        return {

        }
    }
}
</script>
<style scoped lang="less" type="text/less">
.headbox {
  width: 100%;
  height: 70px;
  background-color: #151515;
  border-bottom: 1px solid transparent;
  .head {
    width: 100%;
    max-width: 1190px;
    margin: 0 auto;
  }
  .h_logo {
    display: block;
    float: left;
    padding: 19px 23px 0 0;
    img {
      display: inline-block;
      height: 100%;
    }
  }
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
      left: 327px;
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
</style>
