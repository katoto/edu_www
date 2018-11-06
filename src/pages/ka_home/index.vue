<template>
    <div>
        <Search></Search>
        <section class="ka_body">
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
                    <router-link to="/movie" class="more" href="javascript:;">
                        更多电影》》
                    </router-link>
                    <a></a>
                </div>
            </section>
            <section class="tvContent">
                <h2>热门电视剧</h2>
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
                    <router-link to="/tvplay" class="more" href="javascript:;">
                        更多电视剧》》
                    </router-link>
                </div>
            </section>
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
.ka_body {
  h2 {
    margin-top: 10px;
    font-size: 22px;
    line-height: 80px;
    font-weight: 600;
    color: #666;
    text-align: center;
  }
  .movieContent,
  .tvContent {
    margin-bottom: 30px;
    li {
      text-align: center;
      cursor: pointer;
      img {
        display: inline;
        height: 240px;
        transition: all 0.3s;
        &:hover{
          transform: scale(1.1);
        }
      }
      p{
          margin-top: 12px;
          font-size: 16px;
      }
    }
    .more {
      float: right;
      margin-top: 30px;
    }
  }
  .tvContent {
    margin-bottom: 60px;
  }
}
</style>
