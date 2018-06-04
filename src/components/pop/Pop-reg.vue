<template>
  <!--  弹窗-注册  -->
  <Pop class="pop-reg" :show.sync="show">
    <div class="pop-main">
        <h3>Create Your Account</h3>
        <span class="error js_loginInErr">
            Please enter the corret email.
        </span>
        <div class="loading"></div>
        <form action="" method="post">
            <input type="text" class="js_loginInEmail" name="email" placeholder="Email">
            <input type="password" class="js_loginPasswd" placeholder="New Password">
            <input type="password" class="js_again_loginPasswd" placeholder="Confirm Password">
            <div class="sure-old">
                <!--  $('.js_isAgreeAge').is(':checked')  -->
                <input type="checkbox" class="js_isAgreeAge" name="is18">
                <p>
                    I'm 18+ years old and agree with <a href="terms.html" target="_blank">Terms of
                    use</a>
                    and <a href="policy.html" target="_blank">Privacy policy</a>
                </p>
            </div>
            <!--no-->
            <input type="submit" value="Sign Up" id="js_signUp" class="js_signSubmit no">
            <input type="button" value="Sign Up" class="no hide">
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

export default {
    components: { Pop },
    methods: {
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


