<template>
    <div>
        <Header></Header>
        <div class="main">
            <BreadCrumbs></BreadCrumbs>
            <div class="main-reward">
                <h1>Draw number</h1>
                <el-table
                    :data="drawNumList"
                    stripe
                    size="small"
                    highlight-current-row
                    style="width: 100%">
                    <el-table-column
                        prop="opentime"
                        align="center"
                        header-align="center"
                        label="Draw Time">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        header-align="center"
                        prop="expectid"
                        label="No.">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        header-align="center"
                        label="Draw Number">
                        <template slot-scope="scope">
                            <ul class="num-box" v-if="scope.row.opencode !== '-1'">
                                <li v-for="item in scope.row.opencode">{{ item }}</li>
                            </ul>
                            <span v-else class="js_lastDrawWait">waiting</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        header-align="center"
                        prop="sumbonus"
                        label="Cumulative Bouns">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        header-align="center"
                        label="Block">
                        <template slot-scope="scope">
                            <span v-if="scope.row.blocknum == '0'">-</span>
                            <a target="_blank" v-else :href="scope.row.jumpEthUrl"># {{ scope.row.blocknum }}</a>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label=""
                        width="120">
                        <template slot-scope="scope">
                            <a href="javascript:;" v-if="scope.row.blocknum != '0'" @click="showBlockMsg(scope.row)"
                               class="icon-reward js_reward_show"></a>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label=""
                        width="120">
                        <template slot-scope="scope">
                            <a href="javascript:;" v-if="scope.row.newdownStr === '1'"
                               :data-dataexpectid="scope.row.expectid" @click="downLoadfile( scope.row.expectid )"
                               class="icon-down js_icon-down"></a>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        background
                        :current-page.sync="pageNumber"
                        size="small"
                        :page-size="pageSize"
                        layout="prev, pager, next,jumper"
                        :total="PageTotal"
                        next-text = 'Next >'
                        prev-text = '< Front'
                    >
                    </el-pagination>
                </div>
            </div>

            <!--开奖明细弹窗-->
            <div class="pop pop-reward" :class="{'hide':!showPop_reward}" style="text-transform: none">
                <div class="pop-body">
                    <div class="pop-ani">
                        <div class="pop-main">
                            <a href="javascript:;" class="btn-close" @click="closePop_reward">关闭</a>
                            <h3>Draw Details</h3>
                            <div class="view-header">
                                <div class="fl">
                                    <p>Number on the block</p>
                                    <span class="random-block ">
                                        <a class="js_random_block" target="_blank" :href="popRewardMsg.jumpEthUrl">{{ popRewardMsg.blocknum }}</a>
                                    </span>
                                </div>
                                <div class="fr">
                                    <p>No.</p>
                                    <span class="nper js_nper">{{ popRewardMsg.expectid }}</span>
                                </div>
                            </div>
                            <div class="view-hash">
                                <p>Hash on the block</p>
                                <span class="js_randomHash"> {{ popRewardMsg.blockhash }} </span>
                            </div>
                            <div v-if="popRewardMsg.merkel_hash!==''" class="js_show_calcul_show">
                                <div class="view-process">
                                    <p>Calculating Process</p>
                                    <span class="js_calAddr">{{ popRewardMsg.merkel_hash }}</span>
                                </div>
                                <div class="node">
                                    <p>Note:<br/>
                                        All order information of the current period will eventually generate a hash
                                        value
                                        through the Merkel tree algorithm. This
                                        hash value will be uploaded to the Ethereum chain. The hash value is verified by
                                        the
                                        open class so that the bet cannot be
                                        tampered with.
                                    </p>
                                </div>
                            </div>
                            <div v-else class="js_show_calcul_hide">
                                <div class="node">
                                    <p>Note:<br/>
                                        If there is no bet on this draw, the result will use the hash of the last block
                                        .
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
    import {mTypes, aTypes} from '~/store/cs_page/cs_1105'
    import {src, platform, tipsTime, ethUrl} from '~common/util'

    import Header from '~/components/Header.vue'
    import Footer from '~/components/Footer.vue'
    import BreadCrumbs from '~/components/BreadCrumbs.vue'

    export default {
        data () {
            return {
                ethUrl: null,
                pageNumber: 1,
                pageSize: 10,
                PageTotal: 1,
                drawNumList: [],
                showPop_reward: false, // 开奖弹窗
                popRewardMsg: {
                    blocknum: 0,
                    expectid: 0,
                    merkel_hash: '',
                    txhash: '',
                    blockhash: '',
                    jumpEthUrl: ''
                }
            }
        },
        watch: {},
        methods: {
            downLoadfile (expectid) {
                window.location.href = 'https://www.coinslot.com/download/expects/1_' + expectid + '.txt'
            },
            closePop_reward () {
                this.showPop_reward = false
            },
            showBlockMsg (msg) {
                this.popRewardMsg = msg
                this.showPop_reward = true
            },
            async handleCurrentChange (val) {
                if (val !== undefined) {
                    let drawData = await this.$store.dispatch(aTypes.getDrawNumList, {
                        pageNumber: Number(val),
                        pageSize: this.pageSize
                    })
                    if (drawData) {
                        this.drawNumList = this.format_drawNum(drawData.expect_history)
                        this.PageTotal = Number(drawData.count)
                    }
                }
            },
            /*
                 *  格式化时间  allbet time
                 * */
            format_time (time, format) {
                if (format === undefined || format == null) {
                    format = 'HH:mm:ss'
                    // format = 'MM-dd HH:mm:ss'
                }
                if (isNaN(time)) {
                    return false
                }
                let t = new Date(+time * 1000)
                let tf = function (i) {
                    return (i < 10 ? '0' : '') + i
                }
                return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                    switch (a) {
                    case 'yyyy':
                        return tf(t.getFullYear())
                    case 'MM':
                        return tf(t.getMonth() + 1)
                    case 'mm':
                        return tf(t.getMinutes())
                    case 'dd':
                        return tf(t.getDate())
                    case 'HH':
                        return tf(t.getHours())
                    case 'ss':
                        return tf(t.getSeconds())
                    }
                })
            },
            /*
                 *  格式化drawNum 数据
                 *  return 格式化后的数据
                 * */
            format_drawNum (Msg) {
                if (Msg) {
                    Msg.forEach((val, index) => {
                        val.index = index
                        // opentime
                        val.opentime = this.format_time(val.opentime, 'MM-dd HH:mm:ss')

                        if (val.expect_status == '4' || val.expect_status == '5') {
                            if (val.opencode === null) {
                                val.opencode = '0,0,0,0,0'
                            }
                            val.opencode = val.opencode.split(',')
                        } else {
                            // waiting 转态
                            val.opencode = '-1'
                        }

                        if (!val.blockhash) {
                            val.blockhash = ''
                        }

                        if (val.txhash === '') {
                            val.jumpEthUrl = ethUrl + 'block/' + val.blocknum
                        } else {
                            val.jumpEthUrl = ethUrl + 'tx/' + val.txhash
                        }

                        if (!val.expectid || !val.merkel_hash) {
                            val.newdownStr = '-1'
                        } else {
                            val.newdownStr = '1'
                        }
                        if (val.sumbonus === '0') {
                            val.sumbonus = '-'
                        }
                    })
                    return Msg
                } else {
                    return false
                }
            }
        },
        components: {
            Header,
            Footer,
            BreadCrumbs
        },
        computed: {},
        async mounted () {
            let drawData = await this.$store.dispatch(aTypes.getDrawNumList, {
                pageNumber: 1,
                pageSize: this.pageSize
            })
            console.log('===========')
            console.log(drawData)
            if (drawData) {
                this.drawNumList = this.format_drawNum(drawData.expect_history)
                this.PageTotal = Number(drawData.count)
            }
        }
    }
</script>
<style lang="less" scoped  rel="stylesheet/less">
    @import "../../styles/lib-mixins.less";

    .main {
        position: relative;
        width: 1190px;
        margin: 0 auto;
        .clearfix();
    }

    .main-reward {
        position: relative;
        padding: 0 50px 1px;
        background: #fff;
        .rounded();
        h1 {
            height: 80px;
            line-height: 80px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            border-bottom: 1px solid #f2f2f2;
            font-size: 26px;
            text-transform: capitalize;
        }
    }

    /*//开奖明细弹窗*/
    .pop-reward {
        .pop-main {
            padding-bottom: 30px;
        }
        p {
            line-height: 12px;
            font-size: 12px;
            color: #778ca3;
        }
        .view-header {
            margin-top: 26px;
            overflow: hidden;
            .fl {
                max-width: 67%;
                overflow: hidden;
                text-align: left;
            }
            .fr {
                max-width: 32%;
                overflow: hidden;
                text-align: right;
            }
        }
        .random-block {
            position: relative;
            width: 100%;
            display: block;
            line-height: 33px;
            font-size: 26px;
            font-weight: bold;
            .text-overflow();
            &:hover {
                &::before {
                    color: #263648;
                }
            }
            &::before {
                .transition();
                content: "#";
                color: #6a89cc;
            }
        }
        .nper {
            width: 100%;
            display: block;
            line-height: 33px;
            .text-overflow();
        }
        .view-hash {
            margin-top: 32px;
        }
        .view-process {
            margin-top: 10px;
        }
        .view-hash,
        .view-process,
        .node {
            text-align: justify;
            word-break: break-all;
            span {
                display: block;
                margin-top: 6px;
                line-height: 24px;
            }
        }
        .node {
            margin-top: 20px;
            p {
                line-height: 16px;
            }
        }
    }

    //开奖列表table
    table {
        .icon-reward {
            display: block;
            margin: 0 auto;
            background-image: url("../../assets/slice/btn-reward.png");
            width: 15px;
            height: 19px;
        }
        .icon-down {
            display: block;
            margin: 0 auto;
            background-image: url("../../assets/slice/icon-down.png");
            width: 14px;
            height: 13px;
            transition: none;
        }
        th {
            width: 14.285%;
        }
        tbody {
            tr {
                &:hover {
                    .icon-reward {
                        background-image: url("../../assets/slice/btn-reward2.png");
                    }
                    .icon-down {
                        background-image: url("../../assets/slice/icon-down2.png");
                    }
                }
            }
        }
        .num-box li {
            font-weight: bold;
            color: #263648;
        }
    }

    .days30 {
        right: 50px;
        bottom: 34px;
    }

    #p2 {
        display: none;
    }

    .pagination {
        display: table;
        padding: 0;
        margin: 20px auto 30px;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        font-size: 14px;
        color: #778ca3;
        text-align: center;
        li {
            display: inline-block;
            margin-left: 5px;
            height: 28px;
            line-height: 28px;
            box-sizing: content-box;
            outline: none;
            border: 1px solid #d5d5d5;
            color: #778ca3 !important;
            a {
                display: block;
                padding: 0 12px;
                color: #778ca3;
            }
        }
        li.active {
            border: none;
            background: none;
            color: #263648 !important;
            a {
                cursor: default;
            }
            &:hover {
                color: #666 !important;
                border: none;
                background: transparent;
                box-shadow: none;
            }
        }
        li:hover {
            color: #666 !important;
            border: 1px solid #d5d5d5;
            background: #f2f2f2;
            box-shadow: none;
        }
        .prev {
            position: relative;
            padding-left: 8px;
            &::before {
                content: "";
                display: block;
                position: absolute;
                left: 10px;
                top: 10px;
                background: url("../../assets/slice/arrow-left-778ca3.png");
            }
        }
        .next {
            position: relative;
            padding-right: 8px;
            &::before {
                content: "";
                display: block;
                position: absolute;
                top: 10px;
                right: 10px;
                background: url("../../assets/slice/arrow-right-778ca3.png");
            }
        }
    }


    .main-reward{
        .icon-jackpot{
            &::after{
                right: -20px !important;
            }
        }
    }
</style>
