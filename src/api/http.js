/**
 * vue项目对axios的全局配置
 */
import axios from 'axios'
import qs from 'qs'

//引入action模块，并添加至axios的类属性urls上
import action from '@/api/action'
axios.urls = action

// axios默认配置
axios.defaults.timeout = 10000; // 超时时间
// axios.defaults.baseURL = 'http://localhost:8080/j2ee15'; // 默认地址
axios.defaults.baseURL = action.SERVER;

//整理数据
// 只适用于 POST,PUT,PATCH，transformRequest` 允许在向服务器发送前，修改请求数据
axios.defaults.transformRequest = function(data) {
	data = qs.stringify(data);
	return data;
};


// 请求拦截器
axios.interceptors.request.use(function(config) {
	
	//获取store中的jwt令牌，如果正常获取，将其放入请求头，
  //在调用后台服务时，服务会通过过滤器验证jwt令牌的有效性
  //如果没有令牌或令牌无效则拒绝服务。
	// let jwt=window.vm.$store.getters.getJwt;
	
	// if(jwt){
	// 	config.headers['jwt']=jwt;
	// 	console.log("axios.interceptors.request"+jwt);
	// }
	
	return config;
}, function(error) {
	return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function(response) {
	//获取响应头中的jwt令牌数据（认证服务将生成的令牌放入header的jwt属性中）
  //如果获取到jwt令牌，在保存到store中，以后发送请求时需要将令牌放入请求头
	// let jwt=response.headers['jwt'];
	// 
	// if(jwt){
	// 	window.vm.$store.commit('setJwt',{jwt:jwt});
	// 	console.log("axios.interceptors.response"+jwt);
	// }
	
	return response;
}, function(error) {
	return Promise.reject(error);
});

// // 路由请求拦截
// // http request 拦截器
// axios.interceptors.request.use(
// 	config => {
// 		//config.data = JSON.stringify(config.data);  
// 		//config.headers['Content-Type'] = 'application/json;charset=UTF-8';
// 		//config.headers['Token'] = 'abcxyz';
// 		//判断是否存在ticket，如果存在的话，则每个http header都加上ticket
// 		// if (cookie.get("token")) {
// 		// 	//用户每次操作，都将cookie设置成2小时
// 		// 	cookie.set("token", cookie.get("token"), 1 / 12)
// 		// 	cookie.set("name", cookie.get("name"), 1 / 12)
// 		// 	config.headers.token = cookie.get("token");
// 		// 	config.headers.name = cookie.get("name");
// 		// }
// 		return config;
// 	},
// 	error => {
// 		return Promise.reject(error.response);
// 	});

// // 路由响应拦截
// // http response 拦截器
// axios.interceptors.response.use(
// 	response => {
// 		if (response.data.resultCode == "404") {
// 			console.log("response.data.resultCode是404")
// 			// 返回 错误代码-1 清除ticket信息并跳转到登录页面
// 			//      cookie.del("ticket")
// 			//      window.location.href='http://login.com'
// 			return
// 		} else {
// 			return response;
// 		}
// 	},
// 	error => {
// 		return Promise.reject(error.response) // 返回接口返回的错误信息
// 	});



export default axios;
