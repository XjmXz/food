<template>
	<view>
		<view class="img">
			<image :src="foodDetail.imgLarge" mode=""></image>
			<view class="box">
				<view class="name">
					{{foodDetail.name}}
				</view>
			</view>
			<view class="collect">
				<text>收藏{{foodDetail.collectCount}}</text>
			</view>
		</view>

		<view class="continer">
			<view class="brief">
				<view class="text">——菜谱简介——</view>
				<view class="brief_more">{{foodDetail.introduction}}</view>
			</view>

			<view class="materials">——用料——</view>
			<view class="materials_more">
				<view v-for="item in foodDetail.materials.main" :key="item.id" class="box_1">
					<view class="left">
						{{item.name}}
					</view>
					<view class="right">
						{{item.standardWeight+item.standardUnit}}
					</view>
				</view>

				<view v-for="item in foodDetail.materials.accessory" :key="item.id" class="box_1">
					<view class="left">
						{{item.name}}
					</view>
					<view class="right">
						{{item.standardWeight+item.standardUnit}}
					</view>
				</view>
			</view>

			<view class="materials">——备菜步骤——</view>
			<view class="prepares" v-for="item in foodDetail.prepareSteps.steps" :key="item.desc">
				<view class="image">
					<image :src="item.imgUrl"></image>
				</view>
				<view class="texts">
					<text class="text_1">{{item.no}}</text>
					<text class="text_2">/</text>
					<text class="text_3">{{length}}</text>
					<text>{{item.desc}}</text>
				</view>
			</view>
			<view class="materials">——做法步骤——</view>
			<view class="prepares" v-for="item in make" :key="item.no">
				<view class="image">
					<image :src="item.image"></image>
				</view>
				<view class="texts">
					<text class="text_1">{{item.no-n}}</text>
					<text class="text_2">/</text>
					<text class="text_3">{{count}}</text>
					<text>{{item.desc}}</text>
				</view>
			</view>
			<view class="download">下载菜谱到手机</view>
		</view>


		<view class="tab">
			<view class="tab_item">
				<uni-icons type="heart" size="20"></uni-icons>
				<view class="">收藏</view>
			</view>

			<view class="tab_item" @click="goIndex()">
				<uni-icons type="home" size="20"></uni-icons>
				<view>首页</view>
			</view>

			<view class="tab_item">
				<uni-icons type="redo" size="20"></uni-icons>
				<view class="">分享</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue";
	import {
		myRequestPost
	} from "@/utils/request.js";
	export default {
		data() {
			return {
				id: "",
				foodDetail: {},
				length: "",
				step_length: "",
				make: {},
				count: "",
				n: 0


			};
		},

		components: {
			uniIcons
		},
		onLoad(options) {
			this.id = options.id;
			this.getFoodDetail();
		},
		methods: {
			async getFoodDetail() {
				const res = await myRequestPost("/api/cookbook/details/get-by-id", {
					"cookbookId": this.id,
				});
				console.log(typeof(res));
				this.foodDetail = res.cookbook;
				console.log(this.foodDetail, "bbbbbbbbbbbbbbbbbbbbbbbbbbb");
				//step_length------备菜的步骤数组长度
				this.length = this.foodDetail.prepareSteps.steps.length;
				//step_length------做菜的步骤数组长度
				this.step_length = this.foodDetail.steps.length;
				this.make = this.foodDetail.steps;
				this.count = this.step_length;

				for (var i = 0; i < this.step_length; i++) {
					for (var j = 0; j < this.length; j++) {
						if (this.make[i].desc == this.foodDetail.prepareSteps.steps[j].desc) {
							this.make.splice(i, 1);
							this.count--;
							this.n++;
						}
					}
				}
				console.log(this.make);
			},
			goIndex() {

				uni.switchTab({
					url: "/pages/index/index"
				})
			}
		}

	}
</script>

<style lang="less">
	page {
		width: 100%;
		height: 100%;
		font-family: "楷体";

		.img {
			width: 750rpx;
			height: 450rpx;
			position:relative;

			image {
				width: 750rpx;
				height: 450rpx;
				background-size: cover;
			}
			
			.box {
				width: 100rpx;
				height: auto;
				background-color: rgba(255, 255, 255, 0.5);
				border-radius: 20rpx;
				position: absolute;
				left: 50%;
				margin-left: -50rpx;
				bottom:-100rpx;
				
			
				.name {
					margin: 0 auto;
					width: 80rpx;
					height:auto;
					border: 1px solid;
					border-radius: 30rpx;
					font-size: 42rpx;
					text-align: center;
			
				}
			}
			
			.collect{
				position: absolute;
				width:150rpx;
				height:30rpx;
				right:-20rpx;
				text{
					font-size: 24rpx;
					font-weight: bold;
					color:#999999;
					text-align: right;
				}
				
			}

		}

		.continer {
			width: 700rpx;
			margin-top:150rpx;
			margin-left: 25rpx;
			display: flex;
			flex-direction: column;
			.brief {
				.text {
					font-size: 40rpx;
					width: 400rpx;
					height: 40rpx;
					line-height: 40rpx;
					margin: 0 auto;
					text-align: center;
					font-weight: bold;
				}

				.brief_more {
					margin-top: 20rpx;
				}
			}

			.materials {
				width:500rpx;
				font-size: 40rpx;
				color: #e9a815;
				font-weight: bold;
				margin-left: 100rpx;
				margin-top: 100rpx;
				text-align: center;
			}

			.materials_more {
				margin-top: 40rpx;

				.box_1 {
					display: flex;
					justify-content: space-around;
					margin-top: 20rpx;
					border-bottom: 1px #c8c8c8 solid;

					.left {
						width: 150rpx;
						text-align: center;
					}

					.right {
						width: 80rpx;
						text-align: center;
					}
				}
			}

			.prepares {
				margin-top: 40rpx;

				.image {
					margin: 0 auto;
					width: 650rpx;
					height: 500rpx;

					image {
						width: 650rpx;
						height: 500rpx;
					}

					margin-bottom: 30rpx;
				}

				.texts {

					width: 600rpx;
					margin: 10rpx auto;

					.text_1 {
						color: #e9a815;
						font-size: 40rpx;
					}

					.text_3 {
						color: #e9a815;

					}
				}
			}

			.download {
				background-color: #fb3a3a;
				width: 600rpx;
				height: 80rpx;
				margin-left: 50rpx;
				margin-bottom: 150rpx;
				border-radius: 16rpx;
				text-align: center;
				color: #FFFFFF;
				line-height: 80rpx;
				margin-top: 50rpx;
			}
		}


		.tab {
			background-color: #E9E9E9;
			width: 750rpx;
			height: 100rpx;
			display: flex;
			position: fixed;
			justify-content: space-around;
			left: 0;
			bottom: 0;
			z-index: 999;

			.tab_item {
				margin-top: 10rpx;
			}

			view {
				text-align: center;
			}
		}

	}
</style>
