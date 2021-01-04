<template>
	<view class="v-setting">
		<van-cell-group>
		  <van-cell title="用户协议及隐私协议" @click="goUserAgreement" is-link size="large" />
		</van-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:"",
			}
		},
		onLoad() {
		
		},
		methods:{
			
			
			goUserAgreement(){
				uni.navigateTo({
					url: "./userAgreement"
				})
			},
			
			
			
			
			
			
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.v-setting {
		background-color: #F5F8FA;
		
		/deep/ .van-cell {
			background-color: #fff;
			color: #1576FE;
			.van-icon {
				color: #1576FE;
			}
		}
	}
</style>