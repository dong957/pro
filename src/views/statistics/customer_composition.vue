<template>
	<div>
		<!-- 面包屑 -->

		<el-breadcrumb separator=">" style="margin-top: 20px;margin-left: 20px;">
			<el-breadcrumb-item><a style="font-size: 20px;">客户构成分析</a></el-breadcrumb-item>
		</el-breadcrumb>
	

			
			<div style="margin: 20px;margin-top: 80px;">
			<!-- 数据表格 -->
				<el-table :data="result" style="width: 100%;" :border="true" max-height="650">
				<el-table-column prop="value" label="编号" min-width="80"></el-table-column>
				<el-table-column prop="level" label="等级" min-width="80"></el-table-column>
				<el-table-column prop="count" label="客户数量" min-width="80"></el-table-column>
				</el-table>
			</div>
		



	</div>
</template>

<script>
	export default {
		name: 'customer_compositionsss',
		data: function() {
			return {
				/* 搜索栏 */
				
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
				let url = this.axios.urls.STATISTICS_MANAGE_CUSTOMER_MAKE;
				
				
				
			
				this.axios.post(url,{}).then(resp => {
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
