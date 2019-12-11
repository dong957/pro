<template>
	<el-menu router default-active="$route.path" class="el-menu-vertical-demo" background-color="#334157" text-color="#fff"
	 active-text-color="#ffd04b" :collapse="isCollapsed">
		<!-- <el-menu default-active="2" :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b"> -->
		<div class="logobox">
			<img class="logoimg" src="../assets/img/logo.png" alt="">
		</div>

		<el-submenu v-for="root in treeNode" :index="'index-'+root.id" :key="'key-'+root.id">
			<template slot="title">
				<i :class="root.icon"></i>
				<span>{{root.text}}</span>
			</template>
			<el-menu-item v-for="node in root.childrens" :index="node.url" :key="'key'+node.id">
				{{node.text}}
			</el-menu-item>
		</el-submenu>





		<!-- <el-submenu index="1">
			<template slot="title">
				<i class="el-icon-location"></i>
				<span>导航一</span>
			</template>
			<el-menu-item-group>
				<template slot="title">分组一</template>
				<el-menu-item index="1-1">选项1</el-menu-item>
				<el-menu-item index="1-2">选项2</el-menu-item>
			</el-menu-item-group>
			<el-menu-item-group title="分组2">
				<el-menu-item index="1-3">选项3</el-menu-item>
			</el-menu-item-group>
			<el-submenu index="1-4">
				<template slot="title">选项4</template>
				<el-menu-item index="1-4-1">选项1</el-menu-item>
			</el-submenu>
		</el-submenu>
		<el-menu-item index="2">
			<i class="el-icon-menu"></i>
		</el-menu-item>
		<el-menu-item index="3" disabled>
			<i class="el-icon-document"></i>
			<span slot="title">导航三</span>
		</el-menu-item>
		<el-menu-item index="4">
			<i class="el-icon-setting"></i>
			<span slot="title">导航四</span>
		</el-menu-item> -->
	</el-menu>
</template>
<script>
	export default {
		name: "LeftAside",

		//接收父组件传递过来的值
		//props: ['isCollapsed'],


		data: function() {
			return {
				collapsed: false,
				treeNode: []
			}
		},
		methods: {
			initMenu: function() {
				let url = this.axios.urls.SYSTEM_MODDULE_NAVMENU;
				this.axios.post(url, {}).then(resp => {
					//console.log(resp.data);
					this.treeNode = resp.data.data;
				}).catch(resp => {
					console.log(resp);
				});
			}
		},
		/* watch: { //通过监听，监听isCollapsed的变化
			isCollapsed: function(val) {
				console.info(val)
				return this.collapsed = val;
			}
		}, */

		created: function() {
			this.initMenu();
		},
		computed: {
			//通过计算属性获取定义在store中的状态值，并根据状态值来设定返回值，用于标记左侧栏展开或折叠的状态
			//因为命名冲突，可将上面再data中定义的同名属性删除.
			isCollapsed:function() {
				let tmp=this.$store.getters.getLeftAsideState;
				return tmp == 'open' ? false : true;
			}
		},
	}
</script>
<style>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 240px;
		min-height: 100%;
		height:937px;
		/* height: 100%; */
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		border: none;
		text-align: center;
	}

	.el-menu-item-group__title {
		padding: 0px;
	}

	.el-menu-bg {
		background-color: #1f2d3d !important;
	}

	.el-menu {
		border: none;
	}

	.logobox {
		height: 40px;
		line-height: 40px;
		color: #9d9d9d;
		font-size: 20px;
		text-align: center;
		padding: 20px 0px;
	}

	.logoimg {
		height: 40px;
	}
</style>
