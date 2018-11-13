<template>
    <div class="headbox">
        <div class="head">
            <a class="h_logo" href="/" title="katotoLogo">
                <img src="../assets/images/katoto.png" alt="">
            </a>
            <div class="h_list icon-new">
                <router-link :to="{path: '/movie'}">
                    电影
                </router-link>
                <router-link :to="{path: '/tvplay'}">
                    热门MV
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>

export default {

}
</script>
<style scoped lang="less" type="text/less">
.headbox {
  width: 100%;
  height: 70px;
  background-color: #151515;
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
    a {
      padding: 0 15px;
      height: 100%;
      font-size: 16px;
      display: inline-block;
      text-align: center;
      cursor: pointer;
      color: #fff;
      &:hover {
        background-color: rgba(255, 255, 255, 0.05);
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
