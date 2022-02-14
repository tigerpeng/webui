<template>
  <f7-page>
    <f7-navbar title="切换账户" back-link="Back"></f7-navbar>
    <f7-block>
        
        <f7-list no-hairlines-md>

        <p><f7-link href="/debug/">软件调试</f7-link></p>

        <f7-list-input
          outline
          label="服务器"
          floating-label
          type="text"
          placeholder="服务器"
          :value="serverURL" @input="serverURL = $event.target.value">
          clear-button
        >
        </f7-list-input>

        <f7-list-input
          outline
          label="token"
          floating-label
          type="password"
          placeholder="Bearer Token"
          :value="token" @input="token = $event.target.value">
          clear-button
        >
        </f7-list-input>
       
       <f7-button fill @click=logout()>切换账户</f7-button>
      </f7-list>
    </f7-block>
  </f7-page>
</template>

<script>
  export default {
    data() {
      return {
          serverURL:'ws://lobby.hellowtalks.com/mj',
          token:'',
      };
    },
  async mounted() {
  },
  methods:{
     logout(){
        localStorage.clear();
        this.$http.defaults.baseURL =this.g.db();
        this.$f7router.navigate('/myself/')
    },
   }
  }
</script>