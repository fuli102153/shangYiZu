<template>
  <bm-overlay
    ref="customOverlay"
    class="sample"
    pane="labelPane"
    @draw="draw"
    @click.native="goDistrict">
    <div>
      <div>{{ text.name }}</div>
      <div>{{ text.num }}套</div>
    </div>
  </bm-overlay>
</template>

<script>
export default {
  props: ['text', 'position'],
  watch: {
    position: {
      handler () {
        this.$refs.customOverlay.reload()
      },
      deep: true
    }
  },
  methods: {
    draw ({el, BMap, map}) {
      const {lng, lat} = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    },
    goDistrict() {
      console.log(222222)
      this.$emit('goDistrict', this.position);
    }
  }
}
</script>

<style lang="scss" scoped>
.sample {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    border: 2px solid #eee;
    background:#1676FE;
    overflow: hidden;
    box-shadow: 0 0 5px #000;
    color: #fff;
    text-align: center;
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
</style>