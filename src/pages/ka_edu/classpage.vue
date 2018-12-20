<template>
    <div class="eduContain">
        <div class="topImg">
            <img :src="topMonthImg">
        </div>
        <section>
            <div class="seat daily-zy" >
                <div class="seat-mt" >
                    <strong><i class="icon"></i>每日推荐</strong>
                    <div class="seat-nav">
                        <a class="active" @click="zixun_handleCurrentChange(1)" >热门推荐</a>
                        <a class="active" @click="zixun_handleCurrentChange(2)" >精选推荐</a>
                    </div>
                </div>
                <div class="seat-mc daily-zy-bd" style="display: block;">
                    <ul class="seat-list clearfix" _num="18">
                        <li v-for="(item,index) in zixunArr" :key="index">
                            <a :href="item.titleLink" target="_blank"><b></b>{{ item.titleName }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        
        <div>
            <p>yuwen</p>
            <ul>
                <li v-for="item in yuwenArr">
                    {{ item.titleName }}
                </li>
            </ul>
        </div>
        <div>
            <p>yingyu</p>
            <ul>
                <li v-for="item in yingyuArr">
                    {{ item.titleName }}
                </li>
            </ul>
        </div>
        <div>
            <p>shuxue</p>
            <ul>
                <li v-for="item in shuxueArr">
                    {{ item.titleName }}
                </li>
            </ul>
        </div>
        <div>
            <p>zixun</p>
            <ul>
                <li v-for="item in zixunArr">
                    {{ item }}
                </li>
            </ul>
        </div>
        <div class="pagination">
            <el-pagination @current-change="yuwen_handleCurrentChange" background :current-page.sync="yuwen_pageno" size="small" :page-size="yuwen_pageSize" layout="prev, pager, next" :page-count="yuwen_PageTotal" :next-text="'下一页'" :prev-text="'上一页'">
            </el-pagination>
        </div>
        <div class="pagination">
            <el-pagination @current-change="shuxue_handleCurrentChange" background :current-page.sync="shuxue_pageno" size="small" :page-size="shuxue_pageSize" layout="prev, pager, next" :page-count="shuxue_PageTotal" :next-text="'下一页'" :prev-text="'上一页'">
            </el-pagination>
        </div>        
        <div class="pagination">
            <el-pagination @current-change="yingyu_handleCurrentChange" background :current-page.sync="yingyu_pageno" size="small" :page-size="yingyu_pageSize" layout="prev, pager, next" :page-count="yingyu_PageTotal" :next-text="'下一页'" :prev-text="'上一页'">
            </el-pagination>
        </div>

    </div>
</template>

<script>
import { isLog, defaultLanguage, isForbitPage, setCK, selfNotify } from '~common/util'
import HEAD from '~components/Head.vue'
import Footer from '~components/Footer.vue'
import ScrollTop from '~components/ScrollTop.vue'

export default {
    data () {
        return {
            isReady: false,
            showMovieHead: true,

            currClassNum: 'Class1',
            yingyu_pageno: 1,
            yingyu_pageSize: 8,
            yingyu_PageTotal: 2,
            yingyuArr: [],
            shuxue_pageno: 1,
            shuxue_pageSize: 8,
            shuxue_PageTotal: 2,
            shuxueArr: [],
            yuwen_pageno: 1,
            yuwen_pageSize: 8,
            yuwen_PageTotal: 2,
            yuwenArr: [],
            zixun_pageno: 1,
            zixun_pageSize: 12,
            zixun_PageTotal: 2,
            zixunArr: [],
            topMonthImg: '../../../static/eduImg/1.jpg'
        }
    },
    components: {
        HEAD,
        ScrollTop,
        Footer
    },
    methods: {
        selfNotify,
        async yingyu_handleCurrentChange (yingyu_pageno = this.yingyu_pageno) {
            let params = {
                pageno: yingyu_pageno,
                pagesize: 8,
                className: this.currClassNum,
                xueke: 'Yingyu'
            }
            let data = await this.$store.dispatch('ka_edu/getClassMsg', params)
            if (data && data.status === '100') {
                this.yingyuArr = data.data.msg
                this.yingyu_PageTotal = data.data.totalPages
            }
        },
        async shuxue_handleCurrentChange (shuxue_pageno = this.shuxue_pageno) {
            let params = {
                pageno: shuxue_pageno,
                pagesize: 8,
                className: this.currClassNum,
                xueke: 'Shuxue'
            }
            let data = await this.$store.dispatch('ka_edu/getClassMsg', params)
            if (data && data.status === '100') {
                this.shuxueArr = data.data.msg
                this.shuxue_PageTotal = data.data.totalPages
            }
        },
        async yuwen_handleCurrentChange (yuwen_pageno = this.yuwen_pageno) {
            let params = {
                pageno: yuwen_pageno,
                pagesize: this.yuwen_pageSize,
                className: this.currClassNum,
                xueke: 'Yuwen'
            }
            let data = await this.$store.dispatch('ka_edu/getClassMsg', params)
            if (data && data.status === '100') {
                this.yuwenArr = data.data.msg
                this.yuwen_PageTotal = data.data.totalPages
            }
        },
        async zixun_handleCurrentChange (zixun_pageno = this.zixun_pageno) {
            let params = {
                pageno: zixun_pageno,
                pagesize: this.zixun_pageSize
            }
            let data = await this.$store.dispatch('ka_edu/getzixun', params)
            if (data && data.status === '100') {
                this.zixunArr = data.data.msg
                this.zixun_PageTotal = data.data.totalPages
            }
        },
        async pageInit () {
            // 请求当前年级数据
            this.yingyu_handleCurrentChange()
            this.shuxue_handleCurrentChange()
            this.yuwen_handleCurrentChange()
            this.zixun_handleCurrentChange()
        }
    },
    watch: {
        isLogin (value) {
            if (!value) {
                this.isShowHalloween = false
            }
        },
        $route (to, from) {
            if (this.$route.params && this.$route.params.classNum) {
                this.currClassNum = this.$route.params.classNum
            }
            this.pageInit()
        }
    },
    computed: {
        isLogin () {
            return this.$store.state.isLog
        }

    },
    async mounted () {
        if (this.$route.params && this.$route.params.classNum) {
            this.currClassNum = this.$route.params.classNum
        }
        console.log(this.currClassNum)
        this.pageInit()
        this.topMonthImg = '../../../static/eduImg/' + (new Date().getMonth() + 1) + '.jpg'
    }
}
</script>
<style lang="less">

</style>

<style lang="less" type="text/less">
    .topImg{
        margin-left: auto;
        margin-right: auto;
        width: 1200px;
        img{
            display: block;
            width: 100%
        }
    }
    .seat {
        margin-left: auto;
        margin-right: auto;
        width: 1200px;
        background: #fff;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        margin-top: 2px;
        .seat-mt{
            height: 83px;
            display: block;
            zoom: 1;
            position: relative;
            line-height: 24px;
            strong{
                font-size: 22px;
                font-weight: 400;
                float: left;
                height: 24px;
                margin-top: 30px;
                .icon{
                    float: left;
                    height: 22px;
                    margin-top: 1px;
                    margin-right: 16px;
                    font-size: 0;
                    border-left: 4px solid #2bbb61;
                    width: 0;
                }
            }
        }
        .seat-nav{
            margin-left: 40px;
            float: left;
            padding-top: 26px;
            a{
                height: 24px;
                padding: 0 5px 4px 5px;
                border-bottom: 2px solid #fff;
                color: #333;
                font-size: 14px;
                margin-right: 20px;
                &:hover{
                    border-bottom: 2px solid #2bbb61;
                    text-decoration: none;
                    color: #2bbb61;                    
                }
            }
        }
    }
    .daily-zy {
        .seat-mc{
            position: relative;
            overflow: hidden;
            .seat-list{
                line-height: 1;
                font-size: 14px;
                margin-left: 20px;
                margin-right: -20px;
                padding-bottom: 8px;
                li{
                    padding-bottom: 22px;
                    width: 400px;
                    float: left;
                    b{
                        float: left;
                        width: 4px;
                        height: 4px;
                        font-size: 0;
                        line-height: 0;
                        background: #999;
                        margin-right: 10px;
                        margin-top: 5px;
                        border-radius: 2px;
                    }
                }
            }
        }
    }
    a{
        text-decoration: none;
        cursor: pointer;
        outline: 0;
        color: #333;
    }
</style>
