<template>
	<view>
		<view class="video">
			<video :src="playUrl" controls object-fit="fill"></video>
		</view>
		<view class="video-foot">
			<text>烤薯角</text>
			<text>观看次数:11111次</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				playUrl:"",
			}
		},
		onLoad(options) {
			console.log(options)
			this.playUrl=options.playUrl
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
.video{
	video{
		width: 100%;
		height:760rpx;
	}
}
.video-foot{
	display: flex;
	justify-content: space-between;
	font-size: 40rpx;
	font-family: STHupo;
}
</style>
