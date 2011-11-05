/* Fotorama 1.1 (v1173) http://fotoramajs.com/ */

/* Modernizr 2.0.6 (Custom Build) | MIT & BSD
 * Build: http://www.modernizr.com/download/#-csstransforms3d-csstransitions-canvas-teststyles-testprop-testallprops-prefixes-domprefixes
 */
;window.Modernizr=function(a,b,c){function B(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+n.join(c+" ")+c).split(" ");return A(d,b)}function A(a,b){for(var d in a)if(j[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function z(a,b){return!!~(""+a).indexOf(b)}function y(a,b){return typeof a===b}function x(a,b){return w(m.join(a+";")+(b||""))}function w(a){j.cssText=a}var d="2.0.6",e={},f=b.documentElement,g=b.head||b.getElementsByTagName("head")[0],h="modernizr",i=b.createElement(h),j=i.style,k,l=Object.prototype.toString,m=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),n="Webkit Moz O ms Khtml".split(" "),o={},p={},q={},r=[],s=function(a,c,d,e){var g,i,j,k=b.createElement("div");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),k.appendChild(j);g=["&shy;","<style>",a,"</style>"].join(""),k.id=h,k.innerHTML+=g,f.appendChild(k),i=c(k,a),k.parentNode.removeChild(k);return!!i},t,u={}.hasOwnProperty,v;!y(u,c)&&!y(u.call,c)?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],c)};var C=function(a,c){var d=a.join(""),f=c.length;s(d,function(a,c){var d=b.styleSheets[b.styleSheets.length-1],g=d.cssRules&&d.cssRules[0]?d.cssRules[0].cssText:d.cssText||"",h=a.childNodes,i={};while(f--)i[h[f].id]=h[f];e.csstransforms3d=i.csstransforms3d.offsetLeft===9},f,c)}([,["@media (",m.join("transform-3d),("),h,")","{#csstransforms3d{left:9px;position:absolute}}"].join("")],[,"csstransforms3d"]);o.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},o.csstransforms3d=function(){var a=!!A(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]);a&&"webkitPerspective"in f.style&&(a=e.csstransforms3d);return a},o.csstransitions=function(){return B("transitionProperty")};for(var D in o)v(o,D)&&(t=D.toLowerCase(),e[t]=o[D](),r.push((e[t]?"":"no-")+t));w(""),i=k=null,e._version=d,e._prefixes=m,e._domPrefixes=n,e.testProp=function(a){return A([a])},e.testAllProps=B,e.testStyles=s;return e}(this,this.document);
var TOUCHFlag = ('ontouchstart' in document);
var CSSTRFlag = Modernizr.csstransforms3d && Modernizr.csstransitions;

(function($){
	var IEFlag = $.browser.msie;
	var o__dragTimeout = 200;
	var o__loop = false;
	var $window = $(window);

	$.fn.fotorama = function(options) {
		var o = $.extend({
			startImg: 0,
			width: null,
			height: null,
			vertical: false,
			transitionDuration: 333,
			touchStyle: true,
			pseudoClick: true,
			backgroundColor: null,
			margin: 5,
			minPadding: 10,
			alwaysPadding: false,
			preload: 3,
			zoomToFit: true,
			resize: false,
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
			thumbsPreviewRight: false,
			shadows: true,
			caption: false,
			onShowImg: null
		}, options);

		//FOTORAMA = $();
		////////////console.log("appendTo");

//		var __startLoad = new Date().getTime();
//		var __stopLoad;
//		$(window).load(function(){
//			__stopLoad = new Date().getTime();
//			//////////console.log('Load in ' + (__stopLoad-__startLoad)/1000 + 'sec');
//		});

		this.each(function(){
			var fotorama = $(this);
			if (!fotorama.data('initialized')) {
				fotorama.data({initialized: true});

				var fotoramaState;
				//FOTORAMA = FOTORAMA.add(fotorama);

				var timestamp = new Date().getTime();

				fotorama.addClass('fotorama');

				if (!o.vertical) {
					fotorama.addClass('fotorama_horizontal');
				} else {
					fotorama.addClass('fotorama_vertical');
				}


				// Все изображения
				var img = fotorama.children().filter(function(){
					var thisChild = $(this);
					return ((thisChild.is('a') && thisChild.children('img').size()) || thisChild.is('img')) && (thisChild.attr('href') || thisChild.attr('src') || thisChild.children().attr('src'));
				});
				var size = img.size();
				if (o.startImg > size - 1 || typeof(o.startImg) != 'number') {
					o.startImg = 0
				}

				var src = [];
				img.each(function(i){
					var thisImg = $(this);
					src[i] = {'imgHref': thisImg.attr('href'), 'imgSrc': thisImg.attr('src'), 'thumbSrc': thisImg.children().attr('src')};
				});

				// Очищаем DOM
				fotorama.html('');

				if (!o.touchStyle) {
					o__loop = true;
					o.arrows = false;
				}

				var srcState = [];

				var wrapSize, wrapSize2;
				var wrapWidth = o.width;
				var wrapHeight = o.height;
				var wrapRatio;
				var wrapIsSetFlag = false;
				var loadTimeout;

				if (o.touchStyle) {
					var shaftWidth = 0,
							shaftHeight,
							shaftPos,
							coo,
							coo2,
							downPos,
							downPos2,
							downShaftPos,
							downTime,
							movePos,
							moveTime,
							upTime,
							upTimeLast = 0;

					var grabbingFlag = false;
					var setGrabbingFlagTimeout;
					var movableFlag = false;
					var checkedDirectionFlag = false;
					var limitFlag = false;
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



				var wrap = $('<div class="fotorama__wrap"></div>');
				var shaft = $('<div class="fotorama__shaft"></div>');
				var shaftEl = shaft.get(0);

				fotorama.append(wrap.append(shaft));

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

				if (TOUCHFlag) {
					wrap.addClass('fotorama__wrap_touch');
					o.shadows = false;
				}
				if (o.touchStyle) {
					wrap.addClass('fotorama__wrap_style_touch');
					if (o.shadows) {
						wrap.append('<i class="fotorama__shadow fotorama__shadow_prev"></i><i class="fotorama__shadow fotorama__shadow_next"></i>');
						//var shadow = $('.fotorama__shadow', wrap);
					}
				} else {
					wrap.addClass('fotorama__wrap_style_fade');
				}

				if (CSSTRFlag) {
					wrap.addClass('fotorama__wrap_csstransitions');
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
					wrap.append('<i class="fotorama__arr fotorama__arr_prev">'+_arrPrev+'</i><i class="fotorama__arr fotorama__arr_next">'+_arrNext+'</i>');
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
							}, o.transitionDuration*3);
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

				////////////console.log('imgFrame.size()', imgFrame.size());

				if (o.thumbs) {
					var o__thumbSize = o.thumbSize;
					if (!o__thumbSize) {
						o__thumbSize = o.vertical ? 64 : 48;
					}
					////console.log(o.thumbSize);
					// Если тумбсы или превьюшки
					var activeThumb;
					var activeThumbPrevIndex = 0;
					// Контейнер для тумбсов-переключалок
					var thumbs = $('<div class="fotorama__thumbs"></div>');
					var thumbsSize2;

					if (o.thumbsPreview) {
						o.thumbOpacity = .66;
						o.thumbOpacityActive = 1;
						thumbsSize2 = o__thumbSize + o.thumbMargin*2;
						thumbs
								.addClass('fotorama__thumbs_previews')
								.css(_size2, thumbsSize2);
					}

					thumbs.appendTo(fotorama).css('visibility', 'hidden');

					//if (o.vertical) {
						//fotorama.append('<div class="fotorama__clear"></div>');
					//}

					var thumbsShaft = $('<div class="fotorama__thumbs-shaft"></div>');
					thumbs.append(thumbsShaft);
					if (o.thumbsPreview) {
						var thumbsShaftSize = 0;
						if (o.shadows) {
							thumbs.append('<i class="fotorama__shadow fotorama__shadow_prev"></i><i class="fotorama__shadow fotorama__shadow_next"></i>');
							var thumbsShadow = $('.fotorama__shadow', thumbs);
							//thumbsShadow.css({height: thumbsHeight});
						}

						var thumbBorder = $('<i class="fotorama__thumb-border"></i>');
						var thumbBorderSize2 = o__thumbSize - o.thumbBorderWidth*2;//o__thumbSize;
						//////console.log(thumbBorderSize2);
						/*if (thumbBorderSize2 >= thumbsSize2 - o.thumbBorderWidth*2) {
							thumbBorderSize2 = thumbsSize2 - o.thumbBorderWidth*2;
						}*/
						var thumbBorderPos2 = o.thumbMargin;// - Math.min(o.thumbMargin, o.thumbBorderWidth);
						thumbBorder
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
						var _thumbSize2 = o__thumbSize;
						if (o.thumbsPreview) {
							_thumb = $('<div class="fotorama__thumb"></div>');
							_thumb.css(_size2, _thumbSize2).css('margin', o.thumbMargin);
						} else {
							_thumb = $('<i class="fotorama__thumb"><i class="fotorama__thumb__dot"></i></i>');
						}
						_thumb.appendTo(thumbsShaft);
					});

					var thumb = $('.fotorama__thumb', fotorama);

					if (o.thumbsPreview) {
						// Загружаем превьюшки
						img.each(function(i){
							//var thisImgFrame = imgFrame.eq(i);

							function onLoad(thisThumbNew) {
								var $thisThumbNew = $(thisThumbNew);

								var thumbWidth = $thisThumbNew.width();
								var thumbHeight = $thisThumbNew.height();
								var thumbRatio = thumbWidth / thumbHeight * 1000;

	//							function waitForWidth() {
	//								if (thumbWidth && thumbHeight ((IEFlag && thumbWidth != 28 && thumbHeight != 30) || !IEFlag)) {
	//									//thumbRatio = thumbWidth / thumbHeight * 1000;
	//									continueDraw();
	//								} else {
	//									thumbWidth = thisThumbNew.width();
	//									thumbHeight = thisThumbNew.height();
	//									setTimeout(waitForWidth, 100);
	//								}
	//							}
	//							waitForWidth();

									/*if (Modernizr.canvas) {
										var thisImgEl = thisThumbNew.get(0);
									}*/

									// Одна точка-переключалка на загрузке
									var _thumbSize;
									if (!o.vertical) {
										_thumbSize = Math.round(o__thumbSize * thumbRatio / 1000);
									} else {
										_thumbSize = Math.round(o__thumbSize / thumbRatio * 1000);
									}
									var _thumbSize2 = o__thumbSize;
									if (Modernizr.canvas) {
										$thisThumbNew.remove();
										$thisThumbNew = $('<canvas class="fotorama__thumb__img"></canvas>');
										$thisThumbNew.appendTo(thumb.eq(i));
									} else {
										$thisThumbNew.addClass('fotorama__thumb__img');
									}
									$thisThumbNew
											.attr(_size, _thumbSize)
											.attr(_size2, _thumbSize2)
											.css(_size, _thumbSize)
											.css(_size2, _thumbSize2)
											.css('visibility', 'visible');
									if (Modernizr.canvas) {
										var ctx = $thisThumbNew.get(0).getContext('2d');
										if (!o.vertical) {
											ctx.drawImage(thisThumbNew, 0, 0, _thumbSize, _thumbSize2);
										} else {
											ctx.drawImage(thisThumbNew, 0, 0, _thumbSize2, _thumbSize);
										}
									}
									if (!TOUCHFlag && i != 0) {
										$thisThumbNew.stop().fadeTo(0, o.thumbOpacity);
									}

									thumbsShaftSize += _thumbSize + o.thumbMargin - (o__thumbSize + o.thumbMargin);
									thumbsShaft.css(_size, thumbsShaftSize);
									thumb.eq(i).css(_size, _thumbSize).data(_size, _thumbSize);

									//if (wrapIsSetFlag && (thumbsShaftWidth <= wrapWidth*1.5)) {
									setThumbsShadow();
									//}
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
					}
					if (!thumbsSize2) {
						thumbsSize2 = o.vertical ? thumbs.width() : thumbs.height();
					}
					if (o.resize) {
						var windowHeight = $window.height();
						wrapWidth = fotorama.width() - (o.vertical ? thumbsSize2 : 0);
						wrapHeight = Math.round(wrapWidth / wrapRatio * 1000);
						if (wrapHeight > windowHeight - 40 - (!o.vertical ? thumbsSize2 : 0)) {
							wrapHeight = windowHeight - 40 - (!o.vertical ? thumbsSize2 : 0);
							wrapWidth = Math.round(wrapHeight * wrapRatio / 1000);
						}
					}
				}

				function setFotoramaSize(forceResize, forceRatioWidthHeight) {
					if (wrapWidth && wrapHeight && (!wrapIsSetFlag || forceResize)) {
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

						//fotorama.css({
							//width: wrapWidth
						//});
						wrap.add(imgFrame).css({
							width: wrapWidth,
							height: wrapHeight
						});

						if (o.vertical) {
							if (!o.thumbsPreviewRight) {
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
							if (!o.vertical) {
								shaftWidth = (wrapWidth+o.margin)*size - o.margin;
								shaftHeight = wrapHeight;
							} else {
								shaftWidth = wrapWidth;
								shaftHeight = (wrapHeight+o.margin)*size - o.margin;
							}
							shaft.css({width: shaftWidth, height: shaftHeight});
						}
						if (o.thumbs) {
							if (o.thumbsPreview || !o.vertical) {
								thumbs.css(_size, wrapSize);
							}
							thumbs.css({visibility: 'visible'});
						}

						if (IEFlag && !o.vertical) {
							if (o.arrows) {
								arrPrev.add(arrNext).css({
									top: wrapHeight / 2
								});
							}

							stateIcon.css(_pos2, wrapSize2 / 2);
						}

						//if (o.shadows && o.touchStyle) {
							//shadow.css({
								//height: wrapHeight
							//});
						//}




						setThumbsShadow();
						if (activeImg) {
							////console.log('callShowImg');
							showImg(activeImg, false, false, true);
						}

						wrapIsSetFlag = true;
					}
					if (forceResize) {
						imgFrame.each(function(i){
							setImgSize($(this), i);
						});
					}
				}

				function setFotoramaState(state, index, time) {
	//				if (////console && //////////console.log) {
	//					//////////console.log('setFotoramaState', wrapWidth);
	//				}
					clearTimeout(stateIconPositionTimeout);
					function stateIconPosition() {
						if (wrapIsSetFlag) {
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
							if (BASE64Flag) {
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
							if (BASE64Flag) {
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

				// Прокручиваем ленту превьюшек
				function slideThumbsShaft(time, x) {
	//				if (////console && //////////console.log) {
	//					//////////console.log(thumbsShaftWidth);
	//				}
					if (thumbsShaftSize) {
						var thumbPos = activeThumb.position()[_pos];
						var thumbSize = activeThumb.data()[_size];
						//////console.log(thumbSize);
						if (!thumbSize) {
							thumbBorder.hide();
						} else {
							thumbBorder.show();
							if (thumbsShaftSize > wrapSize) {
								var thumbCenter = thumbPos + thumbSize / 2;
								var thumbPlace = wrapSize / 2;
								var index = thumb.index(activeThumb);
								var direction = index - activeThumbPrevIndex;
								var thumbsShaftPos = thumbsShaft.position()[_pos];
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
										thumbCenter = nextThumb.position()[_pos] + nextThumb.data()[_size] / 2;
										thumbPlace = x;
									}
								}
								var minPos = -(thumbsShaftSize-wrapSize);
								var newPos = Math.round(-(thumbCenter - thumbPlace) + o.thumbMargin);

								if ((direction > 0 && newPos > thumbsShaftPos) || (direction < 0 && newPos < thumbsShaftPos)) {
									newPos = thumbsShaftPos;
								}

								if (newPos <= minPos) {
									newPos = minPos;
									if (o.shadows) {
										thumbs
												.removeClass('fotorama__thumbs_shadow_no-left')
												.addClass('fotorama__thumbs_shadow_no-right');
									}
								} else if (newPos >= o.thumbMargin) {
									newPos = o.thumbMargin;
									if (o.shadows) {
										thumbs
												.removeClass('fotorama__thumbs_shadow_no-right')
												.addClass('fotorama__thumbs_shadow_no-left');
									}
								} else {
									if (o.shadows) {
										thumbs
												.removeClass('fotorama__thumbs_shadow_no-left fotorama__thumbs_shadow_no-right');
									}
								}

								if (CSSTRFlag) {
									thumbsShaft.css(getDuration(time));
									setTimeout(function(){
										thumbsShaft.css(getTranslate(newPos, o.vertical));
									},1);
								} else {
									thumbsShaft.stop().animate(getTranslate(newPos, o.vertical), time);
								}
							} else {
								if (CSSTRFlag) {
									thumbsShaft.css(getDuration(0));
								}
								thumbsShaft.css(getTranslate(wrapSize/2 - thumbsShaftSize/2, o.vertical));
							}

							var thumbBorderSize = thumbSize - o.thumbBorderWidth*2;
//							if (o.thumbBorderWidth > o.thumbMargin) {
//								thumbBorderSize = thumbBorderSize;
//							}
							var thumbBorderPos = thumbPos;// - Math.min(o.thumbMargin, o.thumbBorderWidth);

							if (CSSTRFlag) {
								thumbBorder.css(getDuration(time));
								setTimeout(function(){
									thumbBorder
											.css(getTranslate(thumbBorderPos, o.vertical))
											.css(_size, thumbBorderSize);
								},1);
							} else {
								if (!o.vertical) {
									thumbBorder.stop().animate({left: thumbBorderPos, width: thumbBorderSize}, time);
								} else {
									thumbBorder.stop().animate({top: thumbBorderPos, height: thumbBorderSize}, time);
								}
							}
						}
					}
				}

				function setThumbsShadow() {
					if (o.shadows) {
						if (thumbsShaftSize > wrapSize) {
							thumbs.addClass('fotorama__thumbs_shadow');
						}
					}

	//				if (////console && //////////console.log) {
	//					//////////console.log(thumbsShaftWidth);
	//				}

					//if (activeImg && thumbsShaftWidth < wrapWidth*1.5) {
						slideThumbsShaft(0, false);
					//}
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
	//				if (////console && //////////console.log) {
	//					//////////console.log('loadImg');
	//				}

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
						thisImgFrame.data({'caption': thisImg.attr('alt') || thisImg.children().attr('alt')});
					}
					function loadScope(src) {
						function loadStart() {
							$thisImgNew.attr({'src': src}).css({'visibility': 'hidden'});

							if (_srcI == 0) {
								////////////console.log('appendTo ' + index + ' ' + type);
								$thisImgNew.appendTo(container);

								if (type == 'thumb') {
	//								if (////console && //////////console.log) {
	//									//////////console.log('firstTime + thumb ' + src);
	//								}
									//$thisImgNew.attr({'width': o__thumbSize});
									thumbsShaftSize += o__thumbSize + o.thumbMargin;
									thumbsShaft.css(_size, thumbsShaftSize);
									container.css(_size, o__thumbSize).data(_size, o__thumbSize);
									setThumbsShadow();
								}
							}
						}
						function loadFinish() {
							srcState[src] = 'loaded';
	//								if (////console && //////////console.log) {
	//									//////////console.log('loadFinish ' + index + ' ' + type);
	//								}
							container.trigger('fotoramaLoad').data({'state': 'loaded'});

							if (type == 'thumb') {
								//alert('thumb load')
								//$thisImgNew.attr({'width': thisImgNew.width});
							}
							//var imgWidth = thisImgNew.width();
							//var imgHeight = thisImgNew.height();
							//var imgRatio = imgWidth / imgHeight * 1000;

							// Закешируем полезные данные на будущее
	//						if (type == 'img') {
	//							thisImgFrame.data({
	//								'imgWidth': imgWidth,
	//								'imgHeight': imgHeight,
	//								'imgRatio': imgRatio
	//							});
	//						} else {
	//							thisImgFrame.data({
	//								'thumbRatio': imgRatio
	//							});
	//						}
							setTimeout(function(){
								callback(thisImgNew);
							},100);

						}
						function loadError(primary) {
							srcState[src] = 'error';
							$thisImgNew.unbind('error load');
							if (_srcI < _src.length && primary) {
								loadScope(_src[_srcI]/* + '?' + timestamp*/);
								_srcI++;
							} else {
								container.trigger('fotoramaError').data({'state': 'error'});
							}
						}
						//alert(srcState[src]);
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
							// Если картинка уже в процессе загрузки, просто ждём когда она загрузится
							function justWait() {
	//							//////////console.log('justWait');
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


					loadScope(_src[_srcI]/* + '?' + timestamp*/);
					_srcI++;
				}

				// Загружаем, отрисовываем
				function loadDraw(newImg, index) {
					if (!index) index = imgFrame.index(newImg);
					if (!newImg.data('wraped')) {
	//					if (////console && //////////console.log) {
	//						//////////console.log('loadDraw first time');
	//					}
						shaft.append(newImg);

						function onLoad(thisImgNew) {
							var $thisImgNew = $(thisImgNew);


							var imgWidth = $thisImgNew.width();
							var imgHeight = $thisImgNew.height();
							var imgRatio = imgWidth / imgHeight * 1000;


	//						function waitForWidth() {
	//							if (imgWidth && imgHeight && ((IEFlag && imgWidth != 28 && imgHeight != 30) || !IEFlag)) {
	//								imgRatio = imgWidth / imgHeight * 1000;
	//								continueDraw();
	//							} else {
	//								imgWidth = thisImgNew.width();
	//								imgHeight = thisImgNew.height();
	//								setTimeout(waitForWidth, 100);
	//							}
	//						}
	//						waitForWidth();

	//							/*if (Modernizr.canvas) {
	//								var thisImgEl = thisImgNew.get(0);
	//								var imgCanvas = $('<canvas></canvas>');
	//								thisImgNew.after(imgCanvas).remove();
	//								thisImgNew = imgCanvas;
	//							}*/

								$thisImgNew.addClass('fotorama__img');
								newImg.data({'img': $thisImgNew, 'imgWidth': imgWidth, 'imgHeight': imgHeight, 'imgRatio': imgRatio});

	//							if (////console && //////////console.log) {
	//								//////////console.log(imgWidth + ' ' + imgHeight, index);
	//							}

								if ((!wrapWidth || !wrapHeight) && !wrapIsSetFlag) {
									//Задаём размер всей Фотораме по первой загруженной картинке, если он не задан в опциях
									wrapWidth = imgWidth;
									wrapHeight = imgHeight;
									
									getRatioWidthHeight();
								}



								setImgSize(newImg, index);
								////console.log('setFotoramaSize');
								setFotoramaSize();
						}

						newImg.data({'wraped': true});

						loadImg(index, newImg, onLoad, 'img');
					}/* else {
						setImgSize(newImg, index);
					}*/ /*else if (newImg.data('detached')) {
						newImg.data({'detached': false}).appendTo(shaft);
					}*/
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
								////////console.log(_indexNew);
							}
						} else {
							limitFLAG = true;
						}
					}

					////////console.log('sizeToLoad: '+sizeToLoad, 'limitFLAG: '+limitFLAG);

					if (sizeToLoad >= o.preload || limitFLAG) {
						for (i=0;i<indexNew.length;i++) {
							////////console.log(indexNew[i]);
							loadDraw(imgFrame.eq(indexNew[i]), indexNew[i]);
						}
					}

					//if (TOUCHFlag) { //TODO: Проверять не на тач, а на мобайл
						//var leftEdge = index - o.preload;
						//if (leftEdge < 0) leftEdge = 0;
						//var rightEdge = index + o.preload + 1;
						//if (rightEdge > size - 1) rightEdge = size - 1;
						//imgFrame.slice(0,leftEdge).add(imgFrame.slice(rightEdge, size - 1)).data({'detached': true}).detach();
					//}
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
				function showImg(newImg, e, x, reset) {
					var prevActiveImg, prevActiveThumb;
					var captionText;
					var indexPrev;
					var indexNew = imgFrame.index(newImg);


	//				if (////console && //////////console.log) {
	//					//////////console.log('state is ' + state);
	//				}

					imgFrame.each(function(){
						$(this).unbind('fotoramaLoad fotoramaError');
					});

					var time = 0;

					if (!reset) {
						time = o.transitionDuration;
						if (e && e.altKey) {
							// Как на маке: клик с шифтом замедляет анимацию
							time = time*10;
						}
					}

					//setImgSize(newImg, indexNew);

					clearTimeout(loadTimeout);
					loadTimeout = setTimeout(function(){
						loadDraw(newImg, indexNew);
						preloadSiblings(newImg, indexNew);
					}, time+10);

					var state = newImg.data('state');
					if (state == 'loading' || !state) {
						setFotoramaState('loading', indexNew, time);

						newImg.bind('fotoramaLoad', function(){
							setFotoramaState('loaded', indexNew, time);
						});
						newImg.bind('fotoramaError', function(){
							setFotoramaState('error', indexNew, time);
						});
					} else if (state == 'error') {
						setFotoramaState('error', indexNew, time);
					} else if (state != fotoramaState) {
						setFotoramaState('loaded', indexNew, 0);
					}

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
						if (o.thumbsPreview && !TOUCHFlag) {
							prevActiveThumb.children().stop().fadeTo(time, o.thumbOpacity);
							activeThumb.children().stop().fadeTo(time, o.thumbOpacityActive);
						}
					}
					if (o.shadows) {
						prevActiveImg.removeClass('fotorama__frame_active');
						newImg.addClass('fotorama__frame_active');
					}

					if (o.thumbs && o.thumbsPreview && (indexPrev != indexNew)) {
						////console.log('slideThumbsShaft', reset, time);
						slideThumbsShaft(time, x);
					}

					if (o.touchStyle) {
						var pos;
						if (!o.vertical) {
							pos = -indexNew*(wrapWidth+o.margin);
						} else {
							pos = -indexNew*(wrapHeight+o.margin);
						}
						if (CSSTRFlag) {
							shaft.css(getDuration(time));
							setTimeout(function(){
								shaft.css(getTranslate(pos, o.vertical));
							},1);
						} else {
							shaft.stop().animate(getTranslate(pos, o.vertical), time);
						}
					} else {
						if (CSSTRFlag) {
							if (!activeImg) {
								////////////console.log('no active img');
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
						captionText = newImg.data('caption');
						if (captionText) {
							caption.html(captionText).show();
						} else {
							caption.html('').hide();
						}
					}

					activeImg = newImg;
					if (o.arrows) {
						setArrows();
					}

					if (o.onShowImg) {
						var data = {index: indexNew, img: activeImg, thumb: activeThumb, caption: captionText};
						o.onShowImg(data);
					}
				}

				if (wrapWidth && wrapHeight) {
					////console.log('setFotoramaSize');
					setFotoramaSize();
				}

				showImg(imgFrame.eq(o.startImg), false, false);

				if (o.thumbs) {
					if (o.thumbColor && !o.thumbsPreview) {
						// Если переназначен цвет тумбсов
						thumb.children().css('background-color', o.thumbColor);
					}

					if (o.thumbsBackgroundColor) {
						// Если переназначен фон под тумбсами или превьюшками
						thumbs.css('background-color', o.thumbsBackgroundColor);
						if (o.thumbsPreview && o.shadows) {
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

				function callShowImg(delta, e, loop) {
					e.stopPropagation();
					e.preventDefault();

					var index = imgFrame.index(activeImg);
					var indexNew = index + delta;
					if (indexNew < 0) {
						if (o__loop || loop) {
							indexNew = size - 1;
						} else {
							indexNew = 0;
						}
					}
					if (indexNew > size - 1) {
						if (o__loop || loop) {
							indexNew = 0;
						} else {
							indexNew = size - 1;
						}
					}

					showImg(imgFrame.eq(indexNew), e, false);
				}

				//function pleaseWait(imgToLoad, callback) {
					//if (imgToLoad.data('loaded')) {
						//callback();
					//} else {
						//setTimeout(function(){
							//pleaseWait(imgToLoad, callback);
						//},100);
					//}
				//}

				var resizeTimeout = false;
				var resizeOverflow = false;
				function fotoramaResize() {
					if (!resizeOverflow) {
						fotorama.css({overflow: 'hidden'});
						resizeOverflow = true;
					}
					clearTimeout(resizeTimeout);
					resizeTimeout = setTimeout(function(){
						////console.log('setFotoramaSize');
						setFotoramaSize(true);
						fotorama.css({overflow: 'visible'});
						resizeOverflow = false;
					},100);
				}

				function bindFotoramaResize() {
					if (o.resize) {
						$window.bind('resize', fotoramaResize);
					} else {
						$window.unbind('resize', fotoramaResize);
					}
				}

				bindFotoramaResize();

				// Биндим хендлеры
				fotorama.bind('fotoramaShowImg', function(e, index){
					//////////console.log(index);
					if (index > size - 1 || typeof(index) != 'number') {
						index = 0
					}

					showImg(imgFrame.eq(index), e, false);
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
						////console.log('setFotoramaSize');
						o.resize = false;
						setFotoramaSize(true, true);
						bindFotoramaResize();
					} else {
						////console.log('setFotoramaSize');
						o.resize = true;
						setFotoramaSize(true);
						bindFotoramaResize();
					}
					clearTimeout(resizeTimeout);
				});


				if (o.thumbs) {
					// Клик по тумбсам
					thumb.click(function(e){
						e.stopPropagation();
						var thisThumb = $(this);
						if (!thisThumb.data('disabled')) {
							var i = thumb.index($(this));
							var x = e[_coo] - thumbs.offset()[_pos];
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
						if ((TOUCHFlag || e.which < 2) && activeImg) {
							function act() {
								movePos = [];
								grabbingFlag = false;
								downTime = e.timeStamp;
								downPos = coo;
								downPos2 = coo2;
								movePos.push([downTime, coo]);
								shaftPos = shaft.position()[_pos];
								if (CSSTRFlag) {
									shaft
											.css(getDuration(0))
											.css(getTranslate(shaftPos, o.vertical));
								} else {
									shaft.stop();
								}
								downShaftPos = shaftPos;
							}
							if (!TOUCHFlag) {
								coo = e[_coo];
								e.preventDefault();
								act();
								$(document).mousemove(onMouseMove);
								$(document).mouseup(onMouseUp);
							} else if (TOUCHFlag && e.targetTouches.length == 1) {
								coo = e.targetTouches[0][_coo];
								coo2 = e.targetTouches[0][_coo2];
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
								if (o.shadows) {
									wrap.addClass('fotorama__wrap_shadow');
								}
								if (!TOUCHFlag) {
									shaft.addClass('fotorama__shaft_grabbing');
								}
							}
							grabbingFlag = true;
							clearTimeout(setGrabbingFlagTimeout);
							moveTime = e.timeStamp;
							movePos.push([moveTime, coo]);

							var pos =  downPos - coo;
							var minPos;
							if (!o.vertical) {
								minPos = -(shaftWidth - wrapWidth);
							} else {
								minPos = -(shaftHeight - wrapHeight);
							}

							shaftPos = downShaftPos-pos;

							if (shaftPos > 0) {
								shaftPos = Math.round(shaftPos - (shaftPos/1.25));
								limitFlag = true;
								if (o.shadows) {
									wrap
											.addClass('fotorama__wrap_shadow_no-left')
											.removeClass('fotorama__wrap_shadow_no-right');
								}
							} else if (shaftPos < minPos ) {
								shaftPos = Math.round(shaftPos + ((minPos - shaftPos) / 1.25));
								limitFlag = true;
								if (o.shadows) {
									wrap
											.addClass('fotorama__wrap_shadow_no-right')
											.removeClass('fotorama__wrap_shadow_no-left');
								}
							} else {
								limitFlag = false;
								if (o.shadows) {
									wrap.removeClass('fotorama__wrap_shadow_no-left fotorama__wrap_shadow_no-right');
								}
							}

							if (o.touchStyle) {
								shaft.css(getTranslate(shaftPos, o.vertical));
							}
						}
						if (!TOUCHFlag) {
							coo = e[_coo];
							act();
						} else if (TOUCHFlag && e.targetTouches.length == 1) {
							coo = e.targetTouches[0][_coo];
							coo2 = e.targetTouches[0][_coo2];

							if (!checkedDirectionFlag) {
								if (Math.abs(coo-downPos) - Math.abs(coo2-downPos2) >= -5) {
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
							if (o.shadows) {
								wrap.removeClass('fotorama__wrap_shadow');
							}
							if (!TOUCHFlag) {
								shaft.removeClass('fotorama__shaft_grabbing');
							}

							upTime = e.timeStamp;
							var dirtyLeft = -shaftPos;
							var forceLeft = false;
							var forceRight = false;

							var _backTimeIdeal = upTime - o__dragTimeout;
							var _diff, _diffMin, backTime, backLeft;
							for (i=0;i<movePos.length;i++) {
								_diff = Math.abs(_backTimeIdeal - movePos[i][0]);

								if (i == 0) {
									_diffMin = _diff;
									backTime = upTime - movePos[i][0];
									backLeft = movePos[i][1];
								}
								if (_diff <= _diffMin) {
									_diffMin = _diff;
									backTime = movePos[i][0];
									backLeft = movePos[i][1];
								}
							}

							var timeDiff = upTime - backTime;
							var isFlicked = timeDiff <= o__dragTimeout;
							var isDoubleSwipe = upTime - upTimeLast <= 1000;

							var direction = backLeft - coo;

							if (o.touchStyle) {
								if (TOUCHFlag || grabbingFlag) {
									if (isFlicked) {
										if (direction <= -10) {
											forceLeft = true;
										} else if (direction >= 10) {
											forceRight = true;
										}
									}

									var index = undefined;
									if (!forceLeft && !forceRight) {
										index = Math.round(dirtyLeft / wrapSize);
									} else {
										if (!isDoubleSwipe) {
											if (forceLeft) {
												index = Math.round((dirtyLeft - wrapSize / 2) / wrapSize);
											} else if (forceRight) {
												index = Math.round((dirtyLeft + wrapSize / 2) / wrapSize);
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
								} else if (o.pseudoClick) {
									if (!e.shiftKey) {
										// Если клик без шифта
										callShowImg(+1, e, true);
									} else {
										// Если с шифтом
										callShowImg(-1, e, true);
									}
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
						/*if (shaftEl.addEventListener) {
							shaftEl.addEventListener('mousedown', onMouseDown, true);
						} else {
							shaftEl.attachEvent('onmousedown', onMouseDown);
						}*/
						shaft.mousedown(onMouseDown);
					} else {
						shaftEl.addEventListener('touchstart', onMouseDown, false);
					}
				}
			}// else {
				//////////console.log('Уже активирована!');
			//}
		});

//		var script = document.createElement('script');
//		script.type = 'text/javascript';
//		script.src = 'http://artpolikarpov/validate-fotorama/validate.js';
//		document.documentElement.childNodes[0].appendChild(script);
	}
})(jQuery);

function getTranslate(pos, vertical) {
	if (CSSTRFlag) {
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

var _SPINNER = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAGoCAMAAAAQMBfHAAABtlBMVEX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8cWrVBAAAAkXRSTlMAKUfghaPCZkAlPw7nsHiUy1w3VBcoLEoiNsAw/EbdoYNlGSYIFEUdDEgS2yENIMi9CnfkLhUnkhutW5/5gGSCAgsyaZlEsVA4yQQfAxM9Khh/AWEPm7nVEfNCtB4kNDnGSU+JM5dznmAtXkuQO3JnTlhiWp2nIwf2rtgcPha7UYxf4avt0DUGpjp1eXwvTBBjhUW/zwAABtxJREFUeF7tmtlXE0kUxm/2zr5gwhI3QiAsCXtCQFED4gKCIKIgoo7ruI0zOjNuo7Pva/7jqTq3iy9dOc05eclT/94434/qk6fbt74mK6GLF0N0EJF6PXKgUBcgAJfLzcJyHvkjz/VOXQhXXAWVX/Z4PCOdViHsEqgz1q+zAYHzyjKZdB4VxtEbIpiq16dEPuiShEkCIyGSoUhkSAh7Ik6bOYwx/BlUORhIJNYg1ILBErWP7Fm/5GzWGgxfcEsuDFPUz0StguFmDJo1hVmrEDKFEKX4iGjKKvTzEUY/tY/pjY00gkLy+z1r3n3M54tD+CIQ6O3Tc9+MSIqLi0UWlIH8WFYkMa83Jh9xymKUtkR+oluqXgEJRqVxqkbMCucQlNFPzJmHvi85h0BdLwP/XCFFcZt0gWr9yAEEGya93skDhb5YrI9aw8HBIXXuXOpAIcFzxR6PAAEIDjcL61nk9/zXDF3o2KnvqjwoxsG4YRU6DosBqc4oX2MDAuc7VTIxeoTRc1sEYzz8nsr8cAcRDHOkhBKJkBB+EPlJzmE0jpQplYPn0egtCAORyOfUPtLzPsl82hpMjLokoxMU9zFxDjD/mSDNmMKMnTDNR8SnrcIgG8FBah99L14UGyf3jZw1zxzncWey5nYfqWo5T5Lc+fM5FpSB/HhFJMlAICkfMWAxahsiP52RakBAgkPSGMgTk+McgjLCam4+8c5nCAIbS+5fMBeryoVA+TByAMGGuUBg7kChkEwWyMHBodV9hVcVW6I8V+zxCxCAlavNQvky8oe+rW5d6LzueUT6qzsLWA/VGdtbbEDg/Pp68/owy8PvhsyPdhLBMEdKKir3KbqDJRdG40gZUzlYiMczENYSiQFqH8VFr2SxqF8j1CUXQxTzMjH9GoGJ0CTn+mIyZQpT1MdH6IvJEB8RGaL2Ubh7N9c4ufu01b+rl8edyddirl/Vcp4kwxcuDLOgDOS9N3kfN+Qj0hYjvymXyy6pugUkKEkjvUzMKucQlJEn5spQ4CXnECicdt0kLPI1goCLGh0I9oTkfcFB9Bst3xc4ODik53lVsSXOc8UenwAByJWaheEg8ifejYwuGNf890h/dWcB66E6I7zBBgTOr5Wb14cZHn63Zd5jEMEwR8p0XO5T9COWXBiNI2VW5cAVi+1BuBWNPqf2kTsfkJzP6dcIHsm5FCUDTFK/RmASNMe5vpiMmcIYFfgIfTEJ8RGJELWP/lRquHFy//TKmh86wuPOZERcLnyq5TxJJkZHJ1hQBvIjZV63g/IRJy3Gr0siHzgkVZeABN9K42SVmBLnEJRxX83NBfcS5xCo4019/BIpwnnSBareRw4gAIBfYc9gsLX7AgcHBxQ99nDRo2ihZFmdaBauriAfCmx26UL3lu8h6a/uLGA9VGfUNtmAwPnWtrY+oOjJyvwYL7Ewkih6nmHJhdE4UmZUDlaSyfcQMvH4ArUNFJl2tSeKTAuoPVFkWkDtaVNkovZsH4Ny3BEm9893kal+OwihR7TbHVrOAtf6QmADuWQQtX5oxGJcqpj9Nyp1tzRG1onJcw5BGY/JpKByCNT5zvMb5mJ+mXSB1h8jBxAAQK1vC9f6LeDg4ICixx4uehQtlCyl181CKYccL94QMhveJ6S/urOA9VCdkV9iAwLnG2FtfUDRU5H58Yy2YBgoev7AkgujcaRMqhx8MIxVCHuxmIvaBopMu9oTPaUF1J42AmpPmyITtWf7GLpzJ9Q4uXeXkKl+OwLhK9Fuf6Ln9SnU+kJQBvLDT1Hrp8YtRnnH7L9RqX8jjfEyMVnOISijoibvbv0N5xDI+Oh/doYU96ukC1SuIAcQAECtbwNq/RZwcHDgoscWFD1MKyVLfrlZmFhFXnBVwrrQtRkYIv3VnQWsh+qM5QobEDjfrGnrA4qemzLv7dIXEBQ9r3iFtV9h5lQOSsFgDcL7ZHKF2gaKTLvaE0WmBdSeKDItoPa0KTJRe7aP0Nu3qcbJ/eB3ZKrfTkD4TrTba3ruGUOtLwQY+AAbtf70CYsxrD7hRqV+SxontvWPwCGwUVRz85HnHecQqPtL35+Yi4/XSRdou4gcQAAAtb4tXOu3goODAxc9LVQkLZQs2fVm4XUJ+W59pwPC/oeFC6S/urOA9VCdUd1hAwLnS3ltfcCvKMv8CC+xMCIoekJYcmFgpAhB5eDzSGQAwqphfKC2gSLTrvZEkWkBtSeKTAuoPW2KTNSe7SP14EG2cXL/9Tcy1W9HIXwm2u0FPffPotYXAgx8gI1av++0xfhXfcKNSv2yNE6H9Y/AIbBRJebMPf9HziFQZt77H+ZipUy6QOEqcgABANT6NqDWB/Q/YZc7Ll94G0kAAAAASUVORK5CYII=';
var _ERROR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAAAAABWESUoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAJ0Uk5TAEQHIkixAAABv0lEQVQYGWXBQWcjcRzH4d+L+xpDRVRYETGXqt5W9FI9xFIVvfae64i11IgosfoGeqtaZawcwlgrlxE1Qvx99j+zk5lUn8fU6N48pmtc+vpwrZapNkgKGtvFUDVTJYgdH+xnJ6qYStEbn6wGKpm8wYZSHl+fS9Hl9w2l7bk8k9TP8HZ3oQ4mG7w8kmRSuKIyU6uzxHsLJZOm1CY6kuDFkqlfAE9vwH6kI0vADWRaAH86/Q2QR2p1MiCRdQrgVrrYAauuWjdAcWoTIAskjfGeAzWCDBjbHJipNMWbqxUDc/sFjFRZ4t2rMQJSy4EvqoQvgLvSQQ/IbQ8u0H+9DHg/Uy1w4MyBC1Q7eweynmp72FsO9HRw5YCXUJUusLUUGKlxj/dTlRGQ2hyI1UrwpirNgIWNgXWgRvCMN5a3BiZ2WgDf1OqugN2FNAaKjikBso5aUQ5s+p01sJBp4IBHHfm6B9InoOjLpBjvQUcm1KaSSWGKtzxRa0ZlFUomKcrx1mMdhHc7vKwvyeRdbCn9jS+H0vl1nFPaDOWZStGaT35HKpkqJz8cH7g4VMVUGz4WNHbJUDVTo3uTvKaOLF3enqrxD+aQUnwgKhDtAAAAAElFTkSuQmCC'
var base64Test = new Image();
var BASE64Flag = true;
base64Test.onerror = function(){
	if(this.width != 1 || this.height != 1){
		BASE64Flag = false;
	}
}
base64Test.src = _ERROR;