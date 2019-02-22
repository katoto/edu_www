<template>
<!-- 再复杂的组件，都是由三部分组成：prop、event、slot -->
<!-- 当有多个slot 的时候，用name 进行区分  引用方式 slot="icon" -->
<!-- 自定义事件  disabled 会禁止事件 -->
<!-- vue和react都是采用diff算法来对比新旧虚拟节点，从而更新节点 （查找复用节点）-->
<!-- 不带key 时节点能够复用，省去了销毁、创建组件的开销 -->
<!-- key的作用是为了在diff算法执行时更快的找到对应的节点，提高diff速度 -->
	<button :class="'i-button-size ' + size" :disabled="disabled" @click="handleClick">
        <slot name="icon"></slot>
        <slot>默认展示值</slot>
	</button>
</template>

<script>
// 1
// const AlertComponent = Vue.extend({
//     template: '<div>{{ message }}</div>',
//     data(){
//         return {
//             message: ''
//         }
//     }
// })

// const component = new AlertComponent().$mount()
// document.body.appendChild( component.$el )
// // 等价
// new AlertComponent().$mount('#app')
// new AlertComponent({el:'#app'})
// 2
// import Notifi from './XX'
// const props = {}
// const Instance = new Vue({
//     render(h){
//         return h(Notifi, {
//             props: props
//         })
//     }
// })
// const component = Instance.$mount()
// document.body.appendChild(component.$el)
</script>


<script>

// 判断参数是否是其中一个
function oneOf (value, validList) {
    for (let i = 0;i < validList.length;i++) {
        if (value === validList[i]) return true
    }
    return false
}
// props 是单向数据流，组件自己不可修改值，非要修改通过自定义事件通知父级，由父级修改(或者在内部使用变量)
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
            this.$emit('abc', event)
        }
    },
    inject: ['app'],
    created () {
        // 先于子组件create
        this.$on('on-form-item-add', (field) => {
            if (field) this.fields.push(field)
        })
        this.$on('on-form-item-remove', (field) => {
            if (field.prop) this.fields.splice(this.fields.indexOf(field), 1)
        })
    },
    mounted () {
        console.log(this.app)
        console.log('=====')
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