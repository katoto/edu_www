<template>
  <div>
    <section>
      <p>通信方式1 <button @click="addIndex">点击父组件修改index</button></p>
      <br />
      <Signal1 :index="indexVal" :randomVal="randomVal"></Signal1>
    </section>

    <section>
      <p>测试子父组件通信2</p>
      <Signal2 :index="indexVal" @upIndex="addIndex"></Signal2>
    </section>

    <section>
      <h1>provide/inject通信</h1>
      <Signal3 :index="indexVal"></Signal3>
    </section>

    <section>
      <h1>bus组件通信</h1>
      <Signal4 :index="indexVal"></Signal4>
    </section>

    <section>
      <h1>findComponent 方式改变值</h1>
      <Signal5></Signal5>
    </section>
  </div>
</template>
<script>
import Signal1 from '~/pages/test/components/Signal1.vue'
import Signal2 from '~/pages/test/components/Signal2.vue'
import Signal3 from '~/pages/test/components/Signal3.vue'
import Signal4 from '~/pages/test/components/Signal4.vue'
import Signal5 from '~/pages/test/components/Signal5.vue'

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
    // 事件订阅  bus通信
    this.$bus.$on('addIndexBus', msg => {
      this.indexVal += 1
      console.log(msg)
    })
  },
  beforeDestroy() {
    // 取消事件订阅
    this.$bus.$off('addIndexBus')
  },
  components: {
    Signal1,
    Signal2,
    Signal3,
    Signal4,
    Signal5
  }
}
</script>
