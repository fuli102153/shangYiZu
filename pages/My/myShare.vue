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
			}
		},
		onLoad(paras) {
			console.log(paras)
			//如果有项目ID
			this.ajaxGetMyShare();
	
		},
		methods: {
			
			
			//招租委托查询
			ajaxGetMyShare(){
				//ajax个人信息查询
				var that = this;
				const paras = {
					appUid:this.userDetail.id,
					pageNo:1,
					pageSize:10,
				};
				paras.accessToken = that.accessToken;
				const toast = Toast.loading({
				  message: '加载中...',
				  forbidClick: true,
				  loadingType: 'spinner',
				});
				getMyShare(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						toast.clear();
						that.shareList = data.data;
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
