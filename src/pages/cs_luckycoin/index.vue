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
                        <bet-box :bet="betsList[0]" :is-popular="true"></bet-box>
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
                                        <router-link :to="{path:'/luckycoin/moreBids'}" class="btn-more">
                                            <lang>More ></lang>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-lg-4">
                                <bet-box :bet="betsList[1]"></bet-box>
                                <bet-box :bet="betsList[4]"></bet-box>
                            </div>
                            <div class="col-md-6 col-lg-4 hidden-xs hidden-sm">
                                <bet-box :bet="betsList[2]"></bet-box>
                                <bet-box :bet="betsList[5]"></bet-box>
                            </div>
                            <div class="col-lg-4 hidden-xs hidden-xs hidden-sm hidden-md">
                                <bet-box :bet="betsList[3]"></bet-box>
                                <bet-box :bet="betsList[6]"></bet-box>
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
                            <recent-bets :data="recentBetsList"></recent-bets>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 ">
                        <div class="title">
                            <div class="left">
                                <p class="t1">Draw History</p>
                                <p class="t2  hidden-xs hidden-sm">Fair Open，Draw in blockchain</p>
                                <router-link :to="{path:'/check'}" class="check">
                                    Check Transparency >
                                </router-link>
                            </div>
                            <div class="right">
                                <router-link :to="{path: '/luckycoin/drawHistory'}" class="btn-more">
                                    <lang>More >></lang>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <history-bet-box :bet="drawHistoryList[0]"></history-bet-box>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <history-bet-box :bet="drawHistoryList[1]"></history-bet-box>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <history-bet-box :bet="drawHistoryList[2]"></history-bet-box>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <history-bet-box :bet="drawHistoryList[3]"></history-bet-box>
                    </div>
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

<style scoped lang="less" type="text/less">

</style>
