<template>
    <!--  弹窗-登录  -->
    <Pop class="pop-login" :show.sync="show">
        <div class="pop-main">
            <h3 class="font26">Sign In </h3>
            <!--fadeDown-->
            <span class="error js_loginInErr"></span>
            <!--  登陆loading  -->
            <div class="loading"></div>
            <form method="post">
                <input v-model="login_email" type="text" name="email" placeholder="Email">
                <input v-model="login_pass" type="text" onfocus="this.type='password'" placeholder="Password">
                <div class="sure-old">
                    <input type="checkbox" v-model="log_checked" name="is18">
                    <p>
                        I'm 18+ years old and agree<!-- with <a href="terms.html" target="_blank">Terms of use</a>
                    and <a href="policy.html" target="_blank">Privacy policy</a>-->
                    </p>
                </div>
                <!--no-->
                <input type="submit" value="Sign In" @click.stop.prevent="submitLogin"
                       :class="{'no':!(log_checked) || login_email === '' || login_pass === '' }">
            </form>
            <a href="javascript:;" class="forgetpsw js_forgetPsw" @click="onReset">Forgot your password?</a>
        </div>
        <div class="pop-bottom">
            <p>Not Registered yet ? <a href="javascript:;" class="signUp" @click="onSignUp">Sign Up</a></p>
            <a href="javascript:;" class="importwallet hide">Import Wallet</a>
        </div>
    </Pop>
</template>

<script>
	import Pop from './Pop'
	import {Message} from 'element-ui'
	import {tipsTime, setCK, removeCK, wait} from '~common/util'

	export default {
		data(){
			return {
				login_email: '',
				login_pass: '',
				log_checked: false
			}
		},
		components: {Pop},
		methods: {
			async submitLogin(){
				// 判断邮箱
				let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
				let loginObj = {};
				if (!(this.log_checked) || this.login_email === '' || this.login_pass === '') {
					return false
				}
				if (emailReg.test(this.login_email)) {
					Object.assign(loginObj, {
						email: this.login_email,
						password: this.login_pass
					});
					let loginMsg = await this.$store.dispatch('userLogin', loginObj);
					if (loginMsg) {
						if (loginMsg.ck) {
							setCK(loginMsg.ck);
							let userMsg = await this.$store.dispatch('getUserInfo');
							if (userMsg && userMsg.status.toString() === '100') {
								Message({
									message: 'Sign in successfully',
									type: 'success',
									duration: tipsTime
								});
								this.$store.commit('setIsLog', true);
								this.$store.commit('setUserInfo', userMsg.data);
								this.$store.dispatch('sub2In');
								await wait(500);
								this.$store.commit('hideLoginPop')
							} else {
								removeCK();
								this.$store.commit('setIsLog', false);
								this.$store.commit('setUserInfo', {});
							}
						}
					}
				} else {
					Message({
						message: 'Please enter your email address',
						type: 'error',
						duration: tipsTime
					})
				}
			},
			onSignUp () {
				this.$store.commit('showRegPop');
				this.$store.commit('hideLoginPop')
			},
			onReset () {
				this.$store.commit('setResetObj', {
					email: null,
					sign: null,
					showReset: false
				});
				this.$store.commit('showResetPwd');
				this.$store.commit('hideLoginPop')
			}
		},
		computed: {
			show: {
				set: function (isShow) {
					if (!!isShow === true) {
						this.$store.commit('showLoginPop')
					} else {
						this.$store.commit('hideLoginPop')
					}
				},
				get: function () {
					return this.$store.state.pop.showLoginPop
				}
			}
		}
	}
</script>

<style lang="less" scoped>
</style>


