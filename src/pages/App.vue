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
    // todo 暂时到时候改到global
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
            /* isLog ? */
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
            this.$store.dispatch('homeInfo')
        }
    }
</script>

<style lang="less">
    @import "../styles/lib-font.less";
    @import "../styles/lib-public.less";

    #app {
        position: relative;
        min-width: 1190px;
        background: #eef1f9;
        font: 14px/20px sans-r;
        color: #263648;
        overflow: hidden;
    }
</style>
