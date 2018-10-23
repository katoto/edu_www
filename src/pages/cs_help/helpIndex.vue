<template>
    <div class="help-cneter">
        <h1>
            <lang>Q & A</lang>
        </h1>
        <ul class="menu">
            <li v-for="(item,index) in dataMenu" :key="index">
                <p>
                    {{_(item.menu1)}}
                </p>
                <ul class="sub-menu ">
                    <li v-for="(subItem1,index2) in item.menu2" :key="index2" :class="[index==3&&index2==0?'hide':'']">
                        <a href="javascript:;" @click="toCheck(index,index2,subItem1)">
                            {{_(subItem1)}}
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
            toCheck (index, index2, subItem1) {
                if (index === 3 && index2 === 0) {
                    this.$router.push('/check')
                } else {
                    this.$router.push({
                        path: '/help/helpView',
                        name: 'helpView',
                        params: {
                            a: index,
                            b: index2,
                            c: subItem1
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
<style scoped lang="less" type="text/less">
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
        text-align: center;
    }
    .menu{
        overflow: hidden;
        >li{
            float: left;
            width: 25%;
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


    @media (max-width: 992px) {
        .help-cneter{
            padding: 18px 20px 40px;
        }
        h1{
            line-height: 60px;
            font-size: 20px;
        }
        .menu{
            >li{
                width: 50%;
                text-align: center;
                margin-bottom: 10px;
                p{
                    line-height: 24px;
                    font-size: 18px;
                }
            }
        }
        .sub-menu{
            a{
                line-height: 20px;
                font-size: 14px;
            }
        }
    }
    @media (max-width: 480px) {

    }

</style>
