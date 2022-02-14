<template>
  <f7-page>
      <f7-navbar :title="$f7route.params['rName']" back-link="Back">
        <f7-nav-right>
          <f7-link icon-ios="f7:reload" icon-md="f7:reload" @click="refreshRoom()"></f7-link>
        </f7-nav-right>
      </f7-navbar>
      <f7-block-title>当前在线人数: {{online}} </f7-block-title>
      <f7-block-title>自动匹配局 </f7-block-title>
      <f7-block>
      <p style="padding-left:20px"> 
         每局结束自动随机换人,避免用户开黑作弊.<br/>
         底分100币,最高8X封顶,佣金25币<br/>
         积分规则:<br/>
         {"双龙七对":16,"龙七对":8,"大三元":8,"小三元":4,"七对":4,"清一色":4,"手抓一":4,"暗四归一":4,"明四归一":2,"杠上开花":2,"抢杠胡":2,"卡五星":2,"海底捞":2,"亮倒":2,"天胡":2,"碰碰胡":1,"自摸":1}
      </p>
        <f7-button fill color="green"   v-on:click=startMahjongAuto(3)>进入 卡五星3人随机局</f7-button>

<!-- 
      <p>
          调试入口:
          <f7-row>
            <f7-col>
               <f7-button fill color="gray" v-on:click=startMahjongAuto(2)>测试:2人对战</f7-button>
            </f7-col>
            <f7-col>
              <f7-button fill color="gray" v-on:click=startMahjongAuto(4)>测试:4人对战</f7-button>
            </f7-col>
          </f7-row>
      </p>
-->
      </f7-block>

     <f7-block-title>房间对战局</f7-block-title>
     <f7-block>
      <p style="padding-left:20px"> 
          每局结束不换人,随机坐庄,您可以创建一个房间,邀请亲朋好友过来娱乐,房主点击她人头像可踢出房间.<br/>
          积分规则:<br/>
          同上
      </p>


      <ul  class="gameRoom">
        <li class="deskRow" v-for="desk in desks" :key="desk.id" track-by="$index">
            <div class="mjdesk" >
                <div v-for="(p,index) in desk.players" class="chair">
                  <img v-if="hasID(p)" :src=getAvatar(p) :onerror="errorAvatar" :key="index" class="avatar" width=50px height=50px  v-on:click=kick(desk.id,index)>
                  </img>
                  <img v-else class="avatar" width=50px height=50px  src='/static/img/-1.jpg' :key="index"  v-on:click=sitDown(desk.id,index) >
                  </img> 
                  <p class="player">{{getName(p)}}</p>
                  <span v-if="index===desk.master">房主</span>
                </div>
                <!-- 
                <p class="deskno" style="color:red">{{desk.id}}</p>
                :disabled="!desk.ready"
                -->
                 <button class="btn-center" :disabled="!desk.ready"  v-on:click=startGame(desk)>{{desk.id}}<br>{{desk.ready?'开战':desk.desp}}</button>
                
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
        online:0,
        result:'',
      };
    },
  computed:{
    errorAvatar(){
      return  'this.src="' + require('../static/img/def.jpg') + '"'
    },
    errorImg() {
      return  'this.src="' + require('../static/img/def.jpg') + '"'
    },
  },
  created() {
      this.roomID=this.$f7route.params['rId']
  },
  destroyed() {
      this.leaveClub();
  },
  async mounted() {
          window.teaHouseMsg = this.onMessage; //这样设置后 外部js可直接调用vue的methods中的方法  https://blog.csdn.net/qq_26642611/article/details/103202970
          this.enterClub();
      
      /*
          this.desks=[{id:1001,desp:'底分:100 封顶:800 不买马',chairs:3,master:0,ready:false,players:[{name:'张三三',id:10001},{name:'李四四',id:10002},{name:'王五五',id:10003}]},
          {id:1002,chairs:3,ready:false,players:[{},{name:'赵一二三四五六七八九十',id:10004},{name:'孙七七',id:10005}]},
          {id:1003,chairs:2,players:[{name:'周八',id:10006},{}]},
          {id:1004,chairs:2,players:[{name:'吴九',id:10007},{}]},
          {id:1005,chairs:2,players:[{},{}]},
          {id:1006,chairs:4,players:[{},{},{},{}]},
          {id:1007,chairs:4,players:[{},{},{},{}]}
          ]
          */

          this.desks=[{id:1001,desp:'底分:100 封顶:800 不买马',chairs:3,ready:false,players:[{},{},{}]}]

    },
   methods:{
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
     onMessage(j){
        if("-listDesk"===j.cmd)
        {
          this.desks=j.desks
          this.online=j.online
        }else if("-bootGame"===j.cmd)
        {
          this.startMahjong(j)
        }else if("-blackList"===j.cmd)
        { //被踢出房间,暂时不能进入 现实提示
          this.showToastIcon(j.msg);
        }
     },
     enterClub(){
      let l={cmd:'enter',where:'teaHouse',clubID:this.roomID,p:this.g.getProfile(),url:this.g.club()}
      this.callNative(l);
     },
     leaveClub(){
      let l={cmd:'leave',where:'teaHouse',clubID:this.roomID}
      this.callNative(l);
     },
     sitDown(tid,cid){
      //alert('桌号:'+tid+"座号"+cid)
      let l={cmd:'sitDown',where:'teaHouse',t:tid,c:cid}
      this.callNative(l);
     },
     standUp(tid,cid){
      let l={cmd:'standUp',where:'teaHouse'}
      this.callNative(l);
     },
     kick(tid,cid){//踢人
      let l={cmd:'kick',where:'teaHouse',t:tid,c:cid}
      this.callNative(l);
     },
     startGame(d){
      let cmd={cmd:'start',where:'teaHouse',t:d.chairs}
      this.callNative(cmd);
     },
     startMahjong(j){
        let c=this.g.loadLogin()
        if(c){
            c.cmd='login'
            c.type=j.type
            c.tblNO=j.tblNO
            c.tracker=this.g.mj()
            c.profile=this.g.getProfile()
            this.startGameMJ(c)
        }else{
          //显示未登录
          this.showToastIcon('请先 注册/登录!')
        }
    },
     getPlayerName(n,desk){
        let retName=''
        if(desk.players.length>=n)
          retName=desk.players[n-1].name
        if(retName.length>5)
          retName=retName.substr(0,5)

        return retName;
     },
     hasID(p){
        if(p.id) 
          return true;
        else
          return false;     
     },
     getAvatar(p){
          return this.g.db()+'img/a/'+p.id+'.jpg'
     },
     getName(p){
        if(p.name)
        {
          if(p.name.length>5)
            return  p.name.substr(0,5)
          else
            return p.name
        }
        return ''
     },
     getPlayerAvatar(a){
        if(a.indexOf("http://")>0)
            return a
        else 
            return '/static/img/'+a;
     },
     getDeskDesp(d)
     {
       return d.id +'\r\n' + d.desp;
     },
     getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
     },
     refreshRoom(){//刷新房间
        const self = this;
        //self.$f7.preloader.show();
        let actions = {cmd:"listDesk",roomID:this.roomID};
        this.send_msg(JSON.stringify(actions));
     },
     startMahjongAuto(t){//自动匹配
        this.standUp()
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
            c.tracker=this.g.mj()
            c.profile=this.g.getProfile()
            this.startGameMJ(c)
          }
        }else{
          //显示未登录
          this.showToastIcon('请先 注册/登录!')
        }
    },
   }
  }
</script>

<style scoped>
.gameRoom{
  width: 100%;
  margin:0;
  padding:0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.deskRow{   
    flex: 1;
    width: 50%;
    min-width: 50%;
    max-width: 50%;
    height: 190px;
    list-style:none;
    padding-bottom:20px;
    }

.mjdesk{position:relative;width:160px;height:160px;ont-size:small;background-image:url(/static/img/table.png);background-size:contain;border:1px solid  #007799}
.avatar{border:solid 1px #fff;border-radius: 50px;overflow:hidden;}
.deskno{line-height:200px;text-align:center;color:red;}
.mjdesk p{margin:0;padding:0;color:green;font-size:.5rem}
.mjdesk img{margin:0;padding:0;}
.mjdesk div:nth-child(1){
    position:absolute;left:0;top:0;margin:0;width:30%;height:auto;text-align:left;
}
.mjdesk div:nth-child(2){
   position:absolute;right:0px;top:0;width:30%;height:auto;text-align:right;
}
.mjdesk div:nth-child(3){
   position:absolute;bottom:0;left:0;width:auto;height:30%;text-align:left;
}
.mjdesk div:nth-child(4){
    position:absolute;bottom:0px;right:0;width:auto;height:30%;text-align:right;
}
.chair {text-align:center}
.chair span{
    position:absolute;left:0;top:0;
    font-size:.1rem;
    color: #1f2d3d;
    background-color: #ffc107;
    display: inline-block;
    padding: .25em .4em;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;}
.player{background-color:white;color:green;width:fit-content;width:-webkit-fit-content;width:-moz-fit-content;}
.btn-center{
    #position:absolute;left:50%;top:0;
    position: absolute; left:0;top:0;right:0;bottom: 0;
    margin:auto;
    #margin-left:2px;
    #margin-right:2px;
    width:40%;height:50%;
    color:red;
    font-size: xx-small;
}
</style> 