<template>
	<view class="v-shops">
		<van-sticky>
			<form action="/">
				<van-search v-model="value" shape="round" background="#1676FE" placeholder="输入意向位置/业态" @search="onSearch"></van-search>
			</form>
			<SelectHeader @onChange="onChange"></SelectHeader>
		</van-sticky>
		<view class="store-list">
			<van-empty v-if="shopList.length==0" description="暂无数据" />
			<StoreCard v-for="(item,index) in shopList" :sourceData="item" :key="index" @click.native="goShopdetails(item)" />
		</view>
	</view>
</template>

<script>
	import StoreCard from '../../components/Card/Store'
	import SelectHeader from '../../components/SelectHeader/index.vue'
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	import {getShopList,getAreaStreets,getCity} from "../../utils/api.js"
	
	export default {
		components: {
			StoreCard,
			SelectHeader
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
		onLoad(params) {
			console.log(params)
			this.value = params.keyword
			this.paras.shopName = params.keyword
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
			onReachBottom() {
				console.log("onReachBottom");
				this.loadMoreText = '更多';
				this.ajaxGetShopList();
			},
			onPullDownRefresh() {
				console.log("onPullDownRefresh");
				this.reload = true;
				this.ajaxGetShopList();
			},
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
			
			onSelectChange(params) {
				console.log(1111111111111)
				this.paras = params;
				this.ajaxGetShopList()
			},
			
			//商铺列表
			ajaxGetShopList(){
				//ajax个人信息查询
				var that = this;
				
				if (this.shopList.length>0) {
					//说明已有数据，目前处于上拉加载
					this.loadMoreText = '加载中';
					this.pageNo = Math.floor(this.shopList.length/this.pageSize)+1;
					this.pageSize = 10;
					//判断是否要需要请求
					if(parseInt(this.shopList.length%this.pageSize) !== 0){ 
						this.loadMoreText = '没有更多';
						return;
					}
					
				}else{
					this.paras.pageNo = 1;
					this.paras.pageSize = 10;
				}
				
				const paras = {
					cityCode:this.$Localtion.city.cityCode,
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
						// that.shopList = data.data;
						let list = data.data;
						that.shopList = that.reload ? list : that.shopList.concat(list);
						that.reload = false;
						uni.stopPullDownRefresh()
					
					}else{
						
						uni.stopPullDownRefresh()
						
					}
					
				})
				.catch(error => {
				
						uni.stopPullDownRefresh()
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
					cityCode:this.$Localtion.city.cityCode,
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


<style lang="scss" scoped>
	.v-search-list {
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
