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
            <ul
              class="clearfix"
              v-if="meitumsg"
            >
              <li v-for="(item,index) in meitumsg.nextPageMsg.nextkutu">
                <a href="javascript:;">
                  <img
                    :src="item"
                    style="display: inline;"
                  >
                  <p>{{ meitumsg.nextPageMsg.nextdesc }}</p>
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
export default {
  data() {
    return {
      meitumsg: null
    }
  },
  methods: {
    jump2msg(item) {
      delete item.picLink
      delete item._id
      localStorage.setItem('meitu', JSON.stringify(item))
      this.$router.push('/meitumsg')
    }
  },
  mounted() {
    if (localStorage.getItem('meitu')) {
      this.meitumsg = JSON.parse(localStorage.getItem('meitu'))
    } else {
      this.$router.push('/meitu')
    }
  },
  destroyed() {
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

