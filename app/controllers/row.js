 var applib = require('applib');

 
 Ti.API.info("listitem row launched");
 
 // Attach the bound model ($model) to the row so 
// we can access it in a click event.
if ($model) {
 	$.row.model = $model.toJSON();
 	//Ti.API.info($model.toJSON());
}



$.finishbutton.addEventListener('click', finishbuttonclicklistener);
$.editbutton.addEventListener('click', editbuttonclicklistener);


 var dt = $.row.model.modifed;
$.date.text = dt.substring(0,16);
 
 if($.status.text == "Completed"){
 	$.finishbutton.visible = false;
 }
 

function finishbuttonclicklistener(event){
	 if($.status.text = "Pending"){
	 	$.status.text = "Completed";
	 	
	 	Ti.API.info("modelid = " + $.row.model.alloy_id);
	 	
	 	$model.save({status:"Completed"});
	 	
	 }else{
	 	//$.status.text = "Pending";
	 }
	 	
};

function editbuttonclicklistener(event){
	Ti.API.info("addeditviewA");
	applib.addEditView($model);
};