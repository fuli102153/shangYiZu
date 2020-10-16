<template>
  <baidu-map class="map" :center="center" :zoom="zoom" :dragging="dragging" :double-click-zoom="false" @ready="handler" @touchend="mapTouchend" @touchmove="mapTouchmove">
    <my-overlay
      :position="{lng: item.lng, lat: item.lat}"
      :text="{name: item.name, num: item.num}"
      v-for="(item, index) in storeList"
      :key="index"
      @goDistrict="goDistrict(item)" />
  </baidu-map>
</template>

<script>
import MyOverlay from './Overlay'
export default {
  components: {
    MyOverlay
  },
  data () {
    return {
      center: {lng: 0, lat: 0},  //经纬度
      zoom: 11,　 //地图展示级别
      dragging: false,
      storeList: [
        {name: '龙岗区', num: '123', lng: 114.253247, lat: 22.725705},
        {name: '南山区', num: '123', lng: 113.934169, lat: 22.539436},
        {name: '福田区', num: '123', lng: 114.06065, lat: 22.528219},
        {name: '宝安区', num: '123', lng: 113.895075, lat: 22.577351},
        {name: '龙华区', num: '123', lng: 114.053176, lat: 22.701702},
      ]
    }
  },
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.center.lng = 114.063525
      this.center.lat = 22.547981
      this.zoom = 11
    },
    goDistrict(item) {
      console.log(111111111)
      this.center.lng = item.lng
      this.center.lat = item.lat
      this.zoom = 13
    },
    //触摸移动时触发此事件
    mapTouchmove(e) {
      this.dragging = true
    },
    //触摸结束时触发此事件
    mapTouchend(e) {
      this.dragging = false
    },
  }
}
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100vh;
}
</style>