function cf_configMonthName() {

	Date.prototype.monthNames = [ 
		"January", "February", "March", 
		"April", "May", "June", 
		"July", "August", "September", 
		"October", "November", "December" 
	]; 
 
	Date.prototype.getMonthName = function() { 
		return this.monthNames[this.getMonth()]; 
	}; 
	Date.prototype.getShortMonthName = function () { 
		return this.getMonthName().substr(0, 3); 
	}; 
	
}

/*
	Function Name: cf_whichTransitionEvent
	Parameter: Null
	Return: Browser specified event name transition end
	Usage: var transitionEnd = cf_whichTransitionEvent();
	Date: 2012-03-15
	Remark: $().off(transitionEnd).on(transitionEnd,onStarted)				
*/

function cf_getDayInfo(currDate) { 
	var dayInfo = {y:currDate.getFullYear(), m: currDate.getMonth()+1, d: currDate.getDate(), wd: currDate.getDay()};
	return dayInfo;
}

function cf_getFirstDayInfo(currDate) { 
	var dayInfo = {y:currDate.getFullYear(), m: currDate.getMonth()};
	var firstDay = new Date(dayInfo.y, dayInfo.m, 1)
	return firstDay;
}

function cf_dateToString(currDate, dateFormat) {
	var dateString, mm, dd;
	var dayInfo =  cf_getDayInfo(currDate);
	if (dayInfo.m < 10) {
		mm = '0' + dayInfo.m.toString();
	} else {
		mm = dayInfo.m.toString();
	}
	if (dayInfo.d < 10) {
		dd = '0' + dayInfo.d.toString();
	} else {
		dd = dayInfo.d.toString();
	}
	dateString = dateFormat.replace('yyyy', dayInfo.y).replace('mm', mm).replace('dd', dd);
	return dateString;
}

function cf_StringToDate(currDate, dateFormat) {
	var ys, ye, ms, me, ds, de, yyyy, mm, dd, dateType;
	ys = dateFormat.indexOf('yyyy');
	ye = 4;
	ms = dateFormat.indexOf('mm');
	me = 2;
	ds = dateFormat.indexOf('dd');
	de = 2;
	
	yyyy = currDate.substr(ys, ye);
	mm = currDate.substr(ms, me)-1;
	dd = currDate.substr(ds, de);
		
	dateType = new Date();
	dateType.setYear(yyyy);
	dateType.setMonth(mm);
	dateType.setDate(dd);
	
	//alert(dateType.toDateString());
	return dateType;

}
	

function cf_reloadStylesheets(options) {
	var c;
	if (options == 'li') {
		c = {
			'position': 'relative',
			'float': 'left',
			'left': '1px',
			'width': '31px',
			'height': '31px',
			'margin-left': '3px',
			'margin-bottom': '2px',	


			
			'-moz-box-shadow':'inset 0px 1px 4px 0px #ffffff',
			'-webkit-box-shadow':'inset 0px 1px 4px 0px #ffffff',
			'box-shadow':'inset 0px 1px 4px 0px #ffffff',
			'background':'-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #ededed), color-stop(1, #dfdfdf) )',

			'background-color':'#ededed',
			'-moz-border-radius':'0 10px 0 10px',
			'-webkit-border-radius':'0 10px 0 10px',
			'border-radius':'0 10px 0 10px',
			'border':'1px solid #dcdcdc'
			


			};
	}
	if (options == 'a') {	
		c = {
			'display': 'block',
			'position': 'relative',
			'top': '0',
			'left': '0',
			'width': '100%',
			'height': '100%',
			'font-size': '1em'
		};
	}
	if (options == 'today') {		
			c = {
 			  '-moz-box-shadow':'inset 0px 1px 0px 0px #caefab',
			  '-webkit-box-shadow':'inset 0px 1px 0px 0px #caefab',
			  'box-shadow':'inset 0px 1px 0px 0px #caefab',
			  'background':'-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #77d42a), color-stop(1, #5cb811) )',
			  'filter':"progid:DXImageTransform.Microsoft.gradient(startColorstr='#77d42a', endColorstr='#5cb811')", 
			  'background-color':'#77d42a',
			  '-moz-border-radius':'0 10px 0 10px',
			  '-webkit-border-radius':'0 10px 0 10px',
			  'border-radius':'0 10px 0 10px',
			  'border':'1px solid #dcdcdc'
			}; 

	}	
	return c;
}	

(function($){

	$.fn.shuffle = function() {
		return this.each(function(){
			var items = $(this).children().clone(true);
			return (items.length) ? $(this).html($.shuffle(items)) : this;
		});
	}
	
	$.shuffle = function(arr) {
		for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
		return arr;
	}
	
})(jQuery);

