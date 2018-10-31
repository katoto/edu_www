<template>
    <div class="pop-list">
        <pop-login></pop-login>
        <pop-reg></pop-reg>
        <pop-verify-email></pop-verify-email>
        <pop-reset-pwd></pop-reset-pwd>
        <pop-verify-email-error></pop-verify-email-error>
        <pop-reg-success></pop-reg-success>
        <pop-reg-failure></pop-reg-failure>
        <pop-limit></pop-limit>
        <pop-noVerify></pop-noVerify>
        <Next></Next>
        <PopFirstTopUp></PopFirstTopUp>
    </div>
</template>

<script>
import PopLogin from './pop/Pop-login'
import PopReg from './pop/Pop-reg'
import PopVerifyEmail from './pop/Pop-verify-email'
import PopResetPwd from './pop/Pop-reset-pwd'
import PopVerifyEmailError from './pop/Pop-verify-email-error'
import PopRegSuccess from './pop/Pop-reg-success'
import PopRegFailure from './pop/Pop-reg-failure'
import PopLimit from './pop/Pop-limit'
import PopNoVerify from './pop/Pop-noVerify'
import Next from './pop/Next'
import PopFirstTopUp from './pop/Pop-firstTopUp'

export default {
    components: {
        PopLogin,
        PopReg,
        PopVerifyEmail,
        PopResetPwd,
        PopVerifyEmailError,
        PopRegSuccess,
        PopRegFailure,
        PopLimit,
        PopNoVerify,
        Next,
        PopFirstTopUp
    }
}
</script>
