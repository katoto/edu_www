<template>
    <div>
        <div style="position:fixed;right:0;bottom:50px">
            <img src="@assets/img/icon-user.png" alt="">
        </div>
        <div style="position:fixed;right:60px;bottom:60px;color:#000">
            <input type="text" @focus="checkUse" style="padding:30px">
            <button style="width:100px;color:#000">发送</button>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                scrollTop: 0
            }
        },
        watch: {

        },
        methods: {
            checkUse (evt) {
                if (!this.userInfo || Object.keys(this.userInfo).length === 0 || this.userInfo.status === '0') {
                    this.$store.commit('showLoginPop')
                    evt.target.blur()
                }
            }
        },
        computed: {
            userInfo () {
                return this.$store.state.userInfo
            }
        },
        components: {},
        mounted () {

        },
        destroyed () {

        }
    }
</script>
<style scoped lang="less">

</style>
