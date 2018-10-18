<template>
    <div id="test">
        <h1>test</h1>
            <ul class="item">
                <li v-for="(item,index) in listData" :key="index">
                    <a target="_blank" href="http://www.baidu.com">
                        <span class="title" v-text="item.title"></span>
                        <span class="date" v-text="item.date"></span>
                    </a>
                </li>
            </ul>      
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
    methods: {

    },
    computed: {

    },
    components: {
    },
    mounted () {
    }
}
</script>

<style scope lang="less" type="text/less">
.indexm,
.asd {
    display: inline;
}
.warp{
    height: 100px;
    overflow: hidden;
}
</style>
