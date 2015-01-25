 var applib = require('applib');

Alloy.Globals.roweditcontroller = $.rowedit;

var task = Alloy.Collections.task; 

var args = arguments[0] || {};

//Set data model for rowedit view
if (args) {
	$.editModel.set(args);
	Ti.API.info($.editModel);
}

$.savebutton.addEventListener('click', savebuttonclicklistener);
$.cancelbutton.addEventListener('click', cancelbuttonclicklistener);

 var dt = $.editModel.attributes.modifed;
 $.date.text = dt.substring(0,16);
 
 

function savebuttonclicklistener(event){
	//$.destroy();
	$.editModel.save({content:$.content.value,modifed:applib.getFormattedDate()});
	Alloy.Globals.todowin.remove($.roweditview);
	$.roweditview = null;
	$.rowedit = null;
	
	applib.fetchData();
}

function cancelbuttonclicklistener(event){
	Alloy.Globals.todowin.remove($.roweditview);
	$.roweditview = null;
	$.rowedit = null;
}
