import Vuex from 'vuex'
import Vue from 'vue'
import { asyncRouters } from '@/router/index'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: {},//用户信息
        navList: [],//权限路由
    },
    mutations: {
        userLogin(state,userData){
            state.userInfo = Object.assign({},state.userInfo,userData)
        },
        navList(state,navList){
            state.navList = navList
        }
    },
    actions: {
        userLogin:({commit},userData)=>commit('userLogin',userData),
        permission:({commit},role)=>{
            let routerArry= deepCopy(asyncRouters);
            const getRouters= filterAsyncRouter(routerArry,role)
            commit('navList',getRouters)
        },
        getUserInfo:({commit},data)=>{
            return commit('userLogin',data)
        }
    }
});
//根据权限筛选路由
function filterAsyncRouter(asyncRouterMap,role){
    let accessedRouters = asyncRouterMap.filter(route => {
        if (route.meta.role.indexOf(role) >= 0) {
          if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children, role)
          }
          return true
        }
        return false
    })
    return accessedRouters;
}
//深拷贝
function deepCopy(routerArr){
    return routerArr.map(arr=>{
        arr = Object.assign({},arr);
        return arr;
    })
}

export default store;