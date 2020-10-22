<template>
  <view class="v-agent">
    <view class="from">
      <van-cell-group>
        <van-field
          :value="contacts"
          required
          clearable
          label="联系人"
          placeholder="请输入您的姓名"
        />
        <van-field
          :value="phone"
          label="联系电话"
          placeholder="请输入您的手机号"
          error-message=" "
          required
        />
        <van-field
          :value="idType"
          label="身份"
          placeholder="请输入您的身份"
          required
          disabled
          @click.native="showActionSheet('idType')"
          is-link
          arrow-direction="down"
        />
        <van-field
          :value="propertStatus"
          label="物业现况"
          placeholder="请选择您商铺物业现况"
          required
          disabled
          @click.native="showActionSheet('propertStatus')"
          is-link
          arrow-direction="down"
        />
        <van-field
          :value="propertType"
          label="物业类型"
          placeholder="请选择您商铺物业类型"
          required
          disabled
          @click.native="showActionSheet('propertType')"
          is-link
          arrow-direction="down"
        />
        <van-field
          :value="position"
          label="位置"
          placeholder="请选择您商铺所在位置"
          required
          disabled
          @click.native="showPosition('position')"
          is-link
          arrow-direction="down"
        />
        <van-field
          :value="detailedLocation"
          label="详细位置"
          placeholder="请输入您商铺详细地址，详至门牌"
          required
        />
        <van-field
          :value="engineering"
          label="工程条件"
          placeholder="请选择您商铺具备的工程条件"
          disabled
          @click.native="goEngineering"
          is-link
        />
        <van-field
          :value="investmentCategory"
          label="期望招商类别"
          placeholder="请选择您期望的招商类别"
          disabled
          @click.native="goInvestmentCategory"
          is-link
        />
        <van-field
          :value="rent"
          required
          clearable
          label="月租金"
          placeholder="请输入您期望的月租金"
          use-button-slot
        >
          <text slot="button">元</text>
        </van-field>
        <van-field
          :value="area"
          required
          clearable
          label="面积"
          placeholder="请输入您商铺的面积"
          use-button-slot
        >
          <text slot="button">m²</text>
        </van-field>
        <van-field
          :value="brandName"
          clearable
          required
          label="品牌名称"
          placeholder="请输入您的品牌名称"
        >
        </van-field>
        <van-field
          :value="brandProfile"
          clearable
          required
          label="开店品牌简介"
          placeholder="请简单介绍一下您的品牌"
        />
        <van-field
          :value="targetCustomers"
          clearable
          label="目标客户"
          placeholder="请输入您开店针对的客户人群"
        />
        <van-field
          :value="unitPrice"
          clearable
          label="客单价"
          placeholder="请输入您开店的人均消费单价"
        />
        <van-field
          :value="storeNum"
          clearable
          required
          label="数量"
          placeholder="请输入您计划开店数量"
        />

        <view class="is-investment">
					<text>您品牌是否开放招商加盟</text>
          <van-radio-group :value="isInvestment" class="store-radio" @change="isJoinIn">
            <van-radio name="1" label-disabled>是</van-radio>
            <van-radio name="2" label-disabled>否</van-radio>
          </van-radio-group>
        </view>
				<van-field
				  :value="franchiseConditions"
				  clearable
				  label="加盟条件"
				  placeholder="请输入您品牌加盟的条件"
				/>
      </van-cell-group>
    </view>
    <view class="submit-btn">
      <view class="updata">
        <text>商铺照片</text>
        <view class="updata-image">
          <view class="image-type">
            <van-uploader
              :file-list="fileList"
              @after-read="afterRead"
              preview-size="126rpx"
            />
            <view class="image-text">品牌logo</view>
          </view>
        </view>
      </view>
			<view class="updata">
			  <text>效果图</text>
			  <view class="updata-image">
			    <view class="image-type">
			      <van-uploader
			        :file-list="fileList"
			        @after-read="afterRead"
			        preview-size="126rpx"
			      />
			      <view class="image-text">您计划开店效果图</view>
			    </view>
			  </view>
			</view>
    </view>
		
		<view class="btn">
		  <van-button type="info" block>提交</van-button>
		</view>
    <van-action-sheet
      :show="show"
      :actions="actions"
      cancel-text="取消"
      @close="onClose"
      @select="onSelect"
    />
    <van-action-sheet :show="positionShow">
      <!-- 需要开启小程序云服务才可以获取城市列表 -->
      <van-area
        :area-list="areaList"
        value="110101"
        @cancel="hideCityPosition"
        @confirm="getCityPosition"
      />
    </van-action-sheet>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 联系人
      contacts: "",
      // 联系电话
      phone: "",
      // 身份
      idType: "",
      // 物业现况
      propertStatus: "",
      // 物业类型
      propertType: "",
      // 位置
      position: "",
      // 详细位置
      detailedLocation: "",
      // 工程条件
      engineering: "",
      // 期望招商类别
      investmentCategory: "",
      // 月租金
      rent: "",
      // 面积
      area: "",
      // 品牌名称
      brandName: "",
      // 开店品牌简介
      brandProfile: "",
      // 目标客户
      targetCustomers: "",
      // 客单价
      unitPrice: "",
      // 数量
      storeNum: "",
      // 是否开放加盟
      isInvestment: "1",
			// 加盟条件
			franchiseConditions: "",

      checked: true,

      show: false,
      positionShow: false,

      // 城市列表
      areaList: [],
      actions: [],
      // 点击的表单
      clickInput: "",

      idTypeList: [
        {
          name: "业主",
        },
        {
          name: "非业主",
        },
      ],
      propertStatusList: [
        {
          name: "毛坯",
        },
        {
          name: "带装修",
        },
        {
          name: "在经营",
        },
      ],
      propertTypeList: [
        {
          name: "购物中心",
        },
        {
          name: "社区底商",
        },
        {
          name: "整租物业",
        },
        {
          name: "商业街区",
        },
        {
          name: "综合配套",
        },
      ],
    };
    // 选择的内容
    activeItme: "";
  },
  onLoad() {
    wx.cloud.init();
    const db = wx.cloud.database();

    db.collection("region")
      .limit(1)
      .get()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          this.areaList = res.data[0];
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    onChange(event) {
      this.checked = event.detail;
    },
    showActionSheet(type) {
      this.clickInput = type;
      this.actions = this[`${type}List`];
      this.show = true;
    },
    // 选择位置弹窗
    showPosition() {
      this.positionShow = true;
    },
    onClose() {
      this.show = false;
      this.actions = [];
    },
    onSelect(event) {
      this[`${this.clickInput}`] = event.detail.name;
      console.log(this.clickInput, this[`${this.clickInput}`], event.detail);
    },
    // 获取城市定位
    getCityPosition(event) {
      console.log(event.detail);
      this.positionShow = false;
    },
    // 是否开放招商加盟
    isJoinIn(event) {
			this.isInvestment = event.detail;
		},
    // 隐藏位置弹窗
    hideCityPosition() {
      this.positionShow = false;
    },
    // 上传图片
    afterRead(event) {
      const { file } = event.detail;
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      wx.uploadFile({
        url: "https://example.weixin.qq.com/upload", // 仅为示例，非真实的接口地址
        filePath: file.path,
        name: "file",
        formData: {
          user: "test",
        },
        success(res) {
          // 上传完成需要更新 fileList
          const { fileList = [] } = this.data;
          fileList.push({ ...file, url: res.data });
          this.fileList = fileList;
        },
      });
    },
    // 跳转工程条件
    goEngineering() {
      uni.navigateTo({
        url: "./engineering",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.v-agent {
		
  .from {
    padding: 0 20rpx;

    /deep/ .van-field__label--disabled {
      color: #646566;
    }

    /deep/ .van-field__input--disabled {
      color: #323232;
    }
		
		.is-investment {
			display: flex;
			justify-content: space-between;
			padding: 28rpx 20rpx;
			font-size: 28rpx;
			
			.store-radio {
				display: flex;
				
				/deep/ .van-radio {
					margin-left: 20rpx;
				}
			}
		}
  }

  .submit-btn {
    padding: 0 46rpx;
    background-color: #f8f8f8;
		display: flex;

    .updata {
      display: flex;
      flex-direction: column;
			margin-right: 40rpx;

      .updata-image {
        display: flex;
        justify-content: space-between;

        .image-type {
          text-align: left;

          .image-text {
            font-size: 28rpx;
            color: #888888;
            margin-top: 28rpx;
          }
        }
      }

      text {
        font-size: 28rpx;
        color: #2d2d2d;
        margin: 20rpx 0 26rpx;
      }

      /deep/ .van-uploader__upload {
        border: 1rpx solid #cacdd0;
        margin: 0;
      }
    }

    .tip {
      font-size: 21rpx;
      color: #2d2d2d;
      margin-top: 30rpx;
    }
  }
	.btn {
	  padding: 125rpx 64rpx 250rpx;
    background-color: #f8f8f8;
	}
}
</style>
