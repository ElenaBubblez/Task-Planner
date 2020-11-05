


//validate form input.
function validateTaskForm(){
    const name = document.querySelector('#assignedBy').value;
    const description = document.querySelector('#description').value;
    const assignedTo = document.querySelector('#assignedTo').value;
    const date = document.querySelector('#dueDate').value;
    const status = document.querySelector('#inputStatus').value;
    let  error1 = document.getElementById("error1");
    let  error2 = document.getElementById("error2");
    let  error3 = document.getElementById("error3");
    let  error4 = document.getElementById("error4");
    let  error5 = document.getElementById("error5");


    let score = 0;
    
    let isValid = false;
    
    if(name.length >= 3){
        score ++;
        error1.innerHTML = "";
    }
    else{
        error1.innerHTML = "Text needs to be 3 or more characters";
    }
    if(description.length >= 5){
        score++;
        error2.innerHTML = "";
    }
    else{
        error2.innerHTML = "Text needs to be 5 or more characters";
    }
    if(assignedTo.length >= 3){
        score++;
        error3.innerHTML = "";
    }
    else{
        error3.innerHTML = "Text needs to be 3 or more characters";
    }
    if(date){
        score++;
        error4.innerHTML = "";
    }
    else {
        error4.innerHTML = "Please input a date";
    }

    if(status != "Choose"){
        score++;
        error5.innerHTML = "";
    }
    else {
        error5.innerHTML = "Please choose status of task";
    }

    if(score == 5){
        isValid = true;
    }
    console.log(isValid);

    if(isValid == true)
    {
        createTaskObj(name, description, assignedTo, date, status);
        let taskArrayIndex = myTaskManager.allTasks.length-1;
        myTaskManager.addTask(myTaskManager.allTasks[taskArrayIndex]);
        
        console.log();
    }

    return isValid;
}


//function to create task object of user input
function createTaskObj(name, description, assignedTo, date, status){

    myTaskManager.allTasks.push({
    //checks if id has been created, if not then create id 1, if id is already created then next id is current length +1
    "id": `${myTaskManager.allTasks.length < 1 ? 1: myTaskManager.allTasks.length+1}`,
    "name": name,
    "description": description,
    "assignedTo": assignedTo,
    "date": date,
    "status": status
    })
    console.log(myTaskManager.allTasks);

     // sets item in the local storage
    localStorage.setItem("TaskCard", JSON.stringify(myTaskManager.allTasks));
    
}


// click event to get whatever object has been clicked on.
document.addEventListener('click', function(event){

    //stores element clicked on in a variable
    const element = event.target;

    //passes through the deleteTask function inside the TaskManager
    myTaskManager.deleteTask(element);
  
    console.log(element);


    // return element;
    
});



class TaskManager{

        constructor()
        {
            this.allTasks = [];
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
        const cardContent  =  `<div class="col-md-3" taskId="${taskObj.id}">
                                    <div class="card">
                                        <div class="card-header">
                                        Task
                                        </div>
                                        <div class="card-body" >
                                            <h6 class="card-title">Assigned To:</h5>
                                            <p class="card-text">${taskObj.assignedTo}</p>
                                            <h6 class="card-title">Assigned By:</h5>
                                            <p class="card-text">${taskObj.name}</p>
                                            <h6 class="card-title">Description:</h5>
                                            <p class="card-text">${taskObj.description}</p>
                                            <h6 class="card-title">Due Date:</h5>
                                            <p class="card-text">${taskObj.date}</p>
                                            <h6 class="card-title">Status:</h5>
                                            <p class="card-text">${taskObj.status}</p>                                         
                                            <button delId="${taskObj.id}" type="button" class="btn btn-dark" >Delete</button>
                                        </div>
                                            
                                    </div> 
                                </div>`;

            //gets the top element of the card and puts in a variable to be able to add card content inside.
            let cardRow = document.getElementById('rowID');
            console.log(cardRow);
             // Append newyly created card element to the cardContent
            cardRow.insertAdjacentHTML('beforeEnd', cardContent); // inserts item at bottom of the page
            

            //interpolates the user input into the shown list
            const listContent = `<a href="#" class="list-group-item list-group-item-action" listTaskId="${taskObj.id}">
                                    <div class="d-flex w-100">
                                    <h5 class="mb-1">Assigned To: ${taskObj.assignedTo}</h5>                             
                                    </div> 
                                    <small>Due Date: ${taskObj.date}</small>
                                    <small>Status: ${taskObj.status}</small>           
                                </a>`;

            //gets the top element of the list and puts in a variable to be able to add list content inside.
            let listCol = document.getElementById('listID');
            console.log(listCol);
            listCol.insertAdjacentHTML('afterBegin', listContent);
        }
    


    
    

        //deletes task from task list
        deleteTask(element){
        //this stores the element clicked top parent nodes id value
        let topParent = element.parentNode.parentNode.parentNode.attributes.taskId.value;

        

            //this removes item off array permenantly
        for(let i = 0; i < this.allTasks.length; i++){
            if(this.allTasks[i].id == topParent){
                //goes to the element clicked in the array and removes 1
                this.allTasks.splice(i, 1);
               // sets item in the local storage
               localStorage.setItem("TaskCard", JSON.stringify(myTaskManager.allTasks));
            }
        }

        //gets the parent node above the ones you want to get rid of. then removes the child node, and the 3 parent nodes above, but not including the very top parent node which is a row.
        element.parentNode.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode.parentNode);

        //gets all element of all the a tags 
        let elementA = document.getElementsByTagName('a');
        

        for( let i = 0; i < elementA.length; i++){
            //element now = whatever 'a' tag has been targeted
            element = elementA[i];
        
            //removes item from list
            if(element.attributes.listTaskId.value == topParent){
            element.parentNode.removeChild(element);
            }
        }

        }

        //update task status 
        updateTask(){ 
    }
    
    
}


let myTaskManager = new TaskManager();

//this gets the data back from local storage
let data = localStorage.getItem("TaskCard");
if(data){
    myTaskManager.allTasks = JSON.parse(data);
    showItems(myTaskManager.allTasks)
} else {
    myTaskManager.allTasks = [];
}

function showItems(array){
    for(let i=0; i < array.length; i++){
        myTaskManager.addTask(array[i]);
    }
}



