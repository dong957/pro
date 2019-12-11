<template>
	<div>
		<!-- 面包屑 -->

		<el-breadcrumb separator=">" style="margin-top: 20px;margin-left: 20px;">
			<el-breadcrumb-item><a style="font-size: 20px;">客户流失分析</a></el-breadcrumb-item>
		</el-breadcrumb>
	

			
			<!-- 搜索栏 -->
			<el-form :inline="true" class="demo-form-inline" style="margin-top: 25px;">
				<div style="margin-right: 105px;">
					<el-form-item label="客户名称:" :label-width="'180px'">
						<el-input v-model="lstCustName" placeholder=""></el-input>
					</el-form-item>
					<el-form-item label="客户经理:" :label-width="'180px'">
						<el-input v-model="lstCustMangerName" placeholder=""></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon="el-icon-search" @click="doSearch">查询</el-button>
					</el-form-item>
				</div>
			</el-form>
			<div style="margin: 20px;">
				
				<!-- 数据表格 -->
				<el-table :data="result" style="width: 100%;" :border="true" max-height="650">
					<el-table-column prop="lstCustNo" label="客户编号" min-width="80"></el-table-column>
					<el-table-column prop="lstLostOrderDate" label="时间" min-width="80"></el-table-column>
					<el-table-column prop="lstCustName" label="客户" min-width="80"></el-table-column>
					<el-table-column prop="lstCustMangerName" label="客户经理" min-width="80"></el-table-column>
					<el-table-column prop="lstReason" label="流失原因" min-width="80"></el-table-column>
				</el-table>
				
				
					<el-pagination style="margin-top: 15px;" @size-change="sizeChange" @current-change="handleCurrentChange"
				 :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper"
				 :total="total">
				</el-pagination>
				
			</div>
			
		


	</div>
</template>

<script>
	export default {
		name: 'customer_compositionsss',
		data: function() {
			return {
				/* 搜索栏 */
				lstCustName:'',
				lstCustMangerName:'',
				//查询数据
				result: [],
				page: 1,
				rows: 10,
				total: 0,


				//统一控制标签的宽度
				formLabelWidth: '100px',

				//统一控制表单元素的宽度
				formEleWidth: '300px',

			}
		},
		methods: {
			/* 查询 */
			doSearch: function() {
				let url = this.axios.urls.STATISTICS_MANAGE_CUSTOMER_LOST;
				
				
				let params={
					lstCustName:this.lstCustName,
					lstCustMangerName:this.lstCustMangerName
				}
			
				this.axios.post(url,params).then(resp => {
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

			}
		
		},
		created() {
			this.doSearch();
		}
	}
</script>

<style>
</style>
