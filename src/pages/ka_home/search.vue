<template>
  <div>
    <div class="search_box">
      <div class="search_content">
        <h3><span style="color:red;font-size:20px;">vip电影</span> 免费观看，还不快邀请你的小伙伴！</h3>
        <div class="search_inp clearfix">
          <input v-model="searchVal" placeholder="黏贴小电影链接" />
          <p @click="jump2Play">开启</p>
          <p class="hidden-sm hidden-xs" @click="jump2baidu">百度搜索</p>
        </div>
        <p class="hot-search">
          <span>热门搜索：</span>
          <a href="javascript:;">西虹市首富</a>
          <a href="javascript:;">虎胆追凶</a>
          <a href="javascript:;">盖世英雄</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchVal: ''
    }
  },
  watch: {},
  methods: {
    jump2Play() {
      if (this.searchVal !== '' && this.searchVal.indexOf('http') > -1) {
        this.$router.push('/play/' + encodeURIComponent(this.searchVal))
      } else {
        this.$error('请输入正确的查询链接')
        setTimeout(() => {
          this.jump2baidu()
        }, 2000)
      }
    },
    jump2baidu() {
      if (this.searchVal !== '') {
        window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(this.searchVal))
      } else {
        this.$error('请输入查询信息')
      }
    }
  },
  computed: {},
  components: {},
  mounted() {}
}
</script>
<style scoped lang="less" type="text/less">
@import '../../styles/lib-media.less';

.search_box {
  height: 320px;
  width: 100%;
  font-size: 14px;
  background: url('../../assets/images/kv.jpg') top center;
  .search_content {
    width: 100%;
    max-width: 664px;
    margin: 0 auto;
    padding-top: 80px;
    h3 {
      font-size: 18px;
      line-height: 28px;
      padding: 10px 0;
    }
    .search_inp {
      width: 100%;
      height: 40px;
      position: relative;
      input {
        height: 38px;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding-left: 10px;
        float: left;
        width: 100%;
        max-width: 450px;
        margin-right: 10px;
      }
      p {
        float: left;
        text-align: center;
        line-height: 40px;
        padding: 0 18px;
        border-radius: 4px;
        color: #fff;
        background-color: #409eff;
        cursor: pointer;
      }
      p:last-child {
        margin-left: 10px;
      }
    }
  }
  .hot-search {
    margin-top: 10px;
    font-size: 16px;
  }
}

@media (max-width: @screen-phone) {
  .search_box {
    height: 200px;
    .search_content {
      width: 95%;
      margin: 0 auto;
      max-width: 400px;
      padding-top: 30px;
      h3 {
        font-size: 14px;
        line-height: 24px;
      }
      .search_inp {
        width: 100%;
        height: 40px;
        input {
          max-width: 250px;
          margin-right: 5px;
        }
      }
    }
    .hot-search {
      margin-top: 10px;
      font-size: 16px;
    }
  }
}
// 平板，
/* md中等屏幕（桌面显示器，大于等于 992px） */
@media (min-width: @screen-desktop) {
}
</style>
