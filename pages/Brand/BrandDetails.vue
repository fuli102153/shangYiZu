<template>
  <view class="v-brand-details" v-cloak>
	<view class="banner" >
		<uni-swiper-dot   v-if="tabActive==0"  >
			<swiper class="swiper-box" >
				<swiper-item @click="previewImage(bigPhotos.length>0? bigPhotos : ['../../static/store.jpg'],index)" v-for="(item ,index) in brand.brandLogo? brand.brandLogo.split(',') : ['../../static/store.jpg']" :key="index">
					<view class="swiper-item">
						<image :src="item" mode="" style="width: 100%; height: 430rpx;"></image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot> 
		<uni-swiper-dot   v-else-if="tabActive==1"  >
			<swiper class="swiper-box" >
				<swiper-item @click="previewImage(frontImg.length>0? frontImg : ['../../static/store.jpg'],index)" v-for="(item ,index) in brand.frontImg? brand.frontImg.split(',') : ['../../static/store.jpg']" :key="index">
					<view class="swiper-item">
						<image :src="item" mode="" style="width: 100%; height: 430rpx;"></image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot> 
		<uni-swiper-dot   v-else-if="tabActive==2"  >
			<swiper class="swiper-box" >
				<swiper-item @click="previewImage(innerImg.length>0? innerImg : ['../../static/store.jpg'],index)" v-for="(item ,index) in brand.innerImg? brand.innerImg.split(',') : ['../../static/store.jpg']" :key="index">
					<view class="swiper-item">
						<image :src="item" mode="" style="width: 100%; height: 430rpx;"></image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot> 
		<uni-swiper-dot   v-else-if="tabActive==3"  >
			<swiper class="swiper-box" >
				<swiper-item @click="previewImage(aroundImg.length>0? aroundImg : ['../../static/store.jpg'],index)" v-for="(item ,index) in brand.aroundImg? brand.aroundImg.split(',') : ['../../static/store.jpg']" :key="index">
					<view class="swiper-item">
						<image :src="item" mode="" style="width: 100%; height: 430rpx;"></image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot> 
		<view class="banner-tab">
			<view 
				class="tab-item" 
				:class="index === tabActive ? 'active' : ''" 
				v-for="(item, index) in tabList" 
				:key="index" 
				@click="selectTab(index)"
				>
				{{ item.name }}
			</view>
		</view>
	</view>
   

     
    <view class="shop-name">
      <view class="header">
        <view class="title">
          <text>{{ brand.brandName || "" }}</text>
          
		  <view class="btn" v-if="brand.platType==0">
		  	<view class="btnBox">平台直推</view>
		  </view>
		  <view class="btn" v-if="0">
		  	<view class="btnBox">非平台直租</view>
		  </view>
        </view>
        <view class="shop-rent">
          <text>需求面积:</text>
          {{ brand.measureArea || "" }}m²
        </view>
      </view>
      <view class="title-tag" v-if="brand.brandChar">
        <view v-if="item"
          color="#B2B2B2"
          class="tag-item"
          v-for="(item, index) in brand.brandChar.split(',')"
          :key="index"
          >{{ item }}</view
        >
      </view>
	  
	  
    </view>
	<!--品牌简介-->
	<view class="profile" >
		<view class="title">
			品牌简介
		</view>
		<view class="content">
			{{brand.brandProfile}}
		</view>
	</view>
    <view class="shop-info">
      <van-tabs
        class="tab"
        :active="active"
        @change="onChange"
        color="#1476FD"
        title-active-color="#1476FD"
        line-width="50rpx"
      >
        <van-tab title="开店需求">
          <view class="info">
			  <view class="item">
				<view class="label"> 需求面积 </view>
				<view class="value">
				  {{ brand.measureArea || "-" }}m²
				</view>
			  </view>
			  
			  <view class="item">
			    <view class="label"> 品牌业态 </view>
			    <view class="value">
			  	{{ brand.propertyFormStr || "-" }}
			    </view>
			  </view>
			  
			  <view class="item">
			    <view class="label"> 意向租金 </view>
			    <view class="value"> {{ brand.monthRent || "-" }}元/月 </view>
			  </view>
			  
				
				
				<view class="item">
					<view class="label"> 楼层要求 </view>
					<view class="value">
					  {{ brand.floorNum || "-" }}
					</view>
				</view>
				
				<view class="item">
					<view class="label"> 物业需求 </view>
					<view class="value">
					  {{ brand.propertyType || "-" }}
					</view>
				</view>
				
				<view class="item">
				  <view class="label"> 客单价格 </view>
				  <view class="value">
					{{ brand.customerAveragePrice || "-" }}
				  </view>
				</view>
				
				<view class="item">
				  <view class="label"> 目标客群 </view>
				  <view class="value">
					{{ brand.targetCustomer || "-" }}
				  </view>
				</view>
				
				
				<view class="item">
				  <view class="label"> 客群年龄 </view>
				  <view class="value">
					{{ brand.age || "-" }}
				  </view>
				</view>
				
				<view class="item">
				  <view class="label"> 开店区域 </view>
				  <view class="value">
				    {{ brand.region || "-" }}
				  </view>
				</view>
				
				<view class="item">
				  <view class="label"> 开店数量 </view>
				  <view class="value"> {{ brand.num || "-" }}家 </view>
				</view>
				
				<view class="item">
				  <view class="label"> 允许加盟 </view>
				  <view class="value">
				    {{ brand.openjoin == 0 ? "否" : "是" }}
				  </view>
				</view>
           
				
				
				
				
				
				
				
				
				<view class="cell" @click="transactionShow = !transactionShow">
					<view class="label">
						工程要求
					</view>
					<van-icon name="play" :class="transactionShow ? 'down' : 'up'"/>
				</view>
				<view class="transaction-info" v-show="transactionShow">
					<view class="item">
						<view class="label">
							楼层层高
						</view>
						<view class="value">
							{{brand.floorHeight || '-'}}m
						</view>
					</view>
					<view class="item">
						<view class="label">
							楼层开间
						</view>
						<view class="value">
							{{brand.bayWidth || '-'}}m
						</view>
					</view>
					<view class="item">
						<view class="label">
							楼层进深
						</view>
						<view class="value">
							{{brand.depthLength || '-'}}m
						</view>
					</view>
					<view class="item">
						<view class="label">
							商铺柱距
						</view>
						<view class="value">
							{{brand.columnSpacing || '-'}}m
						</view>
					</view>
					<view class="item">
						<view class="label">
							水务费用
						</view>
						<view class="value">
							{{brand.waterFee || '-'}}元/m³
						</view>
					</view>
					<view class="item">
						<view class="label">
							电务费用
						</view>
						<view class="value">
							{{brand.eleFee || '-'}}元/KWh
						</view>
					</view>
					<view class="item">
						<view class="label">
							供电总量
						</view>
						<view class="value">
							{{brand.totalPowerSupply || '-'}}KW
						</view>
					</view>
					<view class="item">
						<view class="label">
							燃气供量
						</view>
						<view class="value">
							{{brand.gasSupply || '-'}}m³/h
						</view>
					</view>
					<view class="item">
						<view class="label">
							排烟总量
						</view>
						<view class="value">
							{{brand.smokeExhaust || '-'}}m³/h
						</view>
					</view>
					<view class="item">
						<view class="label">
							新风总量
						</view>
						<view class="value">
							{{brand.totalFreshAir || '-'}}m³/h
						</view>
					</view>
					<view class="item">
						<view class="label">
							给水口径
						</view>
						<view class="value">
							{{brand.waterSupplyCaliber || '-'}}DN
						</view>
					</view>
					<view class="item">
						<view class="label">
							排污口径
						</view>
						<view class="value">
							{{brand.dischargeCaliber || '-'}}DN
						</view>
					</view>
					
					
				</view>
           
            
            
            <view
              class="cell"
              @click="engineeringShow = !engineeringShow"
              v-if="false"
            >
              <view class="label"> 工程参数 </view>
              <van-icon name="play" :class="false ? 'down' : 'up'" />
            </view>
            <view class="engineering-info" v-show="false">
              <view class="item">
                <view class="label"> 楼层层高 </view>
                <view class="value"> </view>
              </view>
            </view>
          </view>
        </van-tab>
        <van-tab title="物业需求">
			<view class="info2">
				<view class="content">
        		  <text>1.楼层净高：大于4.5米。 </text>
        		  <text>2.楼板载荷：用餐区≥350kg/m2,厨房区≥450kg/m2。</text>
        		  <text>3.柱网间距：超过8m×8m柱网。</text>
        		  <text>4.垂直交通：首层主入口附近设置垂直客梯，或餐厅专用客梯。</text>
        		  <text>5.供配电：提供电容量1000KVA变电设备，三相五线380V/220V、50Hz，电缆接入店方红线内配电柜指定位置并安装店方独立计量表。</text>
        		  <text>6.供水：供水管线由甲方无偿提供到乙方租赁区域，并需满足：日供水指标不小于25吨；供水压力不小于0.2Mpa，管径不小于DN50mm,乙方在乙方租赁区域内自设总闸门和计量水表，总闸门以后的管路由乙方维修，总闸门以前的管路由甲方维修。</text>
        		  <text>7.卫生间及其污水排放：在乙方租赁区域内自设卫生间供乙方单独使用。污水管线由甲方无偿提供到乙方租赁区域下方并保证管线畅通，管径小于DN150MM.</text>
        		  <text>8.隔油池及厨房废水排放：甲方无偿提供乙方设置隔油池，隔油池出水管由甲方接入大厦地下室污水房，甲方污水排出后接入市政管道，管径小于150MM。</text>
        		  <text>9.空调:甲方同意乙方自设空调系统。甲方无偿提供乙方空调室外机组的安放位置，甲方保证能随时进入该区域对空调室外机进行保养及维修，并保证该位置将导致争议或影响邻里关系。</text>
        		  <text>10.新风、排风：甲方无偿提供乙方的新风、排风口位置：每个风口尺寸400x600MM</text>
        		</view>
        		<view class="content">
        		  <text>
					  物业要求成熟街区环境幽雅，层高在6.5米以上，或者1-2层商业。
        		    　　1.写字楼底商、商业大厦、购物中心。
        		    　　2.周边方便停车3.周边环境优雅更佳
        		    　　4.同品牌连锁店相距2公里以上　　5.歇业时间为晚12点至凌晨2点为宜
        		    　　6.营业场所可注册餐饮类经营许可 　　
					</text>
        		</view>
			</view>
        </van-tab>
      </van-tabs>
    </view>
    <view class="facilities">
      <view class="title"> 配套设施 </view>
      <view class="content">
        <view
          class="facilities-item"
          v-for="(item, index) in brand.supportEquList"
          :key="index"
        >
          <view class="facilities-icon">
            <image :src="item.src" mode=""></image>
          </view>
          <text>{{ item.name }}</text>
        </view>
      </view>
    </view>
 
    <view class="warnning">
      <view class="title"> 交易须知 </view>
	  <view class="content">
	  	<text>1、“商易租”不对任何脱离平台的租赁签约进行交易保障，切勿与业务员个人私下进行无交易保障的租赁签约。</text>
	  	<text>2、“商易租”在提供租赁服务过程中，不会向受让方（承租人）收取任何费用，如“商易租”方人员提出收费要求或已发生收费行为的，请拨打官方客服电话400 885 8319举报。已发生的收费行为一经查实，平台将协助追索。</text>
	  	<text>3、“商易租”仅帮助出让方（意向出租人）公开展示并传播交易标的的信息，意向受让方（意向承租人）务必在交易前对标的进行实地查勘，对标的物的具体情况自行查看。如因此产生的纠纷“商易租”均不承担任何法律责任和赔偿义务。</text>
	  </view>
    </view>
   <!-- 猜你喜欢 -->
		<view class="store" >
			<view class="store-header">推荐品牌</view>
			<view class="store-list">
				<BrandCard v-for="(item,index) in brandList.slice(3, 8)" :sourceData="item" :lastLine="index==2" :key="item" />
			</view>
		</view>
    <!-- 预约 -->
    <view class="foot">
      <view class="store-hot"> </view>
      <view class="btns">
        <view class="btns-collection">
          <view class="collection" @click="ajaxAddCollect(shop.shopNo)">
            <van-icon name="like-o" color="#1576FE" size="40rpx" />
            <text>收藏</text>
          </view>
			<van-button plain  class="share" size="large"  icon="share-o" id="shareShop" color="#1576FE" open-type="share">分享</van-button>
         
        </view>
        <view class="button" v-if="brand.platType==0"  @click="makePhoneCall(Configs.service_phone)">联系开店</view>
		<view class="button" v-else  @click="makePhoneCall(brand.contactMobile)">联系开店</view>
	
      </view>
    </view>
    <van-toast id="van-toast" />
  </view>
</template>

<script>
import { getBrandDetail, getBrandSpecialList } from "../../utils/api.js";
import Toast from "../../wxcomponents/vant/dist/toast/toast";
import BrandCard from '../../components/Card/Brand.vue'
export default {
	components: {
		BrandCard,
	},
  data() {
    return {
		tabList: [
			{ name: 'LOGO', code: 0 },
			{ name: '店招图', code: 1 },
			{ name: '店内图', code: 2 },
			{ name: '店内图', code: 3 },
		],
		  // 图片切换
		tabActive: 0,
		  // tab切换
		active: 0,
		transactionShow: true,
		engineeringShow: true,
		  // 轮播图
		info: [],
		current: 0,
		mode: "nav",
		latitude: "",
		longitude: "",
		brand: {},
		brandList: [],
		bigPhotos:[],
		frontImg:[],//店招
		innerImg:[],//内部
		aroundImg:[],//周边
		
		supportingEquipmentList:[],
		propertyTypeList:[],
    };
  },
  onLoad(paras) {
    console.log(paras);

    //如果有项目ID
    if (paras.brandNo) {
      this.getDetail(paras.brandNo);
	}
	
	// 获取身份下拉菜单数据
	if (
	  this.Dict &&
	  this.Dict.brand_identify &&
	  this.Dict.brand_identify.length > 0
	) {
	  
	  //配套需求字段
	  this.supportingEquipmentList = this.Dict.supporting_equipment.map((item, index) => {
	    return {
	      value: item.itemValue,
	      name: item.itemText,
	    };
	  });
	  
	  
	  this.propertyTypeList = this.Dict.property_type.map((item, index) => {
	    return {
	      value: item.itemValue,
	      name: item.itemText,
	    };
	  });
	  
	  
	}
	this.ajaxGetBrandSpecialList();
  },
  methods: {
	  selectTab(index) {
	  	this.tabActive = index
	  	console.log('tabActive', index)
	  },
	onChange(e) {
		console.log(e.detail)
	},
    getDetail(brandNo) {
      var that = this;
      const paras = {
        id: brandNo,
      };
      paras.accessToken = that.accessToken;
      const toast = Toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      console.log(paras);
      getBrandDetail(paras)
        .then((res) => {
          const data = res.data;
          console.log(data);

          if (data.code == "200") {
            setTimeout(() => {
              Toast.clear();
            }, 300);
            that.brand = data.data;
            that.brand.engineeringConditions = that.brand.engineeringConditions.split(
              ","
            );
			
            var infoPhotos = [that.brand.brandLogo];
			var frontImg = that.brand.frontImgArr;
			var innerImg = that.brand.innerImgArr;
			var aroundImg = that.brand.aroundImgArr;
			
			that.bigPhotos = [];
			that.frontImg = [];
			that.innerImg = [];
			that.aroundImg = [];
			console.log("infoPhotos--------------------------------------")
			
			infoPhotos.forEach((item)=>{
				var _index = item.lastIndexOf(".");
				var bigPhoto = item.slice(0,_index)+"_thumb"+item.slice(_index)
				that.bigPhotos.push(bigPhoto);
			
            })
		
			frontImg.forEach((item)=>{
				
				if(item){
					var _index = item.lastIndexOf(".");
					var bigPhoto = item.slice(0,_index)+"_thumb"+item.slice(_index)
					that.frontImg.push(bigPhoto);
				}
				
				
			})
		
			innerImg.forEach((item)=>{
				
				if(item){
					var _index = item.lastIndexOf(".");
					var bigPhoto = item.slice(0,_index)+"_thumb"+item.slice(_index)
					that.innerImg.push(bigPhoto);
					console.log(that.innerImg)
				}
				
			})
			
			aroundImg.forEach((item)=>{
				if(item){
					var _index = item.lastIndexOf(".");
					var bigPhoto = item.slice(0,_index)+"_thumb"+item.slice(_index)
					that.aroundImg.push(bigPhoto);
				}
				
			})
			
			
			
			
			//配套需求字段
			const _supportEqu = that.brand.supportEqu.split(",");
			that.brand.supportEquList = [];
			that.supportingEquipmentList.forEach((item)=>{
	
				if(_supportEqu.includes(item.name)){
					that.brand.supportEquList.push({ 
						name: item.name, 
						src: "../../static/images/icon_support_"+item.value+".png" 
					})
				}
			})
			
			
			that.propertyTypeList.forEach((item)=>{
				if(that.brand.propertyType == item.value){
					that.brand.propertyType = item.name
				}
			})

            console.log(that.bigPhotos)
            
          } else {
            Toast.fail(data.message);
          }
        })
        .catch((error) => {
          //Toast.fail(this.global.error);
        });
		},
		
		
		onShareAppMessage(res) {
			
			var type = res.target.id;
			var that = this;
			
			return {
				title: this.brand.brandName,
				path: '/pages/Brand/BrandDetails?brandNo='+this.brand.id,
				//path: '/pages/login/login?para='+JSON.stringify(para),
			}
			
		    
		},
		
		previewImage(urls,index){
			console.log(urls)
			uni.previewImage({
				current:index,
				urls:urls
			})
		},
		
		makePhoneCall: function(tel) {
			uni.makePhoneCall({
				phoneNumber: tel,
				success: () => {
					console.log("成功拨打电话");
				},
			});
		},
		
		ajaxGetBrandSpecialList(){
				var that = this;
				const paras = {
				};
				paras.accessToken = that.accessToken;
				getBrandSpecialList(paras).then(res => {
					const data = res.data;
					console.log(data);
					if(data.code=="200"){
						that.brandList = data.data.records;
					}else{
						
					}
				})
				.catch(error => {
				
				});
			},
  },
};
</script>

<style lang="scss" scoped>
	[v-cloak] {
	    display: none;
	}
.v-brand-details {
  .swiper-box {
    height: 430rpx;
  }

  .banner {
    position: relative;
    height: 430rpx;
    .banner-img {
      height: 430rpx;
    }

    .banner-tab {
      position: absolute;
      bottom: 40rpx;
      left: 36rpx;
      display: flex;
      .tab-item {
      	font-size: 22rpx;
      	line-height: 36rpx;
      	padding: 5rpx 29rpx;
      	color: #1476FD;
      	margin-right: 34rpx;
      }
      .active {
      	background:#1476FD;
      	color: #fff;
      	border-radius: 25rpx;
      }
    }
  }
  
  .profile{
		padding: 47rpx 26rpx 26rpx;
		.title{
			color: #1476FD;
			font-size: 32rpx;
			line-height: 57rpx;
		 }
		 .content{
			 color: #6A6A6A;
			 font-size: 30rpx;
			 
		 }
  }

  .shop-name {
    background-color: #fff;
    padding: 20rpx 26rpx 0;
    position: relative;
    top: -25rpx;
    border-radius: 25rpx 25rpx 0 0;

    .header {
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        text {
          color: #302f2c;
          font-size: 40rpx;
        }
        .btn {
        	.btnBox{
        		color: #FCFBF9;
        		font-size: 24rpx;
        		line-height: 36rpx;
        		padding: 3rpx 9rpx;
        		background-color: #1476FD;
        		border-radius: 10rpx;
        		text-align: center;
        	}
        	.btnDes{
        		color: #333;
        		font-size: 20rpx;
        		line-height: 36rpx;
        		text-align: center;
        	}
        }
      }

      .shop-rent {
        font-size: 46rpx;
        color: #fe2a4d;
        text {
          font-size: 28rpx;
          color: #6a6a6a;
          margin-right: 30rpx;
        }
      }
    }

    .title-tag {
      display: flex;
      flex-wrap: wrap;

      .tag-item {
        margin-top: 10rpx;
        margin-right: 20rpx;
        color: #1476fd;
        font-size: 24rpx;
        background-color: #f0f0f0;
        padding: 4rpx 22rpx;
        border-radius: 5rpx;
      }
    }
  }

  .shop-position {
    padding: 0 36rpx;
    .content {
      border: 1px solid #c9c8c8;
      border-radius: 10rpx;
      box-shadow: 0px 9px 9px rgba(3, 3, 3, 0.06);
      padding: 28rpx 40rpx 28rpx 40rpx;
      box-sizing: border-box;
      display: flex;

      .icon {
        width: 78rpx;
        height: 78rpx;
        background-image: url(../../static/images/floor.png);
        background-size: 100%;
      }

      .label {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 20rpx;
        .title {
          color: #252525;
          font-size: 28rpx;
          line-height: 36rpx;
        }
        text {
          font-size: 24rpx;
          line-height: 36rpx;
          color: #6a6a6a;
        }
      }

      .look {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;

        text {
          font-size: 20rpx;
          color: #bfbfbf;
        }
      }
    }

    .time {
      margin-top: 15rpx;
      text-align: right;
      font-size: 20rpx;
      color: #a1a1a2;
    }
  }

  .shop-info {
    /deep/ .tab {
      .van-tabs__wrap {
        padding: 0 18rpx;
      }
      .van-tab {
        flex: none;

        .van-ellipsis {
          font-size: 36rpx;
          padding: 0 13rpx;
        }
      }
    }

    .info {
      margin: 0 36rpx;
      padding: 30rpx 20rpx 30rpx 20rpx;
      border-top: 1px solid #eff0ef;

      .item {
        display: flex;
        margin-bottom: 8rpx;
        font-size: 30rpx;

        .label {
          color: #6a6a6a;
        }

        .value {
          color: #252525;
          margin-left: 27rpx;
        }
      }

      .cell {
        display: flex;
        align-items: center;
        margin: 30rpx 0;
        color: #1476fd;

        .label {
          width: 150rpx;
          font-size: 32rpx;
        }

        .down {
          transform: rotate(90deg);
        }

        .up {
          transform: rotate(-0deg);
        }
      }
    }
		.info2{
			margin: 0 36rpx;
      padding: 30rpx 0 30rpx 0;
    	border-top: 1px solid #eff0ef;
			.content {
        box-sizing: border-box;
        background: #e6e9f0;
        border-radius: 10rpx;
        padding: 40rpx 30rpx;
        display: flex;
        flex-direction: column;

        text {
          font-size: 22rpx;
          line-height: 30rpx;
          color: #7f8589;
        }
      }

			.content:first-child {
				margin-bottom: 60rpx;
			}
	  }
  }

  .facilities {
    padding: 0 36rpx 42rpx;
    .title {
      font-size: 36rpx;
      color: #474a4c;
      margin-bottom: 36rpx;
    }

    .content {
      background: #f4f4f4;
      border-radius: 10rpx;
      padding: 35rpx 0 27rpx;


      .facilities-item {
        display: inline-block;
        width: 150rpx;
        text-align: center;
        margin:10rpx;
        .facilities-icon {
        	text-align: center;
        	
        	image {
        		width: 60rpx;
        		height: 60rpx;
        	}
        }
        text {
          color: #252525;
          font-size: 30rpx;
          margin-top: 11rpx;
        }
      }
    }
  }

  .ad {
    height: 180rpx;
    margin-top: 7rpx;
  }

  .store-market-survey {
    padding: 33rpx 49rpx 30rpx;

    .btn {
      border: 1px solid #1676fe;
      padding: 18rpx 23rpx 18rpx 34rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 5rpx;

      text {
        color: #1676fe;
        font-size: 36rpx;
      }
    }
  }

  .attestation {
    padding: 42rpx 36rpx;
    background-color: #fff;

    .title {
      font-size: 36rpx;
      color: #474a4c;
      margin-bottom: 36rpx;
    }

    .content {
      background: #1476fd;
      border-radius: 10rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      .attestation-title {
        color: #fff;
        font-size: 32rpx;
        padding-top: 19rpx;
      }

      .attestation-explain {
        margin-top: 16rpx;
        color: #fff;
        font-size: 21rpx;
      }

      .attestation-info {
        margin-top: 32rpx;
        margin-bottom: 32rpx;
        width: 100%;
        display: flex;
        justify-content: space-evenly;

        .info-item {
          display: flex;
          flex-direction: column;
          align-items: center;

          .info-icon {
            width: 92rpx;
            height: 92rpx;

            image {
              width: 100%;
              height: 100%;
            }
          }
          text {
            color: #fff;
            font-size: 28rpx;
            margin-top: 13rpx;
          }
        }
      }

      .attestation-user {
        box-sizing: border-box;
        width: 100%;
        text-align: right;
        padding: 0 30rpx;
        margin-bottom: 17rpx;
        color: #fff;
        font-size: 20rpx;
      }
    }
  }

  .warnning {
    padding: 0 36rpx 10rpx;

    .title {
      font-size: 36rpx;
      color: #474a4c;
      margin-bottom: 36rpx;
    }

    .content {
      
      box-sizing: border-box;
      background: #e6e9f0;
      border-radius: 10rpx;
      padding: 40rpx 30rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      text {
        font-size: 22rpx;
        line-height: 30rpx;
        color: #7f8589;
      }
    }
  }

  .store {
    padding: 42rpx 36rpx 120rpx;
    .store-header {
      font-size: 36rpx;
      color: #474a4c;
      margin-bottom: 36rpx;
    }
  }

  .foot {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 999;

    .btns {
      background-color: #fff;
      padding: 18rpx 26rpx 18rpx 35rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .btns-collection {
        display: flex;

        .collection,
        .share {
          display: flex;
          align-items: center;
          margin-right: 56rpx;

          text {
            color: #1576fe;
            margin-left: 15rpx;
          }
		  /deep/.van-button--large{
		  	border: none;
		  }
        }
      }

      .button {
        padding: 17rpx 68rpx;
        color: #fff;
        background: #1576fe;
        border-radius: 5rpx;
        font-size: 28rpx;
      }
    }
  }
}
</style>