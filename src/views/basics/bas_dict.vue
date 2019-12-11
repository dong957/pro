<template>
	<div>
		<!-- 面包屑 -->

		<el-breadcrumb separator="" style="margin-top: 20px;margin-left: 20px;">
			<el-breadcrumb-item><a style="font-size: 20px;">数据字典管理</a></el-breadcrumb-item>

			<!-- 搜索栏 -->
			<el-form :inline="true" class="demo-form-inline"style="margin-top: 20px;margin-left: 30px;">
				<el-form-item label="类别:">
					<el-input v-model="dict_type" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="条目:">
					<el-input v-model="dict_item" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="值:">
					<el-input v-model="dict_value" placeholder=""></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" @click="doSearch">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="addDict">新增数据字典条目</el-button>
				</el-form-item>
			</el-form>

			<!-- 数据表格 -->
			<el-table :data="result" style="width: 100%;" :border="true" max-height="700">
				<el-table-column prop="dict_id" label="编号" min-width="60"></el-table-column>
				<el-table-column prop="dict_type" label="类型" min-width="60"></el-table-column>
				<el-table-column prop="dict_item" label="条目" min-width="120"></el-table-column>
				<el-table-column prop="dict_value" label="值" min-width="120"></el-table-column>
				<el-table-column prop="dict_is_editable" label="是否可编辑" min-width="120"></el-table-column>
				<el-table-column label="操作" min-width="80">
					<!--
					在<template>上使用特殊的slot-scope 特性，可以接收传递给插槽的prop
					slot-scope:类似将每一行的row对象封装到槽中，之后直接从scope中获取
					row对象信息和行索引index信息即可
					-->
					<template slot-scope="scope">
						<el-button type="success" icon="el-icon-check" circle v-show="scope.row.dict_is_editable=='是' " @click="updateDict(scope.row)"></el-button>
						<el-button type="danger" icon="el-icon-delete" circle style="margin-left: 0px;" @click="delDict(scope.row)"></el-button>
					</template>
				</el-table-column>

			</el-table>
		</el-breadcrumb>

		<el-pagination style="margin-top: 15px;" @size-change="sizeChange" @current-change="handleCurrentChange"
		 :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper"
		 :total="total">
		</el-pagination>


		<el-dialog :title="dialogName" :visible.sync="dialogFormVisible" @close="closeForm" width="1000px">
			<el-form  :rules="rules" ref="dictForm" :model="dictForm" :inline="true" class="demo-form-inline">
				<el-form-item v-show="optiontype == 'update'" label="编号" :style="{width: '600px'}">
					<el-input v-model="dictForm.dict_id" autocomplete="off" :style="{width: '100px'}" :disabled="true" :rows="1" type="textarea"
					 resize="none"></el-input>
				</el-form-item>
				<el-form-item label="类别" prop="dict_type" :label-width="formLabelWidth">
					<el-autocomplete
					  v-model="dictForm.dict_type"
					  :fetch-suggestions="querySearchAsync"
					  placeholder="请输入内容"
					  @select="((item)=>{handleSelect(item)})"
					  :style="{width: formEleWidth}">
					</el-autocomplete>
					<!-- <el-input v-model="dictForm.dict_type" autocomplete="on" :style="{width: formEleWidth}"></el-input> -->
				</el-form-item>
				<el-form-item label="条目" prop="dict_item" :label-width="formLabelWidth">
					<el-input v-model="dictForm.dict_item" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="值" prop="dict_value" :label-width="formLabelWidth">
					<el-input v-model="dictForm.dict_value" autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>
				<el-form-item label="是否可编辑" prop="dict_is_editable" :label-width="formLabelWidth">
					<el-select v-model="dictForm.dict_is_editable" autocomplete="off" :style="{width: formEleWidth}">
						<el-option value="是"></el-option>
						<el-option value="否"></el-option>
					</el-select>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer" align="center">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="doDict('dictForm')">确 定</el-button>
			</div>
		</el-dialog>



	</div>
</template>

<script>
	export default {
		name: 'bas_dict',
		data: function() {
			return {
				dict_type: '',
				dict_item: '',
				dict_value: '',
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
				dialogName: '新增数据字典条目',

				//操作类型，默认为添加，如果是点击修改打开对话框，则操作类类型应变为修改
				//该变量用于控制是否显示书本编号字段，当操作类型为新增时不需显示（书本编号数据表字段为自增）
				//当操作类型为修改时，需要显示。
				optiontype: 'add',

				/* 窗口表单对应的模块 */
				dictForm: {
					dict_id: '',
					dict_type: '',
					dict_item: '',
					dict_value: '',
					dict_is_editable: '是'
				},
				programs:{dict_type:'1'},
				rules:{
					dict_type:[{
						required:true,
						message:'请输入类别',
						trigger:'blur'
					}],
					dict_item:[{
						required:true,
						message:'请输入条目',
						trigger:'blur'
					}],
					dict_value:[{
						required:true,
						message:'请输入值',
						trigger:'blur'
					}],
					dict_is_editable:[{
						required:true,
						message:'请输入是否可编辑',
						trigger:'change'
					}]
				}
			}
		},
		methods: {
			doSearch: function() {
				let url = this.axios.urls.BASICS_MANAGE_DICTLISTPAGE;

				let params = {
					dict_type: this.dict_type,
					dict_item: this.dict_item,
					dict_value: this.dict_value,
					rows: this.rows,
					page: this.page
				}


				this.axios.post(url, params).then(resp => {
					//console.log(resp.data.data);
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
				this.dictForm.dict_id = null;
				this.dictForm.dict_type = null;
				this.dictForm.dict_item = null;
				this.dictForm.dict_value = null;
				this.dictForm.dict_is_editable = null;
			},
			/* 
			 * 打开对话框
			 * 新增数字条目 
			 * */
			addDict: function() {
				this.dialogName = '新增数据字典条目';
				this.dialogFormVisible = true;
				this.optiontype = 'add';


			},
			/* 修改数据字典 */
			updateDict: function(row) {
				this.dialogName = '编辑数据字典条目';
				this.dialogFormVisible = true;

				this.dictForm.dict_id = row.dict_id;
				this.dictForm.dict_type = row.dict_type;
				this.dictForm.dict_item = row.dict_item;
				this.dictForm.dict_value = row.dict_value;
				this.dictForm.dict_is_editable = row.dict_is_editable;



				this.optiontype = 'update';
			},
			/* 删除数据字典 */
			delDict: function(row) {

				let url = this.axios.urls.BASICS_MANAGE_DICTDELETE + "?dict_id=" + row.dict_id;
				console.log(url);
				this.axios.post(url).then(resp => {
					if (resp.data.success) {
						this.$message({
							message: resp.data.msg,
							type: 'success'
						})
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
			
			doDict:function(dictForm){
				this.$refs[dictForm].validate((valid) => {
					if (valid) {
						this.saveDict();
					} else {
						console.log('error submit!!');
						return false;
					}
					});
			},
			/*
			 * 确认按钮 
			 *  */
			 
			saveDict:function() {

				let url = this.axios.urls.BASICS_MANAGE_DICTADD;

				if (this.optiontype == 'update') {
					url = this.axios.urls.BASICS_MANAGE_DICTUPDATE;
				}

				this.axios.post(url, this.dictForm).then(resp => {
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
				console.log(this.dictForm);
			},
			querySearchAsync: function(queryString, callback) {
			if(queryString == ''){
				queryString ='暂未输入';
				console.log(queryString);
			}	
			var list = {};
            //调用的后台接口
            let url = this.axios.urls.BASICS_MANAGE_AUTOCOMPLETE +"?dict_type="+queryString;
			// console.log(queryString);
            //从后台获取到对象数组
            this.axios.post(url).then((resp) => {
				
				for(let i of resp.data.data){
                    i.value = i.dict_type;  //将想要展示的数据作为value
                }
			   list=resp.data.data;
			   console.log(list);
			   callback(list);
            }).catch((error) => {
                console.log(error)
            })
			},
			handleSelect(item) {
				this.dictForm.dict_type = item.value
			}
		},
		created() {
			this.doSearch();

		}
	}
</script>

<style scoped>
	<style scoped>.icons-list>>>.anticon {
		margin-right: 6px;
		font-size: 24px;
	}
</style>
