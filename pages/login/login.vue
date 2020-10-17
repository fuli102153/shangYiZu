<template>
	<view class="content">
		<image class="logo" src="../../static/logo.png"></image>
		<view v-if="showLogin" class="text">登录中...</view>
		<view v-else>
			<button  class="btn_login" type="default"  @click="_getuserTest"  >体验一下</button>
			<button  class="btn_login" type="primary"  open-type="getUserInfo" @getuserinfo="_getuserinfo" withCredentials="true">登录</button>
		</view>
		

		
	</view>
</template>

<script>
	import { login } from "../../utils/api.js"
	console.log(login)
	export default{
		components: {
	
		},
		data() {
			return {
				showLogin: true,
				para:{},
				verifyCode:"",
				res:{},
				code:"",
				accessToken:"",
				openid:"",
			}
		},
		
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		    
			
			
		},
		onShow(){
			this._getuserinfo();
		},
		methods: {
			_getuserTest(){
				// wx登录
				//跳转到首页
				uni.switchTab({
					 url: '../Index/index'
				});
			},
			_getuserinfo: function(){
					var that = this;
					
					// wx登录
					wx.login({
					  success (res) {
					    if (res.code) {
							//发起网络请求
							var code = res.code;
						  
							console.log(res)
						  	// 获取微信用户信息
							wx.getUserInfo({
							  success: function(res) {
								var res = res;
								that.res = res;
								that.code = code;
								uni.setStorage({
									key: "__userInfo__",
									data: res,
									success: (res) => {
										//如果获取用户信息的电话号码失败，那么提示用户去绑定手机号
										
										
										that._requestLogin();
									
										
										
									},
									fail: () => {
										uni.showModal({
											title: '用户信息获取失败!',
											showCancel:false
										})
									}
								})
								
								
								
							  },
							  fail:res=>{
							      // 获取失败的去引导用户授权 
								that.showLogin = false; 
								
							   }
							})
							
					    } else {
							
					    }
					  }
					})
				},
				
				_requestLogin() {
					var that = this;
					//ajax⽤户登录
					console.log(that.res)
					const paras = {
						appid:"wx659fdf8f4e2445d0",
						code:that.code,
						signature:that.res.signature,
						rawData:that.res.rawData,
						encryptedData:that.res.encryptedData,
						iv:that.res.iv,
					};
					login(paras).then(response => {
						console.log(response);
						
					})
					.catch(error => {
					
					});
				},
				
				
				
				
				_requestverifyLogin() {
					var that = this;
					//ajax⽤户登录
					
					// wx登录
					wx.login({
					  success (res) {
					    if (res.code) {
							//发起网络请求
							var code = res.code;
						  
							console.log(code)
						  	// 获取微信用户信息
							
								
								
							
							
					    } else {
							
					    }
					  }
					})
					
					
					
				},
				
				
				getUserInfoByLogin(){
					//ajax个人信息查询
					var that = this;
					uni.request({
						url: that.host+"/eos/xcx/userInfo",
						method:"POST",
						data: {
							openid:that.openid,
							accessToken:that.accessToken,
						},
						header:{"content-type":"application/x-www-form-urlencoded"},
					}).then(res => {
						var data  = res[1].data
						console.log(data);
						uni.hideLoading();
						
						if(data.code=="200"){
							//存储用户信息
							uni.setStorage({
								key: "__userInfo__",
								data: data.result,
								success: (res) => {
									//如果获取用户信息的电话号码失败，那么提示用户去绑定手机号
									//跳转到首页
									uni.switchTab({
										 url: '../Index/index'
									});
									
								},
								fail: () => {
									uni.showModal({
										title: '用户信息获取失败!',
										showCancel:false
									})
								}
							})
							
							
						}else{
							//失败
							uni.showModal({
								content: data.message,
								showCancel: false
							});
							
						}
						
					}).catch(err => {
						uni.showModal({
							content: err.errMsg,
							showCancel: false
						});
									
						
					});
				},
				
				
				showPop() {
					this.$nextTick(() => {
						this.$refs['showtip'].open()
					})
				},
				sure(){
					this.$refs['showtip'].close()
					this._requestverifyLogin();
				},
				cancel(type) {
					this.$refs['showtip'].close()
				},
				
				
		
			
		},
		components: {
		}
	}
</script>


<style>
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
		color: #081333;
		margin-top: 0rpx;
		font-size: 30rpx;
		
	}
	.btn_login{
		display: inline-block;
		padding: 10rpx 30rpx;
		font-size: 30rpx;
		margin:0 20rpx;
	}
	
	
	/* 提示窗口 */
		.uni-tip {
			/* #ifndef APP-NVUE */
			display: flex;
			flex-direction: column;
			/* #endif */
			padding: 15px;
			width: 500rpx;
			background-color: #fff;
			border-radius: 10px;
		}
	
		.uni-tip-title {
			margin-bottom: 10px;
			text-align: center;
			font-weight: bold;
			font-size: 16px;
			color: #333;
		}
	
		.uni-tip-content {
			/* padding: 15px;
	*/
			font-size: 14px;
			color: #666;
		}
	
		.uni-tip-group-button {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			margin-top: 20px;
		}
	
		.uni-tip-button {
			flex: 1;
			text-align: center;
			font-size: 14px;
			color: #3b4144;
		}
		
		.uni-input{
			border: 1px solid #999;
			font-size: 36rpx;
			margin: 0 10%;
		}
	

	
	


	
</style>
