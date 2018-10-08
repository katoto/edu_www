<template>
    <div>
        <Header></Header>
        <div class="main">

        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '~components/Header.vue'
import Footer from '~components/Footer.vue'

export default {
    components: { Header, Footer },
    data () {
        return {
            list: []
        }
    },
    methods: {
        getList () {
            this.$store.dispatch('getAdListInfo')
                .then(res => {
                    this.list = [...res.data]
                })
        }
    },
    computed: {
        thisLang () {
            if (this.$isZhCn) {
                return 'cn'
            } else if (this.$isZhTw) {
                return 'tw'
            } else {
                return 'en'
            }
        }
    },
    mounted () {
        this.getList()
    }
}
</script>


<style lang="less" scoped  type="text/less">

</style>

