<template>
	<view class="items">
		<view class="food-head">
			<image :src="detail.imgSmall" @click="previewImg(detail.imgSmall)"></image>
		</view>
		<view class="food-name">
			<text>{{detail.name}}</text>
		</view>
		<!-- 菜谱简介 -->
		<view class="food-inrduc">
			<view class="inrduc-center">
				<view class="indruc-l"></view>
				<text>菜谱简介</text>
				<view class="indruc-r"></view>
			</view>
			<text>{{detail.introduction}}</text>
		</view>
		<!-- 菜谱用料 -->
		<view class="meterials">
			<view class="inrduc-center">
				<view class="indruc-l"></view>
				<text>用料</text>
				<view class="indruc-r"></view>
			</view>
			<view v-for="item in detail.materials.accessory" :key="item.id" class="food-ingred" mode="widthFix">
				<text>{{item.name}}</text>
				<text class="text-right">{{item.standardWeight+item.standardUnit}}</text>
			</view>
			<view v-for="item in detail.materials.main" :key="item.id" class="food-ingred" mode="widthFix">
				<text>{{item.name}}</text>
				<text class="text-right">{{item.standardWeight+item.standardUnit}}</text>
			</view>
		</view>
		<!-- 做法步骤 -->
		<view class="food-step">
			<image :src="detail.prepareSteps.img" mode="widthFix"></image>
			<!-- 备菜步骤 -->
			<view class="inrduc-center">
				<view class="indruc-l"></view>
				<text>备菜步骤</text>
				<view class="indruc-r"></view>
			</view>
			<text class="food-step-desc">{{detail.prepareSteps.desc}}</text>
			<!-- 做法步骤 -->
			<view class="inrduc-center">
				<view class="indruc-l"></view>
				<text>做法步骤</text>
				<view class="indruc-r"></view>
			</view>
			<view v-for="item in detail.steps" :key="item.id" mode="widthFix" class="food-step-main">
				<image :src="item.image"></image>
				<view class="steps">
					<text style="color: orange;font-size: 30px;">{{item.no}}</text>
					<text>/</text>
					<text style="color: orange;">{{detail.steps.length}}</text>
					<text>{{item.desc}}</text>
				</view>
			</view>
			<!-- 底部导航 -->
			<view class="goods_nav">
				<uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		myRequestPost
	} from '@/utils/request.js';
	import uniGoodsNav from '@/components/uni/uni-goods-nav/uni-goods-nav.vue';
	export default {
		components: {
			uniGoodsNav
		},
		data() {
			return {
				id: "",
				detail: [],
				options: [{
					icon: 'heart',
					text: '收藏'
				}, {
					icon: 'home',
					text: '首页',

				}, {
					icon: 'redo',
					text: '分享',
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getSwipers()
		},
		methods: {
			async getSwipers() {
				let result = await myRequestPost("/api/cookbook/details/get-by-id", {
					"cookbookId": this.id
				});
				if (result.rc === 0) {
					this.detail = result.cookbook;
				}
				console.log(result)
			},
			previewImg(imageUrl) {
				console.log(imageUrl) // http://192.168.100.251:8970/6_1597822634094.png
				var images = [];
				images.push(imageUrl);
				console.log(images)
				uni.previewImage({ // 预览图片  图片路径必须是一个数组 => ["http://192.168.100.251:8970/6_1597822634094.png"]
					current: 0,
					urls: images
				});
			},
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none',

				})
				console.log(e.index)
				if (e.index == 0) {
					console.log(点击了收藏)
				} else if (e.index == 1) {
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else {
					uni.share({
						provider: "weixin",
						title: "uniapp",
						scene: "WXSceneSession",
						type: 1,
						summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
						success: function(res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function(err) {
							console.log("fail:" + JSON.stringify(err));
						}
					})
					console.log("点击了分享")
				}
			},
			buttonClick(e) {
				console.log(e)
				this.options[2].info++
			}
		}
	}
</script>

<style lang="scss">
	.items {
		display: flex;
		box-sizing: border-box;
		flex-wrap: wrap;
		font-family: "楷体";

		.food-head {
			image {
				width: 750rpx;
				height: 550rpx;
			}
		}

		.food-name {
			position: absolute;
			top: 460rpx;
			left: 375rpx;
			margin-left: -30rpx;
			width: 60rpx;
			background-color: #fff;
			opacity: 0.7;
			border: 1px solid;
			border-radius: 30rpx;
			text-align: center;
		}

		.food-inrduc {
			width: 710rpx;
			margin-top: 100rpx;
			margin-left: 10px;
			color: #979797;
		}

		.meterials {
			margin-left: 20rpx;

			.inrduc-center {
				text {
					margin-left: 30rpx;
				}
			}
		}

		.goods_nav {
			position: fixed;
			bottom: 0;
			width: 100%;
		}

		.inrduc-center {
			position: relative;
			width: 680rpx;
			left: 200rpx;
			top: 20rpx;
			text-indent: 2em;
			font-size: 20px;
			color: #222222;
			margin-bottom: 40rpx;

			view {
				position: absolute;
				top: 8px;
				left: -45rpx;
				background-color: orange;
				width: 45px;
				height: 2px;
			}

			.indruc-r {
				left: 270rpx;
			}

		}

		.food-ingred {
			width: 650rpx;
			height: 50rpx;
			line-height: 50rpx;
			color: #333;
			margin: 0 auto;
			border-bottom: 1px solid #ccc;

			text {
				margin-left: 130rpx;
			}

			.text-right {
				margin-right: 150rpx;
				float: right;
			}
		}

		.food-step {
			display: flex;
			box-sizing: border-box;
			flex-wrap: wrap;

			image {
				height: 300px;
				margin-left: 50rpx;
			}

			.food-step-desc {
				width: 650rpx;
				margin-left: 60rpx;
				line-height: 18px;
				margin-bottom: 20rpx;
			}

			.steps {
				display: flex;
				box-sizing: border-box;
				margin: 5px 0 5px 25px;
			}

			.food-step-main {
				width: 680rpx;
			}
		}
	}
</style>
