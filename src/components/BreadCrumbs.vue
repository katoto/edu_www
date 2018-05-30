<template>
    <!--面包屑-->
    <div class="b-nav">
        <a href="./index.html">Home</a>
        <a href="javascript:;" class="now">terms</a>
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
        mounted(){

        }
    }
</script>
<style scoped lang="less">
    //面包屑
    .b-nav{
        height:50px;
        line-height:50px;
        a{
            position: relative;
            display: block;
            height:100%;
            float: left;
            text-transform: capitalize;
        }
        a+a{
            padding-left:4px;
            margin-left:7px;
            text-indent: 7px;
            &::before{
                content: '';
                display: block;
                position: absolute;
                width: 4px;
                height: 8px;
                left:0;
                top:21.5px;
                background-image: url("../assets/slice/b-nav.png");
            }
        }
        .now{
            color: #778ca3;
        }
    }
</style>
