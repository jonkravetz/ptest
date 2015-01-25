var task = Alloy.Collections.task; 

exports.launchtodo = function(){
	//launches todo window
	Alloy.createController("todo");
};

exports.fetchData = function(){
	task.fetch(); 

	//Sort function
 	task.comparator = function(t) {
  		return t.get('modifed');
 	};
};

exports.addEditView = function(model){
	Ti.API.info("addroweditA");
	var r = Alloy.createController("rowedit",model);
	Alloy.Globals.todowin.add(r.getView());
	//Ti.API.info("addroweditB");
};


exports.getFormattedDate = function(){
	var currentDateTime = new Date();
	 var d = currentDateTime.getDate();
	 if(d<10){
	 	d="0" + d;
	 };
	 var y = currentDateTime.getFullYear();
	 var m = currentDateTime.getMonth() + 1;
	 if(m<10){
	 	m="0" + m;
	 };
	 var hr = currentDateTime.getHours();
	 if(hr<10){
	 	hr="0" + hr;
	 };
	 var min = currentDateTime.getMinutes();
	 if(min<10){
	 	min="0" + min;
	 };
	 var sec = currentDateTime.getSeconds();
	 
	 var ms = currentDateTime.getMilliseconds();
	 
	 return (m + '/' + d + '/' + y + '-' + hr + ':' + min + ':' + sec + ':' + ms);
};

