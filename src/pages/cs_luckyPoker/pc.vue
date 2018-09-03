<template>
    <div class="luckyPoker">
        <div class="main">
            <div class="bg-esktop">
                <!--历史开奖记录-->
                <div class="poker-history">
                    <p class="title">Your history draw</p>
                    <div class="history-main">
                        <a class="btn btn-left" href="javascript:;"></a>
                        <div class="poker-item">
                            <ul>
                                <li class="poker-next">
                                    <p>?</p>
                                </li>
                                <li class="icon-hongt">
                                    <p>1</p>
                                </li>
                                <li class="icon-fk">
                                    <p>4</p>
                                </li>
                                <li class="icon-mh">
                                    <p>J</p>
                                </li>
                                <li class="icon-heit">
                                    <p>A</p>
                                </li>
                                <li class="icon-hongt">
                                    <p>J</p>
                                </li>
                                <li class="icon-fk">
                                    <p>n</p>
                                </li>
                                <li class="icon-mh">
                                    <p>J</p>
                                </li>
                                <li class="icon-heit">
                                    <p>A</p>
                                </li>
                                <li class="joker">
                                    <p></p>
                                </li>
                                <li class="icon-heit">
                                    <p>A</p>
                                </li>
                                <li class="icon-hongt">
                                    <p>J</p>
                                </li>
                                <li class="icon-fk">
                                    <p>n</p>
                                </li>
                                <li class="icon-mh">
                                    <p>J</p>
                                </li>
                                <li class="icon-heit">
                                    <p>A</p>
                                </li>
                                <li class="joker">
                                    <p></p>
                                </li>
                            </ul>
                        </div>
                        <a class="btn btn-right" href="javascript:;"></a>
                    </div>
                </div>
                <div class="bg-pc-esktop ">
                    <!--投注区-->
                    <div class="area-betting">
                        <!--red or balck-->
                        <div class="bet-rb">
                            <p class="poker-prize">
                                最高可中  0.002 ETH
                            </p>
                            <ul>
                                <li class="bet-red">
                                    <i>
                                        <img class="icon-hongt" src="@assets/img/luckyPoker/icon-hongt.png" alt="">
                                    </i>
                                    <p>RED</p>
                                    <i>
                                        <img class="icon-fk" src="@assets/img/luckyPoker/icon-fk.png" alt="">
                                    </i>
                                </li>
                                <li class="bet-black">
                                    <i>
                                        <img src="@assets/img/luckyPoker/icon-heit.png" alt="">
                                    </i>
                                    <p>BLACK</p>
                                    <i>
                                        <img src="@assets/img/luckyPoker/icon-mh.png" alt="">
                                    </i>
                                </li>
                            </ul>
                            <p class="poker-time">
                                2 Times
                            </p>
                        </div>
                        <div class="bet-joker">
                            <p class="poker-prize">最高可中0.002ETH</p>
                            <ul>
                                <li>
                                    <p>JOKER</p>
                                    <img src="@assets/img/luckyPoker/icon-crown.png" alt="">
                                </li>
                            </ul>
                            <p class="poker-time">
                                27 Times
                            </p>
                        </div>
                        <div class="bet-color">
                            <p class="poker-prize">
                                最高可中  0.002 ETH
                            </p>
                            <ul>
                                <li>
                                    <img src="@assets/img/luckyPoker/icon-heit.png" alt="">
                                </li>
                                <li>
                                    <img src="@assets/img/luckyPoker/icon-hongt.png" alt="">
                                </li>
                                <li>
                                    <img src="@assets/img/luckyPoker/icon-mh.png" alt="">
                                </li>
                                <li>
                                    <img src="@assets/img/luckyPoker/icon-fk.png" alt="">
                                </li>
                            </ul>
                            <p class="poker-time">
                                4 Times
                            </p>
                        </div>
                        <div class="bet-number">
                            <p class="poker-prize">
                                最高可中  0.002 ETH
                            </p>
                            <ul class="item1">
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                                <li>5</li>
                                <li>6</li>
                                <li>7</li>
                                <li>8</li>
                                <li>9</li>
                                <li>10</li>
                                <li>J</li>
                            </ul>
                            <ul class="item2">
                                <li>Q</li>
                                <li>K</li>
                                <li>A</li>
                            </ul>
                            <div class="btn-cls ">
                                <a href="javascript:;" >
                                    清除
                                </a>
                            </div>
                            <p class="poker-time">
                                13 Times
                            </p>
                        </div>
                    </div>
                    <!--按钮区-->
                    <div class="area-btn clearfix">
                        <ul class="clearfix">
                            <li>
                                <img src="@assets/img/luckyPoker/coin-0.0001.png" alt="">
                                <p>0.0001</p>
                            </li>
                            <li>
                                <img src="@assets/img/luckyPoker/coin-0.001.png" alt="">
                                <p>0.001</p>
                            </li>
                            <li class="on">
                                <img src="@assets/img/luckyPoker/coin-0.01.png" alt="">
                                <p>0.01</p>
                            </li>
                            <li>
                                <img src="@assets/img/luckyPoker/coin-0.1.png" alt="">
                                <p>0.1</p>
                            </li>
                        </ul>
                        <!--wait/unable-->
                        <div href="javascript:;" class="btn-main ">
                            <p>PAY</p>
                            <!--<p>Please wait</p>-->
                            <i>0.00001 ETH</i>
                        </div>
                    </div>
                </div>
                <!--记录-->
                <div class="recording ">
                    <div class="recording-top">
                        <p>
                            Custom random number
                        </p>
                        <!--点击后文案变成back，类似11选5超级选5那个按钮-->
                        <!--on-->
                        <a href="javascript:;" class="">
                            Myself
                        </a>
                    </div>
                    <div class="recording-table">
                        <ul class="top flex-between">
                            <li>Player</li>
                            <li>Betting</li>
                            <li>Result</li>
                        </ul>
                        <ul class="recoding-main">
                            <li>
                                <p class="bet-user">
                                    380482989@gmail.com
                                </p>
                                <!--number black red fk mh hongt heit joker-->
                                <div class="bet-expect number">
                                    6
                                </div>
                                <p class="bet-count">
                                    0.00000 ETH
                                </p>
                                <div class="bet-result icon-heit">
                                    <p>8</p>
                                </div>
                                <p class="bet-result-count">
                                    0 ETH
                                </p>
                            </li>
                            <li>
                                <p class="bet-user">
                                    222222222222222@gmail.com
                                </p>
                                <div class="bet-expect black">
                                    balck
                                </div>
                                <p class="bet-count">
                                    0.00001 ETH
                                </p>
                                <div class="bet-result icon-hongt">
                                    <p>Q</p>
                                </div>
                                <p class="bet-result-count">
                                    0.00001 ETH
                                </p>
                            </li>
                            <li>
                                <p class="bet-user">
                                    222222222222222@gmail.com
                                </p>
                                <div class="bet-expect red">
                                    RED
                                </div>
                                <p class="bet-count">
                                    0.00001 ETH
                                </p>
                                <div class="bet-result icon-fk">
                                    <p>Q</p>
                                </div>
                                <p class="bet-result-count">
                                    0.00001 ETH
                                </p>
                            </li>
                            <li>
                                <p class="bet-user">
                                    222222222222222@gmail.com
                                </p>
                                <div class="bet-expect fk">
                                    Q
                                </div>
                                <p class="bet-count">
                                    0.00001 ETH
                                </p>
                                <div class="bet-result icon-mh">
                                    <p>Q</p>
                                </div>
                                <p class="bet-result-count">
                                    0.00001 ETH
                                </p>
                            </li>
                            <li>
                                <p class="bet-user">
                                    380482989@gmail.com
                                </p>
                                <div class="bet-expect mh">
                                    J
                                </div>
                                <p class="bet-count">
                                    0.00001 ETH
                                </p>
                                <div class="bet-result joker">
                                    <p></p>
                                </div>
                                <p class="bet-result-count mywin">
                                    0.00001 ETH
                                </p>
                            </li>
                        </ul>
                    </div>
                    <!--pc random area-->
                    <div class="pc-verification">
                        <a href="javascript:;" class="btn-href">Fairness verification</a>
                        <a href="javascript:;" class="btn-question"></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="pop pop-random hide">
            <div class="pop-body">
                <div class="pop-ani">
                    <a href="javascript:;" class="btn-close">X</a>
                    <div class="pop-main">
                        <h2>
                            Custom random number
                        </h2>
                        <ul class="tab-h">
                            <li>
                                <a href="javascript:;">
                                    This round of random number setting
                                </a>
                            </li>
                            <li class="on">
                                <a href="javascript:;">
                                    Upper round random number check
                                </a>
                            </li>
                        </ul>
                        <ul class="tab-c">
                            <div class="random-main hide">
                                <ul>
                                    <li>
                                        <p class="title">
                                            Client seed
                                        </p>
                                        <div class="input-group">
                                            <input type="text">
                                            <a href="javascript:;" class="btn btn-random">
                                                RANDOMIZE
                                            </a>
                                            <a href="javascript:;"  class="btn btn-lock">
                                                LOCK
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <p class="title">
                                            Client seed
                                        </p>
                                        <div class="input-group">
                                            <input type="text">
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="random-main ">
                                <ul >
                                    <li>
                                        <p class="title">
                                            Client seed
                                        </p>
                                        <div class="input-group">
                                            <input type="text">
                                        </div>
                                    </li>
                                    <li>
                                        <p class="title">
                                            Random number hash value
                                        </p>
                                        <div class="input-group">
                                            <input type="text">
                                        </div>
                                    </li>
                                    <li>
                                        <p class="title">
                                            Random number hash value
                                        </p>
                                        <div class="input-group">
                                            <input type="text">
                                        </div>
                                    </li>
                                </ul>
                                <a href="javascript:;" class="btn-check">
                                    Check
                                </a>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped type="text/less">
    @import "../../styles/lib-mixins.less";
    .luckyPoker{
        background:#1b262c url("../../assets/img/luckyPoker/bg-pc.jpg") no-repeat center top;
        background-size: 1920px;
        padding-top: 0;
        text-align: center;
        font-family: sans-r;
        *{
            box-sizing: border-box;
        }
        .main{
            width: 1045+31+31px;
            padding-right: 31px;
            margin: 0 auto;
            overflow: hidden;
        }
        .bg-pc-esktop{
            position: relative;
            float: left;
            z-index: 2;
            width: 100%;
            max-width: 612px;
            padding: 52px 85px 0;
            height: 826px;
            font-weight: bold;
            background: url("../../assets/img/luckyPoker/bg-pc-desktop.png") no-repeat center top;
            background-size: 612px;
        }
        .flex-between{
            display: flex;
            justify-content: space-between;
        }
        .poker-prize{
            display: table;
            position: absolute;
            top: -24/2px;
            left: 50%;
            z-index: 2;
            transform: translate(-50%);
            border: 2px solid #6faeae;
            background: #003333;
            border-radius: 8px;
            padding: 0 18px;
            height: 24px;
            line-height: 20px;
            color: #33cc66;
            font-size: 14px;
            //需要设置最大font-size
            font-weight: bold;
        }
        .poker-time{
            height:33px;
            line-height: 20px;
            font-size: 16px;
            color: #99cccc;
            font-weight: bold;

        }
        /*投注区*/
        .area-betting{
            .bet-rb{
                position: relative;
                float: left;
                width: 290px;
                ul{
                    border-radius: 8px;
                    border: 2px solid #6faeae;
                    height: 87px;
                    overflow: hidden;
                }
                li{
                    position: relative;
                    width: 50%;
                    overflow: hidden;
                    line-height: 83px;
                    float: left;
                    font-size: 24px;
                    background: #386363;
                    cursor: pointer;
                    &+li{
                        border-left: 2px solid #6faeae;
                    }
                    &.bet-red,&.bet-black{
                        display: flex;
                        justify-content: center;
                        color: #ff3333;
                        font-family: Lucida Bright,LBRITE;
                        p{
                            margin: 0 10/2px;
                        }
                        i{
                            display: block;
                            width: percentage(26/217);
                            img{
                                width: 100%;
                            }
                        }

                    }
                    &.bet-black{
                        color: #000000;
                        background: #4a8282;
                    }
                }
            }
            .bet-joker{
                position: relative;
                float: right;
                width: 144px;
                .poker-time{
                    color: #ffcc00;
                }
                li{
                    position: relative;
                    width: 100%;
                    height: 87px;
                    border-radius: 8px;
                    line-height: 83px;
                    border: 2px solid #6faeae;
                    background: #386363;
                    font-family: Lucida Bright,LBRITE;
                    cursor: pointer;
                    p{
                        font-size: 24px;
                        color: #ffcc00;
                    }
                    img{
                        display: block;
                        position: absolute;
                        right: percentage(14/222);
                        top: percentage(20/140);
                        width: percentage(36/222);
                        max-width: 36px;
                    }

                }
            }
            .bet-color{
                position: relative;
                width: 100%;
                clear: both;
                ul{
                    border: 2px solid #6faeae;
                    border-radius: 8px;
                    overflow: hidden;
                }
                li{
                    position: relative;
                    float: left;
                    width: 25%;
                    height: 87px;
                    overflow: hidden;
                    background-color: #386363;
                    cursor: pointer;
                    img{
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                        display: block;
                        width: percentage(53/170);
                    }
                    &:first-child,&:nth-child(3){
                        background-color: #4a8282;
                    }
                }
                li+li{
                    border-left: 2px solid #6faeae;
                }
            }
            .bet-number{
                position: relative;
                width: 100%;
                ul{
                    overflow: hidden;
                    text-align: center;
                    font-size: 0;
                    li{
                        height: 74px;
                        line-height: 72px;
                        border-bottom: 2px solid #6faeae;
                        border-right: 2px solid #6faeae;
                        display: inline-block;
                        font-size: 26px;
                        color: #fff;
                        font-weight: bold;
                        font-family: Lucida Bright,LBRITE;
                        cursor: pointer;
                    }
                    &.item1{
                        border-left: 2px solid #6faeae;
                        border-top: 2px solid #6faeae;
                        border-radius: 8px;
                        li{
                            width: 20%;
                            background: #386363;
                            &:nth-child(2n){
                                background: #4a8282;
                            }
                        }
                    }
                    &.item2{
                        //width: 60%;
                        margin: 0 auto;
                        border-left: 2px solid transparent;
                        border-bottom: 2px solid transparent;
                        li{
                            width: 20%;
                            background: #386363;
                            &:first-child{
                                background: #4a8282;
                                border-bottom-left-radius: 8px;
                                border-left: 2px solid #6faeae;
                            }
                            &:last-child{
                                background: #4a8282;
                                border-bottom-right-radius: 8px;
                            }
                        }
                    }
                }
                .btn-cls{
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 50px;
                    height: 50px;
                    overflow: hidden;
                    background: #0c6d6d;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: normal;
                    a{
                        display: block;
                        height: 100%;
                        color: #99cccc;
                        &::before{
                            content: '';
                            display: block;
                            margin: 4px auto 0;
                            width: 19px;
                            height: 23px;
                            padding-top: 0;
                            background:url("../../assets/img/luckyPoker/icon-cls.png") no-repeat center;
                            background-size: 100%;
                            //todo
                        }
                    }
                }
                .poker-time{
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    height: auto;
                    line-height: 1;
                }
            }
        }
        /*按钮区*/
        .area-btn{
            position: relative;
            z-index: 2;
            /*width: 92%;*/
            margin: 16px auto 0;
            ul{
                display: flex;
                justify-content: center;
                li{
                    position: relative;
                    width: 58px;
                    margin: 0 14px;
                    cursor: pointer;
                    transition: all 0.2s;
                    img{
                        display: block;
                        width: 100%;
                        transition: all 0.2s;
                        box-shadow: 0 7px 10px rgba(0,0,0,0.3);
                        border-radius: 50%;
                    }
                    p{
                        position: absolute;
                        left: 50%;
                        bottom:0;
                        transform: translate(-50%);
                        background: rgba(0,0,0,0.8);
                        min-width: 65px;
                        height: 24px;
                        overflow: hidden;
                        padding: 0 5px;
                        border-radius: 12px;
                        line-height: 24px;
                        font-size: 18px;
                        color: #ffcc00;
                        font-weight: bold;
                    }
                }
                li.on{
                    img{
                        transform: scale(1.2);
                        box-shadow: none;
                    }
                    &::before{
                        content: '';
                        display: block;
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                        border-radius: 50%;
                        box-shadow: 0 0 30px rgba(0,255,234,1);
                    }
                }
            }
            .btn-main{
                display: flex;
                flex-direction: column;
                justify-content: center;
                cursor: pointer;
                width: 210px;
                height: 70px;
                margin: 10px auto 0;
                border-radius: 8px;
                background: url("../../assets/img/luckyPoker/btn-main.png") no-repeat center ;
                background-size: cover;
                color: #fff;
                font-weight: bold;
                box-shadow: 0 7px 0 #2b7876;
                transition: all 0.2s;
                p{
                    line-height: 28px;
                    font-size: 26px;
                    text-shadow: 0 2px #2b7b75, 2px 0 #2b7b75, -2px 0 #2b7b75, 0 -2px #2b7b75;
                    transition: all 0.2s;
                }
                i{
                    display: block;
                    line-height: 20px;
                    font-size: 18px;
                    transition: all 0.2s;
                }
                &.wait{
                    filter:brightness(0.8);
                    box-shadow: 0 2px 0 #2b7876;
                    p{
                        font-size: 15px;
                        text-shadow:none;
                    }
                    i{
                        .hide-text();
                        transform: scale(0);
                    }
                }
                &.unable{
                    filter:brightness(0.8);
                    box-shadow: 0 2px 0 #2b7876;
                    i{
                        .hide-text();
                        transform: scale(0);
                    }
                }
            }
        }
        /*历史开奖*/
        .poker-history{
            float: right;
            width: 455px;
            height: 144px;
            margin-top: 17px;
            background: #294557;
            border-radius: 6px;
            .title{
                display: block;
                height: 72px;
                line-height: 66px;
                text-indent: 23px;
                text-align: left;
                font-size: 16px;
                color: #fff;
            }
            .history-main{
                display: flex;
                justify-content: space-between;
            }
            .btn{
                display: block;
                width: 40px;
                height: 30px;
                &:hover{
                    filter: brightness(1.2);
                }
            }
            .btn-left{
                background:url("../../assets/img/luckyPoker/icon-left.png") no-repeat center;
                background-size: 16px;
            }
            .btn-right{
                background:url("../../assets/img/luckyPoker/icon-right.png") no-repeat center;
                background-size: 16px;
            }
            .poker-item{
                flex: 1;
                position: relative;
                height: 30px;
                overflow: hidden;
            }
            ul{
                position: absolute;
                left: 0;
                top: 0;
                width: 999999px;
                overflow: hidden;
                text-transform: capitalize;
            }
            li{
                width: 20px;
                height: 30px;
                overflow: hidden;
                float: left;
                border-radius: 8/2px;
                background-color: #fff;
                p{
                    line-height: 30/2px;
                    font-size: 24/2px;
                    font-weight: bold;
                }
                &::after{
                    content: '';
                    display: block;
                    width: percentage(24/40);
                    height: 30/2px;
                    overflow: hidden;
                    margin: 0 auto;
                }
                &.icon-hongt{
                    color: #cc3333;
                    &::after{
                        background:url("../../assets/img/luckyPoker/icon-hongt.png") no-repeat center top;
                        background-size: contain;
                    }

                }
                &.icon-fk{
                    color: #cc3333;
                    &::after{
                        background:url("../../assets/img/luckyPoker/icon-fk.png") no-repeat center top;
                        background-size: contain;
                    }
                }
                &.icon-mh{
                    color: #000000;
                    &::after{
                        background:url("../../assets/img/luckyPoker/icon-mh.png") no-repeat center top;
                        background-size: contain;
                    }
                }
                &.icon-heit{
                    color: #000000;
                    &::after{
                        background:url("../../assets/img/luckyPoker/icon-heit.png") no-repeat center top;
                        background-size: contain;
                    }
                }
                &.joker{
                    &::after{
                        width: 100%;
                        height: 100%;
                        background:url("../../assets/img/luckyPoker/font-joker.png") no-repeat center top;
                        background-size: cover;
                    }
                    p{
                        display: none;
                    }
                }
                &+li{
                    margin-left: 5px;
                }
            }
            .poker-next{
                background: #386363;
                p{
                    width: 100%;
                    line-height: 30px;
                    text-align: center;
                    font-size: 28/2px;
                    color: #518484;
                }
                &::after{
                    display: none;
                }
            }
        }
        /*投注记录*/
        .recording{
            float: right;
            width: 92%;
            max-width: 455px;
            padding-top:  2px;
            margin: 25px auto 0;
            border-radius: 8px;
            overflow: hidden;
            background: #294557;
            color: #fff;
            .recording-top{
                padding: 0 27px;
                line-height: 80px;
                display: flex;
                justify-content: space-between;
                p{
                    font-size: 16px;
                }
                a{
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 14px;
                    color: #fff;
                    &::before{
                        content: '';
                        display: block;
                        margin-right: 9px;
                        width: 21px;
                        height: 19px;
                        /*border: 1px solid #a2dede;*/
                        background: url("../../assets/img/luckyPoker/icon-all.png") no-repeat left top ;
                        background-size: 21px;
                        transition: all 0.2s;
                    }
                    &.on{
                        &::before{
                            background: url("../../assets/img/luckyPoker/icon-my.png") no-repeat left top ;
                            background-size: 21px;
                        }
                    }
                    &:hover{
                        color: #a2dede;
                    }
                }
            }
            .recording-table{
                .top{
                    padding: 0 20px;
                    line-height: 46px;
                    font-size: 14px;
                    color: #72a1a8;
                }
                .recoding-main{
                    margin: 0 10px;
                    li{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        position: relative;
                        height: 53px;
                        line-height: 53px;
                        padding: 0 10px;
                        background: #253e4e;
                        font-size: 14px;
                        .bet-user{
                            /*小手机看不到缩小这里*/
                            width: 62px;
                            .text-overflow();
                        }
                        .bet-expect{
                            width: 42px;
                            height: 40px;
                            line-height: 40px;
                            font-family: Lucida Bright,LBRITE;
                            font-weight: bold;
                            text-transform: uppercase;
                            &.number{
                                font-size: 15px;
                                color: #fff;
                            }
                            &.black{
                                font-size: 8px;
                                color: #000;
                            }
                            &.red{
                                font-size: 8px;
                                color: #fe3b3b;
                            }
                            &.fk,&.hongt,&.heit,&.mh{
                                background-repeat: no-repeat;
                                background-position: center;
                                background-size: percentage(30/68);
                                text-indent: -99999px;
                            }
                            &.fk{
                                background-image:url("../../assets/img/luckyPoker/icon-fk.png");
                            }
                            &.hongt{
                                background-image:url("../../assets/img/luckyPoker/icon-hongt.png");
                            }
                            &.heit{
                                background-image:url("../../assets/img/luckyPoker/icon-heit.png");
                            }
                            &.mh{
                                background-image:url("../../assets/img/luckyPoker/icon-mh.png");
                            }
                            &.joker{
                                background-image:url("../../assets/img/luckyPoker/font-joker.png");
                                background-repeat: no-repeat;
                                background-position: center;
                                background-size: contain;
                            }
                        }
                        .bet-count{
                            width: 82px;
                        }
                        .bet-result-count{
                            text-align: right;
                            width: 83px;
                            height: 100%;
                            overflow: hidden;
                            &.mywin{
                                color: #20bf6b;
                                font-weight: bold;
                            }
                        }
                        .bet-result{
                            width: 40/2px;
                            height: 60/2px;
                            overflow: hidden;
                            border-radius: 4px;
                            background: #fff;
                            font-family: Lucida Bright,LBRITE;
                            p{
                                line-height: 30/2px;
                                font-size: 24/2px;
                                font-weight: bold;
                            }
                            &::after{
                                content: '';
                                display: block;
                                width: percentage(24/40);
                                height: 30/2px;
                                overflow: hidden;
                                margin: 0 auto;
                            }
                            &.icon-hongt{
                                color: #cc3333;
                                &::after{
                                    background:url("../../assets/img/luckyPoker/icon-hongt.png") no-repeat center top;
                                    background-size: contain;
                                }

                            }
                            &.icon-fk{
                                color: #cc3333;
                                &::after{
                                    background:url("../../assets/img/luckyPoker/icon-fk.png") no-repeat center top;
                                    background-size: contain;
                                }
                            }
                            &.icon-mh{
                                color: #000000;
                                &::after{
                                    background:url("../../assets/img/luckyPoker/icon-mh.png") no-repeat center top;
                                    background-size: contain;
                                }
                            }
                            &.icon-heit{
                                color: #000000;
                                &::after{
                                    background:url("../../assets/img/luckyPoker/icon-heit.png") no-repeat center top;
                                    background-size: contain;
                                }
                            }
                            &.joker{
                                &::after{
                                    width: 100%;
                                    height: 100%;
                                    background:url("../../assets/img/luckyPoker/font-joker.png") no-repeat center top;
                                    background-size: cover;
                                }
                                p{
                                    display: none;
                                }
                            }
                        }
                        &:nth-child(2n){
                            background: #294557;
                        }
                    }
                }
            }
            /*pc----*/
            .pc-verification{
                height: 84px;
                margin-top: 33px;
                padding: 0 27px;
                background: #253e4e;
                display: flex;
                align-items: center;
                .btn-href{
                    font-size: 14px;
                    color: #fff;
                    text-decoration: underline;
                    &:hover{
                        color: #6fa4a3;
                    }
                }
                .btn-question{
                    width: 19px;
                    height: 19px;
                    overflow: hidden;
                    margin-left: 12px;
                    background: url("../../assets/img/luckyPoker/icon-help.png") no-repeat center ;
                    background-size: cover;
                }
            }
        }
        /*pop*/
        .pop-random{
            .btn-close{
                &:hover{
                    background: #29c2bd;
                    color: #fff;
                    &::after{
                        .filter-brightness(1.5)
                    }
                }
            }
            .pop-body{
                max-width: 727px;
                width: 100%;
            }
            .pop-main{
                padding: 0;
                background: #213746;
            }
            h2{
                height: 70px;
                line-height: 64px;
                font-size: 24px;
                color: #fff;
                font-weight: bold;
            }
            .tab-h{
                height: 52px;
                line-height: 52px;
                li{
                    float: left;
                    height: 100%;
                    width: 50%;
                    overflow: hidden;
                    .text-overflow();
                    a{
                        display: block;
                        width: 100%;
                        height: 100%;
                        color: #72a1a8;
                        font-size: 18px;
                    }
                    &.on{
                        a{
                            border-top-left-radius: 8px;
                            border-top-right-radius: 8px;
                            background: #294557;
                            color: #fff;
                        }
                    }
                }
            }
            .tab-c{
                padding: 0 26px 32px;
                background: #294557;
                color: #fff;
                .title{
                    padding-top: 17px;
                    line-height: 43px;
                    text-align: left;
                    font-size: 20px;
                    font-weight: bold;
                }
                .input-group{
                    display: flex;
                    height: 65px;
                    line-height: 65px;
                    border-radius: 8px;
                    overflow: hidden;
                    input{
                        padding: 0;
                        height: 65px;
                        line-height: 65px;
                        flex: 1;
                        background: #213746;
                        border: none;
                        outline: none;
                        text-indent: 12px;
                        font-size: 16px;
                    }
                    .btn{
                        display: block;
                        border-left: 1px solid #213746;
                        background: #4a8282;
                        font-size: 18px;
                        color: #fff;
                        font-weight: bold;
                        &.btn-random{
                            width: percentage(200/640);
                        }
                        &.btn-lock{
                            width: percentage(140/640);
                        }
                    }
                }
                .btn-check{
                    display: block;
                    width: 275px;
                    height: 60px;
                    overflow: hidden;
                    background: #29c2bd;
                    border-radius: 8px;
                    line-height: 60px;
                    font-size: 24px;
                    color: #fff;
                    font-weight: bold;
                    margin: 50px auto 0;
                    &:hover{
                        background: #1fa7a3;
                    }
                }
            }
        }
    }
</style>


