<template>
  <!--  弹窗-邮箱未验证  -->
  <Pop class="pop-verify-email-error" :show.sync="show">
        <div class="pop-main">
            <h3>Email Verification</h3>
            <p class="email-account js_currEmail js_email-account"
                style="font-size: 20px;margin-bottom: 15px">
                XXXXX@gmail.com
            </p>
            <p class="verify-tips">
                Your email address hasn't been verificated yet.Would you want to send the verification
                email now
                ?
            </p>
            <form action="" method="post">
                <input type="submit" value="Send"  :class="{'no':emailBackTime!==0}">
                <div style="height: 30px">
                    <p v-if="emailBackTime !== 0"><span>{{ emailBackTime }}s </span>left</p>
                </div>
            </form>
            <div class="forgetpsw"></div>
        </div>
  </Pop>
</template>

<script>
import Pop from './Pop'

export default {
    components: { Pop },
    computed: {
	    emailBackTime(){
		    return this.$store.state.pop.emailBackTime;
	    },
        show: {
            set: function (isShow) {
                if (!!isShow === true) {
                    this.$store.commit('showVerifyEmailError')
                } else {
                    this.$store.commit('hideVerifyEmailError')
                }
            },
            get: function () {
                return this.$store.state.pop.showVerifyEmailError
            }
        }
    }
}
</script>

<style lang="less" scoped>
</style>


