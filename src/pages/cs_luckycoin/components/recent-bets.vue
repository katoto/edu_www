<template>
    <BannerScroll :isVeritical="true" :scrollTime="3000" :stepScroll="2">
        <div class="text-scroller" style="overflow:hidden;height:660px;">
            <div class="scroller-in">
                <ul>
                    <!--icon-eth icon-bth-->
                    <li v-for="(item, index) in data" :key="index*Math.random()" :class="[item.current ? 'newData' : '']">
                        <div class="email">
                            {{item.username}}
                        </div>
                        <!-- icon-eth/icon-btc -->
                        <div class="amount" :class="formatCoinClass(formateCoinType(item.cointype))" >
                            {{formateBalance(item.betmoney)}}
                        </div>
                        <span class="time">
                            {{formatTime(item.crtime, 'MM-dd HH:mm')}}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </BannerScroll>
</template>

<script>
import { formatTime, formateCoinType, formateBalance } from '~/common/util'
import BannerScroll from '~components/BannerScroll.vue'
export default {
    methods: {
        formatTime,
        formateCoinType,
        formateBalance,
        formatCoinClass (coinText) {
            return {
                'ETH': 'icon-eth',
                'BTC': 'icon-btc',
                'CC': 'icon-cc'
            }[coinText]
        },
        classOption () {
            return {
                limitMoveNum: 20,
                singleHeight: 64,
                autoPlay: false,
            }
        },        
    },
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    components: {
        BannerScroll
    },

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
