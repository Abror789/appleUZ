const mongoose=require('mongoose')

const BroServiceSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required: true
    },
    device:{
        type:String,
        required:true
    },
    desc:{
        type:String
    },
    isChecked:{
        type:Boolean,
        default:false
    }
},{ timestamps: true })

const BroService=mongoose.model('broService',BroServiceSchema)
module.exports=BroService
