<template>
    <div class="test" :class="{'on':on}">
        <a href="javascript:;" @click="add">btn</a>
        <div></div>
        <input type="text" ref="input" @focus="test" @blur="test2">
    </div>
</template>
<script>
export default {
    data () {
        return {
            top1: '',
            top2: '',
            interval: '',
            on: false
        }
    },
    watch: {},
    methods: {
        test () {
            setInterval(function () {
                console.log(window.innerHeight)
            }, 1000)
        },
        test2 () {
            this.on = false
        },
        add () {
            this.on = true
        }
    },
    computed: {},
    components: {},
    mounted () {
        console.log(window.innerHeight)
    }
}
</script>

<style  lang="less" type="text/less">
.test {
  position: relative;
  &.on {
    transform: translateY(-50%);
  }
  div {
    height: 1000px;
    background: #000;
  }
  a,
  input {
    position: fixed;
    width: 50px;
    height: 50px;
    margin: 50px auto;
  }
  a {
    top: 0;
  }
  input {
    bottom: 0;
  }
}
</style>
