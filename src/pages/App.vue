<template>
    <div id="app" @scroll.native="test" :class="{ready: isReady, 'halloween-mode': isShowHalloween}">
        <Banner v-if="isLucky11"></Banner>
        <Header v-if="!isSlot && !isDapp && isReady"></Header>
        <router-view v-if="isReady" @click.native="initPop" class="page_all" />
        <Halloween :show.sync="isShowHalloween" v-if="isShowEntry" class="hidden-xs hidden-sm"></Halloween>
        <img class="halloween-entry hidden-xs hidden-sm" src="@assets/img/halloween/pumpkin.png" @click="playHalloween" v-if="isShowEntry && !isShowHalloween">
        <div class="_download_bg2"></div>
        <div class="_download_bg0"></div>
        <div class="_download_bg"></div>
    </div>
</template>

<script>
import { isLog, defaultLanguage, isForbitPage } from '~common/util'
import Halloween from './cs_halloween/game'
import Banner from '~components/banner'
import Header from '~components/Header.vue'
export default {
    data () {
        return {
            isReady: false,
            isShowHalloween: false
        }
    },
    components: {
        Halloween, Banner, Header
    },
    methods: {
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
        playHalloween () {
            if (!this.isLogin) {
                this.$store.commit('showLoginPop')
                return
            }
            if (this.$store.state.userInfo && this.$store.state.userInfo.status !== '1') {
                this.$store.commit('showNoVerify')
                return
            }
            this.isShowHalloween = !this.isShowHalloween
        },
        initPop () {
            /* head 弹窗 */
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
        }
    },
    computed: {
        isLogin () {
            return this.$store.state.isLog
        },
        isShowEntry () {
            return ['lucky11', 'luckySlot', 'luckycoin', 'luckyPoker', 'luckycoin-home'].indexOf(this.$route.name) !== -1 && window.halloween === 1
        },
        isLucky11 () {
            return this.$route.name === 'lucky11'
        },
        isSlot () {
            return this.$route.name === 'luckySlot'
        },
        isDapp () {
            return this.$route.name === 'supercoin'
        }

    },
    async mounted () {
        (function flexible (window, document) {
            var docEl = document.documentElement
            // var dpr = window.devicePixelRatio || 1
            // set 1rem = viewWidth / 10
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
        let userMsg = await this.$store.dispatch('getUserInfo')
        if (isLog()) {
            this.$store.commit('setIsLog', true)
            if (userMsg && userMsg.status.toString() === '100') {
                this.$store.commit('setIsLog', true)
            }
        } else {
            this.$store.commit('setIsLog', false)
        }
        this.isReady = true

        /* 老虎机和首页 */
        if (isForbitPage()) {
            setTimeout(function () {
                document.getElementById('csLoading').style.display = 'none'
            }, 0)
        } else {
            if (!(this.socket && this.socket.sock)) {
                this.$store.dispatch('initWebsocket', () => {
                    this.$store.dispatch('homeInfo')
                    setTimeout(function () {
                        document.getElementById('csLoading').style.display = 'none'
                    }, 0)
                })
            }
        }

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
    }
}
</script>
<style lang="less">
._download_bg2 {
    background: url("../assets/img/halloween/bg2.jpg");
    width: 0;
    height: 0;
    z-index: 0;
    opacity: 0;
    top: 1000000px;
    left: 0;
    position: fixed;
}
._download_bg0 {
    background: url("../assets/img/halloween/bg0.jpg");
    width: 0;
    height: 0;
    z-index: 0;
    opacity: 0;
    top: 1000000px;
    left: 0;
    position: fixed;
}
._download_bg{
    background: url("../assets/img/halloween/bg.jpg");
    width: 0;
    height: 0;
    z-index: 0;
    opacity: 0;
    top: 1000000px;
    left: 0;
    position: fixed;
}
.halloween-mode .halloween {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("../assets/img/halloween/bg2.jpg") no-repeat #162222 center
      top;
    top: 0;
    left: 0;
    opacity: 0;
    animation: showBackground 0.5s forwards ease-out;
  }
  &.tiger-pc::before {
    background-position-y: 70px;
  }
}
.halloween-mode .nav#nav {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("../assets/img/halloween/bg0.jpg") no-repeat #162222 center
      top;
    top: 0;
    left: 0;
    opacity: 0;
    animation: showBackground 0.5s forwards ease-out;
  }
}
.halloween-mode .play-area {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("../assets/img/halloween/bg.jpg") no-repeat #162222 center
      top;
    top: 0;
    left: 0;
    opacity: 0;
    animation: showBackground 0.5s forwards ease-out;
  }
}

@keyframes showBackground {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.halloween-entry {
  position: fixed;
  top: 400px;
  left: 40px;
  cursor: pointer;
  z-index: 98;
  transform-origin: center bottom;
  animation: flipEntry 5s ease-in-out infinite;
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
