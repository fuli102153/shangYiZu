<template>
	<view class="v-storeInfo">
		<van-field
		  :value="property.transferFee"
		  clearable
		  label="转让费"
		  placeholder="您店铺的转让费"
			use-button-slot
			@input="changTransferFee" >
			<text slot="button">元</text>
		</van-field>
		<van-field
		  :value="property.payMode"
		  clearable
		  label="支付方式"
		  placeholder="您店铺租金的支付方式如“押二付一"
			@input="changPayMode"
		/>
		<van-field
		  :value="property.rentIncrease"
		  clearable
		  label="租金递增"
		  placeholder="您店铺租金的递增方式"
			@input="changRentIncrease"
		/>
		<van-field
		  :value="property.waterRate"
		  clearable
		  label="水费"
		  placeholder="您店铺的用水费用"
			use-button-slot
			@input="changWaterRate" >
			<text slot="button">元/m³</text>
		</van-field>
		<van-field
		  :value="property.powerRate"
		  clearable
		  label="电费"
		  placeholder="您店铺的用电费用"
			use-button-slot
			@input="changPowerRate" >
			<text slot="button">元/度</text>
		</van-field>
		<van-field
		  :value="property.floorNu"
		  clearable
		  label="楼层"
		  placeholder="您店铺的位置楼层"
			use-button-slot
			@input="changFloorNu" >
			<text slot="button">层</text>
		</van-field>
		<van-field
		  :value="property.floorHeight"
		  clearable
		  label="层高"
		  placeholder="您店铺的位置楼层"
			use-button-slot
			@input="changFloorHeight" >
			<text slot="button">m</text>
		</van-field>
		<van-field
		  :value="property.bayWidth"
		  clearable
		  label="开间"
		  placeholder="您店铺的层高"
			use-button-slot
			@input="changBayWidth" >
			<text slot="button">m</text>
		</van-field>
		<van-field
		  :value="property.depthLength"
		  clearable
		  label="进深"
		  placeholder="您店铺的开间宽度"
			use-button-slot
			@input="changDepthLength" >
			<text slot="button">m</text>
		</van-field>
		<van-field
		  :value="property.location"
		  clearable
		  label="位置"
		  placeholder="您店铺的位置优势，如转角"
			@input="changLocation"
		/>
		<view class="btn">
		  <van-button type="info" block @click="subimt">确认</van-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				property: {
					transferFee: '',
					payMode: '',
					rentIncrease: '',
					waterRate: '',
					powerRate: '',
					floorNu: '',
					floorHeight: '',
					bayWidth: '',
					depthLength: '',
					location: '',
				}
			}
		},
		methods: {
			subimt() {
				this.$emit('subimtStoreInfo', this.property)
			},
			
			changShopName(e) {
				this.property.shopName = e.detail.trim();
			},
			changTransferFee(e) {
				this.property.transferFee = e.detail.trim();
			},
			changPayMode(e) {
				this.property.payMode = e.detail.trim();
			},
			changRentIncrease(e) {
				this.property.rentIncrease = e.detail.trim();
			},
			changWaterRate(e) {
				this.property.waterRate = e.detail.trim();
			},
			changPowerRate(e) {
				this.property.powerRate = e.detail.trim();
			},
			changFloorNu(e) {
				this.property.floorNu = e.detail.trim();
			},
			changFloorHeight(e) {
				this.property.floorHeight = e.detail.trim();
			},
			changBayWidth(e) {
				this.property.bayWidth = e.detail.trim();
			},
			changDepthLength(e) {
				this.property.depthLength = e.detail.trim();
			},
			changLocation(e) {
				this.property.location = e.detail.trim();
			},
		}
	}
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
