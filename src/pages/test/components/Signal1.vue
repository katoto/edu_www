<template>
  <!-- 再复杂的组件，都是由三部分组成：prop、event、slot -->
  <div>
    <p>signal子组件的值为：{{ index }}</p>
    <br />
    <!-- 2 测试多代 -->
    <!-- <Child v-bind="$props"></Child> -->
    <!-- <Child :XX="xxx" :xxx="xxx"></Child> -->
  </div>
</template>
<script>
// props 是单向数据流，组件自己不可修改值，非要修改通过自定义事件通知父级，由父级修改(或者在内部使用变量)
import Child from './child/index'
export default {
  props: {
    index: {
      type: Number,
      default: 0
    },
    randomVal: {
      type: Number,
      default: 0
    }
  },
  components: {
    Child
  },
  methods: {
    handleClick(event) {
      this.$emit('upIndex', event)
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
p {
  font-size: 18px;
}
</style>
