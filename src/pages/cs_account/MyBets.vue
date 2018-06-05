<template>
    <div class="betting">
        <h2>Bet Record</h2>
        <section>
            <el-select v-model="betOptionVal">
                <el-option
                        v-for="item in betOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="betTimeOptionVal">
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
                        <a target='_blank' v-if="scope.row.txhash != '-'" :href="scope.row.jumpEthUrl" class="address">{{
                            scope.row.txhash }}</a>
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
                        :current-page.sync="pageNumber"
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
	import {mTypes, aTypes} from '~/store/cs_page/cs_account'
	import {src, platform, tipsTime, ethUrl, format_match_account, formateBalance} from '~common/util'

	export default {
		data(){
			return {
				pageNumber: 1,
				pageSize: 6,
				PageTotal: 10,
				orderList: [],
				ethUrl: null,

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
		watch: {},
		methods: {
			async handleCurrentChange (val) {
				if (val !== undefined) {
					let orderMsg = await this.$store.dispatch(aTypes.getOrderList, {
						pageno:  Number(val),
						pagesize: this.pageSize
					})
					if (orderMsg) {
						this.orderList = this.format_orderList(orderMsg.orders);
						this.PageTotal = Number(orderMsg.counter)
					}
				}
			},
            /*
             *  格式化时间  allbet time
             * */
			format_time (time, format) {
				if (format === undefined || format == null) {
					format = 'MM-dd HH:mm:ss'
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
             *  格式化orderList 数据
             *  return 格式化后的数据
             * */
			format_orderList (Msg) {
				if (Msg) {
					Msg.forEach((val, index) => {
						// bettime
						val.bettime = this.format_time(val.bettime, 'yyyy-MM-dd HH:mm');
						val.bettype = format_match_account(val.bettype);

						if (!val.txhash || val.orderstatus != '2') {
							val.txhash = "-"
						}
						if (val.txhash == '-') {
							val.jumpEthUrl = ethUrl + 'block/' + val.blocknum
						} else {
							val.jumpEthUrl = ethUrl + 'tx/' + val.txhash
						}
						//    number 处理
						var luckyNumArr = [],
							betNumStr,
							luckyResultArr = [];
						if (val.betcode) {
							luckyNumArr = val.betcode.split(',');
							betNumStr = '';
							if (val.opencode !== undefined && val.opencode !== null) {
								luckyResultArr = val.opencode.split(',');
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
							val.betcodeVal = "<ul class='num-box'>" + betNumStr + "</ul>"
						}

						if (val.betmoney) {
							val.betmoney = formateBalance(Number(val.betmoney)) + ' ETH'
						}

						// win state
						if (val.orderstatus == '2') {
							// 结算 并且大于0
							if (Number(val.betprize) > 0) {
								val.betprizeVal = "<a href='javascript:;' class='win'>+ " + formateBalance(val.betprize) + "ETH</a>";
							} else {
								val.betprizeVal = "<a href='javascript:;' class='fail'>0</a>"
							}
						} else {
							if (Number(val.orderstatus) === 0) {
								val.betprizeVal = "<a href='javascript:;' class='waiting'>waiting</a>"
							} else if (val.orderstatus == '1') {
								val.betprizeVal = "<a href='javascript:;' class='waiting'>waiting</a>"
							} else if (val.orderstatus == '-1' || val.orderstatus == '-2') {
								val.betprizeVal = 'failure'
							}
						}


					});
					return Msg
				} else {
					this.$message({
						message: 'format_orderList error',
						type: 'error'
					});
					return false
				}
			}
		},
		computed: {},
		components: {
		},
		async mounted(){
			let orderMsg = await this.$store.dispatch(aTypes.getOrderList, {
					pageno: 1,
					pagesize: this.pageSize
				})
			console.log('=====orderMsg======');
			console.log(orderMsg);
			if (orderMsg) {
				this.orderList = this.format_orderList(orderMsg.orders);
				this.PageTotal = Number(orderMsg.counter)
			}
			this.ethUrl = ethUrl;
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
