<template>
    <div id="app">
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
    import {isLog} from '~common/util'
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
        computed: {
            showEmailErr () {
                return this.$store.state.showEmailErr
            },
            isLog () {
                return this.$store.state.isLog
            }
        },
        async mounted () {
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
                        document.getElementById('coinslotLoading').style.display = 'none'
                    }, 0)
                })
            }
        }
    }
</script>

<style lang="less">
    @import "../styles/lib-reset.css";
    @import "../styles/lib-font.less";
    @import "../styles/lib-public.less";
    @import "../styles/lib-media.less";
    #app {
        display: flex;
        flex-direction: column;
        position: relative;
        background: #eef1f9;
        font-size: 14px;
        line-height: 20px;
        font-family: sans-r,Microsoft Yahei;
        color: #263648;
        overflow: hidden;
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
