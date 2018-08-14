<template>
    <div class="">
        <h1>
            <lang>How to Play  (Lucky11)</lang>
        </h1>
        <ul>
            <li>
                <p class="title">
                    <lang>1. What is Lucky 11?</lang>
                </p>
                <p class="msg">
                    <lang>Lucky 11 is a decentralized lottery product based on distributed ledger technology. Each draw is provably random and cryptographically secure thanks to the nature of the Ethereum blockchain. Blockchain-based data are featured with its unchangeableness and recognized by the whole network, which means it can completely avoid black box operations. Thus, issues like information asymmetry or non-transparency could be addressed to give players a game platform with maximum fairness they have never enjoyed before.</lang>
                </p>
                <p class="msg">
                    <lang>Players could randomly pick 1 to 5 numbers from 1 to 11 and submit it to the Ethereum blockchain. One draw per minute. The result is determined by the last hash value uploaded in the minute. If the chosen numbers match the draw result, the player wins the reward (virtual currency) stipulated in smart</lang>
                </p>
            </li>
            <li>
                <p class="title">
                    <lang>2. How to play the game?</lang>
                </p>
                <p class="msg">
                    <lang>Players will pick 1-5 numbers from 1 to 11. Players win the reward when the chosen numbers are in line with that of the draw result:</lang><br>
                    <lang>Pick 1 number, players have 5/11 of the win probability with 1.8 times return.</lang><br>
                    <lang>Pick 2 numbers, players have 1/5.5 of the win probability with 4.5 times return.</lang><br>
                    <lang>Pick 3 numbers, players have 1/16.5 of the win probability with 13.5 times return.</lang><br>
                    <lang>Pick 4 numbers, players have 1/66 of the win probability with 54 times return.</lang><br>
                    <lang>Pick 5 numbers, players have 1/462 of the win probability with 378 times return.</lang><br>
                    <!--Lucky11玩法，用户从01至11的号码选1个或者多个（至多5个）号码组成一组号码，若开奖数字与所选号码一致，则用户获得对应奖励：<br>-->
                    <!--从11个号码中任选1个号码的投注为"任选一"，中奖概率5/11，中奖回报1.8倍；<br>-->
                    <!--选2个号码的投注分为"任选二"，中奖概率1/5.5，中奖回报4.5倍；<br>-->
                    <!--选3个号码的投注分为"任选三"，中奖概率1/16.5，中奖回报13.5倍；<br>-->
                    <!--选4个号码的投注为"任选四"，中奖概率1/66，中奖回报54倍；<br>-->
                    <!--选5个号码的投注为"任选五"，中奖概率1/462，中奖回报378倍；<br>-->
                </p>
            </li>
            <li>
                <p class="title">
                    <lang>3. How to win the game?</lang>
                </p>
                <p class="msg">
                    <lang>After closing the bet, all the betting information will be calculated through the Merkle Tree to get the Merkle number. And the Merkle number will be uploaded to the Ethereum, then get the hash value of this transaction's block. </lang>
                    <lang>The last 25 digits of the value will be divided into 5 groups. Each group has 5 numbers, and it will be converted into a decimal number. The first group numbers will be processed through (x mod11 + 1) calculation. Then retrieving its current value as the first lottery number. The second group numbers will be processed through (x mod10+1) calculation, and by using same method, the second lottery number can be drew, and the rest can be done in the same manner. Finally, the five numbers calculated through this method will be draw result.</lang>
                </p>
            </li>
            <li>
                <p class="title">
                    <lang>4. How to ensure fairness?</lang>
                </p>
                <p class="msg">
                    ① <lang>Unchangeable betting information</lang><br/>
                    <lang>The draw result is based on hash value which was calculated from Merkle number. Since Merkle number has already uploaded to the Ethereum chain, the information cannot be modified.</lang><br/>
                    ② <lang>Fair draw</lang><br/>
                    <lang>The draw numbers are selected from hash value, due to its unpredictability and unchangeableness, the fair draw can be assured.</lang><br/>
                    ③ <lang>Fair reward</lang><br/>
                    <lang>Both draw and reward distribution are based on Ethereum chain. Thus, there is no chance for the platform to interfere. All information and process is transparent and fair.</lang><br/>
                    ④ <lang>No robot</lang><br/>
                    <lang>Since all process is transparent and unchangeable, the platform cannot use any robot to do black box operations. The game is utterly fair.</lang><br/>
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
