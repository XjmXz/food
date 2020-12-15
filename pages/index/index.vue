<template>
	<view class="content">
		<uni-search-bar :radius="100" placeholder="今天想吃点啥？" @confirm="search"></uni-search-bar>
		<swiper class="swiper" indicator-dots :autoplay="true" :interval="3000" circular>
			<swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.imageUrl"></image>
			</swiper-item>
		</swiper>
		<uni-grid :column="4" :showBorder="false">
			<uni-grid-item v-for="item in navs" :key="item.title">
				<view :class="item.icons" @click="goZaoju(item)"></view>
				<text>{{item.title}}</text>
			</uni-grid-item>
		</uni-grid>
		<view class="recommend">
			<view class="title">
				菜谱推荐
			</view>
			<view v-for="item in menu" :key="item.id" class="item" @click="itemClick(item)">
				<view class="item-main">
					<image :src="item.imgLarge"></image>
					<view class="item-text">
						<view>
							<text>{{item.name}}</text>
						</view>
						<view>
							<uni-icons type="heart" size="20"></uni-icons>
							<text class="text-right">{{item.collectCount}}人收藏</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni/uni-search-bar/uni-search-bar.vue';
	import uniGrid from "@/components/uni/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni/uni-grid-item/uni-grid-item.vue";
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	import {
		myRequestPost
	} from '@/utils/request.js'
	export default {
		components: {
			uniSearchBar,
			uniGrid,
			uniGridItem,
			uniIcons
		},
		data() {
			return {
				swipers: [],
				menu: [],
				navs: [{
						icons: "t-icon t-icon-guotiex",
						title: "灶具菜谱",
						path: "/pages/zaoju/zaoju"
					},
					{
						icons: "t-icon t-icon-wan",
						title: "烤箱菜谱",
						path: "/pages/zaoju/zaoju"
					},
					{
						icons: "t-icon t-icon-xiaolongbao",
						title: "蒸汽炉菜谱",
						path: "/pages/zaoju/zaoju"
					},
					{
						icons: "t-icon t-icon-xiaolongbao",
						title: "微波炉菜谱",
						path: "/pages/zaoju/zaoju"
					}
				]
			}
		},
		onLoad() {
			this.getSwipers(),
				this.getMenu()
		},
		methods: {
			async getSwipers() {
				let result = await myRequestPost("/api/theme/list/get");
				if (result.rc === 0) {
					this.swipers = result.items.slice(0, 3);
				}
				console.log(result)
			},
			async getMenu() {
				let result = await myRequestPost("/api/recommender/user/get", {
					"userId": null,
					"pageNo": 0,
					"pageSize": 25
				})
				console.log(result.cookbooks);
				this.menu = result.cookbooks;
			},
			goZaoju(item) {
				uni.navigateTo({
					url: item.path
				})
			},
			itemClick(item) {
				uni.navigateTo({
					url: '/pages/fooddetail/fooddetail?id=' + item.id
				})
			}

		}
	}
</script>

<style lang="scss">
	.content {
		.swiper {
			height: 380rpx;

			image {
				width: 750rpx;
				height: 380rpx;
			}
		}

		.uni-grid-item {
			text-align: center;

			.t-icon {
				line-height: 90rpx;
				width: 110rpx;
				height: 110rpx;
				margin: 10rpx auto;
				font-size: 25px;
			}

			text {
				font-size: 12px;
			}
		}

		.recommend {
			.title {
				border-top: 1px solid #ccc;
				padding: 15rpx 0;
				margin: 10rpx 10rpx 10rpx 25rpx;
				font-size: 50rpx;
				font-weight: 700;
			}

			.item {
				.item-main {
					margin: 0 25rpx;

					image {
						width: 700rpx;
						height: 450rpx;
						border-radius: 20rpx;
					}

					.item-text {
						display: flex;
						justify-content: space-between;
						margin: 15rpx 0 15rpx 10rpx;
						font-size: 30rpx;

						.text-right {
							float: right;
							margin-right: 30rpx;
						}
					}
				}
			}
		}
	}
</style>
