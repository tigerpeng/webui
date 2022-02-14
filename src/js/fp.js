const fp={}

fp.name='c++ 跨平台客户端'
fp.desp='放全局对象 管理客户端代码--测试中'

fp.startGame = function (g,p,l=true) {
  //alert(JSON.stringify(p))
  let ac = btoa(encodeURI(JSON.stringify(p)))
  try{
      if(l)
        Android.startGame(g+":"+ac)
      else
        Android.startGame(g+"|"+ac)
    }catch(e){
		alert(e.message)
    }
};

export fp;