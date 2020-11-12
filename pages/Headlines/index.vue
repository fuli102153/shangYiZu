<template>
  <view class="v-headlines">
		<view class="headline-list">
			<view class="headline-item" v-for="(item,index) in headlineList" :key="index" @click="goHeadlinesDetails(item)">
				<view class="content">
					<text>{{item.title}}</text>
					<view class="time">
						{{item.createTime || ""}}
					</view>
				</view>
				<van-icon name="play-circle" size="37rpx" color="#fff"/>
			</view>
		</view>
  </view>
</template>

<script>
	import {getHeadline} from "../../utils/api.js"
	
	export default {
		data() {
			return {
				
				headlineList:[],
				
				
			};
		},
		onLoad() {
			//头条信息
			this.ajaxGetHeadline();
		},
		methods: {
			goHeadlinesDetails(item) {
				uni.navigateTo({
					url: './details?item=' + JSON.stringify(item)
				})
				console.log('进入详情页')
			},
			//头条信息
			ajaxGetHeadline(){
				//ajax个人信息查询
				var that = this;
				const paras = {
					pageNo:1,
					pageSize:10,
				};
				paras.accessToken = that.accessToken;
				
				getHeadline(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						that.headlineList = data.data;
					
					}else{
						
						
					}
					
				})
				.catch(error => {
				
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
.v-headlines {
  .headline-list {
		padding: 47rpx 54rpx;
		.headline-item {
			height: 130rpx;
			background-image: linear-gradient(to bottom right, #37BFFF, #1796FF);
			background-size: 100%;
			margin-bottom: 44rpx;
			border-radius: 20rpx;
			padding: 0 24rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			.content {
				color: #fff;
				
				text {
					font-size: 28rpx;
				}
				.time {
					font-size: 18rpx;
				}
			}
		}
		.headline-item:nth-child(even) {
			background-image: linear-gradient(to bottom right, #7C7AF9, #5660BC);
		}
	}
}
</style>