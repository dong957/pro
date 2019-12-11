<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator=">" style="margin-top: 20px;margin-left: 20px;">
			<el-breadcrumb-item><a href="#/service_watch"  style="font-size: 20px;" >客户服务管理 </a></el-breadcrumb-item>
			<el-breadcrumb-item><a style="font-size: 20px;">服务信息查看</a></el-breadcrumb-item>
			
		</el-breadcrumb>
			
		<div style="width: 1580px;">
			
			<el-form :inline="true" style="margin-top: 40px;">
				<el-form-item label="编号" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input readonly v-model="service.svrId" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="服务类型" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input readonly v-model="service.svrType" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="概要" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input readonly v-model="service.svrTitle" autocomplete="off" :style="{width:'967px'}"></el-input>
				</el-form-item>
				<el-form-item label="客户" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input readonly v-model="service.svrCustName" autocomplete="off" :style="{width:formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="状态" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input readonly v-model="service.svrStatus" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="服务请求" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input readonly v-model="service.svrRequest" autocomplete="off" :style="{width: '967px'}"></el-input>
				</el-form-item>
				<el-form-item label="创建人" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input readonly v-model="service.svrCreateBy" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
					<el-form-item label="创建时间" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input readonly v-model="service.svrCreateDate" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				
				<div>
					&nbsp;
				</div>
				
				<el-form-item label="分配给" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input readonly  v-model="service.svrDueTo" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="分配时间" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input readonly  v-model="service.svrDueDate" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<div>
					&nbsp;
				</div>
				
				<el-form-item label="服务处理" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input  readonly v-model="service.svrDeal" autocomplete="off" type="textarea" resize="none" :rows="6" :style="{width: '967px'}"></el-input>
				</el-form-item>
				<el-form-item label="处理人" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input readonly  v-model="service.svrDueTo" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="处理时间" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input readonly  v-model="service.svrDueDate" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				
				<div>
					&nbsp;
				</div>
				
				<el-form-item label="处理结果" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input readonly  v-model="service.svrResult" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="满意度" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<div  style="background-color: white;height: 40px;" >
						<div style="height: 10px;">&nbsp;</div>
						 <el-rate readonly v-model="service.svrSatisfy" style="width:300px;"   show-text ></el-rate>
					</div>
				</el-form-item>
				
				
				
			</el-form>

		</div>




	</div>
</template>

<script>
	export default {
		name: 'service_watch_do',
		data: function() {
			return {
				//统一控制标签的宽度
				formLabelWidth: '350px',
				//统一控制表单元素的宽度
				formEleWidth: '300px',
				service:[],
				svrResult:'',
				svrSatisfy:0
			}
		},
		methods: {
			/* 获取路由跳转是传递过来的参数 */
			getParams: function() {
				let row = this.$router.history.current.query.row;
			
				this.service = row;
				console.log(this.service);
			},
			feedback:function(){
				
				let url =this.axios.urls.SERVICE_MANAGE_FEEDBACK;
				
				let params={
					svrId:this.service.svrId,
					svrResult:this.svrResult,
					svrSatisfy:this.svrSatisfy
				}
				
				this.axios.post(url,params).then(resp=>{
					if (resp.data.success) {
						this.$message({
							message: resp.data.msg,
							type: 'success'
						})
						
						this.$router.push({
							path:'/service_feedback',
						})
					} else {
						this.$message({
							message: resp.data.msg,
							type: 'error'
						})
						this.$router.push({
							path:'/service_feedback',
						})
					}
				}).catch(resp=>{
					
				})
				
				
			}
		},
		created:function(){
			this.getParams();
		}
	}
</script>

<style>
</style>
