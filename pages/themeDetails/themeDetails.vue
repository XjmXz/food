<template>
	<view class="continer">
		<view class="title">
			{{themeName}}
		</view>
		<view class="themeIntroduce">
			{{themeDescription}}
		</view>
		<view class="title2">推荐菜</view>
		<view v-for="item in themeList" :key="item.id" class="buttons">
			<button type="default" class="button_item" @click="goFoodDetails(item)">{{item.name}}</button>
		</view>

		<view class="foodsPhoto" v-for="item in themeList" :key="item.id">
			<view class="Photo_item">
				<image :src="item.imgLarge"  @click="goFoodDetails(item)"></image>
				<view class="text">
					<text class="left">{{item.name}}</text>
					<view class="right">
							<uni-icons type="heart" size="20"></uni-icons>
						<!-- </text> -->
						<!-- <text @click="handleCollection" v-if="!isCollected">
							<uni-icons type="heart-filled" size="20" color="red"></uni-icons>
						</text> -->
						<text class="collect">{{item.collectCount}}人收藏</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		myRequestPost
	} from "@/utils/request.js";
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"

	export default {
		data() {
			return {
				themeId: "",
				themeDescription: "",
				themeName: "",
				themesIdList: [],
				themeList: {},
				isCollected: true


			}
		},
		components: {
			uniIcons
		},

		onLoad(options) {
			this.themeId = options.themeId;
			this.getThemeDetail();

		},
		methods: {
			async getThemeDetail() {
				const res = await myRequestPost("/api/theme/list/get")
				console.log(res, "vvvvvvvvvvvvvvvvvv");
				console.log(this.themeId);
				for (var i = 0; i < res.items.length; i++) {
					if (res.items[i].id == this.themeId) {
						this.themeDescription = res.items[i].description;
						this.themeName = res.items[i].name;
						var str = res.items[i].relateCookbookId;
						this.themesIdList = str.split(",").map(Number);
						console.log(this.themesIdList, "ccccccccccccccccc");
					}
				}

				const res1 = await myRequestPost("/api/cookbook/get-by-ids", {
					"CookbookIdList": this.themesIdList,
				});
				this.themeList = res1.cookbooks;
			},

			goFoodDetails(item) {
				uni.navigateTo({
					url: `/pages/fooddetail/fooddetail?id=${item.id}`
				})
			},

			handleCollection() {
				this.isCollected = !(this.isCollected);
			}


		}
	}
</script>

<style lang="less">
	page {
		width: 750rpx;
		height: 100%;
		font-family: "楷体";

		.continer {
			width: 700rpx;
			height: 100%;
			margin: 20rpx auto;

			.title {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				font-family: "楷体";
				text-align: center;

			}

			.themeIntroduce {
				margin-top: 20rpx;
				color: #999999;

			}

			.title2 {
				font-size: 40rpx;
				margin-top: 20rpx;
				font-family: "楷体";

			}

			.buttons {
				display: inline-block;
				padding: 0;
				border: none;

				button {
					height: 30rpx;
					margin-left: 10rpx;
					padding: 0 10rpx 0 10rpx;
					font-size: 24rpx;
					line-height: 30rpx;
					color: #c2a054;
					background-color: #fff5e1;
					border: none;
				}
			}

			.foodsPhoto {
				width: 670rpx;
				margin: 0 auto;
				margin-top: 40rpx;

				.Photo_item {
					image {
						width: 670rpx;
						height: 380rpx;
						border-radius: 16rpx;
						background-size: cover;
					}

					.text {
						width: 670rpx;
						height: 40rpx;
						display: flex;
						flex-direction: row;
						justify-content: space-between;

						.right {
							uni-icons {
								margin-top: 10rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
