/**
 * Галерея изображений «Фоторама». Использует jQuery для работы с DOM и jTweener для анимаций.
 * @author Артём Поликарпов (artpolikarpov@gmail.com)
 * Версия 0.5
 */

var jTweener=function(){var Q=false;var D=60;var b=navigator.userAgent.toLowerCase();var a=/msie/.test(b)&&!/opera/.test(b);var B={};var W={};var X={time:1,transition:"easeoutexpo",namespace:"default",delay:0,prefix:{},suffix:{},onStart:undefined,onStartParams:undefined,onUpdate:undefined,onUpdateParams:undefined,onComplete:undefined,onCompleteParams:undefined};var J=["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor","borderColor"];var R=/^\s*([+\-])=\s*(\-?\d+)/;var V=false;var Z={};function U(){for(var c in jTweener.easingFunctions){Z[c.toLowerCase()]=jTweener.easingFunctions[c];}V=true;}function H(c,d){if(typeof c=="function"){if(d){c.apply(window,d);}else{c();}}}function G(f,c){if(f.style[c]){return f.style[c];}else{if(a){var e=f.currentStyle;if(c=="opacity"){f.style.zoom=1;return e.filter&&e.filter.indexOf("opacity=")>=0?parseFloat(e.filter.match(/opacity=([^)]*)/)[1])/100:1;}else{return f.currentStyle[c];}}else{if(document.defaultView&&document.defaultView.getComputedStyle){c=c.replace(/([A-Z])/g,"-$1").toLowerCase();var d=document.defaultView.getComputedStyle(f,"");return d&&d.getPropertyValue(c);}else{return null;}}}}function T(c){return(!(c instanceof Array)&&!c.jquery)?[c]:c;}function S(c){return c.nodeType?true:false;}function C(d){for(var c=0;c<J.length;c++){if(J[c]==d){return true;}}return false;}function A(c){return(typeof c=="function");}function E(d,c){var e=0;if(S(d)){e=G(d,c);}else{if(A(d[c])){e=d[c]();}else{e=d[c];}}return e;}function O(d,c){return parseFloat(E(d,c))||0;}function Y(d,e){if(W[d]&&W[d][e]){var f=W[d][e];for(var c=0;c<f.length;c++){H(f[c].func,f[c].params);}}}function M(i,d,h){var c=(i.suffix[d])?h+i.suffix[d]:h;if(A(i.target[d])){i.target[d].call(i.rawTarget,c);}else{if(i.targetPropeties[d].func){i.targetPropeties[d].func.call(i.rawTarget,h);}else{if(C(d)){var g=i.targetPropeties[d];i.target[d]=jTweener.Utils.Color.blend(g.start_color,g.end_color,h)+"";}else{try{if(a&&d=="opacity"&&S(i.rawTarget)){i.target.filter=(i.target.filter||"").replace(/alpha\([^)]*\)/,"")+(parseFloat(h).toString()=="NaN"?"":"alpha(opacity="+h*100+")");}else{i.target[d]=c;}}catch(f){}}}}}function F(){var c=(new Date()-0);var j=0;for(var l in B){var g=B[l];j++;for(var h=0;h<g.length;h++){var f=g[h];var n=c-f.startTime;var k=f.endTime-f.startTime;if(n>=k){for(var m in f.targetPropeties){var e=f.targetPropeties[m];M(f,m,e.b+e.c);}g.splice(h,1);H(f.onUpdate,f.onUpdateParams);H(f.onComplete,f.onCompleteParams);}else{for(var m in f.targetPropeties){var e=f.targetPropeties[m];M(f,m,f.easing(n,e.b,e.c,k));}H(f.onUpdate,f.onUpdateParams);}}Y(l,"onUpdate");if(!g.length){g=null;delete B[l];j--;Y(l,"onComplete");}}if(j>0){setTimeout(F,1000/D);}else{Q=false;}}function I(f,d){var c=0;if(f&&S(f)){f=f.style;}function e(h){for(var j=h.length-1;j>=0;j--){if(h[j].target==f){h.splice(j,1);c++;}}}if(!f&&d){B[d]=[];}else{if(d&&B[d]){e(B[d]);}else{for(var g in B){e(B[g]);}}}return c;}function K(d){var c={};for(var e in X){c[e]=d[e]||X[e];delete d[e];}if(A(c.transition)){c.easing=c.transition;}else{c.easing=Z[c.transition.toLowerCase()];}delete d.easing;return c;}function L(e){var c={};for(var d in e){if(e.hasOwnProperty(d)){c[d]=e[d];}}return c;}function N(h,k){k=L(k);var d=S(h);var e=K(k);e.rawTarget=h;e.target=(d)?h.style:h;e.targetPropeties={};var g;for(var j in k){if(!e.prefix[j]){e.prefix[j]="";}if(!e.suffix[j]){e.suffix[j]=(d&&j!="opacity")?"px":"";}var i=k[j];if(i===null){continue;}if(d){j=j.replace(/\-(\w)/g,function(m,l){return l.toUpperCase();});}if(C(j)){e.targetPropeties[j]={b:0,c:1,start_color:jTweener.Utils.getRGB(E(h,j)),end_color:jTweener.Utils.getRGB(i)};}else{if(A(i)){e.targetPropeties[j]={func:i,b:0,c:1};}else{var f=O(h,j);var c=i;if((g=R.exec(c))){c=f+(g[1]=="-"?-1:1)*parseFloat(g[2]);}else{c=parseFloat(c);}e.targetPropeties[j]={b:f,c:c-f};}}}return e;}function P(e,d){if(!V){U();}var c=d.delay||X.delay;setTimeout(function(){var f=N(e,d);f.startTime=(new Date()-0);f.endTime=f.time*1000+f.startTime;H(f.onStart,f.onStartParams);if(!B[f.namespace]){B[f.namespace]=[];}B[f.namespace].push(f);if(!Q){Q=true;F();}},c*1000);}return{addTween:function(e,c){e=T(e);for(var d=0;d<e.length;d++){P(e[d],c);}},addPercent:function(c){var d={};if(arguments.length==2){d=arguments[0];c=arguments[1];}P(d,c);return d;},addNSAction:function(f,e){e=e||X.namespace;if(!W[e]){W[e]={};}var c=W[e];for(var d in f){if(d.indexOf("Params")==-1){if(!c[d]){c[d]=[];}c[d].push({func:f[d],params:f[d+"Params"]});}}},removeNSActions:function(){switch(arguments.length){case 0:W={};break;default:var e=arguments[0];var f=[].splice.call(arguments,1);if(W[e]){if(f&&f.length){var c=W[e];for(var d=0;d<f.length;d++){delete c[f[d]];}}else{delete W[e];}}}},removeTween:function(){switch(arguments.length){case 0:B={};break;default:var e,c;if(arguments.length==1){if(typeof arguments[0]=="string"){e=arguments[0];}else{c=arguments[0];}}else{e=arguments[0];c=arguments[1];}if(c&&(c instanceof Array||c.jquery)){for(var d=0;
d<c.length;d++){I(c[d],e);}}else{I(c,e);}}}};}();jTweener.Utils={bezier2:function(A,D,C,B){return(1-A)*(1-A)*D+2*A*(1-A)*C+A*A*B;},bezier3:function(A,E,D,C,B){return Math.pow(1-A,3)*E+3*A*Math.pow(1-A,2)*D+3*A*A*(1-A)*C+A*A*A*B;},mergeObjects:function(){var A={};for(var C=0;C<arguments.length;C++){var D=arguments[C];if(!D){continue;}for(var B in D){A[B]=D[B];}}return A;},getRGB:function(B){var A;if(B&&B.constructor==jTweener.Utils.Color){return B;}if(A=/rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/.exec(B)){return new jTweener.Utils.Color(parseInt(A[1],10),parseInt(A[2],10),parseInt(A[3],10));}if(A=/rgb\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*\)/.exec(B)){return new jTweener.Utils.Color(parseFloat(A[1],10)*2.55,parseFloat(A[2],10)*2.55,parseFloat(A[3],10)*2.55);}if(A=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(B)){return new jTweener.Utils.Color(parseInt(A[1],16),parseInt(A[2],16),parseInt(A[3],16));}if(A=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(B)){return new jTweener.Utils.Color(parseInt(A[1]+A[1],16),parseInt(A[2]+A[2],16),parseInt(A[3]+A[3],16));}return new jTweener.Utils.Color(0,0,0);}};jTweener.Utils.Color=function(C,B,A){this.r=Math.max(Math.min(Math.round(C),255),0);this.g=Math.max(Math.min(Math.round(B),255),0);this.b=Math.max(Math.min(Math.round(A),255),0);};jTweener.Utils.Color.blend=function(B,A,C){C=C||0;return new jTweener.Utils.Color(B.r+(A.r-B.r)*C,B.g+(A.g-B.g)*C,B.b+(A.b-B.b)*C);};jTweener.Utils.Color.prototype={r:0,g:0,b:0,toString:function(){return"rgb("+this.r+","+this.g+","+this.b+")";}};jTweener.easingFunctions={easeNone:function(B,A,D,C){return D*B/C+A;},easeInQuad:function(B,A,D,C){return D*(B/=C)*B+A;},easeOutQuad:function(B,A,D,C){return -D*(B/=C)*(B-2)+A;},easeInOutQuad:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B+A;}return -D/2*((--B)*(B-2)-1)+A;},easeInCubic:function(B,A,D,C){return D*(B/=C)*B*B+A;},easeOutCubic:function(B,A,D,C){return D*((B=B/C-1)*B*B+1)+A;},easeInOutCubic:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B*B+A;}return D/2*((B-=2)*B*B+2)+A;},easeInExpo:function(B,A,D,C){return(B==0)?A:D*Math.pow(2,10*(B/C-1))+A-D*0.001;},easeOutExpo:function(B,A,D,C){return(B==C)?A+D:D*1.001*(-Math.pow(2,-10*B/C)+1)+A;},easeInOutExpo:function(B,A,D,C){if(B==0){return A;}if(B==C){return A+D;}if((B/=C/2)<1){return D/2*Math.pow(2,10*(B-1))+A-D*0.0005;}return D/2*1.0005*(-Math.pow(2,-10*--B)+2)+A;},easeInElastic:function(C,A,G,F,B,E){var D;if(C==0){return A;}if((C/=F)==1){return A+G;}if(!E){E=F*0.3;}if(!B||B<Math.abs(G)){B=G;D=E/4;}else{D=E/(2*Math.PI)*Math.asin(G/B);}return -(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A;},easeOutElastic:function(C,A,G,F,B,E){var D;if(C==0){return A;}if((C/=F)==1){return A+G;}if(!E){E=F*0.3;}if(!B||B<Math.abs(G)){B=G;D=E/4;}else{D=E/(2*Math.PI)*Math.asin(G/B);}return(B*Math.pow(2,-10*C)*Math.sin((C*F-D)*(2*Math.PI)/E)+G+A);},easeInOutElastic:function(C,A,G,F,B,E){var D;if(C==0){return A;}if((C/=F/2)==2){return A+G;}if(!E){E=F*(0.3*1.5);}if(!B||B<Math.abs(G)){B=G;D=E/4;}else{D=E/(2*Math.PI)*Math.asin(G/B);}if(C<1){return -0.5*(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A;}return B*Math.pow(2,-10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E)*0.5+G+A;},easeInBack:function(B,A,E,D,C){if(C==undefined){C=1.70158;}return E*(B/=D)*B*((C+1)*B-C)+A;},easeOutBack:function(B,A,E,D,C){if(C==undefined){C=1.70158;}return E*((B=B/D-1)*B*((C+1)*B+C)+1)+A;},easeInOutBack:function(B,A,E,D,C){if(C==undefined){C=1.70158;}if((B/=D/2)<1){return E/2*(B*B*(((C*=(1.525))+1)*B-C))+A;}return E/2*((B-=2)*B*(((C*=(1.525))+1)*B+C)+2)+A;},easeInBounce:function(B,A,D,C){return D-jTweener.easingFunctions.easeOutBounce(C-B,0,D,C)+A;},easeOutBounce:function(B,A,D,C){if((B/=C)<(1/2.75)){return D*(7.5625*B*B)+A;}else{if(B<(2/2.75)){return D*(7.5625*(B-=(1.5/2.75))*B+0.75)+A;}else{if(B<(2.5/2.75)){return D*(7.5625*(B-=(2.25/2.75))*B+0.9375)+A;}else{return D*(7.5625*(B-=(2.625/2.75))*B+0.984375)+A;}}}},easeInOutBounce:function(B,A,D,C){if(B<C/2){return jTweener.easingFunctions.easeInBounce(B*2,0,D,C)*0.5+A;}else{return jTweener.easingFunctions.easeOutBounce(B*2-C,0,D,C)*0.5+D*0.5+A;}}};jTweener.easingFunctions.linear=jTweener.easingFunctions.easeNone;(function(C){if(window.$t||!C){return ;}function B(G){return(typeof G=="function");}function F(){return C.Utils.mergeObjects.apply(this,arguments);}var A="__jto";var E=function(H,G){return new D(H,Array.prototype.slice.call(arguments,1));};function D(H,G){this.obj=H;this.options={};if(G instanceof Array){this.addOptions.apply(this,G);}else{this.addOptions(G);}}D.prototype={tween:function(){var G;if(arguments.length){G=Array.prototype.slice.call(arguments,0);G.unshift(this.options);G=F.apply(this,G);}else{G=this.options;}C.addTween(this.obj,G);return this;},percent:function(){var G=[];for(var H=0;H<arguments.length;H++){if(B(arguments[H])){var I={};I[A+H]=arguments[H];G.push(I);}else{G.push(arguments[H]);}}C.addPercent(this.obj,F.apply(this,G));return this;},stop:function(){C.removeTween(this.obj);
return this;},addOptions:function(){var G=Array.prototype.slice.call(arguments,0);G.unshift(this.options);this.options=F.apply(this,G);return this;},clearOptions:function(){this.options={};return this;},removeOptions:function(){for(var G=0;G<arguments.length;G++){delete this.options[String(arguments[G])];}return this;}};window.$t=E;})(jTweener);

(function($){
	$.fn.fotorama = function(options) {
		var o = $.extend({
			width: false,
			height: false,
			transitionDuration: .33,
			touchStyle: true,
			arrows: false,
			thumbsColor: false
		}, options);

		var TOUCH = ('ontouchstart' in document);
		var dragTimeout = 200;
		var defaultWrapWidth = 500;
		var defaultWrapHeight = 500;

		this.each(function(){
			var fotorama = $(this);

			var loop = false;

			if (!o.touchStyle) {
				loop = true;
			}

			var wrapWidth = o.width;
			var wrapHeight = o.height;

			if (o.touchStyle) {
				var stop = $("iframe", fotorama).add("object", fotorama);

				var shaftWidth,
						shaftLeft,
						x,
						y,
						downLeft,
						downTop,
						downShaftLeft,
						downTime,
						moveLeft,
						setMoveLeft,
						moveTime,
						upTime;

				var inProcess = false;
				var grabbing = false;
				var multi = false;
				var movable = false;
				var checkedDirection = false;
			}

			fotorama.wrapInner("<div class='fotorama__wrap'><div class='fotorama__shaft'></div></div>");
			var wrap = $(".fotorama__wrap", fotorama);
			var shaft = $(".fotorama__shaft", fotorama);
			var shaftEl = shaft.get(0);

			if (TOUCH) {
				wrap.addClass('fotorama__wrap_touch');
			}
			if (o.touchStyle) {
				wrap.addClass('fotorama__wrap_style_touch');
			} else {
				wrap.addClass('fotorama__wrap_style_fade');
			}

			wrap.append('<i class="fotorama__shadow fotorama__shadow_left"></i><i class="fotorama__shadow fotorama__shadow_right"></i>');
			var shadow = $('.fotorama__shadow', fotorama);



			var img = $("img", fotorama).not(".fotorama__div img");
			var div = $(".fotorama__div", fotorama);
			if (div.size()) {
				img = img.add(div);
				wrap.addClass('fotorama__wrap_with-div');
				if (!o.touchStyle) { o.arrows = true;}
			}

			if (o.arrows) {
				wrap.append('<i class="fotorama__arr fotorama__arr_prev">◄</i><i class="fotorama__arr fotorama__arr_next">►</i>');
				var arrPrev = $('.fotorama__arr_prev', fotorama);
				var arrNext = $('.fotorama__arr_next', fotorama);
			}

			wmodeOpaque(fotorama);
			if (o.touchStyle || div.size()) {
				disableSelection(fotorama, shaft);
			} else {
				disableSelection(fotorama, false);
			}

			var size = img.size();

			var activeImg;

			// Скрываем все картинки, кроме первой
			img.not(":first").css('visibility', 'hidden');

			var imgWrap = $();
			var thumb = $();

			// Контейнер для тумбсов-переключалок
			var thumbs = $('<div class="fotorama__thumbs"></div>');

			thumbs.insertAfter(wrap);

			if (img.eq(0).is(".fotorama__div") && (!wrapWidth || !wrapHeight)) {
				wrapWidth = defaultWrapWidth;
				wrapHeight = defaultWrapHeight;
				onResize();
			}

			img.each(function(i) {
				var thisImg = $(this);
				var isImg = thisImg.is("img");

				if (isImg) {
					thisImg
							.addClass("fotorama__img")
							.wrap('<div class="fotorama__frame"></div>');
				} else {
					thisImg
							.addClass("fotorama__img")
							.wrap('<div class="fotorama__frame fotorama__frame_div"></div>');
				}
				imgWrap = imgWrap.add(thisImg.parent());

				// Одна точка-переключалка
				var _thumb = $("<i class='fotorama__thumb'><i></i></i>");
				_thumb
						.addClass("fotorama__thumb_disabled")
						.appendTo(thumbs);
				thumb = thumb.add(_thumb);

				var imgWidth;
				var imgHeight;

				function onLoad() {
					//alert(i);
					imgWrap.eq(i).data('loaded', 'true');
					thisImg.css('visibility', 'visible');
					_thumb.removeClass("fotorama__thumb_disabled");

					if ((!wrapWidth || !wrapHeight) && i == 0 && isImg) {
						//Задаём ширину всей Фотораме по первой картинке, если она не задана в опциях
						wrapWidth = imgWidth;
						wrapHeight = imgHeight;
					}

					function checkSize() {
						if (!wrapWidth || !wrapHeight) {
							setTimeout(checkSize, 1000);
						} else {
							imgWrap.eq(i).css({
								width: wrapWidth,
								height: wrapHeight
							});

							imgWidth = thisImg.width();
							imgHeight = thisImg.height();

							if (isImg) {
								var imgRatio = imgWidth / imgHeight * 1000;
								var wrapRatio = wrapWidth / wrapHeight * 1000;


								if ((imgWidth != wrapWidth && imgHeight != wrapHeight) || (Math.round(imgRatio) != Math.round(wrapRatio))) {
									if (imgWidth - wrapWidth > -20) {
										imgWidth = wrapWidth - 20;
										imgHeight = Math.round((imgWidth) / imgRatio * 1000);
										thisImg
												.css({
													width: imgWidth,
													height: imgHeight
												});
									}
									if (imgHeight - wrapHeight > -20) {
										imgHeight = wrapHeight - 20;
										imgWidth = Math.round((imgHeight) * imgRatio / 1000);
										thisImg
												.css({
													width: imgWidth,
													height: imgHeight
												});
									}
									if (imgHeight < wrapHeight) {
										thisImg
												.css({
													top: Math.round((wrapHeight - imgHeight) / 2)
												});
									}
								}
							} else {
								if (imgHeight < wrapHeight) {
									thisImg
											.css({
											top: Math.round((wrapHeight - imgHeight) / 2)
										});
								}
							}
						}
					}
					checkSize();

					if (i == 0) {
						// Показываем первую картинку, когда она загружена
						showImg(imgWrap.eq(i), 0);
					}
					onResize();
				}

				if (isImg) {
					function checkIfLoaded() {
						imgWidth = thisImg.width();
						imgHeight = thisImg.height();
						if (!imgWidth || !imgHeight) {
							setTimeout(checkIfLoaded, 1000);
						} else {
							onLoad();
						}
					}
					checkIfLoaded();
				} else {
					onLoad(thisImg);
				}
			});


			thumbs.wrapInner('<div class="fotorama__thumbs-wrap"></div>')


			if (o.thumbsColor) {
				// Если переназначен цвет тумбсов
				$('i', thumb).css('background', o.thumbsColor);
			}

			// Биндим хендлеры
			// Клик по тумбсам
			thumb.click(function(e){
				e.stopPropagation();
				if (!$(this).data('disabled')) {
					var i = thumb.index($(this));
					var time = o.transitionDuration;
					if (e.shiftKey) {
						// Как на маке: клик с шифтом замедляет анимацию
						time = time*10;
					}
					showImg(imgWrap.eq(i), time);
				}
			});

			if (o.arrows) {
				// Клик по стрелочкам, если они включены
				function callShowImg(e, i) {
					var time = o.transitionDuration;
					if (e.shiftKey) {
						//  Клик с шифтом замедляет анимацию
						time = time*10;
					}
					showImg(imgWrap.eq(i), time);
				}

				arrPrev.click(function(e) {
					e.stopPropagation();
					if (!$(this).data('disabled')) {
						var i = imgWrap.index(activeImg) - 1;
						if (size - i < 1) i = 0;
						if (i < 0) i = size - 1;
						callShowImg(e, i);
					}
				});
				arrNext.click(function(e) {
					e.stopPropagation();
					if (!$(this).data('disabled')) {
						var i = imgWrap.index(activeImg) + 1;
						callShowImg(e, i);
					}
				});

				function setArrows() {
					var prevImg = activeImg.prev().filter(function(){return $(this).data('loaded')});
					var nextImg = activeImg.next().filter(function(){return $(this).data('loaded')});
					if (!prevImg.size() && !loop) {
						arrPrev.addClass('fotorama__arr_disabled').data('disabled', true);
					} else {
						arrPrev.removeClass('fotorama__arr_disabled').data('disabled', false);
					}
					if (!nextImg.size() && !loop) {
						arrNext.addClass('fotorama__arr_disabled').data('disabled', true);
					} else {
						arrNext.removeClass('fotorama__arr_disabled').data('disabled', false);
					}
				}
			}

			if (!o.touchStyle && !wrap.hasClass('fotorama__wrap_with-div')) {
				// Клик по картинке, если отключён режим таскания и это не диворама
				wrap.css('cursor', 'pointer');
				wrap.click(function(e){
					var i = imgWrap.index(activeImg);
					if (!e.shiftKey) {
						// Если клик без шифта
						i++;
						if (size - i < 1) i = 0;
					} else {
						// Если с шифтом
						i--;
						if (i < 0) i = size - 1;
					}
					showImg(imgWrap.eq(i), o.transitionDuration);
				});
			}

			// Показываем картинки, выделяем тумбсы
			function showImg(newImgWrap, time) {
				var index = imgWrap.index(newImgWrap);
				var newDot = thumb.eq(index);
				thumb.removeClass("fotorama__thumb_selected").data('disabled', false);
				newDot.addClass("fotorama__thumb_selected").data('disabled', true);
				activeImg = newImgWrap;
				imgWrap.not(newImgWrap).removeClass('fotorama__frame_active');
				newImgWrap.addClass('fotorama__frame_active');
				if (o.arrows) { setArrows();}

				if (o.touchStyle) {
					var left = -(newImgWrap.data('left'));

					jTweener.removeTween(shaft);
					if (time != 0) {
						jTweener.addTween(shaft, {
							left: left,
							transition: 'easeoutquad',
							time: time,
							onComplete: function(){
								inProcess = false;
							}
						});
					} else {
						shaft
							.css({
								left: left
							});
						inProcess = false;
					}
				} else {
					jTweener.removeTween(imgWrap);
					if (time != 0) {
						imgWrap.css({left: 0});
						jTweener.addTween(imgWrap.not(newImgWrap), {
							opacity: 0,
							transition: 'easeoutquad',
							time: time
						});
						jTweener.addTween(newImgWrap, {
							opacity: 1,
							transition: 'easeoutquad',
							time: time
						});
					} else {
						imgWrap.not(newImgWrap).css({left: -9999, opacity: 0});
						newImgWrap.css({left: 0, opacity: 1});
					}
				}
			}

			if (o.touchStyle) {

				function onMouseDown(e) {
					var t = $(e.target);

					if (!t.is("embed") && !t.is("iframe")) {
						function act() {
							inProcess = false;
							jTweener.removeTween(shaft);
							downTime = new Date().getTime();
							downLeft = x;
							downTop = y;
							shaftLeft = shaft.position().left;
							downShaftLeft = shaftLeft;
						}
						if (!TOUCH) {
							x = e.pageX;
							e.preventDefault();
							act();
							$(document).mousemove(onMouseMove);
							$(document).mouseup(onMouseUp);
							shaft.click(onClickFix);
							stop.mouseenter(onBreak);
						} else if (TOUCH && e.targetTouches.length == 1) {
							x = e.targetTouches[0].pageX;
							y = e.targetTouches[0].pageY;
							act();
							shaftEl.addEventListener('touchmove', onMouseMove, false);
							shaftEl.addEventListener('touchend', onMouseUp, false);
							multi = false;
						} else if (TOUCH && e.targetTouches.length > 1) {
							multi = true;
						}
					}

				}

				function onMouseMove(e) {
					function act() {
						e.preventDefault();
						if (!inProcess) {
							moveLeft = x;
							setMoveLeft = setInterval(function(){
								moveLeft = x;
							}, dragTimeout);
						}
						grabbing = true;
						inProcess = true;
						moveTime = new Date().getTime();
						wrap.addClass('fotorama__wrap_shadow');
						shaft.addClass('fotorama__shaft_grabbing');
						var left =  downLeft - x;
						var minLeft = -(shaftWidth - wrapWidth);

						shaftLeft = downShaftLeft-left;

						if (shaftLeft > 0) {
							shaftLeft = Math.round(shaftLeft - (shaftLeft/1.25));
							wrap
									.addClass('fotorama__wrap_shadow_no-left fotorama__wrap_shadow_no-right')
									.removeClass('fotorama__wrap_shadow_no-right');
						} else if (shaftLeft < minLeft ) {
							shaftLeft = Math.round(shaftLeft + ((minLeft - shaftLeft) / 1.25));
							wrap
									.addClass('fotorama__wrap_shadow_no-right fotorama__wrap_shadow_no-left')
									.removeClass('fotorama__wrap_shadow_no-left');
						} else {
							wrap.removeClass('fotorama__wrap_shadow_no-left fotorama__wrap_shadow_no-right');
						}

						shaft.css('left', shaftLeft);
					}
					if (!TOUCH) {
						x = e.pageX;
						act();
					} else if (TOUCH && e.targetTouches.length == 1 && !multi) {
						x = e.targetTouches[0].pageX;
						y = e.targetTouches[0].pageY;

						if (!movable && !checkedDirection) {
							if (Math.abs(x-downLeft) > Math.abs(y-downTop)) {
								movable = true;
								e.preventDefault();
							}
							checkedDirection = true;
						} else if (!movable && checkedDirection) {
							//original event
						} else {
							act();
						}
					}
				}

				function onBreak() {
					if (!TOUCH) {
						$(document).unbind('mouseup');
						$(document).unbind('mousemove');
					} else {
						movable = false;
						checkedDirection = false;
						shaftEl.removeEventListener('touchmove', onMouseMove, false);
						shaftEl.removeEventListener('touchend', onMouseUp, false);
					}
					clearInterval(setMoveLeft);
					wrap.removeClass('fotorama__wrap_shadow fotorama__wrap_shadow_no-left fotorama__wrap_shadow_no-right');;
					shaft.removeClass('fotorama__shaft_grabbing');
					if (activeImg) {
						showImg(activeImg, o.transitionDuration);
					}
				}

				function onMouseUp(e) {
					if (!TOUCH || !e.targetTouches.length) {
						movable = false;
						checkedDirection = false;
						clearInterval(setMoveLeft);
						setTimeout(function() {
							grabbing = false;
						}, 100);

						if (grabbing) {
							e.preventDefault();
						} else {
							shaft.unbind('click');
						}
						if (!TOUCH) {
							$(document).unbind('mouseup');
							$(document).unbind('mousemove');
						} else {
							document.removeEventListener('touchmove', onMouseMove, false);
							document.removeEventListener('touchend', onMouseUp, false);
						}
						wrap.removeClass('fotorama__wrap_shadow fotorama__wrap_shadow_no-left fotorama__wrap_shadow_no-right');
						shaft.removeClass('fotorama__shaft_grabbing');

						upTime = new Date().getTime();
						var timeDiff = upTime - moveTime;

						var dirtyLeft = -shaftLeft;

						var forceLeft = false;
						var forceRight = false;
						var isFlicked = timeDiff < dragTimeout;

						var direction = moveLeft - x;

						if (isFlicked) {
							if (direction < 0) {
								forceLeft = true;
							} else {
								forceRight = true;
							}
						}

						var leftImg = imgWrap.filter(
								function() {
									var thisImgWrap = $(this);
									return thisImgWrap.data('left') <= dirtyLeft && thisImgWrap.data('loaded');
								}).filter(":last");
						var rightImg = imgWrap.filter(
								function() {
									var thisImgWrap = $(this);
									return thisImgWrap.data('left') > dirtyLeft && thisImgWrap.data('loaded');
								}).filter(":first");

						var newImg;

						if (leftImg.size() && rightImg.size()) {
								var leftDayLeft = leftImg.data('left');
								var rightDayLeft = rightImg.data('left');
							if (!forceLeft && !forceRight) {
								if ((leftDayLeft - dirtyLeft) < (dirtyLeft - rightDayLeft)) {
									newImg = rightImg;
								} else {
									newImg = leftImg;
								}
							} else if (forceLeft) {
								newImg = leftImg;
							} else if (forceRight) {
								newImg = rightImg;
							}
						} else if (!leftImg.size()) {
								newImg = rightImg;
						} else if (!rightImg.size()) {
								newImg = leftImg;
						}

						showImg(newImg, o.transitionDuration);
					}
				}

				function onClickFix(e) {
					e.preventDefault();
				}
				if (!TOUCH) {
					shaft.mousedown(onMouseDown);
				} else {
					shaftEl.addEventListener('touchstart', onMouseDown, false);
				}
			}
			function onResize() {
				shaftWidth = shaft.width();

				wrap
					.css({
						width: wrapWidth,
						height: wrapHeight
					});
				thumbs
					.css({
						width: wrapWidth
					});
				shadow
					.css({
						height: wrapHeight - 10
					});
				if (o.arrows) {
					arrPrev.add(arrNext)
							.css({
								top: wrapHeight / 2
							});
				}

				imgWrap.each(function(){
					var thisWrap = $(this);
					var thisWrapPosition = thisWrap.position();
					thisWrap.data({
						'left': thisWrapPosition.left
					});
				});

				if (activeImg) {
					showImg(activeImg, 0);
				}
			}
		});
	}
})(jQuery);

function wmodeOpaque(target) {
	var iframe = $("iframe:not(.js-opaque)", target);
	if (iframe.size()) {
		iframe.each(function(){
			var clone = $(this).clone();
			var src = clone.attr('src');
			var q = src.indexOf("?") > 0 ? '&' : '?';
			clone.attr('src', src+q+'wmode=opaque').addClass("js-opaque");
			$(this).after(clone).remove();
		});
	}

	var object = $("object:not(.js-opaque)", target);
	if (object.size()) {
		object.each(function(){
			var clone = $(this).clone();
			clone.addClass("js-opaque");
			$('<param name="wmode" value="opaque">').appendTo(clone);
			$("embed", clone).attr({'wmode': 'opaque'});
			$(this).after(clone).remove();
		});
	}
}

function disableSelection(target, stop) {
	target
		.mousemove(function(e){
			e.preventDefault();
		})
		.mousedown(function(e){
			e.preventDefault();
		});
	if (stop) {
		stop
				.mousedown(function(e) {
				e.stopPropagation();
			});
	}
}