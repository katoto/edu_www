<template>
    <div class="container b-listtab-main">
        <ul class="list clearfix" style="margin-top: 16px;">
            <li class="item" v-for="(item,index) in movie">
                <router-link class="js-tongjic" :to="`/play/${encodeURIComponent(item.picLink)}`">
                    <div class="cover g-playicon">
                        <img :src="item.pic" :alt="item.desc">
                        <span class="pay">免费看</span>
                        <div class="mask-wrap">
                            <span class="hint">2018</span>
                            <span class="point">{{ item.score }}</span>
                        </div>
                    </div>
                    <div class="detail">
                        <p class="title g-clear">
                            <span class="s1">{{ item.name }}</span>
                        </p>
                        <p class="star">{{ item.desc }}</p>
                    </div>
                </router-link>
            </li>

        </ul>
    </div>
</template>
<script>
export default {
    data () {
        return {
            movie: null
        }
    },
    watch: {},
    components: {},
    methods: {
        async initPage () {
            let list = await this.$store.dispatch('getiqiyiInfo')
            if (list && list.status === '100') {
                this.movie = list.data.movie
            }
        }
    },
    computed: {
    },
    mounted () {
        this.initPage()
    }
}
</script>
<style lang="less" scoped type="text/less">
.waiting {
  width: 100%;
  height: 500px;
  line-height: 500px;
  font-size: 22px;
}
.b-listtab-main {
  margin-top: 0px;
  padding-top: 0px;
  overflow: hidden;
  border-top: 1px solid #eee;
  .item {
    float: left;
    width: 191px;
    height: 311px;
    border-bottom: 1px solid #e9e9e9;
    margin: 0 0 20px 20px;
  }
  .cover {
    width: 100%;
    height: 258px;
    overflow: hidden;
    position: relative;
    font-size: 12px;
    background: url(/wp-content/themes/08yingyuan/img/loading.gif);
    background-size: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .pay {
    position: absolute;
    top: 4px;
    left: 4px;
    display: block;
    width: 39px;
    height: 19px;
    line-height: 19px;
    background: #cd1919;
    color: #fff;
    text-align: center;
    border-radius: 2px;
  }
  .detail {
    width: 100%;
    background: #fff;
  }
  .hint {
    position: absolute;
    right: 4px;
    bottom: 4px;
    padding: 2px 6px;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    border-radius: 2px;
  }
  .title {
    font-size: 14px;
    padding: 7px 5px 3px 5px;
  }
  .star {
    font-size: 12px;
    color: #999;
    margin: 0 5px;
    width: 170px;
    height: 18px;
    line-height: 18px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
