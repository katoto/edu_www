<template>
    <div class="">
        <h1>
            <lang>Contact Us</lang>
        </h1>
        <ul>
            <li>
                <p class="title">
                    <lang>1、Email</lang>
                </p>
                <p class="msg">
                    <lang>To offer you a better and quick solution, please send the email to us with the information below:</lang><br>
                    ① <lang>Your account's email</lang><br>
                    ② <lang>Describe your problems in detail</lang><br>
                    ③ <lang>The screenshot of the problem page</lang><br>
                    <span v-if="language!=='en'">通用咨询：support@coinslot.com <br></span>
                    <span v-else>General：support@coinslot.com <br></span>
                    <lang>Lucky11 Issues</lang>：lucky11@coinslot.com<br>
                    <lang>LuckyCoin Issues</lang>：luckycoin@coinslot.com
                </p>
            </li>
            <li>
                <p class="title">
                    <lang>2、Telegram</lang>
                </p>
                <p class="msg">
                    Coinslot: t.me/coinslotoffice<br>
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
