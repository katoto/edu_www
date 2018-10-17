<template>
    <div id="test">
        <h1>test</h1>
        <vueScroll :data="listData" class="warp" :class-option="classOption" @ScrollEnd="end">
            <ul class="item">
                <li v-for="(item,index) in listData" :key="index">
                    <a target="_blank" href="http://www.baidu.com">
                        <span class="title" v-text="item.title"></span>
                        <span class="date" v-text="item.date"></span>
                    </a>
                </li>
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
    computed: {
        classOption () {
            return {
                step: 1,
                limitMoveNum: 5,
                singleHeight:10,
                waitTime: 1000
            }
      },
    },
    components: {
        vueScroll
    },
    mounted () {
        setTimeout(()=>{
            console.log( this.classOption )
            if( this.classOption ){
                this.singleHeight = 50
                console.log( this.classOption )
            }
        },3000)

    }
}
</script>

<style scope lang="less" type="text/less">
<<<<<<< HEAD
.indexm,
.asd {
    display: inline;
}
.warp{
    height: 100px;
    overflow: hidden;
}
=======
>>>>>>> online
</style>
