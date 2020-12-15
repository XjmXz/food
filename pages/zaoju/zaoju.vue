<template>
	<view>
		<image src="../../static/tabs/灶具.png" mode=""></image>
		<view class="recommend" v-for=" item in cookbooks" :key="item.id" @click="goPractice(item)">
			<view class="">
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
				cookbooks: [],
			}
		},
		components: {
			uniIcons
		},
		onLoad() {
			this.getZaoJu()
		},
		methods: {
			async getZaoJu() {
				let res = await myRequestPost("/api/cookbook/grounding/get-by-dc", {
					"dc": "RRQZ",
					"cookbookType": "all",
					"lang": "cn",
					"start": 0,
					"limit": 50,
					"userId": null
				})
				this.cookbooks = res.cookbooks;
			},
			dianZan(){
				
			},
			goPractice(item){
				uni.navigateTo({
					url:`/pages/practice/practice?id=`+item.id
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
			justify-content: space-between;
			color: #885e46;
			font-family: sans-serif;
			.uni-icons{
				vertical-align: -10%;
			}
		}
	}
</style>
