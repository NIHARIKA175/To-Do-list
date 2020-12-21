// CODE EXPLAINED channel
//select the elements
const clear=document.querySelector(".clear");
const dataElement=document.getElementById("date");
const input = document.getElementById("input");
const list=document.getElementById("list");
//const element=document.getElementById("element");

//class names
const CHECK="fa-check-circle";
const UNCHECK="fa-circle-thin";
const LINE_THROUGH="lineThrough";

//variables
let LIST=[],id=0;

//get item from local storage
let data=localStorage.getItem("TODO");

//check if data is not empty
if(data)
{
    LIST=JSON.parse(data);
    id=LIST.length; //set the id to the last one in list
    loadToDo(LIST); //load the list to the user interface
}
else{
    //if data is not empty
    LIST=[],
    id=0;
}

//load items to the user's interface
function loadList(array)
{
    array.forEach(function(item)
    {
        addToDo(item.name,item.id,item.done,item.trash);
    });
}

//clear local storage
clear.addEventListener('click',function()
{
    localStorage.clear();
    location.reload();
});

//show date 
const options={weekday:"long",month:"short",day:"numeric"};
const today= new Date();
dateElement.innerHTML=today.toLocaleDateString("en-US",options);

//add to do function

function addToDo(toDo,id,done,trash){
    if(trash){return;}
    const DONE=done?CHECK:UNCHECK;
    const LINE=done?LINE_THROUGH:"";
    const item= `<li class="item">
        <i class="fa ${DONE} co" job="complete" id="${id}" ></i>
        <p class="text ${LINE}"> ${toDo} </p>
        <i class="de fa fa-trash-o" job="delete" id="${id}" ></i>
            </li>`;
    const position ="beforeend";

    list.insertAdjacentHTML(position,item);
     
}

// Add an item to the list user the enter key 
document.addEventListener("keyup",function(event)
{
    if (event.keyCode==13)
    {
        const toDo=input.value;
        // if input is not empty
        if(toDo)
        {
            addToDo(toDo,id,false,false);
            LIST.push({
                name:toDo,
                id: id,
                done:false,
                trash:false
            });
            //add item to local storage
            localStorage.setItem("TODO",JSON.stringify(LIST));
            id++;
        }
        input.value="";
    }
});

// complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done=LIST[element.id].done? false:true;
}

// remove a to-do
function removeToDo(element)
{
    element.parentNode.parentnode.removeChild(element.parentNode);
    LIST[element.id].trash=true;
}

//target an element created dynamically

list.addEventListener("click",function(event)
{
    const element=event.target;
    const elementJob=element.attributes.job.value;
    if(elementJob=="complete"){
        completeToDo(element);
    }
    else if(elementJob=="delete")
    {
        removeToDo(element);
    }
    //add item to local storage
    localStorage.setItem("TODO",JSON.stringify(LIST));
});


