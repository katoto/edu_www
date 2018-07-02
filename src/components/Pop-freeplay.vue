<template>
  <!--  freeplay 弹窗  -->
  <div class="pop pop-freeplay" :class="{'hide':!showFree}">
      <div class="contain">
          <a href="javascript:;" @click="hideFreeplay" class="close">close</a>
          <img src="@assets/img/img-pop.png" alt="" width="361" height="336">
          <a href="javascript:;" @click="signUp" class="btn-sign">
              <lang>Sign Up</lang>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    computed: {
        showFree () {
            return this.$store.state.pop.showFreeplay
        }
    },
    methods: {
        hideFreeplay () {
            this.$store.commit('hideFreeplay')
        },
        signUp () {
            this.$store.commit('hideFreeplay')
            this.$store.commit('showRegPop')
        }
    }
}
</script>

<style lang="less" scoped>
    .pop-freeplay .close:after {
        width: 14px;
        height: 14px;
    }
</style>


