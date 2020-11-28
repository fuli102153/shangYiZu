<template>
	<view class="v-map">
		<view class="map_container">
			<map class="map" ref="map" id="map" :longitude="longitude" :latitude="latitude" :enable-zoom="false"  :show-location="false" @regionchange="regionchange" @markertap="selectMarker" @labeltap="labeltap" :scale="scale"  :markers="markers">
			</map>
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import {getMapForShopCount} from '../../utils/api.js'
	import Toast from "../../wxcomponents/vant/dist/toast/toast";
	export default {
		data() {
			return {
				markers: [
					{
						id:"0",
						latitude: 22.53332,
						longitude: 113.93041,
						iconPath: '../../static/images/map-marker.png',
						width: '160rpx',
						height: '160rpx',
						zIndex: 1,
						label: {
							content: '南山区商铺\n 556套',
							color: '#fff',
							bgColor: '#1676FE',
							fontSize: 14,
							anchorY: -55,
							textAlign: 'center'
						}
					}, {
						id:"1",
						latitude: 22.529302,
						longitude: 114.062639,
						iconPath: '../../static/images/map-marker.png',
						width: '160rpx',
						height: '160rpx',
						zIndex: 2,
						label: {
							content: '福田区商铺\n 556套',
							color: '#fff',
							bgColor: '#1676FE',
							fontSize: 14,
							anchorY: -55,
							textAlign: 'center'
						}
					}, {
						id:"2",
						latitude: 22.72575,
						longitude: 114.25043,
						iconPath: '../../static/images/map-marker.png',
						width: '160rpx',
						height: '160rpx',
						zIndex: 3,
						label: {
							content: '龙岗区商铺\n 556套',
							color: '#fff',
							bgColor: '#1676FE',
							fontSize: 14,
							anchorY: -55,
							textAlign: 'center'
						}
					}, {
						id:"3",
						latitude: 22.702281,
						longitude: 114.050934,
						iconPath: '../../static/images/map-marker.png',
						width: '160rpx',
						height: '160rpx',
						zIndex: 4,
						label: {
							content: '龙华区商铺\n 556套',
							color: '#fff',
							bgColor: '#1676FE',
							fontSize: 14,
							anchorY: -55,
							textAlign: 'center'
						}
					}, {
						id:"4",
						latitude: 22.559241,
						longitude: 113.892832,
						iconPath: '../../static/images/map-marker.png',
						width: '160rpx',
						height: '160rpx',
						zIndex: 5,
						label: {
							content: '宝安区商铺\n 556套',
							color: '#fff',
							bgColor: '#1676FE',
							fontSize: 14,
							anchorY: -55,
							textAlign: 'center'
						}
					}
				],
				latitude: 22.54985,
				longitude:114.063812,
				scale:10,
				placeData: {},
			}
		},
		onLoad: function() {
			this.ajaxGetMapForShopCountByCity()
			//首先获取经纬度
			 //this.getWxLocation();
			 this.regionchange();
			// this.getOverlay()
			var bmap = require('../../utils/bmap-wx.min.js');
			var BMap = new bmap.BMapWX({
				ak: "TOPhniVWlhX34XtcVVVzAYyus2EyQW1D",
			});
			console.log(BMap, 111)
			
		
		},
		methods: {
			getOverlay() {
				// const pixel = BMap.pointToOverlayPixel(new BMap.Point(116.404, 39.915))
			},

			//首先获取经纬度 
			getWxLocation: function() {
				var _this = this;
				//调用wx.getLocation()获取经纬度
				
				
				uni.getLocation({
				    type: 'wgs84',
				    success: function (res) {
				        var latitude = res.latitude
				        var longitude = res.longitude
				        var speed = res.speed
				        var accuracy = res.accuracy
				        console.log('坐标', latitude, longitude)
				        _this.latitude = latitude
				        _this.longitude = longitude
						
				    }
				});
			},
			
			
			regionchange() {
			    let map = uni.createMapContext('map');
			    map.getRegion({
			         success: res => {
			             let obj = {
			                  latitude: JSON.stringify([{
			                      min: res.southwest.latitude.toString(),
			                      max: res.northeast.latitude.toString()
			                  }]),
			                  longitude: JSON.stringify([{
			                      min: res.southwest.longitude.toString(),
			                      max: res.northeast.longitude.toString()
			                  }])
			             }
						 console.log(obj)
			             //this.getMarks(obj);//捕获到对角线经纬度后，调用方法传参给后端
			         },
			         fail: (data, code) => {
			               console.log('fail' + JSON.stringify(data));
			         }
			    })
			},
			
			selectMarker(e){
				console.log(e)
			},
			
			labeltap(e) {
				console.log(e)
			},
			
			
			ajaxGetMapForShop() {
				const that = this;
				
				uni.getStorage({
					key: '__localtionCity__',
					success(res){
						const cityCode = res.data.cityCode
						const longitude = res.data.lng
						const latitude = res.data.lat
						const params = {
							longitude: parseFloat(longitude),
							latitude: parseFloat(latitude),
							distance: 5000,
							//cityCode:cityCode,
						
							
						}
						
						const toast = Toast.loading({
							message: "加载中...",
							forbidClick: true,
							loadingType: "spinner",
						});
						params.accessToken = that.accessToken;
						getMapForShopCount(params).then( res => {
							const data = res.data;
							console.log("getMapForShopCount"+data);
							if (data.code == "200") {
								setTimeout(() => {
									Toast.clear();
								}, 300)
								data.data.forEach((item)=>{
									console.log(item)
									//if(item)
								})
								
								
								
							} else {
								Toast.fail(data.message);
							}
						})
					}
				})
			},
			
			
			ajaxGetMapForShopCountByCity() {
				const that = this;
				const params = {}
				params.cityCode = this.$Localtion.city.cityCode;
				
				
				
				const toast = Toast.loading({
					message: "加载中...",
					forbidClick: true,
					loadingType: "spinner",
				});
				params.accessToken = that.accessToken;
				getMapForShopCount(params).then( res => {
					const data = res.data;
					console.log("getMapForShopCount"+data);
					if (data.code == "200") {
						setTimeout(() => {
							Toast.clear();
						}, 300)
						data.data.forEach((item)=>{
							console.log(item)
							//if(item)
							that.ajaxGetMapForShopCountByRegion(item.name)
						})
						
						
						
					} else {
						Toast.fail(data.message);
					}
				})
			},
			
			
			ajaxGetMapForShopCountByRegion(regionCode) {
				const that = this;
				const params = {}
				params.regionCode = regionCode;
				
				
				
				const toast = Toast.loading({
					message: "加载中...",
					forbidClick: true,
					loadingType: "spinner",
				});
				params.accessToken = that.accessToken;
				getMapForShopCount(params).then( res => {
					const data = res.data;
					console.log("getMapForShopCount"+data);
					if (data.code == "200") {
						setTimeout(() => {
							Toast.clear();
						}, 300)
						data.data.forEach((item)=>{
							console.log(item)
							//if(item)
							//that.ajaxGetMapForShopCount(item.name)
						})
						
						
						
					} else {
						Toast.fail(data.message);
					}
				})
			}
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.map_container {
		height: 100vh;
		width: 100%;
	}

	.map {
		height: 100%;
		width: 100%;
	}
</style>
