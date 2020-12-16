import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		carts: uni.getStorageSync('carts') || []
	},
	mutations: {
		addToCarts(state, good) {
			var currentGood = state.carts.find(item => {
				if (item.name == good.name) {
					return item;
				}
			})
			if (currentGood) {
				// currentGood.buynum += good.buynum
				if(currentGood.name){
					uni.showToast({
						title:'添加过了'
					})
				}
			} else {
				state.carts.push(good)
				console.log("99999999999",state.carts)
			}
			uni.setStorageSync('carts', state.carts)
		}
	},
	actions: {}
})
export default store
