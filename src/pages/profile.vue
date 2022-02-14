<template>
  <f7-page name="profile">
    <f7-navbar title="修改资料" back-link="Back"></f7-navbar>

<f7-list accordion-list accordion-opposite>
  <f7-list-item accordion-item title="基本信息">
    <f7-accordion-content opened="true">
      <f7-block>
                    <f7-list inline-labels no-hairlines-md>
                      <f7-list-input
                        label="姓名"
                        type="text"
                        placeholder="您的名字或昵称"
                        clear-button 
                        :value="profile.name" @input="profile.name = $event.target.value">
                      </f7-list-input>

                      <f7-list-input
                        label="性别"
                        type="select"
                        defaultValue="Male"
                        placeholder="请选择..." 
                        :value="profile.sex"  @input="profile.sex = $event.target.value">
                        <option value="0">女</option>
                        <option value="1">男</option>
                        <option value="2">其他</option>
                      </f7-list-input>

                      <f7-list-input
                        label="Birthday"
                        type="date"
                        defaultValue="2000-01-01"
                        placeholder="请选择..." 
                        :value="profile.birthday" @input="profile.birthday = $event.target.value">
                      </f7-list-input>

                      <!--
                      <f7-list-item title="头像" smart-select :smart-select-params="{openIn: 'popover'}">
                        <select name="superhero" v-model="profile.avatar" @input="profile.avatar = $event.target.value">
                          <option value="1.jpg" selected data-option-class="avatarSel" data-option-image='/static/img/1.jpg'>男1</option>
                          <option value="2.jpg" data-option-class="avatarSel" data-option-image='/static/img/2.jpg'>男2</option>
                          <option value="3.jpg" data-option-class="avatarSel" data-option-image='/static/img/3.jpg'>男3</option>
                          <option value="4.jpg" data-option-class="avatarSel" data-option-image='/static/img/4.jpg'>男4</option>
                          <option value="5.jpg" data-option-class="avatarSel" data-option-image='/static/img/5.jpg'>男5</option>
                          <option value="6.jpg" data-option-class="avatarSel" data-option-image='/static/img/6.jpg'>女1</option>
                          <option value="7.jpg" data-option-class="avatarSel" data-option-image='/static/img/7.jpg'>女2</option>
                          <option value="8.jpg" data-option-class="avatarSel" data-option-image='/static/img/8.jpg'>女3</option>
                          <option value="9.jpg" data-option-class="avatarSel" data-option-image='/static/img/9.jpg'>女4</option>
                          <option value="10.jpg" data-option-class="avatarSel" data-option-image='/static/img/10.jpg'>女5</option>
                        </select>
                      </f7-list-item>
                      -->

                      <f7-list-item title="自定义头像"    link="/avatarEdit/"></f7-list-item>


                      <f7-list-input
                        label="心情"
                        type="text"
                        placeholder="心情/愿望"
                        clear-button 
                        :value="profile.mood" @input="profile.mood = $event.target.value">
                      </f7-list-input>
                    </f7-list>
      </f7-block>
    </f7-accordion-content>
  </f7-list-item>
  <f7-list-item accordion-item title="身价信息">
    <f7-accordion-content>
         <f7-list no-hairlines-md>
            <f7-list-input
              outline
              label="身价"
              floating-label
              type="text"
              placeholder="您每分钟收取的金币数"
              clear-button :value="profile.price" @input="profile.price = $event.target.value">
            </f7-list-input>

            <f7-list-item title="标签" smart-select :smart-select-params="{openIn: 'popup'}">
            <select name="labels" multiple v-model="profile.labels" @input="profile.labels = $event.target.value">
              <option v-for="(it,index) in tags" 
                      :key="index"
                      :value="it.id"
                      :smart-select="isMytag(it.id)">
                {{it.name}}
              </option>
            </select>
          </f7-list-item>

        </f7-list>
    </f7-accordion-content>
  </f7-list-item>
  <f7-list-item accordion-item title="婚恋信息">
    <f7-accordion-content>
      <f7-block>

         <f7-list no-hairlines-md>
            <f7-list-input
              outline
              label="身高(厘米)"
              floating-label
              type="text"
              placeholder="CM"
              clear-button :value="marriage.height" @input="marriage.height = $event.target.value">
            </f7-list-input>

            <f7-list-input
              outline
              label="体重(斤)"
              floating-label
              type="text"
              placeholder="kg/2"
              clear-button :value="marriage.weight" @input="marriage.weight = $event.target.value">
            </f7-list-input>

            <f7-list-input
              outline
              label="学历"
              floating-label
              type="text"
              placeholder="您的最高学历"
              clear-button :value="marriage.education" @input="marriage.education = $event.target.value">
            </f7-list-input>

            <f7-list-input
              outline
              label="月收入"
              floating-label
              type="text"
              placeholder="您的月薪 平均月收入"
              clear-button :value="marriage.salary" @input="marriage.salary = $event.target.value">
            </f7-list-input>

             <f7-list-input
              outline
              label="房屋"
              floating-label
              type="text"
              placeholder=""
              clear-button :value="marriage.house" @input="marriage.house = $event.target.value">
            </f7-list-input>

           <f7-list-input
              outline
              label="车辆"
              floating-label
              type="text"
              placeholder=""
              clear-button :value="marriage.cars" @input="marriage.cars = $event.target.value">
            </f7-list-input>

            <f7-list-input
              outline
              label="常住地址"
              floating-label
              type="text"
              placeholder=""
              clear-button :value="marriage.addrWork" @input="marriage.addrWork = $event.target.value">
            </f7-list-input>

            <f7-list-input
              outline
              label="户籍地址"
              floating-label
              type="text"
              placeholder=""
              clear-button :value="marriage.addrHome" @input="marriage.addrHome = $event.target.value">
            </f7-list-input>

            <f7-list-input
              outline
              label="婚姻状况"
              floating-label
              type="text"
              placeholder=""
              clear-button :value="marriage.status" @input="marriage.status = $event.target.value">
            </f7-list-input>

            <f7-list-input
              outline
              label="自我介绍"
              floating-label
              type="textarea"
              placeholder="描述您的优势,来吸引对方"
              clear-button :value="marriage.desp" @input="marriage.desp = $event.target.value">
            </f7-list-input>

            <f7-list-input
              outline
              label="征婚条件"
              floating-label
              type="textarea"
              placeholder="您心目中的 TA"
              clear-button :value="marriage.expect" @input="marriage.expect = $event.target.value">
            </f7-list-input>

            <f7-list-input
              outline
              label="婚姻愿景"
              floating-label
              type="textarea"
              placeholder="共同生活后，您对未来的规划"
              clear-button :value="marriage.future" @input="marriage.future = $event.target.value">
            </f7-list-input>


        </f7-list>

      </f7-block>
    </f7-accordion-content>
  </f7-list-item>
</f7-list>

        <f7-button fill @click=updateProfile() >保存</f7-button>
    </f7-block>
  </f7-page>
</template>

<script>
export default {
   data() {
      return {
        profile:{name:null,mood:null,sex:0,birthday:'',avatar:'1.jpg',price:null,labels:[101],marriage:{}},
        marriage:{height:null,weight:null,education:'',salary:null,house:'',cars:'',addrWork:'',addrHome:'',status:'',desp:'',expect:'',future:''},
        tags:[],
        result:'',
      }
   },
   created(){
  
        const self=this
            this.$http.get('/api/users/allprofile')
        .then((res) => {
            self.profile=res.data.myself
            if(res.data.marriage!==null)
              self.marriage=res.data.marriage
            self.tags=res.data.tags
            console.log(self.profile); 
        }).catch( e => {

        })
   },
   mounted (){
        /*
        if (localStorage.getItem('profile')) 
          this.profile = JSON.parse(localStorage.getItem('profile'));
        */


    },
   methods:{
      updateProfile(){
        const self=this
        this.profile.marriage=this.marriage;
        this.$http.put('/api/users/Profile',this.profile)
        .then((res) => {
          localStorage.setItem('profile',JSON.stringify(this.profile));
        }).catch( e => {
            if (e.response && e.response.data){
              self.$f7.dialog.alert('更新失败!  ' + e.response.data);
              alert(JSON.stringify(this.profile));
            }
            else
              self.$f7.dialog.alert('更新失败! 网络或服务器内部错误(没有应答)');      
        })
      },
      isMytag(t){
        if(this.profile.labels===null) 
          return false;
        return (this.profile.labels.indexOf(t) > -1)
      },
      removeTag(arr, item) {
        for(var i = arr.length-1;i >= 0;i--){
            var value = arr[i];
            if(value == item){
                arr.splice(i,1);
            }
        }
          return arr;
      },
      modifyMytag(tid,check){
          if(check)
          { if(this.profile.labels==null)
              this.profile.labels=new Array();
            if(!isMytag())
             this.profile.labels.add(tid)
          }else{
            removeTag(his.profile.labels,tid)
          }

      }
   }
};
</script>
<style>
.avatarSel img{
  width:50px;
  height:50px;
}
</style>
