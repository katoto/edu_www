<template>
    <div>
        <div class="search_box">
            <div class="search_content">
                <h3>vip电影免费观看，还不快邀请你的小伙伴！</h3>
                <div class="search_inp">
                    <el-input v-model="searchVal" placeholder="黏贴小电影链接"></el-input>
                    <el-button icon="el-icon-search" @click='jump2Play'>开启</el-button>
                    <el-button type="primary" @click='jump2baidu'>百度搜索</el-button>
                </div>
                <p class="hot-search">
                    <span>热门搜索：</span>
                    <a href="">aaa</a>
                    <a href="">bbb</a>
                    <a href="">ccc</a>
                    <a href="">ddd</a>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            searchVal: ''
        }
    },
    watch: {},
    methods: {
        jump2Play () {
            if (this.searchVal !== '' && this.searchVal.indexOf('http') > -1) {
                this.$router.push('/play/' + this.searchVal)
            } else {
                this.$error('请输入正确的查询链接')
            }
        },
        jump2baidu () {
            window.open('https://www.baidu.com/s?wd=' + this.searchVal)
        }
    },
    computed: {},
    components: {

    },
    mounted () {

    }
}
</script>
<style scoped lang="less" type="text/less">
.search_box {
  height: 320px;
  width: 100%;
  background: url("../../assets/images/kv.jpg") top center;
  .search_content {
    width: 100%;
    max-width: 664px;
    margin: 0 auto;
  }
  .search_inp {
    width: 100%;
    height: 40px;
    position: relative;
    input {
      height: 100%;
      padding-left: 10px;
      border: 1px solid #fff;
    }
  }
}
</style>

