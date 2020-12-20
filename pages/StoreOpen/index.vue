<template>
  <view class="v-agent">
    <view class="from">
      <van-cell-group>
        <view class="card">
          <view class="title"> 联系信息 </view>
          <van-field
            :value="form.contactUsername"
            :error-message="errMsg.contactUsername"
            required
            clearable
            label="联系人"
            placeholder="请输入您的姓名"
            @input="changeContactUsername"
          />
          <van-field
            :value="form.contactMobile"
            :error-message="errMsg.contactMobile"
            label="联系电话"
            type="digit"
            placeholder="请输入您的手机号"
            required
            @input="changeContactMobile"
          />
          <van-field
            :value="form.indentity"
            :error-message="errMsg.indentity"
            label="身份"
            placeholder="请输入您的身份"
            required
            disabled
            @click.native="showActionSheet('indentity')"
            is-link
            arrow-direction="down"
            @input="changeIndentity"
          />
          <van-field
            :value="form.businessType"
            :error-message="errMsg.businessType"
            label="经营类型"
            placeholder="请选择您商铺物业现况"
            required
            disabled
            @click.native="showActionSheet('businessType')"
            is-link
            arrow-direction="down"
            @input="changeBusinessType"
          />
          <van-field
            :value="form.propertyStatus"
            :error-message="errMsg.propertyStatus"
            label="物业现况"
            placeholder="请选择您商铺物业现况"
            required
            disabled
            @click.native="showActionSheet('propertyStatus')"
            is-link
            arrow-direction="down"
            @input="changePropertyStatus"
          />
          <van-field
            :value="form.propertyType"
            :error-message="errMsg.propertyType"
            label="物业类型"
            placeholder="请选择您商铺物业类型"
            required
            disabled
            @click.native="showActionSheet('propertyType')"
            is-link
            arrow-direction="down"
            @input="changePropertyType"
          />

          <van-field
            :value="form.measureArea"
            :error-message="errMsg.measureArea"
            required
            clearable
            label="面积"
            placeholder="请输入您商铺的面积"
            @input="changeMeasureArea"
            use-button-slot
          >
            <text slot="button">m²</text>
          </van-field>
        </view>
        <view class="card">
          <view class="title">
            <text>交易信息</text>
            <van-icon
              name="play"
              color="#1476FD"
              :style="showTransactionInfo ? 'transform: rotate(90deg)' : ''"
              @click="showTransactionInfo = !showTransactionInfo"
            />
          </view>
          <view class="content" v-if="showTransactionInfo">
            <van-field
              :value="form.monthRent"
              :error-message="errMsg.monthRent"
              required
              clearable
              label="月租金"
              placeholder="请输入您期望的月租金"
              @input="changeMonthRent"
              use-button-slot
            >
              <text slot="button">元</text>
            </van-field>
            <van-field
              :value="form.targetCustomer"
              :error-message="errMsg.targetCustomer"
              clearable
              label="目标客群"
              placeholder="请输入您开店针对的客户群体"
              @input="changeTargetCustomer"
            />
            <van-field
              :value="form.customerAveragePrice"
              :error-message="errMsg.customerAveragePrice"
              clearable
              label="客单价"
              placeholder="请输入您开店的人均消费单价"
              @input="changeCustomerAveragePrice"
            />
            <van-field
              :value="form.brandName"
              :error-message="errMsg.brandName"
              required
              clearable
              label="品牌名称"
              placeholder="请输入您的品牌名称"
              @input="changeBrandName"
            />
            <van-field
              :value="form.brandProfile"
              :error-message="errMsg.brandProfile"
              required
              clearable
              label="开店品牌简介"
              placeholder="请简单介绍一下您的品牌是什么样的店铺"
              @input="changeBrandProfie"
            />

            <van-field
              :value="form.num"
              :error-message="errMsg.num"
              required
              clearable
              label="数量"
              placeholder="请输入您计划开店的数量"
              @input="changeNum"
            />
            <view class="is-investment">
              <text>您品牌是否开放招商加盟</text>
              <van-radio-group
                :value="form.openjoin"
                class="store-radio"
                @change="isJoinIn"
              >
                <van-radio name="1" label-disabled>是</van-radio>
                <van-radio name="0" label-disabled>否</van-radio>
              </van-radio-group>
            </view>
            <van-field
              :value="form.joinConditions"
              :error-message="errMsg.joinConditions"
              clearable
              label="加盟条件"
              placeholder="请输入您的品牌加盟条件"
              @input="changeJoinConditions"
            />
          </view>
        </view>
        <view class="card">
          <view class="title">
            <text>工程参数</text>
            <van-icon
              name="play"
              color="#1476FD"
              :style="
                showEngineeringParameters ? 'transform: rotate(90deg)' : ''
              "
              @click="showEngineeringParameters = !showEngineeringParameters"
            />
          </view>
          <view class="content" v-if="showEngineeringParameters">
            <van-field
              :value="form.position"
              :error-message="errMsg.position"
              label="位置"
              placeholder="请选择您商铺所在位置"
              required
              disabled
              @click.native="showPosition('position')"
              is-link
              arrow-direction="down"
              @input="changePosition"
            />
            <van-field
              :value="form.engineeringConditions"
              :error-message="errMsg.engineeringConditions"
              label="工程条件"
              placeholder="请选择您商铺具备的工程条件"
              disabled
              @click.native="showEngineeringPopup('engineering_conditions')"
              is-link
            />
          </view>
        </view>
        <view class="card">
          <view class="title"> 品牌图片 </view>
          <view class="content">
            <view class="submit-btn">
              <view class="updata">
                <text>商铺照片</text>
                <view class="updata-image">
                  <view class="image-type">
                    <van-uploader
                      :file-list="fileList[0]"
                      max-count="1"
                      @after-read="afterRead($event, 0)"
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
                      :file-list="fileList[1]"
                      max-count="1"
                      @after-read="afterRead($event, 1)"
                      preview-size="126rpx"
                    />
                    <view class="image-text">您计划开店效果图</view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </van-cell-group>
    </view>

    <view class="btn">
      <van-button type="info" block @click="submit">提交</van-button>
    </view>

    <van-action-sheet
      :show="show"
      :actions="actions"
      cancel-text="取消"
      @close="onClose"
      @select="onSelect"
    />
    <van-action-sheet :show="positionShow">
      <van-area
        :area-list="areaList"
        :value="positionValue"
        @cancel="hideCityPosition"
        @confirm="getCityPosition"
      />
    </van-action-sheet>
    <!-- 工程条件 -->
    <van-popup
      :show="showEngineering"
      @close="onEngineeringClose"
      position="right"
      custom-style="width: 80%;height:100%"
    >
      <view class="pop-content">
        <view class="hot">
          <view class="title"> 热门搜索 </view>
          <view class="hot-tag">
            <view
              color="#B2B2B2"
              class="tag-item"
              :class="selectList.includes(index) ? 'active' : ''"
              v-for="(item, index) in tagList"
              :key="index"
              @click="selectTag(index)"
              >{{ item }}</view
            >
          </view>
        </view>
        <view class="btn">
          <van-button type="info" block @click="complete">完成</van-button>
        </view>
      </view>
    </van-popup>

    <!-- 店铺信息 -->
    <van-popup
      :show="isStoreInfo"
      @close="closeStoreInfo"
      position="right"
      custom-style="width: 90%;height:100%"
    >
      <StoreInfo @subimtStoreInfo="subimtStoreInfo" />
    </van-popup>
    <van-toast id="van-toast" />
  </view>
</template>

<script>
import area from "../../utils/areaT.js";
import { getBrandAdd } from "../../utils/api.js";
import Toast from "../../wxcomponents/vant/dist/toast/toast";

export default {
  data() {
    return {
      form: {
        contactUsername: "张无忌",
        contactMobile: "13487654321",
        indentity: "个体商家",
        businessType: "服装",
        propertyStatus: "毛坯",
        propertyType: "社区底商",
        province: "440300",
        city: this.$Localtion.city.cityCode,
        region: "440305",
        street: "440305007",
        engineeringConditions: "",
        monthRent: "25000",
        measureArea: "100",
        brandName: "喜茶",
        brandProfile: "喜茶是一家新网红的奶茶，深受当代年轻人的喜欢",
        targetCustomer: "80后",
        customerAveragePrice: "20",
        num: "6",
        openjoin: "1",
        joinConditions: "20万的加盟费",
        brandLogo: "",
        effectPhotos: "",
      },
      errMsg: {
        contactUsername: "",
        contactMobile: "",
        indentity: "",
        businessType: "",
        propertyStatus: "",
        propertyType: "",
        city: "",
        region: "",
        street: "",
        engineeringConditions: "",
        monthRent: "",
        measureArea: "",
        brandName: "",
        brandProfile: "",
        targetCustomer: "",
        customerAveragePrice: "",
        num: "",
        openjoin: "",
        joinConditions: "",
        brandLogo: "",
        effectPhotos: "",
      },
      showTransactionInfo: false,
      showEngineeringParameters: false,

      // 城市
      city: null,
      // 区域code
      region: null,
      // 街道code
      street: null,

      checked: true,

      show: false,
      positionShow: false,
      positionValue: "",
      // 城市列表
      areaList: area,
      actions: [],
      // 点击的表单
      clickInput: "",

      // 身份下拉菜单数据
      indentityList: [],
      // 物业状况下拉菜单数据
      businessTypeList: [],
      propertyStatusList: [],
      // 物业类型下拉菜单数据
      propertyTypeList: [],

      fileList: [[], []],

      showEngineering: false,

      isStoreInfo: false,

      tagList: [],
      selectList: [],
      popupType: "",
    };
    // 选择的内容
    activeItme: "";
  },
  onLoad() {
    console.log(area);
    // 获取身份下拉菜单数据
    if (
      this.Dict &&
      this.Dict.brand_identify &&
      this.Dict.brand_identify.length > 0
    ) {
      this.indentityList = this.Dict.brand_identify.map((item, index) => {
        return {
          value: item.itemValue,
          name: item.itemText,
        };
      });
    }
    // 获取经营类型下拉菜单数据
    if (
      this.Dict &&
      this.Dict.business_type &&
      this.Dict.business_type.length > 0
    ) {
      this.businessTypeList = this.Dict.business_type.map((item, index) => {
        return {
          value: item.itemValue,
          name: item.itemText,
        };
      });
    }
    // 获取物业状况下拉菜单数据
    if (
      this.Dict &&
      this.Dict.property_status &&
      this.Dict.property_status.length > 0
    ) {
      this.propertyStatusList = this.Dict.property_status.map((item, index) => {
        return {
          value: item.itemValue,
          name: item.itemText,
        };
      });
    }
    // 获取物业类型下拉菜单数据
    if (
      this.Dict &&
      this.Dict.property_type &&
      this.Dict.property_type.length > 0
    ) {
      this.propertyTypeList = this.Dict.property_type.map((item, index) => {
        return {
          value: item.itemValue,
          name: item.itemText,
        };
      });
    }
  },
  methods: {
    onChange(event) {
      this.checked = event.detail;
    },
    isJoinIn(event) {
      this.form.openjoin = event.detail;
    },
    // 选择侧边框选项
    selectTag(index) {
      let list = [];
      list = JSON.parse(JSON.stringify(this.selectList));
      console.log(1111, list);
      if (list.includes(index)) {
        list.forEach((item, idx) => {
          if (item === index) {
            list.splice(idx, 1);
          }
        });
      } else {
        list.push(index);
      }
      this.selectList = list;
    },
    // 打开侧边弹窗
    showEngineeringPopup(type) {
      this.showEngineering = true;
      this.tagList = this.Dict.engineering_conditions.map(
        (item) => item.itemValue
      );

      this.popupType = type;
    },

    subimtStoreInfo(property) {
      this.property = property;
      console.log("this.property", this.property);
      this.isStoreInfo = false;
    },
    closeStoreInfo() {
      this.isStoreInfo = false;
    },

    complete() {
      this.showEngineering = false;
      let res = this.selectList.map((item) => {
        return this.tagList[item];
      });
      console.log(res);
      this.form.engineeringConditions = res.join(",");
    },

    // 打开下拉框，重置下拉框中的选项
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
      this.form[`${this.clickInput}`] = event.detail.name;
      console.log(
        this.clickInput,
        this.form[`${this.clickInput}`],
        event.detail
      );
    },

    // 获取城市定位
    getCityPosition(event) {
      console.log(event.detail);
      let position = "";
      event.detail.values.forEach((item) => {
        position += item.name;
      });
      this.form.position = position;
      this.positionValue =
        event.detail.values[event.detail.values.length - 1].code;
      // 城市code
      this.form.province = "广东省";
      this.form.city = event.detail.values[0].name;
      // 区域code
      this.form.region = event.detail.values[1].name;
      // 街道code
      this.form.street = event.detail.values[2].name;
      this.positionShow = false;
    },
    // 隐藏位置弹窗
    hideCityPosition() {
      this.positionShow = false;
    },
    // 上传图片
    afterRead(event, index) {
      const { file } = event.detail;
      var that = this;
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      wx.uploadFile({
        url: this.HOST + "api/upload",
        filePath: file.path,
        header: {
          Authorization: this.accessToken,
        },

        name: "file",
        formData: {
          user: "test",
        },
        success(res) {
          // 上传完成需要更新 fileList
          that.fileList[index] = [
            {
              url: JSON.parse(res.data)["data"],
              name: "",
            },
          ];
          that.$forceUpdate();
        },
      });
    },

    //联系人
    changeContactUsername(e) {
      this.form.contactUsername = e.detail.trim();
    },
    //联系电话
    changeContactMobile(e) {
      this.form.contactMobile = e.detail.trim();
    },
    //身份
    changeIndentity(e) {
      this.form.indentity = e.detail.trim();
    },
    //物业现况
    changePropertyStatus(e) {
      this.form.propertyStatus = e.detail.trim();
    },
    //物业类型
    changePropertyType(e) {
      this.form.propertyType = e.detail.trim();
    },
    // 位置
    changePosition(e) {
      this.form.position = e.detail.trim();
    },
    //工程条件
    changeEngineeringConditions(e) {
      this.form.engineeringConditions = e.detail.trim();
    },
    changeBusinessType(e) {
      this.form.businessType = e.detail.trim();
    },
    //月租金
    changeMonthRent(e) {
      this.form.monthRent = e.detail.trim();
    },
    //面积
    changeMeasureArea(e) {
      this.form.measureArea = e.detail.trim();
    },
    changeBrandName(e) {
      this.form.brandName = e.detail.trim();
    },
    changeBrandProfie(e) {
      this.form.brandProfile = e.detail.trim();
    },
    changeTargetCustomer(e) {
      this.form.targetCustomer = e.detail.trim();
    },
    changeCustomerAveragePrice(e) {
      this.form.customerAveragePrice = e.detail.trim();
    },
    changeNum(e) {
      this.form.num = e.detail.trim();
    },
    changeJoinConditions(e) {
      this.form.joinConditions = e.detail.trim();
    },

    // 表单校验
    checkInput() {
      this.errMsg = {
        contactUsername: "",
        contactMobile: "",
        indentity: "",
        businessType: "",
        propertyStatus: "",
        propertyType: "",
        city: "",
        region: "",
        street: "",
        monthRent: "",
        measureArea: "",
        brandName: "",
        brandProfile: "",
        num: "",
        brandLogo: "",
        effectPhotos: "",
      };
      if (!this.form.contactUsername) {
        this.errMsg.contactUsername = "联系人不能为空！";
        Toast.fail("联系人不能为空！");
        return false;
      } else if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.form.contactMobile)) {
        this.errMsg.contactMobile = "请输入正确的电话号码";
        Toast.fail("请输入正确的电话号码！");
        return false;
      } else if (!this.form.indentity) {
        this.errMsg.indentity = "身份不能为空！";
        Toast.fail("身份不能为空！");
        return false;
      } else if (!this.form.businessType) {
        this.errMsg.businessType = "经营类型不能为空！";
        Toast.fail("经营类型不能为空！");
        return false;
      } else if (!this.form.propertyStatus) {
        this.errMsg.propertyStatus = "物业类型不能为空！";
        Toast.fail("物业类型不能为空！");
        return false;
      } else if (!this.form.propertyType) {
        this.errMsg.propertyType = "物业类型不能为空！";
        Toast.fail("物业类型不能为空！");
        return false;
      } else if (!this.form.city) {
        this.errMsg.city = "位置不能为空！";
        Toast.fail("位置不能为空！");
        return false;
      } else if (!this.form.monthRent) {
        this.errMsg.monthRent = "月租金不能为空！";
        Toast.fail("月租金不能为空！");
        return false;
      } else if (!this.form.measureArea) {
        this.errMsg.measureArea = "面积不能为空！";
        Toast.fail("面积不能为空！");
        return false;
      } else if (!this.form.brandName) {
        this.errMsg.brandName = "品牌名称不能为空！";
        Toast.fail("品牌名称不能为空！");
        return false;
      } else if (!this.form.brandProfile) {
        this.errMsg.brandProfile = "品牌简介不能为空！";
        Toast.fail("品牌简介不能为空！");
        return false;
      } else if (!this.form.num) {
        this.errMsg.num = "数量不能为空！";
        Toast.fail("数量不能为空！");
        return false;
      } else {
        return true;
      }
    },

    //提交数据
    submit() {
      const params = this.form;
      console.log(this.fileList);
      if (this.fileList[0].length) {
        params.brandLogo = this.fileList[0][0].url;
      }
      if (this.fileList[1].length) {
        params.effectPhotos = this.fileList[1][0].url;
      }

      if (this.checkInput()) {
        params.accessToken = this.accessToken;
        const toast = Toast.loading({
          message: "提交中...",
          forbidClick: true,
          loadingType: "spinner",
        });
        console.log(params);
        getBrandAdd(params)
          .then((res) => {
            const data = res.data;
            if (data.code == "200") {
              Toast.success("发布成功");
              setTimeout(() => {
                uni.switchTab({
                  url: "../Index/index",
                });
              }, 2000);
            } else {
              Toast.fail(data.message);
            }
          })
          .catch((error) => {
            Toast.fail(this.global.error);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.v-agent {
  padding: 40rpx 36rpx;
  background: #f5f5f5;

  .card {
    background: #fff;
    border-radius: 30rpx;
    margin-bottom: 40rpx;
    padding: 30rpx 0;

    .title {
      padding: 0 20rpx;
      font-size: 34rpx;
      color: #1476fd;
      display: flex;
      justify-content: space-between;
    }
  }

  .from {
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
    padding: 50rpx 50rpx;
  }

  .pop-content {
    .hot {
      background-color: #fff;
      padding: 47rpx 26rpx 40rpx;

      .hot-tag {
        display: flex;
        flex-wrap: wrap;

        .tag-item {
          margin-top: 20rpx;
          margin-right: 20rpx;
          border: 1rpx solid #b2b2b2;
          color: #b2b2b2;
          font-size: 30rpx;
          line-height: 30rpx;
          padding: 15rpx 48rpx;
          border-radius: 8rpx;
        }

        .active {
          color: #fff;
          background-color: #1676fe;
          border: 1rpx solid #1676fe;
        }
      }
    }

    .btn {
      margin-top: 116rpx;
      padding: 0 128rpx;
    }
  }
}

.van-uploader__preview {
  margin: 0rpx !important;
}
</style>
