import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		menus:[]
	},
    mutations: {
		addToMenus(state,menus){
			var isexist=false;
			state.menus.forEach(item=>{
				if(item.id==menus.id){
					isexist=true
				}
			})
			if(isexist==false){
				state.menus.push(menus)
				menus.num++
			}
			console.log("menu",state.menus)
		}
	},
    actions: {},
	
})
export default store