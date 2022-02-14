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



<f7-block style="padding:0px;margin:0px;">
  <center>
    <f7-swiper id="slider_home" pagination navigation scrollbar>
      <f7-swiper-slide><img :src="require('../assets/img/slider/1.jpg')"> </f7-swiper-slide>
      <f7-swiper-slide><img :src="require('../assets/img/slider/2.jpg')"> </f7-swiper-slide>
      <f7-swiper-slide><img :src="require('../assets/img/slider/3.jpg')"> </f7-swiper-slide>
    </f7-swiper>
 </center>
</f7-block>




<f7-block>
<f7-block-header>新注册用户</f7-block-header>

              <!--
                <f7-row tag="p" >
                    <f7-button fill small round class="col" @click="load('fade')">女性征婚</f7-button>
                    <f7-button fill small round class="col" @click="load('blink')">男性征婚</f7-button>
                    <f7-button fill small round class="col" @click="load('pulse')">异性交友</f7-button>
                </f7-row>

                -->

                <f7-list media-list v-if="loading" >
                  <f7-list-item
                    v-if="loading"
                    v-for="n in 3"
                    :key="n"
                    :class="`skeleton-text skeleton-effect-${effect}`"
                    title="Full Name"
                    subtitle="Position"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit. Aliquam vestibulum vitae lorem ac iaculis. Praesent nec pharetra massa, at blandit lectus. Sed tincidunt, lectus eu convallis elementum, nibh nisi aliquet urna, nec imperdiet felis sapien at enim."
                  >
                    <f7-skeleton-block style="width: 40px; height: 40px; border-radius: 50%" slot="media"></f7-skeleton-block>
                  </f7-list-item>
                </f7-list>
                <f7-list media-list v-else>

                <!--
                    <f7-list-item
                      title="John Doe"
                      subtitle="CEO"
                      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit. Aliquam vestibulum vitae lorem ac iaculis. Praesent nec pharetra massa, at blandit lectus. Sed tincidunt, lectus eu convallis elementum, nibh nisi aliquet urna, nec imperdiet felis sapien at enim."
                    >
                      <img src="https://placeimg.com/80/80/people/1" style="width: 40px; height: 40px; border-radius: 50%" slot="media">
                    </f7-list-item>
                    <f7-list-item
                      title="Jane Doe"
                      subtitle="Marketing"
                      text="Cras consequat felis at consequat hendrerit. Aliquam vestibulum vitae lorem ac iaculis. Praesent nec pharetra massa, at blandit lectus. Sed tincidunt, lectus eu convallis elementum, nibh nisi aliquet urna, nec imperdiet felis sapien at enim."
                    >
                      <img src="https://placeimg.com/80/80/people/2" style="width: 40px; height: 40px; border-radius: 50%" slot="media">
                    </f7-list-item>
                    <f7-list-item
                      title="Kate Johnson"
                      subtitle="Admin"
                      text="Sed tincidunt, lectus eu convallis elementum, nibh nisi aliquet urna, nec imperdiet felis sapien at enim."
                    >
                      <img src="https://placeimg.com/80/80/people/3" style="width: 40px; height: 40px; border-radius: 50%" slot="media">
                    </f7-list-item>
                -->

                  <f7-list-item
                    v-for="it in users"
                    :title="it.name"
                    :subtitle="getSubTitel(it)"
                    :text="getDesp(it)"
                  >
                    <img :src="getAvatar(it)" :onerror="getDefault(it)" style="width: 40px; height: 40px; border-radius: 50%" slot="media">
                  </f7-list-item>

                </f7-list>


<f7-block-footer>2020.9.10</f7-block-footer>
</f7-block>




  </f7-page>
</template>


<script>
export default {
    data() {
      return {
        loading: false,
        effect: null,
        result:'',
        users:[]
      };
    },
  created() {
  },
  destroyed() {
  },
  async mounted() {
          const self=this
          //登录p4sp
          let c=this.g.loadLogin()
          if(c){
              c.cmd='login'
              c.db=this.g.db()
              c.tracker=this.g.tracker()
              this.callNative(c)
          }

          this.$http.get('/api/users/new')
          .then((res) => {
            self.users=res.data
          }).catch( e => {
            //self.result=e.response.data
          })

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
     load: function (effect) {
        var self = this;
        if (self.loading) return;
        self.effect = effect;
        self.loading = true;
        setTimeout(() => {
          self.loading = false;
        }, 3000);
      },
      getAstro (str) {
        let r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
        let month = r[3]
        let day = r[4]
        let s = '魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯'
        let arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22]
        return s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2)
      },
      ages (str) {
        let r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
        if (r === null) {
          return false
        }
        let Y = new Date().getFullYear()
        return (Y - r[1])
      },
      getSubTitel(p){
        let sex=p.sex===1?'男':'女'
        return p.career+' ' + sex+' '+this.ages(p.birthday)+'岁 ';
      },
      getDesp(u){
         return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit. Aliquam vestibulum vitae lorem ac iaculis. Praesent nec pharetra massa, at blandit lectus. Sed tincidunt, lectus eu convallis elementum, nibh nisi aliquet urna, nec imperdiet felis sapien at enim."
        if(u.mood!==null)
          return u.mood
        else if(u.desp!==null)
          return u.desp

      },
     getAvatar(p){
        return this.g.db()+'img/a/'+p.uid+'.jpg'
     },
     getDefault(p)
     {
          if(p.sex===0)
            return  'this.src="' + require('../assets/img/sex0.jpg') + '"'
         else
            return  'this.src="' + require('../assets/img/sex1.jpg') + '"'
      },
     startVideoChat(t)
     {
        let c=this.g.loadLogin()
        if(c){
          c.cmd='login'
          c.type=t
          c.db=this.g.db()
          c.tracker=this.g.tracker()
          c.profile=this.g.getProfile()
          this.startGame('81_VideoChat',c,false)//最后一个参数表示屏幕
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
  width:410px;
  /*border-radius: 25px;-webkit-border-radius: 25px;-moz-border-radius: 25px;*/
}
</style>