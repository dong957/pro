<template>
	<div>
		<!-- 面包屑 -->
		
		<el-breadcrumb separator="" style="margin-top: 20px;margin-left: 20px;">
			<el-breadcrumb-item><a style="font-size: 20px;">客户信息管理</a></el-breadcrumb-item>
		
			<!-- 搜索栏 -->
			<el-form :inline="true" class="demo-form-inline" style="margin-top: 50px;">
				<el-form-item label="客户:">
					<el-input v-model="lstCustName" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="客户经理:">
					<el-input v-model="lstCustMangerName" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="状态:">
					<el-select v-model="status">
						<el-option v-for="item in lstStatus" :key="item.label" :label="item.label" :value="item.value" ></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" @click="doSearch">查询</el-button>
				</el-form-item>
			</el-form>
		
			<!-- 数据表格 -->
			<el-table :data="result" style="width: 100%;" :border="true" max-height="700">
				<el-table-column prop="lstId" label="编号" min-width="80"></el-table-column>
				<el-table-column prop="lstCustName" label="客户" min-width="80"></el-table-column>
				<el-table-column prop="lstCustMangerName" label="客户经理" min-width="100"></el-table-column>
				<el-table-column prop="lstLostOrderDate" label="上次下单时间" min-width="100"></el-table-column>
				<el-table-column prop="lstLostDate" label="确认流失时间" min-width="100"></el-table-column>
				<el-table-column prop="lstStatus" label="状态" min-width="100"></el-table-column>
				
				<el-table-column label="操作" min-width="120" >
					<!--
					在<template>上使用特殊的slot-scope 特性，可以接收传递给插槽的prop
					slot-scope:类似将每一行的row对象封装到槽中，之后直接从scope中获取
					row对象信息和行索引index信息即可
					-->
					<template slot-scope="scope"  >
						<el-button size="mini" type="danger" @click="deferButton(scope.row)" icon="el-icon-time"></el-button>
						
						<el-button size="mini" type="danger" v-show="scope.row.lstStatus == '暂缓流失' " @click="confirmButton(scope.row)" icon="el-icon-mouse">确认流失</el-button>
						
					</template>
					
				</el-table-column>
				
				
			</el-table>
		</el-breadcrumb>
		
		<el-pagination style="margin-top: 15px;" @size-change="sizeChange" @current-change="handleCurrentChange"
		 :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper"
		 :total="total">
		</el-pagination>
		
		
		
		<!-- 新增 修改的表单 -->
		<el-dialog :title="dialogName" :visible.sync="dialogFormVisible" @close="closeForm" width="1000px">
			<el-form :model="deferLost" :inline="true" class="demo-form-inline">
				<el-form-item label="编号" :label-width="formLabelWidth">
					<el-input readonly v-model="deferLost.lstId" autocomplete="off" :style="{width:formEleWidth}" :disabled="true" type="textarea" resize="none"></el-input>
				</el-form-item>
				<el-form-item label="客户" :label-width="formLabelWidth">
					<el-input readonly v-model="deferLost.lstCustName" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="客户经理" :label-width="formLabelWidth">
					<el-input readonly v-model="deferLost.lstCustMangerName" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="上次下单时间" :label-width="formLabelWidth">
					<el-input readonly v-model="deferLost.lstLostOrderDate" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="暂缓措施" style="width:800px">
					<el-input readonly type="textarea"  v-model="deferLost.lstDelay" autocomplete="off" :rows="4" resize="none" style='width: 680px;'></el-input>
				</el-form-item>
				<el-form-item v-show="optiontype=='defer'" label="追加暂缓措施" :label-width="formLabelWidth">
					<el-input type="textarea" v-model="deferLost.lstDelay" autocomplete="off"  :rows="7"  resize="none" style="width: 750px;"></el-input>
				</el-form-item>
				
				<el-form-item v-show="optiontype=='lstReason'" label="流失原因" :label-width="formLabelWidth">
					<el-input type="textarea" v-model="deferLost.lstReason" autocomplete="off"  :rows="7"  resize="none" style="width: 750px;"></el-input>
				</el-form-item>
				
			</el-form>
			<div slot="footer" class="dialog-footer" align="center">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveLost">确 定</el-button>
			</div>
		</el-dialog>
		
	</div>
</template>

<script>
	export default{
		name:'cst_lost',
		data:function(){
			return{
				lstCustName: '',
				lstCustMangerName: '',
				lstStatus:[
				{
					value:'1',
					label:'预警'
				},
				{
					value:'2',
					label:'暂缓流失'
				}],
				status:'',
				result: [],
				page: 1,
				rows: 10,
				total: 0,
				
				/* 弹窗打开 */
				dialogFormVisible:false,
				
				//统一控制标签的宽度
				formLabelWidth: '100px',
				
				//统一控制表单元素的宽度
				formEleWidth: '300px',
				
				/* 弹窗名字 */
				dialogName:'暂缓流失',
				
				/*弹窗默认打开的
				* 状态是暂缓
				*  */
				optiontype:'defer',
				
				deferLost:{
					lstId:'',
					lstCustNo:'',
					lstCustName:'',
					lstCustMangerId:'',
					lstCustMangerName:'',
					lstLostOrderDate:'',
					lstLostDate:'',
					lstDelay:'',
					lstReason:'',
					lstStatus:''
				},
				//追加暂缓措施
				SavelstDelay:''
			}
		},
		methods:{
			/* 查询 */
			doSearch: function() {
				let url = this.axios.urls.CUSTOMER_LOST_PAGES;
				
				
				
				let params = {
					lstCustName: this.custName,
					lstCustMangerName: this.custManageName,
					lstStatus:this.status,
					rows: this.rows,
					page: this.page
				}
			
				
				this.axios.post(url, params).then(resp => {
					// console.log(resp.data.data);
					
					for(let i of resp.data.data){
						if(i.lstStatus == 1 ){
							i.lstStatus='预警';
						}
						else if(i.lstStatus == 2){
							i.lstStatus='暂缓流失';
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
			//当关闭对话框时，该方法用于清空表单
			closeForm: function() {
				this.deferLost.lstId ='';
				this.deferLost.lstCustNo = '';
				this.deferLost.lstCustName ='';
				this.deferLost.lstCustMangerId = '';
				this.deferLost.lstCustMangerName = '';
				this.deferLost.lstLostOrderDate = '';
				this.deferLost.lstLostDate = '';
				this.deferLost.lstDelay = '';
				this.deferLost.lstReason = '';
				this.deferLost.lstStatus = ''
			},
			/* 客户信息 */
			customerInfo:function(row){
				/* 通过路由传递参数过去 */
				/* this.$router.push({
					path:'/cst/cst_customer_info',
					query:{
						row:row
					}
				}); */
			},
			/* 暂缓流失按钮 */
			deferButton:function(row){
				this.dialogName = '暂缓流失';
				this.dialogFormVisible = true;
				this.optiontype = 'defer';
				
				this.deferLost.lstId =row.lstId;
				this.deferLost.lstCustNo =row.lstCustNo;
				this.deferLost.lstCustName =row.lstCustName;
				this.deferLost.lstCustMangerId = row.lstCustMangerId;
				this.deferLost.lstCustMangerName = row.lstCustMangerName;
				this.deferLost.lstLostOrderDate = row.lstLostOrderDate;
				this.deferLost.lstLostDate = row.lstLostDate;
				this.deferLost.lstDelay = row.lstDelay;
				this.deferLost.lstReason = row.lstReason;
				this.deferLost.lstStatus = row.lstStatus;
			},
			/* 暂缓流失按钮 */
			confirmButton:function(row){
				this.dialogName = '确认流失';
				this.dialogFormVisible = true;
				this.optiontype = 'lstReason';
				
				this.deferLost.lstId =row.lstId;
				this.deferLost.lstCustNo =row.lstCustNo;
				this.deferLost.lstCustName =row.lstCustName;
				this.deferLost.lstCustMangerId = row.lstCustMangerId;
				this.deferLost.lstCustMangerName = row.lstCustMangerName;
				this.deferLost.lstLostOrderDate = row.lstLostOrderDate;
				this.deferLost.lstLostDate = row.lstLostDate;
				this.deferLost.lstDelay = row.lstDelay;
				this.deferLost.lstReason = row.lstReason;
				this.deferLost.lstStatus = row.lstStatus;
			},
			//确认
			saveLost:function(){
				
				let url=this.axios.urls.CUSTOMER_LOST_DEFER;
				
				
				//确认流失
				if(this.optiontype == 'lstReason'){
					url=this.axios.urls.CUSTOMER_LOST_CONFIRM;
				}
				
				this.axios.post(url,this.deferLost).then(resp=>{
					if (resp.data.success) {
						this.$message({
							message: resp.data.msg,
							type: 'success'
						})
						this.dialogFormVisible = false;
						this.doSearch();
					} else {
						this.$message({
							message: resp.data.msg,
							type: 'error'
						})
					}
				}).catch(resp=>{
					console.log();
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
