 Ti.API.info("listitem row launched");

$.finishbutton.addEventListener('click', finishbuttonclicklistener);


function finishbuttonclicklistener(event){
	 if($.status.text = "Pending"){
	 	$.status.text = "Completed";
	 }else{
	 	//$.status.text = "Pending";
	 }
	 	
};
// Attach the bound model ($model) to the row so 
// we can access it in a click event.
if ($model) {
 $.row.model = $model.toJSON();
}
