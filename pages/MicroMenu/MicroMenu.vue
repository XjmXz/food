<template>
	<view class="Micro">
		<view class="header">
			<text>
				微波炉智能导航菜谱
			</text>
		</view>
		<view class="menuAll">
			<view @click="itemClick(item)" v-for="item in menu" :key="item.id" class="item">
				<view class="item-all">
					<image :src="item.imgLarge"></image>
					<view class="item-text">
						<view>{{item.name}}</view>
						<view class="second">
							<uni-icons type="heart" size="28"></uni-icons>
							<text>{{item.collectCount}}人收藏</text>
						</view>
					</view>
				</view>
			</view>
		</view>
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
				menu: [],
				dc:""
			};
		},
		components:{
			uniIcons
		},
		onLoad(option) {
			this.dc = option.dc
			console.log("kkkkkkkkkkkkkkk",this.dc)
		},
		created() {
			this.getMenu()
		},
		methods: {
			async getMenu() {
				let result = await myRequestPost("/api/cookbook/grounding/get-by-dc", {
					"dc": "RWBL",
					"cookbookType": "all",
					"lang": "cn",
					"start": 0,
					"limit": 50,
					"userId": null
				})
				console.log(result.cookbooks, "000000000")
				this.menu = result.cookbooks
			},
			itemClick(item){
				uni.navigateTo({
				        url: '/pages/MenuDetail/MenuDetail?id=' + item.id
				    })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.Micro {
		.header{
			width: 100%;
			height: 400rpx;
			background-color: #bbb;
			margin-bottom: 40rpx;
		}
		.menuAll {
			.item {
				.item-all {
					margin: 0 25rpx;
					image {
						width: 700rpx;
						height: 400rpx;
						border-radius: 16rpx;
					}
			
					.item-text {
						width: 100%;
						line-height: 60rpx;
						margin: 10rpx 0 30rpx;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						.second {
							height: 60rpx;
							line-height: 60rpx;
							uni-icons {
								color:#bbb;
								vertical-align: middle;
							}
							text{
								line-height: 60rpx;
							}
							
						}
					}
				}
			}
		}
	}
</style>
