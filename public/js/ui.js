

import { getSessionSetting,setSessionSetting,saveNewTask ,updateData, deleteData} from "./storage.js";


const DEFAULT_TIME_SETTING = [25,15,5];

export function loadTime() {
    
    const timeSetting = sessionStorage.getItem("userSetting") === null ? [DEFAULT_TIME_SETTING[0],DEFAULT_TIME_SETTING[1],DEFAULT_TIME_SETTING[2]] : JSON.parse(sessionStorage.getItem("userSetting"));
    
    const timer = document.getElementById("timer");
    let time = "";
    let index = 0;

    const buttons = document.querySelectorAll(".envControl button");

    buttons.forEach((button,i)=>{
        
        if(button.dataset.status === "active"){
            index = i;
        }
    })
    
    

        time = timeSetting[index]*60;
        let minutes = Math.floor((time/60));
        let seconds = time % 60;

        minutes = String(minutes).padStart(2,'0');
        seconds = String(seconds).padStart(2,'0');

        timer.innerHTML = `${minutes}:${seconds}`


    

}
let countDown; 
export function envControl(env, clickedButton){
    
    const startBtn  = document.getElementById("startBtn");
    if(startBtn.dataset.status === "active"){

        clearInterval(countDown);
        startBtn.dataset.status === "inactive";
        startBtn.textContent = "START";

    }

    const buttons = document.querySelectorAll(".envControl button");
    buttons.forEach(button =>{
        if(button.dataset.status = "active"){
            button.style.backgroundColor = "inherit";
            button.dataset.status = "inactive";
            
        }
    });
    clickedButton.dataset.status = "active";
    // clickedButton.style.backgroundColor = "hsla(0, 0%, 100%, 0.4)";

    
    const body = document.body;
    
    if(env === "pomodoro"){

        body.style.backgroundColor = "#cc5500";
        
    }else if(env === "shortBreak"){

        body.style.backgroundColor = "#00CCA6";
        

    }else if(env === "longBreak"){

        body.style.backgroundColor = "#0077CC";
        
    }

    loadTime();

}

export function startTimer(startButton){

    let displayTime = document.getElementById("timer").innerHTML.split(":");
    const isTimerRunning = startButton.dataset.status === "active" ? true : false;
    const audio = document.getElementById("notification");
    const activeEnv = document.querySelectorAll(".envBtn");
    let isPomodoro = false;
    activeEnv.forEach(button =>{
       // console.log(button.dataset.status);
        if(button.dataset.status === "active" && button.dataset.choice === "pomodoro" ){
            isPomodoro = true;
        }
    })
    
    if(isTimerRunning === false){

        startButton.textContent = "STOP"
        startButton.dataset.status = "active";

        let time = Number(displayTime[0]*60) + Number([displayTime[1]])-1;
        countDown = setInterval( () =>{
            let minutes = Math.floor(time/60);
            let seconds = time % 60;
    
            displayTime =  document.getElementById("timer");
    
            minutes = String(minutes).padStart(2,'0');
            seconds = String(seconds).padStart(2,'0');
            
            displayTime.innerHTML = `${minutes}:${seconds}`;
    
            time--;
            
            if(time < 0){
                clearInterval(countDown);
                
                if(isPomodoro){
                    
                    updateData();
                }
               
                audio.play();
                setTimeout(() => {
                   alert("Time is Up!");
                    location.reload();
                }, 2000);
            }
    
        }, 1000);

    }else{

        clearInterval(countDown);
        console.log(countDown);
        startButton.dataset.status = "inactive";
        startButton.textContent = "START";

    }


    

}

export function setTime(){

        //console.log("lol");
        const popUp = document.getElementsByClassName("overlay")[0];
    
        popUp.style.display = "block";

        const userSetting = getSessionSetting();

        const pomodoroSetting = document.getElementById("pomodoroTxt");
        const longBreakSetting = document.getElementById("longBreakTxt");
        const shortBreakSetting = document.getElementById("shortBreakTxt");
        
        if(userSetting !== null){
            pomodoroSetting.value = userSetting[0];
            longBreakSetting.value = userSetting[1];
            shortBreakSetting.value = userSetting[2];
        }else{
            pomodoroSetting.value = DEFAULT_TIME_SETTING[0];
            longBreakSetting.value = DEFAULT_TIME_SETTING[1];
            shortBreakSetting.value = DEFAULT_TIME_SETTING[2];

        }
        
        const exitBtn = document.getElementsByClassName("exitBtn")[0];
        exitBtn.addEventListener("click", () => {
            popUp.style.display = "none";
        })

        const applyBtn = document.getElementsByClassName("submit")[0];
        applyBtn.addEventListener("click", (event)=>{

            setSessionSetting([pomodoroSetting.value,longBreakSetting.value,shortBreakSetting.value]);

            popUp.style.display = "none";
            location.reload();
            
        })

}

export function  addNewTask(){

    const popUp = document.getElementsByClassName("overlay")[1];
    
    popUp.style.display = "block";

    const exitBtn = document.getElementsByClassName("exitBtn")[1];
        exitBtn.addEventListener("click", () => {
            popUp.style.display = "none";
        })

    const addForm = document.getElementById("addList");
    addForm.addEventListener("submit", ()=>{

        const newTask = document.getElementById("taskTxt").value;
        const pomodoroEst = document.getElementById("pomodoroEst").value;

        const newData = {
            user_id: 1, //id akan selalu 1, karena tidak fungsi untuk menambah user
            data : [{task: newTask,pomodoro_est : Number(pomodoroEst),completed : 0}],
            
            
            
        };

        saveNewTask(newData);
        alert("Data added");
        location.reload();
                
    })

}

export function deleteTask(id){
    deleteData(Number(id));
    alert("Data deleted");
    location.reload();


}