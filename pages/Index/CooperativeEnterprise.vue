<template>
	<view class="v-cooperative-enterprise">
		<view class="coop" v-for="(item, index) in 8" :key="index">
			<view class="logo">
				
			</view>
			<view class="name">
				企业名称
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.v-cooperative-enterprise {
		background-color: #F5F8FA;
		padding: 45rpx 46rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.coop {
			width: 316rpx;
			height: 316rpx;
			background-color: #fff;
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-bottom: 28rpx;
			
			.logo {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
				background-color: #DAE9FF;
			}
			
			.name {
				font-size: 30rpx;
				color: #2d2d2d;
				margin-top: 15rpx
			}
		}
	}
</style>
