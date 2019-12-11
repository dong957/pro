<template>
	<div>
		<!-- 面包屑 -->

		<el-breadcrumb separator=">" style="margin-top: 20px;margin-left: 20px;">
			<el-breadcrumb-item><a href="#/cst/cst_customer" style="font-size: 20px;">客户信息管理 </a></el-breadcrumb-item>
			<el-breadcrumb-item><a @click="backCustInfo" style="font-size: 20px;">客户信息 </a></el-breadcrumb-item>
			<el-breadcrumb-item><a style="font-size: 20px;">交往记录</a></el-breadcrumb-item>



			<div align="right" style="margin-top: 40px;margin-right:99px;margin-bottom: 1px;">
				<el-button @click="addForm">新建</el-button>
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



			<!-- 数据表格 -->
			<el-table :data="result" style="width: 100%;margin-top: 20px;" :border="true" max-height="700">
				<el-table-column prop="atvDate" label="时间" min-width="80"></el-table-column>
				<el-table-column prop="atvPlace" label="地点" min-width="80"></el-table-column>
				<el-table-column prop="atvTitle" label="概要" min-width="100"></el-table-column>
				<el-table-column prop="atvRemark" label="备注" min-width="100"></el-table-column>
				<el-table-column prop="atvDesc" label="详细信息" min-width="100"></el-table-column>
				<el-table-column label="操作" min-width="100">
					<!--
					在<template>上使用特殊的slot-scope 特性，可以接收传递给插槽的prop
					slot-scope:类似将每一行的row对象封装到槽中，之后直接从scope中获取
					row对象信息和行索引index信息即可
					-->
					<template slot-scope="scope">
						<el-button size="mini" type="warning" @click="handleEdit(scope.row)" icon="el-icon-edit"></el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.row)" icon="el-icon-delete"></i></el-button>

					</template>
				</el-table-column>

			</el-table>
		</el-breadcrumb>

		<el-pagination style="margin-top: 15px;" @size-change="sizeChange" @current-change="handleCurrentChange"
		 :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper"
		 :total="total">
		</el-pagination>


		<!-- 新增 修改的表单 -->
		<el-dialog :title="dialogName" :visible.sync="dialogFormVisible" @close="closeForm">
			<el-form :rules="rules" ref="labelForm" :model="labelForm" :inline="true" class="demo-form-inline">
				<el-form-item v-show="optiontype == 'update'" label="编号" :style="{width: '600px'}">
					<el-input v-model="labelForm.atvId" :style="{width: '100px'}" :disabled="true" :rows="1" type="textarea" resize="none"></el-input>
				</el-form-item>
				<el-form-item label="时间:" :label-width="formLabelWidth">
					<el-date-picker v-model="labelForm.atvDate" value-format="yyyy年MM月dd日" type="date" placeholder="选择日期"
					 :picker-options="pickerOptions" :style="{width: formEleWidth}">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="地点:" prop="atvPlace" :label-width="formLabelWidth">
					<el-input v-model="labelForm.atvPlace" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="概要:" prop="atvTitle" :label-width="formLabelWidth">
					<el-input v-model="labelForm.atvTitle" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="备注:" prop="atvRemark" :label-width="formLabelWidth">
					<el-input v-model="labelForm.atvRemark" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="详细信息:" prop="atvDesc" :label-width="formLabelWidth">
					<el-input type="textarea" v-model="labelForm.atvDesc" :rows="5" :style="{width: '515px'}" resize="none"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer" align="center">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="doAtv('labelForm')">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		name: 'cst_customer_atv',
		data: function() {
			return {
				result: [], //分页数据
				row: [], //路由传递过来的数据
				page: 1,
				rows: 10,
				total: 0,


				//控制对话框是否显示，默认是隐藏状态
				dialogFormVisible: false,

				//统一控制标签的宽度
				formLabelWidth: '100px',

				//统一控制表单元素的宽度
				formEleWidth: '200px',

				//弹窗名称
				dialogName: '',
				//弹窗属性
				optiontype: 'add',

				labelForm: {
					atvId: '',
					atvCustNo: '',
					atvCustName: '',
					atvDate: '',
					atvPlace: '',
					atvTitle: '',
					atvRemark: '',
					atvDesc: ''
				},
				rules:{
					atvPlace:[{
						required:true,
						message:'请输入交往记录地点',
						trigger:'blur'
					}],
					atvTitle:[{
						required:true,
						message:'请输入概要',
						trigger:'blur'
					}],
					atvRemark:[{
						required:true,
						message:'请输入备注',
						trigger:'blur',
					}],
					atvDesc:[{
						required:true,
						message:'请输入详细信息',
						trigger:'blur'
					}]
					
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
				}
			}
		},
		methods: {
			/* 获取路由跳转是传递过来的参数 */
			getParams: function() {
				let row = this.$router.history.current.query.row;

				this.row = row;
				//console.log(row);
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
				let url = this.axios.urls.CUSTOMER_ACTICITY_QUERYPAGES;

				let params = {
					atvCustNo: str,
				}


				this.axios.post(url, params).then(resp => {
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
			//当关闭对话框时，该方法用于清空表单
			closeForm: function() {
				this.labelForm.atvId = '',
					this.labelForm.atvCustNo = '',
					this.labelForm.atvCustName = '',
					this.labelForm.atvDate = '',
					this.labelForm.atvPlace = '',
					this.labelForm.atvTitle = '',
					this.labelForm.atvRemark = '',
					this.labelForm.atvDesc = ''
			},

			//打开对话框，将对话框标题设置为新增，操作类型设置为'add'
			addForm: function() {
				this.dialogName = '新增联系人';
				this.dialogFormVisible = true;
				this.optiontype = 'add';

			},

			//打开对话框，将对话框标题设置为修改，操作类型设置为'update'，
			//并使用获取的待修改的记录的值设置对应的表单元素
			handleEdit: function(row) {
				this.dialogName = '编辑联系人';
				this.dialogFormVisible = true;

				this.labelForm.atvId = row.atvId;
				this.labelForm.atvCustNo = row.atvCustNo;
				this.labelForm.atvCustName = row.atvCustName;
				this.labelForm.atvDate = row.atvDate;
				this.labelForm.atvPlace = row.atvPlace;
				this.labelForm.atvTitle = row.atvTitle;
				this.labelForm.atvRemark = row.atvRemark;
				this.labelForm.atvDesc = row.atvDesc;


				this.optiontype = 'update';
			},
			
			doAtv:function(labelForm){
				this.$refs[labelForm].validate((valid) => {
					if (valid) {
						this.saveAtv();
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			
			
			/* 新增联系人 */
			saveAtv: function() {

				let url = this.axios.urls.CUSTOMER_ACTICITY_ADD;

				if (this.optiontype == 'add') {
					this.labelForm.atvCustNo = this.row.custNo;
					this.labelForm.atvCustName = this.custName;
				}

				if (this.optiontype == 'update') {
					url = this.axios.urls.CUSTOMER_ACTICITY_UPDATE;
				}



				this.axios.post(url, this.labelForm).then(resp => {
					if (resp.data.success) {
						this.$message({
							message: resp.data.msg,
							type: 'success'
						})
						this.dialogFormVisible = false;
						//执行查询方法
						this.doSearch(this.row.custNo);
					} else {
						this.$message({
							message: resp.data.msg,
							type: 'error'
						})
					}
				}).catch(resp => {
					console.log(resp);
				})

			},
			/* 删除联系人 */
			handleDelete: function(row) {

				this.$confirm('删除该交往记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

					let url = this.axios.urls.CUSTOMER_ACTICITY_DELETE;
					this.axios.post(url, {
						atvId: row.atvId
					}).then(resp => {
						if (resp.data.success) {
							this.$message({
								message: resp.data.msg,
								type: 'success'
							})
							//执行查询方法
							this.doSearch(this.row.custNo);
						} else {
							this.$message({
								message: resp.data.msg,
								type: 'error'
							})
						}
					}).catch(resp => {
						console.log(resp);
					})

				}).catch(() => {

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
