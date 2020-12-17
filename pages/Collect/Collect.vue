<template>
	<view class="collect">
		<view class="item" v-for="item in menus" :key="item.id" @click="linktomenudetail(item)">
			<block v-if="item.collected">
				<view class="img">
					<image :src="item.img" mode=""></image>
				</view>
				<view class="txt">
					<text class="name">{{item.name}}</text>
					<text class="num">{{item.num}}人收藏</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	//vuex
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {

			}
		},
		onLoad() {},
		methods: {
			linktomenudetail(item){
				uni.navigateTo({
					url: '/pages/MenuDetail/MenuDetail?id=' + item.id
				})
			}

		},
		computed: {
			...mapState({
				menus: "menus",
				flag: "flag"
			})
		}
	}
</script>

<style lang="scss">
	.collect {
		.item {
			margin: 0 25rpx;

			.img {
				image {
					width: 700rpx;
					height: 400rpx;
					border-radius: 16rpx;
					background-size: cover;
				}
			}

			.txt {
				width: 100%;
				line-height: 60rpx;
				margin: 10rpx 0 30rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				color: #000;
			}
		}
	}
</style>
