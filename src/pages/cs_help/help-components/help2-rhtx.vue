np<template>
    <div class="">
        <h1>
            <lang>Withdraw</lang>
        </h1>
        <ul>
            <li>
                <p class="title">
                    <lang>How to Withdraw</lang>
                </p>
                <p class="msg" v-if="language !=='en'">
                    平台支持多币种提现，在提现时，仅需输入以下3个值即可提现：
                </p>
                <p class="msg">
                    1. <lang>Enter your wallet address.</lang>
                </p>
                <p class="msg">
                    2. <lang>Enter your withdrawal amount.</lang>
                </p>
                <p class="msg">
                    3. <lang>Enter your account password.</lang>
                </p>
            </li>
            <li>
                <p class="title">
                    <lang>Withdrawal Confirmation</lang>
                </p>
                <p class="msg">
                    <lang>It usually takes 12 hours to confirm your withdrawal before it is sent to your wallet.</lang>
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
            language () {
                return this.$store.state.language
            }
        },
        components: {},
        mounted () {

        }
    }
</script>
<style scoped lang="less">
</style>
