<template>
	<div>
		<!-- 面包屑 -->

		<el-breadcrumb separator=">" style="margin-top: 20px;margin-left: 20px;">
			<el-breadcrumb-item><a href="#/cst/cst_customer" style="font-size: 20px;">客户信息管理 </a></el-breadcrumb-item>
			<el-breadcrumb-item><a @click="backCustInfo" style="font-size: 20px;">客户信息 </a></el-breadcrumb-item>
			<el-breadcrumb-item><a style="font-size: 20px;">联系人 </a></el-breadcrumb-item>



			<div align="right" style="margin-top: 40px;margin-right:238px;margin-bottom: 1px;">
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
				<el-table-column prop="lkmName" label="姓名" min-width="80"></el-table-column>
				<el-table-column prop="lkmSex" label="性别" min-width="80"></el-table-column>
				<el-table-column prop="lkmPosition" label="职位" min-width="100"></el-table-column>
				<el-table-column prop="lkmTel" label="办公室电话" min-width="100"></el-table-column>
				<el-table-column prop="lkmMobile" label="手机" min-width="100"></el-table-column>
				<el-table-column prop="lkmMemo" label="备注" min-width="100"></el-table-column>
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
			<el-form :rules="rules" ref="linmanForm" :model="linmanForm" :inline="true" class="demo-form-inline">
				<el-form-item v-show="optiontype == 'update'" label="编号" :style="{width: '600px'}">
					<el-input v-model="linmanForm.lkmId" :style="{width: '100px'}" :disabled="true" :rows="1" type="textarea" resize="none"></el-input>
				</el-form-item>
				<el-form-item label="姓名:" prop="lkmName" :label-width="formLabelWidth">
					<el-input v-model="linmanForm.lkmName" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="性别:" :label-width="formLabelWidth">
					<div :style="{width: formEleWidth}">
						<el-radio v-model="linmanForm.lkmSex" label="男">男</el-radio>
						<el-radio v-model="linmanForm.lkmSex" label="女">女</el-radio>
					</div>
				</el-form-item>
				<el-form-item label="职位:"  prop="lkmPosition" :label-width="formLabelWidth">
					<el-input v-model="linmanForm.lkmPosition" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="办公室电话:" prop="lkmTel" :label-width="formLabelWidth">
					<el-input v-model="linmanForm.lkmTel" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="手机:" prop="lkmMobile" :label-width="formLabelWidth">
					<el-input v-model="linmanForm.lkmMobile" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="备注:" prop="lkmMemo" :label-width="formLabelWidth">
					<el-input v-model="linmanForm.lkmMemo" :style="{width: formEleWidth}"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer" align="center">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="doLinkman('linmanForm')">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		name: 'cst_customer_linkman',
		data: function() {
			return {
				result: [], //数据
				row: [],
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

				linmanForm: {
					lkmId: '',
					lkmCustNo: '',
					lkmCustName: '',
					lkmName: '',
					lkmSex: '',
					lkmPosition: '',
					lkmTel: '',
					lkmMobile: '',
					lkmMemo: ''
				},
				rules: {
					lkmName: [{
						required: true,
						message: '请输入联系人姓名',
						trigger: 'blur'
					}],
					lkmPosition:[{
						required:true,
						message:'请输入职位',
						trigger:'blur'
					}],
					lkmTel:[{
						required:true,
						message:'请输入办公室电话',
						trigger:'blur'
					}],
					lkmMobile:[{
						required:true,
						message:'请输入联系人手机号',
						trigger:'blur'
					}],
					lkmMemo:[{
						required:true,
						message:'请输入联系人备注',
						trigger:'blur'
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
				 * 进来路由就去获取联系人
				 *  */
				this.doSearch(row.custNo);

			},
			/* 查询 */
			doSearch: function(str) {
				let url = this.axios.urls.CUSTMOER_LINKMAN_QUERYPAGE;

				let params = {
					lkmCustNo: str,
				}


				this.axios.post(url, params).then(resp => {
					console.log(resp.data.data);
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
				this.linmanForm.lkmId = '',
					this.linmanForm.lkmCustNo = '',
					this.linmanForm.lkmCustName = '',
					this.linmanForm.lkmName = '',
					this.linmanForm.lkmSex = '',
					this.linmanForm.lkmPosition = '',
					this.linmanForm.lkmTel = '',
					this.linmanForm.lkmMobile = '',
					this.linmanForm.lkmMemo = ''
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

				this.linmanForm.lkmId = row.lkmId;
				this.linmanForm.lkmCustNo = row.lkmCustNo;
				this.linmanForm.lkmCustName = row.lkmCustName;
				this.linmanForm.lkmName = row.lkmName;
				this.linmanForm.lkmSex = row.lkmSex;
				this.linmanForm.lkmPosition = row.lkmPosition;
				this.linmanForm.lkmTel = row.lkmTel;
				this.linmanForm.lkmMobile = row.lkmMobile;
				this.linmanForm.lkmMemo = row.lkmMemo;


				this.optiontype = 'update';
			},
				
			doLinkman:function(linmanForm){
				this.$refs[linmanForm].validate((valid) => {
					if (valid) {
						this.saveLinkman();
					} else {
						console.log('error submit!!');
						return false;
					}
				});
				
			},
			/* 新增联系人 */
			saveLinkman: function() {

				let url = this.axios.urls.CUSTOMER_LINKMAN_ADD;

				if (this.optiontype == 'add') {
					this.linmanForm.lkmCustNo = this.row.custNo;
				}

				if (this.optiontype == 'update') {
					url = this.axios.urls.CUSTOMER_LINKMAN_UPDATE;
				}

				this.axios.post(url, this.linmanForm).then(resp => {
					if (resp.data.success) {
						this.$message({
							message: resp.data.msg,
							type: 'success'
						})
						this.dialogFormVisible = false;

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
					this.$confirm('此操作将永久删除该联系人, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let url = this.axios.urls.CUSTOMER_LINKMAN_DELETE + "?lkmId=" + row.lkmId;
						console.log(url);
						this.axios.delete(url).then(resp => {
							if (resp.data.success) {
								this.$message({
									message: resp.data.msg,
									type: 'success'
								})
								this.doSearch(this.row.custNo);
							} else {
								this.$message({
									message: resp.data.msg,
									type: 'error'
								})
							}
						}).catch(error => {
							console.log(error);
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
