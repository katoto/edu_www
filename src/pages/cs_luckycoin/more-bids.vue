<template>
    <div class="oneToKen more-bids-page">
        <div class="main">
            <BreadCrumbs :pageName="activeName === 'bids' ? _('More Bids') : _('Draw History')"></BreadCrumbs>
            <el-tabs v-model="activeName" @tab-click="handleTabClick">
                <el-tab-pane label="More Bids" name="bids"></el-tab-pane>
                <el-tab-pane label="Draw History" name="history"></el-tab-pane>
            </el-tabs>
            <div class="function-ct">
                <el-radio-group v-model="filter" @change="onFilterChange">
                    <el-radio-button label="All Bets">
                        <lang>All Bets</lang>
                    </el-radio-button>
                    <el-radio-button label="ETH">
                        <lang>ETH</lang>
                    </el-radio-button>
                    <el-radio-button label="BTC">
                        <lang>BTC</lang>
                    </el-radio-button>
                    <el-radio-button label="My Bets">
                        <lang>My Bets</lang>
                    </el-radio-button>
                </el-radio-group>
                <el-select v-model="bidsFilter" @change="onBidsFilterChange" v-if="activeName === 'bids'">
                    <el-option :label="_('Default')" value="default"></el-option>
                    <el-option :label="_('进度由高到低')" value="progress1"></el-option>
                    <el-option :label="_('进度由低到高')" value="progress0"></el-option>
                    <el-option :label="_('奖金由高到低')" value="price1"></el-option>
                    <el-option :label="_('奖金由低到高')" value="price0"></el-option>
                </el-select>
            </div>
            <div class="container" v-if="activeName === 'bids'">
                <div class="row clearfix">
                    <div class="for-full items">
                        <div class="col-md-6 col-lg-3" v-for="(bet, index) in filterBets(betsList)" :key="index">
                            <bet-box :bet="bet" type="list"></bet-box>
                        </div>
                    </div>
                    <div class="nomsg" v-if="filterBets(betsList).length === 0">
                        <img src="@/assets/img/oneToKen/nomsg.png" alt="">
                        <p>No record. <a href="">Try a luck !</a></p>
                    </div>
                </div>
                <el-pagination
                    v-if="filterBets(betsList).length != 0"
                    @current-change="handleCurrentBetChange"
                    background
                    :current-page.sync="bets.pages.pageno"
                    size="small"
                    :page-size="bets.pages.pageSize"
                    layout="prev, pager, next"
                    :page-count="bets.pageCount"
                    :next-text="_('Next >')"
                    :prev-text="_('< Front')">
                </el-pagination>
            </div>
            <div class="container" v-else>
                <div class="row clearfix">
                    <div class="for-full items">
                        <div class="col-md-6 col-lg-3" v-for="(bet, index) in historyList" :key="index">
                            <history-bet-box :bet="bet" type="list"></history-bet-box>
                        </div>
                    </div>
                    <div class="nomsg" v-if="historyList.length === 0">
                        <img src="@/assets/img/oneToKen/nomsg.png" alt="">
                        <p>
                            No record.
                            <router-link to="/luckycoin">
                                <lang>Try a luck !</lang>
                            </router-link>
                        </p>
                    </div>
                </div>
                <el-pagination
                    v-if="historyList.length != 0"
                    @current-change="handleCurrentHistoryChange"
                    background
                    :current-page.sync="history.pages.pageno"
                    size="small"
                    :page-size="history.pages.pageSize"
                    layout="prev, pager, next"
                    :page-count="history.pageCount"
                    :next-text="_('Next >')"
                    :prev-text="_('< Front')">
                </el-pagination>
            </div>
        </div>

    </div>
</template>
<script>
import Header from '~components/Header.vue'
import Footer from '~components/Footer.vue'
import betBox from './components/bet-box'
import historyBetBox from './components/history-bet-box'
import { mapActions, mapState } from 'vuex'
import BreadCrumbs from '~/components/BreadCrumbs.vue'

export default {
    data () {
        return {
            bets: {
                pages: {
                    pageno: 1,
                    pagesize: 16
                },
                pageCount: 10
            },
            history: {
                pages: {
                    pageno: 1,
                    pagesize: 16
                },
                pageCount: 10
            },
            activeName: 'bids',
            filter: 'All Bets',
            bidsFilter: 'default',
            list: []
        }
    },
    methods: {
        ...mapActions('cs_luckycoin', ['getBetsPageList', 'getBetsPageHistory']),
        handleCurrentBetChange (pageno = this.bets.pages.pageno) {
            this.bets.pages.pageno = pageno
            this.getBetData()
        },
        handleCurrentHistoryChange (pageno = this.history.pages.pageno) {
            this.history.pages.pageno = pageno
            this.getHistoryData()
        },
        async getBetData () {
            let result = await this.getBetsPageList({
                ...this.getFilter(),
                ...this.bets.pages
            })
            this.bets.pageCount = Math.ceil(result.data.goods.length / 16)
        },
        async getHistoryData () {
            let result = await this.getBetsPageHistory({
                ...this.getFilter(),
                ...this.history.pages
            })
            this.history.pageCount = parseInt(result.data.pages, 10)
        },
        sortProgress (a, b) {
            return (
                (Number(a.leftBids) / Number(a.totalBids)) > (Number(b.leftBids) / Number(b.totalBids))
                    ? 1
                    : -1
            )
        },
        sortPrice (a, b) {
            return (
                (Number(a.goodsValue)) > (Number(b.goodsValue))
                    ? 1
                    : -1
            )
        },
        clearPageno () {
            this.bets.pages.pageno = 1
            this.history.pages.pageno = 1
        },
        filterBets (bets = []) {
            let arr = []
            if (this.filter === 'All Bets') {
                arr = [...bets]
            } else if (this.filter === 'ETH') {
                arr = [...bets.filter(bet => bet.goodsType === '2001')]
            } else if (this.filter === 'BTC') {
                arr = [...bets.filter(bet => bet.goodsType === '1001')]
            } else if (this.filter === 'My Bets') {
                arr = [...bets.filter(bet => bet.isbet === '1')]
            }

            if (this.bidsFilter === 'default') {
                return this.slice(arr)
            } else if (this.bidsFilter === 'progress1') {
                return this.slice(arr.sort((a, b) => this.sortProgress(a, b)))
            } else if (this.bidsFilter === 'progress0') {
                return this.slice(arr.sort((a, b) => this.sortProgress(b, a)))
            } else if (this.bidsFilter === 'price1') {
                return this.slice(arr.sort((a, b) => this.sortPrice(b, a)))
            } else if (this.bidsFilter === 'price0') {
                return this.slice(arr.sort((a, b) => this.sortPrice(a, b)))
            }
        },
        slice (arr) {
            return arr.slice((this.bets.pages.pageno - 1) * 16, this.bets.pages.pageno * 16)
        },
        getFilter () {
            if (this.filter === 'ETH' || this.filter === 'BTC') {
                let code = { ETH: 2001, BTC: 1001 }
                return {
                    goodsType: code[this.filter]
                }
            } else if (this.filter === 'My Bets') {
                return { mybet: 1 }
            }
            return {}
        },
        refreshPage () {
            if (this.activeName === 'history') {
                this.getHistoryData()
            } else {
                this.getBetData()
            }
        },
        handleTabClick () {
            this.filter = 'All Bets'
            this.refreshPage()
        },
        onFilterChange () {
            this.clearPageno()
            if (this.activeName === 'history') {
                this.refreshPage()
            } else {
                this.filterBets()
            }
        },
        onBidsFilterChange () {
            this.clearPageno()
            this.filterBets()
        },
        renderHistoryPage () {

        }
    },
    watch: {
        isLogin () {
            this.refreshPage()
        }
    },
    computed: {
        ...mapState({
            isLogin: state => !!state.isLog
        }),
        ...mapState('cs_luckycoin', {
            betsList: state => state.betsList,
            historyList: state => state.drawHistoryList
        })
    },
    components: { Header, Footer, betBox, historyBetBox, BreadCrumbs },
    mounted () {
        document.documentElement.className = 'flexhtml'
        this.$route.meta.history ? this.getHistoryData() : this.getBetData()
        this.activeName = this.$route.meta.history ? 'history' : 'bids'
    },
    beforeDestroy () {
        document.documentElement.className = ''
    }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../styles/lib-media.less";

    .more-bids-page {
        .main {
            padding-top: 0;
        }
        .b-nav {
            max-width: 1190px;
            width: 92%;
            margin: 13px auto 10px;
        }
        .function-ct {
            width: 92%;
            max-width: 1190px;
            margin: 28px auto 30px;
            overflow: hidden;
        }

        /deep/ .el-radio-button {
            &.is-active .el-radio-button__inner {
                background-color: #412057;
                color: #fff;
                outline:none;
            }
            .el-radio-button__inner {
                display: block;
                background: transparent;
                color: #a99acc;
                border-color: #412057;
                padding: 5px 12px;
                min-width: 80px;
                overflow: hidden;
                box-shadow: 0 0 0 0 #412057;
            }
        }

        /deep/ .el-select {
            float: left;
            margin: 10px 0 10px 0;

            .el-input__inner {
                width: auto;
                border: solid 1px #422852;
                background-color: #2b1438;
                color: #a99acc;
                text-shadow: 0 0 0 #a99acc;
                font-weight: normal;
            }
            .el-input.is-focus .el-input__inner {
                border-color: #a99acc;
                color: #fff;
            }
        }



        .el-tabs {
            max-width: 1190px;
            margin: 0 auto;
        }
        /deep/ .el-tabs {
            width: 92%;
            .el-tabs__item {
                color: #aa85ff;
                &.is-active {
                    color: #fff;
                }
            }
            .el-tabs__active-bar {
                background-color: #fff;
            }
            .el-tabs__nav-wrap::after {
                background-color: #412057;
            }
        }
    }
    .el-select > .el-input.is-focus {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    .el-popper {
        color: #a99acc;
    }
    .el-select-dropdown__list,
    .el-select-dropdown__item {
        color: #fff;
        border-top: 1px solid #a99acc;
        background: #2b1438;
        &:hover {
            background: #3e284b;
        }
    }
    .items {
        > div {
            margin-bottom: 10px;
            box-sizing: border-box;
        }
    }
    .item-history{
        width:92%;
        margin:0 auto;
    }
    @media (min-width: @screen-phone) {
        .more-bids-page{
            .el-select {
                float: right;
                margin: 0;
            }
        }
    }
    @media (min-width: @screen-lg-desktop) {
        .more-bids-page {
            .b-nav,
            .el-tabs,
            .function-ct,
            .item-history{
                width: 100%;
            }
        }
    }
</style>
