<template>
	<view class="v-investmentCategory">
		<view class="hot">
			<view class="title">
				热门搜索
			</view>
			<view class="hot-tag">
				<view color="#B2B2B2" class="tag-item" :class="selectList.includes(index) ? 'active' : ''" v-for="(item, index) in tagList" :key="index" @click="selectTag(index)">{{ item }}</view>
			</view>
		</view>
		<view class="btn">
		  <van-button type="info" block>完成</van-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tagList: ['餐饮', '服饰', '数码', '各类业态', '各类业态', '各类业态'],
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.v-investmentCategory {
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
					margin-right: 8rpx;
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
