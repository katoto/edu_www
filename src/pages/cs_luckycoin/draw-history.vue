<template>
    <div class="main">
        Draw History
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    data () {
        return {
        }
    },
    methods: {
        ...mapActions(['updateLuckyCoinPage'])
    },
    computed: {},
    mounted () {
        this.updateLuckyCoinPage()
    },
    components: { }
}
</script>
<style lang="less" scoped
</style>