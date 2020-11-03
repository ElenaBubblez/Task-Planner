
let button = document.getElementById('#buttonClick');


//validate form input.
function validateTaskForm(){
    let name = document.querySelector('#assignedBy').value;
    let description = document.querySelector('#description').value;
    let assignedTo = document.querySelector('#assignedTo').value;
    let date = document.querySelector('#dueDate').value;
    let status = document.querySelector('#inputStatus').value;
    
    let score = 0;
    
    let isValid = false;
    
    if(name.length > 5 && name.length != -1){
        //isValid = true;
        score ++;
    }
    else{
        document.getElementById("error1").innerHTML = "Text needs to be more than 5 characters";
    }
    if(assignedTo.length > 5 && assignedTo.length != -1){
        //isValid = true;
        score++;
    }
    else{
        document.getElementById("error2").innerHTML = "Text needs to be more than 10 characters";
    }
    if(description.length > 10 && description.length != -1){
        //isValid = true;
        score++;
    }
    else{
        document.getElementById("error3").innerHTML = "Text needs to be more than 5 characters";
    }
    if(date.length != -1){
        //isValid = true;
        score++;
    }
    else {
        document.getElementById("error4").innerHTML = "Text needs to be more than 8 characters";
    }

    if(status.length != -1){
        //isValid = true;
        score++;
    }
    else {
        document.getElementById("error5").innerHTML = "Text needs to be more than 8 characters";
    }

    if(score == 5){
        isValid = true;
    }
    console.log(isValid);
        return isValid;
}

validateTaskForm();


let taskArray = [];
let id;




    class TaskManager{

        createTaskObj(name, description, assignedTo, date, status){
            let taskObj ={
            "id": `${taskManager.taskArray.length < 1 ? 1: taskManager.taskArray.length+1}`,
            "name": name,
            "description": description,
            "assignedTo": assignedTo,
            "date": date,
            "status": status
            }
            taskArray.push(taskObj);
        }

    //returns the list of all task
    getAllTask(){

    }

    //returns a list of all task that status is equal to the status passes as an argument:
    getTasksWithStatus(){
        
    }

    //add task to existing task list
    addTask(item){

       

        //interpolates the user input into the shown card
        const cardContent  =  `<div class="card" id="${item.id} style="width: 18rem;">
                            <div class="card-header">
                            Task
                            </div>
                            <div class="card-body" >
                                <h6 class="card-title">Assigned To:</h5>
                                <p class="card-text" id="showAssignedTo">${item.assignedTo}</p>
                                <h6 class="card-title">Assigned By:</h5>
                                <p class="card-text" id="showAssignedBy">${item.name}</p>
                                <h6 class="card-title">Due Date:</h5>
                                <p class="card-text" id="showDueDate">${item.date}</p>
                                <h6 class="card-title">Status:</h5>
                                <p class="card-text" id="showStatus">${item.status}</p>
                                <h6 class="card-title">Description:</h5>
                                <p class="card-text" id="showDescription">${item.description}</p>
                            </div>
                        </div> `;

            //const position = "beforeend";
            let listItem = document.getElementById('list-items').value;
             // Append newyly created card element to the container
            listItem.insertAdjacentHtML('beforeend', cardContent); // inserts item at bottom of the page

        //});

        
    }


    
    

    //deletes task from task list
    deleteTask(){

    }

    //update task status
    updateTask(){

    }
    
    


}
button.addEventListener("click", function(){

    if(validateTaskForm().isValid) { 

    createTaskObj(name, description, assignedTo, date, status);
    addTask(item);
    
    }

})
