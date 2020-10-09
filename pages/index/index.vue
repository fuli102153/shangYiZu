<template>
  <view class="v-index">
    <view class="header">
      <view class="location" @click="showPopup">
        <van-icon
          name="location"
          class="location-icon"
          color="#fff"
          size="30rpx"
        />
        <text>深圳</text>
        <van-icon name="play" class="arrow" color="#fff" size="17rpx" />
      </view>
      <view class="search">
        <i class="search-icon" />
        <text class="search-text">搜索城市或店铺</text>
      </view>
      <view class="shop-partner">
        <text>商铺合伙人</text>
        <van-icon name="play-circle" size="26rpx" color="#ffffff"/>
      </view>
    </view>
    <van-popup
      v-model="locationShow"
      position="top"
      :style="{ borderRadius: '0 0 10rpx 10rpx' }"
    >
      <van-cell-group>
        <van-cell title="选择城市" value="" size="large" />
      </van-cell-group>
      <van-cell-group class="city">
        <van-cell center title="当前定位">
          <template #default>
            <van-button round plain hairline type="info" size="mini">手动定位</van-button>
          </template>
          <template #label>
            <van-icon
              name="location"
              class="location-icon"
              color="#1676fe"
              size="30rpx"
            />
            <span>深圳</span>
          </template>
        </van-cell>
        <van-cell
          v-for="(item, index) in cityList"
          :key="index"
          center
          :label="item"
          :title="index === 0 ? '已开通城市' : ''"
          :class="activeCity === index ? 'active' : ''"
          @click="selectCity(index, item)"
        >
          <template #right-icon>
            <van-icon
              v-if="activeCity === index"
              name="success"
              color="#1676FE"
            />
          </template>
        </van-cell>
        <van-cell center title="" label="···" />
      </van-cell-group>
    </van-popup>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <!-- 头条 -->
    <view class="toutiao">
      <view class="toutiao-icon">
        <view class="toutiao-text">
          <p>商易租</p>
          <span>头条</span>
        </view>
      </view>
      <view class="toutiao-link">
        <span>商易租正式上线！现招募合伙人加入！</span>
        <van-icon name="play" color="#002464" size="26rpx" />
      </view>
    </view>
    <!-- 导航 -->
    <view class="nav">
      <view class="nav-item" v-for="(item, index) in navList"  :key="index" @click="toPath()">
        <image :src="item.src" />
        <text>{{ item.name }}</text>
      </view>
    </view>
    <!-- 推荐 -->
    <view class="recommend">
      <view class="recommend-title">本周重点推荐</view>
      <van-swipe :loop="false" :width="165" :show-indicators="false">
        <van-swipe-item>
          <!-- <image src=""></image> -->
          <view class="image">
            <view class="text">示意文字售楼</view>
          </view>
        </van-swipe-item>
        <van-swipe-item>
          <!-- <image src=""></image> -->
          <view class="image">
            <view class="text">示意文字售楼</view>
          </view>
        </van-swipe-item>
        <van-swipe-item>
          <!-- <image src=""></image> -->
          <view class="image">
            <view class="text">示意文字售楼</view>
          </view>
        </van-swipe-item>
        <van-swipe-item>
          <!-- <image src=""></image> -->
          <view class="image">
            <view class="text">示意文字售楼</view>
          </view>
        </van-swipe-item>
      </van-swipe>
    </view>
    <!-- 合作企业 -->
    <view class="coop">
      <view class="coop-content">
          <view class="coop-header">
            <view class="coop-title">合作企业</view>
            <view class="coop-more">更多 ></view>
          </view>
          <view class="coop-list">
            <view class="coop-item" v-for="item in 4" :key="item">
              <view class="image"></view>
              <!-- <image :src="item.src" /> -->
              <text>企业名称</text>
            </view>
          </view>
      </view>
    </view>
    <!-- 猜你喜欢 -->
    <view class="store">
      <view class="store-header">猜你喜欢</view>
      <view class="store-list">
        <StoreCard v-for="item in 8" :key="item"/>
      </view>
    </view>
    <!-- 获取定位城市 -->
    <baidu-map @ready="handler" />
  </view>
</template>

<script>
import StoreCard from '../../components/Card/Store'
export default {
  components: {
    StoreCard,
  },
  data() {
    return {
      locationShow: false,
      cityList: ["北京", "上海", "广州", "深圳"],
      activeCity: null,
      navList: [
        {name: '地图找铺', src: '../../static/images/Map.png', router: ''},
        {name: '招租发布', src: '../../static/images/Hire.png', router: ''},
        {name: '开店发布', src: '../../static/images/OpenShop.png', router: ''},
        {name: '购物中心', src: '../../static/images/Shopping.png', router: ''},
        {name: '社区底商', src: '../../static/images/Community.png', router: ''},
        {name: '整租物业', src: '../../static/images/WholeRent.png', router: ''},
        {name: '商业街区', src: '../../static/images/CommercialStreet.png', router: ''},
        {name: '综合配套', src: '../../static/images/ComprehensiveMatching.png', router: ''},
        {name: '专业市场', src: '../../static/images/ProfessionalMarket.png', router: ''},
        {name: '娱乐教育', src: '../../static/images/EntertainmentEducation.png', router: ''},
      ]
    };
  },
  onLoad() {},
  methods: {
    showPopup() {
      this.locationShow = true;
    },

    // 选中城市
    selectCity(index) {
      this.activeCity = index;
    },
    toPath() {
      console.log(11111)
      uni.navigateTo({
			  url:"../Map/index"
		  })
    },
    // 查询所在城市
    handler ({BMap, map}) {
      const geolocation = new BMap.Geolocation();
      this.$toast.loading({
        message: '正在定位...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      geolocation.getCurrentPosition(function getinfo(position){
          let city = position.address.city;             //获取城市信息
          let province = position.address.province;    //获取省份信息
          this.LocationCity = city;
          console.log(city)
      }, function(e) {
          this.LocationCity = '定位失败, 请点击重试';
          console.log('定位失败, 请点击重试')
      }, {provider: 'baidu'});
    },
  },
};
</script>

<style lang="scss" scoped>
.v-index {
  width: 100%;
  background-color: #F5F8FA;

  .header {
    padding: 25rpx 24rpx;
    background: #1676fe;
    display: flex;

    .location {
      font-size: 32rpx;
      color: #ffffff;
      display: flex;
      align-items: center;

      .location-icon {
        margin-right: 8rpx;
      }

      .arrow {
        transform: rotate(90deg);
        margin-left: 8rpx;
      }
    }

    .search {
      background: #fff;
      border-radius: 12rpx;
      position: relative;
      padding: 12rpx 60rpx;
      margin-left: 28rpx;

      .search-icon {
        position: absolute;
        width: 28rpx;
        height: 28rpx;
        left: 18rpx;
        top: 50%;
        margin-top: -14rpx;
        background-image: url("../../static/images/search.png");
        background-size: 100%;
      }

      .search-text {
        color: #888888;
        font-size: 28rpx;
        line-height: 28rpx;
      }
    }

    .shop-partner {
      flex: 1;
      color: #fff;
      font-size: 32rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 28rpx;
    }
  }

  .van-popup {
    background-color: #f5f8fa;

    .city {
      margin-top: 10rpx;

      .van-cell__title {
        > span {
          font-size: 24rpx;
          color: #a5a5a5;
        }

        .van-cell__label {
          display: flex;
          align-items: center;
          font-size: 32rpx;
          color: #2e2e2e;
        }
      }

      .active {
        .van-cell__label {
          color: #1676fe;
        }
      }
    }
  }

	.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 265rpx;
    text-align: center;
    background-color: #39a9ed;
  }

  .toutiao {
    padding: 26rpx;
    background-color: #1676FE;
    position: relative;

    .toutiao-icon {
      width: 126rpx;
      height: 74rpx;
      background-image: url('../../static/images/toutiao.png');
      background-size: 100%;
      position: relative;
      z-index: 1;

      .toutiao-text {
        width: 115rpx;
        text-align: center;

        p {
          font-size: 24rpx;
          color: #ffffff;
        }

        span {
          font-size: 32rpx;
          color: #F9980E;
        }
      }
    }

    .toutiao-link {
      width: 650rpx;
      height: 64rpx;
      background-color: #ffffff;
      position: absolute;
      top: 50%;
      left: 72rpx;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-radius: 32rpx;
      box-sizing: border-box;
      padding-right: 16rpx;

      span {
        font-size: 26rpx;
        color: #2E2E2E;
        margin-right: 26rpx;
      }
    }
  }

  .nav {
    padding: 10rpx 20rpx 46rpx 20rpx;
    background-color: #F5F8FA;
    display: flex;
    flex-wrap: wrap;

    .nav-item {
      width: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 36rpx;

      image {
        width: 80rpx;
        height: 80rpx;
      }

      text {
        margin-top: 20rpx;
        font-size: 24rpx;
      }
    }
  }

  .recommend {
    background-color: #ffffff;
    padding: 36rpx 0;

    .recommend-title {
      width: 258rpx;
      height: 55rpx;
      background-image: url('../../static/images/title-bg.png');
      background-position: center right;
      background-size: 100%;
      font-size: 36rpx;
      color: #fff;
      line-height: 55rpx;
      padding-left: 15rpx;
      margin:0 0 20rpx 26rpx;
    }

    /deep/ .van-swipe__track {
      margin-left: 26rpx;
    }

    .van-swipe-item {
      .image {
        width: 280rpx;
        height: 240rpx;
        border-radius: 20rpx;
        background: #1676FE;
        position: relative;
        overflow: hidden;

        .text {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 60rpx;
          color: #fff;
          font-size: 30rpx;
          text-align: center;
          line-height: 60rpx;
          background: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  .coop {
    padding: 16rpx;
    
    .coop-content {
      background-color: #fff;
      border-radius: 10rpx;
      padding-bottom: 35rpx;

      .coop-header {
        padding: 38rpx 34rpx 28rpx 34rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .coop-title {
          font-size: 32rpx;
          color: #2D2D2D;
        }

        .coop-more {
          font-size: 30rpx;
          color: #1676FE;
        }
      }

      .coop-list {
        display: flex;
        justify-content: space-evenly;

        .coop-item {
          display: flex;
          flex-direction: column;
          align-items: center;

          .image {
            width: 126rpx;
            height: 126rpx;
            border-radius: 50%;
            background: #DAE9FF;
          }

          text {
            font-size: 30rpx;
            color: #2D2D2D;
            margin-top: 14rpx;
          }
        }
      }
    }
  }
  
  .store {
    padding: 0 26rpx;

    .store-header {
      width: 182rpx;
      height: 55rpx;
      background-image: url('../../static/images/title-bg-s.png');
      background-position: center right;
      background-size: 100%;
      font-size: 36rpx;
      color: #fff;
      padding-left: 15rpx;
      line-height: 55rpx;
    }
  }
}
</style>
