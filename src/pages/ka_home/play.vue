<template>
  <div class="test">
    <p class="ka_tips">温馨提示：如果当前打不开，可以选择换个线路~</p>
    <div class="iframeBox">
      <iframe
        class="iframeStyle"
        :src="currSrc"
        frameborder="0"
        allowfullscreen="allowfullscreen"
        mozallowfullscreen="mozallowfullscreen"
        msallowfullscreen="msallowfullscreen"
        oallowfullscreen="oallowfullscreen"
        webkitallowfullscreen="webkitallowfullscreen"
      >
      </iframe>
    </div>
    <div class="moreLine">
      <span>更多线路选择 : &nbsp;</span>
      <el-button @click="changeLine(1)" type="primary" size="small">1</el-button>
      <el-button @click="changeLine(2)" type="primary" size="small">2</el-button>
      <el-button @click="changeLine(3)" type="primary" size="small">3</el-button>
      <el-button @click="changeLine(4)" type="primary" size="small">4</el-button>
      <el-button @click="changeLine(5)" type="primary" size="small">5</el-button>
      <el-button @click="changeLine(6)" type="primary" size="small">6</el-button>
      <el-button @click="changeLine(7)" type="primary" size="small">7</el-button>
      <el-button @click="changeLine(8)" type="primary" size="small">8</el-button>
      <el-button @click="changeLine(9)" type="primary" size="small">10</el-button>
      <el-button @click="changeLine(10)" type="primary" size="small">乐视专用</el-button>
    </div>
    <div class="logos_lists_box">
      <ul class="logos_lists clearfix">
        <li>
          <p>
            <a href="http://www.iqiyi.com/" target="_blank"><img src="../../assets/images/otherLog/aqylogo.png"/></a>
          </p>
          <span>爱奇艺视频</span>
        </li>
        <li>
          <p>
            <a href="http://www.youku.com/" target="_blank"><img src="../../assets/images/otherLog/youkulogo.png"/></a>
          </p>
          <span>优酷视频</span>
        </li>
        <li>
          <p>
            <a href="http://www.le.com/" target="_blank"><img src="../../assets/images/otherLog/letvlogo.png"/></a>
          </p>
          <span>乐视TV视频</span>
        </li>
        <li>
          <p>
            <a href="http://v.qq.com/" target="_blank"><img src="../../assets/images/otherLog/qqlogo.png"/></a>
          </p>
          <span>腾讯视频</span>
        </li>
        <li>
          <p>
            <a href="http://www.tudou.com/" target="_blank"><img src="../../assets/images/otherLog/tudoulogo.png"/></a>
          </p>
          <span>土豆视频</span>
        </li>
        <li>
          <p>
            <a href="http://tv.sohu.com/" target="_blank"><img src="../../assets/images/otherLog/sohulogo.png"/></a>
          </p>
          <span>搜狐视频</span>
        </li>
        <li>
          <p>
            <a href="http://www.56.com/" target="_blank"><img src="../../assets/images/otherLog/56logo.png"/></a>
          </p>
          <span>56视频</span>
        </li>
        <li>
          <p>
            <a href="http://www.wasu.cn/" target="_blank"><img src="../../assets/images/otherLog/wasulogo.png"/></a>
          </p>
          <span>WASU华数视频</span>
        </li>
        <li>
          <p>
            <a href="http://www.mgtv.com/" target="_blank"><img src="../../assets/images/otherLog/hunantvlogo.png"/></a>
          </p>
          <span>芒果TV视频</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currSrc: '//wq114.org:88/yun.php?url=https://www.iqiyi.com/v_19rr6l5770.html',
      consoleTime: null,
      playMore: {
        play1: '//17kyun.com/api.php?url=',
        play2: '//beaacc.com/api.php?url=',
        play3: '//jx.km58.top/jx/?url=',
        play4: '//www.cmys.tv/?url=', // 不是很高清 可以看电视
        play5: '//api.kf4.cc/?url=', // 不是很高清 有点差
        play6: '//cdn.yangju.vip/k/?url=', //
        play7: '//beaacc.com/api.php?url=', //
        play8: '//jx.ejiafarm.com/dy.php?url=', //
        play9: '//jx.aeidu.cn/index.php?url=', //
        play10: '//beaacc.com/api.php?url=' // 乐视专用
      }
    }
  },
  watch: {},
  methods: {
    changeLine(num) {
      this.currSrc = this.playMore['play' + num] + decodeURIComponent(localStorage.getItem('nowUrl'))
    }
  },
  computed: {},
  components: {},
  mounted() {
    let num = parseInt(Math.random() * 10) + 1
    if (this.$route.params && this.$route.params.urlVal) {
      localStorage.setItem('nowUrl', this.$route.params.urlVal)
    }
    if (localStorage.getItem('nowUrl').indexOf('http') > -1) {
      this.currSrc = this.playMore['play' + num] + decodeURIComponent(localStorage.getItem('nowUrl'))
      console.log(this.currSrc)
      history.replaceState({}, '', `${location.origin}/play/`)
    } else {
      this.$error('请输入正确的播放链接')
    }
    setTimeout(() => {
      console.clear()
      console.log('%c欢迎访问 katoto.cn', 'background:blue; color:white; font-size:16px')
      console.log('想看代码？源码？联系')
      setTimeout(() => {
        console.clear()
        console.log('%c欢迎访问 katoto.cn', 'background:blue; color:white; font-size:16px')
        console.log('想看代码？源码？联系')
      }, 1000)
    }, 500)
  }
}
</script>

<style lang="less" scope type="text/less">
@import '../../styles/lib-media.less';
.iframeBox {
  width: 100%;
  padding-bottom: 10px;
}
.iframeStyle {
  display: block;
  height: 500px;
  width: 800px;
  margin: 0 auto;
  border: 1px solid transparent;
}
.ka_tips {
  padding: 16px 0;
  text-align: center;
}
.moreLine {
  text-align: center;
  margin-bottom: 15px;
}
.logos_lists_box {
  width: 88%;
  margin: 20px auto;
  .logos_lists li {
    float: left;
    position: relative;
    padding: 16px 14px;
    margin: 10px;
    background: #fff;
    border: 1px solid #ededed;
    border-radius: 5px;
    transition: border linear 0.2s, box-shadow linear 0.2s;
    a {
      display: inline-block;
      img {
        display: inline-block;
        width: 80px;
      }
    }
    span {
      display: none;
      color: #262626;
    }
    &:hover {
      border-color: rgba(82, 168, 236, 0.8);
      outline: 0;
      -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
      -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
    }
  }
}
/* xs超小屏幕（手机，最大 480） */
@media (max-width: @screen-phone) {
  .iframeStyle {
    width: 100%;
    margin: 0 auto;
  }
  .ka_tips {
    padding: 4px 0;
  }
  .moreLine {
    margin-bottom: 4px;
    .el-button {
      margin-bottom: 8px;
    }
  }
}
</style>
