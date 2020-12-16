<template>
	<view class="box">
		<view class="lp">
			<video :src="userinfo.playUrl" object-fit='cover'></video>
		</view>
		<view class="bottom">
			<view class="bl">{{userinfo.desc}}</view>
			<view class="br">观看次数：{{userinfo.videoWatchcount}}次</view>
		</view>
		<view class="tabb">
			<view class="tl" @click="goWode">
				<image class="ltop" src="../../static/tabs/我的.png"></image>
				<view class="lbottom">
					收藏
				</view>
			</view>
			<view class="tr" @click="goShouye">
				<image class="rtop" src="../../static/tabs/菜谱.png"></image>
				<view class="rbottom">
					首页
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
				id: "",
				userinfo: ""
			}
		},
		// Params:{
		// 	playUrl:"",
		// 	seriesId:"",
		// },
		onLoad() {
			const userinfo = uni.getStorageSync("userinfo");
			this.userinfo = userinfo
			// console.log(userinfo)
			// console.log(userinfo.playUrl)
			// console.log(userinfo.videoWatchcount)
		},
		methods:{
			goWode(){
				console.log("wwwwww")
				uni.switchTab({
					url:`../my/my`
				})
			},
			goShouye(){
				uni.switchTab({
					url:`../index/index`
				})
			}
		}
	}
</script>

<style lang="less">
	.lp {
		width: 100%;
		height: 480rpx;

		video {
			width: 100%;
			height: 100%;
		}
	}

	.bl {
		float: left;
		padding: 40rpx;
		font-size: 40rpx;
		font-weight: 700;
	}
	.br {
		float: right;
		padding: 30rpx;
		color: rgb(204, 204, 204);
		font-size: 40rpx;
	}
	.tabb{
		width: 100%;
		border-top:2rpx solid grey;
		position:fixed;
		bottom: 0;
		display: flex;
		.tl{
			text-align: center;
			flex: 1;
			.ltop{
				width: 60rpx;
				height: 60rpx;
			}
		}
		.tr{
			text-align: center;
			flex: 1;
			.rtop{
				width: 60rpx;
				height: 60rpx;
			}
		}
	}
</style>
