<template>
    <div class="betting">
        <h2>
            <lang>Bet Record</lang>
        </h2>
        <section class="cs-select">
            <el-select v-model="playOptionVal" @change="handleStatusChange">
                <el-option
                    v-for="item in playOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
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
            <p class="tocheck">
                <lang v-if="playOptionVal === '1'">Click No. to see draw details</lang>
                <lang v-else>Click No. to see bid details</lang>
            </p>
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
                        align="center"
                        header-align="center"
                        width="50"
                        :label="_('# ')">
                    <template slot-scope="scope">
                        {{ scope.row.index }}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="bettime"
                        align="center"
                        width="150"
                        header-align="center"
                        :label="_('Time')">
                </el-table-column>
                <el-table-column
                        prop="bettype"
                        align="center"
                        header-align="center"
                        :label="_('Type')">
                </el-table-column>
                <el-table-column
                        prop="txhash"
                        align="center"
                        header-align="center"
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
                        :label="_('No.')">
                        <template slot-scope="scope">
                            <router-link :to="`/check?number=${scope.row.expectid}&type=lucky11}`" v-if="scope.row.lotid === '1'">
                                {{scope.row.expectid}}
                            </router-link>
                            <router-link :to="`/luckycoin/detailed?number=${scope.row.expectid}&go=mybets`" v-if="scope.row.lotid === '2'">
                                {{scope.row.expectid}}
                            </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        width="170"
                        :label="_('Number')"
                        v-if="playOptionVal === '1'">
                    <template slot-scope="scope">
                        <div v-html="scope.row.betcodeVal" v-if="scope.row.lotid === '1'"></div>
                        <div v-html="scope.row.betcode" v-if="scope.row.lotid === '2'" style="overflow: hidden;"></div>
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
                        @size-change="myBetSizeChange"
                        background
                        :current-page.sync="pageno"
                        size="small"
                        :page-sizes="[10, 25, 50, 100]"
                        :page-size="pageSize"
                        layout="sizes,prev, pager, next,jumper"
                        :total="PageTotal"
                        :next-text="_('Next >')"
                        :prev-text="_('< Privious')"
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
    formateCoinType,
    accMul
} from '~common/util'

export default {
    data () {
        return {
            pageno: 1,
            pageSize: 10,
            PageTotal: 10,
            orderList: [],
            orderList1: [],
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
            ethOptionVal: '1',
            playOptions: [{
                value: '1',
                label: _('Lucky11 ')
            }, {
                value: '2',
                label: _('LuckyCoin')
            }],
            playOptionVal: '1'
        }
    },
    methods: {
        myBetSizeChange (size) {
            this.pageSize = size
            this.handleCurrentChange()
        },
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
                day: this.betTimeOptionVal === '1' ? 30 : 7,
                lotid: this.playOptionVal
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
                    val.bettype = val.lotid === '1' ? formatMatchAccount(val.bettype) : 'LuckyCoin'

                    if (!val.txhash || val.orderstatus !== '2') {
                        val.txhash = '-'
                    }
                    val.jumpEthUrl = ethUrl + 'block/' + val.blocknum
                    val.index = (index + 1) + Number(this.pageSize) * Number(this.pageno - 1)
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
                        if (val.lotid === '2') {
                            val.betmoney = formateBalance(accMul(Number(val.betmoney), Number(val.betcode.split(',').length))) + formateCoinType(val.cointype)
                        } else {
                            val.betmoney = formateBalance(Number(val.betmoney)) + formateCoinType(val.cointype)
                        }
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
                            val.betprizeVal = _('Expired')
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
    .tocheck{
        float: right;
        line-height: 25px;
        font-size: 12px;
        color: #778ca3;
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
