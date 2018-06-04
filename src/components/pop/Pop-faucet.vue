<template>
    <!--拉新活动-->
    <!--链接邀请-->
  <Pop class="pop-faucet" :show.sync="show">
        <div class="pop-main">
            <div class="pop-main">
                <h3 class="font26">Faucet</h3>
                <p style="font-size: 13px;">
                    Earn 0.001 ETH by inviting one friend(two chances)
                </p>
                <p style="margin: 10px 0 4px 0">
                    Use the following link to invite your friends
                </p>
                <div id="js_newActCopy" class="newActCopy">text</div>
                <!--<a href="javascript:;" data-clipboard-target="#js_newActCopy" class="btn-copy js_btn-copy">Copy-->
                <!--to clipboard</a>-->
                <!--  $('#js_choseFaucet').attr('data-clipboard-text','1231231232')  -->
                <a href="javascript:;" id="js_choseFaucet" data-clipboard-text="copy failure"
                    class="btn-copy js_btn-copy">Copy
                    to clipboard</a>

                <p>
                    Tips:
                </p>
                <p>
                    1. Free ETH award can not be withdrawed.
                </p>
                <p>
                    2. Everyone has two chances to get the invitation award.
                </p>
                <p>
                    3. The number of this activity participants is limited.
                </p>
                <p>
                    4. The final interpretation right of this event is reserved by Coinslot.com.
                </p>
            </div>
        </div>
  </Pop>
</template>

<script>
import Pop from './Pop'

export default {
    components: { Pop },
    computed: {
        show: {
            set: function (isShow) {
                if (!!isShow === true) {
                    this.$store.commit('showFaucet')
                } else {
                    this.$store.commit('hideFaucet')
                }
            },
            get: function () {
                return this.$store.state.pop.showFaucet
            }
        }
    }
}
</script>

<style lang="less" scoped>
</style>


