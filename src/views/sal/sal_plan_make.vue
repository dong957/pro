<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator=">" style="margin-top: 20px;margin-left: 20px;">
			<el-breadcrumb-item><a href="#/sal/sal_plan" style="font-size: 20px;">客户开发计划 </a></el-breadcrumb-item>
			<el-breadcrumb-item><a  style="font-size: 20px;">制定计划 </a></el-breadcrumb-item>
			
		</el-breadcrumb>
			
		<div style="width: 1580px;">
			<div style="margin-left: 600px;;">
				<el-button @click="goExecute">执行计划</el-button>
				<el-button @click="backPlan"  >返回</el-button>
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

			<div style="margin: 10px">
				<el-table :data="result" style="width: 100%;" size="mini" :border="true" max-height="130" :header-cell-style="{background:'royalblue'}">
					<el-table-column prop="pla_date" label="日期" min-width="120">
					</el-table-column>
					<el-table-column prop="pla_todo" label="计划内容" min-width="220">
						<template slot-scope="scope">
						<el-input type="text" v-model="scope.row.pla_todo"></el-input>
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
							<el-button size="mini" @click="delPlan(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>

			<div style="margin: 10px">
				<el-form :model="formPlan"  :inline="true" class="demo-ruleForm">
					<div style=" margin-left: 1150px; ">
						<el-button type="primary" @click="savePlan()">保存</el-button>
					</div>
					<div>&nbsp;</div>
					
					<el-form-item label="日期" :label-width="'115px'" style="background-color: skyblue;">
						<el-date-picker  value-format="yyyy年MM月dd日" v-model="formPlan.pla_date" align="right" type="date" placeholder="选择日期"  :picker-options="pickerOptions">
						</el-date-picker>
					</el-form-item>
					
					<el-form-item label="计划项" :label-width="'100px'" style="background-color: skyblue;">
						<el-input v-model="formPlan.pla_todo" autocomplete="off" :style="{width: '1000px'}"></el-input>
					</el-form-item>

				</el-form>
			</div>

		</div>




	</div>
</template>

<script>
	export default {
		name: 'sal_plan_make',
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
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
				result: [],
				//统一控制标签的宽度
				formLabelWidth: '350px',


				//统一控制表单元素的宽度
				formEleWidth: '300px',
				
				/* 验证 */
				rules: {
                	date1: [
                   		{  required: true,message:"不能为空" ,trigger: 'change' }
               		],
                	todo: [
                    	{  required: true,message:"不能为空"  ,trigger: 'blur' }
                	]
            	}
				
			}
		},
		methods: {
			/* 获取路由跳转是传递过来的参数 */
			getParams:function(){
				let row=this.$router.history.current.query.row;
				this.chanceForm=row;
				console.log(this.chanceForm);
				/* 在没有加载之前
				* 做一个判断
				* 用于判断是否是正常跳转路由
				*  */
				if(this.chanceForm.length==0){
					this.$router.push({path:"/sal/sal_plan"});
				}
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
			/* 修改计划内容 */
			updatePlan: function(row) {
				
				let url=this.axios.urls.SALPLAN_MANAGE_UPDATETO;
				
				
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
			/* 删除营销计划 */
			delPlan:function(row){
				
				this.$confirm('此操作将永久删除该计划, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let url=this.axios.urls.SALPLAN_MANAGE_DELETE;
					
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
				}).catch(() => {
					
				});
				
				
			},
			/* 保存计划日期和计划内容 */
			savePlan: function() {
				
				
				 // this.$refs['formPlan'].validate((valid)=>{
					// alert(valid);
					// if(valid){
						let url=this.axios.urls.SALPLAN_MANAGE_SAVE;
						
						this.formPlan.pla_chc_id=this.chanceForm.chc_id;
						
						this.axios.post(url,this.formPlan).then(resp=>{
							if (resp.data.success) {
								this.$message({
									message: resp.data.msg,
									type: 'success'
								})
								/* 清空保存的东西 */
								this.formPlan.pla_date=null;
								this.formPlan.pla_todo=null;
								this.getChancePlan();
							} else {
								this.$message({
									message: resp.data.msg,
									type: 'error'
								})
							}
						}).catch(resp=>{
							
						})
						
				// 	}
				// 	else{
				// 		 console.log('error submit!!');
				// 		 return false;
				// 	}
				// });
			},
			goExecute:function(){
				this.$router.push({
					path:'/sal/sal_plan_execute',
					/* 通过路由传递参数过去 */
					query:{
						row:this.chanceForm
					}
				});
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
