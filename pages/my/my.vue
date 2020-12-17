<template>
	<view class="continer">
		<view class="top">
			<view class="login">
				登录
			</view>
		</view>
		<view class="content">
			
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/uni/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni/uni-list-item/uni-list-item.vue';
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
	page{
		font-family: "楷体";
		background-color: #D3D3D3;
	}
	.continer{
		.top{
			width:100%;
			height:200rpx;
			position:relative;
			background-color: #FFFFFF;
			.login{
				width:300rpx;
				height:100rpx;
				background-color: rgba(255,255,102,0.5);
				text-align: center;
				line-height: 100rpx;
				position:absolute;
				left:50%;
				margin-left: -150rpx;
				top:50%;
				margin-top:-50rpx;
				border-radius: 20rpx;
			}
		}
	}
</style>
