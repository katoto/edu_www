<template>
    <!--ip ip 封禁 -->
    <div class="pop pop-ip" :class="{'hide':!ip_status}">
        <div class="pop-body">
            <div class="pop-ani">
                <img src="@assets/img/iplogo.png">
                <h5>
                    <lang>Access Error</lang>
                </h5>
                <p>
                    <lang>You are not in our service area for more info</lang>
                </p>
                <p>
                    <lang>please contact us support@Coinsprize.com</lang>
                </p>
                <span>
                    <lang>Telegram: @CoinsprizeOffice</lang>
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


<style scope lang="less" type="text/less">
    @media (max-width: 640px) {
        .pop-ip{
            .pop-ani>*{
                transform: scale(0.7);
            }
        }
    }
</style>
