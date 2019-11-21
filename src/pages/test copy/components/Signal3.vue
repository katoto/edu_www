<template>
  <div>
    <p>signal3子组件的值为：{{ app.indexVal }}</p>
    <section>
      <button @click="handleClick">signal3子组件provide/inject修改index</button>
    </section>
  </div>
</template>
<script>
export default {
  name: 'signal3',
  inject: ['app'],
  methods: {
    handleClick() {
      this.app.addIndex()
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
