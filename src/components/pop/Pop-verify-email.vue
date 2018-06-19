<template>
    <!--弹窗-邮箱验证  文案有问题！ -->
    <Pop class="pop-verify-email" :show.sync="show">
        <div class="pop-main">
            <h3>Email Verification</h3>
            <div class="icon-email"></div>
            <p class="email-account">{{ regVerifyEmail }}</p>
            <p class="verify-tips">
                Verification email has been sent, please sign in your mailbox and click the link to
                reset your password .
            </p>
            <form>
                <!--  no  -->
                <input type="submit" @click.stop.prevent="againVerify" value="Resent Email"
                       :class="{'no':emailBackTime!==0}">
                <div style="height: 30px">
                    <p v-if="emailBackTime !== 0"><span>{{ emailBackTime }}s </span>left</p>
                </div>
            </form>
            <div class="forgetpsw"></div>
        </div>
        <div class="pop-bottom" :class="{'hideVisibily':isLog}">
            <p class="js_isLogOut">Already Have Account？
                <a href="javascript:;" class="js_signUp2SignIn" @click="showSignIn">Sign In</a>
            </p>
        </div>
    </Pop>
</template>

<script>
    import Pop from './Pop'
    import {Message} from 'element-ui'

    export default {
        data() {
            return {}
        },
        components: {Pop},
        methods: {
            async againVerify() {
                let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
                let sendObj = {}
                console.log(this.regVerifyEmail)
                if (this.regVerifyEmail !== '') {
                    if (emailReg.test(this.regVerifyEmail)) {
                        Object.assign(sendObj, {
                            email: this.regVerifyEmail,
                            mailType: this.$store.state.pop.mailType
                        })
                        let regMsg = await this.$store.dispatch('sendEmail', sendObj)
                        if (regMsg && regMsg.status.toString() === '100') {
                            this.$store.dispatch('startBackTime')
                        }

                    } else {
                        Message({
                            message: 'Please enter your email address',
                            type: 'error'
                        })
                    }
                }
            },
            showSignIn() {
                this.$store.commit('showLoginPop')
                this.$store.commit('hideVerifyEmail')
            }
        },
        computed: {
            regVerifyEmail() {
                return this.$store.state.pop.regVerifyEmail
            },
            emailBackTime() {
                return this.$store.state.pop.emailBackTime
            },
            isLog(){
                return this.$store.state.isLog
            },
            show: {
                set: function (isShow) {
                    if (!!isShow === true) {
                        this.$store.commit('showVerifyEmail')
                    } else {
                        this.$store.commit('hideVerifyEmail')
                    }
                },
                get: function () {
                    return this.$store.state.pop.showVerifyEmail
                }
            }
        },
        mounted() {
        }
    }
</script>

<style lang="less" scoped>
    .pop-verify-email .icon-email {
        width: 64px;
        height: 48px;
    }
    .hideVisibily{
        visibility: hidden
    }
</style>


