<template>
	<view class="vc-store-card" @click="toDetail(source.shopNo)">
		<view class="store-img">
			<image :src="source.shopPhotos? source.shopPhotos.split(',')[0] : '../../static/logo.png'"></image>
		</view>
		<view class="store-info">
			<view class="store-top">
				<view class="store-title">{{source.shopName || ""}}</view>
				<view class="store-price">
					<span>￥{{source.monthRent || ""}}</span>
					<span class="company">元/月</span>
				</view>
			</view>
			<view class="store-payment">
				<view class="store-tag">
					<view>
						<view class="tag" v-if="source.propertyName">物业类型：{{source.propertyName || ""}}</view>
					</view>
					<view>
						<view class="tag" v-if="source.businessName">业态：{{source.businessName || ""}}</view>
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
		},
		data() {
			return {
				source: {}
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
				//console.log(that.Dict.business_type)

				that.Dict.business_type.forEach((item) => {
					if (that.sourceData.businessType == item.itemValue) {
						that.sourceData.businessName = item.itemText;
					}
				})

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
	.vc-store-card {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		padding: 32rpx 0 23rpx 0;
		border-bottom: 1rpx solid #DFDEDE;

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
				}
			}
		}
	}
</style>
