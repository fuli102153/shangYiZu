<template>
	<view class="v-qa">
		<view class="qa-card" v-for="(item, index) in list" :key="index">
			<view class="header">
				
			</view>
			<view class="content">
				<view class="content-q">
					{{ item.q }}
				</view>
				<view class="content-a">
					{{ item.a }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.list = this.Configs.question_answer.split("\n\n").map(item => {
				return { q: item.split("\n")[0], a: item.split("\n")[1] }
			})
			console.log(this.list)
		}
	}
</script>

<style lang="scss" scoped>
	.v-qa {
		padding: 40rpx 25rpx;
		
		.qa-card {
			
			margin-bottom: 48rpx;
			
			.header {
				width: 92rpx;
				height: 92rpx;
				border-radius: 50%;
				background-color: #F5F8FA;
				overflow: hidden;
				display: inline-block;
				position: absolute;
			}
			
			.content {
				padding-top: 16rpx;
				margin-left: 100rpx;
				.content-q {
					background: #F5F8FA;
					border: 1rpx solid #F0F2F4;
					border-radius: 0px 30rpx 30rpx 30rpx;
					color: #1676FE;
					display: flex;
					align-items: center;
					padding: 5rpx 45rpx;
				}
				.content-a {
					background: #F5F8FA;
					border: 1rpx solid #F0F2F4;
					border-radius: 0px 30rpx 30rpx 30rpx;
					color: #888888;
					display: flex;
					align-items: center;
					padding: 5rpx 45rpx;
					margin-top: 24rpx;
				}
			}
		}
	}
</style>
