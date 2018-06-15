<template>
    <div class="pop-list">
        <pop-login></pop-login>
        <pop-reg></pop-reg>
        <pop-verify-email></pop-verify-email>
        <pop-reset-pwd></pop-reset-pwd>
        <pop-verify-email-error></pop-verify-email-error>
        <pop-reg-success></pop-reg-success>
        <pop-reg-failure></pop-reg-failure>
        <pop-faucet></pop-faucet>
        <pop-limit></pop-limit>
        <pop-freeplay></pop-freeplay>
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
    import PopFaucet from './pop/Pop-faucet'
    import PopLimit from './pop/Pop-limit'
    import PopFreeplay from './pop/Pop-freeplay'

    export default {
        components: {
            PopFreeplay,
            PopLogin,
            PopReg,
            PopVerifyEmail,
            PopResetPwd,
            PopVerifyEmailError,
            PopRegSuccess,
            PopRegFailure,
            PopFaucet,
            PopLimit
        }
    }
</script>

