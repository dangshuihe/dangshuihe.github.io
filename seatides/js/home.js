    mui.init();
    
   Bmob.initialize("3a0692d0c1ddd3a9c03d0d6f2f89a1bf", "ab0a4a72bb6e44a3c89746a2da48a937");
		var slider = mui("#slider");
		slider.slider({
					interval: 5000
				});
				
	
			(function($) {
				$('.mui-scroll-wrapper').scroll({
					indicators: true //是否显示滚动条
				});
				
				
				var item1 = document.getElementById('ul-pop-clothes');
				var item2 = document.getElementById('ul-demo-clothes');
				
				var item3 = document.getElementById('ul-serious-clothes');
				var html1 = item1.innerHTML;
				var html2;
				var html3;
				
				//控制页面滑动条变化
//			    var sliderProgressBar = document.getElementById("sliderProgressBar");
                var mark = 0;
				document.getElementById('slider-sort').addEventListener('slide', function(e) {
					if (e.detail.slideNumber === 0) {
			
						if(mark==1){
							html2 = item2.innerHTML;
						item2.innerHTML="";
						}else{
							html3 = item3.innerHTML;
						item3.innerHTML="";
						}
						console.log(item2);
						item1.innerHTML = html1;
						sliderProgressBar.style.marginLeft = "0";
						mark = 0;
					}else if (e.detail.slideNumber === 1) {
//						item2.innerHTML = document.getElementById('item1mobile').innerHTML;	
						if(mark==0){
							html1 = item1.innerHTML;
						item1.innerHTML="";
						}else{
							html3 = item3.innerHTML;
			            item3.innerHTML="";
			           }
						item2.innerHTML = html2;
							if(queryDemoMark==0){
								 queryDemoFun();
							}
						
						if (item2.querySelector('.mui-loading')) {
							setTimeout(function() {
							
							
//								item2.querySelector('.mui-scroll').innerHTML = html2;
								
							}, 500);
						}
						sliderProgressBar.style.marginLeft = "33.3%";
						mark = 1;
						
					} else if (e.detail.slideNumber === 2) {
						
						
						if(mark==0){
						html1 = item1.innerHTML;
						item1.innerHTML="";
						}else{
						html2 = item2.innerHTML;
						item2.innerHTML="";
						}
						/*item1.remove();
						item2.remove();*/
						if (item3.querySelector('.mui-loading')) {
							setTimeout(function() {
								console.log(html3)
								item3.innerHTML = html3;
//								item3.querySelector('.mui-scroll').innerHTML = html3;
								
							}, 500);
							
						}
						mark = 2;
						sliderProgressBar.style.marginLeft = "66.6%";
					}
				});
				
				$.ready(function() {
					//循环初始化所有下拉刷新，上拉加载。
					$.each(document.querySelectorAll('.popular'), function(index, pullRefreshEl) {
						$(pullRefreshEl).pullToRefresh({
							down: {
								callback: function() {
									var self = this;
									setTimeout(function() {
										/*var ul = self.element.querySelector('.mui-table-view');
										ul.insertBefore(createFragment(ul, index, 10, true), ul.firstChild);*/
										self.endPullDownToRefresh();
										switch(mark){
											case 0:
											queryClothesMark = 0;
											 while(ul_pop_clothes.hasChildNodes()) //当div下还存在子节点时 循环继续
                                              {
                                               ul_pop_clothes.removeChild(ul_pop_clothes.firstChild);
                                                 }
											fun_query_clothes();										
											break;
											case 1:
											queryDemoMark = 0;
											 while(ul_demo_clothes.hasChildNodes()) //当div下还存在子节点时 循环继续
                                              {
                                               ul_demo_clothes.removeChild(ul_demo_clothes.firstChild);
                                                 }
											queryDemoFun();
											break
											case 2:
											console.log("zzzzcqqqqqqqqcccccccczzzz");
											break;
										}
									
									}, 1000);
								}
							},
							up: {
								callback: function() {
									var self = this;
									setTimeout(function() {
									/*	var ul = self.element.querySelector('.mui-table-view');
										ul.appendChild(createFragment(ul, index, 5));*/
										switch(mark){
											case 0:
											
											fun_query_clothes();
											break;
											case 1:
											queryDemoFun();
											break
											case 2:
											console.log("2zzzzcqqqqqqqqcccccccczzzz");
											break;
										}
										self.endPullUpToRefresh();
									}, 1000);
								}
							}
						});
					});
					});
			})(mui);
			
		
		
			
//			console.log(window.sessionStorage.getItem("test"));
		/*	document.getElementById('tu').addEventListener('tap', function(var t) {
				window.sessionStorage.setItem("test",2)
//				console.log(window.sessionStorage.getItem("test"));
  //打开关于页面
  mui.openWindow({
    url: '../seatides/page/popular.html?name=tt&test=zz', 
    id:'info'
  });
});*/

//获取广告数据
var ad = Bmob.Object.extend("Config");
var queryAd = new Bmob.Query(ad);
//var silderLoop = document.getElementsByClassName("mui-slider-loop");
//var silderLoop = document.getElementById("uuuu");

// 查询所有数据
queryAd.find({
  success: function(results) {
    console.log("共查询到 " + results.length + " 条记录");
    // 循环处理查询到的数据
    for (var i = 0; i < results.length; i++) {
      var object = results[i];
      var adFirstDf = document.getElementById("adFirstDf");
      var adFirst = document.getElementById("adFirst");
      var adSecond = document.getElementById("adSecond");
      var adThird = document.getElementById("adThird");
      var adThirdDf = document.getElementById("adThirdDf");
      
      var adFirstUrlDf = document.getElementById("adFirstUrlDf");
      var adFirstUrl = document.getElementById("adFirstUrl");
      var adSecondUrl = document.getElementById("adSecondUrl");
      var adThirdUrl = document.getElementById("adThirdUrl");
      var adThirdUrlDf = document.getElementById("adThirdUrlDf");
      
      var ad1 = eval(object.get("adFirst"));
       adFirstDf.setAttribute("src",ad1["_url"]);
       adFirst.setAttribute("src",ad1["_url"]);
       var ad2 = eval(object.get("adSecond"));
       adSecond.setAttribute("src",ad2["_url"]);
       var ad3 = eval(object.get("adThird"));
       adThird.setAttribute("src",ad3["_url"]);
       adThirdDf.setAttribute("src",ad3["_url"]);
       
       adFirstUrl.setAttribute("href",object.get("adFirstUrl"));
       adSecondUrl.setAttribute("href",object.get("adSecondUrl"));
       adThirdUrl.setAttribute("href",object.get("adThirdUrl"));
      
    }
  },
  error: function(error) {
    alert("查询失败: " + error.code + " " + error.message);
  }
});		

//首页爆款
var home_one = document.getElementsByClassName('home-one');
var home_one_clone = home_one[0].cloneNode(true);
for (var i=0;i<3;i++) {
	home_one_clone = home_one[0].cloneNode(true);
	home_one[0].parentNode.appendChild(home_one_clone);
}
var home_one_h5 = document.getElementsByClassName('home-one-h5');

	

var home_one_child =  document.getElementsByClassName('home-one-child');

//No model_df = home_one_child[0];s
var model = Bmob.Object.extend("Model");
var queryModel = new Bmob.Query(model);
queryModel.exists("popular");
queryModel.ascending("popular");

// 查询所有数据
queryModel.find({
  success: function(results) {
    // 循环处理查询到的数据
    console.log("共查询到 " + results.length + " 条记录");
    for (var i = 0; i < results.length; i++) {
      var object = results[i];
      var modelClone= home_one_child[0].cloneNode(true);
      var ad1 = eval(object.get("image"));
      var a = modelClone.querySelector("a");
//    a.addEventListener()
      a.onclick = function(){
      	mui.openWindow(object.get("weidianUrl"));
      }
      a.querySelector("img").setAttribute("src",ad1["_url"]);
      
       home_one_child[0].parentNode.appendChild(modelClone);
       console.log(ad1);
//     var io = home_one_child[0].nextSibling.childNodes;
      /*if(model.querySelector("a")!=null){
      	console.log(model.querySelector("a"));
      }*/
//    ("src",ad1["_url"]);
       
    
       
    }
    home_one_child[0].parentNode.removeChild(home_one_child[0]);
  },
  error: function(error) {
    alert("查询失败: " + error.code + " " + error.message);
  }
});
var popular_ul =  document.getElementsByClassName('popular-ul');
var k = 1;
for (var j = 0; j < 3; j++){
var result = Bmob.Object.extend("Result");
var queryResult = new Bmob.Query(result);
queryResult.equalTo("sort", j);
queryResult.exists("popular");
queryResult.ascending("popular");

// 查询所有数据
queryResult.find({
success: function(results) {
	
    // 循环处理查询到的数据
//  console.log("共查询到 " + results.length + " 条记录");
    
    for (var i = 0; i < results.length; i++) {
      var object = results[i];
      homeSort(object,k);
//     var io = home_one_child[0].nextSibling.childNodes;
      /*if(model.querySelector("a")!=null){
      	console.log(model.querySelector("a"));
      }*/
//    ("src",ad1["_url"]);
         
    }
    popular_ul[k].removeChild(popular_ul[k].querySelector("li"));
    k++;
},
error: function(error) {
    alert("查询失败: " + error.code + " " + error.message);
}
});
}
function homeSort(object,order){
	var modelClone= home_one_child[order].cloneNode(true);
      var ad1 = eval(object.get("image"));
      var a = modelClone.querySelector("a");
      switch(object.get("sort")){
      	case 0:
      	home_one_h5[order].innerHTML = "豆蔻年华";
      	break;
      	case 1:
      	home_one_h5[order].innerHTML = "社团风采";
      	break;
      	case 2:
      	home_one_h5[order].innerHTML = "学院风范";
      	break;
      }
      
//    a.addEventListener()
      a.onclick = function(){
      	mui.openWindow(object.get("weidianUrl"));
      }
      a.querySelector("img").setAttribute("src",ad1["_url"]);
      
        popular_ul[order].appendChild(modelClone);
}
            /* //切换到指定的选项卡
                    mui.trigger(document.getElementById("defaultTab"), 'touchstart');
                    mui.trigger(document.getElementById("defaultTab"), 'tap');
                    

*/
/*
 * 这是分类页面数据获取
 */
var ul_pop_clothes = document.getElementById("ul-pop-clothes");
var li_pop_clothes = document.getElementsByClassName("li-pop-clothes");


var cothes = Bmob.Object.extend("Clothes");
var queryClothes = new Bmob.Query(cothes);
queryClothes.limit(10);
queryClothes.equalTo("type",1);
var queryClothesMark = 0;
function fun_query_clothes(){
//	console.log("mjshkd"+queryClothesMark);
	queryClothes.skip(queryClothesMark*10);
	queryClothes.find({
  success: function(results) {
//  console.log("共查询ccc到 " + results.length + " 条记录clothes");
    // 循环处理查询到的数据
    if(results.length!=0){
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
      clone_li_pop.querySelector("a").setAttribute("href",'../seatides/page/product.html?objectId='+id);
//     clone_li_pop.addEventListener('tap', function() {
////				window.sessionStorage.setItem("test",2)
////				console.log(window.sessionStorage.getItem("test"));
////打开关于页面
//mui.openWindow({
//  /*url: '../seatides/page/popular.html?src='+"http://weidian.com/s/738018627?wfr=c", */
//  url: '../seatides/page/product.html?objectId='+id,
//  id:'info'
//});
//});

      ul_pop_clothes.appendChild(clone_li_pop);
     
    }
    if(queryClothesMark==0){
    	
    	ul_pop_clothes.removeChild(li_pop_clothes[0]);
    }
   }
    queryClothesMark=queryClothesMark+1;
  },
  error: function(error) { 
  }
});

}
fun_query_clothes();//开始执行查询爆款


var ul_demo_clothes = document.getElementById("ul-demo-clothes");
var model = Bmob.Object.extend("Model");
var queryDemo = new Bmob.Query(model);
queryDemo.limit(10);
var queryDemoMark = 0;
function queryDemoFun(){
	queryDemo.skip(10*queryDemoMark);
	queryDemo.find({
  success: function(results) {
    // 循环处理查询到的数据
    if(results.length!=0){
    for (var i = 0; i < results.length; i++) {
      var object = results[i];
      var clone_li_pop = li_pop_clothes[0].cloneNode(true);
      var tag_img = clone_li_pop.querySelector("a").querySelector("img");
      var tag_title = clone_li_pop.querySelector("a").getElementsByClassName("mui-media-body");
      var tag_price = tag_title[0].getElementsByClassName("popular-item-price");
      tag_title[0].querySelector("div").innerHTML = object.get("title");
      
      tag_price[0].innerText = "";
      var img = object.get("image");
      tag_img.setAttribute("src",img["_url"]);
      
     

      ul_demo_clothes.appendChild(clone_li_pop);
     
    }
    if(queryDemoMark==0){
    	
    	ul_demo_clothes.removeChild(ul_demo_clothes.firstChild);
    }
    }
    queryDemoMark++;
  },
  error: function(error) { 
  }
});
}

/**
 * 这个是设计师页面板块
 */
var ul_designer = document.getElementById("ul-designer");
var  li_designer= document.getElementsByClassName("li-designer");
var user = Bmob.Object.extend("User");
var queryDesigner = new Bmob.Query(user);
queryDesigner.limit(10);
queryDesigner.equalTo("role",1);
var queryDesignerMark=0;
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
    clone_designer.addEventListener('tap', getHandler('../seatides/page/designer.html?objectId='+object.id+"&role=1"));
     a_qq.setAttribute("href",'http://wpa.qq.com/msgrd?v=3&uin='+qqNum+'&site=qq&menu=yes');
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

function customerList(){
	 mui.openWindow({
     url: '../seatides/page/customerlist.html',
    id:'info'
  });
}

function fans() {
	 mui.openWindow({
     url: 'http://wap.webei.cn/7c55656012',
    id:'info'
  });
}

function notice(){
	mui.openWindow({
     url: '../seatides/page/noticelist.html',
    id:'info'
  });
}
