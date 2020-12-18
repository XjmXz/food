const baseUrl = "https://api.myroki.com/rest/cks"
const baseUrlTwo="https://api.myroki.com/rest"

export function myRequestGet(url, data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			method: "GET",
			data: data,
			success: function(res) {
				resolve(res.data)
			},
			fail: function(err) {
				reject(err)
			}
		})
	})
}


export function myRequestPost(url, data) {
	return new Promise((resolve, reject) => {
		uni.request({
			//#ifdef H5
			url: url,
			//#endif
			//#ifdef MP-WEIXIN | MP-ALIPAY
			url: baseUrl + url,
			//#endif
			header: {
				'Content-Type': 'application/json'
			},
			method: "POST",
			data: data,
			success: function(res) {
				resolve(res.data)
			},
			fail: function(err) {
				reject(err)
			}
		})
	})
}
export function myRequestPostTwo(url, data) {
	return new Promise((resolve, reject) => {
		uni.request({
			//#ifdef H5
			url: "/nocks"+url,
			//#endif
			//#ifdef MP-WEIXIN | MP-ALIPAY
			url: baseUrlTwo + url,
			//#endif
			header: {
				'Content-Type': 'application/json'
			},
			method: "POST",
			data: data,
			success: function(res) {
				resolve(res.data)
			},
			fail: function(err) {
				reject(err)
			}
		})
	})
}
