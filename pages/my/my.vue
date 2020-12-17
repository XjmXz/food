<template>
	<view>
		这是我的页面
		<view class="collect" @click="linkto">
			收藏的菜谱
		</view>
		<view class="Lottery" @click="linkToLottery">
			随机选菜
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			linkto(){
				uni.navigateTo({
					url:"/pages/Collect/Collect"
				})
			},
			linkToLottery(){
				uni.navigateTo({
					url:"/pages/Lottery/Lottery"
				})
			}
		}
	}
</script>

<style lang="less">

</style>
