const mongoose=require('mongoose')

const ProductSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:{
       type:String,
       required:true
    },
    price:{
        type:Number,
        required:true
    },
    images:[

    ],
    characters:[
        {
            name:{
                type:String,
                required:true
            },
            char:{
                type:String,
                required:true
            }
        }
    ],
    isLike:{
        type:Boolean,
        default:false
    }
},{ timestamps: true })

const Product=mongoose.model('product',ProductSchema)
module.exports=Product
