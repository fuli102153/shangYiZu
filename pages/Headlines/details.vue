<template>
	<view class="uni-common-mt" style="background:#FFF; padding:20rpx;">
		<view class="header">
			<view class="title">
				{{ title }}
			</view>
			<view class="time">
				{{ time }}
			</view>
		</view>
		<van-divider />
		<rich-text :nodes="strings"></rich-text>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
	            strings: '',
							title: '',
							time: '',
	        }
	    },
			onLoad(params) {
				console.log('params', JSON.parse(params.item))
				const item = JSON.parse(params.item)
				this.title = item.title
				this.time = item.createTime
				this.strings = `<div style="text-align:center;">
													<div>
														${item.content}
													</div>
												</div>`
			}
	}
</script>

<style lang="scss" scoped>
	.uni-common-mt {
		padding: 50rpx;
		
		.header {
			.title {
				font-size: 36rpx;
			}
			.time {
				font-size: 24rpx;
			}
		}
	}
</style>
