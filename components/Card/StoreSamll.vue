<template>
  <view class="vc-store-card" @click="toDetail(source.shopNo)">
	 
      <view class="store-img">
           <image :src="source.shopPhotos? source.shopPhotos.split(',')[0] : '../../static/logo.png'"></image> 
      </view>
      <view class="store-info">
        <view class="store-title">{{source.shopName || ""}}</view>
        <view class="store-size">
          <span  v-if="source.measureArea">面积：{{source.measureArea || ""}}m²</span>
          <span v-if="source.floorNum">楼层：{{source.floorNum || ""}}层</span>
        </view>
        <view class="store-payment">
          <view class="store-tag">
            <view class="tag" v-if="source.propertyName">物业类型：{{source.propertyName || ""}}</view>
            <view class="tag" v-if="source.businessName">业态：{{source.businessName || ""}}</view>
          </view>
          <view class="store-price">
            <span>{{source.monthRent || ""}}</span>
            <span class="company">元/月</span>
          </view>
		  
		  
        </view>
      </view>
  </view>
</template>

<script>
	
export default {
	name: 'store',
	props:{
		sourceData:{},
	},
	data() {
	 	return {
			source : {}
	 	}
	},
	mounted(){
	    var that = this;
	    this.$nextTick(function(){
			//that.sourceData
			that.source = {};
			that.Dict.property_type.forEach((item)=>{
				if(that.sourceData.propertyType == item.itemValue){
					that.sourceData.propertyName = item.itemText;
				}
			})
			//console.log(that.Dict.business_type)
			
			that.Dict.business_type.forEach((item)=>{
				if(that.sourceData.businessType == item.itemValue){
					that.sourceData.businessName = item.itemText;
				}
			})
			
			that.source = that.sourceData;
			
	    })
	  },
	methods: {
	 	toDetail(shopNo){
			//跳转到详情页面
			uni.navigateTo({
				url: "../Shops/shopDetails?shopNo="+shopNo
			})
		},
		
		
	 }
}
</script>

<style lang="scss" scoped>
.vc-store-card {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 32rpx 0 23rpx 0;
  border-bottom: 1rpx solid #D7D7D7;

  .store-img {
    width: 180rpx;
    height: 140rpx;
    border-radius: 15rpx;
    background: #999;
	
	image{
		width: 180rpx;
		height: 140rpx;
		border-radius: 15rpx;
	}
  }

  .store-info {
    flex: 1;
    box-sizing: border-box;
    color: #2D2D2D;
    padding-left: 30rpx;

    .store-title {
      font-size: 30rpx;
    }

    .store-size {
      font-size: 21rpx;
	  span{
	  		  margin-right:10rpx
	  }
    }

    .store-payment {
      display: flex;
      justify-content: space-between;
      
      .store-tag {
        .tag {
          border: 1rpx solid #1576fe;
          color: #1576fe;
          font-size: 18rpx;
          padding: 0rpx 11rpx;
          border-radius: 3rpx;
          margin-top: 11rpx;
					display: flex;
					align-items: center;
        }
      }

      .store-price {
        color: #F9980D;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;

        span {
          font-size: 38rpx;
        }

        .company {
          font-size: 28rpx;
        }
      }
    }
  }
}
</style>