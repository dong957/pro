<template>
	<div>
		<!-- 面包屑 -->

		<el-breadcrumb separator=">" style="margin-top: 20px;margin-left: 20px;">
			<el-breadcrumb-item><a style="font-size: 20px;">客户信息管理</a></el-breadcrumb-item>
			<el-breadcrumb-item><a style="font-size: 20px;">服务归档</a></el-breadcrumb-item>
		</el-breadcrumb>
	

			<!-- 搜索栏 -->
			<el-form :inline="true" class="demo-form-inline" style="margin-top: 40px;">
				<div style="margin-right: 105px;">
					<el-form-item label="名称:" :label-width="'180px'">
						<el-input v-model="prodName" placeholder=""></el-input>
					</el-form-item>
					<el-form-item label="型号:" :label-width="'180px'">
						<el-input v-model="prodType" placeholder=""></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon="el-icon-search" @click="doSearch">查询</el-button>
					</el-form-item>
				</div>
			</el-form>
			
			<!-- 数据表格 -->
			<el-table :data="result" style="width: 100%;" :border="true" max-height="720">
				<el-table-column prop="prodId" label="编号" min-width="30"></el-table-column>
				<el-table-column prop="prodName" label="名称" min-width="120"></el-table-column>
				<el-table-column prop="prodType" label="型号" min-width="170"></el-table-column>
				<el-table-column prop="prodBatch" label="等级/批次" min-width="30"></el-table-column>
				<el-table-column prop="prodUnit" label="单位" min-width="30"></el-table-column>
				<el-table-column prop="prodPrice" label="单价" min-width="30"></el-table-column>
				<el-table-column prop="prodMemo" label="备注" min-width="70"></el-table-column>
			</el-table>
		
		<el-pagination style="margin-top: 15px;" @size-change="sizeChange" @current-change="handleCurrentChange"
		 :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper"
		 :total="total">
		</el-pagination>



	</div>
</template>

<script>
	export default {
		name: 'product',
		data: function() {
			return {
				/* 搜索栏 */
				prodName:'',
				prodType:'',
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
				let url = this.axios.urls.BASICS_PRODUCT_LIST;
				
				
				
				let params = {
					prodName:this.prodName,
					prodType: this.prodType,
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

			}
		
		},
		created() {
			this.doSearch();
		}
	}
</script>

<style>
</style>
