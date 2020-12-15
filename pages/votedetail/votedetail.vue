<template>
	<view class="">

	</view>
</template>

<script>
	import {
		myRequestPost
	} from '@/utils/request.js'
	export default {
		data() {
			return {

			};
		},
		onLoad(options) {
			this.pid = options.id,
			console.log(options.id)
			this.getVoteDetail()
		},
		methods: {
			async getVoteDetail() {
				const res = await meiRequestGet({
					url: '/api/getthumimages/' + this.pid
				})
				this.lunboinfo = res.message
			}
		}
	}
</script>

<style>
</style>
