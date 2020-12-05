<template>
	<view class="v-my-collection">
		<view class="header">
			以下商铺已加入我的收藏
		</view>
		<view class="store-list">
			<van-empty v-if="shopList.length==0" description="暂无数据" />
			<StoreCard  v-for="(item,index) in shopList" :sourceData="item" :key="index" ></StoreCard>
		</view>
		<van-toast id="van-toast" />
	</view>
	
</template>

<script>
	import StoreCard from "../../components/Card/Store";
	import {getCollectList} from "../../utils/api.js"
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	export default {
		components: {
			StoreCard
		},
		data() {
			return {
				shopList: [],
				
				reload: false,
				loadMoreText: "更多",
				paras: {},
			}
		},
		onLoad(paras) {
			console.log(paras)
			//如果有项目ID
			this.ajaxGetShopList();
		},
		onReachBottom() {
			console.log("onReachBottom");
			this.loadMoreText = '更多';
			this.ajaxGetShopList();
		},
		onPullDownRefresh() {
			console.log("onPullDownRefresh");
			this.reload = true;
			this.ajaxGetShopList();
		},
		methods: {
			
			
			ajaxGetShopList(){
				
				var that = this;
				if (this.shopList.length>0) {
					//说明已有数据，目前处于上拉加载
					this.loadMoreText = '加载中';
					this.paras.pageNo = Math.floor(this.shopList.length/this.paras.pageSize)+1;
					this.paras.pageSize = 10;
					//判断是否要需要请求
					if(parseInt(this.shopList.length%this.paras.pageSize) !== 0){ 
						this.loadMoreText = '没有更多';
						return;
					}
					
				}else{
					this.paras.pageNo = 1;
					this.paras.pageSize = 10;
				}
				
				const paras = {
					appUid:this.userDetail.id,
					pageNo: this.paras.pageNo ,
					pageSize: this.paras.pageSize,
					
				};
				paras.accessToken = that.accessToken;
				const toast =Toast.loading({
				  message: '加载中...',
				  forbidClick: true,
				  loadingType: 'spinner',
				});
				getCollectList(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						setTimeout(() => {
							Toast.clear();
						}, 300)
						let list = data.data;
						that.shopList = that.reload ? list : that.shopList.concat(list);
						that.reload = false;
						
					
					}else{
						Toast.fail(data.message);
						
					}
					
				})
				.catch(error => {
					Toast.fail(this.global.error);
				});
			},
			
			setTime: function(items) {
				var newItems = [];
				items.forEach(e => {
					newItems.push(e);
				});
				return newItems;
			},
			
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
