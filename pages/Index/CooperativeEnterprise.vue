<template>
	<view class="v-cooperative-enterprise">
		<view class="coop" v-for="(item, index) in enterpriseList" :key="index">
			<image class="logo" :src="item.logo" />
			<view class="name">
				{{item.enterpriseName}}
			</view>
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import {getCooperativeList} from "../../utils/api.js"
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	export default {
		data() {
			return {
				enterpriseList: [],

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
				const toast =Toast.loading({
				  message: '加载中...',
				  forbidClick: true,
				  loadingType: 'spinner',
				});
				getCooperativeList(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						toast.clear();
						that.enterpriseList = data.data;
						
					
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
