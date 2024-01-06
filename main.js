const express=require("express");
const fs=require("fs");
const cors=require("cors");
// const multer=require("multer");
const app=express();
const port=8000;
// app.use(express.static("public"));
// app.use(express.static("uploads"));

// app.set("view engine","ejs");
// app.use('/',express.static('uploads'))
app.use(express.json());
// const storage=multer.diskStorage({
//     destination:function(req,file,cb)
//     {
//         cb(null,"uploads/profile");
//     },
//     filename:function(req,file,cb)
//     {
//         cb(null,file.originalname);
//     }
// })

// const upload=multer({storage:storage});
// app.get("/",(req,res)=>{
//     res.sendFile(__dirname+"/public/todo.html");
// })
app.get("/show_todo",(req,res)=>
{
   // console.log(req.body);

    fs.readFile(__dirname+"/data.txt","utf-8",function(err,data)
    {
        //console.log(data);
        let todos;
        if(data.length===0)
        {
            todos=[];
        }
        else{
            todos=JSON.parse(data);
        }
       // console.log(todos);
       res.send(JSON.stringify(todos));
        
    })
})
app.post("/checkbox",(req,res)=>
{
    let x;
    fs.readFile(__dirname+"/data.txt","utf-8",function(err,data){
        let todos=JSON.parse(data);
       // console.log(req.body.f);
        for(let i=0;i<todos.length;i++)
        {
           // console.log(todos[i]);
            if(todos[i].id==req.body.id)
            {
               // console.log(todos[i]);
                if(todos[i].flag==0)
                {
                    todos[i].flag=1;
                }
                else{
                    todos[i].flag=0;
                }
                x=todos[i].flag;
                break;
            }
        }
        fs.writeFile(__dirname+"/data.txt",JSON.stringify(todos),function(err)
        {
           // console.log("done");
            //res.end(JSON.stringify(x));
            res.status(200).end();
        })
    })
})
app.post("/update_todo",(req,res)=>
{
    // console.log(req.body);
     fs.readFile(__dirname+"/data.txt","utf-8",function(err,data)
     {
        //console.log(req.body); 
        let todos=JSON.parse(data);
       // console.log(todos[req.body.id]);
      //  todos.splice(req.body.id,1);
      for(let i=0;i<todos.length;i++)
      {
        if(todos[i].id==req.body.id)
        {
            todos[i].value=req.body.value;
        }
      }
    //   todos.map((d)=>{
    //      (d.id === req.body.id ? { ...d, value: req.body.value } : { ...d })
    //   })
    //   const todo2=todos.filter(new_data);
    // //  console.log(todo2);
    //   function new_data(value)
    //   {
    //   //  console.log(value);
    //   //  console.log(req.body.id);
    //         return !(req.body.id==value.id);
          
    //   }
        fs.writeFile(__dirname+"/data.txt",JSON.stringify(todos),function(err)
        {
           // console.log("done");
            res.status(200).end();
            return;
        })
     })
})
app.post("/delete_todo",(req,res)=>
{
    
     fs.readFile(__dirname+"/data.txt","utf-8",function(err,data)
     {
        //console.log(req.body); 
        let todos=JSON.parse(data);
       // console.log(todos[req.body.id]);
      //  todos.splice(req.body.id,1);
      const todo2=todos.filter(new_data);
    //  console.log(todo2);
      function new_data(value)
      {
      //  console.log(value);
      //  console.log(req.body.id);
            return !(req.body.id==value.id);
          
      }
        fs.writeFile(__dirname+"/data.txt",JSON.stringify(todo2),function(err)
        {
           // console.log("done");
            res.status(200).end();
        })
     })
})
app.post("/savetodo",(req,res)=>
{
   //console.log(req.body);
//    console.log(req.file);
//    console.log(req.file.filename);
//     let f=req.file.filename;
    fs.readFile(__dirname+"/data.txt","utf-8",function(err,data)
    {
       // console.log(data);
        let todos;
        if(data.length===0)
        {
            todos=[];
        }
        else{
            todos=JSON.parse(data);
        }
       // console.log(req.body);
       //req.body.pic=f;
       let obj=req.body.data;
    //    console.log(obj[0]);
        // todos.push(obj[0]);
        fs.writeFile(__dirname+"/data.txt",JSON.stringify(todos),function(err)
        {
           // console.log("done");
            res.status(200).end();
            return;
        })
        //res.send(f);
    })
})
app.listen(port,()=>
{
    console.log(`at port ${port}`);
})