<template>
    <div class="betting">
        <h2>Bet Record</h2>
        <section>
            <el-select v-model="betOptionVal" @change="handleStatusChange">
                <el-option
                    v-for="item in betOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="betTimeOptionVal" @change="handleStatusChange">
                <el-option
                    v-for="item in betTimeOptions"
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
                        prop="bettime"
                        align="center"
                        width="150"
                        header-align="center"
                        label="Order Time">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="bettype"
                        label="Type">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="txhash"
                        label="Address">
                    <template slot-scope="scope">
                        <a target='_blank'
                           v-if="scope.row.txhash != '-'"
                           :href="scope.row.jumpEthUrl"
                           class="address"
                           :title="scope.row.txhash">
                           {{ scope.row.txhash }}
                        </a>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="expectid"
                        label="Nper">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        width="160"
                        label="Number">
                    <template slot-scope="scope">
                        <div v-html="scope.row.betcodeVal"></div>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="betmoney"
                        label="Bet Amount">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        label="Win Amount">
                    <template slot-scope="scope">
                        <div v-html="scope.row.betprizeVal"></div>
                    </template>
                </el-table-column>

            </el-table>
            <div class="pagination">
                <el-pagination
                        @current-change="handleCurrentChange"
                        background
                        :current-page.sync="pageno"
                        size="small"
                        :page-size="pageSize"
                        layout="prev, pager, next,jumper"
                        :total="PageTotal"
                >
                </el-pagination>
            </div>
        </template>
    </div>
</template>

<script>
import {
    ethUrl,
    formatMatchAccount,
    formatTime,
    formateBalance
} from '~common/util'
import { Message } from 'element-ui'
export default {
    data () {
        return {
            pageno: 1,
            pageSize: 6,
            PageTotal: 10,
            orderList: [],
            ethUrl,
            betOptions: [{
                value: '1',
                label: 'All bets'
            }, {
                value: '2',
                label: 'win bets'
            }],
            betOptionVal: '1',
            betTimeOptions: [{
                value: '1',
                label: 'Last 30 days'
            }, {
                value: '2',
                label: 'Last 7 days'
            }],
            betTimeOptionVal: '1'
        }
    },
    methods: {
        handleStatusChange () {
            this.handleCurrentChange()
        },

        getList (params) {
            return this.$store.dispatch('cs_account/getOrderList', {
                pagesize: this.pageSize,
                ...params
            })
        },
        async handleCurrentChange (pageno = this.pageno) {
            let params = {
                pageno,
                crday: this.betTimeOptionVal === '1' ? 30 : 7
            }
            if (this.betOptionVal === '2') {
                params.prize = 1
            }

            let data = await this.getList(params)
            data = data.data

            if (data) {
                this.orderList = this.formatData(data.orders)
                this.PageTotal = parseInt(data.counter, 10)
            }
        },
        /*
        *  格式化orderList 数据
        *  return 格式化后的数据
        * */
        formatData (Msg) {
            if (Msg) {
                Msg.forEach((val, index) => {
                    // bettime
                    val.bettime = formatTime(val.bettime, 'yyyy-MM-dd HH:mm')
                    val.bettype = formatMatchAccount(val.bettype)

                    if (!val.txhash || val.orderstatus !== '2') {
                        val.txhash = '-'
                    }
                    if (val.txhash === '-') {
                        val.jumpEthUrl = ethUrl + 'block/' + val.blocknum
                    } else {
                        val.jumpEthUrl = ethUrl + 'tx/' + val.txhash
                    }
                    //    number 处理
                    let luckyNumArr = []
                    let betNumStr
                    let luckyResultArr = []
                    if (val.betcode) {
                        luckyNumArr = val.betcode.split(',')
                        betNumStr = ''
                        if (val.opencode !== undefined && val.opencode !== null) {
                            luckyResultArr = val.opencode.split(',')
                            for (let j = 0, len = luckyNumArr.length; j < len; j++) {
                                if (~luckyResultArr.indexOf(luckyNumArr[j])) {
                                    betNumStr += '<li class="bingo">' + luckyNumArr[j] + '</li>'
                                } else {
                                    betNumStr += '<li>' + luckyNumArr[j] + '</li>'
                                }
                            }
                        } else {
                            for (var j = 0, len = luckyNumArr.length; j < len; j++) {
                                betNumStr += '<li>' + luckyNumArr[j] + '</li>'
                            }
                        }
                        val.betcodeVal = "<ul class='num-box'>" + betNumStr + '</ul>'
                    }

                    if (val.betmoney) {
                        val.betmoney = formateBalance(Number(val.betmoney)) + ' ETH'
                    }

                    // win state
                    if (val.orderstatus === '2') {
                        // 结算 并且大于0
                        val.betprizeVal = (
                            parseInt(val.betprize, 10) > 0
                                ? `<a href='javascript:;' class='win'>${formateBalance(val.betprize)}ETH</a>`
                                : "<a href='javascript:;' class='fail'>0</a>"
                        )
                    } else {
                        if (parseInt(val.orderstatus, 10) === 0) {
                            val.betprizeVal = "<a href='javascript:;' class='waiting'>waiting</a>"
                        } else if (val.orderstatus === '1') {
                            val.betprizeVal = "<a href='javascript:;' class='waiting'>waiting</a>"
                        } else if (val.orderstatus === '-1' || val.orderstatus === '-2') {
                            val.betprizeVal = 'failure'
                        }
                    }
                })
                return Msg
            }
        }
    },
    async mounted () {
        this.handleCurrentChange()
    }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
.betting {
  h2 {
    line-height: 30px;
    font-size: 24px;
    color: #263648;
    text-transform: capitalize;
  }
  .filter {
    margin-top: 15px;
  }
}
.pagination {
  display: table;
  margin: 20px auto 30px;
}
</style>
