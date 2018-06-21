<template>
    <div class="banner"  v-if="banner">
        <a href="./coinslot/html/worldCup.html" class="banner-main">
            <img src="../assets/img/banner.jpg" alt="">
        </a>
        <a href="javascript:;" class="banner-close" @click="closeBanner"></a>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                banner: true
            }
        },
        watch: {},
        methods: {
            closeBanner () {
                this.banner = false
            }
        },
        computed: {},
        mounted () {

        }
    }
</script>
<style scoped lang="less">
    .banner{
        position: relative;
        height:90px;
        .banner-main{
            display: block;
            position: absolute;
            left:50%;
            margin-left:-960px;
            height:90px;
        }
        .banner-close{
            display: block;
            position: absolute;
            left:50%;
            margin-left:580px;
            top:7px;
            width:20px;
            height:20px;
            overflow: hidden;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            &::after{
                content: '';
                display: block;
                background-image: url("../assets/slice/close-banner.png");
                margin:5px auto;
                width: 10px;
                height: 10px;
            }
            &:hover{
                transform: rotate(90deg);
            }
        }
    }
</style>
