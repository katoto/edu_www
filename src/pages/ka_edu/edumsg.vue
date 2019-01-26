<template>
  <!-- 新东方资讯详情 -->
  <!-- http://xiaoxue.xdf.cn/201811/10825052.html -->
  <div class="content clearfix wrap1000 ">
    <!--左侧 S-->
    <div class="conL-box">
      <div class="conL">
        <!--内容部分 S-->
        <div
          class="article "
          v-if="currMsg"
        >
          <p class="title1 f-f0">{{ currMsg.titleName }}</p>
          <div class="art_xin">
            <p class="art_time">{{ currMsg.titletime }}</p>
            <p class="art_ly">来源：<span>{{ currMsg.artLy }}</span></p>
            <p class="art_zz">作者：<span>匿名</span></p>
          </div>
          <div
            class="air_con f-f0"
            v-html="currMsg.artmsg"
          >
          </div>
        </div>
      </div>
    </div>
    <!--左侧 E-->
    <!--右侧 S-->
    <div class="mainR f-f0 floatR">
      <div class="r_news ">
        <p class="title3 f-f0">
          阅读排行榜
        </p>
        <ul class="r_news_list">
          <li
            v-for="(item,index) in zixunArr"
            :key="index"
          >
            <router-link
              :to="{path:`/edumsg/${item._id.replace(/\//g,'$')}`}"
              target="_blank"
            >
              <b></b>{{ item.titleName }}
            </router-link>
          </li>
        </ul>
      </div>
      <!--右侧广告位2 S-->
      <div class="ad2 ">
        <div id="adModel_366">
          <div
            style="width: 320px; height: 250px;"
            id="adMod_366"
          >
            <a
              target="_blank"
              style="height: 100%; width: 100%;"
              href="javascript:;"
            >
              <img
                style="height: 100%; width: 100%;"
                src="http://file.xdf.cn/new_www/20180905/op_5b8f3bf05fbd9.jpeg"
              >
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ScrollTop from '~components/ScrollTop.vue'

export default {
    data () {
        return {
            id: '201811/10825047',
            currMsg: null,
            zixunArr: []
        }
    },
    components: {
        ScrollTop
    },
    methods: {
        async zixunmsg () {
            let data = await this.$store.dispatch('ka_edu/getzixunmsg', this.id)
            if (data && data.status === '100') {
                this.currMsg = data.data.msg
            }
        },
        async zixun_handleCurrentChange (tab = 'one') {
            let params = {
                pageno: 1,
                pagesize: 6
            }
            let data = await this.$store.dispatch('ka_edu/getzixun', params)
            if (data && data.status === '100') {
                this.zixunArr = data.data.msg
            }
        },
        pageInit () {
            // 请求当前数据
            this.zixunmsg()
            this.zixun_handleCurrentChange()
        }
    },
    watch: {
    },
    computed: {
    },
    async mounted () {
        if (this.$route.params && this.$route.params.id) {
            this.id = this.$route.params.id.replace(/\$/g, '/')
        }
        this.pageInit()
    }
}
</script>
<style lang="less" type="text/less">
.wrap1000 {
  margin: 0 auto;
  width: 95%;
  padding: 0 5px;
  max-width: 1200px;
}
.content {
  padding: 20px 12px;
  background-color: #fff;
  box-sizing: border-box;
  position: relative;
  margin: 0 auto;
  min-width: 1000px;
  width: 90%;
  height: auto;
  .conL-box {
    float: left;
    padding-right: 345px;
    max-width: 800px;
    .conL {
      margin-right: 355px;
      position: relative;
      height: auto !important;
      width: 100%;
      .article {
        height: auto !important;
        .f-f0 {
          font-family: "Microsoft YaHei", "Helvetica", "sans-serif";
        }
        .title1 {
          width: 100%;
          font-size: 22px;
          color: #2a2a2a;
          line-height: 30px;
          margin-bottom: 15px;
          overflow: hidden;
        }
        .art_xin {
          width: 100%;
          height: 26px;
          border-bottom: 1px solid #e5e5e5;
          p {
            float: left;
            line-height: 26px;
            color: #9f9f9f;
            font-size: 12px;
            margin-right: 20px;
          }
        }
        .air_con {
          width: 100%;
          height: auto !important;
          margin-top: 15px;
          overflow: hidden;
          line-height: 30px;
          font-size: 14px;
          color: #333;
          font-size: 16px;
          letter-spacing: 0.5px;
          p {
            line-height: 30px;
            font-size: 14px;
            color: #333;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
  .mainR {
    width: 320px;
    height: auto;
    padding-top: 20px;
    position: relative;
    margin-left: -320px;
    .r_news {
      width: 320px;
      height: 225px;
      .title3 {
        background: url(http://www.xdf.cn/zhuanti/toefl/public/img/index_bg.png)
          no-repeat 0 -342px;
        height: 32px;
        border-bottom: 1px solid #98dfd2;
        padding-left: 10px;
        font-size: 18px;
        color: #333;
        line-height: 23px;
        margin-bottom: 17px;
      }
      ul {
        width: 300px;
        max-height: 170px;
        overflow: hidden;
        max-height: 170px;
        overflow: hidden;
        background: url(http://www.xdf.cn/zhuanti/toefl/public/img/index_bg.png)
          no-repeat 0 -400px;
        padding-left: 20px;
        li {
          width: 300px;
          height: 18px;
          line-height: 18px;
          margin-bottom: 10px;
          font-size: 12px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          a {
            color: #333;
          }
        }
      }
    }
    .ad2 {
      width: 320px;
      height: 250px;
      margin-bottom: 20px;
      overflow: hidden;
    }
  }
  .floatR {
    float: right;
  }
}
</style>

