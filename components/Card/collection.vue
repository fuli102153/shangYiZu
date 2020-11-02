<template>
  <view class="vc-collection-card" @click="toDetail(sourceData.shopNo)">
      <view class="store-img">
           <image :src="sourceData.shopPhotos? sourceData.shopPhotos.split(',')[0] : '../../static/logo.png'"></image> 
      </view>
      <view class="store-info">
        <view class="store-title">{{sourceData.shopName || ""}}</view>
        <view class="store-size">
          <span>面积：{{sourceData.measureArea || ""}}m²</span>
          <span>楼层：{{sourceData.floorNum || ""}}层</span>
        </view>
        <view class="store-payment">
          <view class="store-tag">
            <view class="tag">物业类型：{{sourceData.propertyType || ""}}</view>
          </view>
          <view class="store-price">
            <span>{{sourceData.monthRent || ""}}</span>
            <span class="company">元/月</span>
          </view>
        </view>
      </view>
			<i class="del-icon"></i>
  </view>
</template>

<script>
	
export default {
	name: 'collection',
	props:{
		sourceData:{},
	},
	data() {
	 	return {
			
	 	}
	},
	mounted(){
	    var that = this;
	    this.$nextTick(function(){
	     
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
.vc-collection-card {
	position: relative;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 32rpx 0 23rpx 0;
  border-bottom: 1rpx solid #D7D7D7;

  .store-img {
    width: 260rpx;
    height: 180rpx;
    border-radius: 15rpx;
    background: #999;
	
	image{
    width: 260rpx;
    height: 180rpx;
		border-radius: 15rpx;
	}
  }

  .store-info {
    flex: 1;
    box-sizing: border-box;
    color: #2D2D2D;
    padding-left: 30rpx;

    .store-title {
      font-size: 32rpx;
    }

    .store-size {
      font-size: 23rpx;
	  span{
		  margin-right:10rpx
	  }
    }

    .store-payment {
      
      .store-tag {
				display: flex;
				flex-wrap: wrap;
        .tag {
          border: 1rpx solid #1576fe;
          color: #1576fe;
          font-size: 20rpx;
          padding: 0rpx 12rpx;
          border-radius: 3rpx;
          margin-top: 11rpx;
			margin-right: 10rpx;
        }
      }

      .store-price {
        color: #FF4040;
				margin-top: 10rpx;

        span {
          font-size: 42rpx;
        }

        .company {
          font-size: 30rpx;
        }
      }
    }
  }
	.del-icon {
		background-image: url(../../static/images/del-icon.png);
		width: 26rpx;
		height: 27rpx;
		background-size: 100%;
		position: absolute;
		right: 20rpx;
		bottom: 30rpx;
	}
}
</style>