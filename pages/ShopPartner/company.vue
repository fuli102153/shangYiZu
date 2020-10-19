<template>
	<view class="v-company">
		<view class="from">
			<van-cell-group>
				<van-field :value="city" label="所在城市" placeholder="请输入公司所在的城市" />
				<van-field :value="corporateName" required clearable label="公司名称" placeholder="请输入公司名称" />
				<van-field :value="personInCharge" label="负责人" placeholder="请输入负责人姓名" required />
				<van-field :value="phone" label="联系电话" placeholder="请输入负责人手机号码" required />
				<van-field :value="unifiedCode" label="信用统一代码" placeholder="请输入统一社会信用代码" required />
			</van-cell-group>
		</view>
		<view class="submit-btn">
			<view class="updata">
				<text>营业执照</text>
				<van-uploader :file-list="fileList" @after-read="afterRead" />
			</view>
			<view class="agreement">
				<van-checkbox :value="checked" @change="onChange" />
				<text>《XXX协议》</text>
			</view>
			<view class="tip">
				温馨提示：公司名称需与营业执照一致，将影响公司权益
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
				// 表单数据
				city: '',
				corporateName: '',
				personInCharge: '',
				phone: '',
				unifiedCode: '',

				// 上传文件
				fileList: [],
				// 选中协议
				checked: true,
			}
		},
		methods: {
			// 
			onChange(event) {
				this.checked = event.detail
			},
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
