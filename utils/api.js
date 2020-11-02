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
	

	
	//设置用户的基础信息
	uni.getStorage({
		key: "__userDetail__",
		success: (res) => {
			Vue.prototype.userDetail = res.data;
			console.log(res.data)
		},
		fail: () => {
			
		}
	})
	
	//设置用户的坐标信息
	uni.getLocation({
	    type: 'wgs84',
	    success: function (res) {
			Vue.prototype.location = res;
			console.log(res)
			
	    }
	});
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
export function getHeadline(data){ return get(data,'api/headline/getList')}

//7、本周重点推荐
export function getWeekRecommendList(data){ return get(data,'api/project/weekRecommend')}

//8、合作企业
export function getCooperativeList(data){ return get(data,'api/cooperativeEnterprise/getList')}

//9、猜你喜欢
export function getGuessYouLike(data){ return post(data,'api/shop/guessYouLike')}

//10、地图找铺
export function getMapForShop(data){ return get(data,'api/shop/mapForShop')}

//11、常量查询
export function getMapForShop111(data){ return get(data,'api/shop/mapForShop')}

//12、项目列表
export function getProjectList(data){ return post(data,'api/project/projectList')}

//13、项目信息及旗下的物业列表
export function getProjectAndShopList(data){ return post(data,'api/project/projectAndShopList')}

//15、招租发布
export function get111(data){ return get(data,'api/shop/mapForShop')}

//16、商铺列表
export function getShopList(data){ return post(data,'api/shop/shopList')}

//17、商铺详情
export function getShopDetail(data){ return get(data,'api/shop/shopDetail')}

//18、看铺预约
export function getSubscribeAdd(data){ return post(data,'api/subscribe/subscribeAdd')}

//19、开店发布
export function getBrandAdd(data){ return get(data,'api/brand/add')}

//20、品牌列表
export function getBrandList(data){ return post(data,'api/brand/list')}

//21、品牌详情
export function getBrandDetail(data){ return get(data,'api/brand/detail')}

//22、招租委托查询
export function getMyShopList(data){ return post(data,'api/shop/myShopList')}

//23、商铺反馈
export function getLookShopFeedback(data){ return post(data,'api/shop/lookShopFeedback')}

//23、开店委托查询
export function getEntrustmentList(data){ return get(data,'api/brand/entrustment/list')}

//24、我的合同查询
export function getContractList(data){ return get(data,'api/contract/list')}

//25、查看合同
export function getContractDetail(data){ return get(data,'api/contract/detail')}

//26、合同签署
export function getContractSign(data){ return get(data,'api/contract/sign')}

//27、收藏
export function getCollectAdd(data){ return post(data,'api/collect/collectAdd')}

//28、我的收藏列表
export function getCollectList(data){ return post(data,'api/collect/getMyCollect')}

//29、我的预约记录
export function getMySubscribe(data){ return post(data,'api/subscribe/getMySubscribe')}

//30、分享
export function getShareAdd(data){ return post(data,'api/share/shareAdd')}

//31、我的分享记录
export function getMyShare(data){ return post(data,'api/share/getMyShare')}

//32、常见问题解答
export function getMyShare11(data){ return get(data,'api/share/getMyShare')}

//33、帮助及反馈
export function getFeedBackAdd(data){ return get(data,'api/feedBack/feedBackAdd')}

//34、关于我们
export function getFeedBackAdd1(data){ return get(data,'api/feedBack/feedBackAdd')}

//35、用户协议及隐私协议
export function getFeedBackAdd2(data){ return get(data,'api/feedBack/feedBackAdd')}

//36、点击量，预约量
export function getAddNumber(data){ return get(data,'api/shop/addNumber')}

//37、上传
export function upload(data){ return post(data,'api/upload')}



