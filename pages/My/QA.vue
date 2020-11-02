<template>
	<view class="v-qa">
		<view class="qa-card" v-for="(item, index) in 8" :key="index">
			<view class="header">
				
			</view>
			<view class="content">
				<view class="content-q">
					Q：问题内容问题内容？
				</view>
				<view class="content-a">
					A：解答内容解答内容
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.v-qa {
		padding: 40rpx 25rpx;
		
		.qa-card {
			display: flex;
			margin-bottom: 48rpx;
			
			.header {
				width: 92rpx;
				height: 92rpx;
				border-radius: 50%;
				background-color: #F5F8FA;
				overflow: hidden;
			}
			
			.content {
				padding-top: 16rpx;
				margin-left: 23rpx;
				.content-q {
					height: 60rpx;
					background: #F5F8FA;
					border: 1rpx solid #F0F2F4;
					border-radius: 0px 30rpx 30rpx 30rpx;
					color: #1676FE;
					display: flex;
					align-items: center;
					padding: 0 45rpx;
				}
				.content-a {
					height: 60rpx;
					background: #F5F8FA;
					border: 1rpx solid #F0F2F4;
					border-radius: 0px 30rpx 30rpx 30rpx;
					color: #888888;
					display: flex;
					align-items: center;
					padding: 0 45rpx;
					margin-top: 24rpx;
				}
			}
		}
	}
</style>
