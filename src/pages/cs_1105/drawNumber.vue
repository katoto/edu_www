<template>
    <div>
        <Header></Header>
        <div class="main">
            <BreadCrumbs></BreadCrumbs>
            <div>
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
                            <a href="javascript:;" v-if="scope.row.blocknum != '0'" data-dataNum="scope.row.index" class="icon-reward js_reward_show" >123</a>
                        </template>
                    </el-table-column>
                    <!-- 缺一个下载 -->
                    <el-table-column
                            label=""
                            width="120">
                    </el-table-column>
                </el-table>
                <div class="block">
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
<style>
    .el-pagination {
        text-align: center;
        margin-top: 10px;
    }
</style>
