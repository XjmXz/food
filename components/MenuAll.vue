<template>
		<view class="menuAll">
			<view @click="itemClick(item)" v-for="item in menu" :key="item.id" class="item">
				<view class="item-all">
					<image :src="item.imgLarge"></image>
					<view class="item-text">
						<text>{{item.name}}</text>
						<text class="second">{{item.collectCount}}人收藏</text>
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
		data() {
			return {
				menu: []
			};
		},
		created() {
		},
		methods: {
			itemClick(item){
				uni.navigateTo({
				        url: '/pages/MenuDetail/MenuDetail?id=' + item.id
				    })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.Micro {
		.header{
			width: 100%;
			height: 400rpx;
			background-color: #bbb;
			margin-bottom: 40rpx;
		}
		.menuAll {
			.item {
				.item-all {
					margin: 0 25rpx;
					image {
						width: 700rpx;
						height: 400rpx;
						border-radius: 16rpx;
					}
			
					.item-text {
						margin: 10rpx 0 30rpx;
			
						.second {
							float: right;
						}
					}
				}
			}
		}
	}
</style>
