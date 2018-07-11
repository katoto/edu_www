<template>
    <div class="footer">
        <div class="main">
            <div class="fl reserved">
                <div class="title">
                    <lang>©Coinslot 2018.  All Rights Reserved</lang>
                </div>
                <p>
                    <lang>Lucky 11 is a decentralized lottery product based on distributed ledger technology. Players can pick 1-5 numbers from 1 to 11 and submit it to the Ethereum. One draw per minute, let's start to win the prize!</lang>
                </p>
            </div>
            <div class="fl contact">
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
                    <lang>telegram:</lang> 
                    <a href="https://t.me/coinslotoffice" target="_blank">https://t.me/coinslotoffice</a>
                </p>
            </div>
            <div class="fr about hide">
                <div class="title">
                    About Us
                </div>
                <a href="javascript:;">Terms of Use </a>
                <a href="javascript:;">Privacy Policy</a>
                <a href="javascript:;">How to Play</a>
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
            }
        },
        computed: {},
        mounted () {

        }
    }
</script>
<style lang="less" scoped >
    @import "../styles/lib-public.less";

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
            width:1190px;
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
            color: #6a89cc;
            &:hover{
                color: #333;
            }
        }
        .reserved{
            width:492px;
        }
        .contact{
            margin-left:95px;
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
    }

</style>
