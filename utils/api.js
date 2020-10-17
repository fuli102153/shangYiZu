import http from '@/utils/http.js' 
 
 


 //1、用户登录
export function login(data){ // 模拟登录
	return http({
	    url: 'api/user/auth/wxLogin',
		method: 'post',
		data: data
	})
}


//2、个人信息查询
export function userInfo(data){ 
	return http({
	    url: 'api/user/info',
		method: 'get',
		data: data
	})
}

//3、设置个人角色
export function setRole(data){ 
	return http({
	    url: 'api/user/setRole',
		method: 'get',
		data: data
	})
}


//4、城市列表
export function getCity(data){ 
	return http({
	    url: 'api/user/setRole',
		method: 'get',
		data: data
	})
}

//5、banner广告图
export function weekRecommend(data){ 
	return http({
	    url: 'api/project/weekRecommend',
		method: 'get',
		data: data
	})
}

//6、头条信息
export function weekRecommend1(data){ 
	return http({
	    url: 'api/project/weekRecommend',
		method: 'get',
		data: data
	})
}



