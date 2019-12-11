import Vue from 'vue'

import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'


import login from '@/views/login'
import register from '@/views/register'

import home from '@/router/Home'
import Main from '@/router/Main'

//营销机会管理
import sal_chance from '@/views/sal/sal_chance'
import sal_plan from '@/views/sal/sal_plan'
import sal_plan_make from '@/views/sal/sal_plan_make'
import sal_plan_execute from '@/views/sal/sal_plan_execute'

//客户信息管理
import cst_customer from '@/views/cust/cst_customer'
import cst_customer_info from '@/views/cust/cst_customer_info'
import cst_customer_linkman from '@/views/cust/cst_customer_linkman'
import cst_customer_atv from '@/views/cust/cst_customer_atv'
import cst_customer_orders from '@/views/cust/cst_customer_orders'
import cst_customer_order_Product from '@/views/cust/cst_customer_order_Product'
import cst_lost from '@/views/cust/cst_lost'


//客户服务管理
import service_add from '@/views/service/service_add'
import service_allocation from '@/views/service/service_allocation'
import service_dispose from '@/views/service/service_dispose'
import service_dispose_do from '@/views/service/service_dispose_do'
import service_feedback from '@/views/service/service_feedback'
import service_feedback_do from '@/views/service/service_feedback_do'
import service_watch from '@/views/service/service_watch'
import service_watch_do from '@/views/service/service_watch_do'


//统计报表
import customer_contribution from '@/views/statistics/customer_contribution'
import customer_composition from '@/views/statistics/customer_composition'
import customer_serrvice from '@/views/statistics/customer_serrvice'
import customer_lost from '@/views/statistics/customer_lost'




//基础数据管理
import bas_dict from '@/views/basics/bas_dict'
import product from '@/views/basics/product'
import storage from '@/views/basics/storage'



Vue.use(Router)

export default new Router({
  routes: [
		 {
		  path: '/',
		  name: 'login',
		  component: login
		},
		 {
		  path: '/register',
		  name: 'register',
		  component: register
		},
		{
		  path: '/Main',
		  name: 'Main',
		  component: Main,
			children:[
				{
				  path: '/home',
				  name: 'home',
				  component: home
				},
				{
					path:'/sal/sal_chance',
					name:'sal_chance',
					component:sal_chance
				},
				{
					path:'/sal/sal_plan_make',
					name:'sal_plan_make',
					component:sal_plan_make
				},
				{
					path:'/sal/sal_plan',
					name:'sal_plan',
					component:sal_plan
				},
				{
					path:'/sal/sal_plan_execute',
					name:'sal_plan_execute',
					component:sal_plan_execute
				},
				{
					path:'/cst/cst_customer',
					name:'cst_customer',
					component:cst_customer
				},
				{
					path:'/cst/cst_customer_info',
					name:'cst_customer_info',
					component:cst_customer_info
				},
				{
					path:'/cst/cust_customer_linkman',
					name:'cst_customer_linkman',
					component:cst_customer_linkman
				},
				{
					path:'/cst/cst_customer_atv',
					name:'cst_customer_atv',
					component:cst_customer_atv
				},
				{
					path:'/cst/cst_customer_orders',
					name:'cst_customer_orders',
					component:cst_customer_orders
				},
				{
					path:'/cst/cst_customer_order_Product',
					name:'cst_customer_order_Product',
					component:cst_customer_order_Product
				},
				{
					path:'/cst/cst_lost',
					name:'cst_lost',
					component:cst_lost
				},
				{
					path:'/service_add',
					name:'service_add',
					component:service_add
				},
				{
					path:'/service_allocation',
					name:'service_allocation',
					component:service_allocation
				},
				{
					path:'/service_dispose',
					name:'service_dispose',
					component:service_dispose
				},
				{
					path:'/service_dispose_do',
					name:'service_dispose_do',
					component:service_dispose_do
				},
				{
					path:'/service_feedback',
					name:'service_feedback',
					component:service_feedback
				},
				{
					path:'/service_feedback_do',
					name:'service_feedback_do',
					component:service_feedback_do
				},
				{
					path:'/service_watch',
					name:'service_watch',
					component:service_watch
				},
				{
					path:'/service_watch_do',
					name:'service_watch_do',
					component:service_watch_do
				},
				{
					path:'/statistics/customer_contribution',
					name:'customer_contribution',
					component:customer_contribution
				},
				{
					path:'/statistics/customer_composition',
					name:'customer_composition',
					component:customer_composition
				},
				{
					path:'/statistics/customer_serrvice',
					name:'customer_serrvice',
					component:customer_serrvice
				},
				{
					path:'/statistics/customer_lost',
					name:'customer_lost',
					component:customer_lost
				},
				
				
				{
					path:'/basics/bas_dict',
					name:'bas_dict',
					component:bas_dict
				},
				{
					path:'/basics/product',
					name:'product',
					component:product
				},
				{
					path:'/basics/storage',
					name:'storage',
					component:storage
				}
			]
		}
		
		
  ]
})
