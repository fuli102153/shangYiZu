<template>
	<view class="v-map">
		<view class="map_container">
			<map class="map"  include-points="markers" ref="map" id="map" :longitude="longitude" :latitude="latitude"   @regionchange="regionchange"  @labeltap="labeltap" :scale="scale"  :markers="markers">
			</map>
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import {getMapForShopCount,getMapForShop} from '../../utils/api.js'
	import Toast from "../../wxcomponents/vant/dist/toast/toast";
	export default {
		data() {
			return {
				markers: [],
				latitude: 22.54985,
				longitude:114.063812,
				scale:10,
				placeData: {},
				hasMarkers:false,
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
				map.getScale({
					success: (res) => {
						
						this.scale = res.scale;
						
					}
				})
				
				//视野的宽度
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
				
				
				map.getCenterLocation({
					success: (res) => {
						console.log(res)
						//显示区
						/*
						console.log(this.scale)
						var that = this;
						function a(){
						
							that.latitude = res.latitude;
							that.longitude = res.longitude;
							if(that.scale<=13){
								that.ajaxGetMapForShopCountByCity()
							//显示详细的商品	
							}else if(that.scale>13){
								that.ajaxGetMapForShop();
							}
							
						}
						this.throttle(a(),1000)
						*/
					}
				})
			},
			
			throttle(func, wait) {
			    let previous = 0;
			    return function() {
			      let now = Date.now();
			      let context = this;
			      let args = arguments;
				  console.log(now+":"+previous)
			      if (now - previous > wait) {
					  
			        func.apply(context, args);
			        previous = now;
			      }
			    }
			},
		
			
			selectMarker(e){
				
			},
			
			labeltap(e) {
				console.log("labeltap")
				this.hasMarkers = false;
				
				
				if (this.scale === 10) {
					this.markers && this.markers.forEach(item => {
						if (item.id === e.detail.markerId) {
							this.latitude = item.latitude;
							this.longitude = item.longitude;
						}
					})
					this.scale = 13
					this.ajaxGetMapForShopCountByRegion(e.detail.markerId)
				}else if(this.scale >= 13){
					this.markers && this.markers.forEach(item => {
						if (item.id === e.detail.markerId) {
							this.latitude = item.latitude;
							this.longitude = item.longitude;
						}
					})
					this.scale = 14
					this.ajaxGetMapForShop()
				}
			},
			
			//显示商品的数据
			ajaxGetMapForShop() {
				const that = this;
				
				const params = {
					longitude: this.longitude,
					latitude: this.latitude,
					distance: 5000,
					cityCode:this.$Localtion.city.cityCode,
				
					
				}
				
			
				params.accessToken = that.accessToken;
				that.markers = []
				getMapForShop(params).then( res => {
					const data = res.data;
					
					if (data.code == "200") {
					
						that.hasMarkers = true;
						var _list = data.data;
						var shopList = [];
						for(var item in _list){
							console.log(item)
							shopList = shopList.concat(_list[item])
						}
						shopList.forEach((item, index)=>{
							that.markers.push({
									id: item.shopNo,
									latitude: item.latitude,
									longitude: item.longitude,
									//iconPath: '../../static/images/mark1.png',
									//width: '30rpx',
									//height: '41rpx',
									zIndex: 5,
									label: {
										
									}
									
							})
						})
						this.$forceUpdate()
						
						
						
					} else {
						Toast.fail(data.message);
					}
				})
			},
			
			
			ajaxGetMapForShopCountByCity() {
				const that = this;
				const params = {}
				params.cityCode = this.$Localtion.city.cityCode;
				params.accessToken = that.accessToken;
				getMapForShopCount(params).then( res => {
					const data = res.data;
					console.log("getMapForShopCount"+data);
					if (data.code == "200") {
					
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
										fontSize: 14,
										anchorY: -55,
										textAlign: 'center'
									}
							}
						})
						that.hasMarkers = true;
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
				
				
				params.accessToken = that.accessToken;
				that.markers = []
				getMapForShopCount(params).then( res => {
					const data = res.data;
					console.log("getMapForShopCount"+data);
					if (data.code == "200") {
					
						that.hasMarkers = true;
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
										fontSize: 12,
										padding:5,
										anchorY: -55,
										textAlign: 'center'
									}
							})
						})
						this.$forceUpdate()
					
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
