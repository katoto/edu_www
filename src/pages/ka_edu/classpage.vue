<template>
  <div class="eduContain">
    <div class="topImg">
      <img :src="topMonthImg">
    </div>
    <section>
      <div class="seat daily-zy">
        <div class="seat-mt">
          <strong><i class="icon"></i>每日推荐</strong>
          <div class="seat-nav">
            <a
              :class="{'active':!isActive}"
              @click="zixun_handleCurrentChange('one')"
            >热门推荐</a>
            <a
              :class="{'active':isActive}"
              @click="zixun_handleCurrentChange('two')"
            >精选推荐</a>
          </div>
        </div>
        <div
          class="seat-mc daily-zy-bd"
          style="display: block;"
        >
          <ul
            class="seat-list clearfix"
            _num="18"
          >
            <li
              v-for="(item,index) in zixunArr"
              :key="index"
            >
              <router-link :to="{path:`/edumsg/${item._id.replace(/\//g,'$')}`}">
                <b></b>{{ item.titleName }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section>
      <div class="main-row-box section-djtj clearfix">
        <div class="container-half djtj-box">
          <span class="title-tips">{{ currClassNum | classNameFn }}语文</span>
          <div class="list-table-wrap">
            <ul class="djtj-news-list ">
              <li
                v-for="(item,index) in yuwenArr"
                :key="index"
                class="clearfix"
                :class="{'djtj-news-title': index === 0 }"
              >
                <template v-if="index === 0">
                  <img
                    src="http://zxxkstatic.zxxk.com/zxxk/skins/images/jingxuan.png"
                    class="exam-title-thumb fl"
                    alt=""
                  >
                  <div class="exam-title-box fl">
                    <p>
                      <a
                        :href="item.titleLink"
                        :title="item.titleName"
                        target="_blank"
                        v-html="item.titleName"
                      >
                      </a>
                    </p>
                    <p class="author-date">
                      <span class="sm-tips-font">{{ currClassNum | classNameFn }}</span>
                      <span class="sm-tips-font fr">{{ item._id.slice(0, -5) }}</span>
                    </p>
                  </div>
                </template>
                <template v-else>
                  <div class="sm-tips-font fl red date">
                    {{ item._id.slice(0, -5) }}
                  </div>
                  <p class="title">
                    <router-link
                      :to="{path:`/artdetail/${currClassNum}_Yuwen_${item._id.replace(/\//g,'$')}`}"
                      target="_blank"
                      :title="item.titleName"
                      v-html="item.titleName"
                    >
                    </router-link>
                  </p>
                  <div class="list-rt-tag-box sm-tips-font">
                    <span class="djtj-tag">{{ currClassNum | classNameFn }}</span>
                    <span class="vertical-line"></span>
                  </div>
                </template>
              </li>
            </ul>
          </div>
          <div class="pagination">
            <el-pagination
              @current-change="yuwen_handleCurrentChange"
              background
              :current-page.sync="yuwen_pageno"
              size="small"
              :page-size="yuwen_pageSize"
              layout="prev, pager, next"
              :page-count="yuwen_PageTotal"
              :next-text="'下一页'"
              :prev-text="'上一页'"
            >
            </el-pagination>
          </div>
        </div>
        <div
          class="container-half zlzj-box"
          style="position: relative;margin-left: 40px;"
        >
          <span class="title-tips">{{ currClassNum | classNameFn }}数学</span>
          <div class="list-table-wrap">
            <ul class="djtj-news-list ">
              <li
                v-for="(item,index) in shuxueArr"
                :key="index"
                class="clearfix"
                :class="{'djtj-news-title': index === 0 }"
              >
                <template v-if="index === 0">
                  <img
                    src="http://zxxkstatic.zxxk.com/zxxk/skins/images/jingxuan.png"
                    class="exam-title-thumb fl"
                    alt=""
                  >
                  <div class="exam-title-box fl">
                    <p>
                      <a
                        :href="item.titleLink"
                        :title="item.titleName"
                        target="_blank"
                        v-html="item.titleName"
                      >
                      </a>
                    </p>
                    <p class="author-date">
                      <span class="sm-tips-font">{{ currClassNum | classNameFn }}</span>
                      <span class="sm-tips-font fr">{{ item._id.slice(0, -5) }}</span>
                    </p>
                  </div>
                </template>
                <template v-else>
                  <div class="sm-tips-font fl red date">
                    {{ item._id.slice(0, -5) }}
                  </div>
                  <p class="title">
                    <router-link
                      :to="{path:`/artdetail/${currClassNum}_Shuxue_${item._id.replace(/\//g,'$')}`}"
                      target="_blank"
                      :title="item.titleName"
                      v-html="item.titleName"
                    >
                    </router-link>
                  </p>
                  <div class="list-rt-tag-box sm-tips-font">
                    <span class="djtj-tag">{{ currClassNum | classNameFn }}</span>
                    <span class="vertical-line"></span>
                  </div>
                </template>
              </li>
            </ul>
          </div>
          <div class="pagination">
            <el-pagination
              @current-change="shuxue_handleCurrentChange"
              background
              :current-page.sync="shuxue_pageno"
              size="small"
              :page-size="shuxue_pageSize"
              layout="prev, pager, next"
              :page-count="shuxue_PageTotal"
              :next-text="'下一页'"
              :prev-text="'上一页'"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="main-row-box section-djtj clearfix">
        <div class="container-half djtj-box">
          <span class="title-tips">{{ currClassNum | classNameFn }}英语</span>
          <div class="list-table-wrap">
            <ul class="djtj-news-list ">
              <li
                v-for="(item,index) in yingyuArr"
                :key="index"
                class="clearfix"
                :class="{'djtj-news-title': index === 0 }"
              >
                <template v-if="index === 0">
                  <img
                    src="http://zxxkstatic.zxxk.com/zxxk/skins/images/jingxuan.png"
                    class="exam-title-thumb fl"
                    alt=""
                  >
                  <div class="exam-title-box fl">
                    <p>
                    <router-link
                      :to="{path:`/artdetail/${currClassNum}_Yingyu_${item._id.replace(/\//g,'$')}`}"
                      target="_blank"
                      :title="item.titleName"
                      v-html="item.titleName"
                    >
                    </router-link>
                    </p>
                    <p class="author-date">
                      <span class="sm-tips-font">{{ currClassNum | classNameFn }}</span>
                      <span class="sm-tips-font fr">{{ item._id.slice(0, -5) }}</span>
                    </p>
                  </div>
                </template>
                <template v-else>
                  <div class="sm-tips-font fl red date">
                    {{ item._id.slice(0, -5) }}
                  </div>
                  <p class="title">
                    <a
                      :href="item.titleLink"
                      :title="item.titleName"
                      target="_blank"
                      v-html="item.titleName"
                    ></a>
                  </p>
                  <div class="list-rt-tag-box sm-tips-font">
                    <span class="djtj-tag">{{ currClassNum | classNameFn }}</span>
                    <span class="vertical-line"></span>
                  </div>
                </template>
              </li>
            </ul>
          </div>
          <div class="pagination">
            <el-pagination
              @current-change="yingyu_handleCurrentChange"
              background
              :current-page.sync="yingyu_pageno"
              size="small"
              :page-size="yingyu_pageSize"
              layout="prev, pager, next"
              :page-count="yingyu_PageTotal"
              :next-text="'下一页'"
              :prev-text="'上一页'"
            >
            </el-pagination>
          </div>
        </div>
        <div
          class="container-half zlzj-box"
          style="position: relative;margin-left: 40px;"
        >
          <span class="title-tips">更多精彩</span>
          <div class="list-table-wrap">
            <img
              src="../../../static/eduImg/tegs.jpg"
              alt=""
            >
            <img
              style="margin-left:38px"
              src="../../../static/eduImg/kt5u.jpg"
              alt=""
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { isLog, defaultLanguage, isForbitPage, setCK, selfNotify } from '~common/util'
import HEAD from '~components/Head.vue'
import Footer from '~components/Footer.vue'
import ScrollTop from '~components/ScrollTop.vue'

export default {
    data () {
        return {
            isActive: false,
            isReady: false,
            showMovieHead: true,
            currClassNum: 'Class1',
            yingyu_pageno: 1,
            yingyu_pageSize: 12,
            yingyu_PageTotal: 2,
            yingyuArr: [],
            shuxue_pageno: 1,
            shuxue_pageSize: 12,
            shuxue_PageTotal: 2,
            shuxueArr: [],
            yuwen_pageno: 1,
            yuwen_pageSize: 12,
            yuwen_PageTotal: 2,
            yuwenArr: [],
            zixun_pageno: 1,
            zixun_pageSize: 12,
            zixun_PageTotal: 2,
            zixunArr: [],
            topMonthImg: '../../../static/eduImg/1.jpg'
        }
    },
    components: {
        HEAD,
        ScrollTop,
        Footer
    },
    methods: {
        selfNotify,
        async yingyu_handleCurrentChange (yingyu_pageno = this.yingyu_pageno) {
            let params = {
                pageno: yingyu_pageno,
                pagesize: this.yingyu_pageSize,
                className: this.currClassNum,
                xueke: 'Yingyu'
            }
            let data = await this.$store.dispatch('ka_edu/getClassMsg', params)
            if (data && data.status === '100') {
                this.yingyuArr = data.data.msg
                this.yingyu_PageTotal = data.data.totalPages
            }
        },
        async shuxue_handleCurrentChange (shuxue_pageno = this.shuxue_pageno) {
            let params = {
                pageno: shuxue_pageno,
                pagesize: this.shuxue_pageSize,
                className: this.currClassNum,
                xueke: 'Shuxue'
            }
            let data = await this.$store.dispatch('ka_edu/getClassMsg', params)
            if (data && data.status === '100') {
                this.shuxueArr = data.data.msg
                this.shuxue_PageTotal = data.data.totalPages
            }
        },
        async yuwen_handleCurrentChange (yuwen_pageno = this.yuwen_pageno) {
            let params = {
                pageno: yuwen_pageno,
                pagesize: this.yuwen_pageSize,
                className: this.currClassNum,
                xueke: 'Yuwen'
            }
            let data = await this.$store.dispatch('ka_edu/getClassMsg', params)
            if (data && data.status === '100') {
                this.yuwenArr = data.data.msg
                this.yuwen_PageTotal = data.data.totalPages
            }
        },
        async zixun_handleCurrentChange (tab = 'one') {
            let classnum = null
            if (this.$route.params.classNum) {
                classnum = parseFloat(this.$route.params.classNum.replace('Class', ''))
            } else {
                classnum = 1
            }
            let zixunPageno = 0
            if (tab === 'one') {
                // zixunPageno = classnum * 2 - 1
                zixunPageno = classnum
                this.isActive = false
            } else {
                zixunPageno = classnum + 1
                this.isActive = true
            }
            let params = {
                pageno: zixunPageno,
                pagesize: this.zixun_pageSize
            }
            let data = await this.$store.dispatch('ka_edu/getzixun', params)
            if (data && data.status === '100') {
                this.zixunArr = data.data.msg
                this.zixun_PageTotal = data.data.totalPages
            }
        },
        async pageInit () {
            // 请求当前年级数据
            this.yingyu_handleCurrentChange()
            this.shuxue_handleCurrentChange()
            this.yuwen_handleCurrentChange()
            this.zixun_handleCurrentChange()
        }
    },
    watch: {
        $route (to, from) {
            if (this.$route.params && this.$route.params.classNum) {
                this.currClassNum = this.$route.params.classNum
            }
            this.pageInit()
        }
    },
    computed: {
    },
    async mounted () {
        if (this.$route.params && this.$route.params.classNum) {
            this.currClassNum = this.$route.params.classNum
        }
        this.pageInit()
        this.topMonthImg = '../../../static/eduImg/' + (new Date().getMonth() + 1) + '.jpg'
    },
    filters: {
        classNameFn (classStr) {
            if (!classStr) classStr = '一年级'
            switch (classStr) {
            case 'Class1': return '一年级'
            case 'Class2': return '二年级'
            case 'Class3': return '三年级'
            case 'Class4': return '四年级'
            case 'Class5': return '五年级'
            case 'Class6': return '六年级'
            }
        }
    }
}
</script>
<style lang="less">
</style>

<style lang="less" type="text/less">
.pagination {
  text-align: center;
  margin-top: 20px;
}
.topImg {
  margin-left: auto;
  margin-right: auto;
  width: 1200px;
  img {
    display: block;
    width: 100%;
  }
}
// ======== 课程 ========
.main-row-box {
  background: #fff;
  clear: both;
  width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  padding-top: 24px;
  padding-bottom: 30px;
  .container-half {
    width: 570px;
    margin-left: 0px;
    float: left;
    .title-tips {
      height: 40px;
      margin: 0 0 15px;
      border-left: 3px solid #0d75d9;
      font-size: 22px;
      color: #057ee1;
      padding-left: 17px;
    }
    .list-table-wrap {
      padding-left: 20px;
      margin-top: 15px;
      min-height: 302px;
      .djtj-news-list {
        .djtj-news-title {
          min-height: 52px;
          margin-bottom: 20px;
          font-size: 16px;
          line-height: 26px;
          a {
            width: 468px;
            font-weight: 600;
          }
        }
        .author-date {
          padding: 6px 0 2px;
          clear: both;
        }
        .exam-title-thumb {
          width: 62px;
          height: 62px;
          float: left;
          border-radius: 5px;
        }
        .exam-title-box {
          float: left;
          margin-left: 20px;
          width: 468px;
        }
        .date {
          width: 72px;
        }
        .title {
          float: left;
        }
        li {
          a {
            display: inline-block;
            float: left;
            &:hover {
              color: #2695ff;
            }
          }
        }
        .list-rt-tag-box {
          float: right;
        }
      }
    }
    .sm-tips-font {
      font-size: 12px;
      color: #a0a0a0;
      line-height: 19px;
    }
  }
}
.red {
  color: #ff0000 !important;
}
.vertical-line {
  display: inline-block;
  height: 16px;
  border-left: 1px solid #e6e6e6;
  margin: 2px 5px;
  float: right;
}
// ========每日推荐=========
.seat {
  margin-left: auto;
  margin-right: auto;
  width: 1200px;
  background: #fff;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  margin-top: 2px;
  .seat-mt {
    height: 83px;
    display: block;
    zoom: 1;
    position: relative;
    line-height: 24px;
    strong {
      font-size: 22px;
      font-weight: 400;
      float: left;
      height: 24px;
      margin-top: 30px;
      .icon {
        float: left;
        height: 22px;
        margin-top: 1px;
        margin-right: 16px;
        font-size: 0;
        border-left: 4px solid #2bbb61;
        width: 0;
      }
    }
  }
  .seat-nav {
    margin-left: 40px;
    float: left;
    padding-top: 26px;
    a {
      height: 24px;
      padding: 0 5px 4px 5px;
      border-bottom: 2px solid #fff;
      color: #333;
      font-size: 14px;
      margin-right: 20px;
      &.active {
        border-bottom: 2px solid #2bbb61;
        text-decoration: none;
        color: #2bbb61;
      }
      &:hover {
        border-bottom: 2px solid #2bbb61;
        text-decoration: none;
        color: #2bbb61;
      }
    }
  }
}
.daily-zy {
  .seat-mc {
    position: relative;
    overflow: hidden;
    .seat-list {
      line-height: 1;
      width: 100%;
      font-size: 14px;
      padding-left: 20px;
      padding-bottom: 8px;
      li {
        padding-bottom: 22px;
        width: 390px;
        float: left;
        overflow: hidden;
        word-break: keep-all;
        white-space: nowrap;
        text-overflow: ellipsis;
        b {
          float: left;
          width: 4px;
          height: 4px;
          font-size: 0;
          line-height: 0;
          background: #999;
          margin-right: 10px;
          margin-top: 5px;
          border-radius: 2px;
        }
      }
    }
  }
}
a {
  text-decoration: none;
  cursor: pointer;
  outline: 0;
  color: #333;
}
// ========end=========
</style>
