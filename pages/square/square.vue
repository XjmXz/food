<template>
	<view class="Box">
		<view class="top">
			<view class="nav">
				<view class="nav-item ">
					<view class="item" :class="{ active: isActive == 1 }" @click="chenked(1)">看帖</view>
				</view>
				<view class="nav-item ">
					<view class="item" :class="{ active: isActive == 2 }" @click="chenked(2)">投票</view>
				</view>
				<view class="nav-item ">
					<view class="item" :class="{ active: isActive == 3 }" @click="chenked(3)">精华</view>
				</view>
			</view>
		</view>
		<!-- nav-item -->
		<view class="nav_item" v-if="isActive == 1">
			<zuj1></zuj1>
		</view>
		<view class="nav_item" v-if="isActive == 2">
			<zuj2 :tabs="tabs"></zuj2>
		</view>
		<view class="nav_item" v-if="isActive == 3">
			<zuj3></zuj3>
		</view>
	</view>

</template>

<script>
	import {
		meiRequestGet
	} from '@/utils/request.js'
	import zuj2 from '@/components/zuj2/zuj2.vue'
	export default {
		data() {
			return {
				isActive: 1,
				tabs: []
			};
		},
		onLoad() {
			this.getPailList()
		},
		methods: {
			chenked(type) {
				this.isActive = type;
			},

			async getPailList() {
				const res = await meiRequestGet("https://api5.meishichina.com/api.php", {
					p: {
						"m": {
							"pai_getPaiList": {
								"type": "vote",
								"pageindex": 1
							}
						},
						"openudid": "meishichina",
						"uid": "",
						"appver": "3028",
						"device": "microsoftmicrosoft",
						"appname": "xcx_weixin",
						"session": ""
					}
				})
				this.tabs = res.pai_getPaiList.data
				console.log(this.tabs)
			},

		},
		components: {
			zuj2
		}
	}
</script>

<style lang="scss" scoped>
	.Box {
		.top {
			.nav {
				background-color: #fff;
				display: flex;
				height: 44px;
				color: #353b48;
				font-size: 16px;
				overflow: scroll;

				.nav-item {
					// width: 80px;
					flex: 1;

					.item {
						text-align: center;
						height: 33px;
						line-height: 33px;
						margin-top: 10px;
					}

					.active {
						color: rgb(255, 116, 116);
						font-weight: 550;
						position: relative;
					}

					.active::after {
						content: '';
						position: absolute;
						top: 25px;
						width: 65rpx;
						height: 8rpx;
						background-color: rgb(255, 103, 103);
						left: 0px;
						right: 0px;
						bottom: 0px;
						margin: auto;
					}
				}
			}
		}
	}
</style>
