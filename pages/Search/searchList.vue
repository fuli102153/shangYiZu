<template>
	<view class="v-search-list">
		<van-sticky>
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
			<van-dropdown-menu>
				<van-dropdown-item title="区域">
					<van-tree-select
						height="55vw"
						:items="items"
						:active-id.sync="activeId"
						:main-active-index.sync="activeIndex"
					/>
				</van-dropdown-item>
				<van-dropdown-item title="月租金">
					<van-tree-select
						height="55vw"
						:items="items"
						:active-id.sync="activeId"
						:main-active-index.sync="activeIndex"
					/>
				</van-dropdown-item>
				<van-dropdown-item title="物业">
					<van-tree-select
						height="55vw"
						:items="items"
						:active-id.sync="activeId"
						:main-active-index.sync="activeIndex"
					/>
				</van-dropdown-item>
				<van-dropdown-item title="更多">
					<van-tree-select
						height="55vw"
						:items="items"
						:active-id.sync="activeId"
						:main-active-index.sync="activeIndex"
					/>
				</van-dropdown-item>
			</van-dropdown-menu>
		</van-sticky>
		<view class="store-list">
		  <StoreCard v-for="item in 8" :key="item"/>
		</view>
	</view>
</template>

<script>
import StoreCard from '../../components/Card/Store'
export default {
	components: {
		StoreCard
	},
	data() {
		return {
			value: '',
			value1: 0,
			option1: [
			  { text: '全部商品', value: 0 },
			  { text: '新款商品', value: 1 },
			  { text: '活动商品', value: 2 },
			],
			activeKey: 0,
			list: ['不限', '500m', '1000m', '2000m', '3000m', '4000m', '5000m'],
			activeIndex: 0,
			activeId: 1,
			items: [
			  { 
					text: '附近', children: [
						{ 
							id: 1, 
							text: '不限', 
							children: []
						},
						{ id: 2, text: '500m', children: [] },
						{ id: 3, text: '1000m', children: [] },
						{ id: 4, text: '2000m', children: [] },
						{ id: 5, text: '3000m', children: [] },
						{ id: 6, text: '4000m', children: [] },
						{ id: 7, text: '5000m', children: [] },
					] ,
				},
			  { text: '街道', children: [] },
				{ text: '地铁', children: [] },
			],
		}
	},
	methods: {
		onSearch() {
			console.log('搜索')
		},
		onClickLeft() {
			uni.navigateBack()
		},
	}
}
</script>

<style lang="scss" scoped>
.v-search-list {
	.region {
		display: flex;
		.van-list {
			flex: 1;
		}
	}
	
	.store-list {
		padding: 0 16rpx;
	}
}
</style>
