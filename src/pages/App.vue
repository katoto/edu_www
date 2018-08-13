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
        methods: {
            handleInit () {
                document.getElementById('app').style.visibility = 'visible'
                switch (defaultLanguage) {
                case 'zhTw':
                    document.title = 'Coinslot-基於區塊鏈技術的賭場博彩高頻彩票遊戲平台'
                    document.getElementsByTagName('meta')['keywords'].setAttribute('content', '高頻彩票,Coinslot,區塊鏈賭場,區塊鏈遊戲,區塊鏈彩票')
                    document.getElementsByTagName('meta')['description'].setAttribute('content', 'Coinslot是世界上第一批基於區塊鏈技術開發的賭場博彩高頻彩票遊戲平台。我們提供了可證明地公平、分散式Ethereum,smart-contract等賭博賭場遊戲。你可以在平台體驗、購買包括lucky 11等在内的區塊鏈高頻彩票，體驗不一樣的刺激玩法。')
                    break
                case 'zhCn':
                    document.title = 'Coinslot-基于区块链技术的赌场博彩高频彩票游戏平台'
                    document.getElementsByTagName('meta')['keywords'].setAttribute('content', '高频彩票,Coinslot,区块链赌场,区块链游戏,区块链彩票')
                    document.getElementsByTagName('meta')['description'].setAttribute('content', 'Coinslot是世界上第一批基于区块链技术开发的赌场博彩高频彩票游戏平台。我们提供了可证明地公平、分散式Ethereum,smart-contract等赌博赌场游戏。你可以在本平台体验、购买包括lucky 11等在内的区块链高频彩票，体验不一样的刺激玩法。')
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
    @import "../styles/lib-media.less";
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
