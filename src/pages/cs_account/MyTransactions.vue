<template>
    <div class="capitalDetails">
         <h2>My Transactions</h2>
         <Filters></Filters>
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
                        :current-page.sync="pageNumber"
                        size="small"
                        :page-size="pageSize"
                        layout="prev, pager, next,jumper"
                        :page-count="pageCount"
                >
                </el-pagination>
            </div>
        </template>
    </div>
</template>

<script>
	import {mTypes, aTypes} from '~/store/cs_page/cs_account'
	import {src, platform, tipsTime, ethUrl, formate_coinType, formateBalance , formate_moneyFlow} from '~common/util'
	import {Message} from 'element-ui'

	import Filters from '~/components/Filter'
    export default {
        data(){
            return {
	            pageNumber: 1,
	            pageSize: 6,
	            pageCount: 10,
	            orderList: [],
	            ethUrl: null,
            }
        },
        watch: {},
        methods: {
	        async handleCurrentChange (val) {
		        if (val !== undefined) {
			        let orderMsg = await this.$store.dispatch(aTypes.getAccountLog, {
				        pageno:  Number(val),
				        pagesize: this.pageSize
			        })
			        if (orderMsg) {
				        this.orderList = this.format_accountlog(orderMsg.account_logs);
				        this.pageCount = Number(orderMsg.pages)
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
	        format_accountlog (Msg) {
		        if (Msg) {
			        Msg.forEach((val, index) => {
				        // bettime
				        val.crtime = this.format_time(val.crtime, 'yyyy-MM-dd HH:mm');
				        if (val.inout !== undefined) {
					        val.inout = formate_moneyFlow(val.inout)
				        }
				        val.cointype = formate_coinType(val.cointype);
				        if (Number(val.money) <= 0) {
					        val.moneyVal = "<a href='javascript:;' class='fail' style='cursor: default' > " + formateBalance(val.money) + " </a>";
				        } else {
					        val.moneyVal = "<a href='javascript:;' class='win'  style='cursor: default' > + " + formateBalance(val.money) + " </a>";
				        }
				        if (val.balance) {
					        val.balance = formateBalance(val.balance) + 'ETH'
				        }

			        });
			        return Msg
		        } else {
			        Message({
				        message: 'format_accountlog error',
				        type: 'error'
                    })
			        return false
		        }
	        }
        },
        computed: {},
        components: {
            Filters
        },
        async mounted(){
	        let orderMsg = await this.$store.dispatch(aTypes.getAccountLog, {
		        pageno: 1,
		        pagesize: this.pageSize
	        });

	        console.log('=====getAccountLog======');
	        console.log(orderMsg);

	        if (orderMsg) {
		        this.orderList = this.format_accountlog(orderMsg.account_logs);
		        this.pageCount = Number(orderMsg.pages)
	        }
	        this.ethUrl = ethUrl;
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../styles/lib-mixins.less";
    h2{
        line-height: 30px;
        font-size: 24px;
        color: #263648;
        text-transform: capitalize;
    }
    .capitalDetails{
        .filter{
            margin-top: 15px;
        }
    }
    .pagination {
        display: table;
        margin: 20px auto 30px;
    }
</style>
