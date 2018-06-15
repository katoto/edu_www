<template>
    <!--首页右侧信息  close-->
    <div id="js_alert-mybets" class="alert-mybets" :class="{ close: !mybetShow, hide: !isLogin}">
        <div class="alert-mybets-head  js_chose-mybets-head">
            <section class="js_alert-mybets-head js_chose-mybets-head-open" :class="{ hide: mybetShow }" @click="mybetShow = true">
                <p style="padding-left: 10px">My</p>
                <p style="padding-left: 6px">Bets</p>
            </section>
            <section class="js_alert-mybets-head js_chose-mybets-head-close" :class="{ hide: !mybetShow }">
                My Bets
            </section>
            <i id="alert-mybets-close" class="alert-mybets-close js_alert-mybets-close" @click="mybetShow = false"></i>
        </div>
        <div class="alert-mybets-body">
            <!--已登录-->

            <div class="hadlogin js_isLogin js_hadlogin" :class="{ hide: !mybetShow }">
                <ul class="alert-mybets-items js_msg" id="js_mybetsItems">
                    <li >
                        <div class="top">
                            <span class="date fl">
                                NO.20338
                            </span>
                            <span class="type fr bold">
                                transaction
                            </span>
                        </div>
                        <ul class="number-box">
                            <li class="on">
                                1
                            </li>
                            <li>
                                3
                            </li>
                            <li>
                                4
                            </li>
                            <li>
                                5
                            </li>
                            <li>
                                6
                            </li>
                        </ul>
                        <div class="bottom">
                            <span class="count fl">0.123 ETH</span>
                            <a href="javascript:;" class="add fr">012x2371f...</a>
                        </div>
                    </li>
                    <!-- 
                    <li>
                        <div class="top">
                            <span class="date fl">
                                NO.20338
                            </span>
                            <span class="type fr bold">
                                transaction
                            </span>
                        </div>
                        <ul class="number-box">
                            <li class="on">
                                1
                            </li>
                            <li>
                                3
                            </li>
                            <li>
                                4
                            </li>
                            <li>
                                5
                            </li>
                            <li>
                                6
                            </li>
                        </ul>
                        <div class="bottom">
                            <span class="count fl">0.123 ETH</span>
                            <a href="javascript:;" class="add fr">012x2371f...</a>
                        </div>
                    </li>
                    -->
                </ul>
                <div class="nomsg js_nomsg" style="display: none">
                    <p>You don't have any</p>
                    <p>records in 24 hours. Have</p>
                    <p>a try ,and wish you luck~</p>
                </div>
                <router-link :to="{path: '/account/myBets'}">
                    <a href="javascript:;" class="btn-more-records" target="_blank">More Records >></a>
                </router-link>
            </div>

            <!--未登录-->
            <div class="nologin js_isLogOut js_nologin hide">
                <textarea class="js_mybetSearchVal" placeholder="Enter My Wallet Address"></textarea>
                <a href="javascript:;" class="search" id="js_mybetSearch">Search</a>
                <div class="tologin">
                    <a href="javascript:;" class="js_signInBtn">Sign in</a>
                    <a href="javascript:;" class="js_jumpSignUp">Sign Up</a>
                </div>
            </div>
        </div>
        <span class="msg-count js_msg-count" v-if="count !== 0">{{ `+${count}`  }}</span>
    </div>
</template>

<script>
export default {
    data () {
        return {
            mybetShow: false,
            count: 0
        }
    },
    methods: {
        getMyBets () {
            this.$store.dispatch('cs_1105/getMyBets', {
                pageno: 1,
                pagesize: 4,
                day: 1
            })
                .then(data => {
                    let result = data.data
                    this.$store.commit('cs_1105/updateMyBets', result.orders)
                })
        }
    },
    computed: {
        isLogin () {
            return !!this.$store.state.isLog
        }
    },
    mounted () {
        this.getMyBets()
    }
}
</script>


