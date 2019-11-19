<template>
  <a href="javascript:;" class="scrollTop" :class="[scrollTop < 200 ? 'hide' : '']" @click="toTop">
    ScrollTop
  </a>
</template>

<script>
export default {
  data() {
    return {
      scrollTop: 0
    }
  },
  watch: {},
  methods: {
    handleScroll() {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    },
    toTop() {
      this.scrollTop = document.documentElement.scrollTop = document.body.scrollTop = 0
    }
  },
  computed: {},
  components: {},
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll, true)
  }
}
</script>
<style scoped lang="less">
.scrollTop {
  position: fixed;
  bottom: 120px;
  right: 40px;
  z-index: 6;
  display: block;
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 4px;
  font-size: 0;
  text-indent: -9999px;
  background: rgba(0, 0, 0, 0.25) url('../assets/img/icon-arrow-down.png') no-repeat center;
  background-size: 14px;
  transform: rotate(180deg);
}
@media (max-width: 768px) {
  .scrollTop {
    bottom: 10/75rem;
    right: 10/75rem;
    width: 70/75rem;
    height: 70/75rem;
  }
}
</style>
