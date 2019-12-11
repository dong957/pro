
const actions={
	
	
	
	getCustLevelAsyn:function(context,payload){
		let _this=payload._this;
			let url=_this.axios.urls.BASICS_MANAGE_LISTBYTYPE;
		
		_this.axios.post(url,{
			dict_type:'企业客户级别'
		}).then(resp=>{
			
			//通过resp响应对象获取返回的数据，并赋予payload
			payload.level=resp.data.data;
			console.log("resp---"+payload.level);
			 //提交一个mutation，用于设置state中的参数。
			context.commit('setPersonName',payload);
		}).catch(error=>{
			
		})
	}
}

export default actions
