curl "https://api5.meishichina.com/api.php?p=^%^5Bobject^%^20Object^%^5D" -H "content-type: application/json" -H "accept-charset: utf-8" -H "referer: https://devappid.hybrid.alipay-eco.com/null/dev/index.html^#pages/square/square" -H "user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 12_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 ChannelId(0) LyraVM Nebula  AlipayDefined() AliApp(AP/10.1.80) AlipayClient/10.1.80 Language/en AlipayIDE" -H "accept-encoding: gzip, deflate" --compressed

1.（支付宝里面提交的参数是object）

async getSquareWatch() {
				let result = await myRequestGet('/api.php', {
					p: JSON.stringify({
						"m": {
							"pai_getPaiList": {
								"type": "all",
								"pageindex": this.pageindex
							}
						},
						"openudid": "meishichina",
						"uid": 12656254,
						"appver": "3028",
						"device": "microsoftmicrosoft",
						"appname": "xcx_weixin",
						"session": "xcx_weixin:weixin:12656254:g4j5SkNMeV2KNerCulQ1YPuLTnGKQI1J"
					})
				});
				// this.square = result.pai_getPaiList.data;
				console.log(result,"uuuuuuuuuuuuuuuuu");
				this.square = [...this.square, ...result.pai_getPaiList.data];
			},
