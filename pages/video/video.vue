<template>
	<view class="box">
		<view class="title" v-for="(item,index) in newsList" :key="item.courseId">
			<image :src="item.courseImage" mode="scaleToFill" @click="goSuperMarket" :data-index="index" :data-item="item"></image>
			<view class="box_bottom">
				<view class="fl">
					<view class="fl_top">{{item.courseTitle}}</view>
					<view class="fl_bottom">{{item.courseTitle}}</view>
				</view>

				<view class="fr">
					<text ref=refs :style="flag?'color:red':''" class="sc iconfont icon-shoucang1" @click="addone(index,item)" :data-count="item.collectCount" :data-id="item.courseId" disabled="disabled"></text>{{item.collectCount}}个收藏
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
				newsList: [],
				flag: false,
				
			}
		},
		onLoad() {
			this.getNewsList();
		},
		methods: {
			async getNewsList() {
				const res = await myRequestPost("/ops/api/source/getLocalVideoList", {
					"userId": null,
					"pageNo": 0,
					"pageSize": 50
				})
				this.newsList = res.datas
				console.log(res)
			},
			// goSuperMarket(item){
			// 	// console.log('111111')
			// 	uni.navigateTo({
			// 		url:`../vediodetail/vediodetail`
			// 	})
			// }
			goSuperMarket(e) {
				// console.log(e.currentTarget.dataset.item)
				const userinfo = e.currentTarget.dataset.item;
				// console.log(userinfo)
				uni.setStorageSync("userinfo", userinfo);
				uni.navigateTo({
					url: `/pages/vediodetail/vediodetail`
				})
			},
			addone(i,item){
				// console.log(e)
				// console.log(i)
				// console.log(item)
				if(i+1==item.orderNo){
				
				}
				// console.log(this.flag)
				// if(this.flag){
					
				// }
				// console.log(id)
				// const index=newsList.findIndex(v=>v.courseId===id);
				
			}
		},
		components: {}
	}
</script>

<style lang="less">
	.box {
		display: flex;
		flex-direction: column;
		padding: 30rpx;

		.title {
			width: 100%;
			display: flex;
			flex-direction: column;

			image {
				border-radius: 5%;
				height: 420rpx;
				width: 100%;
			}

			.box_bottom {
				padding-top: 20rpx;
				height: 135rpx;

				.fl {
					float: left;

					.fl_top {
						font-weight: 700;
						font-size: 40rpx;
						margin-bottom: 10rpx;
					}

					.fl_bottom {
						font-size: 28rpx;
						color: rgb(185, 185, 185);
					}
				}

				.fr {
					float: right;

					.sc {
						font-size: 40rpx;
					}
				}
			}
		}

	}
</style>