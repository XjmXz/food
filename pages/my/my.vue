<template>
	<view>
		<view class="header" v-bind:class="{'status':isH5Plus}">
			<view class="userinfo">
				<view class="face">
					<button class="sys_btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx"></button>
				</view>
				<view class="info">
					<view class="username">{{this.userInfo.nickName}}</view>
				</view>
			</view>
			<view class="setting">
				<image src="../../static/my/setting.png"></image>
			</view>
		</view>
		<view class="list" v-for="(list,list_i) in severList" :key="list_i">
			<view class="li" v-for="(li,li_i) in list" @tap="toPage(list_i,li_i)" v-bind:class="{'noborder':li_i==list.length-1}"
			 hover-class="hover" :key="li.name">
				<view class="icon">
					<image :src="'../../static/my/sever/'+li.icon"></image>
				</view>
				<view class="text">{{li.name}}</view>
				<image class="to" src="../../static/my/to.png"></image>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				userInfo: {},
				severList: [
					[{
							name: '我的收藏',
							icon: 'point.png'
						},
						{
							name: '菜篮子',
							icon: 'gouwuche.png',
							url: '/pages/cart/cart'
						}
					],
					[{
							name: '随机选菜',
							icon: 'choujiang.png',
							url: '/pages/choujiang/choujiang'
						},
						{
							name: '收货地址',
							icon: 'addr.png'
						},
						{
							name: '在线客服',
							icon: 'kefu.png'
						}
					]
				],
			};
		},
		onLoad() {
			//加载
			// this.init();
		},
		methods: {
			appLoginWx() {
				// #ifdef MP-WEIXIN
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: (res2) => {

									uni.getUserInfo({
										provider: 'weixin',
										success: (info) => { //这里请求接口
											// console.log(res2);
											console.log(info.userInfo.nickName);
											console.log(info.userInfo.avatarUrl)

											console.log(this.info.userInfo.nickName)

											uni.navigateTo({
												url: '/pages/my/my'
											})
										},
										fail: () => {
											uni.showToast({
												title: "微信登录授权失败",
												icon: "none"
											});
										}
									})

								},
								fail: () => {
									uni.showToast({
										title: "微信登录授权失败",
										icon: "none"
									});
								}
							})

						} else {
							uni.showToast({
								title: '请先安装微信或升级版本',
								icon: "none"
							});
						}
					}
				});
				//#endif

			},
			//用户点击订单类型
			toOrderType(index) {
				uni.showToast({
					title: this.orderTypeLise[index].name
				});
			},
			//用户点击列表项
			toPage(list_i, li_i) {
				uni.showToast({
						title: this.severList[list_i][li_i].name
					}),
					uni.navigateTo({
						url: this.severList[list_i][li_i].url
					})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff
	}

	.header {
		&.status {
			padding-top: var(--status-bar-height);
		}

		background-color:#ff6364;
		width:92%;
		height:30vw;
		padding:0 4%;
		display:flex;
		align-items:center;

		.userinfo {
			width: 90%;
			display: flex;

			.face {
				flex-shrink: 0;
				width: 15vw;
				height: 15vw;

				.sys_btn {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					background: #EEEEEE;
				}

				.userinfo-avatar {
					width: 128rpx;
					height: 128rpx;
					margin: 20rpx;
					border-radius: 50%;
				}

				.userinfo-nickname {
					color: #aaa;
				}
			}

			.info {
				display: flex;
				flex-flow: wrap;
				padding-left: 30upx;

				.username {
					width: 100%;
					color: #fff;
					font-size: 40upx
				}

				.integral {
					display: flex;
					align-items: center;
					padding: 0 20upx;
					height: 40upx;
					color: #fff;
					background-color: rgba(0, 0, 0, 0.1);
					border-radius: 20upx;
					font-size: 24upx
				}
			}
		}

		.setting {
			flex-shrink: 0;
			width: 6vw;
			height: 6vw;

			image {
				width: 100%;
				height: 100%
			}
		}
	}

	.hover {
		background-color: #eee
	}

	.orders {
		background-color: #ff6364;
		width: 92%;
		height: 11vw;
		padding: 0 4%;
		margin-bottom: calc(11vw + 40upx);
		display: flex;
		align-items: flex-start;
		border-radius: 0 0 100% 100%;
		margin-top: -1upx;

		.box {
			width: 98%;
			padding: 0 1%;
			height: 22vw;
			background-color: #fefefe;
			border-radius: 24upx;
			box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
			margin-bottom: 40upx;
			display: flex;
			align-items: center;
			justify-content: center;

			.label {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-flow: wrap;
				width: 100%;
				height: 16vw;
				color: #666666;
				font-size: 26upx;

				.icon {
					position: relative;
					width: 7vw;
					height: 7vw;
					margin: 0 1vw;

					.badge {
						position: absolute;
						width: 4vw;
						height: 4vw;
						background-color: #ec6d2c;
						top: -1vw;
						right: -1vw;
						border-radius: 100%;
						font-size: 20upx;
						color: #fff;
						display: flex;
						align-items: center;
						justify-content: center;
						z-index: 10;
					}

					image {
						width: 7vw;
						height: 7vw;
						z-index: 9;
					}
				}
			}
		}
	}

	.list {
		width: 100%;
		border-bottom: solid 26upx #f1f1f1;

		.li {
			width: 92%;
			height: 100upx;
			padding: 0 4%;
			border-bottom: solid 1upx #e7e7e7;
			display: flex;
			align-items: center;

			&.noborder {
				border-bottom: 0
			}

			.icon {
				flex-shrink: 0;
				width: 50upx;
				height: 50upx;

				image {
					width: 50upx;
					height: 50upx
				}
			}

			.text {
				padding-left: 20upx;
				width: 100%;
				color: #666
			}

			.to {
				flex-shrink: 0;
				width: 40upx;
				height: 40upx
			}
		}
	}
</style>
