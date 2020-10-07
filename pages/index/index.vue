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
            <van-button round plain hairline type="info" size="mini"
              >手动定位</van-button
            >
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
    <view class="nav">
      <view class="nav-item" v-for="(item, index) in navList"  :key="index">
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
  </view>
</template>

<script>
export default {
  data() {
    return {
      locationShow: false,
      cityList: ["北京", "上海", "广州", "深圳"],
      activeCity: null,
      navList: [
        {name: '地图找铺', src: '../../static/images/Map.png'},
        {name: '招租发布', src: '../../static/images/Hire.png'},
        {name: '开店发布', src: '../../static/images/OpenShop.png'},
        {name: '购物中心', src: '../../static/images/Shopping.png'},
        {name: '社区底商', src: '../../static/images/Community.png'},
        {name: '整租物业', src: '../../static/images/WholeRent.png'},
        {name: '商业街区', src: '../../static/images/CommercialStreet.png'},
        {name: '综合配套', src: '../../static/images/ComprehensiveMatching.png'},
        {name: '专业市场', src: '../../static/images/ProfessionalMarket.png'},
        {name: '娱乐教育', src: '../../static/images/EntertainmentEducation.png'},
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
  },
};
</script>

<style lang="scss" scoped>
.v-index {
  .header {
    width: 100%;
    padding: 25rpx 26rpx;
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
    width: 100%;
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
      margin:36rpx 0 20rpx 26rpx;
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
}
</style>
