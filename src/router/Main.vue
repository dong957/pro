<template>
	<el-container class="main-container">
		<!-- 侧边栏有折叠效果，通过class控制折叠还是显示的效果 -->
		<el-aside v-bind:class="LeftAsideClass">
			<!-- <LeftAside :is-collapsed="isCollapsed"></LeftAside> -->
			<LeftAside></LeftAside>
		</el-aside>
		<el-container>
			<el-header class="main-header">
				<!-- 原来使用父子组件传参方式，修改为vuex方式实现 -->
				<!-- <TopNav @left-open-collapsed="toggleLeftStat"></TopNav> -->
				<TopNav></TopNav>
			</el-header>
			<el-main class="main-center">
				<!--  -->
				<router-view />
				
				
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	// 导入组件
	import TopNav from '@/router/TopNav.vue'
	import LeftAside from '@/router/LeftAside.vue'

	// 导出模块
	export default {

		//组件名称
		name: 'Main',
		
		data: function() {
			return {
				asideClass: 'main-aside',
				isCollapsed: false
			}
		},

		//将import的组件定义的Main中以便于使用
		components: {
			TopNav,
			LeftAside
		},
		methods: {
			toggleLeftNav: function(collapsed) {
				if (collapsed) {
					this.asideClass = "main-aside-collapsed"
				} else {
					this.asideClass = 'main-aside'
				}
				//父组件Main.vue传值给LeftAside.vue
				this.isCollapsed = collapsed;
			},
			/* 客户级别 */
			custLevel: function(){
				let url=this.axios.urls.BASICS_MANAGE_LISTBYTYPE;
				this.axios.post(url,{dict_type:'企业客户级别'}).then(resp=>{
					if (resp.data.success) {
						this.$store.commit('setCustLevel',{custLevel:resp.data.data});
					} 
				}).catch(resp=>{
					console.log(resp);
				})
			}
			
		},
	/* 	created:function(){
			this.custLevel();
			
			let user = this.$store.getters.getUser;
			if (user == null) {
				this.$alert('请先登录！', '标题名称', {
					confirmButtonText: '确定',
					callback: action => {
						this.$message({
							type: 'info',
							message: '请先登录！！！'
						});
						if(action=='confirm'){
							this.$router.push({
								path:'/',
							});
						}
					}
				});
				
			}
		}, */
		computed: {
			
			LeftAsideClass: function() {
				//可以通过以下方式进行获取但是不推荐
				let tmp = this.$store.getters.getLeftAsideState;
				
				console.log(tmp);
				
				return tmp == 'open' ? "main-aside" : "main-aside-collapsed"
			},
			
		}
		

	};
</script>
<style scoped>
	.main-container {
		height:1080px;
		width: 100%;
		box-sizing: border-box;
	}

	.main-aside-collapsed {
		/* 在CSS中，通过对某一样式声明! important ，可以更改默认的CSS样式优先级规则，使该条样式属性声明具有最高优先级 */
		width: 100px !important;
		height: 937px;
		background-color: #334157;
		margin: 0px;
	}

	.main-aside {
		width: 320px !important;
		height: 100%;
		background-color: #334157;
		margin: 0px;
	}

	.main-header,
	.main-center {
		padding: 0px;
	}
</style>
