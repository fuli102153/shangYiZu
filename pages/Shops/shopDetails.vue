<template>
	<view class="v-shop-details">
		<!-- <uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
			<swiper class="swiper-box" >
				<swiper-item v-for="(item ,index) in shop.shopPhotos? shop.shopPhotos.split(',') : []" :key="index">
					<view class="swiper-item">
						<image :src="item" mode="" style="width: 100%; height: 430rpx;"></image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot> -->
		<view class="banner">
			<view class="banner-img">
				<view class="img-item" v-for="(item ,index) in shop.shopPhotos? shop.shopPhotos.split(',') : []" :key="index">
					<image :src="item" mode="" style="width: 100%; height: 430rpx;" v-if="index === tabActive"></image>
				</view>
			</view>
			<view class="banner-tab">
				<view 
					class="tab-item" 
					:class="index === tabActive ? 'active' : ''" 
					v-for="(item, index) in tabList" 
					:key="index" 
					@click="selectTab(item, index)">
					{{ item.name }}
				</view>
			</view>
		</view>
		<view class="shop-name">
			<view class="header">
				<view class="title">
					<text>{{shop.shopName || ''}}</text>
					<view class="btn">
						平台直租
					</view>
				</view>
				<view class="shop-id">
					编号：{{ shop.shopNo || '' }}
				</view>
				<view class="shop-rent">
					￥{{ shop.monthRent || ''}}
					<text>元/月</text>
				</view>
			</view>
			<view class="title-tag" v-if="shop.label">
				<view color="#B2B2B2" class="tag-item" v-for="(item, index) in shop.label ? shop.label.split(',') : []" :key="index">{{ item }}</view>
			</view>
			
		</view>
		<view class="shop-position">
			<view class="content">
				<view class="icon" />
				<view class="label">
					<view class="title">
						鹏润达商业广场
					</view>
					<text>深圳市南山区后海滨路鹏润达商业广场</text>
				</view>
				<view class="look">
					<van-icon name="location" color="#BFBFBF"/>
					<text>查看</text>
				</view>
			</view>
			<view class="time">
				更新时间：{{shop.createTime}}
			</view>
		</view>
		<view class="shop-info">
			<van-tabs class="tab" :active="active" @change="onChange" color="#1476FD" title-active-color="#1476FD" line-width="50rpx">
			  <van-tab title="商铺概况">
				  <view class="info">
				  	<view class="item">
				  		<view class="label">
				  			计租面积
				  		</view>
						<view class="value">
							{{shop.measureArea}}m²
						</view>
				  	</view>
					<view class="item">
						<view class="label">
							租金单价
						</view>
						<view class="value">
							{{(shop.monthRent/shop.measureArea).toFixed(2)}}元/月/m²
						</view>
					</view>
					<view class="item">
						<view class="label">
							所在楼层
						</view>
						<view class="value">
							{{property.floorNum}}层
						</view>
					</view>
					<view class="item">
						<view class="label">
							物业类型
						</view>
						<view class="value">
							{{shop.propertyType || ""}}
						</view>
					</view>
					<view class="item">
						<view class="label">
							推荐业态
						</view>
						<view class="value">
							{{shop.businessType || ""}}
						</view>
					</view>
					<view class="cell" @click="transactionShow = !transactionShow">
						<view class="label">
							交易信息
						</view>
						<van-icon name="play" :class="transactionShow ? 'down' : 'up'"/>
					</view>
					<view class="transaction-info" v-show="transactionShow">
						<view class="item">
							<view class="label">
								支付方式
							</view>
							<view class="value">
								{{property.payMode || ""}}
							</view>
						</view>
						<view class="item">
							<view class="label">
								租金递增
							</view>
							<view class="value">
								{{property.rentIncrease || ""}}
							</view>
						</view>
						<view class="item">
							<view class="label">
								免租期限
							</view>
							<view class="value">
								{{property.powerRate || ""}}个月
							</view>
						</view>
						<view class="item">
							<view class="label">
								转让费用
							</view>
							<view class="value">
								{{property.transferFee || ""}}元
							</view>
						</view>
						<view class="item">
							<view class="label">
								水务费用
							</view>
							<view class="value">
								{{property.waterRate || ""}}元/m³
							</view>
						</view>
						<view class="item">
							<view class="label">
								电务费用
							</view>
							<view class="value">
								{{property.waterRate || ""}}元/KWh
							</view>
						</view>
					</view>
					<view class="cell" @click="engineeringShow = !engineeringShow">
						<view class="label">
							工程参数
						</view>
						<van-icon name="play" :class="engineeringShow ? 'down' : 'up'"/>
					</view>
					<view class="engineering-info" v-show="engineeringShow">
						<view class="item">
							<view class="label">
								楼层层高
							</view>
							<view class="value">
								{{property.floorHeight || ""}}m
							</view>
						</view>
						<view class="item">
							<view class="label">
								楼层开间
							</view>
							<view class="value">
								{{property.bayWidth || ""}}m
							</view>
						</view>
						<view class="item">
							<view class="label">
								楼层进深
							</view>
							<view class="value">
								{{property.depthLength || ""}}m
							</view>
						</view>
					</view>
				  </view>
			  </van-tab>
			  <van-tab title="市调报告">
				  <view class="uni-common-mt" style="padding:20rpx;font-size: 30rpx; color: #6A6A6A;">
					<rich-text :nodes="shop.marketReport || '暂无市场调研报告'"></rich-text>
				  </view>
			  </van-tab>
			</van-tabs>
		</view>
		<view class="attestation shop-name facilities">
			<view class="title">
				工程条件
			</view>
			<view class="title-tag" v-if="shop.engineeringConditions">
				<view color="#B2B2B2" class="tag-item" v-for="(item, index) in shop.engineeringConditions?shop.engineeringConditions.split(','):[]" :key="index">{{ item }}</view>
			</view>
		</view>
		
	
		
		<!-- 认证信息 -->
		<view class="attestation">
			<view class="title">
				商铺认证
			</view>
			<view class="content">
				<view class="attestation-title">
					商铺信息
				</view>
				<view class="attestation-explain">
					该店铺信息经由商易租工作人员实地勘察，数据准确有效
				</view>
				<view class="attestation-info">
					<view class="info-item" v-for="(item, index) in attestationList" :key="index">
						<view class="info-icon">
							<image :src="item.src" mode=""></image>
						</view>
						<text>{{ item.name }}</text>
					</view>
				</view>
				<view class="attestation-user">
					认证人员：张三
				</view>
			</view>
		</view>
		<!-- 猜你喜欢 -->
		<view class="store" >
			<view class="store-header" v-if="false">猜你喜欢</view>
			<view class="store-list" v-if="false">
				<StoreCard v-for="item in 3" :sourceData="item" :key="item" />
			</view>
		</view>
		<!-- 预约 -->
		<view class="foot">
			<view class="store-hot">
				
			</view>
			<view class="btns">
				<view class="btns-collection">
					<view class="collection" @click="ajaxAddCollect(shop.shopNo)">
						<van-icon name="like-o" color="#1576FE" size="40rpx" />
						<text>收藏</text>
					</view>
					<view class="share" @click="ajaxAddShare(shop.shopNo)">
						<van-icon name="share-o" color="#1576FE" size="40rpx" />
						<text>分享</text>
					</view>
				</view>
				<view class="button" @click="toSubscribe(shop.shopNo)">预约看铺</view>
			</view>
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import StoreCard from '../../components/Card/Store'
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	import {getShopDetail,getSubscribeAdd,getCollectAdd,getShareAdd} from "../../utils/api.js"
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	export default {
		components: {
			StoreCard,
			uniSwiperDot
		},
		data() {
			return {
				tabList: [
					{ name: '正面', code: 0 },
					{ name: '内部', code: 1 },
					{ name: '周边环境', code: 2 },
				],
				// 图片切换
				tabActive: 0,
				// tab切换
				active: 0,
				transactionShow: true,
				engineeringShow: true,
				// 轮播图
				info: [],
				current: 0,
				mode: 'nav',
				
				tagList: ['临近地铁', '临近学校', '居民密集区', '无进场费'],
				facilitiesList: ['上下水', '排油烟', '独立卫生间', '中央空调'],
				
				latitude: "",
				longitude: "",
				
				attestationList: [
					{name: '实地测量', src: '../../static/images/measure.png'},
					{name: '实地拍摄', src: '../../static/images/shooting.png'},
					{name: '实地勘察', src: '../../static/images/survey.png'}
				],
				
				shop:[],//商铺信息
				property:[],//店铺信息
			}
		},
		onLoad(paras) {
			console.log(paras)
			console.log(this.location.longitude+":"+this.location.latitude)
			//如果有项目ID
			if(paras.shopNo){
				this.getDetail(paras.shopNo);
			}
		},
		methods:{
			selectTab(item, index) {
				this.tabActive = index
				console.log('tabActive', this.tabActive, index)
			},
			onChange(e) {
				console.log(e.detail)
			},
			//ajax查询商铺信息查询
			getDetail(shopNo){
				
				var that = this;
				const paras = {
					shopNo:shopNo
				};
				paras.accessToken = that.accessToken;
				const toast = Toast.loading({
				  message: '加载中...',
				  forbidClick: true,
				  loadingType: 'spinner',
				});
				getShopDetail(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						setTimeout(() => {
							Toast.clear();
						}, 300)
						that.shop = data.data.shop;
						that.property = data.data.property;
						
						that.latitude = that.shop.latitude || that.location.latitude;
						that.longitude = that.shop.longitude || that.location.longitude;
						
						var infoPhotos = that.shop.shopPhotos.split(",");
						that.info = [];
						infoPhotos.forEach((item)=>{
							that.info.push({"content":"商铺编号："+that.shop.shopNo})
						})
						
						that.Dict.property_type.forEach((item)=>{
							if(that.shop.propertyType == item.itemValue){
								that.shop.propertyType = item.itemText;
							}
						})
						
						
					}else{
						Toast.fail(data.message);
						
					}
					
				})
				.catch(error => {
					Toast.fail(this.global.error);
				});
			},
			
			toSubscribe(shopNo){
				
				uni.navigateTo({
					url: "../Shops/appointment?shopNo="+shopNo
				})
			},
			
			goStoreMaket(marketReport) {
				uni.navigateTo({
					url: "./storeMarket?marketReport="+marketReport
				})
			},
			
			
			ajaxAddCollect(shopNo){
				
				var that = this;
				const paras = {
					shopNo:shopNo,
					appUid:this.userDetail.id,
					type:1,
					
				};
				paras.accessToken = that.accessToken;
				
				getCollectAdd(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						Toast.success('收藏成功');
					
					}else{
						Toast.fail(data.message);
						
					}
					
				})
				.catch(error => {
					Toast.fail(this.global.error);
				});
			},
			
			
			ajaxAddShare(shopNo){
				
				var that = this;
				const paras = {
					shopNo:shopNo,
					appUid:this.userDetail.id,
					type:1,
					
				};
				paras.accessToken = that.accessToken;
				
				getShareAdd(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						Toast.success('分享成功');
					
					}else{
						Toast.fail(data.message);
						
					}
					
				})
				.catch(error => {
					Toast.fail(this.global.error);
				});
			},
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.v-shop-details {
		.swiper-box {
			height: 430rpx;
		}
		
		.banner {
			position: relative;
			height: 430rpx;
			.banner-img {
				height: 430rpx;
			}
			
			.banner-tab {
				position: absolute;
				bottom: 40rpx;
				left: 36rpx;
				display: flex;
				.tab-item {
					font-size: 22rpx;
					line-height: 36rpx;
					padding: 5rpx 29rpx;
					color: #FFFFFF;
					margin-right: 34rpx;
				}
				.active {
					background: #FFFFFF;
					color: #302f2c;
					border-radius: 20rpx;
				}
			}
		}
		
		.shop-name {
			background-color: #fff;
			padding: 47rpx 26rpx 40rpx;
			position: relative;
			top: -25rpx;
			border-radius: 25rpx 25rpx 0 0;
			
			.header {
				.title {
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					text {
						color: #302F2C;
						font-size: 40rpx;
					}
					.btn {
						color: #FCFBF9;
						font-size: 24rpx;
						line-height: 36rpx;
						padding: 3rpx 9rpx;
						background-color: #1476FD;
						border-radius: 10rpx;
					}
				}
				
				.shop-id {
					font-size: 20rpx;
					color: #9B9B9B;
					margin-top: 10rpx;
				}
				
				.shop-rent {
					font-size: 46rpx;
					color: #FE2A4D;
					
					text {
						font-size: 30rpx;
					}
				}
			}
		
			.title-tag {
				display: flex;
				flex-wrap: wrap;
				
				.tag-item {
					margin-top: 20rpx;
					margin-right: 20rpx;
					color: #1476FD;
					font-size: 24rpx;
					background-color: #F0F0F0;
					padding: 4rpx 22rpx;
					border-radius: 5rpx;
				}
			}
		}
		
		.shop-position {
			padding: 0 36rpx;
			.content {
				border: 1px solid #C9C8C8;
				border-radius: 10rpx;
				box-shadow: 0px 9px 9px rgba(3, 3, 3, 0.06);
				padding: 28rpx 40rpx 28rpx 40rpx;
				box-sizing: border-box;
				display: flex;
				
				.icon {
					width: 78rpx;
					height: 78rpx;
					background-image: url(../../static/images/floor.png);
					background-size: 100%;
				}
				
				.label {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 20rpx;
					.title {
						color: #252525;
						font-size: 28rpx;
						line-height: 36rpx;
					}
					text {
						font-size: 24rpx;
						line-height: 36rpx;
						color: #6A6A6A;
					}
				}
				
				.look {
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					align-items: center;
					
					text {
						font-size: 20rpx;
						color: #BFBFBF;
					}
				}
			}
			
			.time {
				margin-top: 15rpx;
				text-align: right;
				font-size: 20rpx;
				color: #A1A1A2;
			}
		}
		
		.shop-info {
			padding: 0 36rpx;
			/deep/ .tab{
				.van-tab {
					flex: none;
					margin-right: 36rpx;
					
					.van-ellipsis {
						font-size: 36rpx;
					}
					
					.van-tab__pane {
						border-top: 1px solid #EFF0EF;
					}
				}
			}
			
			.info {
				padding: 30rpx 20rpx;
				
				.item {
					display: flex;
					margin-bottom: 8rpx;
					font-size: 30rpx;	
					
					.label {
						width: 150rpx;
						color: #6A6A6A;
					}
					
					.value {
						color: #252525;
					}
				}
				
				.cell {
					display: flex;
					align-items: center;
					margin: 30rpx 0;
					color: #1476FD;
					
					.label {
						width: 150rpx;
						font-size: 32rpx;
					}
					
					.down {
						transform: rotate(90deg);
					}
					
					.up {
						transform: rotate(-90deg);
					}
				}
			}
		}
		
		.facilities {
			margin-top: 20rpx;
		}
		
		.ad {
			height: 180rpx;
			margin-top: 7rpx;
		}
		
		.store-market-survey {
			padding: 33rpx 49rpx 30rpx;
			
			.btn {
				border: 1px solid #1676FE;
				padding: 18rpx 23rpx 18rpx 34rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-radius: 5rpx;
				
				text {
					color: #1676FE;
					font-size: 36rpx;
				}
			}
		}
		
		.place {
			padding: 42rpx 48rpx;
			background-color: #fff;
			
			.title {
				font-size: 36rpx;
				color: #2d2d2d;
				margin-bottom: 36rpx;
			}
			
			.map {
				width: 100%;
				height: 425rpx;
			}
		}
		
		.attestation {
			padding: 42rpx 34rpx;
			background-color: #fff;
			
			.title {
				font-size: 36rpx;	
				color: #474A4C;
				margin-bottom: 36rpx;
			}
			
			.content {
				background: #408FFF;
				border-radius: 5rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				position: relative;
				
				.attestation-title {
					color: #fff;
					font-size: 30rpx;
					padding-top: 30rpx;
				}
				
				.attestation-explain {
					margin-top: 16rpx;
					background-color: #1676FE;
					color: #fff;
					font-size: 21rpx;
					padding: 6rpx 18rpx;
					border-radius: 18rpx;
				}
				
				.attestation-info {
					margin-top: 30rpx;
					margin-bottom: 80rpx;
					width: 100%;
					display: flex;
					justify-content: space-evenly;
					
					.info-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						
						.info-icon {
							width: 57rpx;
							height: 57rpx;
							
							image {
								width: 100%;
								height: 100%;
							}
						}
						text {
							color: #fff;
							font-size: 21rpx;
							margin-top: 21rpx;
						}
					}
				}
			
				.attestation-user {
					padding: 7rpx 26rpx;
					color: #fff;
					font-size: 21rpx;
					border-radius: 0 18rpx 18rpx 0;
					background-color: #1676FE;
					position: absolute;
					bottom: 15rpx;
					left: -6rpx;
				}
			}
		}
		
		.store {
			padding: 42rpx 26rpx 120rpx;
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
		
		.foot {
			position: fixed;
			bottom: 0;
			width: 100%;
			z-index: 999;
			
			.btns {
				background-color: #fff;
				padding: 18rpx 26rpx 18rpx 35rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.btns-collection {
					display: flex;
					
					.collection,
					.share {
						display: flex;
						align-items: center;
						margin-right: 56rpx;
						
						text {
							color: #1576FE;
							margin-left: 15rpx;
						}
					}
				}
				
				.button {
					padding: 17rpx 68rpx;
					color: #fff;
					background: #1576FE;
					border-radius: 5rpx;
					font-size: 28rpx;
				}
			}
		}
	}
</style>
