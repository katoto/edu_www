<template>
    <!--  弹窗-注册  -->
    <Pop class="pop-reg" :show.sync="show">
        <div class="pop-main">
            <h3>Create Your Account</h3>
            <div class="loading"></div>
            <form>
                <input type="text" v-model="reg_email" @blur="checkEmail" name="email" placeholder="Email">
                <input type="password" v-model="reg_pass" @blur="checkPass" placeholder="New Password(1-15 numbers and letters)">
                <input type="password" v-model="reg_againPass" class="js_again_loginPasswd"
                       placeholder="Confirm Password">
                <div class="sure-old">
                    <!--  $('.js_isAgreeAge').is(':checked')  -->
                    <input type="checkbox" v-model="log_checked" name="is18">
                    <p>
                        I'm 18+ years old and agree <!--with <a href="terms.html" target="_blank">Terms of use</a>
                    and <a href="policy.html" target="_blank">Privacy policy</a>-->
                    </p>
                </div>
                <!--no-->
                <input type="submit" @click.stop.prevent="submitReg" value="Sign Up"
                       :class="{'no':!(log_checked) || reg_email === '' || reg_pass === '' || reg_againPass === '' }">
            </form>
            <a href="javascript:;" class="forgetpsw js_forgetPsw" @click="onReset">Forgot your password?</a>
        </div>
        <div class="pop-bottom">
            <p>Already Have Account？ <a href="javascript:;" class="js_signUp2SignIn" @click="showSignIn">Sign In</a></p>
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
				log_checked: false,
				reg_email: '',
				reg_pass: '',
				reg_againPass: ''
			}
		},
		components: {Pop},
		methods: {
			checkPass(){

            },
			async checkEmail(){
				let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
				if (emailReg.test(this.reg_email)) {
					let loginMsg = await this.$store.dispatch('beforeReg', this.reg_email);
				} else {
					Message({
						message: 'Please enter your email address',
						type: 'error',
						duration: tipsTime
					})
				}
            },
			async submitReg(){
				// 判断邮箱
				let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
				let regObj = {};
				if (!(this.log_checked) || this.reg_email === '' || this.reg_pass === '' || this.reg_againPass === '') {
					return false
				}
				if (emailReg.test(this.reg_email)) {
					Object.assign(regObj, {
						email: this.login_email,
						password: this.login_pass
					});
					let loginMsg = await this.$store.dispatch('userLogin', regObj);
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
			showSignIn () {
				this.$store.commit('showLoginPop')
				this.$store.commit('hideRegPop')
			},
			onReset () {
				this.$store.commit('showResetPwd')
				this.$store.commit('hideRegPop')
			}
		},
		computed: {
			show: {
				set: function (isShow) {
					if (!!isShow === true) {
						this.$store.commit('showRegPop')
					} else {
						this.$store.commit('hideRegPop')
					}
				},
				get: function () {
					return this.$store.state.pop.showRegPop
				}
			}
		}
	}
</script>

<style lang="less" scoped>
</style>


