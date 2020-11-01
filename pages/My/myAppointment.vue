<template>
	<view class="v-myAppointment">
		<AppointmentCard v-for="(item, index) in cardList" :key="index" :sourceData="item"></AppointmentCard>
	</view>
</template>

<script>
	import AppointmentCard from '../../components/Card/appointment.vue'
	export default {
		components: {
			AppointmentCard
		},
		data() {
			return {
				cardList: [
					{type: '1'},
					{type: '2'},
					{type: '3'},
					{type: '4'},
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.v-myAppointment {
		background-color: #F5F8FA;
		padding: 30rpx 25rpx;
	}
</style>
