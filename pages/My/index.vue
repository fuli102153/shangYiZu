<template>
	<view class="v-my">
		<view class="user-info">
			<view class="user-img">
				<image :src="userInfo.avatarUrl || ''" mode=""></image>
			</view>
			<view class="user-name">
				<view class="user-text">
					{{ userInfo.nickName || '' }}
				</view>
				<view class="user-id">
					ID:188****8888
				</view>
			</view>
			<view class="user-edit">
				<i class="edit-icon"></i>
				<text>编辑</text>
			</view>
		</view>
		<view class="user-nav">
			<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="toPath(item.router)">
				<image :src="item.src" />
				<text>{{ item.name }}</text>
			</view>
		</view>
		<van-cell-group>
		  <van-cell title="我的分享" is-link size="large" icon="manager" title-class="fontSize: '28rpx'; color: '#2d2d2d'; margin-left='20rpx'"/>
		  <van-cell title="关于我们" is-link size="large" icon="award" />
		  <van-cell title="帮助及反馈" is-link size="large" icon="question" />
		  <van-cell title="设置" is-link size="large" icon="setting" />
		  <van-cell title="分享商易租" is-link size="large" icon="share" />
		  <van-cell title="分享商易租" is-link size="large" icon="service" />
		</van-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navList: [{
						name: '委托管理',
						src: '../../static/images/Entrusted.png',
						router: ''
					},
					{
						name: '电子合同',
						src: '../../static/images/E-contract.png',
						router: ''
					},
					{
						name: '我的收藏',
						src: '../../static/images/Collection.png',
						router: ''
					},
					{
						name: '我的预约',
						src: '../../static/images/appointment.png',
						router: ''
					},
				],
				userInfo: {},
			}
		},
		onLoad() {
			uni.getStorage({
				key: "__userInfo__",
				success: (res) => {
					console.log('我的', res)
					this.userInfo = res.data.userInfo
				},
			})
		},
	}
</script>

<style lang="scss" scoped>
.v-my {
	background-color: #EFF2F4;
		
	.user-info {
		background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 48rpx 32rpx 32rpx 45rpx;
		
		.user-img {
			width: 120rpx;
			height: 120rpx;
			background-color: #D3D9DD;
			border-radius: 50%;
			overflow: hidden;
			
			image {
				width: 100%;
				height: 100%;
			}
		}
		
		.user-name {
			flex: 1;
			padding-left: 36rpx;
			
			.user-text {
				font-size: 36rpx;
				color: #2D2D2D;
			}
			
			.user-id {
				font-size: 20rpx;
				color: #2D2D2D;
				margin-top: 15rpx;
			}
		}
		
		.user-edit {
			border-radius: 20rpx;
			background-color: #76A4E4;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 5rpx 18rpx;
			
			.edit-icon {
				width: 22rpx;
				height: 29rpx;
				background-image: url(../../static/images/edit.png);
				background-size: 100%;
			}
			
			text {
				color: #fff;
				font-size: 20rpx;
			}
		}
	}
	
	.user-nav {
		margin: 10rpx 0;
		padding: 10rpx 20rpx 46rpx 20rpx;
		background-color: #ffffff;
		display: flex;
		justify-content: space-around;
	
		.nav-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 36rpx;
	
			image {
				width: 80rpx;
				height: 80rpx;
			}
	
			text {
				margin-top: 20rpx;
				font-size: 24rpx;
			}
		}
	}
	
	/deep/ .van-cell {
		.van-icon {
			color: #1576FE;
		}
	}
}
</style>
