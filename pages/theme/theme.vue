<template>
	<view>
		<view class="recommend" v-for="item in theme" :key="item.id">
			<view class="">
				<view class="recommend-img" @click="goZhuTi(item)">
					<image :src="item.imageUrl" mode=""></image>
				</view>
				<view class="recommend-foot">
					<text class="text-one">{{item.name}}</text>
					<text>{{item.subName}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		myRequest,
		myRequestPost,
		myRequestPostTwo
	} from "@/utils/request.js"
	export default {
		data() {
			return {
				theme:[],
			};
		},
		onLoad() {
			this.getTheme();
		},
		methods: {
			async getTheme() {
				let res = await myRequestPostTwo("/api/theme-manage/theme/list/get")
				console.log(res.items)
				this.theme=res.items
			},
			goZhuTi(item){
				uni.navigateTo({
					url:"../zhuti/zhuti?id="+item.id
				})
			}
		}
	}
</script>

<style lang="less">
	image {
		width: 100%;
	}

	.recommend {
		width: 95%;
		margin: 20rpx auto;

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
			flex-direction: column;

			text {
				font-size: 28rpx;
			}

			.text-one {
				font-size: 40rpx;
				font-family: STHupo;
			}
		}

	}
</style>
