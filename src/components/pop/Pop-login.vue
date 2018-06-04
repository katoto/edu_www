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
            <input class="js_loginInEmail" type="text" name="email" placeholder="Email">
            <!--<input class="js_loginPasswd" type="password" placeholder="Password">-->
            <input class="js_loginPasswd" type="text" onfocus="this.type='password'" placeholder="Password">
            <div class="sure-old">
                <input type="checkbox" checked="checked" class="js_isAgreeAge" name="is18">
                <p>
                    I'm 18+ years old and agree<!-- with <a href="terms.html" target="_blank">Terms of use</a>
                    and <a href="policy.html" target="_blank">Privacy policy</a>-->
                </p>
            </div>
            <!--no-->
            <input type="submit" value="Sign In" id="js_signIn" class="no js_signSubmit">
            <input type="button" value="Sign In" class="no hide">
        </form>
        <a href="javascript:;" class="forgetpsw js_forgetPsw" @click="onReset">Forgot your password?</a>
    </div>
    <div class="pop-bottom">
        <p>Not Registered yet ? <a href="javascript:;" class="signUp js_jumpSignUp"  @click="onSignUp">Sign Up</a></p>
        <a href="javascript:;" class="importwallet hide">Import Wallet</a>
    </div>
  </Pop>
</template>

<script>
import Pop from './Pop'

export default {
    components: { Pop },
    methods: {
        onSignUp () {
            this.$store.commit('showRegPop')
            this.$store.commit('hideLoginPop')
        },
        onReset () {
            this.$store.commit('showResetPwd')
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


