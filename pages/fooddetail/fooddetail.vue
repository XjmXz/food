<template>
	<view class="items">
		<view class="food-head">
			<image :src="details.imgSmall" @click="previewImg(details.imgSmall)"></image>
			<view class="food-name">
				<text>{{details.name}}</text>
			</view>
		</view>
		<!-- 菜谱简介 -->
		<view class="food-inrduc">
			<view class="inrduc-center">
				<view class="indruc-l"></view>
				<text>菜谱简介</text>
				<view class="indruc-r"></view>
			</view>
			<text>🔻</text>
			<text>{{details.introduction}}</text>
		</view>
		<!-- 菜谱用料 -->
		<view class="meterials">
			<view class="inrduc-center">
				<view class="indruc-l"></view>
				<text>用料</text>
				<view class="indruc-r"></view>
			</view>
			<view v-for="item in details.materials.accessory" :key="item.id" class="food-ingred" mode="widthFix">
				<text>{{item.name}}</text>
				<text class="text-right">{{item.standardWeight+item.standardUnit}}</text>
			</view>
			<view v-for="item in details.materials.main" :key="item.id" class="food-ingred" mode="widthFix">
				<text>{{item.name}}</text>
				<text class="text-right">{{item.standardWeight+item.standardUnit}}</text>
			</view>
		</view>
		<!-- 做法步骤 -->
		<view class="food-step">
			<image :src="details.prepareSteps.img" mode="widthFix"></image>
			<!-- 备菜步骤 -->
			<view class="inrduc-center">
				<view class="indruc-l"></view>
				<text>备菜步骤</text>
				<view class="indruc-r"></view>
			</view>
			<text class="food-step-desc">{{details.prepareSteps.desc}}</text>
			<!-- 做法步骤 -->
			<view class="inrduc-center">
				<view class="indruc-l"></view>
				<text>做法步骤</text>
				<view class="indruc-r"></view>
			</view>
			<view v-for="item in details.steps" :key="item.id" mode="widthFix" class="food-step-main">
				<image :src="item.image"></image>
				<view class="steps">
					<text style="color: orange;font-size: 30px;">{{item.no}}</text>
					<text>/</text>
					<text style="color: orange;">{{details.steps.length}}</text>
					<text>{{item.desc}}</text>
				</view>
			</view>
			<!-- 底部导航 -->
			<view class="goods_nav">
				<view class="tab">
					<view class="tab_item" @click="handleflag">
						<uni-icons type="heart" size="20" v-if="!flag"></uni-icons>
						<uni-icons type="heart-filled" size="20" color='red' v-if="flag"></uni-icons>
						<view>收藏</view>
					</view>
					<view class="tab_item" @click="goIndex">
						<uni-icons type="home" size="20"></uni-icons>
						<view>首页</view>
					</view>
					<view class="tab_item">
						<!-- #ifdef H5 -->
						<uni-icons type="redo" size="20"></uni-icons>
						<view class="" @click="shareOn">分享</view>
						<uni-popup ref="sharepopup" type="bottom">
							<share-btn :sharedataTemp="sharedata"></share-btn>
						</uni-popup>
						<!-- #endif -->
						<!-- #ifdef MP-ALIPAY -->
						<uni-icons type="redo" size="20"></uni-icons>
						<view class="tab-btn">
							<button open-type="share" class="share-btn" v-if="canIUseShareButton">分享</button>
						</view>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<uni-icons type="redo" size="20"></uni-icons>
						<view class="tab-btn"><button class="share-btn" open-type="share">分享</button></view>
						<!-- #endif -->
					</view>
				</view>
				<view class="btn">
					<button @click='buttonClick' class="btn-left">加入菜篮子</button>
					<button @click='goCart' class="btn-right">去看看</button>
				</view>
				<!-- <uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	import {
		myRequestPost
	} from '@/utils/request.js';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import shareBtn from '@/components/share-btn/share-btn.vue';
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue";
	export default {
		components: {
			uniPopup,
			shareBtn,
			uniIcons
		},
		data() {
			return {
				id: "",
				details: {},
				length: "",
				step_length: "",
				make: {},
				count: "",
				flag: false,
				title: "",
				obj: {},
				detailStorge: "",
				n: 0,
				canIUseShareButton: true,
				sharedata: {
					type: 1,
					strShareUrl: "http://www.baidu.com",
					strShareTitle: "分享标题",
					strShareSummary: "分享总结",
					strShareImageUrl: "http://www.xuelejia.com/xljapp/h5/static/aboutUsLogo.png"
				}
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getdetails();
			this.detailStorge = uni.getStorageSync("flag")
			console.log(this.detailStorge, "222222222222")
			console.log(this.menus, "sssssssssss")
			for (var i = 0; i < this.menus.length; i++) {
				if (this.menus[i].id == this.id) {
					this.flag = true
				} else {
					this.flag = false
				}
			}
			this.setShareButtonSwitch();
		},
		onShareAppMessage(res) {
			return {
				title: "美食分享",
				path: "pages/themeDetails/themeDetails"
			}
		},
		computed: {
			...mapState({
				menus: "menus"
			})
		},
		methods: {
			...mapMutations({
				addToCarts: 'addToCarts',
				addToMenus: 'addToMenus'
			}),
			async getdetails() {
				const res = await myRequestPost("/rest/cks/api/cookbook/details/get-by-id", {
					"cookbookId": this.id,
				});
				console.log(typeof(res));
				this.details = res.cookbook;
				console.log(this.details, "bbbbbbbbbbbbbbbbbbbbbbbbbbb");
				//step_length------备菜的步骤数组长度
				this.length = this.details.prepareSteps.steps.length;
				//step_length------做菜的步骤数组长度
				this.step_length = this.details.steps.length;
				this.make = this.details.steps;
				this.count = this.step_length;

				for (var i = 0; i < this.step_length; i++) {
					for (var j = 0; j < this.length; j++) {
						if (this.make[i].desc == this.details.prepareSteps.steps[j].desc) {
							this.make.splice(i, 1);
							this.count--;
							this.n++;
						}
					}
				}
				console.log(this.make);
			},
			//收藏保存数据
			handleflag() {
				for (var i = 0; i < this.menus.length; i++) {
					if (this.menus[i].id == this.id) {
						this.flag = true
					} else {
						this.flag = false
					}
				}
				this.flag = !this.flag
				this.title = this.flag ? "收藏成功" : "取消收藏"
				//提示框
				uni.showToast({
					title: this.title,
					icon: 'success',
					duration: 1000 //1后消失
				});
				//缓存到本地
				uni.getStorage({
					key: "flag",
					success: (datas) => {
						console.log(datas, typeof datas, "bbbbbbbbbbb")
						this.id = this.details.id
						this.obj = datas.data //{}
						this.obj[this.id] = this.flag
						uni.setStorage({
							key: "flag",
							data: this.obj,
							success: () => {
								console.log("huancun")
							}
						})
						console.log(this.obj, "ddddddddd")
						console.log(this.obj[this.id], "ccccccccc")
					}
				})
				console.log(this.details, "aaaaaaaa")
				var menu = {
					id: this.details.id,
					name: this.details.name,
					num: this.details.collectCount,
					img: this.details.imgLarge,
					collected: this.flag
				}
				console.log(menu, "eeeeeeee")
				this.addToMenus(menu)
			},
			setShareButtonSwitch() {
				this.setData({
					canIUseShareButton: my.canIUse('button.open-type.share')
				})
			},
			previewImg(imageUrl) {
				console.log(imageUrl)
				var images = [];
				images.push(imageUrl);
				console.log(images)
				uni.previewImage({ // 预览图片  图片路径必须是一个数组 => ["http://192.168.100.251:8970/6_1597822634094.png"]
					current: 0,
					urls: images
				});
			},
			goIndex() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			shareOn() {
				this.$refs.sharepopup.open();
			},
			buttonClick(e) {
				console.log("buttonClick", e)
				//加入菜篮子
				if (this.details.productsInfo) {
					var good = {
						id: this.details.id,
						price: this.details.productsInfo[this.details.productsInfo.length - 1].price,
						imgPath: this.details.productsInfo[this.details.productsInfo.length - 1].img,
						name: this.details.productsInfo[this.details.productsInfo.length - 1].materialName,
						slide_x: 0
					}
					this.addToCarts(good)
					console.log(this.details.productsInfo)
				} else {
					uni.showToast({
						title: `暂时不能提供参考价`,
						icon: 'none'
					})
				}
			},
			goCart() {
				uni.navigateTo({
					url: '/pages/cart/cart'
				})
			}
		}
	}
</script>

<style lang="scss">
	.items {
		display: flex;
		box-sizing: border-box;
		flex-wrap: wrap;
		font-family: "楷体";

		.food-head {
			position: relative;

			image {
				width: 750rpx;
				height: 550rpx;

			}

			.food-name {
				position: absolute;
				bottom: -80rpx;
				margin-left: 365rpx;
				width: 60rpx;
				background-color: #fff;
				opacity: 0.7;
				border: 1px solid;
				border-radius: 30rpx;
				text-align: center;
			}
		}

		.food-inrduc {
			width: 710rpx;
			margin-top: 100rpx;
			margin-left: 20rpx;
			color: #979797;
		}

		.meterials {
			margin-left: 20rpx;

			.inrduc-center {
				text {
					margin-left: 40rpx;
				}
			}

		}

		.goods_nav {
			position: fixed;
			display: flex;
			bottom: 0;
			width: 100%;
			background-color: #fff;

			.tab {
				display: flex;
				padding: 0 5px;
				font-size: 12px;

				.tab_item {

					margin: 0 10px;
					margin-top: 15rpx;

					.tab-btn {
						border: 0;

						.share-btn {
							// width: 80rpx;
							height: 38rpx;
							padding: 0;
							background-color: #fff;
							line-height: 27rpx;
							font-size: 12px;
							border: none;
							outline: none;
						}

						/* #ifdef MP-ALIPAY */
						.share-btn {
							// width: 80rpx;
							height: 30rpx;
							padding: 0;
							background-color: #fff;
							line-height: 27rpx;
							font-size: 12px;
							border: none;
							outline: none;
						}

						/* #endif */
					}
				}
			}

			.btn {
				float: right;
				display: flex;
				width: 446rpx;
				height: 80rpx;
				margin: 5px 0;
				margin-right: 10px;
				overflow: hidden;

				button {
					height: 80rpx;
					line-height: 80rpx;
					font-size: 14px;

					flex: 1;
				}

				button::after {
					border: none;
				}

				.btn-left {
					border-top-left-radius: 100px;
					border-bottom-left-radius: 100px;
					background-color: #ff0000;
					color: #fff;
				}

				.btn-right {
					border-top-right-radius: 100px;
					border-bottom-right-radius: 100px;
					background-color: #ffa200;
					color: #fff;
				}
			}
		}

		.inrduc-center {
			position: relative;
			width: 680rpx;
			left: 200rpx;
			top: 20rpx;
			text-indent: 2em;
			font-size: 20px;
			color: #222222;
			margin-bottom: 40rpx;

			view {
				position: absolute;
				top: 8px;
				left: -45rpx;
				background-color: orange;
				width: 45px;
				height: 2px;
			}

			.indruc-r {
				left: 270rpx;
			}

		}

		.food-ingred {
			width: 650rpx;
			height: 50rpx;
			line-height: 50rpx;
			color: #333;
			margin: 0 auto;
			border-bottom: 1px solid #ccc;

			text {
				margin-left: 130rpx;
			}

			.text-right {
				margin-right: 150rpx;
				float: right;
			}
		}

		.food-step {
			display: flex;
			box-sizing: border-box;
			flex-wrap: wrap;

			image {
				height: 300px;
				margin-left: 50rpx;
			}

			.food-step-desc {
				width: 650rpx;
				margin-left: 60rpx;
				line-height: 18px;
				margin-bottom: 20rpx;
			}

			.steps {
				display: flex;
				box-sizing: border-box;
				margin: 5px 0 5px 25px;
			}

			.food-step-main {
				width: 680rpx;
			}
		}
	}
</style>
