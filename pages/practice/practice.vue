<template>
	<view>
		<view class="title">
			<image :src="practice.imgSmall"></image>
			<view class="caiming">
				{{practice.name}}
			</view>
			<text>收藏{{practice.collectCount}}</text>
		</view>
		<!-- introduce  介绍 -->
		<view class="introduce">
			<view class="introduce-title">
				<view class="introduce-left"></view>
				<view class="introduce-center">菜谱简介<image src="../../static/tabs/square.png" mode=""></image>
				</view>
				<view class="introduce-right"></view>
			</view>
			<view class="introduce-content">
				{{practice.introduction}}
			</view>
		</view>
		<!-- Materials 用料 -->
		<view class="introduce">
			<view class="introduce-title">
				<view class="introduce-left"></view>
				<view class="introduce-center">用料<image src="../../static/tabs/square.png" mode=""></image>
				</view>
				<view class="introduce-right"></view>
			</view>
			<view class="Materials">
				<view class="yuanliao" v-for="item in main" :key="item.id">
					<text>{{item.name}}</text>
					<text>{{item.standardWeight}}{{item.standardUnit}}</text>
				</view>
			</view>
			<view class="Materials">
				<view class="yuanliao" v-for="item in accessory" :key="item.id">
					<text>{{item.name}}</text>
					<text>{{item.standardWeight}}{{item.standardUnit}}</text>
				</view>
			</view>
		</view>
		<!-- Prepare-dishes 备菜 -->
		<view class="introduce">
			<view class="introduce-title">
				<view class="introduce-left"></view>
				<view class="introduce-center">备菜步骤<image src="../../static/tabs/square.png" mode=""></image>
				</view>
				<view class="introduce-right"></view>
			</view>
			<view class="Prepare-dishes">
				<image :src="practice.prepareSteps.img" mode="widthFix"></image>
				<view class="content">
					{{practice.prepareSteps.desc}}
				</view>
			</view>
		</view>
		<view class="introduce">
			<view class="introduce-title">
				<view class="introduce-left"></view>
				<view class="introduce-center">做法步骤<image src="../../static/tabs/square.png" mode=""></image>
				</view>
				<view class="introduce-right"></view>
			</view>
			<!-- step 步骤 -->
			<view class="step">
				<view class="step-one" v-for="item in step" :key="item.desc">
					<image :src="item.image"></image>
					<text>{{item.no}}</text><text>{{item.desc}}</text>
				</view>
			</view>
		</view>
		<view class="anniu">
			<button type="warn" size="mini" @click="open">
				<uni-icons type="contact" size="15"></uni-icons>下载菜谱到手机
			</button>
			<uni-popup ref="popup" type="message">
				<uni-popup-message type="success" message="成功消息" :duration="0"></uni-popup-message>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import {
		myRequest,
		myRequestPost
	} from "@/utils/request.js"
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	import uniPopup from '@/components/uni/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniIcons,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				id: "",
				practice: "",
				step: [],
				main: [],
				accessory: [],
			}
		},
		onLoad(options) {
			this.id = options.id
			console.log(options, "aaaaaaaaa")
			this.getPractice()
			this.niHao()
		},
		methods: {
			async getPractice() {
				let res = await myRequestPost("/api/cookbook/details/get-by-id", {
					"cookbookId": this.id,
					"entranceCode": "code1"
				})
				console.log(res)
				this.practice = res.cookbook
				this.step = res.cookbook.steps
				this.main = res.cookbook.materials.main
				this.accessory = res.cookbook.materials.accessory
			},
			open() {
				uni.querySelector("button").open()
			}
		}
	}
</script>

<style lang="less" scoped>
	.title {
		image {
			width: 100%;
			height: 400rpx;
			position: relative;
		}

		.caiming {
			width: 60rpx;
			height: 214rpx;
			color: #e9a06f;
			text-align: center;
			border: 1px solid #e9a06f;
			border-radius: 20rpx;
			box-shadow: 10px 10px 5px #888888;
			background-color: #F0F0F0;
			position: absolute;
			left: 50%;
			margin-left: -30rpx;
			top: 300rpx;
			z-index: 1000000;
			opacity: 50;
		}

		text {
			color: #e9a06f;
			float: right;
			margin-top: 20rpx;
		}
	}

	.introduce {
		margin-top: 140rpx;
		position: relative;

		.introduce-left {
			width: 60rpx;
			border: 1px solid #e9a06f;
			position: absolute;
			top: 20rpx;
			left: 216rpx;
		}

		.introduce-center {
			width: 300rpx;
			height: 100rpx;
			margin: 0 auto;
			color: #e9a06f;
			text-align: center;
			position: relative;

			image {
				width: 50rpx;
				height: 50rpx;
				position: absolute;
				top: 35rpx;
				left: 50%;
				margin-left: -25rpx;
			}
		}

		.introduce-right {
			width: 60rpx;
			border: 1px solid #e9a06f;
			position: absolute;
			top: 20rpx;
			right: 216rpx;
		}

		.introduce-content {
			width: 90%;
			margin: 0 auto;
			font-family: 'Courier New', Courier, monospace;
			font-size: 30rpx;
		}
	}

	.Materials {
		width: 90%;
		margin: 0 auto;

		.yuanliao {
			display: flex;
			justify-content: space-around;
			border-bottom: 1px solid #CCCCCC;
		}
	}

	.Prepare-dishes {
		width: 90%;
		margin: 0 auto;
		font-size: 30rpx;

		image {
			width: 100%;
			border-radius: 10rpx;
		}
	}

	.step {
		width: 90%;
		margin: 0rpx auto;
		text-align: center;

		.step-one {
			margin-top: 20rpx;
		}

		image {
			width: 100%;
			border-radius: 10rpx;
		}
	}

	.anniu {
		width: 300rpx;
		margin: 30rpx auto;
	}
</style>
