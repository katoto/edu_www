<template>
    <div class="">
      <h1>
          LuckyCoin怎么玩
      </h1>
        <ul>
            <li>
                <p class="title">
                    1. 什么是Lucky Coin？
                </p>
                <p class="msg">
                    LuckyCoin是世界上第一款基于区块链技术的类众筹玩法，在这里您可以使用如0.001ETH的小付出去赢得1个ETH甚至更多的数字货币奖励，通过使用区块链技术，开奖算法公平、透明、公开、玩法新颖，快来体验吧！
                </p>
            </li>
            <li>
                <p class="title">
                    2. 游戏怎么玩？
                </p>
                <p class="msg">
                    ①选择一个场次<br/>
                    ②支付该该场次并获得投注号码<br/>
                    ③等待系统开奖（场次筹齐人数时将开）<br/>
                    ⑤若号码匹配则获得该场次奖励
                </p>
            </li>
            <li>
                <p class="title">
                    3. 玩法举例
                </p>
                <p class="msg">
                    以一场价值1ETH的场次举例子：<br/>
                    ①比如该1ETH场次被平分为100个幸运等份，每个用户仅需要出0.01ETH，即可获得一个投注号码<br/>
                    ②每个用户都可以在这个场次里购买一注或者多注投注号码<br/>
                    ③当该场次的100个幸运等份被均分后，系统将开始计算“幸运号码”，当你的投注号码和幸运号码数字一致时，你将赢得该场次的1个ETH奖励
                </p>
            </li>
            <li>
                <p class="title">
                    4. 游戏怎么开奖？
                </p>
                <p class="msg">
                    当一个场次筹齐人次时，游戏将所有本期投注信息进行Merkle Tree计算，得出Merkel number，并将Merkel number上传至以太链；信息打包上链生成的Hash值，使用最后六个十六进制数转成十进制数，然后对该十进制数进行求余，将余数加上10001即得到最终的开奖结果。用户可以随时在etherscan.io里查验开奖哈希，它是十分透明公开和公平地。
                </p>
            </li>
            <li>
              <p class="title">
                  5. 退款
              </p>
                <p class="msg">
                    当一个场次在7天内尚未筹齐人次时，系统将会退款给参与该场次的用户。
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {}
        },
        watch: {},
        methods: {},
        computed: {},
        components: {},
        mounted () {

        }
    }
</script>
<style scoped lang="less">
</style>
