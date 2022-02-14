<template>
  <f7-page>
    <f7-navbar title="视频选聊(此部分功能尚未完善)" back-link="Back"></f7-navbar>
    <f7-block>
              <!-- 
                      <video width="48%" height="240" autoplay="autoplay" controls>
                        <source src="https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm" type="video/mp4">
                        <source src="movie.mp4" type="video/mp4">
                        <source src="movie.ogg" type="video/ogg">
                        Your browser does not support the video tag.
                      </video>
                -->

        <center>
            <video width="40%"  autoplay="autoplay" muted loop v-on:click="startChat(10001)">
              <source src="http://app.ournet.club:2021/static/video/sample_13.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>

            <video width="40%" autoplay="autoplay" muted loop v-on:click="startChat(10002)">
              <source src="http://app.ournet.club:2021/static/video/sample_2.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>

            <video width="40%" autoplay="autoplay" muted loop v-on:click="startChat(10003)">
              <source src="http://app.ournet.club:2021/static/video/sample_3.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>

            <video width="40%"  autoplay="autoplay" muted loop v-on:click="startChat(10004)">
              <source src="http://app.ournet.club:2021/static/video/sample_4.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
        </center>

    </f7-block>
  </f7-page>
</template>
<script>
export default {
    data() {
      return {
        result:'',
        users:[]
      };
    },
  created() {
  },
  destroyed() {
  },
  async mounted() {

   },
   computed:{
   },
   methods:{
      startChat(uid) {
          var p={
            uid:10001,
            name: '视频随机',
            sex:0,
            birthday:'2000-1-1',
            price:0,
            career:'模特',
            avatar: '../../static/img/1.jpg',
          }
          p.uid=uid;

          this.startVideoChat(p)

      },
     startVideoChat(p)
     {
        let t=1
        if(this.g.loadLogin()){
          let c={cmd:'talk',type:t,to:p,screen:'portrait'}
          this.startGame('81_VideoChat',c)
        }else
        {
          this.showToastIcon('请先登录服务器')
        }
     },
   }
  
};
</script>