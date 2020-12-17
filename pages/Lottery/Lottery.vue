<template>
	<view class="Lottery">
		<view class="select" @click="linktolodetail">
			<view class="up">
				今天吃啥?
			</view>
			<view class="down">
				点我选菜
			</view>
		</view>
		<view class="search">
			<view class="input">
				<input type="text" value="" placeholder="输入你想吃啥~" />
			</view>
			<view class="icon">
				<uni-icons type="search" size="30" color="white" style="background-color: #FFA200;"></uni-icons>

			</view>

		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {

			};
		},
		components: {
			uniIcons
		},
		methods:{
			linktolodetail(){
				uni.navigateTo({
					url:"/pages/Lotterydetail/Lotterydetail"
				})
			}
		}
	}
</script>

<style lang="scss">
	.Lottery {
		margin: 100px auto;
		.select {
			margin: 0 auto;
			width: 250rpx;
			height: 250rpx;
			background-color: orange;
			border-radius: 50%;
			color: #fff;
			text-align: center;
			
			.up {
				height: 140rpx;
				font-size: 38rpx;
				line-height: 220rpx;
			}

			.down {
				height: 110rpx;
				font-size: 28rpx;
			}
		}

		.search {
			margin: 50rpx auto;
			width: 600rpx;
			height: 100rpx;
			display: flex;

			.input {
				flex: 1;
				display: inline-block;
				padding: 20rpx 0 0 20rpx;
				width: 502rpx;
				height: 70rpx;
				outline-color: red;
				border: 2px solid orange;
				border-radius: 16rpx 0 0 16rpx;
				box-shadow: #DF5000 5rpx;
				font-size: 26rpx;
			}

			.icon {
				width: 100rpx;
				height: 100rpx;
				background-color: #FFA200;
				text-align: center;
				line-height: 100rpx;
				border-radius: 0 16rpx 16rpx 0;

				uni-icons {
					background-color: #FFA200;
					color: #fff;
				}
			}


		}
	}
</style>
