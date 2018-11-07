<template>
    <div>
        <p class="waiting">敬请期待~</p>
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
    mounted () {
        console.log('========puppeteer==')
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
