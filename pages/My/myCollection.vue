<template>
	<view class="v-my-collection">
		<view class="header">
			以下商铺已加入我的收藏
		</view>
		<view class="store-list">
			<van-empty v-if="collectionList.length==0" description="暂无数据" />
			<CollCard  v-for="item in collectionList" :sourceData="item" :key="item"></CollCard>
		</view>
		<van-toast id="van-toast" />
	</view>
	
</template>

<script>
	import CollCard from '../../components/Card/collection.vue'
	import {getCollectList} from "../../utils/api.js"
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	export default {
		components: {
			CollCard
		},
		data() {
			return {
				collectionList: [],
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
				getCollectList(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						toast.clear();
						that.collectionList = data.data;
						
					
					}else{
						Toast.fail(data.message);
						
					}
					
				})
				.catch(error => {
					Toast.fail(error.message);
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.v-my-collection {
		.header {
			height: 90rpx;
			background: #FFFFFF;
			font-size: 28rpx;
			color: #1676FE;
			padding-left: 50rpx;
			display: flex;
			align-items: center;
		}
		.store-list {
			padding: 40rpx;
		}
	}
</style>
