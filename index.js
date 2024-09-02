const express= require('express')
const mongoose = require('mongoose')
const fs = require('fs')
const Users = require("./user.json")
const Port =8000
const app=express();
app.use(express.json());

app.use(express.urlencoded({extended:false}))

app.get('/user', (req, res) => {
    return res.json(Users);
});

app.post('/user',(req, res)=>{
    const body= req.body;
    console.log(body)
    Users.push(body);
    fs.writeFile("./user.json", JSON.stringify(Users),(err,data)=>{
        return res.json({status:"pending"})
    })
});
mongoose
.connect('mongodb://127.0.0.1:27017/test1')
.then(()=>{ console.log("done")})
.catch(err =>console.log("error",err))
const userSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required: true
    },
    LastName:{
        type:String
    },
    Email:{
        type:String,
        required: true,
        unique: true,
    },

})
const User = mongoose.model('user',userSchema);

app.post('./user', async(req,res)=>{
    const body = req.body;
    if(
        !body ||
        !body.First_Name ||
        ! body.Last_Name ||
        ! body.email 
    )
    {
        return res.status(400).json({msg:"all feild is required"})
    }
    const result = await User.create({
    FirstName: body.First_Name,
    LastName: body.Last_Name,
    Email:body.email
    })
    console.log( result)
    return res.status(201).json({msg:"sucesss"})
})
app.listen(Port, () => {
    console.log(`Server listening at http://localhost:${Port}`);
  });