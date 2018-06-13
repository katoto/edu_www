<template>
    <div id="app">
        <router-view v-if="isReady"/>
    </div>
</template>

<script>
	import {src, platform, isLog, getCK, setCK,removeCK  } from '~common/util'
	// todo 暂时到时候改到global
	export default {
		data () {
			return {
				isReady: false,
			}
		},
		async mounted(){
//			临时写死一个ck 进去
            /* isLog ? */
			if (isLog()) {
				this.$store.commit('setIsLog', true);
				let userMsg = await this.$store.dispatch('getUserInfo');
				if (userMsg && userMsg.status.toString() === '100') {
					this.$store.commit('setIsLog', true);
					this.$store.commit('setUserInfo', userMsg.data);
				} else if( userMsg.status.toString() === '214' ){
					// todo 登陆
					removeCK();
					this.$store.commit('setIsLog', false);
					this.$store.commit('setUserInfo', {});
				} else {
					removeCK();
					this.$store.commit('setIsLog', false);
					this.$store.commit('setUserInfo', {});
				}

			} else {
				this.$store.commit('setIsLog', false);
			}
			this.isReady = true;


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
