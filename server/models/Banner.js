const mongoose=require('mongoose')


const BannerSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        // required: true
    },
    source:{
        type:String,
        required:true
    },
    isShow:{
        type:Boolean,
        default:true
    }
},{ timestamps: true })

const Banner=mongoose.model('banner',BannerSchema)
module.exports=Banner
