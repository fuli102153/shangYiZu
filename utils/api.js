import http from '@/utils/http.js' 
 
export function login(data){ // 模拟登录
	return http({
	    url: 'test/login',
		method: 'post',
		contentType:'application/x-www-form-urlencoded',
		data: data
	 })
}