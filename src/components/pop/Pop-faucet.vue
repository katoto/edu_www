<template>
    <!--拉新活动-->
    <!--链接邀请-->
    <Pop class="pop-faucet" :show.sync="show">
        <div class="pop-main" v-if="faucetMsg">
            <h3 class="font26">
                <lang>Faucet</lang>
            </h3>
            <p v-if="faucetMsg">
                {{_('Inviting friends earn {0} {1} per invitation (2 chances)', faucetMsg.invite_prize, formateCoinType(faucetMsg.prize_cointype))}}
            </p>
            <p v-else>
                <lang>Inviting friends earn 0.001 ETH per invitation (2 chances)</lang>
            </p>
            <p style="margin: 10px 0 4px 0">
                <lang>Inviting address</lang>
            </p>
            <div v-if="faucetMsg" class="newActCopy">{{ faucetMsg.invite_url }}</div>
            <a href="javascript:;"
               v-clipboard:copy="faucetMsg.desc"
               v-clipboard:success="copySucc"
               v-clipboard:error="copyError"
               class="btn-copy js_btn-copy">
               <lang>Copy to Clipboard</lang>
            </a>
            <p>
                <lang>Tips:</lang>
            </p>
            <p>
                <lang>1. Free ETH reward cannot be cashed out.</lang>
            </p>
            <p>
                <lang>2. Each account has two chances to get invitation reward.</lang>
            </p>
            <p>
                <lang>3. The amount of free ETH is limited. First come, first served.</lang>
            </p>
            <p>
                <lang>4. The right of final interpretation of this activity reserved to Coinslot.com.</lang>
            </p>
        </div>
    </Pop>
</template>

<script>
    import Pop from './Pop'
    import {Message} from 'element-ui'
    import { formateCoinType } from '~common/util'

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
            formateCoinType,
            copySucc () {
                Message({
                    message: _('Copied to clipboard'),
                    type: 'success'
                })
            },
            copyError () {
                Message({
                    message: _('Failed to copy, please retry'),
                    type: 'success'
                })
            }
        }
    }
</script>

<style lang="less" scoped>
</style>


