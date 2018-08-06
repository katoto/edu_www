<template>
    <ul>
        <!--icon-eth icon-bth-->
        <li  v-for="(item, index) in data" :key="index*Math.random()" :class="[item.current ? 'newData' : '']">
            <div class="email">
                {{item.username}}
            </div>
            <!--icon-eth/icon-btc-->
            <div class="amount" :class="formatCoinClass(formateCoinType(item.cointype))" >
                {{formateBalance(item.betmoney)}}
                <!--{{ formateCoinType(item.cointype) }}-->
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
                'BTC': 'icon-btc'
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
<style scoped lang="less" type="text/less">
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
