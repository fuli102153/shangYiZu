import http from '@/utils/http.js' 
import Vue from 'vue'


function get(data,url){ 
	return http({
	    url: url,
		method: 'get',
		accessToken:data.accessToken,
		data: data
	})
}

function post(data,url){ 
	return http({
	    url: url,
		method: 'post',
		accessToken:data.accessToken,
		data: data
	})
}
 
export function getAccessToken(){
	uni.getStorage({
		key: "__accessToken__",
		success: (res) => {
			Vue.prototype.accessToken = res.data;
		},
		fail: () => {
			
		}
	})
}

 //1、用户登录
export function login(data){ 
	return http({
	    url: 'api/user/auth/wxLogin',
		method: 'post',
		data: data
	})
}

//2、个人信息查询
export function userInfo(data){ return post(data,'api/user/info')}

//3、设置个人角色
export function setRole(data){ return get(data,'api/user/setRole')}

//4、城市列表
export function getCity(data){ return get(data,'api/user/setRole')}

//5、banner广告图
export function getBannerList(data){ return get(data,'api/banner/getList')}

//6、头条信息
export function getTopInfo(data){ return get(data,'api/banner/getList')}

//7、本周重点推荐
export function getWeekRecommendList(data){ return get(data,'project/weekRecommend')}

//8、合作企业
export function getCooperativeList(data){ return get(data,'api/cooperativeEnterprise/getList')}

//9、猜你喜欢
export function getGuessYouLike(data){ return post(data,'shop/guessYouLike')}

//10、地图找铺
export function getMapForShop(data){ return get(data,'api/shop/mapForShop')}

//11、常量查询
export function getMapForShop111(data){ return get(data,'api/shop/mapForShop')}

//12、项目列表
export function getProjectList(data){ return post(data,'project/projectList')}

//13、项目信息及旗下的物业列表
export function getProjectAndShopList(data){ return get(data,'api/project/projectAndShopList')}

//15、招租发布
export function get111(data){ return get(data,'api/shop/mapForShop')}



