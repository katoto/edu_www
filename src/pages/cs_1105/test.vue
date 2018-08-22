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
            for (let x = 0; x < 50; x++) {
                const y = Math.sin(x)
            }
        }
    }
</script>
<style scope lang="less" type="text/less">
</style>
