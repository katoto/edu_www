<template>
    <div class="">
        <h1>
            <lang>Contact Us</lang>
        </h1>
        <ul>
            <li>
                <p class="title">
                    <lang>Email</lang>
                </p>
                <p class="msg">
                    <lang>To offer you a better and quick solution, please send the email to us with the information below:</lang><br>
                    1. <lang>Your account's email</lang><br>
                    2. <lang>Describe your problems in detail</lang><br>
                    3. <lang>The screenshot of the problem page</lang><br>
                    <span v-if="language!=='en'">通用咨询：support@coinsprize.com <br></span>
                    <span v-else>General：support@coinsprize.com <br></span>
                    <lang>Lucky11 Issues</lang>：lucky11@coinsprize.com<br>
                    <lang>LuckyCoin Issues</lang>：luckycoin@coinsprize.com
                </p>
            </li>
            <li>
                <p class="title">
                    <lang>Telegram</lang>
                </p>
                <p class="msg">
                    Coinsprize: t.me/coinsprizeoffice<br>
                    LuckyCoin: t.me/luckycoinofficial
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
