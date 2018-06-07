<template>
  <!--弹窗-邮箱验证-->
  <Pop class="pop-verify-email" :show.sync="show">
        <div class="pop-main">
            <h3>Email Verification</h3>
            <div class="icon-email"></div>
            <p class="email-account js_email-account">
            </p>
            <p class="verify-tips">
                Verification email has been sent, please sign in your mailbox and click the link to
                reset your
                password .
            </p>
            <form action="" method="post">
                <input class="hide" type="text" name="captcha" placeholder="Please input the captcha">
                <!--  no  -->
                <input type="submit" value="Resent Email" :class="{'no':emailBackTime!==0}">
                <div style="height: 30px">
                    <p v-if="emailBackTime !== 0"><span>{{ emailBackTime }}s </span>left</p>
                </div>
            </form>
            <div class="forgetpsw"></div>
        </div>
        <div class="pop-bottom">
            <p class="js_isLogOut">Already Have Account？
                <a href="javascript:;" class="js_signUp2SignIn" @click="showSignIn">Sign In</a>
            </p>
        </div>
  </Pop>
</template>

<script>
import Pop from './Pop'

export default {
    components: { Pop },
    methods: {
        showSignIn () {
            this.$store.commit('showLoginPop');
            this.$store.commit('hideVerifyEmail')
        }
    },
    computed: {
	    emailBackTime(){
	    	return this.$store.state.pop.emailBackTime;
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
    mounted(){

    }
}
</script>

<style lang="less" scoped>
</style>


