<template>
  <f7-page name="coins">
    <f7-navbar title="金币账户" back-link="Back"></f7-navbar>

      <f7-toolbar top id="my_coins">
        <f7-link tab-link="#tab-1" tab-link-active>金币流水</f7-link>
        <f7-link tab-link="#tab-2">金币转账</f7-link>

        <f7-link tab-link="#tab-4">在途金币</f7-link>
        <f7-link tab-link="#tab-3">转出金币</f7-link>

      </f7-toolbar>
      <f7-tabs animated>
        <f7-tab id="tab-1" class="page-content_new" tab-active>
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
        <f7-tab id="tab-2" >
            <f7-block>
              <!--
              <f7-checkbox :checked="delay_coins" @change="delay_coins = $event.target.checked" >延迟到账</f7-checkbox>
              -->
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
        </f7-tab>
        <f7-tab id="tab-3" class="page-content_new">
              <f7-block>
                  <f7-row no-gap>
                    <f7-col width="25">对方</f7-col>
                    <f7-col width="30">状态</f7-col>
                    <f7-col width="25">转账时间</f7-col>
                    <f7-col width="15">操作</f7-col>
                  </f7-row>
                  <f7-row no-gap v-for="(it, index) in query_agent.data" class="raw_top">
                    <f7-col width="25">{{it.peer}}</f7-col>
                    <f7-col width="30">{{it.status}}</f7-col>
                    <f7-col width="25">{{it.time}}</f7-col>
                    <f7-col width="15">
                        <div >
                            <button class="btn_op" v-on:click="confirm(it.id,-2)">撤回</button>
                            <p>
                            <button class="btn_op" v-on:click="confirm(it.id,2)">确认</button>
                            </p>
                        </div>
                    </f7-col>
                  </f7-row>
              </f7-block>
        </f7-tab >


        <f7-tab id="tab-4" >
            <f7-block>
                  <f7-row no-gap>
                    <f7-col width="25">对方</f7-col>
                    <f7-col width="30">状态</f7-col>
                    <f7-col width="25">转账时间</f7-col>
                    <f7-col width="15">操作</f7-col>
                  </f7-row>
                  <f7-row no-gap v-for="(it, index) in querydata.data" class="raw_top">
                    <f7-col width="25">{{it.peer}}</f7-col>
                    <f7-col width="30">{{it.status}}</f7-col>
                    <f7-col width="25">{{it.time}}</f7-col>
                    <f7-col width="15" >
                            <button class="btn_op" v-on:click="confirm(it.id,3)" v-if="it.action">申述</button>
                    </f7-col>
                  </f7-row>
              </f7-block>
        </f7-tab>
        
 
      </f7-tabs>

  </f7-page>
</template>

<script>
export default {
    components: {//see https://github.com/kevinqqnj/f7-table
        "f7-table": require('../components/f7-table.vue').default,
    },
    data() {
      return {
        model:{to:null,amount:null,type:1,remarks:''},
        fields: [
                  {
                        name: 'peer',
                        title: '对方',
                        titleClass: 'label-cell',
                        dataClass: 'numeric-cell',
                        //sortTable: 'Ob',
                    },
                    {
                        name: 'status',
                        title: '状态',
                        titleClass: 'label-cell action-cell',
                    },
                    {
                        name: 'time',
                        title: '转账时间',
                        titleClass: 'label-cell',
                        //sortTable: 'Ob',
                    },
                    {
                        name: 'action',
                        title: '操作',
                        titleClass: 'action-cell',
                        dataClass: 'action-cell',
                    },
                ],
        querydata:{
                  current_page: 1, 
                  data: [], 
                  from: 1, 
                  last_page: 1, 
                  per_page: 10, 
                  to: 10, 
                  total: 1
        },
        query_agent:{
                  current_page: 1, 
                  data: [], 
                  from: 1, 
                  last_page: 1, 
                  per_page: 10, 
                  to: 10, 
                  total: 1
        },
        items: [],
        delay_coins:true,
      };
    },
    computed:{
      activeFeilds: function () {
          return this.fields.filter(function (field) {
            return field.name!='action'
          })
        }
    },
    mounted (){
          const self=this
          this.$http.get('/api/users/BanlanceCoin')
          .then((res) => {
            self.items=res.data
          }).catch( e => {
            self.items=null
          })

          this.getCoinsDelay()
    },
    methods:{
        transfer() {
            const self=this
            let m=this.model
            this.model={to:null,amount:null,type:1,remarks:''}
            let content='确定给用户【' + m.to + '】 转账' + m.amount + '枚金币吗？';
            this.$f7.dialog.confirm(content, function () {
                  self.$http.put('/api/users/transfer',m)
                  .then((res) => {
                      self.$f7.dialog.alert('转账成功!');
                  }).catch( e => {
                      if (e.response && e.response.data)
                        self.$f7.dialog.alert('转账失败!  ' + e.response.data);
                      else
                        self.$f7.dialog.alert('转账失败! 网络或服务器内部错误(没有应答)');                     
                  })
            });
        },
        getCoinsDelay(){
          const self=this
          this.$http.get('/api/users/coinsdelay')
          .then((res) => {
            self.querydata.data=res.data.user
            //self.querydata.total=res.data.user.length

            self.query_agent.data=res.data.agent
            self.query_agent.total=res.data.agent.length
          }).catch( e => {
            //self.items=null
          })
       },
       confirm(rid,ac){
            const self=this
            self.$http.put('/api/users/TransferDelay',{recordId:rid,action:ac})
                  .then((res) => {
                      self.getCoinsDelay()
                  }).catch( e => {
                      if (e.response && e.response.data)
                        self.$f7.dialog.alert('操作失败!  ' + e.response.data);
                      else
                        self.$f7.dialog.alert('操作失败! 网络或服务器内部错误(没有应答)');                     
                  })
      },
   }
}
</script>
<style>
.card-header{
  display:none;
}
.btn_op{
  width:50px;
}
.page-content_new {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
    height: 100%;
    position: relative;
    z-index: 1;
    /*
    padding-top: calc(var(--f7-page-navbar-offset,0px) + var(--f7-page-toolbar-top-offset,0px) + var(--f7-page-subnavbar-offset,0px) + var(--f7-page-searchbar-offset,0px) + var(--f7-page-content-extra-padding-top,0px));
    padding-bottom: calc(var(--f7-page-toolbar-bottom-offset,0px) + var(--f7-safe-area-bottom) + var(--f7-page-content-extra-padding-bottom,0px));
    */
}
.raw_top{
  padding-top:10px;
  border-top: 1px solid gray;
}
#my_coins .tab-link-active{
  color:green;
}
</style>