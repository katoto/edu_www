<template>
    <div class="betting">
        <h2>
            <lang>Bet Record</lang>
        </h2>
        <section class="cs-select">
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
            <!--  eth  -->
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
                    :cell-class-name="isJackPot"
                    style="width: 100%">
                <el-table-column
                        prop="bettime"
                        align="center"
                        width="150"
                        header-align="center"
                        :label="_('Time')">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="bettype"
                        :label="_('Type')">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="txhash"
                        :label="_('Address')">
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
                        :label="_('No.')">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        width="170"
                        :label="_('Number')">
                    <template slot-scope="scope">
                        <div v-html="scope.row.betcodeVal"></div>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="betmoney"
                        :label="_('Bet')">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        :label="_('Win')">
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
                        :next-text="_('Next >')"
                        :prev-text="_('< Front')"
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
    formateBalance,
    formateCoinType
} from '~common/util'

export default {
    data () {
        return {
            pageno: 1,
            pageSize: 8,
            PageTotal: 10,
            orderList: [],
            ethUrl,
            betOptions: [{
                value: '1',
                label: _('All bets')
            }, {
                value: '2',
                label: _('win bets')
            }],
            betOptionVal: '1',
            betTimeOptions: [{
                value: '1',
                label: _('Last 30 days')
            }, {
                value: '2',
                label: _('Last 7 days')
            }],
            betTimeOptionVal: '1',

            ethOptions: [{
                value: '1',
                label: _('All')
            }, {
                value: '1001',
                label: _('BTC')
            }, {
                value: '2001',
                label: _('ETH')
            }],
            ethOptionVal: '1'

        }
    },
    methods: {
        isJackPot ({columnIndex, row}) {
            if (columnIndex === 4 && row.win_jackpot === '1') {
                return 'icon-jackpot'
            }
            return ''
        },
        handleStatusChange () {
            this.pageno = 1
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
                day: this.betTimeOptionVal === '1' ? 30 : 7
            }
            if (this.betOptionVal === '2') {
                params.prize = 1
            }
            if (this.ethOptionVal !== '1') {
                params.cointype = this.ethOptionVal
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
                    val.bettypeNum = val.bettype
                    val.bettype = formatMatchAccount(val.bettype)

                    if (!val.txhash || val.orderstatus !== '2') {
                        val.txhash = '-'
                    }
                    val.jumpEthUrl = ethUrl + 'block/' + val.blocknum
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
                        val.betmoney = formateBalance(Number(val.betmoney)) + formateCoinType(val.cointype)
                    }

                    // win state
                    if (val.orderstatus === '2') {
                        // 结算 并且大于0
                        val.betprizeVal = (
                            parseFloat(val.betprize, 10) > 0
                                ? `<a href='javascript:;' class='win'>${formateBalance(val.betprize)}${formateCoinType(val.cointype)}</a>`
                                : "<a href='javascript:;' class='fail'>0</a>"
                        )
                    } else {
                        if (parseInt(val.orderstatus, 10) === 0) {
                            val.betprizeVal = `<a href='javascript:;' class='waiting'>${_('waiting')}</a>`
                        } else if (val.orderstatus === '1') {
                            val.betprizeVal = `<a href='javascript:;' class='waiting'>${_('waiting')}</a>`
                        } else if (val.orderstatus === '-1' || val.orderstatus === '-2') {
                            val.betprizeVal = _('failure')
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
<style scoped lang="less" type="text/less">
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
table .icon-jackpot::after, table.dataTable .icon-jackpot::after{
    right: -14px !important;
}
</style>
