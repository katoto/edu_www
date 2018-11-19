<template>
    <div>
        <p class="waiting">敬请期待~</p>
        <button> 测试接口请求 </button>
    </div>
</template>
<script>
export default {
    data () {
        return {}
    },
    watch: {},
    components: {},
    methods: {},
    computed: {

    },
    async mounted () {
        console.log('========puppeteer==')
        let list = await this.$store.dispatch('getiqiyiTvMsg')
        console.log(list)
        console.log(list)
        console.log(list)
        // http://cache.video.iqiyi.com/jp/avlist/216274801/1/50/?albumId=216274801&pageNum=50&pageNo=1&callback=aa
    }
}
</script>
<style lang="less" scoped type="text/less">
.waiting {
  width: 100%;
  height: 500px;
  line-height: 500px;
  font-size: 22px;
}
</style>
