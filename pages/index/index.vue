<template>
	<view class="content">
		<uni-search-bar :radius="100" placeholder="今天想吃点啥？" @confirm="search"></uni-search-bar>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.imageUrl" mode="" @click="goZhuTi()"></image>
			</swiper-item>
		</swiper>
		<uni-grid :column="4" :showBorder="false">
			<uni-grid-item v-for="item in navs" :key="item.title">
				<view :class="item.icons" @click="goZaoju(item)"></view>
				<text>{{item.title}}</text>
			</uni-grid-item>
		</uni-grid>
		<view class="line"></view>
		<view class="recommend">
			<view class="recommend-title">
				菜谱推荐
			</view>
			<view class="" v-for="item in menus" :key="item.id">
				<view class="recommend-img">
					<image :src="item.imgLarge" mode=""></image>
				</view>
				<view class="recommend-foot">
					<text>{{item.name}}</text>
					<text>{{item.needTime}}人收藏</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni/uni-search-bar/uni-search-bar.vue';
	import uniGrid from "@/components/uni/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni/uni-grid-item/uni-grid-item.vue";
	import {
		myRequest,
		myRequestPost
	} from "@/utils/request.js"
	export default {
		components: {
			uniSearchBar,
			uniGrid,
			uniGridItem
		},
		data() {
			return {
				swipers: [],
				navs: [{
						icons: "t-icon t-icon---",
						title: "灶具菜谱",
						path: "/pages/zaoju/zaoju"
					},
					{
						icons: "t-icon t-icon-chufang",
						title: "烤箱菜谱",
						path: "/pages/zaoju/zaoju"
					},
					{
						icons: "t-icon t-icon-ziyuan",
						title: "蒸汽炉菜谱",
						path: "/pages/zaoju/zaoju"
					},
					{
						icons: "t-icon t-icon-kaoxiang",
						title: "微波炉菜谱",
						path: "/pages/zaoju/zaoju"
					}
				],
				menus:[]
			}
		},
		onLoad() {
			this.getSwipers();
			this.getRrecommend();
		},
		methods: {
			async getSwipers() {
				let res = await myRequestPost("/api/theme/list/get")
				this.swipers = res.items.slice(0, 3)
			},
			async getRrecommend() {
				let res = await myRequestPost("/api/recommender/user/get", {
					"userId": null,
					"pageNo": 0,
					"pageSize": 25
				})
				this.menus=res.cookbooks
			},
			goZaoju(item) {
				uni.navigateTo({
					url: item.path
				})
			},
			goZhuTi(){
				uni.navigateTo({
					url:"../zhuti/zhuti"
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		swiper {
			height: 400rpx;

			swiper-item {
				image {
					width: 100%;
					height: 100%;
				}
			}
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
			font-size: 14px;
			color: #885e46;
			font-family: sans-serif;
		}
	}

	.line {
		width: 95%;
		margin: 20rpx auto;
		border: 1rpx solid #CCCCCC;
	}

	.recommend {
		width: 95%;
		margin: 0 auto;

		.recommend-title {
			height: 80rpx;
			line-height: 60rpx;
			color: #885e46;
			font-family: sans-serif;
			font-size: 40rpx;
			font-weight: bold;
		}

		.recommend-img {
			margin: 0 auto;

			image {
				width: 712rpx;
				height: 370rpx;
				border-radius: 20rpx;
			}
		}

		.recommend-foot {
			display: flex;
			justify-content: space-between;
			color: #885e46;
			font-family: sans-serif;
		}
	}
</style>
