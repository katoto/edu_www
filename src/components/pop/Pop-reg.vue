<template>
    <!--  弹窗-注册  -->
    <Pop class="pop-reg" :show.sync="show">
        <div class="pop-main">
            <h3>
                <lang>Create Your Account</lang>
            </h3>
            <div class="loading"></div>
            <form>
                <input type="text" v-model="reg_email" @blur="checkEmail" name="email" :placeholder="_('Email')">
                <input type="password" v-model="reg_pass" @blur="checkPass"
                       :placeholder="_('New Password(6-15 numbers and letters)')">
                <input type="password" v-model="reg_againPass" @blur="checkagainPass"
                       :placeholder="_('Confirm Password')">
                <div class="verCode">
                    <input type="text" :placeholder="_('Verification Code')" class="msg-ver" v-model="verifyCode">
                    <img  width="137" height="50" alt="" class="img-ver" @click="reloadVerifyImg" :src="verifyImgPath">
                </div>
                <div class="sure-old">
                    <input type="checkbox" v-model="log_checked" name="is18">
                    <p>
                        <lang>I'm 18+ years old and agree with</lang>
                        <a href="javascript:;" @click="jump2Page">
                            <lang>Privacy policy</lang>
                        </a>
                    </p>
                </div>
                <!--no-->
                <input type="submit" @click.stop.prevent="submitReg" :value="_('Sign Up')"
                       :class="{'no':!(log_checked) || reg_email === '' || reg_pass === '' || reg_againPass === '' || verifyCode === ''}">
            </form>
            <a href="javascript:;" class="forgetpsw js_forgetPsw" @click="onReset">
                <lang>Forgot your password?</lang>
            </a>
        </div>
        <div class="pop-bottom">
            <p>
                <lang>Already Have Account？</lang>
                <a href="javascript:;" class="js_signUp2SignIn" @click="showSignIn">
                    <lang>Log In</lang>
                </a>
            </p>
        </div>
    </Pop>
</template>

<script>
    import Pop from './Pop'
    import { Message } from 'element-ui'
    import { tipsTime, setCK } from '~common/util'
    import { baseURL } from '~common/ajax'

    export default {
        data () {
            return {
                log_checked: false,
                reg_email: '',
                reg_pass: '',
                reg_againPass: '',
                verifyImgPath: '',
                verifyCode: ''
            }
        },
        components: {Pop},
        methods: {
            jump2Page (lan = 'en') {
                if (this.language) {
                    lan = this.language
                }
                switch (lan) {
                case 'en':
                    this.$router.push('/policy')
                    break
                case 'zhCn':
                    this.$router.push('/policy_zhCn')
                    break
                case 'zhTw':
                    this.$router.push('/policy_zhTw')
                    break
                }
                this.$store.commit('hideRegPop')
            },
            clearStatus () {
                this.reg_email = ''
                this.reg_pass = ''
                this.reg_againPass = ''
                this.verifyCode = ''
            },
            reloadVerifyImg () {
                this.verifyImgPath = baseURL + '/alert/verifycode/img?random=' + new Date().getTime()
            },
            showSucc () {
                // this.$store.commit('setRegVerifyEmail', '846359246@qq.com')
                this.$store.commit('hideRegPop')
                this.$store.commit('showVerifyEmail')
                // 执行倒计时 todo
                this.$store.dispatch('startBackTime')
            },
            checkagainPass () {
                // if (this.reg_pass !== '' && this.reg_againPass !== '') {
                //     if (this.reg_pass !== this.reg_againPass) {
                //         Message({
                //             message: 'Confirm password not match',
                //             type: 'error',
                //             duration: tipsTime
                //         })
                //     }
                // }
            },
            checkPass () {
                /* 检测密码 */
                let passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/
                if (!passReg.test(this.reg_pass)) {
                    if (this.reg_pass !== '') {
                        Message({
                            message: _('Password must contain 6-15 characters with both numbers and letters'),
                            type: 'error',
                            duration: tipsTime
                        })
                    }
                    return false
                }
                return true
            },
            async checkEmail () {
                let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
                if (this.reg_email !== '') {
                    if (emailReg.test(this.reg_email)) {
                        // let regMsg = await this.$store.dispatch('beforeReg', this.reg_email)
                        this.$store.dispatch('beforeReg', this.reg_email)
                    } else {
                        Message({
                            message: _('Please enter your email address'),
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
                if (!(this.log_checked) || this.reg_email === '' || this.reg_pass === '' || this.reg_againPass === '' || !this.checkPass()) {
                    return false
                }
                if (emailReg.test(this.reg_email)) {
                    if (this.reg_pass !== this.reg_againPass) {
                        Message({
                            message: _('Confirm password not match'),
                            type: 'error',
                            duration: tipsTime
                        })
                        return false
                    }
                    Object.assign(regObj, {
                        email: this.reg_email,
                        password: this.reg_pass,
                        verify_code: this.verifyCode
                    })
                    this.$store.dispatch('reg', regObj)
                        .then(async data => {
                            this.$store.commit('setRegVerifyEmail', this.reg_email)
                            this.$store.commit('hideRegPop')
                            this.$store.commit('showVerifyEmail')
                            this.$store.dispatch('startBackTime')
                            // 直接登录  new
                            if (data.data.ck) {
                                setCK(data.data.ck)
                                let userMsg = await this.$store.dispatch('getUserInfo')
                                if (userMsg && userMsg.status.toString() === '100') {
                                    this.$store.commit('setIsLog', true)
                                    this.$store.commit('setUserInfo', userMsg.data)
                                    this.$store.dispatch('sub2In')
                                }
                            }
                        })
                        .catch(data => {
                            if (data.status.toString() === '218') {
                                this.$store.commit('showLoginPop')
                                this.$store.commit('hideRegPop')
                            }
                            this.reloadVerifyImg()
                        })
                } else {
                    Message({
                        message: _('Please enter your email address'),
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
            language () {
                return this.$store.state.language
            },
            show: {
                set: function (isShow) {
                    if (!!isShow === true) {
                        this.$store.commit('showRegPop')
                    } else {
                        this.$store.commit('hideRegPop')
                    }
                },
                get: function () {
                    this.reloadVerifyImg()
                    this.clearStatus()
                    return this.$store.state.pop.showRegPop
                }
            }
        }
    }
</script>

<style lang="less" scoped type="text/less">
    .verCode{
        position: relative;
        width:334px;
        margin:0 auto;
        overflow: hidden;
        .msg-ver{
            width:178px !important;
            float: left;
        }
        .img-ver{
            position: absolute;
            right:0;
            bottom:0;
            width:137px;
            height:50px;
            cursor: pointer;
        }
    }

</style>


