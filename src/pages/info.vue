<template>
  <f7-page name="ask">
    <f7-navbar :title="infoTitle" back-link="Back"></f7-navbar>
    <f7-block strong>
      {{info.msg}}
    </f7-block>

    <f7-list inset>
      <f7-list-button title="确定" color="green" v-on:click=mb_ok()></f7-list-button>
    </f7-list>

    <f7-list inset>
      <f7-list-button title="取消" color="red" v-on:click=mb_cancel()></f7-list-button>
    </f7-list>

  </f7-page>
</template>
<script>
  export default {
    data () {
      return {
        info:{title:'信息',type:'warrning',msg:'收到的信息为:'}
      }
    },
    computed:{
      infoTitle () {
        return this.info.title
      }
   },
    created() {
      try{
        let t = this.$f7route.params['jcmd']
        let jstr=decodeURIComponent(atob(t))
        this.info=JSON.parse(jstr)
      }catch (e) {
        alert('exception in created of info '+e.message)
      }
    },
    async mounted() {

   },
    methods:{
      mb_ok(){

      },
      mb_cancel(){

      },
      showToastIcon(t) {
        const self = this;
        if (!self.toastIcon) {
          self.toastIcon = self.$f7.toast.create({
            icon: self.$theme.ios ? '<i class="f7-icons">start</i>' : '<i class="material-icons">start</i>',
            text: t,
            position: 'center',
            closeTimeout: 2000,
          });
        }
        self.toastIcon.open();
      },
    }
  };
</script>
