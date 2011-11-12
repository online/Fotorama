/* Fotorama 1.3 (v1183) http://fotoramajs.com/ */
function disableSelection(a){a.mousemove(function(a){a.preventDefault()}).mousedown(function(a){a.preventDefault()})}function getBoxShadowColor(a){var b="0 0 10px "+a;return{"-moz-box-shadow":b,"-webkit-box-shadow":b,"-o-box-shadow":b,"box-shadow":b}}function getDuration(a){var b=a+"ms";return{"-moz-transition-duration":b,"-webkit-transition-duration":b,"-o-transition-duration":b,"transition-duration":b}}function getTranslate(a,b){if(csstrFLAG){var c;if(!b){c="translate3d("+a+"px,0,0)"}else{c="translate3d(0,"+a+"px,0)"}return{"-moz-transform":c,"-webkit-transform":c,"-o-transform":c,transform:c}}else{if(!b){return{left:a}}else{return{top:a}}}}window.Modernizr=function(a,b,c){function i(a){p.cssText=a}function h(a,b){return i(s.join(a+";")+(b||""))}function g(a,b){return typeof a===b}function f(a,b){return!!~(""+a).indexOf(b)}function e(a,b){for(var d in a)if(p[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function d(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+t.join(c+" ")+c).split(" ");return e(d,b)}var j="2.0.6",k={},l=b.documentElement,m=b.head||b.getElementsByTagName("head")[0],n="modernizr",o=b.createElement(n),p=o.style,q,r=Object.prototype.toString,s=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),t="Webkit Moz O ms Khtml".split(" "),u={},v={},w={},x=[],y=function(a,c,d,e){var f,g,h,i=b.createElement("div");if(parseInt(d,10))while(d--)h=b.createElement("div"),h.id=e?e[d]:n+(d+1),i.appendChild(h);f=["­","<style>",a,"</style>"].join(""),i.id=n,i.innerHTML+=f,l.appendChild(i),g=c(i,a),i.parentNode.removeChild(i);return!!g},z,A={}.hasOwnProperty,B;!g(A,c)&&!g(A.call,c)?B=function(a,b){return A.call(a,b)}:B=function(a,b){return b in a&&g(a.constructor.prototype[b],c)};var C=function(a,c){var d=a.join(""),e=c.length;y(d,function(a,c){var d=b.styleSheets[b.styleSheets.length-1],f=d.cssRules&&d.cssRules[0]?d.cssRules[0].cssText:d.cssText||"",g=a.childNodes,h={};while(e--)h[g[e].id]=g[e];k.csstransforms3d=h.csstransforms3d.offsetLeft===9},e,c)}([,["@media (",s.join("transform-3d),("),n,")","{#csstransforms3d{left:9px;position:absolute}}"].join("")],[,"csstransforms3d"]);u.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},u.csstransforms3d=function(){var a=!!e(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]);a&&"webkitPerspective"in l.style&&(a=k.csstransforms3d);return a},u.csstransitions=function(){return d("transitionProperty")};for(var D in u)B(u,D)&&(z=D.toLowerCase(),k[z]=u[D](),x.push((k[z]?"":"no-")+z));i(""),o=q=null,k._version=j,k._prefixes=s,k._domPrefixes=t,k.testProp=function(a){return e([a])},k.testAllProps=d,k.testStyles=y;return k}(this,this.document);var touchFLAG="ontouchstart"in document;var csstrFLAG=Modernizr.csstransforms3d&&Modernizr.csstransitions;(function(a){function e(e,f){function bN(){if(f.resize){d.bind("resize",bM)}else{d.unbind("resize",bM)}}function bM(){if(!bL){e.css({overflow:"hidden"});bL=true}clearTimeout(bK);bK=setTimeout(function(){bz(true);e.css({overflow:"visible"});bL=false},100)}function bJ(a,b,c){b.stopPropagation();b.preventDefault();var d=bj.index(bi);var e=d+a;if(e<0){if(c){e=k-1}else{e=0}}if(e>k-1){if(c){e=0}else{e=k-1}}bI(bj.eq(e),b,false)}function bI(b,c,d,e){function n(){if(f.caption){j=b.data("caption");if(j){bx.html(j).show()}else{bx.html("").hide()}}}var h,i;var j;var k;var l=bj.index(b);bj.each(function(){a(this).unbind("fotoramaLoad fotoramaError")});var m=0;if(!e){m=f.transitionDuration;if(c&&c.altKey){m=m*10}}var o=b.data("detached");clearTimeout(t);t=setTimeout(function(){if(!o){bF(b,l)}bG(b,l)},m+10);if(o){bF(b,l)}var r=b.data("state");if(r=="loading"||!r){bA("loading",l,m);b.bind("fotoramaLoad",function(){bA("loaded",l,m);n()});b.bind("fotoramaError",function(){bA("error",l,m);n()})}else if(r=="error"){bA("error",l,m)}else if(r!=g){bA("loaded",l,0)}n();if(bi){k=bj.index(bi);h=bi;if(f.thumbs){i=bl}}else{h=bj.not(b);if(f.thumbs){i=bw.not(bw.eq(l))}}if(f.thumbs){bl=bw.eq(l);if(k){bm=k}i.removeClass("fotorama__thumb_selected").data("disabled",false);bl.addClass("fotorama__thumb_selected").data("disabled",true);if(f.thumbsPreview&&!touchFLAG){i.children().stop().fadeTo(m,f.thumbOpacity);bl.children().stop().fadeTo(m,f.thumbOpacityActive)}}if(f.shadows){h.removeClass("fotorama__frame_active");b.addClass("fotorama__frame_active")}if(f.thumbs&&f.thumbsPreview&&k!=l){bB(m,d)}if(f.touchStyle){var s;if(!f.vertical){s=-l*(p+f.margin)}else{s=-l*(q+f.margin)}if(csstrFLAG){T.css(getDuration(m));setTimeout(function(){T.css(getTranslate(s,f.vertical))},1)}else{T.stop().animate(getTranslate(s,f.vertical),m)}}else{if(csstrFLAG){if(!bi){b.css({opacity:0})}h.add(b).css(getDuration(m));setTimeout(function(){h.css({opacity:0});b.css({opacity:1})},1)}else{if(!bi){b.stop().fadeTo(0,0)}h.stop().fadeTo(m,0);b.stop().fadeTo(m,1)}}bi=b;if(f.arrows){bH()}if(f.onShowImg){var u={index:l,img:bi,thumb:bl,caption:j};f.onShowImg(u)}}function bH(){var a=bj.index(bi);if(a==0||k<2){bc.addClass("fotorama__arr_disabled").data("disabled",true)}else{bc.removeClass("fotorama__arr_disabled").data("disabled",false)}if(a==k-1||k<2){bd.addClass("fotorama__arr_disabled").data("disabled",true)}else{bd.removeClass("fotorama__arr_disabled").data("disabled",false)}}function bG(b,c){if(!c)c=bj.index(b);var d=0;var e=false;var g=[];for(i=0;i<f.preload*2+1;i++){var h=c-f.preload+i;if(h>=0&&h<k){if(!bj.eq(h).data("wraped")||bj.eq(h).data("detached")){d++;g.push(h)}}else{e=true}}if(d>=f.preload||e){a(g).each(function(a){var b=a*50;setTimeout(function(){bF(bj.eq(g[a]),g[a])},b)});if(f.detach){var j=c-f.preload;if(j<0)j=0;var l=c+f.preload+1;if(l>k-1)l=k-1;bj.slice(0,j).add(bj.slice(l,k-1)).data({detached:true}).detach()}}}function bF(b,c){if(!c)c=bj.index(b);if(!b.data("wraped")){T.append(b);function d(d){var e=a(d);var f=e.width();var g=e.height();var h=f/g*1e3;e.addClass("fotorama__img");b.data({img:e,imgWidth:f,imgHeight:g,imgRatio:h});if((!p||!q)&&!s){p=f;q=g;by()}bD(b,c);bz()}b.data({wraped:true});bE(c,b,d,"img")}else if(f.detach&&b.data("detached")){b.data({detached:false}).appendTo(T)}}function bE(b,c,d,e){function t(a){function j(b){m[a]="error";k.unbind("error load");if(p<o.length&&b){t(o[p]);p++}else{c.trigger("fotoramaError").data({state:"error"})}}function h(){m[a]="loaded";c.trigger("fotoramaLoad").data({state:"loaded"});setTimeout(function(){d(i)},100)}function b(){k.attr({src:a}).css({visibility:"hidden"});if(p==0){k.appendTo(c);if(e=="thumb"){bq+=bk+f.thumbMargin;bp.css(Q,bq);c.css(Q,bk).data(Q,bk);bC()}}}if(!m[a]){m[a]="loading";g.data({loading:true});k.unbind("error load").error(function(){j(true)}).load(h);b()}else{function l(){if(m[a]=="error"){j(false)}else if(m[a]=="loaded"){h()}else{setTimeout(l,100)}}b();l()}}var g=bj.eq(b);var i=new Image;var k=a(i);var n=j.eq(b);var o=[];var p=0;var q=l[b]["imgHref"];var r=l[b]["imgSrc"];var s=l[b]["thumbSrc"];if(e=="img"){if(q){o.push(q);o.push(q+"?"+h)}if(r){o.push(r);o.push(r+"?"+h)}if(s){o.push(s);o.push(s+"?"+h)}}else{if(s){o.push(s);o.push(s+"?"+h)}if(r){o.push(r);o.push(r+"?"+h)}if(q){o.push(q);o.push(q+"?"+h)}}if(f.caption){g.data({caption:n.attr("alt")||n.children().attr("alt")})}t(o[p]);p++}function bD(a,b){if(!b)b=bj.index(a);var c=a.data("img");if(c){var d=a.data("imgWidth");var e=a.data("imgHeight");var g=a.data("imgRatio");var h=0;if(f.touchStyle){if(!f.vertical){a.css({left:b*(p+f.margin)})}else{a.css({top:b*(q+f.margin)})}}if(d!=p||e!=q){var i=0;if(Math.round(g)!=Math.round(r)||f.alwaysPadding){i=f.minPadding*2}if(g>=r){d=Math.round(p-i)<d||f.zoomToFit?Math.round(p-i):d;e=Math.round(d/g*1e3)}else{e=Math.round(q-i)<e||f.zoomToFit?Math.round(q-i):e;d=Math.round(e*g/1e3)}}c.attr({width:d,height:e}).css({width:d,height:e,visibility:"visible"});if(e<q){h=Math.round((q-e)/2)}c.css({top:h})}}function bC(){if(f.shadows){if(bq>n){bn.addClass("fotorama__thumbs_shadow")}}bB(0,false)}function bB(a,b){if(bq){var c=bl.position()[M];var d=bl.data()[Q];if(!d){bt.hide()}else{bt.show();if(bq>n){var e=c+d/2;var g=n/2;var h=bw.index(bl);var i=h-bm;if(br==undefined){br=bp.position()[M]}if(b&&(i>0&&b>g*.75||i<0&&b<g*1.25)){var j;if(i>0){j=h+1}else{j=h-1}if(j<0){j=0}else if(j>k-1){j=k-1}if(h!=j){var l=bw.eq(j);e=l.position()[M]+l.data()[Q]/2;g=b}}var m=-(bq-n);var o=Math.round(-(e-g)+f.thumbMargin);if(i>0&&o>br||i<0&&o<br){o=br}if(o<=m){o=m;if(f.shadows){bn.removeClass("fotorama__thumbs_shadow_no-left").addClass("fotorama__thumbs_shadow_no-right")}}else if(o>=f.thumbMargin){o=f.thumbMargin;if(f.shadows){bn.removeClass("fotorama__thumbs_shadow_no-right").addClass("fotorama__thumbs_shadow_no-left")}}else{if(f.shadows){bn.removeClass("fotorama__thumbs_shadow_no-left fotorama__thumbs_shadow_no-right")}}br=o;if(csstrFLAG){bp.css(getDuration(a));setTimeout(function(){bp.css(getTranslate(o,f.vertical))},1)}else{bp.stop().animate(getTranslate(o,f.vertical),a)}}else{if(csstrFLAG){bp.css(getDuration(0))}bp.css(getTranslate(n/2-bq/2,f.vertical))}var p=d-f.thumbBorderWidth*2;var q=c;if(csstrFLAG){bt.css(getDuration(a));setTimeout(function(){bt.css(getTranslate(q,f.vertical)).css(Q,p)},1)}else{if(!f.vertical){bt.stop().animate({left:q,width:p},a)}else{bt.stop().animate({top:q,height:p},a)}}}}}function bA(a,b,c){function d(){if(s){if(!f.touchStyle){b=0}V.css(M,b*(n+f.margin)+n/2);Y=setTimeout(function(){V.stop().show().fadeTo(0,1)},c)}}clearTimeout(Y);switch(a){case"loading":d();e.addClass("fotorama_loading").removeClass("fotorama_error");clearInterval(W);if(BASE64Flag){V.css({backgroundImage:"url("+_SPINNER+")"});W=setInterval(Z,100)}else{V.html("<span>···</span>")}break;case"error":d();e.addClass("fotorama_error").removeClass("fotorama_loading");clearInterval(W);if(BASE64Flag){V.css({backgroundImage:"url("+_ERROR+")",backgroundPosition:"24px 24px"})}else{V.text("?")}break;case"loaded":e.removeClass("fotorama_loading fotorama_error");V.stop().fadeTo(c,0,function(){V.hide()});clearInterval(W);break}g=a}function bz(c,d){if(p&&q&&(!s||c)){if(!d){by()}if(!f.vertical){n=p;o=q}else{n=q;o=p}S.add(bj).css({width:p,height:q});if(f.vertical&&f.thumbs){if(!f.thumbsPreviewRight){S.css({left:bo})}else{bn.css({left:p})}}if(!f.touchStyle){T.css({width:p,height:q})}else{if(!f.vertical){u=(p+f.margin)*k-f.margin;v=q}else{u=p;v=(q+f.margin)*k-f.margin}T.css({width:u,height:v})}if(f.thumbs){if(f.thumbsPreview||!f.vertical){bn.css(Q,n)}bn.css({visibility:"visible"})}if(b&&!f.vertical){if(f.arrows){bc.add(bd).css({top:q/2})}V.css(N,o/2)}bC();if(bi){bI(bi,false,false,true)}s=true}if(c){bj.each(function(b){bD(a(this),b)})}}function by(){if(!r){r=p/q*1e3}if(f.thumbs&&!bo){bo=f.vertical?bn.width():bn.height()}if(f.resize){var a=d.height();p=e.width()-(f.vertical&&bo?bo:0);q=Math.round(p/r*1e3);if(q>a-40-(!f.vertical&&bo?bo:0)){q=a-40-(!f.vertical&&bo?bo:0);p=Math.round(q*r/1e3)}}}function Z(){V.css({backgroundPosition:"24px "+(24-56*X)+"px"});X++;if(X>7)X=0}e.data({initialized:true});var g;var h=(new Date).getTime();e.addClass("fotorama");if(!f.vertical){e.addClass("fotorama_horizontal")}else{e.addClass("fotorama_vertical")}var j=e.children().filter(function(){var b=a(this);return(b.is("a")&&b.children("img").size()||b.is("img"))&&(b.attr("href")||b.attr("src")||b.children().attr("src"))});var k=j.size();if(f.startImg>k-1||typeof f.startImg!="number"){f.startImg=0}var l=[];j.each(function(b){var c=a(this);l[b]={imgHref:c.attr("href"),imgSrc:c.attr("src"),thumbSrc:c.children().attr("src")}});e.html("");if(!f.touchStyle){f.arrows=false}var m=[];var n,o;var p=f.width;var q=f.height;var r;var s=false;var t;if(f.touchStyle){var u=0,v,w,x,y,z,A,B,C,D,E,F,G=0;var H=false;var I;var J=false;var K=false;var L=false}var M,N,O,P,Q,R;if(!f.vertical){M="left";N="top";O="pageX";P="pageY";Q="width";R="height"}else{M="top";N="left";O="pageY";P="pageX";Q="height";R="width"}var S=a('<div class="fotorama__wrap"></div>');var T=a('<div class="fotorama__shaft"></div>');var U=T.get(0);e.append(S.append(T));disableSelection(e);var V=a('<div class="fotorama__state"></div>').appendTo(T);var W;var X=0;var Y;if(touchFLAG){S.addClass("fotorama__wrap_touch");f.shadows=false}if(f.touchStyle){S.addClass("fotorama__wrap_style_touch");if(f.shadows){S.append('<i class="fotorama__shadow fotorama__shadow_prev"></i><i class="fotorama__shadow fotorama__shadow_next"></i>')}}else{S.addClass("fotorama__wrap_style_fade")}if(csstrFLAG){S.addClass("fotorama__wrap_csstransitions")}if(f.arrows){var _,ba;if(!f.vertical){_="&#9668;";ba="&#9658;"}else{_="&#9650;";ba="&#9660;"}S.append('<i class="fotorama__arr fotorama__arr_prev">'+_+'</i><i class="fotorama__arr fotorama__arr_next">'+ba+"</i>");var bb=a(".fotorama__arr",e);var bc=a(".fotorama__arr_prev",e);var bd=a(".fotorama__arr_next",e);if(!touchFLAG){var be=false;var bf;function bg(){be=true;clearTimeout(bf);bb.css(getDuration(0));S.removeClass("fotorama__wrap_mouseout");setTimeout(function(){bb.css(getDuration(f.transitionDuration));setTimeout(function(){S.addClass("fotorama__wrap_mouseover")},1)},1)}function bh(){clearTimeout(bf);bf=setTimeout(function(){if(!H&&!be){S.removeClass("fotorama__wrap_mouseover").addClass("fotorama__wrap_mouseout")}},f.transitionDuration*3)}S.mouseenter(function(){bg()});S.mouseleave(function(){be=false;bh()})}}var bi;var bj=a();j.each(function(b){var c=a('<div class="fotorama__frame"></div>');bj=bj.add(c)});if(f.thumbs){var bk=f.thumbSize;if(!bk){bk=f.vertical?64:48}var bl;var bm=0;var bn=a('<div class="fotorama__thumbs"></div>');var bo;if(f.thumbsPreview){f.thumbOpacity=.66;f.thumbOpacityActive=1;bo=bk+f.thumbMargin*2;bn.addClass("fotorama__thumbs_previews").css(R,bo)}bn.appendTo(e).css("visibility","hidden");var bp=a('<div class="fotorama__thumbs-shaft"></div>');bn.append(bp);if(f.thumbsPreview){var bq=0;var br=undefined;if(f.shadows){bn.append('<i class="fotorama__shadow fotorama__shadow_prev"></i><i class="fotorama__shadow fotorama__shadow_next"></i>');var bs=a(".fotorama__shadow",bn)}var bt=a('<i class="fotorama__thumb-border"></i>');var bu=bk-f.thumbBorderWidth*2;var bv=f.thumbMargin;bt.hide().css(R,bu).css(N,bv).css("border-width",f.thumbBorderWidth).appendTo(bp)}j.each(function(b){var c;if(f.thumbsPreview){c=a('<div class="fotorama__thumb"></div>');c.css(R,bk).css("margin",f.thumbMargin)}else{c=a('<i class="fotorama__thumb"><i class="fotorama__thumb__dot"></i></i>')}c.appendTo(bp)});var bw=a(".fotorama__thumb",e);if(f.thumbsPreview){j.each(function(b){function c(c){var d=a(c);var e=d.width();var g=d.height();var h=e/g*1e3;var j;if(!f.vertical){j=Math.round(bk*h/1e3)}else{j=Math.round(bk/h*1e3)}if(Modernizr.canvas){d.remove();d=a('<canvas class="fotorama__thumb__img"></canvas>');d.appendTo(bw.eq(b))}else{d.addClass("fotorama__thumb__img")}d.attr(Q,j).attr(R,bk).css(Q,j).css(R,bk).css("visibility","visible");if(Modernizr.canvas){var k=d.get(0).getContext("2d");if(!f.vertical){k.drawImage(c,0,0,j,bk)}else{k.drawImage(c,0,0,bk,j)}}if(!touchFLAG&&b!=0){d.stop().fadeTo(0,f.thumbOpacity)}bq+=j+f.thumbMargin-(bk+f.thumbMargin);bp.css(Q,bq);bw.eq(b).css(Q,j).data(Q,j);bC()}var d=b*50;setTimeout(function(){bE(b,bw.eq(b),c,"thumb")},d)})}}if(f.caption){var bx=a('<p class="fotorama__caption"></p>');bx.appendTo(e)}if(p&&q){bz()}bI(bj.eq(f.startImg),false,false,true);if(f.thumbs){if(f.thumbColor&&!f.thumbsPreview){bw.children().css("background-color",f.thumbColor)}if(f.thumbsBackgroundColor){bn.css("background-color",f.thumbsBackgroundColor);if(f.thumbsPreview&&f.shadows){bs.css(getBoxShadowColor(f.thumbsBackgroundColor))}}if(f.thumbsPreview){if(f.thumbBorderColor){bt.css({"border-color":f.thumbBorderColor})}if(!touchFLAG){bw.hover(function(){var b=a(this);if(!b.hasClass("fotorama__thumb_selected")){b.children().stop().fadeTo(f.transitionDuration/2,f.thumbOpacityActive)}},function(){var b=a(this);if(!b.hasClass("fotorama__thumb_selected")){b.children().stop().fadeTo(f.transitionDuration*2,f.thumbOpacity)}})}}}if(f.backgroundColor){S.add(bj).css("background-color",f.backgroundColor)}if(f.arrowsColor&&f.arrows){bd.add(bc).css("color",f.arrowsColor)}var bK=false;var bL=false;bN();e.bind("fotoramaShowImg",function(a,b){if(b>k-1||typeof b!="number"){b=0}bI(bj.eq(b),a,false)});e.bind("fotoramaResize",function(a,b,c,d){if(b){p=b}if(c){q=c}r=p/q*1e3;if(!d){bz(true,true);f.resize=false;bN()}else{bz(true);f.resize=true;bN()}clearTimeout(bK)});if(f.thumbs){bw.click(function(b){b.stopPropagation();var c=a(this);if(!c.data("disabled")){var d=bw.index(a(this));var e=b[O]-bn.offset()[M];bI(bj.eq(d),b,e)}})}if(f.arrows){bc.click(function(b){if(!a(this).data("disabled")){bJ(-1,b,false)}});bd.click(function(b){if(!a(this).data("disabled")){bJ(+1,b,false)}})}if(!f.touchStyle&&!touchFLAG){S.click(function(a){if(!a.shiftKey){bJ(+1,a,true)}else{bJ(-1,a,true)}})}if(f.touchStyle||touchFLAG){function bO(b){if((touchFLAG||b.which<2)&&bi){function c(){D=[];H=false;C=b.timeStamp;z=x;A=y;D.push([C,x]);w=T.position()[M];if(csstrFLAG){T.css(getDuration(0)).css(getTranslate(w,f.vertical))}else{T.stop()}B=w}if(!touchFLAG){x=b[O];b.preventDefault();c();a(document).mousemove(bP);a(document).mouseup(bQ)}else if(touchFLAG&&b.targetTouches.length==1){x=b.targetTouches[0][O];y=b.targetTouches[0][P];c();U.addEventListener("touchmove",bP,false);U.addEventListener("touchend",bQ,false)}else if(touchFLAG&&b.targetTouches.length>1){return false}}}function bP(a){function b(){a.preventDefault();if(!H){if(f.shadows){S.addClass("fotorama__wrap_shadow")}if(!touchFLAG){T.addClass("fotorama__shaft_grabbing")}}H=true;clearTimeout(I);E=a.timeStamp;D.push([E,x]);var b=z-x;var c;if(!f.vertical){c=-(u-p)}else{c=-(v-q)}w=B-b;if(w>0){w=Math.round(w-w/1.25);L=true;if(f.shadows){S.addClass("fotorama__wrap_shadow_no-left").removeClass("fotorama__wrap_shadow_no-right")}}else if(w<c){w=Math.round(w+(c-w)/1.25);L=true;if(f.shadows){S.addClass("fotorama__wrap_shadow_no-right").removeClass("fotorama__wrap_shadow_no-left")}}else{L=false;if(f.shadows){S.removeClass("fotorama__wrap_shadow_no-left fotorama__wrap_shadow_no-right")}}if(f.touchStyle){T.css(getTranslate(w,f.vertical))}}if(!touchFLAG){x=a[O];b()}else if(touchFLAG&&a.targetTouches.length==1){x=a.targetTouches[0][O];y=a.targetTouches[0][P];if(!K){if(Math.abs(x-z)-Math.abs(y-A)>=-5){J=true;a.preventDefault()}K=true}else if(J){b()}}}function bQ(b){if(!touchFLAG||!b.targetTouches.length){J=false;K=false;I=setTimeout(function(){H=false;if(!touchFLAG){bh()}},c);if(!touchFLAG){a(document).unbind("mouseup");a(document).unbind("mousemove")}else{U.removeEventListener("touchmove",bP,false);U.removeEventListener("touchend",bQ,false)}if(f.shadows){S.removeClass("fotorama__wrap_shadow")}if(!touchFLAG){T.removeClass("fotorama__shaft_grabbing")}F=b.timeStamp;var d=-w;var e=false;var g=false;var h=F-c;var j,l,m,o;for(i=0;i<D.length;i++){j=Math.abs(h-D[i][0]);if(i==0){l=j;m=F-D[i][0];o=D[i][1]}if(j<=l){l=j;m=D[i][0];o=D[i][1]}}var p=F-m;var q=p<=c;var r=F-G<=1e3;var s=o-x;if(f.touchStyle){if(touchFLAG||H){if(q){if(s<=-10){e=true}else if(s>=10){g=true}}var t=undefined;if(!e&&!g){t=Math.round(d/n)}else{if(!r){if(e){t=Math.round((d-n/2)/n)}else if(g){t=Math.round((d+n/2)/n)}}else{if(e){bJ(-1,b,false)}else if(g){bJ(+1,b,false)}}}if(t!=undefined){if(t<0)t=0;if(t>k-1)t=k-1;bI(bj.eq(t),b,false)}}else if(f.pseudoClick){if(!b.shiftKey){bJ(+1,b,true)}else{bJ(-1,b,true)}}}else{if(s>=0){bJ(+1,b,true)}else if(s<0){bJ(-1,b,true)}}G=F}}if(!touchFLAG){T.mousedown(bO)}else{U.addEventListener("touchstart",bO,false)}}}var b=a.browser.msie;var c=200;var d=a(window);a.fn.fotorama=function(b){var c=a.extend({startImg:0,width:null,height:null,vertical:false,transitionDuration:333,touchStyle:true,pseudoClick:true,backgroundColor:null,margin:5,minPadding:10,alwaysPadding:false,preload:3,zoomToFit:true,resize:false,arrows:true,arrowsColor:null,thumbs:true,thumbsBackgroundColor:null,thumbColor:null,thumbsPreview:true,thumbSize:null,thumbMargin:5,thumbBorderWidth:3,thumbBorderColor:null,thumbsPreviewRight:false,shadows:true,caption:false,onShowImg:null,detach:true},b);this.each(function(){var b=a(this);if(!b.data("initialized")){e(b,c)}})}})(jQuery);var _SPINNER="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAGoCAMAAAAQMBfHAAABtlBMVEX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8cWrVBAAAAkXRSTlMAKUfghaPCZkAlPw7nsHiUy1w3VBcoLEoiNsAw/EbdoYNlGSYIFEUdDEgS2yENIMi9CnfkLhUnkhutW5/5gGSCAgsyaZlEsVA4yQQfAxM9Khh/AWEPm7nVEfNCtB4kNDnGSU+JM5dznmAtXkuQO3JnTlhiWp2nIwf2rtgcPha7UYxf4avt0DUGpjp1eXwvTBBjhUW/zwAABtxJREFUeF7tmtlXE0kUxm/2zr5gwhI3QiAsCXtCQFED4gKCIKIgoo7ruI0zOjNuo7Pva/7jqTq3iy9dOc05eclT/94434/qk6fbt74mK6GLF0N0EJF6PXKgUBcgAJfLzcJyHvkjz/VOXQhXXAWVX/Z4PCOdViHsEqgz1q+zAYHzyjKZdB4VxtEbIpiq16dEPuiShEkCIyGSoUhkSAh7Ik6bOYwx/BlUORhIJNYg1ILBErWP7Fm/5GzWGgxfcEsuDFPUz0StguFmDJo1hVmrEDKFEKX4iGjKKvTzEUY/tY/pjY00gkLy+z1r3n3M54tD+CIQ6O3Tc9+MSIqLi0UWlIH8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";var _ERROR="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAAAAABWESUoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAJ0Uk5TAEQHIkixAAABv0lEQVQYGWXBQWcjcRzH4d+L+xpDRVRYETGXqt5W9FI9xFIVvfae64i11IgosfoGeqtaZawcwlgrlxE1Qvx99j+zk5lUn8fU6N48pmtc+vpwrZapNkgKGtvFUDVTJYgdH+xnJ6qYStEbn6wGKpm8wYZSHl+fS9Hl9w2l7bk8k9TP8HZ3oQ4mG7w8kmRSuKIyU6uzxHsLJZOm1CY6kuDFkqlfAE9vwH6kI0vADWRaAH86/Q2QR2p1MiCRdQrgVrrYAauuWjdAcWoTIAskjfGeAzWCDBjbHJipNMWbqxUDc/sFjFRZ4t2rMQJSy4EvqoQvgLvSQQ/IbQ8u0H+9DHg/Uy1w4MyBC1Q7eweynmp72FsO9HRw5YCXUJUusLUUGKlxj/dTlRGQ2hyI1UrwpirNgIWNgXWgRvCMN5a3BiZ2WgDf1OqugN2FNAaKjikBso5aUQ5s+p01sJBp4IBHHfm6B9InoOjLpBjvQUcm1KaSSWGKtzxRa0ZlFUomKcrx1mMdhHc7vKwvyeRdbCn9jS+H0vl1nFPaDOWZStGaT35HKpkqJz8cH7g4VMVUGz4WNHbJUDVTo3uTvKaOLF3enqrxD+aQUnwgKhDtAAAAAElFTkSuQmCC";var base64Test=new Image;var BASE64Flag=true;base64Test.onerror=function(){if(this.width!=1||this.height!=1){BASE64Flag=false}};base64Test.src=_ERROR