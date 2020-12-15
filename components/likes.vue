<template>
	<view class="icons" @click.stop="likeTap">
		<uni-icons size="20" color="#f07373" :type="like?'heart-filled':'heart'"></uni-icons>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				like: false
			};
		},
		watch: {
			item(newVal) {
				this.like = this.item.is_like
			}
		},
		created() {
			this.like = this.item.is_like
		},
		methods: {
			likeTap() {
				this.like = !this.like
				this.setUpdateLikes()
				console.log('收藏成功');
			},
			setUpdateLikes() {
				uni.showLoading()
				console.log(111)
				this.$api.update_like({
					user_id: '5e76254858d922004d6c9cdc',
					article_id: this.item._id
				}).then(res => {
					console.log(111)
					uni.hideLoading()
					console.log('是否', this.like)
					uni.showToast({
						title:this.like?'收藏成功':'取消收藏',
						icon:'none'
					})
					console.log(res);
					
				}).catch(()=>{
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>
	.icons {
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
	}
</style>