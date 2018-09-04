<template>
    <div class="dapp-contain">
        <div>
            <p>基于区块链123</p>
        </div>
        <router-link :to="{path:'/lucky11'}"></router-link>

        <button @click="buyNum" style="width:100px;height:50px">购买</button>
        <button @click="registerName" style="width:100px;height:50px">买名字</button>

    </div>
</template>

<script>
    import {mTypes, aTypes} from '~/store/cs_page/dappCoin'
    import {
        copySucc,
        copyError,
        formateBalance,
        formateCoinType
    } from '~common/util'
    import {coinAffAddr} from '~common/dappConfig.js'
    import Vue from 'vue'
    import vueClipboard from 'vue-clipboard2'
    import {web3, luckyCoinApi} from '~/dappApi/luckycoinApi'

    Vue.use(vueClipboard)
    export default {
        data () {
            return {
                showFirstBaxi: false, // 首次提示
                isFromFlag: false // 是否是来自邀请
            }
        },
        watch: {
            isLog (val) {
                /* 切换登陆态之后改变状态 */
                this.changePageState()
            }
        },
        methods: {
            copySucc,
            copyError,
            formateBalance,
            async buyNum () {
                // 购买号码
                let buyBack = null
                let currPrice = await luckyCoinApi.getBuyPrice()
                // 判断是否用邀请购买
                if (currPrice === 0) {
                    console.error('getPrice 0')
                    return false
                }
                console.log(currPrice)
                if (0) {
                    // export function wait (time) {
                    //     return new Promise((resolve) => {
                    //         setTimeout(() => resolve(), time)
                    //     })
                    // }
                } else {
                    buyBack = await luckyCoinApi.buyXaddr(1, coinAffAddr, currPrice)
                }
                console.log(buyBack)
            },
            async registerName (regName) {
                let buyNameBack = null
                // 判断是否已经被购买
                regName = regName.toString()
                let checkName = await luckyCoinApi.testName(regName)
                if (checkName) {
                    buyNameBack = await luckyCoinApi.registerNameXaddr(regName, this.isFromFlag)
                }
                console.log(checkName)
            },
            async withdraw (){
                let withdrawBack = await luckyCoinApi.withdraw()
                if (withdrawBack) {
                    console.log('提款成功')
                }

            },
            analysisBuyNum (bigNum) {
                //  解析数值
                let buyNumArr = []
                let startIndex = 1
                let currReduce = null
                let betweenNum = bigNum
                do {
                    currReduce = reduceBigNum(betweenNum)
                    if (!(currReduce.isZero)) {
                        buyNumArr.push(startIndex)
                    }
                    betweenNum = currReduce.bigNum
                    startIndex++
                } while (parseInt(betweenNum) !== 0)
                return buyNumArr
                function reduceBigNum (bigNum) {
                    bigNum = bigNum.toString()
                    let bigNumArr = bigNum.split('')
                    let endNumArr = []
                    let beforeNum = false
                    let currNum = null
                    for (let i = 0; i < bigNumArr.length; i++) {
                        if (isNaN(Number(bigNumArr[i]))) {
                            console.error('bigNum NaN')
                            break
                        }
                        currNum = Number(bigNumArr[i])
                        beforeNum ? endNumArr.push(Math.floor((currNum + 10) / 2)) : endNumArr.push(Math.floor((currNum) / 2))
                        beforeNum = (currNum % 2 === 1)
                    }
                    return {
                        bigNum: endNumArr.join(''),
                        isZero: !beforeNum
                    }
                }
            }
        },
        computed: {
            language () {
                return this.$store.state.language
            }

        },
        components: {
        },
        async mounted () {
            if (0 && url) {

            } else {
                this.isFromFlag = coinAffAddr
            }
            console.log(luckyCoinApi)
            console.log(coinAffAddr)
    }
    }
</script>
<style scoped lang="less" type="text/less">
    @import "../../styles/lib-mixins.less";
    @import "../../styles/lib-media.less";
    @import "../../styles/lib-font.less";

    div, a, img, p, span, i {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
    }

</style>
