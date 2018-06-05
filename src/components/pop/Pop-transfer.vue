<template>
    <Pop class="pop-transfer" :show.sync="show">
        <div class=" pop-main">
            <a href="javascript:;" class="btn-close">close</a>
            <h3>Withdraw comfirm</h3>
            <div class="trans-items">
                <div class="trans-msg top-top">
                    <span class="fl">Amount</span>
                    <span class="fr">ETH</span>
                    <p class="fr" id="js_transfer-topUp">1</p>
                </div>
                <div class="trans-msg">
                    <span class="fl">Fee</span>
                    <span class="fr">ETH</span>
                    <p class="js_currGasNumber fr">0.003</p>
                </div>
                <div class="trans-msg">
                    <span class="fl">Total</span>
                    <span class="fr">ETH</span>
                    <p class="fr" id="js_transfer_tatal">1.00300</p>
                </div>
            </div>
            <p class="trans-add1">Transfer to</p>
            <p class="trans-add2" id="js_copy_transferAddr2">0xF5602a4E53E575dAe3b7a3B8248191e51a35F9c3</p>
            <a href="javascript:;" data-clipboard-target="#js_copy_transferAddr2" class="trans-copy js_btn-copy">Copy</a>
            <a href="javascript:;" class="pop-btn js_transfer_confirm">Confirm</a>
        </div>
    </Pop>
</template>

<script>
    import Pop from './Pop'
	export default {
		data(){
			return {
				title: ''
			}
		},
		watch: {},
		methods: {},
		computed: {
			show:{
				set:function ( isShow ) {
                    if( !!isShow === true ){
                        this.$store.commit('showTransfer')
                    } else{
	                    this.$store.commit('hideTransfer')
                    }
				},
                get:function () {
                    return this.$store.state.pop.showTransfer
                }
            }
        },
		components:{
			Pop
        },
		mounted(){
		}
	}
</script>
<style>
</style>
