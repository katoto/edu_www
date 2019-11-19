<template>
  <!--找回密码-->
  <Pop class="pop-reset-psw" :show.sync="show">
    <div class="pop-main">
      <h3>
        <lang>Reset Your Password</lang>
      </h3>
      <form class="form-first" v-if="!resetObj.showReset">
        <input type="text" v-model="resetEmail" name="reset-email" :placeholder="_('Email')" />
        <!--no-->
        <input type="submit" @click.stop.prevent="beforeResetPass" :value="_('Next')" :class="{ no: !resetEmail }" />
      </form>
      <form class="form-second" v-else>
        <input
          type="password"
          @blur="checkPass"
          v-model="resetPsw"
          :placeholder="_('New Password(6-15 numbers and letters)')"
        />
        <input type="password" v-model="resetPsw2" :placeholder="_('Confirm Password')" />
        <!--no-->
        <input
          type="submit"
          @click.stop.prevent="resetPassFn"
          :value="_('reset password')"
          :class="{ no: resetPsw === '' || resetPsw2 === '' }"
        />
      </form>
    </div>
  </Pop>
</template>

<script>
import Pop from './Pop'
import { tipsTime } from '~common/util'

export default {
  data() {
    return {
      resetEmail: '',
      resetPsw: '',
      resetPsw2: ''
    }
  },
  components: { Pop },
  methods: {
    checkPass() {
      /* 检测密码 */
      let passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/
      if (!passReg.test(this.resetPsw)) {
        if (this.resetPsw !== '') {
          this.$error(_('Password must contain 6-15 characters with both numbers and letters'))
        }
        return false
      }
      return true
    },
    async beforeResetPass() {
      let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      let sendObj = {}
      if (this.resetEmail !== '') {
        if (emailReg.test(this.resetEmail)) {
          Object.assign(sendObj, {
            email: this.resetEmail,
            mailType: 'reset'
          })
          let regMsg = await this.$store.dispatch('sendEmail', sendObj)
          if (regMsg && regMsg.status === '100') {
            this.$store.commit('hideResetPwd')
            this.$store.commit('showVerifyEmail')
            this.$store.commit('setRegVerifyEmail', this.resetEmail)
            this.$store.commit('setMailType', 'reset')
            this.$store.dispatch('startBackTime')
          }
        } else {
          this.$error(_('Please enter your email address'))
        }
      }
    },
    async resetPassFn() {
      // 判断 密码
      let regObj = {}
      if (this.resetPsw === '' || this.resetPsw2 === '' || !this.checkPass()) {
        return false
      }
      if (this.resetPsw !== this.resetPsw2) {
        this.$error(_('Confirm password not match'))
        return false
      }
      if (!this.resetObj.email || !this.resetObj.sign) {
        this.$error(_('reset password error'))
        return false
      }
      Object.assign(regObj, {
        email: this.resetObj.email,
        sign: this.resetObj.sign,
        password: this.resetPsw
      })
      let resetMsg = await this.$store.dispatch('resetPasswordFn', regObj)
      if (resetMsg && resetMsg.status.toString() === '100') {
        this.$success(_('Reset successfully，sign in now'))
        setTimeout(() => {
          this.$store.commit('hideResetPwd')
          this.$store.commit('showLoginPop')
          this.$router.push('')
        }, tipsTime)
      }
    }
  },
  computed: {
    resetObj() {
      return this.$store.state.pop.resetObj
    },
    show: {
      set: function(isShow) {
        !!isShow === true ? this.$store.commit('showResetPwd') : this.$store.commit('hideResetPwd')
      },
      get: function() {
        return this.$store.state.pop.showResetPwd
      }
    }
  }
}
</script>
