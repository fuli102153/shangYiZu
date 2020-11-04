<template>
	<view class="v-shops">
		<van-sticky>
			<view class="header">
				<view class="location" @click="showPopup">
					<van-icon name="location" class="location-icon" color="#fff" size="30rpx" />
					<text>深圳</text>
					<van-icon name="play" class="arrow" color="#fff" size="17rpx" />
				</view>
				<view class="search">
					<van-search
					  :value="value"
					  shape="round"
					  background="#1676fe"
					  placeholder="搜索店铺或区域"
					/>
				</view>
				<van-icon name="phone" color="#fff" class="phone" @click="makePhoneCall(Configs.service_phone)"/>
				<van-dialog id="van-dialog" />
			</view>
			<!-- 地址弹出层 -->
			<van-popup :show="locationShow" @close="onClose" position="top" round>
				<van-cell-group>
					<van-cell title="选择城市" value="" size="large" />
				</van-cell-group>
				<van-cell-group class="city">
					<van-cell center title="当前定位">
						<template #default>
							<van-button round plain hairline type="info" size="mini">手动定位</van-button>
						</template>
						<template #label>
							<van-icon name="location" class="location-icon" color="#1676fe" size="30rpx" />
							<span>深圳</span>
						</template>
					</van-cell>
					<van-cell v-for="(item, index) in cityList" :key="index" center :label="item" :title="index === 0 ? '已开通城市' : ''"
					 :class="activeCity === index ? 'active' : ''" @click="selectCity(index, item)">
						<template #right-icon>
							<van-icon v-if="activeCity === index" name="success" color="#1676FE" />
						</template>
					</van-cell>
				</van-cell-group>
			</van-popup>
			<van-dropdown-menu>
				<van-dropdown-item title="区域">
					<van-tree-select height="55vw" :items="items" :main-active-index="mainActiveIndex" :active-id="activeId" selected-icon="success"
					 @click-nav="onClickNav" @click-item="onClickItem" />
				</van-dropdown-item>
				<van-dropdown-item title="月租金" value="" :options="Dict.search_area">
					
				</van-dropdown-item>
				<van-dropdown-item title="物业" value="" :options="propertyList"></van-dropdown-item>
				<van-dropdown-item title="更多">
					<van-tree-select height="55vw" :items="items" :main-active-index="mainActiveIndex" :active-id="activeId" selected-icon="success"
					 @click-nav="onClickNav" @click-item="onClickItem" />
				</van-dropdown-item>
			</van-dropdown-menu>
		</van-sticky>
		<view class="store-list">
			<van-empty v-if="shopList.length==0" description="暂无数据" />
			<StoreCard v-for="(item,index) in shopList" :sourceData="item" :key="index" @click.native="goShopdetails(item)" />
		</view>
	</view>
</template>

<script>
	import StoreCard from '../../components/Card/Store'
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	import {getShopList} from "../../utils/api.js"
	
	export default {
		components: {
			StoreCard
		},
		data() {
			return {
				locationShow: false,
				cityList: ["北京", "上海", "广州", "深圳"],
				activeCity: '',
				value: '',
				mainActiveIndex: 0,
				activeId: null,
				items: [{
						text: '附近',
						children: [{
								id: 1,
								text: '不限',
								children: []
							},
							{
								id: 2,
								text: '500m',
								children: []
							},
							{
								id: 3,
								text: '1000m',
								children: []
							},
							{
								id: 4,
								text: '2000m',
								children: []
							},
							{
								id: 5,
								text: '3000m',
								children: []
							},
							{
								id: 6,
								text: '4000m',
								children: []
							},
							{
								id: 7,
								text: '5000m',
								children: []
							},
						],
					},
					{
						text: '街道',
						children: []
					},
					{
						text: '地铁',
						children: []
					},
				],
				shopList:[],
				propertyList:[],//物业
				moneyList:[
					{text: "0-2000元", value: 0}
				],
			}
		},
		onLoad() {
			//请求品牌列表
			this.ajaxGetShopList();
			
		},
		onShow() {
			console.log(this.Dict.property_type)
			//把字典格式进行转换
			this.changeDict();
		},
		methods: {
			//转换格式
			changeDict(){
				
				this.Dict.property_type.forEach((item)=>{
					this.propertyList.push({
						text: item.itemText, value: item.itemValue
					})
				})
			},
			// 打开关闭弹出层
			showPopup() {
				this.locationShow = true;
			},
			onClose() {
				this.locationShow = false;
			},

			// 选中城市
			selectCity(index) {
				console.log(1111)
				this.activeCity = index;
			},
			onSearch() {
				console.log('搜索')
			},
			makePhoneCall: function (tel) {
				uni.makePhoneCall({
					phoneNumber: tel,
					success: () => {
						console.log("成功拨打电话")
					}
				})
			},
			onClickLeft() {
				uni.navigateBack()
			},
			onClickNav({detail = {}}) {
				this.mainActiveIndex = detail.index || 0
			},
			onClickItem({detail = {}}) {
				const activeId = this.activeId === detail.id ? null : detail.id;
				this.activeId = activeId
			},
			// 进入商铺详情页
			goShopdetails() {
				uni.navigateTo({
					url: './shopDetails',
				})
			},
			
			//商铺列表
			ajaxGetShopList(){
				//ajax个人信息查询
				var that = this;
				const paras = {
					cityCode:"440300",
					pageNo:1,
					pageSize:10,
				};
				paras.accessToken = that.accessToken;
				
				getShopList(paras).then(res => {
					const data = res.data;
					console.log(data);
					
					if(data.code=="200"){
						that.shopList = data.data;
					
					}else{
						
						
					}
					
				})
				.catch(error => {
				
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.v-shops {
		
		.header {
			padding: 0rpx 24rpx;
			background: #1676fe;
			display: flex;
		
			.location {
				font-size: 32rpx;
				color: #ffffff;
				display: flex;
				align-items: center;
		
				.location-icon {
					margin-right: 8rpx;
				}
		
				.arrow {
					transform: rotate(90deg);
					margin-left: 8rpx;
				}
			}
			
			.search {
				flex: 1;
			}
			
			.phone {
				margin-left: 20rpx;
			}
		
		}
		
		.van-popup {
			background-color: #f5f8fa;
		
			.city {
				margin-top: 10rpx;
		
				.van-cell__title {
					>span {
						font-size: 24rpx;
						color: #a5a5a5;
					}
		
					.van-cell__label {
						display: flex;
						align-items: center;
						font-size: 32rpx;
						color: #2e2e2e;
					}
				}
		
				.active {
					.van-cell__label {
						color: #1676fe;
					}
				}
			}
		}
		
		.region {
			display: flex;

			.van-list {
				flex: 1;
			}
		}

		.store-list {
			padding: 0 16rpx;
		}
	}
</style>
