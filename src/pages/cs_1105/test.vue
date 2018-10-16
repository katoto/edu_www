<template>
    <div id="test">
        test
        <vueScroll :data="listData" class="warp" :class-option="classOption" @ScrollEnd="end">
            <ul class="item">
            <a target="_blank" href="http://www.baidu.com" v-for="item in listData">
                <span class="title" v-text="item.title"></span>
                <span class="date" v-text="item.date"></span>
            </a>
            </ul>
        </vueScroll>        
    </div>
</template>
<script>
import vueScroll from 'katoto-scroll'

export default {
    data () {
        return {
            lists: [
                { msg: _('General'), link: '/account/general' },
                { msg: _('My Bets'), link: '/account/myBets' },
                { msg: _('My Transactions'), link: '/account/myTransactions' },
                { msg: _('Top Up'), link: '/account/deposit' },
                { msg: _('Withdraw'), link: '/account/withdraw' }
            ],
            listData: [{
                'title': '无缝滚动第一行无缝滚动第一行',
                'date': '2017-12-16'
                }, {
                'title': '无缝滚动第二行无缝滚动第二行',
                'date': '2017-12-16'
                }, {
                'title': '无缝滚动第三行无缝滚动第三行',
                'date': '2017-12-16'
                }, {
                'title': '无缝滚动第四行无缝滚动第四行',
                'date': '2017-12-16'
                }, {
                'title': '无缝滚动第五行无缝滚动第五行',
                'date': '2017-12-16'
                }, {
                'title': '无缝滚动第六行无缝滚动第六行',
                'date': '2017-12-16'
                }, {
                'title': '无缝滚动第七行无缝滚动第七行',
                'date': '2017-12-16'
                }, {
                'title': '无缝滚动第八行无缝滚动第八行',
                'date': '2017-12-16'
                }, {
                'title': '无缝滚动第九行无缝滚动第九行',
                'date': '2017-12-16'
            }],            
        }
    },
    watch: {},
    methods: {
        end(){
            console.log('end')
        }
    },
    computed: {},
    components: {
        vueScroll
    },
    mounted () {}
}
</script>

<style scope lang="less" type="text/less">
.indexm,
.asd {
    display: inline;
}
</style>
