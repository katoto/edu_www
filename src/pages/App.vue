<template>
    <div id="app"  @scroll.native="test" :class="isReady ? 'ready' : ''">
        <router-view v-if="isReady"/>
        <!-- ip -->
        <PopIpLimit></PopIpLimit>
        <!-- 全局free -->
        <PopFreeplay></PopFreeplay>
        <!-- 全局该邮件无法激活 -->
        <div role="alert" v-if="showEmailErr && isLog" class="el-message el-message--error" style="z-index: 2003;">
            <p class="el-message__content">
                <lang>Failed to activate, because of wrong email format</lang>
            </p>
        </div>

    </div>
</template>

<script>
    import PopIpLimit from '~components/Pop-ipLimit.vue'
    import PopFreeplay from '~components/Pop-freeplay.vue'
    import {isLog, defaultLanguage} from '~common/util'
    export default {
        data () {
            return {
                isReady: false
            }
        },
        components: {
            PopIpLimit,
            PopFreeplay
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
            showEmailErr () {
                return this.$store.state.showEmailErr
            },
            isLog () {
                return this.$store.state.isLog
            }

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
    #app {
        position: relative;
        background: #eef1f9;
        font-size: 14px;
        line-height: 20px;
        font-family: sans-r,Microsoft Yahei;
        color: #263648;
        -webkit-overflow-scrolling: touch;
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
