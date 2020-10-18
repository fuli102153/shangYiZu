<template>
	<view class="v-company">
		<view class="from">
			<van-cell-group>
				<van-field :value="city" label="所在城市" placeholder="请输入公司所在的城市" />
				<van-field :value="corporateName" required clearable label="公司名称" placeholder="请输入公司名称" />
				<van-field :value="personInCharge" label="负责人" placeholder="请输入负责人姓名" required />
				<van-field :value="phone" label="联系电话" placeholder="请输入负责人手机号码" required />
				<van-field :value="unifiedCode" label="信用统一代码" placeholder="请输入统一社会信用代码" />
			</van-cell-group>
		</view>
		<view class="submit-btn">
			<view class="updata">
				<text>营业执照</text>
				<van-uploader :file-list="fileList" bind:after-read="afterRead" />
			</view>
			<view class="agreement">
				<van-icon name="passed" size="36rpx" />
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
				city: '',
				corporateName: '',
				personInCharge: '',
				phone: '',
				unifiedCode: '',

				fileList: [],
			}
		},
		methods: {
			afterRead(event) {
				const {
					file
				} = event.detail;
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				wx.uploadFile({
					url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
					filePath: file.path,
					name: 'file',
					formData: {
						user: 'test'
					},
					success(res) {
						// 上传完成需要更新 fileList
						const {
							fileList = []
						} = this.data;
						fileList.push({ ...file,
							url: res.data
						});
						this.fileList = fileList;
					},
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.v-company {

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
