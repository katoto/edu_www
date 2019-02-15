<template>
<!-- 再复杂的组件，都是由三部分组成：prop、event、slot  -->
<!-- 当有多个slot 的时候，用name 进行区分  引用方式 slot="icon"  -->
<!-- 自定义事件  disabled 会禁止事件 -->
	<button :class="'i-button-size ' + size" :disabled="disabled" @click="handleClick">
        <slot name="icon"></slot>
        <slot>默认展示值</slot>
	</button>
</template>
<script>
// 判断参数是否是其中一个
function oneOf (value, validList) {
    for (let i = 0;i < validList.length;i++) {
        if (value === validList[i]) return true
    }
    return false
}
// props 是单向数据流，组件自己不可修改值，非要修改通过自定义事件通知父级，由父级修改
// 默认是开启继承的（id,class） ， inheritAttrs: false 可以设置
export default {
    props: {
        size: {
            validator (value) {
                return oneOf(value, ['small', 'large', 'default'])
            },
            default: 'default'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    inheritAttrs: true,
    methods: {
        handleClick (event) {
            console.log('1118811')
            this.$emit('abc', event)
        }
    }
}
</script>
<style lang="less">
    button{
        width: 100px;
        height: 100px;
        border: 2px solid rebeccapurple;
        position: relative;
        z-index: 10;
        cursor: pointer;
    }
    .large{
        width: 130px;
    }
    .small{
        width: 40px;
    }
</style>