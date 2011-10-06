/* Fotorama v1.0 (1153) http://fotoramajs.com/ */

/* Modernizr 2.0.6 (Custom Build) | MIT & BSD
 * Contains: csstransforms3d | csstransitions | canvas | teststyles | testprop | testallprops | prefixes | domprefixes
 */
window.Modernizr=function(a,b,c){function B(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+n.join(c+" ")+c).split(" ");return A(d,b)}function A(a,b){for(var d in a)if(j[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function z(a,b){return!!~(""+a).indexOf(b)}function y(a,b){return typeof a===b}function x(a,b){return w(m.join(a+";")+(b||""))}function w(a){j.cssText=a}var d="2.0.6",e={},f=b.documentElement,g=b.head||b.getElementsByTagName("head")[0],h="modernizr",i=b.createElement(h),j=i.style,k,l=Object.prototype.toString,m=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),n="Webkit Moz O ms Khtml".split(" "),o={},p={},q={},r=[],s=function(a,c,d,e){var g,i,j,k=b.createElement("div");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),k.appendChild(j);g=["&shy;","<style>",a,"</style>"].join(""),k.id=h,k.innerHTML+=g,f.appendChild(k),i=c(k,a),k.parentNode.removeChild(k);return!!i},t,u={}.hasOwnProperty,v;!y(u,c)&&!y(u.call,c)?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],c)};var C=function(a,c){var d=a.join(""),f=c.length;s(d,function(a,c){var d=b.styleSheets[b.styleSheets.length-1],g=d.cssRules&&d.cssRules[0]?d.cssRules[0].cssText:d.cssText||"",h=a.childNodes,i={};while(f--)i[h[f].id]=h[f];e.csstransforms3d=i.csstransforms3d.offsetLeft===9},f,c)}([,["@media (",m.join("transform-3d),("),h,")","{#csstransforms3d{left:9px;position:absolute}}"].join("")],[,"csstransforms3d"]);o.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},o.csstransforms3d=function(){var a=!!A(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]);a&&"webkitPerspective"in f.style&&(a=e.csstransforms3d);return a},o.csstransitions=function(){return B("transitionProperty")};for(var D in o)v(o,D)&&(t=D.toLowerCase(),e[t]=o[D](),r.push((e[t]?"":"no-")+t));w(""),i=k=null,e._version=d,e._prefixes=m,e._domPrefixes=n,e.testProp=function(a){return A([a])},e.testAllProps=B,e.testStyles=s;return e}(this,this.document);


//Modernizr.canvas = false;
(function($){
	$.fn.fotorama = function(options) {
		var o = $.extend({
			width: null,
			height: null,
			transitionDuration: 333,
			touchStyle: true,
			backgroundColor: null,
			margin: 0,
			minPadding: 10,
			preload: 3,
			zoomToFit: true,
			arrows: true,
			arrowsColor: null,
			thumbs: true,
			thumbsBackgroundColor: null,
			thumbColor: null,
			thumbsPreview: true,
			thumbSize: 48,
			thumbMargin: 0,
			thumbBorderWidth: 3,
			thumbBorderColor: null,
			caption: false
		}, options);

		//FOTORAMA = $();
		//console.log("appendTo");

		var TOUCHFlag = ('ontouchstart' in document);
		var IEFlag = $.browser.msie;
		var o__dragTimeout = 200;
		var o__shadows = true;

//		var __startLoad = new Date().getTime();
//		var __stopLoad;
//		$(window).load(function(){
//			__stopLoad = new Date().getTime();
//			console.log('Load in ' + (__stopLoad-__startLoad)/1000 + 'sec');
//		});

		this.each(function(){
			var fotorama = $(this);
			//FOTORAMA = FOTORAMA.add(fotorama);

			var timestamp = new Date().getTime();

			fotorama.addClass('fotorama');

			// Все изображения
			var img = fotorama.children().filter(function(){
				var thisChild = $(this);
				return ((thisChild.is('a') && thisChild.children('img').size()) || thisChild.is('img')) && (thisChild.attr('href') || thisChild.attr('src') || thisChild.children().attr('src'));
			});
			var size = img.size();

			// Очищаем DOM
			fotorama.html('');

			o.loop = false;

			if (!o.touchStyle) {
				o.loop = true;
				o.arrows = false;
			}

			var srcState = [];

			var wrapWidth = o.width;
			var wrapHeight = o.height;
			var wrapRatio;
			var wrapIsSetFlag = false;
			var preloadSiblingsTimeout;

			if (o.touchStyle) {
				var shaftWidth = 0,
						shaftLeft,
						x,
						y,
						downLeft,
						downTop,
						downShaftLeft,
						downTime,
						moveLeft,
						moveTime,
						upTime,
						upTimeLast = 0;

				var grabbingFlag = false;
				var setGrabbingFlagTimeout;
				var movableFlag = false;
				var checkedDirectionFlag = false;
				var limitFlag = false;
			}

			var wrap = $('<div class="fotorama__wrap"></div>');
			var shaft = $('<div class="fotorama__shaft"></div>');
			var shaftEl = shaft.get(0);

			fotorama.append(wrap.append(shaft));

			// Запрещаем выделять фотораму
			disableSelection(fotorama);

			//var loadingIcon = $('<div class="fotorama__loading"><i class="fotorama__loading__dot"></i><i class="fotorama__loading__dot"></i><i class="fotorama__loading__dot"></i></div>');

			if (TOUCHFlag) {
				wrap.addClass('fotorama__wrap_touch');
				o__shadows = false;
			}
			if (o.touchStyle) {
				wrap.addClass('fotorama__wrap_style_touch');
				if (o__shadows) {
					wrap.append('<i class="fotorama__shadow fotorama__shadow_left"></i><i class="fotorama__shadow fotorama__shadow_right"></i>');
					var shadow = $('.fotorama__shadow', wrap);
				}
			} else {
				wrap.addClass('fotorama__wrap_style_fade');
			}

			if (Modernizr.csstransforms3d && Modernizr.csstransitions) {
				wrap.addClass('fotorama__wrap_csstransitions');
			}

			if (o.arrows) {
				wrap.append('<i class="fotorama__arr fotorama__arr_prev">&#9668;</i><i class="fotorama__arr fotorama__arr_next">&#9658;</i>');
				var arrs = $('.fotorama__arr', fotorama);
				var arrPrev = $('.fotorama__arr_prev', fotorama);
				var arrNext = $('.fotorama__arr_next', fotorama);

				if (!TOUCHFlag) {
					// Стрелочки при наведении на фотораму
					var wrapEnteredFlag = false;
					var wrapLeaveTimeout;
					function wrapEnter() {
						wrapEnteredFlag = true;
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
							if (!grabbingFlag && !wrapEnteredFlag) {
								wrap
										.removeClass('fotorama__wrap_mouseover')
										.addClass('fotorama__wrap_mouseout');
							}
						}, o.transitionDuration*10);
					}
					wrap.mouseenter(function(){
						wrapEnter();
					});
					wrap.mouseleave(function(){
						wrapEnteredFlag = false;
						wrapLeave();
					});
				}
			}

			var activeImg;

			var imgFrame = $();
			img.each(function(i){
				// Заготавливаем фреймы под фотки
				var _imgFrame = $('<div class="fotorama__frame"></div>');
				imgFrame = imgFrame.add(_imgFrame);
			});

			//console.log('imgFrame.size()', imgFrame.size());

			if (o.thumbs) {
				// Если тумбсы или превьюшки
				var activeThumb;
				var activeThumbPrevIndex = 0;
				// Контейнер для тумбсов-переключалок
				var thumbs = $('<div class="fotorama__thumbs"></div>');

				if (o.thumbsPreview) {
					o.thumbOpacity = .66;
					o.thumbOpacityActive = 1;
					var thumbsHeight = o.thumbSize + (o.thumbMargin*2);
					thumbs
							.addClass('fotorama__thumbs_previews')
							.css({height: thumbsHeight});
				}

				thumbs.appendTo(fotorama).css('visibility', 'hidden');
				var thumbsShaft = $('<div class="fotorama__thumbs-shaft"></div>');
				thumbs.append(thumbsShaft);
				if (o.thumbsPreview) {
					var thumbsShaftWidth = 0;
					if (o__shadows) {
						thumbs.append('<i class="fotorama__shadow fotorama__shadow_left"></i><i class="fotorama__shadow fotorama__shadow_right"></i>');
						var thumbsShadow = $('.fotorama__shadow', thumbs);
						thumbsShadow.css({height: thumbsHeight});
					}

					var thumbBorder = $('<i class="fotorama__thumb-border"></i>');
					var thumbBorderHeight = o.thumbSize;
					if (thumbBorderHeight >= thumbsHeight - o.thumbBorderWidth*2) {
						thumbBorderHeight = thumbsHeight - o.thumbBorderWidth*2;
					}
					var thumbBorderTop = o.thumbMargin - Math.min(o.thumbMargin, o.thumbBorderWidth);
					thumbBorder
							.hide()
							.css({height: thumbBorderHeight, top: thumbBorderTop, 'border-width': o.thumbBorderWidth})
							.appendTo(thumbsShaft);
				}

				// Создаём точки и превьюшки
				img.each(function(i){
					// Одна точка-переключалка
					var _thumb;
					if (o.thumbsPreview) {
						_thumb = $('<div class="fotorama__thumb"></div>');
						_thumb.css({height: o.thumbSize, margin: o.thumbMargin});
					} else {
						_thumb = $('<i class="fotorama__thumb"><i class="fotorama__thumb__dot"></i></i>');
					}
					_thumb.appendTo(thumbsShaft);
				});

				var thumb = $('.fotorama__thumb', fotorama);

				if (o.thumbsPreview) {
					// Загружаем превьюшки
					img.each(function(i){
						var thisImgFrame = imgFrame.eq(i);

						function onLoad(thisThumbNew) {
							var thumbRatio = thisImgFrame.data('thumbRatio');

							if (Modernizr.canvas) {
								var thisImgEl = thisThumbNew.get(0);
							}

							// Одна точка-переключалка на загрузке
							var _thumbWidth = Math.round((o.thumbSize) * thumbRatio / 1000);
							if (Modernizr.canvas) {
								thisThumbNew.remove();
								thisThumbNew = $('<canvas class="fotorama__thumb__img"></canvas>');
								thisThumbNew.appendTo(thumb.eq(i));
							} else {
								thisThumbNew.addClass('fotorama__thumb__img');
							}
							thisThumbNew.attr({
								width: _thumbWidth,
								height: o.thumbSize
							});
							if (Modernizr.canvas) {
								var ctx = thisThumbNew.get(0).getContext('2d');
								ctx.drawImage(thisImgEl,0,0,_thumbWidth,o.thumbSize);
							}
							if (!TOUCHFlag && i != 0) {
								thisThumbNew.stop().fadeTo(0, o.thumbOpacity);
							}

							thumbsShaftWidth += _thumbWidth + o.thumbMargin;
							thumbsShaft.css({'width': thumbsShaftWidth});
							thumb.eq(i).data({'width': _thumbWidth});

							if (wrapIsSetFlag && (thumbsShaftWidth <= wrapWidth*1.5)) {
								setThumbs();
							}
						}

						// Если включены превьюшки, придётся загружать все картинки разом
						// Будем делать это порциями по 10 в секунду
						var interval = i*100;
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

			if (wrapWidth && wrapHeight) {
				setFotoramaSize();
			}

			showImg(imgFrame.eq(0), false, false);

			if (o.thumbs) {
				if (o.thumbColor && !o.thumbsPreview) {
					// Если переназначен цвет тумбсов
					thumb.children().css('background-color', o.thumbColor);
				}

				if (o.thumbsBackgroundColor) {
					// Если переназначен фон под тумбсами или превьюшками
					thumbs.css('background-color', o.thumbsBackgroundColor);
					if (o.thumbsPreview && o__shadows) {
						thumbsShadow.css(getBoxShadowColor(o.thumbsBackgroundColor));
					}
				}

				if (o.thumbsPreview) {
					if (o.thumbBorderColor) {
						// Если переназначен цвет рамочки вокруг активной превьюшки
						thumbBorder.css({'border-color': o.thumbBorderColor});
					}

					if (!TOUCHFlag) {
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

			function callShowImg(delta, e) {
				e.stopPropagation();
				e.preventDefault();

				var index = imgFrame.index(activeImg);
				var indexNew = index + delta;
				if (indexNew < 0) {
					if (o.loop) {
						indexNew = size - 1;
					} else {
						indexNew = 0;
					}
				}
				if (indexNew > size - 1) {
					if (o.loop) {
						indexNew = 0;
					} else {
						indexNew = size - 1;
					}
				}

				showImg(imgFrame.eq(indexNew), e, false);
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

			function loadImg(index, container, callback, type) {
				var thisImgFrame = imgFrame.eq(index);
				var thisImgNew = $('<img />');
				var thisImg = img.eq(index);
				var src;
				if (type == 'img') {
					src = thisImg.attr('href') || thisImg.attr('src') || thisImg.children().attr('src');
				} else {
					src = thisImg.children().attr('src') || thisImg.attr('src') || thisImg.attr('href');
				}
				//if (IEFlag) {
					src = src + '?' + timestamp;
				//}
				if (o.caption) {
					thisImgFrame.data({'alt': thisImg.attr('alt') || thisImg.children().attr('alt')});
				}
				function loadStart() {
					thisImgNew
							.attr({'src': src})
							.css({'visibility': 'hidden'})
							.appendTo(container);
					if (type == 'thumb') {
						thisImgNew.attr({'width': o.thumbSize});
					}
				}
				function loadFinish() {
					if (type == 'thumb') {
						thisImgNew.removeAttr('width');
					}
					var imgWidth = thisImgNew.width();
					var imgHeight = thisImgNew.height();
					var imgRatio = imgWidth / imgHeight * 1000;

					// Закешируем полезные данные на будущее
					if (type == 'img') {
						thisImgFrame.data({
							'imgWidth': imgWidth,
							'imgHeight': imgHeight,
							'imgRatio': imgRatio,
							'loaded': true
						});
					} else {
						thisImgFrame.data({
							'thumbRatio': imgRatio
						});
					}
					thisImgNew.css({'visibility': 'visible'});
					callback(thisImgNew);
				}
				if (!srcState[src]) {
					//thisImgFrame.data({'loading': true});
					srcState[src] = 'loading';
//					thisImgNew.error(function() {
//						console.log(src + ' is broken');
//					});
					thisImgNew.load(function() {
						//console.log(src + ' is loaded');

						loadFinish();
						srcState[src] = 'loaded';
					});
					loadStart();
				} else {
					loadStart();
					// Если картинка уже в процессе загрузки, просто ждём когда она загрузится
					function checkIfLoaded() {
						if (srcState[src] == 'loaded') {
							loadFinish();
						} else {
							setTimeout(checkIfLoaded, 100);
						}
					}
					checkIfLoaded();
				}
			}

			// Загружаем, отрисовываем
			function loadDraw(newImg) {
				var index = imgFrame.index(newImg);
				if (!newImg.data('wraped')) {
					shaft.append(newImg);
					function onLoad(thisImgNew) {
						var imgWidth = newImg.data('imgWidth');
						var imgHeight = newImg.data('imgHeight');
						var imgRatio = newImg.data('imgRatio');

						if (Modernizr.canvas) {
							var thisImgEl = thisImgNew.get(0);
							var imgCanvas = $('<canvas></canvas>');
							thisImgNew.after(imgCanvas).remove();
							thisImgNew = imgCanvas;
						}

						thisImgNew.addClass('fotorama__img');

						if ((!wrapWidth || !wrapHeight) && !wrapIsSetFlag) {
							//Задаём размер всей Фотораме по первой загруженной картинке, если он не задан в опциях
							wrapWidth = imgWidth;
							wrapHeight = imgHeight;
						}

						if (o.touchStyle) {
							var left = index*(wrapWidth+o.margin);
							newImg.css({'left': left});
						}

						if (!wrapRatio) {
							wrapRatio = wrapWidth / wrapHeight * 1000;
						}
						if (imgWidth != wrapWidth || imgHeight != wrapHeight) {
							var minMargin = 0;
							if (Math.round(imgRatio) != Math.round(wrapRatio)) {
								minMargin = o.minPadding*2;
							}

							if (imgRatio >= wrapRatio) {

								imgWidth = Math.round(wrapWidth - minMargin) < imgWidth || o.zoomToFit ? Math.round(wrapWidth - minMargin) : imgWidth;
								imgHeight = Math.round((imgWidth) / imgRatio * 1000);
							} else {
								imgHeight = Math.round(wrapHeight - minMargin) < imgHeight || o.zoomToFit ? Math.round(wrapHeight - minMargin) : imgHeight;
								imgWidth = Math.round((imgHeight) * imgRatio / 1000);
							}
						}

						thisImgNew
								.css({
									width: imgWidth,
									height: imgHeight
								})
								.attr({
									width: imgWidth,
									height: imgHeight
								});
						if (Modernizr.canvas) {
							var ctxImg = imgCanvas.get(0).getContext('2d');
							ctxImg.drawImage(thisImgEl,0,0,imgWidth,imgHeight);
						}

						if (imgHeight < wrapHeight) {
							thisImgNew
									.css({
										top: Math.round((wrapHeight - imgHeight) / 2)
									});
						}

						setFotoramaSize();
					}

					loadImg(index, newImg, onLoad, 'img');

					newImg.data({'wraped': true});
				} else if (newImg.data('detached')) {
					newImg.data({'detached': false}).appendTo(shaft);
				}
			}

			function preloadSiblings() {
				var index = imgFrame.index(activeImg);
				var sizeToLoad = 0;
				var indexNew = [];
				for (i=0;i<o.preload*2+1;i++) {
					var _indexNew = index - o.preload + i;
					if (_indexNew >= 0 && _indexNew != index && _indexNew < size && (!imgFrame.eq(_indexNew).data('wraped') || imgFrame.eq(_indexNew).data('detached'))) {
						sizeToLoad++;
						indexNew.push(_indexNew);
					}
				}

				//console.log('sizeToLoad: '+sizeToLoad, indexNew.length);

				if (indexNew.length >= o.preload) {
					for (i=0;i<indexNew.length;i++) {
						loadDraw(imgFrame.eq(indexNew[i]));
					}
				}

				if (TOUCHFlag) { //TODO: Проверять не на тач, а на мобайл
					var leftEdge = index - o.preload;
					if (leftEdge < 0) leftEdge = 0;
					var rightEdge = index + o.preload + 1;
					if (rightEdge > size - 1) rightEdge = size - 1;
					imgFrame.slice(0,leftEdge).add(imgFrame.slice(rightEdge, size - 1)).data({'detached': true}).detach();
				}
			}

			function pleaseWait(imgToLoad, callback) {
				//console.log('pleaseWait', imgToLoad.data('loaded'));
				if (imgToLoad.data('loaded')) {
					callback();
				} else {
					setTimeout(function(){
						pleaseWait(imgToLoad, callback);
					},100);
				}
			}

			// Показываем картинки, выделяем тумбсы
			function showImg(newImg, e, x) {
				var prevActiveImg, prevActiveThumb;
				var indexNew = imgFrame.index(newImg);

				loadDraw(newImg);

				var time = o.transitionDuration;
				if (e && e.altKey) {
					// Как на маке: клик с шифтом замедляет анимацию
					time = time*10;
				}

				if (activeImg) {
					var indexPrev = imgFrame.index(activeImg);
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
					if (o.thumbsPreview && !TOUCHFlag) {
						prevActiveThumb.children().stop().fadeTo(time, o.thumbOpacity);
						activeThumb.children().stop().fadeTo(time, o.thumbOpacityActive);
					}
				}
				if (o__shadows) {
					prevActiveImg.removeClass('fotorama__frame_active');
					newImg.addClass('fotorama__frame_active');
				}

				if (o.thumbs && o.thumbsPreview) {
					slideThumbsShaft(time, x);
				}

				if (o.touchStyle) {
					var left = -indexNew*(wrapWidth+o.margin);
					if (Modernizr.csstransforms3d && Modernizr.csstransitions) {
						shaft.css(getDuration(time));
						setTimeout(function(){
							shaft.css(getTranslate(left));
						},1);
					} else {
						shaft.stop().animate({left: left}, time);
					}
				} else {
					if (Modernizr.csstransforms3d && Modernizr.csstransitions) {
						if (!activeImg) {
							//console.log('no active img');
							newImg.css({opacity: 0});
						}
						prevActiveImg.add(newImg).css(getDuration(time));
						setTimeout(function(){
							prevActiveImg.css({opacity: 0});
							///pleaseWait(newImg, function(){
								newImg.css({opacity: 1});
							///});
						},1);
					} else {
						if (!activeImg) {
							newImg.stop().fadeTo(0, 0);
						}
						prevActiveImg.stop().fadeTo(time, 0);
						///pleaseWait(newImg, function(){
							newImg.stop().fadeTo(time, 1);
						///});
					}
				}

				if (o.caption) {
					if (newImg.data('alt')) {
						caption.html(newImg.data('alt')).show();
					} else {
						caption.html('').hide();
					}
				}

				activeImg = newImg;
				if (o.arrows) {
					setArrows();
				}

				clearTimeout(preloadSiblingsTimeout);
				preloadSiblingsTimeout = setTimeout(preloadSiblings, time);
			}

			// Прокручиваем ленту превьюшек
			function slideThumbsShaft(time, x) {
				if (thumbsShaftWidth) {
					var thumbLeft = activeThumb.position().left;
					var thumbWidth = activeThumb.data('width');
					if (!thumbWidth) thumbWidth = o.thumbSize;
					if (thumbsShaftWidth > wrapWidth) {
						var thumbCenter = thumbLeft + thumbWidth / 2;
						var thumbPlace = wrapWidth / 2;
						var index = thumb.index(activeThumb);
						var direction = index - activeThumbPrevIndex;
						var thumbsShaftLeft = thumbsShaft.position().left;
						if (x && ((direction > 0 && x > thumbPlace * .75) || (direction < 0 && x < thumbPlace * 1.25))) {
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
								thumbCenter = nextThumb.position().left + nextThumb.data('width') / 2;
								thumbPlace = x;
							}
						}
						var minLeft = -(thumbsShaftWidth-wrapWidth);
						var newLeft = Math.round(-(thumbCenter - thumbPlace) + o.thumbMargin);

						if ((direction > 0 && newLeft > thumbsShaftLeft) || (direction < 0 && newLeft < thumbsShaftLeft)) {
							newLeft = thumbsShaftLeft;
						}

						if (newLeft <= minLeft) {
							newLeft = minLeft;
							if (o__shadows) {
								thumbs
										.removeClass('fotorama__thumbs_shadow_no-left')
										.addClass('fotorama__thumbs_shadow_no-right');
							}
						} else if (newLeft >= o.thumbMargin) {
							newLeft = o.thumbMargin;
							if (o__shadows) {
								thumbs
										.removeClass('fotorama__thumbs_shadow_no-right')
										.addClass('fotorama__thumbs_shadow_no-left');
							}
						} else {
							if (o__shadows) {
								thumbs
										.removeClass('fotorama__thumbs_shadow_no-left fotorama__thumbs_shadow_no-right');
							}
						}

						if (Modernizr.csstransforms3d && Modernizr.csstransitions) {
							thumbsShaft.css(getDuration(time));
							setTimeout(function(){
								thumbsShaft.css(getTranslate(newLeft));
							},1);
						} else {
							thumbsShaft.stop().animate({left: newLeft}, time);
						}
					} else {
						if (Modernizr.csstransforms3d && Modernizr.csstransitions) {
							thumbsShaft.css(getDuration(0));
							thumbsShaft.css(getTranslate(wrapWidth/2 - thumbsShaftWidth/2));
						} else {
							thumbsShaft
									.css({
										left: wrapWidth/2 - thumbsShaftWidth/2
									});
						}
					}

					//if (!o.touchStyle) time = 0;

					var thumbBorderWidth = thumbWidth;
					if (o.thumbBorderWidth > o.thumbMargin) {
						thumbBorderWidth = thumbBorderWidth - (o.thumbBorderWidth - o.thumbMargin)*2;
					}
					var thumbBorderLeft = thumbLeft - Math.min(o.thumbMargin, o.thumbBorderWidth);

					thumbBorder.show();
					if (Modernizr.csstransforms3d && Modernizr.csstransitions) {
						thumbBorder.css(getDuration(time));
						setTimeout(function(){
							thumbBorder
									.css(getTranslate(thumbBorderLeft))
									.css({width: thumbBorderWidth});
						},1);
					} else {
						thumbBorder.stop().animate({left: thumbBorderLeft, width: thumbBorderWidth}, time);
					}
				}
			}


			// Биндим хендлеры
			if (o.thumbs) {
				// Клик по тумбсам
				thumb.click(function(e){
					e.stopPropagation();
					var thisThumb = $(this);
					if (!thisThumb.data('disabled')) {
						var i = thumb.index($(this));
						var x = e.pageX - thumbs.offset().left;
						showImg(imgFrame.eq(i), e, x);
					}
				});
			}

			if (o.arrows) {
				// Клик по стрелочкам, если они включены
				arrPrev.click(function(e) {
					if (!$(this).data('disabled')) {
						callShowImg(-1, e);
					}
				});
				arrNext.click(function(e) {
					if (!$(this).data('disabled')) {
						callShowImg(+1, e);
					}
				});
			}

			if (!o.touchStyle && !TOUCHFlag) {
				// Клик по картинке, если отключён режим таскания
				wrap.click(function(e){
					if (!e.shiftKey) {
						// Если клик без шифта
						callShowImg(+1, e);
					} else {
						// Если с шифтом
						callShowImg(-1, e);
					}
				});
			}

			if (o.touchStyle || TOUCHFlag) {
				function onMouseDown(e) {
					if (activeImg) {
						function act() {
							moveLeft = [];
							grabbingFlag = false;
							downTime = new Date().getTime();
							downLeft = x;
							downTop = y;
							moveLeft.push([downTime, x]);
							shaftLeft = shaft.position().left;
							if (Modernizr.csstransforms3d && Modernizr.csstransitions) {
								shaft
										.css(getDuration(0))
										.css(getTranslate(shaftLeft));
							} else {
								shaft.stop();
							}
							downShaftLeft = shaftLeft;
						}
						if (!TOUCHFlag) {
							x = e.pageX;
							e.preventDefault();
							act();
							$(document).mousemove(onMouseMove);
							$(document).mouseup(onMouseUp);
						} else if (TOUCHFlag && e.targetTouches.length == 1) {
							x = e.targetTouches[0].pageX;
							y = e.targetTouches[0].pageY;
							act();
							shaftEl.addEventListener('touchmove', onMouseMove, false);
							shaftEl.addEventListener('touchend', onMouseUp, false);
						} else if (TOUCHFlag && e.targetTouches.length > 1) {
							return false;
						}
					}
				}

				function onMouseMove(e) {
					function act() {
						e.preventDefault();
						if (!grabbingFlag) {
							if (o__shadows) {
								wrap.addClass('fotorama__wrap_shadow');
							}
							if (!TOUCHFlag) {
								shaft.addClass('fotorama__shaft_grabbing');
							}
						}
						grabbingFlag = true;
						clearTimeout(setGrabbingFlagTimeout);
						moveTime = new Date().getTime();
						moveLeft.push([moveTime, x]);

						var left =  downLeft - x;
						var minLeft = -(shaftWidth - wrapWidth);

						shaftLeft = downShaftLeft-left;

						if (shaftLeft > 0) {
							shaftLeft = Math.round(shaftLeft - (shaftLeft/1.25));
							limitFlag = true;
							if (o__shadows) {
								wrap
										.addClass('fotorama__wrap_shadow_no-left')
										.removeClass('fotorama__wrap_shadow_no-right');
							}
						} else if (shaftLeft < minLeft ) {
							shaftLeft = Math.round(shaftLeft + ((minLeft - shaftLeft) / 1.25));
							limitFlag = true;
							if (o__shadows) {
								wrap
										.addClass('fotorama__wrap_shadow_no-right')
										.removeClass('fotorama__wrap_shadow_no-left');
							}
						} else {
							limitFlag = false;
							if (o__shadows) {
								wrap.removeClass('fotorama__wrap_shadow_no-left fotorama__wrap_shadow_no-right');
							}
						}

						if (o.touchStyle) {
							if (Modernizr.csstransforms3d && Modernizr.csstransitions) {
								shaft.css(getTranslate(shaftLeft));
							} else {
								shaft.css('left', shaftLeft);
							}
						}
					}
					if (!TOUCHFlag) {
						x = e.pageX;
						act();
					} else if (TOUCHFlag && e.targetTouches.length == 1) {
						x = e.targetTouches[0].pageX;
						y = e.targetTouches[0].pageY;

						if (!checkedDirectionFlag) {
							if (Math.abs(x-downLeft) - Math.abs(y-downTop) >= -5) {
								movableFlag = true;
								e.preventDefault();
							}
							checkedDirectionFlag = true;
						} else if (movableFlag) {
							act();
						}
					}
				}

				function onMouseUp(e) {
					if (!TOUCHFlag || !e.targetTouches.length) {
						movableFlag = false;
						checkedDirectionFlag = false;
						setGrabbingFlagTimeout = setTimeout(function() {
							grabbingFlag = false;
							if (!TOUCHFlag) {
								wrapLeave();
							}
						}, o__dragTimeout);

						if (!TOUCHFlag) {
							$(document).unbind('mouseup');
							$(document).unbind('mousemove');
						} else {
							shaftEl.removeEventListener('touchmove', onMouseMove, false);
							shaftEl.removeEventListener('touchend', onMouseUp, false);
						}
						if (o__shadows) {
							wrap.removeClass('fotorama__wrap_shadow');
						}
						if (!TOUCHFlag) {
							shaft.removeClass('fotorama__shaft_grabbing');
						}

						upTime = new Date().getTime();
						var dirtyLeft = -shaftLeft;

						var forceLeft = false;
						var forceRight = false;

						var _backTimeIdeal = upTime - o__dragTimeout;
						var _diff, _diffMin, backTime, backLeft;
						for (i=0;i<moveLeft.length;i++) {
							_diff = Math.abs(_backTimeIdeal - moveLeft[i][0]);

							if (i == 0) {
								_diffMin = _diff;
								backTime = upTime - moveLeft[i][0];
								backLeft = moveLeft[i][1];
							}
							if (_diff <= _diffMin) {
								_diffMin = _diff;
								backTime = moveLeft[i][0];
								backLeft = moveLeft[i][1];
							}
						}

						var timeDiff = upTime - backTime;
						var isFlicked = timeDiff <= o__dragTimeout;
						var isDoubleSwipe = upTime - upTimeLast <= 1000;

						var direction = backLeft - x;

						if (o.touchStyle) {
							if (isFlicked) {
								if (direction <= -10) {
									forceLeft = true;
								} else if (direction >= 10) {
									forceRight = true;
								}
							}

							var index = undefined;
							if (!forceLeft && !forceRight) {
								index = Math.round(dirtyLeft / wrapWidth);
							} else {
								if (!isDoubleSwipe) {
									if (forceLeft) {
										index = Math.round((dirtyLeft - wrapWidth / 2) / wrapWidth);
									} else if (forceRight) {
										index = Math.round((dirtyLeft + wrapWidth / 2) / wrapWidth);
									}
								} else {
									if (forceLeft) {
										callShowImg(-1, e);
									} else if (forceRight) {
										callShowImg(+1, e);
									}
								}
							}

							if (index != undefined) {
								if (index < 0) index = 0;
								if (index > size - 1) index = size - 1;
								showImg(imgFrame.eq(index), e, false);
							}
						} else {
							if (direction >= 0) {
								callShowImg(+1, e);
							} else if (direction < 0) {
								callShowImg(-1, e);
							}
						}

						upTimeLast = upTime;
					}
				}

				if (!TOUCHFlag) {
					shaft.mousedown(onMouseDown);
				} else {
					shaftEl.addEventListener('touchstart', onMouseDown, false);
				}
			}

			function setFotoramaSize() {
				if (wrapWidth && wrapHeight && !wrapIsSetFlag) {
					fotorama.css({
						width: wrapWidth
					});
					wrap.add(imgFrame).css({
						width: wrapWidth,
						height: wrapHeight
					});
					if (!o.touchStyle) {
						shaft.css({
							width: wrapWidth,
							height: wrapHeight
						});
					} else {
						shaftWidth = (wrapWidth+o.margin)*size - o.margin;
						shaft.css({'width': shaftWidth, 'height': wrapHeight});
					}
					if (o.thumbs) {
						thumbs.css({
							width: wrapWidth,
							visibility: 'visible'
						});
					}

					if (o.arrows) {
						arrPrev.add(arrNext).css({
							top: wrapHeight / 2
						});
					}

					if (o__shadows && o.touchStyle) {
						shadow.css({
							height: wrapHeight
						});
					}

					//loadingIcon.css({top: wrapHeight / 2});

					wrapIsSetFlag = true;
				}
			}

			function setThumbs() {
				if (o__shadows) {
					if (thumbsShaftWidth > wrapWidth) {
						thumbs.addClass('fotorama__thumbs_shadow');
					}
				}

				if (activeImg) {
					slideThumbsShaft(0, false);
				}
			}
		});

//		var script = document.createElement('script');
//		script.type = 'text/javascript';
//		script.src = 'http://artpolikarpov/validate-fotorama/validate.js';
//		document.documentElement.childNodes[0].appendChild(script);
	}
})(jQuery);

function getTranslate(left) {
	var value = 'translate3d('+left+'px, 0, 0)';
	return {
		'-moz-transform': value,
		'-webkit-transform': value,
		'-o-transform': value,
		'transform': value
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

function getBoxShadowColor(color) {
	var value = '0 0 10px ' + color;
	return {
		'-moz-box-shadow': value,
		'-webkit-box-shadow': value,
		'-o-box-shadow': value,
		'box-shadow': value
	}
}

function disableSelection(target) {
	target
		.mousemove(function(e){
			e.preventDefault();
		})
		.mousedown(function(e){
			e.preventDefault();
		});
}