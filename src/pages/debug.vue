<template>
  <f7-page>
    <f7-navbar title="软件设置" back-link="Back"></f7-navbar>
    <f7-block>
        <f7-list no-hairlines-md>
        <f7-list-input
          outline
          label="database服务器"
          floating-label
          type="text"
          placeholder="服务器"
          :value="configure.db" @input="configure.db = $event.target.value">
          clear-button
        >
        </f7-list-input>

        <f7-list-input
          outline
          label="tracker服务器"
          floating-label
          type="text"
          placeholder="服务器"
          :value="configure.tracker" @input="configure.tracker = $event.target.value">
          clear-button
        >
        </f7-list-input>

        <f7-list-input
          outline
          label="game服务器"
          floating-label
          type="text"
          placeholder="服务器"
          :value="configure.game" @input="configure.game = $event.target.value">
          clear-button
        >
        </f7-list-input>


        <p>
          <f7-button fill @click=modifyServer() >修改服务器配置</f7-button>
        </p>
      </f7-list>
    </f7-block>

    <f7-block>
        <f7-list no-hairlines-md>
        <f7-list-input
          outline
          label="用户编号"
          floating-label
          type="text"
          placeholder="uid"
          :value="configure.uid" @input="configure.uid = $event.target.value">
          clear-button
        >
        </f7-list-input>


        <f7-list-input
          outline
          label="用户凭证"
          floating-label
          type="text"
          placeholder="Bearer Token"
          :value="configure.token" @input="configure.token = $event.target.value">
          clear-button
        >
        </f7-list-input>

        <p>
          <f7-button fill @click=modifyUser() >修改用户登录</f7-button>
        </p>

        <p>
          <f7-button fill @click=startLocalDebugPage() >启动本地调试</f7-button>
       </p>

        <p>
          <f7-button fill @click=logout()>切换账户</f7-button>
       </p>

              <f7-block>
                  <f7-button fill color="red" v-on:click=startMeeting(2020,0)>公测--互动直播 创建</f7-button>
              </f7-block>
              <f7-block>
                  <f7-button fill color="green" v-on:click=startMeeting(2020,10001)>公测--互动直播 加入</f7-button>
              </f7-block>

              <f7-block>
                  <f7-button fill color="green" v-on:click=startVideoEmotion(3,10002)>横屏双视频</f7-button>
              </f7-block>

      </f7-list>
    </f7-block>

  </f7-page>
</template>

<script>
  export default {
    data() {
      return {
          configure:{db:'',tracker:'',game:'',uid:0,token:''}
      };
    },
  created() {
        let c=this.g.conf()
        this.configure.db=c.db
        this.configure.tracker=c.tracker
        this.configure.game=c.game

        this.configure.uid   =10002
        this.configure.token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEwMDAyIiwibmJmIjoxNTc0MDU0NTgwLCJleHAiOjE1NzY2NDY1ODAsImlhdCI6MTU3NDA1NDU4MH0.1h9KOfXtXnqcTsy94o0dA7WLtv9EjNEFNTMHcrBaAbY'
  },
  async mounted() {

  },
  methods:{
     modifyServer(){
        var c=this.g.conf()
        c.db=this.configure.db
        c.tracker=this.configure.tracker
        c.game=this.configure.game

        this.g.setConf(c)
        this.$http.defaults.baseURL =this.g.db();
      },
     modifyUser(){
      let l=this.g.loadLogin()
      l.uid=this.configure.uid
      l.token=this.configure.token
      this.g.saveLogin(l)
    },
    startLocalDebugPage(){
        this.debugPage()
    },
    logout(){
        localStorage.clear();
        this.$http.defaults.baseURL =this.g.db();
        this.$f7router.navigate('/myself/')
    },
    startMeeting(s_id,c_id)
     {//开启视频会议模式
        if(this.g.loadLogin()){
          let c={cmd:'meeting',sid:s_id,cid:c_id}
          this.startGame('81_VideoChat',c,true)
        }else
        {
          this.showToastIcon('请先登录服务器')
        }
     },
     startVideoEmotion(t,p)
     {  //开始表情大战  横屏双视频
        if(this.g.loadLogin()){
          let c={cmd:'emotionWar',type:t,to:p,screen:'landscape'}
          this.startGame('81_VideoChat',c)
        }else
        {
          this.showToastIcon('请先登录服务器')
        }
     },

   }
  }
</script>
