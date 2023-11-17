const express = require("express");
const app = express();







const port = 3000;
var User = [];
var Todo = [];
const cors = require("cors")

// const authRoutes = require("./routes/auth");
// const todoRoutes = require("./routes/todo");
app.use(cors());
app.use(express.json());

// app.use("/auth", authRoutes);
// app.use("/todo", todoRoutes);



const jwt = require("jsonwebtoken");

var id = 0;
const SECRET = "hi";
const authenticateJwt = async (req , res , next) =>{
    const token = req.headers.token;
    jwt.verify(token , SECRET , (err, user) =>{
        if(err)
        {
            return res.status(404).json({msg : "wrong token"});
        }
        req.userId = user;
        console.log(req.userId);
        console.log("right token");
        next();
        
        // req.status(200).json({msg : "right token"})
    })
}

app.post("/singup" , async (req , res)=>{
    console.log("/singup route hit")
    const {username , password} = req.body;
    console.log("username is :",username);
    console.log("password is : ",password);
    for(var i = 0 ;i<User.length;i++)
    {
        console.log(User[i]);
        if(User[i].username == username && User[i].password == password)
        {
            return res.status(403).json({
                msg : "user already exists"
            })
        }

    }
    id++;
    User.push({id : id , username : username , password : password , done : false});
    console.log(User);
    const token = await jwt.sign(id , SECRET );
    return res.status(200).json({msg : "User created successfully" , token});
});

app.post("/login" , async (req , res)=>{
    const {username , password} = req.body;
    for(var i = 0 ;i<User.length;i++)
    {
        if(User[i].username == username && User[i].password == password)
        {
            const token = await jwt.sign(id , SECRET ,{expiresIn : '1h'});

            res.status(403).json({
                msg : "user found" , token
            })
        }


    }
    // User.push({username , password});
    res.status(200).json({msg : "user not found"});
});

app.get("/me" ,authenticateJwt ,  async (req ,res)=>{
    const id = req.userId;
    for(var i = 0 ; i<User.length;i++)
    {
        if(User[i].id == id)
        {
            return res.status(200).json({username : User[i].username ,password:User[i].password });
        }
    }
    return res.status(411).json({msg : "user not logged in "});

});

// -----------------------------------------------------------------
//---------------------------------------------------------------
//                              Todo routes
//----------------------------------------------------------------
//------------------------------------------------------------------
app.get("/todos" , authenticateJwt , (req , res )=>{
    const id = req.userId;
    var newTodo = [];
    for(var i = 0 ;i<Todo.length;i++)
    {
        if(Todo[i].userId == id)
        {
            newTodo.push(Todo[i]);
        }
    }
    if(newTodo == [])
    {
        return res.status(403);
    }
    return res.status(200).json({msg : "These are your todos" , newTodo});
});
var Id = 0;
app.post("/addTodo" , authenticateJwt ,(req , res)=>{
    const userId = req.userId;
    //userId , title , description , Id
    const {title , description } = req.body;
    Id++;
    Todo.push({userId : userId , title : title , description: description , Id : Id});
    return res.status(200).json({msg:"Todo added" , title , description , Id , userId});


});
app.listen(port , ()=>{
    console.log("server started");
});

// module.exports = router;
