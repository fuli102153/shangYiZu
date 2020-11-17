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
			
			//请求常量
			getAllDictItems({accessToken:res.data}).then(res => {
				const data = res.data;
				
				if(data.code=="200"){
					let dict = data.data;
					let _d = {}
					dict.forEach((item)=>{
						_d[item.dictCode] = item.dictItemVos
					})
					Vue.prototype.Dict = _d;
					
				}else{}
				
			})
			.catch(error => {});
			
			getAllConfigs({accessToken:res.data}).then(res => {
				const data = res.data;
				
				if(data.code=="200"){
					let dict = data.data;
					let _d = {}
					dict.forEach((item)=>{
						_d[item.confKey] = item.confValue
					})
					Vue.prototype.Configs = _d;
					
					
				}else{}
				
			})
			.catch(error => {});
			
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
		geocode:true,
	    success: function (res) {
			Vue.prototype.location = res;
			console.log(res)
			let latitude,longitude;
			latitude = res.latitude.toString();
			longitude = res.longitude.toString();
			uni.request({
				header:{
					"Content-Type": "application/text"
				},
				url:'http://api.map.baidu.com/reverse_geocoding/v3/?ak=BI4QgGkWu6h0cNsMHrccZ9SGToeTaPig&output=json&location='+latitude+','+longitude,
				success(re) {
					console.log("中文位置");
					console.log(re);
					if(re.statusCode===200){
						Vue.prototype.address = re.data.result.addressComponent;
					}else{
						console.log("获取信息失败，请重试！")
					}
				}
			})
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

//2、字典查询
/*
Dict
	brand_identify 	开店身份
	business_type  招商类别
	delFlag 删除标记
	engineering_conditions 工程条件
	plat_real_auth 企业实名认证
	property_status 物业状况
	property_type 物业类型
	search_area 筛选-面积
	search_more_floorNum  筛选-更多-楼层
	search_more_rentNature  筛选-更多-租赁性质
	search_more_sort  筛选-更多-排序
	search_region_nearby  筛选-区域-附近
	shop_sort 商铺排序
	user_status 后台用户状态
	search_month_rent 月租金

Configs
	service_phone  客户电话
	about_us  关于我们
*/
export function getDict(para){
	getAllDictItems(para).then(res => {
		const data = res.data;
		if(data.code=="200"){
			let dict = data.data;
			let _d = {}
			dict.forEach((item)=>{
				_d[item.dictCode] = item.dictItemVos
			})
			Vue.prototype.Dict = _d;
			
		}else{}
	})
	.catch(error => {
	});
}

//2、个人信息查询
export function userInfo(data){ return post(data,'api/user/info')}

//3、设置个人角色
export function setRole(data){ return get(data,'api/user/setRole')}

//3.1、设置个人角色
export function getAgentUserInfo(data){ return get(data,'api/user/getAgentUserInfo')}

//3.2、查询公司合伙人信息
export function getCompanyUserInfo(data){ return get(data,'api/user/getCompanyUserInfo')}

//3.3、设置经纪合伙人信息
export function setAgentUserInfo(data){ return get(data,'api/user/setAgentUserInfo')}

//3.4、设置公司合伙人信息
export function setCompanyUserInfo(data){ return get(data,'api/user/setCompanyUserInfo')}

//4、城市列表
export function getCity(data){ return get(data,'api/region/city')}

//5、banner广告图
export function getBannerList(data){ return get(data,'api/banner/getList')}

//6、头条信息
export function getHeadline(data){ return get(data,'api/headline/getList')}

//7、本周重点推荐
export function getWeekRecommendList(data){ return get(data,'project/weekRecommend')}

//8、合作企业
export function getCooperativeList(data){ return get(data,'api/cooperativeEnterprise/getList')}

//9、猜你喜欢
export function getGuessYouLike(data){ return post(data,'shop/guessYouLike')}

//10、地图找铺
export function getMapForShop(data){ return post(data,'shop/mapForShop')}

//11、常量查询
export function getAllDictItems(data){ return get(data,'api/dict/auth/getAllDictItems')}

//12、项目列表
export function getProjectList(data){ return post(data,'project/projectList')}

//13、项目信息及旗下的物业列表
export function getProjectAndShopList(data){ return post(data,'project/projectAndShopList')}

//15、招租发布
export function getShopAdd(data){ return post(data,'shop/shopAdd')}

//16、商铺列表
export function getShopList(data){ return post(data,'shop/shopList')}

//17、商铺详情
export function getShopDetail(data){ return get(data,'shop/shopDetail')}

//18、看铺预约
export function getSubscribeAdd(data){ return post(data,'api/subscribe/subscribeAdd')}

//19、开店发布
export function getBrandAdd(data){ return post(data,'api/brand/add')}

//20、品牌列表
export function getBrandList(data){ return post(data,'open/brand/list')}

//21、品牌详情
export function getBrandDetail(data){ return get(data,'open/brand/detail')}

//22、招租委托查询
export function getMyShopList(data){ return post(data,'shop/myShopList')}

//23、商铺反馈
export function getLookShopFeedback(data){ return post(data,'shop/lookShopFeedback')}

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
export function getFeedBackAdd(data){ return post(data,'api/feedBack/feedBackAdd')}

//34、关于我们
export function getFeedBackAdd1(data){ return get(data,'api/feedBack/feedBackAdd')}

//35、用户协议及隐私协议
export function getFeedBackAdd2(data){ return get(data,'api/feedBack/feedBackAdd')}

//36、点击量，预约量
export function getAddNumber(data){ return get(data,'shop/addNumber')}

//37、上传
export function upload(data){ return post(data,'api/upload')}

//38、系统配置
export function getAllConfigs(data){ return get(data,'api/config/auth/getAllConfigs')}

//39、城市联动
export function getAreaStreets(data){ return get(data,'api/region/auth/getAreaStreets')}



