<template>
	<view class="v-brand">
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
				<van-icon name="phone" color="#fff" class="phone" />
			</view>
			<!-- 地址弹出层 -->
			<van-popup :show="locationShow" @close="onClose" position="top" round custom-style="max-height: 60%;">
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
				<van-dropdown-item title="业态" :style="{display: areaShow ? 'block' : 'none'}" @close="areaShow=false" @open="areaShow=true">
					<van-picker :columns="columns" @change="onChange" />
					<view class="btn">
						<van-button type="primary" block color="#BDBDBD" class="eliminate">清除</van-button>
						<van-button type="primary" block color="#1676FE" class="determine">确定</van-button>
					</view>
				</van-dropdown-item>
				<van-dropdown-item title="拓展区域">
					<van-tree-select height="55vw" :items="items" :main-active-index="mainActiveIndex" :active-id="activeId" selected-icon="success"
					 @click-nav="onClickNav" @click-item="onClickItem">
							<van-tree-select height="55vw" :items="property" :main-active-index="mainActiveIndex" :active-id="activeId" selected-icon="success"
							@click-nav="onClickNav" @click-item="onClickItem" />
					 </van-tree-select>
				</van-dropdown-item>
				<van-dropdown-item title="物业">
					<van-tree-select height="55vw" :items="property" :main-active-index="mainActiveIndex" :active-id="activeId" selected-icon="success"
					 @click-nav="onClickNav" @click-item="onClickItem" />
				</van-dropdown-item>
				<van-dropdown-item title="面积">
					<van-tree-select height="55vw" :items="measure" :main-active-index="mainActiveIndex" :active-id="activeId" selected-icon="success"
					 @click-nav="onClickNav" @click-item="onClickItem" />
				</van-dropdown-item>
			</van-dropdown-menu>
		</van-sticky>
		<view class="store-list">
			<van-empty v-if="brandList.length==0" description="暂无数据" />
			<BrandCard v-for="(item,index) in brandList" :sourceData="item" :key="index" />
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import BrandCard from '../../components/Card/Brand'
	import {getBrandList, getAreaStreets,} from "../../utils/api.js"
	import Toast from "../../wxcomponents/vant/dist/toast/toast";
	export default {
		components: {
			BrandCard
		},
		data() {
			return {
				locationShow: false,
				cityList: ["北京", "上海", "广州", "深圳"],
				activeCity: '',
				value: '',
				mainActiveIndex: 0,
				activeId: null,
				brandList:[],
				items: [
					{
						text: '街道',
						children: []
					},
					{
						text: '地铁',
						children: []
					},
				],
				property: [{
						text: '物业类型',
						children: [],
					},
				],
				measure: [
					{
						text: '附近',
						children: [],
					}
				],
				columns: [
				  {
				    values: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
				    className: 'column1',
				  },
				  {
				    values: ['福州', '厦门', '莆田', '三明', '泉州'],
				    className: 'column2',
				  },
				],
				areaShow: false,
				pageNo:1,
				pageSize:10,
				reload: false
			}
		},
		onLoad() {
			//请求品牌列表
			this.ajaxGetBrandList();
			this.ajaxGetAreaStreets();
			
			this.measure[0].children = [];
			this.Dict.search_month_rent.forEach((item) => {
				this.measure[0].children.push({
					text: item.itemText,
					id: item.itemValue,
				});
			});
			
			this.property[0].children = [];
			this.Dict.property_type.forEach((item) => {
				this.property[0].children.push({
					text: item.itemText,
					id: item.itemValue,
				});
			});
			
		},
		methods: {
			onReachBottom() {
				console.log("onReachBottom");
				this.loadMoreText = '更多';
				this.ajaxGetBrandList();
			},
			onPullDownRefresh() {
				console.log("onPullDownRefresh");
				this.reload = true;
				this.ajaxGetBrandList();
			},
			onChange(e) {
				 const { picker, value, index } = e.detail;
				 console.log(picker, value, index)
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
			
			//城市联动
			ajaxGetAreaStreets() {
				//ajax个人信息查询
				var that = this;
				const paras = {
					cityCode: this.$Localtion.city.cityCode,
				};
				paras.accessToken = that.accessToken;
			
				getAreaStreets(paras)
					.then((res) => {
						const data = res.data;
						console.log(data);
			
						if (data.code == "200") {
							that.items[0].children = [];
							data.data.forEach((item) => {
								let area = {};
								area.id = item.areaCode;
								area.text = item.areaName;
								area.children = [];
								item.streetVoList.forEach((street) => {
									let streetItem = {};
									streetItem.id = street.streetCode;
									streetItem.text = street.streetName;
									streetItem.children = [];
									area.children.push(streetItem);
								});
								that.items[0].children.push(area);
							});
							that.$forceUpdate();
						} else {}
					})
					.catch((error) => {});
			},
	
			reloadData(){
				this.shopList = [];
				this.ajaxGetBrandList();
			},
			
			setTime: function(items) {
				var newItems = [];
				items.forEach(e => {
					newItems.push(e);
				});
				return newItems;
			},
			//品牌列表
			ajaxGetBrandList(){
				//ajax个人信息查询
				var that = this;
				
				if (this.brandList.length>0) {
					//说明已有数据，目前处于上拉加载
					this.loadMoreText = '加载中';
					this.pageNo = Math.floor(this.brandList.length/this.pageSize)+1;
					this.pageSize = 10;
					//判断是否要需要请求
					if(parseInt(this.brandList.length%this.pageSize) !== 0){ 
						this.loadMoreText = '没有更多';
						return;
					}
				}else{
					this.pageNo = 1;
					this.pageSize = 10;
				}
				
				const paras = {
					cityCode:this.$Localtion.city.cityCode,
					pageNum: this.pageNo,
					pageSize: this.pageSize,
				};
				paras.accessToken = that.accessToken;
				const toast = Toast.loading({
					message: "加载中...",
					forbidClick: true,
					loadingType: "spinner",
				});
				getBrandList(paras).then(res => {
					const data = res.data;
					console.log(data.data.records);
					if(data.code == "200"){
						console.log(list)
						// toast.clear();
						let list = data.data.records;
						that.brandList = that.reload ? list : that.brandList.concat(list);
						that.reload = false;
						console.log('that.brandList', that.brandList, list, 111111111)
					}else{
						Toast.fail(data.message);
					}
				}).catch(error => {
					Toast.fail(this.global.error);
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.v-brand {
		
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
			padding: 30rpx 25rpx;
			background-color: #F5F8FA;
		}
		.btn {
			display: flex;
			
			/deep/ .van-button {
				border-radius: 0;
			}
			
			.eliminate {
				flex: 1;
			}
			.determine {
				flex: 1;
				border-radius: 0;
			}
		}
	}
</style>
