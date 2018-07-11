<template>
    <div class="page-luckycoin">
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>
<script>

import Header from '~components/Header.vue'
import Footer from '~components/Footer.vue'

export default {
    components: { Header, Footer }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
    .page-luckycoin{
        background: #2a1236 url("../../assets/img/oneToKen/bg-page.png") no-repeat center top;
        background-size: cover;
    }
</style>

