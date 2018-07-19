<template>
    <ul>
        <!--icon-eth icon-bth-->
        <li :class="formatCoinClass(formateCoinType(item.cointype))"  v-for="(item, index) in data" :key="index">
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
<style scoped lang="less" rel="stylesheet/less">
    .newData{
        animation: newRecord 0.5s both;
    }
    @keyframes newRecord {
        0%{
            opacity:0;
            transform: translateY(-100%);
        }
        50%{
            opacity:0;
        }
        100%{
            opacity:1;
            transform: translateY(0);
        }
    }
</style>
