<!-- 蓝色简洁登录页面 -->
<template>
	<view class="t-login">
		<!-- 页面装饰图片 -->
		<image class="img-a" src="../../static/img/2.png"></image>
		<image class="img-b" src="../../static/img/3.png"></image>
		<!-- 标题 -->
		<view class="t-b">{{title}}</view>
		<form class="cl">
			<view class="t-a">
				<image src="../../static/img/sj.png"></image>
				<input type="number" name="phone" placeholder="请输入手机号" maxlength="11" v-model="phone" />
			</view>
			<view class="t-a">
				<image src="../../static/img/yz.png"></image>
				<input type="number" name="code" maxlength="6" placeholder="请输入验证码" v-model="yzm" />
				<view v-if="showText" class="t-c" @tap="getCode()">发送短信</view>
				<view v-else class="t-c" style="background-color: #A7A7A7;">重新发送({{second}})</view>
			</view>
			<button @tap="login()">登 录</button>
		</form>
		<view class="t-f"><text>————— 第三方账号登录 —————</text></view>
		<view class="t-e cl">
			<view class="t-g" @tap="wxLogin()">
				<image src="../../static/img/wx.png"></image>
			</view>
			<view class="t-g" @tap="zfbLogin()">
				<image src="../../static/img/qq.png"></image>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		/**
		 * 2020年12月1日   李新雷编写（练习）  适用所有app登录
		 * vue版本简洁又美观的登录页面（个人感觉插件市场的登录都不太好看，哈哈 O(∩_∩)O）
		 * 该模板只是登录模板：验证、倒计时等都已经写好，
		 * 如果需要注册（注册可以设计在登录按钮下方），
		 * 直接复制该页面稍微改动即可
		 */
		data() {
			return {
				title: '欢迎回来！', //填写logo或者app名称，也可以用：欢迎回来，看您需求
				second: 60, //默认60秒
				showText: true, //判断短信是否发送
				phone: '', //手机号码
				yzm: '' //验证码
			}
		},
		onLoad() {

		},
		methods: {
			//当前登录按钮操作
			async login() {
				var that = this;
				if (!that.phone) {
					uni.showToast({
						title: "请输入手机号",
						icon: "none"
					});
					return;
				}
				if (!(/^[1][3,4,5,7,8,9][0-9]{9}$/).test(that.phone)) {
					uni.showToast({
						title: "请输入正确手机号",
						icon: "none"
					});
					return;
				}
				if (!that.yzm) {
					uni.showToast({
						title: "请输入验证码",
						icon: "none"
					});
					return;
				}
				//....此处省略，这里需要调用后台验证一下验证码是否正确，根据您的需求来
				uni.showToast({
					title: "登录成功！",
					icon: "none"
				})
				
				
			},
			//获取短信验证码
			getCode() {
				var that = this;
				var interval = setInterval(() => {
					that.showText = false;
					var times = that.second - 1;
					//that.second = times<10?'0'+times:times ;//小于10秒补 0
					that.second = times;
					console.log(times);
				}, 1000);
				setTimeout(() => {
					clearInterval(interval);
					that.second = 60;
					that.showText = true;
				}, 60000);
				//这里请求后台获取短信验证码
				uni.request({
					//......//此处省略
					success: function(res) {
						that.showText = false;
					}
				});
			},
			//等三方微信登录
			wxLogin() {
				uni.showToast({
					title: "微信登录",
					icon: "none"
				});
			},
			//第三方支付宝登录
			zfbLogin() {
				uni.showToast({
					title: "支付宝登录",
					icon: "none"
				});
			}
		}
	}
</script>
<style>
	.img-a {
		position: absolute;
		width: 100%;
		top: -280rpx;
		right: -100rpx;
	}

	.img-b {
		position: absolute;
		width: 50%;
		bottom: 0;
		left: -50rpx;
		margin-bottom: -200rpx;
	}

	.t-login {
		width: 600rpx;
		margin: 0 auto;
		font-size: 28rpx;
		color: #000;
	}

	.t-login button {
		font-size: 28rpx;
		background: #5677fc;
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50rpx;
		box-shadow: 0 5px 7px 0 rgba(86, 119, 252, 0.2);
	}

	.t-login input {
		padding: 0 20rpx 0 120rpx;
		height: 90rpx;
		line-height: 90rpx;
		margin-bottom: 50rpx;
		background: #F8F7FC;
		border: 1px solid #E9E9E9;
		font-size: 28rpx;
		border-radius: 50rpx
	}

	.t-login .t-a {
		position: relative
	}

	.t-login .t-a image {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		left: 40rpx;
		top: 28rpx;
		border-right: 2rpx solid #dedede;
		padding-right: 20rpx
	}

	.t-login .t-b {
		text-align: left;
		font-size: 46rpx;
		color: #000;
		padding: 300rpx 0 120rpx 0;
		font-weight: bold;
	}

	.t-login .t-c {
		position: absolute;
		right: 22rpx;
		top: 22rpx;
		background: #5677fc;
		color: #fff;
		font-size: 24rpx;
		border-radius: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		padding: 0 25rpx
	}

	.t-login .t-d {
		text-align: center;
		color: #999;
		margin: 80rpx 0
	}

	.t-login .t-e {
		text-align: center;
		width: 250rpx;
		margin: 80rpx auto 0
	}

	.t-login .t-g {
		float: left;
		width: 50%
	}

	.t-login .t-e image {
		width: 50rpx;
		height: 50rpx
	}

	.t-login .t-f {
		text-align: center;
		margin: 200rpx 0 0 0;
		color: #666
	}

	.t-login .t-f text {
		margin-left: 20rpx;
		color: #AAAAAA;
		font-size: 27rpx;
	}

	.t-login .uni-input-placeholder {
		color: #000
	}

	.cl {
		zoom: 1
	}

	.cl:after {
		clear: both;
		display: block;
		visibility: hidden;
		height: 0;
		content: '\20'
	}
</style>
