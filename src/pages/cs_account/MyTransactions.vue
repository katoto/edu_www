<template>
    <div class="capitalDetails">
         <h2>My Transactions</h2>
        <section>
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
        </section>
        <template>
            <el-table
                    :data="orderList"
                    stripe
                    size="small"
                    highlight-current-row
                    style="width: 100%">
                <el-table-column
                        type="index"
                        align="center"
                        header-align="center"
                        label="No.">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="crtime"
                        label="Transaction Time">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="inout"
                        label="Note">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="cointype"
                        label="Coin">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        label="Amount">
                    <template slot-scope="scope">
                        <div v-html="scope.row.moneyVal"></div>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="balance"
                        label="Balance">
                </el-table-column>

            </el-table>
            <div class="pagination">
                <el-pagination
                        @current-change="handleCurrentChange"
                        background
                        :current-page.sync="pageno"
                        size="small"
                        :page-size="pageSize"
                        layout="prev, pager, next, jumper"
                        :page-count="pageCount"
                >
                </el-pagination>
            </div>
        </template>
    </div>
</template>

<script>
import {
    src,
    platform,
    tipsTime,
    ethUrl,
    formateCoinType,
    formateBalance,
    formatTime,
    formateMoneyFlow
} from '~common/util'
import { Message } from 'element-ui'

export default {
    data () {
        return {
            pageno: 1,
            pageSize: 6,
            pageCount: 10,
            orderList: [],
            ethUrl,
            tranOptionVal: '1',
            tranOptions: [
                {
                    value: '1',
                    label: 'All bets'
                },
                {
                    value: '2',
                    label: 'Deposit'
                },
                {
                    value: '3',
                    label: 'Bet'
                },
                {
                    value: '4',
                    label: 'Prize'
                },
                {
                    value: '5',
                    label: 'Withdraw'
                },
                {
                    value: '6',
                    label: 'Activities'
                },
                {
                    value: '7',
                    label: 'Fee'
                }
            ],

            tranTimeOptionVal: '1',
            tranTimeOptions: [
                {
                    value: '1',
                    label: 'All'
                },
                {
                    value: '2',
                    label: 'Last 90 days'
                },
                {
                    value: '3',
                    label: 'Last 30 days'
                },
                {
                    value: '4',
                    label: 'Last 7 days'
                }
            ]
        }
    },
    watch: {},
    methods: {
        handleStatusChange () {
            this.handleCurrentChange()
        },
        getList (params) {
            return this.$store.dispatch('cs_account/getAccountLog', {
                pagesize: this.pageSize,
                ...params
            })
        },
        async handleCurrentChange (pageno = this.pageno) {
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
                    '5': '4',
                    '6': [10, 11, 12, 13].join('|'),
                    '7': '5'
                }[this.tranOptionVal] || ''
            }

            let data = await this.getList(params)
            data = data.data

            if (data) {
                this.orderList = this.formatData(data.account_logs)
                this.pageCount = parseInt(data.pages, 10)
            }
        },
        /*
        *  格式化orderList 数据
        *  return 格式化后的数据
        * */
        formatData (Msg) {
            Msg.forEach((val, index) => {
                // bettime
                val.crtime = formatTime(val.crtime, 'yyyy-MM-dd HH:mm')
                if (val.inout !== undefined) {
                    val.inout = formateMoneyFlow(val.inout)
                }
                val.cointype = formateCoinType(val.cointype)
                val.moneyVal = (
                    parseFloat(val.money, 10) <= 0
                        ? `<a href='javascript:;' class='fail' style='cursor: default'>${formateBalance(val.money)}</a>`
                        : `<a href='javascript:;' class='win'  style='cursor: default'>${formateBalance(val.money)}</a>`
                )
                if (val.balance) {
                    val.balance = formateBalance(val.balance) + 'ETH'
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
<style scoped lang="less" rel="stylesheet/less">
@import "../../styles/lib-mixins.less";
h2 {
  line-height: 30px;
  font-size: 24px;
  color: #263648;
  text-transform: capitalize;
}
.capitalDetails {
  .filter {
    margin-top: 15px;
  }
}
.pagination {
  display: table;
  margin: 20px auto 30px;
}
</style>
