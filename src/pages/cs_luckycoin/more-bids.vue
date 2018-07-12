<template>
    <div class="oneToKen">
        <div class="main">
            <div class="container">
                <div class="row clearfix">
                    <div class="for-full items">
                        <div class="col-md-6 col-lg-3">
                            <bet-box :bet="betsList[1]"></bet-box>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <bet-box :bet="betsList[1]"></bet-box>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <bet-box :bet="betsList[1]"></bet-box>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <bet-box :bet="betsList[1]"></bet-box>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <bet-box :bet="betsList[1]"></bet-box>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <bet-box :bet="betsList[1]"></bet-box>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <bet-box :bet="betsList[1]"></bet-box>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <bet-box :bet="betsList[1]"></bet-box>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-pagination
            @current-change="handleCurrentChange"
            background
            :current-page.sync="pages.pageno"
            size="small"
            :page-size="pages.pageSize"
            layout="prev, pager, next, jumper"
            :page-count="pages.pageCount"
            :next-text="_('Next >')"
            :prev-text="_('< Front')">
        </el-pagination>
    </div>
</template>
<script>
import Header from '~components/Header.vue'
import Footer from '~components/Footer.vue'
import betBox from './components/bet-box'
import { mapActions, mapState } from 'vuex'

export default {
    data () {
        return {
            pages: {
                pageno: 1,
                pagesize: 16,
                pageCount: 10
            }
        }
    },
    methods: {
        ...mapActions('cs_luckycoin', ['getBetsPageList']),
        handleCurrentChange (pageno = this.pages.pageno) {
            this.pages.pageno = pageno
            this.getPageData()
        },
        async getPageData () {
            let data = await this.getBetsPageList(this.pages)
            this.pages.pageCount = parseInt(data.data.pages, 10)
        }
    },
    computed: {
        ...mapState('cs_luckycoin', {
            betsList: state => state.betsList
        })
    },
    mounted () {
        this.getPageData()
    },
    components: { Header, Footer, betBox }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../styles/lib-media.less";

    .items{
        >div{
            margin-bottom:10px;
        }
    }
    @media (min-width: @screen-desktop){

    }
</style>
