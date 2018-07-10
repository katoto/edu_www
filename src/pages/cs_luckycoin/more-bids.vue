<template>
    <div class="main">
        More bids
    </div>
</template>
<script>
import Header from '~components/Header.vue'
import Footer from '~components/Footer.vue'
import { mapActions } from 'vuex'

export default {
    data () {
        return {
        }
    },
    methods: {
        ...mapActions(['updateLuckyCoinPage'])
    },
    computed: {},
    mounted () {
        this.updateLuckyCoinPage()
    },
    components: { Header, Footer }
}
</script>
<style lang="less" scoped
</style>