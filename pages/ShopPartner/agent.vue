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
				<van-icon name="passed" size="36rpx"/>
				<text>《XXX协议》</text>
			</view>
			<view class="tip">
				温馨提示：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
			</view>
			<view class="btn">
				<van-button type="info" block>块级元素</van-button>
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.v-agent {
		
		.from {
			padding: 0 20rpx;
		}
		.submit-btn {
			background-color: #f8f8f8;
			.agreement {
				display: flex;
				align-items: center;
				
				text {
					color: #007AFF;
				}
			}
		}
	}
</style>
