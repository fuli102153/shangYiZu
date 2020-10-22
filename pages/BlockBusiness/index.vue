<template>
	<view class="v-block-business">
		<van-sticky>
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
		<view class="image-list">
			<view class="recommend-content">
				<view class="recommend-list">
					<view class="recommend-item" v-for="item in 8" :key="item">
						<view class="recommend-image">
							<image :src="item.projectImg"></image>
						</view>
						<view class="recommend-text">
							{{item.projectName}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="view-list">
			<van-sidebar :active-key="activeKey" @change="onChange">
			  <van-sidebar-item title="标签名" />
			  <van-sidebar-item title="标签名" />
			  <van-sidebar-item title="标签名" />
			</van-sidebar>
			<view class="store-list">
				<StoreCard v-for="item in 8" :key="item" />
			</view>
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
				activeKey: 0
			}
		},
		methods: {
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
			onChange(event) {
				this.activeKey = event.detail
				console.log(event.detail)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.v-block-business {
		height: 100vh;
		display: flex;
		flex-direction: column;
		.region {
			display: flex;

			.van-list {
				flex: 1;
			}
		}
		
		.image-list {
			padding: 36rpx 0;
			
			.recommend-content {
				width: 100%;
				overflow-x: auto;
				
				&::-webkit-scrollbar{
					display: none;
				}
				
				.recommend-list {
					white-space: nowrap;
					font-size: 0;
					padding: 0 26rpx;
					
					.recommend-item {
						width: 280rpx;
						height: 240rpx;
						border-radius: 20rpx;
						background-color: #eee;
						margin-right: 50rpx;
						display: inline-block;
						vertical-align: middle;
						box-sizing: border-box;
						overflow: hidden;
						position: relative;
						
						.recommend-text {
							width: 100%;
							font-size: 30rpx;
							line-height: 30rpx;
							color: #fff;
							height: 60rpx;
							background: rgba(0, 0, 0, 0.6);
							display: flex;
							justify-content: center;
							align-items: center;
							position: absolute;
							bottom: 0;
						}
					}
				}
			}
		}
		
		.view-list {
			display: flex;
			flex: 1;
			
			.store-list {
				flex: 1;
				height: 100%;
				overflow: auto;
				padding: 0 16rpx;
			}
		}
	}
</style>
