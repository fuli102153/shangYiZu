<template>
	<view class="v-shops">
		<van-sticky>
			<view class="header">
				<view class="location" @click="showPopup">
					<van-icon name="location" class="location-icon" color="#fff" size="30rpx" />
					<text>深圳</text>
					<van-icon name="play" class="arrow" color="#fff" size="17rpx" />
				</view>
				<view class="search">
					<van-search
					  :value="value"
					  shape="round"
					  background="#1676fe"
					  placeholder="搜索店铺或区域"
					/>
				</view>
				<van-icon name="phone" color="#fff" class="phone" @click="makePhoneCall(Configs.service_phone)"/>
				<van-dialog id="van-dialog" />
			</view>
			<!-- 地址弹出层 -->
			<van-popup :show="locationShow" @close="onClose" position="top" round>
				<van-cell-group>
					<van-cell title="选择城市" value="" size="large" />
				</van-cell-group>
				<van-cell-group class="city">
					<van-cell center title="当前定位">
						<template #default>
							<van-button round plain hairline type="info" size="mini">手动定位</van-button>
						</template>
						<template #label>
							<van-icon name="location" class="location-icon" color="#1676fe" size="30rpx" />
							<span>深圳</span>
						</template>
					</van-cell>
					<van-cell v-for="(item, index) in cityList" :key="index" center :label="item.cityName" :title="index === 0 ? '已开通城市' : ''"
					 :class="activeCity === index ? 'active' : ''" @click="selectCity(index, item)">
						<template #right-icon>
							<van-icon v-if="activeCity === index" name="success" color="#1676FE" />
						</template>
					</van-cell>
				</van-cell-group>
			</van-popup>
			<van-dropdown-menu>
				<van-dropdown-item title="区域">
					<van-tree-select height="55vw" max="10" :items="AreaStreets" :main-active-index="mainActiveIndex" :active-id="paras.streetId" selected-icon="success"
					 @click-nav="onClickNav" @click-item="onClickItem" />
				</van-dropdown-item>
				<van-dropdown-item title="月租金"  :options="monthRentList" @change="changeMonthRent">
					
				</van-dropdown-item>
				<van-dropdown-item title="物业" value="" :options="propertyList" @change="changePropertyType"></van-dropdown-item>
				<van-dropdown-item title="更多">
					
				</van-dropdown-item>
			</van-dropdown-menu>
		</van-sticky>
		<view class="store-list">
			<van-empty v-if="shopList.length==0" description="暂无数据" />
			<StoreCard v-for="(item,index) in shopList" :sourceData="item" :key="index" @click.native="goShopdetails(item)" />
		</view>
	</view>
</template>

<script>
	import StoreCard from '../../components/Card/Store'
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	import {getShopList,getAreaStreets,getCity} from "../../utils/api.js"
	
	export default {
		components: {
			StoreCard
		},
		data() {
			return {
				locationShow: false,
				cityList: [],
				activeCity: '',
				value: '',
				mainActiveIndex: 0,
				
				AreaStreets: [],
				shopList:[],
				propertyList:[],//物业
				monthRentList:[],
				moneyList:[
					{text: "0-2000元", value: 0}
				],
				paras:{
					shopName:"",
					label:"",
					distance:"",
					regionId:"",
					streetId:"",
					metroLine:"",
					monthRentStart:"",
					monthRentEnd:"",
					sort:"",
					floorNum:"",
					indentity:"",
					engineeringConditions:"",
					propertyType:"",
					measureAreaStart:"",
					measureAreaEnd:"",
					longitude:"",
					latitude:"",
				}
			}
		},
		onLoad() {
			//请求品牌列表
			this.ajaxGetShopList();
			//城市列表
			this.ajaxGetCityList();
			//请求城市联动
			this.ajaxGetAreaStreets();
		},
		onShow() {
			console.log(this.Dict.property_type)
			//把字典格式进行转换
			this.changeDict();
		},
		methods: {
			//转换格式
			changeDict(){
				this.propertyList = [];
				this.Dict.property_type.forEach((item)=>{
					this.propertyList.push({
						text: item.itemText, value: item.itemValue
					})
				})
				this.monthRentList = [];
				this.Dict.search_month_rent.forEach((item)=>{
					this.monthRentList.push({
						text: item.itemText, value: item.itemValue
					})
				})
				
			},
			// 打开关闭弹出层
			showPopup() {
				this.locationShow = true;
			},
			onClose() {
				this.locationShow = false;
			},

			// 选中城市
			selectCity(index) {
				console.log(1111)
				this.activeCity = index;
			},
			onSearch() {
				console.log('搜索')
			},
			makePhoneCall: function (tel) {
				uni.makePhoneCall({
					phoneNumber: tel,
					success: () => {
						console.log("成功拨打电话")
					}
				})
			},
			changeMonthRent(e){
				this.paras.monthRentStart = Number(e.detail.split("-")[0]);
				this.paras.monthRentEnd = Number(e.detail.split("-")[1]);
				console.log(e.detail)
				this.ajaxGetShopList();
			
			},
			changePropertyType(e){
				
				this.paras.propertyType = e.detail;
				this.ajaxGetShopList();
			
			},
			onClickLeft() {
				uni.navigateBack()
			},
			//左侧导航点击时，触发的事件
			onClickNav(e) {
			
				this.mainActiveIndex = e.detail.index || 0;
				this.paras.regionId = this.AreaStreets[this.mainActiveIndex].id;
			},
			//右侧选择项被点击时，会触发的事件
			onClickItem(e) {
				
				this.paras.streetId = this.paras.streetId === e.detail.id ? null : e.detail.id;
				this.ajaxGetShopList();
			},
			// 进入商铺详情页
			goShopdetails() {
				uni.navigateTo({
					url: './shopDetails',
				})
			},
			
			//商铺列表
			ajaxGetShopList(){
				//ajax个人信息查询
				var that = this;
				const paras = {
					cityCode:"440300",
					shopName:this.paras.shopName,
					label:this.paras.label,
					distance:this.paras.distance,
					regionId:this.paras.regionId,
					streetId:this.paras.streetId,
					metroLine:this.paras.metroLine,
					monthRentStart:this.paras.monthRentStart,
					monthRentEnd:this.paras.monthRentEnd,
					sort:this.paras.sort,
					floorNum:this.paras.floorNum,
					indentity:this.paras.indentity,
					engineeringConditions:this.paras.engineeringConditions,
					propertyType:this.paras.propertyType,
					measureAreaStart:this.paras.measureAreaStart,
					measureAreaEnd:this.paras.measureAreaEnd,
					longitude:this.paras.longitude,
					latitude:this.paras.latitude,
					pageNo:1,
					pageSize:10,
				};
				paras.accessToken = that.accessToken;
				
				getShopList(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						that.shopList = data.data;
					
					}else{
						
						
					}
					
				})
				.catch(error => {
				
				});
			},
			
			ajaxGetCityList(){
				var that = this;
				const paras = {
				};
				paras.accessToken = that.accessToken;
				
				getCity(paras).then(res => {
					const data = res.data;
					
					console.log(data);
					if(data.code=="200"){
						that.cityList = data.data;
					
					}else{
						
						
					}
					
				})
				.catch(error => {
				
				});
				
			},
			
			//城市联动
			ajaxGetAreaStreets(){
				//ajax个人信息查询
				var that = this;
				const paras = {
					cityCode:"440300",
				};
				paras.accessToken = that.accessToken;
				
				getAreaStreets(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						that.AreaStreets = [];
						data.data.forEach((item)=>{
							let area = {};
							area.id = item.areaCode;
							area.text = item.areaName;
							area.children = [];
							item.streetVoList.forEach((street)=>{
								let streetItem = {};
								streetItem.id = street.streetCode;
								streetItem.text = street.streetName;
								streetItem.children = [];
								area.children.push(streetItem)
							})
							that.AreaStreets.push(area);
						})
						that.$forceUpdate();
						console.log(that.AreaStreets)
					
					}else{
						
						
					}
					
				})
				.catch(error => {
				
				});
			},
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.v-shops {
		
		.header {
			padding: 0rpx 24rpx;
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
			padding: 0 16rpx;
		}
	}
</style>
