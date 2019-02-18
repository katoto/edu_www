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
    </div>
</template>
<script>
import iButton from '~/pages/test/components/iButton.vue'
import mixinsUser from '~/pages/test/mixins/mixins_user.js'

// mixins 混合
export default {
    mixins: [mixinsUser],
    components: {
        iButton
    },
    methods: {
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
    }
    
}
</script>
