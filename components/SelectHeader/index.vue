<template>
	<view class="vc-select-header">
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
				
				monthRentList:[],
				propertyList:[],//物业
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
		},
		methods: {
			//左侧导航点击时，触发的事件
			onClickNav(e) {
			
				this.mainActiveIndex = e.detail.index || 0;
				this.paras.regionId = this.AreaStreets[this.mainActiveIndex].id;
			},
			//右侧选择项被点击时，会触发的事件
			onClickItem(e) {
				
				this.paras.streetId = this.paras.streetId === e.detail.id ? null : e.detail.id;
				this.toSourceData();
			},
			
			changeMonthRent(e){
				console.log(e)
				// this.paras.monthRentStart = Number(e.detail.split("-")[0]);
				// this.paras.monthRentEnd = Number(e.detail.split("-")[1]);
				// this.toSourceData();
			},
			
			changePropertyType(e){
				this.paras.propertyType = e.detail;
				this.toSourceData();
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
</style>
