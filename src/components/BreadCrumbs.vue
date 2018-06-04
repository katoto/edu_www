<template>
    <!--面包屑-->
    <div class="b-nav">
        <router-link to="/">Home</router-link>
        <a href="javascript:;" class="now">
            {{mysite}}
        </a>
    </div>
</template>

<script>
    import store from '../store'
    export default {
        data(){
            return {
            }
        },
        watch: {},
        methods: {},
        computed: {
            mysite(){
               return this.$store.state.route.name
            }
        },
        mounted(){

        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
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
