

export function getSessionSetting(){

    const customSetting = sessionStorage.getItem("userSetting");

    return customSetting === null ? null : JSON.parse(customSetting);


}

export function setSessionSetting(userSetting){

    const newSetting = JSON.stringify(userSetting);

    sessionStorage.setItem("userSetting", newSetting);
    

}

export function saveNewTask(newData){

    fetch("/upload", {
        method: "POST",
        headers :{
            "Content-Type": "application/json",
        },
        body : JSON.stringify({input : newData}),
    }).then(response => response.json()).then(data => {
        console.log("Succes : ", data);
    }).catch((error) =>{
        console.log("Error: ",error);
    })

}

export function updateData(){
    fetch("/update", {
        method: "POST",
        headers :{
            "Content-Type": "application/json",
        },
        body : JSON.stringify({user_id : 1}),
    })

}

export function deleteData(id){

    fetch("/delete", {
        method: "DELETE",
        headers :{
            "Content-Type": "application/json",
        },
        body : JSON.stringify({index : id}),
    })

}