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
        <section>
            <div class="main-row-box section-djtj clearfix">
                <div class="container-half djtj-box">
                    <span class="title-tips">语文</span>
                    <div class="list-table-wrap">
                        <ul class="djtj-news-list ">
                            <li class="djtj-news-title clearfix">
                                <img src="http://zxxkstatic.zxxk.com/zxxk/skins/images/baiqiang.png" class="exam-title-thumb fl" alt="">
                                <div class="exam-title-box fl">
                                    <p><a href="http://www.zxxk.com/set/s1-123468.html" title="江西省南昌市第十中学2018-2019学年高一上学期第二次月考试题" target="_blank">江西省南昌市第十中学2018-2019学年高一上学期第二次月考试题</a></p>
                                    <p class="author-date">
                                            <span class="sm-tips-font">高一</span>
                                        <span class="sm-tips-font fr  ">12-20</span>
                                    </p>
                                </div>
                            </li>
                            <li class="clearfix">
                                <div class="sm-tips-font fl red date">
                                    12-21
                                </div>
                                <p class="title">
                                    <a href="http://www.zxxk.com/set/s1-123500.html" title="河南省商丘市回民高级中学2019届高三12月月考试题" target="_blank">河南省商丘市回民高级中学2019届高三12月月考试题</a>
                                </p>
                                <div class="list-rt-tag-box sm-tips-font">
                                    <span class="djtj-tag">高三</span>
                                    <span class="vertical-line"></span>
                                </div>
                                <div class="clear"></div>
                            </li>
                            <li>
                                <div class="sm-tips-font fl red date">
                                    12-21
                                </div>
                                <p class="title">
                                    <a href="http://www.zxxk.com/set/s1-123486.html" title="四川省宜宾市第四中学2019届高三12月月考试题" target="_blank">四川省宜宾市第四中学2019届高三12月月考试题</a>
                                </p>
                                <div class="list-rt-tag-box sm-tips-font">
                                    <span class="djtj-tag">高三</span>
                                    <span class="vertical-line"></span>
                                </div>
                                <div class="clear"></div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="container-half zlzj-box" style="position: relative;margin-left: 40px;">
                    <span class="title-tips">数学</span>
                    <div class="list-table-wrap">
                        <ul class="djtj-news-list" id="elitefeature">
                            <li class="djtj-news-title">
                                <img src="http://zxxkstatic.zxxk.com/zxxk/skins/images/jingxuan.png" class="exam-title-thumb fl" alt="">
                                <div class="exam-title-box fl">
                                    <p><a href="http://www.zxxk.com/zj/info-171841.html" title="【众淘精优推荐】2019年高考数学之联考君(文科)" target="_blank">【众淘精优推荐】2019年高考数学之联考君(文科)</a></p>
                                    <p class="author-date">
                                        <span class="sm-tips-font">高三</span>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div class="sm-tips-font fl red date">
                                    12-21
                                </div>
                                <p class="title">
                                    <a href="http://www.zxxk.com/zj/info-171849.html" title="2019届九年级化学上学期期末单元复习导学案" target="_blank">2019届九年级化学上学期期末单元复习导学案</a>
                                </p>
                                <div class="list-rt-tag-box sm-tips-font">
                                    <span class="vertical-line"></span>
                                    <span class="djtj-tag">初三</span>
                                </div>
                                <div class="clear"></div>
                            </li>
                        </ul>
                    </div>
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
    // ======== 课程 ========
    .main-row-box{
        background: #fff;
        clear: both;
        width: 1200px;
        margin: 0 auto;
        margin-top: 20px;
        padding-top: 24px;
        padding-bottom: 30px;
        .container-half{
            width: 570px;
            margin-left: 0px;
            float: left;
            .title-tips{
                height: 40px;
                margin: 0 0 15px;
                border-left: 3px solid #0d75d9;
                font-size: 22px;
                color: #057ee1;
                padding-left: 17px;
            }
            .list-table-wrap{
                padding-left: 20px;
                margin-top: 15px;
                .djtj-news-list{
                    .djtj-news-title{
                        min-height: 52px;
                        margin-bottom: 20px;
                        font-size: 16px;
                        line-height: 26px;
                        a{
                            width: 468px;
                            font-weight: 600;
                        }
                    }
                    .author-date{
                        padding: 6px 0 2px;
                        clear: both;
                    }
                    .exam-title-thumb{
                        width: 62px;
                        height: 62px;
                        float: left;
                        border-radius: 5px;
                    }
                    .exam-title-box{
                        float: left;
                        margin-left: 20px;
                        width: 468px;
                    }
                    .date{
                        width: 45px;
                    }
                    .title{
                        float: left;
                    }
                    li{
                        a{
                            display: inline-block;
                            float: left;
                        }
                    }
                    .list-rt-tag-box{
                        float: right;
                    }
                }
                
            }
            .sm-tips-font{
                font-size: 12px;
                color: #a0a0a0;
                line-height: 19px;
            }
        }
    }
    .red {
        color: #ff0000 !important;
    }
    .vertical-line{
        display: inline-block;
        height: 16px;
        border-left: 1px solid #e6e6e6;
        margin: 2px 5px;
        float: right;
    }
    // ========每日推荐=========
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
    // ========end=========
</style>
