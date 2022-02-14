<template>
<f7-app :params="f7params" >

  <!-- Left panel with cover effect-->
  <f7-panel left cover theme-dark>
    <f7-view>
      <f7-page>
        <f7-navbar title="功能预留"></f7-navbar>
        <f7-block>功能模块正在开发中...</f7-block>
      </f7-page>
    </f7-view>
  </f7-panel>


  <!-- Right panel with reveal effect-->
  <f7-panel right reveal theme-dark>
    <f7-view>
      <f7-page>
        <f7-navbar title="功能预留"></f7-navbar>
        <f7-block>功能模块正在开发中...</f7-block>
      </f7-page>
    </f7-view>
  </f7-panel>


  <!-- Views/Tabs container -->
  <f7-views tabs class="safe-areas">
  <!--  检查p4sp 连接状态
          <div class="net_tips" v-if="loginStatus===0">
              <img :src="require('../assets/img/loading.gif')" width="20" height="20"> 正在连接【消息服务器】...
          </div>
          <div class="net_tips" style="corlor:red" v-else-if="loginStatus===-1">
             <i class="icon f7-icons color-red" style="padding-right:15px;">f7:wifi_slash</i>登录【消息服务器】失败!通信功能将无法使用!
          </div>
          <div class="net_tips" v-else-if="loginStatus===-2">
              您尚未登录,完整使用系统需要您先注册/登录
          </div>
    -->


    <!-- Tabbar for switching views-tabs -->
    <f7-toolbar tabbar labels bottom>
      <f7-link tab-link="#view-world" tab-link-active icon-ios="f7:house_fill" icon-aurora="f7:house_fill" icon-md="material:home" text="世界"></f7-link>
      <f7-link tab-link="#view-social" icon-ios="f7:today_fill" icon-md="material:free_breakfast" text="社区"></f7-link>
      <f7-link tab-link="#view-myself" con-ios="f7:cloud_fill" icon-md="material:person"  text="我的"></f7-link>
    </f7-toolbar>

        <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
    <f7-view id="view-world" main tab tab-active url="/"></f7-view>
        <!-- Social View -->
    <f7-view id="view-social" name="social" tab url="/social/"></f7-view>
        <!-- Myself View -->
    <f7-view id="view-myself" name="myself" tab url="/myself/"></f7-view>


    <!-- Settings View -->
    <f7-view id="view-home"" name="home" tab url="/home/"></f7-view>
  </f7-views>


  <!-- Popup -->
  <f7-popup id="my-popup">
    <f7-view>
      <f7-page>
        <f7-navbar title="Popup">
          <f7-nav-right>
            <f7-link popup-close>Close</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
          <p>Popup content goes here.</p>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-popup>

  <f7-login-screen id="my-login-screen">
    <f7-view>
      <f7-page login-screen>
        <f7-login-screen-title>Login</f7-login-screen-title>
        <f7-list form>
          <f7-list-input
            type="text"
            name="username"
            placeholder="Your username"
            :value="username"
            @input="username = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            type="password"
            name="password"
            placeholder="Your password"
            :value="password"
            @input="password = $event.target.value"
          ></f7-list-input>
        </f7-list>
        <f7-list>
          <f7-list-button title="Sign In" login-screen-close @click="alertLoginData"></f7-list-button>
          <f7-block-footer>
            Some text about login information.<br>Click "Sign In" to close Login Screen
          </f7-block-footer>
        </f7-list>
      </f7-page>
    </f7-view>
  </f7-login-screen>
</f7-app>
</template>
<script>

  import routes from '../js/routes.js';

  export default {
    data() {
      return {
        // Framework7 Parameters
        f7params: {
          name: 'OurNet',   // App name
          theme: 'auto',    // Automatic theme detection
          // App root data
          data: function () {
            return {
              user: {
                firstName: 'John',
                lastName: 'Doe',
              },
              // Demo products for Catalog section
              products: [
                {
                  id: '1',
                  title: '视频互动',
                  description: '视频互动是一款 1对1 在线视频聊天/交友系统，社区正在建设中...'
                },
                {
                  id: '2',
                  title: '知识付费',
                  description: '知识付费是一种 1对1 知识问答 实时提问在线解决系统 社区正在建设中...'
                },
                {
                  id: '3',
                  title: '视频直播',
                  description: '多人在线娱乐系统 社区正在建设中...'
                },
              ]
            };
          },

          // App routes
          routes: routes,
        },

        // Login screen data
        username: '',
        password: '',
      }
    },
    computed:{
    
    },
    methods: {
      alertLoginData() {
        this.$f7.dialog.alert('Username: ' + this.username + '<br>Password: ' + this.password);
      }
    },
    mounted() {
      this.$f7ready((f7) => {

        // Call F7 APIs here
        //make F7 global add by copyleft
        window.$f7 = f7;

        document.title =f7.name;
        console.log('F7 ready'); 
        console.log(f7); 
        //console.log(this); 
        f7.view.stackPages=true;    //开启多级缓存
      }); 

    }
  }
</script>

<style scoped>
.net_tips{
  height:22px;
  padding-left:10px;
  color:white;
  background-color: #990000;
  display: flex; /**/
  /*justify-content: center;*/  /*水平居中*/
  align-items: Center;          /*垂直居中*/
}
</style>