<template>
  <view class="v-shop-partner">
		<view class="shop-type">
			<view class="shop-type-item agent" @click="goHeadlinesDetails">
				<i class="item-icon"></i>
				<view class="item-text">
					经纪人合伙
				</view>
				<van-icon name="play-circle" size="37rpx" color="#fff"/>
			</view>
			<view class="shop-type-item company" @click="goHeadlinesDetails">
				<i class="item-icon"></i>
				<view class="item-text">
					经纪人合伙
				</view>
				<van-icon name="play-circle" size="37rpx" color="#fff"/>
			</view>
		</view>
  </view>
</template>

<script>
export default {
	methods: {
		goHeadlinesDetails() {
			console.log('进入详情页')
		}
	}
};
</script>

<style lang="scss" scoped>
.v-shop-partner {
  .shop-type {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 48rpx;
		
		.shop-type-item {
			width: 450rpx;
			height: 100rpx;
			background-image: linear-gradient(to bottom right, #37BFFF, #1796FF);
			margin-bottom: 31rpx;
			padding: 0 24rpx 0 34rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-radius: 16rpx;
			
			.item-icon {
				width: 63rpx;
				height: 41rpx;
				background-image: url(../../static/images/agent.png);
				background-size: 100%;
			}
			.item-text {
				color: #fff;
				font-size: 36rpx;
			}
		}
		.company {
			background-image: linear-gradient(to bottom right, #7C7AF9, #5660BC);
			
			.item-icon {
				background-image: url(../../static/images/company.png);
			}
		}
	}
}
</style>