<template>
    <div class="luckyPoker">
        <div class="main">
            <div class="bg-esktop " ref="container" style="position: relative">
                <div class="fly-coin fly-coin-el" ref="coin" :style="item.style" v-for="(item, index) in coins" :key="index" @click="addCoin(item.type)">
                    <img class="fly-coin-el" src="@assets/img/luckyPoker/coin-0.0001.png" alt="" v-if="item.coinType === 0.0001">
                    <img class="fly-coin-el" src="@assets/img/luckyPoker/coin-0.001.png" alt="" v-if="item.coinType === 0.001">
                    <img class="fly-coin-el" src="@assets/img/luckyPoker/coin-0.01.png" alt="" v-if="item.coinType === 0.01">
                    <img class="fly-coin-el" src="@assets/img/luckyPoker/coin-0.1.png" alt="" v-if="item.coinType === 0.1">
                </div>
                <!--历史开奖记录-->
                <div class="poker-history">
                    <a class="btn btn-left" href="javascript:;"></a>
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
                    </ul>
                    <a class="btn btn-right" href="javascript:;"></a>
                </div>
                <!--投注区-->
                <div class="area-betting">
                    <!--red or balck-->
                    <div class="bet-rb">
                        <p class="poker-prize">
                            最高可中  0.002 ETH
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
                        <p class="poker-prize">
                            Winning  0.0002 ETH
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
                            最高可中  0.002 ETH
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
                            最高可中  0.002 ETH
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
                <!--todo-->
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
                        <i>{{total}} ETH</i>
                    </div>
                </div>
            </div>
            <!--随机数-->
            <div class="area-random">
                <div class="random-top">
                    <p class="title">
                        Custom random number
                    </p>
                    <a href="javascript:;" class="btn-help"></a>
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
            <div class="recording">
                <div class="recording-top">
                    <p>
                        Custom random number
                    </p>
                    <!--点击后文案变成back，类似11选5超级选5那个按钮-->
                    <a href="javascript:;">
                        Myself
                    </a>
                </div>
                <div class="recording-table">
                    <ul class="top flex-between">
                        <li>Player</li>
                        <li>Betting</li>
                        <li>Result</li>
                    </ul>
                    <ul class="main">
                        <li>
                            <p class="bet-user">
                                222222222222222@gmail.com
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
                        <li>
                            <p class="bet-user">
                                380482989@gmail.com
                            </p>
                            <div class="bet-expect joker">
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
            </div>
        </div>
         <div class="pop pop-poker hide">
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
             <!--heit/mh/hongt/fk+j/q/k  joker-->
             <div class="result ">
                 <div class="result-box fk k">
                     <div class="leftTop">
                         <p>J</p>
                     </div>
                     <div class="img-poker"></div>
                     <div class="rightBottom">
                         <p>j</p>
                     </div>
                 </div>
                 <div class="result-msg">
                         <p>Congratulations</p>
                         <div>+0.023<i>ETH</i></div>
                     </div>
             </div>
         </div>
    </div>
</template>

<script>
import betMixin from '../betMixin'
export default {
    mixins: [betMixin]
}
</script>

<style lang="less" scoped>
.fly-coin {
    transition: .5s ease-in-out;
    position: absolute;
    img {
        width: 24px;
    }
}
</style>
