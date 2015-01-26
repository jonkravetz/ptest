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
$.img.addEventListener('click', imgclicklistener);


 var dt = $.row.model.modifed;
$.date.text = dt.substring(0,16);
 
 if($.status.text == "Completed"){
 	$.finishbutton.visible = false;
 }
 
 //If image doesn't exists create placeholder...if it does, show it!
 	var fname = $.row.model.alloy_id + ".png";
    var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,fname);
   
    if(file.exists()){
    	Ti.API.info('image exists');
		$.img.image = file.nativePath;
	}
	else{
		 Ti.API.info('noimage');
    	 var imagefile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "camera.png");
    	 file.write(imagefile);
    	 $.img.image = file.nativePath;
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

function imgclicklistener(event){
	
	Ti.API.info('imgclicklistener');
	Alloy.createController("imgzoom",  $.img.image);
	
}

function editbuttonclicklistener(event){
	Ti.API.info("addeditviewA");
	applib.addEditView($model);
};