const mongoose = require('mongoose');

const Employee = new mongoose.Schema({
    firstname: { type:String , required:true },
    lastname: { type:String , required:true },
    email : { type:String , unique:true,  required:true },
    gender: { type:String , required:true },
    phone : {type:Number,required:true,unique:true },
    age: { type:Number,required:true },
    password: { type:String,required:true },
    confirmpassword: { type:String,required:true }
})

const Register = new mongoose.model('Registers',Employee);
module.exports= Register;