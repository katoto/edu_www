<template>
    <!--  弹窗-首充  -->
    <Pop class="Pop_firstTopUp ">
        <div class="pop-main">
            <h3>
                <lang>50% bonus</lang>
            </h3>
            <p class="firstTopUp_msg">
                50% bonus only for the first top-up
                Let your happiness continue!
            </p>
            <a href="javascript:;" class="pop-btn">
                TOP UP
            </a>
        </div>
    </Pop>
</template>
<script>
import Pop from './Pop'
export default {
    data () {
        return {
        }
    },
    watch: {},
    methods: {

    },
    computed: {

    },
    components: { Pop },
    mounted () {
    }
}
</script>

<style  lang="less" type="text/less" scoped>
.firstTopUp_msg {
  line-height: 24px;
  font-size: 18px;
}
.pop-btn {
  margin: 18px 0 30px 0;
}
</style>
