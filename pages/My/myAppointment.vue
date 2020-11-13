<template>
	<view class="v-myAppointment">
		<van-empty v-if="subscribeList.length==0" description="暂无数据" />
		<AppointmentCard v-for="(item, index) in subscribeList" :key="index" :sourceData="item"></AppointmentCard>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import AppointmentCard from '../../components/Card/appointment.vue'
	import {getMySubscribe} from "../../utils/api.js"
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	export default {
		components: {
			AppointmentCard
		},
		data() {
			return {
				subscribeList: []
			}
		},
		onLoad(paras) {
			console.log(paras)
			//如果有项目ID
			this.getList();
		},
		methods: {
			
			
			getList(){
				
				var that = this;
				
				const paras = {
					appUid:this.userDetail.id,
					pageNo:1,
					pageSize:10,
					
				};
				paras.accessToken = that.accessToken;
				const toast =Toast.loading({
				  message: '加载中...',
				  forbidClick: true,
				  loadingType: 'spinner',
				});
				getMySubscribe(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						toast.clear();
						that.subscribeList = data.data;
						console.log(that.subscribeList)
						
					
					}else{
						Toast.fail(data.message);
						
					}
					
				})
				.catch(error => {
					Toast.fail(this.global.error);
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.v-myAppointment {
		background-color: #F5F8FA;
		padding: 30rpx 25rpx;
	}
</style>
