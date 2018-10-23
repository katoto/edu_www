<template>
    <div class="">
        <h1 class="hidden-sm hidden-xs">
          <lang>How to Play  (LuckyCoin)</lang>
      </h1>
        <ul>
            <li>
                <p class="title">
                    <lang>What is LuckyCoin?</lang>
                </p>
                <p class="msg">
                    <lang>LuckyCoin is the global leading blockchain-based game. Players could use only 0.01 ETH to win 1 ETH or more. By using blockchain technology, all the information and process are transparent and fair. Don't hesitate, play now!</lang>
                </p>
            </li>
            <li>
                <p class="title">
                    <lang>How to play the game?</lang>
                </p>
                <p class="msg">
                    1. <lang>Choose one bidding type</lang><br/>
                    2. <lang>Pay for your bid and get the bidding number</lang><br/>
                    3. <lang>Wait for draw (after all bids of one bidding type are sold out or time's up)</lang><br/>
                    4. <lang>If your bidding number matches draw number, you win the reward.</lang>
                </p>
            </li>
            <li>
                <p class="title">
                    <lang>Example</lang>
                </p>
                <p class="msg">
                    <span v-if="language!=='en'">以一场价值1ETH的场次举例子：<br/></span>
                    1. <lang>For 1 ETH bidding type, players can bid 0.01 ETH to win 1 ETH, and the bidding times of "1 ETH" for all players are 100. Players will get a bid number after bidding.</lang><br/>
                    2. <lang>Players can bid one or more times for each type.</lang><br/>
                    3. <lang>When there is no available bids or time's up, the system will calculate the "Lucky Number". If your bidding number matches lucky number, you are the winner!</lang>
                </p>
            </li>
            <li>
                <p class="title">
                    <lang>Draw</lang>
                </p>
                <p class="msg" v-lang="'1. After closing the bid, the bidding record will be uploaded to Ethereum through system, then the hash value will be calculated according to the uploaded data.<br>2. By using hexadecimal, the last 6 characters of the hash value will convert into a number.<br>3. Divide the number calculated from step 2 by total bids, then add 10,001. That is how lucky number comes from.<br>You can check the information about hash value on etherscan.io at anytime, all information is completely transparent.'">
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
        computed: {
            language () {
                return this.$store.state.language
            }
        },
        components: {},
        mounted () {
        }
    }
</script>
<style scoped lang="less">
</style>
