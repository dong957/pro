<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator=">" style="margin-top: 20px;margin-left: 20px;">
			<el-breadcrumb-item><a href="#/cst/cst_customer" style="font-size: 20px;">客户信息管理 </a></el-breadcrumb-item>
			<el-breadcrumb-item><a  style="font-size: 20px;">客户信息 </a></el-breadcrumb-item>
		</el-breadcrumb>
		
		
		<div style="width: 1580px;">
			<div style="margin-left: 600px;;">
				<el-button @click="goLinkman" >联系人</el-button>
				<el-button @click="goAtv">交往记录</el-button>
				<el-button @click="goOrders">历史订单</el-button>
				<el-button @click="backCustomer">返回</el-button>
				<el-button @click="CustomerRule('result')" >保存</el-button>
			</div>
			<el-form :rules="rules" ref="result" :model="result" :inline="true" style="margin-top: 10px;">
				<el-form-item label="客户编号" :label-width="formLabelWidth" style="background-color: skyblue;">
					<el-input disabled v-model="result.custNo" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="名称" prop="custName" :label-width="formLabelWidth"  style="background-color: skyblue;">
					<el-input v-model="result.custName" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="地区" :label-width="formLabelWidth"  style="background-color: skyblue;">
					<el-input  v-model="result.custRegin" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="客户经理" :label-width="formLabelWidth"  style="background-color: skyblue;">
					<el-input  v-model="result.custManageName" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="客户等级" :label-width="formLabelWidth"  style="background-color: skyblue;">
					
					<el-select v-model="result.custLevelLabel"  @change="selectNo" :style="{width: formEleWidth}">
						<el-option 
						 v-for="item in level"
						:key="item.dict_value"
						:label="item.dict_item"
						:value="item.dict_item">
						  </el-option>
						  
					</el-select>
					
				</el-form-item>
				<!-- 占位置的空 -->
				<el-form-item label=" " :label-width="formLabelWidth"  style="background-color: skyblue;">
					<el-input  type="text" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				
				<el-form-item label="客户满意度" :label-width="formLabelWidth" style="background-color: skyblue;">
					<div  style="background-color: white;height: 40px;" >
						<div style="height: 10px;">&nbsp;</div>
						 <el-rate v-model="result.custSatisfy" style="width:300px;"  show-text ></el-rate>
					</div>
					
				</el-form-item>
				<el-form-item label="客户信用度" :label-width="formLabelWidth"  style="background-color: skyblue;">
					<div  style="background-color: white;height: 40px;" >
						<div style="height: 10px;">&nbsp;</div>
						 <el-rate v-model="result.custCredit" style="width:300px;"  show-text ></el-rate>
					</div>
				</el-form-item>
				<div>&nbsp;</div>
				<div>&nbsp;</div>
				<el-form-item label="地址" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input  v-model="result.custAddr" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="邮政编码" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input  v-model="result.custZip" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="电话" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input  v-model="result.custTel" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="传真" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input  v-model="result.custFax" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="网站" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input  v-model="result.custWebsite" autocomplete="off" :style="{width: '967px'}"></el-input>
				</el-form-item>
				<div>&nbsp;</div>
				<div>&nbsp;</div>
				<el-form-item label="营业执照注册号" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input  v-model="result.custLicenceNo" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="法人" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input  v-model="result.custChieftain" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="注册资金(万元)" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input  v-model="result.custBankroll" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="年营业额" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input  v-model="result.custTurnover" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="开户银行" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input  v-model="result.custBank" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="银行账号" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input  v-model="result.custBankAccount" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="地税登记号" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input  v-model="result.custLocalTaxNo" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="国税登记号" :label-width="formLabelWidth" style="background-color: cornsilk;">
					<el-input  v-model="result.custNationlTaxNo" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
					
					
			</el-form>

		</div>




	</div>
</template>

<script>
	export default {
		name: 'cst_customer_info',
		data: function() {
			return {
				result: [],
				level:[],
				
				//统一控制标签的宽度
				formLabelWidth: '350px',

				//统一控制表单元素的宽度
				formEleWidth: '300px',
				rules:{
					custName: [{
						required: true,
						message: '请输入客户名称',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			/* 获取路由跳转是传递过来的参数 */
			getParams:function(){
				let row=this.$router.history.current.query.row;
				this.result=row;
				//console.log(row);
				/* 在没有加载之前
				* 做一个判断
				* 用于判断是否是正常跳转路由
				*  */
				if(this.result.length==0){
					this.$router.push({path:'/cst/cst_customer'});
				}
			},
			/* 获取客户级别 */
			getLevl:function(){
				
				this.level=this.$store.getters.getCustLevel;
				
				// console.log(this.level);
				
				/* 循环获取到的企业客户级别 */
				for(let i of this.level){
					
					if(i.dict_value == this.result.custLevel){
						this.result.custLevelLabel=i.dict_item;
					}
				}
				
				
			},
			//提交前验证
			CustomerRule:function(result){
					this.$refs[result].validate((valid) => {
					if (valid) {
						this.saveCustomer()();
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			/* 修改客户信息 */
			saveCustomer:function(){
				let url=this.axios.urls.CUSTOMER_MANAGE_UPDATE;
				
				
				/* 循环获取到的企业客户级别 */
				for(let i of this.level){
					/* 
					* 设置对应客户级别的id
					* 放入客户信息表
					*  */
					if(i.dict_item == this.result.custLevelLabel){
						
						this.result.custLevel=i.dict_value;
					}
				}
				
				
				this.axios.post(url,this.result).then(resp=>{
					//console.log(this.result.custLevel);
					if (resp.data.success) {
						this.$message({
							message: resp.data.msg,
							type: 'success'
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
			/* 清空绑定的值 */
			selectNo:function(row){
				// console.log(row);
			},
			/* 跳转联系人路由 */
			goLinkman:function(){
				// console.log(this.result.custNo)
				this.$router.push({
					path:'/cst/cust_customer_linkman',
					/* 通过路由传递参数过去 */
					query:{
						row:this.result
					}
				});
			},
			/* 跳转交往记录 */
			goAtv:function(){
				this.$router.push({
					path:'/cst/cst_customer_atv',
					/* 通过路由传递参数过去 */
					query:{
						row:this.result,
					}
				});
			},
			goOrders:function(){
				this.$router.push({
					path:'/cst/cst_customer_orders',
					/* 通过路由传递参数过去 */
					query:{
						row:this.result,
					}
				});
			},
			backCustomer:function(){
				this.$router.push('/cst/cst_customer')
			}
		},
		created() {
			//在模板编译进路由前调用created方法，触发接收函数
            let self = this;
			
			/* 传递参数 */
            self.getParams();
			
			//客户级别
			self.getLevl();
        }
		
	}
</script>

<style>
</style>

