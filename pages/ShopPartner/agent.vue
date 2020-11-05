<template>
	<view class="v-agent">
		<view class="from">
			<van-cell-group>
			  <van-field
			    :value="contactUsername"
			    required
			    clearable
			    label="联系人"
			    placeholder="请输入您的姓名"
				@input="changeContactUsername"
			  />
			  <van-field
			    :value="contactMobile"
			    label="联系电话"
			    placeholder="请输入您的手机号"
			    required
				@input="changeContactMobile"
			  />
				<van-field
				  :value="idNumber"
				  label="证件号码"
				  placeholder="请输入您的身份证号码"
				  required
				  @input="changeidNumber"
				/>
				<van-field
				  :value="city"
				  label="所在城市"
				  placeholder="请输入您所在的城市"
				  @input="changeCity"
				/>
				<van-field
				  :value="occupation"
				  label="从事事业"
				  placeholder="请输入您目前从事的职业"
				  @input="changeOccupation"
				/>
			</van-cell-group>
		</view>
		<view class="submit-btn">
			<view class="agreement">
				<van-checkbox :value="checked" @change="onChange" />
				<text>《XXX协议》</text>
			</view>
			<view class="tip">
				温馨提示：身份证号码需与本人一致，将影响您本人权益
			</view>
			<view class="btn" @click="submit">
				<van-button type="info" block>提交</van-button>
			</view>
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import {getAgentUserInfo,setAgentUserInfo} from "../../utils/api.js"
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	export default {
		data() {
			return {
				contactUsername: '',
				contactMobile: '',
				idNumber: '',
				city: '',
				occupation: '',
				checked: true,
			}
		},
		onLoad() {
			//请求品牌列表
			this.ajaxGetAgentUserInfo();
			
		},
		methods: {
			onChange(event) {
				this.checked = event.detail
			},
			
			changeContactUsername(e) {
				this.contactUsername = e.detail
			},
			
			changeContactMobile(e) {
				this.contactMobile = e.detail
			},
			
			changeidNumber(e) {
				this.idNumber = e.detail
			},
			
			changeCity(e) {
				this.city = e.detail
			},
			
			changeOccupation(e) {
				this.occupation = e.detail
			},
			
			ajaxGetAgentUserInfo(){
				var that = this;
				const paras = {
				};
				paras.accessToken = that.accessToken;
				
				getAgentUserInfo(paras).then(res => {
					const data = res.data;
					
					console.log(data);
					if(data.code=="200"){
						let obj  = data.data;
						that.contactUsername = obj.contactUsername;
						that.contactMobile = obj.contactMobile;
						that.idNumber = obj.idNumber;
						that.city = obj.city;
						that.occupation = obj.occupation;
					
					}else{
						
						
					}
					
				})
				.catch(error => {
				
				});
				
			},
			
			
			submit(){
				if(!this.contactUsername){
					Toast.fail("请输入联系人！");
					return;
				}
				if(!this.contactMobile){
					Toast.fail("请输入联系电话！");
					return;
				}
				if(!this.idNumber){
					Toast.fail("请输入联系人证件！");
					return;
				}
				
				var that = this;
				const paras = {
					contactUsername:this.contactUsername,
					contactMobile:this.contactMobile,
					idNumber:this.idNumber,
					city:this.city,
					occupation:this.occupation,
				};
				paras.accessToken = that.accessToken;
				const toast = Toast.loading({
				  message: '加载中...',
				  forbidClick: true,
				  loadingType: 'spinner',
				});
				setAgentUserInfo(paras).then(res => {
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
	.v-agent {
		
		.from {
			padding: 0 20rpx;
		}
		.submit-btn {
			padding: 0 46rpx;
			background-color: #f8f8f8;
		
			.agreement {
				padding-top: 20rpx;
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
