<template>
	<!-- 购物中心 -->
	<view class="v-shopping-mall">
		<van-sticky>
			<!--业态 楼层 租金 面积-->
			<van-dropdown-menu>
				<van-dropdown-item title="业态" :style="{display: typeShow ? 'block' : 'none'}" @close="typeShow=false" @open="typeShow=true">
					<van-tree-select height="100vw" max="10" :items="typeList" :main-active-index="typeActiveIndex" :active-id="paras.shopCategoryIds"
					 selected-icon="success" @click-nav="onClickType" @click-item="onClickTypeItem" />
				</van-dropdown-item>
				<van-dropdown-item title="楼层"  :style="{display: floorShow ? 'block' : 'none'}" @close="floorShow=false"
				@open="floorShow=true" :options="floorList" @change="changeFloor"></van-dropdown-item>
				<van-dropdown-item title="租金" :style="{display: monthShow ? 'block' : 'none'}"  @close="monthShow=false" 
				@open="monthShow=true" :options="monthRentList" @change="changeMonthRent"></van-dropdown-item>
				<van-dropdown-item title="面积" :style="{display: measureShow ? 'block' : 'none'}" @close="measureShow=false" @open="measureShow=true"
				 :options="searchAreaList" @change="changeAreaRent"></van-dropdown-item>
				
				
			</van-dropdown-menu> 
			
		</van-sticky>
		<view class="image-list" v-if="0">
			<view class="recommend-content">
				<view class="recommend-list">
					<view class="recommend-item" v-for="(item,index) in projectList" :key="index">
						<view class="recommend-image">
							<image :src="item.projectImg"></image>
						</view>
						<view class="recommend-text">
							{{item.projectName}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="view-list">
			<view class="store-list" >
				<van-empty v-if="shopList.length==0" description="暂无数据" />
				<StoreCard v-else v-for="(item,index) in shopList" :sourceData="item" :key="index" />
			</view>
			<van-toast id="van-toast" />
		</view>
	</view>
</template>

<script>
	import StoreCard from '../../components/Card/Store'
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	import {getProjectAndShopList,getAreaStreets,getCity,getPropertyFormAllData} from "../../utils/api.js"
	export default {
		components: {
			StoreCard
		},
		data() {
			return {
				
					activeKey: 0,
					locationShow: false,
					cityList: [],
					typeList:[],
					activeCity: '',
					value: '',
					mainActiveIndex: 0,
					typeActiveIndex: 0,
					
					AreaStreets: [],
					shopList:[],
					projectList:[],
					propertyList:[],//物业
					monthRentList:[],
					businessList:[],//业态
					searchAreaList:[],//面积
					floorList:[],//楼层
					moneyList:[
						{text: "0-2000元", value: 0}
					],
					propertyShow:false,
					typeShow: false,
					monthShow:false,
					moreShow:false,
					areaShow:false,
					measureShow:false,
					floorShow:false,
					measureAreaEnd:"",
					measureAreaStart:"",
					sortList: [
						{
							text: '排序',
							id: null,
							children: [],
						}
					],
					sortActiveIndex: 0,
					sortActiveId:null,
					
					tagList: [],
					tagIndex:-1,
					selectList: [],
					leaseTagList: [],
					leaseTagIndex:-1,
					selectLeaseList: [],
					otherTagList: [],
					otherTagIndex:-1,
					selectOtherList: [],
					
					
					paras:{
						projectId:"",
						businessType:"",
						shopCategoryIds:[],
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
		onLoad(paras) {
			console.log(paras)
			//如果有项目ID
			
			this.paras.projectId = paras.projectId
			this.ajaxGetShopList();
			//城市列表
			this.ajaxGetCityList();
			//请求城市联动
			this.ajaxGetAreaStreets();
			//获取全部业态数据
			this.ajaxGetPropertyFormAllData();
			
			this.sortList[0].children = this.Dict.search_more_sort.map(item => {
				return {
					text: item.itemText,
					id: item.itemValue
				}
			})
			this.tagList = this.Dict.search_more_floorNum;
			this.leaseTagList = this.Dict.search_more_rentNature;
			this.otherTagList = this.Dict.search_more_rentNature.map(item => {
				return item.itemText
			})
			
		
		},
		onShow(){
			//项目列表
			console.log(this.Dict.business_type)
			this.changeDict();
		},
		methods: {
			
			onChange(event) {
				this.activeKey = event.detail;
				this.paras.businessType = this.businessList[event.detail].value;
				this.ajaxGetShopList();
			},
			
			selectTag(index) {
				this.tagIndex = index;
				this.paras.floorNum = this.tagList[index].itemValue;
				this.paras.floorNum = this.paras.floorNum.replace(/&lt;/g,"<");
				this.paras.floorNum = this.paras.floorNum.replace(/&gt;/g,">");
				console.log(this.paras.floorNum)
				
			},
			selectLeaseTag(index) {
				this.leaseTagIndex = index;
				this.paras.indentity = this.leaseTagList[index].itemValue
				console.log(this.paras.indentity)
				
				
			},
			selecOthertTag(index) {
				this.otherTagIndex = index;
				this.paras.other = this.otherTagList[index].itemValue
				console.log(this.paras.other)
			},
			
			searchList(){
				if(Number(this.measureAreaStart)>0){
					this.paras.measureAreaStart = Number(this.measureAreaStart);
				}else{
					this.paras.measureAreaStart = "";
				}
				if(Number(this.measureAreaEnd)>0){
					this.paras.measureAreaEnd = Number(this.measureAreaEnd);
				}else{
					this.paras.measureAreaEnd = "";
				}
				
				
				this.ajaxGetShopList();
			},
			
			onClickItemNav(e){
			
				this.sortActiveIndex = e.detail.index || 0;
			},
			onClickItemSort(e) {
				
				const sortActiveId = this.sortActiveId === e.detail.id ? null : e.detail.id;
				this.sortActiveId = sortActiveId;
				this.paras.sort = sortActiveId;
				console.log(this.paras.sort)
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
				
				this.businessList = [{text:"不限",value:""}];
				this.Dict.business_type.forEach((item)=>{
					this.businessList.push({
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
				
				this.floorList = [{
						text: "不限",
						value: "",
					}];
				this.Dict.search_more_floorNum.forEach((item) => {
					this.floorList.push({
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
			
			// 选中城市
			selectCity(index) {
				this.activeCity = index;
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
				console.log(e);
				
				this.paras.monthRentStart = Number(e.detail.split("-")[0]);
				this.paras.monthRentEnd = Number(e.detail.split("-")[1]);
				console.log(this.paras.monthRentStart)
				console.log(this.paras.monthRentEnd)
				this.ajaxGetShopList();
			},
			
			changePropertyType(e){
			
				this.paras.propertyType = Number(e.detail);
				this.ajaxGetShopList();
			},
			
			changeFloor(e){
			
				this.paras.floorNum = Number(e.detail);
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
				//console.log(e)
				this.paras.streetId = this.paras.streetId === e.detail.id ? null : e.detail.id;
				this.ajaxGetShopList();
			},
			
			
			//左侧导航点击时，触发的事件
			onClickType(e) {
				this.typeActiveIndex = e.detail.index || 0;
				let t = this.typeList[this.typeActiveIndex].id;
				
				
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
				this.ajaxGetShopList();	
			},
			
			// 进入商铺详情页
			goShopdetails() {
				uni.navigateTo({
					url: './shopDetails',
				})
			},
			
			//ajax请求数据 
			ajaxGetShopList(){
				//ajax个人信息查询
				var that = this;
				that.projectList = [];
				that.shopList = [];
				
				const paras = {
					projectId:this.paras.projectId,
					shopCategoryIds:this.paras.shopCategoryIds.join(","),
					businessType:this.paras.businessType,
					pageNo:1,
					pageSize:10,
				};
				paras.accessToken = that.accessToken;
				const toast = Toast.loading({
				  message: '加载中...',
				  forbidClick: true,
				  loadingType: 'spinner',
				});
				getProjectAndShopList(paras).then(res => {
					const data = res.data;
					console.log(data);
					that.loading = false;
					if(data.code=="200"){
						setTimeout(() => {
							Toast.clear();
						}, 300)
						that.projectList = [data.project];
						that.shopList = data.shopList;
						that.$forceUpdate();
					
					}else{
						Toast.fail(data.message);
						
					}
					
				})
				.catch(error => {
					Toast.fail(this.global.error);
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
							that.typeList = [];
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
	.v-shopping-mall {
		height: 100vh;
		display: flex;
		flex-direction: column;
		.region {
			display: flex;

			.van-list {
				flex: 1;
			}
		}
		
		.image-list {
			padding: 36rpx 0;
			
			.recommend-content {
				width: 100%;
				overflow-x: auto;
				
				&::-webkit-scrollbar{
					display: none;
				}
				
				.recommend-list {
					white-space: nowrap;
					font-size: 0;
					padding: 0 26rpx;
					
					.recommend-item {
						width: 280rpx;
						height: 240rpx;
						border-radius: 20rpx;
						background-color: #eee;
						margin-right: 50rpx;
						display: inline-block;
						vertical-align: middle;
						box-sizing: border-box;
						overflow: hidden;
						position: relative;
						
						.recommend-text {
							width: 100%;
							font-size: 30rpx;
							line-height: 30rpx;
							color: #fff;
							height: 60rpx;
							background: rgba(0, 0, 0, 0.6);
							display: flex;
							justify-content: center;
							align-items: center;
							position: absolute;
							bottom: 0;
						}
					}
				}
			}
		}
		
		.view-list {
			display: flex;
			flex: 1;
			
			.store-list {
				flex: 1;
				height: 100%;
				overflow: auto;
				padding: 0 16rpx;
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
					color: #2D2D2D;
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
				border: 1rpx solid #2D2D2D;
				color: #2D2D2D;
				font-size: 26rpx;
				line-height: 26rpx;
				padding: 15rpx 24rpx;
				border-radius: 4rpx;
			}
			
			.active {
				color: #fff;
				background-color: #1676FE;
				border: 1rpx solid #1676FE;
			}
		}
	}
		
</style>
