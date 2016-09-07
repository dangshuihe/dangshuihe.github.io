//var weidianUrl = window.sessionStorage.getItem("taobaoUrl");
//var taobaoUrl = UrlParm.parm("taobaoUrl");
 Bmob.initialize("3a0692d0c1ddd3a9c03d0d6f2f89a1bf", "ab0a4a72bb6e44a3c89746a2da48a937");
var objectId = UrlParm.parm("objectId"); 
 var Clothes = Bmob.Object.extend("Clothes");
     
     function is_weixin() {
		    var ua = navigator.userAgent.toLowerCase();
		    if (ua.match(/MicroMessenger/i) == "micromessenger") {
		        return true;
		    } else {
		        return false;
		    }
		}
if(is_weixin()){
	document.getElementById("header").style.display="none"
	document.getElementById("content").style.background="url(../images/taobao_tips.png)";
	
}else{
	var taobaoUrl
	//创建查询对象，入口参数是对象类的实例
var queryClothes = new Bmob.Query(Clothes);
//查询单条数据，第一个参数是这条数据的objectId值
queryClothes.get(objectId, {
  success: function(clothes) {
    // 查询成功，调用get方法获取对应属性的值
   taobaoUrl = clothes.get("taobao");
// document.getElementById("i-taobao").setAttribute("src",taobaoUrl);
   mui.openWindow({
    /*url: '../seatides/page/popular.html?src='+"http://weidian.com/s/738018627?wfr=c", */
    url: taobaoUrl,
    id:'info'
});
  },
  error: function(object, error) {
    // 查询失败
  }
});
	
}
