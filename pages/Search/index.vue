<template>
	<view class="v-search">
		<form action="/">
			<van-search
				v-model="value"
				shape="round"
				background="#1676FE"
				placeholder="输入意向位置/业态"
				@search="onSearch">
				<template #left>
					<van-icon name="arrow-left" color="#fff" :style="{marginRight: '24rpx'}" @click="onClickLeft" />
				</template>
			</van-search>
		</form>
		<!-- 热门搜索 -->
		<view class="hot">
			<view class="title">
				热门搜索
			</view>
			<view class="hot-tag">
				<view color="#B2B2B2" class="tag-item" v-for="(item, index) in tagList" :key="index">{{ item }}</view>
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
			value: '',
			tagList: ['商场', '餐饮', '服装', '办公', '停车场', '地铁周边', '学校周边'],
			historList: ['超市转让', '宾馆', '茶饮水吧']
		}
	},
	methods: {
		onSearch() {
			console.log(11111)
			uni.navigateTo({
				url: './searchList'
			})
		},
		onClickLeft() {
			uni.navigateBack()
		},
	}
}
</script>

<style lang="scss" scoped>
.v-search {
	background-color: #F5F8FA;
	
	.hot {
		background-color: #fff;
		padding: 47rpx 26rpx 40rpx;
		
		.hot-tag {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.tag-item {
				margin-top: 20rpx;
				border: 1rpx solid #B2B2B2;
				color: #B2B2B2;
				font-size: 30rpx;
				line-height: 30rpx;
				padding: 15rpx 48rpx;
				border-radius: 8rpx;
			}
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
