<template>
  <div>
    <div class="containbox">
      <div class="container navHead">
        <h1>超级美图</h1>
        <span class="visible-pc">每日热点美图</span>
      </div>
    </div>
    <div class="container">
      <div class="list_cont list_cont2 w1180">
        <div class="tab_zt">
          <div class="tab_box">
            <ul class="clearfix">
              <li
                v-for="(item,index) in meitu"
                @click="jump2msg(item)" :key="index"
              >
                <a href="javascript:;">
                  <img
                    :src="item.pic"
                    :alt="item.desc"
                    style="display: inline;"
                  >
                  <p>{{ item.desc }}</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { structDom } from '~common/util'
export default {
    data () {
        return {
            currPage: 1,
            isLoading: false,
            pagesize: 15,
            meitu: []
        }
    },
    methods: {
        jump2msg (item) {
            delete item.picLink
            delete item._id
            localStorage.setItem('meitu', JSON.stringify(item))
            this.$router.push('/meitumsg')
        },
        async pageMsg (pageno = 1) {
            let params = {
                pageno,
                pagesize: this.pagesize
            }
            let data = await this.$store.dispatch('ka_meitu/getKutulist', params)
            if (data && data.data && data.data.msg) {
                if (data.data.msg.length > 0) {
                    this.meitu = this.meitu.concat(data.data.msg)
                    this.isLoading = false
                }
            }
        },
        getScrollTop () {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
            return scrollTop
        },
        scrollGet () {
            let bottomHei = (document.documentElement.offsetHeight - this.getScrollTop() - window.innerHeight) <= 350
            if (!this.isLoading && bottomHei) {
                this.isLoading = true
                this.currPage = this.currPage + 1
                this.pageMsg(this.currPage)
            }
        }
    },
    mounted () {
        this.pageMsg()
        document.addEventListener('scroll', this.scrollGet, true)
        structDom('meitu')
    },
    destroyed () {
        window.removeEventListener('scroll', this.scrollGet, true)
    }
}
</script>
<style scoped lang="less" type="text/less">
@import "../../styles/lib-media.less";
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
// 美图
.list_cont2 {
  .tab_box {
    li {
      height: 400px;
      a {
        height: 330px;
      }
    }
  }
}
.list_cont {
  position: relative;
  .tab_box {
    ul {
      margin: 0 0 0 -20px;
      li {
        float: left;
        margin: 0 0 20px 20px;
        width: 220px;
        p {
          position: absolute;
          left: 0;
          bottom: -70px;
          line-height: 70px;
          height: 70px;
          overflow: hidden;
          padding: 0 10px;
          background-color: #fff;
          color: #666666;
          font-size: 14px;
          width: 100%;
          text-align: center;
        }
        a {
          display: block;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        &:hover {
          -moz-box-shadow: 5px 5px 10px #ccc;
          -webkit-box-shadow: 5px 5px 10px #ccc;
          box-shadow: 5px 5px 10px #ccc;
        }
      }
    }
  }
}

.w1180 {
  width: 1180px;
  margin: 0 auto 20px;
}

/* xs超小屏幕（手机，最大 480） */
@media (max-width: @screen-phone) {
  // 美图
  .list_cont2 {
    .tab_box {
      li {
        height: auto;
        a {
          height: 330px;
        }
      }
    }
  }

  .list_cont {
    position: relative;
    .tab_box {
      ul {
        overflow: hidden;
        padding: 0 10px;
        margin: 0;
        li {
          float: left;
          width: 33.33%;
          margin: 0 0 8px 0;
          p {
            position: absolute;
            left: 0;
            bottom: 0;
            line-height: 20px;
            height: auto;
            padding: 0 10px;
            background-color: #fff;
            color: #666666;
            font-size: 14px;
            width: 100%;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          a {
            display: block;
            margin: 0 3px;
            height: 0;
            padding-bottom: 144%;
            overflow: hidden;
            img {
              height: auto;
              width: 100%;
            }
          }
        }
      }
    }
  }
  .w1180 {
    width: 100%;
    margin: 0 auto 20px;
  }
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
}
</style>

