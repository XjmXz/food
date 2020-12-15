<template>
	<view>
		<view class="top">
			<view class="top_left">
				看帖
			</view>
			<view class="top_center">
				投票
			</view>
			<view class="top_right">
				精华
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	page{
		width:100%;
		height:100%;
		.top{
			display:flex;
			justify-content: space-around;
			border-bottom: 2rpx #999999 solid;
			.top_left,.top_center,.top_right{
				border-bottom: 5rpx red solid;
			}
		}
	}
</style>
