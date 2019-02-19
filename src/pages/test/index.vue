<template>
    <div>
        测试测试
        <br>
        <i-button id="123" size="small" data-id='123' @abc="aa">
            <strong>aaader</strong>
            <!-- 指定具名位置 -->
            <span slot="icon">pps</span>
        </i-button>
        <!-- <i-button id="123" size="small" disabled='disabled' data-id='123'> -->
            <!-- 默认值 -->
        <!-- </i-button> -->
        <p @click="emitFn">按钮点击</p>
    </div>
</template>
<script>
import iButton from '~/pages/test/components/iButton.vue'
import mixinsUser from '~/pages/test/mixins/mixins_user.js'

// $emit 和$no 的使用
// mixins 混合
// vue 组件渲染顺序是由内而外，(父组件的created 先于子组件的mounted)
export default {
    mixins: [mixinsUser],
    components: {
        iButton
    },
    methods: {
        emitFn () {
            this.$emit('test', '219')
        }
    },
    // provide: {
    //     name: 'Asesn'
    // }
    provide () {
        return {
            app: this
        }
    },
    mounted () {
        this.aa()
        this.bb()
        // $no 监听了自己触发的自定义事件
        this.$on('test', (text) => {
            window.alert(text)
        })
    }
}
</script>
