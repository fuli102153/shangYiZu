<template>
	<view class="v-my-share">
		<van-empty v-if="shareList.length==0" description="暂无数据" />
		<view class="share-card" v-for="(item, index) in shareList" :key="index">
			<view class="store-id">
				分享商铺编号：{{item.shopNo || "无"}}
			</view>
			<view class="share-info" v-if="item.status">
				分享成功
			</view>
			<view class="share-info" v-else>
				分享失败
			</view>
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import {getMyShare} from "../../utils/api.js"
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	export default {
		data() {
			return {
				shareList:[],
				paras: {},
			}
		},
		onLoad() {
			//如果有项目ID
			this.ajaxGetMyShare();
	
		},
		methods: {
			onReachBottom() {
				console.log("onReachBottom");
				this.loadMoreText = '更多';
				this.ajaxGetMyShare();
			},
			onPullDownRefresh() {
				console.log("onPullDownRefresh");
				this.reload = true;
				this.ajaxGetMyShare();
			},
			
			//招租委托查询
			ajaxGetMyShare(){
				//ajax个人信息查询
				uni.stopPullDownRefresh()
				var that = this;
				if (this.shareList.length>0) {
					//说明已有数据，目前处于上拉加载
					this.loadMoreText = '加载中';
					this.paras.pageNo = Math.floor(this.shareList.length/this.paras.pageSize)+1;
					this.paras.pageSize = 10;
					//判断是否要需要请求
					if(parseInt(this.shareList.length%this.paras.pageSize) !== 0){ 
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
				const toast = Toast.loading({
				  message: '加载中...',
				  forbidClick: true,
				  loadingType: 'spinner',
				});
				getMyShare(paras).then(res => {
					const data = res.data;
					
					if(data.code == 200){
						setTimeout(() => {
							Toast.clear();
						}, 300)
						let list = data.data;
						that.shareList = that.reload ? list : that.shareList.concat(list);
						that.reload = false;
					}else{
						Toast.fail(data.message);
						
					}
					
				})
				.catch(error => {
					Toast.fail(this.global.error);
				
				});
			},
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.v-my-share {
		padding: 40rpx 35rpx;
		
		.share-card {
			position: relative;
			height: 194rpx;
			padding-right: 40rpx;
			border-radius: 10rpx;
			margin-bottom: 20rpx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			background-image: linear-gradient(to bottom right, #529AFF, #1676FE);
			
			.store-id {
				color: #fff;
				font-size: 24rpx;
				position: absolute;
				top: 27rpx;
				left: 30rpx;
			}
			
			.share-info {
				width: 160rpx;
				height: 42rpx;
				border-radius: 21rpx;
				background-color: #C4CEDA;
				color: #1676FE;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
