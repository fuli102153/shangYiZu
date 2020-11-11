<template>
	<view class="vc-select-header">
		<van-dropdown-menu>
			<van-dropdown-item title="区域">
				<van-tree-select height="55vw" max="10" :items="AreaStreets" :main-active-index="mainActiveIndex" :active-id="paras.streetId" selected-icon="success"
				 @click-nav="onClickNav" @click-item="onClickItem" />
			</van-dropdown-item>
			<van-dropdown-item title="月租金" value="month" :options="monthRentList" @change="changeMonthRent">
				
			</van-dropdown-item>
			<van-dropdown-item title="物业" value="" :options="propertyList" @change="changePropertyType"></van-dropdown-item>
			<van-dropdown-item title="更多">
				<van-tree-select
				  :items="sortList"
				  :main-active-index="sortActiveIndex"
				  :active-id="sortActiveId"
					height="412rpx"
				  @click-nav="onClickSort"
				  @click-item="onClickItemSort"
				/>
				<view class="month-rent">
					<view class="label">
						月租金
					</view>
					<view class="content">
						<view class="start">
							<input type="text" value="" />
							<text>元/月</text>
						</view>
						<text>—</text>
						<view class="start end">
							<input type="text" value="" />
							<text>元/月</text>
						</view>
					</view>
				</view>
				<view class="floor hot">
					<view class="title">
						楼层
					</view>
					<view class="hot-tag">
						<view color="#B2B2B2" class="tag-item" :class="selectList.includes(index) ? 'active' : ''" v-for="(item, index) in tagList" :key="index" @click="selectTag(index)">{{ item }}</view>
					</view>
				</view>
				<view class="lease hot">
					<view class="title">
						租赁性质
					</view>
					<view class="hot-tag">
						<view color="#B2B2B2" class="tag-item" :class="selectLeaseList.includes(index) ? 'active' : ''" v-for="(item, index) in leaseTagList" :key="index" @click="selectLeaseTag(index)">{{ item }}</view>
					</view>
				</view>
				<view class="other hot">
					<view class="title">
						其他
					</view>
					<view class="hot-tag">
						<view color="#B2B2B2" class="tag-item" :class="selectOtherList.includes(index) ? 'active' : ''" v-for="(item, index) in otherTagList" :key="index" @click="selecOthertTag(index)">{{ item }}</view>
					</view>
				</view>
			</van-dropdown-item>
		</van-dropdown-menu>
	</view>
</template>

<script>
	import vanDropdownMenu from '../../wxcomponents/vant/dist/dropdown-menu/index';
	import vanDropdownItem from '../../wxcomponents/vant/dist/dropdown-item/index';
	import vanTreeSelect from '../../wxcomponents/vant/dist/tree-select/index';
	import {getShopList,getAreaStreets,getCity} from "../../utils/api.js"
	export default {
		components: {
			vanDropdownMenu, vanDropdownItem, vanTreeSelect
		},
		data() {
			return {
				AreaStreets: [],
				mainActiveIndex: 0,
				sortList: [
					{
						text: '排序',
						id: 0,
						children: [],
					}
				],
				sortActiveIndex: 0,
				activeId: '',
				
				monthRentList:[],
				propertyList:[],//物业
				
				tagList: [],
				selectList: [],
				leaseTagList: [],
				selectLeaseList: [],
				otherTagList: [],
				selectOtherList: [],
				month:"",
				
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
		
		created() {
			this.changeDict();
			//城市列表
			this.ajaxGetCityList();
			//请求城市联动
			this.ajaxGetAreaStreets();
			
			this.sortList[0].children = this.Dict.search_more_sort.map(item => {
				return {
					text: item.itemText,
					id: item.itemValue
				}
			})
			this.tagList = this.Dict.search_more_floorNum.map(item => {
				return item.itemText
			})
			this.leaseTagList = this.Dict.search_more_rentNature.map(item => {
				return item.itemText
			})
			this.otherTagList = this.Dict.search_more_rentNature.map(item => {
				return item.itemText
			})
		},
		methods: {
			selectTag(index) {
				let list = []
				list = JSON.parse(JSON.stringify(this.selectList))
				if (list.includes(index)) {
					list.forEach((item, idx) => {
						if (item === index) {
							list.splice(idx,1); 
						}
					})
				} else {
					list.push(index)
				}
				this.selectList = list
			},
			selectLeaseTag(index) {
				let list = []
				list = JSON.parse(JSON.stringify(this.selectLeaseList))
				if (list.includes(index)) {
					list.forEach((item, idx) => {
						if (item === index) {
							list.splice(idx,1); 
						}
					})
				} else {
					list.push(index)
				}
				this.selectLeaseList = list
			},
			selecOthertTag(index) {
				let list = []
				list = JSON.parse(JSON.stringify(this.selectOtherList))
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
				this.selectOtherList = list
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
			},
			
			onClickSort(e) {
				this.mainActiveIndex = e.detail.index || 0;
				this.paras.regionId = this.AreaStreets[this.mainActiveIndex].id;
			},
			onClickItemSort(e) {
				this.paras.streetId = this.paras.streetId === e.detail.id ? null : e.detail.id;
			},
			
			changeMonthRent(){
				//console.log(value
				//console.log(this.month)
				
				//this.$emit('onChangeMit', "value")
				this.paras.monthRentStart = Number(e.detail.split("-")[0]);
				this.paras.monthRentEnd = Number(e.detail.split("-")[1]);
				this.toSourceData();
			},
			
			changePropertyType(value){
				this.$emit('onChangeMit', "222")
				//console.log(value)
				//this.paras.propertyType = value.detail;
				//this.toSourceData();
			},
			
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
			
			toSourceData() {
				this.$emit('onChange', this.paras)
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
	.vc-select-header {
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
	}
</style>
