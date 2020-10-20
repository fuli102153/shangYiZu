<template>
	<view class="v-storeInfo">
		<van-field
		  :value="contacts"
		  required
		  clearable
		  label="商铺名称"
		  placeholder="给您的店铺取个亮眼的名称吧"
		/>
		<van-field
		  :value="rent"
		  required
		  clearable
		  label="转让费"
		  placeholder="请输入您店铺的转让费"
			use-button-slot >
			<text slot="button">元</text>
		</van-field>
		<van-field
		  :value="contacts"
		  required
		  clearable
		  label="支付方式"
		  placeholder="请输入您店铺租金的支付方式如“押二付一”"
		/>
		<van-field
		  :value="contacts"
		  required
		  clearable
		  label="租金递增"
		  placeholder="请输入您店铺租金的递增方式"
		/>
		<van-field
		  :value="rent"
		  required
		  clearable
		  label="水费"
		  placeholder="请输入您店铺的用水费用"
			use-button-slot >
			<text slot="button">元/m³</text>
		</van-field>
		<van-field
		  :value="rent"
		  required
		  clearable
		  label="电费"
		  placeholder="请输入您店铺的用电费用"
			use-button-slot >
			<text slot="button">元/度</text>
		</van-field>
		<van-field
		  :value="rent"
		  required
		  clearable
		  label="楼层"
		  placeholder="请输入您店铺的位置楼层"
			use-button-slot >
			<text slot="button">层</text>
		</van-field>
		<van-field
		  :value="rent"
		  required
		  clearable
		  label="层高"
		  placeholder="请输入您店铺的位置楼层"
			use-button-slot >
			<text slot="button">m</text>
		</van-field>
		<van-field
		  :value="rent"
		  required
		  clearable
		  label="开间"
		  placeholder="请输入您店铺的层高"
			use-button-slot >
			<text slot="button">m</text>
		</van-field>
		<van-field
		  :value="rent"
		  required
		  clearable
		  label="进深"
		  placeholder="请输入您店铺的开间宽度"
			use-button-slot >
			<text slot="button">m</text>
		</van-field>
		<van-field
		  :value="contacts"
		  required
		  clearable
		  label="位置"
		  placeholder="请输入您店铺的位置优势，如转角"
		/>
		<view class="btn">
		  <van-button type="info" block>提交</van-button>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.v-storeInfo {
		padding: 0 20rpx;
		
		.btn {
		  padding: 0 18rpx;
		  margin-top: 125rpx;
		  margin-bottom: 250rpx;
		}
	}
</style>
