<template>
    <div class="page-view">
        <div class="side-nav visible-md visible-lg">
            <ul class="menu">
                <li v-for="(item,index) in dataMenu" :class="{on:isOn == index}" :key="index" @click="isOn=index; isOn2='1000'">
                    <p>
                        {{_(item.menu1)}}
                    </p>
                    <ul class="sub-menu ">
                        <li v-for="(subItem1,index2) in item.menu2" :key="index2" @click.prevent.stop="tabChange(index,index2,subItem1)" :class="{ on: isOn == index && isOn2 == index2}">
                            {{_(subItem1)}}
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!--移动端-->
        <div class="pop-mask hidden-md hidden-lg" :class="{hide:!isShowH5SideBar}"></div>
        <div class="h5-slide-bar hidden-md hidden-lg" :class="{show:isShowH5SideBar}">
             <p> {{_(h5NavHelpMsg)}}</p>
            <div class="btn" @click="isShowH5SideBar = !isShowH5SideBar">
                <span></span><span></span><span></span>
            </div>
            <ul>
                <li v-for="(item,index) in dataMenu" :key="index">
                    <ul>
                        <li v-for="(item1,index1) in item.menu2" :key="index1" @click.prevent.stop="tabChange(index,index1,item1)" :class="[index==3&&index1==0?'hide':'']">
                          <a href="javascript:;">
                              {{_(item1)}}
                          </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="main-cnt">
            <keep-alive>
                <component :is="current" ref="helpView"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import help00 from './help-components/help1-yxyz'
import help01 from './help-components/help1-cc'
import help10 from './help-components/help2-rhcz'
import help11 from './help-components/help2-rhtx'
import help12 from './help-components/help2-tktj'
import help20 from './help-components/help3-lucky11'
import help21 from './help-components/help3-luckyCoin'
import help22 from './help-components/help3-luckyPoker'
import help30 from './help-components/help4-cxtmx'
import help31 from './help-components/help4-contact'
export default {
    props: ['dataMenu'],
    data () {
        return {
            current: '',
            isOn: 0,
            isOn2: 0,
            isShowH5SideBar: false,
            h5NavHelpMsg: ''
        }
    },
    watch: {},
    methods: {
        tabChange (index, index2, item1) {
            if (index === 3 && index2 === 0) {
                this.$router.push({ path: '/check' })
            } else {
                this.$router.push({
                    path: '/helpView',
                    name: 'helpView',
                    params: {
                        a: index,
                        b: index2,
                        c: item1
                    }
                })
                this.current = 'help' + index + index2
                this.isOn = index
                this.isOn2 = index2
                this.h5NavHelpMsg = item1
                this.isShowH5SideBar = false
            }
        }
    },
    computed: {
    },
    components: {
        help00,
        help01,
        help10,
        help11,
        help12,
        help20,
        help21,
        help22,
        help30,
        help31
    },
    mounted () {
        this.isOn = this.$route.params.a
        this.isOn2 = this.$route.params.b
        this.h5NavHelpMsg = this.$route.params.c
        this.current = 'help' + this.isOn + this.isOn2
    }
}
</script>
<style scoped lang="less" type="text/less">
.page-view {
  .main {
    position: relative;
    max-width: 1190px;
    margin: 0 auto;
    overflow: hidden;
  }
}
.side-nav {
  float: left;
  margin-right: 10px;
  width: 225px;
  .menu > li {
    position: relative;
    border-radius: 6px;
    margin-bottom: 5px;
    overflow: hidden;
    p {
      height: 40px;
      line-height: 40px;
      overflow: hidden;
      background: #8b9db0;
      text-indent: 24px;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
    }
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 15px;
      right: 16px;
      width: 16px;
      height: 10px;
      overflow: hidden;
      background: url("../../assets/img/icon-arrow-down.png") no-repeat center;
      transition: all 0.2s;
    }
    &.on {
      &::after {
        transform: rotate(180deg);
      }
      .sub-menu {
        max-height: 200px;
      }
    }
  }
  .sub-menu {
    max-height: 0;
    transition: all 0.2s;
    overflow: hidden;
    background: #ffffff;
    li {
      height: 30px;
      line-height: 30px;
      text-indent: 24px;
      color: #6a89cc;
      cursor: pointer;
      &:hover,
      &.on {
        color: #263648;
      }
    }
    li + li {
      border-top: 2px solid #eef1f9;
    }
  }
}
/deep/.main-cnt {
  overflow: hidden;
  background: #fff;
  border-radius: 6px;
  padding: 0 percentage(40/955) 70px;
  li + li {
    margin-top: 20px;
  }
  h1 {
    margin-bottom: 10px;
    line-height: 84px;
    font-size: 26px;
    font-weight: bold;
  }
  .title {
    line-height: 24px;
    font-size: 16px;
    font-weight: bold;
  }
  .msg {
    line-height: 20px;
    font-size: 14px;
  }
  .cicle {
    text-indent: -0.8em;
    margin: 0 0 10px 1.5em;
    line-height: 16px;
    font-size: 14px;
  }
}

@media (max-width: 992px) {
  .side-nav {
    float: none;
    margin-right: 0;
    width: 100%;
  }
 /deep/ .main-cnt{
    margin-top: 60px;
    padding-top: 20px;
    .title{
        line-height: 32px;
        font-size: 16px;
        font-weight: bold;
    }
    .msg{
        line-height: 20px;
        font-size: 14px;
    }
  }
}
@media (max-width: 480px) {
}
.pop-mask {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 10;
}
.h5-slide-bar {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
  height: 95/2px;
  padding: 0 percentage(30/710);
  line-height: 95/2px;
  overflow: hidden;
  background: #ffffff;
  border-radius: 6px;
  color: #263648;
  font-size: 36/2px;
  &::before {
    content: attr(data-msg);
    display: block;
    position: absolute;
    left: 85px;
    bottom: 70px;
    border-radius: 2px;
    background: #36c57a;
    line-height: 18px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    padding: 0 5px;
  }
  > p {
    float: left;
    width: 90%;
  }
  .btn {
    float: right;
    position: relative;
    width: 20px;
    height: 20px;
    margin: 27.5/2px auto;
    cursor: pointer;
    span {
      position: absolute;
      left: 0;
      display: block;
      width: 100%;
      height: 2px;
      background: #000000;
      border-radius: 2px;
      top: 7px;
      transition: all 0.2s;
      transform-origin: left center;
    }
    span:first-child {
      top: 0;
    }
    span:last-child {
      top: 15px;
    }
  }
  ul {
    display: none;
    clear: both;
    li {
      a {
        display: block;
        line-height: 90/2px;
        font-size: 36/2px;
      }
    }
  }
  &.show {
    z-index: 11;
    height: 455px;
    ul {
      display: block;
    }
  }
}
</style>
