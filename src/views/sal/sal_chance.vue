 <template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator="" style="margin-top: 20px;margin-left: 20px;">
			<el-breadcrumb-item><a style="font-size: 20px;">营销机会管理 </a></el-breadcrumb-item>

			<!-- 搜索栏 -->
			<el-form :inline="true" class="demo-form-inline"  style="margin-top: 30px">
				<el-form-item label="客户名称:">
					<el-input v-model="chc_cust_name" placeholder="请输入客户名称"></el-input>
				</el-form-item>
				<el-form-item label="概要:">
					<el-input v-model="chc_cust_title" placeholder="请输入概要"></el-input>
				</el-form-item>
				<el-form-item label="联系人:">
					<el-input v-model="chc_linkman" placeholder="请输入联系人"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" @click="doSearch">查询</el-button>
					<el-button type="primary" icon="el-icon-plus" @click="addForm">新建销售机会</el-button>
				</el-form-item>
			</el-form>

			<!-- 数据表格 -->
			<el-table :data="result" style="width: 100%;" :border="true" max-height="700">
				<el-table-column prop="chc_id" label="编号" min-width="60"></el-table-column>
				<el-table-column prop="chc_cust_title" label="概要" min-width="70"></el-table-column>
				<el-table-column prop="chc_linkman" label="联系人" min-width="70"></el-table-column>
				<el-table-column prop="chc_tel" label="联系电话" min-width="70"></el-table-column>
				<el-table-column prop="chc_create_date" label="创建时间" min-width="80"></el-table-column>
				<el-table-column label="操作" min-width="100" >
					<!--
					在<template>上使用特殊的slot-scope 特性，可以接收传递给插槽的prop
					slot-scope:类似将每一行的row对象封装到槽中，之后直接从scope中获取
					row对象信息和行索引index信息即可
					-->
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
						<el-button size="mini" type="primary" @click="openDue(scope.row)">指派</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>

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
			<el-form :rules="rules" ref="chanceForm" :model="chanceForm" :inline="true" class="demo-form-inline">
				<el-form-item v-show="optiontype == 'update'" label="编号" :style="{width: '600px'}">
					<el-input v-model="chanceForm.chc_id" autocomplete="off" :style="{width: '100px'}" :disabled="true" :rows="1" type="textarea"
					 resize="none"></el-input>
				</el-form-item>
				<el-form-item label="机会来源" prop="chc_soure" :label-width="formLabelWidth">
					<el-input v-model="chanceForm.chc_soure" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="客户名称" prop="chc_cust_name" :label-width="formLabelWidth">
					<el-input v-model="chanceForm.chc_cust_name" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="成功几率" :label-width="formLabelWidth">
					<el-slider v-model="chanceForm.chc_rate" :style="{width: formEleWidth}" show-input>
					</el-slider>
				</el-form-item>
				<el-form-item label="概要" prop="chc_cust_title" :label-width="formLabelWidth">
					<el-input v-model="chanceForm.chc_cust_title" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="联系人" prop="chc_linkman" :label-width="formLabelWidth">
					<el-input v-model="chanceForm.chc_linkman" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="联系人电话" prop="chc_tel" :label-width="formLabelWidth">
					<el-input v-model="chanceForm.chc_tel" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="机会描述" prop="chc_desc" :label-width="formLabelWidth">
					<el-input v-model="chanceForm.chc_desc" type="textarea" :rows="5" :style="{width: '500px'}" resize="none"
					 placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-form-item label="创建人" :label-width="formLabelWidth">
					<el-input readonly v-model="chanceForm.chc_create_by" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="创建时间" v-show="optiontype == 'add'" :label-width="formLabelWidth">
					<el-input readonly v-model="chanceForm.chc_create_date" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>

				<el-form-item v-show="optiontype == 'update' " label="创建时间" :label-width="formLabelWidth">
					<el-input readonly v-model="createDate" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer" align="center">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveChance('chanceForm')">确 定</el-button>
			</div>
		</el-dialog>


		<!-- 指派的的表单 -->
		<el-dialog :title="dialogName" :visible.sync="dueFormVisible" @close="closeForm" width="1000px">
			<el-form :rules="rules" ref="chanceForm" :model="chanceForm" :inline="true" class="demo-form-inline">
				<el-form-item label="编号" :style="{width: '600px'}">
					<el-input readonly v-model="chanceForm.chc_id" autocomplete="off" :style="{width: '100px'}" :disabled="true" :rows="1"
					 type="textarea" resize="none">
					</el-input>
				</el-form-item>
				<el-form-item label="机会来源" :label-width="formLabelWidth">
					<el-input readonly v-model="chanceForm.chc_soure" autocomplete="off" :style="{width: formEleWidth}" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="客户名称" :label-width="formLabelWidth">
					<el-input readonly v-model="chanceForm.chc_cust_name" autocomplete="off" :style="{width: formEleWidth}" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="成功几率" :label-width="formLabelWidth">
					<el-slider readonly v-model="chanceForm.chc_rate" :style="{width: formEleWidth}" show-input :disabled="true">
					</el-slider>
				</el-form-item>
				<el-form-item label="概要" :label-width="formLabelWidth">
					<el-input readonly v-model="chanceForm.chc_cust_title" autocomplete="off" :style="{width: formEleWidth}" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="联系人" :label-width="formLabelWidth">
					<el-input readonly v-model="chanceForm.chc_linkman" autocomplete="off" :style="{width: formEleWidth}" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="联系人电话" :label-width="formLabelWidth">
					<el-input readonly v-model="chanceForm.chc_tel" autocomplete="off" :style="{width: formEleWidth}" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="机会描述" :label-width="formLabelWidth">
					<el-input readonly v-model="chanceForm.chc_desc" type="textarea" :rows="5" :style="{width: '500px'}" resize="none"
					 placeholder="请输入内容" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="创建人" :label-width="formLabelWidth">
					<el-input readonly v-model="chanceForm.chc_create_by" autocomplete="off" :style="{width: formEleWidth}" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="创建时间" :label-width="formLabelWidth">
					<el-input readonly v-model="createDate" autocomplete="off" :style="{width: formEleWidth}" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="指派给" prop="chc_due_to"  :label-width="formLabelWidth">
					<el-select v-model="chanceForm.chc_due_to" @change="getUserId" :style="{width:formEleWidth}">
						<el-option v-for="item in userList" :value="item.user_id" :key="item.user_id" :label="item.user_name">
						</el-option>
					</el-select>

				</el-form-item>

				<el-form-item label="指派时间" :label-width="formLabelWidth">
					<el-input readonly v-model="chanceForm.chc_due_date" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>


			</el-form>
			<div slot="footer" class="dialog-footer" align="center">
				<el-button @click="dueFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dueUser('chanceForm')">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		name: 'sal_chance',
		data: function() {
			return {
				chc_cust_name: '',
				chc_cust_title: '',
				chc_linkman: '',
				result: [],
				page: 1,
				rows: 10,
				total: 0,

				//控制对话框是否显示，默认是隐藏状态
				dialogFormVisible: false,

				//指派的表单是否显示
				dueFormVisible: false,

				//统一控制标签的宽度
				formLabelWidth: '100px',


				//统一控制表单元素的宽度
				formEleWidth: '300px',

				//对话框标题，默认为新增，如果是点击修改按钮打开对话框，则标题应为修改。
				dialogName: '新增书本',

				//操作类型，默认为添加，如果是点击修改打开对话框，则操作类类型应变为修改
				//该变量用于控制是否显示书本编号字段，当操作类型为新增时不需显示（书本编号数据表字段为自增）
				//当操作类型为修改时，需要显示。
				optiontype: 'add',

				//创建的时间
				createDate: '',

				//定义弹出窗口表单对应的model
				chanceForm: {
					chc_id: '',
					chc_soure: '',
					chc_cust_name: '',
					chc_rate: 0,
					chc_cust_title: '',
					chc_linkman: '',
					chc_tel: '',
					chc_desc: '',
					chc_create_id: this.$store.getters.getUser.user_id,
					chc_create_by: this.$store.getters.getUser.user_name,
					chc_create_date: '',
					chc_due_id: '',
					chc_due_to: '',
					chc_due_date: ''
				},
				//所有用户
				userList: [],

				rules: {
					chc_soure: [{
						required: true,
						message: '请输入机会来源',
						trigger: 'blur'
					}],
					chc_cust_name: [{
						required: true,
						message: '请输入客户名字',
						trigger: 'blur'
					}],
					chc_cust_title: [{
						required: true,
						message: '请输入概要',
						trigger: 'blur'
					}],
					chc_linkman: [{
						required: true,
						message: '请输入联系人',
						trigger: 'blur'
					}],
					chc_tel: [{
						required: true,
						message: '请输入联系人电话',
						trigger: 'blur'
					}],
					chc_desc: [{
						required: true,
						message: '请输入机会描述',
						trigger: 'blur'
					}],
					chc_due_to: [{
						required: true,
						message: '请选择指派人',
						trigger: 'change'
					}]
				}

			}
		},
		methods: {
			/* 创建时间 默认为当前系统时间 */
			getCreateTime() {
				setInterval(() => {
					//new Date() new一个data对象，当前日期和时间
					//toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
					this.chanceForm.chc_create_date = new Date().toLocaleString();
					this.chanceForm.chc_due_date = new Date().toLocaleString();
				}, 1000)
			},
			doSearch: function() {
				let url = this.axios.urls.SALCHANCE_MANAGE_QUERYPAGER;

				let params = {
					chc_cust_name: this.chc_cust_name,
					chc_cust_title: this.chc_cust_title,
					chc_linkman: this.chc_linkman,
					/* 查出来的都是未分配的 status状态为1 */
					chc_status: 1,
					rows: this.rows,
					page: this.page
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

			//当关闭对话框时，该方法用于清空表单
			closeForm: function() {
				this.chanceForm.chc_id = 0;
				this.chanceForm.chc_soure = null;
				this.chanceForm.chc_cust_name = null;
				this.chanceForm.chc_rate = 0;
				this.chanceForm.chc_cust_title = null;
				this.chanceForm.chc_linkman = null;
				this.chanceForm.chc_tel = null;
				this.chanceForm.chc_desc = null;
				this.chanceForm.chc_create_by = null;
				this.chanceForm.chc_create_date = null;
				this.chanceForm.chc_due_to = null;
				this.chanceForm.chc_due_date = null;
				
				
			},

			//打开对话框，将对话框标题设置为新增，操作类型设置为'add'
			addForm: function() {
				this.dialogName = '新增销售机会';
				this.dialogFormVisible = true;
				this.optiontype = 'add';
			},

			//打开对话框，将对话框标题设置为修改，操作类型设置为'update'，
			//并使用获取的待修改的记录的值设置对应的表单元素
			handleEdit: function(row) {
				this.dialogName = '编辑销售机会';
				this.dialogFormVisible = true;

				this.chanceForm.chc_id = row.chc_id;
				this.chanceForm.chc_soure = row.chc_soure;
				this.chanceForm.chc_cust_name = row.chc_cust_name;
				this.chanceForm.chc_rate = row.chc_rate;
				this.chanceForm.chc_cust_title = row.chc_cust_title;
				this.chanceForm.chc_tel = row.chc_tel;
				this.chanceForm.chc_linkman = row.chc_linkman;
				this.chanceForm.chc_desc = row.chc_desc;
				this.chanceForm.chc_create_by = row.chc_create_by;

				// this.chanceForm.chc_create_date = row.chc_create_date;
				//创建时间
				this.createDate = row.chc_create_date;


				this.optiontype = 'update';
			},
			//删除
			handleDelete: function(row) {
				this.$confirm('此操作将永久删除该营销机会, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let url = this.axios.urls.SALCHANCE_MANAGE_DEL + "?chc_id=" + row.chc_id;
					console.log(url);
					this.axios.delete(url).then(resp => {
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

					}).catch(error => {
						console.log(error);
					})
				}).catch(() => {

				});
			},
			//保存
			saveChance: function(chanceForm) {
				this.$refs[chanceForm].validate((valid) => {
					if (valid) {
						
						this.doChange();
					} else {
						console.log('error submit!!');
						return false;
					}
				});

			},
			//提交
			doChange:function(){
				
				let url = this.axios.urls.SALCHANCE_MANAGE_ADD;
				
				if (this.optiontype == 'update') {
					url = this.axios.urls.SALCHANCE_MANAGE_UPDATE;
				}
				
				
				this.axios.post(url, this.chanceForm).then(resp => {
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
				}).catch(resp => {
					console.log(resp);
				})
			},

			//打开指派窗口
			openDue: function(row) {

				this.dialogName = '指派销售机会';
				this.dueFormVisible = true;

				this.chanceForm.chc_id = row.chc_id;
				this.chanceForm.chc_soure = row.chc_soure;
				this.chanceForm.chc_cust_name = row.chc_cust_name;
				this.chanceForm.chc_rate = row.chc_rate;
				this.chanceForm.chc_cust_title = row.chc_cust_title;
				this.chanceForm.chc_tel = row.chc_tel;
				this.chanceForm.chc_linkman = row.chc_linkman;
				this.chanceForm.chc_desc = row.chc_desc;
				this.chanceForm.chc_create_by = row.chc_create_by;
				this.chanceForm.chc_create_date = row.chc_create_date;

				//创建时间
				this.createDate = row.chc_create_date;

				//获取被指派的人
				this.getUserList();

			},
			//获取所有用户
			getUserList: function() {

				let url = this.axios.urls.SYSTEM_USER_LIST;

				this.axios.post(url).then(resp => {

					this.userList = resp.data.data;
					console.log(this.userList);
				}).catch(resp => {
					console.log(resp);
				})

			},
			//设置销售机会的 人
			getUserId: function(id) {

				//去数据里面 用id找到对应的数据
				let obj = {};
				obj = this.userList.find(item => {
					return item.user_id === id;
				})

				if (obj != "" && obj != undefined) {
					//设置营销机会的指定人和指定人的id
					this.chanceForm.chc_due_id = id;
					this.chanceForm.chc_due_to = obj.user_name;
				}

			},
			//指派销售任务
			dueUser: function(chanceForm) {
				
				this.$refs[chanceForm].validate((valid) => {
					if (valid) {
						
						let url = this.axios.urls.SALCHANCE_MANAGE_DUE;
						
						this.axios.post(url, this.chanceForm).then(resp => {
							if (resp.data.success) {
								this.$message({
									message: resp.data.msg,
									type: 'success'
								})
								this.dueFormVisible = false;
								this.doSearch();
							} else {
								this.$message({
									message: resp.data.msg,
									type: 'error'
								})
							}
						}).catch(resp => {
							console.log(resp);
						})
						
					} else {
						console.log('error submit!!');
						return false;
					}
				});
				
				

			}

		},

		created() {
			this.getCreateTime();
			this.doSearch();

		}
	}
</script>

<style>
</style>
