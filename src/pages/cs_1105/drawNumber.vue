<template>
    <div>
        <Header></Header>
        <div class="main">
            <BreadCrumbs></BreadCrumbs>
            <div>
                <el-table
                        :data="drawNumList"
                        stripe
                        highlight-current-row
                        style="width: 100%">
                    <el-table-column
                            prop="index"
                            label="Draw Time">
                    </el-table-column>
                    <el-table-column
                            prop="expectId"
                            label="No.">
                    </el-table-column>
                    <el-table-column
                            prop="beginTime"
                            label="Draw Number">
                    </el-table-column>
                    <el-table-column
                            prop="endTime"
                            label="Cumulative Bouns">
                    </el-table-column>
                    <el-table-column
                            prop="stateVal"
                            label="Block">
                    </el-table-column>
                    <el-table-column
                            label="状态操作"
                            width="120">
                        <template slot-scope="scope">
                            <el-button @click="before_js_onlineFn( scope.row )" v-if="scope.row.state === '0'" type="primary"
                                       size="small">
                                上线
                            </el-button>
                            <el-button v-else @click="before_js_onlineFn( scope.row )" type="danger" size="small">
                                下线
                            </el-button>
                        </template>
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

    import Header from '~/components/Header.vue'
	import Footer from '~/components/Footer.vue'
	import BreadCrumbs from '~/components/BreadCrumbs.vue'

	export default {
		data(){
			return {
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
			console.log( Object.keys(drawData) );
            if( drawData ){
                this.drawNumList = drawData.expect_history ;
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
