<template>
<f7-page name="avatarEdit">
  <f7-navbar title="头像编辑" back-link="Back"></f7-navbar>
     <f7-block-title>编辑上传头像</f7-block-title>
     <f7-block>
        <div class="text-center">
          <img v-if="userAvatar" :src="userAvatar">
          <button id="pick-avatar">请选择一张头像图片</button>
          <avatar-cropper
            @uploaded="handleUploaded"
            trigger="#pick-avatar"
            :upload-headers="customHeader"
            :upload-url="uploadUrl" />
        </div>
      </f7-block>
</f7-page>
</template>

<script>
  import AvatarCropper from "vue-avatar-cropper"
  //https://github.com/overtrue/vue-avatar-cropper

  export default {
    components: { AvatarCropper },
    data() {
      return {
          userAvatar: undefined,
          customHeader: {Authorization:this.g.getToken()}
      }
    },
    computed:{
        uploadUrl () {
        return this.g.db()+"api/users/uploadavatar"
      }
   },
    methods: {
      handleUploaded(resp) {
        //this.userAvatar = resp.relative_url;
        this.userAvatar = this.g.db()+resp.relative_url+"?rnd="+Math.floor(Math.random()*1000);
      }
    }
  }
</script>
