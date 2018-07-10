<template>
    <ul>
        <!--icon-eth icon-bth-->
        <li :class="formatCoinClass(formateCoinType(item.cointype))" v-for="(item, index) in data" :key="index">
            <div class="email fl">
                {{item.username}}
            </div>
            <div class="amount fr">
                {{formateBalance(item.betmoney)}}{{ formateCoinType(item.cointype) }}
            </div>
            <span class="time">
                {{formatTime(item.crtime, 'MM-dd HH:mm')}}
            </span>
        </li>

    </ul>
</template>

<script>
import { formatTime, formateCoinType, formateBalance } from '~/common/util'
export default {
    methods: {
        formatTime,
        formateCoinType,
        formateBalance,
        formatCoinClass (coinText) {
            return {
                'ETH': 'icon-eth',
                'BTC': 'icon-bth'
            }[coinText]
        }
    },
    props: {
        data: {
            type: Array,
            default: []
        }
    }
}
</script>
