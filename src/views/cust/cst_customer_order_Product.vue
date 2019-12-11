<template>
	
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator=">" style="margin-top: 20px;margin-left: 20px;">
			<el-breadcrumb-item><a href="#/cst/cst_customer" style="font-size: 20px;">客户信息管理 </a></el-breadcrumb-item>
			<el-breadcrumb-item><a style="font-size: 20px;">客户信息 </a></el-breadcrumb-item>
			<el-breadcrumb-item><a style="font-size: 20px;">历史订单 </a></el-breadcrumb-item>
			<el-breadcrumb-item><a style="font-size: 20px;">订单明细</a></el-breadcrumb-item>
			
			<div align="right" style="margin-top: 40px;margin-right:109px;margin-bottom: 1px;">
				<el-button @click="backOrders">返回</el-button>
			</div>
		</el-breadcrumb>
		
		<div style="width: 1580px;">
			<el-form :model="row" :inline="true" style="margin-top: 10px;">
				<el-form-item label="订单编号" :label-width="formLabelWidth"  style="background-color: skyblue;">
					<el-input readonly v-model="row.orderId" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="日期" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input readonly v-model="row.orderDate" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="地址" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input readonly v-model="row.orderAddr" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="总金额" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input readonly v-model="row.CountSum" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="状态" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input readonly v-model="row.orderStatus" autocomplete="off"  :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label=" " :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input autocomplete="off" :style="{width: formEleWidth}" ></el-input>
				</el-form-item>
			</el-form>
			
			<div style="margin-left: 10px;margin-top: 100px;">
				<el-table :data="result" style="width: 100%;" size="mini" :border="true" max-height="130" :header-cell-style="{background:'royalblue'}">
					<el-table-column prop="prodName" label="日期" min-width="400">
					</el-table-column>
					<el-table-column prop="oddCount" label="数量" min-width="100">
					</el-table-column>
					<el-table-column prop="oddUint" label="单位" min-width="100">
					</el-table-column>
					<el-table-column prop="prodPrice" label="单价(元)" min-width="200">
					</el-table-column>
					<el-table-column prop="sum" label="金额" min-width="220">
					</el-table-column>
				</el-table>
			</div>
		
			
		</div>
		
		
	</div>
		
</template>

<script>
		export default {
			name: 'cst_customer_order_product',
			data: function() {
				return {
					result: [],//订单明细数据
					row: {}, //路由传递过来的数据
					page: 1,
					rows: 10,
					total: 0,
					//统一控制标签的宽度
					formLabelWidth: '500px',
					
					//统一控制表单元素的宽度
					formEleWidth: '200px'
				}
			},
			methods: {
				/* 获取路由跳转是传递过来的参数 */
				getParams: function() {
					let row = this.$router.history.current.query.row;
					/* 订单信息 */
					this.row = row;
					
					
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
	
					this.doSearch(row.orderId);
	
				},
				/* 查询 */
				doSearch: function(str) {
					let url = this.axios.urls.CUSTOMER_ORDERS_PRODUCT;
	
					let params = {
						oddOrderId: str,
					}
	
					this.axios.post(url, params).then(resp => {
						// console.log(resp.data.data);
						// 
						
						this.result = resp.data.data
						this.total = resp.data.total
						
						let CountSum=0;
						/* 计算每个订单明细的总价 */
						for(let i of this.result){
							i.sum=i.oddCount*i.prodPrice;
							CountSum+=i.sum;
						}
						
						this.row.CountSum=CountSum;
						
						// console.log(this.result);
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
					//返回必须带着客户id返回
					let a={custNo:this.row.orderCustomerNo};
					console.log(a);
					this.$router.push({
						path: '/cst/cst_customer_info',
						/* 通过路由传递参数过去 */
						query: {
							row: a
						}
					});
				},
				//返回历史订单
				backOrders:function(){
					
					//返回历史订单的时候必须带着客户id返回
					let a={custNo:this.row.orderCustomerNo};
					console.log(a);
					this.$router.push({
						
						path:'/cst/cst_customer_orders',
						/* 通过路由传递参数过去 */
						query:{
							row:a
						}
					});
				},
				/* 订单明细 */
				checkOrder:function(row){
					this.$router.push({
						path: '/cst/cst_customer_order_Product',
						/* 通过路由传递参数过去 */
						query: {
							row: this.row
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
