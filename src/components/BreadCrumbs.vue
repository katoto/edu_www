<template>
    <!--面包屑-->
    <div class="b-nav">
        <router-link to="/">
            <lang>Home</lang>
        </router-link>
        <router-link to="/luckycoin">
            <lang>LuckyCoin</lang>
        </router-link>
        <a href="javascript:;" class="now">
            {{_(pageName)}}
        </a>
    </div>
</template>

<script>
export default {
    props: {
        pageName: String
    }
}
</script>
<style scoped lang="less" type="text/less">
//面包屑
.b-nav {
  height: 50px;
  line-height: 50px;
  a {
    position: relative;
    display: block;
    height: 100%;
    float: left;
    text-transform: capitalize;
  }
  a + a {
    padding-left: 4px;
    margin-left: 7px;
    text-indent: 7px;
    &::before {
      content: "";
      display: block;
      position: absolute;
      width: 4px;
      height: 8px;
      left: 0;
      top: 21.5px;
      background-image: url("../assets/slice/b-nav.png");
    }
  }
  .now {
    color: #778ca3;
  }
}

.page-luckycoin {
  .b-nav {
    a {
      color: #aa85ff;
        &:hover{
            color: #7e5bcf;
        }
    }
    a.now {
      color: #a99acc;
    }
  }
}
</style>
