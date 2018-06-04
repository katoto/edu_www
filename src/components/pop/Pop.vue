<template>
    <div class="pop" :class="{ hide: !show }">
        <div class="pop-body">
            <div class="pop-ani">
                <a href="javascript:;" class="btn-close" v-if="hasClose" @click="onClose"></a>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // 控制弹窗是否显示
        show: {
            type: Boolean,
            default: false
        },
        // 控制是否显示右上角关闭按钮
        hasClose: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        onClose () {
            console.log('pop close')
            this.$emit('update:show', false)
            this.$emit('onClose')
        },
        onShow () {
            console.log('pop show')
            this.$emit('onShow')
        }
    }
}
</script>

<style lang="less" scoped>
</style>


