<template>
	<view class="v-search-list">
		<van-sticky>
			<form action="/">
				<van-search v-model="value" shape="round" background="#1676FE" placeholder="输入意向位置/业态" @search="onSearch"></van-search>
			</form>
			<van-dropdown-menu>
				<van-dropdown-item title="区域">
					<van-tree-select height="55vw" :items="items" :main-active-index="mainActiveIndex" :active-id="activeId" selected-icon="success"
					 @click-nav="onClickNav" @click-item="onClickItem" />
				</van-dropdown-item>
				<van-dropdown-item title="月租金">
					<van-tree-select height="55vw" :items="items" :main-active-index="mainActiveIndex" :active-id="activeId" selected-icon="success"
					 @click-nav="onClickNav" @click-item="onClickItem" />
				</van-dropdown-item>
				<van-dropdown-item title="物业">
					<van-tree-select height="55vw" :items="items" :main-active-index="mainActiveIndex" :active-id="activeId" selected-icon="success"
					 @click-nav="onClickNav" @click-item="onClickItem" />
				</van-dropdown-item>
				<van-dropdown-item title="更多">
					<van-tree-select height="55vw" :items="items" :main-active-index="mainActiveIndex" :active-id="activeId" selected-icon="success"
					 @click-nav="onClickNav" @click-item="onClickItem" />
				</van-dropdown-item>
			</van-dropdown-menu>
		</van-sticky>
		<view class="store-list">
			<StoreCard v-for="item in 8" :key="item" />
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
				mainActiveIndex: 0,
				activeId: null,
				items: [{
						text: '附近',
						children: [{
								id: 1,
								text: '不限',
								children: []
							},
							{
								id: 2,
								text: '500m',
								children: []
							},
							{
								id: 3,
								text: '1000m',
								children: []
							},
							{
								id: 4,
								text: '2000m',
								children: []
							},
							{
								id: 5,
								text: '3000m',
								children: []
							},
							{
								id: 6,
								text: '4000m',
								children: []
							},
							{
								id: 7,
								text: '5000m',
								children: []
							},
						],
					},
					{
						text: '街道',
						children: []
					},
					{
						text: '地铁',
						children: []
					},
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
			onClickNav({detail = {}}) {
				this.mainActiveIndex = detail.index || 0
			},
			onClickItem({detail = {}}) {
				const activeId = this.activeId === detail.id ? null : detail.id;
				this.activeId = activeId
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
