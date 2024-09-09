
import { loadTime,envControl, startTimer,setTime, addNewTask, deleteTask } from "./ui.js";

const envController = document.getElementsByClassName("envControl")[0];
const startBtn = document.getElementById("startBtn");
const settingBtn = document.getElementById("setting");
const addBtn = document.getElementById("addBtn");
const deleteButtons = document.querySelectorAll('.deleteBtn');

envController.addEventListener("click", (event)=>{

    const isButton = event.target.nodeName === "BUTTON";

    if(isButton){
            
        const selectedEnv = event.target.dataset.choice;
        envControl(selectedEnv, event.target);
            //console.log(event.target);
    }   

    else return;

});

startBtn.addEventListener("click", (event)=>{

    startTimer(event.target);   

});

settingBtn.addEventListener("click" , (event)=>{

    setTime();
});

addBtn.addEventListener("click", (event)=>{

    addNewTask();
    
})

deleteButtons.forEach(button =>{

    button.addEventListener("click", (event)=>{
        const id = event.target.dataset.id;
        deleteTask(id);
    })
})

window.onload = () =>{

    loadTime();
}



