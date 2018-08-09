
<template>
    <div class="luckyCoinDetailed">
        <div class="main">
            <BreadCrumbs></BreadCrumbs>
            <div class="main-detailed flex">
                <!--eth/btc  normal/win/fail/finished/expired -->
                <div class="item btc win">
                    <div class="item-left">
                        <div class="match-img">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="110" height="110">
                                <defs>
                                    <linearGradient x1="1" y1="0" x2="0" y2="0" id="yellowColor1">
                                        <stop offset="0%" stop-color="#f7aa17"></stop>
                                        <stop offset="100%" stop-color="#f19221"></stop>
                                    </linearGradient>
                                    <linearGradient x1="1" y1="0" x2="0" y2="0" id="yellowColor2">
                                        <stop offset="0%" stop-color="#ef8a25"></stop>
                                        <stop offset="100%" stop-color="#f19221"></stop>
                                    </linearGradient>
                                </defs>
                                <g>
                                    <circle cx="55" cy="55" r="50" stroke-width="10" stroke="rgba(255,255,255,0.05)" fill="transparent"/>
                                    <circle
                                        cx="55"
                                        cy="55"
                                        r="50"
                                        stroke="url(#yellowColor1)"
                                        stroke-width="10"
                                        fill="transparent"
                                        stroke-dasharray="0 314"
                                    />
                                    <circle
                                        cx="55"
                                        cy="55"
                                        r="50"
                                        stroke="url(#yellowColor2)"
                                        stroke-width="10"
                                        fill="transparent"
                                        stroke-dasharray="314 314"
                                    />
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div class="item-right">
                        <!--hot/bet-->
                        <div class="icon-box hot bet">
                            <i class="icon-hot">H</i>
                            <i class="icon-youbet">You have been Bet 0.00001 BTC</i>
                        </div>
                        <div class="item-prize">
                            20<i> BTC</i>
                        </div>
                        <div class="item-usd">
                            USD 14,776
                        </div>
                        <div class="item-main">
                            <div class="main-left">
                                <!--正常投注-->
                                <div class="main-normal">
                                    <p>
                                        Bet Amount
                                    </p>
                                    <div class="input-box ">
                                        <input type="text">
                                        <a href="javascript:;">1/2</a>
                                        <a href="javascript:;">2X</a>
                                        <a href="javascript:;">Max</a>
                                    </div>

                                </div>
                                <!--胜利-->
                                <div class="main-win ">
                                    <p>
                                        Draw number
                                    </p>
                                    <p>
                                        1000001
                                    </p>
                                    <span>
                                        Finished  2018.4.23 23:23
                                    </span>
                                </div>
                                <!--失败-->
                                <div class="main-fail">
                                    <p>
                                        Draw number
                                    </p>
                                    <p>
                                        1000001
                                    </p>
                                    <span>
                                        Finished  2018.4.23 23:23
                                    </span>
                                </div>
                                <!--已结束待开奖-->
                                <div class="main-finished">
                                    <p>
                                        Time Up!
                                    </p>
                                    <span>
                                        Finished  2018.4.23 23:23
                                    </span>
                                </div>
                                <!--过期-->
                                <div class="main-expired">
                                    <span>
                                        Expired
                                    </span>
                                    <p>
                                        Your bet has been refunded
                                    </p>
                                    <p>
                                        0.0002ETH
                                    </p>
                                </div>
                            </div>
                            <div class="main-right">
                                <div class="item-issue">
                                    NO.180327018
                                </div>
                                <div class="item-process">
                                    Draw Process 100 / 120
                                </div>
                                <div class="item-price">
                                    Ticket Price  0.00001 BTC
                                </div>
                            </div>
                        </div>

                        <a href="javascript:;" class="btn btn-normal">
                            Pay Now
                        </a>
                        <div class="btn btn-win">
                            <p>
                                gm**@gmail.com
                            </p>
                            <a href="javascript:;">
                                Detail >>
                            </a>
                        </div>
                        <div class="btn btn-fail">
                            <p>
                                gm**@gmail.com
                            </p>
                            <a href="javascript:;">
                                Detail >>
                            </a>
                        </div>
                        <div class="btn btn-finished">
                            Winner is coming 1'23”
                        </div>
                        <div class="btn btn-expired">
                            The bid was expired, system will ，refund to the participators later.
                        </div>
                        <!--这里逻辑跟首页一样-->
                        <!--show-->
                        <div class="bet- bet-success ">
                            <a href="javascript:;" class="bet-close"></a>
                            <div class="bet-icon"></div>
                            <p class="bet-t">
                                Bet Success
                            </p>
                            <p class="bet-m">
                                You get five numbers obtained bonus 5ETH. The more bets, the higher the probability of winning, I wish you good luck~  You get five numbers obtained bonus 5ETH. The more bets, the higher the probability of winning, I wish you good luck~  You get five numbers obtained bonus 5ETH. The more bets, the higher the probability of winning, I wish you good luck~  You get five numbers obtained bonus 5ETH. The more bets, the higher the probability of winning, I wish you good luck~  You get five numbers obtained bonus 5ETH. The more bets, the higher the probability of winning, I wish you good luck~
                            </p>
                            <div class="btn-box">
                                <router-link :to="{path: '/luckycoin/moreBids'}" class="bet-btnV">
                                    <lang>View Number</lang>
                                </router-link>
                                <a href="javascript:;" class="bet-btnB">
                                    <lang>Bet More</lang>
                                </a>
                            </div>
                        </div>
                        <div class="bet- bet-fail " >
                            <a href="javascript:;" class="bet-close" ></a>
                            <div class="bet-icon"></div>
                            <p class="bet-t">
                                Bet failure
                            </p>
                            <p class="bet-m">
                                Temporarily unavailable due to network reasons
                            </p>
                            <a href="javascript:;" class="btn-fail" >
                                <lang>Try Again Later</lang>
                            </a>
                        </div>
                        <div class="bet- bet-balance">
                            <a href="javascript:;" class="bet-close" ></a>
                            <div class="bet-icon"></div>
                            <p class="bet-t">
                                Insufficient Balance
                            </p>
                            <p class="bet-m">
                                Your balance can be purchased for 0.03ETH. If you need to bet more, please top up first.
                            </p>
                            <a href="javascript:;" class="btn-balance">
                                Deposit
                            </a>
                        </div>
                    </div>
                </div>
                <div class="tips">
                    Play Tips: Each betting 0.01ETH, you can get a number. The more bets you have, the more numbers you have and the higher the probability of winning.
                    <br>
                    <br>
                    When the lottery is drawn, a lucky number is drawn through the blockchain, and the lucky number winner receives the full bonus.
                </div>
            </div>
            <div class="main-detailed">
                <el-tabs v-model="activeName" >
                    <el-tab-pane label="ALL BETS" name="all">

                    </el-tab-pane>
                    <el-tab-pane label="MY BETS" name="my">

                    </el-tab-pane>
                </el-tabs>
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    :default-sort = "{prop: 'date', order: 'descending'}"
                >
                    <el-table-column
                        prop="time"
                        label="Bet Time"
                        sortable
                        width="137"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="id"
                        label="User ID"
                        width="440"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="amount"
                        label="Amount"
                    >
                        <template slot-scope="scope">
                            <div class="icon-amount " :class="[scope.row.type=='eth'?'eth':'btc']">
                                {{scope.row.amount}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="number"
                        label="Number of Number"
                        width="130"
                    >
                         <template slot-scope="scope">
                             <a href="javascript:;" class="allnum" @click="alert">
                                {{scope.row.number}}
                             </a>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    :page-size="10"
                   layout="prev, pager, next"
                   :next-text="_('Next >')"
                   :prev-text="_('< Front')"
                    :total="50"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import BreadCrumbs from '~/components/BreadCrumbs.vue'
    export default {
        data () {
            return {
                activeName: 'all',
                tableData: [{
                    time: '06-23 23:23:23',
                    id: '王小虎',
                    amount: '0.0045',
                    number: 20,
                    type: 'eth'
                }, {
                    time: '06-22 23:23:23',
                    id: '王小虎',
                    amount: '45',
                    number: 1,
                    type: 'btc'
                }, {
                    time: '06-21 23:23:23',
                    id: '王小虎',
                    amount: '0.45',
                    number: 1,
                    type: 'eth'
                }, {
                    time: '06-02 23:23:23',
                    id: '王小虎',
                    amount: '0.0045',
                    number: 1,
                    type: 'eth'
                }, {
                    time: '06-23 23:23:23',
                    id: '王小虎',
                    amount: '0.0045',
                    number: 20,
                    type: 'eth'
                }, {
                    time: '06-22 23:23:23',
                    id: '王小虎',
                    amount: '45',
                    number: 1,
                    type: 'btc'
                }, {
                    time: '06-21 23:23:23',
                    id: '王小虎',
                    amount: '0.45',
                    number: 1,
                    type: 'eth'
                }, {
                    time: '06-02 23:23:23',
                    id: '王小虎',
                    amount: '0.0045',
                    number: 1,
                    type: 'eth'
                }],
                pageno: 1,
                pageSize: 8,
                PageTotal: 10,
            }
        },
        watch: {},
        methods: {
            alert () {
                alert('详细信息')
            }
        },
        computed: {},
        components: {
            BreadCrumbs
        },
        mounted () {

        }
    }
</script>
<style lang="less" type="text/less">
    .luckyCoinDetailed{
        .el-tabs{
            margin-top: 40px;
        }
        .el-tabs__nav-wrap{
            &::after{
                background: #341f40;
            }
        }
        .el-tabs__item{
            color: #6a88cc;
            &.is-active{
                color: #fff;
            }
        }
        .el-tabs__active-bar{
            background: #fff;
        }
        .el-table{
            background: transparent;
            thead{
                tr{
                    height: 50px;
                    line-height: 50px;
                }
                th{
                    color: #fff;
                    &.el-table_1_column_3{
                        display: block;
                        width: 98px;
                    }
                }
            }
            tbody{
                tr:hover{
                    background: #311c3d;
                }
                td{
                    color: #fff;
                }
                .allnum{
                    display: block;
                    &:hover{
                        color: #fff;
                    }
                }
                .icon-amount{
                    position: relative;
                    padding-right: 26px;
                    margin-right: 195px;
                    text-align: right;
                    &::after{
                        content: '';
                        display: block;
                        position: absolute;
                        right: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 16px;
                        height: 16px;
                    }
                    &.eth{
                        &::after{
                            background: url("../../assets/img/luckyCoin/icon-eth-sm.png") no-repeat center;
                        }
                    }
                    &.btc{
                        &::after{
                            background: url("../../assets/img/luckyCoin/icon-btc-sm.png") no-repeat center;
                        }
                    }
                }
            }
            tr{
                border-color: #311c3d;
            }
            .caret-wrapper{
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                height: 34px;
                width: 24px;
                vertical-align: middle;
                cursor: pointer;
                overflow: initial;
                position: relative;
            }
            .sort-caret{
                width: 0;
                height: 0;
                border: 5px solid transparent;
                position: absolute;
                left: 7px;
                &.ascending{
                    border-bottom-color: #c0c4cc;
                    top: 5px;
                }
                &.descending{
                    border-top-color: #c0c4cc;
                    bottom: 7px;
                }
            }
            .ascending{
                .sort-caret{
                    &.ascending{
                        border-bottom-color: #6a88cc;
                    }
                }
            }
            .descending{
                .sort-caret{
                    &.descending{
                        border-top-color: #6a88cc;
                    }
                }
            }
        }
    }
</style>
<style scope lang="less" type="text/less">
    @import "../../styles/lib-mixins.less";
    .luckyCoinDetailed *{
        box-sizing: border-box;
    }
    .main-detailed{
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        &.flex{
            display: flex;
        }
    }
    .item{
        position: relative;
        display: flex;
        flex: 1;
        color: #fff;
        transition: all 0.2s;
        overflow: hidden;
        .item-left{
            position: relative;
            width: 196px;
            height: 301px;
            overflow: hidden;
            .match-img{
                width: 110px;
                height: 110px;
                position: absolute;
                left: 50%;
                top: 0;
                transform: translate(-50%,38px);
            }
        }
        .item-right{
            flex: 1;
            padding: 21px 40px 0;
            position: relative;
            background: #401f56;
            transition: all 0.2s;
            .icon-box{
                position: absolute;
                top: 3px;
                right: 1px;
                i{
                    display: none;
                    border-radius: 2px;
                    float: right;
                    margin-right: 3px;
                    font-weight: bold;
                    font-size: 14px;
                    color: #fff;
                    line-height: 18px;
                }
                .icon-hot{
                    background: #f65555;
                    padding: 0 4px;
                }
                .icon-youbet{
                    background: #7b4de4;
                    padding: 0 20px;
                }
                &.hot{
                    .icon-hot{
                        display: block;
                    }
                }
                &.bet{
                    .icon-youbet{
                        display: block;
                    }
                }
            }
            .item-prize{
                height: 71px;
                line-height: 71px;
                font-size: 70px;
                font-weight: bold;
                i{
                    font-size: 40px;
                }
            }
            .item-usd{
                height: 21px;
                line-height: 21px;
                font-size: 20px;
                font-weight: bold;
            }
        }
        .item-main{
            display: flex;
            margin-top: 14px;
            .main-left{
                position: relative;
                width: 330px;
                overflow: hidden;
                >div{
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0;
                    transform: translateY(200%);
                    transition: all 0.2s;
                }
            }
            .main-normal{
                p{
                    line-height: 28px;
                    font-size: 16px;
                }
                .input-box{
                    position: relative;
                    width: 295px;
                    height: 48px;
                    overflow: hidden;
                    line-height: 46px;
                    border: 1px solid #a99acc;
                    border-radius: 6px;
                    font-size: 20px;
                    display: flex;
                    input{
                        width: percentage(130/295);
                        outline: none;
                        border: none;
                        background: transparent;
                        text-indent: 50px;
                    }
                    a{
                        flex: 1;
                        display: block;
                        width: percentage(53/260);
                        text-align: center;
                        border-left: 1px solid #a99acc;
                        color: #fff;
                        font-size: 16px;
                        background: #4b2688;
                        &:hover{
                            background: #7b4de4;
                        }
                    }
                }
            }
            .main-win,.main-fail{
                p{
                    line-height: 34px;
                    font-size: 28px;
                    font-weight: bold;
                }
                span{
                    line-height: 20px;
                    font-size: 16px;
                }
            }
            .main-finished{
                p{
                    line-height: 27px;
                    font-size: 20px;
                    font-weight: bold;
                }
                span{
                    line-height: 25px;
                    font-size: 16px;
                }
            }
            .main-expired{
                span{
                    line-height: 27px;
                    font-size: 20px;
                    font-weight: bold;
                }
                p{
                    line-height: 30px;
                    font-size: 20px;
                    font-weight: bold;
                    color: #3fc06f;
                }
            }
            .main-right{
                padding-bottom: 20px;
                line-height: 26px;
                font-size: 16px;
            }
        }
        .btn{
            position: absolute;
            display: block;
            width: 100%;
            height: 50px;
            overflow: hidden;
            text-align: center;
            line-height: 50px;
            color: #fff;
            font-weight: bold;
            transition: all 0.2s;
            opacity: 0;
            transform: translateY(200%);
            .text-overflow();
            &.btn-normal{
                width: 90%;
                left: 5%;
                bottom: 24px;
                background: #f67c22;
                border-radius: 6px;
                font-size: 24px;
                &:hover{
                    filter: brightness(1.3);
                }
            }
            &.btn-win{
                left: 0;
                bottom: 0;
                background: #3fc06f;
                padding: 0 30px;
                p{
                    position: relative;
                    float: left;
                    width: 60%;
                    padding-left: 54px;
                    text-align: left;
                    font-size: 20px;
                    font-weight: bold;
                    .text-overflow();
                    &::before{
                        content: '';
                        display: block;
                        position: absolute;
                        top: 15px;
                        left: 10px;
                        width: 28px;
                        height: 25px;
                        overflow: hidden;
                        background: url("../../assets/img/luckyCoin/icon-champion-win.png") no-repeat center
                    }
                }
                a{
                    display: block;
                    float: right;
                    font-size: 20px;
                    font-weight: bold;
                    color: #fff;
                    .transition();
                    &:hover{
                        color: #f67c22;
                    }
                }
            }
            &.btn-fail{
                left: 0;
                bottom: 0;
                background: #facb2f;
                padding: 0 30px;
                p{
                    position: relative;
                    float: left;
                    width: 60%;
                    padding-left: 54px;
                    text-align: left;
                    font-size: 20px;
                    font-weight: bold;
                    color: #755c35;
                    .text-overflow();
                    &::before{
                        content: '';
                        display: block;
                        position: absolute;
                        top: 15px;
                        left: 10px;
                        width: 28px;
                        height: 25px;
                        overflow: hidden;
                        background: url("../../assets/img/luckyCoin/icon-champion.png") no-repeat center
                    }
                }
                a{
                    display: block;
                    float: right;
                    font-size: 20px;
                    font-weight: bold;
                    color: #755c35;
                    .transition();
                    &:hover{
                        color: #f67c22;
                    }
                }
            }
            &.btn-finished{
                width: 90%;
                left: 5%;
                bottom: 24px;
                background: #4c2872;
                border-radius: 6px;
                font-weight: normal;
                font-size: 20px;
                color: #b5abc1;
                &:hover{
                    filter: brightness(1.3);
                }
            }
            &.btn-expired{
                width: 90%;
                left: 5%;
                bottom: 10px;
                text-align: left;
                font-weight: normal;
                font-size: 16px;
                color: #a999cb;
                &:hover{
                    filter: brightness(1.3);
                }
            }
        }
        &.btc{
            .item-left{
                background: url("../../assets/img/luckyCoin/bg-btc.png") no-repeat center;
            }
            .match-img{
                background: url("../../assets/img/luckyCoin/icon-btc.png") no-repeat center;
            }
            .main-normal{
                .input-box {
                    &::before {
                        content: '';
                        display: block;
                        position: absolute;
                        left: 11px;
                        top: 15px;
                        width: 16px;
                        height: 16px;
                        background: url("../../assets/img/luckyCoin/icon-btc-sm.png") no-repeat center;
                        background-size: cover;
                    }
                }
            }
        }
        &.eth{
            .item-left{
                background: url("../../assets/img/luckyCoin/bg-eth.png") no-repeat center;
            }
            .match-img{
                background: url("../../assets/img/luckyCoin/icon-eth.png") no-repeat center;
            }
            .main-normal{
                .input-box{
                    &::before{
                        content: '';
                        display: block;
                        position: absolute;
                        left: 11px;
                        top: 15px;
                        width: 16px;
                        height: 16px;
                        background: url("../../assets/img/luckyCoin/icon-eth-sm.png") no-repeat center;
                        background-size: cover;
                    }
                }
            }
        }
        &.normal{
            .item-right{
                background: #532998;
            }
            .item-main{
                .main-left{
                    .main-normal{
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            }
            .btn-normal{
                opacity: 1;
                transform: translateY(0);
            }
        }
        &.win{
            .item-right{
                background: url("../../assets/img/luckyCoin/bg-success.png") no-repeat right bottom, linear-gradient(to right,#7c6238,#4e3c27);
            }
            .item-main{
                .main-left{
                    .main-win{
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            }
            .btn-win{
                opacity: 1;
                transform: translateY(0);
            }
            &::after{
                content: '';
                display: block;
                position: absolute;
                right: 178px;
                bottom: 2px;
                width: 91px;
                height: 91px;
                background: url("../../assets/img/luckyCoin/icon-win.png") no-repeat center;
                background-size: cover;
            }
        }
        &.fail{
            .item-right{
                background: url("../../assets/img/luckyCoin/bg-success.png") no-repeat right bottom, linear-gradient(to right,#7c6238,#4e3c27);
            }
            .item-main{
                .main-left{
                    .main-fail{
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            }
            .btn-fail{
                opacity: 1;
                transform: translateY(0);
            }
        }
        &.finished{
            .item-main{
                .main-right{
                    color: #a999cb;
                }
                .main-left{
                    .main-finished{
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            }
            .btn-finished{
                opacity: 1;
                transform: translateY(0);
            }
        }
        &.expired{
            .item-main{
                .main-left{
                    .main-expired{
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            }
            .btn-expired{
                opacity: 1;
                transform: translateY(0);
            }
        }
        .bet-success{
            padding: 40px percentage(30/600) 0;
            .bet-icon{
                width: 60px;
                height: 60px;
            }
            .bet-t{
                line-height: 45px;
                font-size: 28px;
            }
            .bet-m{
                max-height: 60px;
                line-height: 20px;
                font-size: 16px;
            }
            .btn-box{
                width: 90%;
                height: 44px;
                left: 5%;
                bottom: 37px;
                a{
                    height: 100%;
                    line-height: 44px;
                    font-size: 20px;
                }
            }
        }
        .bet-fail{
            padding: 40px percentage(30/600) 0;
            .bet-icon{
                width: 60px;
                height: 60px;
            }
            .bet-t{
                line-height: 45px;
                font-size: 28px;
            }
            .bet-m{
                text-align: center;
                max-height: 60px;
                line-height: 20px;
                font-size: 16px;
            }
            .btn-fail{
                line-height: 43px;
                font-size: 20px;
            }
        }
        .bet-balance{
            padding: 40px percentage(30/600) 0;
            .bet-icon{
                width: 63px;
                height: 60px;
            }
            .bet-t{
                line-height: 45px;
                font-size: 28px;
            }
            .bet-m{
                text-align: center;
                max-height: 60px;
                line-height: 20px;
                font-size: 16px;
            }
            .btn-balance{
                line-height: 43px;
                font-size: 20px;
            }
        }
    }
    .tips{
        width: 204-30px;
        margin-left: 30px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
    }

</style>
