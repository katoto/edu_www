<template>
    <div>
        <div class="capitalDetails visible-lg">
            <h2>
                <lang>My Transactions</lang>
            </h2>
            <section class="cs-select">
                <el-select v-model="tranOptionVal" @change="handleStatusChange">
                    <el-option
                        v-for="item in tranOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="tranTimeOptionVal" @change="handleStatusChange">
                    <el-option
                        v-for="item in tranTimeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <!-- btc -->
                <el-select v-model="ethOptionVal" @change="handleStatusChange">
                    <el-option
                        v-for="item in ethOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>

            </section>
            <template>
                <el-table
                        :data="orderList"
                        stripe
                        size="small"
                        highlight-current-row
                        style="width: 100%">
                <el-table-column
                        align="center"
                        header-align="center"
                        width="50"
                        :label="_('# ')">
                    <template slot-scope="scope">
                        {{ scope.row.index }}
                    </template>
                </el-table-column>
                    <el-table-column
                            align="center"
                            header-align="center"
                            prop="crtime"
                            :label="_('Transaction Time')">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            header-align="center"
                            prop="inout"
                            :label="_('Note')">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            header-align="center"
                            prop="cointype"
                            :label="_('Coin')">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            header-align="center"
                            :label="_('Amount')">
                        <template slot-scope="scope">
                            <div v-html="scope.row.moneyVal"></div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            header-align="center"
                            prop="balance"
                            :label="_('Balance')">
                    </el-table-column>

                </el-table>
                <div class="pagination">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            @size-change="myTranSizeChange"
                            background
                            :current-page.sync="pageno"
                            size="small"
                            :page-sizes="[10, 25, 50, 100]"
                            :page-size="pageSize"
                            layout="sizes,prev, pager, next,jumper"
                            :page-count="pageCount"
                            :next-text="_('Next >')"
                            :prev-text="_('< Previous')"
                    >
                    </el-pagination>
                </div>
            </template>
        </div>
        <div class="h5-capitalDetails hidden-lg">
            <section class="cs-select">
                <el-select v-model="tranOptionVal" @change="handleStatusChange">
                    <el-option
                        v-for="item in tranOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="tranTimeOptionVal" @change="handleStatusChange">
                    <el-option
                        v-for="item in tranTimeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <!-- btc -->
                <el-select v-model="ethOptionVal" @change="handleStatusChange">
                    <el-option
                        v-for="item in ethOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>

            </section>
            <template v-if="h5orderList.length>0">
                <ul class="items-myTransactions">
                    <li v-for="(item,index) in h5orderList" :key="index">
                        <div class="item-re item-re1">
                            <p>
                                {{item.crtime.substr(5)}}
                            </p>
                            <p>
                                {{item.cointype}}
                            </p>
                        </div>
                        <div class="item-re item-re2">
                           <p>
                                {{item.inout}}
                           </p>
                            <div class="moneyVal" v-html="item.moneyVal">
                            </div>
                        </div>
                    </li>
                </ul>
                <a href="javascript:;" class="btn-more" @click="handleCurrentChange(h5pageno)" v-if="isShowMoreBtn">
                    <lang>Click to see more</lang>
                </a>
            </template>
            <div class="nomsg " v-else>
                <img src="@/assets/img/nomsg.png" alt="">
                <p>
                    <lang>No Data</lang>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import {
    ethUrl,
    formateCoinType,
    formateBalance,
    formatTime,
    formateMoneyFlow
} from '~common/util'

export default {
    data () {
        return {
            pageno: 1,
            h5pageno: 1,
            isShowMoreBtn: true,
            h5orderList: [],
            pageSize: 25,
            pageCount: 10,
            orderList: [],
            ethUrl,
            tranOptionVal: '1',
            tranOptions: [
                {
                    value: '1',
                    label: _('All ')
                },
                {
                    value: '2',
                    label: _('Top Up')
                },
                {
                    value: '3',
                    label: _('Bets')
                },
                {
                    value: '4',
                    label: _('Prize')
                },
                {
                    value: '5',
                    label: _('Withdraw')
                },
                {
                    value: '6',
                    label: _('Bonus')
                },
                {
                    value: '7',
                    label: _('Fee')
                },
                {
                    value: '8',
                    label: _('Refund')
                }
            ],

            tranTimeOptionVal: '1',
            tranTimeOptions: [
                {
                    value: '1',
                    label: _('All')
                },
                {
                    value: '2',
                    label: _('Last 90 days')
                },
                {
                    value: '3',
                    label: _('Last 30 days')
                },
                {
                    value: '4',
                    label: _('Last 7 days')
                }
            ],

            ethOptions: [{
                value: '1',
                label: _('All')
            }, {
                value: '1001',
                label: _('BTC')
            }, {
                value: '2001',
                label: _('ETH')
            }, {
                value: '2000',
                label: _('CC')
            }],
            ethOptionVal: '1'

        }
    },
    watch: {},
    methods: {
        myTranSizeChange (size) {
            this.pageSize = size
            this.handleCurrentChange()
        },
        handleStatusChange () {
            this.pageno = 1
            this.h5pageno = 1
            this.h5orderList = []
            this.handleCurrentChange()
        },
        getList (params) {
            return this.$store.dispatch('cs_account/getAccountLog', {
                pagesize: this.pageSize,
                lotid: '',
                ...params
            })
        },
        async handleCurrentChange (pageno = this.pageno) {
            this.h5pageno += 1
            let params = {
                pageno,
                day: {
                    '1': '',
                    '2': 90,
                    '3': 30,
                    '4': 7
                }[this.tranTimeOptionVal] || '',
                inout: {
                    '1': '',
                    '2': '8',
                    '3': '1',
                    '4': '2',
                    '5': [4, 6].join('|'),
                    '6': [10, 11, 12, 13, 19, 16, 17, 18, 22].join('|'),
                    '7': [7, 5].join('|'),
                    '8': '3'
                }[this.tranOptionVal] || ''
            }
            if (this.ethOptionVal !== '1') {
                params.cointype = this.ethOptionVal
            }
            let data = await this.getList(params)
            data = data.data
            if (data) {
                this.orderList = this.formatData(data.account_logs)
                this.pageCount = parseInt(data.pages, 10)

                this.h5orderList = this.h5orderList.concat(this.orderList)
                if (data.account_logs.length === 0 || data.account_logs.length !== 25) {
                    this.isShowMoreBtn = false
                }
            }
        },
        /*
        *  格式化orderList 数据
        *  return 格式化后的数据
        * */
        formatData (Msg) {
            Msg.forEach((val, index) => {
                // bettime
                let cointype = val.cointype
                val.crtime = formatTime(val.crtime, 'yyyy-MM-dd HH:mm')
                if (this.tranOptionVal === '6' && (val.inout === '16' || val.inout === '17')) {
                    val.inout = '10'
                }
                if (val.inout !== undefined) {
                    val.inout = formateMoneyFlow(val.inout, val.lotid)
                }
                val.cointype = formateCoinType(val.cointype)
                val.index = (index + 1) + Number(this.pageSize) * Number(this.pageno - 1)
                val.moneyVal = (
                    parseFloat(val.money, 10) <= 0
                        ? `<a href='javascript:;' class='fail' style='cursor: default'>${formateBalance(val.money, cointype)}</a>`
                        : `<a href='javascript:;' class='win'  style='cursor: default'>${formateBalance(val.money, cointype)}</a>`
                )
                if (val.balance) {
                    val.balance = formateBalance(val.balance, cointype) + val.cointype
                }
            })
            return Msg
        }
    },
    async mounted () {
        this.handleCurrentChange(1)
    }
}
</script>
<style lang="less" type="text/less">
    .h5-capitalDetails{
        .cs-select{
            margin:0;
            display: flex;
            justify-content: space-around;
            .el-select{
                width: 30%;
                margin:0;
                .el-input__inner{
                    box-sizing: border-box;
                    width: 100%;
                }
                .el-input{
                    .el-select__caret{
                        right: 5px;
                    }
                }
            }
        }
        a.win{
            display: block;
            width: 100% !important;
        }
        a.fail{
            display: block;
            width: 100% !important;
            text-align: right;
        }
    }
</style>
<style lang="less" type="text/less" scoped>
    .capitalDetails{
        h2 {
            line-height: 30px;
            font-size: 24px;
            color: #263648;
            text-transform: capitalize;
        }
        .pagination {
            display: table;
            margin: 20px auto 30px;
        }
    }
    .h5-capitalDetails{
        padding: 35/2px 0 50/2px 0;
        background: #fff;
        border-radius: 6px;
        .items-myTransactions{
            li{
                padding: 8px 0;
                .item-re{
                    display: flex;
                    justify-content: space-between;
                    margin: 0 percentage(35/710);
                    &.item-re1{
                        line-height: 62/2px;
                        font-size: 14px;
                        color: #778ca3;
                    }
                    &.item-re2{
                        line-height: 68/2px;
                        font-size: 16px;
                    }
                }
                &+li{
                    border-top: 1px solid #f2f2f2;
                }
                .moneyVal{
                    width: 168/2px;
                    text-align: center;
                }
            }
        }
    }

</style>
