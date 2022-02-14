<template>
  <f7-page>
    <f7-navbar title="手机登录" ></f7-navbar>
    <f7-block-title>
                <f7-link href="/debug/">切换登录服务器</f7-link>
    </f7-block-title>
    <f7-block>
        <div class="content-block">
          <br>
          <div class="feedback-label">
              请输入您的手机号快速注册/登录
          </div>
          <br/>
          <div class="feedback-input">
            <div class="search-input" >
              <input type="tel" placeholder="请输入手机号" v-model="model.phone" />
            </div>
            <br/>
            <div class="input-group input-group-sm">
                  <input type="text" class="form-control" placeholder='请输入验证码' v-model="model.password">
                  <span class="input-group-btn">
                   <button type="button" class="btn btn-info  btn-flat " v-on:click=verifyCode :disabled="isdisabledFn">{{btnTitle}}</button>
                  </span>
            </div>
          <div>
            <p style="color:red">{{result}}</p>
            </div>
          </div>
          <br/><br/>
            <div class="submit-button">
              <button class="button button-big button-fill" v-on:click=login>登录</button>
            </div>
        </div>
         </f7-block>
   </f7-page>
</template>

<script>
export default {
   data() {
      return {
        result:'',
        model:{phone:null,password:''},
        isdisabledFn:false,
        btnTitle:"获取验证码",
        countdown:30,
        timer: null,
      }
   },
   mounted (){

   },
   methods:{
    verifyCode () {

      const self=this

      self.$http.post('/api/users/SendCheck', self.model)
        .then((res) => {
          console.log('res=>',res);  
        })
        .catch(function (error) {
          console.log(error);
        });

      self.isdisabledFn=true;
        self.timer = setInterval(() =>{
            if(this.countdown === 1){
                clearInterval(self.timer);
                self.timer=null;

                self.btnTitle="获取验证码";
                self.isdisabledFn=false;
                self.countdown=30;
            }else{
                self.countdown--;
                self.btnTitle=self.countdown +"秒后重新发送";
            }
        },1000);

    },
    login () {
      const self=this
      this.result=''
      this.$http.post('/api/users/login',this.model)
        .then((res) => {
          this.g.saveLogin(res.data)
          window.location.reload()
          //window.location.href = window.location.href  //刷新当前页
          //this.$f7router.navigate('/')
          return ;
          //马上登录p4sp
          let c=self.g.loadLogin()
          if(c){
              c.cmd='login'
              c.db=self.g.db()
              c.tracker=self.g.p4spUrl
              self.callNative(c)
          }
          //this.$f7router.navigate('/myself/')
          this.$f7router.refreshPage()
        }).catch( e => {
          //console.log(e.response.status);
          //console.log(e.response.data);
          this.result=e.status+":"+e.message;
        })
    },
    loginOut () {
      //auth.logout()
    },
   }
};
</script>


<style>
.sub-title {
  margin-top: 2.2rem;
  background-color: white;
  height: 2.2rem;
  font-size: .8rem;
  font-weight: normal;
  line-height: 2.2rem;
  text-align: center;
  border-bottom: 1px solid #d8d8d9;
}
.feedback .content-block {
  margin: 2.3rem 0 0 0;
  padding: 0 .45rem;
}
.feedback-label {
  font-size: .7rem;
  line-height: 1.2rem;
}
.feedback-input input{
  width: 100%;
  height: 2.15rem;
  font-size: .7rem;
  padding: .4rem .5rem;
  background-color: #fff;
  margin-bottom: .3rem;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: .2rem;
}
.feedback textarea {
  height: auto;
  resize: none;
  width: 100%;
  font-size: .7rem;
  -webkit-appearance: none;
  padding: .4rem .5rem;
  -webkit-user-select: text;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: .2rem;
  outline: 0;
}
.feedback .submit-button {
  margin-top: .8rem;
  width: 100%;
  padding: 0 .45rem;
}
.feedback .submit-button button {
  background-color: #ed8e07;
  width: 100%;
  line-height: 2.1rem !important;
  height: 2.1rem !important;
}
.input-group {
  position: relative;
  display: table;
  border-collapse: separate;
}
.input-group[class*="col-"] {
  float: none;
  padding-right: 0;
  padding-left: 0;
}
.input-group .form-control {
  position: relative;
  z-index: 2;
  float: left;
  width: 100%;
  margin-bottom: 0;
}
.input-group .form-control:focus {
  z-index: 3;
}
.input-group-lg > .form-control,
.input-group-lg > .input-group-addon,
.input-group-lg > .input-group-btn > .btn {
  height: 46px;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.3333333;
  border-radius: 6px;
}
select.input-group-lg > .form-control,
select.input-group-lg > .input-group-addon,
select.input-group-lg > .input-group-btn > .btn {
  height: 46px;
  line-height: 46px;
}
textarea.input-group-lg > .form-control,
textarea.input-group-lg > .input-group-addon,
textarea.input-group-lg > .input-group-btn > .btn,
select[multiple].input-group-lg > .form-control,
select[multiple].input-group-lg > .input-group-addon,
select[multiple].input-group-lg > .input-group-btn > .btn {
  height: auto;
}
.input-group-sm > .form-control,
.input-group-sm > .input-group-addon,
.input-group-sm > .input-group-btn > .btn {
  height: 2.15rem;
  padding: 5px 10px;
  font-size: .7rem;
  line-height: 1.5;
  border-radius: .2rem;
}
select.input-group-sm > .form-control,
select.input-group-sm > .input-group-addon,
select.input-group-sm > .input-group-btn > .btn {
  height: 30px;
  line-height: 30px;
}
textarea.input-group-sm > .form-control,
textarea.input-group-sm > .input-group-addon,
textarea.input-group-sm > .input-group-btn > .btn,
select[multiple].input-group-sm > .form-control,
select[multiple].input-group-sm > .input-group-addon,
select[multiple].input-group-sm > .input-group-btn > .btn {
  height: auto;
}
.input-group-addon,
.input-group-btn,
.input-group .form-control {
  display: table-cell;
}
.input-group-addon:not(:first-child):not(:last-child),
.input-group-btn:not(:first-child):not(:last-child),
.input-group .form-control:not(:first-child):not(:last-child) {
  border-radius: 0;
}
.input-group-addon,
.input-group-btn {
  width: 1%;
  white-space: nowrap;
  vertical-align: middle;
}
.input-group-addon {
  padding: 6px 12px;
  font-size: 14px;
  font-weight: normal;
  line-height: 1;
  color: #555;
  text-align: center;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.input-group-addon.input-sm {
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 3px;
}
.input-group-addon.input-lg {
  padding: 10px 16px;
  font-size: 18px;
  border-radius: 6px;
}
.input-group-addon input[type="radio"],
.input-group-addon input[type="checkbox"] {
  margin-top: 0;
}
.input-group .form-control:first-child,
.input-group-addon:first-child,
.input-group-btn:first-child > .btn,
.input-group-btn:first-child > .btn-group > .btn,
.input-group-btn:first-child > .dropdown-toggle,
.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),
.input-group-btn:last-child > .btn-group:not(:last-child) > .btn {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.input-group-addon:first-child {
  border-right: 0;
}
.input-group .form-control:last-child,
.input-group-addon:last-child,
.input-group-btn:last-child > .btn,
.input-group-btn:last-child > .btn-group > .btn,
.input-group-btn:last-child > .dropdown-toggle,
.input-group-btn:first-child > .btn:not(:first-child),
.input-group-btn:first-child > .btn-group:not(:first-child) > .btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.input-group-addon:last-child {
  border-left: 0;
}
.input-group-btn {
  position: relative;
  font-size: 0;
  white-space: nowrap;
}
.input-group-btn > .btn {
  position: relative;
}
.input-group-btn > .btn + .btn {
  margin-left: -1px;
}
.input-group-btn > .btn:hover,
.input-group-btn > .btn:focus,
.input-group-btn > .btn:active {
  z-index: 2;
}
.input-group-btn:first-child > .btn,
.input-group-btn:first-child > .btn-group {
  margin-right: -1px;
}
.input-group-btn:last-child > .btn,
.input-group-btn:last-child > .btn-group {
  z-index: 2;
  margin-left: -1px;
}
.btn-info {
  color: #fff;
  background-color: #5bc0de;
  border-color: #46b8da;
}
.btn-info:focus,
.btn-info.focus {
  color: #fff;
  background-color: #31b0d5;
  border-color: #1b6d85;
}
.btn-info:hover {
  color: #fff;
  background-color: #31b0d5;
  border-color: #269abc;
}
.btn-info:active,
.btn-info.active,
.open > .dropdown-toggle.btn-info {
  color: #fff;
  background-color: #31b0d5;
  border-color: #269abc;
}
.btn-info:active:hover,
.btn-info.active:hover,
.open > .dropdown-toggle.btn-info:hover,
.btn-info:active:focus,
.btn-info.active:focus,
.open > .dropdown-toggle.btn-info:focus,
.btn-info:active.focus,
.btn-info.active.focus,
.open > .dropdown-toggle.btn-info.focus {
  color: #fff;
  background-color: #269abc;
  border-color: #1b6d85;
}
.btn-info:active,
.btn-info.active,
.open > .dropdown-toggle.btn-info {
  background-image: none;
}
.btn-info.disabled:hover,
.btn-info[disabled]:hover,
fieldset[disabled] .btn-info:hover,
.btn-info.disabled:focus,
.btn-info[disabled]:focus,
fieldset[disabled] .btn-info:focus,
.btn-info.disabled.focus,
.btn-info[disabled].focus,
fieldset[disabled] .btn-info.focus {
  background-color: #5bc0de;
  border-color: #46b8da;
}
.btn {
    border-radius: 3px;
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid transparent;
}
.btn-info .badge {
  color: #5bc0de;
  background-color: #fff;
}
.btn.btn-flat {
    border-radius: 0;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    border-width: 1px;
}
</style>
