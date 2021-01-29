<template>
	<view class="vc-store-card" :class="isShowLine?'':'bottom-line'" @click="toDetail(source.shopNo)">
		<view class="store-img">
			<image :src="source.shopPhotos? source.shopPhotos.split(',')[0] : '../../static/store.jpg'"></image>
		</view>
		<view class="store-info">
			<view class="store-top">
				<view class="store-title">{{source.shopName || ""}}</view>
				<view class="store-price">
					<span>{{source.measureArea || "-"}}</span>
					<span class="company">m²</span>
				</view>
			</view>
			<view class="store-payment">
				<view class="store-tag">
					<view>
						<view class="tag" v-if="source.streetName || source.areaName">区域街道：{{source.areaName || ""}} {{source.streetName || ""}}</view>
					</view>
					<view>
						<view class="tag" v-if="source.monthRent">每月租金：￥{{`${source.monthRent}元/月` || ""}}</view>
					</view>
					<view class="hot-list">
						<i class="hot" v-for="item in source.hits" :key="item"></i>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'store',
		props: {
			sourceData: {},
			lastLine:false,
		},
		data() {
			return {
				source: {},
				isShowLine:false,
			}
		},
		mounted() {
			var that = this;
			this.$nextTick(function() {
				//that.sourceData
				that.source = {};
				that.Dict.property_type.forEach((item) => {
					if (that.sourceData.propertyType == item.itemValue) {
						that.sourceData.propertyName = item.itemText;
					}
				})
				that.isShowLine = that.lastLine
				//console.log(that.Dict.business_type)

				that.Dict.business_type.forEach((item) => {
					if (that.sourceData.businessType == item.itemValue) {
						that.sourceData.businessName = item.itemText;
					}
				})
				//临时处理的   到时要根据算法来
				that.sourceData.hits = 3+(that.sourceData.hits % 3);
				that.source = that.sourceData;

			})
		},
		methods: {
			toDetail(shopNo) {
				//跳转到详情页面
				uni.navigateTo({
					url: "../Shops/shopDetails?shopNo=" + shopNo
				})
			},


		}
	}
</script>

<style lang="scss" scoped>
	.bottom-line{
		border-bottom: 1rpx solid #DFDEDE;
	}
	.vc-store-card {
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
				white-space:nowrap;
				overflow:hidden;
				text-overflow:ellipsis;
				width: 350rpx;
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
