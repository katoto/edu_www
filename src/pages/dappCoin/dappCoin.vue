<template>
    <div class="luckyDapp">
        <div class="head-dapp">
            <div class="head-dapp-wrap">
                <h1 class="logo">
                    <img src="@/assets/img/superCoin/logo-luckyDapp.png" alt="logo-dapp" title="logo-dapp">
                    <p>Super LuckyCoin</p>
                </h1>
                <div class="fr-msg">
                    <a href="" class="invite">Invite</a>
                    <a href="">Contract</a>
                    <a href="">Easy Play</a>
                    <a href="index.html" class="btn-home"></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

</script>
<style scoped lang="less" type="text/less">
    @import "../../styles/lib-mixins.less";
    .luckyDapp {
        background: #211c38;
        * {
            box-sizing: border-box;
        }
    }
    .head-dapp {
        width: 100%;
        background: #151515;
        .head-dapp-wrap {
            position: relative;
            max-width: 1190px;
            width: 92%;
            height: 70px;
            overflow: hidden;
            margin: 0 auto;
            padding: 0 5px 0 3px;
            color: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .logo {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 20px;
                img{
                    width: 39px;
                    margin-right: 14px;
                }
            }
            .fr-msg{
                display: flex;
                height: 100%;
                a{
                    display: flex;
                    flex-shrink: 0;
                    align-items: center;
                    height: 100%;
                    margin-left: 25px;
                    color: #fff;
                    font-size: 16px;
                }
                .btn-home{
                    width: 17px;
                    height: 100%;
                    background: url("../../assets/img/superCoin/icon-home.png") no-repeat center;
                    background-size: 17px;
                }
                .invite{
                    position: relative;
                    color: #53e864;
                    &::before{
                        content: '';
                        display: inline-block;
                        margin-right: 8px;
                        width: 19px;
                        height: 100%;
                        background: url("../../assets/img/superCoin/icon-gift.png") no-repeat center;
                        background-size: 19px;
                    }
                }
            }
        }
    }
    .banner-dapp{
        position: relative;
        width: 100%;
        height: 585px;
        overflow: hidden;
        padding: 10px 0 40px 0;
        background: url("../../assets/img/superCoin/bg.jpg") no-repeat center, linear-gradient(#223541,#32215a);
        transition: all 0.2s ease-in-out;
        .message{
            position: relative;
            width: 92%;
            max-width: 1083px;
            height: 44px;
            overflow: hidden;
            background: rgba(19,32,44,0.6);
            margin: 0 auto 17px;
            &::before{
                content: '';
                display: block;
                margin-left: 10px;
                width: 16px;
                height: 100%;
                background: url("../../assets/img/superCoin/icon-msg.png") no-repeat center;
            }
            ul{
                position: absolute;
                top: 0;
                left: 44px;
                width:90%;
                li{
                    width: 100%;
                    height: 100%;
                    line-height: 44px;
                    font-size: 16px;
                    color: #fff;
                    .text-overflow();
                }
            }
        }
        .issue{
            position: absolute;
            top: 80px;
            left: 50%;
            transform: translate(-50%);
            width: 92%;
            max-width: 1083px;
            line-height: 24px;
            font-size: 20px;
            color: #fff;
            &.draw{
                font-size: 16px;
            }
        }
        .betting-area{
            position: relative;
            width: 92%;
            max-width: 1083px;
            overflow: hidden;
            margin: 0 auto;
            .betting{
                overflow: hidden;
                .item-msg{
                    display: flex;
                    align-items: flex-start;
                    width: 621px;
                    height: 84px;
                    padding: 30px 0 0 0;
                    overflow: hidden;
                    font-size: 20px;
                    color: #a5b1c2;
                    background: url("../../assets/img/superCoin/bg-line.png") no-repeat center bottom;
                    .title{
                        margin-right: 10px;
                    }
                    .jackpot-amount{
                        font-size: 56px;
                        color: #ffa200;
                        font-weight: bold;
                    }
                    .jackpot-unit{
                        font-size: 24px;
                        color: #ffa200;
                        font-weight: bold;
                    }
                    .countdown{
                        position: relative;
                        text-indent: 32px;
                        color: #ffa200;
                        background: url("../../assets/img/superCoin/icon-countdown.png") no-repeat center left;
                    }
                    .ticket{
                        display: flex;
                        align-items: flex-start;
                        text-align: center;
                    }
                    .people-purchased{
                        position: relative;
                        p{
                            position: relative;
                            padding-left: 28px;
                            color: #ffa200;
                            &::before{
                                content: '';
                                display: inline-block;
                                position: absolute;
                                left: 0;
                                top: 50%;
                                transform: translateY(-50%);
                                width: 20px;
                                height: 20px;
                                background: url("../../assets/img/superCoin/icon-ticket.png") no-repeat center left;
                            }
                        }
                        &::after{
                            content: attr(data-msg);
                            display: block;
                            font-size: 12px;
                            color: #a5b1c2;
                        }
                    }
                    .ticket-progress{
                        position: relative;
                        width:126px;
                        height:14px;
                        overflow: hidden;
                        background:rgba(165,177,194,1);
                        margin: 6px 10px 0;
                        i{
                            display: block;
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            background: #ffa200;
                            transform-origin: left center;
                            transition: all 0.5s ease-in-out;
                        }
                    }
                    .people-remaining{
                        &::after{
                            content: attr(data-msg);
                            display: block;
                            font-size: 12px;
                            color: #a5b1c2;
                        }
                    }
                    .people-all{
                        margin-left: 35px;
                        text-indent: 30px;
                        background: url("../../assets/img/superCoin/icon-people.png") no-repeat center left;
                    }
                    &:first-child{
                        padding-top: 0;
                        align-items: baseline;
                    }
                }
                .buy-area{
                    padding: 23px 0 37px 0;
                    line-height: 40px;
                    font-size: 20px;
                    color: #fff;
                    overflow: hidden;
                    .title{
                        margin-right: 16px;
                    }
                    .input-box{
                        position: relative;
                        display: flex;
                        align-items: center;
                        height: 40px;
                        padding:0 0 0 42px;
                        background: #6258b7 url("../../assets/img/superCoin/icon-ticket-fff.png") no-repeat 10px center;
                        border-radius: 6px;
                        input{
                            outline: none;
                            border: none;
                            width: 140px;
                            height: 32px;
                            text-align: center;
                            line-height: 32px;
                            color: #000;
                            border-radius: 2px;
                        }
                        p{
                            margin: 0 30px 0 16px;
                        }
                    }
                    .btn-choose{
                        margin: 14px 0 0 0;
                        display: flex;
                        text-align: center;
                        border: 1px solid #ff8a00;
                        border-radius: 6px;
                        a{
                            font-size: 16px;
                            color: #ff8a00;
                        }
                        a+a{
                            border-left: 1px solid #ff8a00;
                        }
                    }
                }
                .btn-box{
                    display: flex;
                    justify-content: space-between;
                    width: 540px;
                    a{
                        display: block;
                        text-align: center;
                        height:62px;
                        line-height: 62px;
                        border-radius:6px;
                        &:hover{
                            filter: brightness(1.2);
                        }
                    }
                    .btn-big{
                        width:327px;
                        background:rgba(255,138,0,1);
                        font-size: 24px;
                        color: #fff;
                        font-weight: bold;
                    }
                    .btn-small{
                        width:200px;
                        border:1px solid #484b86;
                        background: #312259;
                        font-size: 16px;
                        color: rgba(95,122,184,0.4);
                        &.btn-hadlogin{
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            p{
                                line-height: 20px;
                            }
                        }
                    }
                }
            }
        }
        .lottery{
            text-align: center;
            color: #fff;
            .dapp-amout{
                display: flex;
                justify-content: center;
                /*外边距重叠*/
                margin-top: 43px;
                font-size: 86px;
                color: #ff8a00;
                font-weight: bold;
                img{
                    margin-right: 22px;
                }
                i{
                    font-size: 32px;
                }
            }
            .notDraw{
                margin: 14px 0 37px 0;
                h5{
                    line-height: 44px;
                    font-size: 36px;
                }
                p{
                    font-size: 16px;
                }
            }
            .draw-someone{
                width: 100%;
                height: 52px;
                overflow: hidden;
                margin: 50px 0 37px 0;
                line-height: 52px;
                font-size: 36px;
                color: #ff8a00;
                font-weight: bold;
            }
            .draw-none{
                margin: 22px 0;
                line-height: 48px;
                font-size: 36px;
            }
            .dapp-number{
                ul{
                    display: flex;
                    justify-content: center;
                    overflow: hidden;
                }
                li{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 71px;
                    height: 79px;
                    overflow: hidden;
                    margin: 0 5px;
                    background: url("../../assets/img/superCoin/bg-hexagon.png") no-repeat center;
                    background-size: cover;
                    font-size: 36px;
                    color: #fff;
                }
                &.on{
                    li{
                        background: url("../../assets/img/superCoin/bg-hexagon-on.png") no-repeat center;
                        background-size: cover;
                        color: #211c38;
                        font-weight: bold;
                    }
                }
            }
        }
        .timeup{
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-400px);
            width: 100%;
            background: rgba(21,21,21,0.8);
            text-align: center;
            font-size: 84px;
            color: #2cffd5;
            font-weight: bold;
            opacity: 0;
            transition: all 0.1s ease-in-out;
            &::before,&::after{
                content: '';
                display: block;
                position: absolute;
                width: 100%;
                height: 1px;
                left: 0;
                background: #2cffd5;
                overflow: hidden;
            }
            &::before{
                top: 5px;
            }
            &::after{
                bottom: 5px;
            }
            &.on{
                opacity: 1;
                transform: translateY(-50%);
            }
        }
        &.status2{
            height: 580px;
            background: url("../../assets/img/superCoin/bg2.jpg") no-repeat center, linear-gradient(#223541,#32215a);
        }
    }
    .information{
        padding: 24px 0 90px 0;
        max-width: 1083px;
        width: percentage(710/750);
        margin: 0 auto;
        overflow: hidden;
        line-height: 24px;
        font-size: 14px;
        color: #a5b1c2;
        .title{
            line-height: 42px;
            font-size: 20px;
            color: #6a88cc;
            overflow: hidden;
            li{
                float: left;
                width: 25%;
                border-bottom: 4px solid #3a3953;
                text-align: center;
                a{
                    display: block;
                    color: #6a88cc;
                }
                &.on{
                    border-bottom: 4px solid #a5b1c2;
                    a{
                        color: #fff;
                    }
                }
            }
        }
        .explain-msg{
            margin: 20px 0;
        }
        .merge-info{
            float: left;
            width: 92%;
            max-width: 650px;
        }
        .invite{
            float: right;
            max-width: 370px;
            width: 100%;
            .title{
                li{
                    width: 100%;
                    text-align: left;
                    &.on{
                        border-bottom: 4px solid #3a3953;
                    }
                }
            }

            .invite-before{
                .input-group{
                    display: flex;
                    width:361px;
                    height:47px;
                    overflow: hidden;
                    margin-bottom: 13px;
                    padding: 3px 0;
                    border: 1px solid #6a88cc;
                    border-radius: 6px;
                    input{
                        text-indent: 15px;
                        background: transparent;
                        border: none;
                        outline: none;
                        flex: 1;
                        font-size: 14px;
                        color: #6a88cc;
                        transition: all 0.2s;
                        &::-webkit-input-placeholder{
                            font-size: 14px;
                            color: #6a88cc;
                        }
                        &:focus{
                            color: #fff;
                        }
                    }
                    a{
                        display: block;
                        width: percentage(58/361);
                        border-left: 1px solid #6a88cc;
                        background: url("../../assets/img/superCoin/btn-random.png") no-repeat center;
                        background-size: 26px;
                    }
                }
                .btn-gobuy{
                    display: block;
                    width:365px;
                    height:51px;
                    overflow: hidden;
                    margin: 20px 0 0 0;
                    background: #6a88cc;
                    color: #fff;
                    font-size: 20px;
                    border-radius: 6px;
                    text-align: center;
                    line-height: 51px;
                }
            }
            .invite-after{
                color: #fefeff;
                .link-msg{
                    line-height: 20px;
                }
                .mydomain{
                    line-height: 25px;
                    color: #fefeff;
                    font-size: 20px;
                }
                .btn-copy{
                    display: block;
                    width:80px;
                    height:30px;
                    overflow: hidden;
                    margin: 7px 0 11px 0;
                    border: 1px solid #53e864;
                    line-height: 30px;
                    text-align: center;
                    border-radius:6px;
                    color: #53e864;
                }
            }

        }
        .ticket{
            position: relative;
            .ticket-unlogin{
                padding: 155px 0 77px 0;
                border: 1px solid #3a3953;
                text-align: center;
                line-height: 47px;
                font-size: 16px;
                background: url("../../assets/img/superCoin/nomsg.png") no-repeat center 60px;
                background-size: 107px;
            }
            .ticket-logined{
                li{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 22px 0 25px;
                    height: 50px;
                    background: #3a3953;
                    margin-bottom: 10px;
                    font-size: 16px;
                    cursor: pointer;
                    &:hover{
                        filter:brightness(1.1);
                    }
                    .money{
                        font-size: 20px;
                        font-weight: bold;
                    }
                    .amount{
                        padding-right: 34px;
                        background: url("../../assets/img/superCoin/icon-ticket-fff.png") no-repeat center right;
                        background-size: 17px;
                        color: #ffffff;
                    }
                    &.win{
                        background: #ff8a00;
                        color: #fff;
                    }
                }
            }
            .open-ticket{
                position: absolute;
                left: 0;
                top: 85px;
                padding: 23px 22px 15px;
                background: #ffffff;
                width: 100%;
                color: #263547;
                border-radius: 6px;
                transform: translateY(-300px);
                transition: all 0.5s ease-in-out;
                opacity: 0;
                p{
                    line-height: 38px;
                    font-size: 24px;
                }
                .ticket-box{
                    max-height: 48*5px;
                    overflow: auto;
                    &::-webkit-scrollbar {
                        width: 6px;
                    }
                    &::-webkit-scrollbar-thumb {
                        border-radius: 6px;
                        background: #ff8a00;
                    }
                    &::-webkit-scrollbar-track{
                        border-radius: 6px;
                        background: #211c38;
                    }
                }
                ul{
                    overflow: hidden;
                }
                li{
                    float: left;
                    line-height: 48px;
                    font-size: 16px;
                    margin-right: 15px;
                }
                &.on{
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        }
        .historyDraw{
            .historyDraw-head{
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 52px;
                border-bottom: 1px solid #3a3953;
                padding: 0 14px 0 18px;
            }
            .historyDraw-main{
                li{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 54px;
                    padding: 0 14px 0 18px;
                    border-bottom: 1px solid #3a3953;
                    font-size: 16px;
                    &.win{
                        color: #ff8a00;
                    }
                }
            }
            text-align: right;
            .issue{
                flex-basis: percentage(86/650);
                text-align: left;
                .text-overflow();
            }
            .winningNumbers{
                flex-basis: percentage(238/650);
                text-align: center;
                .text-overflow();
            }
            .bonus{
                flex-basis: percentage(136/750);
                .text-overflow();
            }
            .winner{
                flex: 1;
                .text-overflow();
            }
        }
        .income{
            .explain-msg{
                margin-bottom: 28px;
            }
            .income-item{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 54px;
                border-top: 2px solid #3a3953;
                font-size: 20px;
                p{
                    color: #fff;
                }
                span{
                    color: #3fc06f;
                }
                &.income-item-last{
                    align-items: flex-start;
                    height: 77px;
                    padding-top: 16px;
                    border-bottom: 2px solid #3a3953;
                    .usd{
                        font-size: 14px;
                    }
                    span{
                        display: block;
                        text-align: right;
                    }
                }
            }
            .btn-withdrawal{
                display: block;
                width: percentage(365/650);
                line-height: 50px;
                height: 50px;
                overflow: hidden;
                margin: 26px auto 0;
                background: #3fc06f;
                text-align: center;
                font-size: 20px;
                color: #fff;
                border-radius: 6px;
            }
        }
    }
</style>

