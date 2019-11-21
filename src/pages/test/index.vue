<template>
  <div>
    <section>
      <p></p>
    </section>
  </div>
</template>
<script>
import { getUrlParam, removeUrlParam } from '~/common/testUtil.js'
export default {
  name: 'signalroot',
  data() {
    return {
      indexVal: 1,
      randomVal: Math.random()
    }
  },
  methods: {
    addIndex() {
      // 加1
      this.indexVal += 1
      this.randomVal = Math.random()
    }
  },
  provide() {
    return {
      app: this
    }
  },
  mounted() {
    console.log(getUrlParam('b'))
  },
  beforeDestroy() {}
}
</script>
