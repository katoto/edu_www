<template>
    <div class="filter">
          <div class="item">
                <span class="">All bets</span>
                <ul class="">
                    <li>
                        All bets
                    </li>
                    <li>
                        win bets
                    </li>
                </ul>
            </div>
            <div class="item ">
                <span class="">Last 30 days</span>
                <ul class="">
                    <li>
                        Last 30 days
                    </li>
                    <li>
                        Last 7 days
                    </li>
                </ul>
            </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {}
        },
        watch: {},
        methods: {},
        computed: {},
        components: {},
        mounted(){

        }
    }
</script>
<style scoped lang="less">
@import "../styles/lib-mixins.less";
//下拉筛选
.filter{
    font-size:14px;
    .clearfix();
    .item{
        cursor: pointer;
        position: relative;
        z-index:3;
        float: left;
        margin-right:10px;
        line-height:23px;
        color: #6a89cc;
        border:1px solid #d5d5d5;
        border-radius:6px;
        &::after{
            content: '';
            display: block;
            position: absolute;
            right:9px;
            top:9px;
            background-image: url("../assets/slice/arrow-down-select.png");
            width: 9px;
            height: 5px;
        }
        &:hover{
            border-color: #778ca3;
        }
        >span{
            display: block;
            padding:0 30px 0 10px;
            min-width:80px;
        }
        ul{
            display: none;
            position: relative;
            z-index:9;
            width:100%;
            background: #fff;
            text-indent: 10px;
            overflow: hidden;
            border-bottom-left-radius:6px;
            border-bottom-right-radius:6px;
        }
        li{
            border-top:1px solid #778ca3;
            &.on,&:hover{
                background: #eef1f9;
                color: #263648;
            }
        }
    }
}
</style>
