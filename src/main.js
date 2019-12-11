// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

//vue项目对axios的全局配置（增加配置）
import axios from '@/api/http'
import VueAxios from 'vue-axios'

import ElementUI from 'element-ui' //新添加1
import 'element-ui/lib/theme-chalk/index.css' //新添加2，避免后期打包样式不同，要放在import App from './App';之前

import store from './store'//vex

import echarts from 'echarts'

import App from './App'
import router from './router'

//如果配置为true那就引入mock目录下的所有文件
// process.env.MOCK && require('@/mock') 

Vue.use(VueAxios,axios)

Vue.use(ElementUI) //新添加3

Vue.config.productionTip = false

/* eslint-disable no-new */
window.vm=new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>',
	data:function(){
		return {
			//数据总线
			Bus:new Vue()
		}
	}
})
