<template>
  <!--  成功注册的success弹窗  -->
  <Pop class="pop-reg-success" :show.sync="show">
        <div class="pop-main">
            <h3>Registration Successful</h3>
            <div class="icon-face on">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <circle cx="20.5" cy="23.5" r="3.5" fill="#20bf6b"/>
                    <circle cx="43.5" cy="23.5" r="3.5" fill="#20bf6b"/>
                    <path class="mouth" d="M18 40 C28,45 33,46 46,40" stroke="#20bf6b" fill="none"
                            style="stroke-width: 4px;"></path>
                    <path class="cheek" d="M58 47  A 30 30 0 1 0 50 56" fill="none" stroke="#20bf6b"
                            style="stroke-width: 4px;"/>
                </svg>
            </div>
            <p>Congratulates！<br>Now you can enjoy the game.</p>
            <a href="javascript:;" @click="regisSucc" class="btn-success">Wish You Luck</a>
        </div>
  </Pop>
</template>

<script>
import Pop from './Pop'

export default {
    components: { Pop },
    computed: {
        show: {
            set: function (isShow) {
                if (!!isShow === true) {
                    this.$store.commit('showRegSuccess')
                } else {
                    this.$store.commit('hideRegSuccess')
                }
            },
            get: function () {
                return this.$store.state.pop.showRegSuccess
            }
        }
    },
    methods: {
	    regisSucc () {
		    this.$store.commit('hideRegSuccess')
        }
    }
}
</script>

<style lang="less" scoped>
</style>


