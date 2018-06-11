<template>
    <!--拉新活动-->
    <!--链接邀请-->
    <Pop class="pop-faucet" :show.sync="show">
        <div class="pop-main">
            <div class="pop-main">
                <h3 class="font26">Faucet</h3>
                <p>
                    Inviting friends earn 0.001 ETH per invitation (2 chances)
                </p>
                <p>
                    Use the following link to invite your friends
                </p>
                <div id="js_newActCopy" class="newActCopy">text</div>
                <a href="javascript:;" id="js_choseFaucet" data-clipboard-text="copy failure"
                   class="btn-copy js_btn-copy">Copy
                    to clipboard</a>
                <p>
                    Tips:
                </p>
                <p>
                    1. Free ETH reward cannot be cashed out.
                </p>
                <p>
                    2. Each account has two chances to get invitation reward.
                </p>
                <p>
                    3. The amount of free ETH is limited. First come, first served.
                </p>
                <p>
                    4. The right of final interpretation of this activity reserved to Coinslot.com.
                </p>
            </div>
        </div>
    </Pop>
</template>

<script>
	import Pop from './Pop'

	export default {
		components: {Pop},
		computed: {
			show: {
				set: function (isShow) {
					if (!!isShow === true) {
						this.$store.commit('showFaucet')
					} else {
						this.$store.commit('hideFaucet')
					}
				},
				get: function () {
					return this.$store.state.pop.showFaucet
				}
			}
		}
	}
</script>

<style lang="less" scoped>
</style>


