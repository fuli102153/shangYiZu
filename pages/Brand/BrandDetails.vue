<template>
	<view class="v-brand-details">
		<uni-swiper-dot >
			<swiper class="swiper-box" @change="change">
				<swiper-item v-for="(item ,index) in brand.effectPhotos?brand.effectPhotos.split(',') : []" :key="index">
					<view class="swiper-item">
						<image :src="item" mode="" style="width: 100%; height: 430rpx;"></image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="content">
			<view class="header">
				<view class="title">
					{{brand.brandName}}
				</view>
				<view class="id">
					商铺编号：{{brand.brandNo}}
				</view>
			</view>
			<view class="main">
				<view class="cell">
					<view class="left">
						品牌身份
					</view>
					<view class="right">
						{{brand.indentity}}
					</view>
				</view>
				<view class="cell">
					<view class="left">
						期望物业类型
					</view>
					<view class="right">
						{{brand.propertyType}}
					</view>
				</view>
				<view class="cell">
					<view class="left">
						拓展区域
					</view>
					<view class="right">
						{{brand.city}} {{brand.region}} {{brand.street}}
					</view>
				</view>
				<view class="cell">
					<view class="left">
						需求面积
					</view>
					<view class="right">
						{{brand.measureArea}}m²
					</view>
				</view>
				<view class="cell">
					<view class="left">
						加盟条件
					</view>
					<view class="right">
						{{brand.joinConditions}}
					</view>
				</view>
			</view>
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import {getBrandDetail} from "../../utils/api.js"
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	export default {
		data() {
			return {
				// 轮播图
				info: [{
					content: '内容 A'
				}, {
					content: '内容 B'
				}, {
					content: '内容 C'
				}],
				current: 0,
				mode: 'nav',
				brand:{}
			}
		},
		onLoad(paras) {
			console.log(paras)
			
			//如果有项目ID
			if(paras.brandNo){
				this.getDetail(paras.brandNo);
			}
		},
		methods:{
			getDetail(brandNo){
				
				var that = this;
				const paras = {
					id:brandNo
				};
				paras.accessToken = that.accessToken;
				const toast = Toast.loading({
				  message: '加载中...',
				  forbidClick: true,
				  loadingType: 'spinner',
				});
				console.log(paras)
				getBrandDetail(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						setTimeout(() => {
							Toast.clear();
						}, 300)
						that.brand = data.data;
					
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
	.v-brand-details {
		height: 100vh;
		background-color: #F5F8FA;
		
		.swiper-box {
			height: 430rpx;
		}
		
		.content {
			margin: 0 20rpx;
			border-radius: 20rpx;
			background-color: #fff;
			position: relative;
			top: -80rpx;
			padding: 30rpx;
			
			.header {
				padding: 10rpx 35rpx 30rpx;
				border-bottom: 5rpx solid #F5F8FA;
				
				.title {
					font-size: 36rpx;
					color: #2d2d2d;
				}
				.id {
					font-size: 24rpx;
					color: #2d2d2d;
				}
			}
			
			.main {
				.cell {
					padding: 25rpx 36rpx;
					color: #2d2d2d;
					display: flex;
					align-items: flex-end;
					.left {
						width: 194rpx;
						font-size: 28rpx;
					}
					.right {
						font-size: 23rpx;
					}
				}
				.cell:nth-child(even) {
					background-color: #F5F8FA;
				}
			}
		}
	}
</style>
