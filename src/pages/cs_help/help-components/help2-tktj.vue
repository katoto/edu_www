<template>
    <div class="">
        <h1>
            <lang>Withdrawal Conditions</lang>
        </h1>
        <ul>
            <li>
                <p class="title">
                    <lang>Withdrawal Limit</lang>
                </p>
                <p class="msg">
                    <lang>Maximum Withdrawal = 1/10 * Effective Bet Amount + All Former Withdrawal Amount</lang>
                </p>
                <p class="msg">
                    <lang>(* Effective Bet Amount = Bet Amount in Lucky11 + 1/5 Bet Amount in Slot)</lang>
                </p>
            </li>
            <li>
                <p class="title">
                    <lang>Withdrawable Issues</lang>
                </p>
                <p class="msg">
                    <lang>All top-up is withdrawable</lang>
                </p>
                <p class="msg">
                    <lang>All bonus from activities on the platform is non-withdrawable</lang>
                    <span v-if="languang==='en'">（* To unlock the non-withdrawable, you need to bid 10 times of the non-withdrawable amount.)</span>
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {}
        },
        watch: {},
        methods: {},
        computed: {
            languang () {
                return this.$store.state.languang
            }
        },
        components: {},
        mounted () {

        }
    }
</script>
<style scoped lang="less">
</style>
