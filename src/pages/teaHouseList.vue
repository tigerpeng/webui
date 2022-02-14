<template>
<f7-page name="familyAdd">
  <f7-navbar title="茶馆列表" back-link="Back">
      <f7-subnavbar :inner="false">
          <f7-searchbar
                search-container=".search-list"
                search-in=".item-title"
                :disable-button="!$theme.aurora"
              >
          </f7-searchbar>
      </f7-subnavbar>

       <f7-nav-right>
          <f7-link icon-ios="f7:plus" icon-md="f7:plus" href='/family-add/'></f7-link>
          <f7-link icon-ios="f7:book" icon-md="f7:house_alt_fill" href='/teahouse-create/'></f7-link>
       </f7-nav-right>
  </f7-navbar>


    <f7-block-title v-if="myFamily.id>0">我的茶馆</f7-block-title>
    <f7-block v-if="myFamily.id>0">
      <f7-card class="demo-card-header-pic" :key="myFamily.id" track-by="$index">
        <f7-card-header
          class="no-border"
          valign="bottom"
          :style="{background:'url(' + getFailyPicture(myFamily) + ')',backgroundSize :'100% 100%',}">{{myFamily.name}}</f7-card-header>
        <f7-card-content>
          <p>{{myFamily.desp}}</p>
        </f7-card-content>
        <f7-card-footer>
          <f7-link @click="leaveFamily()">退出</f7-link>
          <f7-link  @click="enterFamily(myFamily)">进入</f7-link>
        </f7-card-footer>
      </f7-card>
    </f7-block>
    <f7-block v-else>
        您尚未加入任何茶馆.
    </f7-block>


  <f7-list class="searchbar-not-found">
    <f7-list-item title="没有找到茶馆">
    </f7-list-item>
  </f7-list>
  <f7-list class="search-list searchbar-found" media-list >

      <f7-list-item
        v-for="(item, index) in familys"
        :key="index"
        :title="getTitle(item)"
        @click="joinFamily(item)">
        <img slot="media" width="44" src="https://cdn.framework7.io/placeholder/fashion-88x88-1.jpg" />
      </f7-list-item>

<!-- 
    <f7-list-item 
          title="刘园子家茶馆(6022)" 
          subtitle="Beatles" 
          href="/dynamic-tables/boss/111/name/刘园子家茶馆/"
          > 
          <img slot="media" width="44" src="https://cdn.framework7.io/placeholder/fashion-88x88-1.jpg" />
    </f7-list-item>

    <f7-list-item 
          title="优优家茶馆(2883)" 
          subtitle="Beatles"> 
          <img slot="media" width="44" src="https://cdn.framework7.io/placeholder/fashion-88x88-1.jpg" />
    </f7-list-item>
    -->
  </f7-list>


</f7-page>
</template>

<script>
  import { theme } from 'framework7-vue';

  export default {
    data() {
      return {
         myFamily:{id:0,name:'',createTime:'',desp:''},
         forceLeave:0,
         familys: [],
      }
    },
    computed:{

    },
    created() {
          //this.familys.push({name:'Acura',id:11111});
          const self=this
          this.$http.get('/api/family/')
          .then((res) => {
              //self.rooms=res.data.other
              if(res.data.my!=null)
                self.myFamily=res.data.my
          }).catch( e => {
              //this.$f7.dialog.alert(e.response.data);
          })

          this.$http.get('api/family/all')
          .then((res) => {
              self.familys=res.data
              //self.familys.push(res.data)
          }).catch( e => {
              //this.$f7.dialog.alert(e.response.data);
          })
    },
    methods: {
      startMahjongAuto(t){//自动匹配
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
      getTitle(i){
          return i.name+'('+i.id+')'
      },
      enterFamily(f){
          let path='/dynamic-tables/boss/'+f.id +'/name/'+f.name+'/'
          let r=this.$f7.views.current.router
          r.navigate(path)
     },
     getFailyPicture(f){
      return this.g.db()+f.picture;
     },
     leaveFamily(){
        //永久解除茶馆关联
        const self=this
          this.$http.delete('/api/family/'+this.forceLeave)
          .then((res) => {
            self.myFamily.id=0;
          }).catch( e => {
              if(e.response.data.indexOf('积分')>0)
              {
                  self.$f7.dialog.confirm(e.response.data, function () {
                      self.forceLeave=1
                      self.leaveFamily();
                  });
              }
          })

     },
     joinFamily(f){
        const self=this
        if(this.myFamily.id==f.id)
        {
          self.$f7.dialog.alert('您已经是该茶馆成员,无需再次加入!');
          return ;
        }else
        {
          self.$http.put('api/family/join/'+f.id)
          .then((res) => {
              self.$http.get('/api/family/')
              .then((res) => {
                  //self.rooms=res.data.other
                  if(res.data.my!=null)
                    self.myFamily=res.data.my
              }).catch( e => {
                  self.$f7.dialog.alert(e.response.data);
              })

          }).catch( e => {
              self.$f7.dialog.alert(e.response.data);
          })

          return ;
        }


         let content='确定要加入茶馆:' + this.getTitle(f)+'吗?'

         this.$f7.dialog.confirm(content, function () {
            self.$f7.dialog.alert('加入成功!');
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