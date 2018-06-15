<template>
    <!--  弹窗-注册  -->
    <Pop class="pop-reg" :show.sync="show">
        <div class="pop-main">
            <h3>Create Your Account</h3>
            <div class="loading"></div>
            <form>
                <input type="text" v-model="reg_email" @blur="checkEmail" name="email" placeholder="Email">
                <input type="password" v-model="reg_pass" @blur="checkPass"
                       placeholder="New Password(1-15 numbers and letters)">
                <input type="password" v-model="reg_againPass" @blur="checkagainPass"
                       placeholder="Confirm Password">
                <div class="sure-old">
                    <!--  $('.js_isAgreeAge').is(':checked')  -->
                    <input type="checkbox" v-model="log_checked" name="is18">
                    <p>
                        <!--<el-button @click="showSucc">模拟成功</el-button>-->
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
        data () {
            return {
                log_checked: false,
                reg_email: '',
                reg_pass: '',
                reg_againPass: ''
            }
        },
        components: {Pop},
        methods: {
            showSucc () {
                this.$store.commit('setRegVerifyEmail', '846359246@qq.com')

                console.log('success')
                this.$store.commit('hideRegPop')
                //						验证邮箱
                this.$store.commit('showVerifyEmail')
                // 执行倒计时 todo
                this.$store.dispatch('startBackTime')
            },
            checkagainPass () {
                //                if( this.reg_pass !== '' && this.reg_againPass !== '' ){
                //                	if( this.reg_pass !== this.reg_againPass ){
                //		                Message({
                //			                message: 'Confirm password not match',
                //			                type: 'error',
                //			                duration: tipsTime
                //		                })
                //                    }
                //                }
            },
            checkPass () {
                /* 检测密码 */
                let pass_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
                if (!pass_reg.test(this.reg_pass)) {
                    if (this.reg_pass !== '') {
                        Message({
                            message: 'Password must contain 6-15 characters with both numbers and letters',
                            type: 'error',
                            duration: tipsTime
                        })
                    }
                }
            },
            async checkEmail () {
                let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
                if (this.reg_email !== '') {
                    if (emailReg.test(this.reg_email)) {
                        let regMsg = await this.$store.dispatch('beforeReg', this.reg_email)
                    } else {
                        Message({
                            message: 'Please enter your email address',
                            type: 'error',
                            duration: tipsTime
                        })
                    }
                }
            },
            async submitReg () {
                // 判断邮箱
                let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
                let regObj = {}
                if (!(this.log_checked) || this.reg_email === '' || this.reg_pass === '' || this.reg_againPass === '') {
                    return false
                }
                if (emailReg.test(this.reg_email)) {
                    if (this.reg_pass !== this.reg_againPass) {
                        Message({
                            message: 'Confirm password not match',
                            type: 'error',
                            duration: tipsTime
                        })
                        return false
                    }
                    Object.assign(regObj, {
                        email: this.reg_email,
                        password: this.reg_pass
                    })
                    let regMsg = await this.$store.dispatch('reg', regObj)
                    if (regMsg && regMsg.status.toString() === '100') {
                        this.$store.commit('setRegVerifyEmail', this.reg_email)
                        this.$store.commit('hideRegPop')
                        this.$store.commit('showVerifyEmail')
                        this.$store.dispatch('startBackTime')
                        // 直接登录  new
                        if (regMsg.data.ck) {
                            setCK(regMsg.data.ck)
                            let userMsg = await this.$store.dispatch('getUserInfo')
                            if (userMsg && userMsg.status.toString() === '100') {
                                this.$store.commit('setIsLog', true)
                                this.$store.commit('setUserInfo', userMsg.data)
                                this.$store.dispatch('sub2In')
                            }
                        }
                    } else if (regMsg.status.toString() === '205') {
                        // 已经注册
                        this.$store.commit('showLoginPop')
                        this.$store.commit('hideRegPop')
                        Message({
                            message: regMsg.message,
                            type: 'error',
                            duration: tipsTime
                        })
                    } else {
                        Message({
                            message: regMsg.message,
                            type: 'error',
                            duration: tipsTime
                        })
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
                this.$store.commit('setResetObj', {
                    email: null,
                    sign: null,
                    showReset: false
                })
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
        },
        mounted () {
        }
    }
</script>

<style lang="less" scoped>
</style>


