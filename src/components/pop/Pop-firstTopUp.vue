<template>
    <!--  弹窗-首充 触达新增  -->
    <Pop class="Pop_firstTopUp " :show.sync="show">
        <div class="pop-main">
            <h3>
                <lang>50% bonus</lang>
            </h3>
            <p class="firstTopUp_msg" v-lang="'50% bonus only for the first top-up.<br /> Let your happiness continue!'"></p>
            <router-link to="/account/deposit" class="pop-btn">
                <lang>Top Up </lang>
            </router-link>
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
    methods: {
    },
    computed: {
        show: {
            set: function (isShow) {
                if (!!isShow === true) {
                    this.$store.commit('showPopFirstTopup')
                } else {
                    this.$store.commit('hidePopFirstTopup')
                }
            },
            get: function () {
                return this.$store.state.pop.showPopFirstTopup
            }
        }
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
