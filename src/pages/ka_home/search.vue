<template>
    <div>
        <div class="search_box">
            <div class="search_content">
                <h3><span style="color:red">vip电影</span>免费观看，还不快邀请你的小伙伴！</h3>
                <div class="search_inp">
                    <input v-model="searchVal" placeholder="黏贴小电影链接"></input>
                    <p @click='jump2Play'>开启</p>
                    <p @click='jump2baidu'>百度搜索</p>
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
            if (this.searchVal !== '') {
                window.open('https://www.baidu.com/s?wd=' + this.searchVal)
            } else {
                this.$error('请输入查询信息')
            }
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
  font-size: 14px;
  background: url("../../assets/images/kv.jpg") top center;
  .search_content {
    width: 100%;
    max-width: 664px;
    margin: 0 auto;
    padding-top: 80px;
    h3 {
      font-size: 18px;
      line-height: 28px;
      padding: 10px 0;
    }
    .search_inp {
      width: 100%;
      height: 40px;
      position: relative;
      input {
        height: 38px;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding-left: 10px;
        float: left;
        width: 100%;
        max-width: 450px;
        margin-right: 10px;
      }
      p {
        float: left;
        text-align: center;
        line-height: 40px;
        padding: 0 18px;
        border-radius: 4px;
        color: #fff;
        background-color: #409eff;
        cursor: pointer;
      }
      p:last-child {
        margin-left: 10px;
      }
    }
  }
  .hot-search {
    margin-top: 10px;
    font-size: 16px;
  }
}
</style>

