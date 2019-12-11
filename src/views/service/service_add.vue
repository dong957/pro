<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator=">" style="margin-top: 20px;margin-left: 20px;">
			<el-breadcrumb-item><a style="font-size: 20px;" >客户服务管理</a></el-breadcrumb-item>
			<el-breadcrumb-item><a style="font-size: 20px;">服务创建</a></el-breadcrumb-item>
			
		</el-breadcrumb>
			
		<div style="width: 1580px;">
			<div style="margin-left: 900px;margin-bottom: 10px;">
				<el-button @click="doService('serviceFrom')" style="margin-top;">保存</el-button>
			</div>
			<el-form :rules="rules" ref="serviceFrom" :model="serviceFrom" :inline="true" style="margin-top: 60px;">
				<el-form-item label="客户编号"  prop="svrCustNo" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input  v-model="serviceFrom.svrCustNo" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="服务类型" prop="svrType"  :label-width="formLabelWidth" style="background-color: cornsilk;">
					
					<el-select  v-model="serviceFrom.svrType" autocomplete="off" :style="{width: formEleWidth}">
						<el-option 
							v-for="item in serviveType"
							:key="item.dict_value"
							:label="item.dict_item"
							:value="item.dict_item">
						</el-option>
						
					</el-select>
				</el-form-item>
				<el-form-item label="概要" prop="svrTitle" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input  v-model="serviceFrom.svrTitle" autocomplete="off" :style="{width:'967px'}"></el-input>
				</el-form-item>
				<el-form-item label="客户" prop="svrCustName" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input  v-model="serviceFrom.svrCustName" autocomplete="off" :style="{width:formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="状态" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input readonly v-model="serviceFrom.svrStatus" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="服务请求"prop="svrRequest" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input  v-model="serviceFrom.svrRequest" autocomplete="off" type="textarea" resize="none" :rows="8" :style="{width: '967px'}"></el-input>
				</el-form-item>
				<el-form-item label="创建人" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input readonly v-model="serviceFrom.svrCreateBy" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="创建时间" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input readonly  v-model="serviceFrom.svrCreateDate" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				
			</el-form>

		</div>




	</div>
</template>

<script>
	export default {
		name: 'service_add',
		data: function() {
			return {
				//统一控制标签的宽度
				formLabelWidth: '350px',
				//统一控制表单元素的宽度
				formEleWidth: '300px',
				
				serviceFrom:{
					svrType:'咨询',
					svrTitle:'',
					svrCustNo:'',
					svrCustName:'',
					svrStatus:'新创建',
					svrRequest:'',
					svrCreateId:this.$store.getters.getUser.user_id,
					svrCreateBy:this.$store.getters.getUser.user_name,
					svrCreateDate:''
				},
				//客户服务类型
				serviveType:[],
				
				rules:{
					svrCustNo:[{
						required:true,
						message:'请输入客户编号',
						trigger:'blur'
					}],
					svrType:[{
						required:true,
						meaasge:'请输入服务类型',
						trigger:'change'
					}],
					svrTitle:[{
						required:true,
						message:'请输入概要',
						trigger:'blur'
					}],
					svrCustName:[{
						required:true,
						message:'请输入客户姓名',
						trigger:'blur'
					}],
					svrRequest:[{
						required:true,
						message:'请输入服务请求',
						trigger:'blur'
					}]
				}
			}
		},
		methods: {
			/* 创建时间 默认为当前系统时间 */
			getCreateTime:function(){
				setInterval(() => {
					//new Date() new一个data对象，当前日期和时间
					//toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
					// this.serviceFrom.svrCreateDate = new Date().toLocaleString();
					
					var myDate = new Date(); 
					var str = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds();
					this.serviceFrom.svrCreateDate =str;
				}, 1000)
			},
			//获取服务类型
			getSvrType:function(){
				
				let url=this.axios.urls.BASICS_MANAGE_LISTBYTYPE;
				
				this.axios.post(url,{dict_type:'客户服务类型'}).then(resp=>{
					if (resp.data.success) {
						this.serviveType=resp.data.data;
					} 
				}).catch(resp=>{
					console.log(resp);
				})
				
				
			},
			doService:function(serviceFrom){
				this.$refs[serviceFrom].validate((valid) => {
					if (valid) {
						this.saveService();
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			/* 保存 */
			saveService:function(){
				let url=this.axios.urls.SERVICE_MANAGE_ADD;
				
				this.axios.post(url,this.serviceFrom).then(resp=>{
					if (resp.data.success) {
						this.$message({
							message: resp.data.msg,
							type: 'success'
						})
						this.clear();
					} else {
						this.$message({
							message: resp.data.msg,
							type: 'error'
						})
					}
				}).catch(resp=>{
					
				})
			},
			clear:function(){
				this.serviceFrom.fsvrType='';
				this.serviceFrom.svrTitle='';
				this.serviceFrom.svrCustNo='';
				this.serviceFrom.svrCustName='';
				// this.serviceFrom.svrStatus='新创建';
				this.serviceFrom.svrRequest='';
				// this.serviceFrom.svrCreateId=this.$store.getters.getUser.user_id;
				// this.serviceFrom.svrCreateBy=this.$store.getters.getUser.user_name;
				// this.serviceFrom.svrCreateDate='';
			}
		},
		created:function(){
			this.getSvrType();
			this.getCreateTime();
			
		}
	}
</script>

<style>
</style>
