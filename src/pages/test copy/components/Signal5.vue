<template>
  <div>
    <p>signal5子组件的值 {{ app.indexVal }}</p>
    <section>
      <button @click="handleClick">signal5子组件findComponents 方式查找</button>
    </section>
  </div>
</template>
<script>
import { findComponentUpward } from '~/common/assist.js'
export default {
  name: 'signal4',
  inject: ['app'],
  methods: {
    handleClick() {
      const currcom = findComponentUpward(this, 'signalroot')
      alert(currcom.indexVal)
      currcom.addIndex()
    }
  }
}
</script>
<style lang="less">
button {
  width: 300px;
  height: 50px;
  border: 2px solid rebeccapurple;
  position: relative;
  z-index: 10;
  cursor: pointer;
}
.large {
  width: 130px;
}
.small {
  width: 40px;
}
</style>
