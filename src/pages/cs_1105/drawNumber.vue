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
                            label="Draw Time">
                    </el-table-column>
                    <el-table-column
                            prop="expectid"
                            label="No.">
                    </el-table-column>
                    <el-table-column
                            label="Draw Number">
                        <template slot-scope="scope">
                            <ul class="num-box" v-if="scope.row.opencode !== '-1'">
                                <li v-for="item in scope.row.opencode">{{ item }}</li>
                            </ul>
                            <span v-else class="js_lastDrawWait">waiting</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="sumbonus"
                            label="Cumulative Bouns">
                    </el-table-column>
                    <el-table-column
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
                            <a href="javascript:;" v-if="scope.row.blocknum != '0'" data-dataNum="scope.row.index" class="icon-reward js_reward_show" ></a>
                        </template>
                    </el-table-column>
                    <!-- 缺一个下载 -->
                    <el-table-column
                            label=""
                            width="120">
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
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
	import {mTypes, aTypes} from '~/store/cs_1105/index'
	import { src, platform , tipsTime ,ethUrl} from '~common/util'

    import Header from '~/components/Header.vue'
	import Footer from '~/components/Footer.vue'
	import BreadCrumbs from '~/components/BreadCrumbs.vue'

	export default {
		data(){
			return {
				ethUrl:null,
				pageNumber:1,
				pageSize: 10,
				PageTotal:1,
				drawNumList:[],
			}
		},
		watch: {},
		methods: {
			async handleCurrentChange (val) {
//				let withDrawMsg = null;
//				this.currPageNumber = Number(val);
//
//				withDrawMsg = await this.$store.dispatch(aTypes.getGoodsList, {
//					'pageNumber': Number(val),
//					'pageSize': this.pageSize
//				});
//
//				if (withDrawMsg) {
//					this.pageCounts = Number(withDrawMsg.pages);
//					if (withDrawMsg.goods) {
//						withDrawMsg.goods.forEach((val, index) => {
//							val.index = Number(index) + 1;
//							if (val.state !== undefined) {
//								switch (val.state) {
//									case '0':
//										val.stateVal = '新商品（未上线）';
//										break;
//									case '1':
//										val.stateVal = '可投';
//										break;
//									case '2':
//										val.stateVal = '暂停';
//										break;
//									case '3':
//										val.stateVal = '截止等待开奖';
//										break;
//									case '4':
//										val.stateVal = '已派奖';
//										break;
//									case '5':
//										val.stateVal = '取消';
//										break;
//								}
//							}
//						});
//						this.goodsList = withDrawMsg.goods
//					}
//				}
			},

            /*
             *  格式化时间  allbet time
             * */
			format_time(time, format) {
                if (format === undefined || format == null) {
                    format = 'HH:mm:ss';
                    // format = 'MM-dd HH:mm:ss'
                }
                if (isNaN(time)) {
                    return false;
                }
                let t = new Date(+time * 1000);
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
            format_drawNum( Msg ){
                if( Msg ){
	                Msg.forEach(( val ,index )=>{
		                val.index = index ;
	                	// opentime
		                val.opentime = this.format_time( val.opentime , 'MM-dd HH:mm:ss');

		                if (val.expect_status == '4' || val.expect_status == '5') {
			                if (val.opencode === null) {
				                val.opencode = '0,0,0,0,0'
			                }
			                val.opencode = val.opencode.split(',')
		                } else {
                        //	     waiting 转态
			                val.opencode = '-1'
		                }

		                if (!val.blockhash) {
			                val.blockhash = '';
		                }

		                if( val.blocknum != '0' ){
		                	val.jumpEthUrl = ethUrl + 'block/' + val.blocknum
                        }

//		                var newLastStr = '';
//		                if (val.blocknum === '0') {
//			                newLastStr = ''
//			                val.blockidStr = '<span> - </span>'
//		                } else {
//			                val.blockidStr = '<a href="' + ethUrl + 'block/' + data.data.expect_history[j].blocknum + '" target="_blank" class="address"># ' + data.data.expect_history[j].blocknum + '</a>'
//			                newLastStr = '<a href="javascript:;" data-dataNum="' + j + '" class="icon-reward js_reward_show"></a>'
//		                }

		                if (val.sumbonus === '0') {
			                val.sumbonus = '-'
		                }

	                });
	                return Msg
                }else{
                	return false
                }
            }
        },
		components:{
			Header,
			Footer,
			BreadCrumbs
		},
		computed: {},
		async mounted(){
			let drawData = await this.$store.dispatch(aTypes.getDrawNumList, {
				'pageNumber': 1,
				'pageSize': this.pageSize
			});
			console.log('===========')
			console.log( drawData )
            if( drawData ){
                this.drawNumList = this.format_drawNum( drawData.expect_history );
                this.PageTotal =  Number( drawData.count )  ;
            }


		}
	}
</script>
<style scoped lang="less">
    @import "../../styles/lib-mixins.less";
    .main{
        position: relative;
        width:1190px;
        margin: 0 auto;
        .clearfix();
    }
    .main-reward{
        position: relative;
        padding:0 50px 1px;
        background: #fff;
        .rounded();
        h1{
            height:80px;
            line-height:80px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            border-bottom:1px solid #f2f2f2;
            font-size:26px;
            text-transform: capitalize;
        }
    }
    //开奖明细弹窗
    .pop-reward{
        .pop-main{
            padding-bottom:30px;
        }
        p{
            line-height:12px;
            font-size:12px;
            color: #778ca3;
        }
        .view-header{
            margin-top:26px;
            overflow: hidden;
            .fl{
                max-width:67%;
                overflow: hidden;
                text-align: left;
            }
            .fr{
                max-width:32%;
                overflow: hidden;
                text-align: right;
            }
        }
        .random-block{
            position: relative;
            width:100%;
            display: block;
            line-height:33px;
            font-size:26px;
            font-weight:bold;
            .text-overflow();
            &:hover{
                &::before{
                    color: #263648;
                }
            }
            &::before{
                .transition();
                content: '#';
                color: #6a89cc;
            }
        }
        .nper{
            width:100%;
            display: block;
            line-height:33px;
            .text-overflow();
        }
        .view-hash{
            margin-top:32px;
        }
        .view-process{
            margin-top:10px;
        }
        .view-hash,.view-process,.node{
            text-align: justify;
            word-break: break-all;
            span{
                display: block;
                margin-top:6px;
                line-height:24px;
            }
        }
        .node{
            margin-top: 20px;
            p{
                line-height: 16px;
            }
        }
    }
    //开奖列表table
    table{
        .icon-reward{
            display: block;
            margin:0 auto;
            background-image: url("../../assets/slice/btn-reward.png");
            width: 15px;
            height: 19px;
        }
        .icon-down{
            display: block;
            margin:0 auto;
            background-image: url("../../assets/slice/icon-down.png");
            transition: none;
        }
        th{
            width:14.285%;
        }
        tbody{
            tr{
                &:hover{
                    .icon-reward{
                        background-image: url("../../assets/slice/btn-reward2.png");
                    }
                    .icon-down{
                        background-image: url("../../assets/slice/icon-down2.png");
                    }
                }
            }
        }
        .num-box li{
            font-weight:bold;
            color: #263648;
        }
    }
    .days30{
        right:50px;
        bottom:34px;
    }
    #p2{
        display: none;
    }
    .pagination{
        display: table;
        padding: 0;
        margin: 20px auto 30px;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        font-size: 14px;
        color: #778ca3;
        text-align: center;
        li{
            display: inline-block;
            margin-left: 5px;
            height: 28px;
            line-height: 28px;
            box-sizing: content-box;
            outline: none;
            border: 1px solid #d5d5d5;
            color: #778ca3 !important;
            a{
                display: block;
                padding: 0 12px;
                color: #778ca3;
            }
        }
        li.active{
            border: none;
            background: none;
            color: #263648 !important;
            a{
                cursor: default;
            }
            &:hover{
                color: #666 !important;
                border: none;
                background: transparent;
                box-shadow: none;
            }
        }
        li:hover{
            color: #666 !important;
            border: 1px solid #d5d5d5;
            background: #f2f2f2;
            box-shadow: none;
        }
        .prev{
            position: relative;
            padding-left:8px;
            &::before{
                content: '';
                display: block;
                position: absolute;
                left:10px;
                top:10px;
                background: url("../../assets/slice/arrow-left-778ca3.png");
            }
        }
        .next{
            position: relative;
            padding-right:8px;
            &::before{
                content: '';
                display: block;
                position: absolute;
                top:10px;
                right:10px;
                background: url("../../assets/slice/arrow-right-778ca3.png");
            }
        }
    }

</style>
