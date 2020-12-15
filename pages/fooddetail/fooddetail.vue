<template>
	<view class="items">
		<view class="food-head">
			<image :src="detail.imgSmall"></image>
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
		<view v-for="item in detail.materials.accessory" :key="item.id" class="food-ingred" mode="widthFix">
			<text>{{item.name}}</text>
			<text class="text-right">{{item.standardWeight+item.standardUnit}}</text>
		</view>
		<view v-for="item in detail.materials.main" :key="item.id" class="food-ingred" mode="widthFix">
			<text>{{item.name}}</text>
			<text class="text-right">{{item.standardWeight+item.standardUnit}}</text>
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
					<text>{{item.no}}/</text>
					<text>{{detail.steps.length}}{{item.desc}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		myRequestPost
	} from '@/utils/request.js';
	export default {
		data() {
			return {
				id: "",
				detail: []
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

		.inrduc-center {
			position: relative;
			width:680rpx;
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
				left: 240rpx;
			}

			.indruc-main {
				text-indent: 2em;
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
			.food-step-main{
				width: 680rpx;
			}
		}
	}
</style>
