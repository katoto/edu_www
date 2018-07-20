<template>
    <!--fix 奖池奖 -->
    <div id="nav" class="nav" :class="{fix:navFix}">
        <div class="nav-main">
            <h2 class="logo11to5">
                <lang>Lucky11</lang>
            </h2>
            <div class="lastdraw clearfix" @mouseover="isShowHistoryCode = true" @mouseout="isShowHistoryCode = false">
                <p>
                    <lang>Draw History</lang>
                </p>
                <span>NO.{{ last_expectid }}</span>
                <i class="arrow"></i>
                <ul id="js_lastDraw" class="last-numbox">
                    <li v-for="(item, index) in liveOpenCode" class="flipInY" :key="index">{{ item }}</li>
                </ul>
                <div class="last-select slide" :class="{ 'slide-show': isShowHistoryCode }">
                    <ul class="date-box ">
                        <li v-for="(item, index) in historyCodeFilter(historyCode)" :key="index">
                            <span>{{ item.expectid }}</span>
                            <ul class="num-box">
                                <li v-for="(num, numIndex) in item.opencode.split(',')" :key="numIndex">{{ num }}</li>
                            </ul>
                        </li>
                    </ul>
                    <router-link :to="{path: '/drawNumber'}">
                        <a href="javascript:;" class="more" target="_blank">
                            <lang>More >></lang>
                        </a>
                    </router-link>
                </div>
            </div>
            <!--changeDead-->
            <div class="deadline">
                <div class="deadline-box" :class="{'deadlineMove': expect_move }">
                    <p>
                        <lang>Time Left</lang>
                    </p>
                    <!--blinking  id="js_currExpectid"  -->
                    <span :class="{'blinking':expect_blinking}">No.{{ currExpectId }}</span>
                    <i :class="{'jump5': parseFloat( timeLeft )<= 10 }">{{ timeLeft }}’</i>
                </div>
            </div>
            <p class="jackpot2">
                <!-- 奖池奖 。。 -->
                <!--<span>-->
                <!--<lang>JACKPOT</lang>&nbsp;&nbsp;-->
                <!--</span>-->
                <i id="js_jackpotM" v-if="poolAmount">{{ poolAmount[currBalance.cointype] }}</i>
                <span>{{ formateCoinType (currBalance.cointype) }}</span>
            </p>
            <p>
                <span class="jp_btn" v-if="!isSuperPick" @click="superInPage">Go</span>
                <span class="jp_btn" v-else @click="superOutPage">Back</span>
            </p>
        </div>
    </div>
</template>

<script>
    import {
        formateCoinType
    } from '~common/util'

    export default {
        data () {
            return {
                tes: false,
                isShowHistoryCode: false,
                isSuperPick: false
            }
        },
        watch: {
            isShowHistoryCode: function (val) {
                if (val) {
                    this.getHistoryDraw()
                }
            }
        },
        methods: {
            formateCoinType,
            superInPage () {
                /* 执行到父组件 */
                this.$emit('superChange', 'superIn')
            },
            superOutPage () {
                /* 执行到父组件 */
                this.$emit('superChange', 'superOut')
            },
            btnState (msg) {
                /* 父调用 */
                this.isSuperPick = !!msg
            },
            historyCodeFilter (historyCode) {
                let isLastCode = false
                let lastIndex = 0
                let arr = []
                historyCode.map((item, index) => {
                    if (item.expectid === this.last_expectid) {
                        isLastCode = true
                        lastIndex = index
                    }
                    if (isLastCode && index > lastIndex && arr.length < 7) {
                        arr.push(item)
                    }
                })
                return isLastCode ? arr : historyCode.slice(0, 7)
            },
            getHistoryDraw () {
                this.$store.dispatch('cs_1105/updateHistoryDraw')
            }
        },
        computed: {
            poolAmount () {
                return this.$store.state.cs_1105.poolAmount
            },
            liveOpenCode () {
                return this.$store.state.cs_1105.liveOpenCode
            },
            navFix () {
                return this.$store.state.cs_1105.navFix
            },
            timeLeft () {
                return this.$store.state.cs_1105.timeLeft
            },
            expect_blinking () {
                return this.$store.state.cs_1105.expect_blinking
            },
            expect_move () {
                return this.$store.state.cs_1105.expect_move
            },
            currExpectId () {
                return this.$store.state.cs_1105.currExpectId
            },
            last_expectid () {
                return this.$store.state.cs_1105.last_expectid
            },
            historyCode () {
                return this.$store.state.cs_1105.historyCode
            },
            currBalance () {
                return this.$store.state.currBalance
            },
        },
        async mounted () {
            this.getHistoryDraw()
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../styles/lib-mixins.less";

    .nav {
        position: relative;
        z-index: 7;
        width: 100%;
        padding: 15px 0;
        height: 60px;
        line-height: 60px;
        background: linear-gradient(to right, #4b6584, #655aae, #545f94);
        color: #fff;
        transition: all 0.2s;
    }
    .superActive .nav{
        /*background: linear-gradient(to right, #403124, #81663a, #4d3b28);*/
        background: linear-gradient(to right, #463524, #81653a, #463525);
    }
    .superActive .nav.fix{
        background: #80643b
    }
    .nav.fix {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 90;
        background: #3d3086;
    }

    .nav-main {
        position: relative;
        width: 1190px;
        margin: 0 auto;
        .clearfix();
    }

    .logo11to5 {
        float: left;
        font: 24px/60px sans-eb;
        color: #fff;
    }

    .deadline {
        position: absolute;
        left: 115px;
        top: 0;
        width: 170px;
        height: 60px;
        line-height: 18px;
        font-size: 14px;
        overflow: hidden;
        i {
            position: absolute;
            top: 0;
            left: 115px;
            line-height: 60px;
            font-size: 36px;
            font-family: sans-eb;
            transform-origin: center;
        }
        .deadline-box {
            box-sizing: border-box;
            position: absolute;
            left: 0;
            top: 0;
            padding: 12px 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    }

    //往期
    .lastdraw {
        float: right;
        position: relative;
        width: 300px;
        height: 60px;
        cursor: pointer;
        color: #263648;
        .transition();
        > span,
        > p {
            display: block;
            position: absolute;
            width: 104px;
            height: 18px;
            overflow: hidden;
            line-height: 14px;
            text-align: left;
            font-size: 14px;
            color: #fff;
            text-indent: 10px;
        }
        > span {
            font-size: 12px;
            top: 30px;
        }
        > p {
            top: 13px;
        }
        .last-numbox {
            float: left;
            height: 100%;
            margin: 0 0 0 115px;
            li {
                float: left;
                width: 28px;
                height: 28px;
                overflow: hidden;
                margin-top: 16px;
                border-radius: 50%;
                text-align: center;
                line-height: 28px;
                background: #fff;
                font-size: 16px;
                font-weight: bold;
            }
            li + li {
                margin-left: 2px;
            }
        }
        .arrow {
            display: block;
            position: absolute;
            right: 10px;
            top: 26px;
            width: 13px;
            height: 8px;
            .transition();
            background-image: url("../../assets/slice/arrow-down-fff.png");
        }
        &:hover {
            background: #34287b;
            .arrow {
                transform: rotate(180deg);
            }
        }
        //新增往期
        .last-select {
            position: absolute;
            left: 0;
            top: 60px;
            width: 100%;
            z-index: 9;
            background: #fff;
            font-size: 14px;
            color: #778ca3;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            overflow: hidden;
            .box-shadow();
        }
        .date-box {
            > li {
                span {
                    float: left;
                    width: 102px;
                    text-align: center;
                }
                height: 40px;
                line-height: 40px;
                overflow: hidden;
                border-bottom: 1px solid #ced6e0;
                color: #263648;
                &:hover {
                    background: #eef1f9;
                    span {
                        color: #263648;
                    }
                    .num-box {
                        li {
                            background: #fff;
                        }
                    }
                }
            }
        }
        .num-box {
            float: left;
            margin-left: 12px;
            margin-top: 6px;
            .clearfix();
            li {
                float: left;
                width: 28px;
                height: 28px;
                overflow: hidden;
                border-radius: 50%;
                background: #eef1f9;
                text-align: center;
                line-height: 28px;
                font-weight: bold;
                color: #263648;
            }
            li + li {
                margin: 0 0 0 2px;
            }
        }
        .more {
            display: block;
            width: 100%;
            height: 40px;
            text-align: center;
            line-height: 40px;
            font-size: 14px;
            color: #6a89cc;
            &:hover {
                background: #eef1f9;
                color: #263648;
            }
        }
    }

    .jump5 {
        animation: fontSize 1s forwards infinite;
    }

    @keyframes fontSize {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        80% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(1.5);
            opacity: 0;
        }
    }

    .jp_btn{
        display: inline-block;
        width: 80px;
        height: 32px;
        text-align: center;
        color: #f4ba25;
        line-height: 32px;
        background-color: #544898;
        border-radius: 5px;
        margin-left: 26px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 700;
    }
    .jackpot2 {
        float: left;
        margin-left: 200px;
        font-family: sans-eb;
        color: #f6b543;
        /** {*/
            /*float: left;*/
        /*}*/
        span {
            font-size: 20px;
        }
        i {
            position: relative;
            padding-left: 26px;
            font-size: 36px;
            &::before {
                /*content: '';*/
                /*position: absolute;*/
                /*left:0;*/
                /*top:20px;*/
                /*background-image:url("../../assets/slice/logo-btc.png");*/
                /*width: 20px;*/
                /*height: 20px;*/
            }
            &::after {
                content: '';
                position: absolute;
                top:-14px;
                right: -64px;
                background-image:url("../../assets/img/lucky11/icon-jackpot.png");
                width: 70px;
                height: 21px;
            }
        }
    }
    .superActive .jp_btn{
        background-color: #6f552d;
    }
    .deadlineMove {
        animation: deadlineMove 1.3s;
    }

    @keyframes deadlineMove {
        0% {
            transform: translateY(0);
        }
        35% {
            opacity: 0;
            transform: translateY(60px);
        }
        65% {
            opacity: 0;
            transform: translateY(-60px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .blinking {
        animation: blinking 0.7s;
    }

    @keyframes blinking {
        0% {
            opacity: 1;
        }
        25% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        75% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
