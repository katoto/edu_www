<template>
    <div>
        <!--面包屑-->
        <div class="b-nav" v-if="data.length === 0">
            <router-link to="/">
                <lang>Home</lang>
            </router-link>
            <router-link to="/luckycoin">
                <lang>LuckyCoin</lang>
            </router-link>
            <a href="javascript:;" class="now" v-if="pageName">
                {{_(pageName)}}
            </a>
            <a href="javascript:;" class="now" v-if="$slots.default">
                <slot/>
            </a>
        </div>
        <bread :data="data" v-else></bread>
    </div>
</template>

<script>
import Vue from 'vue'
let bread = Vue.component('bread', {
    render (h, vm) {
        let links = this.$attrs.data.map((item, index) => {
            console.log(this.$attrs.data.length - 1, index, item.name)
            return (
                (this.$attrs.data.length - 1 === index)
                    ? (<a href="javascript:;" class="now">
                        {item.name}
                    </a>)
                    : (<router-link to={item.path}>
                        {item.name}
                    </router-link>)
            )
        })
        return <div class="b-nav">{ links }</div>
    }
})
export default {
    props: {
        pageName: String,
        data: {
            type: Array,
            default () {
                return []
            }
        }
    },
    components: { bread }
}
</script>
<style lang="less" type="text/less">
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
.default {
    color: #FFF !important;
    cursor: default;
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
