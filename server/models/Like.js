const mongoose=require('mongoose')

const LikeSchema=new mongoose.Schema({
    productId:{
        type:String,
        required:true,
        unique:true
    },
    userId:{
        type:String,
        required:true
    }
})

const Like=mongoose.model('like',LikeSchema)
module.exports=Like
