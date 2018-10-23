<template>
    <div id="test">
        <div>
            <ul>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
            </ul>
        </div>
        <p></p>
    </div>
</template>
<script>

export default {
    data () {
        return {
        }
    },
    watch: {},
    methods: {

    },
    computed: {

    },
    components: {
    },
    mounted () {
    }
}
</script>

<style  lang="less" type="text/less">
html,
body {
  height: 100%;
}
#app {
  position: relative;
  height: 100%;
}
* {
  box-sizing: border-box;
}
#test {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  overflow: auto;
  > div {
    width: 100%;
    flex: 1;
    overflow: auto;
    -webkit-touch-callout: touch;
    line-height: 100px;
  }
  p {
    width: 100%;
    height: 200px;
    background: #000;
  }
}
</style>
