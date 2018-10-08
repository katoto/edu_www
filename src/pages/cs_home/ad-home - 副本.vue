<template>
    <div>
        <Header></Header>
        
        <div class="main">
            <div class="container">
                <div class="ad-item row" v-for="(item, index) in list" :key="index">
                    <img :src="item.img_url" alt="" class="left">
                    <div class="left content-box">
                        <h3>{{item.label}}</h3>
                        <p>{{item.description}}</p>
                        <p class="time">活动时间: {{item.start}} - {{item.end}}</p>
                        <div>
                            <a href="javascript: void(0);">立即参与</a>
                            <router-link :to="{path: '/adDetail', query: { id: item.id }}" v-if="item.target && item.target.length > 0">
                                查看更多
                            </router-link>
                        </div>
                    </div>
                    <span class="active mark" v-if="item.status === '1'">新活动</span>
                    <span class="in-progress mark hide" v-if="item.status === '2'">进行中</span>
                    <span class="over mark" v-if="item.status === '3'">已结束</span>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '~components/Header.vue'
import Footer from '~components/Footer.vue'

export default {
    components: { Header, Footer },
    data () {
        return {
            list: []
        }
    },
    methods: {
        getList () {
            this.$store.dispatch('getAdListInfo')
                .then(res => {
                    this.list = [...res.data]
                })
        }
    },
    computed: {
        thisLang () {
            if (this.$isZhCn) {
                return 'cn'
            } else if (this.$isZhTw) {
                return 'tw'
            } else {
                return 'en'
            }
        }
    },
    mounted () {
        this.getList()
    }
}
</script>


<style lang="less" scoped  type="text/less">
@import "../../styles/lib-media2.less";

.main {
    background: url(../../assets/img/home/bg0.jpg);
    padding-top: 20px;
    .row {
        position: relative;
        background-color: #FFF;
        padding: 10px;
        margin-bottom: 20px;
        img {
            width: 40%;
            height: 200px;
            background-color: purple;
        }
        .mark {
            position: absolute;
            background-color: gray;
            padding: 4px 6px 4px 10px;
            border-radius: 10px 0 0 10px;
            top: 0;
            right: 0;
        }
        .content-box {
            margin-left: 20px;
            padding-top: 10px;
            .time {
                color: gray;
            }
            p {
                margin-bottom: 20px;
            }
            a {
                border: solid 1px #000;
                padding: 4px 10px;
                color: #000;
                margin-right: 40px;
            }
            h3 {
                font-size: 23px;
                font-weight: bold;
                margin-bottom: 10px;
            }
        }
    }
}
.left {
    float: left;
}

@media (max-width: @screen-tablet) {
    .main {
        .row img {
            width: 100%;
        }
    }
}
@media (max-width: @screen-phone) {
    .main {
        .row img {
            width: 100%;
        }
    }
}
</style>

