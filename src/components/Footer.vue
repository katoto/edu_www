<template>
    <div class="footer">
        <div class=" container">
            <div class="reserved col-xs-12 col-md-4">
                <p>
                    Welcome to Coinslot and start a new gaming experience! Coinslot is a fair and fair, open and absolutely transparent game platform. The platform is based on Ethereum. Blockchain technology is used to guarantee the results of the lottery. The lottery number and betting record cannot be falsified.
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
                <div class="language" :class="{on:showLanguage}" @click="showLanguage=!showLanguage">
                    <div class="language-choose">
                        <img src="../../static/staticImg/lan-en.jpg" alt="">
                        <span>English</span>
                    </div>
                    <ul>
                        <li>
                            <img src="../../static/staticImg/lan-cn.jpg" alt="">
                            <span>简体中文</span>
                        </li>
                        <li>
                            <img src="../../static/staticImg/lan-cn.jpg" alt="">
                            <span>繁体中文</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="reserved hide">
                ©Coinslot 2018. All Rights Reserved
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                showLanguage: false
            }
    },
        watch: {},
        methods: {
            scroll () {
                window.scrollTo(0, 0)
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
            language () {
                return this.$store.state.language
            }
        },
        mounted () {
            if (~window.location.href.indexOf('policy')) {
                this.jump2Page()
            }
        }
    }
</script>
<style lang="less" scoped >
    @import "../styles/lib-public.less";
    @import "../styles/lib-media.less";
    .footer {
        position: relative;
        z-index: 5;
        background: #151515;
        border-top: 50px solid #eef1f9;
        //用border代替margin挡住冒泡
        padding: 57px 0 62px 0;
        color: rgba(255, 255, 255, 0.2);
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
        p {
            line-height: 24px;
            font-size: 14px;
        }
        a {
            &:link,
            &:visited {
                color: rgba(255, 255, 255, 0.2);
            }
            &:hover {
                color: #333;
            }
        }
        .reserved {
            padding-right: 45px;
        }
        .about,
        .game {
            a {
                display: block;
            }
        }
        .contact {
            text-align: right;
            a {
                color: #788ca3;
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
                    background: url(../assets/img/icon-arrow-down.png) no-repeat
                    center;
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

        @media (max-width: @screen-desktop) {
            padding: 20px 20px 25px;
            .title {
                padding-top: 14px;
                line-height: 30px;
                font-size: 14px;
            }
            p {
                line-height: 15px;
                font-size: 12px;
            }
            .about,
            .game {
                margin: 0;
                padding: 0;
            }
            .reserved {
                padding-right: 0;
            }
            .contact {
                text-align: left;
                .language {
                    float: left;
                }
            }
        }
    }
</style>
