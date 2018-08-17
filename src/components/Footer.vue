<template>
    <div class="footer">
        <div class="main">
            <div class="reserved">
                <p>
                    <lang>Welcome to Coinsprize, experience your new gaming journey here! As a game platform based on Ethereum, Coinsprize is fair, just and open. All information on Ethereum cannot be modified, you can check draw details to see open and transparent information at any time.</lang>
                </p>
            </div>
            <div class="foot-mid clearfix">
                <div class="about">
                    <div class="ftitle">
                        <lang>General </lang>
                    </div>
                    <a href="javascript:;" @click="jump2Page">
                        <lang>Terms of Use</lang>
                    </a>
                    <!--<router-link :to="{path: '/check'}" >-->
                        <!--<lang>Transparency Checking</lang>-->
                    <!--</router-link>-->
                    <router-link :to="{path: '/help'}" >
                        <lang>Help Center</lang>
                    </router-link>
                </div>
                <div class="game">
                    <div class="ftitle">
                        <lang>Games</lang>
                    </div>
                    <router-link :to="{path: '/slot'}" >
                        <lang>Slot</lang>
                    </router-link>
                    <router-link :to="{path: '/lucky11'}">
                        <lang>Lucky11</lang>
                    </router-link>

                    <!--<router-link :to="{path: '/luckycoin'}" >-->
                        <!--<lang>LuckyCoin</lang>-->
                    <!--</router-link>-->
                    <a target="_blank" href="http://www.exitedscam.me/?utm_source=coinsprize&utm_medium=dappradar">
                        <lang>F3d West</lang>
                    </a>
                </div>
            </div>
            <div class="contact">
                <div class="ftitle">
                    <lang>Contact Us</lang>
                </div>
                <p>
                    <lang>Telegram:</lang>
                    <a href="https://t.me/Coinsprizeoffice" target="_blank">https://t.me/Coinsprizeoffice</a>
                </p>
                <p>
                    <lang>Lucky11 issues:</lang>
                    <a href="mailto:lucky11@Coinsprize.com">lucky11@Coinsprize.com</a>
                </p>
                <p>
                    <lang>LuckyCoin issues:</lang>
                    <a href="mailto:lucky11@Coinsprize.com">luckycoin@Coinsprize.com</a>
                </p>
                <p>
                    <lang>Support service:</lang>
                    <a href="mailto:support@Coinsprize.com">support@Coinsprize.com</a>
                </p>
                <div class="language" :class="{on:isShowLanguage}" @click="headControlPop('showLanguage')">
                    <div class="language-choose" v-for="(item, index) in languageOptions" :key="index" v-if="item.value===languageVal">
                        <img :src="item.lanLogo" alt="">
                        {{ item.label }}
                    </div>
                    <ul>
                        <li v-for="(item, index) in languageOptions" :key="index" v-if="item.value!==languageVal"
                            @click="handleLanguageChange(item.value)">
                            <img :src="item.lanLogo" width="27" height="15" alt="">
                            <span>{{ item.label }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="cs-copyright">
                ©Coinsprize 2018. All Rights Reserved
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                languageOptions: [{
                    value: 'en',
                    label: 'English',
                    lanLogo: '../../../static/staticImg/lan-en.jpg'
                }, {
                    value: 'zhCn',
                    label: '中文简体',
                    lanLogo: '../../../static/staticImg/lan-cn.jpg'
                }, {
                    value: 'zhTw',
                    label: '中文繁體',
                    lanLogo: '../../../static/staticImg/lan-cn.jpg'
                }],
                isShowLanguage: false
            }
        },
        watch: {},
        methods: {
            jump2Page () {
                let lan = this.$store.state.language
                switch (lan) {
                case 'en':
                    this.$router.push('/policy')
                    break
                case 'zhCn':
                    this.$router.push('/policy_zhCn')
                    break
                case 'zhTw':
                    this.$router.push('/policy_zhTw')
                    break
                }
                this.$store.commit('hideLoginPop')
            },
            scroll () {
                window.scrollTo(0, 0)
            },
            handleLanguageChange (val) {
                this.$store.commit('changeLanguage', val)
            },
            headControlPop () {
                this.isShowLanguage = !this.isShowLanguage
            }
        },
        computed: {
            languageVal: {
                set (val) {
                    this.$store.commit('changeLanguage', val)
                },
                get () {
                    return this.$store.state.language
                }
            }
        },
        mounted () {
            if (~window.location.href.indexOf('policy')) {
                this.jump2Page()
            }
        }
    }
</script>
<style lang="less" scoped type="text/less">
    @import "../styles/lib-public.less";

    .footer {
        position: relative;
        min-height: 310px;
        z-index: 5;
        background: #151515;
        color: rgba(255, 255, 255, 0.4);
        line-height: 24px;
        font-size: 14px;
        &.lucky11{
            border-top: 50px solid #eef1f9;
            //用border代替margin挡住冒泡
        }
        .main {
            box-sizing: border-box;
            position: absolute;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
            max-width: 1190px;
            width: 100%;
            height: 100%;
            padding-top: 58px;
            overflow: hidden;
            background: transparent;
        }
        .ftitle {
            line-height: 32px;
            font-size: 20px;
        }
        a {
            line-height: 24px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.4);
            transform: translate3d(0,0,0);
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
        .foot-mid{
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
            a {
                color: #6f88cb;
            }
        }
        .language {
            position: relative;
            float: right;
            margin-top: 27px;
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
            .language-choose {
                position: relative;
                display: flex;
                justify-content: flex-start;
                padding: 6px;
                cursor: pointer;
                &::after {
                    position: absolute;
                    top: 11px;
                    right: 11px;
                    content: "";
                    display: block;
                    width: 13px;
                    height: 8px;
                    background: url(../assets/img/icon-arrow-down.png) no-repeat center;
                    background-size: 13px 8px;
                }
            }

            ul {
                display: none;
                li {
                    display: flex;
                    justify-content: flex-start;
                    padding: 6px;
                    cursor: pointer;
                    &.on {
                        background: #6683c5;
                        color: #fff;
                    }
                }
            }

            &.on {
                border-color: #698cdd;
                ul {
                    display: block;
                }
            }
        }
        .cs-copyright{
            position: absolute;
            left: 50%;
            bottom: 50px;
            transform: translateX(-50%);
        }
    }

    @media (max-width: @screen-lg-desktop) {
        .footer{
            height: 560px;
            line-height: 20px;
            .main{
                padding: 0 percentage(30/750) 0;
            }
            .ftitle {
                margin-top: 17/2px;
                margin-bottom: 0;
                line-height: 57/2px;
                font-size: 18px;
            }
            .reserved {
                width: 100%;
                padding: 55/2px 0 0 0;
            }
            .foot-mid{
                width: 100%;
                .about,
                .game {
                    a{
                        line-height: 24px;
                        font-size: 14px;
                    }
                }
            }
            .contact {
                width: 100%;
                text-align: left;
                p{
                    line-height: 24px;
                }
                .language {
                    float: left;
                }
            }
            .cs-copyright{
                position: absolute;
                left: 4%;
                transform: translateX(0);
            }

        }
    }
</style>
