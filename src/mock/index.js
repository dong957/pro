
import Mock from 'mockjs' //引入mockjs，npm已安装
import action from '@/api/action' //引入封装的请求地址


//全局设置：设置所有ajax请求的超时时间，模拟网络传输耗时
Mock.setup({
	// timeout: 400  //延时400s请求到数据
	timeout: 200 - 400 //延时200-400s请求到数据
})


//导入login-mock.js
import loginData from '@/mock/data/login-mock.js'

//获取到封装的请求地址
let login_url = action.getFullPath('SYSTEM_USER_DOLOGIN');

//拦截请求
Mock.mock(login_url, /post|get/i, loginData);
