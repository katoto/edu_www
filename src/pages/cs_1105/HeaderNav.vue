<template>
    <div>
        <div id="nav" class="nav visible-lg" :class="{fix:navFix}" @click="initPop">
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
                        <router-link :to="{path: '/drawNumber'}"  class="more" target="_blank">
                            <lang>More >></lang>
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
                    <i id="js_jackpotM" v-if="poolAmount">{{ poolAmount[currBalance.cointype] || 0 }}</i>
                    <span>{{ formateCoinType (currBalance.cointype) }}</span>
                </p>
                <p>
                    <span class="jp_btn" v-if="!isSuperPick" @click="superInPage">
                        <lang>Win Jackpot</lang>
                    </span>
                    <span class="jp_btn" v-else @click="superOutPage"><lang>Back</lang></span>
                </p>
            </div>
        </div>
        <div class="h5nav hidden-lg" :class="{fix:navFix}"  @click="initPop">
            <div class="nav-main clearfix">
                <h2 class="logo">
                    <img src="@/assets/img/lucky11/logo-lucky11.png" alt="logo">
                </h2>
                <div class="deadline " :class="{'deadlineMove': expect_move }">
                        <p>
                            <lang>Time Left</lang>&nbsp;<i :class="{'jump5': parseFloat( timeLeft )<= 10 }">{{ timeLeft }}’</i>
                        </p>
                        <!--blinking  id="js_currExpectid"  -->
                        <p :class="{'blinking':expect_blinking}">No.{{ currExpectId }}</p>
                </div>
                <div class="jackpot2" v-if="!isSuperPick" @click="superInPage">
                    <p class="tips">
                        <lang>Win Jackpot</lang>
                    </p>
                    <p class="amount">
                        {{ poolAmount[currBalance.cointype] || 0 }} {{ formateCoinType (currBalance.cointype) }}
                    </p>
                </div>
                <div class="jackpot2" v-else @click="superOutPage">
                    <p class="tips">
                        <lang>Back</lang>
                    </p>
                    <p class="amount">
                        {{ poolAmount[currBalance.cointype] || 0 }} {{ formateCoinType (currBalance.cointype) }}
                    </p>
                </div>
            </div>
            <div class="pop-mask" @click="isShowHistoryCode=false" style="background: rgba(0, 0, 0, 0.8)" :class="[isShowHistoryCode?'show':'']"></div>
            <div class="lastdraw clearfix"  :class="{zIndex99:isShowHistoryCode}">
                <div class="msg">
                    <p class="tips">
                        <lang>Draw History</lang>
                    </p>
                    <p class="expectid">
                        NO.{{ last_expectid }}
                    </p>
                </div>
                <ul class="last-numbox ">
                    <li v-for="(item, index) in liveOpenCode" class="flipInY" :key="index">{{ item }}</li>
                </ul>
                <i class="arrow" :class="[isShowHistoryCode?'on':'']" @click="isShowHistoryCode = !isShowHistoryCode"></i>
                <div class="last-select slide " :class="{ 'slide-show': isShowHistoryCode }">
                    <ul class="date-box ">
                        <li v-for="(item, index) in historyCodeFilter(historyCode)" :key="index">
                            <p>NO.{{ item.expectid }}</p>
                            <ul class="num-box">
                                <li v-for="(num, numIndex) in item.opencode.split(',')" :key="numIndex">{{ num }}</li>
                            </ul>
                        </li>
                    </ul>
                    <router-link :to="{path: '/drawNumber'}" class="more" target="_blank">
                        <lang>More >></lang>
                    </router-link>
                </div>
            </div>
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
            initPop () {
                /* head 弹窗 */
                this.$store.commit('initHeadState', new Date().getTime())
            },
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
            }
        },
        async mounted () {
            this.getHistoryDraw()
        }
    }
</script>
<style scoped lang="less" type="text/less">
    @import "../../styles/lib-mixins.less";

    .deadlineMove {
        animation: deadlineMove 1.3s;
    }
    .jump5 {
        animation: fontSize 1s forwards infinite;
    }
    .blinking {
        animation: blinking 0.7s;
    }

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
        &.fix{
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

        .jp_btn{
            display: inline-block;
            padding: 0 20px;
            height: 32px;
            text-align: center;
            color: #f4ba25;
            line-height: 32px;
            background-color: #544898;
            border-radius: 6px;
            margin-left: 26px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            transition: all 0.2s;
            &:hover{
                background: #443982;
            }
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
            }
        }
    }

    .h5nav{
        padding: 34/2px 0 0 0;
        background: #2e2270;
        color: #fff;
        .nav-main{
            width: percentage(710/750);
            margin: 0 auto;
        }
        .logo{
            float: left;
            margin-right: 10px;
            width: 112/2px;
            height: 92/2px;
            overflow: hidden;
            img{
                width: 112/2px;
                height: 92/2px;
            }
        }
        .deadline{
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            float: left;
            width: 120px;
            height: 92/2px;
            line-height: 35/2px;
            font-size: 24/2px;
            .deadline-box{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
            }
            i{
                display: inline-block;
                font-size: 50/2px;
                font-weight: bold;
            }
        }
        .jackpot2{
            float: right;
            width:212/2px;
            height:85/2px;
            border: 1px solid #ff8400;
            text-align: center;
            border-radius:6px;
            color: #ff8400;
            font-weight: bold;
            display: flex;
            flex-direction: column;
            justify-content: center;
            cursor: pointer;
            .tips{
                line-height: 15px;
                font-size: 22/2px;
            }
            .amount{
                line-height: 19px;
                font-size: 30/2px;
            }
        }
        .lastdraw{
            position: relative;
            z-index: 8;
            box-sizing: border-box;
            width: percentage(710/750);
            padding: 0 12px;
            height: 80/2px;
            display: flex;
            align-items: center;
            margin: 22px auto 0;
            background: #473c8f;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
            .msg{
                margin-right: 25px;
                color: rgba(255,255,255,0.6);
                .tips{
                    line-height: 15px;
                    font-size: 11px;
                }
                .expectid{
                    line-height: 16px;
                    font-size: 12px;
                }
            }
            .last-numbox{
                li{
                    float: left;
                    width: 22px;
                    height: 22px;
                    text-align: center;
                    line-height: 22px;
                    overflow: hidden;
                    border-radius: 50%;
                    margin-right: 2px;
                    background: rgba(0,0,0,0.3);
                    font-size: 15px;
                    color: rgba(255,255,255,0.6);
                }
            }
            .arrow{
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                display: block;
                width: 33/2px;
                height: 20/2px;
                padding: 12px;
                overflow: hidden;
                background: url("../../assets/img/lucky11/btn-close.png") no-repeat center;
                background-size: 33/2px;
                cursor: pointer;
                transition: all 0.2s;
                &.on{
                    top: 0;
                    transform: rotateZ(-180deg);
                }
            }
            .last-select{
                position: absolute;
                top: 40px;
                left: 0;
                box-sizing: border-box;
                width: 100%;
                padding:0 12px 0;
                border-bottom-left-radius: 6px;
                border-bottom-right-radius: 6px;
                background: #473c8f;
                z-index: 11;
                &.slide-show{
                    padding-top: 10px;
                }
                a{
                    display: block;
                    line-height: 74/2px;
                    font-size: 28/2px;
                    color: rgba(255,255,255,0.6);
                    border-top: 1px solid #918abc;
                    text-align: center;
                }
            }
            .date-box{
                >li{
                    margin-bottom: 16px;
                    height: 22px;
                    line-height: 22px;
                    p{
                        float: left;
                        margin-right: 25px;
                        font-size: 12px;
                        color: rgba(255,255,255,0.6);
                    }
                }
                .num-box{
                    float: left;
                    height: 22px;
                    li{
                        width: 22px;
                        height: 22px;
                        line-height: 22px;
                        background: rgba(0,0,0,0.3);
                        color: rgba(255,255,255,0.6);
                        &+li{
                            margin-left: 5px;
                        }
                    }
                }
            }

        }
    }
    .superActive {
        .nav {
            background: linear-gradient(to right, #463524, #81653a, #463525);
            &.fix{
                background: #80643b
            }
            .jp_btn{
                background-color: #6f552d;
                &:hover{
                    background-color: #58421f;
                }
            }
        }
        .h5nav{
            background: #34271a;
            .lastdraw,.last-select{
                background: #54402d;
            }
            .lastdraw .last-select a{
                border-color: #7c6138;
            }
        }

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
