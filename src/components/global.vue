<script>
const info=''
export default
{
  info,
  conf(){
    if(window.localStorage.conf)
      return JSON.parse(window.localStorage.conf);
    else
      return {ver:'1.0',db:'http://db.ournet.club:2021/',tracker:'p4sp://2020@tracker.ournet.club:9700/',game:'p4sp://2020@tracker.ournet.club:9700/'}
      //return {ver:'1.0',db:'http://192.168.0.100:5000/',tracker:'p4sp://2020@192.168.0.100:9700/',game:'p4sp://2020@192.168.0.100:9700/'}
  },
  setConf(c){
      window.localStorage.conf=JSON.stringify(c);
  },
  ver(){
      return this.conf().ver
  },
  db(){
      return this.conf().db
  },
  tracker(){
      return this.conf().tracker
  },
  game(){
    return this.conf().game
  },
  mj(){
      return this.conf().game+'mj'
  },
  club(){
      return this.conf().game+'club_message'
  },
  getProfile(){
      if (window.localStorage.profile)
         return JSON.parse(window.localStorage.profile);

    return {name:'',avatar:'default',sex:0,birthday:'2000-01-01'};
  },
  setProfile(p){
      window.localStorage.profile=JSON.stringify(p);
  },
  saveLogin(p){
     window.localStorage.login=JSON.stringify(p);
  },
  loadLogin(){
        if (window.localStorage.login)
         return JSON.parse(window.localStorage.login);

        return null
  },
  getToken()
  {
    if (window.localStorage.login)
      return JSON.parse(window.localStorage.login).token;

      return null
  },
}
</script>