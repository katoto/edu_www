<template>
    <div class="test">
        <h1>test</h1>
        <div style="width:100%">
            <iframe class="iframeStyle" src="http://api.nohacks.cn/index.php?url=https://www.iqiyi.com/v_19rrfnf1gk.html#vfrm=19-9-0-1" frameborder="0" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen">
            </iframe>
        </div>
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
.iframeStyle {
  display: block;
  height: 500px;
  width: 800px;
  margin: 0 auto;
  border: 1px solid transparent;
}
</style>
