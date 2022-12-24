const mongoose =require('mongoose')

const UserSchema=new mongoose.Schema({
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    fullName:{
        type:String,
        required: true
    },
    image:{
        type:String
    },
    passportId:{
        type:String
    },
    locus:{
        type:String
    },
    workLocus:{
        type:String
    },
    salary:{
        type:Number
    }
})

const User=mongoose.model('user',UserSchema)
module.exports=User
