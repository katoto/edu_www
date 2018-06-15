<template>
    <div id="app">
        <router-view v-if="isReady"/>
        <!-- ip -->
        <PopIpLimit></PopIpLimit>
        <!-- 全局free -->
        <PopFreeplay></PopFreeplay>

    </div>
</template>

<script>
    import PopIpLimit from '~components/Pop-ipLimit.vue'
    import PopFreeplay from '~components/Pop-freeplay.vue'
    import {src, platform, isLog, getCK, setCK, removeCK} from '~common/util'
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
        async mounted () {
            /* isLog ? */
            if (isLog()) {
                this.$store.commit('setIsLog', true)
                let userMsg = await this.$store.dispatch('getUserInfo')
                if (userMsg && userMsg.status.toString() === '100') {
                    this.$store.commit('setIsLog', true)
                    this.$store.commit('setUserInfo', userMsg.data)
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
        font-family: sans-r;
    }
</style>
