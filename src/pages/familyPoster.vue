<template>
<f7-page name="avatarEdit">
  <f7-navbar title="茶馆海报编辑" back-link="Back"></f7-navbar>
     <f7-block-title>编辑上传茶馆海报</f7-block-title>
     <f7-block>
        <div class="text-center">
          <img v-if="userAvatar" :src="userAvatar" width="200">
          <button id="pick-avatar">请选择一张图片</button>
          <avatar-cropper
            @uploaded="handleUploaded"
            trigger="#pick-avatar"
            :cropper-options="{aspectRatio:2}"
            :upload-headers="customHeader"
            :upload-url="uploadUrl"
            :upload-form-data="formData" />
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
          formData:{fid:"7654321"},
          customHeader: {Authorization:this.g.getToken()}
      }
    },
    computed:{
        uploadUrl () {
        return this.g.db()+"api/family/Poster"
      }
   },
    created() {
      this.userAvatar=this.g.db()+"img/f/family.jpg"
      this.formData.fid=this.$f7route.params['fId']
    },
    methods: {
      handleUploaded(resp) {
        //this.userAvatar = resp.relative_url;
        this.userAvatar = this.g.db()+resp.relative_url+"?rnd="+Math.floor(Math.random()*1000);
      }
    }
  }
</script>
