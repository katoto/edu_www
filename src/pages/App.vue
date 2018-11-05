<template>
    <div id="app" @scroll.native="test" :class="{ready: isReady}">
        <Header></Header>
        <router-view v-if="isReady" @click.native="initPop" class="page_all" />
    </div>
</template>

<script>
import { isLog, defaultLanguage, isForbitPage, setCK, selfNotify } from '~common/util'
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
        Banner, Header
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
            return ['lucky11', 'luckySlot', 'luckycoin', 'luckyPoker', 'luckycoin-home'].indexOf(this.$route.name) !== -1
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
        // app是否元素注入了 app_ck
        if (window.app_ck && window.app_ck !== 'undefined') {
            window.app_ck === '-1' ? setCK('') : setCK(window.app_ck)
        }
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

        // this.selfNotify(_('You\'ve got {0} {1} for free', 1, 2))
        // this.selfNotify(_('You\'ve received {0} {1} top-up bonus.', 12, 12))
        // this.selfNotify(_('{0} {1} top-up has been sent to you.', 33, 11))
        // this.$store.commit('showNoVerify')
        // this.$store.commit('showVerifyEmail')
        // this.$store.commit('showPopFirstTopup')
        window.location.href.indexOf('test') > -1 ? this.testUrl = true : this.testUrl = false
    }
}
</script>
<style lang="less">
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
