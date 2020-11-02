//validate form input.
function validateTaskForm(){
    let name = document.querySelector('#assignedBy').value;
    let description = document.querySelector('#description').value;
    let assignedTo = document.querySelector('#assignedTo').value;
    let date = document.querySelector('#dueDate').value;
    let status = document.querySelector('#inputStatus').value;
    
    let isValid = false;
    
    if(name.length > 5 && name.length != -1){
        isValid = true;
    }
    else{
        isValid = false;
        document.getElementById("error1").innerHTML = "Text needs to be more than 5 characters";
    }
    if(assignedTo.length > 5 && assignedTo.length != -1){
        isValid = true;
    }
    else{
        isValid = false;
        document.getElementById("error2").innerHTML = "Text needs to be more than 10 characters";
    }
    if(description.length > 10 && description.length != -1){
        isValid = true;
    }
    else{
        isValid = false;
        document.getElementById("error3").innerHTML = "Text needs to be more than 5 characters";
    }
    if(date.length != -1){
        isValid = true;
    }
    else {
        isValid = false;
        document.getElementById("error4").innerHTML = "Text needs to be more than 8 characters";
    }

    if(status.length != -1){
        isValid = true;
    }
    else {
        isValid = false;
        document.getElementById("error5").innerHTML = "Text needs to be more than 8 characters";
    }

}


let taskObj = {
    id: undefined,
    name: "",
    description: "",
    assignedTo: "",
    date: undefined,
    status: "" 
}

class TaskManager{
    //returns the list of all task
    getAllTask(){
        
    }

    //returns a list of all task that status is equal to the status passes as an argument:
    getTasksWithStatus(){

    }

    //add task to existing task list
    addTask(){
        `<div class="row justify-content-center">
            <div class="col-md-2 d-flex justify-content-center">
                <div class="card" style="width: 18rem;">
                    <div class="card-header">
                    Task
                    </div>
                    let taskHTML = <div class="card-body">
                    <h6 class="card-title">Assigned To:</h5>
                    <p class="card-text" id="showAssignedTo">${assignedTo}</p>
                    <h6 class="card-title">Assigned By:</h5>
                    <p class="card-text" id="showAssignedBy">${name}</p>
                    <h6 class="card-title">Due Date:</h5>
                    <p class="card-text" id="showDueDate">${date}</p>
                    <h6 class="card-title">Status:</h5>
                    <p class="card-text" id="showStatus">${status}</p>
                    <h6 class="card-title">Description:</h5>
                    <p class="card-text" id="showDescription">${description}</p>
                </div>
            </div>
        </div>
    </div> `
    }

    //deletes task from task list
    deleteTask(){

    }

    //update task status
    updateTask(){

    }
    






}

