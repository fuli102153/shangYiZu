<template>
	<view class="v-engineering">
		<view class="hot">
			<view class="title">
				热门搜索
			</view>
			<view class="hot-tag">
				<view color="#B2B2B2" class="tag-item" :class="selectList.includes(index) ? 'active' : ''" v-for="(item, index) in tagList" :key="index" @click="selectTag(index)">{{ item }}</view>
			</view>
		</view>
		<view class="btn">
		  <van-button type="info" block @click="goRental">完成</van-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tagList: ['上下水', '排油烟', '独立卫生间', '中央空调', '独立空调', '单铺', '专柜', '地面停车位', '地下停车位', '统一运营', '独立运营', '天然气', '煤气', '可明火', '可餐饮'],
				selectList: []
			}
		},
		methods: {
			selectTag(index) {
				let list = JSON.parse(JSON.stringify(this.selectList))
				if (list.includes(index)) {
					list.forEach((item, idx) => {
						if (item === index) {
							list.splice(idx,1); 
						}
					})
				} else {
					list.push(index)
				}
				this.selectList = list
			},
			
			goRental() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.v-engineering {
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
				.active {
					color: #1676FE;
					border: 1rpx solid #1676FE;
				}
			}
		}
		
		.btn {
			margin-top: 116rpx;
			padding: 0 128rpx;
		}
	}
</style>
