<template>
	<view>
		<view class="box" v-for="item in menus" :key="item.id">
			<view >
				<image :src="item.img" mode=""></image>
			</view>
			<text>{{item.name}}</text>
			<text>{{item.num}}</text>
		</view>
	</view>
</template>

<script>
	//vuex
	import {
			mapState,
			mapMutations,
			mapGetters
		} from 'vuex';
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			
		},
		computed:{
			...mapState({
				menus:"menus"
			})
		}
	}
</script>

<style lang="scss">

</style>
