<template>
    <div>
        <Header></Header>
        <div class="luckyPoker">
            <div class="main">
                <div class="bg-esktop" ref="container">
                    <div class="fly-coin fly-coin-el" :style="item.style" v-for="(item, index) in coins" :key="index" @click="addCoin(item.type)">
                        <img class="fly-coin-el" src="@assets/img/luckyPoker/coin-0.0001.png" alt="" v-if="item.coinType === 0.0001">
                        <img class="fly-coin-el" src="@assets/img/luckyPoker/coin-0.001.png" alt="" v-if="item.coinType === 0.001">
                        <img class="fly-coin-el" src="@assets/img/luckyPoker/coin-0.01.png" alt="" v-if="item.coinType === 0.01">
                        <img class="fly-coin-el" src="@assets/img/luckyPoker/coin-0.1.png" alt="" v-if="item.coinType === 0.1">
                    </div>
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
                                    <i>Winning</i> 0.00002 <i>ETH</i>
                                </p>
                                <ul>
                                    <li class="bet-red" ref="coin_red" @click="addCoin('red')">
                                        <i>
                                            <img class="icon-hongt" src="@assets/img/luckyPoker/icon-hongt.png" alt="">
                                        </i>
                                        <p>RED</p>
                                        <i>
                                            <img class="icon-fk" src="@assets/img/luckyPoker/icon-fk.png" alt="">
                                        </i>
                                    </li>
                                    <li class="bet-black" @click="addCoin('black')" ref="coin_black">
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
                                <p class="poker-prize" style="padding:0 4px">
                                    <i>可中</i> 0.00002 <i>ETH</i>
                                </p>
                                <ul>
                                    <li @click="addCoin('joker')" ref="coin_joker">
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
                                    <i>Winning</i> 0.00002 <i>ETH</i>
                                </p>
                                <ul>
                                <li @click="addCoin('spade')" ref="coin_spade">
                                        <img src="@assets/img/luckyPoker/icon-heit.png" alt="">
                                    </li>
                                    <li @click="addCoin('heart')" ref="coin_heart">
                                        <img src="@assets/img/luckyPoker/icon-hongt.png" alt="">
                                    </li>
                                    <li @click="addCoin('clubs')" ref="coin_clubs">
                                        <img src="@assets/img/luckyPoker/icon-mh.png" alt="">
                                    </li>
                                    <li @click="addCoin('dianmond')" ref="coin_dianmond">
                                        <img src="@assets/img/luckyPoker/icon-fk.png" alt="">
                                    </li>
                                </ul>
                                <p class="poker-time">
                                    4 Times
                                </p>
                            </div>
                            <div class="bet-number">
                                <p class="poker-prize">
                                    <i>Winning</i> 0.00002 <i>ETH</i>
                                </p>
                                <ul class="item1">
                                    <li @click="addCoin('2')" ref="coin_2">2</li>
                                    <li @click="addCoin('3')" ref="coin_3">3</li>
                                    <li @click="addCoin('4')" ref="coin_4">4</li>
                                    <li @click="addCoin('5')" ref="coin_5">5</li>
                                    <li @click="addCoin('6')" ref="coin_6">6</li>
                                    <li @click="addCoin('7')" ref="coin_7">7</li>
                                    <li @click="addCoin('8')" ref="coin_8">8</li>
                                    <li @click="addCoin('9')" ref="coin_9">9</li>
                                    <li @click="addCoin('10')" ref="coin_10">10</li>
                                    <li @click="addCoin('J')" ref="coin_J">J</li>
                                </ul>
                                <ul class="item2">
                                    <li @click="addCoin('Q')" ref="coin_Q">Q</li>
                                    <li @click="addCoin('K')" ref="coin_K">K</li>
                                    <li @click="addCoin('A')" ref="coin_A">A</li>
                                </ul>
                                <div class="btn-cls ">
                                    <a href="javascript:;" @click="clearBet">
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
                                <li :class="{ on: currentCoin === 0.0001 }" @click="changeCoin('0.0001')" ref="0.0001">
                                    <img src="@assets/img/luckyPoker/coin-0.0001.png" alt="">
                                    <p>0.0001</p>
                                </li>
                                <li :class="{ on: currentCoin === 0.001 }" @click="changeCoin('0.001')" ref="0.001">
                                    <img src="@assets/img/luckyPoker/coin-0.001.png" alt="">
                                    <p>0.001</p>
                                </li>
                                <li :class="{ on: currentCoin === 0.01 }" @click="changeCoin('0.01')" ref="0.01">
                                    <img src="@assets/img/luckyPoker/coin-0.01.png" alt="">
                                    <p>0.01</p>
                                </li>
                                <li :class="{ on: currentCoin === 0.1 }" @click="changeCoin('0.1')" ref="0.1">
                                    <img src="@assets/img/luckyPoker/coin-0.1.png" alt="">
                                    <p>0.1</p>
                                </li>
                            </ul>
                            <!--wait/unable-->
                            <div href="javascript:;" class="btn-main " @click="bet">
                                <p>PAY</p>
                                <!--<p>Please wait</p>-->
                                <span>{{total}} <i>ETH</i></span>
                            </div>
                        </div>
                    </div>
                </div>
                <!--随机数 h5-->
                <div class="area-random">
                    <div class="random-top">
                        <p class="title">
                            Custom random number
                        </p>
                        <a href="javascript:;" class="btn-help" @click="showPopVer=true"></a>
                        <a href="javascript:;" class="btn-slideUp"></a>
                    </div>
                    <ul class="random-main ">
                        <li>
                            <p class="title">
                                Client seed
                            </p>
                            <div class="input-group">
                                <input type="text" v-model="clientSeed">
                                <a href="javascript:;" class="btn btn-random" @click="createClientSeed">
                                    RANDOMIZE
                                </a>
                                <a href="javascript:;"  class="btn btn-lock btn-unlock">
                                    LOCK
                                </a>
                            </div>
                        </li>
                        <li>
                            <p class="title">
                                The Hash of Random Number
                            </p>
                            <div class="input-group">
                                <input type="text" v-model="hashNumber">
                            </div>
                        </li>
                    </ul>
                    <!--v-else-->
                    <ul class="random-main hide">
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
                                Client seed
                            </p>
                            <div class="input-group">
                                <input type="text">
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
                                    0.00000<i> ETH</i>
                                </p>
                                <div class="bet-result icon-heit">
                                    <p>8</p>
                                </div>
                                <p class="bet-result-count">
                                    0 <i>ETH</i>
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
                                    0.00001<i> ETH</i>
                                </p>
                                <div class="bet-result icon-hongt">
                                    <p>Q</p>
                                </div>
                                <p class="bet-result-count">
                                    0.00001<i> ETH</i>
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
                                    0.00001<i> ETH</i>
                                </p>
                                <div class="bet-result icon-fk">
                                    <p>Q</p>
                                </div>
                                <p class="bet-result-count">
                                    0.00001<i> ETH</i>
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
                                    0.00001<i> ETH</i>
                                </p>
                                <div class="bet-result icon-mh">
                                    <p>Q</p>
                                </div>
                                <p class="bet-result-count">
                                    0.00001<i> ETH</i>
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
                                    0.00001<i> ETH</i>
                                </p>
                                <div class="bet-result joker">
                                    <p></p>
                                </div>
                                <p class="bet-result-count mywin">
                                    0.00001<i>ETH</i>
                                </p>
                            </li>
                        </ul>
                    </div>
                    <!--pc random area-->
                    <div class="pc-verification">
                        <a href="javascript:;" class="btn-href" @click="showPopVer=true">Fairness verification</a>
                        <a href="javascript:;" class="btn-question">
                            <div>
                                <p>Client seed:</p>
                                <p>a string of characters that you provided before the bet</p>
                                <p></p>
                                <p>Random number:</p>
                                <p>a unique string generated by the platform before you bet</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="pop pop-random" :class="{show:showPopVer}">
                <div class="pop-body">
                    <div class="pop-ani">
                        <a href="javascript:;" class="btn-close"  @click="showPopVer=false">X</a>
                        <div class="pop-main">
                            <h2 class="hide">
                                Custom random number
                            </h2>
                            <!---->
                            <h2>
                                Check Random Number of Last Round
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
                                                <!--btn-unlock-->
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
            <div class="pop pop-poker">
                <!-- -->
                <!--v-if-->
                <!--scale0-->
                <div class="poker-draw scale0">
                    <ul class="poker-area animate1">
                        <li class="on">
                            <img src="@assets/img/luckyPoker/img-poker.png" alt="">
                        </li>
                        <li>
                            <img src="@assets/img/luckyPoker/img-poker.png" alt="">
                        </li>
                        <li>
                            <img src="@assets/img/luckyPoker/img-poker.png" alt="">
                        </li>
                        <li>
                            <img src="@assets/img/luckyPoker/img-poker.png" alt="">
                        </li>
                        <li>
                            <img src="@assets/img/luckyPoker/img-poker.png" alt="">
                        </li>
                        <li>
                            <img src="@assets/img/luckyPoker/img-poker.png" alt="">
                        </li>
                    </ul>
                    <a href="javascript:;" class="btn-open ">
                        Open card
                    </a>
                </div>
                <!--v-else-->
                <!--isWin-->
                <div class="result ">
                    <!--heit/mh/hongt/fk+j/q/k  joker-->
                    <div class="result-box fk k">
                        <div class="leftTop">
                            <p>J</p>
                        </div>
                        <div class="img-poker"></div>
                        <div class="rightBottom">
                            <p>j</p>
                        </div>
                    </div>
                    <!--未中奖-->
                    <div class="result-msg" style="line-height: 3;font-size: 24px;font-weight: normal;">
                        再接再厉~
                    </div>
                    <!--中奖-->
                    <div class="result-msg">
                        <p>Congratulations</p>
                        <div>+0.023<i>ETH</i></div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '~components/Header'
import Footer from '~components/Footer'
import betMixin from './betMixin'
export default {
    data () {
        return {
            showPopVer: false
        }
    },
    mixins: [betMixin],
    components: { Header, Footer },
    mounted () {
    }
}
</script>
<style lang="less" scoped type="text/less">
    @import "../../styles/lib-mixins.less";
    .fly-coin {
        transition: .5s ease-in-out;
        position: absolute;
        cursor: pointer;
        img {
            width: 24px;
        }
    }
    .bg-esktop {
        position: relative;
        overflow: hidden;
    }
    .luckyPoker{
        text-align: center;
        font-family: sans-r;
        *{
            box-sizing: border-box;
        }
        .flex-between{
            display: flex;
            justify-content: space-between;
        }
        .poker-prize{
            display: table;
            position: absolute;
            left: 50%;
            z-index: 2;
            transform: translate(-50%);
            background: #003333;
            color: #33cc66;
            font-weight: bold;
        }
        .poker-time{
            color: #99cccc;
            font-weight: bold;
        }
        /*投注区*/
        .area-betting{
            .bet-rb{
                position: relative;
                float: left;
                ul{
                    overflow: hidden;
                }
                li{
                    position: relative;
                    width: 50%;
                    overflow: hidden;
                    float: left;
                    background: #386363;
                    cursor: pointer;
                    &.bet-red,&.bet-black{
                        display: flex;
                        justify-content: center;
                        color: #ff3333;
                        font-family: Lucida Bright,LBRITE;
                        p{
                            margin: 0 15/2px;
                        }
                        i{
                            display: block;
                            position: relative;
                            width: percentage(18/217);
                            img{
                                position: absolute;
                                width: 100%;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%,-50%);
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
                .poker-time{
                    color: #ffcc00;
                }
                li{
                    position: relative;
                    width: 100%;
                    background: #386363;
                    font-family: Lucida Bright,LBRITE;
                    cursor: pointer;
                    p{
                        color: #ffcc00;
                    }
                    img{
                        display: block;
                        position: absolute;
                        right: percentage(20/222);
                        top: percentage(30/140);
                        width: percentage(30/222);
                        max-width: 36px;
                    }

                }
            }
            .bet-color{
                position: relative;
                clear: both;
                ul{
                    overflow: hidden;
                }
                li{
                    position: relative;
                    float: left;
                    width: 25%;
                    overflow: hidden;
                    background-color: #386363;
                    cursor: pointer;
                    img{
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                        display: block;
                    }
                    &:first-child,&:nth-child(3){
                        background-color: #4a8282;
                    }
                }
            }
            .bet-number{
                position: relative;
                ul{
                    overflow: hidden;
                    text-align: center;
                    font-size: 0;
                    li{
                        display: inline-block;
                        color: #fff;
                        font-weight: bold;
                        font-family: Lucida Bright,LBRITE;
                        cursor: pointer;
                    }
                    &.item1{
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
                        li{
                            width: 20%;
                            background: #386363;
                            &:first-child{
                                background: #4a8282;
                            }
                            &:last-child{
                                background: #4a8282;
                            }
                        }
                    }
                }
                .btn-cls{
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    overflow: hidden;
                    background: #0c6d6d;
                    font-weight: normal;
                    a{
                        display: block;
                        height: 100%;
                        color: #99cccc;
                        &::before{
                            content: '';
                            display: block;
                            background:url("../../assets/img/luckyPoker/icon-cls.png") no-repeat center;
                        }
                    }
                }
                .poker-time{
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    height: auto;
                    line-height: 1;
                    width: 20%;
                    text-align: right;
                }
            }
        }
        /*按钮区*/
        .area-btn{
            position: relative;
            z-index: 2;
            ul{
                display: flex;
                li{
                    position: relative;
                    cursor: pointer;
                    transition: all 0.2s;
                    img{
                        display: block;
                        width: 80%;
                        margin: 0 auto;
                        transition: all 0.2s;
                        /*box-shadow: 0 7px 10px rgba(0,0,0,0.3);*/
                        border-radius: 50%;
                    }
                    p{
                        position: absolute;
                        left: 50%;
                        transform: translate(-50%);
                        background: rgba(0,0,0,0.8);
                        padding: 0 5px;
                        overflow: hidden;
                        color: #ffcc00;
                        font-weight: bold;
                    }
                    &::before{
                        content: '';
                        display: block;
                        position: absolute;
                        width: 100%;
                        /*height: 100%;*/
                        padding-top: 100%;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%) scale(0.8);
                        border-radius: 50%;
                        box-shadow: 0 0 30px transparent;
                        transition: all 0.2s;
                    }
                }
                li.on{
                    img{
                        transform: scale(1.3);
                        box-shadow: none;
                    }
                }
            }
            .btn-main{
                display: flex;
                flex-direction: column;
                justify-content: center;
                cursor: pointer;
                background: url("../../assets/img/luckyPoker/btn-main.png") no-repeat center ;
                background-size: cover;
                color: #fff;
                font-weight: bold;
                transition: all 0.2s;
                p{
                    transition: all 0.2s;
                }
                span{
                    display: block;
                    transition: all 0.2s;
                    i{

                    }
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
            .history-main{
                display: flex;
                justify-content: space-between;
            }
            .title{
                display: none;
            }
            .btn{
                display: block;
                height: 30px;
            }
            .btn-left{
                background:url("../../assets/img/luckyPoker/icon-left.png") no-repeat center;
            }
            .btn-right{
                background:url("../../assets/img/luckyPoker/icon-right.png") no-repeat center;
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
        /*h5 input*/
        .area-random{
            display: none;
        }
        /*投注记录*/
        .recording{
            width: 92%;
            /*overflow: hidden;*/
            background: #294557;
            color: #fff;
            .recording-top{
                display: flex;
                justify-content: space-between;
                p{
                    font-size: 16px;
                    font-weight: bold;
                }
                a{
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #fff;
                    &::before{
                        content: '';
                        display: block;
                        transition: all 0.2s;
                    }
                    &.on{
                        &::before{
                            background: url("../../assets/img/luckyPoker/icon-my.png") no-repeat left top ;
                            background-size: 21px;
                        }
                    }
                }
            }
            .recording-table{
                .top{
                    color: #72a1a8;
                }
            }
            .pc-verification{
                display: none;
            }
        }
        /*pop*/
        .pop-random,.pop-poker{
            display: none;
        }

        .pop-poker{
            .poker-draw{
                position: absolute;
                left: 50%;
                width: 100%;
                top: 50%;
                transform: translate(-50%,-50%);
                transition: all 0.2s;
            }
            .poker-area{
                position: relative;
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
            }
            .btn-open{
                display: block;
                max-width: 370px;
                width: percentage(370/750);
                overflow: hidden;
                margin: 0 auto 0;
                line-height: 98/2px;
                border-radius: 4px;
                background: #3e9999;
                font-size: 18px;
                color: #fff;
                font-weight: bold;
                &:hover{
                    filter: brightness(1.3);
                }
            }
            .result{
                transition: all 0.2s;
                position: absolute;
                left: 50%;
                width: 100%;
                top: 50%;
                transform: translate(-50%,-50%);
                &.isWin{
                    background: url("../../assets/img/luckyPoker/bg-win.png") no-repeat center bottom;
                    background-size: 526px;
                    .result-msg{
                        color: #ffcf20;
                    }
                }
            }
            .result-box{
                position: relative;
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
                        font-family: Lucida Bright,LBRITE;
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
                max-width: 300px;
                width: percentage(500/750);
                border-radius: 4px;
                margin: 45/2px auto 0;
                padding: 0 2px;
                background-color: #050707;
                color: #ffff;
                font-weight: bold;
                border: 1px solid #6bda7b;
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
    @media (max-width: 1106px) {
        .luckyPoker{
            background: #161e22;
            padding-top: 22/2px;
            .main{
                padding-bottom: 140/2px;
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
                top: -34/4px;
                border: 1px solid #6faeae;
                border-radius: 8/2px;
                height: 34/2px;
                line-height: 34/2px;
                font-size: 22/2px;
                //font-size: 22/7.5vw;
                padding: 0 18/2px;
                i{
                    font-size: 8px;
                }
            }
            .poker-time{
                height: 68/2px;
                line-height: 42/2px;
                font-size: 24/2px;
                //font-size: 24/7.5vw;
            }
            /*投注区*/
            .area-betting{
                position: relative;
                z-index: 2;
                width: 92%;
                margin: 44/2px auto 0;
                background: url("../../assets/img/luckyPoker/bg-ligth.png") no-repeat center;
                background-size: cover;
                font-weight: bold;
                .bet-rb{
                    width: percentage(450/690);
                    ul{
                        border-radius: 6px;
                        border: 1px solid #6faeae;
                        height: 70px;
                    }
                    li{
                        height: 70px;
                        line-height: 70px;
                        font-size: 38/2px;
                        //font-size: 38/7.5vw;
                        &+li{
                            border-left: 1px solid #6faeae;
                        }
                    }
                }
                .bet-joker{
                    width: percentage(222/690);
                    .poker-time{
                        color: #ffcc00;
                    }
                    li{
                        height: 70px;
                        border-radius: 6px;
                        border: 1px solid #6faeae;
                        background: #386363;
                        cursor: pointer;
                        p{
                            line-height: 70px;
                            font-size: 38/2px;
                            //font-size: 38/7.5vw;
                            color: #ffcc00;
                        }
                    }
                }
                .bet-color{
                    ul{
                        border: 1px solid #6faeae;
                        border-radius: 6px;
                    }
                    li{
                        height: 70px;
                        cursor: pointer;
                        img{
                            width: percentage(53/170);
                            max-width: 34px;
                        }
                    }
                    li+li{
                        border-left: 1px solid #6faeae;
                    }
                }
                .bet-number{
                    ul{
                        li{
                            height: 123/2px;
                            line-height: 123/2px;
                            border-bottom: 1px solid #6faeae;
                            border-right: 1px solid #6faeae;
                            font-size: 46/2px;
                            //font-size: 46/7.5vw;
                        }
                        &.item1{
                            border-left: 1px solid #6faeae;
                            border-top: 1px solid #6faeae;
                            border-radius: 6px;
                        }
                        &.item2{
                            border-left: 1px solid transparent;
                            border-bottom: 1px solid transparent;
                            li{
                                &:first-child{
                                    border-bottom-left-radius: 6px;
                                    border-left: 1px solid #6faeae;
                                }
                                &:last-child{
                                    border-bottom-right-radius: 6px;
                                }
                            }
                        }
                    }
                    .btn-cls{
                        width: 45px;
                        border-radius: 6px;
                        font-size: 24/2px;
                        //font-size: 24/7.5vw;
                        a{
                            &::before{
                                margin: 4px auto 0;
                                width: 29/2px;
                                height: 36/2px;
                                background-size: 100%;
                            }
                        }
                    }
                }
            }
            /*按钮区*/
            .area-btn{
                width: 92%;
                margin: 45/2px auto 0;
                ul{
                    float: left;
                    width: percentage(490/690);
                    justify-content: space-between;
                    li{
                        width: percentage(104/503);
                        p{
                            bottom: 0;
                            min-width: percentage(110/104);
                            height: 38/2px;
                            border-radius: 38/4px;
                            line-height: 38/2px;
                            font-size: 30/2px;

                        }
                    }
                    li.on{
                        &::before{
                            transform: translate(-50%,-50%) scale(1);
                            box-shadow: 0 0 10px rgba(0,255,234,1);
                        }
                    }
                }
                .btn-main{
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: percentage(187/690);
                    height: 100%;
                    border-radius: 6px;
                    box-shadow: 0 4px 0 #2b7876;
                    p{
                        line-height: 22px;
                        font-size: 18px;
                        text-shadow: 0 1px #2b7b75, 1px 0 #2b7b75, -1px 0 #2b7b75, 0 -1px #2b7b75;
                    }
                    span{
                        line-height: 15px;
                        font-size: 12px;
                        i{
                            font-size: 10px;
                        }
                    }

                }
            }
            /*历史开奖*/
            .poker-history{
                position: relative;
                z-index: 2;
                font-family: Lucida Bright,LBRITE;
                text-align: center;
                .btn{
                    width: percentage(30/750);
                }
                .btn-left{
                    background-size: 10px;
                }
                .btn-right{
                    background-size: 10px;
                }
            }
            /*h5 input*/
            .area-random{
                display: block;
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
                            background: #29c2bd;
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
            /*投注记录*/
            .recording{
                padding-top: 22/2px;
                margin: 32/2px auto 0px;
                border-radius: 6px;
                overflow: hidden;
                .recording-top{
                    padding: 0 percentage(25/690);
                    line-height: 70/2px;
                    a{
                        font-size: 12px;
                        &::before{
                            margin-right: 9px;
                            width: 21px;
                            height: 19px;
                            background: url("../../assets/img/luckyPoker/icon-all.png") no-repeat left top ;
                            background-size: 21px;
                        }
                        &.on{
                            &::before{
                                background: url("../../assets/img/luckyPoker/icon-my.png") no-repeat left top ;
                                background-size: 21px;
                            }
                        }
                    }
                }
                .recording-table{
                    .top{
                        padding: 0 percentage(25/690);
                        line-height: 82/2px;
                        font-size: 24/2px;
                    }
                    .recoding-main{
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
                                font-family: Lucida Bright,LBRITE;
                                font-weight: bold;
                                text-transform: uppercase;
                                text-align: center;
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
                                i{
                                    font-size: 10px;
                                }
                            }
                            .bet-result-count{
                                text-align: right;
                                width: 78px;
                                height: 100%;
                                overflow: hidden;
                                i{
                                    font-size: 10px;
                                }
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
            }
            /*pop*/
            .pop-random{
                .btn-close{

                }
                .pop-body{
                    width: 100%;
                }
                .pop-main{
                    padding: 0;
                    background: #213746;
                }
                h2{
                    height: 70px;
                    line-height: 64px;
                    font-size: 16px;
                    color: #fff;
                    font-weight: bold;
                }
                .tab-h{
                    line-height: 52px;
                    li{
                        float: left;
                        height: 100%;
                        width: 100%;
                        overflow: hidden;
                        .text-overflow();
                        display: none;
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
                        padding-top: 10px;
                        line-height: 23px;
                        text-align: left;
                        font-size: 14px;
                        font-weight: bold;
                    }
                    .input-group{
                        display: flex;
                        height: 42px;
                        line-height: 42px;
                        border-radius: 6px;
                        overflow: hidden;
                        input{
                            padding: 0;
                            height: 42px;
                            line-height: 42px;
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
                                filter: brightness(0.8);
                            }
                            &.btn-unlock{
                                filter: brightness(1);
                            }
                        }
                    }
                    .btn-check{
                        display: block;
                        width: 275px;
                        height: 40px;
                        overflow: hidden;
                        background: #29c2bd;
                        border-radius: 6px;
                        line-height: 40px;
                        font-size: 14px;
                        color: #fff;
                        font-weight: bold;
                        margin: 30px auto 0;
                    }
                }
            }
            .pop-poker {
                .poker-area {
                    width: percentage(212/750);
                    padding-top: 50%;
                    /*margin: 145px auto 110px;*/
                    margin: 0 auto 50px;
                }
                .result-box {
                    width: percentage(340/750);
                    padding-top: percentage(500/750);
                }
            }
        }
    }
    @media (min-width: 1106px) {
        .luckyPoker{
            background:#1b262c url("../../assets/img/luckyPoker/bg-pc.jpg") no-repeat center top;
            background-size: 1920px;
            .main{
                position: relative;
                width: 1107px;
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
            .poker-prize{
                top: -24/2px;
                border: 2px solid #6faeae;
                border-radius: 8px;
                padding: 0 12px;
                height: 24px;
                line-height: 20px;
                font-size: 14px;
                i{
                    font-size: 12px;
                }
            }
            .poker-time{
                height:33px;
                line-height: 20px;
                font-size: 16px;
            }
            /*投注区*/
            .area-betting{
                .bet-rb{
                    width: 290px;
                    ul{
                        border-radius: 8px;
                        border: 2px solid #6faeae;
                        height: 87px;
                    }
                    li{
                        line-height: 83px;
                        font-size: 24px;
                        &+li{
                            border-left: 2px solid #6faeae;
                        }
                    }
                }
                .bet-joker{
                    width: 144px;
                    li{
                        height: 87px;
                        border-radius: 8px;
                        line-height: 83px;
                        border: 2px solid #6faeae;
                        p{
                            font-size: 24px;
                        }
                    }
                }
                .bet-color{
                    ul{
                        border: 2px solid #6faeae;
                        border-radius: 8px;
                    }
                    li{
                        height: 87px;
                        cursor: pointer;
                        img{
                            width: percentage(53/170);
                        }
                    }
                    li+li{
                        border-left: 2px solid #6faeae;
                    }
                }
                .bet-number{
                    ul{
                        li{
                            height: 74px;
                            line-height: 72px;
                            border-bottom: 2px solid #6faeae;
                            border-right: 2px solid #6faeae;
                            font-size: 26px;
                        }
                        &.item1{
                            border-left: 2px solid #6faeae;
                            border-top: 2px solid #6faeae;
                            border-radius: 8px;
                        }
                        &.item2{
                            border-left: 2px solid transparent;
                            border-bottom: 2px solid transparent;
                            li{
                                &:first-child{
                                    border-bottom-left-radius: 8px;
                                    border-left: 2px solid #6faeae;
                                }
                                &:last-child{
                                    border-bottom-right-radius: 8px;
                                }
                            }
                        }
                    }
                    .btn-cls{
                        width: 50px;
                        height: 50px;
                        border-radius: 8px;
                        font-size: 16px;
                        a{
                            &::before{
                                margin: 4px auto 0;
                                width: 19px;
                                height: 23px;
                                padding-top: 0;
                                background-size: 100%;
                            }
                        }
                    }
                }
            }
            /*按钮区*/
            .area-btn{
                margin: 16px auto 0;
                ul{
                    justify-content: center;
                    li{
                        width: 58px;
                        margin: 0 14px;
                        p{
                            bottom:0;
                            min-width: 65px;
                            height: 24px;
                            border-radius: 12px;
                            line-height: 24px;
                            font-size: 18px;
                        }
                    }
                    li.on{
                        &::before{
                            transform: translate(-50%,-50%) scale(1);
                            box-shadow: 0 0 30px rgba(0,255,234,1);
                        }
                    }
                }
                .btn-main{
                    width: 210px;
                    height: 63px;
                    margin: 28px auto 0;
                    border-radius: 8px;
                    box-shadow: 0 7px 0 #2b7876;
                    p{
                        line-height: 28px;
                        font-size: 26px;
                        text-shadow: 0 2px #2b7b75, 2px 0 #2b7b75, -2px 0 #2b7b75, 0 -2px #2b7b75;
                    }
                    span{
                        line-height: 20px;
                        font-size: 18px;
                        i{
                            font-size: 14px;
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
                    font-weight: bold;
                    color: #fff;
                }
                .btn{
                    width: 40px;
                    &:hover{
                        filter: brightness(1.3);
                    }
                }
                .btn-left{
                    background-size: 16px;
                }
                .btn-right{
                    background-size: 16px;
                }
            }
            /*投注记录*/
            .recording{
                position: absolute;
                right: 31px;
                bottom: 130px;
                max-width: 455px;
                padding-top: 2px;
                margin: 25px auto 0;
                border-radius: 8px;
                .recording-top{
                    padding: 0 27px;
                    line-height: 80px;
                    a{
                        font-size: 14px;
                        &::before{
                            margin-right: 9px;
                            width: 21px;
                            height: 19px;
                            background: url("../../assets/img/luckyPoker/icon-all.png") no-repeat left top ;
                            background-size: 21px;
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
                                i{
                                    font-size: 12px;
                                }
                            }
                            .bet-result-count{
                                text-align: right;
                                width: 83px;
                                height: 100%;
                                overflow: hidden;
                                i{
                                    font-size: 12px;
                                }
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
                    display: block;
                    height: 84px;
                    margin-top: 33px;
                    padding: 0 27px;
                    background: #253e4e;
                    display: flex;
                    align-items: center;
                    border-bottom-left-radius: 8px;
                    border-bottom-right-radius: 8px;
                    .btn-href{
                        font-size: 14px;
                        color: #fff;
                        text-decoration: underline;
                        &:hover{
                            color: #6fa4a3;
                        }
                    }
                    .btn-question{
                        position: relative;
                        width: 19px;
                        height: 19px;
                        /*overflow: hidden;*/
                        margin-left: 12px;
                        background: url("../../assets/img/luckyPoker/icon-help.png") no-repeat center ;
                        background-size: cover;
                        &:hover{
                            div{
                                display: block;
                            }
                        }
                        div{
                            display: none;
                            position: absolute;
                            left: -119px;
                            top: -185px;
                            width: 434px;
                            padding: 25px 18px 30px;
                            background: #fff;
                            border-radius: 8px;
                            border-bottom: 30px solid transparent;
                            background-clip: padding-box;
                            &::after{
                                content: '';
                                position: absolute;
                                bottom: -10px;
                                left: 118px;
                                display: block;
                                width: 0;
                                height: 0;
                                border-top: 10px solid #fff;
                                border-left: 10px solid transparent;
                                border-right: 10px solid transparent;
                            }
                            p{
                                height: 22px;
                                line-height: 22px;
                                font-size: 14px;
                                color: #72a1a8;
                                font-weight: bold;
                                text-align: left;
                            }
                        }
                    }
                }
            }
            /*pop*/
            .pop-random{
                .btn-close{
                    &:hover{
                        background: rgba(245,245,245,0.1);
                    }
                }
                .pop-body{
                    width: 727px;
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
                            background: #3e9999;
                            font-size: 18px;
                            color: #fff;
                            font-weight: bold;
                            &.btn-random{
                                width: percentage(200/640);
                            }
                            &.btn-lock{
                                width: percentage(140/640);
                                filter: brightness(0.8);
                            }
                            &.btn-unlock{
                                filter: brightness(1);
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
            .pop-poker {
                .poker-area {
                    width: 140px;
                    height: 280px;
                    /*margin: 50px auto 30px;*/
                    margin: 0 auto 30px;
                }
                .result-box {
                    max-width: 210px;
                    padding-top: 0;
                    height: 300px;
                }
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
</style>
