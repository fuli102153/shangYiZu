<template>
  <view class="vc-appointment-card" @click="toDetail(sourceData.shopNo)">
		<!-- 状态不同颜色 安排业务员：wait 看铺： success 已看：seen  出租：lease -->
		<view class="header" :class="type">
			<view class="state">
				当前状态：
			</view>
			<view class="state-content">
				{{ typeText }}
			</view>
		</view>
		<view class="content">
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
			      <view class="tag">业态：{{sourceData.businessType || ""}}</view>
			    </view>
			    <view class="store-price">
			      <span>{{sourceData.monthRent || ""}}</span>
			      <span class="company">元/月</span>
			    </view>
			  </view>
			</view>
		</view>
  </view>
</template>

<script>
	
export default {
	name: 'appointment',
	props:{
		sourceData:{
			type: Object,
			default: () => {}
		},
	},
	data() {
	 	return {
			type: '',
			typeText: ''
	 	}
	},
	created() {
		
		if (this.sourceData.status === '1') {
			this.type = 'wait';
			this.typeText = '正在为您安排业务员';
		} else if (this.sourceData.status === '2') {
			this.type = 'success';
			this.typeText = '看铺时间：08/20 12:30';
		} else if (this.sourceData.status === '3') {
			this.type = 'seen';
			this.typeText = '已看铺';
		} else if (this.sourceData.status === '4') {
			this.type = 'lease';
			this.typeText = '店铺已出租';
		}else{
			this.type = 'wait';
			this.typeText = '正在为您安排业务员';
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
.vc-appointment-card {
	margin-bottom: 51rpx;
  
	.content {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		padding: 32rpx 0 23rpx 25rpx;
		background: #FFFFFF;
		box-shadow: 0px 5rpx 5rpx 0px rgba(223, 223, 223, 0.26);
		border-radius: 30rpx;
	}
	
	.header {
		padding-left: 36rpx;
		box-sizing: border-box;
		color: #fff;
		font-size: 24rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		border-radius: 30rpx 30rpx 30rpx 0rpx;
		background-image: linear-gradient(to bottom right, #529AFF, #1676FE);
		
		.state {
			width: 200rpx;
		}
	}
	
	.wait {
		background-image: linear-gradient(to bottom right, #529AFF, #1676FE);
	}
	
	.success {
		background-image: linear-gradient(to bottom right, #5779F9, #1647FE);
	}
	
	.seen {
		background-image: linear-gradient(to bottom right, #FFB955, #F9980D);
	}
	
	.lease {
		background-image: linear-gradient(to bottom right, #CDCCCB, #CDCCCB);
	}

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
      font-size: 28rpx;
    }

    .store-size {
      font-size: 23rpx;
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
				margin-right: 64rpx;

        span {
          font-size: 32rpx;
        }

        .company {
          font-size: 24rpx;
        }
      }
    }
  }
}
</style>