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
		<view class="main">
			<view class="title">
				菜谱推荐
			</view>
			<!-- 菜谱列表 -->
			<foodlist :menu="menu"></foodlist>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni/uni-search-bar/uni-search-bar.vue';
	import uniGrid from "@/components/uni/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni/uni-grid-item/uni-grid-item.vue";
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue";
	import foodlist from '@/components/foodlist/foodlist.vue'
	import {
		myRequestPost
	} from '@/utils/request.js'
	export default {
		components: {
			uniSearchBar,
			uniGrid,
			uniGridItem,
			uniIcons,
			foodlist
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
						path: "/pages/oven/oven"
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

		.main {
			.title {
				border-top: 1px solid #ccc;
				padding: 15rpx 0;
				margin: 10rpx 10rpx 10rpx 25rpx;
				font-size: 50rpx;
				font-weight: 700;
			}
		}
	}
</style>
