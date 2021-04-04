<template>
	<view class="content">
		<image class="logo" src="../../static/logo.png"></image>
		<view  class="text">
			<view class="roleItem" v-for="(item,index) in roleList" :key="index" @click="selectRole(item.id)">
				<image class="roleIcon" :src="item.icon"></image>
				{{item.name}}
			</view>
		</view>
		
		

		<van-toast id="van-toast" />

	</view>
</template>

<script>
	import {getSetUserRole,getAccessToken} from "../../utils/api.js"
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	export default{
		components: {
	
		},
		data() {
			return {
			
				roleList:[
					{
						id:1,
						name:"我要招租",
						icon:"../../static/images/icon_role_1.png",
					},
					{
						id:2,
						name:"我要开店",
						icon:"../../static/images/icon_role_2.png",
					},
					{
						id:3,
						name:"我是代理",
						icon:"../../static/images/icon_role_3.png",
					}
				],
				url:"/pages/Index/index",
			}
		},
		
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		    
		},
		onShow(){
			
		},
		methods: {
			selectRole(id){
				var that = this;
				const paras = {
					roleType:id
				};
				paras.accessToken = that.accessToken;
				getSetUserRole(paras).then(res => {
					const data = res.data;
					
					console.log(data);
					if(data.code=="200"){
						uni.switchTab({
							 url: this.url,
						});
					}else{
						
					}
				})
				.catch(error => {
				
				});
				
				  
			},
				
				
		
			
		},
		components: {
		}
	}
</script>


<style  lang="scss" scoped>
	.content {
		margin: 0;
		padding: 0;
		background-color: #fff;
		text-align: center;
		height: 100%;
	}
	.logo{
		margin-top: 100rpx;
		width: 500rpx;
	}
	.text{
		width: 600rpx;
		margin:0 auto;
		
		.roleItem{
			height: 80rpx;
			line-height: 80rpx;
			position: relative;
			background: linear-gradient(326deg, #11B4F8 0%, #1476FD 100%);
			color: #FCFEFE;
			font-size: 30rpx;
			text-align: center;
			margin-top: 40rpx;
			border-radius: 40rpx;
		}
		
		.roleIcon{
			width: 50rpx;
			height: 50rpx;
			position: absolute;
			top:15rpx;
			left:60rpx;
		}
	}
	
	

	
	


	
</style>
