<template>
    <div class="footer">
        <div class=" container">
            <div class="reserved col-md-5">
                <div class="title">
                    <lang>©Coinslot 2018.  All Rights Reserved</lang>
                </div>
                <p>
                    <lang>Lucky 11 is a decentralized lottery product based on distributed ledger technology. Players can pick 1-5 numbers from 1 to 11 and submit it to the Ethereum. One draw per minute, let's start to win the prize!</lang>
                </p>
            </div>
            <div class="contact col-md-4">
                <div class="title">
                    <lang>Contact Us</lang>
                </div>
                <p>
                    <lang>General  issues:</lang>
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
            </div>
            <div class="about col-md-3">
                <div class="title">
                    <lang>About Us</lang>
                </div>
                <a href="javascript:;" class="hide"><lang>Terms of Use</lang></a>
                <a href="javascript:;" @click="jump2Page"><lang>Privacy Policy</lang></a>
                <a href="javascript:;" class="hide">How to Play</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {}
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

    //footer
    .footer{
        position: relative;
        z-index:5;
        background: #fff;
        border-top:50px solid #eef1f9;
        //用border代替margin挡住冒泡
        padding:16px 0 62px 0;
        color: #778ca3;
        .main{
            max-width:1190px;
            margin:0 auto;
            overflow: hidden;
        }
        .title{
            line-height:45px;
            font-size:16px;
        }
        p{
            line-height:20px;
            font-size:14px;
        }
        a{
            &:link,&:visited{
                color: #6a89cc;
            }
            &:hover{
                color: #333;
            }
        }
        .reserved{
            padding-right:103px;
        }
        .contact{
            /*margin-left:95px;*/
            a{
                font-weight:bold;
            }
        }
        .about{
            width:194px;
            a{
                display: block;
            }
        }
        @media (max-width: @screen-desktop) {
            padding: 0 20px 25px;
            .title{
                padding-top:14px;
                line-height:30px;
                font-size:14px;
            }
            p{
                line-height:15px;
                font-size:12px;
            }
            .reserved{
                padding-right:0;
            }
        }
    }

</style>
