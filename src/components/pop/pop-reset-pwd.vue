<template>
  <!--找回密码-->
  <Pop class="pop-reset-psw" :show.sync="show">
        <div class="pop-main">
            <h3>Reset Your Password</h3>
            <span class="error js_loginInErr">New password must be 6-15 chars and include number and letter</span>
            <form action="" method="post" class="form-first js_resetPswFirst">
                <input type="text" name="reset-email" class="js_resetPswFirstInp" placeholder="Email">
                <!--no-->
                <input type="submit" value="Next" class="no js_resetPswFirstBtn">
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
    components: { Pop },
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


