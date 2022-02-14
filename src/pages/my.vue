<template>
<f7-page ptr name="myself" @ptr:refresh="loadLatest">
  <f7-block>
    <div class="banner">
      <div class="logo">
        <f7-link href="/profile/" class="logo_img" style="width:40%">
           <img :onerror="errorAvatar" class="img-responsive" style="border:solid 1px #fff;border-radius:50px;overflow:hidden;" width="64" height="64" :src="avatarUrl">
           <div style="color:white;line-height: 1;">
              <p>昵称:{{player.name}}</p>
              <p>编号:{{player.id}}</p>
           </div>
        </f7-link>
          <div class="logo_txt">
              <span class="yue">我的金币</span>
              <span class="amount timer count-title" id="count-number" data-to="300" data-speed="500" data-decimals="0">
                  <f7-link href="/coins/" color="white">{{player.coins}}</f7-link>
              </span>
          </div>
      </div>
      <div class="in">
          <div class="incomes" >
              <f7-link href="/scores/" color="white">积分:{{player.scores}} </f7-link>
          </div>
          <div class="students">
              <f7-link href="/beans/" color="white">金豆:{{player.beans}}</f7-link>
          </div>
      </div>
    </div>
 </f7-block>

    <!-- <f7-block-title>游戏战绩:</f7-block-title> -->
    <f7-block>
     <!--  
      <f7-row style="text-align:center;">
        <f7-col>胜:{{player.win}}</f7-col>
        <f7-col>平:{{player.draw}}</f7-col>
        <f7-col>负:{{player.lose}}</f7-col>
      </f7-row>
     -->

      <!--  
        <f7-toolbar labels bottom-md bg-color="gray" >
          <f7-link tab-link con-ios="f7:email_fill"  icon-md="material:payment"           text="充值"></f7-link>
          <f7-link tab-link icon-ios="f7:today_fill" icon-md="material:account_balance"   text="筹码"></f7-link>
          <f7-link tab-link icon-ios="f7:cloud_fill" icon-md="material:attach_money"      text="提现"></f7-link>
        </f7-toolbar>
      -->
     </f7-block>

    <f7-list>
      <f7-list-item title="语音账单"    link="/money_talks/"></f7-list-item>
      <f7-list-item title="视频选聊"    link="/video_select/"></f7-list-item>
      <f7-list-item title="设置"    link="/debug/"></f7-list-item>
      <f7-list-item title="关于"       link="/about/"></f7-list-item> 

      <!-- 
      <f7-list-item title="即时消息"    link="/message/"></f7-list-item>
      <f7-list-item title="刷新战绩"    @click="refreshData(1)"></f7-list-item>
      <f7-list-item title="个人资料"    link="/profile/"></f7-list-item>
      <f7-list-item title="积分商城"    link="#"></f7-list-item>
      <f7-list-item title="我的茶馆"    link="#"></f7-list-item>
      <f7-list-item title="抵押积分"    link="/deposit/"></f7-list-item>
      <f7-list-item title="积分赎回"    link="/#/"></f7-list-item> 
      <f7-list-item title="手机注册"    link="/register/"></f7-list-item>
      <f7-list-item title="好友聊天"    link="/message/"></f7-list-item>
         -->
    </f7-list>

</f7-page>
</template>

<script>
export default {
  data () {
    return {
      player:{id:0,name:'',sex:0,avatar:'',coins:0,beans:0,scores:0,win:0,draw:0,lose:0},
      //defaultImg: 'this.src="' + require('../assets/img/logo.png') + '"',
    }
  },
  mounted (){
     this.refreshData(0)
  },
  computed:{
    avatarUrl() {
      return this.g.db()+'img/a/'+this.player.id+'.jpg?r='+Math.round(Math.random()*100);
    },
    errorAvatar(){
       if(this.player.sex===0)
          return  'this.src="' + require('../assets/img/sex0.jpg') + '"'
       else
          return  'this.src="' + require('../assets/img/sex1.jpg') + '"'
    }
  },
  methods:{
     testNav () {
      let cmd = {action:1002,tblNO:0,playerNUM:3,serverURL:'ws://sign.bdzww.cn/mj',setting:{type:1,desp:'区块链'},open:true}
      this.startGameMJ(cmd)

      /*this.$http.post('', this.account)
        .then((response) => {
        })*/
    },
    loadLatest(done) {
        const self=this
        setTimeout(() => {

          self.refreshData(0)

          done();
        }, 1000);
    },
    refreshData (b) {
          const self=this
          if(b)
            self.$f7.preloader.show();
          this.$http.get('api/users/myself')
          .then((res) => {
            setTimeout(() => {
              self.$f7.preloader.hide();
            }, 500);

            self.player=res.data

            let p= self.g.getProfile()
            if(p.name!==self.player.name){
                p.name=self.player.name
                p.avatar=self.player.avatar
                self.g.setProfile(p)
            }
   
          }).catch( e => {
            self.$f7.preloader.hide();
            //self.result=e.response.data
          })
    },

   }
}
</script>

<style scoped>
.logo p{
  margin:0px;
  margin-top: 5px;
}
.banner {
  width: 100%;
  background-color: white;
  padding: 0px;
}
.banner .logo {
  /*background-color: #ed8e07; red #fd595c */
  background-color:#53c6fc;
  border-radius: 10px;
  width: 100%;
  height: 120px;
  box-shadow: 0 .0rem .8rem rgba(0,0,0,.3);
}
.banner .logo .logo_img {
  margin-top: 0px;
  width: 58.666663px;
  height: 58.666663px;
  padding-left:5px;
  padding-top:5px;
  display: inline-block;
}
.banner .logo .logo_txt {
  margin-top: 7px;
  float: right;
  text-align: right;
  padding-right:5px;
}
.banner .logo .logo_txt .yue {
  color: #ffffff;
  font-size: 15px;
  overflow:hide;
}
.banner .logo .logo_txt .amount {
  display: block;
  margin-top: -6px;
  color: #ffffff;
  font-size: 40px;
}
.banner .in {
  width: 100%;
  height: 37.333331px;
  margin-top: 11.7333326px;
}
.banner .in .incomes {
  display: inline-block;
  width: 44%;
  height: 37.333331px;
  border-radius: 8px;
  text-align: center;
  line-height: 37.333331px;
  color: #ffffff;
  font-size: 12.7999992px;
  /*background-color: #ed8e07; red #fd595c */
  background-color:#53c6fc;
}
.banner .in .students {
  float: right;
  width: 44%;
  height: 37.333331px;
  border-radius: 8px;
  text-align: center;
  line-height: 37.333331px;
  color: #ffffff;
  font-size: 12.7999992px;
  /*background-color: #ed8e07 ; red #fd595c */
  background-color:#53c6fc;
}
.user-tab {
  background: #efeff4;
  height: 3rem;
  position: relative;
}
.user-tab .tab-item {
  height: 3rem;
  background-color: white;
}
.user-tab:before {
  background-color: white;
}
.user-list {
  margin: .7rem 0;
  height: 2.9rem;
}
.user-list ul {
  height: 2.9rem;
  /*box-shadow: 0 .01rem 0 .03rem rgba(0,0,0,.3);*/
}
.user-list li a {
  height: 2.9rem;
}
.user-list li {
  margin-top: .7rem;
  height: inherit;
}
</style>
