<template>
  <f7-page name="ask">
    <f7-navbar :title="askTitle" back-link="Back"></f7-navbar>
    <f7-block-title>关于</f7-block-title>
    <f7-block strong>
      编号:{{from.uid}}
      昵称:{{from.name}}
      头像:{{from.avatar}}
      生日:{{from.birthday}}
    </f7-block>

    <f7-list inset>
      <f7-list-button title="同意" color="green" v-on:click=agree()></f7-list-button>
    </f7-list>

    <f7-list inset>
      <f7-list-button title="拒绝" color="red" v-on:click=refuse()></f7-list-button>
    </f7-list>

  </f7-page>
</template>
<script>
  export default {
    data () {
      return {
        type:1,
        from:{uid:0,name:'hellow',avatar:'1.jpg',birthday:'2000-1-1'},
        action:-1,
      }
    },
    computed:{
      askTitle () {
        return '是否同意 '+this.from.name+' 的视频通话？'
      }
   },
    created() {
      var t = this.$f7route.params['tID']
      var f = this.$f7route.params['profile']
      var p=JSON.parse(decodeURI(f))
      this.type=t
      this.from=p
    },
    async mounted() {
          const self = this;
          setTimeout(() => {
            if(self.action===-1)
              self.refuse()
            self.action=-1
          }, 15000);
   },
    methods:{
      agree(){
        this.action=1
        let c = {cmd:'-ask',agree:true,type:this.type}
        this.startGame('81_VideoChat',c,false)
        this.$f7router.back()
      },
      refuse(){
          this.action=0
          let c = {cmd:'-ask',agree:false,type:this.type}
          this.callNative(c)
          this.$f7router.back()
      },
      showToastIcon() {
        const self = this;
        // Create toast
        if (!self.toastIcon) {
          self.toastIcon = self.$f7.toast.create({
            icon: self.$theme.ios ? '<i class="f7-icons">start</i>' : '<i class="material-icons">start</i>',
            text: '该组建在此版本不可用',
            position: 'center',
            closeTimeout: 2000,
          });
        }
        // Open it
        self.toastIcon.open();
      },
    }
  };
</script>
