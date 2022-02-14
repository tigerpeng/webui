// Import Vue
import Vue from 'vue';

// Import Framework7
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

// Import App Component
import App from '../components/app.vue';

import store from './store.js'

//add by copyleft
//全局变量
import global_ from '../components/global.vue'//引用文件
import axios from 'axios'


//2020.8.1
//import fp from './fp.js'
//Vue.prototype.$fp=fp;

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

//add 
//加载全局变量
//Vue.prototype.GLOBAL = global_;//删除掉
Vue.prototype.g=global_;
Vue.prototype.$fp=global_;


//使用nginx 跨域需要注释下面这行
axios.defaults.baseURL =global_.db();

//注册全局方法 这里顺序很重要
Vue.prototype.$http =axios;

//当需要跨域的时候post put 等用JSON.stringify({}）将对象转换成字符串即可

// Vue.http.options.root = process.env.NODE_ENV === 'development' ? 'src/assets/data' : '/vue-sui-demo/static/data'
// Vue.http.options.emulateJSON = true
axios.interceptors.request.use(config => {
  let token = global_.getToken()
    if (token) {
      // config.headers['X-Token'] = xtoken
      //config.headers.withCredentials=true; 'Bearer ' + 
      config.headers.Authorization = token;
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })


// axios.interceptors.response.use((response) => {
//     if(response.status === 401) {
//           alert("You are not authorized");
//     }else if(response.status === 400){
//           let r='code:'+ response.status +'(' + response.statusText + ')' + response.data;
//           alert(r);
//     }
//     return response;
// }, (error) => {
//     if (error.response && error.response.data) {
//         return Promise.reject(error.response.data);
//     }
//     return Promise.reject(error.message);
// });

// 401错误直接导航到登录
axios.interceptors.response.use(function (response) {
  if (response.data.code === 4) {//token 已过期，重定向到登录页面
    localStorage.clear()
  }
  return response
}, (err) => {
  if (err.response) {
    switch (err.response.status) {
      case 401:
        //err.message = '未授权，请登录!'
        break
      case 404:
        //err.message = `请求地址出错: ${err.response.config.url}`
        break
      default:
    }
  }
  console.log(err); 
  //err.message='code:' + err.response.status;
  return Promise.reject(err)        //返回错误 .err
  //return Promise.resolve(err)     //返回正常 .then
})



//调用 java 
/*
Vue.prototype.callNativeX = function (p) {
    try{
        let ac = btoa(encodeURI(JSON.stringify(p)))
        Android.command(ac)
    }catch(e){
    }
}*/
Vue.prototype.callNative = function (p) {
    try{
        let ac = btoa(encodeURIComponent(JSON.stringify(p)))
        Android.command(ac)
    }catch(e){
    }
}
//开始游戏
Vue.prototype.startGame = function (g,p) {
  //alert(JSON.stringify(p))
  let bootJson="";
  if(p.screen && p.screen==='portrait')
    bootJson=g+"|"
  else
    bootJson=g+":"

  let ac = btoa(encodeURI(JSON.stringify(p)))
  bootJson+=ac
  try{
      Android.startGame(bootJson)
    }catch(e){

    }
}
//开始游戏 麻将
Vue.prototype.startGameMJ = function (p) {
  //alert(JSON.stringify(p))
  let ac = btoa(encodeURI(JSON.stringify(p)))
  try{
      Android.startGame("80_Mahjong:"+ac)
    }catch(e){

    }
}
Vue.prototype.debugPage = function () {
    try{
        Android.debugPage()
    }catch(e){}
}


//kotlin invoke
window.nativeCall = function (p) {
  let jstr=decodeURIComponent(atob(p))
  //console.log(`nativeCall: ${p}`)

  global_.info=jstr
  let r=window.$f7.views.current.router
  //下面的注释全部ok
  //window.$f7.dialog.alert('aaaaa')
  //window.$f7.views.main.tab.show('view-home',true)
  //window.$f7.views.main.router.navigate('/about/')
  //window.$f7.views.current.router.navigate('/about/')
  try {
    var path=''
    let c = JSON.parse(jstr)
    if(c.where==='teaHouse')
    {
      teaHouseMsg(c)
    }else
    {
        if (c.cmd === '-login') {
           if(c.ipport==="")
            store.commit('offline')
          else
            store.commit('online')
        }else if('ask'===c.cmd ) {
          /* 2020.8.25 取消web界面  直接用local界面询问用户是否接听视频电话
          path='/ask/type/'+c.type+'/from/'+encodeURI(JSON.stringify(c.from))+'/'
          r.navigate(path)  */
          //直接转发
          let res = {cmd:'-ask',type:c.type,from:c.from,screen:'portrait'}
          Vue.prototype.startGame('81_VideoChat',res,false)
        }else if('info'===c.cmd ) {
          path='/info/json/'+ p +'/'
          r.navigate(path)
        }
    }
  } catch (e) {
    global_.info+='exception in parse command message:'+e.message
  }

  return ''
}

/*
//java 调用js 传参数 已经放弃
window.callJS = function (jsonS) {
  this.$f7router.navigate('/about/')
  global_.info=jsonS
  return ''
}
*/

// Init App
new Vue({
  el: '#app',
  render: (h) => h(App),
  store,
  // Register App Component
  components: {
    app: App
  },
});