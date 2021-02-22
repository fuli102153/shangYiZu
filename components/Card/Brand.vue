<template>
  <view class="vc-brand-card" :class="isShowLine?'':'bottom-line'" @click="goBrandDetails(source.id)">
		<view class="store-img">
			<image :src="source.brandLogo ? source.brandLogo.split(',')[0] : '../../static/store.jpg'"></image> 
		</view>
		<view class="store-info">
			<view class="store-top">
				<view class="store-title">{{source.brandName || ""}}</view>
				<view class="store-price">
					<span>{{source.propertyFormStr}}</span>
				</view>
			</view>
			<view class="store-payment">
				<view class="store-tag">
					<view>
						<view class="tag" v-if="source.measureArea">需求面积：{{source.measureArea || ""}}m²</view>
					</view>
					<view v-if="propertyType(source.propertyType)">
						<view class="tag">物业类型：{{propertyType(source.propertyType)}}</view>
					</view>
					<view>
						<view class="tag">拓店数量：{{source.viewNum}}家</view>
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
	import {getBrandDetail} from "../../utils/api.js"
export default {
	name: 'store',
	props:{
		sourceData:{},
		lastLine:false,
	},
	data() {
	 	return {
			source: {},
			isShowLine:false,
	 	}
	},
	
	mounted(){
	    var that = this;
	    this.$nextTick(function(){
			that.isShowLine = that.lastLine
			//临时处理的   到时要根据算法来
			that.sourceData.hits = 3+(that.sourceData.hot % 3);
			that.source = that.sourceData;
			
	    })
	  },
	methods: {
		goBrandDetails(brandNo) {
			console.log(brandNo)
			uni.navigateTo({
				url: '../../pages/Brand/BrandDetails?brandNo='+brandNo
			})
		},
	 	propertyType(id) {
			if (!id) {
				return ''
			}
	 		let name = this.Dict.property_type.filter(item => item.itemValue === id);
	 		return name[0].itemText ? name[0].itemText : ''
	 	}
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
			box-shadow: 0px 0px 10px rgba(66, 65, 65, 0.44);

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
				white-space:nowrap;
				overflow:hidden;
				text-overflow:ellipsis;
				width: 350rpx;
			}
			
			.store-price {
				color: #DD9D39;
				vertical-align: bottom;
				overflow:hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				width:350rpx;
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