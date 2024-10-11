

export function getSessionSetting(){

    const customSetting = sessionStorage.getItem("userSetting");

    return customSetting === null ? null : JSON.parse(customSetting);


}

export function setSessionSetting(userSetting){

    const newSetting = JSON.stringify(userSetting);

    sessionStorage.setItem("userSetting", newSetting);
    

}

export async function saveNewTask(newData){

    const response = await fetch("/upload", {
        method: "POST",
        headers :{
            "Content-Type": "application/json",
        },
        body : JSON.stringify({input : newData}),
    })

    if(response.ok)
        return true;

    return false;

}

export async function updateData(){

    const response = await fetch("/update", {
        method: "POST",
        headers :{
            "Content-Type": "application/json",
        },
        body : JSON.stringify({user_id : 1}),
    })
    if(response.ok)
        return true;

    return false;

}

export async function deleteData(id){

    const response = await fetch("/delete", {
        method: "DELETE",
        headers :{
            "Content-Type": "application/json",
        },
        body : JSON.stringify({index : id}),
    })

    if(response.ok)
        return true;
    
    return false;

}