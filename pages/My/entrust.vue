<template>
	<view class="v-entrust">
		<van-tabs :active="active" bind:change="onChange">
		  <van-tab title="招商委托">
				<view class="tab-content">
					<view class="card success">
						<view class="header">
							<view class="title">
								委托成功
							</view>
							<view class="time">
								2020年08月20日22:20:56
							</view>
						</view>
						<view class="content">
							<p>
								您提交的商铺招租委托已成功发布<br />
								工作人员正在努力为您寻找合适的品牌入驻<br />
								您的商铺编号为：xxxx<br />
							</p>
							<view class="btn" @click="yourStore">
								点击查看您的商铺
								<van-icon name="arrow" color="#1676FE" />
							</view>
						</view>
					</view>
					<view class="card fail">
						<view class="header">
							<view class="title">
								委托成功
							</view>
							<view class="time">
								2020年08月20日22:20:56
							</view>
						</view>
						<view class="content">
							<p>
								您提交的商铺招租委托审核失败，未能发布<br />
								审核意见：xxxx<br />
							</p>
							<view class="btn">
								继续发布招租
								<van-icon name="arrow" color="#1676FE"/>
							</view>
						</view>
					</view>
				</view>
			</van-tab>
		  <van-tab title="开店委托">内容 2</van-tab>
		</van-tabs>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 0
			}
		},
		methods: {
			onChange() {
				console.log('切换tab')
			},
			yourStore() {
				console.log(1111111)
				uni.navigateTo({
					url: './feedback'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.v-entrust {
		
		.tab-content {
			padding: 70rpx 25rpx;
			background-color: #EFF2F4;
			
			.card {
				.header {
					width: 650rpx;
					height: 61rpx;
					border-radius: 30rpx 30rpx 30rpx 0;
					padding: 0 56rpx 0 35rpx;
					box-sizing: border-box;
					background-image: linear-gradient(to bottom right, #529AFF, #1676FE);
					display: flex;
					justify-content: space-between;
					align-items: center;
					position: relative;
					z-index: 1;
					
					.title {
						font-size: 32rpx;
						color: #fff;
					}
					.time {
						font-size: 24rpx;
						color: #fff;
					}
				}
				.content {
					background-color: #fff;
					box-shadow: 0px 5rpx 5rpx 0px rgba(223, 223, 223, 0.26);
					padding: 85rpx 56rpx;
					border-radius: 30rpx;
					position: relative;
					top: -30rpx;
					
					p {
						line-height: 42rpx;
						color: #2d2d2d;
						font-size: 24rpx;
					}
					
					.btn {
						color: #1676FE;
						font-size: 24rpx;
						position: absolute;
						right: 34rpx;
						bottom: 37rpx;
						display: flex;
						align-items: center;
					}
				}
			}
			.fail {
				.header {
					background-image: linear-gradient(to bottom right, #FFB955, #F9980D);
				}
			}
			}
		}
</style>
