<template>
  <f7-page name="transfer">
    <f7-navbar title="积分账户" back-link="Back"></f7-navbar>
    <f7-block-title>关于积分转账</f7-block-title>
    <f7-block strong>
      <p>把自己的积分转给其他人,每次转账的金额 >1000 个.</p>
    </f7-block>

    <f7-block>

<f7-list no-hairlines-md>    
      <f7-list-input
        label="账号:"
        type="tel"
        placeholder="请输入用户编号或者手机号码"
        :value="model.Userid"
        @input="model.Userid = $event.target.value"
      ></f7-list-input>

      <f7-list-input
        label="数量:"
        type="tel"
        placeholder="1000 的整数倍 如:1000/2000/3000"
        :value="model.Amount"
        @input="model.Amount= $event.target.value"
      ></f7-list-input>

    </f7-list>


      <f7-button round fill v-on:click=transfer>转账</f7-button>
    </f7-block>
  </f7-page>
</template>

<script>
export default {
  data () {
    return {
        model:{Userid:null,Amount:null,type:3}
    }
  },
  mounted (){
  },
  methods:{
    transfer () {
    alert("确定要转账吗？"+this.model.Userid+' '+this.model.Amount)
        this.$http.post('/api/mahjong/transfer',this.model)
        .then((res) => {

        }).catch( e => {

        })

    },
   }
}
</script>
