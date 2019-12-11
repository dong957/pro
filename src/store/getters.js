				
//getters将state中定义的值暴露在this.$store.getters对象中
//可以通过如下代码访问:this.$store.getters.getLeftAsideState
const getters={
	
	//参数state即为stroe中存放的state，在state.js定义
	getLeftAsideState:function(state){
		return state.LeftAsideState;
	},
	
	getPersonName:function(state){
		return state.personName;
	},
	
	getJwt:function(state){
		return state.jwt;
	},
	
	getCustLevel:function(state){
		return state.custLevel;
	},
	
	getUser:function(state){
		return state.user;
	},
	
	getSuccessd:function(state){
		return state.successd;
	},
	
	getDefeated:function(state){
		return state.defeated;
	},
	
	getServiceCreate:function(state){
		return state.serviceCreate;
	},
	
	getServiceAllocation:function(state){
		return state.serviceAllocation;
	},
	
	
	getServiceDispose:function(state){
		return state.serviceDispose;
	},
	
	
	getServiceArchive:function(state){
		return state.serviceArchive;
	},
	
}

export default getters


