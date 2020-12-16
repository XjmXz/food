<template>
	<view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#4cd964"></uni-segmented-control>
		<view v-if="current === 0">
			<detail :square="square"></detail>
			<uni-load-more v-if="!flag" :status="'loading'" class=""></uni-load-more>
			<uni-load-more v-else :status="'noMore'"></uni-load-more>
		</view>
		<view v-if="current === 1">
			选项卡2的内容
		</view>
		<view v-if="current === 2">
			<likechoice :elite="elite"></likechoice>
			<uni-load-more v-if="!flag" :status="'loading'"></uni-load-more>
			<uni-load-more v-else :status="'noMore'"></uni-load-more>
		</view>
	</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni/uni-load-more/uni-load-more.vue"
	import uniSegmentedControl from "@/components/uni/uni-segmented-control/uni-segmented-control.vue"
	import detail from '@/components/foodlist/detail-xuchen.vue'
	import likechoice  from '@/components/foodlist/likechoice.vue'
	import {
		myRequestGet
	} from '@/utils/request-xuchen.js';
	export default {
		data() {
			return {
				id: "",
				pageindex: 1,
				flag: false,
				square: [],
				elite:[],
				items: ['看帖', '投票', '精华'],
				current: 0
			};
		},
		onLoad(options) {
			this.id = options.id;
			this.getSquareWatch();
			this.getLikechioce();
		},
		components: {
			uniSegmentedControl,
			uniLoadMore,
			detail,
			likechoice
		},
		methods: {
			//https: //api5.meishichina.com/api.php?p=%7B%22m%22%3A%7B%22pai_getPaiList%22%3A%7B%22type%22%3A%22vote%22%2C%22
			// pageindex%22%3A1%7D%7D%2C%22openudid%22%3A%22meishichina%22%2C%22uid%22%3A12656254%2C%22appver%22%3A%223028%22%2C%22device%22%3A%22microsoftmicrosoft%22%2C%22appname%22%3A%22xcx_weixin%22%2C%22session%22%3A%22xcx_weixin%3Aweixin%3A12656254%3Ag4j5SkNMeV2KNerCulQ1YPuLTnGKQI1J%22%7D			
			async getSquareWatch() {
				let result = await myRequestGet('/api.php', {
					p: {
						"m": {
							"pai_getPaiList": {
								"type": "all",
								"pageindex": this.pageindex
							}
						},
						"openudid": "meishichina",
						"uid": 12656254,
						"appver": "3028",
						"device": "microsoftmicrosoft",
						"appname": "xcx_weixin",
						"session": "xcx_weixin:weixin:12656254:g4j5SkNMeV2KNerCulQ1YPuLTnGKQI1J"
					}
				});
				// this.goods = [...this.goods, ...result.message];
				// this.square = result.pai_getPaiList.data;
				console.log(result,"uuuuuuuuuuuuuuuuu");
				//this.square = [...this.square, ...result.pai_getPaiList.data];
			},
			async getLikechioce() {
				let result = await myRequestGet('/api.php', {
					p: {
						"m": {
							"pai_getPaiList": {
								"type": "elite",
								"pageindex": this.pageindex
							}
						},
						"openudid": "meishichina",
						"uid": 12656254,
						"appver": "3028",
						"device": "microsoftmicrosoft",
						"appname": "xcx_weixin",
						"session": "xcx_weixin:weixin:12656254:g4j5SkNMeV2KNerCulQ1YPuLTnGKQI1J"
					}
				});
				// this.elite = result.pai_getPaiList.data;
				// this.elite = [...this.elite, ...result.pai_getPaiList.data];
				// console.log(result,"222222222222222222");
			},
			onPullDownRefresh() {
				this.pageindex = 1;
				this.flag = false;
				this.square = [];
				this.elite=[];
				//请求完成之后停止下拉刷新
				this.getSquareWatch().then(() => {
					uni.stopPullDownRefresh()
				});
				this.getLikechioce().then(() => {
					uni.stopPullDownRefresh()
				});
			},
			//通过onReachBottom来监听触底
			onReachBottom() {
				this.pageindex++;
				if (this.pageindex <= 2) {
					this.getSquareWatch();
				} else {
					//没有更多数据了
					this.flag = true;
				}
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		}
	}
</script>
<style lang="scss">
	.segmented-control{
		// position: fixed;
	}
</style>

