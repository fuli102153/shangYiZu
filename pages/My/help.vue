<template>
	<view class="v-help">
		<van-cell-group>
		  <van-cell title="常见问题解答" is-link size="large" @click="goQA" />
		</van-cell-group>
		<view class="content">
			<textarea v-model="value" placeholder="请输入反馈给平台的问题" />
		</view>
		<view class="btn">
			<van-button type="info" block>提交</van-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: ''
			}
		},
		methods: {
			goQA() {
					uni.navigateTo({
						url: './QA'
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.v-help {
		background-color: #F5F8FA;
		
		/deep/ .van-cell {
			background-color: #fff;
			color: #1576FE;
			.van-icon {
				color: #1576FE;
			}
		}
		
		.content {
			margin-top: 10rpx;
			padding: 54rpx 50rpx;
			background-color: #fff;
			
			textarea {
				width: 100%;
				background: #F5F8FA;
				border: 1rpx solid #F0F2F4;
				border-radius: 6rpx;
				height: 256rpx;
				padding: 20rpx;
				box-sizing: border-box;
			}
		}
		
		.btn {
			margin-top: 57rpx;
			padding: 0 64rpx;
		}
	}
</style>
