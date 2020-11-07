<template>
	<view class="v-index">
		<view class="header">
			<view class="location" @click="showPopup">
				<van-icon name="location" class="location-icon" color="#fff" size="30rpx" />
				<text>深圳</text>
				<van-icon name="play" class="arrow" color="#fff" size="17rpx" />
			</view>
			<view class="search" @click="goSearch">
				<i class="search-icon" />
				<text class="search-text">搜索城市或店铺</text>
			</view>
			<view class="shop-partner" @click="goShopPartner">
				<text>商铺合伙人</text>
				<van-icon name="play-circle" size="26rpx" color="#ffffff" />
			</view>
		</view>
		<!-- 地址弹出层 -->
		<van-popup :show="locationShow" @close="onClose" position="top" round>
			<van-cell-group>
				<van-cell title="选择城市" value="" size="large" />
			</van-cell-group>
			<van-cell-group class="city">
				<van-cell center title="当前定位">
					<template #default>
						<van-button round plain type="info" size="mini">手动定位</van-button>
					</template>
					<template #label>
						<van-icon name="location" class="location-icon" color="#1676fe" size="30rpx" />
						<span>{{locationCity.cityName}}</span>
					</template>
				</van-cell>
				<van-cell v-for="(item, index) in cityList" :key="index" center :label="item.cityName" :title="index === 0 ? '已开通城市' : ''"
				 :class="activeCity === index ? 'active' : ''" @click="selectCity(index, item)">
					<template #right-icon>
						<van-icon v-if="activeCity === index" name="success" color="#1676FE" />
					</template>
				</van-cell>
			</van-cell-group>
		</van-popup>
		<!-- 轮播图 -->
		<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
			<swiper class="swiper-box" @change="change">
				<swiper-item v-for="(item ,index) in bannerList" :key="index">
					<view class="swiper-item">
						<image :src="item.pics?item.pics : '../../static/images/swiper.png'" mode="" style="width: 100%; height: 300rpx;"></image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<!-- 头条 -->
		<view class="toutiao" @click="goHeadlines">
			<view class="toutiao-icon">
				<view class="toutiao-text">
					<p>商易租</p>
					<span>头条</span>
				</view>
			</view>
			<view class="toutiao-link">
				<!-- <span>商易租正式上线！现招募合伙人加入！</span> -->
				<!-- <van-notice-bar class="scrollable" scrollable :text="noticeMessage" :speed="35" background="#fff" color="#2E2E2E" /> -->
				<swiper class="swiper-container" :autoplay="true" :vertical="true" :circular="true" :interval="2000">
				  <swiper-item v-for="(item, index) in noticeMessage" :key="index">
				    <view class='swiper-item'>{{`${item}${item}${item}${item}${item}${item}`}}</view>
				  </swiper-item>
				</swiper>
				<van-icon name="play" color="#002464" size="26rpx" />
			</view>
		</view>
		<!-- 导航 -->
		<view class="nav">
			<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="toPath(item.router)">
				<image :src="item.src" />
				<text>{{ item.name }}</text>
			</view>
		</view>
		<!-- 推荐 -->
		<view class="recommend">
			<view class="recommend-title">本周重点推荐</view>
			<view class="recommend-content">
				<view class="recommend-list">
					<van-empty v-if="weekRecommendList.length==0" description="暂无数据" />
					<view class="recommend-item" @click="toProject(item.id)" v-for="item in weekRecommendList" :key="item">
						<view class="recommend-image">
							<image :src="item.projectImg"></image>
						</view>
						<view class="recommend-text">
							{{item.projectName}}
						</view>
					</view>
					
				</view>
			</view>
		</view>
		<!-- 合作企业 -->
		<view class="coop">
			<view class="coop-content">
				<view class="coop-header">
					<view class="coop-title">合作企业</view>
					<view class="coop-more" @click="goCoop">更多 ></view>
				</view>
				<view class="coop-list">
					<view class="coop-item" v-for="(item,index) in cooperativeList" :key="index">
						<image class="image" :src="item.logo" /> 
						<text>{{item.enterpriseName}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 猜你喜欢 -->
		<view class="store">
			<view class="store-header">猜你喜欢</view>
			<view class="store-list">
				<StoreCard v-for="item in guessYouLikeList" :sourceData="item" :key="item" />
			</view>
		</view>
		<!-- 获取定位城市 -->
		<baidu-map @ready="handler" />
	</view>
</template>

<script>
	import StoreCard from '../../components/Card/Store'
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	import {getBannerList,getWeekRecommendList,getGuessYouLike,getCooperativeList,getHeadline,getCity} from "../../utils/api.js"
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
				locationCity:{},
				bannerList:[],
				weekRecommendList:[],
				guessYouLikeList:[],
				cooperativeList:[],
				headlineList:[],
				noticeMessage: [
					'你好你好你好你好',
					'不好不好不好不好'
				],
				
			};
		},
		onLoad() {
			//请求BANNER
			this.ajaxGetBanner();
			//本周重点推荐
			this.ajaxGetWeekRecommendList();
			//猜你喜欢
			this.ajaxGetGuessYouLike();
			//合作企业
			this.ajaxGetCooperativeList();
			//头条信息
			this.ajaxGetHeadline();
			//城市列表
			this.ajaxGetCityList();
			//处理当前城市
			this.setCity();
			
		},
		onShow(){
			console.log(this.Dict)
			
			
		},
		methods: {
      // 打开关闭弹出层
			showPopup() {
				this.locationShow = true;
			},
			onClose() {
				this.locationShow = false;
			},
			// 选中城市
			selectCity(index) {
				this.activeCity = index;
				uni.setStorage({
					key: "__localtionCity__",
					data: this.cityList[index],
					success: (res) => {
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
			// 进入搜索页
			goSearch() {
				uni.navigateTo({
					url: "../Search/index"
				})
			},
			//项目信息和旗下的物业列表
			toProject(id){
				uni.navigateTo({
					url: "../ShoppingMall/index?projectId="+id
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
			
			//处理城市
			setCity(){
				//先定位导上次定位的记录，如果上次没有定位记录，就取当前的城市定位信息
				//
				//that.cityList  当前城市列表
				var that  = this;
				uni.getStorage({
					key: "__localtionCity__",
					success: (res) => {
						this.locationCity  = res.data;
						
					},
					fail: () => {
						that.cityList.forEach((item)=>{
							if(item.cityName == that.address.city){
								that.locationCity  = item;
							}
						})
						
					}
				})
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
					cityCode:"440300"
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
					cityCode:"440300",
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
					that.cityList = data;
					console.log(data);
					if(data.code=="200"){
						that.cityList = data.data;
					
					}else{
						
						
					}
					
				})
				.catch(error => {
				
				});
				
			},
			
			
		},
	};
</script>

<style lang="scss" scoped>
	.v-index {
		width: 100%;
		background-color: #F5F8FA;
		.header {
			padding: 25rpx 24rpx;
			background: #1676fe;
			display: flex;
			.location {
				font-size: 32rpx;
				color: #ffffff;
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
				background: #fff;
				border-radius: 12rpx;
				position: relative;
				padding: 12rpx 60rpx;
				margin-left: 28rpx;
				.search-icon {
					position: absolute;
					width: 28rpx;
					height: 28rpx;
					left: 18rpx;
					top: 50%;
					margin-top: -14rpx;
					background-image: url("../../static/images/search.png");
					background-size: 100%;
				}
				.search-text {
					color: #888888;
					font-size: 28rpx;
					line-height: 28rpx;
				}
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
			height: 300rpx;
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
					text-align: center;
					p {
						font-size: 24rpx;
						color: #ffffff;
					}
					span {
						font-size: 32rpx;
						color: #F9980E;
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
			background-color: #F5F8FA;
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
		.recommend {
			background-color: #ffffff;
			padding: 36rpx 0;
			.recommend-title {
				width: 258rpx;
				height: 55rpx;
				background-image: url('../../static/images/title-bg.png');
				background-position: center right;
				background-size: 100%;
				font-size: 36rpx;
				color: #fff;
				line-height: 55rpx;
				padding-left: 15rpx;
				margin: 0 0 20rpx 26rpx;
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
					padding: 0 26rpx;
					
					.recommend-item {
						width: 280rpx;
						height: 240rpx;
						border-radius: 20rpx;
						background-color: #eee;
						margin-right: 50rpx;
						display: inline-block;
						vertical-align: middle;
						box-sizing: border-box;
						overflow: hidden;
						position: relative;
						
						.recommend-text {
							width: 100%;
							font-size: 30rpx;
							line-height: 30rpx;
							color: #fff;
							height: 60rpx;
							background: rgba(0, 0, 0, 0.6);
							display: flex;
							justify-content: center;
							align-items: center;
							position: absolute;
							bottom: 0;
						}
					}
				}
			}
		}
		.coop {
			padding: 16rpx;
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
						color: #2D2D2D;
					}
					.coop-more {
						font-size: 30rpx;
						color: #1676FE;
					}
				}
				.coop-list {
					display: flex;
					justify-content: space-evenly;
					.coop-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						.image {
							width: 126rpx;
							height: 126rpx;
							border-radius: 50%;
							background: #DAE9FF;
						}
						text {
							font-size: 30rpx;
							color: #2D2D2D;
							margin-top: 14rpx;
						}
					}
				}
			}
		}
		.store {
			padding: 0 26rpx;
			.store-header {
				width: 182rpx;
				height: 55rpx;
				background-image: url('../../static/images/title-bg-s.png');
				background-position: center right;
				background-size: 100%;
				font-size: 36rpx;
				color: #fff;
				padding-left: 15rpx;
				line-height: 55rpx;
			}
		}
	}
</style>