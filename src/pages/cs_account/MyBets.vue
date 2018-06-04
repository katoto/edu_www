<template>
    <div class="betting">
          <h2>Bet Record</h2>
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
.betting{
    h2{
        line-height: 30px;
        font-size: 24px;
        color: #263648;
        text-transform: capitalize;
    }
    .filter{
        margin-top: 15px;
    }
}

</style>
