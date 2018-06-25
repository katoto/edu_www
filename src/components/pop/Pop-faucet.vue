<template>
    <!--拉新活动-->
    <!--链接邀请-->
    <Pop class="pop-faucet" :show.sync="show">
        <div class="pop-main" v-if="faucetMsg">
            <h3 class="font26">Faucet</h3>
            <p v-if="faucetMsg">
                Inviting friends earn {{ faucetMsg.invite_prize }} {{ faucetMsg.prize_cointype | formateCoinType }} per
                invitation (2 chances)
            </p>
            <p v-else>
                Inviting friends earn 0.001 ETH per invitation (2 chances)
            </p>
            <p style="margin: 10px 0 4px 0">
                Inviting address
            </p>
            <div v-if="faucetMsg" class="newActCopy">{{ faucetMsg.invite_url }}</div>
            <a href="javascript:;"
               v-clipboard:copy="faucetMsg.desc"
               v-clipboard:success="copySucc"
               v-clipboard:error="copyError"
               class="btn-copy js_btn-copy">Copy to Clipboard</a>
            <p>
                Tips:
            </p>
            <p>
                1. Free ETH reward cannot be cashed out.
            </p>
            <p>
                2. Each account has two chances to get invitation reward.
            </p>
            <p>
                3. The amount of free ETH is limited. First come, first served.
            </p>
            <p>
                4. The right of final interpretation of this activity reserved to Coinslot.com.
            </p>
        </div>
    </Pop>
</template>

<script>
    import Pop from './Pop'
    import {Message} from 'element-ui'

    export default {
        components: {Pop},
        computed: {
            faucetMsg () {
                return this.$store.state.pop.faucetMsg
            },
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
        },
        methods: {
            copySucc () {
                Message({
                    message: 'Copied to clipboard',
                    type: 'success'
                })
            },
            copyError () {
                Message({
                    message: 'Failed to copy, please retry',
                    type: 'success'
                })
            }
        },
        filters: {
            formateCoinType: (type = '2001') => {
                type = type.toString()
                switch (type) {
                case '2001':
                    return 'ETH'
                case '1001':
                    return 'BTC'
                default:
                    return 'ETH'
                }
            }
        }
    }
</script>

<style lang="less" scoped>
</style>


