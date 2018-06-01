<template>
    <!--fix 奖池奖 -->
    <div id="nav" class="nav" :class="{fix:navFix}" >
        <div class="nav-main">
            <h2 class="logo11to5">
                Lucky11
            </h2>
            <p class="jackpot hide">
                <span>JACKPOT&nbsp;&nbsp;</span>
                <i id="js_jackpotM">0</i>
            </p>
            <div class="lastdraw js_lastdraw clearfix">
                <p class="js_lastDraw-new">Lastest draw</p>
                <span id="js_lastDrawNumber">NO. </span>
                <i class="opening hide js_opening">Waiting</i>
                <i class="arrow"></i>
                <ul id="js_lastDraw" class="last-numbox js_lastDraw">
                    <!--<li class="flipInY">2</li>-->
                </ul>
                <script type="text/tmpl" id="js_tmpl_lastDraw">
                    <li>
                    <span>{$expectId}</span>
                    <ul class="num-box">
                    {$lastDrawDom}
                    </ul>
                    </li>

                </script>
                <div class="last-select js_last-select ">
                    <ul class="date-box js_date-box">
                    </ul>
                    <a href="./reward.html" class="more" target="_blank">More >></a>
                </div>
            </div>
            <!--changeDead-->
            <div class="deadline">
                <div class="deadline-box">
                    <p>Time left</p>
                    <!--blinking-->
                    <span id="js_currExpectid" class=""></span>
                    <i id="countTime"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                tes: false
            }
        },
        watch: {},
        methods: {

        },
        computed: {
            navFix () {
                return this.$store.state.cs_1105.navFix
            }
        },
        mounted () {

        }
    }
</script>
<style scoped lang="less">
    @import "../styles/lib-mixins.less";
    .nav{
        position: relative;
        z-index:3;
        width:100%;
        height:60px;
        line-height:60px;
        //overflow: hidden;
        background: #463895;
        color: #fff;
        .transition();
    }
    .nav.fix{
        position: fixed;
        left:0;
        top:0;
        z-index:10;
        background: #3d3086 ;
    }
    .nav-main{
        position: relative;
        width:1190px;
        margin:0 auto;
        .clearfix();
    }
    .logo11to5{
        float: left;
        font:24px/60px sans-eb;
        color: #ffffff;
    }
    .deadline{
        position: absolute;
        left:115px;
        top:0;
        width:165px;
        height:60px;
        line-height:18px;
        font-size:14px;
        overflow: hidden;
        i{
            position: absolute;
            top:0;
            left:115px;
            line-height:60px;
            font-size:36px;
            font-family: sans-eb;
            transform-origin: center;
        }
        .deadline-box{
            box-sizing: border-box;
            position: absolute;
            left:0;
            top:0;
            padding:12px 0;
            width:100%;
            height:100%;
            overflow: hidden;
        }
    }
    //往期
    .lastdraw{
        float: right;
        position: relative;
        width:300px;
        height:60px;
        cursor: pointer;
        color: #263648;
        .transition();
        >span,>p{
            display: block;
            position: absolute;
            width:104px;
            height:18px;
            overflow: hidden;
            line-height:14px;
            text-align: left;
            font-size:14px;
            color: #fff;
            text-indent: 10px;
        }
        >span{
            font-size:12px;
            top:30px;
        }
        >p{
            top:13px;
        }
        .last-numbox{
            float: left;
            height:100%;
            margin:0 0 0 115px;
            li{
                float: left;
                width:28px;
                height:28px;
                overflow: hidden;
                margin-top:16px;
                border-radius:50%;
                text-align: center;
                line-height:28px;
                background: #fff;
                font-size:16px;
                font-weight:bold;
            }
            li+li{
                margin-left:2px;
            }
        }
        .arrow{
            display: block;
            position: absolute;
            right:10px;
            top:26px;
            width: 13px;
            height: 8px;
            .transition();
            background-image: url(" ../assets/slice/arrow-down-fff.png");
        }
        &:hover{
            background: #34287b;
            .arrow{
                transform: rotate(180deg);
            }
        }
        //新增往期
        .last-select{
            display: none;
            position: absolute;
            left:0;
            top:60px;
            width:100%;
            z-index:9;
            background: #fff;
            font-size:14px;
            color: #778ca3;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            overflow: hidden;
            .box-shadow();
        }
        .date-box{
            >li{
                span{
                    float: left;
                    width:102px;
                    text-align: center;
                }
                height:40px;
                line-height:40px;
                overflow: hidden;
                border-bottom:1px solid #ced6e0;
                color: #263648;
                &:hover{
                    background: #eef1f9;
                    span{
                        color: #263648;
                    }
                    .num-box{
                        li{
                            background: #fff;
                        }
                    }
                }
            }
        }
        .num-box{
            float: left;
            margin-left:12px;
            margin-top:6px;
            .clearfix();
            li{
                float: left;
                width:28px;
                height:28px;
                overflow: hidden;
                border-radius:50%;
                background: #eef1f9;
                text-align: center;
                line-height:28px;
                font-weight:bold;
                color: #263648;
            }
            li+li{
                margin:0 0 0 2px;
            }
        }
        .more{
            display: block;
            width:100%;
            height:40px;
            text-align: center;
            line-height:40px;
            font-size:14px;
            color: #6a89cc;
            &:hover{
                background: #eef1f9;
                color: #263648;
            }
        }
    }
</style>
