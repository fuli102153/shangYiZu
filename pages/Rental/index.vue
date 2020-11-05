<template>
  <view class="v-agent">
    <view class="from">
      <van-cell-group>
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
          :value="form.detailedLocation"
					:error-message="errMsg.detailedLocation"
          label="详细位置"
          placeholder="请输入您商铺详细地址，详至门牌"
          required
          @input="changeDetailedLocation"
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

        <van-field
          :value="form.businessType"
					:error-message="errMsg.businessType"
          label="期望招商类别"
          placeholder="请选择您期望的招商类别"
          disabled
          @click.native="showEngineeringPopup('business_type')"
          is-link
        />
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
        <van-field
          :value="form.freeTenancy"
					:error-message="errMsg.freeTenancy"
          clearable
          label="免租期"
          placeholder="请输入您商铺的免租期"
          @input="changeFreeTenancy"
          use-button-slot
        >
          <text slot="button">月</text>
        </van-field>
        <van-field
          :value="form.propertyEnvironment"
					:error-message="errMsg.propertyEnvironment"
          clearable
          label="物业环境"
          placeholder="请介绍您点评周边物业环境配套情况"
          @input="changePropertyEnvironment"
        />

        <van-field
          :value="form.storeInfo"
					:error-message="errMsg.storeInfo"
          label="店铺信息"
          placeholder="请选择您期望的招商类别"
          disabled
          @click.native="goStoreInfo"
          is-link
        />
      </van-cell-group>
    </view>
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
            <view class="image-text"> 正面门面 </view>
          </view>
          <view class="image-type">
            <van-uploader
              :file-list="fileList[1]"
              max-count="1"
              @after-read="afterRead($event, 1)"
              preview-size="126rpx"
            />
            <view class="image-text"> 外部全景 </view>
          </view>
          <view class="image-type">
            <van-uploader
              :file-list="fileList[2]"
              max-count="1"
              @after-read="afterRead($event, 2)"
              preview-size="126rpx"
            />
            <view class="image-text"> 商铺内部 </view>
          </view>
          <view class="image-type">
            <van-uploader
              :file-list="fileList[3]"
              max-count="1"
              @after-read="afterRead($event, 3)"
              preview-size="126rpx"
            />
            <view class="image-text"> 商铺内部 </view>
          </view>
        </view>
      </view>
      <view class="btn">
        <van-button type="info" block @click="submit">提交</van-button>
      </view>
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
      		<view class="title">
      			热门搜索
      		</view>
      		<view class="hot-tag">
      			<view color="#B2B2B2" class="tag-item" :class="selectList.includes(index) ? 'active' : ''" v-for="(item, index) in tagList" :key="index" @click="selectTag(index)">{{ item }}</view>
      		</view>
      	</view>
      	<view class="btn">
      	  <van-button type="info" block @click="complete">完成</van-button>
      	</view>
      </view>
    </van-popup>
		
		<!-- 招商类别 -->
		<van-popup
		  :show="businessShowEngineering"
		  @close="onEngineeringClose"
		  position="right"
		  custom-style="width: 80%;height:100%"
		>
		  <view class="pop-content">
		  	<view class="hot">
		  		<view class="title">
		  			热门搜索
		  		</view>
		  		<view class="hot-tag">
		  			<view color="#B2B2B2" class="tag-item" :class="businessSelectList.includes(index) ? 'active' : ''" v-for="(item, index) in businessTypeList" :key="index" @click="selectTag(index)">{{ item }}</view>
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
		  <StoreInfo @subimtStoreInfo="subimtStoreInfo"/>
		</van-popup>
  </view>
</template>

<script>
import area from "../../utils/areaT.js";
import { getShopAdd } from "../../utils/api.js"
import StoreInfo from "./storeInfo"

export default {
	components: {
		StoreInfo
	},
  data() {
    return {
			form: {
				// 联系人
				contactUsername: "",
				// 联系电话
				contactMobile: "",
				// 身份
				indentity: "",
				// 物业现况
				propertyStatus: "",
				// 物业类型
				propertyType: "",
				// 位置
				position: "",
				// 详细位置
				detailedLocation: "",
				// 工程条件
				engineeringConditions: "",
				// 期望招商类别
				businessType: "",
				// 月租金
				monthRent: "",
				// 面积
				measureArea: "",
				// 免租期
				freeTenancy: "",
				// 物业环境
				propertyEnvironment: "",
				// 店铺信息
				storeInfo: "",
			},
			property: {},
			errMsg: {
				// 联系人
				contactUsername: "",
				// 联系电话
				contactMobile: "",
				// 身份
				indentity: "",
				// 物业现况
				propertyStatus: "",
				// 物业类型
				propertyType: "",
				// 位置
				position: "",
				// 详细位置
				detailedLocation: "",
				// 工程条件
				engineeringConditions: "",
				// 期望招商类别
				businessType: "",
				// 月租金
				rent: "",
				// 面积
				area: "",
				// 免租期
				freePeriod: "",
				// 物业环境
				environment: "",
				// 店铺信息
				storeInfo: "",
			},
			
			// 城市
			cityId: null,
			// 区域code
			regionId: null,
			// 街道code
			streetId: null,
      

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
      propertyStatusList: [],
			// 物业类型下拉菜单数据
      propertyTypeList: [],

      fileList: [[], [], [], []],
			
			
			showEngineering: false,
			businessShowEngineering: false,
			
			isStoreInfo: false,
			
			tagList: [],
			selectList: [],
			popupType: '',
			
			businessTypeList: [],
			businessSelectList: [],
    };
    // 选择的内容
    activeItme: "";
  },
  onLoad() {
    console.log(area);
		// 获取身份下拉菜单数据
		if (this.Dict && this.Dict.brand_identify && this.Dict.brand_identify.length > 0) {
			this.indentityList = this.Dict.brand_identify.map((item, index) => {
				return  {value: item.itemValue, name: item.itemText}
			})
		}
		// 获取物业状况下拉菜单数据
		if (this.Dict && this.Dict.property_status && this.Dict.property_status.length > 0) {
			this.propertyStatusList = this.Dict.property_status.map((item, index) => {
				return  {value: item.itemValue, name: item.itemText}
			})
		}
		// 获取物业类型下拉菜单数据
		if (this.Dict && this.Dict.property_type && this.Dict.property_type.length > 0) {
			this.propertyTypeList = this.Dict.property_type.map((item, index) => {
				return  {value: item.itemValue, name: item.itemText}
			})
		}
  },
  methods: {
    onChange(event) {
      this.checked = event.detail;
    },
		
		// 选择侧边框选项
		selectTag(index) {
			let list = []
			if (this.popupType === 'engineering_conditions') {
				list = JSON.parse(JSON.stringify(this.selectList))
			} else if (this.popupType === 'business_type') {
				list = JSON.parse(JSON.stringify(this.businessSelectList))
			}
			console.log(1111, list)
			if (list.includes(index)) {
				list.forEach((item, idx) => {
					if (item === index) {
						list.splice(idx,1); 
					}
				})
			} else {
				list.push(index)
			}
			console.log(list)
			if (this.popupType === 'engineering_conditions') {
				this.selectList = list
			} else if (this.popupType === 'business_type') {
				this.businessSelectList = list
			}
			
		},
		// 打开侧边弹窗
		showEngineeringPopup(type) {
			if (type === 'engineering_conditions') {
				this.showEngineering = true;
				this.tagList = this.Dict.engineering_conditions.map(item => item.itemValue)
			} else if (type === 'business_type') {
				this.businessShowEngineering = true;
				this.businessTypeList = this.Dict.business_type.map(item => item.itemValue)
			}
			this.popupType = type
		},
		
		onEngineeringClose() {
		  this.showEngineering = false;
			this.businessShowEngineering = false;
		},
		
		subimtStoreInfo(property) {
			this.property = property;
			console.log('this.property', this.property)
			this.isStoreInfo = false
		},
		closeStoreInfo() {
			this.isStoreInfo = false
		},
		
		complete() {
			if (this.popupType === 'engineering_conditions') {
				this.showEngineering = false;
				let res = this.selectList.map(item => {
					return this.tagList[item]
				})
				console.log(res)
				this.form.engineeringConditions = res.join(',')
				console.log(this.form.engineeringConditions)
			} else if (this.popupType === 'business_type') {
				this.businessShowEngineering = false;
				let res = this.businessSelectList.map(item => {
					return this.businessTypeList[item]
				})
				this.form.businessType = res.join(',')
				console.log(this.form.businessType)
			}
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
      console.log(this.clickInput, this.form[`${this.clickInput}`], event.detail);
    },
		
		
    // 获取城市定位
    getCityPosition(event) {
      console.log(event.detail);
      let position = "";
      event.detail.values.forEach((item) => {
        position += item.name;
      });
      this.form.position = position;
      this.positionValue = event.detail.values[event.detail.values.length - 1].code;
			// 城市code
			this.cityId = event.detail.values[0].code;
			// 区域code
			this.regionId = event.detail.values[1].code;
			// 街道code
			this.streetId = event.detail.values[2].code;
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
		
    // 跳转店铺信息
    goStoreInfo() {
			this.isStoreInfo = true
      // uni.navigateTo({
      //   url: "./storeInfo",
      // });
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
    //详细信息
    changeDetailedLocation(e) {
      this.form.detailLocation = e.detail.trim();
    },
    //工程条件
    changeEngineeringConditions(e) {
      this.form.engineeringConditions = e.detail.trim();
    },
    //期望招商类别
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
    //免租期
    changeFreeTenancy(e) {
      this.form.freeTenancy = e.detail.trim();
    },
    //物业环境
    changePropertyEnvironment(e) {
      this.form.propertyEnvironment = e.detail.trim();
    },
		
		// 表单校验
		checkInput() {
			this.errMsg = {
				contactUsername: "",
				contactMobile: "",
				indentity: "",
				propertStatus: "",
				propertType: "",
				position: "",
				detailedLocation: "",
				engineering: "",
				investmentCategory: "",
				rent: "",
				area: "",
				freePeriod: "",
				environment: "",
				storeInfo: "",
			};
			if (!this.form.contactUsername) {
				this.errMsg.contactUsername = '联系人不能为空！'
				console.log(1)
				return
			} else if (!this.form.contactMobile) {
				this.errMsg.contactMobile = '联系电话不能为空！'
				console.log(2)
				return
			} else if (!this.form.indentity) {
				this.errMsg.indentity = '身份不能为空！'
				console.log(3)
				return
			} else if (!this.form.propertyStatus) {
				this.errMsg.propertyStatus = '物业类型不能为空！'
				console.log(4)
				return
			} else if (!this.form.propertyType) {
				this.errMsg.propertyType = '物业类型不能为空！'
				console.log(5)
				return
			} else if (!this.form.position) {
				this.errMsg.position = '位置不能为空！'
				console.log(6)
				return
			} else if (!this.form.detailLocation) {
				this.errMsg.detailLocation = '详细位置不能为空！'
				console.log(7)
				return
			} else if (!this.form.monthRent) {
				this.errMsg.monthRent = '月租金不能为空！'
				console.log(8)
				return
			} else if (!this.form.measureArea) {
				this.errMsg.measureArea = '面积不能为空！'
				console.log(9)
				return
			}
		},

    //提交数据
    submit() {
      console.log("联系人", this.form.contactUsername, 111);
			console.log('校验', this.checkInput())
			const params = {
				shop: Object.assign(
					this.form,
					{
						cityId: this.cityId,
						regionId: this.regionId,
						streetId: this.streetId,
						indentity: this.indentity === '业主' ? 1 : 0,
					}
				),
				property: this.property
			}
			console.log('params', params)
			
			params.accessToken = this.accessToken;
			console.log(this.accessToken)
			getShopAdd(params).then(res => {
				console.log(res)
			})
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
  }

  .submit-btn {
    padding: 0 46rpx;
    background-color: #f8f8f8;

    .updata {
      display: flex;
      flex-direction: column;

      .updata-image {
        display: flex;
        justify-content: space-between;

        .image-type {
          text-align: center;

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

    .btn {
      padding: 0 18rpx;
      margin-top: 125rpx;
      margin-bottom: 250rpx;
    }
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
					border: 1rpx solid #B2B2B2;
					color: #B2B2B2;
					font-size: 30rpx;
					line-height: 30rpx;
					padding: 15rpx 48rpx;
					border-radius: 8rpx;
				}
				.active {
					color: #fff;
					background-color: #1676FE;
					border: 1rpx solid #1676FE;
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
