<template>
    <div id="test">
        <div class="div div1">

        </div>
        <div class="div div2">

        </div>
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
            console.log(window.devicePixelRatio)
        }
    }
</script>
<style scope lang="less" type="text/less">
    .div{
        width: 50px;
        height: 100px;
        margin: 50px auto 50px;
        border-radius: 10px;
    }
    .div1{
        border: 1/75rem solid #000;
    }
    .div2{
        border: 1px solid #000;
    }
</style>
