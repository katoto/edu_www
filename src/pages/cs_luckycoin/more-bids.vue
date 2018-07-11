<template>
    <div class="oneToKen">
          <div class="main">
                <div class="container">
                    <div class="row clearfix">
                        <div class="for-full items">
                            <div class="col-md-6 col-lg-3">
                                <bet-box :bet="betsList[1]"></bet-box>
                            </div>
                            <div class="col-md-6 col-lg-3">
                                <bet-box :bet="betsList[1]"></bet-box>
                            </div>
                            <div class="col-md-6 col-lg-3">
                                <bet-box :bet="betsList[1]"></bet-box>
                            </div>
                            <div class="col-md-6 col-lg-3">
                                <bet-box :bet="betsList[1]"></bet-box>
                            </div>
                            <div class="col-md-6 col-lg-3">
                                <bet-box :bet="betsList[1]"></bet-box>
                            </div>
                            <div class="col-md-6 col-lg-3">
                                <bet-box :bet="betsList[1]"></bet-box>
                            </div>
                            <div class="col-md-6 col-lg-3">
                                <bet-box :bet="betsList[1]"></bet-box>
                            </div>
                            <div class="col-md-6 col-lg-3">
                                <bet-box :bet="betsList[1]"></bet-box>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
    </div>
</template>
<script>
import Header from '~components/Header.vue'
import Footer from '~components/Footer.vue'
import betBox from './components/bet-box'
import { mapActions, mapState } from 'vuex'

export default {
    data () {
        return {
        }
    },
    methods: {
        ...mapActions(['updateLuckyCoinPage'])
    },
    computed: {
        ...mapState('cs_luckycoin', {
            betsList: state => state.betsList
        })
    },
    mounted () {
        this.updateLuckyCoinPage()
    },
    components: { Header, Footer,betBox }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../styles/lib-media.less";

    .items{
        >div{
            margin-bottom:10px;
        }
    }
    @media (min-width: @screen-desktop){

    }
</style>
