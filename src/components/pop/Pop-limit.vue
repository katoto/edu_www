<template>
    <!--  弹窗-登录  -->
    <Pop class="pop-limit" :show.sync="show">
        <div class="pop-main">
            <h3>
                <lang>Limit Number List</lang>
            </h3>
            <p class="update">
                <lang>Last updated</lang> : {{time}}
            </p>
            <div class="pop-limit1" v-if="noLimit">
                <div class="icon-limit"></div>
                <p>
                    <lang>No limit number yet</lang>
                </p>
            </div>
            <div class="pop-limit2" v-else>
                <div class="limit-table-h">
                    <div class="limit-table-h1">
                        <lang>No.</lang>
                    </div>
                    <div class="limit-table-h2">
                        <lang>match</lang>
                    </div>
                    <div class="limit-table-h3">
                        <lang>limit number</lang>
                    </div>
                </div>
                <div class="limit-table-c">
                    <ul class="js_limit_total_ul">
                        <li v-for="(value, index) in dateLimit" class="limit-item" :key="index">
                            <div class="fl limit-nper">
                                <div>
                                    <span>{{value.expectid}}</span>
                                </div>
                            </div>
                            <div class="fr">
                                <ul>
                                    <li v-for="(value2, itemIndex) in value.restrict" class="limit-item2 clearfix" :key="itemIndex">
                                        <div class="limit-match">
                                            {{formatMatch(value2.bettype)}}
                                        </div>
                                        <div class="limit-number">
                                            <ul :class="value2.bettype | format_class">
                                                <li v-for="(value3, betcodeIndex) in value2.betcode" :key="betcodeIndex">
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
    import {formatTime, formatMatch} from '~common/util'
    import {aTypes} from '~/store/cs_page/cs_1105'

    export default {
        data () {
            return {
                time: '',
                noLimit: false,
                numx: 'num-boxc2',
                dateLimit: []
            }
        },
        components: {Pop},
        methods: {
            formatMatch,
            async updataMsg () {
                let dataLimit = await this.$store.dispatch(aTypes.popLimit)
                if (dataLimit && dataLimit.status === '100') {
                    this.time = formatTime(parseInt(dataLimit.data.uptime), 'yyyy/MM/dd HH:mm:ss')
                    if (dataLimit.data.restrictpools.length === 0) {
                        this.noLimit = true
                    } else {
                        this.dateLimit = dataLimit.data.restrictpools
                        this.noLimit = false
                    }
                } else {
                    Message({
                        message: _('limit error'),
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
        }
    }
</script>

<style lang="less" scoped type="text/less">
</style>


