<template>
	<view class="uni-common-mt" style="background:#FFF; padding:40rpx;">
		<view class="header">
			<view class="title">
				{{ title }}
			</view>
			<view class="time">
				{{ time }}
			</view>
		</view>
		<van-divider />
		
		<view class="new-img" v-if="pic">
			<image :src="pic" mode=""></image>
		</view>
		
		<rich-text class="content" :nodes="strings"></rich-text>
	</view>
</template>

<script>
	import { getHeadlineDetail } from "../../utils/api.js"
	export default {
	    data() {
	        return {
	            strings: '',
				title: '',
				pic:'',
				time: '',
	        }
	    },
		onLoad(params) {
			console.log(params)
			//console.log(JSON.parse(params.item))
			//const item = JSON.parse(params.item)
			this.getData(params.id)
			this.title = params.title
			this.time = params.createTime;
			this.pic = params.pic?params.pic : '../../static/images/swiper.png';
			this.strings = `<div style="text-align:left;">
					
					<div>
						${params.content}
					</div>
				</div>`
		},
		methods: {
			getData(id) {
				getHeadlineDetail({id: id}).then(res => {
					console.log(res)
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
