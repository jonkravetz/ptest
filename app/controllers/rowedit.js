 var applib = require('applib');

Alloy.Globals.roweditcontroller = $.rowedit;

var task = Alloy.Collections.task; 

var args = arguments[0] || {};

//Set data model for rowedit view
if (args) {
	$.editModel.set(args);
	Ti.API.info($.editModel);
}

$.imgbutton.addEventListener('click', imgbuttonclicklistener);
$.savebutton.addEventListener('click', savebuttonclicklistener);
$.cancelbutton.addEventListener('click', cancelbuttonclicklistener);

 var dt = $.editModel.attributes.modifed;
 $.date.text = dt.substring(0,16);
 
 
 //some redundant code here...
var fname = $.editModel.attributes.alloy_id + ".png";
var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,fname);
$.imgbutton.image = f.nativePath;


function savebuttonclicklistener(event){
	//$.destroy();
	if(OS_ANDROID){
		Ti.UI.Android.hideSoftKeyboard();
	}else{
		$.content.blur();
	}
	$.editModel.save({content:$.content.value,modifed:applib.getFormattedDate()});
	Alloy.Globals.todowin.remove($.roweditview);
	$.roweditview = null;
	$.rowedit = null;
	
	applib.fetchData();
}

function cancelbuttonclicklistener(event){
	//hide keyboard
	if(OS_ANDROID){
		Ti.UI.Android.hideSoftKeyboard();
	}else{
		$.content.blur();
	}
	
	Alloy.Globals.todowin.remove($.roweditview);
	$.roweditview = null;
	$.rowedit = null;
}

function imgbuttonclicklistener(event){
	 var dialog = Ti.UI.createAlertDialog({
    cancel: 2,
    buttonNames: ['Gallery', 'Photo', 'Cancel'],
    message: 'Would you like to add an image?',
    title: 'Add Image'
  });
  dialog.addEventListener('click', function(e){
    if (e.index === e.source.cancel){
      Ti.API.info('The cancel button was clicked');
    }
    if (e.index === 1){
    	//take photo
    	Titanium.Media.showCamera({
		    success:function(event)
		    {
		        var image = event.media;
		        var fname = $.editModel.attributes.alloy_id + ".png";
		        var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,fname);
		        f.write(image);
		        $.imgbutton.image = f.nativePath;
		 
		       
		 
		    },
		    cancel:function()
		    {
		 
		    },
		    error:function(error)
		    {
		        // create alert
		        var a = Titanium.UI.createAlertDialog({title:'Camera'});
		        // set message
		        if (error.code == Titanium.Media.NO_CAMERA)
		        {
		            a.setMessage('Device does not have camera');
		        }
		        else
		        {
		            a.setMessage('Unexpected error: ' + error.code);
		        }
		        // show alert
		        a.show();
		    },
		});
    };
    if (e.index === 0){
    	//launch gallery
    	Ti.Media.openPhotoGallery({
           success:function(event)
           {             
               Ti.API.debug('Our type was: '+event.mediaType);
               if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
               {
                   var image = event.media;
                   var fname = $.editModel.attributes.alloy_id + ".png";
		           var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,fname);
		           f.write(image);
		           $.imgbutton.image = f.nativePath;
               }
           },
           cancel:function()
           {   
           },
           error:function(err)
           {
               Ti.API.error(err);
           },
           mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
       });
    };
    Ti.API.info('e.cancel: ' + e.cancel);
    Ti.API.info('e.source.cancel: ' + e.source.cancel);
    Ti.API.info('e.index: ' + e.index);
  });
  
  dialog.show();
};
