<template>
  <!--  弹窗-登录  -->
  <Pop class="pop-login" :show.sync="show">
    <div class="pop-main">
      <h3 class="font26">
        <lang>Log In</lang>
      </h3>
      <!--fadeDown-->
      <span class="error js_loginInErr"></span>
      <!--  登陆loading  -->
      <div class="loading"></div>
      <form method="post">
        <input v-model="login_email" type="text" name="email" :placeholder="_('Email')" />
        <input v-model="login_pass" type="text" onfocus="this.type='password'" :placeholder="_('Password')" />
        <div class="verCode">
          <input type="text" :placeholder="_('Verification Code')" class="msg-ver" v-model="verifyCode" />
          <img width="137" height="50" alt="" class="img-ver" @click="reloadVerifyImg" :src="verifyImgPath" />
        </div>
        <div class="sure-old">
          <input type="checkbox" v-model="log_checked" name="is18" />
          <p>
            <lang>I'm 18+ years old and agree with</lang>&nbsp;
            <a href="javascript:;" @click="jump2Page">
              <lang>Terms of Use</lang>
            </a>
          </p>
        </div>
        <!--no-->
        <input
          type="submit"
          :value="_('Log In')"
          @click.stop.prevent="submitLogin"
          :class="{ no: !log_checked || login_email === '' || login_pass === '' || verifyCode === '' }"
        />
      </form>
      <a href="javascript:;" class="forgetpsw js_forgetPsw" @click="onReset">
        <lang>Forgot your password?</lang>
      </a>
    </div>
    <div class="pop-bottom">
      <p>
        <!--Not Registered yet ? -->
        <a href="javascript:;" class="signUp" @click="onSignUp">
          <lang>Sign Up</lang>
        </a>
      </p>

      <a href="javascript:;" class="importwallet hide">
        <lang>Import Wallet</lang>
      </a>
      <div class="act-sign">
        <lang>1 CC for free</lang>
      </div>
    </div>
  </Pop>
</template>

<script>
import Pop from './Pop'
import { setCK, removeCK, wait } from '~common/util'
import { baseURL, isProduction } from '~common/ajax'

export default {
  data() {
    return {
      login_email: '',
      login_pass: '',
      log_checked: false,
      verifyImgPath: '',
      verifyCode: ''
    }
  },
  components: { Pop },
  methods: {
    clearStatus() {
      this.reg_email = ''
      this.reg_pass = ''
      this.reg_againPass = ''
      this.verifyCode = ''
    },
    reloadVerifyImg() {
      this.verifyImgPath =
        (isProduction ? baseURL.replace('http://', 'https://') : baseURL) +
        '/alert/verifycode/img?random=' +
        new Date().getTime()
    },
    jump2Page(lan = 'en') {
      if (this.language) {
        lan = this.language
      }
      switch (lan) {
        case 'en':
          window.open('/policy', '_blank')
          break
        case 'zhCn':
          window.open('/policy_zhCn', '_blank')
          break
        case 'zhTw':
          window.open('/policy_zhTw', '_blank')
          break
      }
      this.$store.commit('hideLoginPop')
    },
    async submitLogin() {
      // 判断邮箱
      let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      let loginObj = {}
      if (!this.log_checked || this.login_email === '' || this.login_pass === '') {
        return false
      }
      if (emailReg.test(this.login_email)) {
        Object.assign(loginObj, {
          email: this.login_email,
          password: this.login_pass,
          verify_code: this.verifyCode
        })
        let loginMsg = await this.$store.dispatch('userLogin', loginObj)
        console.log(loginMsg)
        if (loginMsg) {
          if (loginMsg.ck) {
            setCK(loginMsg.ck)
            let userMsg = await this.$store.dispatch('getUserInfo')
            if (userMsg && userMsg.status.toString() === '100') {
              this.$success(_('Log in successfully'))
              this.$store.commit('setIsLog', true)
              this.$store.commit('setUserInfo', userMsg.data)
              this.$store.dispatch('sub2In')
              await wait(500)
              this.$store.commit('hideLoginPop')
            } else {
              removeCK()
              this.$store.commit('setIsLog', false)
              this.$store.commit('setUserInfo', {})
            }
          }
        } else {
          this.reloadVerifyImg()
        }
      } else {
        console.log(1111111111)
        debugger
        this.$error(_('Please enter your email address'))
      }
    },
    onSignUp() {
      this.$store.commit('showRegPop')
      this.$store.commit('hideLoginPop')
    },
    onReset() {
      this.$store.commit('setResetObj', {
        email: null,
        sign: null,
        showReset: false
      })
      this.$store.commit('showResetPwd')
      this.$store.commit('hideLoginPop')
    }
  },
  computed: {
    language() {
      return this.$store.state.language
    },
    show: {
      set: function(isShow) {
        !!isShow === true ? this.$store.commit('showLoginPop') : this.$store.commit('hideLoginPop')
      },
      get: function() {
        this.reloadVerifyImg()
        this.clearStatus()
        return this.$store.state.pop.showLoginPop
      }
    }
  }
}
</script>

<style lang="less" scoped type="text/less">
.act-sign {
  top: 20px;
  right: 50%;
  margin-right: 40px;
}
.verCode {
  position: relative;
  width: 334px;
  margin: 0 auto;
  overflow: hidden;
  .msg-ver {
    width: 178px !important;
    float: left;
  }
  .img-ver {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 137px;
    height: 50px;
    cursor: pointer;
  }
}
</style>
