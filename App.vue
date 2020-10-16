<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "/wxcomponents/vant/dist/common/index.wxss";
	/*每个页面公共css */
	.uni-tabbar {
		box-shadow: 0px 0px 50px 0px rgba(190, 190, 190, 0.5);
	}
</style>
