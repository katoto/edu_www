<template>
    <div class="oneToKen">
        <div class="main">
            <div class="container">
                <div class="row  clearfix">
                    <div class="col-lg-8">
                        <div class="for-full banner">
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
                        <div class="for-full">
                            <bet-box :bet="betsList[0]" :is-popular="true"></bet-box>
                        </div>
                    </div>
                </div>
                <div class="row  clearfix">
                    <div class="item-tltle">
                        <router-link :to="{path: '/luckycoin/moreBids'}" class="btn-more">
                            <lang>More >></lang>
                        </router-link>
                        <div class="t1">
                            Bet For The Prize
                        </div>
                        <p class="msg  hidden-xs hidden-sm">
                            All or nothing, small cost, big profit
                        </p>
                        <a href="javascript:;" class="btn-play">How To Play</a>
                    </div>
                    <div class="for-full">
                        <div class="col-md-6 col-lg-3">
                            <!--icon-hot  是否热门-->
                            <!--bg1 bg2-->
                            <bet-box :bet="betsList[1]"></bet-box>
                            <bet-box :bet="betsList[4]"></bet-box>
                        </div>
                        <div class="col-md-6 col-lg-3 visible-lg">
                            <bet-box :bet="betsList[2]"></bet-box>
                            <bet-box :bet="betsList[5]"></bet-box>
                        </div>
                        <div class="col-md-6 col-lg-3 visible-lg">
                            <bet-box :bet="betsList[3]"></bet-box>
                            <bet-box :bet="betsList[6]"></bet-box>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <div class="recentBets">
                                <div class="t1">
                                    Recent Bets
                                </div>
                                <recent-bets :data="recentBetsList"></recent-bets>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row  clearfix">
                    <div class="item-tltle">
                        <router-link :to="{path: '/luckycoin/drawHistory'}" class="btn-more">
                            <lang>More >></lang>
                        </router-link>
                        <div class="t1">
                            Draw History
                        </div>
                        <p class="msg hidden-xs hidden-sm">
                            Fair Open，Draw in blockchain
                        </p>
                        <a href="javascript:;" class="btn-play">Check Transparency</a>
                    </div>
                    <div class="for-full">
                        <div class="history">
                            <div class="col-xs-6 col-sm-4 col-lg-3">
                                <history-bet-box :bet="drawHistoryList[0]"></history-bet-box>
                            </div>
                            <div class="col-xs-6 col-sm-4 col-lg-3">
                                <history-bet-box :bet="drawHistoryList[1]"></history-bet-box>
                            </div>
                            <div class="col-xs-6 col-sm-4 col-lg-3">
                                <history-bet-box :bet="drawHistoryList[2]"></history-bet-box>
                            </div>
                            <div class="col-xs-6 col-sm-4 col-lg-3">
                                <history-bet-box :bet="drawHistoryList[3]"></history-bet-box>
                            </div>
                            <div class="col-xs-6 col-sm-4 col-lg-3 hidden-lg">
                                <history-bet-box :bet="drawHistoryList[4]"></history-bet-box>
                            </div>
                            <div class="col-xs-6 col-sm-4 col-lg-3 hidden-lg">
                                <history-bet-box :bet="drawHistoryList[5]"></history-bet-box>
                            </div>
                        </div>
                    </div>
                </div>

                <!--show-->
                <div class="msg-winning" :class="{ show: otherWin.isShow }">
                    Congratulation！ {{ otherWin.name }} <i>WIN {{ otherWin.num }} {{ otherWin.type }}</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import betBox from './components/bet-box'
import recentBets from './components/recent-bets'
import historyBetBox from './components/history-bet-box'

export default {
    methods: {
        ...mapActions('cs_luckycoin', ['updateLuckyCoinPage', 'getBetsList']),
        ...mapActions(['subInLuckyCoin'])
    },
    components: { betBox, recentBets, historyBetBox },
    computed: {
        ...mapState('cs_luckycoin', {
            betsList: state => state.betsList,
            drawHistoryList: state => state.drawHistoryList,
            recentBetsList: state => state.recentBetsList,
            otherWin: state => state.otherWin,
            selfWin: state => state.selfWin
        }),
        ...mapState({
            isLogin: state => !!state.isLog
        })
    },
    watch: {
        isLogin () {
            this.getBetsList()
        }
    },
    mounted () {
        this.updateLuckyCoinPage()
    }
}
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
