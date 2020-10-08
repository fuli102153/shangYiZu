<template>
  <view class="vc-store-card">
      <view class="store-img">
          <!-- <image src=""></image> -->
      </view>
      <view class="store-info">
        <view class="store-title">南山后海鹏润广场内铺</view>
        <view class="store-size">
          <span>面积：100 m²</span>
          <span>楼层：二层</span>
        </view>
        <view class="store-payment">
          <view class="store-tag">
            <view class="tag">物业类型：购物中心</view>
            <view class="tag">支付方式：押一付二</view>
          </view>
          <view class="store-price">
            <span>30000</span>
            <span class="company">元/月</span>
          </view>
        </view>
      </view>
  </view>
</template>

<script>
export default {

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
    }

    .store-payment {
      display: flex;
      justify-content: space-between;
      
      .store-tag {
        .tag {
          border: 1rpx solid #1576fe;
          color: #1576fe;
          font-size: 20rpx;
          padding: 0rpx 12rpx;
          border-radius: 3rpx;
          margin-top: 11rpx;
        }
      }

      .store-price {
        color: #F9980D;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;

        span {
          font-size: 42rpx;
        }

        .company {
          font-size: 30rpx;
        }
      }
    }
  }
}
</style>