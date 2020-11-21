<template>
	<view class="uni-common-mt" style="background:#FFF; padding:20rpx;">
		<rich-text :nodes="strings"></rich-text>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
	           
	            strings: ``
	        }
	    },
		onLoad(paras) {
			
			//如果有项目ID
			if(paras.marketReport){
				this.strings = paras.marketReport || "暂无市场调研报告";
			}
		},
		
	}
</script>

<style>
</style>
