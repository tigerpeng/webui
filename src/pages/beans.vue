<template>
  <f7-page name="beans" >
    <f7-navbar title="金豆账户" back-link="Back"></f7-navbar>

     <f7-toolbar top id="beans">
        <f7-link tab-link="#tab-1" tab-link-active>金豆收益</f7-link>
        <f7-link tab-link="#tab-2">金豆提现</f7-link>
        <f7-link tab-link="#tab-3">金豆转换</f7-link>
        <f7-link tab-link="#tab-4">金豆转账</f7-link>
      </f7-toolbar>
    <f7-tabs >
      <f7-tab id="tab-1" tab-active >
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

        <f7-block-title>将您的金豆转换成现金</f7-block-title>
        <f7-block>
        <f7-list no-hairlines-md>
          <f7-list-input
            label="金豆"
            type="text"
            placeholder="输入您想要提现的金币数量"
            clear-button
            :value="model.beans" @input="model.beans = $event.target.value">
          </f7-list-input>

          <f7-list-input
            label="入账账号"
            type="text"
            placeholder="输入微信/支付宝/银行账号(数字) "
            clear-button
            @change="onAccountChange"
            :value="model.bandkAccount" @input="model.bandkAccount = $event.target.value">
          </f7-list-input>

          <p   v-if="showExten">
            <f7-list-input
              label="银行户名"
              type="text"
              placeholder="银行开户名 微信 支付宝账户无需输入"
              clear-button
              :value="model.bankUserName" @input="model.bankUserName = $event.target.value">
            </f7-list-input>
            <f7-list-input
              label="银行名称"
              type="text"
              placeholder="银行名称 微信 支付宝账户无需输入"
              clear-button
              :value="model.bankName" @input="model.bankName = $event.target.value">
            </f7-list-input>
            <f7-list-input
              label="开户行地址"
              type="text"
              placeholder="银行分行地址  微信 支付宝账户无需输入"
              clear-button
              :value="model.bankAddress" @input="model.bankAddress = $event.target.value">
            </f7-list-input>
          </p>

          <f7-button fill @click=withdraw() >提现</f7-button>
        </f7-list>

        </f7-block>

      </f7-tab>
      <f7-tab id="tab-3" >
        <f7-block-title>将您的金豆转换成金币</f7-block-title>
        <f7-block>
              <f7-list no-hairlines-md>    
                  <f7-list-input
                    label="数量:"
                    type="tel"
                    placeholder="1元=100币"
                    :value="modelb.amount"
                    @input="modelb.amount= $event.target.value"
                  ></f7-list-input>

                  <f7-list-input
                    label="对方账号:"
                    type="tel"
                    placeholder="用户编号或手机号码"
                    :value="modelb.to"
                    @input="modelb.to = $event.target.value"
                  ></f7-list-input>



                  <f7-list-input
                    label="备注:"
                    type="tel"
                    placeholder=""
                    :value="modelb.remarks"
                    @input="modelb.remarks = $event.target.value"
                  ></f7-list-input>
                </f7-list>
                
              <f7-button round fill v-on:click=transfer>金豆转换金币</f7-button>

        </f7-block>
      </f7-tab>
      <!--
      <f7-tab id="tab-4" class="page-content">
        上下剧中显示
      -->
       <f7-tab id="tab-4" >
          <f7-block-title>将您的金豆转给他人(满10000)</f7-block-title>
          <f7-block>
              <f7-list no-hairlines-md>    
                  <f7-list-input
                    label="对方账号:"
                    type="tel"
                    placeholder="用户编号或手机号码"
                    :value="modelbean.to"
                    @input="modelbean.to = $event.target.value"
                  ></f7-list-input>

                  <f7-list-input
                    label="数量:"
                    type="tel"
                    placeholder=""
                    :value="modelbean.amount"
                    @input="modelbean.amount= $event.target.value"
                  ></f7-list-input>

                  <f7-list-input
                    label="备注:"
                    type="tel"
                    placeholder=""
                    :value="modelbean.remarks"
                    @input="modelbean.remarks = $event.target.value"
                  ></f7-list-input>
                </f7-list>
              <f7-button round fill v-on:click=transferBean>金豆转转账</f7-button>
            </f7-block>
      </f7-tab>
    </f7-tabs>


  </f7-page>
</template>

<script>
  export default {
    data() {
      return {
        showExten:false,
        model:{beans:0,bandkAccount:'',bankUserName:'',bankName:'',bankAddress:''},
        modelb:{to:null,amount:null,type:2,remarks:''},
        modelbean:{to:null,amount:null,type:2,remarks:''},
        items: []
      };
    },
    mounted (){
        var $$=window.$f7.$
        $$('#beans> .toolbar-inner').on('click', function (e) {
            $$('#beans > .toolbar-inner > span').remove()
        })

          const self=this
          this.$http.get('/api/users/BanlanceBean')
          .then((res) => {
            self.items=res.data
          }).catch( e => {
            self.items=null
          })

    },
    methods: {
      onAccountChange(){
        let bankNo=this.model.bandkAccount
        var num = /^\d*$/
        if (bankNo.length < 16 || bankNo.length > 19 || !num.test(bankNo)) {
          this.showExten=false;
        }else
          this.showExten=true;
      },
      showToastIcon(m) {
        const self = this;
        if (!self.toastIcon) {
          self.toastIcon = self.$f7.toast.create({
            icon: self.$theme.ios ? '<i class="f7-icons">start</i>' : '<i class="material-icons">start</i>',
            text: m,
            position: 'center',
            closeTimeout: 2000,
          });
        }
        self.toastIcon.open();
      },
     withdraw(){
        this.showToastIcon('系统暂时不支持提现,请联系您的家族长,咨询相关事宜!')
        return
        this.$http.put('/api/users/WithDraw',this.model)
        .then((res) => {
            this.showToastIcon('提现成功,系统审核成功后会发放到您的账户,请注意查收!')
        }).catch( e => {
            this.showToastIcon('提现失败,请联系客服!')
        })
      },
      transfer(){
            const self=this
            let m=this.modelb
            this.modelb={to:null,amount:null,type:2,remarks:''}
            if(this.delay_coins)
              m.type=1;
            else
              m.type=0;

            let content='确定给用户【' + m.to + '】 转账' + m.amount + '枚金币吗？(系统会收取1%手续费)';
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
      transferBean() {
            const self=this
            let m=this.modelbean
            this.modelbean={to:null,amount:null,type:2,remarks:''}

            let content='确定给用户【' + m.to + '】 转账' + m.amount + '枚金豆吗？';
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

    }
  }
</script>
<style>
#beans .tab-link-active{
  color:green;
}
.raw_top{
  padding-top:10px;
  border-top: 1px solid gray;
}
</style>