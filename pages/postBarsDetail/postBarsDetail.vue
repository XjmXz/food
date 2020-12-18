<template>
	<view class="box">
		<view class="main">
			<view class="title">
				<image :src="paiInfo.avatar" class="logo"></image>
				<view class="titleName">
					<view class="tnt">{{paiInfo.username}}</view>
					<view class="tnb">{{paiInfo.dateline}}</view>
				</view>
			</view>
			<view class="texts4">{{paiInfo.title}}</view>
			<view class="texts3">{{paiInfo.subject}}</view>
			<view v-for="picitem in paiInfo.p800" :key="picitem.pic" class="imgview">
				<image :src="picitem.pic" class="imglist" mode="widthFix"></image>
			</view>
			<view v-if="commentList" class="comment">
				<view class="discuss">
					评论
				</view>
				<view class="commentMain" v-for="(item,index) in commentList" :key="item.cid">
					<view class="commentTitle">
						<image :src="item.avatar" class="commentLogo" @error="onImgError(commentList,index)"></image>
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
	} from '@/utils/request-xuchen.js';
	import {
		imgErr
	} from '@/utils/defaultimg.js';
	export default {
		data() {
			return {
				placeholderImage: '../../static/tabs/默认头像.jpg', //占位图
				paiInfo: {},
				id: "",
				commentList: [],
				pageindex: 1,
			};
		},
		onLoad(options) {
			console.log(options.id);
			this.id = options.id;
			this.pai_getPaiInfo();
			this.comment_getCommentList();

		},
		methods: {
			async pai_getPaiInfo() {
				const res = await myRequestGet("/api.php", {
					p: JSON.stringify({
						"m": {
							"pai_getPaiInfo": {
								"id": this.id,
							}
						},
						"openudid": "meishichina",
						"uid": 12656254,
						"appver": "3028",
						"device": "microsoftmicrosoft",
						"appname": "xcx_weixin",
						"session": "xcx_weixin:weixin:12656254:g4j5SkNMeV2KNerCulQ1YPuLTnGKQI1J"
					})
				});
				this.paiInfo = res.pai_getPaiInfo.data
				console.log(this.paiInfo);
			},
			async comment_getCommentList() {
				const res = await myRequestGet("/api.php", {
					p: JSON.stringify({
						"m": {
							"comment_getCommentList": {
								"id": this.id,
								"type": "pai",
								"show": "asc",
								"pageindex": this.pageindex,
								"pagesize": 10
							}
						},
						"openudid": "meishichina",
						"uid": 12656254,
						"appver": "3028",
						"device": "microsoftmicrosoft",
						"appname": "xcx_weixin",
						"session": "xcx_weixin:weixin:12656254:g4j5SkNMeV2KNerCulQ1YPuLTnGKQI1J"
					})
				});
				// console.log(res)
				this.commentList = res.comment_getCommentList.data
				// console.log(this.commentList);
				console.log(this.commentList);
			},
			onImgError(dataArray,index) {
				imgErr(dataArray,index)
			},
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
					width: 80rpx;
					height: 80rpx;
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

			.imgview {
				width: 680rpx;

				.imglist {
					width: 680rpx;
				}
			}

			.texts3 {
				font-size: 16px;
				margin-bottom: 9px;
				letter-spacing: 2rpx;
			}

			.texts4 {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 9px;
				letter-spacing: 2rpx;
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
							width: 80rpx;
							height: 80rpx;
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

				text {
					font-size: 50rpx;
				}

				.fsize {
					font-size: 30rpx;
					margin-bottom: 6rpx;
				}
			}
		}
	}
</style>
