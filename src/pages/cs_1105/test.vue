<template>
    <div class="test">
        <div class="inputContent" contenteditable="true"></div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            top1: '',
            top2: '',
            interval: '',
            on: false
        }
    },
    watch: {},
    methods: {

    },
    computed: {},
    components: {},
    mounted () {
        console.log(window.innerHeight)
    }
}
</script>

<style  lang="less" type="text/less">
</style>
