<template>
  <view>
    <view class="page-body">
      <view class="page-section page-section-gap">
        <map
          style="width: 100%; height: 100vh;"
          :scale="scale"
          :latitude="latitude"
          :longitude="longitude"
          :markers="covers"
					:circles="circles"
        ></map>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      id: 0, // 使用 marker点击事件 需要填写id
      title: "map",
      scale: 10,
      latitude: 22.54694852367525,
      longitude: 114.05886125,
      covers: [
        {
          latitude: 22.54694852367525,
          longitude: 114.05886125,
          width: 100,
          height: 100,
          callout: {
            borderRadius: 50,
            bgColor: "#333333",
            content: "房源数：",
            color: "#ffffff",
            textAlign: "center",
          },
        }
			],
    };
  },
  methods: {},
};
</script>

<style>
</style>