<template>
	<view class="box">
		<view class="main">
			<view class="title">
				<image :src="paiInfo.avatar" mode="" class="logo"></image>
				<view class="titleName">
					<view class="tnt">{{paiInfo.username}}</view>
					<view class="tnb">{{paiInfo.dateline}}</view>
				</view>
			</view>
			<view class="content">
				<view class="titletop">{{voteInfo.title}}</view>
				<image :src="paiInfo.p800[0].pic" mode=""></image>
			</view>
			<view class="radio">
				<view class="uni-title uni-common-mt uni-common-pl">{{voteInfo.title}} (单选)</view>
				<view class="uni-list">
					<radio-group>
						<label v-for="item in voteInfo.optionlist" :key="item.id" class="list">
							<view class="radioValue">
								<radio :value="item.id" />
							</view>
							<view class="radioTitle">{{item.title}}</view>
						</label>
					</radio-group>
					<button>投 票</button>
				</view>
			</view>
			<view class="comment">
				<view class="discuss">
					评论
				</view>
				<view class="commentMain" v-for="item in commentList" :key="item.cid">
					<view class="commentTitle">
						<image :src="item.avatar" mode="" class="commentLogo"></image>
						<view class="commentTitleName">
							<view class="ctnt">{{item.author}}</view>
							<view class="commentTime">
								<view class="ctnf">{{item.floors}}#</view>
								<view class="ctnd">{{item.dateline}}</view>
							</view>
						</view>
					</view>
					<view class="commentContent">{{item.message}}</view>
				</view>
			</view>
		</view>
		<view class="tabb">
			<view class="one" @click="goComment">
				<!-- <image class="pic"></image> -->
				<text class="iconfont icon-pinlun"></text>
				<view class="fsize">
					评论
				</view>
			</view>
			<view class="one" @click="goCollect">
				<!-- <image class="pic icon-shoucang iconfont"></image> -->
				<text class="iconfont icon-shoucang"></text>
				<view class="fsize">
					收藏
				</view>
			</view>
			<view class="one" @click="goShare">
				<!-- <image class="pic"></image> -->
				<text class="iconfont icon-fenxiang-"></text>
				<view class="fsize">
					分享
				</view>
			</view>
			<view class="one" @click="goGift" style="color: red">
				<!-- <image class="pic"></image> -->
				<text class="iconfont icon-gift-box"></text>
				<view class="fsize">
					福利社
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		myRequestGet
	} from '@/utils/request-xuchen.js'
	export default {
		data() {
			return {
				paiInfo: {},
				voteInfo: {},
				commentList: []
			};
		},
		onLoad(options) {
			this.id = options.id,
				console.log(options.id)
			this.pai_getVoteInfo()
			this.comment_getCommentList()
			this.pai_getPaiInfo()
		},
		methods: {
			async pai_getPaiInfo() {
				const res = await myRequestGet('/api.php', {
					p: {
						"m": {
							"pai_getPaiInfo": {
								"id": this.id
							}
						},
						"openudid": "meishichina",
						"uid": "",
						"appver": "3028",
						"device": "microsoftmicrosoft",
						"appname": "xcx_weixin",
						"session": ""
					}
				})
				this.paiInfo = res.pai_getPaiInfo.data
				// console.log(this.paiInfo)
			},
			async pai_getVoteInfo() {
				const res = await myRequestGet('/api.php', {
					p: {
						"m": {
							"pai_getVoteInfo": {
								"id": this.id
							}
						},
						"openudid": "meishichina",
						"uid": "",
						"appver": "3028",
						"device": "microsoftmicrosoft",
						"appname": "xcx_weixin",
						"session": ""
					}
				})
				this.voteInfo = res.pai_getVoteInfo.data
				// console.log(this.voteInfo)
			},
			async comment_getCommentList() {
				const res = await myRequestGet('/api.php', {
					p: {
						"m": {
							"comment_getCommentList": {
								"id": this.id,
								"type": "pai",
								"show": "asc",
								"pageindex": 1,
								"pagesize": 10
							}
						},
						"openudid": "meishichina",
						"uid": "",
						"appver": "3028",
						"device": "microsoftmicrosoft",
						"appname": "xcx_weixin",
						"session": ""
					}
				})
				this.commentList = res.comment_getCommentList.data
				console.log(this.commentList)
			},
			goComment(){
				
			},
			goCollect(){
				uni.switchTab({
					url:`../my/my`
				})
			},
			goShare(){
				
			},
			goGift(){
				uni.switchTab({
					url:`../my/my`
				})
			}
		}
	}
</script>

<style lang="less">
	.box {
		.main {
			padding-left: 30rpx;
			padding-top: 16rpx;

			.title {
				display: flex;

				.logo {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}

				.titleName {
					margin-left: 20rpx;

					.tnb {
						margin-top: 10rpx;
						font-size: 24rpx;
						color: rgb(156, 156, 156);
					}
				}
			}

			.content {
				margin: 0 10rpx 40rpx;

				.titletop {
					font-size: 36rpx;
					margin: 20rpx 0;
				}

				image {
					width: 670rpx;
					height: 618rpx;
				}
			}

			.radio {
				border: 2rpx solid rgb(221, 221, 221);
				background-color: rgb(242, 242, 242);
				padding-top: 40rpx;
				padding-left: 40rpx;
				border-radius: 3%;

				.uni-title {
					margin-bottom: 10rpx;
					font-weight: 600;
				}

				.uni-list {
					radio-group {
						.list {
							display: flex;
							margin-top: 30rpx;
							padding-bottom: 20rpx;
							border-bottom: 2rpx solid rgb(221, 221, 221);
							font-size: 34rpx;

							.radioValue {}

							.radioTitle {}
						}
					}

					button {
						margin-left: -40rpx;
						color: rgb(153, 153, 153);
					}
				}
			}

			.comment {
				margin-top: 60rpx;

				.discuss {
					margin-bottom: 40rpx;
				}

				.commentMain {
					.commentTitle {
						display: flex;

						image {
							width: 100rpx;
							height: 100rpx;
							border-radius: 50%;
						}

						.commentTitleName {
							margin-left: 20rpx;

							.ctnt {
								font-size: 32rpx;
							}

							.commentTime {
								display: flex;

								.ctnf {
									font-size: 24rpx;
									color: rgb(156, 156, 156);
									margin-right: 20rpx;
								}

								.ctnd {
									font-size: 24rpx;
									color: rgb(156, 156, 156);
								}
							}
						}
					}

					.commentContent {
						margin: 16rpx 0 30rpx;
						padding-bottom: 26rpx;
						border-bottom: 2rpx solid rgb(221, 221, 221);
					}
				}
			}

		}

		.tabb {
			width: 100%;
			border-top: 2rpx solid grey;
			position: fixed;
			bottom: 0;
			display: flex;
			background-color: rgb(241, 241, 241);

			.one {
				text-align: center;
				flex: 1;
				text{
					font-size: 50rpx;
				}
				.fsize{
					font-size: 30rpx;
					margin-bottom: 6rpx;
				}
			}
		}
	}
</style>
