<template>
  <view class="vc-brand-card" @click="goBrandDetails(sourceData.id)">
      <view class="store-img">
           <image :src="sourceData.brandLogo ? sourceData.brandLogo.split(',')[0] : '../../static/logo.png'"></image> 
      </view>
      <view class="store-info">
        <!-- <view class="store-title">{{sourceData.shopName || ""}}</view> -->
				<view class="store-title">
					<view class="text">
						{{sourceData.brandName}}
					</view>
					
				</view>
		<view class="store-size num">
		  <span>品牌编号：{{sourceData.brandNo}}</span>
		</view>
        <view class="store-size">
          <span>需求面积：{{sourceData.measureArea}}</span>
        </view>
        <view class="store-payment">
          <view class="store-tag">
            <view class="tag">物业类型：{{sourceData.propertyType}}</view>
            <view class="tag">拓展区域：{{sourceData.region}}</view>
          </view>
        </view>
      </view>
  </view>
</template>

<script>
	import {getBrandDetail} from "../../utils/api.js"
export default {
	name: 'store',
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
		goBrandDetails(brandNo) {
			uni.navigateTo({
				url: './BrandDetails?brandNo='+brandNo
			})
		},
	 	
	 }
}
</script>

<style lang="scss" scoped>
.vc-brand-card {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 34rpx 30rpx;
	background-color: #fff;
	border-radius: 30rpx;
	margin-bottom: 30rpx;

  .store-img {
    width: 232rpx;
    height: 172rpx;
    border-radius: 15rpx;
    background: #999;
	
		image{
			width: 100%;
			height: 100%;
			border-radius: 15rpx;
		}
  }

  .store-info {
    flex: 1;
    box-sizing: border-box;
    color: #2D2D2D;
    padding-left: 44rpx;

    .store-title {
			display: flex;
			justify-content: space-between;
			.text {
				font-size: 32rpx;
			}
			
    }

    .store-size {
      font-size: 23rpx;
    }
	
	.num {
		font-size: 20rpx;
		color: #BDBDBD;
	}

    .store-payment {
      display: flex;
      justify-content: space-between;
      
      .store-tag {
        .tag {
          color: #1576fe;
          font-size: 24rpx;
          margin-top: 11rpx;
        }
      }
    }
  }
}
</style>