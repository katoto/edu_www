<template>
    <!--弹窗-邮箱验证-->
    <Pop class="pop-verify-email" :show.sync="show">
        <div class="pop-main">
            <h3>
                <lang>Email Verification</lang>
            </h3>
            <p class="email-account">{{ beginVerify }}</p>
            <p class="verify-tips">
                <lang>Your email has not been verified yet. Click the button below if you want to verify it now .</lang>
            </p>
            <form>
                <!--  no  -->
                <input type="submit" @click.stop.prevent="againVerify" :value="_('Send')">
                <p class="js_verifyEmail_backTime_parent" style="visibility: hidden">
                    Left：<span class="js_verifyEmail_backTime">60</span>seconds
                </p>
            </form>
            <div class="forgetpsw"></div>
        </div>
    </Pop>
</template>

<script>
    import Pop from './Pop'
    import {Message} from 'element-ui'

    export default {
        data () {
            return {}
        },
        components: {Pop},
        methods: {
            async againVerify () {
                let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
                let sendObj = {}
                if (this.beginVerify !== '') {
                    if (emailReg.test(this.beginVerify)) {
                        Object.assign(sendObj, {
                            email: this.beginVerify,
                            mailType: 'reg'
                        })
                        let regMsg = await this.$store.dispatch('sendEmail', sendObj)
                        if (regMsg.status.toString() === '100') {
                            /* 调整确认页 */
                            this.$store.commit('hideNoVerify')
                            this.$store.commit('showVerifyEmail')
                            this.$store.commit('setRegVerifyEmail', this.beginVerify)
                            this.$store.dispatch('startBackTime')
                        }
                    } else {
                        this.$error(_('Please enter your email address'))
                    }
                }
            }
        },
        computed: {
            beginVerify () {
                if (this.$store.state.userInfo) {
                    return this.$store.state.userInfo.email
                }
            },
            show: {
                set: function (isShow) {
                    !!isShow === true ? this.$store.commit('showNoVerify') : this.$store.commit('hideNoVerify')
                },
                get: function () {
                    return this.$store.state.pop.showNoVerify
                }
            }
        }
    }
</script>

<style lang="less" scoped type="text/less">
    .pop-verify-email .icon-email {
        width: 64px;
        height: 48px;
    }
</style>


