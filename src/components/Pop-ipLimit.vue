<template>
    <!--ip ip 封禁 -->
    <div class="pop pop-ip" :class="{'hide':!ip_status}">
        <div class="pop-body">
            <div class="pop-ani">
                <img src="@assets/img/iplogo.png" alt="" width="174" height="64">
                <h5>Access Error</h5>
                <p>
                    You are not in our service area for more info
                </p>
                <p>
                    please contact us support@coinslot.com
                </p>
                <span>
                    Telegram: @CoinslotOffice
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            ip_status () {
                return this.$store.state.ip_status
            }
        },
        name: 'Pop-ipLimit'
    }
</script>

<style scoped>

</style>
