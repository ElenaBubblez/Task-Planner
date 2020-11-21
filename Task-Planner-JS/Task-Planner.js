


//validate form input.
function validateTaskForm()
{
    //stores the values from the form inside variables
    const name = document.querySelector('#assignedBy').value;
    const description = document.querySelector('#description').value;
    const assignedTo = document.querySelector('#assignedTo').value;
    const date = document.querySelector('#dueDate').value;
    const status = document.querySelector('#inputStatus').value;

    //gets the id of the p tags in html file and stores them in variables so i can input text with javascript
    let  error1 = document.getElementById("error1");
    let  error2 = document.getElementById("error2");
    let  error3 = document.getElementById("error3");
    let  error4 = document.getElementById("error4");
    let  error5 = document.getElementById("error5");




    let score = 0;
    
    let isValid = false;
    
    if(name.length >= 3)
    {
        score ++;
        error1.innerHTML = "";
    }
    else
    {
        error1.innerHTML = "Text needs to be 3 or more characters";
    }
    if(description.length >= 5)
    {
        score++;
        error2.innerHTML = "";
    }
    else
    {
        error2.innerHTML = "Text needs to be 5 or more characters";
    }
    if(assignedTo.length >= 3)
    {
        score++;
        error3.innerHTML = "";
    }
    else
    {
        error3.innerHTML = "Text needs to be 3 or more characters";
    }
    if(date)
    {
        score++;
        error4.innerHTML = "";
    }
    else
    {
        error4.innerHTML = "Please input a date";
    }

    if(status != "Choose")
    {
        score++;
        error5.innerHTML = "";
    }
    else
    {
        error5.innerHTML = "Please choose status of task";
    }

    if(score == 5)
    {
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
function createTaskObj(name, description, assignedTo, date, status)
{

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
document.addEventListener('click', function(event)
{
    const element = event.target;
    //stores element clicked on in a variable
    let isBTN = (event.target.nodeName == "BUTTON");
    let isDeleteBtn = (event.target.classList == 'btn delete')
    // let isUpdateBtn = (event.target.classList == 'btn update')

    if(isBTN == true)
    {
        if(isDeleteBtn)
        {
            const confirmDelete = confirm("are you sure you want to delete this task?");
            if(confirmDelete)
            {


            //passes through the deleteTask function inside the TaskManager
            myTaskManager.deleteTask(element);
            
            }
        }

        // if(isUpdateBtn)
        // {

        // }

    }
    return element;

});




class TaskManager
{

        constructor()
        {
            this.allTasks = [];
        }
        //returns the list of all task
        getAllTask()
        {
            console.log(this.allTasks);
        }

        //returns a list of all task that status is equal to the status passes as an argument:
        getTasksWithStatus()
        {

           
           //this gets the data back from the local storage TaskCard
           let data = JSON.parse(localStorage.getItem("TaskCard"));

           

            console.log(data);

            //stores the value of the items in the drop down list
            let selectValue = document.getElementById('chooseStatus').value;
            console.log(selectValue);

           //creates and empty array
           let filteredTasks = [];

           //foreach object in data, do whatever is inside the curly braces
           data.forEach((obj) => 
           {

                if(selectValue === 'all')
                {
                    filteredTasks = data;  
                    console.log(filteredTasks);
                    //stores array in new storage key "SelectCard"
                    localStorage.setItem("SelectCard", JSON.stringify(filteredTasks)); 

                    //if length of the array is more than value of i then loop again and increase i
                    for(let i = 0; i < filteredTasks.length; i++)
                    {
                        //reloads page
                        location.reload();
                    }
                }
                //if objects in data with the same status as the value selected then add the object to the array
                else if (obj.status === selectValue ) 
                {   

                    //adds object to array filteredTasks
                    filteredTasks.push(obj);

                    // console.log(data);
                    // console.log(obj.id);
                    // console.log(obj.status);
                    // console.log(filteredTasks);
                    localStorage.setItem("SelectCard", JSON.stringify(filteredTasks)); 

                    for(let i = 0; i < filteredTasks.length; i++)
                    {
                        location.reload();
                    }
                }

               
                
               
           });
           
           return filteredTasks;    
           
           
       }

        //add task to existing task list
        addTask(taskObj){

       
        //interpolates the user input into the shown card
        const cardContent  =  `<div class="col-md-6" taskId="${taskObj.id}">
                                    <div class="card" >
                                        <div class="card-header">
                                        <h5>Task</h5>
                                        </div>
                                        <div class="card-body">
                                            <h5 class="card-title">Assigned To:</h5>
                                            <p class="card-text">${taskObj.assignedTo}</p>
                                            <h5 class="card-title">Assigned By:</h5>
                                            <p class="card-text">${taskObj.name}</p>
                                            <h5 class="card-title">Description:</h5>
                                            <p class="card-text">${taskObj.description}</p>
                                            <h5 class="card-title">Due Date:</h5>
                                            <p class="card-text">${taskObj.date}</p>
                                            <h5 class="card-title" id="status" >Status:</h5>
                                            <p class="card-text id="statusValue">${taskObj.status}</p>                                         
                                        </div>   
                                        <div>
                                        <button delId="${taskObj.id}" type="button" class="btn delete" >Delete</button>
                                           
                                        </div>                       
                                    </div> 
                                </div>`;

            //gets the top element of the card and puts in a variable to be able to add card content inside.
            let cardRow = document.getElementById('rowID');
            console.log(cardRow);
             // Append newyly created card element to the cardContent
            cardRow.insertAdjacentHTML('beforeEnd', cardContent); // inserts item at bottom of the page
            

            //interpolates the user input into the shown list
            const listContent = `<a href="#${taskObj.id}" class="list-group-item list-group-item-action" listTaskId="${taskObj.id}" >
                                    <div class="d-flex w-100">
                                    <h5 class="mb-1">Assigned To: ${taskObj.assignedTo}</h5>                             
                                    </div> 
                                    <small>Due Date: ${taskObj.date}</small>
                                    <small>Status: ${taskObj.status}</small>           
                                </a>`;

            //gets the top element of the list and puts in a variable to be able to add list content inside.
            let listCol = document.getElementById('listID');
            
            listCol.insertAdjacentHTML('afterBegin', listContent);

            
        }
    


    
    

        //deletes task from task list
        deleteTask(element)
        {
            //this stores the element clicked top parent nodes id value
            let topParent = element.parentNode.parentNode.parentNode.attributes.taskId.value;
                console.log(topParent);
            

                //this removes item off array permenantly
            for(let i = 0; i < this.allTasks.length; i++)
            {
                if(this.allTasks[i].id == topParent)
                {
                    //goes to the element clicked in the array and removes 1
                    this.allTasks.splice(i, 1);
                // sets item in the local storage
                localStorage.setItem("TaskCard", JSON.stringify(this.allTasks));
                localStorage.setItem("SelectCard", JSON.stringify(this.filteredTasks));
                }
            }



            //gets the parent node above the ones you want to get rid of. then removes the child node, and the 3 parent nodes above, but not including the very top parent node which is a row.
            element.parentNode.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode.parentNode);

            //gets all element of all the a tags 
            let elementA = document.getElementsByTagName('a');
            

            for( let i = 0; i < elementA.length; i++)
            {
                //element now = whatever 'a' tag has been targeted
                element = elementA[i];
            
                //removes item from list
                if(element.attributes.listTaskId.value == topParent)
                {
                element.parentNode.removeChild(element);
                }
            }

            return element;
        }

        //update task status 
        updateTask()
        { 
            
        }
    
    
}
 
     

let myTaskManager = new TaskManager();

let selectedData = localStorage.getItem("SelectCard");

console.log(selectedData);
//this gets the data back from local storage and displays it on screen
 
console.log()

function showItems(array)
{
    for(let i=0; i < array.length; i++)
    {
        myTaskManager.addTask(array[i]);
       
    }
}

if(selectedData)
{
    myTaskManager.allTasks = JSON.parse(selectedData);
    showItems(myTaskManager.allTasks);
    console.log(myTaskManager.allTasks);
} 
//  if(selectedData)
// {
//     myTaskManager.allTasks = JSON.parse(selectedData);
//     showItems(myTaskManager.allTasks);
//     console.log(myTaskManager.allTasks);
// }


// when clicking the clear storage button confirm alert appears 
//click ok to get rid of all you tasks, if you click cancel it wont
document.getElementById('clearStorage').addEventListener('click', function()
{

    const confirmClear = confirm("are you sure you want to clear all your tasks?");
    if(confirmClear)
    {
    localStorage.removeItem("TaskCard");
    localStorage.removeItem("SelectCard");
    location.reload();
    }

});




