<template>
	<view class="v-qa">
		<view  v-html="content"></view>
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
			this.content = this.Configs.copyright_agreement;
		},
		methods:{
			
			
			
			
			
			
			
			
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.v-qa {
		padding: 40rpx 25rpx;
		
	}
</style>
