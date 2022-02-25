const express = require('express');
const app = express();
const port = process.env.PORT || 4800;
const path = require('path');
const hbs = require('hbs');
require('./db/conn');
const Register = require('./models/registers');
const { urlencoded } = require('express');
const { resolveSoa } = require('dns');


const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(urlencoded({extended:false}))

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("index");
});

app.get('/login',(req,res)=>{
    res.render("login");
})

app.get('/register',(req,res)=>{
    res.render("register");
})
app.post('/register',async(req,res)=>{
    try {
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;
        
        if(password === confirmpassword){
        
            const registerEmp = new Register({
                firstname: req.body.firstname,            
                lastname: req.body.lastname,          
                email : req.body.email,
                gender: req.body.gender,
                phone : req.body.phone,
                age: req.body.age,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword
            })
            const data =await registerEmp.save();
            res.status(201).render("index");
        }
            else{
                res.send("passwords are not matching");
            }
            
        
    } catch (error) {
        res.status(400).send(error);
    }
})
app.post("/login",async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
   
        const username = await Register.findOne({ email:email });
       // const userpwd  = await Register.findOne({ password:password });
        if(username.password === password){
            res.status(201).render("index");
        }
        else{
            res.send("password are not matching");
        }
    } catch (error) {
        res.status(401).send("invalid data");
    }
})
app.listen(port,( )=>{
    console.log(`server is running on ${port}`);
})
