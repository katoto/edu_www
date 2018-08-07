<template>
    <div class="">
        <h1>
            流水说明
        </h1>
        <ul>
            <li>
                <p class="title">
                    1. 计算公式
                </p>
                <p class="msg">
                    流水额 = Lucky11投注额 + 1/5 slot流水
                </p>
            </li>
            <li>
                <p class="title">
                    2. 约束条件
                </p>
                <p class="msg">
                    可提现额度 = 1/10 * 流水总额 + 历史提现总额
                </p>
            </li>
            <li>
                <p class="title">
                    3. 资金流水分配
                </p>
                <p class="cicle">
                    · 充值金额全部进入可提现账户
                </p>
                <p class="cicle">
                    · 赠送金额全部进入不可提现账户
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {}
        },
        watch: {},
        methods: {},
        computed: {},
        components: {},
        mounted () {

        }
    }
</script>
<style scoped lang="less">
</style>
