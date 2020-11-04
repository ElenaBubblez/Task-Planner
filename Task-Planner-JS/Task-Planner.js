
let deleteButton = document.getElementById('#deleteButton');


//validate form input.
function validateTaskForm(){
    const name = document.querySelector('#assignedBy').value;
    const description = document.querySelector('#description').value;
    const assignedTo = document.querySelector('#assignedTo').value;
    const date = document.querySelector('#dueDate').value;
    const status = document.querySelector('#inputStatus').value;
    
    let score = 0;
    
    let isValid = false;
    
    if(name.length >= 3){
        score ++;
    }
    else{
        document.getElementById("error1").innerHTML = "Text needs to be more than 5 characters";
    }
    if(assignedTo.length >= 3){
        score++;
    }
    else{
        document.getElementById("error2").innerHTML = "Text needs to be more than 10 characters";
    }
    if(description.length >= 5){
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

    return isValid;
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


// click event to get whatever object has been clicked on.
document.addEventListener('click', function(event){

    //stores element clicked on in a variable
    const element = event.target;

    //passes through the deleteTask function inside the TaskManager
    myTaskManager.deleteTask(element);
    console.log(element);
    return element;
    
})


    class TaskManager{

        constructor(array)
        {
            this.allTasks = array;
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
        const cardContent  =  `<div class="col-md-3" taskId=${taskObj.id}>
                                    <div class="card">
                                        <div class="card-header">
                                        Task
                                        </div>
                                        <div class="card-body" >
                                            <h6 class="card-title">Assigned To:</h5>
                                            <p class="card-text">${taskObj.assignedTo}</p>
                                            <h6 class="card-title">Assigned By:</h5>
                                            <p class="card-text">${taskObj.name}</p>
                                            <h6 class="card-title">Due Date:</h5>
                                            <p class="card-text">${taskObj.date}</p>
                                            <h6 class="card-title">Status:</h5>
                                            <p class="card-text">${taskObj.status}</p>
                                            <h6 class="card-title">Description:</h5>
                                            <p class="card-text">${taskObj.description}</p>
                                        </div>
                                            <button  type="button" class="btn btn-dark" delId=${taskObj.id}>Delete</button>
                                    </div> 
                                </div>`;

            let cardRow = document.getElementById('rowID');
            console.log(cardRow);
             // Append newyly created card element to the cardContent
            cardRow.insertAdjacentHTML('beforeEnd', cardContent); // inserts item at bottom of the page
            

            //interpolates the user input into the shown list
            const listContent = `<a href="#" class="list-group-item list-group-item-action taskId=${taskObj.id}">
                                    <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">Assigned To: ${taskObj.assignedTo}</h5>
                                    <small>Due Date: ${taskObj.date}</small>
                                    </div>
                                    <small>Status: ${taskObj.status}</small>
                                </a>`;

            let listCol = document.getElementById('listID');
            console.log(listCol);
            listCol.insertAdjacentHTML('afterBegin', listContent);
        }
    


    
    

        //deletes task from task list
        deleteTask(element){
        //this stores the element clicked top parent nodes id value
        let topParent = element.parentNode.parentNode.attributes.taskId.value;

            //this removes item off array permenantly
        for(let i = 0; i < this.allTasks.Length; i++){
            if(this.allTasks[i].id == topParent){
                //goes to the element clicked in the array and removes 1
                this.allTasks.splice(i, 1);
            }
        }
        //gets the parent node above the ones you want to get rid of. then removes the child node, and the two parent nodes above, but not including the very top parent node which is a row.
        element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);

        //gets all element of all the a tags
        let elementA = document.querySelectorAll('a');

        for( let i = 0; i < elementA.length; i++){
            //element now = whatever 'a' tag has been targeted
            element = elementA[i];
            //removes item from list
            if(element.attributes.taskId.value == topParent){
            element.parentNode.removeChild(element);
            }
        }

        }

        //update task status
        updateTask(){ 
    }
    
    


}


//array to store input
let taskArray = [];

let myTaskManager = new TaskManager(taskArray);

