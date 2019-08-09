<template>
  <div
    id="app"
    :class="{ready: isReady}"
  >
    <!-- <HEAD></HEAD>
    <section class="topImg">
    <ul ref="ulflxDom" v-if="ismobile" class="mobile-topflx" >
      <router-link tag='li' to="/eduIndex/Class1">
          小学一年级
        </router-link>
        <router-link tag='li' to="/eduIndex/Class2">
          小学二年级
        </router-link>
        <router-link tag='li' to="/eduIndex/Class3">
          小学三年级
        </router-link>
        <router-link tag='li' to="/eduIndex/Class4">
          小学四年级
        </router-link>
        <router-link tag='li' to="/eduIndex/Class5">
          小学五年级
        </router-link>
        <router-link tag='li' to="/eduIndex/Class6">
          小学六年级
        </router-link>
        <router-link tag='li' to="/tuzhai">
          图摘
        </router-link>
        <router-link tag='li' to="/meitu">
          K美图
        </router-link>
        <router-link tag='li' to="/htmlnav">
          前端猿导航
        </router-link>
        <router-link tag='li' to="/pmnav">
          产品狗导航
        </router-link>
        <router-link tag='li' to="/movie">
          看休闲
        </router-link>
      </ul>      
    </section> -->
    
    <!-- <div style="height:100px;width:100%">
      <p>翻译插件问题</p>
      <p>{{ _('Free Bouns{0} {1}', '哈哈', '啊啊') }}</p>
    </div> -->
    <router-view
      v-if="isReady"
      @click.native="initPop"
      class="page_all"
    />
    <!-- 返回顶部  -->
    <!--     -->
    <!-- <ScrollTop></ScrollTop>
    <Footer v-if="showMovieFoot"></Footer>
    <eduFooter v-else></eduFooter> -->
  </div>
</template>

<script>
import { isLog, defaultLanguage, isForbitPage, setCK, selfNotify, isMobile } from '~common/util'
import HEAD from '~components/Head.vue'
import Footer from '~components/Footer.vue'
import ScrollTop from '~components/ScrollTop.vue'
import eduHEAD from '~components/eduHead.vue'
import eduFooter from '~components/eduFooter.vue'
export default {
    data () {
        return {
            ismobile: false,
            isReady: false,
            showMovieFoot: false
        }
    },
    components: {
        HEAD,
        ScrollTop,
        Footer,
        eduHEAD,
        eduFooter
    },
    methods: {
        selfNotify,
        handleInit () {
            document.getElementById('app').style.visibility = 'visible'
            switch (defaultLanguage) {
                    case 'en':
                        document.getElementById('contentLanguange').setAttribute('content', 'en-us')
                        break
                    case 'zhTw':
                        document.getElementById('contentLanguange').setAttribute('content', 'zh-tw')
                        break
                    case 'zhCn':
                        document.getElementById('contentLanguange').setAttribute('content', 'zh-cn')
                        break
            }
        },
        initPop () {
            /* head  弹窗  */
            if (this.isSlot || this.isDapp) {
                return
            }
            this.$store.commit('initHeadState', new Date().getTime())
        }
    },
    watch: {
        isLogin (value) {
            if (!value) {
                this.isShowHalloween = false
            }
        },
        $route (to, from) {
            if (to.path.indexOf('movie') > -1 || to.path.indexOf('tvplay') > -1) {
                this.showMovieFoot = true
            }
        }
    },
    computed: {
        isLogin () {
            return this.$store.state.isLog
        }
    },
    async mounted () {
        this.ismobile = isMobile;
        (function flexible (window, document) {
            var docEl = document.documentElement
            function setRemUnit () {
                var rem = '75'
                if (docEl.clientWidth > 1200) {
                    // rem = 1920 because px
                    rem = 75
                } else if (docEl.clientWidth > 768 && docEl.clientWidth < 1200) {
                    // rem = 768 because px
                    rem = 75
                } else if (docEl.clientWidth < 768) {
                    rem = docEl.clientWidth / 10
                }
                docEl.style.fontSize = rem + 'px'
            }

            setRemUnit()

            // reset rem unit on page resize
            window.addEventListener('resize', setRemUnit)
            window.addEventListener('pageshow', function (e) {
                if (e.persisted) {
                    setRemUnit()
                }
            })
        }(window, document))

        this.handleInit()
        // let userMsg = await this.$store.dispatch('getUserInfo')
        // if (isLog()) {
        //     this.$store.commit('setIsLog', true)
        // } else {
        //     this.$store.commit('setIsLog', false)
        // }
        this.isReady = true

        /* 禁止左右滚动 */
        let xStart, xEnd, yStart, yEnd
        document.addEventListener('touchstart', function (evt) {
            xStart = evt.touches[0].pageX
            yStart = evt.touches[0].pageY
        }, false)
        document.addEventListener('touchmove', function (evt) {
            xEnd = evt.touches[0].pageX
            yEnd = evt.touches[0].pageY
            Math.abs(xStart - xEnd) > Math.abs(yStart - yEnd) && evt.preventDefault()
        }, false)

        setTimeout(function () {
            document.getElementById('csLoading').style.display = 'none'
        }, 0)

        if (window.location.href.indexOf('movie') > -1 || window.location.href.indexOf('tvplay') > -1) {
            this.showMovieFoot = true
        }
    }
}
</script>
<style lang="less">
.topImg {
  width: 100%;
  overflow: auto;
  .mobile-topflx{
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
    font-size: 16px;
    height: 42px;
    box-shadow: 2px 2px 4px #ccc;
    z-index: 2;
    margin-bottom: 6px;
    border-radius: 2px;
    background-color: #fff;
    transition: all 0.5s;
    font-weight: 600;
    li{
      flex:1;
      cursor: pointer;
      text-align: center;
      &:hover{
        filter:brightness(1.8)
      }
    }
  }
}
@keyframes flipEntry {
  0%,
  100% {
    transform: rotate(0);
  }
  20%,
  60%,
  70%,
  80% {
    transform: rotateZ(20deg);
  }
  40%,
  65%,
  75%,
  85% {
    transform: rotateZ(-21deg);
  }
}
// h5
@media (max-width: 992px) {
  .topImg {
    .mobile-topflx{
      width: 260%;
      font-size: 12px;
      margin-bottom: 2px;
      border-radius: 2px;
      background-color: #fff;
      transition: all 0.5s;
      font-weight: 500;
      li{
        flex:1;
        cursor: pointer;
      }
    }
  }
}

</style>

<style lang="less" type="text/less">
@import "../styles/lib-reset.css";
@import "../styles/lib-font.less";
@import "../styles/lib-public.less";
@import "../styles/lib-media.less";
@import "../styles/lib-mixins.less";

#app {
  position: relative;
  background: #eef1f9;
  font-size: 14px;
  line-height: 20px;
  font-family: sans-r, Microsoft Yahei;
  color: #263648;
  -webkit-overflow-scrolling: touch;
  overflow: hidden;
}
.noscrolling {
  #app {
    -webkit-overflow-scrolling: auto;
  }
}
.radioLi {
  display: flex;
  justify-content: center;
  height: 22px;
  line-height: 22px;
  overflow: hidden;
  font-size: 12px;
  color: #fff;
  li {
    display: flex;
    justify-content: center;
  }
  li + li {
    margin-left: 5px;
  }
  img {
    display: block;
    width: 22px;
    height: 22px;
  }
}

//临时蜘蛛线条
.ghost2-ct,
.ghost21-ct {
  img {
    z-index: 2;
  }
  &::before {
    content: "";
    display: block;
    position: absolute;
    z-index: 1;
    top: -65px;
    left: 51%;
    width: 2px;
    height: 150px;
    background: #410414;
    z-index: -1;
  }
}
.ghost21-ct {
  &::before {
    content: "";
    top: -230px;
    height: 350px;
  }
}
</style>
