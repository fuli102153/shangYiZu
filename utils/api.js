import http from '@/utils/http.js' 
 
 
const apiUrl = 'api.ofowan.com'

 
export function login(data){ // 模拟登录
	return http({
	    url: apiUrl+'/api/user/auth/wxLogin',
		method: 'post',
		contentType:'application/x-www-form-urlencoded',
		data: data
	})
}

