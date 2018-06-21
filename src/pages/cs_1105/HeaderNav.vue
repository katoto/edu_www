<template>
    <!--fix 奖池奖 -->
    <div id="nav" class="nav" :class="{fix:navFix}">
        <div class="nav-main">
            <h2 class="logo11to5">
                Lucky11
            </h2>
            <div class="lastdraw clearfix" @mouseover="isShowHistoryCode = true" @mouseout="isShowHistoryCode = false">
                <p>Draw History</p>
                <span id="js_lastDrawNumber">NO.{{ last_expectid }}</span>
                <i class="arrow"></i>
                <ul id="js_lastDraw" class="last-numbox js_lastDraw">
                    <li v-for="(item, index) in liveOpenCode" class="flipInY" :key="index">{{ item }}</li>
                </ul>
                <div class="last-select slide" :class="{ 'slide-show': isShowHistoryCode }">
                    <ul class="date-box js_date-box">
                        <li v-for="(item, index) in historyCodeFilter(historyCode)" :key="index">
                            <span>{{ item.expectid }}</span>
                            <ul class="num-box">
                                <li v-for="(num, numIndex) in item.opencode.split(',')" :key="numIndex">{{ num }}</li>
                            </ul>
                        </li>
                    </ul>
                    <router-link :to="{path: '/drawNumber'}">
                        <a href="javascript:;" class="more" target="_blank">More >></a>
                    </router-link>

                </div>
            </div>
            <!--changeDead-->
            <div class="deadline">
                <div class="deadline-box" :class="{'deadlineMove': expect_move }">
                    <p>Time Left</p>
                    <!--blinking-->
                    <span id="js_currExpectid" :class="{'blinking':expect_blinking}">No.{{ currExpectId }}</span>
                    <i :class="{'jump5': parseFloat( timeLeft )<= 10 }">{{ timeLeft }}’</i>
                </div>
            </div>
            <p class="jackpot2 ">
                <span>JACKPOT&nbsp;&nbsp;</span>
                <i id="js_jackpotM" v-if="poolAmount">{{ poolAmount | formateBalance }}</i>
            </p>
        </div>

        <!-- jackpot -->
        <div class="jackpot" :class="{hide: jackPotMsg === null}">
            <div class="jackpot-box" >
                <p>{{ _('Congratulations to {0} hit {1},', (jackPotMsg && jackPotMsg.uid) || '', (jackPotMsg && jackPotMsg.expectid) || '') }}</p>
                <p class="jackpot-money">{{ _('Win {0}ETH', (jackPotMsg && jackPotMsg.prize) || '') }}</p>
            </div>
            <canvas id="canvas" ref="canvas"></canvas>
        </div>

        <div class="jackpot">
            <div class="jackpot-box" >
                <ul v-if="currPrizeMsg">
                    <li v-for="item in currPrizeMsg.prize_list" v-if="item">
                        <p>{{ _('Congratulations to {0} hit {1},', (item.uid) || '', (item.expectid) || '') }}</p>
                        <p class="jackpot-money">{{ _('Win {0}ETH', formateBalance (  item.prize ) || '') }}</p>
                    </li>
                </ul>
            </div>
            <canvas id="canvas" ref="canvas"></canvas>
        </div>

    </div>
</template>

<script>
import {mTypes, aTypes} from '~/store/cs_page/cs_1105'
import {formateBalance} from '~common/util'
import startCanvas from '~/common/canvas'



export default {
    data () {
        return {
            tes: false,
            isShowHistoryCode: false,
            currPrizeMsg: null, // 中奖消息接口
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
        formateBalance,
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
        jackPotMsg () {
            return this.$store.state.cs_1105.jackPotMsg
        },
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
        }
    },
    async mounted () {
        this.getHistoryDraw()
        startCanvas(this.$refs.canvas)();
        // 获取首次中奖信息
        let prizeMsg = await this.$store.dispatch(aTypes.prizeMessage)
        console.log(prizeMsg)

        if (prizeMsg && prizeMsg.data) {
            this.currPrizeMsg = prizeMsg.data;
        }

    },
    filters: {
        formateBalance
    }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../styles/lib-mixins.less";
    .jackpot{
        position: fixed;
        left:0;
        top:0;
        z-index:10;
        width:100%;
        height:150px;
        //overflow: hidden;
        animation: slideDownIn 1s;
        .jackpot-box{
            position: relative;
            z-index:9;
            width: 947px;
            height: 112px;
            margin:0 auto;
            background: url("../../assets/slice/jackpot-bg.png") top center no-repeat;
            display: flex;
            justify-content: center;
            p{
                height: 72px;
                padding-top:25px;
                line-height:76px;
                font-size:22px;
            }
            p.jackpot-add{
                overflow: hidden;
            }
            p.jackpot-money{
                font-size:36px;
                font-family:sans-eb;
                line-height:72px;
            }
        }
        canvas{
            position: absolute;
            z-index:1;
            top:0;
            left:0;
        }
    }
    .nav {
        position: relative;
        z-index: 7;
        width: 100%;
        height: 60px;
        line-height: 60px;
        //overflow: hidden;
        background: #463895;
        color: #fff;
        .transition();
    }

    .nav.fix {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
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
        color: #ffffff;
    }

    .deadline {
        position: absolute;
        left: 115px;
        top: 0;
        width: 165px;
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
.jackpot2{
    float: left;
    margin-left:200px;
    font-family:sans-eb;
    color: #f6b543;
    *{
        float: left;
    }
    span{
        font-size:20px;
    }
    i{
        position: relative;
        padding-left: 26px;
        font-size:36px;
        &::before{
            content: '';
            position: absolute;
            left:0;
            top:20px;
            background-image:url("../../assets/slice/logo-btc.png");
            width: 20px;
            height: 20px;
        }
    }
}
</style>
