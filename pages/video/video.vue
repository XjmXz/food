<template>
	<view>
		<view class="recommend" v-for="item in videos" :key="item.courseId">
			<view class="">
				<view class="recommend-img" @click="goVideo(item)">
					<image :src="item.courseImage" mode=""></image>
				</view>
				<view class="recommend-foot">
					<text class="text-one">{{item.courseTitle}}</text>
					<text>{{item.subTitle}}</text>
				</view>
				<view class="shoucang">
					<uni-icons type="heart" size="20" ></uni-icons>
					<text>{{item.collectCount}}人收藏</text>
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
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				videos:[],
			};
		},
		components:{
			uniIcons
		},
		onLoad() {
			this.getVideo()
		},
		methods:{
			async getVideo(){
				let res =await myRequestPostTwo("/ops/api/source/getLocalVideoList",{
					"userId":null,"pageSize":50})
				console.log(res)
				this.videos=res.datas
			},
			goVideo(item){
				uni.navigateTo({
					url:"../playvideo/playvideo?id="+item.courseId+"&playUrl="+item.playUrl,
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
		.shoucang{
			float: right;
			margin-top: -78rpx;
		}

	}
</style>
