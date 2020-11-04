<template>
	<!-- 购物中心 -->
	<view class="v-shopping-mall">
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
		<view class="image-list" v-if="projectList.length>0">
			<view class="recommend-content">
				<view class="recommend-list">
					<view class="recommend-item" v-for="(item,index) in projectList" :key="index">
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
			<view class="store-list" >
				
				<van-empty v-if="shopList.length==0" description="暂无数据" />
				<StoreCard v-else v-for="(item,index) in shopList" :sourceData="item" :key="index" />
			</view>
		</view>
	</view>
</template>

<script>
	import StoreCard from '../../components/Card/Store'
	import {getProjectList,getProjectAndShopList} from "../../utils/api.js"
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
								children: [
									{
										id: 1-1,
										text: '500m',
										children: []
									},
									{
										id: 1-2,
										text: '500m',
										children: []
									},
									{
										id: 1-3,
										text: '500m',
										children: []
									},
									{
										id: 1-4,
										text: '500m',
										children: []
									},
								]
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
				activeKey: 0,
				projectList:[],
				shopList:[],
				loading:true,
				paras:{
					openFlag:"",
					openMetroFlag:"",
					nearbyResouce:"",
					businessType:"",
					measureAreaStart:"",
					measureAreaEnd:"",
					distance:"",
					regionId:"",
					streetId:"",
					longitude:"",
					latitude:"",
					pageNo:1,
					pageSize:99,
				}
			
			}
		},
		onLoad(paras) {
			console.log(paras)
			//如果有项目ID
			if(paras.projectId){
				this.ajaxGetProjectAndShopList(paras.projectId);
			}else{
				this.ajaxProjectList(paras.projectType);
			}
		},
		onShow(){
			//项目列表
			
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
			},
			
			//ajax请求数据 
			ajaxProjectList(projectType){
				//ajax个人信息查询
				var that = this;
				that.loading = true;
				var projectType = projectType || 1;
				const paras = {
					projectType:projectType,
					latitude: that.location.latitude,
					longitude: that.location.longitude,
					pageNo:1,
					pageSize:10,
				};
				paras.accessToken = that.accessToken;
				
				getProjectList(paras).then(res => {
					const data = res.data;
					console.log(data);
					that.loading = false;
					if(data.code=="200"){
						that.projectList = data.projectList;
						that.shopList = data.shopList;
					
					}else{
						
						
					}
					
				})
				.catch(error => {
				
				});
			},
			
			ajaxGetProjectAndShopList(projectId){
				//ajax个人信息查询
				var that = this;
				const paras = {
					projectId:projectId,
					pageNo:1,
					pageSize:10,
				};
				paras.accessToken = that.accessToken;
				
				getProjectAndShopList(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						that.projectList = data.projectList;
						that.shopList = data.shopList;
					
					}else{
						
						
					}
					
				})
				.catch(error => {
				
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.v-shopping-mall {
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
