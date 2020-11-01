<template>
	<view class="v-brand-details">
		<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
			<swiper class="swiper-box" @change="change">
				<swiper-item v-for="(item ,index) in 8" :key="index">
					<view class="swiper-item">
						<image src="../../static/images/swiper.png" mode="" style="width: 100%; height: 430rpx;"></image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="content">
			<view class="header">
				<view class="title">
					肯德基
				</view>
				<view class="id">
					商铺编号：szlg123456
				</view>
			</view>
			<view class="main">
				<view class="cell">
					<view class="left">
						品牌身份
					</view>
					<view class="right">
						品牌连锁
					</view>
				</view>
				<view class="cell">
					<view class="left">
						期望物业类型
					</view>
					<view class="right">
						购物中心、社区底商、商业街区
					</view>
				</view>
				<view class="cell">
					<view class="left">
						拓展区域
					</view>
					<view class="right">
						深圳市 宝安区
					</view>
				</view>
				<view class="cell">
					<view class="left">
						需求面积
					</view>
					<view class="right">
						200m²-300m²
					</view>
				</view>
				<view class="cell">
					<view class="left">
						加盟条件
					</view>
					<view class="right">
						开店发布时填写的加盟条件内容
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图
				info: [{
					content: '内容 A'
				}, {
					content: '内容 B'
				}, {
					content: '内容 C'
				}],
				current: 0,
				mode: 'nav',
			}
		}
	}
</script>

<style lang="scss" scoped>
	.v-brand-details {
		height: 100vh;
		background-color: #F5F8FA;
		
		.swiper-box {
			height: 430rpx;
		}
		
		.content {
			margin: 0 20rpx;
			border-radius: 20rpx;
			background-color: #fff;
			position: relative;
			top: -80rpx;
			padding: 30rpx;
			
			.header {
				padding: 10rpx 35rpx 30rpx;
				border-bottom: 5rpx solid #F5F8FA;
				
				.title {
					font-size: 36rpx;
					color: #2d2d2d;
				}
				.id {
					font-size: 24rpx;
					color: #2d2d2d;
				}
			}
			
			.main {
				.cell {
					padding: 25rpx 36rpx;
					color: #2d2d2d;
					display: flex;
					align-items: flex-end;
					.left {
						width: 194rpx;
						font-size: 28rpx;
					}
					.right {
						font-size: 23rpx;
					}
				}
				.cell:nth-child(even) {
					background-color: #F5F8FA;
				}
			}
		}
	}
</style>
