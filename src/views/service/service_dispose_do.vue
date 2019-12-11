<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator=">" style="margin-top: 20px;margin-left: 20px;">
			<el-breadcrumb-item><a href="#/service_dispose" style="font-size: 20px;">客户服务管理 </a></el-breadcrumb-item>
			<el-breadcrumb-item><a style="font-size: 20px;">服务处理</a></el-breadcrumb-item>

		</el-breadcrumb>

		<div style="width: 1580px;">
			<div style="margin-left: 900px;margin-bottom: 10px;">
				<el-button @click="dispose" style="margin-top;">保存</el-button>
			</div>
			<el-form  :inline="true" style="margin-top: 60px;">
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
					<el-input readonly v-model="service.svrDueTo" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="分配时间" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input readonly v-model="service.svrDueDate" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<div>
					&nbsp;
				</div>

				<el-form-item label="服务处理" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input v-model="service.svrDeal" autocomplete="off" type="textarea" resize="none" :rows="6" :style="{width: '967px'}"></el-input>
				</el-form-item>
				<el-form-item label="处理人" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input readonly v-model="user" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="处理时间" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input readonly v-model="time" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
			</el-form>

		</div>




	</div>
</template>

<script>
	export default {
		name: 'service_feedback',
		data: function() {
			return {
				//统一控制标签的宽度
				formLabelWidth: '350px',
				//统一控制表单元素的宽度
				formEleWidth: '300px',
				time: '',
				user: this.$store.getters.getUser.user_name,
				service: [],
				rules: {
					svrDeal: [{
						required: true,
						message: '请输入服务处理',
						trigger: 'blur'
					}]
				}
			}

		},
		methods: {
			/* 创建时间 默认为当前系统时间 */
			getCreateTime: function() {
				setInterval(() => {
					//new Date() new一个data对象，当前日期和时间
					//toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
					// this.serviceFrom.svrCreateDate = new Date().toLocaleString();

					var myDate = new Date();
					var str = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate() + " " + myDate.getHours() +
						":" + myDate.getMinutes() + ":" + myDate.getSeconds();
					this.time = str;
				}, 1000)
			},
			/* 获取路由跳转是传递过来的参数 */
			getParams: function() {
				let row = this.$router.history.current.query.row;

				this.service = row;
				// console.log(row);
				/* 在没有加载之前
				 * 做一个判断
				 * 用于判断是否是正常跳转路由
				 *  */
				// if(this.row == null){
				// 	this.$router.push({path:'/cst/cst_customer_info'});
				// }
				console.log(this.service);
			},
			dodispose: function(service) {
				this.$refs[service].validate((valid) => {
					if (valid) {
						this.dispose();
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			dispose: function() {

				let url = this.axios.urls.SERVICE_MANAGE_DISPOSE;

				let params = {
					svrId: this.service.svrId,
					svrStatus: '已处理',
					svrDeal: this.service.svrDeal,
					svrDealId: this.$store.getters.getUser.user_id,
					svrDealBy: this.user,
					svrDealDate: this.time
				}

				this.axios.post(url, params).then(resp => {
					if (resp.data.success) {
						this.$message({
							message: resp.data.msg,
							type: 'success'
						})

						this.$router.push({
							path: '/service_dispose',
						})
					} else {
						this.$message({
							message: resp.data.msg,
							type: 'error'
						})
					}
				}).catch(resp => {

				})


			}
		},
		created: function() {
			this.getParams();
			this.getCreateTime();
		}
	}
</script>

<style>
</style>
