const express = require("express");
const path = require("path");
const fs = require("fs");
const { log } = require("console");
const app = express();
const ejs = require("ejs");

const port = 3000;

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req,res)=>{

    const filePath = path.join(__dirname,"db","user.json");
   
    var user_id = 1;
    fs.readFile(filePath, "utf-8" , (err,data) =>{
        if(err)
            return;
        else {
            if(!data)
                data = "[]";

            const users = JSON.parse(data);
            const index = users.findIndex(user => user.user_id === user_id);
        
        if(index === -1){

            res.render("index", {title:"pomodoro-app-hendratanjaya", task : null});
            
        }
        else {
            res.render("index", {title:"pomodoro-app-hendratanjaya", tasks :users[index].data});
            
        }
        }

    })

});

app.post("/upload" , (req,res) => {

    const newData = req.body.input;
   
    const filePath = path.join(__dirname, "db", "user.json");

    
    fs.readFile(filePath,"utf-8", (err,data)=>{

        if(err)
            return res.status(500).json({message: "Error reading file"});
        
        if(!data)
            data = '[]'
        let users = JSON.parse(data);
        const index = users.findIndex(user => user.user_id === newData.user_id );
        
        if(index === -1){

            users.push(newData);
            console.log(newData);
        }
        else {
            //console.log(users[0].data[1]);
            users[index].data.push(...newData.data);
            
        }


        fs.writeFile(filePath, JSON.stringify(users,null,2), (err) =>{

            if(err){
                return res.status(500).json({ message: "Error writing file"});

            }  
            
                return res.redirect("/"); 
            
        })


    });

   
})

app.post("/update", (req,res)=>{

    const filePath = path.join(__dirname, "db", "user.json");
    fs.readFile(filePath,"utf-8", (err,data)=>{

        if(err)
            return res.status(500).json({message: "Error reading file"});
        
        if(!data)
            return res.redirect("/");
    
        let users = JSON.parse(data);
        
            //console.log(users[0].data[1]);
            
        for (let i = 0; i < users[0].data.length; i++) {
            if (users[0].data[i].completed < users[0].data[i].pomodoro_est) {
                
                users[0].data[i].completed++;
                break; 
            }
        }      
        users[0] = { ...users[0], data: [...users[0].data] };   
            
        
        fs.writeFile(filePath, JSON.stringify(users,null,2), (err) =>{
    
            if(err){
                return res.status(500).json({ message: "Error writing file"});
    
            }
            
                return res.redirect("/");
           
            
            
        });
    })

})

app.delete("/delete",(req,res) =>{

    const id = req.body.index;
    const filePath = path.join(__dirname, "db", "user.json");

    
    fs.readFile(filePath,"utf-8", (err,data)=>{

        if(err)
            return res.status(500).json({message: "Error reading file"});
        
        if(!data)
            data = '[]'
        let users = JSON.parse(data);
        
        users[0].data.splice(id,1);
       

        fs.writeFile(filePath, JSON.stringify(users,null,2), (err) =>{

            if(err){
                return res.status(500).json({ message: "Error writing file"});

            }  
            
                return res.redirect("/"); 
            
        })


    });
    

})

app.listen(port,()=>{
    console.log("Server ready: http://localhost:3000/");
    
});
