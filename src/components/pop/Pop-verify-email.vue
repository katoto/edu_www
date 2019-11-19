<template>
  <!--弹窗-邮箱验证  文案有问题！ -->
  <Pop class="pop-verify-email" :show.sync="show">
    <div class="pop-main">
      <h3>
        <lang>Email Verification</lang>
      </h3>
      <div class="icon-email"></div>
      <p class="email-account">{{ regVerifyEmail }}</p>
      <p class="verify-tips">
        <lang>Activate account now to start your lucky journey!</lang>
      </p>
      <!-- <input type="submit" @click.stop.prevent="againVerify" :value="_('Verify Now')" :class="{'no':emailBackTime!==0}"> -->
      <input type="submit" @click.stop.prevent="goVerify" :value="_('Verify Now')" />
      <div class="pop_email_bottom">
        <a href="javascript:;" @click.stop.prevent="againVerify">
          <lang>Resent</lang>
        </a>
        <p v-if="emailBackTime !== 0">
          <span>{{ _('{0}s left', emailBackTime) }} </span>
        </p>
      </div>
    </div>
    <div class="pop-bottom hide" :class="{ hideVisibily: isLog }">
      <p class="js_isLogOut">
        <lang>Already Have Account？</lang>
        <a href="javascript:;" class="js_signUp2SignIn" @click="showSignIn">
          <lang>Sign In</lang>
        </a>
      </p>
    </div>
  </Pop>
</template>

<script>
import Pop from './Pop'

export default {
  data() {
    return {}
  },
  components: { Pop },
  methods: {
    goVerify() {
      let jumpUrl = 'https://www.google.com'
      switch (this.lastEmail) {
        case 'gmail.com':
          this.jumpUrl = 'https://accounts.google.com/signin/v2/sl/pwd?flowName=GlifWebSignIn&flowEntry=ServiceLogin'
          break
        case 'yahoo.com':
          this.jumpUrl = 'https://login.yahoo.com/'
          break
        case 'hotmail.com':
          this.jumpUrl = 'https://outlook.live.com/owa/'
          break
        case 'mail.ru':
          this.jumpUrl = 'https://mail.ru/'
          break
        case 'outlook.com':
          this.jumpUrl = 'https://outlook.live.com/mail/'
          break
        case 'yandex.ru':
          this.jumpUrl = 'https://passport.yandex.ru/'
          break
        case 'qq.com':
          this.jumpUrl = 'https://mail.qq.com'
          break
        case 'yahoo.co.id':
          this.jumpUrl = 'https://login.yahoo.com/'
          break
        case 'icloud.com':
          this.jumpUrl = 'https://www.icloud.com/'
          break
        case 'protonmail.com':
          this.jumpUrl = 'https://protonmail.com/'
          break
        case 'abv.bg':
          this.jumpUrl = 'https://www.abv.bg/'
          break
        case 'bk.ru':
          this.jumpUrl = 'https://mail.ru/'
          break
        case 'live.com':
          this.jumpUrl = 'https://outlook.live.com/owa/'
          break
        case 'ymail.com':
          this.jumpUrl = 'https://login.yahoo.com/'
          break
        case '163.com':
          this.jumpUrl = 'https://mail.163.com'
          break
        case '126.com':
          this.jumpUrl = 'https://mail.126.com'
          break
        case 'gmx.de':
          this.jumpUrl = 'https://www.gmx.net/'
          break
        case 'yahoo.com.br':
          this.jumpUrl = 'https://login.yahoo.com/'
          break
        case 'wp.pl':
          this.jumpUrl = 'https://profil.wp.pl/login.html'
          break
        case 'inbox.ru':
          this.jumpUrl = 'https://mail.ru/'
          break
        case 'yahoo.fr':
          this.jumpUrl = 'https://login.yahoo.com/'
          break
        case 'web.de':
          this.jumpUrl = 'https://web.de/'
          break
        case 'yahoo.com.ph':
          this.jumpUrl = 'https://login.yahoo.com/'
          break
        case 'list.ru':
          this.jumpUrl = 'https://mail.ru/'
          break
        case 'yandex.com':
          this.jumpUrl = 'https://passport.yandex.com/'
          break
        case 'gmx.com':
          this.jumpUrl = 'https://www.gmx.com/'
          break
        case 'inbox.lv':
          this.jumpUrl = 'https://www.inbox.lv/'
          break
        case 'seznam.cz':
          this.jumpUrl = 'https://www.seznam.cz/'
          break
        case 'mail.com':
          this.jumpUrl = 'https://www.mail.com/'
          break
        case 'aol.com':
          this.jumpUrl = 'https://www.aol.co.uk/'
          break
        default:
          this.jumpUrl = 'http://www.google.com/'
      }
      // todo 如何跳转
      window.open(this.jumpUrl)
    },
    async againVerify() {
      let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      let sendObj = {}
      if (this.regVerifyEmail !== '') {
        if (emailReg.test(this.regVerifyEmail)) {
          Object.assign(sendObj, {
            email: this.regVerifyEmail,
            mailType: this.$store.state.pop.mailType
          })
          let regMsg = await this.$store.dispatch('sendEmail', sendObj)
          if (regMsg && regMsg.status.toString() === '100') {
            this.$store.dispatch('startBackTime')
          }
        } else {
          this.$error(_('Please enter your email address'))
        }
      }
    },
    showSignIn() {
      this.$store.commit('showLoginPop')
      this.$store.commit('hideVerifyEmail')
    }
  },
  computed: {
    regVerifyEmail() {
      let regEmail = this.$store.state.pop.regVerifyEmail
      if (regEmail) {
        this.lastEmail = regEmail.slice(regEmail.indexOf('@') + 1)
      }
      return regEmail
    },
    emailBackTime() {
      return this.$store.state.pop.emailBackTime
    },
    isLog() {
      return this.$store.state.isLog
    },
    show: {
      set: function(isShow) {
        if (!!isShow === true) {
          this.$store.commit('showVerifyEmail')
        } else {
          this.$store.commit('hideVerifyEmail')
        }
      },
      get: function() {
        return this.$store.state.pop.showVerifyEmail
      }
    }
  },
  mounted() {}
}
</script>

<style lang="less" scoped type="text/less">
.pop-verify-email .icon-email {
  width: 64px;
  height: 48px;
}
.pop_email_bottom {
  display: flex;
  justify-content: center;
  height: 56px;
  line-height: 46px;
  > * {
    margin: 0 20px;
  }
}
.hideVisibily {
  visibility: hidden;
}
</style>
