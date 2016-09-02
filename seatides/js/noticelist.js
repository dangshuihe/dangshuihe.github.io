mui.init();
Bmob.initialize("3a0692d0c1ddd3a9c03d0d6f2f89a1bf", "ab0a4a72bb6e44a3c89746a2da48a937");
var ul_article= document.getElementById("ul-article");

var li_article = document.getElementsByClassName("li-article");
var html = ul_article.innerHTML;
var article = Bmob.Object.extend("Article");
var query_article = new Bmob.Query(article);
query_article.limit(10);
var query_article_mark= 0;
function fun_query_article(){
  query_article.skip(10*query_article_mark);
query_article.find({
  success: function(results) {
  	if(results.length!=0){
    console.log("共查询到 " + results.length + " 条记录designer");
    // 循环处理查询到的数据
    for (var i = 0; i < results.length; i++) {
      var object = results[i];
      var clone_article = li_article[0].cloneNode(true);     
      var div1 = clone_article.querySelector("div");
      var div_list = div1.querySelectorAll("div");
      var title = object.get("title");
      
      var profile = object.get("profile");
      div_list[0].innerHTML = title;
      
      var img = object.get("image");
      div_list[1].style.backgroundImage="url("+img['_url']+")"
      
      var p_list = div_list[2].querySelector("div").querySelectorAll("p");
      p_list[0].innerText = object.updatedAt;
      p_list[1].innerText = object.get("profile"); 
      clone_article.addEventListener("tap",getHandler(object.get("contentUrl")));
      ul_article.appendChild(clone_article);
    }
    if(query_article_mark==0){
    	
    	ul_article.removeChild(li_article[0]);
    }
   }
  	query_article_mark++;
  },
  error: function(error) { 
  }
});
}

fun_query_article();
(function($) {
$.ready(function() {
					//循环初始化所有下拉刷新，上拉加载。
					$.each(document.querySelectorAll('.mui-content'), function(index, pullRefreshEl) {
						$(pullRefreshEl).pullToRefresh({
							down: {
								callback: function() {
									var self = this;
									setTimeout(function() {
										/*var ul = self.element.querySelector('.mui-table-view');
										ul.insertBefore(createFragment(ul, index, 10, true), ul.firstChild);*/
										self.endPullDownToRefresh();
											query_article_mark = 0;
											
											
//											li_article[0] = ul_article.firstChild();
											 while(ul_article.hasChildNodes()) //当div下还存在子节点时 循环继续
                       {
                         ul_article.removeChild(ul_article.firstChild);
                        }
                       ul_article.innerHTML = html;
                       /*li_article = document.getElementsByClassName("li-article");
                       console.log(li_article[0] );*/
											fun_query_article();
										
									}, 1000);
								}
							},
							up: {
								callback: function() {
									var self = this;
									setTimeout(function() {
									/*	var ul = self.element.querySelector('.mui-table-view');
										ul.appendChild(createFragment(ul, index, 5));*/
									 fun_query_article();
										self.endPullUpToRefresh();
									}, 1000);
								}
							}
						});
					});
					});
			})(mui);