<template>
	<el-menu class="el-menu-demo" mode="horizontal" background-color="#334157" text-color="#fff" active-text-color="#fff">
		<el-button class="buttonimg">
			<img class="showimg" :src="collapsed?imgshow:imgsq" @click="doToggle">
		</el-button>
		<el-submenu index="2" class="submenu">
			<template slot="title">{{user.user_name}}</template>
			<el-menu-item @click="exit" index="2-3">退出</el-menu-item>
		</el-submenu>
	</el-menu>
</template>

<script>
	export default {
		name: "TopNav",
		data: function() {
			return {
				collapsed: true,
				imgshow: require("../assets/img/show.png"),
				imgsq: require('../assets/img/sq.png'),
				user: ''
			}
		},
		methods: {
			doToggle: function() {
				//改变图标
				this.collapsed = !this.collapsed

				/* //通过自定义事件将状态值传递给父组件,即Main。vue
				this.$emit('left-open-collapsed',this.collapsed); */

				/*
				 * 通过vuex进行组件间的通讯，当点击折叠或展开时设置全局参数，以便于
				 * 其他组件获取状态。
				 *
				 *  第一种提交方式：
				 * this.$store.commit(type, payload);
				 * 参数type: 与mutations.js定义的方法名一致
				 * 参数payload：载荷，是个json对象，其中的参数与state.js中定义的全局参数名一致
				 * 该方法的作用是为全局参数LeftAsideState赋值。
				 * 
				 * 第二种提交方式：
				 * this.$store.commit({type: 'setLeftAsideState', LeftAsideState: 'open'});
				 * 即：将type参数与要设置的全局参数放在一个json对象中。
				 */
				// console.log("collapsed:"+this.collapsed);
				this.$store.commit("setLeftAsideState", {
					LeftAsideState:this.collapsed ? 'open' : 'collapsed'
				});
			},
			/* 从vuex拿出登录的用户 */
			getUser: function() {
				this.user = this.$store.getters.getUser;
				
			},
			exit: function() {
				this.$store.commit('setUser', {
					user: null
				});
				this.$router.push({
					path:'/',
				});
			}
		},
		created: function() {
			this.getUser();
		}
	}
</script>

<style scoped>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		border: none;
	}

	.submenu {
		float: right;
	}

	.buttonimg {
		height: 60px;
		background-color: transparent;
		border: none;
	}

	.showimg {
		width: 26px;
		height: 26px;
		position: absolute;
		top: 17px;
		left: 17px;
	}

	.showimg:active {
		border: none;
	}
</style>
