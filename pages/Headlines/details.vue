<template>
	<view class="uni-common-mt" style="background:#FFF; padding:40rpx;">
		<view class="header">
			<view class="title">
				{{ news.title }}
			</view>
			<view class="time">
				{{ news.createTime }}
			</view>
		</view>
		<van-divider />
		
		<view class="new-img" v-if="news.pic">
			<image :src="news.pic" mode=""></image>
		</view>
		
		<rich-text class="content" :nodes="strings"></rich-text>
	</view>
</template>

<script>
	import { getHeadlineDetail } from "../../utils/api.js"
	export default {
	    data() {
	        return {
	            news:{},
				strings:"",
	        }
	    },
		onLoad(params) {
			console.log(params)
			//console.log(JSON.parse(params.item))
			//const item = JSON.parse(params.item)
			this.getData(params.id)
		},
		methods: {
			getData(id) {
				getHeadlineDetail({id: id}).then(res => {
					
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						this.news = data.data
						
						this.strings = `<div style="text-align:left;">
								<div>
									${data.data.content}
								</div>
							</div>`
					}else{
						
						
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-common-mt {
		padding: 50rpx;
		
		.header {
			.title {
				font-size: 36rpx;
				text-align: center;
				line-height: 60rpx;
				font-weight: 600;
			}
			.time {
				font-size: 24rpx;
				color: #969799;
				text-align: center;
				line-height: 40rpx;
			}
		}
		.new-img {
			width: 678rpx;
			height: 300rpx;
			border-radius: 8rpx;
			
			image {
				width: 678rpx;
				height: 300rpx;
				border-radius: 8rpx;
			}
		}
		.content{
			line-height: 25px;
			color: #666666;
			text-align: left;
			padding:10px
			
		}
	}
	

</style>
