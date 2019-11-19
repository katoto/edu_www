<template>
  <Pop class="pop-submitNext">
    <div class="pop-main">
      <p>
        Time's Up
      </p>
      <p>
        Submit your number to next series ?
      </p>
      <div class="btn-box">
        <a href="javascript:;" class="close">No,Thanks</a>
        <a href="javascript:;" class="submit">Ok</a>
      </div>
    </div>
  </Pop>
</template>
<script>
import Pop from './Pop'
export default {
  data() {
    return {}
  },
  components: { Pop },
  methods: {},
  computed: {},
  mounted() {}
}
</script>

<style lang="less">
.pop-submitNext {
  .pop-body {
    box-sizing: border-box;
    width: 100%;
    max-width: 440px;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 30px;
    color: #263648;
    font-size: 20px;
  }
  .btn-close {
    display: none !important;
  }
  .pop-main {
    padding: 36px 0 34px;
  }
  .btn-box {
    margin-top: 23px;
    display: flex;
    justify-content: center;
  }
  a {
    width: 172px;
    height: 54px;
    overflow: hidden;
    line-height: 54px;
    border: 2px solid #705ed6;
    border-radius: 6px;
    font-size: 20px;
    font-weight: bold;
    margin: 0 18px;
    &.close {
      color: #705ed6;
    }
    &.submit {
      background: #705ed6;
      color: #fff;
    }
    &:hover {
      background: #34287b;
      color: #fff;
    }
  }
}
</style>
