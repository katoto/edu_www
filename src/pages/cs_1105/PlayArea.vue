<template>
    <li class="js_playArea-li">
        <div class="play-area-top">
            <div id="play-type-choose" class="play-type-choose">
                <span v-if="areaMsg.pickType === '5J'">Pick 5(JACKPOT)</span>
                <span v-else>Pick {{ currIndex + 1 }}</span>
                <ul class="show" @click="chosePickType">
                    <li>Pick 1</li>
                    <li>Pick 2</li>
                    <li>Pick 3</li>
                    <li>Pick 4</li>
                    <li>Pick 5</li>
                    <li class="es" :class="{'hide':areaMsg.pickType !== '5J'}">
                        <p>Pick 5</p>
                        <p>(JACKPOT)</p>
                    </li>
                </ul>
            </div>
            <p class="play-tips" v-if="areaMsg">
                <span v-if="areaMsg.pickType === '5J'" class="js_choose_desc">Pick 5 numbers,奖池奖池奖池 if all the numbers hit the draw numbers, you'll win 378 times reward</span>
                <span v-if="areaMsg.pickType === '1'" class="js_choose_desc">Pick 1 number, if it hits the draw number, you'll win 1.8 times reward</span>
                <span v-if="areaMsg.pickType !== '1' && areaMsg.pickType !== '5J'" class="js_choose_desc">Pick {{ currIndex + 1 }} numbers, if all the numbers hit the draw numbers, you'll win {{ syxw_bettype_odds['110'+(currIndex+1)]  }} times reward</span>
                <a href="javascript:;" class="js_showReward"> Reward table</a>
            </p>
            <!--<a href="javascript:;" class="limit-tips js_limit-tips" @click="showPopLimit">Limit number list</a>-->
            <a href="javascript:;" class="limit-tips js_limit-tips" >Limit number list</a>
        </div>
        <span class="line js_line">Ticket1</span>
        <!--<ul class="number-box js_isReady" data-luckyNum="1|3|4|6|8">-->
        <ul class="number-box js_number-box-11" >
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
            <li>11</li>
        </ul>
        <a href="javascript:;" class="btn-random-pick">Quick Pick</a>
        <a href="javascript:;" class="btn-delete"></a>
        <a href="javascript:;" class="btn-close hide"></a>
        <div class="beting">
            <span>Bet</span>
            <div class="btn-beting">
                <input type="text" name="bet1" class="js_betMoney" value="0.0001" placeholder="0.0001">
                <a href="javascript:;" class="btn-beting-add js_beting-add">add</a>
                <a href="javascript:;" class="btn-beting-low js_beting-low">low</a>
            </div>
            <span>ETH</span>
            <div class="winning">
                Return&nbsp<i class="winMoney">0.0378&nbspETH</i>
            </div>
        </div>
        <div class="order-box js_choose_jackPot" :class="{'hide': areaMsg.pickType !== '5J'}">
            <p>Picking Order</p>
            <ul class="num-box js_num-box-5">
                <!--flipInY on-->
                <li>-</li>
                <li>-</li>
                <li>-</li>
                <li>-</li>
                <li>-</li>
            </ul>
        </div>
    </li>
</template>

<script>
	export default {
		data(){
			return {
				title: ''
			}
		},
        props:['areaMsg','currIndex'],
		watch: {},
		methods: {
			chosePickType (val) {
				this.$emit('update:areaMsg', {
                    ...areaMsg,
					pickType:val
				})
            }
        },
		computed: {
			syxw_bettype_odds(){
				return this.$store.state.cs_1105.syxw_bettype_odds
            }
        },
		mounted(){

		},
		filters: {
			formate_odds:( odd = '1101')=>{

            },
			formateCoinType: (type = '2001') => {
				type = type.toString()
				switch (type) {
					case '2001':
						return 'ETH'
					case '1001':
						return 'BTC'
					default:
						return 'ETH'
				}
			},
			format_match: (match)=> {
				if (isNaN(match)) {
					return ''
				}
				match = match.toString()
				switch (match) {
					case '1101':
						return 'C1'
					case '1102':
						return 'C2'
					case '1103':
						return 'C3'
					case '1104':
						return 'C4'
					case '1105':
						return 'C5'
				}
			},
			formateBalance: (val = 0) => {
				var newEth = null
				if (isNaN(val) || isNaN(Number(val))) {
					console.error('formateBalance error' + val)
					return 0
				}
				val = Number(val)
				if (val > 10000000) {
					newEth = (val / 100000000).toFixed(1) + '亿'
				} else if (val > 100000) {
					newEth = (val / 10000).toFixed(1) + '万'
				} else if (val > 1000) {
					newEth = parseFloat(val.toFixed(0))
				} else if (val > 100) {
					newEth = val.toFixed(3)
				} else if (val > 10) {
					newEth = val.toFixed(4)
				} else {
					newEth = val.toFixed(5)
					// 如果需要去掉零 用parseFloat(  )
				}
				return newEth
			}
		},
	}
</script>
<style>
</style>
