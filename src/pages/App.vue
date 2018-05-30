<template>
  <div id="app">
      <router-view/>
      <Footer></Footer>
  </div>
</template>

<script>
    import Footer from '../components/Footer.vue'
    export default {
      name: 'App',
        components:{
            Footer
        }
    }
</script>

<style lang="less">
    @import "../styles/lib-reset.css";
    @import "../styles/lib-public.less";
    .test{
        .transition();
    }

</style>
