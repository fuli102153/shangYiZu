<template>
	<view class="v-appointment">
		<van-field
		  :value="value"
			label="联系人"
		  placeholder="请输入用户名"
		/>
		<van-field
		  :value="value"
			label="联系电话"
		  placeholder="请输入用户名"
		/>
		<van-cell title="选择开始时间" :value="startDate" @click="onDisplay" />
		<van-cell title="选择结束时间" :value="endDate" @click="onEndDisplay" />
		<view class="submit">
			<van-button type="info" block>提交</van-button>
		</view>
		<van-action-sheet :show="startShow">
		  <van-datetime-picker
		    type="datetime"
		    :value="currentDate"
		  	:min-hour="minHou"
		  	:max-hour="maxHour"
		    :min-date="minDate"
		    :max-date="maxDate"
				@confirm="onConfirm"
				@cancel="onCancel"
		  />
		</van-action-sheet>
		<van-action-sheet :show="endShow">
		  <van-datetime-picker
		    type="datetime"
		    :value="currentDate"
		  	:min-hour="minHou"
		  	:max-hour="maxHour"
		    :min-date="minDate"
		    :max-date="maxDate"
				@confirm="onEndConfirm"
				@cancel="onCancel"
		  />
		</van-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				userphone: '',
				startDate: '',
				startShow: false,
				endDate: '',
				endShow: false,
				
				minHour: 10,
				maxHour: 20,
				minDate: new Date().getTime(),
				maxDate: new Date(2022, 10, 1).getTime(),
				currentDate: new Date().getTime(),
			}
		},
		methods: {
			onDisplay() {
			  this.startShow = true;
			},
			onEndDisplay() {
				this.endShow = true;
			},
			onCancel() {
			  this.startShow = false;
				this.endShow = true;
			},
			onConfirm(event) {
				this.startShow = false;
			  this.currentDate = event.detail
				const date = new Date(event.detail)
				this.startDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
			},
			onEndConfirm(event) {
				this.endShow = false;
				this.currentDate = event.detail
				const date = new Date(event.detail)
				this.endDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.v-appointment {
		.submit {
			padding: 103rpx 64rpx;
		}
	}
</style>
