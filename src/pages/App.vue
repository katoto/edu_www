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
    @import "../styles/lib-font.less";
    #app{
        position: relative;
        min-width: 1190px;
        background: #eef1f9;
        line-height: 20px;
        font-family: sans-r;
        font-size: 14px;
        color: #263648;
    }

</style>
