<template>
    <div class="footer">
        <div class=" container">
            <div class="reserved col-xs-12 col-md-4">
                <p>
                    Welcome to Coinslot and start a new gaming experience! Coinslot is a fair and fair, open and
                    absolutely transparent game platform. The platform is based on Ethereum. Blockchain technology is
                    used to guarantee the results of the lottery. The lottery number and betting record cannot be
                    falsified.
                </p>
            </div>
            <div class="col-md-4 clearfix">
                <div class="about col-xs-6 col-md-6">
                    <div class="title">
                        <lang>Coinslot</lang>
                    </div>
                    <a href="javascript:;">
                        <lang>Terms of Use</lang>
                    </a>
                    <a href="javascript:;" @click="jump2Page">
                        <lang>Privacy Policy</lang>
                    </a>
                    <a href="javascript:;">Transparency</a>
                    <a href="javascript:;">Help Center</a>
                </div>
                <div class="game col-xs-6 col-md-6">
                    <div class="title">
                        <lang>game</lang>
                    </div>
                    <a href="javascript:;">
                        Lucky 11
                    </a>
                    <a href="javascript:;">
                        slot
                    </a>
                    <a href="javascript:;">
                        LuckyCoin
                    </a>
                    <a href="javascript:;">
                        Mobile APP
                    </a>
                </div>
            </div>
            <div class="contact col-md-4">
                <div class="title">
                    <lang>Contact Us</lang>
                </div>
                <p>
                    <lang>General issues:</lang>
                    <a href="mailto:lucky11@coinslot.com">lucky11@coinslot.com</a>
                </p>
                <p>
                    <lang>Technical support service:</lang>
                    <a href="mailto:support@coinslot.com">support@coinslot.com</a>
                </p>
                <p>
                    <lang>Telegram:</lang>
                    <a href="https://t.me/coinslotoffice" target="_blank">https://t.me/coinslotoffice</a>
                </p>
                <div class="language" :class="{on:isShowLanguage}" @click="headControlPop('showLanguage')">
                    <div class="language-choose">
                        <template v-for="item in languageOptions" v-if="item.value===languageVal">
                            <img :src="item.lanLogo" alt="">
                            <span>{{ item.label }}</span>
                        </template>
                    </div>
                    <ul>
                        <li v-for="item in languageOptions" v-if="item.value!==languageVal"
                            @click="handleLanguageChange(item.value)">
                            <img :src="item.lanLogo" width="27" height="15" alt="">
                            <span>{{ item.label }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="cs-copyright">
                ©Coinslot 2018. All Rights Reserved
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
            scroll () {
                window.scrollTo(0, 0)
            },
            handleLanguageChange (val) {
                this.$store.commit('changeLanguage', val)
            },
            jump2Page (lan = 'en') {
                if (this.language) {
                    lan = this.language
                }
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
            },
            headControlPop () {
                this.isShowLanguage = !this.isShowLanguage
            }
        },
        mounted () {
            if (~window.location.href.indexOf('policy')) {
                this.jump2Page()
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../styles/lib-public.less";
    @import "../styles/lib-media.less";

    .footer {
        position: relative;
        height: 342px;
        box-sizing: border-box;
        z-index: 5;
        background: #151515;
        /*border-top: 50px solid #eef1f9;*/
        //用border代替margin挡住冒泡
        padding: 58px 0 0 0;
        color: rgba(255, 255, 255, 0.2);
        line-height: 24px;
        font-size: 14px;
        .main {
            max-width: 1190px;
            margin: 0 auto;
            overflow: hidden;
        }
        .title {
            margin-bottom: 12px;
            line-height: 32px;
            font-size: 20px;
        }
        a {
            line-height: 24px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.2);
            transform: translate3d(0,0,0);
            &:hover {
                filter: brightness(1.3);
            }
        }
        .reserved {
            padding-right: 45px;
        }
        .about,
        .game {
            overflow: hidden;
            a {
                display: block;
            }
        }
        .contact {
            text-align: right;
            a {
                color: #6f88cb;
            }
        }
        .language {
            float: right;
            margin-top: 27px;
            position: relative;
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
            bottom: 0;
            transform: translateX(-50%);
            line-height: 90px;
        }
    }

    @media (max-width: @screen-tablet) {
        .footer{
            height: 1152/2px;
            padding: 0 4% 0;
            line-height: 20px;
            .title {
                margin-top: 17/2px;
                line-height: 57/2px;
                font-size: 18px;
            }
            .reserved {
                padding: 55/2px 0 0 0;
            }
            .about,
            .game {
                a{
                    line-height: 24px;
                    font-size: 14px;
                }
            }

            .contact {
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
                bottom: 10px;
                left: 4%;
                transform: translateX(0);
                line-height: 42/2px;
            }

        }
    }
</style>
