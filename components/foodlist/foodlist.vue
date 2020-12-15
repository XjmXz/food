<template>
	<view class="recommend">
		<view v-for="item in zaojulist" :key="item.id" class="items" mode="widthFix" @click="itemClick(item)">
			<view class="item-main">
				<image :src="item.imgLarge"></image>
				<view class="item-text"> <text>{{item.name}}</text>
					<text class="text-right">{{item.collectCount}}人收藏</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		myRequestPost
	} from '@/utils/request.js'
	export default {
		props: ['zaojulist'],
		data() {
			return {

			};
		},
		methods: {
			itemClick(item) {
				uni.navigateTo({
					url: '/pages/goodsdetail/goodsdetail'
				})
			}
		}
	}
</script>

<style lang="scss">
	.recommend {
		.items {
			.item-main {
				margin: 0 25rpx;
	
				image {
					width: 700rpx;
					height: 400rpx;
					border-radius: 16rpx;
				}
	
				.item-text {
					margin: 10rpx 0 30rpx;
	
					.text-right {
						float: right;
					}
				}
			}
		}
	}
</style>
