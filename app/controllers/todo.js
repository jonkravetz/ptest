//Variables
var tdata = [];
var counter = 1;  
var task = Alloy.Collections.task; 


//Intialization
$.listswap.addEventListener('click',listswapclicklistener);
$.addtask.addEventListener('click', addtaskclicklistener);
deleteAll();


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
	
	task.fetch(); 
}

function addtaskclicklistener(event){
	//var data = [];
	//ddTodoRow(data);
	addTask();
}


//Functions


//DATA MODEL


function addTask() {  
 // create the test fighter model  
 var model = Alloy.createModel('task', {  
  status: 'Pending',  
  modified: '00/00/00',
  content: 'New Task' + counter ,
  image: ''   
 });  
 counter++;  
  
 // add model to the collection and save it to sqlite  
 task.add(model);  
 model.save();  
  
 // let's refresh so we can see the ids coming from the   
 // autoincrement field in the sqlite database in the   
 // row click alerts  
 task.fetch();  
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
 	
}
  
// Free model-view data binding resources when this view-controller closes
$.todowin.addEventListener('close', function() {
    $.destroy();
});

//Open Window
$.todowin.open();
