/* Fotorama 1.5 (v1201) http://fotoramajs.com/ */

/* Modernizr 2.0.6 (Custom Build) | MIT & BSD
 * Build: http://www.modernizr.com/download/#-csstransforms3d-csstransitions-canvas-teststyles-testprop-testallprops-prefixes-domprefixes
 */
;window.Mdrnzr=function(a,b,c){function B(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+n.join(c+" ")+c).split(" ");return A(d,b)}function A(a,b){for(var d in a)if(j[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function z(a,b){return!!~(""+a).indexOf(b)}function y(a,b){return typeof a===b}function x(a,b){return w(m.join(a+";")+(b||""))}function w(a){j.cssText=a}var d="2.0.6",e={},f=b.documentElement,g=b.head||b.getElementsByTagName("head")[0],h="Mdrnzr",i=b.createElement(h),j=i.style,k,l=Object.prototype.toString,m=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),n="Webkit Moz O ms Khtml".split(" "),o={},p={},q={},r=[],s=function(a,c,d,e){var g,i,j,k=b.createElement("div");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),k.appendChild(j);g=["&shy;","<style>",a,"</style>"].join(""),k.id=h,k.innerHTML+=g,f.appendChild(k),i=c(k,a),k.parentNode.removeChild(k);return!!i},t,u={}.hasOwnProperty,v;!y(u,c)&&!y(u.call,c)?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],c)};var C=function(a,c){var d=a.join(""),f=c.length;s(d,function(a,c){var d=b.styleSheets[b.styleSheets.length-1],g=d.cssRules&&d.cssRules[0]?d.cssRules[0].cssText:d.cssText||"",h=a.childNodes,i={};while(f--)i[h[f].id]=h[f];e.csstransforms3d=i.csstransforms3d.offsetLeft===9},f,c)}([,["@media (",m.join("transform-3d),("),h,")","{#csstransforms3d{left:9px;position:absolute}}"].join("")],[,"csstransforms3d"]);o.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},o.csstransforms3d=function(){var a=!!A(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]);a&&"webkitPerspective"in f.style&&(a=e.csstransforms3d);return a},o.csstransitions=function(){return B("transitionProperty")};for(var D in o)v(o,D)&&(t=D.toLowerCase(),e[t]=o[D](),r.push((e[t]?"":"no-")+t));w(""),i=k=null,e._version=d,e._prefixes=m,e._domPrefixes=n,e.testProp=function(a){return A([a])},e.testAllProps=B,e.testStyles=s;return e}(this,this.document);

/*!
 * Bez v1.0.10-g5ae0136
 * http://github.com/rdallasgray/bez
 *
 * A plugin to convert CSS3 cubic-bezier co-ordinates to jQuery-compatible easing functions
 *
 * With thanks to Nikolay Nemshilov for clarification on the cubic-bezier maths
 * See http://st-on-it.blogspot.com/2011/05/calculating-cubic-bezier-function.html
 *
 * Copyright 2011 Robert Dallas Gray. All rights reserved.
 * Provided under the FreeBSD license: https://github.com/rdallasgray/bez/blob/master/LICENSE.txt
*/jQuery.extend({bez:function(a){var b="bez_"+$.makeArray(arguments).join("_").replace(".","p");if(typeof jQuery.easing[b]!="function"){var c=function(a,b){var c=[null,null],d=[null,null],e=[null,null],f=function(f,g){return e[g]=3*a[g],d[g]=3*(b[g]-a[g])-e[g],c[g]=1-e[g]-d[g],f*(e[g]+f*(d[g]+f*c[g]))},g=function(a){return e[0]+a*(2*d[0]+3*c[0]*a)},h=function(a){var b=a,c=0,d;while(++c<14){d=f(b,0)-a;if(Math.abs(d)<.001)break;b-=d/g(b)}return b};return function(a){return f(h(a),1)}};jQuery.easing[b]=function(b,d,e,f,g){return f*c([a[0],a[1]],[a[2],a[3]])(d/g)+e}}return b}});

(function($){
	var touchFLAG = ('ontouchstart' in document);
	var csstrFLAG = Mdrnzr.csstransforms3d && Mdrnzr.csstransitions;
	var ieFLAG = $.browser.msie;
	var quirksFLAG = document.compatMode != 'CSS1Compat' && ieFLAG;

	var o__dragTimeout = 300;
	var o__bezier = $.bez([.1,0,.25,1]);

	//alert(quirksFLAG);

	var $window = $(window);
	var $document = $(document);

	$.fn.fotorama = function(options) {
		var o = $.extend({
			data: null,
			width: null,
			height: null,
			startImg: 0,
			transitionDuration: 333,
			touchStyle: true,
			pseudoClick: true,
			backgroundColor: null,
			margin: 5,
			minPadding: 10,
			alwaysPadding: false,
			preload: 3,
			resize: false,
			zoomToFit: true,
			vertical: false,
			verticalThumbsRight: false,
			arrows: true,
			arrowsColor: null,
			thumbs: true,
			thumbsBackgroundColor: null,
			thumbColor: null,
			thumbsPreview: true,
			thumbSize: null,
			thumbMargin: 5,
			thumbBorderWidth: 3,
			thumbBorderColor: null,
			caption: false,
			html: null,
			onShowImg: null,
			shadows: true,
			detachSiblings: true
		}, options);

		this.each(function(){
			var fotorama = $(this);
			if (!fotorama.data('initialized')) {
				doFotorama(fotorama, o);
			}
		});
	}

	function getTranslate(pos, vertical) {
		if (csstrFLAG) {
			var value;
			if (!vertical) {
				value = 'translate3d(' + pos + 'px,0,0)';
			} else {
				value = 'translate3d(0,' + pos + 'px,0)';
			}
			return {
				'-moz-transform': value,
				'-webkit-transform': value,
				'-o-transform': value,
				transform: value
			}
		} else {
			if (!vertical) {
				return {left: pos};
			} else {
				return {top: pos};
			}
		}
	}

	function getDuration(time) {
		var value = time+'ms';
		return {
			'-moz-transition-duration': value,
			'-webkit-transition-duration': value,
			'-o-transition-duration': value,
			'transition-duration': value
		}
	}

//	function getBoxShadowColor(color) {
//		var value = '0 0 10px ' + color;
//		return {
//			'-moz-box-shadow': value,
//			'-webkit-box-shadow': value,
//			'-o-box-shadow': value,
//			'box-shadow': value
//		}
//	}

	function disableSelection(target) {
		target
			.mousemove(function(e){
				e.preventDefault();
			})
			.mousedown(function(e){
				e.preventDefault();
			});
	}

	var _SPINNER = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAGoCAMAAAAQMBfHAAABtlBMVEX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8cWrVBAAAAkXRSTlMAKUfghaPCZkAlPw7nsHiUy1w3VBcoLEoiNsAw/EbdoYNlGSYIFEUdDEgS2yENIMi9CnfkLhUnkhutW5/5gGSCAgsyaZlEsVA4yQQfAxM9Khh/AWEPm7nVEfNCtB4kNDnGSU+JM5dznmAtXkuQO3JnTlhiWp2nIwf2rtgcPha7UYxf4avt0DUGpjp1eXwvTBBjhUW/zwAABtxJREFUeF7tmtlXE0kUxm/2zr5gwhI3QiAsCXtCQFED4gKCIKIgoo7ruI0zOjNuo7Pva/7jqTq3iy9dOc05eclT/94434/qk6fbt74mK6GLF0N0EJF6PXKgUBcgAJfLzcJyHvkjz/VOXQhXXAWVX/Z4PCOdViHsEqgz1q+zAYHzyjKZdB4VxtEbIpiq16dEPuiShEkCIyGSoUhkSAh7Ik6bOYwx/BlUORhIJNYg1ILBErWP7Fm/5GzWGgxfcEsuDFPUz0StguFmDJo1hVmrEDKFEKX4iGjKKvTzEUY/tY/pjY00gkLy+z1r3n3M54tD+CIQ6O3Tc9+MSIqLi0UWlIH8WFYkMa83Jh9xymKUtkR+oluqXgEJRqVxqkbMCucQlNFPzJmHvi85h0BdLwP/XCFFcZt0gWr9yAEEGya93skDhb5YrI9aw8HBIXXuXOpAIcFzxR6PAAEIDjcL61nk9/zXDF3o2KnvqjwoxsG4YRU6DosBqc4oX2MDAuc7VTIxeoTRc1sEYzz8nsr8cAcRDHOkhBKJkBB+EPlJzmE0jpQplYPn0egtCAORyOfUPtLzPsl82hpMjLokoxMU9zFxDjD/mSDNmMKMnTDNR8SnrcIgG8FBah99L14UGyf3jZw1zxzncWey5nYfqWo5T5Lc+fM5FpSB/HhFJMlAICkfMWAxahsiP52RakBAgkPSGMgTk+McgjLCam4+8c5nCAIbS+5fMBeryoVA+TByAMGGuUBg7kChkEwWyMHBodV9hVcVW6I8V+zxCxCAlavNQvky8oe+rW5d6LzueUT6qzsLWA/VGdtbbEDg/Pp68/owy8PvhsyPdhLBMEdKKir3KbqDJRdG40gZUzlYiMczENYSiQFqH8VFr2SxqF8j1CUXQxTzMjH9GoGJ0CTn+mIyZQpT1MdH6IvJEB8RGaL2Ubh7N9c4ufu01b+rl8edyddirl/Vcp4kwxcuDLOgDOS9N3kfN+Qj0hYjvymXyy6pugUkKEkjvUzMKucQlJEn5spQ4CXnECicdt0kLPI1goCLGh0I9oTkfcFB9Bst3xc4ODik53lVsSXOc8UenwAByJWaheEg8ifejYwuGNf890h/dWcB66E6I7zBBgTOr5Wb14cZHn63Zd5jEMEwR8p0XO5T9COWXBiNI2VW5cAVi+1BuBWNPqf2kTsfkJzP6dcIHsm5FCUDTFK/RmASNMe5vpiMmcIYFfgIfTEJ8RGJELWP/lRquHFy//TKmh86wuPOZERcLnyq5TxJJkZHJ1hQBvIjZV63g/IRJy3Gr0siHzgkVZeABN9K42SVmBLnEJRxX83NBfcS5xCo4019/BIpwnnSBareRw4gAIBfYc9gsLX7AgcHBxQ99nDRo2ihZFmdaBauriAfCmx26UL3lu8h6a/uLGA9VGfUNtmAwPnWtrY+oOjJyvwYL7Ewkih6nmHJhdE4UmZUDlaSyfcQMvH4ArUNFJl2tSeKTAuoPVFkWkDtaVNkovZsH4Ny3BEm9893kal+OwihR7TbHVrOAtf6QmADuWQQtX5oxGJcqpj9Nyp1tzRG1onJcw5BGY/JpKByCNT5zvMb5mJ+mXSB1h8jBxAAQK1vC9f6LeDg4ICixx4uehQtlCyl181CKYccL94QMhveJ6S/urOA9VCdkV9iAwLnG2FtfUDRU5H58Yy2YBgoev7AkgujcaRMqhx8MIxVCHuxmIvaBopMu9oTPaUF1J42AmpPmyITtWf7GLpzJ9Q4uXeXkKl+OwLhK9Fuf6Ln9SnU+kJQBvLDT1Hrp8YtRnnH7L9RqX8jjfEyMVnOISijoibvbv0N5xDI+Oh/doYU96ukC1SuIAcQAECtbwNq/RZwcHDgoscWFD1MKyVLfrlZmFhFXnBVwrrQtRkYIv3VnQWsh+qM5QobEDjfrGnrA4qemzLv7dIXEBQ9r3iFtV9h5lQOSsFgDcL7ZHKF2gaKTLvaE0WmBdSeKDItoPa0KTJRe7aP0Nu3qcbJ/eB3ZKrfTkD4TrTba3ruGUOtLwQY+AAbtf70CYsxrD7hRqV+SxontvWPwCGwUVRz85HnHecQqPtL35+Yi4/XSRdou4gcQAAAtb4tXOu3goODAxc9LVQkLZQs2fVm4XUJ+W59pwPC/oeFC6S/urOA9VCdUd1hAwLnS3ltfcCvKMv8CC+xMCIoekJYcmFgpAhB5eDzSGQAwqphfKC2gSLTrvZEkWkBtSeKTAuoPW2KTNSe7SP14EG2cXL/9Tcy1W9HIXwm2u0FPffPotYXAgx8gI1av++0xfhXfcKNSv2yNE6H9Y/AIbBRJebMPf9HziFQZt77H+ZipUy6QOEqcgABANT6NqDWB/Q/YZc7Ll94G0kAAAAASUVORK5CYII=';
	var _ERROR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAAAAABWESUoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAJ0Uk5TAEQHIkixAAABv0lEQVQYGWXBQWcjcRzH4d+L+xpDRVRYETGXqt5W9FI9xFIVvfae64i11IgosfoGeqtaZawcwlgrlxE1Qvx99j+zk5lUn8fU6N48pmtc+vpwrZapNkgKGtvFUDVTJYgdH+xnJ6qYStEbn6wGKpm8wYZSHl+fS9Hl9w2l7bk8k9TP8HZ3oQ4mG7w8kmRSuKIyU6uzxHsLJZOm1CY6kuDFkqlfAE9vwH6kI0vADWRaAH86/Q2QR2p1MiCRdQrgVrrYAauuWjdAcWoTIAskjfGeAzWCDBjbHJipNMWbqxUDc/sFjFRZ4t2rMQJSy4EvqoQvgLvSQQ/IbQ8u0H+9DHg/Uy1w4MyBC1Q7eweynmp72FsO9HRw5YCXUJUusLUUGKlxj/dTlRGQ2hyI1UrwpirNgIWNgXWgRvCMN5a3BiZ2WgDf1OqugN2FNAaKjikBso5aUQ5s+p01sJBp4IBHHfm6B9InoOjLpBjvQUcm1KaSSWGKtzxRa0ZlFUomKcrx1mMdhHc7vKwvyeRdbCn9jS+H0vl1nFPaDOWZStGaT35HKpkqJz8cH7g4VMVUGz4WNHbJUDVTo3uTvKaOLF3enqrxD+aQUnwgKhDtAAAAAElFTkSuQmCC';
	var base64Test = new Image();
	var BASE64FLAG = true;
	base64Test.onerror = function(){
		if(this.width != 1 || this.height != 1){
			BASE64FLAG = false;
		}
	}
	base64Test.src = _ERROR;

	function doFotorama(fotorama, o) {
		fotorama.data({initialized: true});

		var fotoramaState;

		var timestamp = new Date().getTime();

		fotorama.addClass('fotorama');

		if (!o.vertical) {
			fotorama.addClass('fotorama_horizontal');
		} else {
			fotorama.addClass('fotorama_vertical');
		}

		$('a', fotorama).live('click', function(e){
			e.preventDefault();
		});


		// Все изображения
		var img;
		var dataFLAG = o.data && typeof(o.data) == 'object';
		if (!dataFLAG) {
			img = fotorama.children().filter(function(){
				var thisChild = $(this);
				return ((thisChild.is('a') && thisChild.children('img').size()) || thisChild.is('img')) && (thisChild.attr('href') || thisChild.attr('src') || thisChild.children().attr('src'));
			});
		} else {
			img = $(o.data).filter(function(){
				return this.img;
			});
		}
		var size = img.size();

		fotorama.data({size: size});
		if (o.startImg > size - 1 || typeof(o.startImg) != 'number') {
			o.startImg = 0
		}

		var src = [];
		img.each(function(i){
			if (!dataFLAG) {
				var thisImg = $(this);
				src[i] = {'imgHref': thisImg.attr('href'), 'imgSrc': thisImg.attr('src'), 'thumbSrc': thisImg.children().attr('src')};
			} else {
				src[i] = {'imgHref': this.img, 'thumbSrc': this.thumb};
			}
		});

		// Очищаем DOM
		fotorama.html('');

		if (!o.touchStyle) {
			o.arrows = false;
		}

		var srcState = [];

		var wrapSize, wrapSize2;
		var wrapWidth = o.width;
		var wrapHeight = o.height;
		var wrapRatio, wrapRatioIdeal;
		var wrapIsSetFLAG = false;
		var loadTimeout;

		if (o.touchStyle) {
			var shaftSize = 0,
				shaftSize2;

			var shaftGrabbingFLAG = false;
			var shaftMouseDownFLAG = false;
			var setShaftGrabbingFLAGTimeout;
		}

		if (o.thumbs && o.thumbsPreview) {
			var thumbsShaftMouseDownFLAG = false;
			var thumbsShaftDraggedFLAG = false;
			var thumbsShaftJerkFLAG = false;
			var thumbsShaftGrabbingFLAG = false;
			var setThumbsShaftGrabbingFLAGTimeout;
		}


		var _pos, _pos2, _coo, _coo2, _size, _size2;
			if (!o.vertical) {
				_pos = 'left';
				_pos2 = 'top';
				_coo = 'pageX';
				_coo2 = 'pageY';
				_size = 'width';
				_size2 = 'height';
			} else {
				_pos = 'top';
				_pos2 = 'left';
				_coo = 'pageY';
				_coo2 = 'pageX';
				_size = 'height';
				_size2 = 'width';
			}

		var wrap = $('<div class="fotorama__wrap"></div>').appendTo(fotorama);
		var shaft = $('<div class="fotorama__shaft"></div>').appendTo(wrap);

		// Запрещаем выделять фотораму
		disableSelection(fotorama);

		var stateIcon = $('<div class="fotorama__state"></div>').appendTo(shaft);
		var stateIconSpinnerInterval;
		var stateIconSpinnerIntervalI = 0;
		var stateIconPositionTimeout;

		function stateIconSpinner() {
			stateIcon.css({backgroundPosition: '24px ' + (24 - 56*stateIconSpinnerIntervalI) + 'px'});
			stateIconSpinnerIntervalI++;
			if (stateIconSpinnerIntervalI > 7) stateIconSpinnerIntervalI = 0;
		}

		if (touchFLAG) {
			wrap.addClass('fotorama__wrap_touch');
			o.shadows = false;
		}
		if (o.touchStyle) {
			wrap.addClass('fotorama__wrap_style_touch');
			if (o.shadows) {
				wrap.append('<i class="fotorama__shadow fotorama__shadow_prev"></i><i class="fotorama__shadow fotorama__shadow_next"></i>');
			}
		} else {
			wrap.addClass('fotorama__wrap_style_fade');
		}

		if (csstrFLAG) {
			fotorama.addClass('fotorama_csstransitions');
		}

		if (o.arrows) {
			var _arrPrev, _arrNext;
			if (!o.vertical) {
				_arrPrev = '&#9668;';
				_arrNext = '&#9658;';
			} else {
				_arrPrev = '&#9650;';
				_arrNext = '&#9660;';
			}

			var arrs = $('<i class="fotorama__arr fotorama__arr_prev">'+_arrPrev+'</i><i class="fotorama__arr fotorama__arr_next">'+_arrNext+'</i>').appendTo(wrap);
			var arrPrev = arrs.eq(0);
			var arrNext = arrs.eq(1);

			if (!touchFLAG) {
				// Стрелочки при наведении на фотораму
				var wrapEnteredFLAG = false;
				var wrapLeaveTimeout;
				function wrapEnter() {
					wrapEnteredFLAG = true;
					clearTimeout(wrapLeaveTimeout);
					arrs.css(getDuration(0));
					wrap.removeClass('fotorama__wrap_mouseout');
					setTimeout(function(){
						arrs.css(getDuration(o.transitionDuration));
						setTimeout(function(){
							wrap.addClass('fotorama__wrap_mouseover');
						},1);
					},1);
				}
				function wrapLeave() {
					clearTimeout(wrapLeaveTimeout);
					wrapLeaveTimeout = setTimeout(function(){
						if (!shaftGrabbingFLAG && !wrapEnteredFLAG) {
							wrap
									.removeClass('fotorama__wrap_mouseover')
									.addClass('fotorama__wrap_mouseout');
						}
					}, o.transitionDuration*3);
				}
				wrap.mouseenter(function(){
					wrapEnter();
				});
				wrap.mouseleave(function(){
					wrapEnteredFLAG = false;
					wrapLeave();
				});
			}
		}

		var activeImg;

		var imgFrame = $();
		img.each(function(i){
			// Заготавливаем фреймы под фотки
			var _imgFrame = $('<div class="fotorama__frame" style="visibility: hidden;"></div>');
			imgFrame = imgFrame.add(_imgFrame);
		});

		if (o.thumbs) {
			var o__thumbSize = o.thumbSize;
			if (!o__thumbSize) {
				o__thumbSize = o.vertical ? 64 : 48;
			}
			// Если тумбсы или превьюшки
			var activeThumb;
			var activeThumbPrevIndex = 0;
			// Контейнер для тумбсов-переключалок
			var thumbs = $('<div class="fotorama__thumbs"></div>').appendTo(fotorama).css('visibility', 'hidden');
			var thumbsSize2;

			if (o.thumbsPreview) {
				o.thumbOpacity = .66;
				o.thumbOpacityActive = 1;
				thumbsSize2 = o__thumbSize + o.thumbMargin*2;
				thumbs
						.addClass('fotorama__thumbs_previews')
						.css(_size2, thumbsSize2);
			}

			var thumbsShaft = $('<div class="fotorama__thumbs-shaft"></div>').appendTo(thumbs);
			if (o.thumbsPreview) {
				var thumbsShaftSize = 0;
				var thumbsShaftPos = undefined;
				if (o.shadows) {
					var thumbsShadow = $('<i class="fotorama__shadow fotorama__shadow_prev"></i><i class="fotorama__shadow fotorama__shadow_next"></i>').appendTo(thumbs);
				}

				var thumbBorderSize2 = o__thumbSize - (quirksFLAG ? 0 : o.thumbBorderWidth*2);
				var thumbBorderPos2 = o.thumbMargin;
				var thumbBorder = $('<i class="fotorama__thumb-border"></i>')
														.hide()
														.css(_size2, thumbBorderSize2)
														.css(_pos2, thumbBorderPos2)
														.css('border-width', o.thumbBorderWidth)
														.appendTo(thumbsShaft);
			}

			// Создаём точки и превьюшки
			img.each(function(i){
				// Одна точка-переключалка
				var _thumb;
				if (o.thumbsPreview) {
					_thumb = $('<div class="fotorama__thumb"></div>');
					_thumb.css(_size2, o__thumbSize).css('margin', o.thumbMargin);
				} else {
					_thumb = $('<i class="fotorama__thumb"><i class="fotorama__thumb__dot"></i></i>');
				}
				_thumb.appendTo(thumbsShaft);
			});

			var thumb = $('.fotorama__thumb', fotorama);

			if (o.thumbsPreview) {
				// Загружаем превьюшки
				img.each(function(i){
					function onLoad(thisThumbNew) {
						var $thisThumbNew = $(thisThumbNew);

						var thumbWidth = $thisThumbNew.width();
						var thumbHeight = $thisThumbNew.height();
						var thumbRatio = thumbWidth / thumbHeight * 1000;

						// Одна точка-переключалка на загрузке
						var _thumbSize;
						if (!o.vertical) {
							_thumbSize = Math.round(o__thumbSize * thumbRatio / 1000);
						} else {
							_thumbSize = Math.round(o__thumbSize / thumbRatio * 1000);
						}

						if (Mdrnzr.canvas) {
							$thisThumbNew.remove();
							$thisThumbNew = $('<canvas class="fotorama__thumb__img"></canvas>');
							$thisThumbNew.appendTo(thumb.eq(i));
						} else {
							$thisThumbNew.addClass('fotorama__thumb__img');
						}
						$thisThumbNew
								.attr(_size, _thumbSize)
								.attr(_size2, o__thumbSize)
								.css(_size, _thumbSize)
								.css(_size2, o__thumbSize)
								.css('visibility', 'visible');
						if (Mdrnzr.canvas) {
							var ctx = $thisThumbNew[0].getContext('2d');
							if (!o.vertical) {
								ctx.drawImage(thisThumbNew, 0, 0, _thumbSize, o__thumbSize);
							} else {
								ctx.drawImage(thisThumbNew, 0, 0, o__thumbSize, _thumbSize);
							}
						}
						if (!touchFLAG && i != 0) {
							$thisThumbNew.stop().fadeTo(0, o.thumbOpacity);
						}

						thumbsShaftSize += _thumbSize + o.thumbMargin - (o__thumbSize + o.thumbMargin);
						thumbsShaft.css(_size, thumbsShaftSize);
						thumb.eq(i).css(_size, _thumbSize).data(_size, _thumbSize);

						setThumbsShaft();
					}

					// Если включены превьюшки, придётся загружать все картинки разом
					// Будем делать это порциями по 20 в секунду
					var interval = i*50;
					setTimeout(function(){
						loadImg(i, thumb.eq(i), onLoad, 'thumb');
					}, interval);
				});
			}

		}

		if (o.caption) {
			var caption = $('<p class="fotorama__caption"></p>');
			caption.appendTo(fotorama);
		}

		function getRatioWidthHeight() {
			if (!wrapRatio) {
				wrapRatio = wrapWidth / wrapHeight * 1000;
				wrapRatioIdeal = wrapRatio;
			}
			if (o.thumbs && !thumbsSize2) {
				thumbsSize2 = o.vertical ? thumbs.width() : thumbs.height();
			}
			if (o.resize) {
				wrapRatio = wrapRatioIdeal;
				var windowHeight = $window.height();
				wrapWidth = fotorama.width() - (o.vertical && thumbsSize2  ? thumbsSize2 : 0);
				wrapHeight = Math.round(wrapWidth / wrapRatio * 1000);
				if (wrapHeight > windowHeight - 40 - (!o.vertical && thumbsSize2 ? thumbsSize2 : 0)) {
					wrapHeight = windowHeight - 40 - (!o.vertical && thumbsSize2 ? thumbsSize2 : 0);
					wrapRatio = wrapWidth / wrapHeight * 1000;
					//wrapWidth = Math.round(wrapHeight * wrapRatio / 1000);
				}
			}
		}

		var resizeStack = [];

		function setFotoramaSize(forceResize, forceRatioWidthHeight) {
			if (wrapWidth && wrapHeight && (!wrapIsSetFLAG || forceResize)) {
				if (!forceRatioWidthHeight) {
					getRatioWidthHeight();
				}

				if (!o.vertical) {
					wrapSize = wrapWidth;
					wrapSize2 = wrapHeight;
				} else {
					wrapSize = wrapHeight;
					wrapSize2 = wrapWidth;
				}

				wrap.add(imgFrame).css({
					width: wrapWidth,
					height: wrapHeight
				});

				if (o.vertical && o.thumbs) {
					if (!o.verticalThumbsRight) {
						wrap.css({left: thumbsSize2});
					} else {
						thumbs.css({left: wrapWidth});
					}
				}

				if (!o.touchStyle) {
					shaft.css({
						width: wrapWidth,
						height: wrapHeight
					});
				} else {
					shaftSize = (wrapSize+o.margin)*size - o.margin;
					shaftSize2 = wrapSize2;

					shaft.css(_size, shaftSize).css(_size2, shaftSize2).data(_size, shaftSize).data(_size2, shaftSize2).data({'minPos': -(shaftSize - wrapSize), 'maxPos': 0});
				}
				if (o.thumbs) {
					if (o.thumbsPreview || !o.vertical) {
						thumbs.css(_size, wrapSize);
					}
					thumbs.css({visibility: 'visible'});
				}

				if (ieFLAG && !o.vertical) {
					if (o.arrows) {
						arrPrev.add(arrNext).css({
							top: wrapHeight / 2
						});
					}

					stateIcon.css(_pos2, wrapSize2 / 2);
				}

				setThumbsShaft();
				if (activeImg) {
					showImg(activeImg, false, false, true);
				}

				wrapIsSetFLAG = true;
			}
			if (forceResize) {
				var activeIndex = imgFrame.index(activeImg);
				setImgSize(activeImg, activeIndex);
				var interval = 0;
				////////////console.log('resize!');
				$(resizeStack).each(function(){
					clearTimeout(this);
				});
				resizeStack = [];
				imgFrame.each(function(i){
					if (i != activeIndex) {
						var thisImg = $(this);
						//Ресайзим порциями, чтобы не падали слабенькие Айпады
						var timeout = setTimeout(function() {
							////////////console.log(i);
							setImgSize(thisImg, i);
						}, interval*50+50);
						resizeStack.push(timeout);
						interval++;
					}
				});
			}
		}

		function setFotoramaState(state, index, time) {
			clearTimeout(stateIconPositionTimeout);
			function stateIconPosition() {
				if (wrapIsSetFLAG) {
					if (!o.touchStyle) {
						index = 0;
					}
					stateIcon.css(_pos, index*(wrapSize+o.margin)+wrapSize/2);
					stateIconPositionTimeout = setTimeout(function(){
						stateIcon.stop().show().fadeTo(0,1);
					},time);
				}
			}
			switch (state) {
				case 'loading':
					stateIconPosition();
					fotorama.addClass('fotorama_loading').removeClass('fotorama_error');
					clearInterval(stateIconSpinnerInterval);
					if (BASE64FLAG) {
						stateIcon.css({backgroundImage: 'url('+_SPINNER+')'});
						stateIconSpinnerInterval = setInterval(stateIconSpinner,100);
					} else {
						stateIcon.html('<span>&middot;&middot;&middot;</span>');
					}

				break;
				case 'error':
					stateIconPosition();
					fotorama.addClass('fotorama_error').removeClass('fotorama_loading');
					clearInterval(stateIconSpinnerInterval);
					if (BASE64FLAG) {
						stateIcon.css({backgroundImage: 'url('+_ERROR+')', backgroundPosition: '24px 24px'});
					} else {
						stateIcon.text('?');
					}
				break;
				case 'loaded':
					fotorama.removeClass('fotorama_loading fotorama_error');
					stateIcon.stop().fadeTo(time,0,function(){
						stateIcon.hide();
					});
					clearInterval(stateIconSpinnerInterval);
				break;
			}

			fotoramaState = state;
		}


		function clearBackAnimate(block) {
			clearTimeout(block.data('backAnimate'));
		}

		function animate(block, pos, time, overPos) {
			//console.log(block.attr('class'));
			var POS = pos;
			clearBackAnimate(block);
			if (overPos) {
				POS = overPos;
				block.data({
					backAnimate: setTimeout(function(){
						animate(block, pos, Math.max(o.transitionDuration, time/2));
					}, time)
				});
			}
			if (csstrFLAG) {
				block.css(getDuration(time));
				setTimeout(function() {
					block.css(getTranslate(POS, o.vertical));
				}, 1);
			} else {
				block.animate(getTranslate(POS, o.vertical), time, o__bezier);
			}
		}

		// Прокручиваем ленту превьюшек
		function slideThumbsShaft(time, x, auto) {
			if (thumbsShaftSize) {
				if (!auto) {
					thumbsShaftDraggedFLAG = false;
				}

				var thumbPos = activeThumb.position()[_pos];
				var thumbSize = activeThumb.data()[_size];
				if (!thumbSize) {
					thumbBorder.hide();
				} else {
					thumbBorder.show();
					if (thumbsShaftSize > wrapSize) {
						var thumbCenter = thumbPos + thumbSize / 2;
						var thumbPlace = wrapSize / 2;
						var index = thumb.index(activeThumb);
						var direction = index - activeThumbPrevIndex;
						if (thumbsShaftPos == undefined) {
							thumbsShaftPos = thumbsShaft.position()[_pos];
						}
						if (x && x > Math.max(24, o.thumbMargin*2) && x < wrapSize - Math.max(24, o.thumbMargin*2) && ((direction > 0 && x > thumbPlace * .75) || (direction < 0 && x < thumbPlace * 1.25))) {
							var i;
							if (direction > 0) {
								i = index + 1;
							} else {
								i = index - 1;
							}
							if (i < 0) {
								i = 0;
							} else if (i > size - 1) {
								i = size - 1;
							}
							if (index != i) {
								var nextThumb = thumb.eq(i);
								thumbCenter = nextThumb.position()[_pos] + nextThumb.data()[_size] / 2;
								thumbPlace = x;
							}
						}
						var minPos = -(thumbsShaftSize-wrapSize);
						var newPos = Math.round(-(thumbCenter - thumbPlace) + o.thumbMargin);

						if ((direction > 0 && newPos > thumbsShaftPos) || (direction < 0 && newPos < thumbsShaftPos)) {
							if (thumbPos + thumbsShaftPos < o.thumbMargin) {
								newPos = -(thumbPos - o.thumbMargin);
							} else if(thumbPos + thumbsShaftPos + thumbSize > wrapSize) {
								newPos = -(thumbPos*2 - wrapSize + thumbSize + o.thumbMargin);
							} else {
								newPos = thumbsShaftPos;
							}
						}

						if (newPos <= minPos) {
							newPos = minPos;
						} else if (newPos >= o.thumbMargin) {
							newPos = o.thumbMargin;
						}
						thumbsShaft.data({minPos: minPos});
						setThumbsShadow(newPos);

						if (!thumbsShaftMouseDownFLAG) {
							thumbsShaft.data({maxPos: o.thumbMargin});
						}
					} else {
						newPos = wrapSize/2 - thumbsShaftSize/2;
						thumbsShaft.data({minPos: newPos});
						if (!thumbsShaftMouseDownFLAG) {
							thumbsShaft.data({maxPos: newPos});
						}
					}

					////////console.log(thumbsShaftDraggedFLAG);

					if (!thumbsShaftDraggedFLAG) {
						animate(thumbsShaft, newPos, time);

						thumbsShaftPos = newPos;
					} else {
						thumbsShaftJerkFLAG = true;
					}

					var thumbBorderSize = thumbSize - (quirksFLAG ? 0 : o.thumbBorderWidth*2);
					var thumbBorderPos = thumbPos;

					if (csstrFLAG) {
						thumbBorder.css(getDuration(time));
						setTimeout(function(){
							thumbBorder
									.css(getTranslate(thumbBorderPos, o.vertical))
									.css(_size, thumbBorderSize);
						},1);
					} else {
						if (!o.vertical) {
							thumbBorder.stop().animate({left: thumbBorderPos, width: thumbBorderSize}, time, o__bezier);
						} else {
							thumbBorder.stop().animate({top: thumbBorderPos, height: thumbBorderSize}, time, o__bezier);
						}
					}
				}
			}
		}

		function setThumbsShadow(pos) {
			if (o.shadows) {
				if (thumbsShaftSize > wrapSize) {
					thumbs.addClass('fotorama__thumbs_shadow');
				}
				if (pos) {
					var minPos = thumbsShaft.data('minPos');
					if (pos <= minPos) {
							thumbs
									.removeClass('fotorama__thumbs_shadow_no-left')
									.addClass('fotorama__thumbs_shadow_no-right');
					} else if (pos >= o.thumbMargin) {
							thumbs
									.removeClass('fotorama__thumbs_shadow_no-right')
									.addClass('fotorama__thumbs_shadow_no-left');
					} else {
							thumbs
									.removeClass('fotorama__thumbs_shadow_no-left fotorama__thumbs_shadow_no-right');
					}
				}
			}
		}

		function setThumbsShaft() {
			setThumbsShadow();

			slideThumbsShaft(0, false, true);
		}

		function setImgSize(thisImgFrame, index) {
			if (!index) index = imgFrame.index(thisImgFrame);
			var thisImg = thisImgFrame.data('img');
			if (thisImg) {
				var thisImgWidth = thisImgFrame.data('imgWidth');
				var thisImgHeight = thisImgFrame.data('imgHeight');
				var thisImgRatio = thisImgFrame.data('imgRatio');
				var thisImgTop = 0
				if (o.touchStyle) {
					if (!o.vertical) {
						thisImgFrame.css({left: index * (wrapWidth + o.margin)});
					} else {
						thisImgFrame.css({top: index * (wrapHeight + o.margin)});
					}
				}

				if (thisImgWidth != wrapWidth || thisImgHeight != wrapHeight) {
					var minPadding = 0;
					if (Math.round(thisImgRatio) != Math.round(wrapRatio) || o.alwaysPadding) {
						minPadding = o.minPadding * 2;
					}

					if (thisImgRatio >= wrapRatio) {
						thisImgWidth = Math.round(wrapWidth - minPadding) < thisImgWidth || o.zoomToFit ? Math.round(wrapWidth - minPadding) : thisImgWidth;
						thisImgHeight = Math.round((thisImgWidth) / thisImgRatio * 1000);
					} else {
						thisImgHeight = Math.round(wrapHeight - minPadding) < thisImgHeight || o.zoomToFit ? Math.round(wrapHeight - minPadding) : thisImgHeight;
						thisImgWidth = Math.round((thisImgHeight) * thisImgRatio / 1000);
					}
				}
				thisImg
						.attr({
							width: thisImgWidth,
							height: thisImgHeight
						})
						.css({
							width: thisImgWidth,
							height: thisImgHeight,
							visibility: 'visible'
						});
				if (thisImgHeight < wrapHeight) {
					thisImgTop = Math.round((wrapHeight - thisImgHeight) / 2)
				}
				thisImg
					.css({
						top: thisImgTop
					});
			}
		}

		function loadImg(index, container, callback, type) {
			var thisImgFrame = imgFrame.eq(index);
			var thisImgNew = new Image();
			var $thisImgNew = $(thisImgNew);
			var thisImg = img.eq(index);
			var _src = [];
			var _srcI = 0;
			var imgHref = src[index]['imgHref'];
			var imgSrc = src[index]['imgSrc'];
			var thumbSrc = src[index]['thumbSrc'];
			if (type == 'img') {
				if (imgHref) {
					_src.push(imgHref);
					_src.push(imgHref + '?' + timestamp);
				}
				if (imgSrc) {
					_src.push(imgSrc);
					_src.push(imgSrc + '?' + timestamp);
				}
				if (thumbSrc) {
					_src.push(thumbSrc);
					_src.push(thumbSrc + '?' + timestamp);
				}
			} else {
				if (thumbSrc) {
					_src.push(thumbSrc);
					_src.push(thumbSrc + '?' + timestamp);
				}
				if (imgSrc) {
					_src.push(imgSrc);
					_src.push(imgSrc + '?' + timestamp);
				}
				if (imgHref) {
					_src.push(imgHref);
					_src.push(imgHref + '?' + timestamp);
				}
			}
			if (o.caption) {
				thisImgFrame.data({'caption': thisImg.attr('alt') || thisImg.children().attr('alt') || thisImg[0].caption});
			}
			function loadScope(src) {
				function loadStart() {
					$thisImgNew.attr({'src': src}).css({'visibility': 'hidden'});

					if (_srcI == 0) {
						$thisImgNew.appendTo(container);

						if (type == 'thumb') {
							thumbsShaftSize += o__thumbSize + o.thumbMargin;
							thumbsShaft.css(_size, thumbsShaftSize).data(_size, thumbsShaftSize);
							container.css(_size, o__thumbSize).data(_size, o__thumbSize);
							slideThumbsShaft(0, false, true);
						}
					}
				}
				function loadFinish() {
					srcState[src] = 'loaded';
					container.trigger('fotoramaLoad').data({'state': 'loaded'});

					setTimeout(function(){
						callback(thisImgNew);
					},100);

				}
				function loadError(primary) {
					srcState[src] = 'error';
					$thisImgNew.unbind('error load');
					if (_srcI < _src.length && primary) {
						loadScope(_src[_srcI]);
						_srcI++;
					} else {
						container.trigger('fotoramaError').data({'state': 'error'});
					}
				}
				if (!srcState[src]) {
					srcState[src] = 'loading';
					thisImgFrame.data({'loading': true});
					$thisImgNew
							.unbind('error load')
							.error(function(){
								loadError(true);
							})
							.load(loadFinish);

					loadStart();

				} else {
					function justWait() {
						if (srcState[src] == 'error') {
							loadError(false);
						} else if (srcState[src] == 'loaded') {
							loadFinish();
						} else {
							setTimeout(justWait, 100);
						}
					}
					loadStart();
					justWait();
				}
			}


			loadScope(_src[_srcI]);
			_srcI++;
		}

		// Загружаем, отрисовываем
		function loadDraw(newImg, index) {
			if (!index) index = imgFrame.index(newImg);
			if (!newImg.data('wraped')) {
				//newImg.css({visibility: 'hidden'});
				shaft.append(newImg);

				function onLoad(thisImgNew) {
				var $thisImgNew = $(thisImgNew);


				var imgWidth = $thisImgNew.width();
				var imgHeight = $thisImgNew.height();
				var imgRatio = imgWidth / imgHeight * 1000;

					$thisImgNew.addClass('fotorama__img');
					newImg.data({'img': $thisImgNew, 'imgWidth': imgWidth, 'imgHeight': imgHeight, 'imgRatio': imgRatio});

					if ((!wrapWidth || !wrapHeight) && !wrapIsSetFLAG) {
						//Задаём размер всей Фотораме по первой загруженной картинке, если он не задан в опциях
						wrapWidth = imgWidth;
						wrapHeight = imgHeight;

						getRatioWidthHeight();
					}

					newImg.css({visibility: 'visible'});
					setImgSize(newImg, index);
					setFotoramaSize();
				}

				newImg.data({'wraped': true});

				loadImg(index, newImg, onLoad, 'img');

				if ((dataFLAG && img[index].html && img[index].html.length) || (o.html && o.html[index] && o.html[index].length)) {
					var html = img[index].html || o.html[index];
					newImg.append(html);
				}
			} else if (o.detachSiblings && newImg.data('detached')) {
				newImg.data({'detached': false}).appendTo(shaft);
			}
		}

		function preloadSiblings(newImg, index) {
			if (!index) index = imgFrame.index(newImg);
			var sizeToLoad = 0;
			var limitFLAG = false;
			var indexNew = [];
			for (i=0;i<o.preload*2+1;i++) {
				var _indexNew = index - o.preload + i;
				if (_indexNew >= 0 && _indexNew < size) {
					if (!imgFrame.eq(_indexNew).data('wraped') || imgFrame.eq(_indexNew).data('detached')) {
						sizeToLoad++;
						indexNew.push(_indexNew);
					}
				} else {
					limitFLAG = true;
				}
			}

			if (sizeToLoad >= o.preload || limitFLAG) {
				$(indexNew).each(function(i){
					// Порциями опять же
					var interval = i*50;
					setTimeout(function(){
						loadDraw(imgFrame.eq(indexNew[i]), indexNew[i]);
					},interval);
				});

				if (o.detachSiblings) {
					var leftEdge = index - o.preload;
					if (leftEdge < 0) leftEdge = 0;
					var rightEdge = index + o.preload + 1;
					if (rightEdge > size - 1) rightEdge = size - 1;
					imgFrame.slice(0,leftEdge).add(imgFrame.slice(rightEdge, size - 1)).data({'detached': true}).detach();
				}

			}


		}

		function setArrows() {
			var index = imgFrame.index(activeImg);
			if (index == 0 || size < 2) {
				arrPrev.addClass('fotorama__arr_disabled').data('disabled', true);
			} else {
				arrPrev.removeClass('fotorama__arr_disabled').data('disabled', false);
			}
			if (index == size - 1 || size < 2) {
				arrNext.addClass('fotorama__arr_disabled').data('disabled', true);
			} else {
				arrNext.removeClass('fotorama__arr_disabled').data('disabled', false);
			}
		}

		// Показываем картинки, выделяем тумбсы
		function showImg(newImg, e, x, reset, time, overPos) {
			var prevActiveImg, prevActiveThumb;
			var captionText;
			var indexPrev;
			var indexNew = imgFrame.index(newImg);

			imgFrame.each(function(){
				$(this).unbind('fotoramaLoad fotoramaError');
			});


			if (!time) {
				if (reset) {
					time = 0;
				} else {
					time = o.transitionDuration;
				}
			}

			if (!reset && e && e.altKey) {
				// Как на маке: клик с шифтом замедляет анимацию
				time = time*10;
			}

			function setCaption() {
				if (o.caption) {
					captionText = newImg.data('caption');
					if (captionText) {
						caption.html(captionText).show();
					} else {
						caption.html('').hide();
					}
				}
			}

			var state = newImg.data('state');
			if (state == 'loading' || !state) {
				setFotoramaState('loading', indexNew, time);

				newImg.bind('fotoramaLoad', function(){
					setFotoramaState('loaded', indexNew, time);
					setCaption();
				});
				newImg.bind('fotoramaError', function(){
					setFotoramaState('error', indexNew, time);
					setCaption();
				});
			} else if (state == 'error') {
				setFotoramaState('error', indexNew, time);
			} else if (state != fotoramaState) {
				setFotoramaState('loaded', indexNew, 0);
			}
			setCaption();

			if (activeImg) {
				indexPrev = imgFrame.index(activeImg);
				prevActiveImg = activeImg;
				if (o.thumbs) {
					prevActiveThumb = activeThumb;
				}
			} else {
				prevActiveImg = imgFrame.not(newImg);
				if (o.thumbs) {
					prevActiveThumb = thumb.not(thumb.eq(indexNew));
				}
			}
			if (o.thumbs) {
				activeThumb = thumb.eq(indexNew);
				if (indexPrev) {
					activeThumbPrevIndex = indexPrev;
				}
				prevActiveThumb
						.removeClass('fotorama__thumb_selected')
						.data('disabled', false);
				activeThumb
						.addClass('fotorama__thumb_selected')
						.data('disabled', true);
				if (o.thumbsPreview && !touchFLAG) {
					prevActiveThumb.children().stop().fadeTo(time, o.thumbOpacity);
					activeThumb.children().stop().fadeTo(time, o.thumbOpacityActive);
				}
			}
			if (o.shadows) {
				prevActiveImg.removeClass('fotorama__frame_active');
				newImg.addClass('fotorama__frame_active');
			}

			if (o.thumbs && o.thumbsPreview && (indexPrev != indexNew)) {
				slideThumbsShaft(time, x);
			}

			if (o.touchStyle) {
				var pos = -indexNew*(wrapSize+o.margin);
				animate(shaft, pos, time, overPos);
			} else {
				if (csstrFLAG) {
					if (!activeImg) {
						newImg.css({opacity: 0});
					}
					prevActiveImg.add(newImg).css(getDuration(time));
					setTimeout(function(){
						prevActiveImg.css({opacity: 0});
						newImg.css({opacity: 1});
					},1);
				} else {
					if (!activeImg) {
						newImg.stop().fadeTo(0, 0);
					}
					prevActiveImg.stop().fadeTo(time, 0);
					newImg.stop().fadeTo(time, 1);
				}
			}

			activeImg = newImg;
			if (o.arrows) {
				setArrows();
			}

			var readyFLAG = newImg.data('detached') || newImg.data('wraped');

			clearTimeout(loadTimeout);
			loadTimeout = setTimeout(function(){
				if (!readyFLAG && indexNew != o.startImg) {
					loadDraw(newImg, indexNew);
					if (o.onShowImg) {
						var data = {index: indexNew, img: activeImg, thumb: activeThumb, caption: captionText};
						o.onShowImg(data);
					}
				}
				preloadSiblings(newImg, indexNew);
			}, time+10);
			if (readyFLAG || indexNew == o.startImg) {
				loadDraw(newImg, indexNew);
				if (o.onShowImg) {
					var data = {index: indexNew, img: activeImg, thumb: activeThumb, caption: captionText};
					o.onShowImg(data);
				}
			}
		}

		if (wrapWidth && wrapHeight) {
			setFotoramaSize();
		}

		showImg(imgFrame.eq(o.startImg), false, false, true);

		if (o.thumbs) {
			if (o.thumbColor && !o.thumbsPreview) {
				// Если переназначен цвет тумбсов
				thumb.children().css('background-color', o.thumbColor);
			}

			if (o.thumbsBackgroundColor) {
				// Если переназначен фон под тумбсами или превьюшками
				thumbs.css('background-color', o.thumbsBackgroundColor);
//				if (o.thumbsPreview && o.shadows) {
//					thumbsShadow.css(getBoxShadowColor(o.thumbsBackgroundColor));
//				}
			}

			if (o.thumbsPreview) {
				if (o.thumbBorderColor) {
					// Если переназначен цвет рамочки вокруг активной превьюшки
					thumbBorder.css({'border-color': o.thumbBorderColor});
				}

				if (!touchFLAG) {
					thumb.hover(
							function() {
								var thisThumb = $(this);
								if (!thisThumb.hasClass('fotorama__thumb_selected')) {
									thisThumb.children().stop().fadeTo(o.transitionDuration / 2, o.thumbOpacityActive);
								}
							},
							function() {
								var thisThumb = $(this);
								if (!thisThumb.hasClass('fotorama__thumb_selected')) {
									thisThumb.children().stop().fadeTo(o.transitionDuration * 2, o.thumbOpacity);
								}
							}
					);
				}
			}
		}

		if (o.backgroundColor) {
			// Если переназначен цвет фона
			wrap.add(imgFrame).css('background-color', o.backgroundColor);
		}

		if (o.arrowsColor && o.arrows) {
			// Если переназначен цвет стрелок
			arrNext.add(arrPrev).css('color', o.arrowsColor);
		}

		function callShowImg(delta, e, loop) {
			e.stopPropagation();
			e.preventDefault();

			var index = imgFrame.index(activeImg);
			var indexNew = index + delta;
			if (indexNew < 0) {
				if (loop) {
					indexNew = size - 1;
				} else {
					indexNew = 0;
				}
			}
			if (indexNew > size - 1) {
				if (loop) {
					indexNew = 0;
				} else {
					indexNew = size - 1;
				}
			}

			showImg(imgFrame.eq(indexNew), e, false);
		}

		var resizeTimeout = false;
		var resizeOverflow = false;
		function fotoramaResize() {
			if (!resizeOverflow) {
				fotorama.css({overflow: 'hidden'});
				resizeOverflow = true;
			}
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(function(){
				setFotoramaSize(true);
				fotorama.css({overflow: 'visible'});
				resizeOverflow = false;
			},100);
		}

		function bindFotoramaResize() {
			if (o.resize) {
				$window.bind('resize', fotoramaResize);
				if (touchFLAG) {
					window.addEventListener('onorientationchange', fotoramaResize, false);
				}
			} else {
				$window.unbind('resize', fotoramaResize);
				if (touchFLAG) {
					window.removeEventListener('onorientationchange', fotoramaResize, false);
				}
			}
		}

		bindFotoramaResize();

		// Биндим хендлеры
		fotorama.bind('fotoramaShowImg', function(e, index){
			if (index > size - 1 || typeof(index) != 'number') {
				index = 0
			}

			if (!o.touchStyle || !shaftMouseDownFLAG) {
				showImg(imgFrame.eq(index), e, false);
			}
		});


		fotorama.bind('fotoramaResize', function(e, width, height, resize) {
			if (width) {
				wrapWidth = width;
			}
			if (height) {
				wrapHeight = height;
			}
			wrapRatio = wrapWidth / wrapHeight * 1000;
			if (!resize) {
				o.resize = false;
				setFotoramaSize(true, true);
				bindFotoramaResize();
			} else {
				o.resize = true;
				setFotoramaSize(true);
				bindFotoramaResize();
			}
			clearTimeout(resizeTimeout);
		});


		if (o.thumbs) {
			// Клик по тумбсам
			function onThumbClick(e) {
				e.stopPropagation();
				var thisThumb = $(this);
				if (!thisThumb.data('disabled')) {
					var i = thumb.index($(this));
					var x = e[_coo] - thumbs.offset()[_pos];
					showImg(imgFrame.eq(i), e, x);
				}
			}
			thumb.bind('click', onThumbClick);
		}

		if (o.arrows) {
			// Клик по стрелочкам, если они включены
			arrPrev.click(function(e) {
				if (!$(this).data('disabled')) {
					callShowImg(-1, e, false);
				}
			});
			arrNext.click(function(e) {
				if (!$(this).data('disabled')) {
					callShowImg(+1, e, false);
				}
			});
		}

		if (!o.touchStyle && !touchFLAG) {
			// Клик по картинке, если отключён режим таскания
			wrap.click(function(e){
				if (!e.shiftKey) {
					// Если клик без шифта
					callShowImg(+1, e, true);
				} else {
					// Если с шифтом
					callShowImg(-1, e, true);
				}
			});
		}

		if (o.touchStyle || touchFLAG || (o.thumbs && o.thumbsPreview)) {
		function touch(el, mouseDown, mouseMove, mouseUp) {
			var elPos,
			coo,
			coo2,
			downPos,
			downPos2,
			downElPos,
			downTime,
			moveCoo = [],
			moveTime,
			directionLast,
			upTime,
			upTimeLast = 0;

			var movableFLAG = false;
			var checkedDirectionFLAG = false;
			var limitFLAG = false;
			function onMouseDown(e) {
				if ((touchFLAG || e.which < 2) && activeImg) {
					function act() {
						downTime = new Date().getTime();
						downPos = coo;
						downPos2 = coo2;
						moveCoo = [[downTime, coo]];
						elPos = el.position()[_pos];
						//////////console.log(elPos, downPos);
						clearBackAnimate(el);
						if (csstrFLAG) {
							el
									.css(getDuration(0))
									.css(getTranslate(elPos, o.vertical));
						} else {
							el.stop();
						}
						downElPos = elPos;

						mouseDown();
					}
					if (!touchFLAG) {
						coo = e[_coo];
						e.preventDefault();
						act();
						$document.mousemove(onMouseMove);
						$document.mouseup(onMouseUp);
					} else if (touchFLAG && e.targetTouches.length == 1) {
						coo = e.targetTouches[0][_coo];
						coo2 = e.targetTouches[0][_coo2];
						act();
						el[0].addEventListener('touchmove', onMouseMove, false);
						el[0].addEventListener('touchend', onMouseUp, false);
					} else if (touchFLAG && e.targetTouches.length > 1) {
						return false;
					}
				}
			}

			function onMouseMove(e) {
				function act() {
					e.preventDefault();

					moveTime = new Date().getTime();
					moveCoo.push([moveTime, coo]);

					var pos = downPos - coo;
					//////////console.log(pos);
					/*var minPos;
					if (!o.vertical) {
						minPos = -(el.data('width') - wrapWidth);
					} else {
						minPos = -(el.data('height') - wrapHeight);
					}*/

					elPos = downElPos-pos;
					//////////console.log(elPos, coo, el.data('maxPos'));


					if (elPos > el.data('maxPos')) {
						elPos = Math.round(elPos + ((el.data('maxPos') - elPos)/1.25));
						limitFLAG = 'left';

					} else if (elPos < el.data('minPos')) {
						elPos = Math.round(elPos + ((el.data('minPos') - elPos) / 1.25));
						limitFLAG = 'right';
					} else {
						limitFLAG = false;
					}

					//////////console.log(elPos);

					if (o.touchStyle) {
						el.css(getTranslate(elPos, o.vertical));
					}

					mouseMove(elPos, pos, limitFLAG);
				}
				if (!touchFLAG) {
					coo = e[_coo];
					act();
				} else if (touchFLAG && e.targetTouches.length == 1) {
					coo = e.targetTouches[0][_coo];
					coo2 = e.targetTouches[0][_coo2];

					if (!checkedDirectionFLAG) {
						if (Math.abs(coo-downPos) - Math.abs(coo2-downPos2) >= -5) {
							movableFLAG = true;
							e.preventDefault();
						}
						checkedDirectionFLAG = true;
					} else if (movableFLAG) {
						act();
					}
				}
			}

			function onMouseUp(e) {
				if (!touchFLAG || !e.targetTouches.length) {
					movableFLAG = false;
					checkedDirectionFLAG = false;

					if (!touchFLAG) {
						$document.unbind('mouseup');
						$document.unbind('mousemove');
					} else {
						el[0].removeEventListener('touchmove', onMouseMove, false);
						el[0].removeEventListener('touchend', onMouseUp, false);
					}

					upTime = new Date().getTime();
					var dirtyLeft = -elPos;

					var _backTimeIdeal = upTime - o__dragTimeout;
					var _diff, _diffMin, backTime, backCoo;
					for (i=0;i<moveCoo.length;i++) {
						_diff = Math.abs(_backTimeIdeal - moveCoo[i][0]);

						if (i == 0) {
							_diffMin = _diff;
							backTime = upTime - moveCoo[i][0];
							backCoo = moveCoo[i][1];
						}
						if (_diff <= _diffMin) {
							_diffMin = _diff;
							backTime = moveCoo[i][0];
							backCoo = moveCoo[i][1];
						}
					}

					var posDiff = backCoo - coo;
					var direction = posDiff >= 0;
					var timeDiff = upTime - backTime;
					var isSwipe = timeDiff <= o__dragTimeout;
					var timeFromLast = upTime - upTimeLast;
					var sameDirection = direction === directionLast;

					mouseUp(dirtyLeft, timeDiff, isSwipe, timeFromLast, sameDirection, posDiff, e);

					upTimeLast = upTime;
					directionLast = direction;
				}
			}

			if (!touchFLAG) {
				el.mousedown(onMouseDown);
			} else {
				el[0].addEventListener('touchstart', onMouseDown, false);
			}
		}
		}

		if (o.touchStyle || touchFLAG) {
			function shaftOnMouseDown() {
				shaftMouseDownFLAG = true;
			}
			function shaftOnMouseMove(pos, posDiff, limitFLAG) {
				if (!shaftGrabbingFLAG) {
					if (o.shadows) {
						wrap.addClass('fotorama__wrap_shadow');
					}
					if (!touchFLAG) {
						shaft.addClass('fotorama__shaft_grabbing');
					}
					clearTimeout(setShaftGrabbingFLAGTimeout);
					shaftGrabbingFLAG = true;
				}

				if (o.shadows) {
					if (limitFLAG) {
						var antiLimit = limitFLAG == 'left' ? 'right' : 'left';
						//////console.log(limitFLAG, antiLimit);
						wrap
								.addClass('fotorama__wrap_shadow_no-' + limitFLAG)
								.removeClass('fotorama__wrap_shadow_no-' + antiLimit);
					} else {
						if (o.shadows) {
							wrap.removeClass('fotorama__wrap_shadow_no-left fotorama__wrap_shadow_no-right');
						}
					}
				}

			}
			function shaftOnMouseUp(dirtyLeft, timeDiff, isSwipe, timeFromLast, sameDirection, posDiff, e) {
				shaftMouseDownFLAG = false;
				setShaftGrabbingFLAGTimeout = setTimeout(function() {
					shaftGrabbingFLAG = false;
					if (!touchFLAG) {
						wrapLeave();
					}
					if (!touchFLAG) {
						shaft.removeClass('fotorama__shaft_grabbing');
					}
				}, o__dragTimeout);

				if (o.shadows) {
						wrap.removeClass('fotorama__wrap_shadow');
					}


				var forceLeft = false;
				var forceRight = false;

				var target = $(e.target);
				var a = target.filter('a') || target.parents('a');

				if (o.touchStyle) {
					if (shaftGrabbingFLAG) {
						if (isSwipe) {
							if (posDiff <= -10) {
								forceLeft = true;
							} else if (posDiff >= 10) {
								forceRight = true;
							}
						}

						var time = o.transitionDuration;

						var index = undefined;
						if (!forceLeft && !forceRight) {
							index = Math.round(dirtyLeft / wrapSize);
							////console.log('Свайпа не было, смотрим ближайщую картинку');
						} else {
//							if (!(timeFromLast <= o.transitionDuration && sameDirection)) {
								posDiff = -posDiff;
								var speed = posDiff/timeDiff;
								var virtualPos = Math.round(-dirtyLeft + speed*250);
								var newPos, maxPos, overPos;
								//animate(shaft, virtualPos, o.transitionDuration);
								if (forceLeft) {
									index = Math.ceil(dirtyLeft / wrapSize)-1;
									newPos = -index*(wrapSize+o.margin);
									if (virtualPos > newPos) {
										overPos = Math.abs(virtualPos - newPos);
										time = Math.abs(time/((speed*250)/(Math.abs(speed*250) - overPos*.98)));
										overPos = newPos + overPos*.02;
									}
									////console.log('Свайп влево');
								} else if (forceRight) {
									index = Math.floor(dirtyLeft / wrapSize)+1;
									newPos = -index*(wrapSize+o.margin);
									if (virtualPos < newPos) {
										overPos = Math.abs(virtualPos - newPos);
										time = Math.abs(time/((speed*250)/(Math.abs(speed*250) - overPos*.98)));
										overPos = newPos - overPos*.02;
									}

									////console.log('Свайп вправо');
								}
							/*}*/ /*else {
								if (forceLeft) {
									callShowImg(-1, e, false);
									////console.log('Двойной свайп влево');
								} else if (forceRight) {
									callShowImg(+1, e, false);
									////console.log('Двойной свайп вправо');
								}
							}*/
						}

						////console.log(time);


						if (index != undefined) {
							if (index < 0) {
								index = 0;
								overPos = false;
								time = o.transitionDuration;
							}
							if (index > size - 1) {
								index = size - 1;
								overPos = false;
								time = o.transitionDuration;
							}
							showImg(imgFrame.eq(index), e, false, false, time, overPos);
						}
					} else if (a.length) {
						document.location = a.attr('href');
					} else if (o.pseudoClick && !touchFLAG) {
						if (!e.shiftKey) {
							// Если клик без шифта
							callShowImg(+1, e, true);
						} else {
							// Если с шифтом
							callShowImg(-1, e, true);
						}
					}
				} else {
					if (posDiff == 0 && a.length) {
						document.location = a.attr('href');
					} else if (posDiff >= 0) {
						callShowImg(+1, e, true);
					} else if (posDiff < 0) {
						callShowImg(-1, e, true);
					}
				}
			}

			touch(shaft, shaftOnMouseDown, shaftOnMouseMove, shaftOnMouseUp);

			if (o.touchStyle && o.thumbs && o.thumbsPreview) {
				function thumbsShaftOnMouseDown() {
					thumbsShaftMouseDownFLAG = true;
					thumbsShaftDraggedFLAG = true;
				}
				function thumbsShaftOnMouseMove(pos, posDiff) {
					//////console.log(posDiff);
					if (!thumbsShaftGrabbingFLAG && Math.abs(posDiff) >= 5) {

						thumb.unbind('click', onThumbClick);
						clearTimeout(setThumbsShaftGrabbingFLAGTimeout);
						thumbsShaftGrabbingFLAG = true;
					}

					setThumbsShadow(pos);
				}
				function thumbsShaftOnMouseUp(dirtyLeft, timeDiff, isSwipe, timeFromLast, sameDirection, posDiff, e) {
					thumbsShaftMouseDownFLAG = false;

					setThumbsShaftGrabbingFLAGTimeout = setTimeout(function() {
						thumbsShaftGrabbingFLAG = false;
						thumb.bind('click', onThumbClick);
					}, o__dragTimeout);

					dirtyLeft = -dirtyLeft;

					var newPos = dirtyLeft;
					var overPos;
					var time = o.transitionDuration*2;

					if (thumbsShaftJerkFLAG) {
						slideThumbsShaft(0, false, true);
						thumbsShaftJerkFLAG = false;
					}

					if (dirtyLeft > thumbsShaft.data('maxPos')) {
						newPos = thumbsShaft.data('maxPos');
						time = time/2;
					} else if (dirtyLeft < thumbsShaft.data('minPos')) {
						newPos = thumbsShaft.data('minPos');
						time = time/2;
					} else {
						if (isSwipe) {
							posDiff = -posDiff;
							var speed = posDiff/timeDiff;
							newPos = Math.round(dirtyLeft + speed*250);
							if (newPos > thumbsShaft.data('maxPos')) {
								overPos = Math.abs(newPos - thumbsShaft.data('maxPos'));
								time = Math.abs(time/((speed*250)/(Math.abs(speed*250) - overPos*.96)));
								newPos = thumbsShaft.data('maxPos');
								overPos = newPos + overPos*.04;
								//newPos = overPos;

							} else if (newPos < thumbsShaft.data('minPos')) {
								overPos = Math.abs(newPos - thumbsShaft.data('minPos'));
								time = Math.abs(time/((speed*250)/(Math.abs(speed*250) - overPos*.96)));
								//////console.log(speed*250, newPos, thumbsShaft.data('minPos'));
								newPos = thumbsShaft.data('minPos');
								overPos = newPos - overPos*.04;
								//newPos = overPos;
							}
							//////console.log('time: '+time);
						}
					}

					if (e.altKey) {
						time = time*10;
					}

					thumbsShaftPos = newPos;

					if (newPos != dirtyLeft) {
						animate(thumbsShaft, newPos, time, overPos);
						setThumbsShadow(newPos);
					}
				}

				touch(thumbsShaft, thumbsShaftOnMouseDown, thumbsShaftOnMouseMove, thumbsShaftOnMouseUp);
			}
		}
	}
})(jQuery);