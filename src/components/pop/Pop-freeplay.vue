<template>
  <!--  成功注册的failure弹窗  -->
  <Pop class="pop-freeplay" :show.sync="show">
      <img src="@assets/img/img-pop.png" alt="" width="361" height="336">
      <a href="javascript:;" @click="signUp" class="btn-sign js_btn-sign">
          Sign Up
      </a>
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
                    this.$store.commit('showFreeplay')
                } else {
                    this.$store.commit('hideFreeplay')
                }
            },
            get: function () {
                return this.$store.state.pop.showFreeplay
            }
        }
    },
    methods: {
        signUp () {
            this.$store.commit('hideFreeplay')
            this.$store.commit('showRegPop')
        }
    }
}
</script>

<style lang="less" scoped>
</style>


