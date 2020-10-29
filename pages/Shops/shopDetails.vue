<template>
	<view class="v-shop-details">
		<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
			<swiper class="swiper-box" @change="change">
				<swiper-item v-for="(item ,index) in 8" :key="index">
					<view class="swiper-item">
						<image src="../../static/images/swiper.png" mode="" style="width: 100%; height: 430rpx;"></image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<van-icon name="arrow-left" class="go-back" color="#fff" size="34rpx" />
		<view class="shop-name">
			<view class="title">
				南山后海鹏润广场内铺
			</view>
			<view class="title-tag">
				<view color="#B2B2B2" class="tag-item" v-for="(item, index) in tagList" :key="index">{{ item }}</view>
			</view>
		</view>
		<view class="shop-info">
			<view class="shop-price">
				<text class="label">租金：</text>
				<text class="num">66000</text>
				<text class="unit">元/月</text>
				<text class="unit-num">200元/m²/月</text>
			</view>
			<view class="shop-price">
				<text class="label">面积：</text>
				<text class="num">300</text>
				<text class="unit">m²</text>
			</view>
			<view class="shop-price">
				<text class="label">转让费：</text>
				<text class="num">无/3000</text>
				<text class="unit">元</text>
			</view>
			<view class="shop-price">
				<text class="label">管理费：</text>
				<text class="num">无/300</text>
				<text class="unit">元/月</text>
			</view>
		</view>
		<!-- 支付方式 -->
		<view class="recommend">
			<view class="recommend-content">
				<view class="recommend-list">
					<view class="recommend-item" @click="toProject(item.id)" v-for="item in 8" :key="item">
						<view class="top">
							支付方式
						</view>
						<view class="bottom">
							押一付二
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="title">
			物业信息
		</view>
		<!-- 物业类型 -->
		<view class="recommend">
			<view class="recommend-content">
				<view class="recommend-list">
					<view class="recommend-item" @click="toProject(item.id)" v-for="item in 8" :key="item">
						<view class="top">
							物业类型
						</view>
						<view class="bottom">
							购物中心
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 配套设施 -->
		<view class="shop-name facilities">
			<view class="title">
				配套设施
			</view>
			<view class="title-tag">
				<view color="#B2B2B2" class="tag-item" v-for="(item, index) in facilitiesList" :key="index">{{ item }}</view>
			</view>
		</view>
		<!-- 店铺活动介绍图 -->
		<view class="ad">
			<image src="../../static/images/swiper.png" mode="" style="width: 100%; height: 100%;"></image>
		</view>
		<!-- 店铺市调 -->
		<view class="store-market-survey">
			<view class="btn">
				<text>店铺市调</text>
				<van-icon name="play-circle" color="#1676FE" size="38rpx" />
			</view>
		</view>
		<!-- 位置 -->
		<view class="place">
			<view class="title">
				位置
			</view>
			<map class="map" ref="map" id="map" :longitude="longitude" :latitude="latitude">
				<cover-view class="controls">
				</cover-view>
			</map>
		</view>
		<!-- 认证信息 -->
		<view class="attestation">
			<view class="title">
				认证信息
			</view>
			<view class="content">
				<view class="attestation-title">
					店铺评估合格
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
		<view class="store">
			<view class="store-header">猜你喜欢</view>
			<view class="store-list">
				<StoreCard v-for="item in 3" :sourceData="item" :key="item" />
			</view>
		</view>
		<!-- 预约 -->
		<view class="foot">
			<view class="store-hot">
				
			</view>
			<view class="btns">
				<view class="btns-collection">
					<view class="collection">
						<van-icon name="like-o" color="#1576FE" size="40rpx" />
						<text>收藏</text>
					</view>
					<view class="share">
						<van-icon name="share-o" color="#1576FE" size="40rpx" />
						<text>分享</text>
					</view>
				</view>
				<view class="button">预约看铺</view>
			</view>
		</view>
	</view>
</template>

<script>
	import StoreCard from '../../components/Card/Store'
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	export default {
		components: {
			StoreCard,
			uniSwiperDot
		},
		data() {
			return {
				// 轮播图
				info: [{
					content: '内容 A'
				}, {
					content: '内容 B'
				}, {
					content: '内容 C'
				}],
				current: 0,
				mode: 'nav',
				
				tagList: ['临近地铁', '临近学校', '居民密集区', '无进场费'],
				facilitiesList: ['上下水', '排油烟', '独立卫生间', '中央空调'],
				
				latitude: 22.5333,
				longitude: 113.94041,
				
				attestationList: [
					{name: '实地测量', src: '../../static/images/measure.png'},
					{name: '实地拍摄', src: '../../static/images/shooting.png'},
					{name: '实地勘察', src: '../../static/images/survey.png'}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.v-shop-details {
		position: relative;
		background-color: #F5F8FA;
		
		.swiper-box {
			height: 430rpx;
		}
		.go-back {
			position: absolute;
			top: 17rpx;
			left: 22rpx;
		}
		
		.shop-name {
			background-color: #fff;
			padding: 47rpx 26rpx 40rpx;
			
			.title {
				color: #2d2d2d;
				font-size: 36rpx;
				font-weight: 500;
			}
		
			.title-tag {
				display: flex;
				flex-wrap: wrap;
				
				.tag-item {
					margin-top: 20rpx;
					margin-right: 12rpx;
					border: 1rpx solid #1676FE;
					color: #1676FE;
					font-size: 24rpx;
					line-height: 30rpx;
					padding: 10rpx 22rpx;
					border-radius: 8rpx;
				}
			}
		}
		
		.shop-info {
			background-color: #fff;
			margin-top: 12rpx;
			padding: 35rpx 47rpx;
			
			.shop-price {
				.label {
					color: #2D2D2D;
					font-size: 28rpx;
				}
				.num {
					color: #F9980D;
					font-size: 44rpx;
				}
				.unit {
					color: #F9980D;
					font-size: 24rpx;
					margin-left: 12rpx;
				}
				.unit-num {
					color: #2D2D2D;
					font-size: 24rpx;
					margin-left: 26rpx;
				}
			}
		}
		
		.recommend {
			margin-top: 20rpx;
			
			.recommend-content {
				width: 100%;
				overflow-x: auto;
				
				&::-webkit-scrollbar{
					display: none;
				}
				
				.recommend-list {
					white-space: nowrap;
					font-size: 0;
					margin-left: 20rpx;
					box-shadow: 0px 5rpx 5rpx 0px rgba(223, 223, 223, 0.26);
					
					.recommend-item {
						display: inline-block;
						background-color: #fff;
						padding: 41rpx 52rpx 41rpx 0;
						
						&:first-child {
							border-radius: 10rpx 0 0 10rpx;
							padding-left: 36rpx;
						}
						
						&:last-child {
							border-radius: 0 10rpx 10rpx 0;
						}
						
						.top {
							color: #b2b2b2;
							font-size: 24rpx;
						}
						.bottom {
							color: #2D2D2D;
							font-size: 28rpx;
							margin-top: 20rpx;
						}
					}
				}
			}
		}
		
		> .title {
			font-size: 36rpx;
			font-weight: 500;
			color: #2D2D2D;
			padding: 38rpx 0 28rpx 48rpx;
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
			padding: 42rpx 48rpx;
			background-color: #fff;
			
			.title {
				font-size: 36rpx;
				color: #2d2d2d;
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
