<template>
	<view class="v-entrust">
		<van-tabs :active="active" bind:change="onChange">
		  <van-tab title="招商委托">
				<view class="tab-content">
					<van-empty v-if="shopList.length==0" description="暂无数据" />
					<!--fail-->
					<view class="card success" v-for="(item,index) in shopList" :key="index">
						<view class="header">
							<view class="title">
								委托成功
							</view>
							<view class="time">
								{{item.createTime}}
							</view>
						</view>
						<view class="content">
							<p>
								您提交的商铺招租委托已成功发布<br />
								工作人员正在努力为您寻找合适的品牌入驻<br />
								您的商铺编号为：{{item.brandNo}}<br />
							</p>
							<view class="btn" @click="goShopFeedBack(item.id)">
								点击查看您的商铺
								<van-icon name="arrow" color="#1676FE" />
							</view>
						</view>
					</view>
					
				</view>
			</van-tab>
		  <van-tab title="开店委托">
			  <view class="tab-content">
				  <van-empty v-if="entrustmentList.length==0" description="暂无数据" />
			  		<view class="card success" v-for="(item,index) in entrustmentList" :key="index">
			  			<view class="header">
			  				<view class="title">
			  					委托成功
			  				</view>
			  				<view class="time">
			  					{{item.createTime}}
			  				</view>
			  			</view>
			  			<view class="content">
			  				<p>
			  					您提交的商铺招租委托已成功发布<br />
			  					工作人员正在努力为您寻找合适的品牌入驻<br />
			  					您的商铺编号为：{{item.brandNo}}<br />
			  				</p>
			  				<view class="btn" @click="goBrandDetails(item.id)">
			  					点击查看您的商铺
			  					<van-icon name="arrow" color="#1676FE"/>
			  				</view>
			  			</view>
			  		</view>
			  		
			  	</view>
			  
		  </van-tab>
		</van-tabs>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import {getMyShopList,getEntrustmentList} from "../../utils/api.js"
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	export default {
		data() {
			return {
				active: 0,
				entrustmentList:[],
				shopList:[],
			}
		},
		onLoad(paras) {
			console.log(paras)
			//获取列表数据
			this.ajaxGetMyShopList();
			this.ajaxGetEntrustmentList();
		},
		methods: {
			onChange() {
				
			},
			goBrandDetails(brandNo) {
				uni.navigateTo({
					url: '../Brand/BrandDetails?brandNo='+brandNo
				})
				
			},
			
			goShopFeedBack(brandNo) {
				uni.navigateTo({
					url: './feedback?brandNo='+brandNo
				})
				
			},
			
			//招租委托查询
			ajaxGetMyShopList(){
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
				getMyShopList(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						toast.clear();
						that.shopList = data.data.records;
					}else{
						Toast.fail(data.message);
						
					}
					
				})
				.catch(error => {
					Toast.fail(error.message);
				
				});
			},
			
			//开店委托查询
			ajaxGetEntrustmentList(){
				//ajax个人信息查询
				var that = this;
				const paras = {
					pageNo:1,
					pageSize:10,
				};
				paras.accessToken = that.accessToken;
				const toast = Toast.loading({
				  message: '加载中...',
				  forbidClick: true,
				  loadingType: 'spinner',
				});
				getEntrustmentList(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						toast.clear();
						that.entrustmentList = data.data.records;
						
					}else{
						Toast.fail(data.message);
						
					}
					
				})
				.catch(error => {
					Toast.fail(error.message);
				});
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.v-entrust {
		
		.tab-content {
			padding: 70rpx 25rpx;
			background-color: #EFF2F4;
			
			.card {
				.header {
					width: 650rpx;
					height: 61rpx;
					border-radius: 30rpx 30rpx 30rpx 0;
					padding: 0 56rpx 0 35rpx;
					box-sizing: border-box;
					background-image: linear-gradient(to bottom right, #529AFF, #1676FE);
					display: flex;
					justify-content: space-between;
					align-items: center;
					position: relative;
					z-index: 1;
					
					.title {
						font-size: 32rpx;
						color: #fff;
					}
					.time {
						font-size: 24rpx;
						color: #fff;
					}
				}
				.content {
					background-color: #fff;
					box-shadow: 0px 5rpx 5rpx 0px rgba(223, 223, 223, 0.26);
					padding: 85rpx 56rpx;
					border-radius: 30rpx;
					position: relative;
					top: -30rpx;
					
					p {
						line-height: 42rpx;
						color: #2d2d2d;
						font-size: 24rpx;
					}
					
					.btn {
						color: #1676FE;
						font-size: 24rpx;
						position: absolute;
						right: 34rpx;
						bottom: 37rpx;
						display: flex;
						align-items: center;
					}
				}
			}
			.fail {
				.header {
					background-image: linear-gradient(to bottom right, #FFB955, #F9980D);
				}
			}
			}
		}
</style>
