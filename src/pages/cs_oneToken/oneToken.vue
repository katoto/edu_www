<template>
    <div id="app">
        <Header></Header>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '~components/Header.vue'
    import Footer from '~components/Footer_bk.vue'

    export default {
        data () {
            return {
                title: ''
            }
        },
        watch: {},
        methods: {},
        computed: {},
        mounted () {

        },
        components: {
            Header, Footer
        }
    }
</script>
<style>
</style>
