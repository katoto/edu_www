<template>
    <div class="page_act_center">
        <Header></Header>
        <div class="main">
            <ul class="act_items">
                <li></li>
            </ul>
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
    .page_act_center{
        background: #242240;
        .main{
            max-width: 1190px;
            width: percentage(702/750);
            margin: 57px auto 110px;
            height: 1000px;
        }
    }
    .act_items{
        li+li{
            margin-top: 38px;
        }
    }
</style>

