import Vue from 'vue'
import elementUi from 'element-ui'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import 'element-ui/lib/theme-chalk/index.css';
import { Message } from 'element-ui';

Vue.use(elementUi, {size: 'small'})


axios.defaults.baseURL= 'http://localhost:3000/'
axios.defaults.withCredentials= true

// 添加请求拦截器
let token //id, userName,
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log(config);
  config.headers.Token = sessionStorage.getItem('token')
  // config.headers.Key = id
  // config.headers.User = userName
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

axios.interceptors.response.use( (response) => {
  // 对响应数据做点什么
  // console.log(response);
  // if (response.config.url.indexOf('/users/login') !==-1) {
  //   // id = response.data.data.id
  //   // userName = response.data.data.userName
  // }
  console.log(response.headers);
  sessionStorage.setItem('token', response.headers.token)
  if (response.data.code === 0) {
    Message.closeAll()
    Message.error(response.data.msg)
    if (response.data.msg === '登录过期') {
      location.hash = `#/`
    }
  }
  return response.data;
},  (error) => {
  // 对响应错误做点什么
  // console.log(JSON.stringify(error));
  Message.error(`${error.message}`)
  return Promise.reject(error);
});


Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
