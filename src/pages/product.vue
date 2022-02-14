<template>
  <f7-page name="product">
    <f7-navbar :title="product.title" back-link="Back"></f7-navbar>
    <f7-block-title>关于 {{product.title}}</f7-block-title>
    <f7-block strong>
      {{product.description}}
    </f7-block>

    <f7-list inset>
      <f7-list-button title="启动组件" color="red" v-on:click=startTest()></f7-list-button>
    </f7-list>

  </f7-page>
</template>
<script>
  export default {
    data: function () {
      var productId = this.$f7route.params.id;
      var currentProduct;
      this.$f7.data.products.forEach(function (product) {
        if (product.id === productId) {
          currentProduct = product;
        }
      });
      return {
        product: currentProduct,
      };
    },
    methods:{
      startTest(){
            let pid=this.$f7route.params.id
            if('1'===pid){
                let cmd = {cmd:'chat',pid:1,serverURL:'ws://lobby.hellowtalks.com/mj',setting:{type:1,desp:'区块链'},open:true}
                cmd.profile=this.GLOBAL.getProfile()
                this.startGame('81_VideoChat',cmd)
            }else{
              this.showToastIcon();
            }

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
