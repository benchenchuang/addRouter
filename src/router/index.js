import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/index'
const Login =() => import('@/pages/Login');
const Home =() => import('@/pages/Home');
const UserInfo =() => import('@/pages/UserInfo');
const CompanyList =() => import('@/pages/CompanyList');
const AddCompany =() => import('@/pages/AddCompany');

Vue.use(Router)
//公共页面
let routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

/* 权限路由：role: 0:角色1，1:角色2, nav: true可以渲染在导航栏 */
export const asyncRouters = [
  {
    path: '/home',
    name: 'Home',
    redirect: '/home/user_info',
    component: Home,
    meta: {role: ['0','1'], nav: true},
    children:[
      {
        path: 'user_info',
        name: 'UserInfo',
        component: UserInfo,
        meta: {role: ['0', '1'], nav: true},
      },
      {
        path: 'company_list',
        name: 'CompanyList',
        component: CompanyList,
        meta: {role: ['0'], nav: true},
      },
      {
        path: 'add_company',
        name: 'AddCompany',
        component: AddCompany,
        meta: {role: ['1'], nav: true},
      }
    ]
  }
]

let router = new Router({
  routes: routes,
  mode: 'history'
})


router.beforeEach((to, from, next) => {
  let info = store.state.userInfo;//获取用户信息
  let infoLength = Object.keys(info).length===0;
  //在这里判断路由'/login'，防止进入死循环。未登录，status为1，跳到登录页面，已登录，status为0，继续访问页面
  if(infoLength && to.path!=='/login'){
    let info = JSON.parse(localStorage.getItem('info')) || ''
    if(info.role >= 0){
      store.dispatch('userLogin', info)//用户信息存入vuex
      store.dispatch('permission', info.role+'').then(()=>{
        console.log(store.state.navList)
        router.addRoutes(store.state.navList);
        // next()
        next({ ...to, replace: true })
      })
    }else{
      next('/login')
    }
      // if(info.role>=0){
      //   store.dispatch('userLogin', info)//用户信息存入vuex
      //   store.dispatch('permission', info.role).then(()=>{
      //     router.addRoutes(store.state.navList);
      //     next()
      //     // next({ ...to, replace: true })
      //   })
      //   infoLength= false
      // }else{
      //   next('/login')
      // }
  }else{
    next()
  }
})
export default router