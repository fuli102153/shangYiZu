<template>
	<view class="v-feedback">
		<view class="store-info">
			<view class="store-id">
				您委托成功的商铺编号为：xxxxxxxx
			</view>
			<view class="browse">
				点击浏览次数：100次
			</view>
			<view class="watch">
				预约看铺成功人次：3次
			</view>
		</view>
		<view class="store-header">看铺反馈</view>
		<view class="feedback-list">
			<view class="feedback-item" v-for="(item, index) in 5">
				<view class="title">
					看铺接待业务员：张三
				</view>
				<view class="content">
					<van-icon name="chat-o" color="#1576FE"/>
					<text>看铺反馈：地理位置不符合条件</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.v-feedback {
		padding: 28rpx 25rpx;
		background-color: #EFF2F4;
		
		.store-info {
			padding: 36rpx 0 46rpx;
			border-radius: 10rpx;
			background-image: linear-gradient(to bottom right, #529AFF, #1676FE);
			
			.store-id {
				width: 625rpx;
				height: 61rpx;
				border-radius: 0 30rpx 30rpx 0;
				background-color: #0E6EF5;
				position: relative;
				left: -5rpx;
				padding: 0 55rpx;
				color: #fff;
				font-size: 30rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
			}
			
			.browse {
				color: #fff;
				font-size: 26rpx;
				margin-top: 35rpx;
				padding-left: 50rpx;
			}
			.watch {
				color: #fff;
				font-size: 26rpx;
				margin-top: 22rpx;
				padding-left: 50rpx;
			}
		}
		
		.store-header {
			width: 182rpx;
			height: 55rpx;
			background-image: url('../../static/images/title-bg-s.png');
			background-position: center right;
			background-size: 100%;
			font-size: 32rpx;
			color: #fff;
			padding-left: 15rpx;
			line-height: 55rpx;
			margin: 20rpx 0;
		}
		
		.feedback-list {
			.feedback-item {
				background-color: #fff;
				box-shadow: 0px 5rpx 5rpx 0px rgba(223, 223, 223, 0.26);
				border-radius: 20rpx;
				margin-bottom: 20rpx;
				
				.title {
					padding: 0 50rpx;
					font-size: 26rpx;
					color: #2D2D2D;
					height: 68rpx;
					display: flex;
					align-items: center;
					border: 1px solid #EFF2F4;
				}
				
				.content {
					height: 110rpx;
					color: #1576FE;
					display: flex;
					align-items: center;
					padding: 0 50rpx;
					
					text {
						margin-left: 10rpx;
						font-size: 32rpx;
					}
				}
			}
		}
	}
</style>
