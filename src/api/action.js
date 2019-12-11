/**
 * 对后台请求的地址的封装，URL格式如下：
 * 模块名_实体名_操作
 */
export default {
	'SERVER': 'http://localhost:8080', //服务器
	'SYSTEM_USER_DOLOGIN': '/userMsg/userAction!dologin.action', //登陆
	'SYSTEM_USER_DOREG': '/userMsg/userAction!register', //注册
	'SYSTEM_USER_LIST':'/userMsg/userAction!listAllUser.action',//查询所有用户

	'SYSTEM_MODDULE_NAVMENU':'/root/module',//首页菜单


	/* 营销计划 */
	'SALCHANCE_MANAGE_QUERYPAGER':'/salChanceMsg/salChanceAction!listAll.action',//销售机会分页查询
	'SALCHANCE_MANAGE_ADD':'/salChanceMsg/salChanceAction!addSalChance.action',//销售机会新增
	'SALCHANCE_MANAGE_UPDATE':'/salChanceMsg/salChanceAction!updateSalChance.action',//销售机会修改
	'SALCHANCE_MANAGE_DEL':'/salChanceMsg/salChanceAction!delSalChance.action',//销售机会删除
	'SALCHANCE_MANAGE_DUE':'/salChanceMsg/salChanceAction!dueSalChance.action',//指派销售机会
	'SALCHANCE_MANAGE_STOP':'/salChanceMsg/salChanceAction!salChanceUnsuccessful.action',//开发失败


	'SALPLAN_MANAGE_LISTBY':'/salPlanMsg/salPlanAction!getSalPlanBychc_id.action',//根据销售机会id查询对应的多个销售计划
	'SALPLAN_MANAGE_SAVE':'/salPlanMsg/salPlanAction!saveSalPlan.action',//新增销售计划
	'SALPLAN_MANAGE_UPDATETO':'/salPlanMsg/salPlanAction!updateSalPlanTodo.action',//修改计划内容
	'SALPLAN_MANAGE_DELETE':'/salPlanMsg/salPlanAction!deleteSalPlan.action',//删除计划内容
	'SALPLAN_MANAGE_UPDATERESULT':'/salPlanMsg/salPlanAction!updateSalPlanToResult.action',//修改计划内容

	'SALPLAN_LOOK_STATUS':'/salChanceMsg/salChanceAction!getStatus.action',//获取开发成功&开发失败的数量


	/* 客户 */
	'CUSTOMER_MANAGE_ADD':'/customerMsg/customerAction!addCustomer.action',//客户信息新增
	'CUSTOMER_MANAGE_QUERYPAGE':'/customerMsg/customerAction!listPageCustomer.action',//客户信息分页查询
	'CUSTOMER_MANAGE_UPDATE':'/customerMsg/customerAction!updateCustomer.action',//客户信息修改

	'CUSTMOER_LINKMAN_QUERYPAGE':'/linkmanMsg/linkmanAction!queryLinkman.action',//联系人分页查询
	'CUSTOMER_LINKMAN_ADD':'/linkmanMsg/linkmanAction!addLinkman.action',//联系人新增
	'CUSTOMER_LINKMAN_UPDATE':'/linkmanMsg/linkmanAction!updateLinkman.action',//修改联系人
	'CUSTOMER_LINKMAN_DELETE':'/linkmanMsg/linkmanAction!delLinkman.action',//删除联系人

	'CUSTOMER_ACTICITY_QUERYPAGES':'/acticityMsg/acticityAction!queryAllAtv.action',//交往记录分页查询
	'CUSTOMER_ACTICITY_ADD':'/acticityMsg/acticityAction!addAtv.action',//交往记录新增
	'CUSTOMER_ACTICITY_UPDATE':'/acticityMsg/acticityAction!updateAtv.action',//交往记录修改
	'CUSTOMER_ACTICITY_DELETE':'/acticityMsg/acticityAction!deleteAtv.action',//交往记录删除

	'CUSTOMER_ORDERS_QUERYPAGES':'/ordersMsg/ordersAction!listPages.action',//客户订单分页查询
	'CUSTOMER_ORDERS_PRODUCT':'/ordersProductMsg/ordersProductAction!listOrderProduct.action',//订单明细和产品

	'CUSTOMER_LOST_PAGES':'/lostMsg/lostAction!listPages.action',//客户流失分页查询
	'CUSTOMER_LOST_DEFER':'/lostMsg/lostAction!deferLost.action',//客户流失-暂缓措施
	'CUSTOMER_LOST_CONFIRM':'/lostMsg/lostAction!confirmLost.action',//客户流失-确认流失



	/* 客户服务 */
	'SERVICE_MANAGE_ADD':'/serviceMsg/serviceAction!addService.action',//服务创建
	'SERVICE_MANAGE_QUERYPAGES':'/serviceMsg/serviceAction!getlistService.action',//服务分页查询
	'SERVICE_MANAGE_DELETE':'/serviceMsg/serviceAction!delService.action',//服务删除
	'SERVICE_MANAGE_DUE':'/serviceMsg/serviceAction!dueTo.action',//服务分配
	'SERVICE_MANAGE_DISPOSE':'/serviceMsg/serviceAction!updateService.action',//服务处理
	'SERVICE_MANAGE_FEEDBACK':'/serviceMsg/serviceAction!dealResult.action',//服务反馈

	'SERVICE_MANAGE_STATUS':'/serviceMsg/serviceAction!getStatus.action',//根据状态获取服务数量




	/* 统计报表 */
	'STATISTICS_MANAGE_CUSTOMER_ORDERS':'/orderSumMsg/orderSumAction!getOrderSum.action',//客户贡献分析
	'STATISTICS_MANAGE_CUSTOMER_MAKE':'/custMakeMsg/custMakeAction!getCustMake.action',//客户构成分析
	'STATISTICS_MANAGE_CUSTOMER_SERVICE':'/listCustMsg/listCustAction!getService.action',//客户服务分析
	'STATISTICS_MANAGE_CUSTOMER_LOST':'/lostMsg/lostAction!getLostCustomer.action',//客户流失统计




	/* 数据字典 */
	'BASICS_MANAGE_DICTLISTPAGE':'/dictMsg/dictAction!getAllDict.action',//数据字典分页查询
	'BASICS_MANAGE_DICTADD':'/dictMsg/dictAction!addDict.action',//数据字典新增
	'BASICS_MANAGE_DICTUPDATE':'/dictMsg/dictAction!updateDict.action',//数据字典修改
	'BASICS_MANAGE_DICTDELETE':'/dictMsg/dictAction!delDict.action',//数据字典删除

	'BASICS_PRODUCT_LIST':'/productMsg/productAction!listProduct.action',//查询产品信息
	'BASICS_STORAGE_LIST':'/storageMsg/storageAction!listStorage.action',//查询库存



	'BASICS_MANAGE_AUTOCOMPLETE':'/dictMsg/dictAction!queryType.action',//数据字典新增呢时自动补全类别
	'BASICS_MANAGE_LISTBYTYPE':'/dictMsg/dictAction!getListByType.action',// 根据类别获取数据


	'VUE_ASYN_REQ':'/userMsg/vueAsynAction!asynAction.action',//VUEX 异步请求后台数据

	'getFullPath': k => { //获得请求的完整地址，用于mockjs测试时使用
		return this.SERVER + this[k];
	}
}
