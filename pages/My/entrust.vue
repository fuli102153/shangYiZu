<template>
	<view class="v-entrust">
		<van-tabs :active="active" bind:change="onChange" color="#1676FE" :sticky="true">
		  <van-tab title="招商委托">
				<view class="tab-content">
					<van-empty v-if="shopList.length==0" description="暂无数据" />
					<!--fail-->
					<!--状态 0：拒绝;1-待审核;2-已发布（空置）;3-洽谈中;4-已成交未结佣;5-已成交已结佣;6-竞方出租;7-下线-->
					<view v-for="(item,index) in shopList" :key="index">
						<view class="card success" :class="'cardStatus_'+statusList[item.status].value" >
							<view class="header">
								<view class="title">
									{{statusList[item.status].name}}
								</view>
								<view class="time">
									{{item.createTime}}
								</view>
							</view>
							<view class="content">
								<p v-if="item.status === 0">
									您提交的商铺招租委托审核失败，未能发布<br />
									审核意见：{{item.opinion || "无"}}<br />
								</p>
								<p v-else-if="item.status === 1">
									您提交的商铺招租委托待审核中，请耐心等待
								</p>
								<p v-else-if="item.status === 2">
									您提交的商铺招租委托已成功发布<br />
									工作人员正在努力为您寻找合适的品牌入驻<br />
									您的商铺编号为：{{item.shopNo}}<br />
								</p>
								<p v-else-if="item.status === 3">
									您提交的商铺招租委托洽谈中，请耐心等待
								</p>
								<p v-else-if="item.status === 4">
									您提交的商铺招租委托{{statusList[item.status].name}}，请耐心等待
								</p>
								<p v-else-if="item.status === 5">
									您提交的商铺招租委托{{statusList[item.status].name}}，请耐心等待
								</p>
								<p v-else-if="item.status === 6">
									您提交的商铺招租委托{{statusList[item.status].name}}，请耐心等待
								</p>
								<p v-else-if="item.status === 7">
									您提交的商铺招租委托{{statusList[item.status].name}}，请更换别的商铺
								</p>
								<view class="btn" @click="goShopFeedBack(item.shopNo)">
									点击查看您的商铺
									<van-icon name="arrow" color="#1676FE" />
								</view>
							</view>
						</view>
						
						
						
					</view>
				</view>
			</van-tab>
		  <van-tab title="开店委托">
			  <view class="tab-content">
				  <van-empty v-if="entrustmentList.length==0" description="暂无数据" />
					  <view v-for="(item,index) in entrustmentList" :key="index">
						<view class="card success" :class="'cardStatus_'+statusList[item.status].value"  >
							<view class="header">
								<view class="title">
									{{statusList[item.status].name}}
								</view>
								<view class="time">
									{{item.createTime}}
								</view>
							</view>
							<view class="content">
								<p v-if="item.status === 0">
									您提交的商铺招租委托审核失败，未能发布<br />
									审核意见：{{item.opinion || "无"}}<br />
								</p>
								<p v-else-if="item.status === 1">
									您提交的开店找铺委托待审核中，请耐心等待
								</p>
								<p v-else-if="item.status === 2">
									您提交的开店找铺委托已成功发布<br />
									工作人员正在努力为您寻找合适的品牌入驻<br />
									您的品牌编号为：{{item.brandNo}}<br />
								</p>
								<p v-else-if="item.status === 3">
									您提交的开店找铺委托洽谈中，请耐心等待
								</p>
								<p v-else-if="item.status === 4">
									您提交的开店找铺委托{{statusList[item.status].name}}，请耐心等待
								</p>
								<p v-else-if="item.status === 5">
									您提交的开店找铺委托{{statusList[item.status].name}}，请耐心等待
								</p>
								<p v-else-if="item.status === 6">
									您提交的开店找铺委托{{statusList[item.status].name}}，请耐心等待
								</p>
								<p v-else-if="item.status === 7">
									您提交的开店找铺委托{{statusList[item.status].name}}，请更换别的商铺
								</p>
								<view class="btn" @click="goBrandDetails(item.id)">
									点击查看您的品牌
									<van-icon name="arrow" color="#1676FE"/>
								</view>
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
				// 0：拒绝;1-待审核;2-已发布（空置）;3-洽谈中;4-已成交未结佣;5-已成交已结佣;6-竞方出租;7-下线-
				statusList:[
					{
						value:0,
						name:"拒绝"
					},
					{
						value:1,
						name:"待审核"
					},
					{
						value:2,
						name:"已发布"
					},
					{
						value:3,
						name:"洽谈中"
					},
					{
						value:4,
						name:"已成交未结佣"
					},
					{
						value:5,
						name:"已成交已结佣"
					},
					{
						value:6,
						name:"竞方出租"
					},
					{
						value:7,
						name:"下线"
					},
				]
			}
		},
		onLoad(paras) {
			console.log(paras)
			//获取列表数据
			this.ajaxGetMyShopList();
			this.ajaxGetEntrustmentList();
		},
		methods: {
			onReachBottom() {
				console.log("onReachBottom");
				this.loadMoreText = '更多';
				if (this.active === 0) {
					this.ajaxGetMyShopList();
				} else {
					this.ajaxGetEntrustmentList();
				}
			},
			onPullDownRefresh() {
				console.log("onPullDownRefresh");
				this.reload = true;
				if (this.active === 0) {
					this.ajaxGetMyShopList();
				} else {
					this.ajaxGetEntrustmentList();
				}
			},
			onChange() {
				
			},
			goBrandDetails(brandNo) {
				uni.navigateTo({
					url: '../Brand/BrandDetails?brandNo='+brandNo
				})
				
			},
			
			goShopFeedBack(shopNo) {
				uni.navigateTo({
					url: './feedback?shopNo='+shopNo
				})
				
			},
			
			goRental() {
				uni.navigateTo({
					url: '../Rental/index'
				})
			},
			
			//招租委托查询
			ajaxGetMyShopList(){
				//ajax个人信息查询
				var that = this;
				if (this.shopList.length>0) {
					//说明已有数据，目前处于上拉加载
					this.loadMoreText = '加载中';
					this.pageNo = Math.floor(this.shopList.length/this.pageSize)+1;
					this.pageSize = 10;
					//判断是否要需要请求
					if(parseInt(this.shopList.length%this.pageSize) !== 0){ 
						this.loadMoreText = '没有更多';
						return;
					}
					
				}else{
					this.pageNo = 1;
					this.pageSize = 10;
				}
				const paras = {
					appUid:this.userDetail.id,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
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
						setTimeout(() => {
							Toast.clear();
						}, 300)
						// that.shopList = data.data;
						let list = data.data;
						that.shopList = that.reload ? list : that.shopList.concat(list);
						that.reload = false;
						console.log(that.shopList);
					}else{
						Toast.fail(data.message);
						
					}
					
				})
				.catch(error => {
					Toast.fail(this.global.error);
				
				});
			},
			
			//开店委托查询
			ajaxGetEntrustmentList(){
				//ajax个人信息查询
				var that = this;
				if (this.shopList.length>0) {
					//说明已有数据，目前处于上拉加载
					this.loadMoreText = '加载中';
					this.pageNoEntrustment = Math.floor(this.shopList.length/this.pageSizeEntrustment)+1;
					this.pageSizeEntrustment = 10;
					//判断是否要需要请求
					if(parseInt(this.shopList.length%this.pageSizeEntrustment) !== 0){ 
						this.loadMoreText = '没有更多';
						return;
					}
					
				}else{
					this.pageNoEntrustment = 1;
					this.pageSizeEntrustment = 10;
				}
				const paras = {
					pageNo: this.pageNoEntrustment,
					pageSize: this.pageSizeEntrustment,
				};
				paras.accessToken = that.accessToken;
				const toast = Toast.loading({
				  message: '加载中...',
				  forbidClick: true,
				  loadingType: 'spinner',
				});
				getEntrustmentList(paras).then(res => {
					const data = res.data;
					if(data.code=="200"){
						setTimeout(() => {
							Toast.clear();
						}, 300)
						let list = data.data.records;
						that.entrustmentList = that.reload ? list : that.entrustmentList.concat(list);
						that.reload = false;
						uni.stopPullDownRefresh()
						// that.entrustmentList = data.data.records;
					} else {
						uni.stopPullDownRefresh()
						Toast.fail(data.message);
					}
				})
				.catch(error => {
					uni.stopPullDownRefresh()
					Toast.fail(this.global.error);
				});
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.v-entrust {
		min-height: 100vh;
		background-color: #EFF2F4;
		
		/deep/ .van-sticky {
			z-index: 9;
		}
		
		.tab-content {
			padding: 70rpx 25rpx;
			
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
			.cardStatus_0 {
				.header {
					background-image: linear-gradient(to bottom right, #FFB955, #F9980D);
				}
			}
			.cardStatus_1 {
				.header {
					background-image: linear-gradient(to bottom right, #40c000, #40c020);
				}
			}
			.cardStatus_3 {
				.header {
					background-image: linear-gradient(to bottom right, #ff2040, #ff2060);
				}
			}
			.cardStatus_4 {
				.header {
					background-image: linear-gradient(to bottom right, #0020ff, #0040ff);
				}
			}
			.cardStatus_5 {
				.header {
					background-image: linear-gradient(to bottom right, #00c0a0, #00c080);
				}
			}
			.cardStatus_6 {
				.header {
					background-image: linear-gradient(to bottom right, #FF6699, #FF3366);
				}
			}
			.cardStatus_7 {
				.header {
					background-image: linear-gradient(to bottom right, #999999, #777);
				}
			}
			}
		}
</style>
