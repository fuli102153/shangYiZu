<template>
	<view class="v-index">
		<view class="header">
			<view class="location" @click="showPopup">
				<van-icon name="location" class="location-icon" color="#2B2B2B" size="30rpx" />
				<text>{{localtionCity.cityName}}</text>
				<van-icon name="play" class="arrow" color="#2B2B2B" size="17rpx" />
			</view>
			<view class="search" @click="goSearch">
				<van-search v-model="value" shape="round"  placeholder="点击搜索目的地/关键词" @search="onSearch" />
			</view>
			<!-- <view class="shop-partner" @click="goShopPartner">
				<text>商铺合伙人</text>
				<van-icon name="play-circle" size="26rpx" color="#ffffff" />
			</view> -->
		</view>
		<!-- 地址弹出层 -->
		<van-popup :show="locationShow" @close="onClose" position="top" round custom-style="max-height: 60%;">
			<van-cell-group class="city">
				<van-cell v-for="(item, index) in cityList" :key="index" center :label="item.cityName" :title="index === 0 ? '已开通城市' : ''"
				 :class="activeCity === index ? 'active' : ''" @click="selectCity(index, item)">
					<template #right-icon>
						<van-icon v-if="activeCity === index" name="success" color="#1676FE" />
					</template>
				</van-cell>
			</van-cell-group>
		</van-popup>
		<!-- 轮播图 -->
		<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode" :dotsStyles="dotsStyles">
			<swiper class="swiper-box" @change="change" :interval="5000" :autoplay="true">
				<swiper-item v-for="(item ,index) in bannerList" :key="index">
					<view class="swiper-item">
						<image :src="item.pics?item.pics : '../../static/images/swiper.png'" mode="" style="width: 100%; height: 400rpx;"></image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<!-- 头条 -->
		<!-- <view class="toutiao" >
			<view class="toutiao-icon">
				<view class="toutiao-text" @click="goHeadlines">
					<i class="headline-logo"></i>
				</view>
			</view>
			<view class="toutiao-link">
				<swiper class="swiper-container" :autoplay="true" :vertical="true" :circular="true" :interval="3000">
				  <swiper-item v-for="(item, index) in headlineList" :key="index">
				    <view class='swiper-item' @click="goHeadDetails(item)">{{ item.title }}</view>
				  </swiper-item>
				</swiper>
				<van-icon name="play" color="#002464" size="26rpx" />
			</view>
		</view> -->
		<!-- 导航 -->
		<view class="nav">
			<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="toPath(item.router)">
				<image :src="item.src" />
				<text>{{ item.name }}</text>
			</view>
		</view>
		<!-- 出租和找店 -->
		<view class="rent">
			<view class="rel-rent rent-item">
				<view class="text">
					<view class="title">
						我要出租
					</view>
					<view class="label">
						服务物业面积：
					</view>
					<view class="value">
						{{shopSumMeasureArea}} m²
					</view>
				</view>
				<view class="btn" @click="toPath('../Rental/index')" />
			</view>
			<view class="looking-shop rent-item">
				<view class="text">
					<view class="title">
						我要找店
					</view>
					<view class="label">
						服务品牌数量：
					</view>
					<view class="value">
						{{brandCount}} 个
					</view>
				</view>
				<view class="btn"  @click="toPath('../StoreOpen/index')" />
			</view>
		</view>
		<!-- 推荐 -->
		<view class="recommend">
			<view class="recommend-title">精选项目</view>
			<view class="recommend-content">
				<view class="recommend-list">
					<van-empty v-if="weekRecommendList.length==0" description="暂无数据" />
					<view class="recommend-item" @click="toProject(item.id)" v-for="item in weekRecommendList" :key="item">
						<view class="recommend-image">
							<image :src="item.projectImg"></image>
						</view>
						<view class="recommend-text">
							<view class="title">
								{{ item.projectName }}
							</view>
							<text>
								南山区
							</text>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		
		<!-- 精选商铺 -->
		<view class="store">
			<view class="store-header">
				<view class="title">
					精选商铺
				</view>
				<view class="more">
					
				</view>
			</view>
			<view class="store-list">
				<StoreCard v-for="(item,index) in guessYouLikeList.slice(0, 3)" :sourceData="item" :lastLine="index==2" :key="item" />
			</view>
			<view class="store-more">
				<span>查看更多铺源</span>
				<van-icon name="arrow" color="#9B9B9A" size="20rpx" />
			</view>
		</view>
		
		<!-- 轮播图 -->
		<view class="mid-banner">
			<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode" :dotsStyles="dotsStyles">
				<swiper class="swiper-box" @change="change" :interval="3000" :autoplay="true">
					<swiper-item v-for="(item ,index) in bannerList" :key="index">
						<view class="swiper-item">
							<image :src="item.pics?item.pics : '../../static/images/swiper.png'" mode="" style="width: 100%; height: 300rpx;"></image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		
		<!-- 精选品牌 -->
		<view class="store">
			<view class="store-header">
				<view class="title">
					精选品牌
				</view>
				<view class="more">
					
				</view>
			</view>
			<view class="store-list">
				<StoreCard v-for="(item,index) in guessYouLikeList.slice(0, 3)" :sourceData="item" :lastLine="index==2" :key="item" />
			</view>
			<view class="store-more">
				<span>查看更多品牌</span>
				<van-icon name="arrow" color="#9B9B9A" size="20rpx" />
			</view>
		</view>
		
		<!-- 合作企业 -->
		<view class="coop">
			<view class="coop-content">
				<view class="coop-header">
					<view class="coop-title">合作品牌</view>
					<!-- <view class="coop-more" @click="goCoop">更多 ></view> -->
				</view>
				<view class="coop-list">
					<view class="coop-item" v-for="(item,index) in cooperativeList.slice(0,4)" :key="index">
						<image class="image" :src="item.logo" /> 
						<text>{{item.enterpriseName}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 新闻中心 -->
		<view class="new">
			<view class="title">
				新闻中心
			</view>
			<van-tabs class="tab" :active="newActive" @change="onChange" color="#1476FD" line-width="50rpx">
				<van-tab title="行业动态">
					<view class="new-card" v-for="item in 5" :key="item">
						<view class="new-img">
							<image src="" mode=""></image>
						</view>
						<view class="new-title">
                            鹏润达商业广场热门招商鹏润达商业广场热门招商鹏润达商业广场热门招商
						</view>
					</view>
				</van-tab>
				<van-tab title="热门话题">
					<view class="new-card" v-for="item in 5" :key="item">
						<view class="new-img">
							<image src="" mode=""></image>
						</view>
						<view class="new-title">
					        鹏润达商业广场热门招商鹏润达商业广场热门招商鹏润达商业广场热门招商
						</view>
					</view>
				</van-tab>
			</van-tabs>
		</view>
		<!-- 获取定位城市 -->
		<baidu-map @ready="handler" />
	</view>
</template>

<script>
	import StoreCard from '../../components/Card/Store'
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	import {getBannerList,getWeekRecommendList,getGuessYouLike,getCooperativeList,getHeadline,getCity,getShopSumMeasureArea,getBrandCount,getBrandSpecialList} from "../../utils/api.js"
	export default {
		components: {
			StoreCard,
			uniSwiperDot,
		},
		data() {
			return {
				locationShow: false,
				cityList: [],
				activeCity: null,
				// 轮播图
				info: [{
					content: '内容 A'
				}, {
					content: '内容 B'
				}, {
					content: '内容 C'
				}],
				current: 0,
				mode: 'round',
				dotsStyles: {
					width: 5,
					height: 5,
					backgroundColor: '#7D7D7D',
					selectedBackgroundColor: '#1FA1FF',
					border: 'none',
					selectedBorder: 'none'
				},
				navList: [{
						name: '地图找铺',
						src: '../../static/images/Map.png',
						router: '../Map/index'
					},
					{
						name: '招租发布',
						src: '../../static/images/Hire.png',
						router: '../Rental/index'
					},
					{
						name: '开店发布',
						src: '../../static/images/OpenShop.png',
						router: '../StoreOpen/index'
					},
					{
						name: '购物中心',
						src: '../../static/images/Shopping.png',
						router: '../ShoppingMall/index?projectType=1'
					},
					{
						name: '社区底商',
						src: '../../static/images/Community.png',
						router: '../ShoppingMall/index?projectType=2'
					},
					{
						name: '整租物业',
						src: '../../static/images/WholeRent.png',
						router: '../ShoppingMall/index?projectType=3'
					},
					{
						name: '商业街区',
						src: '../../static/images/CommercialStreet.png',
						router: '../ShoppingMall/index?projectType=4'
					},
					{
						name: '综合配套',
						src: '../../static/images/ComprehensiveMatching.png',
						router: '../ShoppingMall/index?projectType=5'
					},
					{
						name: '专业市场',
						src: '../../static/images/ProfessionalMarket.png',
						router: '../ShoppingMall/index?projectType=6'
					},
					{
						name: '娱乐教育',
						src: '../../static/images/EntertainmentEducation.png',
						router: '../ShoppingMall/index?projectType=7'
					},
				],
				localtionCity:{},
				bannerList:[],
				weekRecommendList:[],
				guessYouLikeList:[],
				cooperativeList:[],
				headlineList:[],
				// 新闻中心
				newActive: 0,
				//商铺总面积
				shopSumMeasureArea:0,
				brandCount:0,
			};
		},
		onLoad() {
			//请求BANNER
			this.ajaxGetBanner();
			this.reload();
			//合作企业
			this.ajaxGetCooperativeList();
			//头条信息
			this.ajaxGetHeadline();
			//城市列表
			this.ajaxGetCityList();
			//新增商铺总面积
			this.ajaxGetShopSumMeasureArea();
			//品牌总数
			this.ajaxGetBrandCount();
			//精选品牌
			this.ajaxGetBrandSpecialList();
			

			this.localtionCity = this.$Localtion.city;
			this.$forceUpdate();
		},
		onShow(){
			//console.log(this.$LocaltionCity)
			
			
		},
		methods: {
			reload(){
				//本周重点推荐
				this.ajaxGetWeekRecommendList();
				//猜你喜欢
				this.ajaxGetGuessYouLike();
			},
			// 打开关闭弹出层
			showPopup() {
				this.locationShow = true;
			},
			onClose() {
				this.locationShow = false;
			},
			// 选中城市
			selectCity(index) {
				var that = this;
				this.activeCity = index;
				uni.setStorage({
					key: "__localtionCity__",
					data: this.cityList[index],
					success: (res) => {
						this.$Localtion.city  = this.cityList[index];
						this.localtionCity  = this.cityList[index];
						this.$forceUpdate();
						this.onClose();
						//需要重新加载页面  才能刷新全局
						this.reload();
					},
					fail: () => {
						uni.showModal({
							title: '用户信息获取失败!',
							showCancel:false
						})
					}
				})
				
			},
			toPath(url) {
				uni.navigateTo({
					url: url
				})
			},
			// 进入商铺合伙人
			goShopPartner() {
				uni.navigateTo({
					url: "../ShopPartner/index"
				})
			},
			// 进入商易租头条
			goHeadlines() {
				uni.navigateTo({
					url: "../Headlines/index"
				})
			},
			goHeadDetails(item) {
				uni.navigateTo({
					url: '../Headlines/details?item=' + JSON.stringify(item)
				})
			},
			// 进入搜索页
			goSearch() {
				uni.navigateTo({
					url: "../Search/index"
				})
			},
			//项目信息和旗下的物业列表
			toProject(id){
				uni.navigateTo({
					url: "../ShoppingMall/project?projectId="+id
				})
			},
			// 进入合作企业
			goCoop() {
				uni.navigateTo({
					url: './CooperativeEnterprise'
				})
			},
			// 轮播图
			change(e) {
				this.current = e.detail.current;
			},
			// 新闻中心tab切换
			onChange(e) {
				console.log('新闻中心tab切换', e.detail)
			},
			
			//请求BANNER图片
			ajaxGetBanner(){
				//ajax个人信息查询
				var that = this;
				const paras = {};
				paras.accessToken = that.accessToken;
				
				getBannerList(paras).then(res => {
					const data = res.data;
					console.log(data);
					if(data.code=="200"){
						that.bannerList = data.data;
					}else{
						
					}
				})
				.catch(error => {
				
				});
			},
			
			//请求本周重点推荐
			ajaxGetWeekRecommendList(){
				//ajax个人信息查询
				var that = this;
				const paras = {
					cityCode:this.$Localtion.city.cityCode
				};
				paras.accessToken = that.accessToken;
				getWeekRecommendList(paras).then(res => {
					const data = res.data;
					console.log(data);
					if(data.code=="200"){
						that.weekRecommendList = data.data;
					}else{
						
					}
				})
				.catch(error => {
				
				});
			},
			
			//猜你喜欢
			ajaxGetGuessYouLike(){
				//ajax个人信息查询
				var that = this;
				const paras = {
					cityCode:this.$Localtion.city.cityCode,
					pageNo:1,
					pageSize:10,
				};
				paras.accessToken = that.accessToken;
				getGuessYouLike(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						that.guessYouLikeList = data.data;
					}else{
						
					}
				})
				.catch(error => {
				
				});
			},
			
			//合作企业
			ajaxGetCooperativeList(){
				//ajax个人信息查询
				var that = this;
				const paras = {
					pageNo:1,
					pageSize:10,
				};
				paras.accessToken = that.accessToken;
				getCooperativeList(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						that.cooperativeList = data.data;
					}else{
						
					}
					
				})
				.catch(error => {
				
				});
			},
			
			//头条信息
			ajaxGetHeadline(){
				//ajax个人信息查询
				var that = this;
				const paras = {
					pageNo:1,
					pageSize:10,
				};
				paras.accessToken = that.accessToken;
				getHeadline(paras).then(res => {
					const data = res.data;
					console.log(data);
					if(data.code=="200"){
						that.headlineList = data.data;
					}else{
						
					}
				})
				.catch(error => {
				
				});
			},
			
			ajaxGetCityList(){
				var that = this;
				const paras = {
				};
				paras.accessToken = that.accessToken;
				getCity(paras).then(res => {
					const data = res.data;
					console.log(data);
					if(data.code=="200"){
						that.cityList = data.data;
					}else{
						
					}
				})
				.catch(error => {
				
				});
			},
			
			ajaxGetShopSumMeasureArea(){
				var that = this;
				const paras = {
				};
				paras.accessToken = that.accessToken;
				getShopSumMeasureArea(paras).then(res => {
					const data = res.data;
					
					console.log(data);
					if(data.code=="200"){
						that.shopSumMeasureArea = that._toThousands(data.data);
					}else{
						
					}
				})
				.catch(error => {
				
				});
			},
			
			ajaxGetBrandCount(){
				var that = this;
				const paras = {
				};
				paras.accessToken = that.accessToken;
				getBrandCount(paras).then(res => {
					const data = res.data;
					
					console.log(data);
					if(data.code=="200"){
						that.brandCount = that._toThousands(data.data);
					}else{
						
					}
				})
				.catch(error => {
				
				});
			},
			
			
			ajaxGetBrandSpecialList(){
				var that = this;
				const paras = {
				};
				paras.accessToken = that.accessToken;
				getBrandSpecialList(paras).then(res => {
					const data = res.data;
					console.log(data);
					if(data.code=="200"){
						//that.brandCount = that._toThousands(data.data);
					}else{
						
					}
				})
				.catch(error => {
				
				});
			},
			
			
			_toThousands(num) {
				var result = [ ], counter = 0;
				num = (num || 0).toString().split('');
				for (var i = num.length - 1; i >= 0; i--) {
				counter++;
				result.unshift(num[i]);
				if (!(counter % 3) && i != 0) { result.unshift(','); }
				}
				return result.join('');
			}
			
			
		},
	};
</script>

<style lang="scss" scoped>
	.v-index {
		width: 100%;
		background-color: #fff;
		
		.header {
			padding: 0rpx 24rpx;
			background: #ffffff;
			display: flex;
			.location {
				width: 160rpx;
				font-size: 24rpx;
				color: #2B2B2B;
				display: flex;
				align-items: center;
				.location-icon {
					margin-right: 8rpx;
				}
				.arrow {
					transform: rotate(90deg);
					margin-left: 8rpx;
				}
			}
			.search {
				flex: 1;
			}
			
			.shop-partner {
				flex: 1;
				color: #fff;
				font-size: 32rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				
				text {
					margin-right: 10rpx;
				}
			}
		}
		.van-popup {
			background-color: #f5f8fa;
			.city {
				margin-top: 10rpx;
				.van-cell__title {
					>span {
						font-size: 24rpx;
						color: #a5a5a5;
					}
					.van-cell__label {
						display: flex;
						align-items: center;
						font-size: 32rpx;
						color: #2e2e2e;
					}
				}
				.active {
					.van-cell__label {
						color: #1676fe;
					}
				}
			}
		}
		
		.swiper-box{
			height: 400rpx;
		}
		
		.toutiao {
			padding: 26rpx;
			background-color: #1676FE;
			position: relative;
			.toutiao-icon {
				width: 126rpx;
				height: 74rpx;
				background-image: url('../../static/images/toutiao.png');
				background-size: 100%;
				position: relative;
				z-index: 1;
				.toutiao-text {
					width: 115rpx;
					padding-top: 6rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					
					.headline-logo {
						background-image: url(../../static/images/headLine.png);
						background-size: 100%;
						width: 64rpx;
						height: 64rpx;
					}
				}
			}
			.toutiao-link {
				width: 650rpx;
				height: 64rpx;
				background-color: #ffffff;
				position: absolute;
				top: 50%;
				left: 72rpx;
				transform: translateY(-50%);
				display: flex;
				align-items: center;
				justify-content: flex-end;
				border-radius: 32rpx;
				box-sizing: border-box;
				padding-right: 16rpx;
				overflow: hidden;
				 
				.swiper-container {
					margin-left: 10rpx;
					width: 500rpx;
					height: 100%;
				}
				 
				.swiper-item {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					width: 100%;
					font-size: 28rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					letter-spacing: 2rpx;
					color: #2E2E2E;
				}
			}
		}
		
		.nav {
			padding: 10rpx 20rpx 46rpx 20rpx;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			.nav-item {
				width: 20%;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 36rpx;
				image {
					width: 80rpx;
					height: 80rpx;
				}
				text {
					margin-top: 20rpx;
					font-size: 24rpx;
				}
			}
		}
		
		.rent {
			padding: 0 36rpx;
			display: flex;
			justify-content: space-between;
			
			.rent-item {
				width: 328rpx;
				height: 250rpx;
				background-size: 100%;
				box-sizing: border-box;
				padding: 33rpx 23rpx 12rpx 23rpx;
				color: #ffffff;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				
				.text {
					.title {
						font-size: 24rpx;
						letter-spacing: 6rpx;
					}
					
					.label {
						font-size: 20rpx;
						letter-spacing: 4rpx;
					}
					
					.value {
						font-size: 22rpx;
						letter-spacing: 4rpx;
					}
				}
				
				.btn {
					width: 157rpx;
					height: 53rpx;
				}
			}
			
			.rel-rent {
				background: url(../../static/images/rel-rent-bg.png) no-repeat;
				background-size: 100%;
				.btn {
					background: url(../../static/images/publishing-shop.png) no-repeat;
					background-size: 100%;
				}
			}
			.looking-shop {
				background: url(../../static/images/look-shop-bg.png) no-repeat;
				background-size: 100%;
				.btn {
					background: url(../../static/images/brand-launch.png) no-repeat;
					background-size: 100%;
				}
			}
		}
		
		.recommend {
			background-color: #ffffff;
			padding: 36rpx 0;
			.recommend-title {
				font-size: 32rpx;
			
				color: #302F2C;
				margin-bottom: 25rpx;
				padding-left: 35rpx;
			}
			
			.recommend-content {
				width: 100%;
				overflow-x: auto;
				
				&::-webkit-scrollbar{
					display: none;
				}
				
				.recommend-list {
					white-space: nowrap;
					font-size: 0;
					padding: 0 35rpx;
					
					.recommend-item {
						width: 200rpx;
						height: 300rpx;
						border-radius: 8rpx;
						background-color: #eee;
						margin-right: 20rpx;
						display: inline-block;
						vertical-align: middle;
						box-sizing: border-box;
						overflow: hidden;
						position: relative;
						
						.recommend-image {
							image {
								width: 200rpx;
								height: 300rpx;
							}
						}
						
						.recommend-text {
							width: 100%;
							color: #fff;
							height: 80rpx;
							background: rgba(0, 0, 0, 0.3);
							position: absolute;
							bottom: 0;
							padding: 4rpx 19rpx;
							
							.title {
								font-size: 24rpx;
								line-height: 36rpx;
							}
							text {
								font-size: 20rpx;
								line-height: 36rpx;
							}
						}
					}
				}
			}
		}
		.coop {
			padding: 16rpx 0;
			.coop-content {
				background-color: #fff;
				border-radius: 10rpx;
				padding-bottom: 35rpx;
				.coop-header {
					padding: 38rpx 34rpx 28rpx 34rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.coop-title {
						font-size: 32rpx;
					
						color: #302F2C;
						margin-bottom: 25rpx;
					}
					.coop-more {
						font-size: 30rpx;
						color: #1676FE;
					}
				}
				.coop-list {
					width: 100%;
					.coop-item {
						display: inline-block;
						text-align:center;
						width: 25%;
						.image {
							width: 120rpx;
							height: 120rpx;
							border-radius: 50%;
							background: #DAE9FF;
							display: block;
							margin: 0 auto;
						}
						text {
							font-size: 28rpx;
							color: #6A6A6A;
							margin-top: 14rpx;
						}
					}
				}
			}
		}
		.store {
			padding: 0 35rpx;
			.store-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.title {
					font-size: 32rpx;
					
					color: #302F2C;
					line-height: 42rpx;
					margin-bottom: 25rpx;
				}
			}
			.store-more {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 70rpx;
				span {
					font-size: 20rpx;
					color: #9B9B9A;
					line-height: 36px;
					margin-right: 20rpx;
				}
			}
		}
		
		.mid-banner {
			padding: 0 36rpx;
			margin: 50rpx 0;
			
			.swiper-box{
				height: 300rpx;
			}
		}
		
		.new {
			padding: 0 35rpx;
			margin-top: 20rpx;
			
			/deep/ .tab{
				.van-tab {
					flex: none;
					margin-right: 36rpx;
					
					.van-ellipsis {
						font-size: 24rpx;
					}
					
					.van-tab__pane {
						border-top: 1px solid #EFF0EF;
					}
				}
			}
			
			.title {
				font-size: 32rpx;
				color: #302F2C;
				line-height: 42rpx;
				margin-bottom: 25rpx;
			}
			
			.new-card {
				padding-top: 20rpx;
				.new-img {
					width: 678rpx;
					height: 300rpx;
					background: #808080;
					border-radius: 8rpx;
					
					image {
						width: 678rpx;
						height: 300rpx;
					}
				}
				.new-title {
					font-size: 24rpx;
					line-height: 36rpx;
					color: #1A1A1A;
					margin-top: 12rpx;
				}
			}
		}
	}
</style>