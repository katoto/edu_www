<template>
    <div>
        <Header></Header>

    </div>
</template>

<script>
    import Header from '~components/Header.vue'
    import { getURLParams, formatTime, formatNum, accMul, accDiv, formateCoinType } from '~/common/util'
    import { mapActions, mapState } from 'vuex'
    export default {
        data () {
            return {
                number: ''
            }
        },
        watch: {},
        methods: {
            ...mapActions('cs_test', ['getMyBids']),
            getMyBidsInfo () {
                this.getMyBids({
                    expectId: 1808090001,
                    lotid: '2',
                    uid: 1000250
                }).then(res => this.renderMyBet(res.data))
            },
            renderMyBet (res) {
                console.log(res)
            }
        },
        computed: {

        },
        components: {
            Header
        },
        mounted () {
            this.getMyBidsInfo()
        }
    }
</script>
<style scope lang="less" type="text/less">
</style>
