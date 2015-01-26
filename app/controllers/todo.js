 var applib = require('applib');

//Variables
var tdata = [];
var task = Alloy.Collections.task; 

Alloy.Globals.todowin = $.todowin;
//Intialization
$.listswap.addEventListener('click',listswapclicklistener);
$.addtask.addEventListener('click', addtaskclicklistener);

//utility function for development
//deleteAll();

//inital fetch
applib.fetchData();

if(OS_IOS){
	$.todowin.top = "20";
}
//Event Listeners

function listswapclicklistener(event){
	Ti.API.info("buttontitle = " + $.listswap.title);
	if($.listswap.title == "Pending"){
		Ti.API.info("Pending to Completed");
		$.listswap.title = "Completed";
	}
	else{
		Ti.API.info("Completed to Pending");
		$.listswap.title="Pending";
	}
	
	applib.fetchData();
}

function addtaskclicklistener(event){
	//var data = [];
	//ddTodoRow(data);
	Ti.API.info('addTaskClickListener');
	addTask();
}


//Functions


//DATA MODEL


function addTask() {  
 // create the task model
 //typo modifed 
 
 //Creating datetime string because alloy doesn't seem to be saving in correctly in sqlite db.
 
 
 
 var model = Alloy.createModel('task', {  
  	status: 'Pending',  
  	modifed: applib.getFormattedDate(),
  	content: 'New Task' ,
  	image: ''   
 });  

  
 // add model to the collection and save it to sqlite  
 Ti.API.warn('addTask');
 task.add(model);  
 model.save(); 
   

 applib.fetchData();
  
}  

function deleteAll(){
	    var collection = this;
 
        var sql = "DELETE FROM " + task.config.adapter.collection_name;
        db = Ti.Database.open(task.config.adapter.db_name);
        db.execute(sql);
        db.close();
 
        task.trigger('sync');
 
     
}
// Show only book models by Mark Twain
function filterFunction(collection) {
	if($.listswap.title == "Pending"){
		return collection.where({status:"Pending"});
	}
	else{
		return collection.where({status:"Completed"});
	}
	
	applib.fetchData();
 	
}


  
// Free model-view data binding resources when this view-controller closes
$.todowin.addEventListener('close', function() {
    $.destroy();
});

//Open Window
$.todowin.open();
