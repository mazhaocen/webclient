import Vue from 'vue'
import Router from 'vue-router'
let Home = () =>import(/* webpackChunkName: "about" */ './views/Home.vue')
let Login = () => import(/* webpackChunkName: "about" */ './views/login/login.vue')
let SignIn = () => import(/* webpackChunkName: "about" */ './views/login/signIn')
let UserList = () => import(/* webpackChunkName: "about" */ './views/userManage/userList')
let port = () => import(/* webpackChunkName: "about" */ './views/portManage/port')

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'userList.vue', component: Login},
    {path: '/signIn', name: 'signIn', component: SignIn},
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {path:'*', name: '', component: Home},
        {path:'/userList', name: 'userList', component: UserList},
        {path:'/port', name: 'port', component: port},
      ]
    },
  ]
})
