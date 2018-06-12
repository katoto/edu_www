<template>
    <!--  弹窗-登录  -->
    <Pop class="pop-limit show">
        <div class="pop-main">
            <h3>limit number list</h3>
            <p class="update">Last updated : {{time}}</p>
            <div class="pop-limit1" v-if="noLimit">
                <div class="icon-limit"></div>
                <p>No limit number yet</p>
            </div>
            <div class="pop-limit2" v-else>
                <div class="limit-table-h">
                    <div class="limit-table-h1">No.</div>
                    <div class="limit-table-h2">match</div>
                    <div class="limit-table-h3">limit number</div>
                </div>
                <div class="limit-table-c">
                    <ul class="js_limit_total_ul">
                        <li class="limit-item">
                            <div class="fl limit-nper">
                                <div>
                                    <span>1812180256</span>
                                </div>
                            </div>
                            <div class="fr">
                                <ul>
                                    <li class="limit-item2 clearfix">
                                        <div class="limit-match">
                                            C1
                                        </div>
                                        <div class="limit-number">
                                            <ul class="num-boxc1">
                                                <li>1</li>
                                                <li>2</li>
                                                <li>3</li>
                                                <li>4</li>
                                                <li>5</li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li class="limit-item2 clearfix">
                                        <div class="limit-match">
                                            C2
                                        </div>
                                        <div class="limit-number">
                                            <ul class="num-boxc2">
                                                <li>2,5</li>
                                                <li>2,6</li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li class="limit-item2 clearfix">
                                        <div class="limit-match">
                                            C3
                                        </div>
                                        <div class="limit-number">
                                            <ul class="num-boxc3">
                                                <li>2,5,6</li>
                                                <li>2,5,6</li>
                                                <li>2,5,7</li>
                                                <li>2,5,8</li>
                                                <li>2,5,9</li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="limit-item">
                            <div class="fl limit-nper">
                                <div>
                                    <span>1812180257</span>
                                </div>
                            </div>
                            <div class="fr">
                                <ul>
                                    <li class="limit-item2 clearfix">
                                        <div class="limit-match">
                                            C4
                                        </div>
                                        <div class="limit-number">
                                            <ul class="num-boxc4">
                                                <li>2,5,6,7</li>
                                                <li>2,5,6,8</li>
                                                <li>2,5,6,9</li>
                                                <li>2,5,6,10</li>
                                                <li>2,5,6,11</li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="limit-item">
                            <div class="fl limit-nper">
                                <div>
                                    <span>1812180258</span>
                                </div>
                            </div>
                            <div class="fr">
                                <ul>
                                    <li class="limit-item2 clearfix">
                                        <div class="limit-match">
                                            C5
                                        </div>
                                        <div class="limit-number">
                                            <!--num-box-->
                                            <ul class=" num-boxc5">
                                                <li>1,2,5,6,7</li>
                                                <li>2,5,6,7,8</li>
                                                <li>2,5,6,7,11</li>
                                                <li>1,2,5,6,7</li>
                                                <li>2,5,6,7,8</li>
                                                <li>2,5,6,7,11</li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </Pop>
</template>

<script>
    import Pop from './Pop'
    import {Message} from 'element-ui'
    import {tipsTime, setCK, removeCK, wait,format_time} from '~common/util'
    import {mTypes, aTypes} from '~/store/cs_page/cs_1105'

    export default {
        data(){
            return {
                time:'',
                noLimit:false
            }
        },
        components: {Pop},
        methods: {

        },
        computed: {

        },
        async mounted(){
            let dataLimit = await this.$store.dispatch(aTypes.popLimit);
            if(dataLimit.status === '100'){
                this.time = format_time(parseInt(dataLimit.data.uptime), 'yyyy/MM/dd HH:mm:ss');
                if(dataLimit.data.restrictpools.length == 0){
//                    this.noLimit = true
                }else{

                }
            }
        }
    }
</script>

<style lang="less" scoped>
</style>


