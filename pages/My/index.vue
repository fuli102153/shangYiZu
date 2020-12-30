<template>
	<view class="v-my">
		<view class="user-info">
			<view class="user-img">
				<open-data class="avatar" type="userAvatarUrl"></open-data>
			</view>
			<view class="user-name">
				<view class="user-text">
					<open-data class="name" type="userNickName"></open-data>
				</view>
				<view class="user-id">
					{{ mobile || "绑定手机号" }}
				</view>
			</view>
			<view v-if="0" class="user-edit">
				<i class="edit-icon"></i>
				<text>编辑</text>
			</view>
		</view>
		<view class="user-nav">
			<view class="title">租赁服务</view>
			<view class="content">
				<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="toPath(item)">
					<image :src="item.src" />
					<text>{{ item.name }}</text>
				</view>
			</view>
			<view class="cell-list">
				<view class="cell" @click="makePhoneCall(Configs.service_phone)">
					<text>联系客服</text>
					<van-icon name="arrow" color="#C8C8C8" />
				</view>
				<view class="cell" @click="goHelp">
					<text>问题反馈</text>
					<van-icon name="arrow" color="#C8C8C8" />
				</view>
				<view class="cell" @click="goSet">
					<text>用户协议</text>
					<van-icon name="arrow" color="#C8C8C8" />
				</view>
				<view class="cell" @click="goAbout">
					<text>关于商易租</text>
					<van-icon name="arrow" color="#C8C8C8" />
				</view>
			</view>
		</view>
		
		<!-- <van-cell-group>
		  <van-cell title="我的分享" is-link size="large" @click="goShare" icon="manager" title-class="fontSize: '28rpx'; color: '#2d2d2d'; margin-left='20rpx'"/>
		  <van-cell title="关于我们" is-link size="large" @click="goAbout" icon="award" />
		  <van-cell title="帮助及反馈" is-link size="large" @click="goHelp" icon="question" />
		  <van-cell title="设置" is-link size="large" @click="goSet" icon="setting" />
		  <van-cell title="分享商易租" is-link size="large" icon="share" />
		  <van-cell title="联系客服" is-link size="large" icon="service" @click="makePhoneCall(Configs.service_phone)" />
		</van-cell-group> -->
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				navList: [{
						name: '委托管理',
						src: '../../static/images/Entrusted.png',
						router: './entrust'
					},
					{
						name: '电子合同',
						src: '../../static/images/E-contract.png',
						router: './contract'
					},
					{
						name: '查看收藏',
						src: '../../static/images/Collection.png',
						router: './myCollection'
					},
					{
						name: '预约管理',
						src: '../../static/images/ppointment.png',
						router: './myAppointment'
					},
				],
				userInfo: {},
				mobile:"",
			}
		},
		onLoad() {
			uni.getStorage({
				key: "__userInfo__",
				success: (res) => {
					console.log('我的', res)
					this.userInfo = res.data.userInfo
				},
			})
			
			uni.getStorage({
				key: "__userDetail__",
				success: (res) => {
					this.mobile = res.data.mobile
				}
			})
		},
		methods:{
			toPath(item){
				if(item.name == "委托管理"){
					
				}else if(item.name == "电子合同"){
					//我的合同查询
				
				}else if(item.name == "我的收藏"){
					
				}else if(item.name == "我的预约"){
					//我的预约记录
					
				}
				uni.navigateTo({
					url: item.router
				})
			},
			
			goAbout(){
				uni.navigateTo({
					url: "./about"
				})
			},
			
			goHelp(){
				uni.navigateTo({
					url: "./help"
				})
			},
			
			goSet() {
				uni.navigateTo({
					url: "./setting"
				})
			},
			
			goShare(){
				uni.navigateTo({
					url: './myShare'
				})
			},
			
			makePhoneCall: function (tel) {
				uni.makePhoneCall({
					phoneNumber: tel,
					success: () => {
						console.log("成功拨打电话")
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.v-my {
	background-color: #EFF2F4;
		
	.user-info {
		background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 48rpx 32rpx 32rpx 45rpx;
		
		.user-img {
			width: 120rpx;
			height: 120rpx;
			background-color: #D3D9DD;
			border-radius: 50%;
			overflow: hidden;
			
			image {
				width: 100%;
				height: 100%;
			}
		}
		
		.user-name {
			flex: 1;
			padding-left: 36rpx;
			
			.user-text {
				font-size: 40rpx;
				color: #2D2D2D;
			}
			
			.user-id {
				font-size: 24rpx;
				color: #2D2D2D;
				margin-top: 15rpx;
			}
		}
		
		.user-edit {
			border-radius: 20rpx;
			background-color: #76A4E4;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 5rpx 18rpx;
			
			.edit-icon {
				width: 22rpx;
				height: 29rpx;
				background-image: url(../../static/images/edit.png);
				background-size: 100%;
			}
			
			text {
				color: #fff;
				font-size: 20rpx;
			}
		}
	}
	
	.user-nav {
		margin: 10rpx 0;
		padding: 10rpx 20rpx 46rpx 20rpx;
		background-color: #ffffff;

		.title {
			font-size: 32rpx;
			color: #302F2C;
			padding-top: 36rpx;
			padding-left: 35rpx;
		}

		.content {
			display: flex;
			justify-content: space-around;

			.nav-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 36rpx;

				image {
					width: 80rpx;
					height: 80rpx;
				}

				text {
					margin-top: 20rpx;
					font-size: 24rpx;
				}
			}
		}

		.cell-list {
			padding-top: 30rpx;

			.cell {
				display: flex;
				justify-content: space-between;
				padding: 15rpx 35rpx;
				
				text {
					font-size: 28rpx;
					color: #515151;
				}
			}
		}
	}
}
</style>
