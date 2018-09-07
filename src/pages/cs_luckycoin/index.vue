<template>
    <div class="main"  @click="initPop">
        <div class="container">
            <img class="loading" :class="[isReady?'':'show']" src="@/assets/img/loading.gif" alt="">
            <div class="row">
                <div class="col-lg-8">
                    <div class="banner">
                        <el-carousel :interval="5000" arrow="always">
                            <template v-if="adList.luckycoin_banner_1 && adList.luckycoin_banner_1.length>0">
                                <el-carousel-item>
                                    <a v-for="(item,index) in adList.luckycoin_banner_1" :key="index" :href="item.ad_target" :title="item.ad_desc" rel="nofollow">
                                        <img :src="item.ad_img" alt="">
                                    </a>
                                </el-carousel-item>
                            </template>
                            <template>
                                <el-carousel-item>
                                    <router-link :to="{path: '/firstCharge'}" rel="nofollow">
                                        <img src="../../assets/img/luckyCoin/banner3.png" alt="">
                                    </router-link>
                                </el-carousel-item>
                                <el-carousel-item>
                                    <a href="javascript:;" rel="nofollow">
                                        <img src="../../assets/img/luckyCoin/banner.jpg" alt="">
                                    </a>
                                </el-carousel-item>
                                <el-carousel-item>
                                    <a href="javascript:;" rel="nofollow">
                                        <img src="../../assets/img/luckyCoin/banner2.png" alt="">
                                    </a>
                                </el-carousel-item>
                            </template>
                        </el-carousel>
                    </div>
                </div>
                <div class="col-lg-4">
                    <bet-box @close="closeOtherBet" ref="betBoxList1" :bet="betsList[0]" :is-popular="true" :class="[isShowNew? 'for-new':'']" id="popular-box" :ind="0" @updateBets="updateBets"></bet-box>
                    <div class="pop-mask hidden-md hidden-sm hidden-xs" :class="[isShowNew ? '' : 'hide']"></div>
                    <div class="pop-new" :class="[isShowNew ? '' : 'hide']">
                        <div class="step bounceIn animated step1" :class="[isShowStep1 ? '' : 'hide']">
                            <p>
                                <lang>Reward is here: Blockchain-based draw</lang>
                            </p>
                            <a href="javascript:;" class="btn-next" @click="isShowStep1 = false, isShowStep2 = true"><lang>Next</lang></a>
                            <img src="../../assets/img/luckyCoin/line.png" alt="">
                        </div>
                        <div class="step bounceIn animated step2 " :class="[isShowStep2 ? '' : 'hide']">
                            <p>
                                <lang>Available bid is here: Draw will proceed after all bids are sold out</lang>
                            </p>
                            <a href="javascript:;" class="btn-next" @click="isShowStep2 = false, isShowStep3 = true"><lang>Next</lang></a>
                            <img src="../../assets/img/luckyCoin/line.png" alt="">
                        </div>
                        <div class="step bounceIn animated step3 " :class="[isShowStep3 ? '' : 'hide']">
                            <p>
                                <lang>If bids are not sold out, draw will proceed after the countdown</lang>
                            </p>
                            <a href="javascript:;" class="btn-next" @click="isShowStep4 = true, isShowStep3 = false"><lang>OK</lang></a>
                            <img src="../../assets/img/luckyCoin/line.png" alt="">
                        </div>
                        <div class="step bounceIn animated step4" :class="[isShowStep4 ? '' : 'hide']">
                            <img src="../../assets/img/luckyCoin/line.png" alt="">
                            <p>
                                <lang>Click here to play: Bid more, win more</lang>
                            </p>
                            <a href="javascript:;" class="btn-next" @click="isShowNew = false"><lang>OK</lang></a>
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
                                    <p class="t1"><lang>Win Instant Reward</lang></p>
                                    <p class="t2 hidden-xs hidden-sm"><lang>Small cost, big profit!</lang></p>
                                    <router-link :to="{path:'/help/helpView/2/1'}" class="play">
                                        <lang>How to play?</lang>
                                    </router-link>
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
                            <bet-box @close="closeOtherBet" ref="betBoxList2" :bet="betsList[1]" :ind="2" @updateBets="updateBets"></bet-box>
                            <bet-box @close="closeOtherBet" ref="betBoxList3" :bet="betsList[4]" :ind="5" @updateBets="updateBets"></bet-box>
                        </div>
                        <div class="col-md-6 col-lg-4 hidden-xs hidden-sm">
                            <bet-box @close="closeOtherBet" ref="betBoxList4" :bet="betsList[2]" :ind="3" @updateBets="updateBets"></bet-box>
                            <bet-box @close="closeOtherBet" ref="betBoxList5" :bet="betsList[5]" :ind="6" @updateBets="updateBets"></bet-box>
                        </div>
                        <div class="col-lg-4 hidden-xs hidden-xs hidden-sm hidden-md">
                            <bet-box @close="closeOtherBet" ref="betBoxList6" :bet="betsList[3]" :ind="4" @updateBets="updateBets"></bet-box>
                            <bet-box @close="closeOtherBet" ref="betBoxList7" :bet="betsList[6]" :ind="7" @updateBets="updateBets"></bet-box>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="recent-bets">
                        <div class="title">
                            <div class="left">
                                <p class="t1"><lang>Recent Bids</lang></p>
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
                            <p class="t1"><lang>Draw History</lang></p>
                            <p class="t2  hidden-xs hidden-sm"><lang>Transparent blockchain-based draw</lang></p>
                            <router-link :to="{path:'/check'}" class="check">
                                <lang>Details Checking ></lang>
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
</template>


<script>
    import { mapActions, mapState } from 'vuex'
    import betBox from './components/bet-box'
    import recentBets from './components/recent-bets'
    import historyBetBox from './components/history-bet-box'
    import { structDom } from '~/common/util'
    export default {
        data () {
            return {
                isShowNew: false,
                isShowStep1: true,
                isShowStep2: false,
                isShowStep3: false,
                isShowStep4: false,
                isReady: false
            }
        },
        methods: {
            ...mapActions('cs_luckycoin', ['updateLuckyCoinPage', 'getBetsList']),
            ...mapActions(['subInLuckyCoin']),
            initPop () {
                /* head 弹窗 */
                this.$store.commit('initHeadState', new Date().getTime())
            },
            howToPlayHandler () {
                this.isShowNew = true
                this.isShowStep1 = true
                this.isShowStep2 = false
                this.isShowStep3 = false
                this.isShowStep4 = false
            },
            closeOtherBet () {
                ['betBoxList1', 'betBoxList2', 'betBoxList3', 'betBoxList4', 'betBoxList5', 'betBoxList6', 'betBoxList7'].forEach(bet => this.$refs[bet].closeWindow())
            },
            updateBets () {
                this.updateLuckyCoinPage()
            }
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
                isLogin: state => !!state.isLog,
                adList: state => state.adList
            })
        },
        watch: {
            isLogin () {
                this.getBetsList()
            }
        },
        mounted () {
            if (!localStorage.getItem('firstLuckycoin')) {
                this.howToPlayHandler()
                localStorage.setItem('firstLuckycoin', true)
            }
            this.updateLuckyCoinPage()
                .then(() => {
                    this.isReady = true
                })
            structDom('luckycoin')
            this.$store.commit('cs_luckycoin/bindPageListener', {
                index: () => {
                    this.updateLuckyCoinPage()
                }
            })
        },
        destroyed () {
            this.$store.commit('cs_luckycoin/unbindPageListener', 'index')
        }
    }
</script>
<style lang="less" type="text/less">
    .banner .el-carousel__arrow{
        display: none !important;
    }
</style>
<style scope lang="less" type="text/less">
    /*.main /deep/ .el-carousel__indicators {*/
        /*display: none;*/
    /*}*/

    .page-luckycoin{
        .carousel__arrow{
            display: none;
        }
    }
    #app{
        .for-new,.pop-mask,.pop-new{
            display: none;
        }
        &.ready{
            .for-new,.pop-mask,.pop-new{
                display: block;
            }
        }
    }
    .for-new{
        position: relative;
        z-index: 11;
    }
    .pop-mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 9;
    }
    .pop-new{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 12;
        text-align: center;
        font-size: 20px;
        color: #ffdd8e;
        .new-main{
            position: relative;
            width: 100%;
            max-width: 1190px;
            margin: 0 auto;
        }
        .btn-next{
            display: table;
            padding: 0 16px;
            min-width: 67px;
            margin: 6px auto 0;
            line-height: 28px;
            color: #fff;
            background: #20bf6b;
            border-radius: 6px;
            &:hover{
                filter:brightness(1.1);
            }
        }
        .step{
            position: relative;
            z-index: 12;
            animation: bounceIn 1s;
        }
        .step1{
            position: absolute;
            width: 367px;
            left: -210px;
            top: -45px;
            img{
                display: block;
                position: absolute;
                top: 60px;
                left: 50%;
            }
        }
        .step2{
            position: absolute;
            width: 255px;
            top: 75px;
            left: -255px;
            img{
                display: block;
                position: absolute;
                top: 52px;
                right: -32px;
                transform:scaleY(-1) rotateZ(-90deg);
            }
        }
        .step3{
            position: absolute;
            width: 400px;
            top: -44px;
            left: -60%;
            line-height: 27px;
            img{
                display: block;
                position: absolute;
                bottom: -100%;
                right: 33%;
            }
        }
        .step4{
            position: absolute;
            width: 100%;
            left: 50%;
            margin-left: -200px;
            bottom: -140px;
            img{
                display: block;
                margin: 0 auto 15px;
                transform: rotateZ(120deg) scaleX(-1);
            }
        }
    }
    /* lg大屏幕（大桌面显示器，大于等于 1200px） */

    @media (max-width: 1200px) {
        .pop-mask,.pop-new{
            display: none !important;
        }
    }
</style>
