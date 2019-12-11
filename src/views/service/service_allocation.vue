<template>
	<div>
		<!-- 面包屑 -->

		<el-breadcrumb separator=">" style="margin-top: 20px;margin-left: 20px;">
			<el-breadcrumb-item><a style="font-size: 20px;">客户服务管理</a></el-breadcrumb-item>
			<el-breadcrumb-item><a style="font-size: 20px;">服务分配</a></el-breadcrumb-item>
		</el-breadcrumb>



		<!-- 搜索栏 -->
		<el-form :inline="true" class="demo-form-inline" style="margin-top: 5px;">

			<div>
				<el-form-item label="创建时间:">

					<!-- <el-input v-model="svrCreateDateGo" :style="{width:'220px'}"></el-input>
					&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
					<el-input v-model="svrCreateDateTo" :style="{width:'220px'}" placeholder=""></el-input> -->
					<el-date-picker value-format="yyyy-MM-dd" v-model="valueTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" @click="doSearch">查询</el-button>
				</el-form-item>

				
			</div>

			<div style="margin-right: 80px;">
				<el-form-item label="客户:" :label-width="'180px'">
					<el-input v-model="svrCustName" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="概要:" :label-width="'180px'">
					<el-input v-model="svrTitle" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="服务类型:" :label-width="'180px'">
					<el-input v-model="svrType" placeholder=""></el-input>
				</el-form-item>
			</div>



		</el-form>

		<!-- 数据表格 -->
		<el-table :data="result" style="width: 100%;" :border="true" max-height="650">
			<el-table-column prop="svrId" label="编号" min-width="80"></el-table-column>
			<el-table-column prop="svrCustName" label="客户" min-width="80"></el-table-column>
			<el-table-column prop="svrTitle" label="概要" min-width="100"></el-table-column>
			<el-table-column prop="svrType" label="服务类型" min-width="100"></el-table-column>
			<el-table-column prop="svrCreateBy" label="创建人" min-width="100"></el-table-column>
			<el-table-column prop="svrCreateDate" label="创建日期" min-width="100"></el-table-column>

			<el-table-column label="分配给" min-width="140">

				<template slot-scope="scope">
					<select v-model="scope.row.dueId" style="width: 90px;">
						<option v-for="item in userList" :key="item.user_id" :value="item.user_id">{{item.user_name}}</option>
					</select>

					<el-button type="danger" @click="dueService(scope.row)">分配</el-button>
				</template>
			</el-table-column>

			<el-table-column label="操作" min-width="80">
				<template slot-scope="scope">
					<el-button type="danger" @click="delService(scope.row)">删除</el-button>
				</template>
			</el-table-column>


		</el-table>


		<el-pagination style="margin-top: 15px;" @size-change="sizeChange" @current-change="handleCurrentChange"
		 :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper"
		 :total="total">
		</el-pagination>



	</div>
</template>

<script>
	export default {
		name: 'service_allocation',
		data: function() {
			return {
				/* 搜索栏 */
				svrCustName: '',
				svrTitle: '',
				svrType: '',
				svrCreateDateGo: '',
				svrCreateDateTo: '',
				//查询数据
				result: [],
				page: 1,
				rows: 10,
				total: 0,

				//人员列表
				userList: [],

				//分配给
				dueTo: '',

				test: null,


				/* 弹窗打开 */
				dialogFormVisible: false,

				//统一控制标签的宽度
				formLabelWidth: '100px',

				//统一控制表单元素的宽度
				formEleWidth: '300px',
				
				//选择日期
				valueTime:''
			}
		},
		methods: {
			/* 查询 */
			doSearch: function() {
				let url = this.axios.urls.SERVICE_MANAGE_QUERYPAGES;

				//获取到选择的时间段
				let startTime="";
				let endTime="";
				if(this.valueTime!=null){
					startTime=this.valueTime[0];
					endTime=this.valueTime[1];
				}
				
				// console.log("s"+startTime);
				// console.log("e"+endTime);
				
			 	let params = {
					svrCustName: this.svrCustName,
					svrTitle: this.svrTitle,
					svrType: this.svrType,
					svrCreateDate:startTime,
					endTime:endTime,
					svrStatus: '新创建',
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
				console.log(this.valueTime);
				this.rows = rows;
				this.page = 1;
				this.doSearch();
			},

			/* 页码更改 */
			handleCurrentChange: function(page) {
				
				this.page = page;
				this.doSearch();

			},
			//获取所有用户
			getUserList: function() {

				let url = this.axios.urls.SYSTEM_USER_LIST;


				this.axios.post(url).then(resp => {
					this.userList = resp.data.data;
					// console.log(this.userList);
				}).catch(resp => {
					console.log(resp);
				})

			},
			//分配
			dueService: function(row) {


				//获取到分配人的名字
				let svrDueTo = '';
				for (let i of this.userList) {
					if (i.user_id == row.dueId) {
						svrDueTo = i.user_name;
					}
				}

				if (svrDueTo == "") {
					this.$message({
						message: '请选择分配的人!',
						type: 'error'
					})
					return;
				}


				//当前时间
				let myDate = new Date();
				let str = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate() + " " + myDate.getHours() +
					":" + myDate.getMinutes() + ":" + myDate.getSeconds();

				let url = this.axios.urls.SERVICE_MANAGE_DUE;

				let params = {
					svrId: row.svrId,
					svrDueId: row.dueId,
					svrDueTo: svrDueTo,
					svrDueDate: str,
					svrStatus: '已分配'
				}

				// console.log(params);


				this.axios.post(url, params).then(resp => {
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

				})


			},
			//删除
			delService: function(row) {

				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let url = this.axios.urls.SERVICE_MANAGE_DELETE;
					this.axios.post(url, {
						svrId: row.svrId
					}).then(resp => {
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

					})
				}).catch(() => {

				});



			}


		},
		created() {
			this.doSearch();
			this.getUserList();

		}
	}
</script>

<style>
</style>
