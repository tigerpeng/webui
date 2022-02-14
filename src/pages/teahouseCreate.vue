<template>
  <f7-page name="profile">
    <f7-navbar title="创建茶馆" back-link="Back"></f7-navbar>
    <f7-block-title>填写茶馆信息</f7-block-title>
    <f7-block>
        <f7-list inline-labels no-hairlines-md>
           <f7-list-input
            label="经营模式"
            type="select"
            defaultValue="1"
            placeholder="请选择..." 
            :value="family.type"  @input="family.type = $event.target.value">
            <option value="1">合作经营  需要80000金币</option>
            <option value="2">独立经营  需要500000金币</option>
          </f7-list-input>

          <f7-list-input
            label="茶馆名称"
            type="text"
            placeholder="茶馆名称"
            clear-button 
            :value="family.name" @input="family.name = $event.target.value">
          </f7-list-input>

          <f7-list-input
            label="棋牌茶费"
            type="text"
            placeholder="25 (每局消耗每个玩家25积分) 0.01 (每局从赢家提成1%积分) "
            clear-button 
            :value="family.teaFee" @input="family.teaFee = $event.target.value">
          </f7-list-input>


          <f7-list-input
            label="转账费率"
            type="text"
            placeholder="2 (固定费率 2积分) 0.01 (从转账中提取1%积分) "
            clear-button 
            :value="family.transferFee" @input="family.transferFee = $event.target.value">
          </f7-list-input>

          <f7-list-input
            label="语音分成"
            type="text"
            placeholder="0.01 从茶馆成员语音收入中提取 1% 分成"
            clear-button 
            :value="family.talksFee" @input="family.talksFee = $event.target.value">
          </f7-list-input>

          <f7-list-input
            label="茶馆门票"
            type="text"
            placeholder="0 免费加入"
            clear-button 
            :value="family.tickets" @input="family.tickets = $event.target.value">
          </f7-list-input>

          <!--
            <f7-list-input
              label="加入奖励"
              type="text"
              placeholder="新成员 积分奖励"
              clear-button 
              :value="family.joinAward" @input="family.joinAward = $event.target.value">
            </f7-list-input>
          -->

          <f7-list-input
            label="茶馆介绍"
            type="textarea"
            resizable
            placeholder="填写对茶馆的简单描述"
            :value="family.desp" @input="family.desp = $event.target.value">>
          </f7-list-input>

          <f7-list-item title="茶馆海报" v-if="family.id>0">
            <div class="text-center">
            <img v-if="userAvatar" :src="userAvatar" :onerror="familyPoster" width="160px">
            <button id="pick-avatar">更改海报</button>
            <avatar-cropper
              @uploaded="handleUploaded"
              trigger="#pick-avatar"
              :cropper-options="{aspectRatio:2}"
              :upload-headers="customHeader"
              :upload-url="uploadUrl"
              :upload-form-data="{fid:family.id}" />
          </div>
          </f7-list-item>

          </br></br></br>
          <f7-button fill @click=familyCreate() >创建/保存</f7-button>
        </f7-list>
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
        family:{id:0,type:1,name:'',tickets:null,teaFee:null,transferFee:null,talksFee:null,joinAward:0,desp:''},
        result:'',
        userAvatar: undefined,
        customHeader: {Authorization:this.g.getToken()}
      }
   },
   computed:{
      openUrl(){
          return '/family-poster/familyId/'+ this.family.id+'/';
      },
      familyPoster(){
          return  'this.src="' + require('../assets/img/family.jpg') + '"'
      },
      uploadUrl () {
        return this.g.db()+"api/family/Poster"
      }
   },
   created() {
      this.userAvatar=this.g.db()+'img/f/'+this.family.id+'.jpg'
    },
   mounted (){
      const self=this
      this.$http.get('/api/family/owner')
      .then((res) => {
          if(res.data.id>0){
            self.family=res.data;
            self.userAvatar=this.g.db()+'img/f/'+this.family.id+'.jpg'
          }
      }).catch( e => {
        //this.$f7.dialog.alert(e.response.data);
      })
   },
   methods:{
      handleUploaded(resp) {
        //this.userAvatar = resp.relative_url;
        this.userAvatar = this.g.db()+resp.relative_url+"?rnd="+Math.floor(Math.random()*1000);
      },
      familyCreate(){
        const self=this
        if(this.family.id==0){
            this.$http.post('/api/family',this.family)
            .then((res) => {
              self.family=res.data;
            }).catch( e => {
              this.$f7.dialog.alert(e.response.data);
            })
        }else
        {
            this.$http.put('/api/family/'+this.family.id,this.family)
            .then((res) => {
              self.family=res.data;
            }).catch( e => {
            })
        }

      }
   }
};
</script>
