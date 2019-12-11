<template>
	<div>
		<!-- 面包屑 -->

		<el-breadcrumb separator=">" style="margin-top: 20px;margin-left: 20px;">
			<el-breadcrumb-item><a href="#/cst/cst_customer" style="font-size: 20px;">客户信息管理 </a></el-breadcrumb-item>
			<el-breadcrumb-item><a @click="backCustInfo" style="font-size: 20px;">客户信息 </a></el-breadcrumb-item>
			<el-breadcrumb-item><a style="font-size: 20px;">历史订单</a></el-breadcrumb-item>


			<div align="right" style="margin-top: 40px;margin-right:99px;margin-bottom: 1px;">
				<el-button @click="backCustInfo">返回</el-button>
			</div>

			<el-form :inline="true" class="demo-form-inline" style="margin-top:0px;">
				<el-form-item label="客户编号" style="background-color:skyblue;" label-width="250px">
					<el-input readonly v-model="row.custNo" style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="客户名称" style="background-color:skyblue;" label-width="250px">
					<el-input readonly v-model="row.custName" style="width: 300px;"></el-input>
				</el-form-item>
			</el-form>
			
			
				<el-table :data="result" style="width: 100%;margin-top: 20px;" :border="true" max-height="700">
				<el-table-column prop="orderId" label="订单编号" min-width="80"></el-table-column>
				<el-table-column prop="orderDate" label="日期" min-width="80"></el-table-column>
				<el-table-column prop="orderAddr" label="送货地址" min-width="100"></el-table-column>
				
				<el-table-column prop="orderStatus" label="状态" min-width="100"></el-table-column>
				<el-table-column label="操作" min-width="60">
					<!--
					在<template>上使用特殊的slot-scope 特性，可以接收传递给插槽的prop
					slot-scope:类似将每一行的row对象封装到槽中，之后直接从scope中获取
					row对象信息和行索引index信息即可
					-->
					<template slot-scope="scope">
						<el-button size="mini" type="warning" @click="checkOrder(scope.row)" icon="el-icon-tickets"></el-button>
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
	export default {
		name: 'cst_customer_orders',
		data: function() {
			return {
				result: [], //分页数据
				row: [], //路由传递过来的数据
				page: 1,
				rows: 10,
				total: 0
			}
		},
		methods: {
			/* 获取路由跳转是传递过来的参数 */
			getParams: function() {
				let row = this.$router.history.current.query.row;

				this.row = row;
				// console.log(row);
				/* 在没有加载之前
				 * 做一个判断
				 * 用于判断是否是正常跳转路由
				 *  */
				// if(this.row == null){
				// 	this.$router.push({path:'/cst/cst_customer_info'});
				// }

				/* 
				 * 传递参数
				 * 进来路由就去获取分页数据
				 *  */

				this.doSearch(row.custNo);

			},
			/* 查询 */
			doSearch: function(str) {
				let url = this.axios.urls.CUSTOMER_ORDERS_QUERYPAGES;

				let params = {
					orderCustomerNo: str,
				}

				this.axios.post(url, params).then(resp => {
					// console.log(resp.data.data);
					for(let i of resp.data.data){
						// console.log(i);
						if(i.orderStatus == "a"){
							i.orderStatus='已回款'
						}
						else if(i.orderStatus == "b"){
							i.orderStatus='未回款';
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

			},
			/* 返回客户信息 */
			backCustInfo: function() {
				this.$router.push({
					path: '/cst/cst_customer_info',
					/* 通过路由传递参数过去 */
					query: {
						row: this.row
					}
				});
			},
			/* 订单明细 */
			checkOrder:function(row){
				this.$router.push({
					path: '/cst/cst_customer_order_Product',
					/* 通过路由传递参数过去 */
					query: {
						row:row
					}
				});
			}
		},
		created() {

			/* 传递参数 */
			this.getParams();

		}
	}
</script>

<style>
</style>
