<template>
  <view class="vc-brand-card" :class="isShowLine?'':'bottom-line'" @click="toDetail(sourceData.shopNo)">
		<view class="store-img">
			<image :src="sourceData.brandLogo ? sourceData.brandLogo.split(',')[0] : '../../static/logo.png'"></image> 
		</view>
		<view class="store-info">
			<view class="store-top">
				<view class="store-title">{{sourceData.brandName || ""}}</view>
				<view class="store-price">
					<span>休闲小吃</span>
					<span class="company">（三级业态）</span>
				</view>
			</view>
			<view class="store-payment">
				<view class="store-tag">
					<view>
						<view class="tag" v-if="sourceData.measureArea">需求面积：{{sourceData.measureArea || ""}}m²</view>
					</view>
					<view>
						<view class="tag">拓店数量：10家</view>
					</view>
					<view class="hot-list">
						<i class="hot" v-for="item in sourceData.hits" :key="item"></i>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getBrandDetail} from "../../utils/api.js"
export default {
	name: 'store',
	props:{
		sourceData:{},
	},
	data() {
	 	return {
	 	}
	},
	mounted(){
	    var that = this;
	    this.$nextTick(function(){
	     
	    })
	  },
	methods: {
		goBrandDetails(brandNo) {
			uni.navigateTo({
				url: './BrandDetails?brandNo='+brandNo
			})
		},
	 	
	 }
}
</script>

<style lang="scss" scoped>
.bottom-line{
		border-bottom: 1rpx solid #DFDEDE;
	}
	.vc-brand-card {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		padding: 25rpx 0 25rpx 0;
		

		.store-img {
			width: 330rpx;
			height: 200rpx;
			border-radius: 15rpx;

			image {
				width: 330rpx;
				height: 200rpx;
				border-radius: 15rpx;
			}
		}

		.store-info {
			flex: 1;
			height: 200rpx;
			box-sizing: border-box;
			color: #2D2D2D;
			padding-left: 25rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.store-title {
				font-size: 28rpx;
				color: #2D2D2D;
				margin-bottom: 12rpx;
			}
			
			.store-price {
				color: #DD9D39;
				vertical-align: bottom;
			
				span {
					font-size: 28rpx;
				}
			
				.company {
					font-size: 20rpx;
				}
			}

			.store-payment {
				display: flex;
				justify-content: space-between;

				.store-tag {
					.tag {
						color: #9B9B9A;
						font-size: 20rpx;
						margin-top: 10rpx;
					}
					.hot-list {
						display: flex;
						.hot {
							margin-top: 10rpx;
							width: 14rpx;
							height: 18rpx;
							margin-right: 10rpx;
							background-image: url(../../static/images/hot.png);
							background-size: 100%;
						}
					}
				}
			}
		}
	}
</style>