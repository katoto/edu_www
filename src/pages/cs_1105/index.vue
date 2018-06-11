<template>
    <div class="" v-model="scroll">
        <Header></Header>
        <HeaderNav></HeaderNav>
        <div class="main">
            <!--玩法区-->
            <div class="play-area" id="play-area">
                <ul class="play-area-items">
                    <li class="js_playArea-li">
                        <div class="play-area-top">
                            <div id="play-type-choose" class="play-type-choose">
                                <span>Pick 5</span>
                                <ul>
                                    <li>Pick 1</li>
                                    <li>Pick 2</li>
                                    <li>Pick 3</li>
                                    <li>Pick 4</li>
                                    <li>Pick 5</li>
                                    <li class="es hide">
                                        <p>Pick 5</p>
                                        <p>(JACKPOT)</p>
                                    </li>
                                </ul>
                            </div>
                            <p class="play-tips">
                                <span class="js_choose_desc">Pick 5 numbers, if all the numbers hit the draw numbers, you'll win 378 times reward</span>
                                <a href="javascript:;" class="js_showReward"> Reward table</a>
                            </p>
                            <a href="javascript:;" class="limit-tips js_limit-tips">Limit number list</a>
                        </div>
                        <span class="line js_line">Ticket1</span>
                        <!--<ul class="number-box js_isReady" data-luckyNum="1|3|4|6|8">-->
                        <ul class="number-box js_number-box-11">
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>5</li>
                            <li>6</li>
                            <li>7</li>
                            <li>8</li>
                            <li>9</li>
                            <li>10</li>
                            <li>11</li>
                        </ul>
                        <a href="javascript:;" class="btn-random-pick">Quick Pick</a>
                        <a href="javascript:;" class="btn-delete"></a>
                        <a href="javascript:;" class="btn-close hide"></a>
                        <div class="beting">
                            <span>Bet</span>
                            <div class="btn-beting">
                                <input type="text" name="bet1" class="js_betMoney" value="0.0001" placeholder="0.0001">
                                <a href="javascript:;" class="btn-beting-add js_beting-add">add</a>
                                <a href="javascript:;" class="btn-beting-low js_beting-low">low</a>
                            </div>
                            <span>ETH</span>
                            <div class="winning">
                                Return&nbsp<i class="winMoney">0.0378&nbspETH</i>
                            </div>
                        </div>
                        <div class="order-box hide js_choose_jackPot">
                            <p>Picking Order</p>
                            <ul class="num-box js_num-box-5">
                                <!--flipInY on-->
                                <li>-</li>
                                <li>-</li>
                                <li>-</li>
                                <li>-</li>
                                <li>-</li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <!-- Lucky 11 show  647 356 奖级表 -->
                <div class="pop pop-rewardTable js_pop_rewardTable hide">
                    <div class="pop-main">
                        <h3>LUCKY 11</h3>
                        <div class="pay-items">
                            <table>
                                <thead>
                                <tr>
                                    <td width="90px">Type</td>
                                    <td>Conditions</td>
                                    <td width="90px">Reward ratio</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="hide">
                                    <td>
                                        C5<br>
                                        <i>( jackpot )</i>
                                    </td>
                                    <td>
                                        Pick 5 number according to the order number order exactly<br>
                                        jackpot = 5 × (pool amount × wagering amount)
                                    </td>
                                    <td><i class="bold">jackpot</i></td>
                                </tr>
                                <tr>
                                    <td>C5</td>
                                    <td>Pick 5 numbers and hit 5/5 draw numbers</td>

                                    <td><i class="bold">378</i></td>
                                </tr>
                                <tr>
                                    <td>C4</td>
                                    <td>Pick 4 numbers and hit 4/5 draw numbers</td>

                                    <td><i class="bold">54</i></td>
                                </tr>
                                <tr>
                                    <td>C3</td>
                                    <td>Pick 3 numbers and hit 3/5 draw numbers</td>

                                    <td><i class="bold">13.5</i></td>
                                </tr>
                                <tr>
                                    <td>C2</td>
                                    <td>Pick 2 numbers and hit 2/5 draw numbers</td>

                                    <td><i class="bold">4.5</i></td>
                                </tr>
                                <tr>
                                    <td>C1</td>
                                    <td>Pick 1 number and hit 1/5 draw numbers</td>

                                    <td><i class="bold">1.8</i></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="btn-area">
                    <span class="fee-count hide">
                        Fee&nbsp&nbsp<i><span class="js_gasNumber">0</span>ETH</i>
                    </span>
                    <a href="javascript:;" class="addmore">Add Ticket</a>
                </div>
                <div class="btn-play-now">
                    <a href="javascript:;">
                        Play Now
                    </a>
                    <span>Total Pay</span>
                    <p id="total-pay" class="total-pay "></p>
                </div>
                <div id="stars1" class="stars"></div>
                <div id="stars2" class="stars"></div>
            </div>
            <!--  往期开奖  -->
            <div class="pre-numberBox">
                <div class="pre-number tab js_tab">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="Recent Bets" name="Bets">
                            <div class="prenum-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Transaction Time</th>
                                            <th>User ID</th>
                                            <th>No.</th>
                                            <th>Type</th>
                                            <th>Bet Number</th>
                                            <th>Bet Amount</th>
                                            <th>Prize Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tabody-betlist" class="tabody-betlist newRecord">

                                    </tbody>
                                </table>
                            </div>
                            <p class="recode20">Last 20 records</p>
                        </el-tab-pane>
                        <el-tab-pane label="Recent Wins" name="Wins">
                            <div class="winner-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>User ID</th>
                                            <th>No.</th>
                                            <th>Type</th>
                                            <th>Bet Number</th>
                                            <th>Bet Amount</th>
                                            <th>Prize Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <!--jackpot-->
                                        <tr class="hide">
                                        <td>1803281404</td>
                                        <td>1803281404</td>
                                        <td>C5</td>
                                        <td>
                                            <ul class="num-box">
                                                <li>3</li>
                                                <li>5</li>
                                                <li>6</li>
                                                <li>9</li>
                                                <li>11</li>
                                            </ul>
                                        </td>
                                        <td><span>0.01</span>ETH</td>
                                        <td>
                                        <span class="win">
                                            <span>21.5</span> ETH
                                        </span>
                                        </td>
                                    </tr>
                                        <tr v-for="data in DataWinnerList">
                                            <td>
                                                {{data.uid}}
                                            </td>
                                            <td>
                                                {{data.expectid}}
                                            </td>
                                            <td>
                                                {{data.bettype}}
                                            </td>
                                            <td v-html="data.opencode">
                                            </td>
                                            <td>
                                                {{data.betmoney}}
                                            </td>
                                            <td>
                                                {{data.betprize}}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p class="recode20">Last 20 records</p>
                        </el-tab-pane>
                        <el-tab-pane label="How to Play" name="Play">
                            <ul class="introduct">
                                <li>
                                    <span>What is Lucky 11?</span>
                                    <p class="circle">
                                        Lucky 11 is a decentralized lottery product based on distributed ledger technology. Each draw is provably random and cryptographically secure thanks to the nature of the Ethereum blockchain.
                                    </p>
                                    <p class="circle">Blockchain-based data are featured with its unchangeableness and recognized by the whole network ,

                                        which means it can completely avoid black box operations.
                                        Thus, issues like information asymmetry or non-transparency could be addressed to give players a game platform with maximum fairness they have never enjoyed before.</p>
                                    <p class="circle">
                                        Players could randomly pick 1 to 5 numbers from 1 to 11 and submit it to the Ethereum blockchain.
                                    </p>
                                    <p class="circle">
                                        One draw per minute. The result is determined by the last hash value uploaded in the minute.
                                    </p>
                                    <p class="circle">
                                        If the chosen numbers match the draw result, the player wins the reward (virtual currency) stipulated in smart contract.
                                    </p>
                                </li>
                                <li>
                                    <span>How to play the game?</span>
                                    <p>Players will pick 1-5 numbers from 1 to 11. Players win the reward when the chosen numbers are in line with that of the draw result:</p>
                                    <p class="circle">Pick 1 number, players have 5/11 of the win probability with 1.8 times return.</p>
                                    <p class="circle">Pick 2 numbers, players have 1/5.5 of the win probability with 4.5 times return.</p>
                                    <p class="circle">Pick 3 numbers, players have 1/16.5 of the win probability with 13.5 times return.</p>
                                    <p class="circle">Pick 4 numbers, players have 1/66 of the win probability with 54 times return.</p>
                                    <p class="circle">Pick 5 numbers, players have 1/462 of the win probability with 378 times return.</p>
                                    <p class="circle hide"> On the basis of the traditional choose five, users can choose
                                        additional
                                        "jackpot" game: choose five number and order, if the order of the selected five
                                        number
                                        consistent with the current of the lottery five number order, get jackpot reward,
                                        reward:<br/> award pool's formula = 50 * (jackpot amount bet amount)</p>
                                </li>
                                <li>
                                    <span>How to win the game?</span>
                                    <p>After closing the bet, all the betting information will be calculated through the Merkle Tree to get the Merkle number.
                                        And the Merkle number will be uploaded to the Ethereum, then get the hash value of this transaction’s block.
                                        The last 25 digits of the value will be divided into 5 groups. Each group has 5 numbers, and it will be converted into a decimal number.
                                        The first group numbers will be processed through (x mod11 + 1) calculation. Then retrieving its current value as the first lottery number.
                                        The second group numbers will be processed through (x mod10+1) calculation, and by using same method,
                                        the second lottery number can be drew, and the rest can be done in the same manner. Finally, the five numbers calculated through this method will be draw result.</p>
                                </li>
                                <li>
                                    <span>How to ensure fairness?</span>
                                    <p class="circle">
                                        Unchangeable betting information<br>
                                        The draw result is based on hash value which was calculated from Merkle number.
                                        Since Merkle number has already uploaded to the Ethereum chain, the information cannot be modified.
                                    </p>
                                    <p class="circle">
                                        Fair draw<br>
                                        The draw numbers are selected from hash value, due to its unpredictability and unchangeableness, the fair draw can be assured.
                                    </p>
                                    <p class="circle">
                                        Fair reward<br>
                                        Both draw and reward distribution are based on Ethereum chain. Thus, there is no chance for the platform to interfere. All information and process is transparent and fair.
                                    </p>
                                    <p class="circle">No robot<br>
                                        Since all process is transparent and unchangeable, the platform cannot use any robot to do black box operations. The game is utterly fair.
                                    </p>
                                </li>
                            </ul>
                        </el-tab-pane>
                    </el-tabs>

                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '~components/Header.vue'
    import HeaderNav from '~components/HeaderNav.vue'
    import Footer from '~components/Footer.vue'
    import {mTypes, aTypes} from '~/store/cs_page/cs_1105'
    import {src, platform, tipsTime, ethUrl,format_match, format_match_account, formateBalance} from '~common/util'
    export default {
        data () {
            return {
                scroll: '',
                activeName:'Wins',
                DataWinnerList:[
//                    {uid:1,expectid:2,bettype:'C1',opencode:'5',betmoney:'0.00010ETH',betprize:'0.00018 ETH'},
                ]
            }
        },
        watch: {

        },
        methods: {
            fixNav () {
                this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
                if (this.scroll >= 90) {
                        this.$store.commit(mTypes.setNavFix, true)
                    } else {
                        this.$store.commit(mTypes.setNavFix, false)
                    }
                },
            format_num(str){
                let str1 = str.replace(/,/g,'');
                let str2 = "<ul class='num-box'>";
                for (var i = 0; i < str1.length; i++) {
                    str2 += `<li class="bingo">${str1[i]}</li>`;
                }
                return str2;
            },
            format_recentWins(msg){
                msg.forEach((item,index)=>{
                    item.bettype = format_match(item.bettype)
                    item.opencode = this.format_num(item.opencode)
                    item.betmoney = (item.betmoney-0).toFixed(5)+'ETH'
                })
                return msg;
            }
        },

        components: {
            Footer,
            Header,
            HeaderNav
        },
        async mounted () {
            window.addEventListener('scroll', this.fixNav);
            let dataRecentWinsList = await this.$store.dispatch(aTypes.getRecentWinsList);
            console.log(dataRecentWinsList);

            this.DataWinnerList = this.format_recentWins(dataRecentWinsList);
        },
        destroyed () {
            window.removeEventListener('scroll', this.fixNav)
        }
    }
</script>
<style lang="less">
    @import "../../styles/lib-mixins.less";
    //index
    .main{
        position: relative;
        width:100%;
        overflow: hidden;
    }
    //玩法区
    .play-area{
        position: relative;
        padding-bottom:40px;
        color: #778ca3;
        background: #5068bc;
        background: linear-gradient(to right, #4b6584, #655aae, #545f94);
        .play-area-top{
            position: relative;
            height:35px;
            line-height:35px;
            margin-bottom:23px;
        }
        .play-type-choose{
            position: absolute;
            left:10px;
            top:0;
            width:115px;
            overflow: hidden;
            font-size:14px;
            color: #6a89cc;
            cursor: pointer;
            border-bottom-left-radius:6px;
            border-bottom-right-radius:6px;
            text-indent: 20px;
            border:1px solid #ced6e0;
            &:hover{
                border-color: #778ca3;
            }
            &::after{
                content: '';
                position: absolute;
                right:17px;
                top:14px;
                display: block;
                background-image: url("../../assets/slice/arrow-down-778ca3.png");
                width: 13px;
                height: 8px;
            }
            span{
                display: block;
                height:35px;
                line-height:35px;
            }
            span.jack{
                box-sizing: border-box;
                text-indent: 0;
                line-height: 16px;
                padding: 10px 0 7px 20px;
                height: auto;
            }
            ul{
                //设置为displaynone的话第一次不会有动画
                display: none;
                position: relative;
                width:100%;
                background: #fff;
                z-index:9;
                li{
                    padding:7px 0;
                    line-height:16px;
                    color: #6a89cc;
                    border-top:1px solid #778ca3;
                }
                li.on,li:hover{
                    background: #eef1f9;
                    color: #263648;
                }
            }
        }
        .play-tips{
            float: left;
            margin-left:170px;
            font-size:12px;
            a{
                margin-left:10px;
                &.on{
                    color: #263648;
                }
            }
        }
        .limit-tips{
            margin-right:100px;
            float: right;
            font-size:12px;
            text-transform: capitalize;
        }
        .play-area-items{
            position: relative;
            z-index:2;
            width:1190px;
            padding-top:40px;
            margin: 0 auto;
            >li{
                position: relative;
                height:200px;
                //padding:22px 0 26px 50px;
                background: #fff;
                border-radius: 6px;
                .transition();
                &:hover{
                    -webkit-box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                }
            }
            >li:not(:first-child){
                &:hover{
                    .btn-close{
                        visibility: visible;
                    }
                }
            }
            >li+li{
                margin-top:20px;
            }
            .line{
                float: left;
                width:150px;
                line-height:58px;
                text-indent: 92px;
                font-size:14px;
                color: #778ca3;
            }
            .number-box{
                overflow: hidden;
                float: left;
                margin-bottom:26px;
                li{
                    cursor: pointer;
                    float: left;
                    width:58px;
                    height:58px;
                    overflow: hidden;
                    border-radius:50%;
                    text-align: center;
                    line-height:58px;
                    background: #eef1f9;
                    font-size:28px;
                    font-weight:bold;
                    color: #6a89cc;
                    .transition();
                    &:hover{
                        color: #f69543;
                    }
                }
                li.on{
                    color: #fff;
                    background: #f69543;
                }
                li+li{
                    margin-left:10px;
                }
            }
            .btn-random-pick{
                position: absolute;
                top:70px;
                right:140px;
                display: block;
                width:100px;
                height:30px;
                overflow: hidden;
                text-align: center;
                line-height:30px;
                background: #eef1f9;
                color: #778ca3;
                border-radius:6px;
                .transition();
                &:hover{
                    background: #dfe4f2;
                    color: #263648;
                }
            }
            .btn-delete{
                position: absolute;
                top:70px;
                right:100px;
                width:30px;
                height:30px;
                background: #eef1f9;
                border-radius:6px;
                &::after{
                    content: '';
                    display: block;
                    margin:6px auto;
                    background-image: url("../../assets/slice/delete.png");
                    width: 18px;
                    height: 18px;
                }
                &:hover{
                    background: #dfe4f2;
                    &::after{
                        content: '';
                        display: block;
                        margin:6px auto;
                        background-image: url("../../assets/slice/delete2.png");
                        width: 18px;
                        height: 18px;
                    }
                }
            }
            .beting{
                //.flex-display();
                //justify-content: center;
                float: left;
                margin:0 0 0 288px;
                //738 跟上方11个num区域同宽，需要对齐居中
                width:738px;
                height:38px;
                line-height:38px;
                >*{
                    display: inline-block;
                    *display: inline;
                    zoom: 1;
                    vertical-align: top;
                }
            }
            .btn-close{
                visibility: hidden;
                position: absolute;
                top:11px;
                right:23px;
            }
            .btn-beting{
                position: relative;
                width:160px;
                height:36px;
                margin:0 10px 0 7px;
                overflow: hidden;
                border-radius:6px;
                line-height:36px;
                border:1px solid #d5d5d5;
                font-size:16px;
                .transition();
                input{
                    float: left;
                    width:114px;
                    height:36px;
                    overflow: hidden;
                    line-height:36px;
                    text-align: center;
                    border:none;
                    outline:none;
                    font-size:20px;
                }
                input::-webkit-input-placeholder{
                    color: #6a89cc;
                }
                input::-moz-placeholder{   /* Mozilla Firefox 19+ */
                    color: #6a89cc;
                }
                input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                    color: #6a89cc;
                }
                input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
                    color: #6a89cc;
                }
                .btn-beting-add,.btn-beting-low{
                    position: absolute;
                    top:0;
                    right:0;
                    width:45px;
                    height:50%;
                    overflow: hidden;
                    line-height:18px;
                    text-align: center;
                    border-left:1px solid #d5d5d5;
                    box-sizing: border-box;
                    font-size:0;
                    text-indent: -99999px;
                    .transition();
                    &:hover{
                        background: #eef1f9;
                    }
                }
                .btn-beting-add{
                    &::after{
                        .transition();
                        content: '';
                        display: block;
                        position: absolute;
                        left:50%;
                        top:50%;
                        margin-top:-4px;
                        margin-left:-6px;
                        background-image: url(../../assets/slice/arrow-top.png);
                        width: 13px;
                        height: 8px;
                    }
                }
                .btn-beting-low{
                    &::after{
                        .transition();
                        content: '';
                        display: block;
                        position: absolute;
                        left:50%;
                        top:50%;
                        margin-top:-4px;
                        margin-left:-6px;
                        background-image: url(../../assets/slice/arrow-down.png);
                        width: 13px;
                        height: 8px;
                    }
                    top:18px;
                    border-top:1px solid #d5d5d5;
                }
                &:hover{
                    border-color: #778ca3;
                    *{
                        border-color: #6a89cc;
                    }
                }
            }
            .winning{
                font-size:14px;
                margin-left:20px;
                color: #778ca3;
                .winMoney{
                    color: #f69543;
                }
            }
        }
        .btn-area{
            position: relative;
            z-index:2;
            width:1190px;
            margin:0 auto 0;
            height:50px;
            line-height:50px;
            text-align: center;
            color: #fff;
            .addmore{
                display: block;
                position: absolute;
                top:10px;
                right:3px;
                width:98px;
                height:28px;
                overflow: hidden;
                border:1px solid #907eef;
                text-align: center;
                line-height:28px;
                color: #fff;
                border-radius:6px;
                .transition();
                &:hover{
                    border-color: #eef1f9;
                }
            }
        }
        .btn-play-now{
            position: relative;
            z-index:2;
            width:537px;
            height:68px;
            overflow: hidden;
            background: #fd9644;
            border-radius:6px;
            margin:0 auto;
            text-align: center;
            color: #fff;
            .transition();
            a{
                display: block;
                width:100%;
                height:100%;
                line-height:68px;
                font-size:28px;
                color: #fff;
                font-family:sans-eb;
            }
            span,p{
                position: absolute;
                right:18px;
                line-height:17px;
            }
            span{
                top:18px;
            }
            p{
                top:35px;
            }
            &:hover{
                width:537px;
                height:68px;
                background-image: url("../../assets/img/btn-bg.png");
                -webkit-animation: masked-animation 1s infinite ease;
                animation: masked-animation 1s infinite ease;
            }
            &.unable{
                background-image: none;
                a{
                    cursor: not-allowed;
                }
            }
        }
        .order-box{
            position: absolute;
            left:50px;
            bottom:27px;
            overflow: hidden;
            line-height:24px;
            p{
                float: left;
                font-size:12px;
            }
            .num-box{
                float: left;
                margin-left:10px;
                li{
                    font-weight:bold;
                }
                li.on{
                    background: #f69543;
                    color: #fff;
                }
                li+li{
                    margin-left:5px;
                }
            }
        }
    }

    @-webkit-keyframes masked-animation {
        0%  { background-position: 0 0;}
        100% { background-position: -200% 0;}
    }
    @keyframes masked-animation {
        0%  { background-position: 0 0;}
        100% { background-position: -200% 0;}
    }


    //奖级表
    .pop-rewardTable {
        position: absolute;
        left:50%;
        top:40px;
        margin-left:-335px;
        width: 671px;
        height:385px;
        overflow: visible;
        background: rgba(0, 0, 0, 0);
        border-top:40px solid transparent;
        text-transform: none;
        h3{
            margin:15px 0;
        }
        .pop-main {
            padding:20px;
            .rounded();
            -webkit-box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }
        .pay-items {
            margin-top: 10px;
        }
        thead tr {
            margin-top:10px;
            height:35px;
            line-height:35px;
            border-bottom:2px solid #f2f2f2;
            font-size:12px;
            color: #778ca3;
        }
        tbody tr {
            height:40px;
            padding:10px 0;
            line-height: 20px;
            border-bottom: 2px solid #ededed;
        }
        tbody tr:first-child {
            height:60px;
        }
    }

    //往期开奖

    .pre-numberBox{
        border-top:30px solid #eef1f9;
        position: relative;
        width:100%;
        background: #eef1f9;
        z-index:4;
    }
    .pre-number{
        position: relative;
        width:1090px;
        background: #fff;
        margin:0 auto 0;
        padding:20px 50px 0;
        .tab-head{
            position: relative;
            height:60px;
            line-height:60px;
            border-bottom: 2px solid #f5f5f5;
            >span{
                display: block;
                position: absolute;
                left:0;
                bottom:-2px;
                width:109px;
                height:2px;
                overflow: hidden;
                background: #333;
            }
            li{
                display: inline-block;
                *display: inline;
                zoom: 1;
                margin-right:77px;
            }
            li.on{
                a{
                    color: #333;
                }
            }
            a{
                display: block;
                height:100%;
                font-size:20px;
                color: #6a89cc;
                &:hover{
                    color: #333;
                }
            }
        }
        .tab-cnt{
            //为了不抖动
            min-height:321px;
            >li{
                display: none;
            }
            >li.on{
                display: block;
            }
        }
        .recode20{
            position: absolute;
            right:70px;
            bottom:30px;
            font-size:12px;
            color: #778ca3;
        }
    }
    .prenum-table{
        overflow: hidden;
        padding-bottom:63px;
        th{
            //width:12.5%;
        }
    }
    .winner-list,.prenum-table{
        padding-top:16px;
    }

    //WINNER LIST
    .winner-list{
        padding-bottom:63px;
        text-align: center;
        tr.jackpot{
            background: #fff3e1;
        }
        .icon-jackpot{
            &::after{
                margin-left:50px;
            }
        }
    }
    .winner-list,.prenum-table{
        padding-top:16px;
    }
    /*introduct*/
    .introduct{
        padding:13px 0 46px 0;
        span{
            display: block;
            line-height:46px;
            font-size:12px;
            color: #778ca3;
        }
        li+li{
            margin-top:20px;
        }
        p{
            line-height:22px;
        }
        p.circle{
            position: relative;
            padding-left:16px;
            &::before{
                content: '';
                position: absolute;
                left:0;
                top:8px;
                display: block;
                background-image: url("../../assets/slice/circle.png");
                width: 5px;
                height: 5px;
            }
        }
    }
</style>
