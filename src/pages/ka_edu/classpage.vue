<template>
    <div class="eduContain">
        edu Page
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
            isReady: false,
            showMovieHead: true
        }
    },
    components: {
        HEAD,
        ScrollTop,
        Footer
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
        }

    },
    async mounted () {
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
        if (isLog()) {
            this.$store.commit('setIsLog', true)
        } else {
            this.$store.commit('setIsLog', false)
        }
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
        
        if (window.location.href.indexOf('edu') > -1) {
            this.showMovieHead = false
        }
    }
}
</script>
<style lang="less">

</style>

<style lang="less" type="text/less">

</style>
