<template>
    <div class="container b-listtab-main">
        <ul class="list clearfix" style="margin-top: 16px;min-height:600px;">
            <li class="item" v-for="(item,index) in tvlist">
                <router-link class="js-tongjic" :to="`/play/${encodeURIComponent(item.picLink)}`">
                    <div class="cover g-playicon">
                        <img :src="item.pic" :alt="item.name">
                        <span class="pay">免费看</span>
                        <div class="mask-wrap">
                            <span class="hint">{{ item.tvLenDesc }}</span>
                        </div>
                    </div>
                    <div class="detail">
                        <p class="title g-clear">
                            <span class="s1">{{ item.name }}</span>
                            <span class="point fr">2018</span>
                        </p>
                        <!-- <p class="star">{{ item.desc }}</p> -->
                    </div>
                </router-link>
            </li>

        </ul>
        <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" @size-change="sizeChange" background :current-page.sync="pageno" size="small" :page-size="pageSize" layout="prev, pager, next,jumper" :page-count="PageTotal" :next-text="'下一页'" :prev-text="'上一页'">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            tvlist: [],
            pageSize: 15,
            PageTotal: 3,
            pageno: 1
        }
    },
    watch: {},
    components: {},
    methods: {
        sizeChange (size) {
            this.pageSize = size
            this.handleCurrentChange()
        },
        async handleCurrentChange (pageno = this.pageno) {
            this.h5pageno += 1
            let params = {
                pageno,
                pagesize: this.pageSize
            }
            let data = await this.$store.dispatch('iqiyiTvlist', params)
            console.log(data)
            data = data.data
            if (data) {
                this.tvlist = data.tvMsg
                this.PageTotal = data.totalPages
            }
        }
    },
    computed: {
    },
    async mounted () {
        this.handleCurrentChange()
    }
}
</script>
<style lang="less" scoped type="text/less">
@import "../../styles/lib-media.less";

.waiting {
  width: 100%;
  height: 500px;
  line-height: 500px;
  font-size: 22px;
}
.pagination {
  text-align: center;
  margin-bottom: 20px;
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
    .point {
      margin-right: 5px;
      color: #ff722c;
    }
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
/* xs超小屏幕（手机，最大 480） */
@media (max-width: @screen-phone) {
  .b-listtab-main {
    .item {
      width: 45%;
      height: 254px;
      max-width: 150px;
      border-bottom: 1px solid #e9e9e9;
      margin: 0 0 10px 10px;
    }
    .cover {
      width: 100%;
      height: 200px;
    }
  }
}
</style>