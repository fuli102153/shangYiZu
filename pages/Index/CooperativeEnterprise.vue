<template>
	<view class="v-cooperative-enterprise">
		<view class="coop" v-for="(item, index) in 8" :key="index">
			<view class="logo">
				
			</view>
			<view class="name">
				企业名称
			</view>
		</view>
	</view>
</template>

<script>
	import {getSubscribeAdd} from "../../utils/api.js"
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	export default {
		data() {
			return {
				list: [],

			}
		},
		onLoad(paras) {
			console.log(paras)
			//如果有项目ID
			this.getList();
		},
		methods: {
			
			
			getList(){
				
				var that = this;
				
				const paras = {

					
				};
				paras.accessToken = that.accessToken;
				Toast.loading({
				  message: '加载中...',
				  forbidClick: true,
				  loadingType: 'spinner',
				});
				getSubscribeAdd(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						Toast.success('预约成功');
						setTimeout(()=>{
							uni.navigateBack({
							    delta: 1
							});
						},2000)
						
					
					}else{
						Toast.fail(data.message);
						
					}
					
				})
				.catch(error => {
				
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.v-cooperative-enterprise {
		background-color: #F5F8FA;
		padding: 45rpx 46rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.coop {
			width: 316rpx;
			height: 316rpx;
			background-color: #fff;
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-bottom: 28rpx;
			
			.logo {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
				background-color: #DAE9FF;
			}
			
			.name {
				font-size: 30rpx;
				color: #2d2d2d;
				margin-top: 15rpx
			}
		}
	}
</style>
