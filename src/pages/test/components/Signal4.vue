<template>
  <div>
    <p>signal4子组件的值为：{{ index }} </p>
    <section>
      <button @click="handleClick">signal4子组件bus修改index</button>
    </section>
  </div>
</template>
<script>
export default {
    props: {
        index: {
            type: Number,
            default: 0
        }
    },
    methods: {
        handleClick () {
            // 事件广播
            this.$bus.$emit('addIndexBus', 'hello')
        }
    }
}
</script>
<style lang="less">
    button{
        width: 300px;
        height: 50px;
        border: 2px solid rebeccapurple;
        position: relative;
        z-index: 10;
        cursor: pointer;
    }
    .large{
        width: 130px;
    }
    .small{
        width: 40px;
    }
</style>