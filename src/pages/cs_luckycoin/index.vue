<template>
    <div class="lucky-index">
        <div class="main">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="banner">
                            <el-carousel :interval="3000" arrow="always">
                                <el-carousel-item>
                                    <a href="javascript:;" rel="nofollow">
                                        <img src="../../assets/img/oneToKen/banner.jpg" alt="">
                                    </a>
                                </el-carousel-item>
                                <el-carousel-item>
                                    <a href="javascript:;" rel="nofollow">
                                        <img src="../../assets/img/oneToKen/banner.jpg" alt="">
                                    </a>
                                </el-carousel-item>
                                <el-carousel-item>
                                    <a href="javascript:;" rel="nofollow">
                                        <img src="../../assets/img/oneToKen/banner.jpg" alt="">
                                    </a>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <!--match-popular/match-common-->
                        <div class="match match-popular ">
                            <!-- hot bet-->
                            <div class="icon-box hot bet">
                                <i class="icon-hot">H</i>
                                <i class="icon-youbet">You Bet</i>
                            </div>
                            <!--match-eth/match-btc-->
                            <div class="match-img match-eth">
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="102" height="102">
                                    <defs>
                                        <linearGradient x1="1" y1="0" x2="0" y2="0" id="yellowColor1">
                                            <stop offset="0%" stop-color="#e46b12"></stop>   <!--这个是终点-->
                                            <stop offset="100%" stop-color="#fdc90c"></stop>
                                        </linearGradient>
                                        <linearGradient x1="1" y1="0" x2="0" y2="0" id="yellowColor2">
                                            <stop offset="0%" stop-color="#fdc90c"></stop>
                                            <stop offset="100%" stop-color="#f9c600"></stop>
                                        </linearGradient>
                                        <linearGradient x1="1" y1="0" x2="0" y2="0" id="blueColor1">
                                            <stop offset="0%" stop-color="#62f7d9"></stop>
                                            <stop offset="100%" stop-color="#5ed9eb"></stop>
                                        </linearGradient>
                                        <linearGradient x1="1" y1="0" x2="0" y2="0" id="blueColor2">
                                            <stop offset="0%" stop-color="#53b8f0"></stop>
                                            <stop offset="100%" stop-color="#5ed9eb"></stop>
                                        </linearGradient>
                                    </defs>
                                    <g transform="matrix(0,-1,1,0,0,102)">
                                        <circle cx="51" cy="51" r="47" stroke-width="8" stroke="rgba(255,255,255,0.05)" fill="transparent"/>
                                        <circle cx="51" cy="51" r="47" stroke="url(#blueColor1)" stroke-width="8" fill="transparent" stroke-linecap='round'  stroke-dasharray="0 296"/>  <!--左边 整圆-->
                                        <circle cx="51" cy="51" r="47" stroke="url(#blueColor2)" stroke-width="8" fill="transparent" stroke-linecap='round'  stroke-dasharray="0 296"/>
                                    </g>
                                    <!--
                                       stroke-dasharray   //2*3.14*47=296
                                       绘制虚线: 一个参数时： 表示一段虚线长度和每段虚线之间的间距
                                       两个参数或者多个参数时：一个表示长度，一个表示间距
                                       stroke-dashoffset: 偏移位置
                                       0% -> 296
                                       100% -> 296 296
                                       148/296
                                       form:https://www.zhangxinxu.com/wordpress/2015/07/svg-circle-loading/
                                       -->
                                </svg>
                            </div>
                            <!--奖金-->
                            <p class="match-prize">
                                <span class="payfor">Play For</span> 20 <i>BTC</i>
                            </p>
                            <!--价值-->
                            <p class="match-usd">
                                USD 14,776
                            </p>
                            <!--期号-->
                            <p class="match-issue">
                                NO.180327018
                            </p>
                            <!--进度-->
                            <p class="match-process">
                                Draw Process 100 / 120
                            </p>
                            <!--价格-->
                            <p class="match-price">
                                Ticket Price 0.01 BTC
                            </p>
                            <a href="javascript:;" class="match-btn">
                                Bet Now
                            </a>

                            <!--投注状态-->
                            <!--show-->
                            <div class="bet- bet-normal ">
                                <a href="javascript:;" class="bet-close"></a>
                                <div class="bet-t">
                                    <span>Bid for</span> 0.5 <i>BTC</i>
                                </div>
                                <p class="bet-m1">
                                    Bet Amount
                                </p>
                                <p class="bet-m2">
                                    more bets，more probability
                                </p>
                                <!--icon-eth/icon-btc-->
                                <div class="input-box icon-eth">
                                    <input type="text">
                                    <a href="javascript:;">1/2</a>
                                    <a href="javascript:;">2X</a>
                                    <a href="javascript:;">Max</a>
                                </div>
                                <a href="javascript:;" class="btn-bet">
                                    Pay Now
                                </a>
                            </div>
                            <div class="bet- bet-success ">
                                <a href="javascript:;" class="bet-close"></a>
                                <div class="bet-icon"></div>
                                <p class="bet-t">
                                    Bet Success
                                </p>
                                <p class="bet-m">
                                    You get five numbers obtained bonus 5ETH. The more bets, the higher the probability of winning, I wish you good luck~
                                </p>
                                <div class="btn-box">
                                    <a href="/luckycoin/moreBids" class="bet-btnV">
                                        View Number
                                    </a>
                                    <a  href="javascript:;" class="bet-btnB">
                                        Bet More
                                    </a>
                                </div>
                            </div>
                            <div class="bet- bet-fail ">
                                <a href="javascript:;" class="bet-close"></a>
                                <div class="bet-icon"></div>
                                <p class="bet-t">
                                    Bet failure
                                </p>
                                <p class="bet-m">
                                    Temporarily unavailable due to network reasons
                                </p>
                                <a href="javascript:;" class="btn-fail">
                                    Try Again Later
                                </a>
                            </div>
                            <div class="bet- bet-balance ">
                                <a href="javascript:;" class="bet-close"></a>
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
                </div>
                <div class="row">
                    <div class="col-lg-9">
                        <div class="row">
                            <div class="col-xs-12 ">
                                <div class="title">
                                    <div class="left">
                                        <p class="t1">Bet For The Prize</p>
                                        <p class="t2 hidden-xs hidden-sm">All or nothing, small cost,  big profit</p>
                                        <a href="javascript:;" class="play ">
                                            How To Play ？
                                        </a>
                                    </div>
                                    <div class="right">
                                        <a href="javascript:;" class="btn-more ">
                                            More >
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-lg-4">
                                <div class="match match-common ">
                                    <!-- hot bet-->
                                    <div class="icon-box hot bet">
                                        <i class="icon-hot">H</i>
                                        <i class="icon-youbet">You Bet</i>
                                    </div>
                                    <!--match-eth/match-btc-->
                                    <div class="match-img match-eth">
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="102" height="102">
                                            <defs>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="yellowColor1">
                                                    <stop offset="0%" stop-color="#e46b12"></stop>   <!--这个是终点-->
                                                    <stop offset="100%" stop-color="#fdc90c"></stop>
                                                </linearGradient>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="yellowColor2">
                                                    <stop offset="0%" stop-color="#fdc90c"></stop>
                                                    <stop offset="100%" stop-color="#f9c600"></stop>
                                                </linearGradient>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="blueColor1">
                                                    <stop offset="0%" stop-color="#62f7d9"></stop>
                                                    <stop offset="100%" stop-color="#5ed9eb"></stop>
                                                </linearGradient>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="blueColor2">
                                                    <stop offset="0%" stop-color="#53b8f0"></stop>
                                                    <stop offset="100%" stop-color="#5ed9eb"></stop>
                                                </linearGradient>
                                            </defs>
                                            <g transform="matrix(0,-1,1,0,0,102)">
                                                <circle cx="51" cy="51" r="47" stroke-width="8" stroke="rgba(255,255,255,0.05)" fill="transparent"/>
                                                <circle cx="51" cy="51" r="47" stroke="url(#blueColor1)" stroke-width="8" fill="transparent" stroke-linecap='round'  stroke-dasharray="0 296"/>  <!--左边 整圆-->
                                                <circle cx="51" cy="51" r="47" stroke="url(#blueColor2)" stroke-width="8" fill="transparent" stroke-linecap='round'  stroke-dasharray="0 296"/>
                                            </g>
                                            <!--
                                               stroke-dasharray   //2*3.14*47=296
                                               绘制虚线: 一个参数时： 表示一段虚线长度和每段虚线之间的间距
                                               两个参数或者多个参数时：一个表示长度，一个表示间距
                                               stroke-dashoffset: 偏移位置
                                               0% -> 296
                                               100% -> 296 296
                                               148/296
                                               form:https://www.zhangxinxu.com/wordpress/2015/07/svg-circle-loading/
                                               -->
                                        </svg>
                                    </div>
                                    <!--奖金-->
                                    <p class="match-prize">
                                        <span class="payfor">Play For</span>
                                        20 <i>BTC</i>
                                    </p>
                                    <!--价值-->
                                    <p class="match-usd">
                                        USD 14,776
                                    </p>
                                    <!--期号-->
                                    <p class="match-issue">
                                        NO.180327018
                                    </p>
                                    <!--进度-->
                                    <p class="match-process">
                                        Draw Process 100 / 120
                                    </p>
                                    <!--价格-->
                                    <p class="match-price">
                                        Ticket Price 0.01 BTC
                                    </p>
                                    <a href="javascript:;" class="match-btn">
                                        Bet Now
                                    </a>

                                    <!--投注状态-->
                                    <div class="bet-normal hide">
                                        <a href="javascript:;" class="bet-close"></a>
                                        <div class="bet-t">
                                            <span>Bid for</span> 0.5 <i>BTC</i>
                                        </div>
                                        <p class="bet-m1">
                                            Bet Amount
                                        </p>
                                        <p class="bet-m2">
                                            more bets，more probability
                                        </p>
                                        <div class="input-box icon-eth">
                                            <input type="text">
                                            <a href="javascript:;">1/2</a>
                                            <a href="javascript:;">2X</a>
                                            <a href="javascript:;">Max</a>
                                        </div>
                                        <a href="javascript:;" class="btn-bet">
                                            Pay Now
                                        </a>
                                    </div>
                                    <div class="bet-success hide">
                                        <a href="javascript:;" class="bet-close"></a>
                                        <div class="bet-icon"></div>
                                        <p class="bet-t">
                                            Bet Success
                                        </p>
                                        <p class="bet-m">
                                            You get five numbers obtained bonus 5ETH. The more bets, the higher the probability of winning, I wish you good luck~
                                        </p>
                                        <div class="btn-box">
                                            <a href="/luckycoin/moreBids" class="bet-btnV">
                                                View Number
                                            </a>
                                            <a  href="javascript:;" class="bet-btnB">
                                                Bet More
                                            </a>
                                        </div>
                                    </div>
                                    <div class="bet-fail hide">
                                        <a href="javascript:;" class="bet-close"></a>
                                        <div class="bet-icon"></div>
                                        <p class="bet-t">
                                            Bet failure
                                        </p>
                                        <p class="bet-m">
                                            Temporarily unavailable due to network reasons
                                        </p>
                                        <a href="javascript:;" class="btn-fail">
                                            Try Again Later
                                        </a>
                                    </div>
                                    <div class="bet-balance hide">
                                        <a href="javascript:;" class="bet-close"></a>
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
                                <div class="match match-common ">
                                    <!-- hot bet-->
                                    <div class="icon-box hot bet">
                                        <i class="icon-hot">H</i>
                                        <i class="icon-youbet">You Bet</i>
                                    </div>
                                    <!--match-eth/match-btc-->
                                    <div class="match-img match-eth">
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="102" height="102">
                                            <defs>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="yellowColor1">
                                                    <stop offset="0%" stop-color="#e46b12"></stop>   <!--这个是终点-->
                                                    <stop offset="100%" stop-color="#fdc90c"></stop>
                                                </linearGradient>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="yellowColor2">
                                                    <stop offset="0%" stop-color="#fdc90c"></stop>
                                                    <stop offset="100%" stop-color="#f9c600"></stop>
                                                </linearGradient>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="blueColor1">
                                                    <stop offset="0%" stop-color="#62f7d9"></stop>
                                                    <stop offset="100%" stop-color="#5ed9eb"></stop>
                                                </linearGradient>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="blueColor2">
                                                    <stop offset="0%" stop-color="#53b8f0"></stop>
                                                    <stop offset="100%" stop-color="#5ed9eb"></stop>
                                                </linearGradient>
                                            </defs>
                                            <g transform="matrix(0,-1,1,0,0,102)">
                                                <circle cx="51" cy="51" r="47" stroke-width="8" stroke="rgba(255,255,255,0.05)" fill="transparent"/>
                                                <circle cx="51" cy="51" r="47" stroke="url(#blueColor1)" stroke-width="8" fill="transparent" stroke-linecap='round'  stroke-dasharray="0 296"/>  <!--左边 整圆-->
                                                <circle cx="51" cy="51" r="47" stroke="url(#blueColor2)" stroke-width="8" fill="transparent" stroke-linecap='round'  stroke-dasharray="0 296"/>
                                            </g>
                                            <!--
                                               stroke-dasharray   //2*3.14*47=296
                                               绘制虚线: 一个参数时： 表示一段虚线长度和每段虚线之间的间距
                                               两个参数或者多个参数时：一个表示长度，一个表示间距
                                               stroke-dashoffset: 偏移位置
                                               0% -> 296
                                               100% -> 296 296
                                               148/296
                                               form:https://www.zhangxinxu.com/wordpress/2015/07/svg-circle-loading/
                                               -->
                                        </svg>
                                    </div>
                                    <!--奖金-->
                                    <p class="match-prize">
                                        <span class="payfor">Play For</span>
                                        20 <i>BTC</i>
                                    </p>
                                    <!--价值-->
                                    <p class="match-usd">
                                        USD 14,776
                                    </p>
                                    <!--期号-->
                                    <p class="match-issue">
                                        NO.180327018
                                    </p>
                                    <!--进度-->
                                    <p class="match-process">
                                        Draw Process 100 / 120
                                    </p>
                                    <!--价格-->
                                    <p class="match-price">
                                        Ticket Price 0.01 BTC
                                    </p>
                                    <a href="javascript:;" class="match-btn">
                                        Bet Now
                                    </a>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-4 hidden-xs hidden-sm">
                                <div class="match match-common ">
                                    <!-- hot bet-->
                                    <div class="icon-box hot bet">
                                        <i class="icon-hot">H</i>
                                        <i class="icon-youbet">You Bet</i>
                                    </div>
                                    <!--match-eth/match-btc-->
                                    <div class="match-img match-eth">
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="102" height="102">
                                            <defs>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="yellowColor1">
                                                    <stop offset="0%" stop-color="#e46b12"></stop>   <!--这个是终点-->
                                                    <stop offset="100%" stop-color="#fdc90c"></stop>
                                                </linearGradient>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="yellowColor2">
                                                    <stop offset="0%" stop-color="#fdc90c"></stop>
                                                    <stop offset="100%" stop-color="#f9c600"></stop>
                                                </linearGradient>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="blueColor1">
                                                    <stop offset="0%" stop-color="#62f7d9"></stop>
                                                    <stop offset="100%" stop-color="#5ed9eb"></stop>
                                                </linearGradient>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="blueColor2">
                                                    <stop offset="0%" stop-color="#53b8f0"></stop>
                                                    <stop offset="100%" stop-color="#5ed9eb"></stop>
                                                </linearGradient>
                                            </defs>
                                            <g transform="matrix(0,-1,1,0,0,102)">
                                                <circle cx="51" cy="51" r="47" stroke-width="8" stroke="rgba(255,255,255,0.05)" fill="transparent"/>
                                                <circle cx="51" cy="51" r="47" stroke="url(#blueColor1)" stroke-width="8" fill="transparent" stroke-linecap='round'  stroke-dasharray="0 296"/>  <!--左边 整圆-->
                                                <circle cx="51" cy="51" r="47" stroke="url(#blueColor2)" stroke-width="8" fill="transparent" stroke-linecap='round'  stroke-dasharray="0 296"/>
                                            </g>
                                            <!--
                                               stroke-dasharray   //2*3.14*47=296
                                               绘制虚线: 一个参数时： 表示一段虚线长度和每段虚线之间的间距
                                               两个参数或者多个参数时：一个表示长度，一个表示间距
                                               stroke-dashoffset: 偏移位置
                                               0% -> 296
                                               100% -> 296 296
                                               148/296
                                               form:https://www.zhangxinxu.com/wordpress/2015/07/svg-circle-loading/
                                               -->
                                        </svg>
                                    </div>
                                    <!--奖金-->
                                    <p class="match-prize">
                                        <span class="payfor">Play For</span>
                                        20 <i>BTC</i>
                                    </p>
                                    <!--价值-->
                                    <p class="match-usd">
                                        USD 14,776
                                    </p>
                                    <!--期号-->
                                    <p class="match-issue">
                                        NO.180327018
                                    </p>
                                    <!--进度-->
                                    <p class="match-process">
                                        Draw Process 100 / 120
                                    </p>
                                    <!--价格-->
                                    <p class="match-price">
                                        Ticket Price 0.01 BTC
                                    </p>
                                    <a href="javascript:;" class="match-btn">
                                        Bet Now
                                    </a>
                                </div>
                                <div class="match match-common ">
                                    <!-- hot bet-->
                                    <div class="icon-box hot bet">
                                        <i class="icon-hot">H</i>
                                        <i class="icon-youbet">You Bet</i>
                                    </div>
                                    <!--match-eth/match-btc-->
                                    <div class="match-img match-eth">
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="102" height="102">
                                            <defs>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="yellowColor1">
                                                    <stop offset="0%" stop-color="#e46b12"></stop>   <!--这个是终点-->
                                                    <stop offset="100%" stop-color="#fdc90c"></stop>
                                                </linearGradient>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="yellowColor2">
                                                    <stop offset="0%" stop-color="#fdc90c"></stop>
                                                    <stop offset="100%" stop-color="#f9c600"></stop>
                                                </linearGradient>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="blueColor1">
                                                    <stop offset="0%" stop-color="#62f7d9"></stop>
                                                    <stop offset="100%" stop-color="#5ed9eb"></stop>
                                                </linearGradient>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="blueColor2">
                                                    <stop offset="0%" stop-color="#53b8f0"></stop>
                                                    <stop offset="100%" stop-color="#5ed9eb"></stop>
                                                </linearGradient>
                                            </defs>
                                            <g transform="matrix(0,-1,1,0,0,102)">
                                                <circle cx="51" cy="51" r="47" stroke-width="8" stroke="rgba(255,255,255,0.05)" fill="transparent"/>
                                                <circle cx="51" cy="51" r="47" stroke="url(#blueColor1)" stroke-width="8" fill="transparent" stroke-linecap='round'  stroke-dasharray="0 296"/>  <!--左边 整圆-->
                                                <circle cx="51" cy="51" r="47" stroke="url(#blueColor2)" stroke-width="8" fill="transparent" stroke-linecap='round'  stroke-dasharray="0 296"/>
                                            </g>
                                            <!--
                                               stroke-dasharray   //2*3.14*47=296
                                               绘制虚线: 一个参数时： 表示一段虚线长度和每段虚线之间的间距
                                               两个参数或者多个参数时：一个表示长度，一个表示间距
                                               stroke-dashoffset: 偏移位置
                                               0% -> 296
                                               100% -> 296 296
                                               148/296
                                               form:https://www.zhangxinxu.com/wordpress/2015/07/svg-circle-loading/
                                               -->
                                        </svg>
                                    </div>
                                    <!--奖金-->
                                    <p class="match-prize">
                                        <span class="payfor">Play For</span>
                                        20 <i>BTC</i>
                                    </p>
                                    <!--价值-->
                                    <p class="match-usd">
                                        USD 14,776
                                    </p>
                                    <!--期号-->
                                    <p class="match-issue">
                                        NO.180327018
                                    </p>
                                    <!--进度-->
                                    <p class="match-process">
                                        Draw Process 100 / 120
                                    </p>
                                    <!--价格-->
                                    <p class="match-price">
                                        Ticket Price 0.01 BTC
                                    </p>
                                    <a href="javascript:;" class="match-btn">
                                        Bet Now
                                    </a>
                                </div>
                            </div>
                            <div class="col-lg-4 hidden-xs hidden-xs hidden-sm hidden-md">
                                <div class="match match-common ">
                                    <!-- hot bet-->
                                    <div class="icon-box hot bet">
                                        <i class="icon-hot">H</i>
                                        <i class="icon-youbet">You Bet</i>
                                    </div>
                                    <!--match-eth/match-btc-->
                                    <div class="match-img match-btc">
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="102" height="102">
                                            <defs>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="yellowColor1">
                                                    <stop offset="0%" stop-color="#e46b12"></stop>   <!--这个是终点-->
                                                    <stop offset="100%" stop-color="#fdc90c"></stop>
                                                </linearGradient>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="yellowColor2">
                                                    <stop offset="0%" stop-color="#fdc90c"></stop>
                                                    <stop offset="100%" stop-color="#f9c600"></stop>
                                                </linearGradient>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="blueColor1">
                                                    <stop offset="0%" stop-color="#62f7d9"></stop>
                                                    <stop offset="100%" stop-color="#5ed9eb"></stop>
                                                </linearGradient>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="blueColor2">
                                                    <stop offset="0%" stop-color="#53b8f0"></stop>
                                                    <stop offset="100%" stop-color="#5ed9eb"></stop>
                                                </linearGradient>
                                            </defs>
                                            <g transform="matrix(0,-1,1,0,0,102)">
                                                <circle cx="51" cy="51" r="47" stroke-width="8" stroke="rgba(255,255,255,0.05)" fill="transparent"/>
                                                <circle cx="51" cy="51" r="47" stroke="url(#blueColor1)" stroke-width="8" fill="transparent" stroke-linecap='round'  stroke-dasharray="0 296"/>  <!--左边 整圆-->
                                                <circle cx="51" cy="51" r="47" stroke="url(#blueColor2)" stroke-width="8" fill="transparent" stroke-linecap='round'  stroke-dasharray="0 296"/>
                                            </g>
                                            <!--
                                               stroke-dasharray   //2*3.14*47=296
                                               绘制虚线: 一个参数时： 表示一段虚线长度和每段虚线之间的间距
                                               两个参数或者多个参数时：一个表示长度，一个表示间距
                                               stroke-dashoffset: 偏移位置
                                               0% -> 296
                                               100% -> 296 296
                                               148/296
                                               form:https://www.zhangxinxu.com/wordpress/2015/07/svg-circle-loading/
                                               -->
                                        </svg>
                                    </div>
                                    <!--奖金-->
                                    <p class="match-prize">
                                        <span class="payfor">Play For</span>
                                        20 <i>BTC</i>
                                    </p>
                                    <!--价值-->
                                    <p class="match-usd">
                                        USD 14,776
                                    </p>
                                    <!--期号-->
                                    <p class="match-issue">
                                        NO.180327018
                                    </p>
                                    <!--进度-->
                                    <p class="match-process">
                                        Draw Process 100 / 120
                                    </p>
                                    <!--价格-->
                                    <p class="match-price">
                                        Ticket Price 0.01 BTC
                                    </p>
                                    <a href="javascript:;" class="match-btn waiting">
                                        Waiting ...
                                    </a>
                                </div>
                                <div class="match match-common ">
                                    <!-- hot bet-->
                                    <div class="icon-box hot bet">
                                        <i class="icon-hot">H</i>
                                        <i class="icon-youbet">You Bet</i>
                                    </div>
                                    <!--match-eth/match-btc-->
                                    <div class="match-img match-btc">
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="102" height="102">
                                            <defs>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="yellowColor1">
                                                    <stop offset="0%" stop-color="#e46b12"></stop>   <!--这个是终点-->
                                                    <stop offset="100%" stop-color="#fdc90c"></stop>
                                                </linearGradient>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="yellowColor2">
                                                    <stop offset="0%" stop-color="#fdc90c"></stop>
                                                    <stop offset="100%" stop-color="#f9c600"></stop>
                                                </linearGradient>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="blueColor1">
                                                    <stop offset="0%" stop-color="#62f7d9"></stop>
                                                    <stop offset="100%" stop-color="#5ed9eb"></stop>
                                                </linearGradient>
                                                <linearGradient x1="1" y1="0" x2="0" y2="0" id="blueColor2">
                                                    <stop offset="0%" stop-color="#53b8f0"></stop>
                                                    <stop offset="100%" stop-color="#5ed9eb"></stop>
                                                </linearGradient>
                                            </defs>
                                            <g transform="matrix(0,-1,1,0,0,102)">
                                                <circle cx="51" cy="51" r="47" stroke-width="8" stroke="rgba(255,255,255,0.05)" fill="transparent"/>
                                                <circle cx="51" cy="51" r="47" stroke="url(#blueColor1)" stroke-width="8" fill="transparent" stroke-linecap='round'  stroke-dasharray="0 296"/>  <!--左边 整圆-->
                                                <circle cx="51" cy="51" r="47" stroke="url(#blueColor2)" stroke-width="8" fill="transparent" stroke-linecap='round'  stroke-dasharray="0 296"/>
                                            </g>
                                            <!--
                                               stroke-dasharray   //2*3.14*47=296
                                               绘制虚线: 一个参数时： 表示一段虚线长度和每段虚线之间的间距
                                               两个参数或者多个参数时：一个表示长度，一个表示间距
                                               stroke-dashoffset: 偏移位置
                                               0% -> 296
                                               100% -> 296 296
                                               148/296
                                               form:https://www.zhangxinxu.com/wordpress/2015/07/svg-circle-loading/
                                               -->
                                        </svg>
                                    </div>
                                    <!--奖金-->
                                    <p class="match-prize">
                                        <span class="payfor">Play For</span>
                                        20 <i>BTC</i>
                                    </p>
                                    <!--价值-->
                                    <p class="match-usd">
                                        USD 14,776
                                    </p>
                                    <!--期号-->
                                    <p class="match-issue">
                                        NO.180327018
                                    </p>
                                    <!--进度-->
                                    <p class="match-process">
                                        Draw Process 100 / 120
                                    </p>
                                    <!--价格-->
                                    <p class="match-price">
                                        Ticket Price 0.01 BTC
                                    </p>
                                    <a href="javascript:;" class="match-btn">
                                        Bet Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="recent-bets">
                            <div class="title">
                                <div class="left">
                                    <p class="t1">Recent Bets</p>
                                </div>
                            </div>
                            <ul>
                                <li>
                                    <div class="email">
                                        test@gmail.com  test@gmail.com  test@gmail.com
                                    </div>
                                    <!--icon-eth/icon-btc-->
                                    <div class="amount icon-btc">
                                        0.0008
                                    </div>
                                    <div class="time">
                                        23:12
                                    </div>
                                </li>
                                <li>
                                    <div class="email">
                                        test@gmail.com  test@gmail.com  test@gmail.com
                                    </div>
                                    <!--icon-eth/icon-btc-->
                                    <div class="amount icon-btc">
                                        0.0008
                                    </div>
                                    <div class="time">
                                        23:12
                                    </div>
                                </li>
                                <li>
                                    <div class="email">
                                        test@gmail.com  test@gmail.com  test@gmail.com
                                    </div>
                                    <!--icon-eth/icon-btc-->
                                    <div class="amount icon-btc">
                                        0.0008
                                    </div>
                                    <div class="time">
                                        23:12
                                    </div>
                                </li>
                                <li>
                                    <div class="email">
                                        test@gmail.com  test@gmail.com  test@gmail.com
                                    </div>
                                    <!--icon-eth/icon-btc-->
                                    <div class="amount icon-btc">
                                        0.0008
                                    </div>
                                    <div class="time">
                                        23:12
                                    </div>
                                </li>
                                <li>
                                    <div class="email">
                                        test@gmail.com  test@gmail.com  test@gmail.com
                                    </div>
                                    <!--icon-eth/icon-btc-->
                                    <div class="amount icon-btc">
                                        0.0008
                                    </div>
                                    <div class="time">
                                        23:12
                                    </div>
                                </li>
                                <li>
                                    <div class="email">
                                        test@gmail.com  test@gmail.com  test@gmail.com
                                    </div>
                                    <!--icon-eth/icon-btc-->
                                    <div class="amount icon-btc">
                                        0.0008
                                    </div>
                                    <div class="time">
                                        23:12
                                    </div>
                                </li>
                                <li>
                                    <div class="email">
                                        test@gmail.com  test@gmail.com  test@gmail.com
                                    </div>
                                    <!--icon-eth/icon-btc-->
                                    <div class="amount icon-eth">
                                        0.0008
                                    </div>
                                    <div class="time">
                                        23:12
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 ">
                        <div class="title">
                            <div class="left">
                                <p class="t1">Draw History</p>
                                <p class="t2  hidden-xs hidden-sm">Fair Open，Draw in blockchain</p>
                                <a href="javascript:;" class="check">
                                    Check Transparency >
                                </a>
                            </div>
                            <div class="right">
                                <a href="javascript:;" class="btn-more ">
                                    More >
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <!--icon-eth/icon-btc  win-->
                        <div class="history icon-eth win">
                            <p class="history-prize">
                                0.0008 <i>BTC</i>
                            </p>
                            <p class="history-usd">
                                USD 14,776
                            </p>
                            <p class="history-issue">
                                NO.180327018
                            </p>
                            <p class="history-process">
                                Draw Process 100 / 120
                            </p>
                            <p class="history-price">
                                Ticket Price 0.01 BTC
                            </p>
                            <div class="history-result">
                                gm**@gmail.com gm**@gmail.comm**@gmail.com gm**@gmail.com
                            </div>
                        </div>
                        <p class="msg hidden-xs hidden-sm">
                            Fair Open，Draw in blockchain
                        </p>
                        <router-link :to="{path: '/check'}" class="btn-play">
                            <lang>Check Transparency</lang>
                        </router-link>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <div class="history icon-eth ">
                            <p class="history-prize">
                                0.0008 <i>BTC</i>
                            </p>
                            <p class="history-usd">
                                USD 14,776
                            </p>
                            <p class="history-issue">
                                NO.180327018
                            </p>
                            <p class="history-process">
                                Draw Process 100 / 120
                            </p>
                            <p class="history-price">
                                Ticket Price 0.01 BTC
                            </p>
                            <div class="history-result">
                                gm**@gmail.com gm**@gmail.comm**@gmail.com gm**@gmail.com
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <div class="history icon-btc ">
                            <p class="history-prize">
                                0.0008 <i>BTC</i>
                            </p>
                            <p class="history-usd">
                                USD 14,776
                            </p>
                            <p class="history-issue">
                                NO.180327018
                            </p>
                            <p class="history-process">
                                Draw Process 100 / 120
                            </p>
                            <p class="history-price">
                                Ticket Price 0.01 BTC
                            </p>
                            <div class="history-result">
                                gm**@gmail.com gm**@gmail.comm**@gmail.com gm**@gmail.com
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <div class="history icon-btc ">
                            <p class="history-prize">
                                0.0008 <i>BTC</i>
                            </p>
                            <p class="history-usd">
                                USD 14,776
                            </p>
                            <p class="history-issue">
                                NO.180327018
                            </p>
                            <p class="history-process">
                                Draw Process 100 / 120
                            </p>
                            <p class="history-price">
                                Ticket Price 0.01 BTC
                            </p>
                            <div class="history-result">
                                gm**@gmail.com gm**@gmail.comm**@gmail.com gm**@gmail.com
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


</script>

<style scoped lang="less" type="text/less">

</style>
