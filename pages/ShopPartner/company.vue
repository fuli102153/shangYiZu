<template>
	<view class="v-company">
		<view class="from">
			<van-cell-group>
			  <van-field
			    :value="companyName"
			    required
			    clearable
			    label="公司名称"
			    placeholder="请输入公司名称"
				@input="changeCompanyName"
			  />
			  <van-field
			    :value="companyHead"
			    label="负责人"
			    placeholder="请输入负责人"
			    @input="changeCompanyHead"
			  />
			  <van-field
			    :value="moblie"
			    label="联系电话"
			    placeholder="请输入您的手机号"
			  
				@input="changeMoblie"
			  />
			  <van-field
			    :value="city"
			    label="所在城市"
			    placeholder="请输入您所在的城市"
			    @input="changeCity"
			  />
				<van-field
				  :value="creditCode"
				  label="统一新用代码"
				  placeholder="请输入统一新用代码"
				  required
				  @input="changeCreditCode"
				/>
				
				
			</van-cell-group>
		</view>
		<view class="submit-btn">
			<view class="updata">
				<text>营业执照</text>
				<van-uploader :file-list="fileList" max-count="1" @before-read="beforeRead" @after-read="afterRead" />
			</view>
			<view class="agreement">
				<van-checkbox :value="checked" @change="onChange" />
				<text>《XXX协议》</text>
			</view>
			<view class="tip">
				温馨提示：公司名称需与营业执照一致，将影响公司权益
			</view>
			<view class="btn" @click="submit">
				<van-button type="info" block>提交</van-button>
			</view>
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import {getCompanyUserInfo,setCompanyUserInfo} from "../../utils/api.js"
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	export default {
		data() {
			return {
				// 表单数据
				companyName: '',
				moblie: '',
				creditCode: '',
				city: '',
				companyHead: '',
				licensePhotos:'',

				// 上传文件
				fileList: [],
				// 选中协议
				checked: true,
			}
		},
		onLoad() {
			//请求品牌列表
			this.ajaxGetCompanyUserInfo();
			
		},
		methods: {
			// 
			onChange(event) {
				this.checked = event.detail
			},
			beforeRead(event){
				console.log("beforeRead")
				Toast.loading({
				  message: '上传中...',
				  forbidClick: true,
				  loadingType: 'spinner',
				});
			},
			afterRead(event) {
				const {
					file
				} = event.detail;
				var that = this;
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				wx.uploadFile({
					url: this.HOST+'api/upload', 
					filePath: file.path,
					header:{
						'Authorization': this.accessToken,
					},
					name: 'file',
					formData: {
						user: 'test'
					},
					success(res) {
						
					
						let data = JSON.parse(res.data);
						console.log(data)
						if(data.code=="200"){
							Toast.success("上传成功");
						
							that.fileList = [{
								url:data.data,
								name:""
							}];
							
							that.licensePhotos = data.data;
							
						}else{
							Toast.fail(data.message);
							
						}
						
					
					},
				});
			},
			
			changeCompanyName(e) {
				this.companyName = e.detail
			},
			
			changeMoblie(e) {
				this.moblie = e.detail
			},
			
			changeCreditCode(e) {
				this.creditCode = e.detail
			},
			
			changeCity(e) {
				this.city = e.detail
			},
			
			changeCompanyHead(e) {
				this.companyHead = e.detail
			},
			
			ajaxGetCompanyUserInfo(){
				var that = this;
				const paras = {
				};
				paras.accessToken = that.accessToken;
				
				getCompanyUserInfo(paras).then(res => {
					const data = res.data;
					
					console.log(data);
					if(data.code=="200"){
						let obj  = data.data;
						that.companyName = obj.companyName;
						that.moblie = obj.moblie;
						that.creditCode = obj.creditCode;
						that.city = obj.city;
						that.companyHead = obj.companyHead;
						that.licensePhotos = obj.licensePhotos;
						
						that.fileList = [{
							url:obj.licensePhotos,
							name:""
						}];
					
					}else{
						
						
					}
					
				})
				.catch(error => {
				
				});
				
			},
			
			
			submit(){
				if(!this.companyName){
					Toast.fail("请输入公司名称！");
					return;
				}
			
				if(!this.creditCode){
					Toast.fail("请输入统一信用代码！");
					return;
				}
				
				if(!this.licensePhotos){
					Toast.fail("请上传营业执照！");
					return;
				}
				
				
				
				var that = this;
				const paras = {
					companyName:this.companyName,
					moblie:this.moblie,
					creditCode:this.creditCode,
					city:this.city,
					companyHead:this.companyHead,
					licensePhotos:this.licensePhotos,
				};
				paras.accessToken = that.accessToken;
				const toast = Toast.loading({
				  message: '加载中...',
				  forbidClick: true,
				  loadingType: 'spinner',
				});
				setCompanyUserInfo(paras).then(res => {
					const data = res.data;
					
					console.log(data);
					if(data.code=="200"){
						Toast.success(data.message);
						//that.cityList = data.data;
					
					}else{
						Toast.fail(data.message);
						
					}
					
				})
				.catch(error => {
					Toast.fail(error.message);
				});
				
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.v-company {

		.from {
			padding: 0 24rpx;
		}

		.submit-btn {
			padding: 0 46rpx;
			background-color: #f8f8f8;

			.updata {
				display: flex;
				flex-direction: column;

				text {
					font-size: 28rpx;
					color: #2D2D2D;
					margin: 20rpx 0 26rpx;
				}

				/deep/ .van-uploader__upload {
					border: 1rpx solid #CACDD0;
				}
			}

			.agreement {
				margin-top: 20rpx;
				display: flex;
				align-items: center;

				text {
					font-size: 28rpx;
					color: #1676FE;
				}
			}

			.tip {
				font-size: 21rpx;
				color: #2d2d2d;
				margin-top: 30rpx;
			}

			.btn {
				padding: 0 18rpx;
				margin-top: 125rpx;
			}
		}
	}
</style>
