<template>
  <f7-page>
      <f7-navbar :title="$f7route.params['rName']" back-link="Back">
        <f7-nav-right>
          <f7-link icon-ios="f7:reload" icon-md="f7:reload" @click="refreshRoom()"></f7-link>
        </f7-nav-right>
      </f7-navbar>

      <f7-block-title>座位列表</f7-block-title>
     <f7-block>
      <p> 茶馆麻将:分为 2人卡五星,3人卡五星,4人卡五星,点击空缺图标，加入战局,第一个加入的玩家为庄家<br/>
          茶馆活动:请向茶馆老板咨询
      </p>
      <ul style="width:100%;margin:0;padding:0;">
        <li class="deskRow" v-for="desk in desks" :key="desk.id" track-by="$index">
            <div class="mjdesk">
                <div v-for="n in desk.chairs">
                  <img v-if="desk.players.length>=n" :src=getPlayerAvatar(desk.players[n-1].avatar) :key="desk.id" class="avatar" width=50px height=50px :onerror="errorImg" >
                  </img>
                  <img v-else class="avatar" width=50px height=50px  src='/static/img/-1.jpg' :key="desk.id" :onerror="errorImg" v-on:click=sitDown(desk.id) >
                  </img> 
                  <p class="player">{{getPlayerName(n,desk)}}</p>
                </div>
                <p class="deskno" style="color:red">{{desk.id}}</p>
            </div>
        </li>
      </ul>
   </f7-block>

  </f7-page>
</template>

<script>
  export default {
    data() {
      return {
        imgDesk:require('../static/img/table.png'),
        desks:[],
        websock: null,
        roomID:0,
        result:'',
      };
    },
  computed:{
    errorImg() {
      return  'this.src="' + require('../static/img/def.jpg') + '"'
    },
  },
  created() {
      this.roomID=this.$f7route.params['rId']

  },
  destroyed() {
      this.websock.close() //离开路由之后断开websocket连接
  },
  async mounted() {
      
          this.desks=[{id:1001,chairs:3,players:[{name:'张三三',avatar:'/static/img/0.jpg'},{name:'李四四',avatar:'/static/img/1.jpg'},{name:'王五五',avatar:'/static/img/2.jpg'}]},
          {id:1002,chairs:3,players:[{name:'赵一二三四五六七八九十',avatar:'/static/img/0.jpg'},{name:'孙七七',avatar:'/static/img/1.jpg'}]},
          {id:1003,chairs:3,players:[{name:'周八',avatar:'/static/img/0.jpg'}]},
          {id:1004,chairs:2,players:[{name:'吴九',avatar:'/static/img/1.jpg'}]},
          {id:1005,chairs:2,players:[]},
          {id:1006,chairs:4,players:[{name:'郑十',avatar:'/static/img/2.jpg'}]},
          {id:1007,chairs:4,players:[]}
          ]
          


    //this.initWebSocket()
    },
   methods:{
     connect() {
        let self=this
        return new Promise(function(resolve, reject) {
            let wsUrl=self.GLOBAL.websocketUrl
              wsUrl='ws://localhost:9000/mj'
            var server = new WebSocket(wsUrl);
            server.onopen = function() {
                resolve(server);
            };
            server.onerror = function(err) {
                reject(err);
            };

        });
    },
      initWebSocket(){ //初始化weosocket
        let self=this
    self.connect().then(function(server) {
        self.websock=server;

        server.onmessage = self.on_message;
          //this.websock.onopen = self.websocketonopen;
          server.onerror = self.on_error;
          server.onclose = self.on_close;

          self.refreshRoom();
    }).catch(function(err) {
        // error here
         alert('错误')
    });
      },
      websocketonopen(){ //连接建立之后执行send方法发送数据
        this.refreshRoom()
      },
      on_error(){//连接建立失败重连
        this.initWebSocket();
      },
      on_close(e){  //关闭
        console.log('断开连接',e);
      },
      on_message(e){ //数据接收
        const res = JSON.parse(e.data);
        if("-listDesk"==res.cmd)
        {
          this.result=JSON.stringify(res)
          this.desks=res.desks

          setTimeout(() => {
            this.$f7.preloader.hide();
          }, 1000);
        }
      },
      send_msg(Data){//数据发送
        this.websock.send(Data);
      },
     getPlayerName(n,desk){
        let retName=''
        if(desk.players.length>=n)
          retName=desk.players[n-1].name
        if(retName.length>5)
          retName=retName.substr(0,5)

        return retName;
     },
     getPlayerAvatar(a){
        if(a.indexOf("http://")>0)
            return a
        else 
            return '/static/img/'+a;
     },
     refreshRoom(){//刷新房间
        const self = this;
        //self.$f7.preloader.show();
        let actions = {cmd:"listDesk",roomID:this.roomID};
        this.send_msg(JSON.stringify(actions));
     },
     startMahjong(t){
      let tNo=0;          //桌号
      let cmd = {cmd:'login',token:this.GLOBAL.getToken(),tblNO:tNo,serverURL:'ws://lobby.hellowtalks.com/mj',setting:{type:1,desp:'区块链'},open:true}
          cmd.profile=this.GLOBAL.getProfile()
     this.startGameMJ(cmd)
    },
    sitDown(deskNO){
        this.startMahjong(deskNO)
    },
   }
  }
</script>

<style>
.deskRow{float:left;width:170px;list-style:none;padding:20px 20px 50px 0px;margin:0;}  
.mjdesk{position:relative;width:170px;height:170px;ont-size:small;background-image:url(/static/img/table.png);background-size:contain;}
.avatar{border:solid 1px #fff;border-radius: 50px;overflow:hidden;}
.deskno{line-height:200px;text-align:center;color:red;}
.mjdesk p{margin:0;padding:0;color:green;}
.mjdesk div:nth-child(1){
    position:absolute;left:0;top:0;margin:0;width:50%;height:auto;
}
.mjdesk div:nth-child(2){
   position:absolute;right:0px;top:0;width:50%;height:auto;text-align:right;
}
.mjdesk div:nth-child(3){
   position:absolute;bottom:0px;left:0;width:auto;height:50px;
}
.mjdesk div:nth-child(4){
    position:absolute;bottom:0px;right:0;width:auto;height:50px;text-align:right;
}
.player{background-color:white;color:green;width:72px;}
</style> 