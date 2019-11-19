<template>
  <div class="footer">
    <div class="fmain">
      <div class="reserved">
        <p></p>
      </div>
      <div class="foot-mid clearfix">
        <div class="about"></div>
        <div class="game"></div>
      </div>
      <div class="contact">
        <section>
          <div class="contact_box">
            <div class="ftitle">
              联系
            </div>
            <p>
              <lang>QQ:</lang>
              <a href="javascript:;">1196781017</a>
            </p>
          </div>
          <div class="language hide" :class="{ on: isShowLanguage }" @click="headControlPop('showLanguage')">
            <div
              class="language-choose"
              v-for="(item, index) in languageOptions"
              :key="index"
              v-if="item.value === languageVal"
            >
              <img :src="item.lanLogo" alt="" />
              {{ item.label }}
            </div>
            <ul>
              <li
                v-for="(item, index) in languageOptions"
                :key="index"
                v-if="item.value !== languageVal"
                @click="handleLanguageChange(item.value)"
              >
                <img :src="item.lanLogo" width="27" height="15" alt="" />
                <span>{{ item.label }}</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <div class="cs-copyright">
        <p>若本站无意侵犯了贵司版权，请给网页底部邮箱地址来信,我们会及时处理和回复,谢谢。</p>
        <p>管理员邮箱：zgxie@126.com</p>
        ©Katoto 2018. All Rights Reserved
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      languageOptions: [
        {
          value: 'en',
          label: 'English',
          lanLogo: '../../../static/staticImg/lan-en.jpg'
        },
        {
          value: 'zhCn',
          label: '中文简体',
          lanLogo: '../../../static/staticImg/lan-cn.jpg'
        },
        {
          value: 'zhTw',
          label: '中文繁體',
          lanLogo: '../../../static/staticImg/lan-cn.jpg'
        }
      ],
      isShowLanguage: false
    }
  },
  methods: {
    scroll() {
      window.scrollTo(0, 0)
    },
    handleLanguageChange(val) {
      this.$store.commit('changeLanguage', val)
    },
    headControlPop() {
      this.isShowLanguage = !this.isShowLanguage
    }
  },
  computed: {
    languageVal: {
      set(val) {
        this.$store.commit('changeLanguage', val)
      },
      get() {
        return this.$store.state.language
      }
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped type="text/less">
@import '../styles/lib-public.less';

.footer {
  position: relative;
  height: 200px;
  width: 100%;
  z-index: 5;
  background: #151515;
  color: rgba(255, 255, 255, 0.4);
  line-height: 24px;
  font-size: 14px;
  overflow: hidden;
  .fmain {
    box-sizing: border-box;
    max-width: 1190px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding-top: 22px;
    overflow: hidden;
    background: transparent;
    .contact_box {
      float: right;
      margin-left: 26px;
    }
  }
  .ftitle {
    line-height: 32px;
    font-size: 20px;
  }
  a {
    line-height: 24px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.4);
    &:hover {
      filter: brightness(1.3);
    }
  }
  .reserved {
    box-sizing: border-box;
    float: left;
    width: 460px;
    padding-right: 45px;
  }
  .foot-mid {
    width: 390px;
    float: left;
    .about,
    .game {
      width: 50%;
      float: left;
      a {
        display: block;
      }
    }
  }
  .contact {
    position: relative;
    text-align: right;
    overflow: hidden;
    margin-bottom: 10px;
    z-index: 2;
    a {
      color: #6f88cb;
    }
  }
  .language {
    position: relative;
    float: right;
    margin-top: 10px;
    width: 130px;
    border: 1px solid #6f8198;
    line-height: 16px;
    font-size: 14px;
    color: #fff;
    img {
      width: 32px;
      height: 16px;
      margin-right: 6px;
    }
    &.on {
      border-color: #698cdd;
      ul {
        display: block;
      }
    }
  }
  .cs-copyright {
    position: relative;
    width: 100%;
    text-align: center;
  }
}

/* xs超小屏幕（手机，最大 480） */
@media (max-width: @screen-phone) {
  .footer {
    .cs-copyright {
      position: relative;
      margin: 0 auto;
      width: 96%;
    }
  }
  .contact {
    display: none;
  }
}
</style>
