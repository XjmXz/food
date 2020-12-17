<template>
	<view>
		<view class="neirong">
			<view class="title">{{zhuti.name}}</view>
			<view class="duanluo">{{zhuti.description}}</view>
		</view>
		<view class="countent">
			<view class="tui-jian">
				<text>推荐菜:</text>
				<view class="cai-ming">
					<text @click="goPractice(item)" v-for="item in cookbookSet" :key="item.id">{{item.name}}</text>
				</view>
			</view>
		</view>
		
		<view class="recommend" v-for="item in cookbookSet" :key="item.id" @click="goPractice(item)">
			<view class="recommend-img">
				<image :src="item.imgLarge" mode=""></image>
			</view>
			<view class="recommend-foot">
				<text>{{item.name}}</text>
				<view>
					<uni-icons type="heart" size="20" @click="dianZan"></uni-icons>
					<text>{{item.collectCount}}人收藏</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		myRequest,
		myRequestPost
	} from "@/utils/request.js"
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				id:"",
				zhuti:"",
				cookbookSet:[]
			}
		},
		onLoad(options) {
			this.id=options.id
			console.log(options)
			this.getZhuTi();
		},
		components: {
			uniIcons
		},
		methods: {
			async getZhuTi(){
				let res=await myRequestPost("/api/theme/get-theme-detail-By-id",{
					"themeId":this.id
				})
				this.zhuti=res.theme
				this.cookbookSet=res.theme.cookbookSet
				console.log(this.cookbookSet)
			},
			goPractice(item){
				uni.navigateTo({
					url:`/pages/practice/practice?id=`+item.id
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.neirong{
		width: 95%;
		margin: 0 auto;
		.duanluo{
			font-size: 35rpx;
			color: #909399;
		}
		.title{
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			font-size: 40rpx;
			font-family: STHupo;
		}
	}
	
	.countent{
		width: 95%;
		margin: 0 auto;
		text{
			font-size: 30rpx;
		}
		.tui-jian{
			margin-top: 20rpx;
			.cai-ming{
				width:85%;
				margin: 20rpx auto;
				text{
					float: left;
					margin-left: 20rpx;
					margin-top: 10rpx;
					font-size: 22rpx;
					text-decoration:underline;
					background-color: #f19a17;
				}
			}
		}
	}
	
.recommend {
		width: 95%;
		margin: 20rpx auto;

		.recommend-img {
			margin: 0 auto;

			image {
				width: 712rpx;
				height: 370rpx;
				margin-top: 50rpx;
				border-radius: 20rpx;
			}
		}

		.recommend-foot {
			display: flex;
			justify-content: space-between;
			color: #885e46;
			font-family: sans-serif;
			.uni-icons{
				vertical-align: -10%;
			}
		}
	}
</style>
