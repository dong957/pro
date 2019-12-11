<template>
	<div>

		<router-link to="/login">用户登录 </router-link>  <br/>
		<router-link to="/register"> 用户注册</router-link><br/>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		
		{{personName}}
		<button @click="setPersonNameAsyn">异步设置参数</button>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		computed: {
			personName:function() {
				return this.$store.getters.getPersonName;
			}
		},
		methods: {
			setPersonNameAsyn:function() {
				this.$store.dispatch('setPersonNameAsync',{
					personName:'关羽'
				});
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}
</style>
