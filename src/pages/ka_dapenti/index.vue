<template>
  <div>
    <div class="containbox">
      <div class="container navHead">
        <h1>热门图卦</h1>
        <span class="visible-pc">每日热点图卦</span>
      </div>
    </div>
    <div class="container">
      <ul class="content">
        <li v-for="(item, index) in dapenti" :class="{ colorline: index % 2 }" :key="index" @click="jump2msg(item)">
          <a href="javascript:;">{{ item.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { structDom } from '@/common/util.js'
export default {
  data() {
    return {
      currPage: 1,
      isLoading: false,
      pagesize: 24,
      dapenti: []
    }
  },
  methods: {
    jump2msg(item) {
      delete item.baseDesc
      localStorage.setItem('dapenti', JSON.stringify(item))
      this.$router.push(item.titleLink)
    },
    async pageMsg(pageno = 1) {
      let params = {
        pageno,
        pagesize: this.pagesize
      }
      let data = await this.$store.dispatch('ka_dapenti/getdapentilist', params)
      if (data && data.data && data.data.msg) {
        if (data.data.msg.length > 0) {
          data.data.msg.forEach((item, index) => {
            if (item) {
              if (item.title) {
                item.title = item.title.replace('katoto', '')
              }
              if (item.titleLink) {
                item.titleLink = '/dapentimsg/' + item._id
              }
            }
          })
          this.dapenti = this.dapenti.concat(data.data.msg)
          this.isLoading = false
        }
      }
    },
    getScrollTop() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      return scrollTop
    },
    scrollGet() {
      let bottomHei = document.documentElement.offsetHeight - this.getScrollTop() - window.innerHeight <= 350
      if (!this.isLoading && bottomHei) {
        this.isLoading = true
        this.currPage = this.currPage + 1
        this.pageMsg(this.currPage)
      }
    }
  },
  mounted() {
    this.pageMsg()
    document.addEventListener('scroll', this.scrollGet, true)
    structDom('图卦')
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollGet, true)
  }
}
</script>
<style scoped lang="less" type="text/less">
@import '../../styles/lib-media.less';

.containbox {
  .navHead {
    padding: 20px 0;
    h1 {
      font-size: 26px;
      line-height: 32px;
      text-align: left;
      font-weight: 600;
    }
  }
}
// 图摘样式
.content {
  position: relative;
  overflow: hidden;
  display: block;
  margin-bottom: 25px;
  background: #fff;
  -webkit-box-shadow: 0 2px 5px 0 rgba(146, 146, 146, 0.1);
  -moz-box-shadow: 0 2px 5px 0 rgba(146, 146, 146, 0.1);
  box-shadow: 0 2px 5px 0 rgba(146, 146, 146, 0.1);
  -webkit-transition: all 0.6s ease;
  -moz-transition: all 0.6s ease;
  -o-transition: all 0.6s ease;
  transition: all 0.6s ease;
  padding: 23px 20px;
  li {
    &.colorline {
      a {
        color: #66cde7;
      }
    }
    line-height: 28px;
    font-size: 16px;
    &:hover {
      filter: brightness(1.4);
    }
  }
  &:hover {
    -webkit-box-shadow: 0 2px 5px 0 rgba(146, 146, 146, 0.1);
    -moz-box-shadow: 0 2px 5px 0 rgba(146, 146, 146, 0.1);
    box-shadow: 0 8px 25px 0 rgba(146, 146, 146, 0.21);
  }
}
a {
  color: #48494d;
  text-decoration: none;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  cursor: pointer;
}
/* xs超小屏幕（手机，最大 480） */
@media (max-width: @screen-phone) {
  .containbox {
    border-bottom: 0;
    .navHead {
      padding: 10px 0;
      h1 {
        font-size: 20px;
        line-height: 24px;
        text-align: left;
        font-weight: 600;
      }
    }
  }
  .content {
    margin-bottom: 12px;
    padding: 13px 10px;
  }
}
</style>
