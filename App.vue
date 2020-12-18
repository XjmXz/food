<script>
	import './static/iconfont-weapp-icon.css';
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@font-face {font-family: "iconfont";
	  src: url('//at.alicdn.com/t/font_2274055_puq8pbyvgp.eot?t=1608172100702'); /* IE9 */
	  src: url('//at.alicdn.com/t/font_2274055_puq8pbyvgp.eot?t=1608172100702#iefix') format('embedded-opentype'), /* IE6-IE8 */
	  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
	  url('//at.alicdn.com/t/font_2274055_puq8pbyvgp.woff?t=1608172100702') format('woff'),
	  url('//at.alicdn.com/t/font_2274055_puq8pbyvgp.ttf?t=1608172100702') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
	  url('//at.alicdn.com/t/font_2274055_puq8pbyvgp.svg?t=1608172100702#iconfont') format('svg'); /* iOS 4.1- */
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icon-ziyuanldpi:before {
	  content: "\e61b";
	}
	
	.icon-shoucang:before {
	  content: "\e6f8";
	}
	
	.icon-shoucang1:before {
	  content: "\e619";
	}
	
	.icon-gift-box:before {
	  content: "\e65a";
	}
	
	.icon-fenxiang-:before {
	  content: "\e61a";
	}
	
	.icon-pinlun:before {
	  content: "\e61e";
	}
	/* page {
		height: 100%;
	} */
</style>
