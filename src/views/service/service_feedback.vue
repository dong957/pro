<template>
	<div>
		<!-- 面包屑 -->

		<el-breadcrumb separator=">" style="margin-top: 20px;margin-left: 20px;">
			<el-breadcrumb-item><a style="font-size: 20px;">客户服务管理</a></el-breadcrumb-item>
			<el-breadcrumb-item><a style="font-size: 20px;">服务处理</a></el-breadcrumb-item>
		</el-breadcrumb>
	

			<!-- 搜索栏 -->
			<el-form :inline="true" class="demo-form-inline" style="margin-top: 5px;">

				<div>
					<el-form-item label="创建时间:">
						<el-date-picker value-format="yyyy-MM-dd" v-model="valueTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon="el-icon-search" @click="doSearch">查询</el-button>
					</el-form-item>
				</div>

				<div style="margin-right: 105px;">
					<el-form-item label="客户:" :label-width="'180px'">
						<el-input v-model="svrCustName" placeholder=""></el-input>
					</el-form-item>
					<el-form-item label="概要:" :label-width="'180px'">
						<el-input v-model="svrTitle" placeholder=""></el-input>
					</el-form-item>
					<el-form-item label="服务类型:" :label-width="'180px'">
						<el-input v-model="svrType" placeholder=""></el-input>
					</el-form-item>
				</div>



			</el-form>

			<!-- 数据表格 -->
			<el-table :data="result" style="width: 100%;" :border="true" max-height="650">
				<el-table-column prop="svrId" label="编号" min-width="80"></el-table-column>
				<el-table-column prop="svrCustName" label="客户" min-width="80"></el-table-column>
				<el-table-column prop="svrTitle" label="概要" min-width="100"></el-table-column>
				<el-table-column prop="svrType" label="服务类型" min-width="100"></el-table-column>
				<el-table-column prop="svrCreateBy" label="创建人" min-width="100"></el-table-column>
				<el-table-column prop="svrCreateDate" label="创建日期" min-width="100"></el-table-column>

				<el-table-column label="操作" min-width="80">
					<template slot-scope="scope">
						<el-button type="danger" @click="feedback(scope.row)">反馈</el-button>
					</template>
				</el-table-column>


			</el-table>
		

		<el-pagination style="margin-top: 15px;" @size-change="sizeChange" @current-change="handleCurrentChange"
		 :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper"
		 :total="total">
		</el-pagination>



	</div>
</template>

<script>
	export default {
		name: 'service_dispose',
		data: function() {
			return {
				/* 搜索栏 */
				svrCustName: '',
				svrTitle: '',
				svrType: '',
				svrCreateDateGo: '',
				svrCreateDateTo: '',
				//查询数据
				result: [],
				page: 1,
				rows: 10,
				total: 0,


				//统一控制标签的宽度
				formLabelWidth: '100px',

				//统一控制表单元素的宽度
				formEleWidth: '300px',
					
				//选择日期
				valueTime:''
			}
		},
		methods: {
			/* 查询 */
			doSearch: function() {
				let url = this.axios.urls.SERVICE_MANAGE_QUERYPAGES;
				
				
				
				
				//获取到选择的时间段
				let startTime="";
				let endTime="";
				if(this.valueTime!=null){
					startTime=this.valueTime[0];
					endTime=this.valueTime[1];
				}
				
				
				let params = {
					svrCustName: this.svrCustName,
					svrTitle: this.svrTitle,
					svrType: this.svrType,
					svrCreateDate:startTime,
					endTime:endTime,
					svrStatus: '已处理',
					svrDueId: this.$store.getters.getUser.user_id,//分配人的id
					svrDueTo:this.$store.getters.getUser.user_name,//名字
					rows: this.rows,
					page: this.page
				}

				this.axios.post(url, params).then(resp => {
					// console.log(resp.data.data);

					this.result = resp.data.data
					this.total = resp.data.total
				}).catch(resp => {
					console.log(resp);
				})

			},
			/* 分页事件定义 */
			sizeChange: function(rows) {
				this.rows = rows;
				this.page = 1;
				this.doSearch();
			},

			/* 页码更改 */
			handleCurrentChange: function(page) {
				this.page = page;
				this.doSearch();

			},
			/* 反馈 */
			feedback:function(row){
				
				row.svrCreateBy
				
				this.$router.push({
					path:'/service_feedback_do',
					query: {
						row:row
					}
				})
			}
		},
		created() {
			this.doSearch();
		}
	}
</script>

<style>
</style>
