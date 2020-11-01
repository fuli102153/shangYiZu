<template>
	<view class="v-my">
		<view class="user-info">
			<view class="user-img">
				<image :src="userInfo.avatarUrl || ''" mode=""></image>
			</view>
			<view class="user-name">
				<view class="user-text">
					{{ userInfo.nickName || '' }}
				</view>
				<view class="user-id">
					手机号:188****8888
				</view>
			</view>
			<view v-if="0" class="user-edit">
				<i class="edit-icon"></i>
				<text>编辑</text>
			</view>
		</view>
		<view class="user-nav">
			<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="toPath(item)">
				<image :src="item.src" />
				<text>{{ item.name }}</text>
			</view>
		</view>
		<van-cell-group>
		  <van-cell title="我的分享" is-link size="large" @click="ajaxGetMyShare" icon="manager" title-class="fontSize: '28rpx'; color: '#2d2d2d'; margin-left='20rpx'"/>
		  <van-cell title="关于我们" is-link size="large" icon="award" />
		  <van-cell title="帮助及反馈" is-link size="large" icon="question" />
		  <van-cell title="设置" is-link size="large" icon="setting" />
		  <van-cell title="分享商易租" is-link size="large" icon="share" />
		  <van-cell title="分享商易租" is-link size="large" icon="service" />
		</van-cell-group>
	</view>
</template>

<script>
	import {getMyShopList,getEntrustmentList,getContractList,getCollectList,getMySubscribe,getMyShare} from "../../utils/api.js"
	export default {
		data() {
			return {
				navList: [{
						name: '委托管理',
						src: '../../static/images/Entrusted.png',
						router: './entrust'
					},
					{
						name: '电子合同',
						src: '../../static/images/E-contract.png',
						router: ''
					},
					{
						name: '我的收藏',
						src: '../../static/images/Collection.png',
						router: ''
					},
					{
						name: '我的预约',
						src: '../../static/images/appointment.png',
						router: ''
					},
				],
				userInfo: {},
			}
		},
		onLoad() {
			uni.getStorage({
				key: "__userInfo__",
				success: (res) => {
					console.log('我的', res)
					this.userInfo = res.data.userInfo
				},
			})
		},
		methods:{
			toPath(item){
				if(item.name == "委托管理"){
					//招租委托查询
					this.ajaxGetMyShopList();
					//开店委托查询
					this.ajaxGetEntrustmentList();
				}else if(item.name == "电子合同"){
					//我的合同查询
					this.ajaxGetContractList();
				}else if(item.name == "我的收藏"){
					//我的收藏列表
					this.ajaxGetMyCollect();
				}else if(item.name == "我的预约"){
					//我的预约记录
					this.ajaxGetMySubscribe();
				}
				uni.navigateTo({
					url: item.router
				})
			},
			
			//招租委托查询
			ajaxGetMyShopList(){
				//ajax个人信息查询
				var that = this;
				const paras = {
					appUid:this.userDetail.id,
				};
				paras.accessToken = that.accessToken;
				
				getMyShopList(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						
					
					}else{
						
						
					}
					
				})
				.catch(error => {
				
				});
			},
			
			//开店委托查询
			ajaxGetEntrustmentList(){
				//ajax个人信息查询
				var that = this;
				const paras = {
					
				};
				paras.accessToken = that.accessToken;
				
				getEntrustmentList(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						
					
					}else{
						
						
					}
					
				})
				.catch(error => {
				
				});
			},
			
			
			//我的合同查询
			ajaxGetContractList(){
				//ajax个人信息查询
				var that = this;
				const paras = {
					
				};
				paras.accessToken = that.accessToken;
				
				getContractList(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						
					
					}else{
						
						
					}
					
				})
				.catch(error => {
				
				});
			},
			
			//我的收藏列表
			ajaxGetMyCollect(){
				//ajax个人信息查询
				var that = this;
				const paras = {
					appUid:this.userDetail.id,
					pageNo:1,
					pageSize:10,
				};
				paras.accessToken = that.accessToken;
				
				getCollectList(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						
					
					}else{
						
						
					}
					
				})
				.catch(error => {
				
				});
			},
			
			
			
			//我的收藏列表
			ajaxGetMySubscribe(){
				//ajax个人信息查询
				var that = this;
				const paras = {
					appUid:this.userDetail.id,
					pageNo:1,
					pageSize:10,
				};
				paras.accessToken = that.accessToken;
				
				getMySubscribe(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						
					
					}else{
						
						
					}
					
				})
				.catch(error => {
				
				});
			},
			
			
			//我的收藏列表
			ajaxGetMyShare(){
				//ajax个人信息查询
				var that = this;
				const paras = {
					appUid:this.userDetail.id,
					pageNo:1,
					pageSize:10,
				};
				paras.accessToken = that.accessToken;
				
				getMyShare(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						
					
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
.v-my {
	background-color: #EFF2F4;
		
	.user-info {
		background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 48rpx 32rpx 32rpx 45rpx;
		
		.user-img {
			width: 120rpx;
			height: 120rpx;
			background-color: #D3D9DD;
			border-radius: 50%;
			overflow: hidden;
			
			image {
				width: 100%;
				height: 100%;
			}
		}
		
		.user-name {
			flex: 1;
			padding-left: 36rpx;
			
			.user-text {
				font-size: 36rpx;
				color: #2D2D2D;
			}
			
			.user-id {
				font-size: 20rpx;
				color: #2D2D2D;
				margin-top: 15rpx;
			}
		}
		
		.user-edit {
			border-radius: 20rpx;
			background-color: #76A4E4;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 5rpx 18rpx;
			
			.edit-icon {
				width: 22rpx;
				height: 29rpx;
				background-image: url(../../static/images/edit.png);
				background-size: 100%;
			}
			
			text {
				color: #fff;
				font-size: 20rpx;
			}
		}
	}
	
	.user-nav {
		margin: 10rpx 0;
		padding: 10rpx 20rpx 46rpx 20rpx;
		background-color: #ffffff;
		display: flex;
		justify-content: space-around;
	
		.nav-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 36rpx;
	
			image {
				width: 80rpx;
				height: 80rpx;
			}
	
			text {
				margin-top: 20rpx;
				font-size: 24rpx;
			}
		}
	}
	
	/deep/ .van-cell {
		.van-icon {
			color: #1576FE;
		}
	}
}
</style>
