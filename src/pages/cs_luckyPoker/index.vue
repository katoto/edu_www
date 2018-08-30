<template>
    <div>
        <Header></Header>
        <h5-page></h5-page>
        <pc-page></pc-page>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '~components/Header'
import Footer from '~components/Footer'
import h5Page from './components/h5'
import pcPage from './components/pc'
export default {
    components: { Header, Footer, h5Page, pcPage },
    mounted () {
    }
}
</script>

<style lang="less" scoped type="text/less">
@import "../../styles/lib-mixins.less";
/deep/ .luckyPoker{
    *{
        box-sizing: border-box;
    }

    width: 100%;
    height: 100%;
    background: #161e22;
    background-size: 100%;
    padding-top: 22/2px;
    text-align: center;
    font-family: sans-r;
    .flex-between{
        display: flex;
        justify-content: space-between;
    }
    .bg-esktop{
        position: relative;
        background: url("../../assets/img/luckyPoker/bg.jpg") repeat-y center bottom;
        background-size: cover;
        padding-bottom: 30px;
        &::before{
            content: '';
            display: block;
            position: absolute;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 400/2px;
            background: linear-gradient(rgba(0,0,0,0.7),transparent);
            background-size: 100%;
        }
        &::after{
            content: '';
            display: block;
            position: absolute;
            z-index: 1;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 400/2px;
            background: url("../../assets/img/luckyPoker/bg-border.png") no-repeat center bottom;
            background-size: 100%
        }
    }
    .poker-prize{
        position: absolute;
        top: -34/4px;
        left: 50%;
        z-index: 2;
        transform: translate(-50%);
        border: 1px solid #6faeae;
        background: #003333;
        border-radius: 8px;
        height: 34/2px;
        line-height: 34/2px;
        color: #33cc66;
        font-size: 22/2px;
        font-size: 22/7.5vw;
        //需要设置最大font-size
        font-weight: bold;
        
    }
    .poker-time{
        height: 68/2px;
        line-height: 42/2px;
        font-size: 24/2px;
        font-size: 24/7.5vw;
        color: #99cccc;
        font-weight: bold;
        
    }
    .poker-history{
        position: relative;
        z-index: 2;
        display: flex;
        justify-content: space-between;
        font-family: Lucida Bright;
        text-align: center;
        .btn{
            width: percentage(30/750);
            height: 60/2px;
        }
        .btn-left{
            background:url("../../assets/img/luckyPoker/icon-left.png") no-repeat center;
            background-size: 10px;
        }
        .btn-right{
            background:url("../../assets/img/luckyPoker/icon-right.png") no-repeat center;
            background-size: 10px;
        }
        ul{
            width: percentage(690/750);
            height: 60/2px;
            overflow: hidden;
            margin: 0 auto;
            text-transform: capitalize;
        }
        li{
            width: 40/2px;
            height: 60/2px;
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
                margin-left: 12/2px;
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
    .area-betting{
        position: relative;
        z-index: 2;
        width: 92%;
        margin: 44/2px auto 0;
        background: url("../../assets/img/luckyPoker/bg-ligth.png") no-repeat center;
        background-size: cover;
        font-weight: bold;
        .bet-rb{
            position: relative;
            float: left;
            width: percentage(450/690);
            .poker-prize{
                width: percentage(350/450);
            }
            ul{
                border-radius: 6px;
                border: 1px solid #6faeae;
                height: 70px;
                overflow: hidden;
            }
            li{
                position: relative;
                width: 50%;
                height: 70px;
                overflow: hidden;
                line-height: 70px;
                float: left;
                font-size: 38/2px;
                font-size: 38/7.5vw;
                background: #6faeae;
                cursor: pointer;
                &+li{
                    border-left: 1px solid #6faeae;
                }
                &.bet-red,&.bet-black{
                    display: flex;
                    justify-content: center;
                    color: #ff3333;
                    font-family: Lucida Bright;
                    p{
                        margin: 0 15/2px;
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
            width: percentage(222/690);
            .poker-prize{
                width: percentage(270/222);
            }
            .poker-time{
                color: #ffcc00;
            }
            li{
                position: relative;
                width: 100%;
                height: 70px;
                border-radius: 6px;
                border: 1px solid #6faeae;
                background: #6faeae;
                cursor: pointer;
                p{
                    line-height: 70px;
                    font-size: 38/2px;
                    font-size: 38/7.5vw;
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
            clear: both;
            .poker-prize{
                width: percentage(354/690);
            }
            ul{
                border: 1px solid #6faeae;
                border-radius: 6px;
                overflow: hidden;
            }
            li{
                position: relative;
                float: left;
                width: 25%;
                //padding-top: 25%;
                height: 70px;
                overflow: hidden;
                background-color: #6faeae;
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
                border-left: 1px solid #6faeae;
            }
        }
        .bet-number{
            position: relative;
            .poker-prize{
                width: percentage(354/690);
            }
            ul{
                overflow: hidden;
                text-align: center;
                font-size: 0;
                li{
                    height: 123/2px;
                    line-height: 123/2px;
                    border-bottom: 1px solid #6faeae;
                    border-right: 1px solid #6faeae;
                    display: inline-block;
                    font-size: 46/2px;
                    font-size: 46/7.5vw;
                    color: #fff;
                    font-weight: bold;
                    font-family: Lucida Bright;
                }
                &.item1{
                    border-left: 1px solid #6faeae;
                    border-top: 1px solid #6faeae;
                    border-radius: 8px;
                    li{
                        width: 20%;
                        background: #6faeae;
                        &:nth-child(2n){
                            background: #4a8282;
                        }
                    }
                }
                &.item2{
                    //width: 60%;
                    margin: 0 auto;
                    border-left: 1px solid transparent;
                    li{
                        width: 20%;
                        background: #6faeae;
                        &:first-child{
                            background: #4a8282;
                            border-bottom-left-radius: 8px;
                            border-left: 1px solid #6faeae;
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
                font-size: 24/2px;
                font-size: 24/7.5vw;
                font-weight: normal;
                width: 20%;
                a{
                    float: left;
                    color: #99cccc;
                    &::before{
                        content: '';
                        display: block;
                        margin: 0 auto;
                        width: 60%;
                        height: 0;
                        padding-top: 70%;
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
    .area-btn{
        position: relative;
        z-index: 2;
        width: 92%;
        margin: 45/2px auto 0;
        ul{
            float: left;
            width: percentage(490/690);
            display: flex;
            justify-content: space-between;
            li{
                position: relative;
                width: percentage(104/503);
                cursor: pointer;
                transition: all 0.2s;
                img{
                    display: block;
                    width: 100%;
                }
                p{
                    position: absolute;
                    left: 50%;
                    bottom: percentage(20/104);
                    transform: translate(-50%);
                    background: rgba(0,0,0,0.8);
                    min-width: percentage(110/104);
                    height: 38/2px;
                    overflow: hidden;
                    padding: 0 5px;
                    border-radius: 38/4px;
                    line-height: 38/2px;
                    font-size: 30/2px;
                    color: #ffcc00;
                    font-weight: bold;
                }
            }
            li.on{
                transform: scale(1.1);
                &::before{
                    content: '';
                    display: block;
                    position: absolute;
                    width: percentage(90/104);
                    height: percentage(90/104);
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                    border-radius: 50%;
                    box-shadow: 0 0 10px rgba(0,255,234,1);
                }
            }
        }
        .btn-main{
            position: absolute;
            top: 0;
            right: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            cursor: pointer;
            width: percentage(187/690);
            height: 100%;
            border-radius: 4px;
            background: url("../../assets/img/luckyPoker/btn-main.png") no-repeat center ;
            background-size: cover;
            color: #fff;
            font-weight: bold;
            box-shadow: 0 4px 0 #2b7876;
            transition: all 0.2s;
            p{
                line-height: 22px;
                font-size: 18px;
                text-shadow: 0 1px #2b7b75, 1px 0 #2b7b75, -1px 0 #2b7b75, 0 -1px #2b7b75;
                transition: all 0.2s;
            }
            i{
                display: block;
                line-height: 15px;
                font-size: 12px;
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
    .area-random{
        width: 92%;
        padding: 10/2px percentage(24/690) 50/2px;
        margin: 110/2px auto 0;
        border-radius: 8px;
        background: #294557;
        
        color: #fff;
        .random-top{
            overflow: hidden;
            height: 86/2px;
            .title{
                float: left;
                text-align: left;
                line-height: 86/2px;
                font-size: 32/2px;
                font-weight: bold;
            }
            .btn-help{
                float: left;
                display: block;
                width: 34px;
                height: 86/2px;
                overflow: hidden;
                background:url("../../assets/img/luckyPoker/icon-help.png") no-repeat center;
                background-size: 34/2px;
            }
            .btn-slideUp{
                float: right;
                display: block;
                width: 36px;
                height: 86/2px;
                overflow: hidden;
                background:url("../../assets/img/luckyPoker/icon-bottom.png") no-repeat right center;
                background-size: 36/2px;
            }
        }
        .random-main{
            .title{
                padding-top: 20/2px;
                line-height: 46/2px;
                text-align: left;
                font-size: 28/2px;
            }
            .input-group{
                display: flex;
                height: 84/2px;
                line-height: 84/2px;
                border-radius: 8/2px;
                overflow: hidden;
                input{
                    flex: 1;
                    background: #213746;
                    border: none;
                    outline: none;
                    text-indent: 5px;
                    font-size: 11px;
                }
                .btn{
                    display: block;
                    border-left: 1px solid #213746;
                    background: #4a8282;
                    font-size: 28/2px;
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
        }
    }
    .recording{
        width: 92%;
        padding-top: 22/2px;
        margin: 32/2px auto 140/2px;
        border-radius: 8px;
        overflow: hidden;
        background: #294557;
        color: #fff;
        .recording-top{
            padding: 0 percentage(25/690);
            line-height: 70/2px;
            display: flex;
            justify-content: space-between;
            p{
                font-size: 16px;
                font-weight: bold;
            }
            a{
                font-size: 12px;
                color: #fff;
            }
        }
        .recording-table{
            .top{
                padding: 0 percentage(25/690);
                line-height: 82/2px;
                font-size: 24/2px;
                color: #72a1a8;
            }
            .main{
                li{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                    height: 98/2px;
                    line-height: 68/2px;
                    padding: 15/2px percentage(25/690);
                    background: #253e4e;
                    font-size: 12px;
                    .bet-user{
                        float: left;
                        /*小手机看不到缩小这里*/
                        width: percentage(100/690);
                        .text-overflow();
                    }
                    .bet-expect{
                        width: 68/2px;
                        height: 68/2px;
                        line-height: 68/2px;
                        background: #546a79;
                        font-family: Lucida Bright;
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

                    }
                    .bet-result-count{
                        text-align: right;
                        width: 76px;
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
                        font-family: Lucida Bright;
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
    }
    .pop-poker{
        .poker-draw{
            transition: all 0.2s;
        }
        .poker-area{
            position: relative;
            width: percentage(212/750);
            //height: 100px;
            padding-top: percentage(289/750);
            margin: 145px auto 110px;
            transition: all 0.2s;
            li{
                position: absolute;
                left: 50%;
                top: 0;
                transform: translateX(-50%);
                width: 100%;
                transition: all 0.2s;
                transform-origin: center bottom;
                img{
                    display: block;
                    width: 100%;
                }
            }
            &.animate1{
                .setPokerPosition(10);
            }
            &.animate2{
              .setPokerPosition2(10)
            }
        }
        .btn-open{
            display: block;
            width: percentage(370/750);
            overflow: hidden;
            margin: 0 auto 0;
            line-height: 98/2px;
            border-radius: 4px;
            background: #3e9999;
            font-size: 18px;
            color: #fff;
            font-weight: bold;
        }
        .result{
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: center;
            transition: all 0.2s;
        }
        .result-box{
            position: relative;
            width: percentage(340/750);
            padding-top: percentage(506/750);
            overflow: hidden;
            background: #fff;
            border-radius: 15px;
            //padding:8/2px 0;
            margin: 0 auto 0;
            .leftTop,.rightBottom{
                position: absolute;
                width: 110/2px;
                p{
                    line-height: 100/2px;
                    font-size: 84/2px;
                    font-family: Lucida Bright;
                    text-transform: uppercase;
                }
                &::after{
                    content: '';
                    display: block;
                    width: 100%;
                    height: 40px;
                    overflow: hidden;
                }
            }
            .leftTop{
                left: 0;
                top: 0;
            }
            .rightBottom{
                right: 0;
                bottom: 0;
                transform: rotate(180deg);
            }
            .img-poker{
                position: absolute;
                left: 50%;
                top: 50%;
                transform:translate(-50%,-50%);
                display: block;
                width: 100%;
                height: 100%;
            }
            &.heit{
                color: #000000;
                .leftTop,.rightBottom{
                    &::after{
                        background:url("../../assets/img/luckyPoker/icon-heit.png") no-repeat center top;
                        background-size: percentage(50/110);
                    }
                }
                .img-poker{
                    background:url("../../assets/img/luckyPoker/icon-heit.png") no-repeat center;
                    background-size: percentage(65/110);
                }
            }
            &.mh{
                color: #000000;
                .leftTop,.rightBottom{
                    &::after{
                        background:url("../../assets/img/luckyPoker/icon-mh.png") no-repeat center;
                        background-size: percentage(65/110);
                    }
                }
                .img-poker{
                    background:url("../../assets/img/luckyPoker/icon-mh.png") no-repeat center;
                    background-size: percentage(65/110);
                }
            }
            &.hongt{
                color: #df2929;
                .leftTop,.rightBottom{
                    &::after{
                        background:url("../../assets/img/luckyPoker/icon-hongt.png") no-repeat center top;
                        background-size: percentage(65/110);
                    }
                }
                .img-poker{
                    background:url("../../assets/img/luckyPoker/icon-hongt.png") no-repeat center;
                    background-size: percentage(65/110);
                }
            }
            &.fk{
                color: #df2929;
                .leftTop,.rightBottom{
                    &::after{
                        background:url("../../assets/img/luckyPoker/icon-fk.png") no-repeat center top;
                        background-size: percentage(65/110);
                    }
                }
                .img-poker{
                    background:url("../../assets/img/luckyPoker/icon-fk.png") no-repeat center;
                    background-size: percentage(65/110);
                }
            }
            &.j{
                .img-poker{
                    background:url("../../assets/img/luckyPoker/icon-J.png") no-repeat center;
                    background-size: percentage(300/360);
                }
            }
            &.q{
                .img-poker{
                    background:url("../../assets/img/luckyPoker/icon-Q.png") no-repeat center;
                    background-size: percentage(300/360);
                }
            }
            &.k{
                .img-poker{
                    background:url("../../assets/img/luckyPoker/icon-K.png") no-repeat center;
                    background-size: percentage(300/360);
                }
            }
            &.joker{
                background:url("../../assets/img/luckyPoker/icon-Joker.png") no-repeat center;
                background-size: cover;
                *{
                    display: none !important;
                }
            }
        }
        .result-msg{
            width: percentage(500/750);
            border-radius: 4px;
            margin: 45/2px auto 0;
            padding: 0 2px;
            border: 1px solid #6bda7b;
            background: #050707;
            color: #ffcf20;
            font-weight: bold;
            p{
                line-height: 60/2px;
                font-size: 36/2px;
            }
            div{
                line-height: 90/2px;
                font-size: 72/2px;
                i{
                    font-size: 36/2px;
                }
            }
        }
        .scale0{
            transform: scale(0);
            width: 0;
            height: 0;
            overflow: hidden;
        }
    }
}
.setPokerPosition( @count )when( @count > 0 ){
    li:nth-child(@{count}){
        transform: translate(-50%,13px * @count);
        z-index: 43-@count;
    }
    .setPokerPosition((@count - 1));
}
.setPokerPosition2( @count )when( @count > 0 ){
    li:nth-child(@{count}){
        transform: translate(@count*25%-125%);
    }
    .setPokerPosition2((@count - 1));
}
</style>


