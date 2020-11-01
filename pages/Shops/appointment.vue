<template>
	<view class="v-appointment">
		<van-field
		  :value="value"
			label="联系人"
			input-align="right"
		  placeholder="请输入用户名"
		/>
		<van-field
		  :value="value"
			label="联系电话"
			input-align="right"
		  placeholder="请输入用户名"
		/>
		<van-cell required title="选择开始时间" :value="startDate" @click="onDisplay" />
		<van-cell required title="选择结束时间" :value="endDate" @click="onEndDisplay" />
		<view class="submit">
			<van-button type="info" block @click="addSubscribe">提交</van-button>
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
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import {getSubscribeAdd} from "../../utils/api.js"
	import Toast from '../../wxcomponents/vant/dist/toast/toast';

	export default {
		data() {
			return {
				username: '',
				userphone: '',
				startDate: '',
				startShow: false,
				endDate: '',
				endShow: false,
				shopNo:"",
				minHour: 10,
				maxHour: 20,
				minDate: new Date().getTime(),
				maxDate: new Date(2022, 10, 1).getTime(),
				currentDate: new Date().getTime(),
			}
		},
		onLoad(paras) {
			console.log(paras)
			//如果有项目ID
			if(paras.shopNo){
				this.shopNo = paras.shopNo;
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
				this.startDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:00`;
			},
			onEndConfirm(event) {
				this.endShow = false;
				this.currentDate = event.detail
				const date = new Date(event.detail)
				this.endDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:00`;
			},
			
			addSubscribe(shopNo){
				
				var that = this;
				if(!that.startDate){
					Toast.fail("选择开始时间");
					return;
				}
				if(!that.endDate){
					Toast.fail("选择结束时间");
					return;
				}
				const paras = {
					shopNo:that.shopNo,
					appUid:that.userDetail.id,
					type:1,
					subscribeTimeStart:that.startDate,
					subscribeTimeEnd:that.endDate,
					
				};
				paras.accessToken = that.accessToken;
				Toast.loading({
				  message: '加载中...',
				  forbidClick: true,
				  loadingType: 'spinner',
				});
				getSubscribeAdd(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						Toast.success('预约成功');
						setTimeout(()=>{
							uni.navigateBack({
							    delta: 1
							});
						},2000)
						
					
					}else{
						Toast.fail(data.message);
						
					}
					
				})
				.catch(error => {
				
				});
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
