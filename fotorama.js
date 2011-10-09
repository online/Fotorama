/* Fotorama v1.0 (1159) http://fotoramajs.com/ */
function disableSelection(a){a.mousemove(function(a){a.preventDefault()}).mousedown(function(a){a.preventDefault()})}function getBoxShadowColor(a){var b="0 0 10px "+a;return{"-moz-box-shadow":b,"-webkit-box-shadow":b,"-o-box-shadow":b,"box-shadow":b}}function getDuration(a){var b=a+"ms";return{"-moz-transition-duration":b,"-webkit-transition-duration":b,"-o-transition-duration":b,"transition-duration":b}}function getTranslate(a){var b="translate3d("+a+"px, 0, 0)";return{"-moz-transform":b,"-webkit-transform":b,"-o-transform":b,transform:b}}window.Modernizr=function(a,b,c){function i(a){p.cssText=a}function h(a,b){return i(s.join(a+";")+(b||""))}function g(a,b){return typeof a===b}function f(a,b){return!!~(""+a).indexOf(b)}function e(a,b){for(var d in a)if(p[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function d(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+t.join(c+" ")+c).split(" ");return e(d,b)}var j="2.0.6",k={},l=b.documentElement,m=b.head||b.getElementsByTagName("head")[0],n="modernizr",o=b.createElement(n),p=o.style,q,r=Object.prototype.toString,s=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),t="Webkit Moz O ms Khtml".split(" "),u={},v={},w={},x=[],y=function(a,c,d,e){var f,g,h,i=b.createElement("div");if(parseInt(d,10))while(d--)h=b.createElement("div"),h.id=e?e[d]:n+(d+1),i.appendChild(h);f=["­","<style>",a,"</style>"].join(""),i.id=n,i.innerHTML+=f,l.appendChild(i),g=c(i,a),i.parentNode.removeChild(i);return!!g},z,A={}.hasOwnProperty,B;!g(A,c)&&!g(A.call,c)?B=function(a,b){return A.call(a,b)}:B=function(a,b){return b in a&&g(a.constructor.prototype[b],c)};var C=function(a,c){var d=a.join(""),e=c.length;y(d,function(a,c){var d=b.styleSheets[b.styleSheets.length-1],f=d.cssRules&&d.cssRules[0]?d.cssRules[0].cssText:d.cssText||"",g=a.childNodes,h={};while(e--)h[g[e].id]=g[e];k.csstransforms3d=h.csstransforms3d.offsetLeft===9},e,c)}([,["@media (",s.join("transform-3d),("),n,")","{#csstransforms3d{left:9px;position:absolute}}"].join("")],[,"csstransforms3d"]);u.csstransforms3d=function(){var a=!!e(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]);a&&"webkitPerspective"in l.style&&(a=k.csstransforms3d);return a},u.csstransitions=function(){return d("transitionProperty")};for(var D in u)B(u,D)&&(z=D.toLowerCase(),k[z]=u[D](),x.push((k[z]?"":"no-")+z));i(""),o=q=null,k._version=j,k._prefixes=s,k._domPrefixes=t,k.testProp=function(a){return e([a])},k.testAllProps=d,k.testStyles=y;return k}(this,this.document);(function(a){var b="ontouchstart"in document;var c=Modernizr.csstransforms3d&&Modernizr.csstransitions;var d=200;var e=true;a.fn.fotorama=function(f){var g=a.extend({width:null,height:null,transitionDuration:333,touchStyle:true,backgroundColor:null,margin:0,minPadding:10,preload:3,zoomToFit:true,arrows:true,arrowsColor:null,thumbs:true,thumbsBackgroundColor:null,thumbColor:null,thumbsPreview:true,thumbSize:48,thumbMargin:0,thumbBorderWidth:3,thumbBorderColor:null,caption:false},f);this.each(function(){function bz(){if(e){if(bf>n){bc.addClass("fotorama__thumbs_shadow")}}bs(0,false)}function by(a,b,c){function d(){if(r){N.css({left:b*(n+g.margin)+n/2});bx=setTimeout(function(){N.show()},c)}}clearTimeout(bx);switch(a){case"loading":d();f.addClass("fotorama_loading").removeClass("fotorama_error");clearInterval(O);if(BASE64Flag){N.css({backgroundImage:"url("+_SPINNER+")"})}O=setInterval(Q,100);break;case"error":d();f.addClass("fotorama_error").removeClass("fotorama_loading");clearInterval(O);if(BASE64Flag){N.css({backgroundImage:"url("+_ERROR+")",backgroundPosition:"24px 24px"})}else{N.text("?")}break;case"loaded":f.removeClass("fotorama_loading fotorama_error");bx=setTimeout(function(){N.hide()},c);clearInterval(O);break}}function bw(){if(n&&p&&!r){f.css({width:n});K.add(_).css({width:n,height:p});if(!g.touchStyle){L.css({width:n,height:p})}else{t=(n+g.margin)*k-g.margin;L.css({width:t,height:p})}if(g.thumbs){bc.css({width:n,visibility:"visible"})}if(g.arrows){T.add(U).css({top:p/2})}if(e&&g.touchStyle){R.css({height:p})}N.css({top:p/2});bz();r=true}}function bs(a,b){if(bf){var d=ba.position().left;var f=ba.data("width");if(!f){bh.hide()}else{bh.show();if(bf>n){var h=d+f/2;var i=n/2;var j=bk.index(ba);var l=j-bb;var m=be.position().left;if(b&&(l>0&&b>i*.75||l<0&&b<i*1.25)){var p;if(l>0){p=j+1}else{p=j-1}if(p<0){p=0}else if(p>k-1){p=k-1}if(j!=p){var q=bk.eq(p);h=q.position().left+q.data("width")/2;i=b}}var r=-(bf-n);var s=Math.round(-(h-i)+g.thumbMargin);if(l>0&&s>m||l<0&&s<m){s=m}if(s<=r){s=r;if(e){bc.removeClass("fotorama__thumbs_shadow_no-left").addClass("fotorama__thumbs_shadow_no-right")}}else if(s>=g.thumbMargin){s=g.thumbMargin;if(e){bc.removeClass("fotorama__thumbs_shadow_no-right").addClass("fotorama__thumbs_shadow_no-left")}}else{if(e){bc.removeClass("fotorama__thumbs_shadow_no-left fotorama__thumbs_shadow_no-right")}}if(c){be.css(getDuration(a));setTimeout(function(){be.css(getTranslate(s))},0)}else{be.stop().animate({left:s},a)}}else{if(c){be.css(getDuration(0));be.css(getTranslate(n/2-bf/2))}else{be.css({left:n/2-bf/2})}}var t=f;if(g.thumbBorderWidth>g.thumbMargin){t=t-(g.thumbBorderWidth-g.thumbMargin)*2}var u=d-Math.min(g.thumbMargin,g.thumbBorderWidth);if(c){bh.css(getDuration(a));setTimeout(function(){bh.css(getTranslate(u)).css({width:t})},0)}else{bh.stop().animate({left:u,width:t},a)}}}}function br(d,f,h){var i,j;var k=_.index(d);_.each(function(){a(this).unbind("fotorama.load fotorama.error")});bp(d);var l=g.transitionDuration;if(f&&f.altKey){l=l*10}var m=d.data("state");if(m=="loading"||!m){by("loading",k,l);d.bind("fotorama.load",function(){by("loaded",k,l)});d.bind("fotorama.error",function(){by("error",k,l)})}else if(m=="error"){by("error",k,l)}else{by("loaded",k,l)}if(Z){var p=_.index(Z);i=Z;if(g.thumbs){j=ba}}else{i=_.not(d);if(g.thumbs){j=bk.not(bk.eq(k))}}if(g.thumbs){ba=bk.eq(k);if(p){bb=p}j.removeClass("fotorama__thumb_selected").data("disabled",false);ba.addClass("fotorama__thumb_selected").data("disabled",true);if(g.thumbsPreview&&!b){j.children().stop().fadeTo(l,g.thumbOpacity);ba.children().stop().fadeTo(l,g.thumbOpacityActive)}}if(e){i.removeClass("fotorama__frame_active");d.addClass("fotorama__frame_active")}if(g.thumbs&&g.thumbsPreview){bs(l,h)}if(g.touchStyle){var q=-k*(n+g.margin);if(c){L.css(getDuration(l));setTimeout(function(){L.css(getTranslate(q))},1)}else{L.stop().animate({left:q},l)}}else{if(c){if(!Z){d.css({opacity:0})}i.add(d).css(getDuration(l));setTimeout(function(){i.css({opacity:0});d.css({opacity:1})},1)}else{if(!Z){d.stop().fadeTo(0,0)}i.stop().fadeTo(l,0);d.stop().fadeTo(l,1)}}if(g.caption){if(d.data("alt")){bl.html(d.data("alt")).show()}else{bl.html("").hide()}}Z=d;if(g.arrows){bn()}clearTimeout(s);s=setTimeout(bq,l)}function bq(){var a=_.index(Z);var b=0;var c=[];for(i=0;i<g.preload*2+1;i++){var d=a-g.preload+i;if(d>=0&&d!=a&&d<k&&(!_.eq(d).data("wraped")||_.eq(d).data("detached"))){b++;c.push(d)}}if(c.length>=g.preload){for(i=0;i<c.length;i++){bp(_.eq(c[i]))}}}function bp(a){var b=_.index(a);if(!a.data("wraped")){L.append(a);function c(c){function i(){c.addClass("fotorama__img");if(console&&console.log){console.log(d+" "+e,b)}if((!n||!p)&&!r){n=d;p=e}if(g.touchStyle){var h=b*(n+g.margin);a.css({left:h})}if(!q){q=n/p*1e3}if(d!=n||e!=p){var i=0;if(Math.round(f)!=Math.round(q)){i=g.minPadding*2}if(f>=q){d=Math.round(n-i)<d||g.zoomToFit?Math.round(n-i):d;e=Math.round(d/f*1e3)}else{e=Math.round(p-i)<e||g.zoomToFit?Math.round(p-i):e;d=Math.round(e*f/1e3)}}c.attr({width:d,height:e}).css({visibility:"visible"});if(e<p){c.css({top:Math.round((p-e)/2)})}bw()}function h(){if(d){e=c.height();f=d/e*1e3;i()}else{d=c.width();setTimeout(h,100)}}var d=c.width();var e;var f;h()}a.data({wraped:true});bo(b,a,c,"img")}else if(a.data("detached")){a.data({detached:false}).appendTo(L)}}function bo(b,c,d,e){function t(a){function l(b){m[a]="error";if(p<n.length&&b){t(n[p]+"?"+h);p++}else{c.trigger("fotorama.error").data({state:"error"})}}function k(){m[a]="loaded";if(console&&console.log){console.log("loadFinish "+b+" "+e)}c.trigger("fotorama.load").data({state:"loaded"});if(e=="thumb"){i.removeAttr("width")}d(i)}function j(){i.attr({src:a}).css({visibility:"hidden"});if(p==0){console.log("appendTo "+b+" "+e);i.appendTo(c);if(e=="thumb"){i.attr({width:g.thumbSize});bf+=g.thumbSize+g.thumbMargin;be.css({width:bf});c.css({width:g.thumbSize}).data({width:g.thumbSize});bz()}}}if(!m[a]){m[a]="loading";f.data({loading:true});i.unbind("error load").error(function(){l(true)}).load(k);j()}else{function q(){console.log("justWait");if(m[a]=="error"){l(false)}else if(m[a]=="loaded"){k()}else{setTimeout(q,100)}}j();q()}}var f=_.eq(b);var i=a("<img />");var k=j.eq(b);var n=[];var p=0;var q=l[b]["imgHref"];var r=l[b]["imgSrc"];var s=l[b]["thumbSrc"];if(e=="img"){if(q)n.push(q);if(r)n.push(r);if(s)n.push(s)}else{if(s)n.push(s);if(r)n.push(r);if(q)n.push(q)}if(g.caption){f.data({alt:k.attr("alt")||k.children().attr("alt")})}t(n[p]+"?"+h);p++}function bn(){var a=_.index(Z);if(a==0||k<2){T.addClass("fotorama__arr_disabled").data("disabled",true)}else{T.removeClass("fotorama__arr_disabled").data("disabled",false)}if(a==k-1||k<2){U.addClass("fotorama__arr_disabled").data("disabled",true)}else{U.removeClass("fotorama__arr_disabled").data("disabled",false)}}function bm(a,b){b.stopPropagation();b.preventDefault();var c=_.index(Z);var d=c+a;if(d<0){if(g.loop){d=k-1}else{d=0}}if(d>k-1){if(g.loop){d=0}else{d=k-1}}br(_.eq(d),b,false)}function Q(){if(BASE64Flag){N.css({backgroundPosition:"24px "+(24-56*P)+"px"})}else{var a;if(P>5){a="···"}else if(P>3){a="··"}else if(P>1){a="·"}else{a="··"}N.html("<span>"+a+"</span>")}P++;if(P>7)P=0}var f=a(this);var h=(new Date).getTime();f.addClass("fotorama");var j=f.children().filter(function(){var b=a(this);return(b.is("a")&&b.children("img").size()||b.is("img"))&&(b.attr("href")||b.attr("src")||b.children().attr("src"))});var k=j.size();var l=[];j.each(function(b){var c=a(this);l[b]={imgHref:c.attr("href"),imgSrc:c.attr("src"),thumbSrc:c.children().attr("src")}});f.html("");g.loop=false;if(!g.touchStyle){g.loop=true;g.arrows=false}var m=[];var n=g.width;var p=g.height;var q;var r=false;var s;if(g.touchStyle){var t=0,u,v,w,x,y,z,A,B,C,D,E=0;var F=false;var G;var H=false;var I=false;var J=false}var K=a('<div class="fotorama__wrap"></div>');var L=a('<div class="fotorama__shaft"></div>');var M=L.get(0);f.append(K.append(L));disableSelection(f);var N=a('<div class="fotorama__state"></div>').appendTo(L);var O;var P=0;if(b){K.addClass("fotorama__wrap_touch");e=false}if(g.touchStyle){K.addClass("fotorama__wrap_style_touch");if(e){K.append('<i class="fotorama__shadow fotorama__shadow_left"></i><i class="fotorama__shadow fotorama__shadow_right"></i>');var R=a(".fotorama__shadow",K)}}else{K.addClass("fotorama__wrap_style_fade")}if(c){K.addClass("fotorama__wrap_csstransitions")}if(g.arrows){K.append('<i class="fotorama__arr fotorama__arr_prev">&#9668;</i><i class="fotorama__arr fotorama__arr_next">&#9658;</i>');var S=a(".fotorama__arr",f);var T=a(".fotorama__arr_prev",f);var U=a(".fotorama__arr_next",f);if(!b){var V=false;var W;function X(){V=true;clearTimeout(W);S.css(getDuration(0));K.removeClass("fotorama__wrap_mouseout");setTimeout(function(){S.css(getDuration(g.transitionDuration));setTimeout(function(){K.addClass("fotorama__wrap_mouseover")},1)},1)}function Y(){clearTimeout(W);W=setTimeout(function(){if(!F&&!V){K.removeClass("fotorama__wrap_mouseover").addClass("fotorama__wrap_mouseout")}},g.transitionDuration*10)}K.mouseenter(function(){X()});K.mouseleave(function(){V=false;Y()})}}var Z;var _=a();j.each(function(b){var c=a('<div class="fotorama__frame"></div>');_=_.add(c)});if(g.thumbs){var ba;var bb=0;var bc=a('<div class="fotorama__thumbs"></div>');if(g.thumbsPreview){g.thumbOpacity=.66;g.thumbOpacityActive=1;var bd=g.thumbSize+g.thumbMargin*2;bc.addClass("fotorama__thumbs_previews").css({height:bd})}bc.appendTo(f).css("visibility","hidden");var be=a('<div class="fotorama__thumbs-shaft"></div>');bc.append(be);if(g.thumbsPreview){var bf=0;if(e){bc.append('<i class="fotorama__shadow fotorama__shadow_left"></i><i class="fotorama__shadow fotorama__shadow_right"></i>');var bg=a(".fotorama__shadow",bc);bg.css({height:bd})}var bh=a('<i class="fotorama__thumb-border"></i>');var bi=g.thumbSize;if(bi>=bd-g.thumbBorderWidth*2){bi=bd-g.thumbBorderWidth*2}var bj=g.thumbMargin-Math.min(g.thumbMargin,g.thumbBorderWidth);bh.hide().css({height:bi,top:bj,"border-width":g.thumbBorderWidth}).appendTo(be)}j.each(function(b){var c;if(g.thumbsPreview){c=a('<div class="fotorama__thumb"></div>');c.css({height:g.thumbSize,margin:g.thumbMargin})}else{c=a('<i class="fotorama__thumb"><i class="fotorama__thumb__dot"></i></i>')}c.appendTo(be)});var bk=a(".fotorama__thumb",f);if(g.thumbsPreview){j.each(function(a){function c(c){function j(){var d=Math.round(g.thumbSize*f/1e3);c.addClass("fotorama__thumb__img");c.attr({width:d,height:g.thumbSize}).css({visibility:"visible"});if(!b&&a!=0){c.stop().fadeTo(0,g.thumbOpacity)}bf+=d+g.thumbMargin-(g.thumbSize+g.thumbMargin);be.css({width:bf});bk.eq(a).css({width:d}).data({width:d});bz()}function h(){if(d){e=c.height();f=d/e*1e3;j()}else{d=c.width();setTimeout(h,100)}}var d=c.width();var e;var f;h()}var d=a*100;setTimeout(function(){bo(a,bk.eq(a),c,"thumb")},d)})}}if(g.caption){var bl=a('<p class="fotorama__caption"></p>');bl.appendTo(f)}if(n&&p){bw()}br(_.eq(0),false,false);if(g.thumbs){if(g.thumbColor&&!g.thumbsPreview){bk.children().css("background-color",g.thumbColor)}if(g.thumbsBackgroundColor){bc.css("background-color",g.thumbsBackgroundColor);if(g.thumbsPreview&&e){bg.css(getBoxShadowColor(g.thumbsBackgroundColor))}}if(g.thumbsPreview){if(g.thumbBorderColor){bh.css({"border-color":g.thumbBorderColor})}if(!b){bk.hover(function(){var b=a(this);if(!b.hasClass("fotorama__thumb_selected")){b.children().stop().fadeTo(g.transitionDuration/2,g.thumbOpacityActive)}},function(){var b=a(this);if(!b.hasClass("fotorama__thumb_selected")){b.children().stop().fadeTo(g.transitionDuration*2,g.thumbOpacity)}})}}}if(g.backgroundColor){K.add(_).css("background-color",g.backgroundColor)}if(g.arrowsColor&&g.arrows){U.add(T).css("color",g.arrowsColor)}if(g.thumbs){bk.click(function(b){b.stopPropagation();var c=a(this);if(!c.data("disabled")){var d=bk.index(a(this));var e=b.pageX-bc.offset().left;br(_.eq(d),b,e)}})}if(g.arrows){T.click(function(b){if(!a(this).data("disabled")){bm(-1,b)}});U.click(function(b){if(!a(this).data("disabled")){bm(+1,b)}})}if(!g.touchStyle&&!b){K.click(function(a){if(!a.shiftKey){bm(+1,a)}else{bm(-1,a)}})}if(g.touchStyle||b){function bt(d){if(Z){function e(){B=[];F=false;A=(new Date).getTime();x=v;y=w;B.push([A,v]);u=L.position().left;if(c){L.css(getDuration(0)).css(getTranslate(u))}else{L.stop()}z=u}if(!b){v=d.pageX;d.preventDefault();e();a(document).mousemove(bu);a(document).mouseup(bv)}else if(b&&d.targetTouches.length==1){v=d.targetTouches[0].pageX;w=d.targetTouches[0].pageY;e();M.addEventListener("touchmove",bu,false);M.addEventListener("touchend",bv,false)}else if(b&&d.targetTouches.length>1){return false}}}function bu(a){function d(){a.preventDefault();if(!F){if(e){K.addClass("fotorama__wrap_shadow")}if(!b){L.addClass("fotorama__shaft_grabbing")}}F=true;clearTimeout(G);C=(new Date).getTime();B.push([C,v]);var d=x-v;var f=-(t-n);u=z-d;if(u>0){u=Math.round(u-u/1.25);J=true;if(e){K.addClass("fotorama__wrap_shadow_no-left").removeClass("fotorama__wrap_shadow_no-right")}}else if(u<f){u=Math.round(u+(f-u)/1.25);J=true;if(e){K.addClass("fotorama__wrap_shadow_no-right").removeClass("fotorama__wrap_shadow_no-left")}}else{J=false;if(e){K.removeClass("fotorama__wrap_shadow_no-left fotorama__wrap_shadow_no-right")}}if(g.touchStyle){if(c){L.css(getTranslate(u))}else{L.css("left",u)}}}if(!b){v=a.pageX;d()}else if(b&&a.targetTouches.length==1){v=a.targetTouches[0].pageX;w=a.targetTouches[0].pageY;if(!I){if(Math.abs(v-x)-Math.abs(w-y)>=-5){H=true;a.preventDefault()}I=true}else if(H){d()}}}function bv(c){if(!b||!c.targetTouches.length){H=false;I=false;G=setTimeout(function(){F=false;if(!b){Y()}},d);if(!b){a(document).unbind("mouseup");a(document).unbind("mousemove")}else{M.removeEventListener("touchmove",bu,false);M.removeEventListener("touchend",bv,false)}if(e){K.removeClass("fotorama__wrap_shadow")}if(!b){L.removeClass("fotorama__shaft_grabbing")}D=(new Date).getTime();var f=-u;var h=false;var j=false;var l=D-d;var m,p,q,r;for(i=0;i<B.length;i++){m=Math.abs(l-B[i][0]);if(i==0){p=m;q=D-B[i][0];r=B[i][1]}if(m<=p){p=m;q=B[i][0];r=B[i][1]}}var s=D-q;var t=s<=d;var w=D-E<=1e3;var x=r-v;if(g.touchStyle){if(t){if(x<=-10){h=true}else if(x>=10){j=true}}var y=undefined;if(!h&&!j){y=Math.round(f/n)}else{if(!w){if(h){y=Math.round((f-n/2)/n)}else if(j){y=Math.round((f+n/2)/n)}}else{if(h){bm(-1,c)}else if(j){bm(+1,c)}}}if(y!=undefined){if(y<0)y=0;if(y>k-1)y=k-1;br(_.eq(y),c,false)}}else{if(x>=0){bm(+1,c)}else if(x<0){bm(-1,c)}}E=D}}if(!b){L.mousedown(bt)}else{M.addEventListener("touchstart",bt,false)}}var bx})}})(jQuery);var _SPINNER="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAGoCAMAAAAQMBfHAAABtlBMVEX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8cWrVBAAAAkXRSTlMAKUfghaPCZkAlPw7nsHiUy1w3VBcoLEoiNsAw/EbdoYNlGSYIFEUdDEgS2yENIMi9CnfkLhUnkhutW5/5gGSCAgsyaZlEsVA4yQQfAxM9Khh/AWEPm7nVEfNCtB4kNDnGSU+JM5dznmAtXkuQO3JnTlhiWp2nIwf2rtgcPha7UYxf4avt0DUGpjp1eXwvTBBjhUW/zwAABtxJREFUeF7tmtlXE0kUxm/2zr5gwhI3QiAsCXtCQFED4gKCIKIgoo7ruI0zOjNuo7Pva/7jqTq3iy9dOc05eclT/94434/qk6fbt74mK6GLF0N0EJF6PXKgUBcgAJfLzcJyHvkjz/VOXQhXXAWVX/Z4PCOdViHsEqgz1q+zAYHzyjKZdB4VxtEbIpiq16dEPuiShEkCIyGSoUhkSAh7Ik6bOYwx/BlUORhIJNYg1ILBErWP7Fm/5GzWGgxfcEsuDFPUz0StguFmDJo1hVmrEDKFEKX4iGjKKvTzEUY/tY/pjY00gkLy+z1r3n3M54tD+CIQ6O3Tc9+MSIqLi0UWlIH8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";var _ERROR="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAAAAABWESUoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAJ0Uk5TAEQHIkixAAABv0lEQVQYGWXBQWcjcRzH4d+L+xpDRVRYETGXqt5W9FI9xFIVvfae64i11IgosfoGeqtaZawcwlgrlxE1Qvx99j+zk5lUn8fU6N48pmtc+vpwrZapNkgKGtvFUDVTJYgdH+xnJ6qYStEbn6wGKpm8wYZSHl+fS9Hl9w2l7bk8k9TP8HZ3oQ4mG7w8kmRSuKIyU6uzxHsLJZOm1CY6kuDFkqlfAE9vwH6kI0vADWRaAH86/Q2QR2p1MiCRdQrgVrrYAauuWjdAcWoTIAskjfGeAzWCDBjbHJipNMWbqxUDc/sFjFRZ4t2rMQJSy4EvqoQvgLvSQQ/IbQ8u0H+9DHg/Uy1w4MyBC1Q7eweynmp72FsO9HRw5YCXUJUusLUUGKlxj/dTlRGQ2hyI1UrwpirNgIWNgXWgRvCMN5a3BiZ2WgDf1OqugN2FNAaKjikBso5aUQ5s+p01sJBp4IBHHfm6B9InoOjLpBjvQUcm1KaSSWGKtzxRa0ZlFUomKcrx1mMdhHc7vKwvyeRdbCn9jS+H0vl1nFPaDOWZStGaT35HKpkqJz8cH7g4VMVUGz4WNHbJUDVTo3uTvKaOLF3enqrxD+aQUnwgKhDtAAAAAElFTkSuQmCC";var base64Test=new Image;var BASE64Flag=true;base64Test.onerror=function(){if(this.width!=1||this.height!=1){BASE64Flag=false}};base64Test.src=_ERROR