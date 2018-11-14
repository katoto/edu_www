<template>
    <div>
        <Search></Search>
        <section class="ka_body">
            <section class="movieContent">
                <h2>热门电影</h2>
                <div class="container">
                    <ul class="row">
                        <li v-for="item in movie" class="col-lg-2 col-md-4 col-sm-4 col-xs-6">
                            <router-link :to="`/play/${encodeURIComponent(item.picLink)}`">
                                <img :src="item.pic" :alt="item.desc">
                            </router-link>
                            <p>{{ item.name }}</p>
                        </li>
                    </ul>
                    <router-link to="/movie" class="more" href="javascript:;">
                        更多电影》》
                    </router-link>
                    <a></a>
                </div>
            </section>
            <section class="tvContent">
                <h2>热门MV</h2>
                <div class="container">
                    <ul class="row">
                        <li v-for="item in music" class="col-lg-2 col-md-4 col-sm-4 col-xs-6">
                            <router-link :to="`/play/${encodeURIComponent(item.picLink)}`">
                                <img :src="item.pic" :alt="item.name">
                            </router-link>
                            <p>{{ item.name }}</p>
                        </li>
                    </ul>
                    <router-link to="/tvplay" class="more" href="javascript:;">
                        更多MV》》
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
            movie: null,
            music: null
        }
    },
    watch: {},
    methods: {
        async initPage () {
            let list = await this.$store.dispatch('getiqiyiInfo')
            if (list && list.status === '100') {
                this.movie = list.data.movie.slice(0, 12)
                this.music = list.data.music.slice(0, 12)
            }
        }
    },
    computed: {},
    components: {
        Search
    },
    mounted () {
        this.initPage()
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
      margin-bottom: 20px;
      a {
        display: block;
        width: 100%;
        height: 100%;
        img {
          display: inline-block;
          width: 100%;
          height: 240px;
          transition: all 0.3s;
          &:hover {
            transform: scale(1.1);
          }
        }
      }
      p {
        margin-top: 12px;
        font-size: 16px;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
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
