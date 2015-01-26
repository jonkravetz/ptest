var args = arguments[0] || {};

Ti.API.info('imgzoom launched');
$.img.image = args;

$.closebutton.addEventListener('click',closebutton);

function closebutton(event){
	$.zoomwin.close();
}

$.zoomwin.open();
