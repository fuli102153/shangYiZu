<template>
	<view class="content">
		<image class="logo" src="../../static/logo.png"></image>
		<view v-if="showLogin" class="text">登录中...</view>
		<view v-else>
			<button  class="btn_login" type="default"  @click="_getuserTest"  >体验一下</button>
			
			<button  class="btn_login" type="primary"  open-type="getUserInfo" @getuserinfo="_getuserinfo" withCredentials="true">登录</button>
		</view>
		

		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" title="请绑定手机号"
		  :show="showDialog"
		  show-cancel-button
		  confirm-button-open-type="getPhoneNumber"
			@cancel = "_requestLogin"
		  @getphonenumber="getPhoneNumber"/>
	</view>
</template>

<script>
	import {login,userInfo,getAccessToken} from "../../utils/api.js"
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	export default{
		components: {
	
		},
		data() {
			return {
				showDialog:false,
				showLogin:true,
				para:{},
				verifyCode:"",
				code:"",
				accessToken:"",
				openid:"",
			}
		},
		
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		    
			
		},
		onShow(){
			this._getuserinfo();
			//this._getuserTest();
		},
		methods: {
			_getuserTest(){
				// wx登录
				//跳转到首页
				uni.switchTab({
					 url: '../Index/index'
				});
			},
			getPhoneNumber(val){
				//用户接受
				var that = this;
				console.log(val);
				if(val.detail.errMsg=="getPhoneNumber:ok"){
					that.userInfo.encryptedData = val.detail.encryptedData;
					that.userInfo.iv = val.detail.iv;
					that._requestLogin();
				}else{
					console.log('用户点击了拒绝') ;  
				}
			},
			_getuserinfo: function(){
					var that = this;
					
					// wx登录
					wx.login({
					  success (res) {
					    if (res.code) {
							//发起网络请求
							that.code = res.code;
						  	// 获取微信用户信息
							console.log(that.code)
							wx.getUserInfo({
							  success: function(res) {
								
								that.userInfo = res;
								
								uni.setStorage({
									key: "__userInfo__",
									data: res,
									success: (res) => {
										//如果获取用户信息的电话号码失败，那么提示用户去绑定手机号
										
										//that.showDialog = true;
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
				
				_requestLogin(n) {
					this.showDialog = false;
					console.log("ajax⽤户登录"+n)
					var that = this;
					//ajax⽤户登录
					const paras = {
						appid:"wx659fdf8f4e2445d0",
						code:that.code,
						signature:that.userInfo.signature,
						rawData:that.userInfo.rawData,
						encryptedData:that.userInfo.encryptedData,
						iv:that.userInfo.iv,
					};
					const toast = Toast.loading({
					  message: '登录中...',
					  forbidClick: true,
					  loadingType: 'spinner',
					});
					login(paras).then(res => {
						const data = res.data;
						getAccessToken();
						
						if(data.code=="200"){
							toast.clear();
							that.accessToken = data.data.accessToken;
						
							uni.setStorage({
								key: "__accessToken__",
								data: data.data.accessToken,
								success: (res) => {
									that.getUserInfoByLogin();
								},
								fail: () => {
									Toast.fail("用户信息获取失败!");
								}
							})
							
							
						}else{
							
							Toast.fail(data.message);
							
						}
						
					})
					.catch(error => {
						Toast.fail(this.global.error);
					});
				},
				
				
				
				
				
				getUserInfoByLogin(){
					//ajax个人信息查询
					var that = this;
					const paras = {};
					paras.accessToken = this.accessToken;
					const toast = Toast.loading({
					  message: '获取信息中...',
					  forbidClick: true,
					  loadingType: 'spinner',
					});
					userInfo(paras).then(res => {
						const data = res.data;
						
						
						if(data.code=="200"){
							toast.clear();
							uni.setStorage({
								key: "__userDetail__",
								data: data.data,
								success: (res) => {
									
									uni.switchTab({
										 url: '../Index/index'
									});
								},
								fail: () => {
									
									Toast.fail('用户信息获取失败!');
								}
							})
							
						
						}else{
							Toast.fail(data.message);
							
						}
						
					})
					.catch(error => {
						Toast.fail(this.global.error);
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
