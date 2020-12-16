<template>
	<view>
		<view class="tis" v-if="carts.length==0">还没有添加菜品~</view>
		<view v-for="item in carts" :key="item.id" class="myChoice">
			<image :src="item.imgPath" class="img"></image>
			<view class="choice-main">
				<text class="choice-main-name">{{item.name}}</text>
				<text>参考价：￥{{item.price}}</text>
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
	export default {
		data() {
			return {

			}
		},
		methods: {
			
		},
		computed: {
			...mapState({
				carts: "carts"
			})
		}
	}
</script>

<style lang="scss">
	.myChoice {
		display: flex;
		font-family: "楷体";
		width: 690rpx;
		margin-left: 30rpx;
		
		.img{
			width: 250rpx;
			height: 250rpx;
		}

		.choice-main {
			display: flex;
			margin-left: 80rpx;
			padding-top: 30rpx;
			flex-direction: column;

			.choice-main-name {
				font-size: 20px;
				font-weight: bold;
				margin-bottom: 30rpx;
			}
		}
	}
</style>
