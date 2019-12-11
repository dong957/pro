<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator=">" style="margin-top: 20px;margin-left: 20px;">
			<el-breadcrumb-item><a href="#/sal/sal_plan" style="font-size: 20px;">客户开发计划 </a></el-breadcrumb-item>
			<el-breadcrumb-item><a style="font-size: 20px;">执行计划 </a></el-breadcrumb-item>
			
		</el-breadcrumb>
			
		<div style="width: 1580px;">
			<div style="margin-left: 600px;;">
				<el-button icon="el-icon-video-pause" @click="stopPlan">终止开发</el-button>
				<el-button @click="backPlan">返回</el-button>
				<el-button @click="goMakePlan">制定计划</el-button>
				<el-button @click="succeed">开发成功</el-button>
			</div>
			<el-form :model="chanceForm" :inline="true" style="margin-top: 10px;">
				
				<el-form-item label="编号" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input readonly v-model="chanceForm.chc_id" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="机会来源" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input readonly v-model="chanceForm.chc_soure" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="客户名称" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input readonly v-model="chanceForm.chc_cust_name" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="成功几率 %" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input readonly v-model="chanceForm.chc_rate" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="概要" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input readonly v-model="chanceForm.chc_cust_title" autocomplete="off" :style="{width: '967px'}"></el-input>
				</el-form-item>
				<el-form-item label="联系人" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input readonly v-model="chanceForm.chc_linkman" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="联系人电话" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input readonly v-model="chanceForm.chc_tel" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="机会描述" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input readonly v-model="chanceForm.chc_desc" autocomplete="off" :style="{width: '967px'}"></el-input>
				</el-form-item>
				<el-form-item label="创建人" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input readonly v-model="chanceForm.chc_create_by" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="创建时间" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input readonly v-model="chanceForm.chc_create_date" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>

				<el-form-item label="指派给" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input readonly v-model="chanceForm.chc_due_to" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>

				<el-form-item label="指派时间" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input readonly v-model="chanceForm.chc_due_date" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>

			</el-form>

			<div style="margin-top: 30px">
				<el-table :data="result" style="width: 100%;" size="mini" :border="true" max-height="130" :header-cell-style="{background:'royalblue'}">
					<el-table-column prop="pla_date" label="日期" min-width="120" align="center">
					</el-table-column>
					<el-table-column prop="pla_todo" label="计划内容" min-width="120" align="center">
					</el-table-column>
					<el-table-column prop="pla_result" label="计划内容" min-width="180" align="center">
						<template slot-scope="scope">
						<el-input type="text" v-model="scope.row.pla_result"></el-input>
						</template>
					</el-table-column>
					<!--
					在<template>上使用特殊的slot-scope 特性，可以接收传递给插槽的prop
					slot-scope:类似将每一行的row对象封装到槽中，之后直接从scope中获取
					row对象信息和行索引index信息即可
					-->
					<el-table-column label="" min-width="70">
						<template slot-scope="scope">
							<el-button size="mini" @click="updatePlan(scope.row)">保存</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>

			

		</div>




	</div>
</template>

<script>
	export default {
		name: 'sal_plan_execute',
		data: function() {
			return {
				chanceForm: {
					chc_id: '',
					chc_soure: '',
					chc_cust_name: '',
					chc_rate: 0,
					chc_cust_title: '',
					chc_linkman: '',
					chc_tel: '',
					chc_desc: '',
					chc_create_by: '',
					chc_create_date: '',
					chc_due_id: '',
					chc_due_to: '',
					chc_due_date: ''
				},
				formPlan: {
					pla_chc_id:'',
					pla_date:'',
					pla_todo:''
				},
				result: [],
				//统一控制标签的宽度
				formLabelWidth: '350px',


				//统一控制表单元素的宽度
				formEleWidth: '300px',
			}
		},
		methods: {
			/* 获取路由跳转是传递过来的参数 */
			getParams:function(){
				let row=this.$router.history.current.query.row;
				this.chanceForm=row;
				
				/* 在没有加载之前
				* 做一个判断
				* 用于判断是否是正常跳转路由
				*  */
				if(this.chanceForm.length==0){
					this.$router.push({path:"/sal/sal_plan"});
				}
			},
			/* 跳转 制定计划 */
			goMakePlan:function(){
				this.$router.push({
					path:'/sal/sal_plan_make',
					/* 通过路由传递参数过去 */
					query:{
						row:this.chanceForm
					}
				});
			},
			/* 终止开发 */
			stopPlan:function(){
				let url=this.axios.urls.SALCHANCE_MANAGE_STOP;
				
				this.axios.post(url,{
					chc_id:this.chanceForm.chc_id,
					chc_status:4
					}).then(resp=>{
					if (resp.data.success) {
						this.$message({
							message: resp.data.msg,
							type: 'success'
						})
						this.$router.push({path:'/sal/sal_plan'});
					} else {
						this.$message({
							message: resp.data.msg,
							type: 'error'
						})
					}
				}).catch(resp=>{
					console.log(resp);
				})
				
				
			},
			/* 获取营销机会的计划 */
			getChancePlan:function(){
				let url=this.axios.urls.SALPLAN_MANAGE_LISTBY+"?pla_chc_id="+this.chanceForm.chc_id;
				
				this.axios.post(url).then(resp=>{
					this.result=resp.data.data;
					
				}).catch(resp=>{
					console.log(resp);
				})
			},
			/* 修改计划结果 */
			updatePlan: function(row) {
				
				let url=this.axios.urls.SALPLAN_MANAGE_UPDATERESULT;
				
				this.axios.post(url,row).then(resp=>{
					if (resp.data.success) {
						this.$message({
							message: resp.data.msg,
							type: 'success'
						})
						this.getChancePlan();
					} else {
						this.$message({
							message: resp.data.msg,
							type: 'error'
						})
					}
				}).catch(resp=>{
					console.log(resp);
				})
			},
			/* 开发成功按钮 */
			succeed:function(){
				/* 开发成功
				* 添加客户信息，联系人信息
				* 然后再修改营销机会的状态
				*  */
				let url=this.axios.urls.CUSTOMER_MANAGE_ADD;
				this.axios.post(url,{
					custName:this.chanceForm.chc_cust_name,
					linkName:this.chanceForm.chc_linkman,
					linkTel:this.chanceForm.chc_tel
					}).then(resp=>{
					if (resp.data.success) {
						
						/* 修改营销机会状态 */
						let url=this.axios.urls.SALCHANCE_MANAGE_STOP;
						this.axios.post(url,{
							chc_id:this.chanceForm.chc_id,
							chc_status:3
							}).then(resp=>{
							if (resp.data.success) {
								this.$message({
									message: resp.data.msg,
									type: 'success'
								})
								/* 成功后回到营销计划 */
								this.$router.push({path:'/sal/sal_plan'});
							}else {
								this.$message({
									message: resp.data.msg,
									type: 'error'
								})
							}
						}).catch(resp=>{
							console.log(resp);
						})
						
						
						
					} else {
						this.$message({
							message: resp.data.msg,
							type: 'error'
						})
					}
				}).catch(resp=>{
					console.log(resp);
				})
			},
			backPlan:function(){
				this.$router.push({
					path:'/sal/sal_plan'
				});
			}
		},
		created() {
			//在模板编译进路由前调用created方法，触发接收函数
            let self = this;
			/* 传递参数 */
            self.getParams();
			
			/* 查询指定营销机会的计划 */
			this.getChancePlan();
        }
	}
</script>

<style>
</style>
