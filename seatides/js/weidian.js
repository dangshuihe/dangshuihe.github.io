var weidianUrl = window.sessionStorage.getItem("weidianUrl");

var type = UrlParm.parm("type");
switch(parseInt(type)){
	case 0:
	window.sessionStorage.setItem("itemMark",0);
	var str = UrlParm.parm("weidianUrl");
	var b = new Base64(); 
	var url = b.decode(str);
	weidianUrl = url;
	break;
	case 1:
	window.sessionStorage.setItem("itemMark",1);
	break;
	case 2:
	window.sessionStorage.setItem("itemMark",1);
	var str = UrlParm.parm("weidianUrl");
	var b = new Base64(); 
	var url = b.decode(str);
	weidianUrl = url;
	break;
	case 4:
	weidianUrl = UrlParm.parm("weidianUrl");
	break;
}
document.getElementById("i-weidian").setAttribute("src",weidianUrl);