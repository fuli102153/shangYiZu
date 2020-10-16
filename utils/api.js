import http from '@/utils/http.js' 
 
 


 
export function login(data){ // 模拟登录
	return http({
	    url: 'api/user/auth/wxLogin',
		method: 'post',
		//contentType:'application/x-www-form-urlencoded',
		data: data
	})
}

