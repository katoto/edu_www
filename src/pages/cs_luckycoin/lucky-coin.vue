<template>
    <div class="page-luckycoin">
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>
<script>

import Header from '~components/Header.vue'
import Footer from '~components/Footer.vue'

export default {
    components: { Header, Footer }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../../styles/lib-mixins.less";
    @import "../../styles/lib-media.less";

    /*mobile 为主来写*/
    .page-luckycoin{
        background: #2a1236 url("../../assets/img/oneToKen/bg-page.png") no-repeat center top;
        background-size: cover;
        .footer{
            border-top:0;
        }
    }
    /deep/
    .oneToKen {
        .main {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            overflow: hidden;
            padding: 0 0 140/2px 0;
        }
        .btn {
            display: block;
            text-align: center;
            background: #7b4de4;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            color: #fff;
            overflow: hidden;
            font-size: 17px;
            &.btn-pause{
                cursor: default;
                background: #5837a4;
                color: #a99acc;
                &:hover{
                    background: #5837a4;
                    color: #a99acc;
                }
            }
        }
        .for-full {
            margin: 0 -5px;
            overflow: hidden;
        }
        .banner {
            a,
            img {
                display: block;
                width: 100%;
                margin: 0 auto;
                max-width: 790px;
                border: none;
            }
        }
        .token-process {
            position: absolute;
            overflow: hidden;
            width: 102px;
            height: 102px;
            top: 108/2px;
            right: 38/2px; //102->80  80/102=
            transform-origin: top right;
            transform: scale(82/102);
            &.token-bth {
                background: url("../../assets/img/oneToKen/icon-bth.png") no-repeat center;
            }
            &.token-eth {
                background: url("../../assets/img/oneToKen/icon-eth.png") no-repeat center;
            }
            svg {
                transform: rotate(-0.05deg);
            }
            circle {
                transition: stroke-dasharray 0.2s;
            }
        }
        .icon-hot {
            &::before {
                content: "";
                display: block;
                position: absolute;
                z-index: 3;
                right: 0;
                overflow: hidden;
                background: url("../../assets/img/oneToKen/icon-hot.png") no-repeat center;
                background-size: cover;
                width: 98px;
                height: 49px;
                transform-origin: right top;
                transition: all 0.2s;
            }
        }
        .icon-win{
            &::after{
                content: "You Win";
                display: block;
                position: absolute;
                z-index: 3;
                top:20px;
                left: 0px;
                overflow: hidden;
                background: #cd204b;
                padding:0 4px;

                font-size:14px;
                color: #fff;
                height:20px;
                line-height:20px;

            }
        }
        .icon-mybet{
            &::after{
                content: "You Bet";
                display: block;
                position: absolute;
                z-index: 3;
                top:20px;
                left: 0px;
                overflow: hidden;

                padding:0 4px;


                font-size:12px;
                color: #a57dff;
                font-weight:bold;
                height:20px;
                line-height:20px;
                border:1px solid #7b4de4;

            }
        }
        .msg-winning {
            position: fixed;
            left: 50%;
            bottom: 0;
            transform: translate(-50%, 0%);
            background: url("../../assets/img/oneToKen/bg-congratulate.jpg") no-repeat center;
            background-size: cover;
            text-align: center;
            color: #fff;
            font-weight: bold;
            overflow: hidden;
            width: 100%;
            max-width: 1190px;
            transition: all 0.2s;
            height: 35px;
            line-height: 35px;
            font-size: 26/2px;
            i {
                font-family: sans-eb;
                font-size: 34/2px;
            }
            &.show {
                transform: translate(-50%, 0);
            }
        }
        .history {
            width: 92%;
            margin: 0 auto;
            overflow: hidden;
        }
        /*投注*/
        .betting {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 6px;
            transform: translateY(100%);
            transition: all 0.2s;
            .bg-betting {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                background: rgba(90, 47, 163, 1);
                border-radius: 6px;
                padding: 10px percentage(20/290);
            }
            .bet-close {
                display: block;
                position: absolute;
                right: 0px;
                top: 0px;
                background: url("../../assets/img/oneToKen/close-bet.png") no-repeat center;
                background-size: 12px;
                padding: 13/2px;
                width: 70/2px;
                height: 70/2px;
            }
            /*正常投注*/
            .bet-normal {
                .bet-t {
                    color: #fff;
                    font-weight: bold;
                    line-height: 48/2px;
                    font-size: 19px;
                }
                .bet-m {
                    color: #a99acc;
                    line-height: 42/2px;
                    font-size: 28/2px;
                }
                .bet-amount {
                    display: flex;
                    justify-content: space-between;
                    width: percentage(186/250);
                    overflow: hidden;
                    margin: 35/2px auto 0;
                    a {
                        display: block;
                        border: 1px solid #9368f7;
                        color: #fff;
                        text-align: center;
                        height: 52/2px;
                        width: percentage(60/186);
                        line-height: 52/2px;
                        font-size: 28/2px;
                        &.on {
                            background: #9368f7;
                        }
                    }
                }
                .bet-input {
                    display: flex;
                    width: percentage(186/250);
                    margin: 10/2px auto 0;
                    text-align: center;
                    overflow: hidden;
                    border: 1px solid #9368f7;
                    border-radius: 3px;
                    overflow: hidden;
                    height: 76/2px;
                    line-height: 76/2px;
                    a {
                        display: block;
                        color: #fff;
                        font-size: 28/2px;
                        width: percentage(35/186);
                        &:active {
                            background: #633fb6;
                        }
                    }
                    input {
                        flex: 1;
                        outline: none;
                        border: 1px solid #9368f7;
                        border-top: none;
                        border-bottom: none;
                        text-align: center;
                        overflow: hidden;
                        background: transparent;
                        color: #fff;
                        height: 76/2px;
                        font-size: 32/2px;
                    }
                }
                .bet-btn {
                    display: block;
                    border-radius: 6px;
                    background: #f67c22;
                    text-align: center;
                    font-weight: bold;
                    color: #fff;
                    height: 80/2px;
                    line-height: 80/2px;
                    margin: 22/2px 0 0 0;
                    &:active {
                        background: #dd6d1b;
                    }
                }
            }
            /*投注成功*/
            .bet-success {
                .bet-icon {
                    overflow: hidden;
                    background: url("../../assets/img/oneToKen/bet-success.png") no-repeat center;
                    background-size: cover;
                    width: 88/2px;
                    height: 88/2px;
                    margin: 0 auto 2/2px;
                }
                .bet-t {
                    color: #fff;
                    font-weight: bold;
                    text-align: center;
                    line-height: 60/2px;
                }
                .bet-m {
                    color: #a99acc;
                    line-height: 34/2px;
                    font-size: 28/2px;
                }
                .btn-box {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 30/2px;
                    a {
                        display: block;
                        text-align: center;
                        color: #fff;
                        overflow: hidden;
                        width: percentage(120/250);
                        height: 80/2px;
                        line-height: 80/2px;
                        border-radius: 6/2px;
                    }
                    .bet-btnV {
                        border: 1px solid #9e8dc7;
                    }
                    .bet-btnB {
                        background: #f67c22;
                        font-weight: bold;
                    }
                }
            }
            /*投注失败*/
            .bet-fail {
                .bet-icon {
                    overflow: hidden;
                    background: url("../../assets/img/oneToKen/bet-fail.png") no-repeat center;
                    background-size: cover;
                    width: 88/2px;
                    height: 88/2px;
                    margin: 0 auto 2/2px;
                }
                .bet-t {
                    color: #fff;
                    font-weight: bold;
                    text-align: center;
                    line-height: 60/2px;
                }
                .bet-m {
                    color: #a99acc;
                    line-height: 34/2px;
                    font-size: 28/2px;
                }
                .bet-fail {
                    display: block;
                    border: 1px solid #a99acc;
                    text-align: center;
                    border-radius: 6px;
                    color: #fff;
                    height: 80/2px;
                    line-height: 80/2px;
                    font-size: 34/2px;
                    margin-top: 44/2px;
                }
            }
            /*余额不足*/
            .bet-balance {
                .bet-icon {
                    overflow: hidden;
                    background: url("../../assets/img/oneToKen/bet-fail.png") no-repeat center;
                    background-size: cover;
                    width: 88/2px;
                    height: 88/2px;
                    margin: 0 auto 2/2px;
                }
                .bet-t {
                    color: #fff;
                    font-weight: bold;
                    text-align: center;
                    line-height: 60/2px;
                }
                .bet-m {
                    color: #a99acc;
                    line-height: 34/2px;
                    font-size: 28/2px;
                }
                .btn-box {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 30/2px;
                    a {
                        display: block;
                        text-align: center;
                        color: #fff;
                        overflow: hidden;
                        width: percentage(120/250);
                        height: 80/2px;
                        line-height: 80/2px;
                        border-radius: 6/2px;
                    }
                    .bet-btnT {
                        border: 1px solid #9e8dc7;
                    }
                    .bet-btnR {
                        background: #f67c22;
                        font-weight: bold;
                    }
                }
            }
            .bet-normal,
            .bet-success,
            .bet-fail,
            .bet-balance {
                display: none;
            }
            &.normal {
                transform: translateY(0);
                .bet-normal {
                    display: block;
                }
            }
            &.success {
                transform: translateY(0);
                .bet-success {
                    display: block;
                }
            }
            &.fail {
                transform: translateY(0);
                .bet-fail {
                    display: block;
                }
            }
            &.balance {
                transform: translateY(0);
                .bet-balance {
                    display: block;
                }
            }
        }
        .item-popular {
            position: relative;
            border-radius: 6px;
            background: linear-gradient(to right top, #4e1b70, #57204f);
            width: percentage(690/750);
            margin: 40/2px auto 0;
            padding: 24/2px 38/2px 24/2px;
            transition: all 0.2s;
            .title {
                color: #fff;
                font-weight: bold;
                .t1 {
                    line-height: 70/2px;
                    font-size: 58/2px;
                }
                .t2 {
                    line-height: 52/2px;
                    font-size: 38/2px;
                }
            }
            .msg {
                color: #a99acc;
                width: 280/2px;
                font-size: 22/2px;
                line-height: 34/2px;
                margin-top: 74/2px;
                p {
                    overflow: hidden;
                }
                i {
                    float: right;
                    font-size: 25/2px;
                }
            }
            .btn {
                margin-top: 40/2px;
                height: 72/2px;
                line-height: 72/2px;
                &.btn-waiting{
                    cursor: default;
                    background: none;
                    text-align: left;
                }
            }
            &.icon-hot {
                &::before {
                    top: 4px;
                    transform: scale(0.5);
                }
            }
        }

        .item-common {
            position: relative;
            border-radius: 6px;
            width: percentage(690/750);
            margin: 0 auto;
            padding: 0 38/2px 38/2px;
            overflow: hidden;
            .token-process {
                transform: scale(75/102);
                top: 40/2px;
                right: 48/2px;
            }
            .title {
                color: #fff;
                padding-top: 50/2px;
                .t1 {
                    font-weight: bold;
                    font-size: 76/2px;
                    line-height: 80/2px;
                }
                .t2 {
                    font-size: 33/2px;
                    line-height: 45/2px;
                }
            }
            .msg {
                color: #a99acc;
                margin: 30/2px 0 0;
                padding: 0;
                line-height: 42/2px;
                font-size:28/2px;
                i {
                    float: right;
                }
            }
            .btn {
                height: 70/2px;
                line-height: 70/2px;
                font-size: 34/2px;

                margin: 18px 0 0;
                &.btn-waiting{
                    background: none;
                    text-align: left;
                    cursor: default;

                    text-indent:0;
                }
            }
            &.bg1 {
                background: linear-gradient(#412057, #4c2552);
            }
            &.bg2 {
                background: linear-gradient(#412057, #3e2568);
            }
            &.icon-hot {
                &::before {
                    top: 4px;
                    transform: scale(0.5);
                }
            }
            &+.item-common {
                margin-top: 20px;
            }
        }

        .item-history {
            position: relative;
            background: #361845;
            border-radius: 6px;
            padding: 20/2px 24/2px 15/2px;
            .token-process {
                top: 20/2px;
                right: 24/2px;
                transform: scale(27/102);
            }
            .title {
                color: #fff;
                .t1 {
                    font-weight: bold;
                    height: 35/2px;
                    line-height: 35/2px;
                    font-size: 32/2px;
                }
                .t2 {
                    padding-top: 5px;
                    line-height: 24/2px;
                    font-size: 16/2px;
                }
            }
            .msg {
                color: #a99acc;
                margin-top: 10px;
                line-height: 18/2px;
                font-size: 16/2px;
                i {
                    float: right;
                }
            }
            .result {
                position: relative;
                overflow: hidden;
                font-weight: bold;
                height: 24/2px;
                line-height: 24/2px;
                font-size: 18/2px;
                margin-top: 22/2px;
                &.waiting {
                    color: #fff;
                }
                &.win {
                    color: #fdc90c;
                    padding-left: 46/2px;
                    &::before {
                        content: "";
                        display: block;
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 26/2px;
                        height: 24/2px;
                        overflow: hidden;
                        background: url("../../assets/img/oneToKen/icon-Winning.png") no-repeat center;
                        background-size: cover;
                    }
                }
            }
            &.item-history {
                margin-top: 10px;
            }
        }

        .item-tltle {
            position: relative;
            width: percentage(690/750);
            margin: 30px auto 20px;
            overflow: hidden;
            >*{
                display: table-cell;
                vertical-align: text-bottom;
                text-align: center;
            }
            .t1 {
                color: #fff;
                font-size: 21px;
                font-weight: bold;

            }
            .msg {
                color: #a99acc;
                font-size: 12px;
                margin-left: 20px;
            }
            .btn-more,
            .btn-play {
                float: right;
                color: #a486f7;
                font-size: 13px;
            }
            .btn-play {
                margin-right: 20px;
            }
        }

        .recentBets {
            width: 92%;
            margin: 0 auto;
            .t1 {
                color: #fff;
                padding-top: 30/2px;
                line-height: 74/2px;
                font-size: 42/2px;
                font-weight: bold;
            }
            li {
                position: relative;
                color: #fff;
                height: 50px;
                line-height: 50px;
                overflow: hidden;
                font-size: 14px;
                padding-left: 25px;
                .email {
                    width: 60%;
                    .text-overflow();
                }
                .amount {
                    width: 40%;
                    text-align: right;
                    .text-overflow();
                }
                .time {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    line-height: 17px;
                    font-size: 12px;
                    color: #a99acc;
                }
                &::before {
                    content: "";
                    display: block;
                    position: absolute;
                    left: 0;
                }
                &.icon-eth {
                    &::before {
                        background: url("../../assets/img/oneToKen/icon-eth.png");
                        background-size: cover;
                        width: 25/2px;
                        height: 42/2px;
                        top: 15px;
                    }
                }
                &.icon-bth {
                    &::before {
                        background: url("../../assets/img/oneToKen/icon-bth.png");
                        background-size: cover;
                        width: 27/2px;
                        height: 42/2px;
                        top: 13px;
                    }
                }
            }
        }
    }



    /* xs超小屏幕（手机，大于 480） */

    @media (min-width: @screen-phone) {}

    /* sm小屏幕（平板，大于等于 768px） */

    @media (min-width: @screen-tablet) {
        /deep/
        .oneToKen {
            .item-popular,
            .item-tltle,
            .item-common,
            .recentBets,
            .history {
                width: 100%;
            }
            .btn {
                &:hover {
                    background: #5848b3;
                    color: #fff;
                }

            }
            a {
                &:hover {
                    color: #5848b3;
                }
            }
            .recentBets {
                .t1 {
                    padding-top: 0;

                }
            }
            .item-history {
                .msg,
                .result {
                    line-height: 18px;
                    font-size: 12px;
                }
                .result {
                    height: 18px;
                    &.win {
                        &::before {
                            top: 3px;
                        }
                    }
                }
            }
        }

    }

    /* md中等屏幕（桌面显示器，大于等于 992px） */

    @media (min-width: @screen-desktop) {
        /deep/
        .oneToKen {
            /*投注*/
            .betting {
                .bet-close {
                    display: block;
                    position: absolute;
                    right: 0px;
                    top: 0px;
                    background: url("../../assets/img/oneToKen/close-bet.png") no-repeat center;
                    background-size: 12px;
                    padding: 10px;
                    width: 30px;
                    height: 30px;
                    &:hover {
                        transform: rotate(90deg);
                    }
                }
                .bet-normal {
                    .bet-t {
                        line-height: 20px;
                        font-size: 16px;
                    }
                    .bet-m {
                        font-size: 12px;
                        line-height: 17px;
                    }
                    .bet-amount {
                        margin: 15px auto 0;
                        a {
                            height: 22px;
                            line-height: 22px;
                            font-size: 12px;
                            &:hover,
                            &.on {
                                background: #9368f7;
                            }
                        }
                    }
                    .bet-input {
                        height: 32px;
                        line-height: 32px;
                        a {
                            font-size: 12px;
                            &:hover {
                                background: #633fb6;
                            }
                        }
                        input {
                            height: 32px;
                            font-size: 14px;
                        }
                    }
                    .bet-btn {
                        height: 34px;
                        line-height: 34px;
                        margin: 10px 0 0 0;
                        &:hover,
                        &:active {
                            background: #dd6d1b;
                        }
                    }
                }
                .bet-success {
                    .bet-icon {
                        width: 37px;
                        height: 37px;
                        margin: 0 auto 4px;
                    }
                    .bet-t {
                        font-size: 14px;
                        line-height: 22px;
                    }
                    .bet-m {
                        line-height: 14px;
                        font-size: 12px;
                    }
                    .btn-box {
                        margin-top: 12px;
                        a {
                            height: 34px;
                            line-height: 34px;
                            border-radius: 6px;
                            font-size: 14px;
                        }
                        .bet-btnV {
                            border: 1px solid #9e8dc7;
                            &:hover {
                                background: #5848b3;
                            }
                        }
                        .bet-btnB {
                            background: #f67c22;
                            font-weight: bold;
                            &:hover {
                                background: #df6911;
                            }
                        }
                    }
                }
                .bet-fail {
                    .bet-icon {
                        width: 37px;
                        height: 37px;
                        margin: 0 auto;
                    }
                    .bet-t {
                        font-size: 14px;
                        line-height: 26px;
                    }
                    .bet-m {
                        margin-top: 5px;
                        line-height: 14px;
                        font-size: 12px;
                    }
                    .bet-fail {
                        height: 34px;
                        line-height: 34px;
                        font-size: 14px;
                        margin-top: 19px;
                        &:hover {
                            background: #5848b3;
                        }
                    }
                }
                .bet-balance {
                    .bet-icon {
                        width: 37px;
                        height: 37px;
                        margin: 0 auto;
                    }
                    .bet-t {
                        font-size: 14px;
                        line-height: 26px;
                    }
                    .bet-m {
                        margin-top: 5px;
                        line-height: 14px;
                        font-size: 12px;
                    }
                    .btn-box {
                        margin-top: 20px;
                        a {
                            height: 34px;
                            line-height: 34px;
                            border-radius: 6px;
                            font-size: 14px;
                        }
                        .bet-btnT {
                            border: 1px solid #9e8dc7;
                            &:hover {
                                background: #5848b3;
                            }
                        }
                        .bet-btnR {
                            background: #f67c22;
                            font-weight: bold;
                            &:hover {
                                background: #df6911;
                            }
                        }
                    }
                }
            }
        }
    }

    /* lg大屏幕（大桌面显示器，大于等于 1200px） */

    @media (min-width: @screen-lg-desktop) {
        /deep/
        .oneToKen {
            .main {
                padding: 32px 0 100px 0;
            }
            .msg-winning {
                height: 70px;
                line-height: 70px;
                font-size: 26px; //padding-top:percentage(70/1190);
                i {
                    font-size: 34px;
                }
            }
            .for-full {
                margin: 0;
            }
            .item-popular {
                width: 100%;
                padding: 20px 20px 15px;
                margin: 0;
                .token-process {
                    top: 83px;
                    right: 40px;
                    transform: scale(1);
                }
                .title {
                    padding-left: 10px;
                    .t1 {
                        line-height: 44px;
                        font-size: 36px;
                    }
                    .t2 {
                        line-height: 32px;
                        font-size: 24px;
                    }
                }
                .msg {
                    width: 184px;
                    font-size: 14px;
                    line-height: 22px;
                    margin-top: 40px;
                    padding-left: 10px;
                    i {
                        font-size: 16px;
                    }
                }
                .btn {
                    margin-top: 24px;
                    height: 50px;
                    line-height: 50px;
                    font-size: 18px;
                    &.btn-waiting{
                        text-indent:10px;
                    }
                }
                &.icon-hot {
                    &::before {
                        top: 5px;
                        transform: scale(30/49);
                    }
                }
            }
            .item-common {
                width: 100%;
                padding: 0 30px 16px;
                .token-process {
                    transform: scale(62/102);
                    top: 17px;
                    right: 40px;
                }
                .title {
                    padding: 23px 10px 0;
                    .t1 {
                        font-size: 32px;
                        height: 28px;
                        line-height: 28px;
                        i {
                            font-size: 22px;
                        }
                    }
                    .t2 {
                        font-size: 14px;
                        line-height: 32px;
                    }
                }
                .msg {
                    margin: 15px 0 0 0;
                    padding: 0 10px 0;
                    line-height: 18px;
                    font-size:12px;
                    i{
                        font-size:14px;
                    }
                }
                .btn {
                    margin: 18px 0 0 0;
                    height: 30px;
                    line-height: 30px;
                    font-size: 14px;
                    &.btn-waiting{
                        text-indent:10px;
                    }
                }
                &.icon-hot {
                    &::before {
                        top: 5px;
                        transform: scale(23/49);
                    }
                }
                &+.item-common {
                    margin-top: 10px;
                }
            }
            .item-history {
                padding: 22px 40px 16px;
                .token-process {
                    top: 18px;
                    right: 40px;
                    transform: scale(46/102);
                }
                .title {
                    .t1 {
                        height: 24px;
                        line-height: 24px;
                        font-size: 28px;
                        i {
                            font-size: 18px;
                        }
                    }
                    .t2 {
                        line-height: 20px;
                        font-size: 12px;
                    }
                }
                .msg {
                    margin-top: 14px;
                    line-height: 16px;
                    font-size: 12px;
                }
                .result {
                    height: 24px;
                    line-height: 24px;
                    font-size: 14px;
                    margin-top: 14px;
                    &.waiting {}
                    &.win {
                        padding-left: 46px;
                        &::before {
                            width: 26px;
                            height: 24px;
                            background-size: cover;
                        }
                    }
                }
                &.item-history {
                    margin-top: 0px;
                }
            }
            .item-tltle {
                width: 100%;
                max-width: 1190px;
                margin: 32px auto 20px;
                overflow: hidden;
                .t1{
                    padding-right:20px;
                }
                a{
                    font-size:14px;
                }
            }
            .recentBets {
                .t1 {
                    height: 36px;
                    padding-top: 0;
                    line-height: 16px;
                    font-size: 16px;
                    text-indent: 23px;
                }
                li {
                    padding-left: 55px;
                    .email {}
                    .amount {}
                    .time {}
                    &::before {
                        content: "";
                        display: block;
                        position: absolute;
                        left: 25px;
                    }
                    &.icon-eth {
                        &::before {
                            width: 16px;
                            height: 27px;
                            top: 10px;
                        }
                    }
                    &.icon-bth {
                        &::before {
                            width: 18px;
                            height: 25px;
                            top: 13px;
                        }
                    }
                }
            }
        }

    }


</style>



