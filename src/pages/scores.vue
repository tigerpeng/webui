<template>
  <f7-page :page-content="false">
    <f7-navbar title="积分账户" back-link="Back">
    </f7-navbar>


      <f7-toolbar top id="scores">
        <f7-link tab-link="#tab-3"  tab-link-active>积分流水</f7-link>
        <f7-link tab-link="#tab-2">下分</f7-link>
        <f7-link tab-link="#tab-1">上分</f7-link>
        <f7-link tab-link="#tab-4">积分转账</f7-link>
      </f7-toolbar>

    <f7-tabs>
      <f7-tab id="tab-1" class="page-content" >
        <f7-block>
        <p>可用积分:{{familyScore.balanceFamily}}</p>
              <f7-list no-hairlines-md>    
                  <f7-list-input
                    label="对方账号:"
                    type="tel"
                    placeholder="用户编号或手机号码"
                    :value="modelUp.to"
                    @input="modelUp.to = $event.target.value"
                  ></f7-list-input>

                  <f7-list-input
                    label="数量:"
                    type="tel"
                    placeholder=""
                    :value="modelUp.amount"
                    @input="modelUp.amount= $event.target.value"
                  ></f7-list-input>

                  <f7-list-input
                    label="备注:"
                    type="tel"
                    placeholder=""
                    :value="modelUp.remarks"
                    @input="modelUp.remarks = $event.target.value"
                  ></f7-list-input>
                </f7-list>
                
              <f7-button round fill v-on:click=score_up>上分</f7-button>


              <f7-block-title>成员列表</f7-block-title>
              <f7-list  media-list >
                  <f7-list-item
                    v-for="(item, index) in members"
                    :key="index"
                    :title="item.name+'('+item.id+')'"
                    :after="'积分:'+item.score"
                    :subtitle="'电话:'+item.phone"
                    @click="select_member(item)">
                    <img slot="media" width="44" :src="getAvatar(item)" :onerror="getDefault(item)" />
                  </f7-list-item>
              </f7-list>

        </f7-block>
      </f7-tab>
      <f7-tab id="tab-2" class="page-content">
        <f7-block>
         <p>可用积分:{{familyScore.balanceUser}}</p>
              <f7-list no-hairlines-md> 
                  <f7-list-input
                    label="数量:"
                    type="tel"
                    placeholder=""
                    :value="modeDown.amount"
                    @input="modeDown.amount= $event.target.value"
                  ></f7-list-input>

                  <f7-list-input
                    label="备注:"
                    type="tel"
                    placeholder=""
                    :value="modeDown.remarks"
                    @input="modeDown.remarks = $event.target.value"
                  ></f7-list-input>
                </f7-list>
                
              <f7-button round fill v-on:click=score_down>下分</f7-button>
        </f7-block>

              <f7-block>
                  <f7-row no-gap>
                    <f7-col width="30">时间</f7-col>
                    <f7-col width="20">开支</f7-col>
                    <f7-col width="20">余额</f7-col>
                    <f7-col width="30">摘要</f7-col>
                  </f7-row>
                  <f7-row no-gap v-for="(it, index) in items_down" class="raw_top">
                    <f7-col width="30">{{it.time}}</f7-col>
                    <f7-col width="20">{{it.amount}}</f7-col>
                    <f7-col width="20">{{it.balance}}</f7-col>
                    <f7-col width="30">{{it.remarks}}</f7-col>
                  </f7-row>
              </f7-block>

      </f7-tab>

      <f7-tab id="tab-3" class="page-content" tab-active>
              <f7-block>
                  <f7-row no-gap>
                    <f7-col width="30">时间</f7-col>
                    <f7-col width="20">开支</f7-col>
                    <f7-col width="20">余额</f7-col>
                    <f7-col width="30">摘要</f7-col>
                  </f7-row>
                  <f7-row no-gap v-for="(it, index) in items" class="raw_top">
                    <f7-col width="30">{{it.time}}</f7-col>
                    <f7-col width="20">{{it.amount}}</f7-col>
                    <f7-col width="20">{{it.balance}}</f7-col>
                    <f7-col width="30">{{it.remarks}}</f7-col>
                  </f7-row>
              </f7-block>
      </f7-tab>

      <f7-tab id="tab-4" class="page-content">
              <f7-block>
              <f7-list no-hairlines-md>    
                  <f7-list-input
                    label="对方账号:"
                    type="tel"
                    placeholder="用户编号或手机号码"
                    :value="model.to"
                    @input="model.to = $event.target.value"
                  ></f7-list-input>

                  <f7-list-input
                    label="数量:"
                    type="tel"
                    placeholder=""
                    :value="model.amount"
                    @input="model.amount= $event.target.value"
                  ></f7-list-input>

                  <f7-list-input
                    label="备注:"
                    type="tel"
                    placeholder=""
                    :value="model.remarks"
                    @input="model.remarks = $event.target.value"
                  ></f7-list-input>
                </f7-list>
                
              <f7-button round fill v-on:click=transfer>转账</f7-button>
            </f7-block>

            <f7-block-title>成员列表</f7-block-title>
              <f7-list  media-list >
                  <f7-list-item
                    v-for="(item, index) in members"
                    :key="index"
                    :title="item.name+'('+item.id+')'"
                    :after="'积分:'+item.score"
                    :subtitle="'电话:'+item.phone"
                    @click="select_member_transfer(item)">
                    <img slot="media" width="44" :src="getAvatar(item)" :onerror="getDefault(item)" />
                  </f7-list-item>
              </f7-list>
      </f7-tab>
    </f7-tabs>

  </f7-page>
</template>
<script>
  export default {
    data() {
      return {
        isBottom: false,
        familyScore:{balanceFamily:0,balanceUser:0},
        modelUp:{to:null,amount:null,type:3,remarks:''},
        modeDown:{to:0,amount:null,type:3,remarks:''},
        members:[],
        model:{to:null,amount:null,type:3,remarks:''},
        items:[],
        items_down:[]
      };
    },
    mounted (){
          /*
             var $$=window.$f7.$
             $$('#penghong > .toolbar-inner > span').remove()
             alert($$('#penghong > .toolbar-inner').html())
              $$('#penghong> .toolbar-inner').on('click', function (e) {
                  $$('#penghong > .toolbar-inner > span').remove()
              })
          */

          const self=this

          this.$http.get('/api/family/scoreinfo')
          .then((res) => {
            self.familyScore=res.data
          }).catch( e => {

          })

          this.$http.get('/api/family/membersinfo')
          .then((res) => {
            self.members=res.data
          }).catch( e => {

          })


          this.$http.get('/api/users/BanlanceScore')
          .then((res) => {
            self.items=res.data
          }).catch( e => {
            self.items=null
          })
       
    },
     methods : {
        select_member(m){
            this.modelUp.to=m.id
        },
        select_member_transfer(m){
            this.model.to=m.id
        },
        score_up(){
           const self=this
           self.$http.put('/api/family/scoreup',self.modelUp)
              .then((res) => {
                  if(res.data!=null)
                    self.familyScore=res.data
              }).catch( e => {
                  self.$f7.dialog.alert(e.response.data);
              })

             self.modelUp.to=null;
             self.modelUp.amount=null;
        },
        score_down(){
          const self=this
           self.$http.put('/api/family/scoredown',self.modeDown)
              .then((res) => {
                  if(res.data!=null)
                    self.familyScore=res.data
              }).catch( e => {
                  //this.$f7.dialog.alert(e.response.data);
              })

              self.modeDown.amount=null
        },
        transfer() {
            const self=this
            let m=this.model
            this.model={to:null,amount:null,type:1,remarks:''}
            let content='确定给用户【' + m.to + '】 转账' + m.amount + '积分吗？';
            this.$f7.dialog.confirm(content, function () {
                  self.$http.put('/api/family/transfer',m)
                  .then((res) => {
                      self.$f7.dialog.alert('转账成功!');
                  }).catch( e => {
                      if (e.response && e.response.data)
                        self.$f7.dialog.alert('转账失败!  ' + e.response.data);
                      else
                        self.$f7.dialog.alert('转账失败! 网络或服务器内部错误(没有应答)');                     
                  })
            });

            this.model.to=null
            this.model.amount=null
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
     },
}
</script>
<style>
#scores .tab-link-active{
  color:green;
}
</style>