<template>
	<view class="v-brand">
		<van-sticky>
			<view class="header">
				<view class="location" @click="showPopup">
					<van-icon name="location" class="location-icon" color="#2B2B2B" size="30rpx" />
					<text>{{localtionCity.cityName}}</text>
					<van-icon name="play" class="arrow" color="#2B2B2B" size="17rpx" />
				</view>
				<view class="search">
					<van-search
					  :value="value"
					  shape="round"
					  placeholder="搜索品牌名"
					/>
				</view>
				<van-icon name="phone" color="#2B2B2B" class="phone" />
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
				<van-dropdown-item title="业态" :style="{display: typeShow ? 'block' : 'none'}" @close="typeShow=false" @open="typeShow=true">
					<van-tree-select height="100vw" max="10" :items="typeList" :main-active-index="typeActiveIndex" :active-id="paras.shopCategoryIds"
					 selected-icon="success" @click-nav="onClickType" @click-item="onClickTypeItem" />
				</van-dropdown-item>
				<van-dropdown-item title="区域" :style="{display: areaShow ? 'block' : 'none'}" @close="areaShow=false" @open="areaShow=true">
					<van-tree-select height="100vw" max="10" :items="AreaStreets" :main-active-index="mainActiveIndex" :active-id="paras.streetId"
					 selected-icon="success" @click-nav="onClickNav" @click-item="onClickItem" />
				</van-dropdown-item>
				<van-dropdown-item title="物业"  :style="{display: propertyShow ? 'block' : 'none'}" @close="propertyShow=false"
				@open="propertyShow=true" :options="propertyList" @change="changePropertyType"></van-dropdown-item>
				
				<van-dropdown-item title="面积" :style="{display: measureShow ? 'block' : 'none'}" @close="measureShow=false" @open="measureShow=true"
				 :options="searchAreaList" @change="changeAreaRent"></van-dropdown-item>
			</van-dropdown-menu>
		</van-sticky>
		<view class="store-list">
			<van-empty v-if="brandList.length==0" description="暂无数据" />
			<BrandCard v-for="(item,index) in brandList" :sourceData="item" :key="index" />
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import BrandCard from '../../components/Card/Brand'
	import {getBrandList, 
		getAreaStreets,
		getCity,
		getPropertyFormAllData,} from "../../utils/api.js"
	import Toast from "../../wxcomponents/vant/dist/toast/toast";
	export default {
		components: {
			BrandCard
		},
		data() {
			return {
				brandList:[],
				locationShow: false,
				cityList: ["北京", "上海", "广州", "深圳"],
				activeCity: '',
				value: '',
				mainActiveIndex: 0,
				typeActiveIndex: 0,
				localtionCity:{},
				
				AreaStreets: [],
				typeList:[],
				shopList: [],
				searchAreaList: [], //面积
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
				sortList: [{
					text: "排序",
					id: null,
					children: [],
				}, ],
				sortActiveIndex: 0,
				sortActiveId: null,
				
				tagList: [],
				tagIndex: -1,
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
					shopCategoryIds:[],
					metroLine: "",
					monthRentStart: "",
					monthRentEnd: "",
					sort: "",
					floorNum: "",
					indentity: "",
					engineeringConditions: "",
					propertyType: "",
					measureAreaStart: "",
					measureAreaEnd: "",
					longitude: "",
					latitude: "",
				},
			}
		},
		onLoad() {
			//请求品牌列表
			this.ajaxGetBrandList();
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
			this.ajaxGetBrandList();
		},
		onPullDownRefresh() {
			console.log("onPullDownRefresh");
			this.reload = true;
			this.ajaxGetBrandList();
		},
		methods: {
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
				this.propertyList = [];
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
				console.log(e);
				if(e.detail){
					let start = Number(e.detail.split("-")[0]) || 0;
					let end = Number(e.detail.split("-")[1]) || "";
					
					if(this.paras.measureAreaStart != start || this.paras.measureAreaEnd != end){
						this.paras.measureAreaStart = start;
						this.paras.measureAreaEnd = end;
						this.reloadData();
					}
				}else{
					this.paras.measureAreaStart = "";
					this.paras.measureAreaEnd = "";
					this.reloadData();
				}
				
				
			},
			
			changePropertyType(e) {
				let t = Number(e.detail) || "";
				if(this.paras.propertyType != t){
					this.paras.propertyType = t;
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
				//console.log(e)
				let t =	(this.paras.streetId === e.detail.id) ? null : e.detail.id;
				if(this.paras.streetId != t){
					this.areaShow = false;
					this.paras.streetId = t;
					this.reloadData();
				}
			},
			
			
			//左侧导航点击时，触发的事件
			onClickType(e) {
				this.typeActiveIndex = e.detail.index || 0;
				let t = this.typeList[this.typeActiveIndex].id;
				if(t == ""){
					this.paras.shopCategoryIds = [];
					this.reloadData();
				}
				
			},
			//右侧选择项被点击时，会触发的事件
			onClickTypeItem(e) {
				//console.log(e)
			
				const index = this.paras.shopCategoryIds.indexOf(e.detail.id);
				if (index > -1) {
				  this.paras.shopCategoryIds.splice(index, 1);
				} else {
				  this.paras.shopCategoryIds.push(e.detail.id);
				}
				this.reloadData();	
			},
	
			reloadData(){
				this.shopList = [];
				this.ajaxGetBrandList();
			},
			
			setTime: function(items) {
				var newItems = [];
				items.forEach(e => {
					newItems.push(e);
				});
				return newItems;
			},
			//品牌列表
			ajaxGetBrandList(){
				//ajax个人信息查询
				var that = this;
				uni.stopPullDownRefresh()
				if (this.brandList.length>0) {
					//说明已有数据，目前处于上拉加载
					this.loadMoreText = '加载中';
					this.pageNo = Math.floor(this.brandList.length/this.pageSize)+1;
					this.pageSize = 10;
					//判断是否要需要请求
					if(parseInt(this.brandList.length%this.pageSize) !== 0){ 
						this.loadMoreText = '没有更多';
						return;
					}
				}else{
					this.pageNo = 1;
					this.pageSize = 10;
				}
				
				const paras = {
					cityCode:this.$Localtion.city.cityCode,
					shopCategoryIds:this.paras.shopCategoryIds.join("|"),
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
				getBrandList(paras).then(res => {
					const data = res.data;
					console.log(data.data.records);
					if(data.code == "200"){
						console.log(list)
						// toast.clear();
						let list = data.data.records;
						that.brandList = that.reload ? list : that.brandList.concat(list);
						that.reload = false;
						console.log('that.brandList', that.brandList, list, 111111111)
					} else {
						Toast.fail(data.message);
					}
				}).catch(error => {
					Toast.fail(this.global.error);
				});
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
								area.children = [];
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
		}
	}
</script>

<style lang="scss" scoped>
	.v-brand {
		
		.header {
			padding: 0rpx 24rpx;
			background: #ffffff;
			display: flex;
		
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

		.store-list {
			padding: 30rpx 25rpx;
			background-color: #fff;
		}
		.btn {
			display: flex;
			
			/deep/ .van-button {
				border-radius: 0;
			}
			
			.eliminate {
				flex: 1;
			}
			.determine {
				flex: 1;
				border-radius: 0;
			}
		}
	}
</style>
