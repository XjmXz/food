<template>
	<view class="detail">
		<image :src="menuDetail.imgLarge" mode=""></image>
		<view class="contant-d">
			<view class="m-name">
				<view class="name-txt">
					{{menuDetail.name}}
				</view>
			</view>
			<text class="collect">
				收藏 {{menuDetail.collectCount}}
			</text>
			<view class="Intro">
				<view class="intro-txt">
					<text class="online">——</text>
					<text class="txt" style="color: #000000;">菜谱简介</text>
					<text class="online">——</text>
					<text class="fuhao">▼</text>
				</view>
				<text class="into-cont">{{menuDetail.introduction}}</text>
			</view>
			<view class="Metro">
				<view class="met-txt">
					<text class="online">——</text>
					<text class="txt">用料</text>
					<text class="online">——</text>
					<text class="fuhao">▼</text>
				</view>
				<view class="metire" v-for="item in menuDetail.materials.main" :key="item.name">
					<text class="name">{{item.name}}</text>
					<text class="standerWe">{{item.standardWeight}}{{item.standardUnit}}</text>
				</view>
				<view class="metire" v-for="item in menuDetail.materials.accessory" :key="item.name">
					<text class="name">{{item.name}}</text>
					<text class="standerWe">{{item.standardWeight}}{{item.standardUnit}}</text>
				</view>
			</view>
			<view class="Prep">
				<view class="pre-txt">
					<text class="online">——</text>
					<text class="txt">备菜步骤</text>
					<text class="online">——</text>
					<text class="fuhao">▼</text>
				</view>
				<view class="prepare" v-for="item in prepare" :key="item.id">
					<image :src="item.imgUrl" mode=""></image>
					<view class="stepss">
						<text class="no">
							<text style="font-size: 35rpx ;font-weight: 500;">{{item.no}}</text>
							<text style="color: #000000;">/</text>
							<text>{{prepare.length}}</text>
						</text>
						<text class="desc">{{item.desc}}</text>
					</view>
				</view>
			</view>
			<view class="Steps">
				<view class="step-txt">
					<text class="online">——</text>
					<text class="txt">做法步骤</text>
					<text class="online">——</text>
					<text class="fuhao">▼</text>
				</view>
				<view class="prepare" v-for="item in step1" :key="item.id">
					<image :src="item.image" mode=""></image>
					<view class="stepss">
						<text class="no">
							<text style="font-size: 35rpx ;font-weight: 500;">{{item.no-n}}</text>
							<text style="color: #000000;">/</text>
							<text>{{len-n}}</text>
						</text>
						<text class="desc">{{item.desc}}</text>
					</view>
				</view>
			</view>
			<view class="btn">
				<button type="primary">下载菜谱到手机</button>
			</view>
		</view>
		<block>
			<view class="nav">
				<view class="item">
					<uni-icons type="heart" size="28"></uni-icons>
					<text>收藏</text>
				</view>
				<view class="item">
					<uni-icons type="home" size="28"></uni-icons>
					<text>主页</text>
				</view>
				<view class="item">
					<uni-icons type="upload" size="28"></uni-icons>
					<text>分享</text>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	import {
		myRequestPost
	} from '@/utils/request.js'
	export default {
		data() {
			return {
				id: 0,
				menuDetail: [],
				prepare: [],
				step1: [],
				step2: [],
				step3: [],
				len: 0,
				n: 0
			};
		},
		components: {
			uniIcons
		},
		onLoad(option) {
			this.id = option.id
			console.log("pppppppp")
			this.getMenuDetail()
		},
		methods: {
			async getMenuDetail() {
				let result = await myRequestPost('/api/cookbook/details/get-by-id/', {
					"cookbookId": this.id
				})
				console.log(result.cookbook, "kkkkkkkkkk")
				this.menuDetail = result.cookbook
				this.prepare = this.menuDetail.prepareSteps.steps
				this.step1 = this.menuDetail.steps
				this.len = this.step1.length
				
				for(var i=0;i<this.menuDetail.steps.length;i++){
					for(var j=0;j<this.menuDetail.prepareSteps.steps.length;j++){
						if(this.step1[i].desc==this.prepare[j].desc){
							this.step1.splice(i,1);
							this.n++;
						}
					}
				}

				console.log(this.menuDetail, "00000000000"),
					console.log(this.prepare, "111111"),
					console.log(this.step1, "22222222")
				console.log(this.len)
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		height: 100%;
		display: flex;
		flex-direction: column;

		image {
			width: 100%;
			height: 500rpx;
		}

		.contant-d {
			margin: 0 20rpx;
			height: 100%;
			position: relative;

			.m-name {
				position: absolute;
				width: 60rpx;
				padding: 10rpx;
				left: 50%;
				margin-left: -30rpx;
				margin-top: -120rpx;
				background-color: rgba($color: #fff, $alpha: 0.81);
				border-radius: 20rpx;

				.name-txt {
					padding: 13rpx 12rpx;
					border: 1rpx solid #000;
					font-size: 33rpx;
					border-radius: 20rpx;
					color: #000;
					line-height: 43rpx;
				}
			}

			.collect {
				display: inline-block;
				position: absolute;
				top: 50rpx;
				right: 0;
				color: #666;
				font-size: 18rpx;
				font-weight: 700;
			}

			.Intro {
				margin-top: 120rpx;
				width: 100%;
				height: 300rpx;

				.into-cont {
					font-size: 27rpx;
					color: #555;
					letter-spacing: 2rpx;
					line-height: 40rpx;
				}
			}

			.intro-txt,
			.met-txt,
			.pre-txt,
			.step-txt {
				text-align: center;
				color: orange;

				.txt {
					font-size: 35rpx;
					font-weight: 520;
					padding: 0 20rpx;
				}

				.fuhao {
					display: block;
				}
			}

			.Metro {
				margin-top: 20rpx;

				.metire {
					border-bottom: 1rpx solid #999;
					padding: 10rpx 100rpx;

					.name {}

					.standerWe {
						display: inline-block;
						float: right;
					}
				}
			}

			.Prep,
			.Steps {
				padding: 0 20rpx;

				.prepare {
					width: 100%;

					image {
						height: 550rpx;
					}

					.stepss {
						padding: 15rpx;

						.no {
							text {
								font-size: 28rpx;
								color: orange;
							}
						}

						.desc {
							padding-left: 5rpx;
							letter-spacing: 2rpx;
							line-height: 40rpx;
							color: #666;
						}
					}

				}

			}

			.Prep {
				margin-top: 10rpx;
			}

			.Steps {
				margin-top: 40rpx;
			}

			.btn {
				margin: 150rpx auto;

				button {
					background-color: red;
					width: 550rpx;
					height: 70rpx;
					line-height: 70rpx;
					margin: 0 auto;
					font-size: 28rpx;
				}

			}
		}

		.nav {
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			background-color: #F0F0F0;
			border-top: 1rpx solid #000;
			display: flex;
			position: fixed;
			bottom: 0;

			.item {
				line-height: 100rpx;
				flex: 1;
				height: 100rpx;
				display: inline-block;
				text-align: center;
				display: flex;
				flex-direction: column;

				uni-icons {
					height: 50rpx;
				}

				text {
					line-height: 60rpx;
					overflow: hidden;
					height: 50rpx;
				}
			}
		}
	}

	page {
		font-size: 27rpx;
		font-weight: 400;
	}
</style>
