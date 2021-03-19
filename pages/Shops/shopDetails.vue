<template >
	<view class="v-shop-details">
		
		<view class="banner" >
			<uni-swiper-dot   v-if="tabActive==0"  >
				<swiper class="swiper-box" >
					<swiper-item @click="previewImage(bigPhotos.length>0? bigPhotos : ['../../static/store.jpg'],index)" v-for="(item ,index) in shop.shopPhotos? shop.shopPhotos.split(',') : ['../../static/store.jpg']" :key="index">
						<view class="swiper-item">
							<image :src="item" mode="" style="width: 100%; height: 430rpx;"></image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot> 
			<uni-swiper-dot   v-else-if="tabActive==1"  >
				<swiper class="swiper-box" >
					<swiper-item @click="previewImage(signBoardImg.length>0? signBoardImg : ['../../static/store.jpg'],index)" v-for="(item ,index) in shop.signBoardImg? shop.signBoardImg.split(',') : ['../../static/store.jpg']" :key="index">
						<view class="swiper-item">
							<image :src="item" mode="" style="width: 100%; height: 430rpx;"></image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot> 
			<uni-swiper-dot   v-else-if="tabActive==2"  >
				<swiper class="swiper-box" >
					<swiper-item @click="previewImage(shopInsideImg.length>0? shopInsideImg : ['../../static/store.jpg'],index)" v-for="(item ,index) in shop.shopInsideImg? shop.shopInsideImg.split(',') : ['../../static/store.jpg']" :key="index">
						<view class="swiper-item">
							<image :src="item" mode="" style="width: 100%; height: 430rpx;"></image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot> 
			<uni-swiper-dot   v-else-if="tabActive==3"  >
				<swiper class="swiper-box" >
					<swiper-item @click="previewImage(shopPeripheryImg.length>0? shopPeripheryImg : ['../../static/store.jpg'],index)" v-for="(item ,index) in shop.shopPeripheryImg? shop.shopPeripheryImg.split(',') : ['../../static/store.jpg']" :key="index">
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
					<text>{{shop.shopName || '-'}}</text>
					<view class="btn" v-if="property.directLease">
						<view class="btnBox">平台直租</view>
					</view>
					<view class="btn" v-else>
						<view class="btnBox">非平台直租</view>
						<view class="btnDes">请谨慎交易</view>
					</view>
				</view>
				<view class="shop-id">
					编号：{{ shop.shopNo || '-' }}
				</view>
				<view class="shop-rent">
					￥{{ shop.monthRent || '-'}}
					<text>元/月</text>
				</view>
			</view>
			<view class="title-tag" v-if="shop.label">
				<view color="#B2B2B2" v-if="item" class="tag-item" v-for="(item, index) in shop.label ? shop.label.split(' ') : []" :key="index">{{ item }}</view>
			</view>
			
		</view>
		<view class="shop-position" @click="goMap(latitude, longitude, shop.shopName)">
			<view class="content">
				<view class="icon" />
				<view class="label">
					<view class="project" v-if="projectName" @click="toProject(projectId)">
						<view class="name">
							{{projectName}} 
						</view>
						<text>查看商场所有店铺</text>
					</view>
					<view class="title">
						{{shop.detailLocation}}
					</view>
					<!-- <text>{{shop.addrPcas}}</text> -->
				</view>
				<view class="look">
					<van-icon name="location" color="#BFBFBF"/>
					<text>查看</text>
				</view>
			</view>
			<view class="time">
				更新时间：{{shop.createTime || '-'}}
			</view>
		</view>
		<view class="shop-info">
			<van-tabs class="tab" :active="active" @change="onChange" color="#1476FD" title-active-color="#1476FD" line-width="50rpx">
			  <van-tab title="商铺概况">
				  <view class="info">
					  <view class="item">
					  	<view class="label">
					  		每月租金
					  	</view>
					  	<view class="value">
					  		{{shop.monthRent || '-'}}元/月
					  	</view>
					  </view>
				  	<view class="item">
				  		<view class="label">
				  			计租面积
				  		</view>
						<view class="value">
							{{shop.measureArea || '-'}}m²
						</view>
				  	</view>
					
					<view class="item">
						<view class="label">
							租金单价
						</view>
						<view class="value">
							{{(shop.monthRent/shop.measureArea).toFixed(2)}}元/m²/月
						</view>
					</view>
					<view class="item">
						<view class="label">
							套内面积
						</view>
						<view class="value">
							{{property.insideArea || '-'}}m²
						</view>
					</view>
					<view class="item">
						<view class="label">
							使用比率
						</view>
						<view class="value" v-if="property.insideArea && shop.measureArea">
							{{(property.insideArea/shop.measureArea).toFixed(2)}}
						</view>
						<view class="value" v-else>
							-
						</view>
					</view>
					<view class="item">
						<view class="label">
							所在区域
						</view>
						<view class="value">
							{{shop.addrPcas || "-"}}
						</view>
					</view>
					<view class="item">
						<view class="label">
							物业类型
						</view>
						<view class="value">
							{{shop.propertyType || '-'}}
						</view>
					</view>
					<view class="item">
						<view class="label">
							所在楼层
						</view>
						<view class="value">
							{{property.floorNum || '-'}}层
						</view>
					</view>
					
					<view class="item" >
						<view class="label">
							推荐业态
						</view>
						<view class="value">
							{{shop.businessType || '-'}}
						</view>
					</view>
					<view class="cell" @click="transactionShow = !transactionShow">
						<view class="label">
							交易信息
						</view>
						<van-icon name="play" :class="transactionShow ? 'down' : 'up'"/>
					</view>
					<view class="transaction-info" v-show="transactionShow">
						
						
						<view class="item">
							<view class="label">
								支付方式
							</view>
							<view class="value">
								{{property.payMode || '-'}}
							</view>
						</view>
						<view class="item">
							<view class="label">
								租金递增
							</view>
							<view class="value">
								{{property.rentIncrease || '-'}}
							</view>
						</view>
						<view class="item">
							<view class="label">
								免租期限
							</view>
							<view class="value">
								{{shop.freeTenancy || '-'}}个月
							</view>
						</view>
						<view class="item">
							<view class="label">
								转让费用
							</view>
							<view class="value">
								{{property.transferFee || '-'}}元
							</view>
						</view>
						<view class="item">
							<view class="label">
								管理费用
							</view>
							<view class="value">
								{{property.taxRate || '-'}}元
							</view>
						</view>
						
						
					</view>
					<view class="cell" @click="engineeringShow = !engineeringShow">
						<view class="label">
							工程参数
						</view>
						<van-icon name="play" :class="engineeringShow ? 'down' : 'up'"/>
					</view>
					<view class="engineering-info" v-show="engineeringShow">
						
						<view class="item">
							<view class="label">
								楼层层高
							</view>
							<view class="value">
								{{property.floorHeight || '-'}}m
							</view>
						</view>
						<view class="item">
							<view class="label">
								楼层开间
							</view>
							<view class="value">
								{{property.bayWidth || '-'}}m
							</view>
						</view>
						<view class="item">
							<view class="label">
								楼层进深
							</view>
							<view class="value">
								{{property.depthLength || '-'}}m
							</view>
						</view>
						<view class="item">
							<view class="label">
								商铺柱距
							</view>
							<view class="value">
								{{property.columnSpacing || '-'}}m
							</view>
						</view>
						<view class="item">
							<view class="label">
								水务费用
							</view>
							<view class="value">
								{{property.waterRate || '-'}}元/m³
							</view>
						</view>
						<view class="item">
							<view class="label">
								电务费用
							</view>
							<view class="value">
								{{property.powerRate || '-'}}元/KWh
							</view>
						</view>
						<view class="item">
							<view class="label">
								供电总量
							</view>
							<view class="value">
								{{property.totalPowerSupply || '-'}}KW
							</view>
						</view>
						<view class="item">
							<view class="label">
								燃气供量
							</view>
							<view class="value">
								{{property.gasSupply || '-'}}m³/h
							</view>
						</view>
						<view class="item">
							<view class="label">
								排烟总量
							</view>
							<view class="value">
								{{property.smokeExhaust || '-'}}m³/h
							</view>
						</view>
						<view class="item">
							<view class="label">
								新风总量
							</view>
							<view class="value">
								{{property.totalFreshAir || '-'}}m³/h
							</view>
						</view>
						<view class="item">
							<view class="label">
								给水口径
							</view>
							<view class="value">
								{{property.waterSupplyCaliber || '-'}}DN
							</view>
						</view>
						<view class="item">
							<view class="label">
								排污口径
							</view>
							<view class="value">
								{{property.dischargeCaliber || '-'}}DN
							</view>
						</view>
					</view>
				  </view>
			  </van-tab>
			  <van-tab title="市调报告">
				  	<view class="info">
						
				  		<view class="uni-common-mt" style="font-size: 30rpx; color: #6A6A6A;">
							<rich-text :nodes="shop.marketReport || '暂无市场调研报告'"></rich-text>
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
			  v-for="(item, index) in shop.supportEquList"
			  :key="index"
			>
			  <view class="facilities-icon">
				<image :src="item.src" mode=""></image>
			  </view>
			  <text>{{ item.name }}</text>
			</view>
		  </view>
		</view>
		
	
		
		<!-- 认证信息 -->
		<view class="attestation" v-if="property.directLease==1">
			<view class="title">
				商铺认证
			</view>
			<view class="content">
				<view class="attestation-title">
					商铺信息
				</view>
				<view class="attestation-explain">
					该店铺信息经由商易租工作人员实地勘察，数据准确有效
				</view>
				<view class="attestation-info">
					<view class="info-item" v-for="(item, index) in attestationList" :key="index">
						<view class="info-icon">
							<image :src="item.src" mode=""></image>
						</view>
						<text>{{ item.name }}</text>
					</view>
				</view>
				<view class="attestation-user" >
					实勘顾问：{{shop.contactUsername}}
				</view>
			</view>
		</view>

		<view class="warnning">
			<view class="title">
				交易须知
			</view>
			<view class="content">
				<text>1、“商易租”不对任何脱离平台的租赁签约进行交易保障，切勿与业务员个人私下进行无交易保障的租赁签约。</text>
				<text>2、“商易租”在提供租赁服务过程中，不会向受让方（承租人）收取任何费用，如“商易租”方人员提出收费要求或已发生收费行为的，请拨打官方客服电话400 885 8319举报。已发生的收费行为一经查实，平台将协助追索。</text>
				<text>3、“商易租”仅帮助出让方（意向出租人）公开展示并传播交易标的的信息，意向受让方（意向承租人）务必在交易前对标的进行实地查勘，对标的物的具体情况自行查看。如因此产生的纠纷“商易租”均不承担任何法律责任和赔偿义务。</text>
			</view>
		</view>
		<!-- 猜你喜欢 -->
		<view class="store" >
			<view class="store-header">推荐商铺</view>
			<view class="store-list">
				<StoreCard v-for="(item,index) in guessYouLikeList.slice(3, 8)" :sourceData="item" :lastLine="index==2" :key="item" />
			</view>
		</view>
		<!-- 预约 -->
		<view class="foot">
			<view class="store-hot">
				
			</view>
			<view class="btns">
				<view class="btns-collection">
					<view class="collection" @click="ajaxAddCollect(shop.shopNo)">
						<van-icon name="like-o" color="#1576FE" size="40rpx" />
						<text>收藏</text>
					</view>
					<van-button plain  class="share" size="large"  icon="share-o" id="shareShop" color="#1576FE" open-type="share">分享</van-button>
				</view>
				<view class="buttonBox" v-if="property.directLease"  @click="toSubscribe(shop.shopNo, shop.streetCode)">
					<view class="button" >预约看铺</view>
				</view>
				<view class="buttonBox" v-else @click="makePhoneCall(shop.contactMobile)">
					<view class="button" >预约看铺</view>
				</view>
				
			</view>
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import StoreCard from '../../components/Card/Store'
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	import {getShopDetail,getSubscribeAdd,getCollectAdd,getShareAdd,getGuessYouLike,bMapToQQMap} from "../../utils/api.js"
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	export default {
		components: {
			StoreCard,
			uniSwiperDot
		},
		data() {
			return {
				tabList: [
					{ name: '平面图', code: 0 },
					{ name: '门面图', code: 1 },
					{ name: '室内图', code: 2 },
					{ name: '外立面', code: 3 },
					
				],
				// 图片切换
				tabActive: 0,
				// tab切换
				active: 0,
				transactionShow: true,
				engineeringShow: true,
				// 轮播图
				info: [],
				mode: 'nav',
				
				tagList: ['临近地铁', '临近学校', '居民密集区', '无进场费'],
				// facilitiesList: ['上下水', '排油烟', '独立卫生间', '中央空调'],
				
				latitude: "",
				longitude: "",
				bigPhotos:[],
				signBoardImg:[],//店招
				shopInsideImg:[],//内部
				shopPeripheryImg:[],//周边

				facilitiesList: [
					{name: '外摆', src: '../../static/images/external-pendulum.png'},
					{name: '空调', src: '../../static/images/air-conditioner.png'},
					{name: '停车场', src: '../../static/images/parking-lot.png'},
					{name: '网络', src: '../../static/images/network.png'},
				],
				
				attestationList: [
					{name: '实地测量', src: '../../static/images/measure.png'},
					{name: '实地拍摄', src: '../../static/images/shooting.png'},
					{name: '实地勘察', src: '../../static/images/survey.png'}
				],
				
				shop:[],//商铺信息
				property:[],//店铺信息
				guessYouLikeList:[],
				
				supportingEquipmentList:[],
				propertyTypeList:[],
				
				projectId: "",
				projectName: "",
			}
		},
		onLoad(paras) {
			console.log(paras)
			console.log(this.location.longitude+":"+this.location.latitude)
			//如果有项目ID
			if(paras.shopNo){
				this.getDetail(paras.shopNo);
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
			
			//猜你喜欢
			this.ajaxGetGuessYouLike();
		},
		methods:{
			selectTab(index) {
				this.tabActive = index
				console.log('tabActive', index)
			},
			onChange(e) {
				console.log(e.detail)
			},

			goMap(latitude, longitude, shopName) {
				//var latitude = "22.525811";
				//var longitude = "113.935388";
				uni.navigateTo({
					url: `../Map/mapDetail?latitude=${latitude}&longitude=${longitude}&shopName=${shopName}`
				})
			},
			//ajax查询商铺信息查询
			getDetail(shopNo){
				
				var that = this;
				const paras = {
					shopNo:shopNo
				};
				paras.accessToken = that.accessToken;
				const toast = Toast.loading({
				  message: '加载中...',
				  forbidClick: true,
				  loadingType: 'spinner',
				});
				getShopDetail(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						setTimeout(() => {
							Toast.clear();
						}, 300)
						that.shop = data.data.shop;
						that.property = data.data.property;
						
						that.projectId = data.data.projectId;
						that.projectName = data.data.projectName;
						
						let mapArr = bMapToQQMap(that.shop.longitude || that.location.longitude,that.shop.latitude || that.location.latitude)
						that.latitude = mapArr[1];
						that.longitude = mapArr[0];
						
						var infoPhotos = that.shop.shopPhotos.split(",");
						var signBoardImg = that.shop.signBoardImg.split(",");
						var shopInsideImg = that.shop.shopInsideImg.split(",");
						var shopPeripheryImg = that.shop.shopPeripheryImg.split(",");
						
						that.bigPhotos = [];
						that.signBoardImg=[];
						that.shopInsideImg=[];
						that.shopPeripheryImg=[];
						
						infoPhotos.forEach((item)=>{
							var _index = item.lastIndexOf(".");
							var bigPhoto = item.slice(0,_index)+"_thumb"+item.slice(_index)
							that.bigPhotos.push(bigPhoto);
						})
						
						signBoardImg.forEach((item)=>{
							var _index = item.lastIndexOf(".");
							var bigPhoto = item.slice(0,_index)+"_thumb"+item.slice(_index)
							that.signBoardImg.push(bigPhoto);
						})
						
						shopInsideImg.forEach((item)=>{
							var _index = item.lastIndexOf(".");
							var bigPhoto = item.slice(0,_index)+"_thumb"+item.slice(_index)
							that.shopInsideImg.push(bigPhoto);
						})
						
						shopPeripheryImg.forEach((item)=>{
							var _index = item.lastIndexOf(".");
							var bigPhoto = item.slice(0,_index)+"_thumb"+item.slice(_index)
							that.shopPeripheryImg.push(bigPhoto);
						})
						
						//console.log(that.bigPhotos)
						
						that.Dict.property_type.forEach((item)=>{
							if(that.shop.propertyType == item.itemValue){
								that.shop.propertyType = item.itemText;
							}
						})
						
						
						//配套需求字段
						const _supportEqu = that.shop.supportEqu.split(",");
						that.shop.supportEquList = [];
						that.supportingEquipmentList.forEach((item)=>{
							if(_supportEqu.includes(item.name)){
								that.shop.supportEquList.push({ 
									name: item.name, 
									src: "../../static/images/icon_support_"+item.value+".png" 
								})
							}
						})
						
						
						that.propertyTypeList.forEach((item)=>{
							if(that.shop.propertyType == item.value){
								that.shop.propertyType = item.name
							}
						})
						
					}else{
						Toast.fail(data.message);
						
					}
					
				})
				.catch(error => {
					Toast.fail(this.global.error);
				});
			},
			
			//项目信息和旗下的物业列表
			toProject(id){
				uni.navigateTo({
					url: "../ShoppingMall/project?projectId="+id
				})
			},
			
			toSubscribe(shopNo, streetCode){
				uni.navigateTo({
					url: `../Shops/appointment?shopNo=${shopNo}&streetCode=${streetCode}`
				})
			},
			
			goStoreMaket(marketReport) {
				uni.navigateTo({
					url: "./storeMarket?marketReport="+marketReport
				})
			},
			
			//猜你喜欢
			ajaxGetGuessYouLike(){
				//ajax个人信息查询
				var that = this;
				const paras = {
					cityCode:this.$Localtion.city.cityCode,
					pageNo:1,
					pageSize:10,
				};
				paras.accessToken = that.accessToken;
				getGuessYouLike(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						that.guessYouLikeList = data.data;
					}else{
						
					}
				})
				.catch(error => {
				
				});
			},
			
			
			ajaxAddCollect(shopNo){
				
				var that = this;
				const paras = {
					shopNo:shopNo,
					appUid:this.userDetail.id,
					type:1,
					
				};
				paras.accessToken = that.accessToken;
				
				getCollectAdd(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						Toast.success('收藏成功');
					
					}else{
						Toast.fail(data.message);
						
					}
					
				})
				.catch(error => {
					Toast.fail(this.global.error);
				});
			},
			
			previewImage(urls,index){
				
				
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
			
			onShareAppMessage(res) {
				console.log(res)
				var type = res.target.id;
				var that = this;
				
				
			
				
				var para={
					shopNo:this.shop.shopNo,
					type:type,
					appUid:this.userDetail.id,
					callBackUrl:"/pages/Shops/shopDetails?shopNo=" + this.shop.shopNo
				}
				return {
					title: '分享商铺-'+this.shop.shopName,
					path: "/pages/Shops/shopDetails?shopNo=" + this.shop.shopNo,
					//path: '/pages/login/login?para='+JSON.stringify(para),
				}
				
			    
			},
			ajaxAddShare(shopNo){
				
				var that = this;
				const paras = {
					shopNo:shopNo,
					appUid:this.userDetail.id,
					type:1,
					
				};
				paras.accessToken = that.accessToken;
				
				getShareAdd(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						Toast.success('分享成功');
					
					}else{
						Toast.fail(data.message);
						
					}
					
				})
				.catch(error => {
					Toast.fail(this.global.error);
				});
			},
			
			
		}
	}
</script>

<style lang="scss" scoped>

	.v-shop-details {
		padding-bottom: 120rpx;
		
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
					color: #FFFFFF;
					margin-right: 34rpx;
				}
				.active {
					background: #FFFFFF;
					color: #302f2c;
					border-radius: 20rpx;
				}
			}
		}
		
		.shop-name {
			background-color: #fff;
			padding: 47rpx 26rpx 40rpx;
			position: relative;
			top: -25rpx;
			border-radius: 25rpx 25rpx 0 0;
			
			.header {
				.title {
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					text {
						color: #302F2C;
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
				
				.shop-id {
					font-size: 20rpx;
					color: #9B9B9B;
					margin-top: 10rpx;
				}
				
				.shop-rent {
					font-size: 46rpx;
					color: #FE2A4D;
					
					text {
						font-size: 30rpx;
					}
				}
			}
		
			.title-tag {
				display: flex;
				flex-wrap: wrap;
				
				.tag-item {
					margin-top: 20rpx;
					margin-right: 20rpx;
					color: #1476FD;
					font-size: 24rpx;
					background-color: #F0F0F0;
					padding: 4rpx 22rpx;
					border-radius: 5rpx;
				}
			}
			
		}
		
		.shop-position {
			padding: 0 36rpx;
			.content {
				border: 1px solid #C9C8C8;
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
					.project {
						width: 212rpx;
						text-align: center;
						border-right: 1px solid #C9C8C8;
						padding: 0 8rpx;
						
						.name {
							font-size: 28rpx;
							line-height: 36rpx;
							color: #252525;
						}
						text {
							font-size: 24rpx;
							line-height: 36rpx;
							color: #BFBFBF;
						}
					}
					.title {
						flex: 1;
						font-size: 20rpx;
						line-height: 36rpx;
						color: #6A6A6A;
						padding: 0 16rpx;
						display: flex;
						align-items: center;
					}
					text {
						font-size: 24rpx;
						line-height: 36rpx;
						color: #6A6A6A;
					}
				}
				
				.look {
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					align-items: center;
					
					text {
						font-size: 20rpx;
						color: #BFBFBF;
					}
				}
			}
			
			.time {
				margin-top: 15rpx;
				text-align: right;
				font-size: 20rpx;
				color: #A1A1A2;
			}
		}
		
		.shop-info {
			padding: 48rpx 0;
			/deep/ .tab{
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
				border-top: 1px solid #EFF0EF;
				
				.item {
					display: flex;
					margin-bottom: 8rpx;
					font-size: 30rpx;	
					
					.label {
						width: 150rpx;
						color: #6A6A6A;
					}
					
					.value {
						color: #252525;
					}
				}
				
				.cell {
					display: flex;
					align-items: center;
					margin: 30rpx 0;
					color: #1476FD;
					
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
		}
		
		.facilities {
			padding: 0 36rpx;
			.title {
				font-size: 36rpx;	
				color: #474A4C;
				margin-bottom: 36rpx;
			}

			.content {
				background: #F4F4F4;
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
				border: 1px solid #1676FE;
				padding: 18rpx 23rpx 18rpx 34rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-radius: 5rpx;
				
				text {
					color: #1676FE;
					font-size: 36rpx;
				}
			}
		}
		
		.attestation {
			padding: 42rpx 36rpx;
			background-color: #fff;
			
			.title {
				font-size: 36rpx;	
				color: #474A4C;
				margin-bottom: 36rpx;
			}
			
			.content {
				background: #1476FD;
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
			padding: 0 36rpx;

			.title {
				font-size: 36rpx;	
				color: #474A4C;
				margin-bottom: 36rpx;
			}

			.content {
				
				box-sizing: border-box;
				background: #E6E9F0;
				border-radius: 10rpx;
				padding: 40rpx 30rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				text {
					font-size: 22rpx;
					line-height: 30rpx;
					color: #7F8589;
				}
			}
		}
		
		.store {
			padding: 42rpx 36rpx;
			.store-header {
				font-size: 36rpx;	
				color: #474A4C;
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
						background-color: #fff;
						border: none;
						
						text {
							color: #1576FE;
							margin-left: 15rpx;
						}
						/deep/.van-button--large{
							border: none;
						}
					}
				}
				
				.buttonBox {
					padding: 20rpx;
				
					.button {
						padding: 17rpx 68rpx;
						color: #fff;
						background: #1576FE;
						border-radius: 5rpx;
						font-size: 28rpx;
					}
				}
			}
		}
	}
</style>
