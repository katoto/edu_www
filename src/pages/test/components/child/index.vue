<template>
  <div>
    <p>孙子:{{ this.$attrs }}</p>
  </div>
</template>
<script>
// 通信1 测试多属性传递
export default {
  mounted() {
    console.log(this.$attrs)
  }
}
</script>
