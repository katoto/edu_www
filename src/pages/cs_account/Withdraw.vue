<template>
    <div class="withdrawal">
        <h2>withdraw</h2>
       <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="Request" name="Request">
                <li class="li-records">
                    <div class="item icon-name hide">
                        <div class="fl210 ">ETH</div>
                        <p class="bold js_withDrawal_eth"></p>
                    </div>
                    <div class="item wallet-add">
                        <div class="fl210">Wallet Address</div>
                        <input type="text">
                    </div>
                    <div class="item pick-up">
                        <div class="fl210">
                            <span class="css_withdraw_tips">Withdraw Amount</span>
                            <span class="css_withdraw_total">at least 0.01 ETH</span>
                        </div>
                        <input autocomplete="off" type="text">
                        <span class="css_withdraw_topMoney">Maximum</span>
                        <p class="pickup-tips" style="display: none">
                            Less than 0.1242 balance, please reset on withdraws
                        </p>
                    </div>
                    <div class="item account-psw">
                        <div class="fl210">
                            Account Password
                        </div>
                        <input autocomplete="new-password" type="password">
                    </div>
                    <p class="fee">
                        Fee&nbsp;&nbsp;
                        <i class="orange">0.00000</i>
                        <span class="orange"> ETH</span>
                    </p>
                    <button >Send</button>
                </li>
            </el-tab-pane>
            <el-tab-pane label="Records" name="Records">
                <li class="li-request">
                    <section>
                        <el-select v-model="withdrawOptionVal">
                            <el-option
                                    v-for="item in withdrawOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-model="withdrawTimeOptionVal">
                            <el-option
                                    v-for="item in withdrawTimeOptions"
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
                                    type="index"
                                    label="No.">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    header-align="center"
                                    prop="drawtime"
                                    label="Transaction Time">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    header-align="center"
                                    label="Transaction Address">
                                <template slot-scope="scope">
                                    <div v-html="scope.row.to_addrHtml"></div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    header-align="center"
                                    prop="cointype"
                                    label="Type">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    header-align="center"
                                    prop="drawmoney"
                                    label="Amount">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    header-align="center"
                                    prop="drawfee"
                                    label="Fee">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    header-align="center"
                                    prop="drawstatus"
                                    label="Status">
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
                                    :total="PageTotal"
                            >
                            </el-pagination>
                        </div>
                    </template>
                </li>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
	import {mTypes, aTypes} from '~/store/cs_page/cs_account'
	import {src, platform, tipsTime, ethUrl, format_match_account, formateBalance ,formate_coinType} from '~common/util'
	import {Message} from 'element-ui'
	export default {
        data(){
            return {
	            pageNumber: 1,
	            pageSize: 6,
	            PageTotal: 10,
	            orderList: [],
	            ethUrl: null,

                activeName: 'Request',

	            withdrawOptionVal: '1',
	            withdrawOptions: [{
		            value: '1',
		            label: 'All'
	            },{
		            value: '2',
		            label: 'successful'
	            }, {
		            value: '3',
		            label: 'failed'
	            }, {
		            value: '4',
		            label: 'waiting'
	            }],

	            withdrawTimeOptionVal: '1',
	            withdrawTimeOptions: [ {
		            value: '1',
		            label: 'In 30 days'
	            }, {
		            value: '2',
		            label: 'In 7 days'
	            }],

            }
        },
        watch: {
          
        },
        methods: {
	        handleClick(){

            },
	        async handleCurrentChange (val) {
		        if (val !== undefined) {
			        let orderMsg = await this.$store.dispatch(aTypes.getWithdrawRecords, {
				        pageno:  Number(val),
				        pagesize: this.pageSize
			        })
			        if (orderMsg) {
				        this.orderList = this.format_withdrawList(orderMsg.list);
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
	        format_withdrawList (Msg) {
		        if (Msg) {
			        Msg.forEach((val, index) => {
				        // bettime
				        val.drawtime = this.format_time(val.drawtime, 'yyyy-MM-dd HH:mm');

				        if (val.to_addr !== undefined && val.to_addr !== null) {
					        if (val.to_addr === '') {
						        val.to_addrHtml = "<span>-</span>"
					        } else {
						        val.to_addrHtml = "<a target='_blank' title='" + val.to_addr + "' href='" + ethUrl + "address/" + val.to_addr + "' class='address'>" + val.to_addr + "</a>"
					        }
				        }
				        val.cointype = formate_coinType(val.cointype);
				        val.drawmoney = formateBalance(val.drawmoney)
				        val.drawfee = formateBalance(val.drawfee);

				        if (val.drawstatus !== undefined) {
					        switch (Number(val.drawstatus)) {
						        case 0:
						        case 1:
						        case 2:
						        case 3:
							        val.drawstatus = 'waiting'
							        ;
							        break;
						        case 4:
							        val.drawstatus = 'successful'
							        ;
							        break;
						        case -1:
						        case -2:
							        val.drawstatus = 'failed';
							        break;
					        }
				        }

				        val.balance = formateBalance(val.balance) + ' ETH'

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
			        Message({
				        message: 'format_withdrawList error',
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
		    let orderMsg = await this.$store.dispatch(aTypes.getWithdrawRecords, {
			    pageno: 1,
			    pagesize: this.pageSize
		    })
		    console.log('=====orderMsg======');
		    console.log(orderMsg);
		    if (orderMsg) {
			    this.orderList = this.format_withdrawList(orderMsg.list);
			    this.PageTotal = Number(orderMsg.counter)
		    }
		    this.ethUrl = ethUrl;
	    }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
@import "../../styles/lib-mixins.less";
li{
    list-style: none;
}
.orange{
    color: #fd9644;
}
 .withdrawal{
     h2{
        line-height: 30px;
        font-size: 24px;
        color: #263648;
        text-transform: capitalize;
     }
    .lf130{
        width:130px;
        margin-right:35px;
        float: left;
        overflow: hidden;
    }
    .fl210{
        position: relative;
        float: left;
        width:210px;
        height:50px;
        overflow: hidden;
    }

    .li-records{
        .item{
            position: relative;
            height:50px;
            line-height:50px;
            overflow: hidden;
            margin-bottom:20px;
            font-size:16px;
            .clearfix();
        }
        .wallet-add{
            margin-top:40px;
        }
        >li{
            display: none;
        }
        >li.on{
            display: block;
        }
        .icon-name{
            height:34px;
            line-height:34px;
            margin-top:17px;
            p{
                float: left;
                font-size:20px;
                color: #ff7f50;
                font-weight:bold;
            }
        }
        input{
            height:48px;
            line-height:48px;
            border:1px solid #ced6e0;
            outline:none;
            text-indent:5px;
            width:455px;
            font-size:16px;
        }
        .account-psw{
            input{
                width:275px;
            }
        }
        .pick-up{
            .css_withdraw_tips{
                display: block;
                height:16px;
                line-height:16px;
                position: absolute;
                left:0;
                top:12px;
            }
            .css_withdraw_total{
                position: absolute;
                top:33px;
                left:0;
                line-height:12px;
                font-size:12px;
            }
            .css_withdraw_topMoney{
                position: absolute;
                right: 268px;
                cursor: pointer;
                color: #6a89cc;
            }
        }
        .pickup-tips{
            position: absolute;
            top:8px;
            left:677px;
            height:36px;
            overflow: hidden;
            line-height:18px;
            font-size:14px;
            color: #fc5c65;
            text-transform: capitalize;
        }
        .fee{
            margin:0 0 0 210px;
            width:280px;
            line-height:32px;
            text-align: center;
            font-size:14px;
        }
        button{
            display: block;
            width:280px;
            height:50px;
            line-height:50px;
            overflow: hidden;
            margin:0 0 30px 210px;
            background: #fd9644;
            border-radius:6px;
            font-size:20px;
            color: #fff;
            font-weight:bold;
            .transition();
            &:hover{
                background: #f27d1f;
            }
        }
    }
}
.li-request{
    .filter{
        margin-top:24px;
    }
}
.pagination {
    display: table;
    margin: 20px auto 30px;
}

.el-tabs__active-bar{
    background: #263648 !important;
}
</style>
