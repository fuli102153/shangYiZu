<template>
  <view class="vc-store-card" >
	 
      <view class="store-img">
           <image :src="sourceData.shopPhotos.split(',')[0] || '../../static/logo.png'"></image> 
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
            <view class="tag">支付方式：{{sourceData.payMode || ""}}</view>
          </view>
          <view class="store-price">
            <span>{{sourceData.monthRent || ""}}</span>
            <span class="company">元/月</span>
          </view>
		  
		  
        </view>
		<view>
					  <text @click="toDetail(sourceData.shopNo)">详情</text>  
					  <text @click="addSubscribe(sourceData.shopNo)">预约</text> 
					  <text @click="ajaxAddCollect(sourceData.shopNo)">收藏</text> 
					  <text @click="ajaxAddShare(sourceData.shopNo)">分享</text> 
		</view>
      </view>
  </view>
</template>

<script>
	import {getShopDetail,getSubscribeAdd,getCollectAdd,getShareAdd} from "../../utils/api.js"
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
	 	toDetail(shopNo){
			//跳转到查询页面 
			//ajax个人信息查询
			var that = this;
			const paras = {
				shopNo:shopNo
			};
			paras.accessToken = that.accessToken;
			
			getShopDetail(paras).then(res => {
				const data = res.data;
				console.log(data);
				
				if(data.code=="200"){
					
				
				}else{
					
					
				}
				
			})
			.catch(error => {
			
			});
		},
		
		addSubscribe(shopNo){
			
			var that = this;
			const paras = {
				shopNo:shopNo,
				appUid:this.userDetail.id,
				type:1,
				subscribeTimeStart:"2020-10-29 08:08:08",
				subscribeTimeEnd:"2020-10-29 18:08:08",
				
			};
			paras.accessToken = that.accessToken;
			
			getSubscribeAdd(paras).then(res => {
				const data = res.data;
				console.log(data);
				
				if(data.code=="200"){
					
				
				}else{
					
					
				}
				
			})
			.catch(error => {
			
			});
		},
		
		
		ajaxAddCollect(shopNo){
			
			var that = this;
			const paras = {
				shopName:shopNo,
				appUid:this.userDetail.id,
				type:1,
				
			};
			paras.accessToken = that.accessToken;
			
			getCollectAdd(paras).then(res => {
				const data = res.data;
				console.log(data);
				
				if(data.code=="200"){
					
				
				}else{
					
					
				}
				
			})
			.catch(error => {
			
			});
		},
		
		
		ajaxAddShare(shopNo){
			
			var that = this;
			const paras = {
				shopName:shopNo,
				appUid:this.userDetail.id,
				type:1,
				
			};
			paras.accessToken = that.accessToken;
			
			getShareAdd(paras).then(res => {
				const data = res.data;
				console.log(data);
				
				if(data.code=="200"){
					
				
				}else{
					
					
				}
				
			})
			.catch(error => {
			
			});
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