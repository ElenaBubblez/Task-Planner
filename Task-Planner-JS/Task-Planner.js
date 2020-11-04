
let deleteButton = document.getElementById('#deleteButton');


//validate form input.
function validateTaskForm(){
    let name = document.querySelector('#assignedBy').value;
    let description = document.querySelector('#description').value;
    let assignedTo = document.querySelector('#assignedTo').value;
    let date = document.querySelector('#dueDate').value;
    let status = document.querySelector('#inputStatus').value;
    
    let score = 0;
    
    let isValid = false;
    
    if(name.length > 3 && name.length != -1){
        score ++;
    }
    else{
        document.getElementById("error1").innerHTML = "Text needs to be more than 5 characters";
    }
    if(assignedTo.length > 3 && assignedTo.length != -1){
        score++;
    }
    else{
        document.getElementById("error2").innerHTML = "Text needs to be more than 10 characters";
    }
    if(description.length > 5 && description.length != -1){
        score++;
    }
    else{
        document.getElementById("error3").innerHTML = "Text needs to be more than 5 characters";
    }
    if(date){
        score++;
    }
    else {
        document.getElementById("error4").innerHTML = "Please input a date";
    }

    if(status != "Choose"){
        score++;
    }
    else {
        document.getElementById("error5").innerHTML = "Please choose status of task";
    }

    if(score == 5){
        isValid = true;
    }
    console.log(isValid);

    if(isValid == true)
    {
        createTaskObj(name, description, assignedTo, date, status, taskArray);
        let taskIndex = myTaskManager.allTasks.length-1;
        myTaskManager.addTask(myTaskManager.allTasks[taskIndex]);

    }
}



//function to create task object of user input
function createTaskObj(name, description, assignedTo, date, status, taskArray){

    myTaskManager.allTasks.push({
    //checks if id has been created, if not then create id 1, if id is already created then next id is current length +1
    "id": `${taskArray.length < 1 ? 1: taskArray.length+1}`,
    "name": name,
    "description": description,
    "assignedTo": assignedTo,
    "date": date,
    "status": status
    })
    console.log(taskArray);
    return myTaskManager.allTasks;
}




    class TaskManager{

        constructor(array, names)
        {
            this.allTasks = array;
            this.names = names;
   

        }
    //returns the list of all task
    getAllTask(){
        console.log(this.allTasks);
    }

    //returns a list of all task that status is equal to the status passes as an argument:
    getTasksWithStatus(){
        
    }

    //add task to existing task list
    addTask(taskObj){

       
        //interpolates the user input into the shown card
        const cardContent  =  `<div class="col-md-2 d-flex justify-content-center" id=${taskObj.id}>
                                    <div class="card" style="width: 18rem;">
                                        <div class="card-header">
                                        Task
                                        </div>
                                        <div class="card-body" >
                                            <h6 class="card-title">Assigned To:</h5>
                                            <p class="card-text" id="showAssignedTo">${taskObj.assignedTo}</p>
                                            <h6 class="card-title">Assigned By:</h5>
                                            <p class="card-text" id="showAssignedBy">${taskObj.name}</p>
                                            <h6 class="card-title">Due Date:</h5>
                                            <p class="card-text" id="showDueDate">${taskObj.date}</p>
                                            <h6 class="card-title">Status:</h5>
                                            <p class="card-text" id="showStatus">${taskObj.status}</p>
                                            <h6 class="card-title">Description:</h5>
                                            <p class="card-text" id="showDescription">${taskObj.description}</p>
                                        </div>
                                        <div>
                                            <button  type="button" onclick="deleteTask()" id="deleteButton" class="btn btn-primary">Delete</button>
                                        </div>
                                    </div> 
                                </div>`;

            let cardRow = document.getElementById('rowID');
            console.log(cardRow);
             // Append newyly created card element to the cardContent
            cardRow.insertAdjacentHTML('beforeEnd', cardContent); // inserts item at bottom of the page
            

            //interpolates the user input into the shown list
            const listContent = `<div class="list-group" role="tablist">
                                    <a class="list-group-item list-group-item-action" id=${taskObj.id} data-toggle="list" href="#list-home" role="tab">
                                    <h6>Assigned To: ${taskObj.assignedTo}</h6>
                                    <p>Due Date: ${taskObj.date}</p>
                                    <p>Status: ${taskObj.status}</p>
                                    </a>
                                </div>`;

            let listCol = document.getElementById('listID');
            console.log(listCol);
            listCol.insertAdjacentHTML('afterBegin', listContent);
    }


    
    

    //deletes task from task list
    deleteTask(element){
        // let thisTaskID = element.parentNode.parentNode.attributes.id.value;

        // for(i = 0; i < this.allTasks.Length; i++){
        //     if(this.allTasks[i].ID = thisTaskID){
        //         this.allTasks.splice(i, 1);
        //     }
        // }

        // element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);


    }

    //update task status
    updateTask(){

    }
    
    


}


//array to store input
let taskArray = [];

let myTaskManager = new TaskManager(taskArray, "todoTask");

