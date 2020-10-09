<template>
	<view class="v-search">
		<van-search
		  v-model="value"
		  shape="round"
		  background="#1676FE"
		  placeholder="输入意向位置/业态">
		<template #left>
		    <van-icon name="arrow-left" color="#fff" :style="{marginRight: '24rpx'}" />
		  </template>
		</van-search>
		<!-- 热门搜索 -->
		<view class="hot">
			<view class="title">
				热门搜索
			</view>
			<view class="hot-tag">
				<van-tag plain  size="large" color="#B2B2B2" class="tag-item" v-for="(item, index) in tagList" :key="index">{{ item }}</van-tag>
			</view>
		</view>
		<!-- 历史记录 -->
		<view class="historical">
			<view class="title">
				<text>历史记录</text>
				<view class="del">
					<van-icon name="delete" color="#888"/>清空
				</view>
			</view>
			<van-cell :title="item" icon="clock-o" v-for="(item, index) in historList" :key="index"/>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tagList: ['商场', '餐饮', '服装', '办公', '停车场', '地铁周边', '学校周边'],
			historList: ['超市转让', '宾馆', '茶饮水吧']
		}
	}
}
</script>

<style lang="scss" scoped>
.v-search {
	background-color: #F5F8FA;
	
	.hot {
		background-color: #fff;
		padding: 47rpx 26rpx 40rpx;
		
		.tag-item {
			margin-top: 36rpx;
			margin-right: 26rpx;
		}
	}
	
	.historical {
		background-color: #fff;
		margin-top: 10rpx;
		padding: 40rpx 0;
		
		.title {
			padding: 0 27rpx 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #888888;
			font-size: 32rpx;
			
			.del {
				display: flex;
				align-items: center;
			}
		}
	}
}
</style>
