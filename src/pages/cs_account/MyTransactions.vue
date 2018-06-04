<template>
    <div class="capitalDetails">
         <h2>My Transactions</h2>
         <Filters></Filters>
    </div>
</template>

<script>
    import Filters from '~/components/Filter'
    export default {
        data(){
            return {}
        },
        watch: {},
        methods: {},
        computed: {},
        components: {
            Filters
        },
        mounted(){

        }
    }
</script>
<style scoped lang="less">
    @import "../../styles/lib-mixins.less";
    h2{
        line-height: 30px;
        font-size: 24px;
        color: #263648;
        text-transform: capitalize;
    }
    .capitalDetails{
        .filter{
            margin-top: 15px;
        }
    }
</style>
