import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		menus:[]
	},
    mutations: {
		addToMenus(state,menu){
			state.menus.push(menu)
		}
	},
    actions: {},
	
})
export default store