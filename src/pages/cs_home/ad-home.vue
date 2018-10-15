<template>
    <div class="page_act_center">
        <Header></Header>
        <div class="main">
            <ul class="act_items " v-if="this.list.length > 0">
                <li v-for="(item, index) in list" :key="index" :style="`background: ${item.bg_color || '#3b2860'}`" class="icon_over" :datamsg="getMsgTab(item)">
                    <img :src="`https://www.coinsprize.com${item.img_url}`" alt="" class="img_ad">
                    <div class="ad_view">
                        <h3 class="ad_t" v-html="item.label">
                        </h3>
                        <p class="ad_msg" v-html="item.description">
                        </p>
                        <p class="ad_time">
                            {{$lang.risk.a32}}: {{formatTime(Number(item.start), 'yyyy-MM-dd HH:mm:ss')}} - {{formatTime(Number(item.end), 'yyyy-MM-dd HH:mm:ss')}}
                        </p>
                        <div class="ad_btn_box" v-if="item.title_key !== 'register_gift'">
                            <a href="javascript:;" class="ad_btn ad_btn_join" @click="join(item)">
                                {{$lang.risk.a33}}
                            </a>
                            <router-link :to="{path: item.target, query: { id: item.id }}" v-if="item.target && item.target.length > 0" class="ad_btn ad_btn_more">
                                {{$lang.risk.a34}}
                            </router-link>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="nomsg" v-else>
                <img src="@/assets/img/nomsg.png" alt="">
                <p>
                    {{$lang.risk.a40}}, <router-link :to="{path: '/'}"><lang>Try a luck !</lang></router-link>
                </p>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '~components/Header.vue'
import Footer from '~components/Footer.vue'
import { formatTime } from '~/common/util'
import FirstChargeMixin from '../cs_activity/cs_firstCharge_mixin'
export default {
    components: { Header, Footer },
    mixins: [FirstChargeMixin],
    data () {
        return {
            list: []
        }
    },
    computed: {
        isLogin () {
            return this.$store.state.isLog
        }
    },
    methods: {
        formatTime,
        isNew (startTime, endTime) {
            let thisTime = new Date().getTime()
            return (
                thisTime - startTime < 10 * 24 * 3600 * 1000 &&
                thisTime < endTime
            )
        },
        isGoing (startTime, endTime) {
            let thisTime = new Date().getTime()
            return (
                thisTime - startTime > 10 * 24 * 3600 * 1000 &&
                thisTime < endTime
            )
        },
        getMsgTab (data) {
            let startTime = Number(data.start) * 1000
            let endTime = Number(data.end) * 1000
            if (this.isNew(startTime, endTime)) {
                return this.$lang.risk.a29
            } else if (this.isGoing(startTime, endTime)) {
                return this.$lang.risk.a30
            }
            return this.$lang.risk.a31
        },
        getList () {
            this.$store.dispatch('getAdListInfo').then(res => {
                this.list = [...res.data]
            })
        },
        join (data) {
            if (this.getMsgTab(data) === this.$lang.risk.a31) {
                this.$error(this.$lang.risk.a35)
            } else if (data.title_key === 'first_recharge') {
                this.getFirstBtn()
            } else if (!this.isLogin && data.title_key === 'register_gift') {
                this.$store.commit('showRegPop')
            }
        }
    },
    mounted () {
        this.getList()
    }
}
</script>


<style lang="less" scoped  type="text/less">
@media (min-width: 768px) {
    .page_act_center {
        background: #242240;
        .main {
            max-width: 1190px;
            width: percentage(702/750);
            margin: 57px auto 110px;
        }
        .nomsg {
            margin: 30px auto;
            text-align: center;
            color: #766490;
            img {
                margin: 0 auto;
            }
            a {
                &:hover {
                    color: currentColor;
                    filter: brightness(1.3);
                }
            }
        }
    }
    .act_items {
        li {
            position: relative;
            height: 290px;
            border-radius: 6px;
            overflow: hidden;
            color: #fff;
            &::before {
                content: attr(datamsg);
                display: block;
                position: absolute;
                right: 0;
                top: 0;
                min-width: 97px;
                height: 32px;
                overflow: hidden;
                background: rgba(255, 255, 255, 0.1);
                font-size: 16px;
                text-align: center;
                line-height: 32px;
                font-style: italic;
                border-top-left-radius: 10px;
                border-bottom-left-radius: 16px;
                z-index: 3;
            }
            /*&.icon_new{*/
            /*&::before{*/
            /*content: 'New';*/
            /*}*/
            /*}*/
            /*&.icon_pro{*/
            /*&::before{*/
            /*content: 'Processing';*/
            /*}*/
            /*}*/
            /*&.icon_over{*/
            /*&::before{*/
            /*content: 'Over';*/
            /*}*/
            /*}*/
        }
        li + li {
            margin-top: 38px;
        }
        .img_ad {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            z-index: 1;
        }
        .ad_view {
            position: relative;
            margin: 0 0 0 percentage(550/1190);
            height: 100%;
            z-index: 2;
            overflow: hidden;
        }
        .ad_t {
            margin-top: 44px;
            height: 42px;
            line-height: 42px;
            overflow: hidden;
            font-size: 32px;
            font-family: sans-eb;
            font-style: italic;
        }
        .ad_msg,
        .ad_time {
            margin-right: 115px;
            max-height: 24 * 2px;
            margin-top: 8px;
            line-height: 24px;
            font-size: 16px;

            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .ad_btn_box {
            position: absolute;
            display: flex;
            right: 43px;
            bottom: 27px;
        }
        .ad_btn {
            display: block;
            box-sizing: border-box;
            width: 150px;
            height: 50px;
            overflow: hidden;
            margin-left: 20px;
            text-align: center;
            line-height: 50px;
            border-radius: 6px;
            color: #fff;
            font-size: 20px;
            font-weight: bold;
            &:hover {
                filter: brightness(1.2);
            }
            &.ad_btn_join {
                background: #fb8221;
            }
            &.ad_btn_more {
                border: 1px solid #fff;
            }
        }
    }
}
</style>
<style scoped lang="less" type="text/less">
@import "adHomeH5.less";
</style>
