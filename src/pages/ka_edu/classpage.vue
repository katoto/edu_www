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
                      :to="{path:`/artdetail/${item._id.replace(/\//g,'$')}`}"
                      target="_blank"
                      :title="item.titleName"
                      v-html="item.titleName"
                    >
                    </router-link>
                  </p>
                  <div class="list-rt-tag-box sm-tips-font visible-pc">
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
        <div class="container-half zlzj-box h5_ctrl">
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
                      :to="{path:`/artdetail/${item._id.replace(/\//g,'$')}`}"
                      target="_blank"
                      :title="item.titleName"
                      v-html="item.titleName"
                    >
                    </router-link>
                  </p>
                  <div class="list-rt-tag-box sm-tips-font visible-pc">
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
                        :to="{path:`/artdetail/${item._id.replace(/\//g,'$')}`}"
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
                  <div class="list-rt-tag-box sm-tips-font visible-pc">
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
        <div class="container-half zlzj-box h5_ctrl">
          <span class="title-tips">更多精彩</span>
          <div class="list-table-wrap">
            <img
              src="../../../static/eduImg/tegs.jpg"
              alt=""
            >
            <img
              class="h5_ctrl2 visible-pc"
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
            zixun_pageSize: 11,
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
                this.zixunArr.unshift({
                    artLy: '新华社',
                    artmsg: `<p><strong>今日头条极速版邀请码：CJ8L4QKV 最新2019今日头条极速版邀请码，有三元，看新闻、看资讯赚钱。</strong></p> <p>
              　　现在<strong>看新闻赚零花钱</strong>的手机软件越来越多，许多知名互联网公司也纷纷加入，像：搜狐、凤凰新闻等。今日头条也砸钱加入了这一行列。经实测，使用今日头条极速版填写我的邀请码 <strong> CJ8L4QKV </strong> 确实可以得到三元现金红包，可以直接提现，目前小伙伴们已经通过我的邀请码得到了现金红包了，大家去速度参与！下图是我的收益，快快复制试一试：
              <img src="//user-gold-cdn.xitu.io/2019/3/21/169a0bca0bc139c5?w=750&amp;h=1334&amp;f=jpeg&amp;s=70812" style="display: inline-block; width: 340px;">&nbsp;&nbsp;&nbsp;&nbsp;
              <img src="//user-gold-cdn.xitu.io/2019/3/21/169a0bc525a2608b?w=750&amp;h=1334&amp;f=jpeg&amp;s=67674" style="display: inline-block; width: 340px;"></p> <p>
              　　今日头条凭借着“你关心的，才是头条”这一重大创新，将资讯推荐的智能引擎发挥到了极致，同时也俘获了亿级的用户，<strong>头条系产品与腾讯战火再起</strong>, 让今日头条APP成为移动互联网时代资讯类APP。以前都是人找资讯，在这个信息大爆炸的时代，已经成为了资讯“找”人，使用今日头条APP，会根据你的阅读习惯给你智能推荐你关心的资讯信息，也就是说你打开今日头条，看到的都是你想看的。今日头条非常好用，小编已经卸载掉了新浪新闻那些“传统”的新闻APP，不过小编也发现更好的今日头条APP，那就是今日头条极速版，看新闻、看资讯赚钱。
            </p> <p>
              　　今日头条极速版是什么？其实就是今日头条的简化版，去除了很多冗余的功能，让我们看新闻资讯更加流畅。同时还增加了一个赚钱的功能，同样都是看新闻，使用今日头条极速版还能赚金币，金币就可以直接兑换成钱。不知道大家发现没有，使用今日头条极速版的时候，有一个输入邀请码的地方，而且输入就能直接得到3元现金，快快扫描下图二维码！

              <img src="//user-gold-cdn.xitu.io/2019/3/21/169a0bc893dfc6f2?w=750&amp;h=1334&amp;f=jpeg&amp;s=105831" style="display: inline-block; width: 340px;"> <img src="//user-gold-cdn.xitu.io/2019/3/21/169a0bc6f39450f8?w=750&amp;h=1334&amp;f=jpeg&amp;s=85558" style="display: inline-block; width: 340px;"></p> <p>
              点击进入【任务列表】，找到【输入邀请码】。直接填写 <strong> CJ8L4QKV </strong> 即可获得3元现金奖励。
            </p> <p>
              为什么输入邀请码提示错误？提示邀请码输入错误可能由以下原因造成：
              <ul style="padding-left: 36px;"><li> 1、好友未正确输入您分享的邀请码；</li> <li> 2、本人输入了自己的邀请码；</li> <li> 3、您邀请的徒弟未在使用新手机和新帐号的10天内输入邀请码；</li> <li>4、您邀请的好友已经跟其他用户有了师徒关系。</li></ul></p> <p><strong>今日头条极速版填写邀请码的步骤：</strong> <ul style="padding-left: 36px;"><li> 1、若是想在今日头条极速版里面填写邀请码<strong> CJ8L4QKV </strong>，大家需要从主页的右下角点击任务按钮，进入任务中心，从列表里找到“输入邀请码”的功能。<br> <img src="//www.haotui.net/res/2018/12-14/21/a49dedea7ac7cea928aba8e0af890d6b.png" style="display: inline-block; width: 340px;">&nbsp;&nbsp;&nbsp;&nbsp;
                  <img src="//www.haotui.net/res/2018/12-01/21/2eee0844e456a13d5a994555b48bfb46.png" style="display: inline-block; width: 340px;"></li> <li> 2、进入到输入邀请码的页面之后，填写邀请码<strong> CJ8L4QKV </strong>进行提交，就可以成功领取3元红包了。</li> <li> 3、对此感兴趣的朋友还可以通过“邀请好友”功能复制自己的邀请码，让其他人注册今日头条极速版并填写邀请码，就可以获得现金收益哦!</li></ul>
              以上就是小编为大家带来的额外收入的内容。
            </p>`,
                    titleLink: 'CJ8L4QKV 最新2019今日头条极速版邀请码',
                    titleName: 'CJ8L4QKV 最新2019今日头条极速版邀请码，有三元！今日头条极速版邀请码',
                    titletime: new Date(),
                    _id: '201988/888888'
                })
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

<style lang="less" type="text/less">
.h5_ctrl {
  position: relative;
  margin-left: 40px;
}
.h5_ctrl2 {
  margin-left: 38px;
}
.pagination {
  text-align: center;
  margin-top: 20px;
}
.topImg {
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  width: 100%;
  img {
    display: block;
    width: 100%;
  }
}
// ======== 课程 ========
.main-row-box {
  background: #fff;
  clear: both;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  margin-top: 20px;
  padding-top: 24px;
  padding-bottom: 30px;
  .container-half {
    max-width: 570px;
    width: 100%;
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
            max-width: 468px;
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
          max-width: 468px;
          width: 70%;
          a {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .date {
          width: 72px;
        }
        .title {
          float: left;
          width: 76%;
          a {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        li {
          a {
            display: inline-block;
            // float: left;
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
  //   width: 1200px;
  max-width: 1200px;
  width: 100%;
  min-height: 220px;
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
// h5
@media (max-width: 992px) {
  .h5_ctrl {
    position: relative;
    margin-left: 0px;
    margin-top: 20px;
  }
  .h5_ctrl2 {
    margin-left: 0px;
  }
  .seat {
    .seat-mt {
      height: 58px;
      strong {
        margin-top: 14px;
      }
    }
    .seat-nav {
      margin-left: 40px;
      float: left;
      padding-top: 12px;
    }
  }
  .daily-zy {
    .seat-mc {
      position: relative;
      overflow: hidden;
      .seat-list {
        li {
          width: 340px;
          padding-bottom: 14px;
        }
      }
    }
  }
}
</style>
