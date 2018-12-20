<template>
    <div class="eduContain">
        edu Page
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
        
        <div class="pagination">
            <el-pagination @current-change="zixun_handleCurrentChange" background :current-page.sync="zixun_pageno" size="small" :page-size="zixun_pageSize" layout="prev, pager, next" :page-count="zixun_PageTotal" :next-text="'下一页'" :prev-text="'上一页'">
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
            yingyu_PageTotal: 3,
            yingyuArr: [],
            shuxue_pageno: 1,
            shuxue_pageSize: 8,
            shuxue_PageTotal: 4,
            shuxueArr: [],
            yuwen_pageno: 1,
            yuwen_pageSize: 8,
            yuwen_PageTotal: 5,
            yuwenArr: [],
            zixun_pageno: 1,
            zixun_pageSize: 8,
            zixun_PageTotal: 5,
            zixunArr: []
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
                pagesize: 8,
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
                pagesize: 8
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
        console.log( this.currClassNum )
        this.pageInit()
    }
}
</script>
<style lang="less">

</style>

<style lang="less" type="text/less">

</style>
