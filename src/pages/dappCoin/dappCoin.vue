<template>
    <div class="dapp-contain">
        <div>
            <p>基于区块链123</p>
        </div>
    </div>
</template>

<script>
    import {mTypes, aTypes} from '~/store/cs_page/dappCoin'
    import {
        copySucc,
        copyError,
        formateBalance,
        formateCoinType
    } from '~common/util'
    import Vue from 'vue'
    import vueClipboard from 'vue-clipboard2'

    Vue.use(vueClipboard)
    export default {
        data () {
            return {
                showFirstBaxi: false, // 首次提示
                showRecharge: false // 显示充值弹窗
            }
        },
        watch: {
            currBalance (newVal, oldVal) {
                /* 切换币种 */
                if (oldVal.cointype !== newVal.cointype) {
                    this.changePageState()
                }
            },
            isLog (val) {
                /* 切换登陆态之后改变状态 */
                this.changePageState()
            }
        },
        methods: {
            copySucc,
            copyError,
            formateBalance,
            formateCoinType,
            getBuyNum (bigNum) {
                let buyNumArr = []
                let startIndex = 1
                let currReduce = null
                let betweenNum = bigNum
                do {
                    currReduce = reduceBigNum(betweenNum)
                    if (!(currReduce.isZero)) {
                        buyNumArr.push(startIndex)
                    }
                    betweenNum = currReduce.bigNum
                    startIndex++
                } while (parseInt(betweenNum) !== 0)
                return buyNumArr
                function reduceBigNum (bigNum) {
                    bigNum = bigNum.toString()
                    let bigNumArr = bigNum.split('')
                    let endNumArr = []
                    let beforeNum = false
                    let currNum = null
                    for (let i = 0; i < bigNumArr.length; i++) {
                        if (isNaN(Number(bigNumArr[i]))) {
                            console.error('bigNum NaN')
                            break
                        }
                        currNum = Number(bigNumArr[i])
                        beforeNum ? endNumArr.push(Math.floor((currNum + 10) / 2)) : endNumArr.push(Math.floor((currNum) / 2))
                        beforeNum = (currNum % 2 === 1)
                    }
                    return {
                        bigNum: endNumArr.join(''),
                        isZero: !beforeNum
                    }
                }
            }
        },
        computed: {
            language () {
                return this.$store.state.language
            },
            userInfo () {
                return this.$store.state.userInfo
            },
            currBalance () {
                return this.$store.state.currBalance
            }

        },
        components: {
        },
        async mounted () {
            console.log(1111)
        }
    }
</script>
<style scoped="" lang="less" type="text/less">
    @import "../../styles/lib-mixins.less";
    @import "../../styles/lib-media.less";
    @import "../../styles/lib-font.less";

    div, a, img, p, span, i {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
    }

    .notice {
        height: 100%;
    }

    .head-box {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 9;
    }

    /*以移动端为主来写*/

    .placeholder {
        display: block;
        width: 100%;
        opacity: 0;
        height: 0;
    }

    .tiger {
        position: relative;
        -webkit-overflow-scrolling: touch;
        overflow: hidden;
        .bg-tiger {
            display: block;
            width: 100%;
            /*height:100%;*/
        }
    }

    .tiger-wrap {
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding-top: 70px;
    }

    .btn-rule {
        display: block;
        position: absolute;
        z-index: 3;
        right: 10px;
        top: 77px;
        width: 28px;
        height: 28px;
        overflow: hidden;
        line-height: 28px;
        text-align: center;
        font-size: 21px;
        color: #fff;
        font-weight: bold;
        border-radius: 3px;
        background: rgba(0, 0, 0, 0.6);
    }

    .jackpot-low {
        position: relative;
        z-index: 4;
        margin: 0 auto;
        background: url("../../assets/img/tiger/bg-jackpot.png") no-repeat center;
        background-size: contain;
        width: percentage(477/750);
        width: 477/2px;
        height: 117/2px;
        overflow: hidden;
        font-family: imp;
        text-align: center;
        color: #ffe400;
        .jackpot-all {
            display: flex;
            justify-content: center;
            align-items: baseline;
            height: 37px;
            line-height: 37px;
            overflow: hidden;
            p {
                font-size: 15px;
                color: #f3ca83;
            }
            i {
                margin: 0 3px 0 7px;
                font-size: 23px;
            }
            span {
                font-size: 15px;
            }
        }
        .jackpot-win {
            display: flex;
            justify-content: center;
            height: 35/2px;
            line-height: 35/2px;
            overflow: hidden;
            align-items: baseline;
            p {
                font-size: 12px;
                color: #f3ca83;
            }
            i {
                margin: 0 3px 0 7px;
                font-size: 14px;
            }
            span {
                font-size: 10px;
                color: #ffe400;
            }
        }
    }

    .msg-win {
        display: none;
        position: relative;
        z-index: 3;
        margin: 0 auto;
        /*width: 100%;*/
        height: 42/2px;
        overflow: hidden;
        background: url("../../assets/img/tiger/bg-msg-win.png") no-repeat center;
        background-size: 482/2px 42/2px;
        line-height: 21px;
        text-align: center;
        font-size: 10px;
        color: #ffffff;
        .text-scroller {
            height: 100%;
        }
        ul {
            position: absolute;
            width: 100%;
            overflow: hidden;
            transition: all 0.2s;
        }
        li {
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    }

    .slot {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        transition: all 0.2s;
        z-index: 2;
        .bg-slot {
            position: absolute;
            left: 0;
            bottom: 26px;
            width: 100%;
        }
        .bg-slot-run {
            display: none;
        }
        &::before {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: url("../../assets/img/tiger/line.png") no-repeat center;
            background-size: cover;
        }
    }

    .bg-slot {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        transition: all 0.2s;
        background: url("../../assets/img/tiger/bg-slot-run.png") no-repeat top center;
        background-size: contain;
        opacity: 0;
    }

    .slot.run + .bg-slot {
        opacity: 1;
    }

    .slot.opening {
        .slot-box {
            /*overflow: visible;*/
            border-radius: 0;
        }
        li.yes {
            border: 4px solid #fff287;
            border-radius: 12px;
            box-shadow: inset 0 0 10px #fff287, 0 0 10px #fff287;
        }
        li:not(.yes) {
            img {
                opacity: 0.3;
            }
        }
        &::before {
            animation: bingo 0.2s alternate infinite;
        }
    }

    .slot-box {
        position: relative;
        margin: 0 auto;
        top: percentage(260/1173);
        width: percentage(610/750);
        transform: rotate(0);
        transform: translate3d(0, 0, 0);
        /*高度需要动态设置*/
        height: 0;
        display: flex;
        justify-content: center;
        /*~防止less解析/，这里是单独设置水平和垂直的半径*/
        border-radius: ~"110px/60px";
        overflow: hidden;
        ul {
            position: relative;
            width: 33%;
            li {
                width: 95%;
                box-sizing: border-box;
                margin: 15px auto 0;
                transition: all 0.2s ease-in;
                border: 4px solid transparent;
                img {
                    display: block;
                    margin: 0 auto;
                    /* 168/203=82.75*/
                    width: 82%;
                }
            }
        }
        #slotItem1 {
            /*top:-100px !important;*/
        }
        ul.tranitionTiming {
            transition-property: all;
            transition-duration: 2s;
            transition-timing-function: ease-in-out;
            transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
        }
        .slot-item1 {
            transition-delay: 0s;
        }
        .slot-item2 {
            transition-delay: 0.2s;
        }
        .slot-item3 {
            transition-delay: 0.4s;
        }
    }

    .btn-main {
        position: absolute;
        z-index: 3;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
        width: 48.4%;
        cursor: pointer;
        img {
            display: block;
            width: 100%;
        }
        .btn {
            position: absolute;
            top: 0px;
            left: 50%;
            transform: translateX(-50%);
            width: percentage(339/363);
            height: percentage(118/143);
            overflow: hidden;
            text-align: center;
            color: #fff;
            font-family: arial;
            p {
                padding-top: 7px;
                line-height: 26px;
                font-size: 24px;
                font-weight: bold;
            }
            div {
                line-height: 20px;
                font-size: 12px;
            }
        }
        .btn-double {
            line-height: 52px;
            font-size: 24px;
            font-weight: bold;
        }
        .btn-spin, .btn-double {
            background: url("../../assets/img/tiger/btn-spin.png") no-repeat center;
            background-size: cover;
        }
        .btn-free {
            background: url("../../assets/img/tiger/btn-free.png") no-repeat center;
            background-size: cover;
        }
        .btn-auto {
            background: url("../../assets/img/tiger/btn-auto.png") no-repeat center;
            background-size: cover;
        }
        &:not(.disable) &:active {
            .btn {
                animation: btn .5s;
            }
        }
        &.disable {
            .btn {
                p, div {
                    opacity: 0.3;
                }
            }
        }
    }

    .lastwin {
        position: absolute;
        z-index: 3;
        left: 0;
        bottom: percentage(146/1173);
        width: 100%;
        height: 28px;
        overflow: hidden;
        text-align: center;
        line-height: 28px;
        font-size: 10px;
        color: #fff;
        font-family: Arial;
    }

    .operating {
        position: absolute;
        z-index: 3;
        width: percentage(595/750);
        left: 50%;
        bottom: percentage(200/1173);
        transform: translateX(-50%);
        display: flex;
        justify-content: space-between;
        text-align: center;
        > div {
            position: relative;
            //width: percentage(173/610);
            width: percentage(194/595);
            border-radius: 6px;
            padding: 0 10px;
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, 0.3);
        }
        .single {
            cursor: pointer;
            padding: 0;
            .top {
                display: flex;
                justify-content: center;
                align-items: baseline;
                height: 52/2px;
                line-height: 52/2px;
                color: #fff;
                .single-amount {
                    font-size: 15px;
                }
                .single-unit {
                    line-height: 22px;
                    font-size: 10px;
                }
            }
            .msg {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: rgba(0, 0, 0, 0.3);
                font-size: 12px;
                color: #fff;
                font-weight: bold;
                font-family: Arial;
                i {
                    display: block;
                    background: url("../../assets/img/tiger/icon-arrow.png") no-repeat center;
                    background-size: cover;
                    width: 15/2px;
                    height: 9/2px;
                }
            }
            &.on {
                border-top-left-radius: 0;
                border-top-right-radius: 0;
                .top {
                    background: #173407;
                }
                .msg {
                    background: #0f2404;
                }
                ul {
                    display: block;
                }
            }
            ul {
                /*display: none;*/
                position: absolute;
                left: 0;
                top: -77px;
                width: 100%;
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
                color: #fff;
                background: #173407;
                box-sizing: border-box;
                li {
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: baseline;
                    height: 34px;
                    line-height: 34px;
                    background: #295b0d;
                    border-top-left-radius: 6px;
                    border-top-right-radius: 6px;
                    margin: 5px 2px 0;
                    .single-unit {
                        line-height: 33px;
                    }
                    &:hover {
                        background: #0f2404;
                    }
                }
                &.ul3 {
                    top: -116px;
                }
            }
        }
        .all {
            border: 2px solid #f3ca83;
            background-color: rgba(0, 0, 0, 0.3);
            color: #ffe400;
            font-weight: bold;
            .msg {
                border-bottom: 2px solid #f3ca83;
                height: 18px;
                line-height: 18px;
                font-size: 12px;
                font-family: Arial;
            }
            .top {
                display: flex;
                justify-content: center;
                align-items: baseline;
                height: 21px;
                line-height: 21px;
                .all-amount {
                    font-size: 16px;
                }
                .all-unit {
                    font-size: 10px;
                }
            }
        }
        .bar {
            .top {
                display: flex;
                justify-content: space-between;
                border-bottom: 2px solid rgba(243, 202, 131, 0.2);
                padding-top: 10/2px;
                height: 40/2px;
                line-height: 16px;
                color: #ffe400;
                font-weight: bold;
                font-size: 14px;
            }
            .bar-process {
                position: relative;
                width: percentage(104/175);
                height: 12px;
                border: 2px solid #f3ca83;
                background: #2f250f;
                border-radius: 3px;
                overflow: hidden;
                i {
                    display: block;
                    box-sizing: border-box;
                    height: 10px;
                    overflow: hidden;
                    background: #40861c;
                    border-radius: 2px;
                    margin: 1px;
                }
            }
            .msg {
                font-size: 12px;
                color: #fff;
                font-weight: bold;
                font-family: Arial;
            }
            .bar-lycky {
                position: absolute;
                right: 3px;
                top: 0;
                width: 53/2px;
                height: 52/2px;
                background: url("../../assets/img/tiger/icon-lucky.png") no-repeat center;
                background-size: cover;
                animation: heartbeat 1s infinite;
            }
        }

    }

    /*pop*/
    .pop {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        transition: all 0.2s;
        background: transparent;
    }

    .reward-small {
        display: none;
        width: 348/2px;
        height: 163/2px;
        /* width:percentage(348/750);*/
        /* padding-bottom:percentage((348/750)*(163/348));*/
        background: url("../../assets/img/tiger/reward-small.png") no-repeat center;
        background-size: contain;
        color: #ffe400;
        font-family: imp;
        .msg {
            display: flex;
            justify-content: center;
            margin-top: 26px;
        }
        p {
            font-size: 30px;
            line-height: 50px;
            margin-right: 2px;
        }
        i {
            font-size: 18px;
            line-height: 58px;
        }
        &.show {
            display: block;
        }
        &.double&.show {
            overflow: visible;
            &::before {
                content: '';
                position: absolute;
                right: -20px;
                top: -3px;
                display: block;
                width: 98/2px;
                height: 98/2px;
                background: url("../../assets/img/tiger/double.png") no-repeat center;
                background-size: cover;
            }
        }
    }

    .reward-big {
        display: none;
        width: 595/2px;
        height: auto;
        &:before {
            position: relative;
            z-index: 2;
            content: '';
            display: block;
            background: url("../../assets/img/tiger/reward-big.png") no-repeat center;
            background-size: cover;
            width: 443/2px;
            height: 251/2px;
            overflow: hidden;
            margin: 0 auto;
        }
        .bg1 {
            box-sizing: border-box;
            position: relative;
            z-index: 1;
            top: -10px;
            width: 595/2px;
            border: 5px solid #3d276a;
        }
        .bg2 {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            background: #3d276a;
            border: 5px solid #ff9000;
            padding-bottom: 3px;
            box-shadow: inset 0 0 20px #9924a7;
        }
        .msg {
            display: flex;
            justify-content: center;
            margin-top: 7px;
            height: 135/2px;
            color: #ffe400;
            font-family: imp;
            overflow: hidden;
            p {
                line-height: 135/2px;
                font-size: 50px;
            }
            i {
                line-height: 90px;
                font-size: 24px;
            }
        }
        ul, .radioLi {
            display: flex;
            justify-content: center;
            height: 22px;
            line-height: 22px;
            overflow: hidden;
            font-size: 12px;
            color: #fff;
            li {
                display: flex;
                justify-content: center;
            }
            li + li {
                margin-left: 5px;
            }
            img {
                display: block;
                width: 22px;
                height: 22px;
            }
        }
        &.show {
            display: block;
        }
        &.double&.show {
            overflow: visible;
            &::after {
                content: '';
                position: absolute;
                right: -36px;
                top: 90px;
                display: block;
                width: 156/2px;
                height: 156/2px;
                background: url("../../assets/img/tiger/double.png") no-repeat center;
                background-size: cover;
                z-index: 3;
            }
        }
    }

    .help {
        display: none;
        max-width: 337px;
        width: 89.86666667%;
        height: auto;
        top: 60px;
        transform: translate(-50%, 0);
        box-sizing: border-box;
        border-radius: 8px;
        background: #2f2a3d;
        padding: 0 15px 12px;
        border: 2px solid #96825c;
        .tiger-close {
            position: absolute;
            top: 0;
            right: 0;
            background: url("../../assets/img/tiger/btn-close.png") no-repeat center;
            background-size: 12px;
            width: 12px;
            height: 12px;
            padding: 12px 16px;
        }
        .title {
            position: relative;
            width: percentage(469/674);
            height: 0;
            padding-bottom: percentage((469/674)*(64/469));
            margin: 0 auto;
            text-align: center;
            font-size: 18px;
            color: #fff;
            font-family: sans-eb;
            background: url("../../assets/img/tiger/bg-helpTitle.png") no-repeat center;
            background-size: cover;
            p {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
        .tab-t {
            border: 1px solid #443a5b;
            border-radius: 3px;
            overflow: hidden;
            margin: 15px auto 0;
            font-size: 12px;
            li {
                width: 33.333333%;
                box-sizing: border-box;
                float: left;
            }
            a {
                display: block;
                width: 100%;
                height: 100%;
                color: #fff;
            }
            li + li {
                border-left: 1px solid #443a5b;
            }
            li.on {
                font-weight: bold;
                background: #443a5b;
            }
        }
        .tab-c {
            > li {
                display: none;
            }
            > li.on {
                display: block;
            }
            .line-divi {
                position: relative;
                /*margin:25px auto 20px;*/
                margin: 15px auto 10px;
                line-height: 14px;
                font-size: 11px;
                color: #7f6bad;
                &::before {
                    content: '';
                    display: block;
                    position: absolute;
                    left: 0;
                    bottom: 7px;
                    width: 100%;
                    height: 1px;
                    background: #7f6bad;
                    z-index: -1;
                }
                div {
                    position: relative;
                    display: table;
                    padding: 0 20px;
                    margin: 0 auto;
                    background: #2f2a3d;
                    &::before, &::after {
                        content: '';
                        display: block;
                        position: absolute;
                        bottom: 4px;
                        background: url(../../assets/img/tiger/start.png) no-repeat center;
                        background-size: cover;
                        width: 7px;
                        height: 7px;
                        overflow: hidden;
                    }
                    &::before {
                        left: -1px;
                    }
                    &::after {
                        right: -1px;
                    }
                }
            }
            .winningamount {
                line-height: 20px;
                font-size: 16px;
                color: #fff;
            }
            .details {
                width: percentage(550/597);
                margin: 14px auto 0;
                img {
                    display: block;
                    width: 100%;
                }
            }
            .special {
                li {
                    overflow: hidden;
                    line-height: 15px;
                    font-size: 12px;
                    color: #fff;
                }
                li + li {
                    margin-top: 30px;
                }
                .icon {
                    float: left;
                    width: 116/2px;
                }
                img {
                    display: block;
                    margin: 0 auto;
                    width: 24px;
                }
                p {
                    margin-left: 116/2px;
                    text-align: left;
                }
            }
            .smallAward {
                display: block;
                margin: 0 auto 0;
                //width:percentage(375/674);
                width: percentage(375/674);
            }
            .msg {
                margin-top: 6px;
                /*padding:0 22px;*/
                padding: 0 19px;
                line-height: 15px;
                text-align: left;
                font-size: 12px;
                color: #fff;
            }
            .lucky-value {
                display: flex;
                justify-content: space-between;
                width: percentage(406/597);
                margin: 0 auto;
                img {
                    display: block;
                    width: 100%;
                }
                p {
                    width: 52px;
                    font-size: 12px;
                    line-height: 30px;
                    color: #fff;
                }
            }
            .lucky-48 {
                width: 171/2px;
            }
            .lucky-100 {
                width: 158/2px;
            }
            .win-line {
                display: block;
                width: percentage(539/674);
                margin: 0 auto;
            }
        }
        &.show {
            display: block;

        }
    }

    .pop-recharge {
        display: none;
        max-width: 674/2px;
        width: percentage(674/750);
        height: auto;
        border: 2px solid #96825c;
        top: 50%;
        transform: translate(-50%, -50%);
        box-sizing: border-box;
        border-radius: 8px;
        background: #2f2a3d;
        .recharge-close {
            position: absolute;
            top: 0;
            right: 0;
            background: url("../../assets/img/tiger/btn-close.png") no-repeat center;
            background-size: 12px;
            width: 12px;
            height: 12px;
            padding: 12px 16px;
        }
        .title {
            margin-top: 29px;
            line-height: 16px;
            font-size: 13px;
            color: #fff;
        }
        .copy {
            width: percentage(580/674);
            margin: 7px auto 0;
            text-align: center;
            vertical-align: middle;
            p {
                box-sizing: border-box;
                margin-right: 152/2px;
                padding: 10px;
                word-wrap: break-word;
                background: #211d2d;
                height: 52px;
                line-height: 16px;
                overflow: hidden;
                font-size: 13px;
                color: #f3ca83;
            }
            a {
                float: right;
                display: block;
                width: 152/2px;
                height: 52px;
                line-height: 52px;
                font-size: 18px;
                color: #2f2a3d;
                font-weight: bold;
                background: #f3ca83;
            }
        }
        .msg {
            margin-top: 21px;
            font-size: 13px;
            color: #fff;
            line-height: 62/2px;
        }
        img {
            display: block;
            margin: 0 auto 20px;
        }
        &.show {
            display: block;
        }
    }

    /*pc content*/
    .tiger-pc-msg {
        position: relative;
        width: 365px;
        height: 100%;
        padding: 70px 18px 0;
        background: rgba(29, 21, 7, 0.8);
        color: #79695c;
        .tiger-firstBaxi {
            display: none;
            position: absolute;
            right: 0;
            top: 76px;
            width: 256px;
            height: 74px;
            border-radius: 2px;
            background-color: #19130f;
            .firstp {
                text-indent: 0px;
                padding: 0 15px;
                span {
                    color: #f4dc01;
                }
            }
            p {
                color: #fff;
                height: 20px;
                line-height: 20px;
                text-indent: 12px;
            }
            img {
                vertical-align: middle;
            }
            p:first-child {
                margin-top: 16px;
            }
            i {
                display: block;
                position: absolute;
                right: 0;
                top: 0;
                background-image: url("../../assets/img/lucky11/icon-close-jack.png");
                width: 16px;
                height: 16px;
                cursor: pointer;
            }
        }
        h3 {
            margin-top: 10px;
            line-height: 64px;
            font-size: 28px;
        }
        .recent-win {
            text-align: center;
            margin-top: 8px;
        }
        .user {
            float: left;
            width: 160px;
            text-align: left;
        }
        .win {
            float: left;
            width: 92px;
        }
        .time {
            float: right;
            width: 58px;
        }
    }

    .recent-top {
        padding: 0 10px;
        line-height: 30px;
        font-size: 16px;
        border-bottom: 1px solid #5a4d3f;
        text-align: center;
        overflow: hidden;
    }

    .recent-main {
        height: 300px;
        overflow: hidden;
        li {
            padding: 0 10px;
            line-height: 40px;
            overflow: hidden;
        }
        li:nth-child(2n) {
            background: #352b17;
        }
        li:first-child.newRecord {
            animation: newRecord .5s both;
        }
        .user {
            color: #fff;
        }
        .win {
            color: #f4dc01;
        }
        .time {
            color: #67594d;
        }
    }

    .contact {
        padding-top: 5px;
        overflow: hidden;
        .fl {
            float: left;
            width: 250px;
        }
        .fr {
            float: right;
            img {
                width: 90px;
                height: 90px;
            }
        }
        .msg1 {
            line-height: 22px;
        }
        .msg2 {
            line-height: 43px;
            font-size: 16px;
            color: #ffffff;
        }
    }

    @keyframes btn {
        0%, 100% {
            top: 0;
        }
        50% {
            top: 2px;
        }
    }

    @keyframes bingo {
        0%, 25%, 100% {
            background: url("../../assets/img/tiger/line.png") no-repeat center;
            background-size: cover;
        }
        50%, 75% {
            background: url("../../assets/img/tiger/line2.png") no-repeat center;
            background-size: cover;
        }
    }

    @keyframes heartbeat {
        0%, 80%, 100% {
            transform: scale(1);
        }
        40% {
            transform: scale(1.2);
        }
    }

    @keyframes newRecord {
        0% {
            opacity: 0;
            transform: translateY(-100%);
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /*适配*/
    @media (max-width: @screen-desktop) {
        .tiger-pc-msg {
            display: none;
        }

        .msg-win {
            display: block;
        }
    }

    @media (max-width: @screen-tablet) {
        .tiger-wrap {
            padding-top: 50px;
        }
    }

    @media (min-width: @screen-phone) {
        .tiger-pc {
            position: relative;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            height: 586px;
            background: url("../../assets/img/tiger/bg-pc.jpg") no-repeat top center;
            background-size: 1920px 586px;
        }

        .tiger-main {
            height: 100%;
            margin: 0 auto;
            overflow: hidden;
            display: flex;
            justify-content: center;
        }

        .tiger {
            width: 375px;
            overflow: hidden;
            border-left: 25px solid #080603;
            border-right: 25px solid #080603;
        }
    }

    @media (max-width: @screen-phone) {
        .footer {
            display: none;
        }

        .tiger-contain {
            background: #000 url("../../assets/img/tiger/bg-tiger-bak.png") no-repeat center top;
            background-size: 100%;
        }
    }

    .footer {
        border-top: 0 !important;
    }

    .head-box {
        background: transparent;
    }
</style>
