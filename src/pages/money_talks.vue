<template>
  <f7-page name="money_talks" >
    <f7-navbar title="语音账单" back-link="Back"></f7-navbar>

     <f7-toolbar top id="talks">
        <f7-link tab-link="#tab-1" tab-link-active>语音支出</f7-link>
        <f7-link tab-link="#tab-2">语音收入</f7-link>
      </f7-toolbar>
    <f7-tabs >
      <f7-tab id="tab-1" tab-active >
        <f7-block>
            <f7-row no-gap>
              <f7-col width="10">序号</f7-col>
              <f7-col width="25">开始时间</f7-col>
              <f7-col width="25">结束时间</f7-col>
              <f7-col width="20">对方</f7-col>
              <f7-col width="10">时价</f7-col>
              <f7-col width="10">金币</f7-col>
            </f7-row>
            <f7-row no-gap v-for="(it, index) in expense">
              <f7-col width="10">{{index}}</f7-col>
              <f7-col width="25">{{it.timeStart}}</f7-col>
              <f7-col width="25">{{it.timeEnd}}</f7-col>
              <f7-col width="20">{{it.peer}}</f7-col>
              <f7-col width="10">{{it.price}}</f7-col>
              <f7-col width="10">{{it.amount}}</f7-col>
            </f7-row>
        </f7-block>
      </f7-tab>
      <f7-tab id="tab-2" >
        <f7-block>
            <f7-row no-gap>
              <f7-col width="10">序号</f7-col>
              <f7-col width="25">开始时间</f7-col>
              <f7-col width="25">结束时间</f7-col>
              <f7-col width="20">对方</f7-col>
              <f7-col width="10">时价</f7-col>
              <f7-col width="10">金豆</f7-col>
            </f7-row>
            <f7-row no-gap v-for="(it, index) in income">
              <f7-col width="10">{{index}}</f7-col>
              <f7-col width="25">{{it.timeStart}}</f7-col>
              <f7-col width="25">{{it.timeEnd}}</f7-col>
              <f7-col width="20">{{it.peer}}</f7-col>
              <f7-col width="10">{{it.price}}</f7-col>
              <f7-col width="10">{{it.amount}}</f7-col>
            </f7-row>
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
        expense: [],
        income: []
      };
    },
    mounted (){
        var $$=window.$f7.$
        $$('#talks> .toolbar-inner').on('click', function (e) {
            $$('#talks > .toolbar-inner > span').remove()
        })

        const self=this
        this.$http.get('/api/talks/expense')
        .then((res) => {
          self.expense=res.data
        }).catch( e => {
          self.expense=null
        })

        this.$http.get('/api/talks/income')
        .then((res) => {
          self.income=res.data
        }).catch( e => {
          self.income=null
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

    }
  }
</script>
<style>
#talks .tab-link-active{
  color:green;
}
</style>