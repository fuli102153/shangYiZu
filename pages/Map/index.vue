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
				markers: [],
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
						 // console.log(obj)
			             //this.getMarks(obj);//捕获到对角线经纬度后，调用方法传参给后端
			         },
			         fail: (data, code) => {
			               console.log('fail' + JSON.stringify(data));
			         }
			    })
			},
			
			selectMarker(e){
				if (this.scale === 10) {
					this.markers && this.markers.forEach(item => {
						if (item.id === e.detail.markerId) {
							this.latitude = item.latitude;
							this.longitude = item.longitude;
						}
					})
					this.scale = 13
					this.markers = []
					this.ajaxGetMapForShopCountByRegion(e.detail.markerId)
				}
			},
			
			labeltap(e) {
				if (this.scale === 10) {
					this.markers && this.markers.forEach(item => {
						if (item.id === e.detail.markerId) {
							this.latitude = item.latitude;
							this.longitude = item.longitude;
						}
					})
					this.scale = 13
					this.markers = []
					this.ajaxGetMapForShopCountByRegion(e.detail.markerId)
				}
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
						let mark = data.data.map((item, index)=>{
							return {
									id: Number(item.name),
									latitude: item.latitude,
									longitude: item.longitude,
									iconPath: '../../static/images/map-marker.png',
									width: '160rpx',
									height: '160rpx',
									zIndex: 5,
									label: {
										content: `${item.nickName}\n ${item.value}套`,
										color: '#fff',
										bgColor: '#1676FE',
										fontSize: 14,
										anchorY: -55,
										textAlign: 'center'
									}
							}
						})
						that.markers = mark
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
				that.markers = []
				getMapForShopCount(params).then( res => {
					const data = res.data;
					console.log("getMapForShopCount"+data);
					if (data.code == "200") {
						setTimeout(() => {
							Toast.clear();
						}, 300)
						data.data.forEach((item, index)=>{
							that.markers.push({
									id: Number(item.name),
									latitude: item.latitude,
									longitude: item.longitude,
									iconPath: ' ',
									width: '0',
									height: '0',
									zIndex: 5,
									label: {
										content: `${item.nickName}${item.value}套`,
										color: '#fff',
										bgColor: '#1676FE',
										fontSize: 14,
										anchorY: -55,
										textAlign: 'center'
									}
							})
						})
						this.$forceUpdate()
						console.log(111111111111111111,this.markers)
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
