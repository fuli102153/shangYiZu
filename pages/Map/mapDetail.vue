<template>
  <view class="v-map">
    <view class="map_container">
      <map
        class="map"
        include-points="markers"
        ref="map"
        id="map"
        :longitude="longitude"
        :latitude="latitude"
		:markers="markers"
      >
      </map>
    </view>
    <van-toast id="van-toast" />
  </view>
</template>

<script>
import Toast from "../../wxcomponents/vant/dist/toast/toast";
export default {
  data() {
    return {
      markers: [],
      latitude: null,
      longitude: null,
      scale: 10,
      placeData: {},
      hasMarkers: false,
    };
  },
  onLoad(params) {
    this.latitude = params.latitude;
    this.longitude = params.longitude;
    this.markers = [
      {
        id: 0,
        latitude:  params.latitude,
		longitude: params.longitude,
		iconPath: '../../static/images/mark1.png',
		zIndex: 5,
		width: 15,
		height: 20,
        label: {
			content: 'haaaaaaaahahahahahah',
			textAlign: 'center',
			bgColor: '#fff',
			borderWidth: 1,
			borderColor: '#ccc',
			borderRadius: 5,
			padding:'5px',
			anchorY: -50,
		},
      },
    ];
  },
  methods: {},
};
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
