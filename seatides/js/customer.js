Bmob.initialize("3a0692d0c1ddd3a9c03d0d6f2f89a1bf", "ab0a4a72bb6e44a3c89746a2da48a937");
mui.init();
//客服人员
var ul_designer = document.getElementById("ul-designer");
var  li_designer= document.getElementsByClassName("li-designer");
var user = Bmob.Object.extend("User");
var queryDesigner = new Bmob.Query(user);
queryDesigner.limit(10);
queryDesigner.equalTo("role",2);
var queryDesignerMark=0;
var arrayObj = new Array(); 
queryDesigner.find({
  success: function(results) {
    console.log("共查询到 " + results.length + " 条记录designer");
    // 循环处理查询到的数据
    for (var i = 0; i < results.length; i++) {
      var object = results[i];
      var clone_designer = li_designer[0].cloneNode(true);
      var div1 = clone_designer.querySelector("div").querySelector("div");
      var divlist = div1.querySelectorAll("div");
      var tag_img = divlist[0].querySelector("img");
      var img = object.get("avatar");
      tag_img.setAttribute("src",img["_url"]);
      var div2 = divlist[1].querySelector("div");
      var qq = divlist[1].querySelector("p");
      var qqNum = object.get("qq");
      qq.innerHTML = "QQ:"+qqNum 
      var tag_nick = div2.querySelector("h4");
      tag_nick.innerText = object.get("nick");
      var tag_profile = div2.querySelector("span");
      tag_profile.innerText = object.get("profile");
      var a_qq = div1.querySelector("a");
      var id = object.id;
      arrayObj.push(id);
      clone_designer.addEventListener('tap', getHandler('../page/designer.html?objectId='+id+"&role=2"));
     a_qq.setAttribute("href",'http://wpa.qq.com/msgrd?v=3&uin='+qqNum+'&site=qq&menu=yes');
//    div1.clickclick(function() {
//mui.openWindow({
//  /*url: '../seatides/page/popular.html?src='+"http://weidian.com/s/738018627?wfr=c", */
//  url: '../page/designer.html?objectId='+id+"&role=2;",
//  id:'info'
//});})
//    clone_designer.querySelector("div").querySelector("a").setAttribute("href",'../page/designer.html?objectId='+id+"&role=2;");
      
   
//    div1.setAttribute("href",'mqqwpa://im/chat?chat_type=wpa&uin='+qqNum+'&version=1&src_type=web&web_src=oicqzone.com');
//    a_qq.addEventListener('tap', function() {
//mui.openWindow({
//  /*url: '../seatides/page/popular.html?src='+"http://weidian.com/s/738018627?wfr=c", */
//  url: 'http://wpa.qq.com/msgrd?v=3&uin='+qqNum+'&site=qq&menu=yes',
//  id:'info'
//});
//    });
      ul_designer.appendChild(clone_designer);
      
    }
    if(queryDesignerMark==0){
    	queryDesignerMark = 1;
    	ul_designer.removeChild(li_designer[0]);
    }
  },
  error: function(error) { 
  }
});

