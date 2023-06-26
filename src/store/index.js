import Vue from 'vue'
import Vuex from 'vuex'
import user from "@/store/modules/user";
import tagsView from "@/store/modules/tagsView";
import permission from './modules/permission'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filter:(condition,data)=>{
      return data.filter( item => {
        return Object.keys( condition ).every( key => {
          return String( item[ key ] ).toLowerCase().includes(
              String( condition[ key ] ).trim().toLowerCase() )
        } )
      } )
    },
  },

  mutations: {
  },
  actions: {
  },
  modules: {
    permission,
    user,
    tagsView
  },
  // 定义全局getters 方便访问user 模块的roles
  getters:{
    roles: state => state.user.roles,
    permission_routes: state => state.permission.routes
  }
})
