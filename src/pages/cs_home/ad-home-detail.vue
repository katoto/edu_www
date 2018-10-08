<template>
    <div>
        <Header></Header>
        <div class="main">
            <BreadCrumbs :data="[{ name: _('Home'), path: '/' }, { name: '优惠中心', path: '/ad' }, { name: '活动'}]"></BreadCrumbs>
            <div class="container">
                <div class="ad-item row" v-for="(item, index) in list" :key="index">
                    <img :src="item.img_url">
                    <div class="content-box">
                        <h3>{{item.label}}</h3>
                        <p>{{item.description}}</p>
                        <p class="time">活动时间: {{item.start}} - {{item.end}}</p>
                        <div class="center href-box">
                            <a href="javascript: void(0);">立即参与</a>
                        </div>
                        <p class="center">活动超详细规则</p>
                        <p>{{item.content}}</p>
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
import BreadCrumbs from '~/components/BreadCrumbs.vue'
export default {
    components: { Header, Footer, BreadCrumbs },
    data () {
        return {
            list: []
        }
    },
    methods: {
        getID () {
            return this.$router.history.current.query.id
        },
        getList () {
            this.$store.dispatch('getAdListInfo')
                .then(res => {
                    this.list = [...res.data].filter(item => item.id === this.getID())
                })
        }
    },
    mounted () {
        this.getList()
    }
}
</script>


<style lang="less" scoped>
@import "../../styles/lib-media2.less";
.center {
    text-align: center
}
.main {
    background: url(../../assets/img/home/bg0.jpg);
    padding-top: 20px;
    .row {
        padding: 40px;
    }
    img {
        width: 500px;
        background-color: purple;
        height: 200px;
        margin: 0 auto;
        display: block;
    }
    .ad-item {
        background-color: #FFF;
    }
    p, .href-box {
        margin-bottom: 20px;
    }
    a {
        border: solid 1px #000;
        padding: 4px 10px;
        color: #000;
    }
    .content-box {
        width: 600px;
        margin: 0 auto;
        h3 {
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            margin: 10px;
        }
    }
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

