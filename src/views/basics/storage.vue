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
					<!-- <el-form-item label="产品:" :label-width="'180px'">
						<el-input v-model="prodName" placeholder=""></el-input>
					</el-form-item> -->
					<el-form-item label="仓库:" :label-width="'180px'">
						<el-input v-model="stkWarehouse" placeholder=""></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon="el-icon-search" @click="doSearch">查询</el-button>
					</el-form-item>
				</div>
			</el-form>
			
			<!-- 数据表格 -->
			<el-table :data="result" style="width: 100%;" :border="true" max-height="650">
				<el-table-column prop="stkId" label="序号" min-width="50"></el-table-column>
				<el-table-column prop="stkProId" label="产品" min-width="200"></el-table-column>
				<el-table-column prop="stkWarehouse" label="仓库" min-width="60"></el-table-column>
				<el-table-column prop="stkWare" label="货位" min-width="40"></el-table-column>
				<el-table-column prop="stkCount" label="件数" min-width="40"></el-table-column>
				<el-table-column prop="stkMemo" label="备注" min-width="60"></el-table-column>
			</el-table>
		
		<el-pagination style="margin-top: 15px;" @size-change="sizeChange" @current-change="handleCurrentChange"
		 :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper"
		 :total="total">
		</el-pagination>



	</div>
</template>

<script>
	export default {
		name: 'storage',
		data: function() {
			return {
				/* 搜索栏 */
				prodName:'',
				stkWarehouse:'',
				//查询数据
				result: [],
				page: 1,
				rows: 10,
				total: 0,
				
				//产品	
				product:'',
				//统一控制标签的宽度
				formLabelWidth: '100px',

				//统一控制表单元素的宽度
				formEleWidth: '300px',
				
				stkProId:0
			}
		},
		methods: {
			/* 查询 */
			doSearch: function() {
				
				
				let url = this.axios.urls.BASICS_STORAGE_LIST;
				
				
				
				let params = {
					stkWarehouse:this.stkWarehouse,
					rows: this.rows,
					page: this.page
				}
				
				
				this.axios.post(url, params).then(resp => {
					// console.log(resp.data.data);
					
					for(let i of resp.data.data){
						for(let j of this.product){
							if(i.stkProId==j.prodId){
								i.stkProId=j.prodName;
							}
						}
					}
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
			let a = this.axios.urls.BASICS_PRODUCT_LIST;
			this.axios.post(a, {}).then(resp => {
				// console.log(resp.data.data);
				this.product = resp.data.data
				this.doSearch();
			}).catch(resp => {
				console.log(resp);
			})
			
			
		}
	}
</script>

<style>
</style>
