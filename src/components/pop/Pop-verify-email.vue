<template>
    <!--弹窗-邮箱验证  文案有问题！ -->
    <Pop class="pop-verify-email" :show.sync="show">
        <div class="pop-main">
            <h3>
                <lang>Email Verification</lang>
            </h3>
            <div class="icon-email"></div>
            <p class="email-account">{{ regVerifyEmail }}</p>
            <p class="verify-tips">
                <lang>Activate account now to start your lucky journey!</lang>
            </p>
            <input type="submit" @click.stop.prevent="againVerify" :value="_('Verify Now')" :class="{'no':emailBackTime!==0}">
            <div class="pop_email_bottom">
                <a href="javascript:;">Resent</a>
                <p v-if="emailBackTime !== 0"><span>{{ _('{0}s left', emailBackTime) }} </span></p>
            </div>
        </div>
        <div class="pop-bottom hide" :class="{'hideVisibily':isLog}">
            <p class="js_isLogOut">
                <lang>Already Have Account？</lang>
                <a href="javascript:;" class="js_signUp2SignIn" @click="showSignIn">
                    <lang>Sign In</lang>
                </a>
            </p>
        </div>
    </Pop>
</template>

<script>
import Pop from './Pop'

export default {
    data () {
        return {}
    },
    components: { Pop },
    methods: {
        async againVerify () {
            let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
            let sendObj = {}
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
                    this.$error(_('Please enter your email address'))
                }
            }
        },
        showSignIn () {
            this.$store.commit('showLoginPop')
            this.$store.commit('hideVerifyEmail')
        }
    },
    computed: {
        regVerifyEmail () {
            return this.$store.state.pop.regVerifyEmail
        },
        emailBackTime () {
            return this.$store.state.pop.emailBackTime
        },
        isLog () {
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
    mounted () {
    }
}
</script>

<style lang="less" scoped type="text/less">
.pop-verify-email .icon-email {
  width: 64px;
  height: 48px;
}
.pop_email_bottom {
  display: flex;
  justify-content: center;
  height: 56px;
  line-height: 46px;
  > * {
    margin: 0 20px;
  }
}
.hideVisibily {
  visibility: hidden;
}
</style>


