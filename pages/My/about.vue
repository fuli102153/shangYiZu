<template>
	<view class="v-qa">
		<view  v-html="content"></view>
	</view>
</template>

<script>
	import {getContractList} from "../../utils/api.js"
	export default {
		data() {
			return {
				content:"",
			}
		},
		onLoad() {
			this.content = this.Configs.about_us;
			console.log(this.Configs.about_us)
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
