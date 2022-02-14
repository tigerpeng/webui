<template>
  <f7-page name="home" class="page">

    <!-- Top Navbar -->
<!-- 
    <f7-navbar :sliding="false" large>
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>大厅</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="right"></f7-link>
      </f7-nav-right>
      <f7-nav-title-large sliding>大厅</f7-nav-title-large>
    </f7-navbar>
-->

<!-- 
    <p class="tips" v-if="loginStatus===0">
        <img :src="require('../assets/img/loading.gif')" width="20" height="20"> 正在连接服务器...
    </p>
    <p class="tips" style="corlor:red" v-else-if="loginStatus===-1">
       <i class="icon f7-icons color-red" style="padding-right:15px;">f7:wifi_slash</i>登录tracker服务器失败!游戏和视频通话功能将无法使用!
    </p>
    <p class="tips" v-else-if="loginStatus===-2">
        您尚未登录系统.匿名访问
    </p>
    <p class="tips" v-else>
       登录tracker 服务器成功!
    </p>
-->

    <!-- Page content
      <f7-block strong>
        <p class=page>卡五星 Alpha 内测版,仅限亲友之间测试使用</p>
      </f7-block>
      <f7-list inset>
        <f7-list-button title="2人桌 底分1 最大16番 封顶" color="green" ></f7-list-button>
        <f7-list-button title="3人桌 底分1 最大16番 封顶" color="green" ></f7-list-button>
        <f7-list-button title="4人桌 底分1 最大16番 封顶" color="green" ></f7-list-button>
      </f7-list>
    -->

<!-- 
    <f7-block-title>卡五星 自动匹配局 (当前在线: 181人)</f7-block-title>
    <f7-block>
        <f7-button fill color="green" v-on:click=startMahjong(2)>开始游戏 2人对战</f7-button>
    </f7-block>
        <f7-block>
        <f7-button fill color="red"   v-on:click=startMahjong(3)>开始游戏 3人对战</f7-button>
    </f7-block>
    <f7-block>
        <f7-button fill color="green" v-on:click=startMahjong(4)>开始游戏 4人对战</f7-button>
    </f7-block>

    <f7-block>
        <f7-button fill color="green" v-on:click=startMahjong(4)>表情识别 测试</f7-button>
    </f7-block>
    <f7-block>
        <f7-button fill color="green" v-on:click=startMahjong(4)>表情大战 1v1</f7-button>
    </f7-block>
    -->




  <f7-block style="margin-top:5px;">
    <f7-swiper id="slider_home">
      <f7-swiper-slide><img :src="require('../assets/img/slider/1.jpg')"  > </f7-swiper-slide>
      <f7-swiper-slide><img :src="require('../assets/img/slider/2.jpg')"  > </f7-swiper-slide>
      <f7-swiper-slide><img :src="require('../assets/img/slider/3.jpg')"  > </f7-swiper-slide>
    </f7-swiper>
  </f7-block>




  </f7-page>
</template>


<script>
export default {
    data() {
      return {
        result:'',
      };
    },
  created() {
  },
  destroyed() {
  },
  async mounted() {
          //登录p4sp
          let c=this.g.loadLogin()
          if(c){
              c.cmd='login'
              c.db=this.g.db()
              c.tracker=this.g.tracker()
              this.callNative(c)
          }
   },
   computed:{
    loginStatus () {
        let l=this.g.loadLogin()
        if(l)
          return this.$store.state.offline
        else
          return -2
      }
   },
   methods:{
     startVideoChat(t)
     {
        let c=this.g.loadLogin()
        if(c){
          c.cmd='login'
          c.type=t
          c.db=this.g.db()
          c.tracker=this.g.tracker()
          c.profile=this.g.getProfile()
          this.startGame('81_VideoChat',c)
        }
     },
     startMahjong(t){
        let c=this.g.loadLogin()
        if(c){
          if(this.$store.state.offline===0)
          {
              this.showToastIcon('正在连接服务器，请稍后再试!')
          }else if(this.$store.state.offline===-1)
          {
              this.showToastIcon('登录服务器失败,无法启动游戏!')
          }else
          {
            c.cmd='login'
            c.type=t
            c.tracker=this.g.tracker()
            alert(c.tracker)
            c.profile=this.g.getProfile()
            this.startGameMJ(c)
          }
        }else{
          //显示未登录
          this.showToastIcon('请先 注册/登录!')
        }
    },
    showToastIcon(m) {
        const self = this;
        // Create toast
        if (!self.toastIcon) {
          self.toastIcon = self.$f7.toast.create({
            icon: self.$theme.ios ? '<i class="f7-icons">start</i>' : '<i class="material-icons">start</i>',
            text: m,
            position: 'center',
            closeTimeout: 2000,
          });
        }
        // Open it
        self.toastIcon.open();
      },
   }
  }
</script>
<style>
#slider_home img{
  height:200px;
  border-radius: 25px;-webkit-border-radius: 25px;-moz-border-radius: 25px;
}
</style>