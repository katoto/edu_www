<script>
import { Message } from 'element-ui'
export default {
    watch: {
        isLog () {
            this.$store.dispatch('cs_activity/getChargeState')
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
    mounted () {
        this.$store.dispatch('cs_activity/getChargeState')
    },
    methods: {
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
                    this.$router.push('/account/deposit')
                    break
                case '-1':
                    this.showEligible = true
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
    }

}
</script>
