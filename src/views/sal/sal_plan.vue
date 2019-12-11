<template>
	<div>
		<!-- 面包屑 -->
		
		<el-breadcrumb separator="" style="margin-top: 20px;margin-left: 20px;">
			<el-breadcrumb-item><a style="font-size: 20px;">客户开发计划</a></el-breadcrumb-item>
			<!-- 搜索栏 -->
			<el-form :inline="true" class="demo-form-inline" style="margin-top: 20px;margin-left: 20px;">
				<el-form-item label="客户名称:">
					<el-input v-model="chc_cust_name" placeholder="请输入客户名称"></el-input>
				</el-form-item>
				<el-form-item label="概要:">
					<el-input v-model="chc_cust_title" placeholder="请输入概要"></el-input>
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
				<el-table-column prop="chc_id" label="编号" min-width="60"></el-table-column>
				<el-table-column prop="chc_cust_name" label="客户名称" min-width="70"></el-table-column>
				<el-table-column prop="chc_cust_title" label="概要" min-width="100"></el-table-column>
				<el-table-column prop="chc_rate" label="成功几率" min-width="70"></el-table-column>
				<el-table-column prop="chc_create_date" label="创建时间" min-width="120"></el-table-column>
				<el-table-column label="操作" min-width="100" >
					<!--
					在<template>上使用特殊的slot-scope 特性，可以接收传递给插槽的prop
					slot-scope:类似将每一行的row对象封装到槽中，之后直接从scope中获取
					row对象信息和行索引index信息即可
					-->
					<template slot-scope="scope"  >
						<el-button size="mini" type="danger" @click="makePlan(scope.row)">制定计划</el-button>
						<el-button size="mini" type="danger" @click="stopPlan(scope.row)">终止开发</el-button>
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
		name:'sal_plan',
		data:function(){
			return{
				chc_cust_name: '',
				chc_cust_title: '',
				chc_linkman: '',
				result: [],
				page: 1,
				rows: 10,
				total: 0
			}
		},
		methods:{
			doSearch: function() {
				let url = this.axios.urls.SALCHANCE_MANAGE_QUERYPAGER;
			
				let params = {
					chc_cust_name: this.chc_cust_name,
					chc_cust_title: this.chc_cust_title,
					chc_linkman: this.chc_linkman,
					/* 查出来的都是未分配的 status状态为1 */
					chc_status:2,
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
			/* 制定计划 路由跳转  */
			makePlan:function(row){
				
				this.$router.push({
					path:'/sal/sal_plan_make',
					/* 通过路由传递参数过去 */
					query:{
						row:row
					}
				});
			},
			/* 终止开发 */
			stopPlan:function(row){
				let url=this.axios.urls.SALCHANCE_MANAGE_STOP;
				
				this.axios.post(url,{
					chc_id:row.chc_id,
					chc_status:4
				}).then(resp=>{
					if (resp.data.success) {
						this.$message({
							message: resp.data.msg,
							type: 'success'
						})
						
						this.doSearch();
					} else {
						this.$message({
							message: resp.data.msg,
							type: 'error'
						})
					}
				}).catch(resp=>{
					console.log(resp);
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
