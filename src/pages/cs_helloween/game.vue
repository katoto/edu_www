<template>
    <div class="main">
        <img class="ghost" src="@/assets/img/helloween/ghost-dead.png" v-if="isDead">
        <img @click="hitIt" class="ghost" src="@/assets/img/helloween/ghost.png" v-else>
        <i class="music-btn"></i>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isDead: false
        }
    },
    methods: {
        hitIt () {
            this.isDead = true
        }
    }
}
</script>


<style lang="less" scoped>
.main {
    position: fixed;
    z-index: 100000000000000;
    background-color: #FFF;
    background: url(/static/img/bg.b702c37.jpg);
    width: 698px;
    height: 500px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-size: 100% 100%;
    .ghost {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 30px;
    }
    .music-btn {
        position: absolute;
        top: 10px;
        right: 70px;
        width: 23px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAWlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////9ZMre9AAAAHXRSTlMAHfcFfGGv6dvWkYczKSIR4bihb1ZPQDkN686pR8NwSlAAAACQSURBVBjTfdFZEoMwDANQ4bATSNm76f7XLNCQpGGm+nzjD1vGmXt+U4jSVWQS2VrwgpPwiyrVp6WkxY5MD1IDHSIjx22qLOhRbSoJSHpsZUbOJkIWSvP5i+i5QiTCgcsFVSlGs4KEOLLBizWyvvRopn3R9ugnWH4WexIah4mwhk3mCqnfcFkeO/4r2ccE7/gAJV0Tm68GtGMAAAAASUVORK5CYII=) no-repeat;
        height: 20px;
        cursor: pointer;
    }
}
</style>