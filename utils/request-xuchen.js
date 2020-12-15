const baseUrl = "https://api5.meishichina.com"

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



