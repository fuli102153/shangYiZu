<template>
	<view class="v-contract">
		<van-tabs :active="active" @change="onChange" color="#1676FE">
			<van-tab title="待签署" :name="0">
			  <view class="tab-content">
			  	<van-empty v-if="shopList.length==0" description="暂无数据" />
			  	<!--fail-->
			  	<view class="card success" v-for="(item,index) in shopList" :key="index">
						<view class="header">
							<view class="title">
								<text>{{ item.docTitle}}</text>
								<!-- <view class="id">
									{{ item.contractId }}
								</view> -->
							</view>
							<view class="status">
								<van-button v-if="item.status === 0" type="info" size="small">立即签署</van-button>
								<text v-else>已签署</text>
							</view>
						</view>
						<view class="foot">
							<view class="id">
								ID: {{ item.contractId }}
							</view>
							<view class="time">
								{{ item.createTime }}
							</view>
						</view>
			  		
			  	</view>
			  </view>
			</van-tab>
		  <van-tab title="已签署" :name="1">
				<view class="tab-content">
					<van-empty v-if="shopList.length==0" description="暂无数据" />
					<!--fail-->
					<view class="card success" v-for="(item,index) in shopList" :key="index">
						<view class="header">
							<view class="title">
								<text>{{ item.docTitle}}</text>
								<!-- <view class="id">
									{{ item.contractId }}
								</view> -->
							</view>
							<view class="status">
								<van-button v-if="item.status === 0" type="info" size="small">立即签署</van-button>
								<text v-else>已签署</text>
							</view>
						</view>
						<view class="foot">
							<view class="id">
								ID: {{ item.contractId }}
							</view>
							<view class="time">
								{{ item.createTime }}
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
	import {getContractList} from "../../utils/api.js"
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
			this.ajaxGetContractList();
		},
		methods: {
			onChange(e) {
				console.log(e.detail.name)
				this.active = e.detail.name;
				this.ajaxGetContractList();
			},
			
			
			//合同列表查询
			ajaxGetContractList(){
				//ajax个人信息查询
				var that = this;
				const paras = {
					status: this.active || 0
				};
				paras.accessToken = that.accessToken;
				const toast = Toast.loading({
				  message: '加载中...',
				  forbidClick: true,
				  loadingType: 'spinner',
				});
				getContractList(paras).then(res => {
					const data = res.data;
					console.log(res);
					
					if(data.code=="200"){
						toast.clear();
						that.shopList = data.data;
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
	.v-contract {
		background-color: #F5F8FA;
		min-height: 100vh;
		
		.tab-content {
			padding: 48rpx 35rpx;
			
			.card {
				height: 194rpx;
				box-sizing: border-box;
				background-color: #fff;
				box-shadow: 0px 2rpx 3rpx 0px rgba(223, 223, 223, 0.26);
				border-radius: 10rpx;
				margin-bottom: 29rpx;
				padding: 29rpx 37rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				
				.header {
					width: 100%;
					display: flex;
					justify-content: space-between;
					.title {
						text {
							font-size: 30rpx;
							color: #2D2D2D;
						}
					}
					
					.status {
						text {
							color: #1676FE;
							font-size: 24rpx;
						}
					}
				}
				
				.foot {
					width: 100%;
					display: flex;
					justify-content: space-between;
					
					.id {						
						font-size: 18rpx;
						color: #3A3A3A;
					}
					.time {
						color: #3A3A3A;
						font-size: 24rpx;
					}
				}
				
				
				
			}
			.fail {
				.header {
					background-image: linear-gradient(to bottom right, #FFB955, #F9980D);
				}
			}
			}
			.active-tab {
				
			}
		}
</style>
