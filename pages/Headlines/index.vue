<template>
  <view class="v-headlines">
    <Header
      title="商易租头条"
			@onClickLeft="onClickLeft"
    />
		<view class="headline-list">
			<view class="headline-item" v-for="item in 5" :key="item" @click="goHeadlinesDetails">
				<view class="content">
					<text>商易租正式上线啦，合伙人火热招募中</text>
					<view class="time">
						2020年8月11日 08:33
					</view>
				</view>
				<van-icon name="play-circle" size="37rpx" color="#fff"/>
			</view>
		</view>
  </view>
</template>

<script>
import Header from "../../components/Header/index";
export default {
  components: {
    Header,
  },
	methods: {
		onClickLeft() {
			uni.navigateBack()
		},
		goHeadlinesDetails() {
			console.log('进入详情页')
		}
	}
};
</script>

<style lang="scss" scoped>
.v-headlines {
  .headline-list {
		padding: 47rpx 54rpx;
		.headline-item {
			height: 130rpx;
			background-image: url(../../static/images/headlines-bg-odd.png);
			background-size: 100%;
			margin-bottom: 44rpx;
			padding: 0 24rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			.content {
				color: #fff;
				
				text {
					font-size: 28rpx;
				}
				.time {
					font-size: 18rpx;
				}
			}
		}
		.headline-item:nth-child(even) {
			background-image: url(../../static/images/headlines-bg-even.png);
		}
	}
}
</style>