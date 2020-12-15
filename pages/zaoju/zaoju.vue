<template>
	<view class="recommend">
		这是菜谱列表页面
		<view v-for="item in zaojulist" :key="item.id" class="items" mode="widthFix" @click="itemClick(item)">
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
</template>

<script>
	import {
		myRequestPost
	} from '@/utils/request.js';
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	// import foodlist from '@/components/foodlist/foodlist.vue'
	export default {
		components: {
			uniIcons
		},
		data() {
			return {
				zaojulist: [],
			};
		},
		onLoad() {
			this.getSwipers()
		},
		methods: {
			async getSwipers() {
				let result = await myRequestPost("/api/cookbook/grounding/get-by-dc", {
					"dc": "RRQZ",
					"cookbookType": "all",
					"start": 0,
					"limit": 300,
					"userId": null
				});
				if (result.rc === 0) {
					this.zaojulist = result.cookbooks;
				}
				console.log(result)
			},
			itemClick(item) {
				uni.navigateTo({
					url: '/pages/fooddetail/fooddetail?id=' + item.id
				})
			}
		}
	}
</script>

<style lang="less">
	.recommend {
		.items {
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
</style>
