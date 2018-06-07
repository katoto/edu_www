<template>
    <!--找回密码-->
    <Pop class="pop-reset-psw" :show.sync="show">
        <div class="pop-main">
            <h3>Reset Your Password</h3>
            <span class="error js_loginInErr">New password must be 6-15 chars and include number and letter</span>
            <form class=" form-first js_resetPswFirst">
                <input type="text" v-model="resetEmail" name="reset-email" placeholder="Email">
                <!--no-->
                <input type="submit" @click.stop.prevent="beforeResetPass" value="Next" :class="{'no':!resetEmail}">
            </form>
            <form action="" method="post" class="hide form-second js_resetPswSecond">
                <input type="password" class="js_reset-pass" name="reset-pasw1"
                       placeholder="New Password">
                <input type="password" class="js_reset-pass2" name="reset-pasw2"
                       placeholder="Confirm Password">
                <!--no-->
                <input type="submit" value="reset password" class="js_reset-submit no">
            </form>
        </div>
    </Pop>
</template>

<script>
	import Pop from './Pop'

	export default {
		data(){
			return {
				resetEmail: ''
			}
		},
		components: {Pop},
		methods: {
			async beforeResetPass(){
				let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
				let sendObj = {}
				if (this.resetEmail !== '') {
					if (emailReg.test(this.resetEmail)) {
						Object.assign(sendObj, {
							email: this.resetEmail,
							mailType: 'reset'
						});
						let regMsg = await this.$store.dispatch('sendEmail', this.resetEmail);
					} else {
						Message({
							message: 'Please enter your email address',
							type: 'error',
							duration: tipsTime
						})
					}
				}
			}
		},
		computed: {
			show: {
				set: function (isShow) {
					if (!!isShow === true) {
						this.$store.commit('showResetPwd')
					} else {
						this.$store.commit('hideResetPwd')
					}
				},
				get: function () {
					return this.$store.state.pop.showResetPwd
				}
			}
		}
	}
</script>

<style lang="less" scoped>
</style>


