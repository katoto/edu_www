<template>
    <div class="dapp-contain">
        <div>
            <p>基于区块链123</p>
        </div>
        <p @click="jump2">lucky11</p>
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
    import Vue from 'vue'
    import vueClipboard from 'vue-clipboard2'
    import {web3, luckyCoinApi} from '~/dappApi/luckycoinApi'

    Vue.use(vueClipboard)
    export default {
        data () {
            return {
                showFirstBaxi: false // 首次提示
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
            jump2 () {
                this.$router.push('/lucky11')
            },
            getBuyNum (bigNum) {
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
            console.log(web3)
            console.log(web3.utils)
            console.log(web3.version)
            console.log(web3.givenProvider)
            console.log(luckyCoinApi)
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
