<template>
  <view class="vc-header">
    <van-nav-bar
      :title="title"
      left-arrow
      :border="false"
      @click-left="onClickLeft"
    />
  </view>
</template>

<script>
export default {
  props: {
    title: {
			type: String,
			default: "",
		}
	},
	data() {
		return {
		}
	},
	methods: {
		onClickLeft() {
			this.$emit('onClickLeft')
		}
	}
};
</script>

<style lang="scss" scoped>
.vc-header {
  /deep/ .van-nav-bar {
    background-color: #1676fe;
		
		.van-nav-bar__left {
			.van-nav-bar__arrow {
				color: #ffffff;
			}
		}
		
		.van-nav-bar__title {
			color: #ffffff;
		}
  }
}
</style>