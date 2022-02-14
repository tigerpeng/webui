<template>
  <f7-page>
    <f7-navbar title="互动应用">
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



    <f7-block-title>开放的应用</f7-block-title>
    <f7-card class="demo-card-header-pic"  v-for="r in rooms" :key="r.id" track-by="$index">
      <f7-card-header
        class="no-border"
        valign="bottom"
        :style="{background:'url(' + r.picture + ')',backgroundSize :'100% 100%',}">{{r.name}}</f7-card-header>
      <f7-card-content>
        <p class="date">{{r.createTime}}</p>
        <p>{{r.desp}}</p>
      </f7-card-content>
      <f7-card-footer>
        <f7-link>喜欢</f7-link>
        <f7-link  :href="r.id>100?'/dynamic-tables/boss/'+r.id +'/name/'+r.name+'/' :'#' ">进入</f7-link>
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
        rooms:[{id:111,name:'卡五星',picture:'/static/img/r/1.jpg',createTime:'2020-05-01',desks:10,online:7,desp:'麻将游戏,支持2人,3人4人等多人对战,玩法.'}
                ,{id:99,name:'情歌对唱',picture:'/static/img/r/2.jpg',createTime:'2019-03-08',desp:'情歌对唱,相亲游戏...'}]
      };
    },
    mounted (){
          const self=this
          this.$http.get('/api/family/')
          .then((res) => {
              //self.rooms=res.data.other
              if(res.data.my!=null)
                self.myFamily=res.data.my
          }).catch( e => {
              //this.$f7.dialog.alert(e.response.data);
          })
   },
   methods:{
     startMahjong(t){
      let cmd = {action:1002,tblNO:0,playerNUM:t,serverURL:'ws://192.168.20.133:9000/mj',setting:{type:1,desp:'区块链'},open:true}
          cmd.profile={name:'微风吹过',sex:1,avatar:'http://images.test.com/123.png',token:'0x2019-3-8|abcdefg',phone:'1352***2883'}
      this.startGameMJ(cmd)
    },
     enterFamily(f){
          let path='/dynamic-tables/boss/'+f.id +'/name/'+f.name+'/'
          let r=this.$f7.views.current.router
          r.navigate(path)
          return ;

         const self = this;
         const app  = self.$f7;
         const router = self.$f7router;
         app.dialog.alert(`您不是该会所的顾客，请联系创建者 批准!`,`进入会所` ,() => {

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