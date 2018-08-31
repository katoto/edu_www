<template>
    <section>
        <Header></Header>
        <div class="act_box" @click="initPop">
            <div class="top_banner">
                <h2><lang>50% Bonus for Your First Top-Up</lang></h2>
                <h4><lang>More top-up,more bonus</lang></h4>
            </div>
            <a href="javascript:;" v-if="firstChargeMsg" class="btn"   :class="{'unable':firstChargeMsg.activity_status==='2'}" @click="getFirstBtn">
                {{ firstChargeMsg.activity_status | filterMsg }}
            </a>
            <p class="cont_tips"><lang>1.5x Your Top-Up, Bonus up to 0.05ETH/ 0.005BTC</lang></p>
            <div class="foot_rules">
                <h4><lang>Rules:</lang></h4>
                <p><lang>1. Users who have not topped up on Coinsprize are eligible to get top-up bonus. To participate this activity, users should confirm your qulification and learn the rules through this page.</lang></p>
                <p><lang>2. The activity time is from 00:00 July 14, 2018 to 23:59 August, 2018 (GMT).</lang></p>
                <p><lang>3. Users with no top-up records can get 50% bonus (up to 0.05 ETH/ 0.005 BTC) by topping up for the first time via appointed entry. The bonus cannot be used in LuckyCoin.</lang></p>
                <p><lang>4. Both ETH and BTC top-up are supported. However, it may take some time before the top-up is confirmed, if you top up both, only the first arrived top-up can be multiplied.</lang></p>
                <p v-if="language==='en'">5.The amount you topped up is withdrawable, and the top-up bonus is non-withdrawable. To unlock the non-withdrawable, you need to bet 10 times of the non-withdrawable amount. <span @click='jump2Help'>Help Center</span> to see details.</p>
                <p v-if="language==='zhCn'">5.充值金额全部进入可提现账户，赠送金额全部进入不可提现账户，满足不可提现额度的10倍流水条件即可提取赠送金额，详情请见<span @click='jump2Help'>帮助中心</span>。</p>
                <p v-if="language==='zhTw'">5.充值金額全部進入可提現賬戶，贈送金額全部進入不可提現賬戶，滿足不可提現額度的10倍流水條件即可提取贈送金額，詳情請見<span @click='jump2Help'>幫助中心</span>。</p>
                <p><lang>6. Each eligible user has only one chance to enjoy top-up bonus. Coinsprize reserves right to reasonably suspect user may enjoy the top-up bonus more than once. In this case, Coinsprize can withdraw the bonus and/ or the rewards paid by the bonus.</lang></p>
                <p><lang>7. Coinsprize reserves the right to withdraw bonus which has been sent under the wrong circumstances and make corrections of our diction to improve accuracy, and cancel certain services at its own discretion where the services are illegal to apply.</lang></p>
            </div>
        </div>

        <!--  弹窗- 不符合资格弹窗  -->
        <div class="pop pop-notEligible" :class="{'hide':!showEligible}" >
            <div class="pop-body">
                <div class="pop-ani">
                    <a href="javascript:;" class="btn-close" @click="onClose"></a>
                    <div>
                        <p class="notEligible_p1"><lang>You are not eligible to participate</lang></p>
                        <p class="notEligible_p2"><lang>For users who have not topped up only</lang></p>
                    </div>
                </div>
            </div>
        </div>

        <Footer></Footer>
    </section>
</template>

<script>
import Header from '~components/Header.vue'
import Footer from '~components/Footer.vue'
import { Message } from 'element-ui'

export default {
    data () {
        return {
            showEligible: false
        }
    },
    watch: {
        isLog () {
            this.$store.dispatch('cs_activity/getChargeState')
        }
    },
    methods: {
        onClose () {
            this.showEligible = false
        },
        initPop () {
            this.$store.commit('initHeadState', new Date().getTime())
        },
        jump2Help () {
            this.$router.push('help')
        },
        getFirstBtn () {
            // 0=未参与；1=已参与，未充值；2=已充值；-1=不符合活动参与条件
            if (!this.isLog) {
                this.$store.commit('showLoginPop')
                return false
            }
            if (this.userInfo && this.userInfo.status === '0') {
                this.$store.commit('showNoVerify')
                return false
            }
            if (this.firstChargeMsg) {
                if (this.firstChargeMsg.activity_status === '2') {
                    return false
                }
                switch (this.firstChargeMsg.activity_status) {
                case '0':
                    this.getChance()
                    break
                case '1':
                    this.$router.push('account/deposit')
                    break
                case '-1':
                    alert(_('You are not eligible to participate'))
                    break
                }
            }
        },
        async getChance () {
            let msg = await this.$store.dispatch('cs_activity/getChance')
            if (msg.status === '100') {
                Message({
                    message: _('You are eligible now'),
                    type: 'success'
                })
                this.$store.dispatch('cs_activity/getChargeState')
            }
        }
    },
    computed: {
        firstChargeMsg () {
            return this.$store.state.cs_activity.firstCharge
        },
        isLog () {
            return this.$store.state.isLog
        },
        userInfo () {
            return this.$store.state.userInfo
        },
        language () {
            return this.$store.state.language
        }
    },
    components: {
        Header,
        Footer
    },
    mounted () {
        this.$store.dispatch('cs_activity/getChargeState')
    },
    filters: {
        filterMsg (state) {
            // 0=未参与；1=已参与，未充值；2=已充值；-1=不符合活动参与条件
            switch (state) {
            case '0':
            case '-1':
                return _('Get Bonus')
            case '1':
                return _('Top Up ')
            case '2':
                return _("You've participated")
            default:
                return _('Get Bonus')
            }
        }
    }
}
</script>
<style scoped lang="less" type="text/less">
    @import "../../styles/lib-media.less";

    .pop-notEligible{
        .notEligible_p1{
            padding: 50px 0 20px;
            font-size: 24px;
        }
        .notEligible_p2{
            padding: 0 0 30px;
            font-size: 14px;
        }
        .btn-close:hover{
            transform:rotate(180deg);
            transition: all 0.3s;
        }
    }

    .act_box{
        background-color: #595d9c;
        color: #fff;
        text-align: center;
        a{
            color: #fff;
            &:hover{
                filter: brightness(1.2);
            }
        }
        .foot_rules{
            width: 92%;
            max-width: 950px;
            font-size: 14px;
            margin: 134/2px auto 0px;
            padding-bottom: 176/2px;
            text-align: left;
            line-height: 22px;
            span{
                cursor: pointer;
                color: blue;
                &:hover{
                    color:#fff
                }
            }
        }
        .cont_tips{
            width: 92%;
            margin: 0 auto;
            font-size: 12px;
        }
        .top_banner{
            width: 92%;
            margin: 0 auto;
            padding-top: 163/2px;
            h2{
                font-size: 68/2px;
                line-height: 84/2px;
            }
            h4{
                font-size: 22/2px;
                line-height: 40/2px;
            }
        }
        .btn{
            display: block;
            margin:118/2px auto 22/2px;
            max-width: 538px;
            width: 60%;
            height: 68/1.5px;
            overflow: hidden;
            border-radius: 5px;
            background: #fd8144;
            /*background: linear-gradient(to right, #fd8144 , #fd9644,#fd8144);*/
            line-height: 68/1.5px;
            font-size: 22px;
            &.unable{
                filter: grayscale(1);
                cursor: not-allowed;
            }
        }
    }
    @media (min-width: @screen-desktop) {
        .act_box{
            .foot_rules{
                font-size: 14px;
                margin: 134px auto 0px;
                line-height: 22px;
            }
            .top_banner{
                padding-top: 163px;
                h2{
                    font-size: 68px;
                    line-height: 84px;
                }
                h4{
                    font-size: 22px;
                    line-height: 40px;
                }
            }
            .btn{
                margin:118px auto 22px;
                height: 68px;
                line-height: 68px;
                font-size: 22px;
            }
        }
    }
</style>
