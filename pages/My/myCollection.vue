<template>
	<view class="v-my-collection">
		<view class="header">
			以下商铺已加入我的收藏
		</view>
		<view class="store-list">
			<CollCard></CollCard>
		</view>
	</view>
</template>

<script>
	import CollCard from '../../components/Card/collection.vue'
	export default {
		components: {
			CollCard
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.v-my-collection {
		.header {
			height: 90rpx;
			background: #FFFFFF;
			font-size: 28rpx;
			color: #1676FE;
			padding-left: 50rpx;
			display: flex;
			align-items: center;
		}
		.store-list {
			padding: 40rpx;
		}
	}
</style>
