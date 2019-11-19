<template>
  <div class="row container" v-if="tuzhaimsg">
    <div class="article">
      <div v-if="storetuzhai" class="post-timthumb" :style="{ backgroundImage: 'url(' + storetuzhai.img + ')' }">
        <h1>
          {{ storetuzhai.titleName }}
        </h1>
      </div>
      <div class="post">
        <div class="post-title">
          <div class="post-entry-categories"></div>
          <div class="post_icon">
            <span class="postauthor">
              <img
                alt=""
                src="//qingniantuzhai.com/content/images/2018/02/1-140Z6094207.jpg"
                data-original="/content/images/2018/02/1-140Z6094207.jpg"
                class="avatar avatar-96 photo"
                height="96"
                width="96"
                style="display: inline-block;"
              />
              <a href="javascript:;">Chris</a>
            </span>
            <span class="postclock"> <i class="icon-clock-1"></i> 2019-01-26 </span>
            <span class="posteye"> <i class="icon-eye-4"></i> 12,627 </span>
          </div>
        </div>
        <!-- 主题内容 -->
        <div class="post-content" v-html="tuzhaimsg.artmsg"></div>
        <div class="post-declare" v-if="storetuzhai">
          <p>
            原创文章，作者：<a href="javascript:;">Chris</a>，
            {{ storetuzhai.titleName }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tuzhaimsg: null,
      currid: null,
      storetuzhai: null
    }
  },
  methods: {
    async pageMsg(id = '/qing-nian-tu-zhai-0103-2/') {
      let data = await this.$store.dispatch('ka_tuzhai/getTuzhaimsg', id)
      if (data && data.data && data.data.msg) {
        this.tuzhaimsg = data.data.msg
      }
    }
  },
  mounted() {
    if (localStorage.getItem('tuzhai')) {
      this.storetuzhai = JSON.parse(localStorage.getItem('tuzhai'))
    } else {
      this.$router.push('/tuzhai')
    }
    if (this.$route.params && this.$route.params.tuzhaiid) {
      this.currid = this.$route.params.tuzhaiid.replace(/\$/g, '/')
    }
    console.log(this.currid)
    console.log('======')
    console.log(this.storetuzhai)
    this.pageMsg(this.currid)
  },
  destroyed() {}
}
</script>
<style lang="less" type="text/less">
@import '../../styles/lib-media.less';
.post-content {
  p {
    font-size: 16px;
    line-height: 1.5;
    color: rgb(51, 153, 102);
    font-weight: bold;
  }
}
@media (max-width: @screen-phone) {
  .post-timthumb {
    height: 250px;
    h1 {
      padding: 20px 18px;
      font-size: 22px;
    }
  }
  .post-content {
    img {
      max-width: 100%;
      margin: 15px auto 30px 0;
      height: auto;
      display: block;
    }
  }
  .post {
    padding: 10px 8px;
  }
}
</style>

<style scoped lang="less" type="text/less">
@import '../../styles/lib-media.less';
.post-declare p {
  font-size: 15px;
  line-height: 1.5;
  color: #999;
  margin-bottom: 0;
}
.container {
  margin: 0 auto;
  min-height: 560px;
}
.post-timthumb {
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  height: 380px;
  position: relative;
  h1 {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 40px;
    color: #fff;
    font-size: 26px;
    letter-spacing: 2px;
    font-weight: 600;
    text-shadow: 0px 1px 4px #000;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    transition: all 0.2s ease;
    background-image: -webkit-linear-gradient(180deg, rgba(0, 0, 0, 0.01) 5%, rgba(0, 0, 0, 0.75) 100%);
    background-image: -moz-linear-gradient(180deg, rgba(0, 0, 0, 0.01) 5%, rgba(0, 0, 0, 0.75) 100%);
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.01) 0, rgba(0, 0, 0, 0.65) 100%);
  }
}
.post {
  padding: 30px 32px;
  min-height: 500px;
  background: #fff;
  margin-bottom: 20px;
  -webkit-box-shadow: 0 2px 5px 0 rgba(146, 146, 146, 0.1);
  -moz-box-shadow: 0 2px 5px 0 rgba(146, 146, 146, 0.1);
  box-shadow: 0 2px 5px 0 rgba(146, 146, 146, 0.1);
  .post-title {
    position: relative;
    padding: 0 0 24px;
    margin-bottom: 10px;
    border-bottom: 1px solid #e7e7e7;
    .post_icon {
      color: #748594;
      font-size: 13px;
      display: block;
      .postauthor {
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          -moz-border-radius: 50%;
          -webkit-border-radius: 50%;
          border: 1px solid rgba(216, 216, 216, 0.81);
          display: inline-block;
          margin-right: 10px;
          vertical-align: middle;
        }
      }
      span {
        margin-right: 10px;
        display: inline-block;
        position: relative;
      }
    }
  }
  .post-content {
    margin: 0 0 20px 0;
    line-height: 1.8;
    font-size: 16px;
    color: #3d464d;

    img {
      max-width: 100%;
      margin: 15px auto 30px 0;
      height: auto;
      display: block;
    }
  }
}

/* xs超小屏幕（手机，最大 480） */
@media (max-width: @screen-phone) {
  .container {
    margin: 0 auto;
    width: 98%;
  }
  .post-timthumb {
    height: 250px;
    h1 {
      padding: 20px 18px;
      font-size: 22px;
    }
  }
  .post-content {
    img {
      max-width: 100%;
      margin: 15px auto 30px 0;
      height: auto;
      display: block;
    }
  }
}
</style>
