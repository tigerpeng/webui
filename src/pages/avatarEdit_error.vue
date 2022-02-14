<template>
<div class="content">
  <header class="bar bar-nav">
    <router-link class="button button-link button-nav pull-left" to="/user" replace>
      <span class="icon icon-left"></span>
    </router-link>
    <h1 class="title">头像剪切</h1>
  </header>
    <div class="content text-center">
    <h2></h2>
    <img v-if="userAvatar" :src="userAvatar">
    <button id="pick-avatar">选择本地文件</button>
    <avatar-cropper
      @uploading="handleUploading"
      @uploaded="handleUploaded"
      trigger="#pick-avatar"
      :upload-headers="customHeader"
      upload-url="http://localhost:5001/api/account/UploadAvatar" />
  </div>
</div>
</template>

<script>
import AvatarCropper from 'vue-avatar-cropper'
// https://github.com/overtrue/vue-avatar-cropper
import auth from '../../auth'

export default {
  components: { AvatarCropper },
  data () {
    return {
      userAvatar: undefined,
      customHeader: {Authorization: 'Bearer ' + auth.getToken()}
    }
  },
  methods: {
    handleUploading (form, xhr) {
      // customHeader.Authorization = 'Bearer' + auth.getToken()
      // xhr.setRequestHeader('Authorization', 'Bearer' + auth.getToken())
      // this.message = "uploading...";
    },
    handleUploaded (resp) {
      this.userAvatar = resp.relative_url
    },
    customHeaders () {
      alert('header')
      var header = {Authorization: 'Bearer' + auth.getToken()}
      return header
    }
  }
}
</script>
