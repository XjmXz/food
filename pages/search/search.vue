<template>
	<view>
		<uni-search-bar placeholder="今天想吃什么？" @confirm="search" radius="100" v-model="name" v-bind:value="name"></uni-search-bar>
		<view class="recommend">热门搜索</view>
		<view class="btns">
			<button type="default" @click="searchOne(foodsList[0])" class="btn">{{foodsList[0]}}</button>
			<button type="default" @click="searchOne(foodsList[1])" class="btn">{{foodsList[1]}}</button>
			<button type="default" @click="searchOne(foodsList[2])" class="btn">{{foodsList[2]}}</button>
			<button type="default" @click="searchOne(foodsList[3])" class="btn">{{foodsList[3]}}</button>
			<button type="default" @click="searchOne(foodsList[4])" class="btn">{{foodsList[4]}}</button>
		</view>
		
		<view class="" v-for="item in foodList1" :key="item.name">
			<view class="img">
				<image :src="item.imgSmall" mode=""></image>
				<view class="text">
					<view class="">{{item.name}}</view>
					<view class="">{{item.collectCount}}人收藏</view>
				</view>
			</view>
		</view>
		<view class="" v-for="item in foodList2" :key="item.name">
			<view class="img">
				<image :src="item.imgSmall" mode=""></image>
				<view class="text">
					<view class="">{{item.name}}</view>
					<view class="">{{item.collectCount}}人收藏</view>
				</view>
			</view>
		</view>
		<view class="" v-for="item in foodList3" :key="item.name">
			<view class="img">
				<image :src="item.imgSmall" mode=""></image>
				<view class="text">
					<view class="">{{item.name}}</view>
					<view class="">{{item.collectCount}}人收藏</view>
				</view>
			</view>
		</view>
		<view class="" v-for="item in foodList4" :key="item.name">
			<view class="img">
				<image :src="item.imgSmall" mode=""></image>
				<view class="text">
					<view class="">{{item.name}}</view>
					<view class="">{{item.collectCount}}人收藏</view>
				</view>
			</view>
		</view>
		<view class="" v-if="!flag">
			抱歉，暂时没有您要找的菜呢。
		</view>


	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni/uni-search-bar/uni-search-bar.vue';
	import {
		myRequestPost
	} from '@/utils/request.js';
	export default {
		data() {
			return {
				name: "",
				foodList1: {},
				foodList2: {},
				foodList3:{},
				foodList4:{},
				flag: true,
				foodsList:["鱼香肉丝","可乐鸡翅","排骨","沙拉","面"]
			};
		},

		methods: {
			async search(event) {
				this.name = event.value;
				let result = await myRequestPost("/api/cookbook/by-name/get", {
					"name": this.name,
					"x_current_user_id": null
				});
				console.log(result);
				this.foodList1 = result.cookbook_3rds;
				this.foodList2 = result.cookbooks;
				console.log(foodList1,"6666666666666");
				console.log(foodList2,"888888888888888888888");
				if (this.foodList1.length==0 && this.foodList2.length==0) {
					this.flag = false;
				}
				console.log(this.flag);
			},
			
			async searchOne(e){
				let result = await myRequestPost("/api/cookbook/by-name/get", {
					"name": e,
					"x_current_user_id": null
				});
				console.log(result);
				this.foodList3 = result.cookbook_3rds;
				this.foodList4 = result.cookbooks;
				if (this.foodList3.length==0 && this.foodList4.length==0) {
					this.flag = false;
				}
			}

		},


		components: {
			uniSearchBar
		}
	}
</script>

<style lang="less">
	page{
		width:100%;
		height:100%;
		font-family: "楷体";
		
		.recommend{
			margin-top:40rpx;
			font-size: 30rpx;
			font-weight: bold;
			color:#A0A0A0;
		}
		.btns{
			display:flex;
			margin-top:40rpx;
			.btn{
				width:120rpx;
				height:50rpx;
				line-height: 38rpx;
				padding:5rpx 10rpx;
				font-size: 24rpx;
				border-radius: 20rpx;
				text-align: center;
				background-color: #ffffff;
				border:1px #FFCC66 solid;
				color:#A0A0A0 ;
				
			}
		}
		
		.image{
			width:64px;
			height:48px;
			background-size: cover;
		}
		.img {
			width: 700rpx;
			height: 500rpx;
			margin: 20rpx auto;
		
			image {
				width: 670rpx;
				height: 400rpx;
				border-radius: 16rpx;
				margin-left: 15rpx;
				background-size: cover;
			}
		
			.text {
				width: 670rpx;
				height: 400rpx;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				font-size: 30rpx;
			}
		}
	}
	
</style>
