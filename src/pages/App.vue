<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
    export default {
      name: 'App',
    }
</script>

<style lang="less">
    @import "../styles/lib-reset.css";
    @import "../styles/lib-public.less";
    .test{
        .transition();
    }

</style>
