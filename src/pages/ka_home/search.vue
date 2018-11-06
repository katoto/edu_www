<template>
    <div>
        <h2>qwert123</h2>
        <div>
            <input type="text" v-model="searchVal" placeholder="黏贴小电影链接">
            <el-button @click='jump2Play'>开启视频</el-button>
            <el-button type="primary" @click='jump2baidu'>百度搜索</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            searchVal: ''
        }
    },
    watch: {},
    methods: {
        jump2Play () {
            if (this.searchVal !== '' && this.searchVal.indexOf('http') > -1) {
                this.$router.push('/play/' + this.searchVal)
            } else {
                this.$error('请输入正确的查询链接')
            }
        },
        jump2baidu () {
            window.open('https://www.baidu.com/s?wd=' + this.searchVal)
        }
    },
    computed: {},
    components: {

    },
    mounted () {

    }
}
</script>
<style scoped lang="less" type="text/less">
</style>

