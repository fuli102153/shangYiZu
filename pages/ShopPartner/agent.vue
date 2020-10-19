<template>
	<view class="v-agent">
		<view class="from">
			<van-cell-group>
			  <van-field
			    :value="contacts"
			    required
			    clearable
			    label="联系人"
			    placeholder="请输入您的姓名"
			  />
			  <van-field
			    :value="phone"
			    label="联系电话"
			    placeholder="请输入您的手机号"
					error-message="手机号格式错误"
			    required
			  />
				<van-field
				  :value="idNumber"
				  label="证件号码"
				  placeholder="请输入您的身份证号码"
				  required
				/>
				<van-field
				  :value="city"
				  label="所在城市"
				  placeholder="请输入您所在的城市"
				/>
				<van-field
				  :value="cause"
				  label="从事事业"
				  placeholder="请输入您目前从事的职业"
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
			<view class="btn">
				<van-button type="info" block>提交</van-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				contacts: '',
				phone: '',
				idNumber: '',
				city: '',
				cause: '',
				
				checked: true,
			}
		},
		methods: {
			onChange(event) {
				this.checked = event.detail
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
