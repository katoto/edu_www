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
export default {
    components: {
        iButton
    },
    methods: {
        aa () {
            console.log('11111')
            alert('123')
        }
    }
}
</script>
