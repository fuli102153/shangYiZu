<template>
  <view class="v-agent">
    <view class="from">
		
      <van-cell-group>
        <van-field
			:value="contactUsername"
			required
			clearable
			label="联系人"
			placeholder="请输入您的姓名"
			@input="changeContactUsername"
        />
        <van-field
			:value="contactMobile"
			label="联系电话"
			placeholder="请输入您的手机号"
			error-message=" "
			required
			@input="changeContactMobile"
        />
        <van-field
          :value="indentity"
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
          :value="propertyStatus"
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
          :value="propertType"
          label="物业类型"
          placeholder="请选择您商铺物业类型"
          required
          disabled
          @click.native="showActionSheet('propertType')"
          is-link
          arrow-direction="down"
		  @input="changePropertyType"
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
		  @input="changeDetailedLocation"
        />
        <van-field
          :value="engineeringConditions"
          label="工程条件"
          placeholder="请选择您商铺具备的工程条件"
          disabled
          @click.native="goEngineering"
          is-link
		 
        />
        <van-field
          :value="businessType"
          label="期望招商类别"
          placeholder="请选择您期望的招商类别"
          disabled
          @click.native="goInvestmentCategory"
          is-link
		  
        />
        <van-field
          :value="monthRent"
          required
          clearable
          label="月租金"
          placeholder="请输入您期望的月租金"
			@input="changeMonthRent"
					use-button-slot >
					<text slot="button">元</text>
				</van-field>
        <van-field
          :value="measureArea"
          required
          clearable
          label="面积"
          placeholder="请输入您商铺的面积"
		 @input="changeMeasureArea"
					use-button-slot >
					<text slot="button">m²</text>
				</van-field>
        <van-field
          :value="freeTenancy"
          clearable
          label="免租期"
          placeholder="请输入您商铺的免租期"
		  @input="changeFreeTenancy"
					use-button-slot >
					<text slot="button">月</text>
				</van-field>
        <van-field
          :value="propertyEnvironment"
          clearable
          label="物业环境"
          placeholder="请介绍您点评周边物业环境配套情况"
		  @input="changePropertyEnvironment"
        />

        <van-field
          :value="storeInfo"
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
						<van-uploader :file-list="fileList" @after-read="afterRead" preview-size="126rpx" />
						<view class="image-text">
							正面门面
						</view>
					</view>
					<view class="image-type">
						<van-uploader :file-list="fileList" @after-read="afterRead" preview-size="126rpx" />
						<view class="image-text">
							外部全景
						</view>
					</view>
					<view class="image-type">
						<van-uploader :file-list="fileList" @after-read="afterRead" preview-size="126rpx" />
						<view class="image-text">
							商铺内部
						</view>
					</view>
					<view class="image-type">
						<van-uploader :file-list="fileList" @after-read="afterRead" preview-size="126rpx" />
						<view class="image-text">
							商铺内部
						</view>
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
      contactUsername: "",
      // 联系电话
      contactMobile: "",
      // 身份
      indentity: "",
      // 物业现况
      propertStatus: "",
      // 物业类型
      propertType: "",
      // 位置
      position: "",
      // 详细位置
      detailedLocation: "11",
      // 工程条件
      engineering: "",
      // 期望招商类别
      investmentCategory: "",
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
    // 隐藏位置弹窗
    hideCityPosition() {
      this.positionShow = false;
    },
		// 上传图片
		afterRead(event) {
			const {
				file
			} = event.detail;
			// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
			wx.uploadFile({
				url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
				filePath: file.path,
				name: 'file',
				formData: {
					user: 'test'
				},
				success(res) {
					// 上传完成需要更新 fileList
					const {
						fileList = []
					} = this.data;
					fileList.push({ ...file,
						url: res.data
					});
					this.fileList = fileList;
				},
			});
		},
		// 跳转工程条件
		goEngineering() {
			uni.navigateTo({
				url: "./engineering"
			})
		},
		// 跳转招商类别
		goInvestmentCategory() {
			uni.navigateTo({
				url: "./investmentCategory"
			})
		},
		// 跳转店铺信息
		goStoreInfo() {
			uni.navigateTo({
				url: "./storeInfo"
			})
		},
		//联系人
		changeContactUsername(e) {
			this.contactUsername = e.detail
		},
		//联系电话
		changeContactMobile(e) {
			this.contactMobile = e.detail
		},
		//身份
		changeIndentity(e) {
			this.indentity = e.detail
		},
		//物业现况
		changePropertyStatus(e) {
			this.propertyStatus = e.detail
		},
		//物业类型
		changePropertyType(e) {
			this.propertyType = e.detail
		},
		//详细信息
		changeDetailLocation(e) {
			this.detailLocation = e.detail
		},
		//工程条件
		changeEngineeringConditions(e) {
			this.engineeringConditions = e.detail
		},
		//期望招商类别
		changeBusinessType(e) {
			this.businessType = e.detail
		},
		//月租金
		changeMonthRent(e) {
			this.monthRent = e.detail
		},
		//面积
		changeMeasureArea(e) {
			this.measureArea = e.detail
		},
		//免租期
		changeFreeTenancy(e) {
			this.freeTenancy = e.detail
		},
		//物业环境
		changePropertyEnvironment(e) {
			this.propertyEnvironment = e.detail
		},

		
		//提交数据
		submit(){
			console.log(this.contactUsername)
		}
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
						margin-top: 28rpx;;
					}
				}
			}
    
    	text {
    		font-size: 28rpx;
    		color: #2D2D2D;
    		margin: 20rpx 0 26rpx;
    	}
    
    	/deep/ .van-uploader__upload {
    		border: 1rpx solid #CACDD0;
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
}
</style>
