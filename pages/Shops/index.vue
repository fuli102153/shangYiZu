<template>
	<view class="v-shops">
		<van-sticky>
			<view class="header">
				<view class="location" @click="showPopup">
					<van-icon name="location" class="location-icon" color="#2B2B2B" size="30rpx" />
					<text>{{localtionCity.cityName}}</text>
					<van-icon name="play" class="arrow" color="#2B2B2B" size="17rpx" />
				</view>
				<view class="search">
					<van-search v-model="value" shape="round"  placeholder="搜索店铺名" @search="onSearch" />
				</view>
				<van-icon name="phone" color="#2B2B2B" class="phone" @click="makePhoneCall(Configs.service_phone)" />
				<van-dialog id="van-dialog" />
			</view>
			<!-- 地址弹出层 -->
			<van-popup :show="locationShow" @close="onClose" position="top" round custom-style="max-height: 60%;">
				<van-cell-group class="city">
					<van-cell v-for="(item, index) in cityList" :key="index" center :label="item.cityName" :title="index === 0 ? '已开通城市' : ''"
					 :class="activeCity === index ? 'active' : ''" @click="selectCity(index, item)">
						<template #right-icon>
							<van-icon v-if="activeCity === index" name="success" color="#1676FE" />
						</template>
					</van-cell>
				</van-cell-group>
			</van-popup>
			<van-dropdown-menu>
				<van-dropdown-item title="业态" id="type" :style="{display: typeShow ? 'block' : 'none'}" @close="typeShow=false" @open="typeShow=true">
					<van-tree-select height="100vw" max="10" :items="typeList" :main-active-index="typeActiveIndex" :active-id="paras.shopCategoryIds"
					 selected-icon="success" @click-nav="onClickType" @click-item="onClickTypeItem" />
					 <view class="btn">
					 	<view class="clear" @click="clearTypeSelect">
					 		清除选项
					 	</view>
					 	<view class="submit" @click="submitTypeSelect">
					 		完成
					 	</view>
					 </view>
				</van-dropdown-item>
				<van-dropdown-item title="区域" :style="{display: areaShow ? 'block' : 'none'}" @close="areaShow=false" @open="areaShow=true">
					<van-tree-select height="100vw" max="10" :items="AreaStreets" :main-active-index="mainActiveIndex" :active-id="paras.streetId"
					 selected-icon="success" @click-nav="onClickNav" @click-item="onClickItem" />
				</van-dropdown-item>
				<van-dropdown-item title="物业"  :style="{display: propertyShow ? 'block' : 'none'}" @close="propertyShow=false"
				@open="propertyShow=true" :options="propertyList" @change="changePropertyType"></van-dropdown-item>
				
				<van-dropdown-item title="面积" id="area" :value="activeArea" :style="{display: measureShow ? 'block' : 'none'}" @close="measureShow=false" @open="measureShow=true"
				 :options="searchAreaList" @change="changeAreaRent">
					<view class="slider">
						<slider-range
						  :value="rangeValue"
						  :min="0"
						  :max="1000"
						  :step="1"
						  :bar-height="3"
						  :block-size="18"
						  background-color="#CCCCCC"
						  border-color="#1476FD"
						  active-color="#1476FD"
						  :format="format"
						  :decorationVisible="false"
						  @change="handleRangeChange"
						></slider-range>
					</view>
					<view class="btn">
						<view class="clear" @click="clearSelect">
							取消
						</view>
						<view class="submit" @click="submitSelect">
							完成
						</view>
					</view>
				 </van-dropdown-item>
			</van-dropdown-menu>
			<!--<SelectHeader @onChangeMit="onChangeMit"></SelectHeader>-->
		</van-sticky>
		<view class="store-list">
			<van-empty v-if="shopList.length==0" description="暂无数据" />
			<StoreCard v-for="(item,index) in shopList" :sourceData="item" :key="index"  />
			<view class="loading" v-if="0">
				<van-loading  size="24px">{{loadMoreText}}</van-loading>
			</view>
			<view class="loading" v-else-if="false">
				{{loadMoreText}}
			</view>
		</view>
		<van-popup 
			:show="isShowPop" 
			:overlay="false" 
			:z-index="90"
			custom-style="width: 675rpx; border-radius: 15rpx; box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2); top: 310rpx" 
			@close="onSelectClose">
			<view class="select-content">
				<text>已选条件：</text>
				<view class="item" v-if="paras.shopCategoryNames && paras.shopCategoryNames.length > 0">
					<text class="label">
						业态：
					</text>
					<view class="list">
						<text class="txt" v-for="(item, index) in Object.keys(typeListData)" :key="index">
							<text v-if="typeListData[item] && typeListData[item].length > 0">
								<text>{{ item }} </text>
								<text> > </text>
								<text v-for="(val, idx) in typeListData[item]" :key="idx"> {{idx === 0 ? '' : '、'}}{{ val }}</text>
							</text>
						</text>
						；
					</view>
				</view>
				<view class="item" v-if="paras.streetId">
					<text class="label">
						区域：
					</text>
					<text class="txt">{{paras.streetName}}</text>
				</view>
				<view class="item" v-if="paras.propertyType">
					<text class="label">
						物业：
					</text>
					<text class="txt">{{paras.propertyName}}</text>
				</view>
				<view class="item" v-if="paras.measureAreaEnd">
					<text class="label">
						面积：
					</text>
					<text class="txt">{{paras.measureAreaStart}}m²-{{paras.measureAreaEnd}}m²</text>
				</view>
			</view>
		</van-popup>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	/*
	品牌页的筛选条件 区域 类型 业态 面积 
	*商铺页的筛选条件 区域 类型 物业 面积
	购物中心内页的筛选条件 业态 楼层 租金 面积
	品牌内页的筛选条件 区域 品类 面积
	*/
	import StoreCard from "../../components/Card/Store";
	import Toast from "../../wxcomponents/vant/dist/toast/toast";
	import Dialog from "../../wxcomponents/vant/dist/dialog/dialog";
	import SliderRange from '../../components/slider-range/index.vue';
	import {
		getShopList,
		getAreaStreets,
		getCity,
		getPropertyFormAllData,
	} from "../../utils/api.js";

	export default {
		components: {
			StoreCard, SliderRange
		},
		data() {
			return {
				showSelect: true,
				locationShow: false,
				cityList: [],
				activeCity: "",
				value: "",
				mainActiveIndex: 0,
				typeActiveIndex: 0,
				
				localtionCity:{},

				AreaStreets: [],
				typeList:[],
				shopList: [],
				searchAreaList: [], //面积
				activeArea: '',
				
				propertyList:[],//物业
				monthRentList: [],
	
				propertyShow: false,
				monthShow: false,
				moreShow: false,
				areaShow: false,
				measureShow:false,
				typeShow: false,
				measureAreaEnd: "",
				measureAreaStart: "",

				sortActiveIndex: 0,
				sortActiveId: null,

		
				selectList: [],
				leaseTagList: [],
				leaseTagIndex: -1,
				selectLeaseList: [],
				otherTagList: [],
				otherTagIndex: -1,
				selectOtherList: [],
				reload: false,
				loadMoreText: "更多",
				paras: {
					shopName: "",
					label: "",
					distance: "",
					regionId: "",
					streetId: "",
					streetName: "",
					shopCategoryIds:[],
					shopCategoryNames: [],
					metroLine: "",
					monthRentStart: "",
					monthRentEnd: "",
					sort: "",
					floorNum: "",
					indentity: "",
					engineeringConditions: "",
					propertyType: "",
					propertyName: "",
					measureAreaStart: "",
					measureAreaEnd: "",
					longitude: "",
					latitude: "",
				},
				rangeValue: ['', ''],
				typeListItem: '',
				typeListData: {},
			};
		},
		computed: {
			isShowPop() {
				return !!(this.paras.shopCategoryNames.length > 0 || this.paras.streetId || this.paras.propertyType || this.paras.measureAreaEnd)
			}
		},
		onLoad(paras) {
			if(paras.keyword){
				this.value = paras.keyword;
				this.paras.shopName =  paras.keyword;
			}
			
			//请求品牌列表
			this.ajaxGetShopList();
			//城市列表
			this.ajaxGetCityList();
			//请求城市联动
			this.ajaxGetAreaStreets();
			//获取全部业态数据
			this.ajaxGetPropertyFormAllData();
			
			this.localtionCity = this.$Localtion.city;
			this.$forceUpdate();
		},
		onShow() {
			console.log(this.Dict.property_type);
			//把字典格式进行转换
			this.changeDict();
		},
		onReachBottom() {
			console.log("onReachBottom");
			this.loadMoreText = '更多';
			this.ajaxGetShopList();
		},
		onPullDownRefresh() {
			console.log("onPullDownRefresh");
			this.reload = true;
			this.reloadData();
		},
		methods: {
			onSelectClose() {
				this.showSelect = false
			},
			format(val) {
			  return val + 'm²'
			},
			handleRangeChange(e) {
			  this.rangeValue = e
			  this.paras.measureAreaStart = e[0];
			  this.paras.measureAreaEnd = e[1];
			},
			
			// 选中城市
			selectCity(index) {
				var that = this;
				this.activeCity = index;
				uni.setStorage({
					key: "__localtionCity__",
					data: this.cityList[index],
					success: (res) => {
						
						this.$Localtion.city  = this.cityList[index];
						this.localtionCity  = this.cityList[index];

						this.$forceUpdate();
						this.onClose();
						
						//请求品牌列表
						this.reloadData();
					},
					fail: () => {
						uni.showModal({
							title: '用户信息获取失败!',
							showCancel:false
						})
					}
				})
				
			},
			
			

			onClickItemNav(e) {
				this.sortActiveIndex = e.detail.index || 0;
			},
			onClickItemSort(e) {
				const sortActiveId =
					this.sortActiveId === e.detail.id ? null : e.detail.id;
				this.sortActiveId = sortActiveId;
				this.paras.sort = sortActiveId;
				console.log(this.paras.sort);
			},

			//转换格式
			changeDict() {
				this.propertyList = [{
					text: "不限",
					value: "",
				}];
				this.Dict.property_type.forEach((item)=>{
					this.propertyList.push({
						text: item.itemText, value: item.itemValue
					})
				})
				this.searchAreaList = [{
						text: "不限",
						value: "",
					}];
				this.Dict.search_area.forEach((item) => {
					this.searchAreaList.push({
						text: item.itemText,
						value: item.itemValue,
					});
				});
				this.monthRentList = [{
						text: "不限",
						value: "",
					}];
				this.Dict.search_month_rent.forEach((item) => {
					this.monthRentList.push({
						text: item.itemText,
						value: item.itemValue,
					});
				});
			},
			// 打开关闭弹出层
			showPopup() {
				this.locationShow = true;
			},
			onClose() {
				this.locationShow = false;
			},

			
			onSearch(e) {
				console.log(e.detail)
				let that = this;
				let history = []
				uni.getStorage({
					key: '__searchHistory__',
					success(res) {
						history = res.data
						history.push(e.detail)
						let newHistory = Array.from(new Set(history))
						console.log(newHistory)
						uni.setStorage({
							key: "__searchHistory__",
							data: newHistory,
						})
					},
					fail: () => {
						uni.setStorage({
							key: "__searchHistory__",
							data: [e.detail],
						})
					}
				})
				this.paras.shopName = e.detail;
				this.reloadData();
			},
			makePhoneCall: function(tel) {
				uni.makePhoneCall({
					phoneNumber: tel,
					success: () => {
						console.log("成功拨打电话");
					},
				});
			},

			changeMonthRent(e) {
				console.log(e);
				if(e.detail){
					let start = Number(e.detail.split("-")[0]) || 0;
					let end = Number(e.detail.split("-")[1]) || "";
					
					if(this.paras.monthRentStart != start || this.paras.monthRentEnd != end){
						this.paras.monthRentStart = start;
						this.paras.monthRentEnd = end;
						this.reloadData();
					}
				}else{
					this.paras.monthRentStart = "";
					this.paras.monthRentEnd = "";
					this.reloadData();
				}
				
				
			},
			
			changeAreaRent(e) {
				console.log(e, this.activeArea);
				
				if(e.detail){
					let start = Number(e.detail.split("-")[0]) || 0;
					let end = Number(e.detail.split("-")[1]) || "";
					
					if(this.paras.measureAreaStart != start || this.paras.measureAreaEnd != end){
						this.paras.measureAreaStart = start;
						this.paras.measureAreaEnd = end;
						this.rangeValue[0] = start;
						this.rangeValue[1] = end;
						this.reloadData();
					}
				}else{
					this.paras.measureAreaStart = "";
					this.paras.measureAreaEnd = "";
					this.rangeValue[0] = "";
					this.rangeValue[1] = "";
					this.reloadData();
				}
			},
			// 面积
			clearSelect() {
				this.selectComponent('#area').toggle();
			},
			submitSelect() {
				this.selectComponent('#area').toggle();
				this.reloadData();
			},
			// 业态
			clearTypeSelect() {
				this.paras.shopCategoryIds = [];
				this.paras.shopCategoryNames = [];
				this.selectComponent('#type').toggle();
				this.reloadData();
			},
			submitTypeSelect() {
				this.selectComponent('#type').toggle();
				this.reloadData();
			},

			changePropertyType(e) {
				console.log(e)
				let t = Number(e.detail) || "";
				if(this.paras.propertyType != t){
					this.paras.propertyType = t;
					this.paras.propertyName = this.propertyList.filter(item => item.value == t)[0].text
					this.reloadData();
				}
				
				
			},

			onClickLeft() {
				uni.navigateBack();
			},
			//左侧导航点击时，触发的事件
			onClickNav(e) {
				this.mainActiveIndex = e.detail.index || 0;
				let t = this.AreaStreets[this.mainActiveIndex].id;
				
				if(this.paras.regionId != t){
					this.paras.regionId = t;
					this.paras.streetId = "";
					this.reloadData();
				}
			},
			//右侧选择项被点击时，会触发的事件
			onClickItem(e) {
				// console.log(e)
				let t =	(this.paras.streetId === e.detail.id) ? null : e.detail.id;
				if(this.paras.streetId != t){
					this.areaShow = false;
					this.paras.streetId = t;
					this.paras.streetName = e.detail.text
					this.reloadData();
				}
			},
			
			
			//左侧导航点击时，触发的事件
			onClickType(e) {
				// console.log(1111, e)
				this.typeActiveIndex = e.detail.index || 0;
				let t = this.typeList[this.typeActiveIndex].id;
				if(t == ""){
					this.paras.shopCategoryIds = [];
					this.paras.shopCategoryNames = [];
					// this.reloadData();
				}
				this.typeListItem = this.typeList[this.typeActiveIndex].text
			},
			
			//右侧选择项被点击时，会触发的事件
			onClickTypeItem(e) {
				const index = this.paras.shopCategoryIds.indexOf(e.detail.id);
				if (index > -1) {
				  this.paras.shopCategoryIds.splice(index, 1);
				  this.paras.shopCategoryNames.splice(index, 1)
				} else {
				  this.paras.shopCategoryIds.push(e.detail.id);
				  this.paras.shopCategoryNames.push(e.detail.text);
				}
				console.log(2222, this.paras.shopCategoryNames, index)
				
				const list = this.typeListData[this.typeListItem] ? this.typeListData[this.typeListItem] : []
				const idx = list.indexOf(e.detail.text)
				if (idx > -1) {
					this.typeListData[this.typeListItem].splice(idx, 1)
				} else {
					this.typeListData[this.typeListItem] = [...list, e.detail.text]
				}
				console.log(3333, this.typeListData)
				// this.reloadData();	
			},

			
			
			reloadData(){
				this.shopList = [];
				this.ajaxGetShopList();
			},

			//商铺列表
			ajaxGetShopList() {
				//ajax个人信息查询
				uni.stopPullDownRefresh()
				var that = this;
				//that.shopList = [];
				
				if (this.shopList.length>0) {
					//说明已有数据，目前处于上拉加载
					this.loadMoreText = '加载中';
					this.paras.pageNo = Math.floor(this.shopList.length/this.paras.pageSize)+1;
					this.paras.pageSize = 10;
					//判断是否要需要请求
					if(parseInt(this.shopList.length%this.paras.pageSize) !== 0){ 
						this.loadMoreText = '没有更多';
						return;
					}
					
				}else{
					this.paras.pageNo = 1;
					this.paras.pageSize = 10;
				}
				
				const paras = {
					
					cityCode:this.$Localtion.city.cityCode,
					// shopCategoryIds:this.paras.shopCategoryIds.join("|"),
					shopCategoryNames: this.paras.shopCategoryNames.join("|"),
					shopName:this.paras.shopName,
					label:this.paras.label,
					distance:this.paras.distance,
					regionCode:this.paras.regionId,
					streetCode:this.paras.streetId,
					metroLine:this.paras.metroLine,
					monthRentStart:this.paras.monthRentStart,
					monthRentEnd:this.paras.monthRentEnd,
					sort: this.paras.sort,
					floorNum: this.paras.floorNum,
					indentity: this.paras.indentity,
					engineeringConditions: this.paras.engineeringConditions,
					propertyType: this.paras.propertyType,
					measureAreaStart: this.paras.measureAreaStart,
					measureAreaEnd: this.paras.measureAreaEnd,
					//longitude:this.location.longitude,
					//latitude:this.location.latitude,
					pageNo: this.paras.pageNo ,
					pageSize: this.paras.pageSize,
				};

				paras.accessToken = that.accessToken;
				const toast = Toast.loading({
					message: "加载中...",
					forbidClick: true,
					loadingType: "spinner",
				});
				getShopList(paras)
					.then((res) => {
						const data = res.data;
						console.log(data);

						if (data.code == "200") {
							setTimeout(() => {
								Toast.clear();
							}, 300)
							
							let list = that.setTime(data.data);
							that.shopList = that.reload ? list : that.shopList.concat(list);
							that.reload = false;
						} else {
							Toast.fail(data.message);
						}
					})
					.catch((error) => {
						that.reload = false;
						Toast.fail(this.global.error);
					});
			},
			
			setTime: function(items) {
				var newItems = [];
				items.forEach(e => {
					newItems.push(e);
				});
				return newItems;
			},
			
			

			ajaxGetCityList() {
				var that = this;
				const paras = {};
				paras.accessToken = that.accessToken;

				getCity(paras)
					.then((res) => {
						const data = res.data;

						console.log(data);
						if (data.code == "200") {
							that.cityList = data.data;
							
						} else {}
					})
					.catch((error) => {});
			},

			//城市联动
			ajaxGetAreaStreets() {
				//ajax个人信息查询
				var that = this;
				const paras = {
					cityCode: this.$Localtion.city.cityCode,
				};
				paras.accessToken = that.accessToken;

				getAreaStreets(paras)
					.then((res) => {
						const data = res.data;
						console.log(data);

						if (data.code == "200") {
							that.AreaStreets = [{
								id:"",
								text:"不限",
								children:[]
							}];
							data.data.forEach((item) => {
								let area = {};
								area.id = item.areaCode;
								area.text = item.areaName;
								area.children = [{
									id:"",
									text:"不限",
									children:[]
								}];
								item.streetVoList.forEach((street) => {
									let streetItem = {};
									streetItem.id = street.streetCode;
									streetItem.text = street.streetName;
									streetItem.children = [];
									area.children.push(streetItem);
								});
								that.AreaStreets.push(area);
							});
							that.$forceUpdate();
							console.log(that.AreaStreets);
						} else {}
					})
					.catch((error) => {});
			},
			
			
			ajaxGetPropertyFormAllData() {
				//ajax个人信息查询
				var that = this;
				const paras = {
					
				};
				paras.accessToken = that.accessToken;

				getPropertyFormAllData(paras)
					.then((res) => {
						const data = res.data;
						console.log(data);

						if (data.code == "200") {
							that.typeList = [{
								id:"",
								text:"不限",
								children:[]
							}];
							data.data.forEach((item) => {
								
								
								item.children && item.children.forEach((street) => {
									if(street.name!="全部"){
										let area = {};
										area.id = street.id;
										area.text = street.name;
										area.children = [];
										
										street.children && street.children.forEach((three) => {
											let streetItem = {};
											streetItem.id = three.id;
											streetItem.text = three.name;
											area.children.push(streetItem);
										})		
										that.typeList.push(area);
									}
									
								});
								
								
								
								
							});
							that.$forceUpdate();
							console.log(that.typeList)
						} else {}
					})
					.catch((error) => {});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.v-shops {
		min-height: 100vh;

		.header {
			padding: 0rpx 24rpx;
			display: flex;
			background-color: #ffffff;
			.location {
				width: 160rpx;
				font-size: 30rpx;
				color: #2B2B2B;
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
				flex: 1;
			}

			.phone {
				margin-left: 20rpx;
			}
		}

		.van-popup {
			background-color: #f5f8fa;

			.city {
				margin-top: 10rpx;

				.van-cell__title {
					>span {
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

		.region {
			display: flex;

			.van-list {
				flex: 1;
			}
		}
		
		.slider {
			box-sizing: border-box;
			padding: 0 36rpx;
		}
		
		.btn {
			padding: 0 36rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100rpx;
			
			.clear {
				height: 60rpx;
				flex: 1;
				color: #1476FD;
				font-size: 26rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.submit {
				height: 60rpx;
				flex: 1;
				color: #fff;
				font-size: 26rpx;
				background: #1476FD;
				border-radius: 25rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.store-list {
			padding: 0 36rpx;
			.loading{
				text-align: center;
				padding: 20rpx;
				font-size: 28rpx;
				color: #969799;
			}
		}
	}

	.month-rent {
		padding: 25rpx 40rpx;
		display: flex;
		align-items: center;

		.label {
			font-size: 28rpx;
			color: #000000;
			margin-left: 16rpx;
		}

		.content {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.start {
				width: 220rpx;
				height: 53rpx;
				margin: 0 30rpx;
				border: 1rpx solid #b2b2b2;
				border-radius: 4rpx;
				display: flex;
				align-items: center;
				padding: 0 20rpx;
				box-sizing: border-box;

				input {
					flex: 1;
				}

				text {
					font-size: 26rpx;
					color: #2d2d2d;
				}
			}

			.end {
				margin-right: 0;
			}
		}
	}

	.hot {
		background-color: #fff;
		padding: 0 26rpx 40rpx;

		.title {
			font-size: 28rpx;
			color: #000000;
			margin-left: 16rpx;
		}

		.hot-tag {
			display: flex;
			flex-wrap: wrap;

			.tag-item {
				margin-top: 10rpx;
				margin-right: 10rpx;
				border: 1rpx solid #2d2d2d;
				color: #2d2d2d;
				font-size: 26rpx;
				line-height: 26rpx;
				padding: 15rpx 24rpx;
				border-radius: 4rpx;
			}

			.active {
				color: #fff;
				background-color: #1676fe;
				border: 1rpx solid #1676fe;
			}
		}
	}
	
	.select-content {
		padding: 23rpx 28rpx;
		
		text {
			font-size: 26rpx;
			line-height: 36rpx;
		}
		.item {
			font-size: 22rpx;
			display: flex;
			.label {
				color: #1476FD;
				width: 85rpx;
			}
			.list {
				flex: 1;
			}
			.txt {
				flex: 1;
				color: #666666;
			}
		}
	}
</style>
