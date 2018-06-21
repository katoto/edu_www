<template>
    <!--  弹窗-登录  -->
    <Pop class="pop-limit" :show.sync="show">
        <div class="pop-main">
            <h3>Limit Number List</h3>
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
                        <li v-for="value in dateLimit" class="limit-item">
                            <div class="fl limit-nper">
                                <div>
                                    <span>{{value.expectid}}</span>
                                </div>
                            </div>
                            <div class="fr">
                                <ul>
                                    <li v-for="value2 in value.restrict" class="limit-item2 clearfix">
                                        <div class="limit-match">
                                            {{value2.bettype | format_match}}
                                        </div>
                                        <div class="limit-number">
                                            <ul :class="value2.bettype | format_class">
                                                <li v-for="value3 in value2.betcode">
                                                    {{value3}}
                                                </li>
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
    import {tipsTime, setCK, removeCK, wait, format_time} from '~common/util'
    import {mTypes, aTypes} from '~/store/cs_page/cs_1105'

    export default {
        data () {
            return {
                time: '',
                noLimit: false,
                numx: 'num-boxc2',
                dateLimit: [
                ]
            }
        },
        components: {Pop},
        methods: {
            async updataMsg () {
                let dataLimit = await this.$store.dispatch(aTypes.popLimit)
                if (dataLimit && dataLimit.status === '100') {
                    this.time = format_time(parseInt(dataLimit.data.uptime), 'yyyy/MM/dd HH:mm:ss')
                    if (dataLimit.data.restrictpools.length === 0) {
                        this.noLimit = true
                    } else {
                        this.dateLimit = dataLimit.data.restrictpools
                        this.noLimit = false
                    }
                } else {
                    Message({
                        message: 'limit error',
                        type: 'error'
                    })
                }
            }
        },
        watch: {
            show (val) {
                if (val) {
                    this.updataMsg()
                }
            }
        },
        computed: {
            show: {
                set: function (isShow) {
                    if (!!isShow === true) {
                        this.$store.commit('showPopLimit')
                    } else {
                        this.$store.commit('hidePopLimit')
                    }
                },
                get: function () {
                    return this.$store.state.pop.showPopLimit
                }
            }
        },
        filters: {
            format_match (value) {
                if (isNaN(value)) {
                    return ''
                }
                value = value.toString()
                switch (value) {
                case '1101':
                    return 'C1'
                case '1102':
                    return 'C2'
                case '1103':
                    return 'C3'
                case '1104':
                    return 'C4'
                case '1105':
                    return 'C5'
                case '11051':
                    return 'Super 5'
                }
            },
            format_class (value) {
                if (isNaN(value)) {
                    return ''
                }
                value = value.toString()
                switch (value) {
                case '1101':
                    return 'num-boxc1'
                case '1102':
                    return 'num-boxc2'
                case '1103':
                    return 'num-boxc3'
                case '1104':
                    return 'num-boxc4'
                case '1105':
                    return 'num-boxc5'
                case '11051':
                    return 'num-boxc5'
                }
            }
        },
        mounted () {
            // this.updataMsg()
        }
    }
</script>

<style lang="less" scoped>
</style>


