<template>
	<view class="v-my-share">
		<view class="share-card" v-for="(item, index) in 3" :key="index">
			<view class="store-id">
				分享商铺编号：xxxxxx
			</view>
			<view class="share-info">
				分享成功
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.v-my-share {
		padding: 40rpx 35rpx;
		
		.share-card {
			position: relative;
			height: 194rpx;
			padding-right: 40rpx;
			border-radius: 10rpx;
			margin-bottom: 20rpx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			background-image: linear-gradient(to bottom right, #529AFF, #1676FE);
			
			.store-id {
				color: #fff;
				font-size: 24rpx;
				position: absolute;
				top: 27rpx;
				left: 30rpx;
			}
			
			.share-info {
				width: 160rpx;
				height: 42rpx;
				border-radius: 21rpx;
				background-color: #C4CEDA;
				color: #1676FE;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
