<template>
	<view>
		这是我的页面
		<view class="collect" @click="linkto">
			收藏的菜谱
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
			}
		}
	}
</script>

<style lang="less">

</style>
