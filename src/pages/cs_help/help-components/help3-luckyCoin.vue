<template>
    <div class="">
      <h1>
          <lang>How to Play  (LuckyCoin)</lang>
      </h1>
        <ul>
            <li>
                <p class="title">
                    <lang>1. What is LuckyCoin?</lang>
                </p>
                <p class="msg">
                    <lang>LuckyCoin is the global leading blockchain-based game. Players could use only 0.01 ETH to win 1 ETH or more. By using blockchain technology, all the information and process are transparent and fair. Don’t hesitate, play now!</lang>
                </p>
            </li>
            <li>
                <p class="title">
                    <lang>2. How to play the game?</lang>
                </p>
                <p class="msg">
                    ① <lang>Choose one bidding type</lang><br/>
                    ② <lang>Pay for your bid and get the bidding number</lang><br/>
                    ③ <lang>Wait for draw (after all bids of one bidding type are sold out)</lang><br/>
                    ④ <lang>If your bidding number matches draw number, you win the reward.</lang>
                </p>
            </li>
            <li>
                <p class="title">
                    <lang>3. Example</lang>
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
                    <lang>4. Draw</lang>
                </p>
                <p class="msg">
                    当一个场次筹齐人次时，游戏将所有本期投注信息进行Merkle Tree计算，得出Merkel number，并将Merkel number上传至以太链；信息打包上链生成的Hash值，使用最后六个十六进制数转成十进制数，然后对该十进制数进行求余，将余数加上10001即得到最终的开奖结果。用户可以随时在etherscan.io里查验开奖哈希，它是十分透明公开和公平地。
                </p>
            </li>
            <li>
              <p class="title">
                    <lang>5. Refund</lang>
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
