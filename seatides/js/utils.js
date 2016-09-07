UrlParm = function() { // url参数    
  var data, index;    
  (function init() {    
    data = [];    
    index = {};    
    var u = window.location.search.substr(1);    
    if (u != '') {    
      var parms = decodeURIComponent(u).split('&');    
      for (var i = 0, len = parms.length; i < len; i++) {    
        if (parms[i] != '') {    
          var p = parms[i].split("=");    
          if (p.length == 1 || (p.length == 2 && p[1] == '')) {// p | p=    
            data.push(['']);    
            index[p[0]] = data.length - 1;    
          } else if (typeof(p[0]) == 'undefined' || p[0] == '') { // =c | =    
            data[0] = [p[1]];    
          } else if (typeof(index[p[0]]) == 'undefined') { // c=aaa    
            data.push([p[1]]);    
            index[p[0]] = data.length - 1;    
          } else {// c=aaa    
            data[index[p[0]]].push(p[1]);    
          }    
        }    
      }    
    }    
  })();    
  return {    
    // 获得参数,类似request.getParameter()    
    parm : function(o) { // o: 参数名或者参数次序    
      try {    
        return (typeof(o) == 'number' ? data[o][0] : data[index[o]][0]);    
      } catch (e) {    
      }    
    },    
    //获得参数组, 类似request.getParameterValues()    
    parmValues : function(o) { //  o: 参数名或者参数次序    
      try {    
        return (typeof(o) == 'number' ? data[o] : data[index[o]]);    
      } catch (e) {}    
    },    
    //是否含有parmName参数    
    hasParm : function(parmName) {    
      return typeof(parmName) == 'string' ? typeof(index[parmName]) != 'undefined' : false;    
    },    
    // 获得参数Map ,类似request.getParameterMap()    
    parmMap : function() {    
      var map = {};    
      try {    
        for (var p in index) {  map[p] = data[index[p]];  }    
      } catch (e) {}    
      return map;    
    }    
  }    
}(); 

var getHandler = function(nextUrl) {
	
  // 这儿出现了一个新的scope
  return function(){
   mui.openWindow({
    /*url: '../seatides/page/popular.html?src='+"http://weidian.com/s/738018627?wfr=c", */
    url: nextUrl,
    id:'info'
});   
  };
};

var handleWeidian = function(nextUrl,weidianUrl){
	window.sessionStorage.setItem("weidianUrl",weidianUrl);
return function(){
   mui.openWindow({
    /*url: '../seatides/page/popular.html?src='+"http://weidian.com/s/738018627?wfr=c", */
    url: nextUrl,
    id:'info'
});   
  };
};

 
function Base64() {
 
	// private property
	_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
 
	// public method for encoding
	this.encode = function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = _utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output +
			_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
			_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	}
 
	// public method for decoding
	this.decode = function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = _utf8_decode(output);
		return output;
	}
 
	// private method for UTF-8 encoding
	_utf8_encode = function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
		return utftext;
	}
 
	// private method for UTF-8 decoding
	_utf8_decode = function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
}