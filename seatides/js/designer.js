mui.init();
Bmob.initialize("3a0692d0c1ddd3a9c03d0d6f2f89a1bf", "ab0a4a72bb6e44a3c89746a2da48a937");
var objectId = UrlParm.parm("objectId");
var role = UrlParm.parm("role");
console.log(role);
var user = Bmob.Object.extend("User");
var queryDesigner = new Bmob.Query(user);
//查询单条数据，第一个参数是这条数据的objectId值
queryDesigner.get(objectId, {
  success: function(object) {
    // 查询成功，调用get方法获取对应属性的值
    var img_qq = document.getElementById("img-qq");
    var qqNum = object.get("qq");
    img_qq.addEventListener('tap', function() {
  mui.openWindow({
    /*url: '../seatides/page/popular.html?src='+"http://weidian.com/s/738018627?wfr=c", */
    url: 'http://wpa.qq.com/msgrd?v=3&uin='+qqNum+'&site=qq&menu=yes',
    id:'info'
  });
   });
   var h5_title = document.getElementById("title");
   h5_title.innerText = object.get("nick");
    var img_designer = document.getElementById("img-designer");
    var img = object.get("avatar");
    img_designer.setAttribute("src",img["_url"]);
    var span_introduction = document.getElementById("span-introduction");
    var introduction = object.get("introduction");
    span_introduction.innerText = introduction; 
    if(role==1){
    getClothes(object);
    }else{
    	ul_pop_clothes.style.display="none";
    	document.getElementById("div-designer").style.display="none";
    }
   
  },
  error: function(object, error) {
    // 查询失败
  }
});

var ul_pop_clothes = document.getElementById("ul-pop-clothes");
var li_pop_clothes = document.getElementsByClassName("li-pop-clothes");
var queryClothesMark = 0;
function getClothes(designer){
	var clothes = Bmob.Object.extend("Clothes");
  var queryClothes = new Bmob.Query(clothes);
  queryClothes.equalTo("designer",designer)
	queryClothes.find({
  success: function(results) {
    console.log("共查询到 " + results.length + " 条记录");
    if(length==0){
    	document.getElementById("div-designer").style.display="none";
    	ul_pop_clothes.style.display="none";
    }
    // 循环处理查询到的数据
    for (var i = 0; i < results.length; i++) {
     var object = results[i];
      var clone_li_pop = li_pop_clothes[0].cloneNode(true);
     
     
      
      var tag_img = clone_li_pop.querySelector("a").querySelector("img");
      var tag_title = clone_li_pop.querySelector("a").getElementsByClassName("mui-media-body");
      var tag_price = tag_title[0].getElementsByClassName("popular-item-price");
      var tag_content = tag_title[0].getElementsByClassName("mui-ellipsis");
      tag_content[0].innerText = object.get("content");
//   console.log(tag_price[0]);
      tag_title[0].querySelector("div").innerHTML = object.get("title");
      
      tag_price[0].innerText = "￥"+object.get("price");
      var img = object.get("image");
      var id = object.id;
      tag_img.setAttribute("src",img["_url"]);
      
       clone_li_pop.addEventListener('tap', function() {
//				window.sessionStorage.setItem("test",2)
//				console.log(window.sessionStorage.getItem("test"));
  //打开关于页面
  mui.openWindow({
    /*url: '../seatides/page/popular.html?src='+"http://weidian.com/s/738018627?wfr=c", */
    url: '../page/product.html?objectId='+id,
    id:'info'
  });
  });

      ul_pop_clothes.appendChild(clone_li_pop);
     
    }
    if(queryClothesMark==0){
    	queryClothesMark = 1;
    	ul_pop_clothes.removeChild(li_pop_clothes[0]);
    }
  },
  error: function(error) {
    alert("查询失败: " + error.code + " " + error.message);
  }
});
}
