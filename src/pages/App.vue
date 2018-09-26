<template>
    <div id="app"  @scroll.native="test" :class="isReady ? 'ready' : ''">
        <router-view v-if="isReady"/>
    </div>
</template>

<script>
    import {isLog, defaultLanguage} from '~common/util'
    export default {
        data () {
            return {
                isReady: false
            }
        },
        components: {
        },
        watch: {
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
            }
        },
        computed: {
        },
        async mounted () {
            this.handleInit()
            if (isLog()) {
                this.$store.commit('setIsLog', true)
                let userMsg = await this.$store.dispatch('getUserInfo')
                if (userMsg && userMsg.status.toString() === '100') {
                    this.$store.commit('setIsLog', true)
                }
            } else {
                this.$store.commit('setIsLog', false)
            }
            this.isReady = true

            /* 老虎机和首页 */
            if (!(this.socket && this.socket.sock)) {
                this.$store.dispatch('initWebsocket', () => {
                    this.$store.dispatch('homeInfo')
                    setTimeout(function () {
                        document.getElementById('csLoading').style.display = 'none'
                    }, 0)
                })
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
        font-family: sans-r,Microsoft Yahei;
        color: #263648;
        -webkit-overflow-scrolling: touch;
        overflow: hidden;
    }
    .noscrolling{
        #app{
            -webkit-overflow-scrolling: auto;
        }
    }
    .radioLi{
        display: flex;
        justify-content: center;
        height:22px;
        line-height:22px;
        overflow: hidden;
        font-size:12px;
        color: #fff;
        li{
            display: flex;
            justify-content: center;
        }
        li+li{
            margin-left:5px;
        }
        img{
            display: block;
            width:22px;
            height:22px;
        }
    }
</style>
