<template>
	<view class="">
		<block v-for="item in elite" :key="item.id">
			<view class="content">
				<view class="content2">
					<image :src="item.avatar" class="img1"></image>
					<view class="rt">
						<text class="texts1">{{item.username}}</text>
						<text class="texts2">{{item.diettime}}</text>
					</view>
					
					<button class="tp">精 选</button>
					<view class="texts4">{{item.title}}</view>
					<view class="texts3">{{item.subject}}</view>
					<view class="commentPhoto">
						<block v-for="picitem in item.photo" :key="picitem.pic">
							<image :src="picitem.pic" class="img2"></image>
						</block>
					</view>

					<view class="contentbottom">
						<text class="texts5">{{item.likenum}}个喜欢</text>
						<text class="texts5">{{item.collnum}}个评论</text>
					</view>

				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props: ['elite'],
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.content {
		// height: 400rpx;
		// border-top: 1px solid #DCDCDC;
		border-bottom: 1px solid #DCDCDC;
		width: 725rpx;
		margin-left: 25px;
		position: relative;
		padding-bottom: 9px;

		.content2 {
			// position: absolute;
			width: 325px;
			margin: 0;
			margin-right: 25px;
			// padding-right: 25px;
			// box-sizing: border-box;
			// right: 0;
			.tp{
				color: rgb(255, 103, 103);
				font-size: 24rpx;
				border: 1px solid red;
				margin: 0 10rpx 20rpx 0;
				line-height: 38rpx;
				text-align: center;
				padding: 0;
				// display: inline;
				height: 40rpx;
				width: 90rpx;
			}
		}

		.img1 {
			border-radius: 50%;
			height: 80rpx;
			width: 80rpx;
			margin-top: 15px;
			// vertical-align: top;
		}

		.texts1 {
			color: #000000;
			font-size: 20px;
		}

		.texts2 {
			color: #888;
			font-size: 14px;
			// margin-bottom: 5px;
		}

		.texts3 {
			font-size: 16px;
			margin-bottom: 18rpx;
		}

		.texts4 {
			font-size: 18px;
			font-weight: bold;
			margin-bottom: 18rpx;
		}

		
		.rt {
			position: absolute;
			left: 55px;
			top: 15px;
		}
		.backtexts{
			width: 6px;
			height: 5px;
			background-color:#FA8072 ;
		}

		.commentPhoto {
			width: 650rpx;

			.img2 {
				width: 210rpx;
				height: 210rpx;
				display: inline-block;
				margin-right: 6rpx;
				border-radius: 16rpx;
			}
		}

		.contentbottom {
			margin-top:18rpx;
			height: 20px;
			display:flex;
			flex-wrap: nowrap;
			.texts5 {
				width:100rpx;
				color: #696969;
				font-size: 10px;
				margin-right: 10rpx;
				// line-height:40rpx ;
			}
			
		}

		text {
			display: block;
			margin: 0;
		}
	}
</style>
