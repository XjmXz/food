<template>
	<view>
		<uni-search-bar placeholder="今天想吃什么？" @confirm="search" radius="100" v-model="name" v-bind:value="name"></uni-search-bar>
		<view class="" v-for="item in foodList1" :key="item.name">
			<image :src="item.imgUrl" mode=""></image>
			<view class="">
				{{item.name}}
			</view>
		</view>
		
		<view class="" v-for="item in foodList2" :key="item.name">
			<image :src="item.imgSmall" mode=""></image>
			<view class="">
				{{item.name}}
			</view>
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
				foodList2: {}
			};
		},

		methods: {
			async search(event) {
				this.name = event.value;
				let result = await myRequestPost("/api/cookbook/by-name/get", {
					"name": this.name,
					"x_current_user_id": null
				});
				//console.log(result);
				this.foodList1 = result.cookbook_3rds;
				console.log(this.foodList1, "99999999999");
				this.foodList2 = result.cookbooks;
				console.log(this.foodList2, "ccccccccccccc")
			},

		},


		components: {
			uniSearchBar
		}
	}
</script>

<style lang="less">

</style>
