<template>
    <!--找回密码-->
    <Pop class="pop-reset-psw" :show.sync="show">
        <div class="pop-main">
            <h3>Reset Your Password</h3>
            <form class="form-first" v-if="!resetObj.showReset">
                <input type="text" v-model="resetEmail" name="reset-email" placeholder="Email">
                <!--no-->
                <input type="submit" @click.stop.prevent="beforeResetPass" value="Next" :class="{'no':!resetEmail}">
            </form>
            <form class="form-second" v-else>
                <input type="password" @blur="checkPass" v-model="resetPsw"
                       placeholder="New Password(1-15 numbers and letters)">
                <input type="password" v-model="resetPsw2" placeholder="Confirm Password">
                <!--no-->
                <input type="submit" @click.stop.prevent="resetPassFn" value="reset password"
                       :class="{'no':resetPsw === '' || resetPsw2 === ''}">
            </form>
        </div>
    </Pop>
</template>

<script>
	import Pop from './Pop'
	import {Message} from 'element-ui'
	import {tipsTime, setCK, removeCK, wait} from '~common/util'

	export default {
	    data () {
	        return {
	            resetEmail: '',
	            resetPsw: '',
	            resetPsw2: ''
	        }
	    },
	    components: {Pop},
	    methods: {
	        checkPass () {
            /* 检测密码 */
	            let pass_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
	            if (!pass_reg.test(this.resetPsw)) {
	                if (this.resetPsw !== '') {
	                    Message({
	                        message: 'Password must contain 6-15 characters with both numbers and letters',
	                        type: 'error',
	                        duration: tipsTime
	                    })
	                }
	            }
	        },
	        async beforeResetPass () {
	            let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
	            let sendObj = {}
	            if (this.resetEmail !== '') {
	                if (emailReg.test(this.resetEmail)) {
	                    Object.assign(sendObj, {
	                        email: this.resetEmail,
	                        mailType: 'reset'
	                    })
	                    let regMsg = await this.$store.dispatch('sendEmail', sendObj)
	                    if (regMsg && regMsg.status === '100') {
	                        this.$store.commit('hideResetPwd')
	                        this.$store.commit('showVerifyEmail')
	                        this.$store.commit('setRegVerifyEmail', this.resetEmail)
	                        this.$store.dispatch('startBackTime')
	                    }
	                } else {
	                    Message({
	                        message: 'Please enter your email address',
	                        type: 'error',
	                        duration: tipsTime
	                    })
	                }
	            }
	        },
	        async resetPassFn () {
	            // 判断 密码
            let regObj = {}
	            if (this.resetPsw === '' || this.resetPsw2 === '') {
	                return false
	            }
	            if (this.reg_pass !== this.reg_againPass) {
	                Message({
	                    message: 'Confirm password not match',
	                    type: 'error',
	                    duration: tipsTime
	                })
	                return false
	            }
            if (!this.resetObj.email || !this.resetObj.sign) {
	                Message({
		                message: 'reset password error',
		                type: 'error',
		                duration: tipsTime
	                })
	                return false
            }
	            Object.assign(regObj, {
	                email: this.resetObj.email,
                sign: this.resetObj.sign,
	                password: this.reg_pass
            })
	            let resetMsg = await this.$store.dispatch('resetPasswordFn', regObj)
	            if (resetMsg && resetMsg.status.toString() === '100') {
	                Message({
	                    message: 'Reset successfully，sign in now',
	                    type: 'success',
	                    duration: tipsTime
	                })
	                setTimeout(() => {
	                    this.$store.commit('hideResetPwd')
	                    this.$store.commit('showLoginPop')
                }, tipsTime)
	            } else {
	                Message({
	                    message: resetMsg.message,
	                    type: 'error',
	                    duration: tipsTime
	                })
	            }
	        }

	    },
	    computed: {
	        resetObj () {
            return this.$store.state.pop.resetObj
        },
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


