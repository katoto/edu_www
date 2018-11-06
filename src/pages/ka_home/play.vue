<template>
    <div class="test">
        <p class="ka_tips">温馨提示：当前打不开，可以选择换个线路~</p>
        <div style="width:100%;padding-bottom:40px;">
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
            this.currSrc = `http://api.nohacks.cn/index.php?url=${decodeURIComponent(this.$route.params.urlVal)}`
            console.log(this.currSrc)
            history.replaceState({}, '', `${location.origin}/play/`)
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
.ka_tips {
  padding: 16px 0;
  text-align: center;
}
</style>
