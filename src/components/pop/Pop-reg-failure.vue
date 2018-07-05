<template>
  <!--  成功注册的failure弹窗  -->
  <Pop class="pop-reg-failure" :show.sync="show">
        <div class="pop-main">
            <h3>
                <lang>Submit Failure</lang>
            </h3>
            <div class="icon-face on">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <circle cx="20.5" cy="23.5" r="3.5" fill="#fc5c65"/>
                    <circle cx="43.5" cy="23.5" r="3.5" fill="#fc5c65"/>
                    <path class="mouth" d="M18 40 C28,30 33,30 46,40" stroke="#fc5c65" fill="none"
                            style="stroke-width: 4px;"></path>
                    <path class="cheek" d="M58 47  A 30 30 0 1 0 50 56" fill="none" stroke="#fc5c65"
                            style="stroke-width: 4px;"/>
                </svg>
            </div>
                <p v-html="_('Due to <span class=js_pop_failure_msg> * * </span>, the order is unsuccessful,<br/>please try again later')">
                </p>
            <a href="javascript:;" class="btn-failure">
                <lang>Try Later</lang>
            </a>
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
                    this.$store.commit('showRegFailure')
                } else {
                    this.$store.commit('hideRegFailure')
                }
            },
            get: function () {
                return this.$store.state.pop.showRegFailure
            }
        }
    }
}
</script>

<style lang="less" scoped>
</style>


