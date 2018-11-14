<template>
    <div class="test">
        <p class="ka_tips">温馨提示：如果当前打不开，可以选择换个线路~</p>
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
            currSrc: '//api.nohacks.cn/index.php?url=https://www.iqiyi.com/v_19rrfnf1gk.html#vfrm=19-9-0-1',
            consoleTime: null
        }
    },
    watch: {},
    methods: {
    },
    computed: {},
    components: {},
    mounted () {
        if (this.$route.params && this.$route.params.urlVal) {
            this.currSrc = `//api.nohacks.cn/index.php?url=${decodeURIComponent(this.$route.params.urlVal)}`
            console.log(this.currSrc)
            history.replaceState({}, '', `${location.origin}/play/`)
        }
        setTimeout(() => {
            console.clear()
            console.log('%c欢迎访问 katoto.cn', 'background:blue; color:white; font-size:16px')
            console.log('想看代码？联系我1196781017@qq.com')
            setTimeout(() => {
                console.clear()
                console.log('%c欢迎访问 katoto.cn', 'background:blue; color:white; font-size:16px')
                console.log('想看代码？联系我1196781017@qq.com')
            }, 1000)
        }, 500)
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
