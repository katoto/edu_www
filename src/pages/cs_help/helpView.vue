<template>
    <div class="page-view">
        <div class="side-nav">
            <ul class="menu">
                <li v-for="(item,index) in dataMenu" :class="{on:isOn==index}" :key="index" @click="isOn=index">
                    <p>
                        {{item.menu1}}
                    </p>
                    <ul class="sub-menu ">
                        <li v-for="(subItem1,index2) in item.menu2"  :key="index2" @click="tabChange(index,index2)">
                            {{subItem1}}
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="main-cnt">
            <keep-alive>
                <component :is="current"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import help00 from './help-components/help1-yxyz'
import help10 from './help-components/help2-rhcz'
import help11 from './help-components/help2-rhtx'
import help12 from './help-components/help2-tktj'
import help20 from './help-components/help3-lucky11'
import help21 from './help-components/help3-luckyCoin'
import help30 from './help-components/help4-cxtmx'
import help31 from './help-components/help4-contact'
export default {
    props: ['dataMenu'],
    data () {
        return {
            current: '',
            isOn: 0,
            isOn2: 0
        }
    },
    watch: {},
    methods: {
        tabChange (index, index2) {
            if (
                index === 3 && index2 === 0
            ) {
                this.$router.push({path: '/check'})
                // window.open(this.$router.resolve({path: '/check'}).href, '_blank')
            } else {
                this.$router.push({
                    path: '/helpView',
                    name: 'helpView',
                    params: {
                        a: index,
                        b: index2
                    }
                })
                this.current = 'help' + index + index2
            }
        }
    },
    computed: {

    },
    components: {
        help00,
        help10,
        help11,
        help12,
        help20,
        help21,
        help30,
        help31
    },
    mounted () {
        this.isOn = this.$route.params.a
        this.isOn2 = this.$route.params.b
        this.current = 'help' + this.isOn + this.isOn2
    }
}
</script>
<style scoped lang="less" type="text/less">
    .page-view{
        .main{
            position: relative;
            max-width: 1190px;
            margin: 0 auto;
            overflow: hidden;
        }
    }
    .side-nav{
        float: left;
        margin-right: 10px;
        width: 225px;
        .menu>li{
            position: relative;
            border-radius: 6px;
            margin-bottom: 5px;
            overflow: hidden;
            p{
                height: 40px;
                line-height: 40px;
                overflow: hidden;
                background: #8b9db0;
                text-indent: 24px;
                font-size: 14px;
                color: #fff;
                cursor: pointer;
            }
            &::after{
                content: '';
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
            &.on{
                &::after{
                    transform: rotate(180deg);
                }
                .sub-menu{
                    max-height: 200px;
                }
            }
        }
        .sub-menu{
            max-height: 0;
            transition: all 0.2s;
            overflow: hidden;
            background: #ffffff;
            li{
                height: 30px;
                line-height: 30px;
                text-indent: 24px;
                color: #6a89cc;
                cursor: pointer;
                &:hover,&.on{
                    color: #263648;
                }
            }
            li+li{
                border-top: 2px solid #eef1f9;
            }
        }
    }
    /deep/.main-cnt{
        overflow: hidden;
        background: #fff;
        border-radius: 6px;
        padding: 0 percentage(40/955) 70px;
        li+li{
            margin-top: 20px;
        }
        h1{
            margin-bottom: 10px;
            line-height: 84px;
            font-size: 26px;
        }
        .title{
            line-height: 24px;
            font-size: 16px;
        }
        .msg{
            margin-left: 1.5em;
            line-height: 16px;
            font-size: 14px;
        }
        .cicle{
            text-indent: -0.8em;
            margin: 0 0 10px 1.5em;
            line-height: 16px;
            font-size: 14px;
        }
    }


    @media (max-width: 992px) {
        .side-nav{
            float: none;
            margin-right: 0;
            width: 100%;
        }
    }
    @media (max-width: 480px) {

    }
</style>
