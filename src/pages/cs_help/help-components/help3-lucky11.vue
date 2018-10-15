<template>
    <div class="">
         <h1 class="hidden-sm hidden-xs">
            <lang>How to Play  (Lucky11)</lang>
        </h1>
        <ul>
            <li>
                <p class="title">
                    <lang>What is Lucky 11?</lang>
                </p>
                <p class="msg">
                    <lang>Lucky 11 is a decentralized lottery product based on distributed ledger technology. Each draw is provably random and cryptographically secure thanks to the nature of the Ethereum blockchain. Blockchain-based data are featured with its unchangeableness and recognized by the whole network, which means it can completely avoid black box operations. Thus, issues like information asymmetry or non-transparency could be addressed to give players a game platform with maximum fairness they have never enjoyed before.</lang>
                </p>
            </li>
            <li>
                <p class="title">
                    <lang>How to play the game?</lang>
                </p>
                <p class="msg">
                    <lang>Players could randomly pick 1 to 5 numbers from 1 to 11 and submit it to the Ethereum blockchain. One draw per minute. The result is determined by the last hash value uploaded in the minute. If the chosen numbers match the draw result, the player wins the reward (virtual currency) stipulated in smart</lang>
                </p>
                <p class="msg">
                    <lang>Players will pick 1-5 numbers from 1 to 11. Players win the reward when the chosen numbers are in line with that of the draw result:</lang><br>
                </p>
                <table class="msgTable">
                    <thead>
                    <tr>
                        <th><lang>Type</lang></th>
                        <th><lang>Winning Probability</lang></th>
                        <th><lang>Return</lang></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><lang>Pick 1</lang></td>
                            <td>5/11</td>
                            <td>1.8x</td>
                        </tr>
                        <tr>
                            <td><lang>Pick 2</lang></td>
                            <td>1/5.5</td>
                            <td>4.5x</td>
                        </tr>
                        <tr>
                            <td><lang>Pick 3</lang></td>
                            <td>1/16.5</td>
                            <td>13.5x</td>
                        </tr>
                        <tr>
                            <td><lang>Pick 4</lang></td>
                            <td>1/66</td>
                            <td>54x</td>
                        </tr>
                        <tr>
                            <td><lang>Pick 5</lang></td>
                            <td>1/462</td>
                            <td>378x</td>
                        </tr>
                    </tbody>
                </table>
            </li>
            <li>
                <p class="title">
                    <lang>How to win the game?</lang>
                </p>
                <p class="msg">
                    <lang>After closing the bet, all the betting information will be calculated through the Merkle Tree to get the Merkle number. And the Merkle number will be uploaded to the Ethereum, then get the hash value of this transaction's block. </lang>
                    <lang>The last 25 digits of the value will be divided into 5 groups. Each group has 5 numbers, and it will be converted into a decimal number. The first group numbers will be processed through (x mod11 + 1) calculation. Then retrieving its current value as the first lottery number. The second group numbers will be processed through (x mod10+1) calculation, and by using same method, the second lottery number can be drew, and the rest can be done in the same manner. Finally, the five numbers calculated through this method will be draw result.</lang>
                </p>
            </li>
            <li>
                <p class="title">
                    <lang>How to ensure fairness?</lang>
                </p>
                <p class="msg">
                    1. <lang>Unchangeable betting information</lang><br/>
                    <lang>The draw result is based on hash value which was calculated from Merkle number. Since Merkle number has already uploaded to the Ethereum chain, the information cannot be modified.</lang><br/>
                    2. <lang>Fair draw</lang><br/>
                    <lang>The draw numbers are selected from hash value, due to its unpredictability and unchangeableness, the fair draw can be assured.</lang><br/>
                    3. <lang>Fair reward</lang><br/>
                    <lang>Both draw and reward distribution are based on Ethereum chain. Thus, there is no chance for the platform to interfere. All information and process is transparent and fair.</lang><br/>
                    4. <lang>No robot</lang><br/>
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
<style scoped lang="less" type="text/less">
    .msgTable{
        // margin: 1.5em ;
        margin: 1.5em;
        width: 100%;
        max-width: 400px;
    }
    .msgTable,.msgTable td,.msgTable th{
        border: 1px solid #282828;
        color: #282828;
        height: 34px;
    }
    @media(max-width: 500px){
        .msgTable{
             margin: 1.5em auto;
             max-width: 300px;
        }
    }
</style>
