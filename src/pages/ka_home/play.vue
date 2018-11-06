<template>
    <div class="test">
        <h1>test</h1>
        <div style="width:100%">
            <iframe class="iframeStyle" :src="currSrc" frameborder="0" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen">
            </iframe>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            currSrc: 'http://api.nohacks.cn/index.php?url=https://www.iqiyi.com/v_19rrfnf1gk.html#vfrm=19-9-0-1'
        }
    },
    watch: {},
    methods: {

    },
    computed: {},
    components: {},
    mounted () {
        if (this.$route.params && this.$route.params.urlVal) {
            this.currSrc = this.$route.params.urlVal
            console.log(this.currSrc)
            history.replaceState({}, '', `${location.origin}${location.pathname}/play/`)
        }
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
