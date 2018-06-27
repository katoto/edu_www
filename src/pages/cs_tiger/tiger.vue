<template>
    <div class="tiger-pc">
        <Header></Header>
        <div class="tiger-main hide">
            <div class="tiger ">
                <img class="bg-tiger" src="../../assets/img/tiger/bg-tiger.jpg" alt="">
                <div class="tiger-wrap">
                    <!--低奖池-->
                    <div class="jackpot-low">
                        <div class="jackpot-all">
                            <p>
                                JACKPOT
                            </p>
                            <i>
                                3.56885
                            </i>
                            <span>
                                ETH
                            </span>
                        </div>
                        <div class="jackpot-win">
                            <!--bug: ipone5 not fint win-->
                            <p>
                                Hit to Win
                            </p>
                            <i>
                                1.890
                            </i>
                            <span>
                                ETH
                            </span>
                        </div>
                    </div>
                    <!--中奖播报-->
                    <div class="msg-win ">
                        <ul>
                            <li>Congratulate** on winning 0.01ETH</li>
                        </ul>
                    </div>
                    <!--进行中 run 开奖 opening -->
                    <div class="slot ">
                        <!--复位reset -->
                        <div class="slot-box">
                            <ul class="slot-item1">
                                <li class="yes">
                                    <img src="../../assets/img/tiger/logo-team.png" alt="" id="hei">
                                </li>
                                <li class="yes">
                                    <img src="../../assets/img/tiger/logo-team.png" alt="">
                                </li>
                                <li class="yes">
                                    <img src="../../assets/img/tiger/logo-team.png" alt="">
                                </li>
                                <li class="yes">
                                    <img src="../../assets/img/tiger/logo-team.png" alt="">
                                </li>
                                <li class="yes">
                                    <img src="../../assets/img/tiger/logo-team.png" alt="">
                                </li>
                                <li class="yes">
                                    <img src="../../assets/img/tiger/logo-team.png" alt="">
                                </li>
                            </ul>
                            <ul class="slot-item2">
                                <li class="yes">
                                    <img src="../../assets/img/tiger/logo-team.png" alt="">
                                </li>
                                <li>
                                    <img src="../../assets/img/tiger/logo-team.png" alt="">
                                </li>
                                <li>
                                    <img src="../../assets/img/tiger/logo-team.png" alt="">
                                </li>
                                <li>
                                    <img src="../../assets/img/tiger/logo-team.png" alt="">
                                </li>
                                <li>
                                    <img src="../../assets/img/tiger/logo-team.png" alt="">
                                </li>
                            </ul>
                            <ul class="slot-item3">
                                <li>
                                    <img src="../../assets/img/tiger/logo-team.png" alt="">
                                </li>
                                <li class="yes">
                                    <img src="../../assets/img/tiger/logo-team.png" alt="">
                                </li>
                                <li>
                                    <img src="../../assets/img/tiger/logo-team.png" alt="">
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--底部操作-->
                    <div class="operating ">
                        <!-- 展开 on-->
                        <div class="single ">
                            <div class="top">
                                <div class="single-amount">
                                    0.00001
                                </div>
                                <div class="single-unit">
                                    ETH
                                </div>
                            </div>
                            <p class="msg">
                                Single Bet
                            </p>
                            <ul>
                                <li>
                                    <div class="single-amount">
                                        0.001
                                    </div>
                                    <div class="single-unit">
                                        ETH
                                    </div>
                                </li>
                                <li>
                                    <div class="single-amount">
                                        0.0001
                                    </div>
                                    <div class="single-unit">
                                        ETH
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="all">
                            <div class="top">
                                <div class="all-amount">
                                    0.0009
                                </div>
                                <div class="all-unit">
                                    ETH
                                </div>
                            </div>
                            <p class="msg">
                                Current Bet
                            </p>
                        </div>
                        <div class="bar">
                            <div class="top">
                                <div class="bar-process">

                                    <i></i>
                                </div>
                                <div class="bar-msg">
                                    48%
                                </div>
                            </div>
                            <p class="msg">
                                Lucky Bar
                            </p>
                        </div>
                    </div>
                    <!--上次赢取-->
                    <div class="lastwin ">
                        Last time win 0.0018 ETH
                    </div>
                    <!--主按钮-->
                    <a href="javascript:;" class="btn-main">
                        <img src="../../assets/img/tiger/btn-bg.png" alt="">
                        <!-- 开始按钮btn-spin-->
                        <div class="btn btn-spin ">
                            <p>SPIN</p>
                            <div>Auto(double click)</div>
                        </div>
                        <!--免费-->
                        <div class="btn btn-free hide">
                            <p>FREE</p>
                            <div>3 Times</div>
                        </div>
                        <!--自动-->
                        <div class="btn btn-auto hide">
                            <p>AUTO</p>
                            <div>Double Click to Stop</div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="tiger-pc-msg">
                <h3>Recently </h3>
                <div class="recent-win">
                    <div class="recent-top">
                        <div class="user">
                            User
                        </div>
                        <div class="win">
                            Win
                        </div>
                        <div class="time">
                            Time
                        </div>
                    </div>
                    <ul class="recent-main">
                        <li>
                            <div class="user">
                                Pi***@gmail.com
                            </div>
                            <div class="win">
                                0.0321 ETH
                            </div>
                            <div class="time">
                                16:55
                            </div>
                        </li>
                        <li>
                            <div class="user">
                                Pi***@gmail.com
                            </div>
                            <div class="win">
                                0.0321 ETH
                            </div>
                            <div class="time">
                                16:55
                            </div>
                        </li>
                        <li>
                            <div class="user">
                                Pi***@gmail.com
                            </div>
                            <div class="win">
                                0.0321 ETH
                            </div>
                            <div class="time">
                                16:55
                            </div>
                        </li>
                        <li>
                            <div class="user">
                                Pi***@gmail.com
                            </div>
                            <div class="win">
                                0.0321 ETH
                            </div>
                            <div class="time">
                                16:55
                            </div>
                        </li>
                        <li>
                            <div class="user">
                                Pi***@gmail.com
                            </div>
                            <div class="win">
                                0.0321 ETH
                            </div>
                            <div class="time">
                                16:55
                            </div>
                        </li>
                        <li>
                            <div class="user">
                                Pi***@gmail.com
                            </div>
                            <div class="win">
                                0.0321 ETH
                            </div>
                            <div class="time">
                                16:55
                            </div>
                        </li>
                        <li>
                            <div class="user">
                                Pi***@gmail.com
                            </div>
                            <div class="win">
                                0.0321 ETH
                            </div>
                            <div class="time">
                                16:55
                            </div>
                        </li>
                        <li>
                            <div class="user">
                                Pi***@gmail.com
                            </div>
                            <div class="win">
                                0.0321 ETH
                            </div>
                            <div class="time">
                                16:55
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="contact">
                    <div class="fl">
                        <div class="msg1">Recommend using mobile phone to Interviews the game</div>
                        <div class="msg2">https://www.coinslot.com/tiger</div>
                    </div>
                    <div class="fr">
                        <img src="../../assets/img/tiger/code.jpg" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '~components/Header_bk.vue'
	export default {
	    data () {
	        return {
	            title: ''
	        }
	    },
	    watch: {},
	    methods: {

        },
	    computed: {},
        components:{
            Header
        },
	    mounted () {

        }
	}
</script>
<style scoped="" lang="less" rel="stylesheet/less">
    @import "../../styles/lib-mixins.less";
    @import "../../styles/lib-media.less";
    @import "../../styles/tiger.less";
    @import "../../styles/lib-font.less";
    div,a,img,p,span,i{
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
    }
    /*以移动端为主来写*/
    .bg-lucky{

    }
    .tiger{
        position: relative;
        -webkit-overflow-scrolling: touch;
        .bg-tiger{
            display: block;
            width:100%;
        }
    }
    .tiger-wrap{
        position: absolute;
        left:0;
        top:0;
        width:100%;
        height:100%;
    }
    .jackpot-low{
        position: relative;
        z-index:4;
        margin:0 auto;
        background: url("../../assets/img/tiger/bg-jackpot.png") no-repeat center;
        background-size: contain;
        width:percentage(477/750);
        height:117/2px;
        overflow: hidden;
        font-family: imp;
        text-align: center;
        color: #ffe400;
        .jackpot-all{
            display: flex;
            justify-content: center;
            height:37px;
            overflow: hidden;
            p{
                line-height:41px;
                font-size:15px;
                color: #f3ca83;
            }
            i{
                margin:0 3px 0 7px;
                line-height:37px;
                font-size:23px;
            }
            span{
                line-height:42px;
                font-size:15px;
            }
        }
        .jackpot-win{
            display: flex;
            justify-content: center;
            height:35/2px;
            overflow: hidden;
            p{
                line-height:20px;
                font-size:12px;
                color: #f3ca83;
            }
            i{
                line-height: 35/2px;;
                margin:0 3px 0 7px;
                font-size:14px;
            }
            span{
                line-height:21px;
                font-size:10px;
            }
        }
    }
    .msg-win{
     /*   position: absolute;
        left:50%;
        top:0;
        margin-left:-482/4px;*/
        display: none;
        position: relative;
        z-index:3;
        margin:0 auto;
        width:482/2px;
        height:42/2px;
        overflow: hidden;
        background: url("../../assets/img/tiger/bg-msg-win.png") no-repeat center;
        background-size: cover;
        line-height:21px;
        text-align: center;
        font-size:10px;
        color: #ffffff;
    }
    .slot{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        overflow: hidden;
        z-index:2;
        .bg-slot{
            position: absolute;
            left:0;
            bottom:26px;
            width:100%;
        }
        .bg-slot-run{
            display: none;
        }
    }
    .slot.run{
        background: url("../../assets/img/tiger/bg-slot-run.png") no-repeat top center;
        background-size: contain;
    }
    .slot.reset{
       .slot-box{
            ul{

            }
       }
    }
    .slot.opening{
        .slot-box{
            overflow: visible;
        }
        ul{
            height:100%;
            overflow: hidden;
        }
        li.yes{
            border:4px solid #fff287;
            border-radius: 12px;
            box-shadow:inset 0 0 10px #fff287,0 0 10px #fff287;
        }
        li:not(.yes){
            img{
                opacity:0.3;
            }
        }
    }
    .slot-box{
        position: relative;
        margin:0 auto;
        top:percentage(264/1173);
        width:percentage(610/750);
        /*高度需要动态设置*/
        height:290px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        /*~防止less解析/，这里是单独设置水平和垂直的半径*/
        border-radius: ~"123px/60px";
        ul{
            width:33%;
            li{
                width:95%;
                box-sizing: border-box;
                margin:15px auto;
                transition: all 0.2s ease-in;
                img{
                    display: block;
                    margin:0 auto;
                    /* 168/203=82.75*/
                    width:82.75%;
                }
            }
        }
    }
    .slot-item1{

    }
    .slot-item2{

    }
    .btn-main{
        position: absolute;
        z-index:3;
        bottom:-4px;
        left:50%;
        transform: translateX(-50%);
        width:48.4%;
        cursor: pointer;
        img{
            display: block;
            width:100%;
        }
        .btn{
            position: absolute;
            top:0px;
            left:50%;
            transform: translateX(-50%);
            width:percentage(339/363);
            height:percentage(118/143);
            overflow: hidden;
            text-align: center;
            color: #fff;
            font-family:arial;
            p{
                padding-top:7px;
                line-height:26px;
                font-size:24px;
                font-weight:bold;
            }
            div{
                line-height:20px;
                font-size:12px;
            }
        }
        .btn-spin{
            background: url("../../assets/img/tiger/btn-spin.png") no-repeat center;
            background-size: cover;
        }
        .btn-free{
            background: url("../../assets/img/tiger/btn-free.png") no-repeat center;
            background-size: cover;
        }
        .btn-auto{
            background: url("../../assets/img/tiger/btn-auto.png") no-repeat center;
            background-size: cover;
        }
        &:active{
            .btn{
                animation: btn .5s;
            }
        }
    }
    .lastwin{
        position: absolute;
        z-index:3;
        left:0;
        bottom:percentage(146/1173);
        width:100%;
        height:28px;
        overflow: hidden;
        text-align: center;
        line-height:28px;
        font-size:10px;
        color: #fff;
        font-family:Arial;
    }
    .operating{
        position: absolute;
        z-index:3;
        width:percentage(610/750);
        left:50%;
        bottom:percentage(200/1173);
        transform: translateX(-50%);
        display: flex;
        justify-content: space-between;
        text-align: center;
        >div{
            position: relative;
            width:percentage(173/610);
            border-radius: 6px;
            padding:0 5px;
            box-sizing: border-box;
        }
        .single{
            background: #2f250f;
            border:2px solid #bc9357;
            .single-amount{
                font-size:15px;
            }
            .single-unit{
                line-height:22px;
                font-size:10px;
            }
            ul{
                display: none;
                position: absolute;
                left:-2px;
                top:-54px;
                width:100%;
                border:2px solid #bc9357;
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
                border-bottom:none;
                color: #ffe400;
                background: #2f250f;
                li{
                    display: flex;
                    justify-content: center;
                    height:25px;
                    line-height:25px;
                    background: url("../../assets/img/tiger/bg-green.jpg") repeat-x;
                    background-size: cover;
                    border-top-left-radius: 6px;
                    border-top-right-radius: 6px;
                    border-top:2px solid #2f250f;
                    margin:0 2px;
                    font-weight:bold;
                    .single-unit{
                        line-height:28px;
                    }
                }
            }
            .msg{
                position: relative;
                &::after{
                    content: '';
                    display: block;
                    position: absolute;
                    top:5px;
                    right:5%;
                    background: url("../../assets/img/tiger/icon-arrow.png") no-repeat center;
                    background-size: cover;
                    width:15/2px;
                    height:9/2px;
                }
            }
            &.on{
                border-top:transparent;
                border-top-left-radius: 0;
                border-top-right-radius: 0;
                ul{
                    display: block;
                }
            }
        }
        .all{
            background-color: rgba(0,0,0,0.3);
            .all-amount{
                font-size:15px;
            }
            .all-unit{
                line-height:22px;
                font-size:10px;
            }
        }
        .bar{
            background-color: rgba(0,0,0,0.3);
            .top{
                justify-content: space-between;
            }
            .bar-process{
                position: relative;
                width:percentage(104/175);
                overflow: hidden;
                margin-top:3px;
                background: url("../../assets/img/tiger/bg-bar.png") no-repeat top center;
                background-size: contain;
                i{
                    position: absolute;
                    box-sizing: border-box;
                    left:5%;
                    top:19%;
                    width:90%;
                    height:40%;
                    overflow: hidden;
                    background: url("../../assets/img/tiger/bg-green.jpg") repeat-x;
                    background-size: cover;
                    border-radius: 2px;
                }
            }
            .bar-msg{
                font-size:13px;
                color: #7fd31d;
                font-weight:bold;
            }
        }
        .top{
            display: flex;
            justify-content: center;
            padding-top:6px;
            height:43/2px;
            line-height:43/2px;
            color: #ffe400;
            font-weight:bold;
        }
        .msg{
            border-top:1px solid rgba(255,255,255,0.2);
            line-height:16px;
            font-size:10px;
            color: #fff;
            font-family:Arial;
        }
    }

    /*pc content*/
    .tiger-pc-msg{
        width:365px;
        height:100%;
        padding:0 18px;
        background: rgba(29,21,7,0.8);
        color: #79695c;
        h3{
            line-height:64px;
            font-size:28px;
        }
        .recent-win{
            text-align: center;
        }
        .user{
            float: left;
            width: 160px;
            text-align: left;
        }
        .win{
            float: left;
            width:92px;
        }
        .time{
            float: right;
            width:58px;
        }
    }
    .recent-top{
        padding:0 10px;
        line-height:30px;
        font-size:16px;
        border-bottom:1px solid #5a4d3f;
        text-align: center;
        overflow: hidden;
    }
    .recent-main{
        li{
            padding: 0 10px;
            line-height:40px;
            overflow: hidden;
        }
        li:nth-child(2n){
            background: #352b17;
        }
        .user{
            color: #fff;
        }
        .win{
            color: #f4dc01;
        }
        .time{
            color: #67594d;
        }
    }

    .contact{
        padding-top:45px;
        .fl{
            float: left;
            width:250px;
        }
        .fr{
            float: right;
            img{
                display: block;
                margin-top:4px;
                width:75px;
                height:71px;
            }
        }
        .msg1{
            line-height:22px;
        }
        .msg2{
            line-height:43px;
            font-size:16px;
            color: #ffffff;
        }
    }
    @keyframes btn {
        0%,100%{
            top:0;
        }
        50%{
            top:2px;
        }
    }
    /*适配*/
    @media(max-width: @screen-desktop){
       .tiger-pc-msg{
           display: none;
       }
       .msg-win{
           display: block;
       }
    }
    @media (min-width: @screen-phone) {
        .tiger-pc{
            position: absolute;
            top:0;
            left:50%;
            transform: translateX(-50%);
            width:100%;
            height:586px;
            background: url("../../assets/img/tiger/bg-pc.jpg") no-repeat top center;
            background-size: 1920px 586px;
        }
        .tiger-main{
            width:826px;
            height:100%;
            margin:0 auto;
            overflow: hidden;
            display: flex;
            justify-content: center;
        }
        div,a,img,p,span,i{
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: text;
        }
        .tiger{
            width:375px;
            overflow: hidden;
            border-left:25px solid #080603;
            border-right:25px solid #080603;
        }
        .operating .bar .bar-process i{
            top: 14%;
            height: 38%;
        }
        .operating .single .msg::after{
            right: 0;
        }
    }
    //background: url("../../assets/img/tiger/bg-slot.png") no-repeat center;

</style>
