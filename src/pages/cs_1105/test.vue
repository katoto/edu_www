<template>
    <div id="test">
        test
    </div>
</template>
<script>
export default {
    data () {
        return {
            lists: [
                { msg: _('General'), link: '/account/general' },
                { msg: _('My Bets'), link: '/account/myBets' },
                { msg: _('My Transactions'), link: '/account/myTransactions' },
                { msg: _('Top Up'), link: '/account/deposit' },
                { msg: _('Withdraw'), link: '/account/withdraw' }
            ]
        }
    },
    watch: {},
    methods: {},
    computed: {},
    components: {},
    mounted () {}
}
</script>

<style scope lang="less" type="text/less">
.indexm,
.asd {
    display: inline;
}
</style>
