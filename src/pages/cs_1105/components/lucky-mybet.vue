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
                    <li v-for="(bet, index) in myBetList" :key="index" v-if="myBetList.length > 0">
                        <div class="top">
                            <span class="date fl">
                                NO.{{bet.expectid}}
                            </span>
                            <span class="type fr bold" :class="{'green':(bet.opencode && bet.opencode !== '')}">
                                {{formatResult(bet)}}
                            </span>
                        </div>
                        <ul class="number-box">
                            <li v-for="(num, numIndex) in bet.betcode.split(',')" :key="numIndex" :class="{ bingo: isBingo(num, bet.opencode) }">
                                {{num}}
                            </li>
                        </ul>
                        <div class="bottom">
                            <span class="count fl bold">{{formateBalance(bet.betmoney)}}{{formateCoinType(bet.cointype)}}</span>
                            <a class="add fr" :title="bet.txhash" target="blank" :href="`https://etherscan.io/block/${bet.blocknum}`">{{bet.txhash}}</a>
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
                <div class="nomsg js_nomsg" v-if="myBetList.length === 0">
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
        <span class="msg-count js_msg-count" v-if="counter !== 0">{{ `+${counter}`  }}</span>
    </div>
</template>

<script>
import { formateCoinType, formateBalance } from '~common/util'
export default {
    data () {
        return {
            mybetShow: false,
            count: 0
        }
    },
    methods: {
        formateCoinType,
        formateBalance,
        formatResult (bet) {
            if (bet.opencode && bet.opencode !== '') {
                return parseFloat(bet.betprize) === 0 ? '-' : `${formateBalance(bet.betprize)}${formateCoinType(bet.cointype)}`
            }
            return 'wait'
        },
        isBingo (num, opencode) {
            return opencode.split(',').indexOf(num) > -1
        },
        getMyBets () {
            if (this.isLogin) {
                this.$store.dispatch('cs_1105/updateMyBets')
            }
        }
    },
    watch: {
        lastExpectid: function (val, oldVal) {
            if (this.thisExpectId === val) {
                this.getMyBets()
            }
        },
        isLogin: function (val, oldVal) {
            if (val) {
                this.getMyBets()
            }
        }
    },
    computed: {
        thisExpectId () {
            if (this.$store.state.cs_1105.mybets && this.$store.state.cs_1105.mybets[0]) {
                return this.$store.state.cs_1105.mybets[0].expectid
            }
            return null
        },
        lastExpectid () {
            return this.$store.state.cs_1105.last_expectid
        },
        isLogin () {
            return !!this.$store.state.isLog
        },
        myBetList () {
            return this.$store.state.cs_1105.mybets
        },
        counter () {
            return this.$store.state.cs_1105.mybetCount
        }
    },
    mounted () {
        if (this.isLogin) {
            this.getMyBets()
        }
    }
}
</script>


