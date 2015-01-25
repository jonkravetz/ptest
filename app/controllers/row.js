 Ti.API.info("listitem row launched");
 
 // Attach the bound model ($model) to the row so 
// we can access it in a click event.
if ($model) {
 	$.row.model = $model.toJSON();
 	Ti.API.info($model.toJSON());
}



$.finishbutton.addEventListener('click', finishbuttonclicklistener);

 var dt = $.row.model.modifed;
 $.date.text = dt.substring(0,dt.length-7);
 

function finishbuttonclicklistener(event){
	 if($.status.text = "Pending"){
	 	$.status.text = "Completed";
	 	
	 	Ti.API.info("modelid = " + $.row.model.alloy_id);
	 	
	 	$model.save({status:"Completed"});
	 	
	 }else{
	 	//$.status.text = "Pending";
	 }
	 	
};

