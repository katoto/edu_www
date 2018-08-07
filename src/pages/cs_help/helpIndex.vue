<template>
    <div class="help-cneter">
        <h1>
            有什么需要帮助的吗？
        </h1>
        <ul class="menu">
            <li v-for="(item,index) in dataMenu" :key="index">
                <p>
                    {{item.menu1}}
                </p>
                <ul class="sub-menu ">
                    <li v-for="(subItem1,index2) in item.menu2" :key="index2">
                        <a href="javascript:;" @click="toCheck(index,index2)">
                            {{subItem1}}
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['dataMenu'],
        data () {
            return {

            }
        },
        watch: {},
        methods: {
    // :to="{name: 'helpView',params:{a:index,b:index2}}"
            toCheck (index, index2) {
                if (index === 3 && index2 === 0) {
                    this.$router.push('/check')
                } else {
                    this.$router.push({
                        path: '/help/helpView',
                        name: 'helpView',
                        params: {
                            a: index,
                            b: index2
                        }
                    })
                }
            }
        },
        computed: {},
        components: {},
        mounted () {

        }
    }
</script>
<style scoped lang="less">
    .help-cneter{
        padding: 18px 45px 104px;
        background: #fff;
        border-radius: 6px;
    }
    h1{
        line-height: 130px;
        font-size: 30px;
        /*中文版时注意*/
        font-family: sans-eb;
        font-weight: bold;
        color: #263648;
    }
    .menu{
        display: flex;
        >li{
            flex: 1;
            p{
                line-height: 48px;
                font-size: 24px;
                color: #263648;
            }
        }
    }
    .sub-menu{
        a{
            line-height: 30px;
            font-size: 16px;
        }
    }
</style>
