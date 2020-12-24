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
				subscribeList: [],
				paras: {},
			}
		},
		onLoad(paras) {
			console.log(paras)
			//如果有项目ID
			this.getList();
		},
		methods: {
			
			onReachBottom() {
				console.log("onReachBottom");
				this.loadMoreText = '更多';
				this.getList();
			},
			onPullDownRefresh() {
				console.log("onPullDownRefresh");
				this.reload = true;
				this.getList();
			},
			
			
			getList(){
				uni.stopPullDownRefresh()
				var that = this;
				if (this.subscribeList.length>0) {
					//说明已有数据，目前处于上拉加载
					this.loadMoreText = '加载中';
					this.paras.pageNo = Math.floor(this.subscribeList.length/this.paras.pageSize)+1;
					this.paras.pageSize = 10;
					//判断是否要需要请求
					if(parseInt(this.subscribeList.length%this.paras.pageSize) !== 0){ 
						this.loadMoreText = '没有更多';
						return;
					}
					
				}else{
					this.paras.pageNo = 1;
					this.paras.pageSize = 10;
				}
				
				const paras = {
					// appUid:this.userDetail.id,
					pageNo: this.paras.pageNo ,
					pageSize: this.paras.pageSize,
					
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
						setTimeout(() => {
							Toast.clear();
						}, 300)
						
						let list = that.setTime(data.data);
						that.subscribeList = that.reload ? list : that.subscribeList.concat(list);
						that.reload = false;
						console.log(that.subscribeList)
					} else {
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
		min-height: 100vh;
	}
</style>
