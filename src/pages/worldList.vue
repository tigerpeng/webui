<template>
  <f7-page>
    <f7-navbar title="虚拟世界">
    <!-- 
        <f7-nav-right>
          <f7-link icon-ios="f7:plus" icon-md="f7:plus" href='/family-add/'></f7-link>
          <f7-link icon-ios="f7:book" icon-md="f7:house_alt_fill" href='/family-create/'></f7-link>
        </f7-nav-right>
        -->
    </f7-navbar>
<!-- 
    <audio autoplay loop>
      <source src="/static/audio/rooms.ogg" type="audio/ogg">
    </audio>

    :style="{background:'url(' + myFamily.picture + ')',backgroundSize :'100% 100%',}">{{myFamily.name}}</f7-card-header>
-->
<!-- 
    <f7-block-title v-if="myFamily.id>0">我的应用</f7-block-title>
    <f7-block v-if="myFamily.id>0">
      <f7-card class="demo-card-header-pic" :key="myFamily.id" track-by="$index">
        <f7-card-header
          class="no-border"
          valign="bottom"
          :style="{background:'url(' + myFamily.picture + ')',backgroundSize :'100% 100%',}">{{myFamily.name}}</f7-card-header>
        <f7-card-content>
          <p>{{myFamily.desp}}</p>
        </f7-card-content>
        <f7-card-footer>
          <f7-link>喜欢</f7-link>
          <f7-link  @click="enterFamily(myFamily)">进入</f7-link>
        </f7-card-footer>
      </f7-card>
    </f7-block>
    <f7-block v-else>
        您尚未添加私有应用.
    </f7-block>
-->

    <f7-block-title>开放的世界</f7-block-title>
    <f7-card class="demo-card-header-pic"  v-for="r in rooms" :key="r.id" track-by="$index">
      <f7-card-header
        class="no-border"
        valign="bottom"
        :style="{background:'url(' + 'http://img.ournet.club:2021/w/'+r.id+'.jpg' + ')',backgroundSize :'100% 100%',}">{{r.name}}</f7-card-header>
      <f7-card-content>
        <p class="date">创建日期:{{r.createTime}}</p>
        <p>{{r.desp}}</p>
      </f7-card-content>
      <f7-card-footer>
        <f7-link>喜欢</f7-link>

        <f7-link v-if="r.id>100" :href="r.path">进入</f7-link>

        <f7-link v-else @click="enterMeta(r)">进入</f7-link>
      </f7-card-footer>
    </f7-card>

    
  </f7-page>
</template>
<script>
  export default {
    data() {
      return {
        isBottom: true,
        gAcc:'',
        myAcc:'',
        myFamily:{id:0,name:'',createTime:'',desp:''},
        rooms:[]
      };
    },
    mounted (){
          //return ;
          const self=this

          this.$http.get('/api/world/')
          .then((res) => {
              if(res.data!=null)
                self.rooms=res.data
          }).catch( e => {
              this.$f7.dialog.alert(e.response.data);
          })
   },
   methods:{
     startMahjong(t){
      let cmd = {action:1002,tblNO:0,playerNUM:t,serverURL:'ws://192.168.20.133:9000/mj',setting:{type:1,desp:'区块链'},open:true}
          cmd.profile={name:'微风吹过',sex:1,avatar:'http://images.test.com/123.png',token:'0x2019-3-8|abcdefg',phone:'1352***2883'}
      this.startGameMJ(cmd)
    },
     enterMeta(r){
        let c=this.g.loadLogin()
        if(c){
          c.cmd='login'
          
          c.roomID    =r.id                     //房间id
          c.gameServer=r.gameServer             //
          c.avServerID=r.avServer               //语音服务器
          c.db=this.g.db()
          c.tracker=this.g.tracker()
          c.token=this.g.getToken()

          this.startGame('91_MetaBreeze',c)     //最后一个参数表示屏幕
        }
        return ;

             const self = this;
             const app  = self.$f7;
             const router = self.$f7router;
             app.dialog.alert(`进入元宇宙!`,`进入世界` ,() => {

              });
     },
   }
  }
</script>

<style scoped>
.card-header {
    display: block;
}
.demo-card-header-pic .card-header {
  height:40vw;
  background-size:cover;
  background-position:center;
  color:white;
  font-weight:500;
}
.date {
  color:Gainsboro;
}
.facebook-card .card-header {
  display:block;padding:10px;
  padding-bottom:30px;
}
.facebook-card .facebook-avatar {
  float:left;
}
.facebook-card .facebook-name {
  margin-left:44px;
  font-size:14px;
  font-weight:500;
}
.facebook-card .facebook-date {
  margin-left:44px;
  font-size:13px;
  color:#8e8e93;
}
.facebook-card .card-footer {
  background:#fafafa;
}
.facebook-card .card-footer a {
  color:#81848b;
  font-weight:500;
}
.facebook-card .card-content img {
  display:block;
}
.facebook-card .card-content-inner {
  padding:15px 10px;
}
</style>