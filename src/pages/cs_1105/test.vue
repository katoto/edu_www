<template>
    <div id="test">
    </div>
</template>

<script>
    export default {
        data () {
            return {}
        },
        watch: {},
        methods: {},
        computed: {},
        components: {},
        mounted () {
            console.log('UA:' + window.navigator.userAgent)
        }
    }
</script>
<style scope lang="less" type="text/less">
    #test{
        width: 375px;
        height: 300px;
        background: #100;
    }
</style>
