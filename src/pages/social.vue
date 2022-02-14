<template>
  <f7-page ptr name="social" @ptr:refresh="loadMore">
    <f7-navbar title="语音社区" style="margin:0px;">
        <f7-subnavbar style="margin-top:0px;">
          <f7-segmented raised  id="sub-tab">
            <f7-button @click="tagClick(1,'')" tab-link-active>收费</f7-button>
            <f7-button @click="tagClick(2,'')" >赚钱</f7-button>
            <f7-button @click="tagClick(3,'')" >免费</f7-button>
            <f7-button @click="tagClick(4,'')" >全部</f7-button>
          </f7-segmented>
        </f7-subnavbar>
    </f7-navbar>



<f7-list accordion-list style="padding:0px;margin:0px;">
  <f7-list-item accordion-item title="热搜标签">
    <f7-accordion-content>
        <f7-block style="padding:0px;margin:5px;" id="chips">
          <f7-chip  v-for="(it, index) in tags"
                    :key="it.id"
                    :text="it.name" 
                    :color="it.color" 
                    :outline="it.outline"
                    @click="tagClick(it.id,it.name)"
                    >
          </f7-chip>
        </f7-block>
    </f7-accordion-content>
  </f7-list-item>
  </f7-list>


    <f7-list media-list style="margin-top:0px;">
      <f7-list-item
        v-for="(item, index) in items"
        :key="index"
        :title="getTitle(item)"
        :after="getPrice(item)"
        :subtitle="getProfile(item)"
        :text="getDesp(item)"
        :disabled="item.online===0"
        @click="startVideoChat(item)">
        <img slot="media" :src="getAvatar(item)" :onerror="getDefault(item)" />
      </f7-list-item>

      <f7-block-footer>
        <p>下拉刷新 最多显示20条记录.</p>
      </f7-block-footer>
    </f7-list>

  </f7-page>
</template>
<script>
  export default {
    data() {
      return {
        sortType:0,
        online:0,
        talking:0,
        url:'',
        tags:[],
        items: [
          {
            uid:0,
            name: '读取用户信息...',
            sex:0,
            birthday:'2000-1-1',
            price:0,
            career:'模特',
            avatar: '../../static/img/1.jpg',
          }
        ],
        songs: ['Yellow Submarine', 'Don\'t Stop Me Now', 'Billie Jean', 'Californication'],
        authors: ['男,45 ¥8/分钟', '女,30 ¥2/分钟', '女,20 ¥10/分钟', '保密,25 ¥5/分钟'],
      };
    },
    mounted (){
        var $$=window.$f7.$
        $$('#sub-tab > a').on('click',function (e) {
            $$('#sub-tab > a').removeClass('tab-link-active')
            $$(this).addClass('tab-link-active')
        })


          //this.tags = [...this.def, ...this.tags];
          //this.tags = [...this.def, ...res.data];


          const self=this
          this.$http.get('/odata/Users?$filter=price gt 0')
          .then((res) => {
            self.items=res.data
          }).catch( e => {
            //self.result=e.response.data
          })

          this.$http.get('/api/users/social')
          .then((res) => {
            self.tags=res.data.tags
            self.online=res.data.online
            self.talking=res.data.talking
          }).catch( e => {
            //self.result=e.response.data
          })
    },
    computed:{
    },
    methods: {
      getAstro (str) {
        let r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
        let month = r[3]
        let day = r[4]
        let s = '魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯'
        let arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22]
        return s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2)
      },
      ages (str) {
        let r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
        if (r === null) {
          return false
        }
        let Y = new Date().getFullYear()
        return (Y - r[1])
      },
      getAvatar(p){
        return this.g.db()+'img/a/'+p.uid+'.jpg'
      },
      getPrice(p){
        return '$'+p.price
      },
      getProfile(p){
        let sex=p.sex===1?'男':'女'
        return p.career+' ' + sex+' '+this.ages(p.birthday)+'岁 '+this.getAstro(p.birthday) +'座 '
      },
      getTitle(p){   
        return p.name +'('+p.uid+')'
      },
      getDesp(p){
         if (p.desp === null || p.desp === undefined || p.desp === '')
            return 'This person is lazy and has no comments!'
          else
            return p.desp
      },
      getDefault(p)
      {
          if(p.sex===0)
            return  'this.src="' + require('../assets/img/sex0.jpg') + '"'
         else
            return  'this.src="' + require('../assets/img/sex1.jpg') + '"'
      },
      loadMore(done) {
        const self=this
        setTimeout(() => {
        /*
          const picURL = `https://cdn.framework7.io/placeholder/abstract-88x88-${(Math.floor(Math.random() * 10) + 1)}.jpg`;
          const song = self.songs[Math.floor(Math.random() * self.songs.length)];
          const author = self.authors[Math.floor(Math.random() * self.authors.length)];
          self.items.push({
            name: song,
            desp:author,
            avatar: picURL,
          });
          */

          const self=this
        var url='/odata/Users'
          if(this.sortType===1)
            url='/odata/Users?$filter=price gt 0'
          else if(this.sortType===2)
            url='/odata/Users?$filter=price eq 0'
          else if(this.sortType===3)
            url='/odata/Users?$filter=price lt 0'

          this.$http.get(url)
          .then((res) => {
            self.items=res.data
          }).catch( e => {
          })

          done();
        }, 1000);
      },
     startVideoChat(p)
     { 
      /* 测试打开视频对话
        let ask={cmd:'ask',type:1,from:{uid:123,name:'张三三',avatar:'1.jpg',birthday:'2000-1-1'}}
        window.nativeCall(JSON.stringify(ask))
        return
        */
        let t=1
        if(this.g.loadLogin()){
          let c={cmd:'talk',type:t,to:p,screen:'portrait'}
          this.startGame('81_VideoChat',c)
        }else
        {
          this.showToastIcon('请先登录服务器')
        }
     },
     tagClick(id,name){
          const self=this
          var url='/odata/Users'
          if(id===1)
            url+='?$filter=price gt 0'
          else if(id===2)
            url+='?$filter=price lt 0'
          else if(id===3)
            url+='?$filter=price eq 0'
          else if(id===4)
            url=url
          else if(id==5)
            url+='?$filter=sex eq 1'
          else if(id==6)
            url+='?$filter=sex eq 0'
          else
            url+='/'+id 

          this.url=url
          this.$http.get(this.url)
          .then((res) => {
            self.items=res.data
          }).catch( e => {
            self.items=null
          })
     },
     showToastIcon(m) {
        const self = this;
        // Create toast
        if (!self.toastIcon) {
          self.toastIcon = self.$f7.toast.create({
            icon: self.$theme.ios ? '<i class="f7-icons">start</i>' : '<i class="material-icons">start</i>',
            text: m,
            position: 'center',
            closeTimeout: 2000,
          });
        }
        // Open it
        self.toastIcon.open();
      },

    },
  };
</script>

<style scoped>
#social .link-active{
  color:green;
}
.item-media img{
   width:70px;
   border-radius:5px;-webkit-border-radius:5px;-moz-border-radius:5px;
}
</style>