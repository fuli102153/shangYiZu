<template>
	<view class="uni-common-mt" style="background:#FFF; padding:20rpx;">
		<rich-text :nodes="strings"></rich-text>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
	            nodes: [{
	                name: 'div',
	                attrs: {
	                    class: 'div-class',
	                    style: 'line-height: 60px; color: red; text-align:center;'
	                },
	                children: [{
	                    type: 'text',
	                    text: 'Hello&nbsp;uni-app!'
	                }]
	            }],
	            strings: `<div style="text-align:center;">
													<text>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</text>
													<img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"/>
												</div>`
	        }
	    }
	}
</script>

<style>
</style>
