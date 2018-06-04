<template>
  <div id="app">
    <!-- 公用的弹窗 fail success-->
    <div id="toast" class="" style=""></div>
    <router-view/>
  </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style lang="less">
    @import "../styles/lib-font.less";
    @import "../styles/lib-public.less";
    #app{
        position: relative;
        min-width: 1190px;
        background: #eef1f9;
        font:14px/20px sans-r;
        color: #263648;
    }

</style>
