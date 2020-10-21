<template>
	<view class="v-map">
		<view class="map_container">
			<map class="map" id="map" :longitude="longitude" @markertap="selectMarker" :latitude="latitude"  :markers="markers">
				<cover-view class="controls">
				</cover-view>
			</map>
		</view>
	</view>
</template>

<script>
	
	
	export default {
		data() {
			return {
				markers: [
					{
						id:"0",
						latitude: 22.53332,
						longitude: 113.93041,
						iconPath: '../../static/images/my.png',
						title:"宝马",
						label:"宝马宝马"
					}, {
						id:"1",
						latitude: 22.53332,
						longitude: 113.94041,
						iconPath: '../../static/images/my.png',
						title:"奔驰",
						label:"奔驰奔驰"
					}
				],
				latitude: "",
				longitude: "",
				scale:11,
				placeData: {},
			}
		},
		onLoad: function() {
			//首先获取经纬度
			 this.getWxLocation();
			// this.getOverlay()
			var bmap = require('../../utils/bmap-wx.min.js');
			var BMap = new bmap.BMapWX({
				ak: "TOPhniVWlhX34XtcVVVzAYyus2EyQW1D",
			});
			console.log(BMap)
			
		
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
			
			selectMarker(e){
				console.log(e)
			},
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
		
		.controls {
		  position: absolute;
		  top: 30rpx;
		  left: 30rpx;
		  height: 50px;
		  background: #4499ff;
		  width: 100rpx;
		  height: 100rpx;
		  border-radius: 50rpx;
		  box-shadow: 0 -2px 15px #dedede;
		  font-size: 12px;
		}
	}
</style>
