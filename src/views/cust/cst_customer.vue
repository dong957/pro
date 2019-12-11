<template>
	<div>
		<!-- 面包屑 -->
		
		<el-breadcrumb separator="" style="margin-top: 20px;margin-left: 20px;">
			<el-breadcrumb-item><a style="font-size: 20px;">客户信息管理</a></el-breadcrumb-item>
		
			<!-- 搜索栏 -->
			<el-form :inline="true" class="demo-form-inline"style="margin-top: 20px;margin-left: 40px;">
				<el-form-item label="客户:">
					<el-input v-model="custName" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="客户经理:">
					<el-input v-model="custManageName" placeholder=""></el-input>
				</el-form-item>
				<!-- <el-form-item label="联系人:">
					<el-input v-model="chc_linkman" placeholder="请输入联系人"></el-input>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" @click="doSearch">查询</el-button>
				</el-form-item>
			</el-form>
		
			<!-- 数据表格 -->
			<el-table :data="result" style="width: 100%;" :border="true" max-height="700">
				<el-table-column prop="custNo" label="客户编号" min-width="80"></el-table-column>
				<el-table-column prop="custName" label="客户名称" min-width="80"></el-table-column>
				<el-table-column prop="custRegin" label="地区" min-width="100"></el-table-column>
				<el-table-column prop="custLevelLabel" label="客户等级" min-width="100"></el-table-column>
				<el-table-column label="操作" min-width="80" >
					<!--
					在<template>上使用特殊的slot-scope 特性，可以接收传递给插槽的prop
					slot-scope:类似将每一行的row对象封装到槽中，之后直接从scope中获取
					row对象信息和行索引index信息即可
					-->
					<template slot-scope="scope"  >
						<el-button size="mini" type="danger" @click="customerInfo(scope.row)">客户信息</el-button>
					</template>
				</el-table-column>
		
			</el-table>
		</el-breadcrumb>
		
		<el-pagination style="margin-top: 15px;" @size-change="sizeChange" @current-change="handleCurrentChange"
		 :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper"
		 :total="total">
		</el-pagination>
		
	</div>
</template>

<script>
	export default{
		name:'cst_customer',
		data:function(){
			return{
				custName: '',
				custManageName: '',
				result: [],
				page: 1,
				rows: 10,
				total: 0
			}
		},
		methods:{
			/* 查询 */
			doSearch: function() {
				let url = this.axios.urls.CUSTOMER_MANAGE_QUERYPAGE;
			
				let params = {
					custName: this.custName,
					custManageName: this.custManageName,
					rows: this.rows,
					page: this.page
				}
				
				
				this.axios.post(url, params).then(resp => {
					//console.log(resp.data.data);
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
			/* 客户信息 */
			customerInfo:function(row){
				this.$router.push({
					path:'/cst/cst_customer_info',
					/* 通过路由传递参数过去 */
					query:{
						row:row
					}
				});
			}
		},
		created() {
			this.doSearch();
			
		}
	}
</script>

<style>
</style>
