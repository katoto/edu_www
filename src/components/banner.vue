<template>
    <div class="banner"  v-if="banner">
        <link>
        <router-link class="banner-main" to="/firstCharge">
            <img src="../assets/img/lucky11/banner-jackpot.png" alt="">
        </router-link>
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
            // superInPage () {
            //     /* 执行到父组件 */
            //     this.$emit('superBannerChange', 'superIn')
            // }
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
        overflow: hidden;
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
