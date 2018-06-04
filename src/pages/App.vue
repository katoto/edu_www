<template>
    <div id="app">
        <!-- 公用的弹窗 fail success-->
        <div id="toast" class="" style=""></div>
        <router-view v-if="isReady"/>
    </div>
</template>

<script>
	import {src, platform, isLog, getCK, setCK } from '~common/util'
	// todo 暂时到时候改到global
	import {aTypes} from '~/store/cs_page/cs_1105'
	export default {
		data () {
			return {
				isReady: false,
			}
		},
		async mounted(){
//			临时写死一个ck 进去
			setCK('MTAwMDI1OTcxZGY1NmI4ZTdjNjkxMDVkNDlhNjU1ZTQ4OGM5MWMz')
            /* isLog ? */
			if (isLog()) {
				this.$store.commit('setIsLog', true);
				let userMsg = await this.$store.dispatch(aTypes.getUserInfo);
				console.log(userMsg);
				this.$store.commit('setUserInfo', userMsg);
			} else {
				this.$store.commit('setIsLog', false);
			}
			this.isReady = true
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
    }

</style>
