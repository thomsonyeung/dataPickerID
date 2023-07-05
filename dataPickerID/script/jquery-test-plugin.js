(function($){
    $.fn.extend({ 
        /*plugin name - mainContentInit*/
        datePicker: function(options) {
			var defaults = {
				dateFormat: 'yyyy-mm-dd'				
            };             
            var options = $.extend(defaults, options);
            return this.each(function() {
			
				var currfirstDate, toDay, isIE7, toDayInfo, selectedDate, selectedDateInfo;				
				var obj = $(this);	
				var inputObj = $('input', obj);
				var formObj = $('div:first', obj);
				var controlObj = $('div:first',formObj);
				//var calenderObj = $('ul:eq(1)',formObj);
				//var calenderObj = $('ul#datePanel',formObj);
				var calenderObj = $('ul#datePanel',obj);
				var firstInputClick = true;		
				
				$(calenderObj).append($('<li>')); /* append a dummy li to test IE7*/
				
				var tmp = $('li:last', calenderObj).position();
				//alert(tmp.top);
				
				$(calenderObj)
				.on('mouseenter','li a', selectedFunc);

				
				//$('li a', calenderObj).offtmp('click');
				/* IE 7  -- Start*/
				isIE7 = $('li', calenderObj).css('visibility');
				$('li', calenderObj).remove();
												
				if (isIE7.toLowerCase() == 'hidden') {  /* New Browser  */
					
					$(formObj).css('opacity','0');	  /* IE7 */
					//$(calenderObj).offtmp('mouseenter');
					$(formObj).slideUp('fast');	  /* IE7 */
					//$(formObj).css('opacity','1');	  /* IE7 */
				//	$(formObj).hide();
					//$(formObj).css('visibility', 'hidden');
				} else {
					$(formObj).slideUp('fast');	  /* IE7 */
				}

				cf_configMonthName();

				
				toDay = new Date();
				toDayInfo = cf_getDayInfo(toDay);
				selectedDate = toDay;
				selectedDateInfo = cf_getDayInfo(selectedDate);
				
				$(inputObj).attr('value', cf_dateToString(toDay, options.dateFormat));
				//$(inputObj).attr('value',toDay.toDateString());
				currfirstDate = cf_getFirstDayInfo(toDay);
				
				$.each($('div',controlObj), function(i) {
					$(this).data('funcKeyPos', i);
					}
				);
				
				//$('div:eq(1)',controlObj).html(currfirstDate.getMonthName() +' ' + currfirstDate.getFullYear());
				
				$('div', controlObj)
				.on('click', cf);
				
				currfirstDate.setMonth(currfirstDate.getMonth() - 1);
				$('div:last', controlObj).trigger('click');
				
				$(calenderObj)
				.on('click','li a', function() {
										$(calenderObj).offtmp('mouseenter');
										/* refresh */
										currfirstDate.setMonth(currfirstDate.getMonth() - 1);
										$('div:last', controlObj).trigger('click');
										
										
										//$(this).css('color','yellow');
										if (isIE7.toLowerCase() == 'hidden') {
											$(formObj).slideAnimate({type: 'noShow', opacity: "0.2", easing: 'swing', speed: 300});
										} else {
											$(formObj).slideUp();					
										}
										
									});
				
				$(inputObj)
				.on('click', function() {
									var clickDateString = $(this).attr('value');
									/* 2012-04-08*/
									selectedDate = cf_StringToDate(clickDateString, options.dateFormat);
									selectedDateInfo = cf_getDayInfo(selectedDate);
									
									$(calenderObj).ontmp('mouseenter');
									
									if (isIE7.toLowerCase() == 'hidden') {
											var displayType = $(formObj).css('display');
											if (firstInputClick) {
												firstInputClick = false;
												$(formObj).slideAnimate({type: 'show', opacity: "0.2", easing: 'swing', speed: 300});
											} else {
												if (displayType=='none') {
													$(formObj).slideAnimate({type: 'show', opacity: "0.2", easing: 'swing', speed: 300});
												} else {
													$(formObj).slideAnimate({type: 'noShow', opacity: "0.2", easing: 'swing', speed: 300});
												}	
											}	
									} else {
											$(formObj).slideToggle();
									}
									
									
									
																	
							});

					
/*				$(calenderObj)
				.on('mouseenter','li a', selectedFunc);
*/				
				
				function selectedFunc(event) {
					if (!event.isDefaultPrevented()) {
						event.preventDefault();
					}
					var selectedDay = $(this).html();
					//var selectedDate = currfirstDate;
					selectedDate = currfirstDate;
					selectedDate.setDate(selectedDay);
					selectedDateInfo = cf_getDayInfo(selectedDate);
					
					$(inputObj).attr('value',cf_dateToString(selectedDate, options.dateFormat));
					//$(inputObj).attr('value',selectedDate.toDateString());
				
				}	
				
				function cf() {
					var i = $(this).data('funcKeyPos');
				
					var lastNext = 0;
					if (i==1) {return false;}
					if (i==0) {lastNext = -1;}
					if (i==2) {lastNext = 1;}

					currfirstDate.setMonth(currfirstDate.getMonth() + lastNext);
					$(calenderObj).moveToMonth($.extend(cf_getDayInfo(currfirstDate), {'lastNext': lastNext, 'isIE7': isIE7, 'toDayInfo': toDayInfo,'selectedDateInfo':selectedDateInfo}));
					//$(calenderObj).moveToMonth($.extend(cf_getDayInfo(currfirstDate), {'lastNext': lastNext, 'isIE7': isIE7, 'toDayInfo': toDayInfo, 'selectedDate': cf_getDayInfo(selectedDate)}));
					//$(calenderObj).moveToMonth($.extend(cf_getDayInfo(currfirstDate), {'lastNext': lastNext, 'isIE7': isIE7, 'toDayInfo': toDayInfo}));
					/*
					calenderObj = $(calenderObj).blockRefresh();
					$('li:empty',calenderObj).css('visibility','hidden');
					$(calenderObj).css('height', '220px');
					*/
					$('div:eq(1)',controlObj).html(currfirstDate.getMonthName() + '&nbsp;'+ + currfirstDate.getFullYear());					
					
				}
			});
		}
	});		
})(jQuery);

(function($){
    $.fn.extend({ 
        /*plugin name - moveToMonth*/
        moveToMonth: function(options) {
			var defaults = {
            };             
            var options = $.extend(defaults, options);
            return this.each(function() {
				var obj = $(this);
			    var dirStartElem;
				if (options.lastNext == -1) {
					dirStartElem = 0;
				} else {
					dirStartElem = 6;
				}		
				
				var dayPageInfo = {dayMonth: new Date(options.y, options.m, 0).getDate(), dayFirst: new Date(options.y, options.m-1, 1).getDay()};
				$(obj).empty();				

				for (i=1; i<= dayPageInfo.dayFirst; i++) {
					$(obj).append($('<li>'));									
				}
				
				for (i=1; i<= dayPageInfo.dayMonth; i++) {
					if ((options.toDayInfo.y == options.y) && (options.toDayInfo.m == options.m) && (options.toDayInfo.d == i)) {
						$(obj).append($('<li>').append( $('<a>').attr('href','#').html(i).css(cf_reloadStylesheets('today')) ));
					} 
					
					else if ((options.selectedDateInfo.y == options.y) && (options.selectedDateInfo.m == options.m) && (options.selectedDateInfo.d == i)) {
						$(obj).append($('<li>').append( $('<a>').attr('href','#').html(i).css('color', 'yellow')));					
					}
					else {
						$(obj).append($('<li>').append( $('<a>').attr('href','#').html(i) ));
					}
					
				}
				//alert($(obj).height());
				
				
				var lastDay = $('li:last',obj).position();
				var dayHeight = Math.round($('li:last',obj).css('height').replace("px",""));

				var calendarH = (lastDay.top+dayHeight+4 ) + 'px';

				/* IE 7  -- Start*/
				//var isIE7 = $('li:last', obj).css('visibility');
				//$('li:last', obj).remove();
				
				//if (isIE7.toLowerCase() != 'hidden') {
				if (options.isIE7 != 'hidden') {
					//$('li', obj).css(cf_reloadStylesheets('li'));
					//$('li a', obj).css(cf_reloadStylesheets('a'));
					$('li:nth-child(7n+1) a', obj).css('color','red');
					$('li:empty', obj).css('visibility','hidden');						
				}	
				
				obj = $(obj).blockRefresh({movElem: 'li', moveStyle: '03', startElem: dirStartElem});
				$('li:empty',obj).css('visibility','hidden');
				//$(obj).css('height', '215px');
				//$(obj).css('height', calendarH);
				$(obj).animate({height:calendarH}, 200, 'swing');
				
				//var abc = $(obj).blockRefresh();
				
				/* IE 7  -- End*/
				
							
			});
		}
	});		
})(jQuery);


(function($){
    $.fn.extend({ 
        /*plugin name - moveToMonth*/
        slideAnimate: function(options) {
			var defaults = {
            };             
            var options = $.extend(defaults, options);
            return this.each(function() {
				var obj = $(this);
				if (options.type == 'noShow') {
					$(obj).animate({"opacity": options.opacity}, options.speed, options.easing, cfx);
				}				
				
				if (options.type == 'show') {
					$(obj).css({opacity: options.opacity}).slideDown("fast", cfxy);				
				}

				/* For firefox it need external function */
				function cfx() {
						$(obj).slideUp("slow", cfx1);			
				}
				
				function cfx1() {
							$(obj).css("opacity","1");										
				}
				
				function cfxy() {
							$(obj).animate({"opacity": 1}, options.speed, options.easing);							
				}
				
				
			});
		}
	});		
})(jQuery);

/*
(function($){
    $.fn.extend({ 
		blockRefresh: function(options) {
		//var defaults = {};             
		
		var defaults = {				
				movElem: 'li',
				moveStyle: '05',
				floatDir: 'left',
				movRandom: 'yes',
				startElem: 0
            }; 
		
        var options = $.extend(defaults, options);
	
		return this.each(function(){
				var obj = $(this);
				
				var movObj = $(obj).children(options.movElem);
		
				var movObjSeqArr = new Array();
				var oLeft, oTop;
				$(movObj).css('visibility', 'hidden');
				$(movObj).css('position','absolute').css('top','0px').css('left','0px');
				$(movObj).css('position','relative').css('float',options.floatDir);
				
												
				$.each(movObj, function(i) {
					movObjSeqArr.push(i);
					var position = $(this).position();
				
					$(this).data('fLeft', Math.round(position.left) + 'px').data('fTop', Math.round(position.top) + 'px');
				
					if (i==options.startElem) {						
						oLeft=Math.round(position.left) + 'px';
						oTop=Math.round(position.top) + 'px';						;					
						}
				});
				$(movObj).css('position','absolute').css('left',oLeft).css('top',oTop).css('visibility', 'visible');
				if (options.movRandom=='yes') {
					movObjSeqArr = $.shuffle(movObjSeqArr);
				}	
				
				$.each(movObjSeqArr, function(i, value) {
				//alert(i + ' ' + value);
					var bObj = $(movObj).eq(value);
					
					//alert($(bObj).html());
					var bLeft = $(bObj).data('fLeft') ;
					var bTop = $(bObj).data('fTop') ;									
					//alert(options.moveStyle);
					if (options.moveStyle == '01') {
						$(bObj).animate({left: bLeft, top: bTop}, 500, "swing");
					} 
					else if (options.moveStyle == '02') {
						$(bObj).animate({left: bLeft}, 200, "swing").animate({top: bTop}, 500, "swing");
					}
					else if (options.moveStyle == '03') {
						$(bObj).animate({top: bTop}, 500, "swing").animate({left: bLeft}, 200, "swing");
					}
					else if (options.moveStyle == '04') {
						var x=i%2;
						if (x==0) {$(bObj).animate({left: bLeft}, 200, "swing").animate({top: bTop}, 500, "swing");} else {$(bObj).animate({top: bTop}, 500, "swing").animate({left: bLeft}, 200, "swing");};
					}
					else if (options.moveStyle == '05') {		
						$(bObj).animate({top: bTop}, 50*i, "swing").animate({left: bLeft}, 20*i, "swing").animate({left: bLeft, top: bTop}, 100*(i+2), "swing");
					}	
					else if (options.moveStyle == '06') {		
						$(bObj).animate({left: bLeft, top: bTop}, 100*(i+2), "swing").nextAll().css('left', bLeft).css('top', bTop);
					} 
					else if (options.moveStyle == '07') {
						var x=i%2;
						if (x==0) {$(bObj).animate({left: bLeft, top: bTop}, 800, "swing");} else {$(bObj).animate({left: bLeft, top: bTop}, 500, "swing");};
					}
					else if (options.moveStyle == '08') {
						var x=i%3;
						if (x==0) {$(bObj).animate({left: bLeft, top: bTop}, 500, "swing");} else if (x==1) {$(bObj).animate({left: bLeft, top: bTop}, 800, "swing");} else {$(bObj).animate({left: bLeft, top: bTop}, 1200, "swing");};
					}
					else if (options.moveStyle == '09') {
						var x=i%3;
						if (x==0) {$(bObj).animate({left: bLeft, top: bTop}, 1200, "swing");} else if (x==1) {$(bObj).animate({left: bLeft, top: bTop}, 800, "swing");} else {$(bObj).animate({left: bLeft, top: bTop}, 500, "swing");};
					}
					else {
						$(bObj).css('left', bLeft).css('top', bTop);
					};
				
				});
				return obj;
		});
	}
	});	
})(jQuery);
*/

(function($){
    $.fn.extend({ 
		blockRefresh: function(options) {
		var defaults = {				
				movElem: 'div',
				moveStyle: '05',
				floatDir: 'left',
				movRandom: 'yes',
				startElem: 0
            };             
        var options = $.extend(defaults, options);
	
		return this.each(function(){
				var obj = $(this);
				var movObj = $(obj).children(options.movElem);
		
				var movObjSeqArr = new Array();
				var oLeft, oTop;
				$(movObj).css('visibility', 'hidden');
				$(movObj).css('position','absolute').css('top','0px').css('left','0px');
				$(movObj).css('position','relative').css('float',options.floatDir);
				
				//alert($(movObj).length);
								
				$.each(movObj, function(i) {
					movObjSeqArr.push(i);
					var position = $(this).position();
					//var position = $(this).offset();
					$(this).data('fLeft', Math.round(position.left) + 'px').data('fTop', Math.round(position.top) + 'px');
					if (i==options.startElem) {						
						oLeft=Math.round(position.left) + 'px';
						oTop=Math.round(position.top) + 'px';						;					
						}
				});
				$(movObj).css('position','absolute').css('left',oLeft).css('top',oTop).css('visibility', 'visible');
				if (options.movRandom=='yes') {
					movObjSeqArr = $.shuffle(movObjSeqArr);
				}	
				
				$.each(movObjSeqArr, function(i, value) {
					var bObj = $(movObj).eq(value);
					var bLeft = $(bObj).data('fLeft') ;
					var bTop = $(bObj).data('fTop') ;									
					
					if (options.moveStyle == '01') {
						$(bObj).animate({left: bLeft, top: bTop}, 500, "swing");
					} 
					else if (options.moveStyle == '02') {
						$(bObj).animate({left: bLeft}, 200, "swing").animate({top: bTop}, 500, "swing");
					}
					else if (options.moveStyle == '03') {
						$(bObj).animate({top: bTop}, 500, "swing").animate({left: bLeft}, 200, "swing");
					}
					else if (options.moveStyle == '04') {
						var x=i%2;
						if (x==0) {$(bObj).animate({left: bLeft}, 200, "swing").animate({top: bTop}, 500, "swing");} else {$(bObj).animate({top: bTop}, 500, "swing").animate({left: bLeft}, 200, "swing");};
					}
					else if (options.moveStyle == '05') {		
						$(bObj).animate({top: bTop}, 50*i, "swing").animate({left: bLeft}, 20*i, "swing").animate({left: bLeft, top: bTop}, 100*(i+2), "swing");
					}	
					else if (options.moveStyle == '06') {		
						$(bObj).animate({left: bLeft, top: bTop}, 100*(i+2), "swing").nextAll().css('left', bLeft).css('top', bTop);
					} 
					else if (options.moveStyle == '07') {
						var x=i%2;
						if (x==0) {$(bObj).animate({left: bLeft, top: bTop}, 800, "swing");} else {$(bObj).animate({left: bLeft, top: bTop}, 500, "swing");};
					}
					else if (options.moveStyle == '08') {
						var x=i%3;
						if (x==0) {$(bObj).animate({left: bLeft, top: bTop}, 500, "swing");} else if (x==1) {$(bObj).animate({left: bLeft, top: bTop}, 800, "swing");} else {$(bObj).animate({left: bLeft, top: bTop}, 1200, "swing");};
					}
					else if (options.moveStyle == '09') {
						var x=i%3;
						if (x==0) {$(bObj).animate({left: bLeft, top: bTop}, 1200, "swing");} else if (x==1) {$(bObj).animate({left: bLeft, top: bTop}, 800, "swing");} else {$(bObj).animate({left: bLeft, top: bTop}, 500, "swing");};
					}
					else {
						$(bObj).css('left', bLeft).css('top', bTop);
					};
				
				});
				return obj;
		});
	}
	});	
})(jQuery);

