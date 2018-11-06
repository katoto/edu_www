<template>
    <div>
        <Search></Search>
        <section class="movieContent">
            <h2>热门电影</h2>
            <div class="container">
                <ul class="row">
                    <li class="col-lg-2 col-md-4 col-sm-4 col-xs-6">
                        <img src="//pic2.iqiyipic.com/image/20181031/70/7c/v_120365437_m_601_m3_260_360.jpg" alt="">
                        <p>电影名称</p>
                    </li>
                    <li class="col-lg-2 col-md-4 col-sm-4 col-xs-6">
                        <img src="http://pic6.iqiyipic.com/image/20180220/42/9e/v_114654279_m_601_m3_180_236.jpg" alt="">
                        <p>电影名称</p>
                    </li>
                    <li class="col-lg-2 col-md-4 col-sm-4 hidden-xs">
                        <img src="http://pic6.iqiyipic.com/image/20180220/42/9e/v_114654279_m_601_m3_180_236.jpg" alt="">
                        <p>电影名称</p>
                    </li>
                    <li class="col-lg-2 hidden-md hidden-sm hidden-xs">
                        <img src="http://pic6.iqiyipic.com/image/20180220/42/9e/v_114654279_m_601_m3_180_236.jpg" alt="">
                        <p>电影名称</p>
                    </li>
                    <li class="col-lg-2 hidden-md hidden-sm hidden-xs">
                        <img src="http://pic6.iqiyipic.com/image/20180220/42/9e/v_114654279_m_601_m3_180_236.jpg" alt="">
                        <p>电影名称</p>
                    </li>
                    <li class="col-lg-2 hidden-md hidden-sm hidden-xs">
                        <img src="http://pic6.iqiyipic.com/image/20180220/42/9e/v_114654279_m_601_m3_180_236.jpg" alt="">
                        <p>电影名称</p>
                    </li>
                </ul>
            </div>
        </section>
        <section class="tvContent">
            <h2>热门电视剧</h2>
            <ul>
                <li><img src="" alt=""></li>
                <li><img src="" alt=""></li>
            </ul>
        </section>
    </div>
</template>
<script>
import Search from '~/pages/ka_home/search.vue'
export default {
    data () {
        return {
            top1: ''
        }
    },
    watch: {},
    methods: {
    },
    computed: {},
    components: {
        Search
    },
    mounted () {
    }
}
</script>

<style  lang="less" type="text/less">
@import "../../styles/lib-media.less";
.movieContent {
  li {
    text-align: center;
    background-color: aqua;
    img {
      display: inline;
      height: 240px;
    }
  }
}
</style>
