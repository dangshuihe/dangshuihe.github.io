mui.init()
var slider = mui("#slider");
		slider.slider({
					interval: 5000
});
 Bmob.initialize("3a0692d0c1ddd3a9c03d0d6f2f89a1bf", "ab0a4a72bb6e44a3c89746a2da48a937");
 
 var objectId = UrlParm.parm("objectId"); 
 var Clothes = Bmob.Object.extend("Clothes");
 
//创建查询对象，入口参数是对象类的实例
var queryClothes = new Bmob.Query(Clothes);
//查询单条数据，第一个参数是这条数据的objectId值
queryClothes.get(objectId, {
  success: function(clothes) {
    // 查询成功，调用get方法获取对应属性的值
    var adFirstDf = document.getElementById("adFirstDf");
    var adFirst = document.getElementById("adFirst");
    var adSecond = document.getElementById("adSecond");
    var adThird = document.getElementById("adThird");
    var adThirdDf = document.getElementById("adThirdDf");
    var h1Title = document.getElementById("title");
    var spanObjectId = document.getElementById("span-objectid");
    var spanPrice = document.getElementById("span-price");
    var aTaobao = document.getElementById("a-taobao");
    var aWeidian = document.getElementById("a-weidian");
    var pContent = document.getElementById("p-content");
    var pNick = document.getElementById("p-nick");
    var imgDesigner = document.getElementById("img-designer");
    
    /*var relation = clothes.relation("designer");
    relation.query().find({
    success: function(list) {
    // list contains the posts that the current user likes.
    console.log(list);
      }
    });*/
    
    var title = clothes.get("title");
    var imageFirst = clothes.get("imageFirst");
    var imageSecond = clothes.get("imageSecond");
    var imageThird = clothes.get("imageThird");
//  var id = clothes.get("objectId");
    var price = clothes.get("price");
    var weidianUrl = clothes.get("weidianUrl");
    var taobaoUrl = clothes.get("taobao");
    var content = clothes.get("content");
    var designer = clothes.get("designer");
    designer.fetch({
    success: function(designer) {
    var nick = designer.get("nick");
    pNick.innerText = nick;
    var avatar = designer.get("avatar");
    imgDesigner.setAttribute("src",avatar["_url"]); 
      }
   });
    
    adFirstDf.setAttribute("src",imageFirst["_url"]);
    adFirst.setAttribute("src",imageFirst["_url"]);
    adSecond.setAttribute("src",imageSecond["_url"]); 
    adThird.setAttribute("src",imageThird["_url"]); 
    adThirdDf.setAttribute("src",imageThird["_url"]); 
    
    pContent.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+content;
    h1Title.innerText = title;
    spanObjectId.innerText = "编号:  "+objectId;
    spanPrice.innerText = "￥"+price;
    console.log(taobaoUrl);
    aTaobao.addEventListener('tap', function() {
  //打开关于页面
  mui.openWindow({
    url: taobaoUrl, 
    id:'info'
  });
  });
  aWeidian.addEventListener('tap', function() {
  //打开关于页面
  mui.openWindow({
    url: weidianUrl, 
    id:'info'
  });
  }); 
   
  },
  error: function(object, error) {
    // 查询失败
  }
});