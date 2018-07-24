<template>
    <div class="page-check">
        <Header></Header>
        <div class="main">
            <!--查询框-->
            <div class="check-input">
                <div class="check-enter">
                    <h2>Check the results</h2>
                    <input type="text" placeholder="Enter the issue number">
                    <p>The issue number can be viewed in the draw record</p>
                </div>
                <a href="javascript:;" class="btn-verification">Verification</a>
                <div class="checkout-result">
                    <h3>Lottery result</h3>
                    <div class="result-view">
                        <!--lucky11-->
                        <ul class="hide">
                            <li>1</li>
                            <li>3</li>
                            <li>6</li>
                            <li>8</li>
                            <li>11</li>
                        </ul>
                        <!--LuckyCoin-->
                        <div>10033</div>
                    </div>
                </div>
            </div>
            <!--步骤说明-->
            <div class="check-explain">
                <div class="step-title">Check the results</div>
                <div class="step-view">
                    <ul>
                        <li>
                            User order<br/>
                            information
                        </li>
                        <li>
                            SHA256<br/>
                            operation
                        </li>
                        <li>
                            Merkel value
                        </li>
                        <li>
                            SHA256<br/>
                            operation
                        </li>
                        <li>
                            blockchain<br/>
                            hash value
                        </li>
                        <li>
                            SHA256<br/>
                            operation
                        </li>
                        <li>
                            Lottery<br/>
                            result
                        </li>
                    </ul>
                </div>
            </div>
            <!--输入前-->
            <p class="before-input hide">Enter the issue number to view the verification details</p>
            <!--输入后-->
            <div class="after-input">
                <div class="step-title">Lottery number generation process&nbsp;&nbsp;&nbsp;&nbsp;201704051234 </div>
                <!--用户信息-->
                <div class="item item1">
                    <a href="javascript:;" class="btn-copy">Copy user order</a>
                    <!--漂浮规则-->
                    <div class="rule-view hide">
                        <p>User order information</p>
                        <ul>
                            <li data-msg="(Issue)">
                                1000340
                            </li>
                            <li data-msg="(Play)">
                                1101
                            </li>
                            <li data-msg="(Number)">
                                1,3
                            </li>
                            <li data-msg="(Amount)">
                                0.0008
                            </li>
                            <li data-msg="(Currency)">
                                2001
                            </li>
                        </ul>
                    </div>
                    <div class="title-1">
                        User order information
                        <i class="icon-mark"></i>
                    </div>
                    <ul class="msg-items">
                        <li>1000340#1101#1#0.0008#2001</li>
                        <li>1000340#1101#1#0.0008#2001</li>
                        <li>1000340#1101#1#0.0008#2001</li>
                        <li>1000340#1101#1#0.0008#2001</li>
                        <li>1000340#1101#1#0.0008#2001</li>
                        <li>1000340#1101#1#0.0008#2001</li>
                        <li>1000340#1101#1#0.0008#2001</li>
                        <li>1000340#1101#1#0.0008#2001</li>
                        <li>1000340#1101#1#0.0008#2001</li>
                        <li>1000340#1101#1#0.0008#2001</li>
                        <li>1000340#1101#1#0.0008#2001</li>
                        <li>1000340#1101#1#0.0008#2001</li>
                        <li>1000340#1101#1#0.0008#2001</li>
                        <li>1000340#1101#1#0.0008#2001</li>
                        <li>1000340#1101#1#0.0008#2001</li>
                        <li>1000340#1101#1#0.0008#2001</li>
                        <li>1000340#1101#1#0.0008#2001</li>
                        <li>1000340#1101#1#0.0008#2001</li>
                        <li>1000340#1101#1#0.0008#2001</li>
                        <li>1000340#1101#1#0.0008#2001</li>
                        <li>1000340#1101#1#0.0008#2001</li>
                        <li>1000340#1101#1#0.0008#2001</li>
                        <li>1000340#1101#1#0.0008#2001</li>
                    </ul>
                </div>
                <div class="item item2">
                    <div class="title-1">
                        Merkel value
                    </div>
                    <p>
                        0000000000000000005867634c363284caf01ce5dd2d6e2a6c2ab26030f33493
                    </p>
                </div>
                <div class="item item3">
                    <div class="title-1">
                        Blockchain hash value
                    </div>
                    <div>
                        #568589
                    </div>
                    <a href="javascript:;">
                        0x458QAD412424994A8283A01D6CFeEB27Fc3bBe9C
                    </a>
                </div>
                <div class="item item4">
                    <div class="title-1">
                        Blockchain hash value
                    </div>
                    <!--11选5-->
                    <div class="result-lucky11">
                        <p class="p1">
                            1 step : 25 places after the draw Hash value, divided into 5 parts, respectively A1, A2, A3, A4, A5
                        </p>
                        <div class="hash">
                            0x458QAD412424994<span>A8283&nbsp;&nbsp;A01D6&nbsp;&nbsp;CFeEB&nbsp;&nbsp;27Fc3&nbsp;&nbsp;bBe9C</span>
                        </div>
                        <div class="icon-down"></div>
                        <ul class="hash-5">
                            <li class="abox">
                                <i>A1</i>
                                <span>A8283</span>
                            </li>
                            <li class="abox">
                                <i>A2</i>
                                <span>A8283</span>
                            </li>
                            <li class="abox">
                                <i>A3</i>
                                <span>A8283</span>
                            </li>
                            <li class="abox">
                                <i>A4</i>
                                <span>A8283</span>
                            </li>
                            <li class="abox">
                                <i>A5</i>
                                <span>A8283</span>
                            </li>
                        </ul>
                        <p class="p2">
                            2 step : For A1-A5, mod operations 11, 10, 9, 8, and 7, respectively, are obtained, and a 5-digit lottery number is obtained.
                        </p>
                        <ul class="mod-5 clearfix">
                            <li>
                                <div class="mod-top">
                                    <div class="abox">
                                        <i>A1</i>
                                        <span>A8283</span>
                                    </div>
                                    <p>
                                        MOD11+1=5
                                    </p>
                                </div>
                                <ul class="number-box">
                                    <li data-count="1">
                                        <div>1</div>
                                    </li>
                                    <li data-count="2">
                                        <div>2</div>
                                    </li>
                                    <li data-count="3">
                                        <div>3</div>
                                    </li>
                                    <li data-count="4">
                                        <div>4</div>
                                    </li>
                                    <li data-count="5" class="on">
                                        <div>5</div>
                                    </li>
                                    <li data-count="6">
                                        <div>6</div>
                                    </li>
                                    <li data-count="7">
                                        <div>7</div>
                                    </li>
                                    <li data-count="8">
                                        <div>8</div>
                                    </li>
                                    <li data-count="9">
                                        <div>9</div>
                                    </li>
                                    <li data-count="10">
                                        <div>10</div>
                                    </li>
                                    <li data-count="11">
                                        <div>11</div>
                                    </li>
                                </ul>
                                <p class="p3">
                                    The 5th digit is the lottery number
                                </p>
                            </li>
                            <li>
                                <div class="mod-top">
                                    <div class="abox">
                                        <i>A1</i>
                                        <span>A8283</span>
                                    </div>
                                    <p>
                                        MOD11+1=5
                                    </p>
                                </div>
                                <ul class="number-box">
                                    <li data-count="1">
                                        <div>1</div>
                                    </li>
                                    <li data-count="2">
                                        <div>2</div>
                                    </li>
                                    <li data-count="3">
                                        <div>3</div>
                                    </li>
                                    <li data-count="4">
                                        <div>4</div>
                                    </li>
                                    <li data-count="5" class="on">
                                        <div>5</div>
                                    </li>
                                    <li data-count="6">
                                        <div>6</div>
                                    </li>
                                    <li data-count="7">
                                        <div>7</div>
                                    </li>
                                    <li data-count="8">
                                        <div>8</div>
                                    </li>
                                    <li data-count="9">
                                        <div>9</div>
                                    </li>
                                    <li data-count="10">
                                        <div>10</div>
                                    </li>
                                    <li data-count="11">
                                        <div>11</div>
                                    </li>
                                </ul>
                                <p class="p3">
                                    The 5th digit is the lottery number
                                </p>
                            </li>
                            <li>
                                <div class="mod-top">
                                    <div class="abox">
                                        <i>A1</i>
                                        <span>A8283</span>
                                    </div>
                                    <p>
                                        MOD11+1=5
                                    </p>
                                </div>
                                <ul class="number-box">
                                    <li data-count="1">
                                        <div>1</div>
                                    </li>
                                    <li data-count="2">
                                        <div>2</div>
                                    </li>
                                    <li data-count="3">
                                        <div>3</div>
                                    </li>
                                    <li data-count="4">
                                        <div>4</div>
                                    </li>
                                    <li data-count="5" class="on">
                                        <div>5</div>
                                    </li>
                                    <li data-count="6">
                                        <div>6</div>
                                    </li>
                                    <li data-count="7">
                                        <div>7</div>
                                    </li>
                                    <li data-count="8">
                                        <div>8</div>
                                    </li>
                                    <li data-count="9">
                                        <div>9</div>
                                    </li>
                                    <li data-count="10">
                                        <div>10</div>
                                    </li>
                                    <li data-count="11">
                                        <div>11</div>
                                    </li>
                                </ul>
                                <p class="p3">
                                    The 5th digit is the lottery number
                                </p>
                            </li>
                            <li>
                                <div class="mod-top">
                                    <div class="abox">
                                        <i>A1</i>
                                        <span>A8283</span>
                                    </div>
                                    <p>
                                        MOD11+1=5
                                    </p>
                                </div>
                                <ul class="number-box">
                                    <li data-count="1">
                                        <div>1</div>
                                    </li>
                                    <li data-count="2">
                                        <div>2</div>
                                    </li>
                                    <li data-count="3">
                                        <div>3</div>
                                    </li>
                                    <li data-count="4">
                                        <div>4</div>
                                    </li>
                                    <li data-count="5" class="on">
                                        <div>5</div>
                                    </li>
                                    <li data-count="6">
                                        <div>6</div>
                                    </li>
                                    <li data-count="7">
                                        <div>7</div>
                                    </li>
                                    <li data-count="8">
                                        <div>8</div>
                                    </li>
                                    <li data-count="9">
                                        <div>9</div>
                                    </li>
                                    <li data-count="10">
                                        <div>10</div>
                                    </li>
                                    <li data-count="11">
                                        <div>11</div>
                                    </li>
                                </ul>
                                <p class="p3">
                                    The 5th digit is the lottery number
                                </p>
                            </li>
                            <li>
                                <div class="mod-top">
                                    <div class="abox">
                                        <i>A1</i>
                                        <span>A8283</span>
                                    </div>
                                    <p>
                                        MOD11+1=5
                                    </p>
                                </div>
                                <ul class="number-box">
                                    <li data-count="1">
                                        <div>1</div>
                                    </li>
                                    <li data-count="2">
                                        <div>2</div>
                                    </li>
                                    <li data-count="3">
                                        <div>3</div>
                                    </li>
                                    <li data-count="4">
                                        <div>4</div>
                                    </li>
                                    <li data-count="5" class="on">
                                        <div>5</div>
                                    </li>
                                    <li data-count="6">
                                        <div>6</div>
                                    </li>
                                    <li data-count="7">
                                        <div>7</div>
                                    </li>
                                    <li data-count="8">
                                        <div>8</div>
                                    </li>
                                    <li data-count="9">
                                        <div>9</div>
                                    </li>
                                    <li data-count="10">
                                        <div>10</div>
                                    </li>
                                    <li data-count="11">
                                        <div>11</div>
                                    </li>
                                </ul>
                                <p class="p3">
                                    The 5th digit is the lottery number
                                </p>
                            </li>
                        </ul>
                        <div class="finally-result">
                            <p class="p4">
                                In summary, the lottery number
                            </p>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                                <li>5</li>
                            </ul>
                        </div>

                    </div>
                    <!--一元夺币-->
                    <div class="result-onecoin hide">
                        <p class="p1">
                            1 step : to take the 6 digits after the bonus Hash value and convert the hexadecimal to decimal.
                        </p>
                        <div class="address">0x458QAD412424994A8283A01D6CFeEB27F<i class="special">c3bBe9C</i></div>
                        <p class="p2">
                            2 step : For the above results, divided by the total number of the current period 49, the result is +10000, which is the result of the lottery.
                        </p>
                        <div>
                            <i class="special">13459</i>mod 49 = 274 x 49 + 33
                        </div>
                        <div>
                            33 + 10000 = <i class="special">10033</i>
                        </div>
                        <p class="p3">
                            In summary, the lottery number
                        </p>
                        <div class="finally-result">
                            10033
                        </div>
                    </div>
                </div>
                <div class="relate-msg">
                    <p>Reference Information</p>
                    <p>
                        1. What is a <a href="javascript:;">hash value</a> And <a href="javascript:;">online hash calculations</a>?
                    </p>
                    <p>
                        2. What is the <a href="javascript:;">Merkel value</a>?
                    </p>
                    <p>
                        3. Ethereum transaction inquiry entrance.
                    </p>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '~components/Header.vue'
    import Footer from '~components/Footer.vue'
    import BreadCrumbs from '~/components/BreadCrumbs.vue'
    export default {
        data () {
            return {}
        },
        watch: {},
        methods: {},
        computed: {},
        components: {
            Header, Footer, BreadCrumbs
        },
        mounted () {

        }
    }
</script>
<style scoped lang="less">

    .page-check{
        background: #242240;
    }
    .main{
        width: 1190px;
        margin: 0 auto;
        background: #242240;
    }

    .step-title{
        line-height: 84px;
        font-size: 20px;
        color: #fff;
        font-weight: bold;
    }
    .check-input{
        width: 1190px;
        height: 385px;
        overflow: hidden;
        margin: 0 auto;
        background: url("../../assets/img/check/bg-check.png") no-repeat center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        .check-enter{
            h2{
                line-height: 82px;
                font-size: 30px;
                font-weight: bold;
                color: #fff;
            }
            input{
                width: 374px;
                height: 52px;
                overflow: hidden;
                outline: none;
                border: 1px solid #6a89cc;
                border-radius: 6px;
                background: #242240;
                line-height: 52px;
                text-indent: 30px;
                font-size: 16px;
                color: #788ca3;
                //placeholdcolor
            }
            p{
                padding-bottom: 18px;
                line-height: 64px;
                font-size: 14px;
                color: #788ca3;
            }
        }
        .btn-verification{
            display: block;
            width: 150px;
            height: 60px;
            overflow: hidden;
            margin: 0 67px 0 43px;
            text-align: center;
            line-height: 60px;
            background: #fd9644;
            border-radius: 6px;
            font-size: 20px;
            color: #fff;
            font-weight: bold;
            transition: all 0.2s;
            &:hover{
                filter: brightness(1.1);
            }
        }
        .checkout-result{
            padding: 7px 40px 68px;
            border: 1px solid #6a89cc;
            border-radius: 6px;
            background: #242240;
            h3{
                line-height: 80px;
                font-family: sans-eb;
                font-size: 20px;
                color: #fff;
                font-weight: bold;
            }
            .result-view{
                width: 340px;
                height: 52px;
                overflow: hidden;
                line-height: 52px;
                border-bottom: 1px solid #fd9644;
                ul{
                    display: flex;
                    justify-content: center;
                }
                li{
                    width: 38px;
                    height: 38px;
                    overflow: hidden;
                    margin: 0 6px;
                    border-radius: 50%;
                    background: #fd9644;
                    text-align: center;
                    line-height: 38px;
                    font-size: 20px;
                    font-weight: bold;
                    color: #fff;
                }
                div{
                    text-align: center;
                    font-size: 20px;
                    font-weight: bold;
                    color: #fd9644;
                }
            }
        }
    }
    .check-explain{
        margin-top: 23px;
        .step-title{
            margin-bottom:5px;
        }
        .step-view{
            position: relative;
            width: 1021px;
            height: 204px;
            overflow: hidden;
            margin: 0 auto;
        }
        ul{
            position: absolute;
            width: 100%;
            height: 248px;
            left: 0;
            top: -44px;
            background: url("../../assets/img/check/bg-check-explain.png") no-repeat center bottom;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        li{
            flex: 1;
            line-height: 24px;
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
        }
        li:nth-child(2n){
            color: #6a89cc;
        }
    }
    .before-input{
        line-height: 54px;
        font-size: 14px;
        color: #788ca3;
    }
    .after-input{
        margin-top: 38px;
        .item{
            position: relative;
            padding: 0 50px;
            background: #1d1c3a;
            font-size: 16px;
            color: #ffffff;
            .title-1{
                overflow: hidden;
                font-weight: bold;
                color: #6a89cc;
            }
            &+.item{
                margin-top: 32px;
                &::before{
                    content: '';
                    position: absolute;
                    left: 50px;
                    top: -46px;
                    width: 23px;
                    height: 58px;
                    overflow: hidden;
                    background: url("../../assets/img/check/icon-and.png") no-repeat center;
                }

            }
        }
        .item1{
            padding-top: 14px;
            padding-bottom: 25px;
            .title-1{
                position: relative;
                float: left;
                padding-right: 33px;
                line-height: 51px;
            }
            .icon-mark{
                position: absolute;
                top: (51-16)/2px;
                right: 0;
                display: block;
                width: 16px;
                height: 16px;
                overflow: hidden;
                background: url("../../assets/img/check/icon-mark.png") no-repeat center;
                cursor: pointer;
            }
            .btn-copy{
                display: block;
                float: right;
                line-height: 51px;
                color: #6a89cc;
                text-decoration: underline;
                &:hover{
                    filter: brightness(1.3);
                    color: #6a89cc;
                }
            }
            .msg-items{
                clear: both;
                overflow: hidden;
                max-height: 123px;
                overflow: auto;
                li{
                    float: left;
                    margin-right: 20px;
                    line-height: 41px;
                }
            }
        }
        .item2{
            padding-top: 38px;
            padding-bottom: 46px;
            line-height: 41px;
        }
        .item3{
            padding-top: 37px;
            padding-bottom: 36px;
            line-height: 37px;
        }
        .item4{
            padding-top: 27px;
            p{
                font-size: 14px;
                color: #6a89cc;
            }
            .title-1{
                line-height: 45px;
            }
        }
        .abox{
            width: 128px;
            height: 28px;
            overflow: hidden;
            line-height: 28px;
            overflow: hidden;
            border: 2px solid #6a89cc;
            background: #6a89cc;
            border-radius: 14px;
            text-align: center;
            i{
                float: left;
                width: 42px;
                font-weight: bold;
            }
            span{
                display: block;
                height: 28px;
                overflow: hidden;
                background: #1d1c3a;
            }
        }
    }
    .result-lucky11{
        padding-bottom: 56px;
        p{
            &.p1{
                line-height: 44px;
            }
            &.p2{
                margin-top: 30px;
                line-height: 66px;
            }
            &.p3{
                margin-top: 27px;
                line-height: 40px;
                text-align: center;
                color: #788ca3;
            }
            &.p4{
                line-height: 61px;
                font-size: 16px;
            }
        }
        .hash{
            line-height: 34px;
            span{
                margin-left: 12px;
                text-decoration: underline;
                font-weight: bold;
                i+i{
                    margin-left: 12px;
                }
            }
        }
        .icon-down{
            width: 18px;
            height: 19px;
            overflow: hidden;
            background: url("../../assets/img/check/icon-down.png") no-repeat center;
            margin: 7px 0 13px 310px;

        }
        .hash-5{
            overflow: hidden;
            li{
                float: left;
                margin-right: 34px;
            }
        }
        .mod-5{
            margin:17px 0 0 0;
            >li{
                position: relative;
                width: 428px;
                float: left;
                margin-right: 50px;
                border: 2px dashed #788ca3;
                border-radius: 6px;
                margin-bottom: 40px;
                &:last-child{
                    margin-bottom: 0;
                }
            }
            .mod-top{
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: -16px;
                background: #1d1c3a;
                display: flex;
                justify-content: start;
                align-items: center;
                padding: 0 10px;
                .abox{
                    margin-right: 10px;
                }
            }
            .number-box{
                display: flex;
                justify-content: center;
                margin-top: 34px;
                li{
                    margin: 0 2px;
                    div{
                        width: 30px;
                        height: 30px;
                        overflow: hidden;
                        border-radius: 50%;
                        background: #383e5a;
                        text-align: center;
                        line-height: 30px;
                    }
                    &::before{
                        content: attr(data-count);
                        display: block;
                        width: 30px;
                        line-height: 36px;
                        text-align: center;
                        color: #788ca3;
                    }
                    &.on{
                        div{
                            background: #6a89cc;
                            font-weight: bold;
                        }
                        &::before{
                            color: #fff;
                            font-weight: bold;
                        }
                    }
                }

            }
        }
        .finally-result{
            margin-top: 24px;
            ul{
                overflow: hidden;
            }
            li{
                float: left;
                margin-right: 8px;
                width: 30px;
                height: 30px;
                overflow: hidden;
                background: #fd9644;
                border-radius: 50%;
                text-align: center;
                line-height: 30px;
                font-weight: bold;

            }
        }
    }
    .result-onecoin{
        padding-bottom: 52px;
        p{
            &.p1{
                line-height: 44px;
            }
            &.p2{
                line-height: 44px;
                margin-top: 17px;
            }
            &.p3{
                line-height: 35px;
                margin-top: 30px;
            }
        }
        div{
            line-height: 35px;
        }
        i.special{
            display: inline-block;
            height: 35px;
            line-height: 35px;
            padding: 0 6px;
            font-weight: bold;
            background: #3b3a65;
            border-radius: 4px;
        }
        .finally-result{
            line-height: 38px;
            font-size: 20px;
            color: #fd9644;
            font-weight: bold;
        }
    }
    .relate-msg{
        padding: 36px 0 190px 0;
        line-height: 24px;
        color: #6a89cc;
        background: #242240;
        a{
            text-decoration: underline;
            &:hover{
                filter: brightness(1.3);
                color: #6a89cc;
            }
        }
    }
    /*漂浮规则*/
    .rule-view{
        position: absolute;
        top: -160px;
        left: 218px;
        padding: 4px 26px 70px;
        background: #ffffff;
        border-radius: 6px;
        p{
            line-height: 68px;
            color: #788ca3;
        }
        ul{
            display: flex;
            justify-content: center;
            li{
                position: relative;
                line-height: 20px;
                border-bottom: 2px solid #bdc9e6;
                font-size: 20px;
                color: #6a89cc;
                font-weight: bold;
                &::after{
                    content: attr(data-msg);
                    position: absolute;
                    left: 50%;
                    top: 22px;
                    transform: translateX(-50%);
                    line-height: 24px;
                    font-size: 14px;
                    font-weight: normal;
                }
            }
            li+li{
                margin-left: 33px;
                &::before{
                    content: '#';
                    width: 33px;
                    text-align: center;
                    position: absolute;
                    left: -33px;
                    top: 0;
                }
            }
        }
        &::after{
            content: '';
            display: block;
            position: absolute;
            left: 30px;
            bottom: -15px;
            width: 0;
            height: 0;
            border-bottom: none;
            border-left: 11.5px solid transparent;
            border-right: 11.5px solid transparent;
            border-top: 15px solid #fff;
        }
    }
</style>
